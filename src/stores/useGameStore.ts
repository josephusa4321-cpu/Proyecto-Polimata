import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, ReviewItem, ConceptCard, ActivatedCombo, TeachingTaxEntry, DailyQuest, ShadowQuest, TimeAttack, MirrorMatch, Debuff, RunSummary, PersistedUserState, UserProgressState } from '../types';
import { LEVELS } from '../data/levels';
import { supabase } from '../lib/supabase';
import { createInitialProgressState, getDefaultStoreState, buildProgressFromState, getProgressMirror, mergeProgressState, migrateLegacyProgressState } from './progressState';

const SUPABASE_NO_ROWS_ERROR = 'PGRST116';
const SYNC_STATUS_RESET_MS = 3000;

type SyncTrigger = 'manual' | 'auto';
type SyncOptions = {
    trigger?: SyncTrigger;
};

type CloudGameState = {
    schemaVersion: 2;
    progress: UserProgressState;
};

let syncStatusTimeout: ReturnType<typeof setTimeout> | null = null;

const queueSyncStatusReset = (set: (partial: Partial<GameState & GameActions>) => void) => {
    if (syncStatusTimeout) {
        clearTimeout(syncStatusTimeout);
    }

    syncStatusTimeout = setTimeout(() => {
        set({ syncStatus: 'idle' });
    }, SYNC_STATUS_RESET_MS);
};

const resolveCloudSyncKey = (state: GameState) => {
    const trimmedKey = state.cloudSyncKey.trim();
    return trimmedKey.length > 0 ? trimmedKey : state.deviceId;
};

const formatSyncError = (error: unknown) => {
    if (error && typeof error === 'object') {
        const syncError = error as { message?: string; details?: string; hint?: string; code?: string };
        const parts = [syncError.message, syncError.details, syncError.hint, syncError.code].filter(Boolean);
        if (parts.length > 0) {
            return parts.join(' | ');
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'No se pudo sincronizar con Supabase.';
};

const buildCloudGameState = (state: GameState): CloudGameState => ({
    schemaVersion: 2,
    progress: buildProgressFromState(state),
});

const normalizeCloudState = (
    cloudState: Partial<CloudGameState> | Partial<GameState> | Partial<UserProgressState>
) => {
    const progressSource = 'progress' in cloudState && cloudState.progress ? cloudState.progress : cloudState;
    const fallbackLastSaved = (
        ('lastSaved' in progressSource ? progressSource.lastSaved : undefined)
        ?? ('lastSaved' in cloudState ? cloudState.lastSaved : undefined)
        ?? Date.now()
    );

    return {
        schemaVersion: 2,
        progress: migrateLegacyProgressState(progressSource, fallbackLastSaved)
    };
};

const syncStateWithProgress = (
    currentState: GameState & GameActions,
    partialState: Partial<GameState & GameActions>
): Partial<GameState & GameActions> => {
    const mergedState = {
        ...currentState,
        ...partialState
    };
    const nextProgress = partialState.progress
        ? migrateLegacyProgressState(partialState.progress, partialState.lastSaved ?? currentState.lastSaved ?? Date.now())
        : buildProgressFromState(mergedState);

    return {
        ...partialState,
        progress: nextProgress,
        ...getProgressMirror(nextProgress)
    };
};

interface GameActions {
    addXP: (amount: number) => void;
    completeCard: (cardId: string, xp: number) => void;
    setActivePillar: (pillarId: number | null) => void;
    setActiveModuleId: (moduleId: string) => void;
    getCurrentLevel: () => number;
    setApiKey: (key: string) => void;
    getApiKey: () => string | null;
    saveReview: (cardId: string, success: boolean) => void;
    cacheContent: (cardId: string, content: string) => void;
    getCachedContent: (cardId: string) => string | null;
    addContent: (cardId: string, markdown: string, source?: string) => void;
    getContent: (cardId: string) => string | null;
    hasContent: (cardId: string) => boolean;
    removeContent: (cardId: string) => void;
    importAllContent: (json: string) => { success: boolean, message: string };
    exportAllContent: () => string;
    openContentEditor: (card: ConceptCard) => void;
    closeContentEditor: () => void;
    editingCardId: string | null;
    completeBossFight: (bfId: string, xp: number) => void;
    addCombo: (combo: Omit<ActivatedCombo, 'timestamp'>) => void;
    syncToCloud: (options?: SyncOptions) => Promise<void>;
    loadFromCloud: (options?: SyncOptions) => Promise<void>;
    clearSyncStatus: () => void;
    setCloudSyncKey: (key: string) => void;
    setResponseDraft: (key: string, value: string) => void;
    clearResponseDraft: (key: string) => void;
    checkMilestones: () => void;
    checkAchievements: () => void;
    recordActivity: () => void;
    incrementStatsVisit: () => void;
    clearLatestAchievement: () => void;
    clearCelebration: () => void;
    checkTeachingTax: () => void;
    payTeachingTax: (explanation: string, cardTitle: string) => void;
    openTaxModal: () => void;
    closeTaxModal: () => void;
    checkDailyQuest: () => void;
    completeDailyQuest: (answer: string) => void;
    checkShadowQuest: () => void;
    completeShadowQuest: (observation: string) => void;
    openShadowQuestModal: () => void;
    closeShadowQuestModal: () => void;
    checkTimeAttack: (isManual?: boolean) => void;
    completeTimeAttack: (answer: string, secondsUsed: number) => void;
    openTimeAttackModal: () => void;
    closeTimeAttackModal: () => void;
    checkMirrorMatch: () => void;
    completeMirrorMatch: (argument: string) => void;
    openMirrorMatchModal: () => void;
    closeMirrorMatchModal: () => void;
    openDebuffPanel: () => void;
    closeDebuffPanel: () => void;
    applyDebuff: (biasId: string, context: string) => void;
    openCapstonePanel: () => void;
    closeCapstonePanel: () => void;
    completeCapstone: (submission: string) => void;
    startNewGamePlus: () => void;
    setSyncId: (id: string) => void;
    resetProgress: () => void;
}

export const XP_VALUES = {
    DAILY_QUEST: 25,
    SHADOW_QUEST: 30,
    MIRROR_MATCH_BASE: 40,
    MIRROR_MATCH_NGPLUS: 60,
    TIME_ATTACK_BASE: 20,
    TIME_ATTACK_BONUS: 10,
    DEBUFF_PENALTY: -10,
    CAPSTONE_REWARD: 500
} as const;

export const useGameStore = create<GameState & GameActions>()(
    persist(
        (rawSet, get) => {
            const set = (
                partial: Partial<GameState & GameActions> | ((state: GameState & GameActions) => Partial<GameState & GameActions>)
            ) => {
                if (typeof partial === 'function') {
                    return rawSet((state) => syncStateWithProgress(
                        state as GameState & GameActions,
                        partial(state as GameState & GameActions)
                    ));
                }

                return rawSet((state) => syncStateWithProgress(
                    state as GameState & GameActions,
                    partial as Partial<GameState & GameActions>
                ));
            };

            const defaultState = getDefaultStoreState();

            return ({
            ...defaultState,

            setActivePillar: (pillarId) => set({ activePillar: pillarId }),
            setActiveModuleId: (moduleId) => set({ activeModuleId: moduleId }),

            openContentEditor: (card: ConceptCard) => set({ editingCardId: card.id }),
            closeContentEditor: () => set({ editingCardId: null }),

            addXP: (amount: number) => {
                const oldLevel = get().getCurrentLevel();
                set((state) => ({
                    xp: state.xp + amount,
                    lastXPGain: { amount, timestamp: Date.now() },
                    lastSaved: Date.now()
                }));
                const newLevel = get().getCurrentLevel();
                if (newLevel > oldLevel) {
                    set({ pendingCelebration: 'levelup' });
                }
            },

            completeCard: (cardId: string, xp: number) => {
                const { completedCardIds } = get();
                if (!completedCardIds.includes(cardId)) {
                    const oldLevel = get().getCurrentLevel();
                    set((state) => ({
                        completedCardIds: [...state.completedCardIds, cardId],
                        xp: state.xp + xp,
                        lastXPGain: { amount: xp, timestamp: Date.now() },
                        lastSaved: Date.now()
                    }));
                    const newLevel = get().getCurrentLevel();
                    if (newLevel > oldLevel) {
                        set({ pendingCelebration: 'levelup' });
                    }

                    get().recordActivity();
                    get().checkMilestones();
                    get().checkAchievements();
                    get().checkTeachingTax();
                    get().checkShadowQuest();
                    get().checkTimeAttack();
                    get().checkMirrorMatch();

                    // Check for combos globally
                    import('../data/all-modules').then(module => {
                        const card = module.ALL_CARDS.find(c => c.id === cardId);
                        if (card && card.crossPillarLinks) {
                            card.crossPillarLinks.forEach(link => {
                                // If target card is already completed, it's a combo!
                                if (get().completedCardIds.includes(link.targetId)) {
                                    const bonusXp = link.priority === 'critical' ? 25 
                                                  : link.priority === 'high' ? 15 
                                                  : link.priority === 'medium' ? 10 : 5;
                                    
                                    get().addCombo({
                                        cardId: card.id,
                                        targetId: link.targetId,
                                        xp: bonusXp,
                                        reason: link.reason
                                    });
                                }
                            });
                        }
                    });
                }
            },

            completeBossFight: (bfId: string, xp: number) => {
                const { completedBossFights } = get();
                if (!completedBossFights.includes(bfId)) {
                    set((state) => ({
                        completedBossFights: [...state.completedBossFights, bfId],
                        xp: state.xp + xp,
                        lastXPGain: { amount: xp, timestamp: Date.now() },
                        lastSaved: Date.now()
                    }));
                    set({ pendingCelebration: 'boss' });
                    get().recordActivity();
                    get().checkMilestones();
                    get().checkAchievements();
                }
            },

            addCombo: (comboData) => {
                const combo: ActivatedCombo = { ...comboData, timestamp: Date.now() };
                const oldLevel = get().getCurrentLevel();
                set((state) => ({
                    activatedCombos: [...state.activatedCombos, combo],
                    xp: state.xp + combo.xp,
                    lastXPGain: { amount: combo.xp, timestamp: Date.now() },
                    lastSaved: Date.now()
                }));
                const newLevel = get().getCurrentLevel();
                if (newLevel > oldLevel) {
                    set({ pendingCelebration: 'levelup' });
                }
                get().checkAchievements();
            },

            getCurrentLevel: () => {
                const { xp } = get();
                let currentLevel = 1;
                for (const level of LEVELS) {
                    if (xp >= level.minXP) {
                        currentLevel = level.level;
                    } else {
                        break;
                    }
                }
                return currentLevel;
            },

            setApiKey: (key: string) => set({ apiKey: key }),

            getApiKey: () => get().apiKey,

            cacheContent: (cardId: string, content: string) => set((state) => ({
                contentCache: {
                    ...state.contentCache,
                    [cardId]: { cardId, content, generatedDate: Date.now() }
                }
            })),

            getCachedContent: (cardId: string) => get().contentCache[cardId]?.content || null,

            saveReview: (cardId: string, success: boolean) => {
                const { reviews } = get();
                const intervals = [1, 3, 7, 21, 60];
                const existingReview = reviews.find(r => r.cardId === cardId);
                const now = Date.now();
                const retryDelayMs = 10 * 60 * 1000;

                let nextReviewItem: ReviewItem;

                if (existingReview && success) {
                    const nextLevel = success ? Math.min(intervals.length - 1, existingReview.level + 1) : 0;
                    nextReviewItem = {
                        ...existingReview,
                        level: nextLevel,
                        interval: intervals[nextLevel],
                        nextReview: now + intervals[nextLevel] * 24 * 60 * 60 * 1000,
                        updatedAt: now
                    };
                } else {
                    nextReviewItem = {
                        cardId,
                        level: 0,
                        interval: success ? intervals[0] : 0,
                        nextReview: success
                            ? now + intervals[0] * 24 * 60 * 60 * 1000
                            : now + retryDelayMs,
                        updatedAt: now
                    };
                }

                set((state) => ({
                    reviews: [...state.reviews.filter(r => r.cardId !== cardId), nextReviewItem],
                    lastSaved: Date.now()
                }));
                get().recordActivity();
                get().checkAchievements();
            },

            addContent: (cardId: string, markdown: string, source?: string) => set((state) => ({
                contentStore: {
                    ...state.contentStore,
                    [cardId]: { cardId, markdown, source: source || 'Manual', addedAt: Date.now() }
                }
            })),
            
            hasContent: (cardId: string) => !!get().contentStore[cardId],

            getContent: (cardId: string) => get().contentStore[cardId]?.markdown || null,

            removeContent: (cardId: string) => set((state) => {
                const { [cardId]: _, ...rest } = state.contentStore;
                return {
                    contentStore: rest
                };
            }),

            exportAllContent: () => {
                const { contentStore } = get();
                return JSON.stringify({
                    version: 1,
                    exportedAt: new Date().toISOString(),
                    cards: contentStore
                }, null, 2);
            },

            importAllContent: (json: string) => {
                try {
                    const data = JSON.parse(json);
                    if (!data.cards || typeof data.cards !== 'object') {
                        return { success: false, message: "Formato inválido: falta objeto 'cards'" };
                    }

                    set((state: GameState & GameActions) => ({
                        contentStore: {
                            ...state.contentStore,
                            ...data.cards
                        }
                    }));
                    return { success: true, message: `Importadas ${Object.keys(data.cards).length} lecciones.` };
                } catch (e) {
                    return { success: false, message: "Error al parsear JSON" };
                }
            },

            recordActivity: () => {
                const today = new Date().toISOString().split('T')[0];
                const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                const { studyLog, streakDays, maxStreakDays } = get();

                if (!studyLog.includes(today)) {
                    let newStreak = streakDays;
                    const lastDay = studyLog.length > 0 ? studyLog[studyLog.length - 1] : null;

                    if (lastDay === yesterday) {
                        newStreak += 1;
                    } else if (lastDay !== today) {
                        newStreak = 1;
                    }

                    set((state) => ({
                        studyLog: [...state.studyLog, today],
                        streakDays: newStreak,
                        maxStreakDays: Math.max(maxStreakDays, newStreak),
                        lastSaved: Date.now()
                    }));
                }
            },

            incrementStatsVisit: () => {
                set((state) => ({
                    statsVisitCount: state.statsVisitCount + 1
                }));
                get().checkAchievements();
            },

            clearSyncStatus: () => set({ syncStatus: 'idle', syncMessage: null, syncErrorMessage: null }),
            setCloudSyncKey: (key: string) => set({ cloudSyncKey: key.trim() }),
            setResponseDraft: (key: string, value: string) => set((state) => {
                const nextValue = value.trim();
                if (!nextValue) {
                    const { [key]: _, ...rest } = state.responseDrafts;
                    return {
                        responseDrafts: rest,
                        lastSaved: Date.now()
                    };
                }

                return {
                    responseDrafts: {
                        ...state.responseDrafts,
                        [key]: {
                            value,
                            updatedAt: Date.now()
                        }
                    },
                    lastSaved: Date.now()
                };
            }),
            clearResponseDraft: (key: string) => set((state) => {
                const { [key]: _, ...rest } = state.responseDrafts;
                return {
                    responseDrafts: rest,
                    lastSaved: Date.now()
                };
            }),

            syncToCloud: async ({ trigger = 'manual' } = {}) => {
                if (trigger === 'manual') {
                    set({ syncStatus: 'syncing', syncMessage: null, syncErrorMessage: null });
                } else {
                    set({ syncErrorMessage: null });
                }

                try {
                    const state = get();
                    const syncKey = resolveCloudSyncKey(state);
                    const gameState = buildCloudGameState(state);
                    
                    const { error } = await supabase
                        .from('user_progress')
                        .upsert({
                            device_id: syncKey,
                            game_state: gameState,
                            updated_at: new Date().toISOString()
                        }, { onConflict: 'device_id' });
                        
                    if (error) throw error;

                    if (trigger === 'manual') {
                        set({
                            syncStatus: 'success',
                            syncMessage: `Progreso guardado en la nube con la clave ${syncKey}.`,
                            syncErrorMessage: null,
                            lastSynced: Date.now()
                        });
                        queueSyncStatusReset(set);
                    } else {
                        set({
                            syncStatus: 'idle',
                            syncMessage: null,
                            syncErrorMessage: null,
                            lastSynced: Date.now()
                        });
                    }
                } catch (error) {
                    const message = formatSyncError(error);
                    console.error("Sync error:", error);
                    set({
                        syncStatus: 'error',
                        syncMessage: null,
                        syncErrorMessage: message
                    });
                    queueSyncStatusReset(set);
                }
            },

            loadFromCloud: async ({ trigger = 'manual' } = {}) => {
                if (trigger === 'manual') {
                    set({ syncStatus: 'syncing', syncMessage: null, syncErrorMessage: null });
                }

                try {
                    const state = get();
                    const syncKey = resolveCloudSyncKey(state);
                    const { data, error } = await supabase
                        .from('user_progress')
                        .select('game_state')
                        .eq('device_id', syncKey)
                        .single();
                        
                    if (error && error.code !== SUPABASE_NO_ROWS_ERROR) throw error;

                    if (data && data.game_state) {
                        const cloudState = normalizeCloudState(data.game_state as Partial<CloudGameState> | Partial<GameState>);

                        set((localState) => ({
                            progress: mergeProgressState(localState.progress, cloudState.progress),
                            syncStatus: trigger === 'manual' ? 'success' : 'idle',
                            syncMessage: trigger === 'manual'
                                ? `Se fusiono el progreso local con la nube para ${syncKey}.`
                                : null,
                            syncErrorMessage: null,
                            lastSynced: Date.now()
                        }));
                    } else {
                        set({
                            syncStatus: trigger === 'manual' ? 'success' : 'idle',
                            syncMessage: trigger === 'manual'
                                ? 'No había progreso en la nube todavía para esta clave.'
                                : null,
                            syncErrorMessage: null
                        });
                    }

                    if (trigger === 'manual') {
                        queueSyncStatusReset(set);
                    }
                } catch (error) {
                    const message = formatSyncError(error);
                    console.error("Load error:", error);
                    set({
                        syncStatus: 'error',
                        syncMessage: null,
                        syncErrorMessage: message
                    });
                    queueSyncStatusReset(set);
                }
            },

            checkMilestones: async () => {
                const state = get();
                const { PILLARS } = await import('../data/pillars');
                const { ALL_CARDS, ALL_BOSS_FIGHTS } = await import('../data/all-modules');

                PILLARS.forEach(pillar => {
                    if (state.completedMilestones.includes(pillar.id.toString())) return;

                    const pillarCards = ALL_CARDS.filter(c => c.id.startsWith(`${pillar.id}.`));
                    const completedPillarCards = pillarCards.filter(c => state.completedCardIds.includes(c.id));
                    const progressCards = pillarCards.length > 0 ? completedPillarCards.length / pillarCards.length : 1;

                    const pillarBosses = ALL_BOSS_FIGHTS.filter(bf => bf.moduleId.startsWith(`${pillar.id}.`));
                    const completedPillarBosses = pillarBosses.filter(bf => state.completedBossFights.includes(bf.id));
                    const progressBosses = pillarBosses.length > 0 ? completedPillarBosses.length / pillarBosses.length : 1;

                    if (progressCards === 1 && progressBosses === 1) {
                        set(s => {
                            const newMilestones = [...s.completedMilestones, pillar.id.toString()];
                            const achId = `pillar-master-${pillar.id}`;
                            const newAch = [...s.unlockedAchievements];
                            
                            if (!newAch.some(a => a.achievementId === achId)) {
                                newAch.push({ achievementId: achId, unlockedAt: Date.now() });
                            }
                            
                            return {
                                completedMilestones: newMilestones,
                                unlockedAchievements: newAch,
                                xp: s.xp + 300,
                                lastSaved: Date.now()
                            };
                        });
                    }
                });
            },

            checkAchievements: async () => {
                const state = get();
                const { ACHIEVEMENTS } = await import('../data/achievements');
                const { ALL_CARDS } = await import('../data/all-modules');
                
                const newUnlocks: string[] = [];
                let totalBonusXP = 0;

                ACHIEVEMENTS.forEach(ach => {
                    // Check if already unlocked
                    if (state.unlockedAchievements.some(u => u.achievementId === ach.id)) return;

                    let isMet = false;
                    const now = new Date();
                    const hour = now.getHours();

                    switch(ach.id) {
                        case "first-blood":
                            isMet = state.completedCardIds.length > 0;
                            break;
                        case "module-clear":
                            isMet = state.completedCardIds.length >= ALL_CARDS.length; 
                            break;
                        case "boss-slayer":
                            isMet = state.completedBossFights.length > 0;
                            break;
                        case "streak-7":
                            isMet = state.studyLog.length >= 7; // Simplification for MVP
                            break;
                        case "streak-30":
                            isMet = state.studyLog.length >= 30;
                            break;
                        case "toolsmith": {
                            const toolCount = state.completedCardIds.filter(id => 
                                ALL_CARDS.find(c => c.id === id)?.isTool
                            ).length;
                            isMet = toolCount >= 10;
                            break;
                        }
                        case "master-toolsmith": {
                            const toolCount = state.completedCardIds.filter(id => 
                                ALL_CARDS.find(c => c.id === id)?.isTool
                            ).length;
                            isMet = toolCount >= 20;
                            break;
                        }
                        case "cross-pollinator":
                            isMet = state.activatedCombos.length >= 3;
                            break;
                        case "recall-master":
                            isMet = state.reviews.length >= 5;
                            break;
                        case "night-owl":
                            isMet = hour >= 23 || hour < 4;
                            break;
                        case "early-bird":
                            isMet = hour >= 4 && hour < 7;
                            break;
                        case "content-creator":
                            isMet = Object.keys(state.contentStore).length >= 10;
                            break;
                        case "quest-warrior":
                            isMet = state.questHistory.length >= 7;
                            break;
                        case "quest-legend":
                            isMet = state.questHistory.length >= 30;
                            break;
                        case "tax-collector":
                            isMet = state.taxesPaid.length >= 5;
                            break;
                        case "shadow-walker":
                            isMet = state.shadowQuestHistory.length >= 5;
                            break;
                        case "devils-advocate":
                            isMet = state.mirrorMatchHistory.length >= 3;
                            break;
                        case "speed-thinker":
                            isMet = state.timeAttackHistory.filter(t => t.completed).length >= 5;
                            break;
                        case "lightning-fast":
                            isMet = state.timeAttackHistory.some(t => t.completed && (t.timeUsed || 99) < 15);
                            break;
                        case "self-aware":
                            isMet = state.debuffHistory.length >= 1;
                            break;
                        case "bias-hunter":
                            const uniqueBiases = new Set(state.debuffHistory.map(d => d.biasId));
                            isMet = uniqueBiases.size >= 10;
                            break;
                        case "polymath":
                            isMet = state.capstone.isCompleted;
                            break;
                        case "stat-nerd":
                            isMet = state.statsVisitCount >= 10;
                            break;
                    }

                    if (isMet) {
                        newUnlocks.push(ach.id);
                        totalBonusXP += ach.xpBonus;
                    }
                });

                if (newUnlocks.length > 0) {
                    set((state) => ({
                        unlockedAchievements: [
                            ...state.unlockedAchievements,
                            ...newUnlocks.map(id => ({ achievementId: id, unlockedAt: Date.now() }))
                        ],
                        xp: state.xp + totalBonusXP,
                        lastSaved: Date.now()
                    }));
                    
                    // Note: Achievement Toast will be handled via a listener or effect in the UI
                    // or we could add a temporary state for the "latest" unlocked achievement.
                    set({ latestUnlockedAchievement: ACHIEVEMENTS.find(a => a.id === newUnlocks[0]) });
                }

                // Check for Level Up (simulated since we don't have a previousXP state easily accessible without complex diffing)
                // For MVP, if leveling up happens, HUD will show it. 
                // We'll trigger leveling celebration in a separate way if needed.
            },

            clearLatestAchievement: () => set({ latestUnlockedAchievement: null }),

            clearCelebration: () => set({ pendingCelebration: null }),

            openTaxModal: () => set({ taxModalOpen: true }),
            closeTaxModal: () => set({ taxModalOpen: false }),

            checkTeachingTax: () => {
                const { completedCardIds, nextTaxAt, taxesPaid, isTaxDue } = get();
                if (isTaxDue) return; // Already pending
                if (completedCardIds.length !== nextTaxAt) return;

                // Prefer cards not yet used as tax
                const usedCardIds = new Set(taxesPaid.map(t => t.cardId));
                const unused = completedCardIds.filter(id => !usedCardIds.has(id));
                const pool = unused.length > 0 ? unused : completedCardIds;
                const randomId = pool[Math.floor(Math.random() * pool.length)];

                set({ currentTaxCard: randomId, isTaxDue: true, taxModalOpen: true });
            },

            payTeachingTax: (explanation: string, cardTitle: string) => {
                const { currentTaxCard, nextTaxAt } = get();
                if (!currentTaxCard) return;

                const words = explanation.trim().split(/\s+/).filter(Boolean);
                const entry: TeachingTaxEntry = {
                    id: `tax-${Date.now()}`,
                    cardId: currentTaxCard,
                    cardTitle,
                    explanation,
                    completedAt: Date.now(),
                    wordCount: words.length,
                };

                const taxIncrement = get().ngPlus.ngPlusCount > 0 ? 7 : 10;
                set((state) => ({
                    taxesPaid: [...state.taxesPaid, entry],
                    nextTaxAt: nextTaxAt + taxIncrement,
                    currentTaxCard: null,
                    isTaxDue: false,
                    taxModalOpen: false,
                    lastSaved: Date.now(),
                }));

                get().checkAchievements();
            },

            checkDailyQuest: async () => {
                const { dailyQuest, completedCardIds } = get();
                const today = new Date().toISOString().split('T')[0];

                // If we already have a quest for today, don't generate another
                if (dailyQuest && dailyQuest.date === today) return;

                // Need at least 2 cards to generate a quest
                if (completedCardIds.length < 2) return;

                const { QUEST_TEMPLATES } = await import('../data/quest-templates');
                const types: Array<'connection' | 'application' | 'contradiction'> = ['connection', 'application', 'contradiction'];
                const questType = types[Math.floor(Math.random() * types.length)];
                
                const templates = QUEST_TEMPLATES[questType];
                const template = templates[Math.floor(Math.random() * templates.length)];

                // Pick random completed cards based on template placeholders
                const placeholderCount = (template.match(/\{card\d+\}/g) || []).length;
                const shuffled = [...completedCardIds].sort(() => 0.5 - Math.random());
                
                if (shuffled.length < placeholderCount) return; // Not enough cards for THIS template

                const cardIds = shuffled.slice(0, placeholderCount);

                const { ALL_CARDS } = await import('../data/all-modules');
                const cardTitles = cardIds.map(id => ALL_CARDS.find(c => c.id === id)?.title || id);

                let question = template;
                cardTitles.forEach((title, index) => {
                    question = question.replace(new RegExp(`\\{card${index + 1}\\}`, 'g'), title);
                });

                const newQuest: DailyQuest = {
                    id: `quest-${today}`,
                    date: today,
                    type: questType,
                    cardIds,
                    question,
                    userAnswer: null,
                    completed: false,
                    completedAt: null,
                    xpReward: 25,
                    updatedAt: Date.now()
                };

                set({ dailyQuest: newQuest, lastSaved: Date.now() });
            },

            completeDailyQuest: (answer: string) => {
                const { dailyQuest } = get();
                if (!dailyQuest || dailyQuest.completed) return;

                const updatedQuest: DailyQuest = {
                    ...dailyQuest,
                    userAnswer: answer,
                    completed: true,
                    completedAt: Date.now(),
                    updatedAt: Date.now()
                };

                set((state) => ({
                    dailyQuest: updatedQuest,
                    questHistory: [...state.questHistory, updatedQuest],
                    xp: state.xp + dailyQuest.xpReward,
                    lastXPGain: { amount: dailyQuest.xpReward, timestamp: Date.now() },
                    lastSaved: Date.now()
                }));

                get().checkAchievements();
            },

            openShadowQuestModal: () => set({ shadowQuestModalOpen: true }),
            closeShadowQuestModal: () => set({ shadowQuestModalOpen: false }),

            checkShadowQuest: async () => {
                const { completedCardIds, activeShadowQuest } = get();
                // Check if we hit a multiple of 5 cards
                if (completedCardIds.length === 0 || completedCardIds.length % 5 !== 0) return;
                
                // If there's an active one, don't overwrite it (unless we want to? user said "it's generated randomly every 5 cards").
                // If it's already active, we don't need a new one until the current one is done or we hit next 5.
                if (activeShadowQuest) return;

                const lastCardId = completedCardIds[completedCardIds.length - 1];
                const { SHADOW_QUEST_TEMPLATES } = await import('../data/shadow-quests');
                const { ALL_CARDS } = await import('../data/all-modules');
                
                const card = ALL_CARDS.find(c => c.id === lastCardId);
                const templates = SHADOW_QUEST_TEMPLATES[lastCardId] || SHADOW_QUEST_TEMPLATES["_default"];
                const missionTemplate = templates[Math.floor(Math.random() * templates.length)];
                
                const mission = missionTemplate.replace(/\{cardTitle\}/g, card?.title || lastCardId);

                const newQuest: ShadowQuest = {
                    id: `shadow-${Date.now()}`,
                    cardId: lastCardId,
                    cardTitle: card?.title || lastCardId,
                    mission,
                    userObservation: null,
                    completed: false,
                    completedAt: null,
                    xpReward: 30,
                    updatedAt: Date.now()
                };

                set({ activeShadowQuest: newQuest, shadowQuestModalOpen: true, lastSaved: Date.now() });
            },

            completeShadowQuest: (observation: string) => {
                const { activeShadowQuest } = get();
                if (!activeShadowQuest) return;

                const completedQuest: ShadowQuest = {
                    ...activeShadowQuest,
                    userObservation: observation,
                    completed: true,
                    completedAt: Date.now(),
                    updatedAt: Date.now()
                };

                set((state) => ({
                    activeShadowQuest: null,
                    shadowQuestHistory: [...state.shadowQuestHistory, completedQuest],
                    xp: state.xp + activeShadowQuest.xpReward,
                    lastXPGain: { amount: activeShadowQuest.xpReward, timestamp: Date.now() },
                    shadowQuestModalOpen: false,
                    lastSaved: Date.now()
                }));

                get().checkAchievements();
            },

            openTimeAttackModal: () => set({ timeAttackModalOpen: true }),
            closeTimeAttackModal: () => set({ timeAttackModalOpen: false }),

            checkTimeAttack: async (isManual = false) => {
                const { completedCardIds, activeTimeAttack } = get();
                
                // If triggered manually, we ignore the card count
                if (!isManual) {
                    // Check if we hit a multiple of 6 cards
                    if (completedCardIds.length === 0 || completedCardIds.length % 6 !== 0) return;
                    if (activeTimeAttack) return;
                }

                // Pick a random completed card
                const pool = completedCardIds.length > 0 ? completedCardIds : [];
                if (pool.length === 0) return;
                
                const randomCardId = pool[Math.floor(Math.random() * pool.length)];

                const { TIME_ATTACK_TEMPLATES } = await import('../data/time-attack');
                const { ALL_CARDS } = await import('../data/all-modules');
                
                const card = ALL_CARDS.find(c => c.id === randomCardId);
                const templates = TIME_ATTACK_TEMPLATES[randomCardId] || TIME_ATTACK_TEMPLATES["_default"];
                const questionTemplate = templates[Math.floor(Math.random() * templates.length)];
                
                const question = questionTemplate.replace(/\{cardTitle\}/g, card?.title || randomCardId);

                const newAttack: TimeAttack = {
                    id: `ta-${Date.now()}`,
                    cardId: randomCardId,
                    cardTitle: card?.title || randomCardId,
                    question,
                    userAnswer: null,
                    timeLimit: get().ngPlus.ngPlusCount > 0 ? 45 : 60,
                    timeUsed: null,
                    completed: false,
                    completedAt: null,
                    xpReward: 20, // Base
                    updatedAt: Date.now()
                };

                set({ activeTimeAttack: newAttack, timeAttackModalOpen: true, lastSaved: Date.now() });
            },

            completeTimeAttack: (answer: string, secondsUsed: number) => {
                const { activeTimeAttack } = get();
                if (!activeTimeAttack) return;

                const isFast = secondsUsed < 30;
                const bonus = isFast ? 10 : 0;
                const totalXP = activeTimeAttack.xpReward + bonus;

                const completedAttack: TimeAttack = {
                    ...activeTimeAttack,
                    userAnswer: answer,
                    timeUsed: secondsUsed,
                    completed: true,
                    completedAt: Date.now(),
                    xpReward: totalXP,
                    updatedAt: Date.now()
                };

                set((state) => ({
                    activeTimeAttack: null,
                    timeAttackHistory: [...state.timeAttackHistory, completedAttack],
                    xp: state.xp + totalXP,
                    lastXPGain: { amount: totalXP, timestamp: Date.now() },
                    timeAttackModalOpen: false,
                    lastSaved: Date.now()
                }));

                get().checkAchievements();
            },

            openMirrorMatchModal: () => set({ mirrorMatchModalOpen: true }),
            closeMirrorMatchModal: () => set({ mirrorMatchModalOpen: false }),

            checkMirrorMatch: async () => {
                const { completedCardIds, activeMirrorMatch } = get();
                if (completedCardIds.length === 0 || completedCardIds.length % 8 !== 0) return;
                if (activeMirrorMatch) return;

                const lastCardId = completedCardIds[completedCardIds.length - 1];
                const { MIRROR_TEMPLATES } = await import('../data/mirror-matches');
                const { ALL_CARDS } = await import('../data/all-modules');

                const card = ALL_CARDS.find(c => c.id === lastCardId);
                const challengeTemplate = MIRROR_TEMPLATES[lastCardId] || MIRROR_TEMPLATES["_default"];
                const challenge = challengeTemplate.replace(/\{cardTitle\}/g, card?.title || lastCardId);

                const newMatch: MirrorMatch = {
                    id: `mirror-${Date.now()}`,
                    cardId: lastCardId,
                    cardTitle: card?.title || lastCardId,
                    challenge,
                    userArgument: null,
                    completed: false,
                    completedAt: null,
                    xpReward: get().ngPlus.ngPlusCount > 0 ? 60 : 40, // Increased reward for NG+
                    updatedAt: Date.now()
                };

                set({ activeMirrorMatch: newMatch, mirrorMatchModalOpen: true, lastSaved: Date.now() });
            },

            completeMirrorMatch: (argument: string) => {
                const { activeMirrorMatch } = get();
                if (!activeMirrorMatch) return;

                const completedMatch: MirrorMatch = {
                    ...activeMirrorMatch,
                    userArgument: argument,
                    completed: true,
                    completedAt: Date.now(),
                    updatedAt: Date.now(),
                };

                set((state) => ({
                    activeMirrorMatch: null,
                    mirrorMatchHistory: [...state.mirrorMatchHistory, completedMatch],
                    xp: state.xp + activeMirrorMatch.xpReward,
                    lastXPGain: { amount: activeMirrorMatch.xpReward, timestamp: Date.now() },
                    mirrorMatchModalOpen: false,
                    lastSaved: Date.now(),
                }));

                get().checkAchievements();
            },

            openDebuffPanel: () => set({ debuffPanelOpen: true }),
            closeDebuffPanel: () => set({ debuffPanelOpen: false }),

            applyDebuff: async (biasId: string, context: string) => {
                try {
                    const module = await import('../data/debuffs');
                    const bias = module.COGNITIVE_BIASES.find(b => b.id === biasId);
                    if (!bias) return;

                    const newDebuff: Debuff = {
                        id: `debuff-${Date.now()}`,
                        biasId,
                        biasName: bias.name,
                        description: bias.description,
                        detectedAt: Date.now(),
                        xpPenalty: XP_VALUES.DEBUFF_PENALTY,
                        context
                    };

                    set((state) => ({
                        debuffHistory: [...state.debuffHistory, newDebuff],
                        xp: Math.max(0, state.xp + XP_VALUES.DEBUFF_PENALTY),
                        lastXPGain: { amount: XP_VALUES.DEBUFF_PENALTY, timestamp: Date.now() },
                        lastSaved: Date.now()
                    }));

                    get().checkAchievements();
                } catch (error) {
                    console.error("Failed to load bias data:", error);
                }
            },

            openCapstonePanel: () => set({ capstonePanelOpen: true }),
            closeCapstonePanel: () => set({ capstonePanelOpen: false }),

            completeCapstone: (submission: string) => {
                const { capstone } = get();
                if (capstone.isCompleted) return;

                const updatedCapstone = {
                    ...capstone,
                    isCompleted: true,
                    completedAt: Date.now(),
                    submission,
                    updatedAt: Date.now()
                };

                set((state) => ({
                    capstone: updatedCapstone,
                    ngPlus: {
                        ...state.ngPlus,
                        isAvailable: true,
                        updatedAt: Date.now()
                    },
                    xp: state.xp + capstone.xpReward,
                    lastXPGain: { amount: capstone.xpReward, timestamp: Date.now() },
                    lastSaved: Date.now()
                }));

                get().checkAchievements();
            },

            startNewGamePlus: () => {
                const state = get();
                const lastRunEnd = state.ngPlus.previousRuns.length > 0 
                    ? state.ngPlus.previousRuns[state.ngPlus.previousRuns.length - 1].completedAt 
                    : 0;
                
                const runSummary: RunSummary = {
                    runNumber: state.ngPlus.ngPlusCount + 1,
                    completedAt: Date.now(),
                    totalXP: state.xp,
                    cardsCompleted: state.completedCardIds.length,
                    timeSpentDays: state.studyLog.filter(date => {
                        const dateMs = new Date(date).getTime();
                        return dateMs > lastRunEnd;
                    }).length || 1, // At least 1 day if it's the same day
                    achievementsEarned: state.unlockedAchievements.map(a => a.achievementId)
                };

                set((state) => ({
                    xp: 0,
                    completedCardIds: [],
                    completedBossFights: [],
                    activatedCombos: [],
                    reviews: [],
                    taxesPaid: [],
                    questHistory: [],
                    shadowQuestHistory: [],
                    timeAttackHistory: [],
                    mirrorMatchHistory: [],
                    debuffHistory: [],
                    nextTaxAt: 7,
                    ngPlus: {
                        isAvailable: false,
                        ngPlusCount: state.ngPlus.ngPlusCount + 1,
                        previousRuns: [...state.ngPlus.previousRuns, runSummary],
                        updatedAt: Date.now()
                    },
                    capstone: {
                        isUnlocked: false,
                        isCompleted: false,
                        completedAt: null,
                        submission: null,
                        xpReward: 500,
                        updatedAt: Date.now()
                    },
                    lastSaved: Date.now()
                }));

                get().checkAchievements();
            },

            setSyncId: (id: string) => set({ deviceId: id }),

            resetProgress: () => {
                const freshProgress = {
                    ...createInitialProgressState(),
                    lastSaved: Date.now()
                };

                set(() => ({
                    progress: freshProgress,
                    latestUnlockedAchievement: null,
                    statsVisitCount: 0,
                    pendingCelebration: null,
                    lastXPGain: null,
                    taxModalOpen: false,
                    shadowQuestModalOpen: false,
                    mirrorMatchModalOpen: false,
                    timeAttackModalOpen: false,
                    debuffPanelOpen: false,
                    capstonePanelOpen: false
                }));
            }
            });
        },
        {
            name: 'polymath-game-state',
            partialize: (state) => ({
                progress: buildProgressFromState(state),
                deviceId: state.deviceId,
                cloudSyncKey: state.cloudSyncKey,
                apiKey: state.apiKey,
                contentCache: state.contentCache,
                contentStore: state.contentStore,
                activePillar: state.activePillar,
                activeModuleId: state.activeModuleId
            }),
            merge: (persistedState, currentState) => {
                const persisted = persistedState as Partial<PersistedUserState & GameState>;
                const mergedProgress = mergeProgressState(
                    currentState.progress,
                    persisted.progress ?? persisted
                );

                return {
                    ...currentState,
                    deviceId: persisted.deviceId ?? currentState.deviceId,
                    cloudSyncKey: persisted.cloudSyncKey ?? currentState.cloudSyncKey,
                    apiKey: persisted.apiKey ?? currentState.apiKey,
                    contentCache: persisted.contentCache ?? currentState.contentCache,
                    contentStore: persisted.contentStore ?? currentState.contentStore,
                    activePillar: persisted.activePillar ?? currentState.activePillar,
                    activeModuleId: persisted.activeModuleId ?? currentState.activeModuleId,
                    progress: mergedProgress,
                    ...getProgressMirror(mergedProgress)
                };
            }
        }
    )
);
