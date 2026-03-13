import type {
    CapstoneState,
    DailyQuest,
    Debuff,
    GameState,
    MirrorMatch,
    PersistedUserState,
    RunSummary,
    ShadowQuest,
    TimeAttack,
    UnlockedAchievement,
    UserProgressState
} from '../types';
import { mergeResponseDrafts, normalizeResponseDrafts } from '../utils/savedResponses';

type ProgressSource = Partial<UserProgressState> & Partial<GameState> & {
    progress?: Partial<UserProgressState> | null;
};

const createInitialCapstone = (): CapstoneState => ({
    isUnlocked: false,
    isCompleted: false,
    completedAt: null,
    submission: null,
    xpReward: 500
});

const createInitialRuns = (): RunSummary[] => [];

const cloneAchievements = (items: UnlockedAchievement[] | undefined) => items ? [...items] : [];
const cloneDailyQuests = (items: DailyQuest[] | undefined) => items ? [...items] : [];
const cloneShadowQuests = (items: ShadowQuest[] | undefined) => items ? [...items] : [];
const cloneMirrorMatches = (items: MirrorMatch[] | undefined) => items ? [...items] : [];
const cloneTimeAttacks = (items: TimeAttack[] | undefined) => items ? [...items] : [];
const cloneDebuffs = (items: Debuff[] | undefined) => items ? [...items] : [];
const cloneStrings = (items: string[] | undefined) => items ? [...items] : [];

export const createInitialProgressState = (): UserProgressState => ({
    xp: 0,
    completedMilestones: [],
    completedCardIds: [],
    completedBossFights: [],
    activatedCombos: [],
    reviews: [],
    responseDrafts: {},
    unlockedAchievements: [],
    streakDays: 0,
    maxStreakDays: 0,
    studyLog: [],
    taxesPaid: [],
    nextTaxAt: 10,
    currentTaxCard: null,
    isTaxDue: false,
    dailyQuest: null,
    questHistory: [],
    activeShadowQuest: null,
    shadowQuestHistory: [],
    activeMirrorMatch: null,
    mirrorMatchHistory: [],
    activeTimeAttack: null,
    timeAttackHistory: [],
    debuffHistory: [],
    capstone: createInitialCapstone(),
    ngPlus: {
        isAvailable: false,
        ngPlusCount: 0,
        previousRuns: createInitialRuns()
    },
    lastSaved: 0
});

export const hasMeaningfulProgress = (progress: Partial<UserProgressState> | Partial<GameState>) => {
    const normalized = migrateLegacyProgressState(progress, 0);

    return normalized.xp > 0
        || normalized.completedCardIds.length > 0
        || normalized.completedBossFights.length > 0
        || normalized.completedMilestones.length > 0
        || normalized.reviews.length > 0
        || normalized.unlockedAchievements.length > 0
        || normalized.studyLog.length > 0
        || normalized.taxesPaid.length > 0
        || normalized.questHistory.length > 0
        || normalized.shadowQuestHistory.length > 0
        || normalized.mirrorMatchHistory.length > 0
        || normalized.timeAttackHistory.length > 0
        || normalized.debuffHistory.length > 0
        || Object.keys(normalized.responseDrafts).length > 0
        || normalized.dailyQuest?.completed === true
        || normalized.activeShadowQuest !== null
        || normalized.activeMirrorMatch !== null
        || normalized.activeTimeAttack !== null
        || normalized.capstone.isCompleted
        || normalized.ngPlus.ngPlusCount > 0;
};

export const getProgressMirror = (progress: UserProgressState) => ({
    xp: progress.xp,
    completedMilestones: progress.completedMilestones,
    completedCardIds: progress.completedCardIds,
    completedBossFights: progress.completedBossFights,
    activatedCombos: progress.activatedCombos,
    reviews: progress.reviews,
    responseDrafts: progress.responseDrafts,
    unlockedAchievements: progress.unlockedAchievements,
    streakDays: progress.streakDays,
    maxStreakDays: progress.maxStreakDays,
    studyLog: progress.studyLog,
    taxesPaid: progress.taxesPaid,
    nextTaxAt: progress.nextTaxAt,
    currentTaxCard: progress.currentTaxCard,
    isTaxDue: progress.isTaxDue,
    dailyQuest: progress.dailyQuest,
    questHistory: progress.questHistory,
    activeShadowQuest: progress.activeShadowQuest,
    shadowQuestHistory: progress.shadowQuestHistory,
    activeMirrorMatch: progress.activeMirrorMatch,
    mirrorMatchHistory: progress.mirrorMatchHistory,
    activeTimeAttack: progress.activeTimeAttack,
    timeAttackHistory: progress.timeAttackHistory,
    debuffHistory: progress.debuffHistory,
    capstone: progress.capstone,
    ngPlus: progress.ngPlus,
    lastSaved: progress.lastSaved
});

export const buildProgressFromState = (state: ProgressSource): UserProgressState => {
    const seed = state.progress
        ? migrateLegacyProgressState(state.progress, state.lastSaved ?? Date.now())
        : createInitialProgressState();
    const fallbackLastSaved = state.lastSaved ?? seed.lastSaved ?? Date.now();

    return {
        xp: state.xp ?? seed.xp,
        completedMilestones: state.completedMilestones ?? seed.completedMilestones,
        completedCardIds: state.completedCardIds ?? seed.completedCardIds,
        completedBossFights: state.completedBossFights ?? seed.completedBossFights,
        activatedCombos: state.activatedCombos ?? seed.activatedCombos,
        reviews: state.reviews ?? seed.reviews,
        responseDrafts: normalizeResponseDrafts(state.responseDrafts ?? seed.responseDrafts, fallbackLastSaved),
        unlockedAchievements: state.unlockedAchievements ?? seed.unlockedAchievements,
        streakDays: state.streakDays ?? seed.streakDays,
        maxStreakDays: state.maxStreakDays ?? seed.maxStreakDays,
        studyLog: state.studyLog ?? seed.studyLog,
        taxesPaid: state.taxesPaid ?? seed.taxesPaid,
        nextTaxAt: state.nextTaxAt ?? seed.nextTaxAt,
        currentTaxCard: state.currentTaxCard ?? seed.currentTaxCard,
        isTaxDue: state.isTaxDue ?? seed.isTaxDue,
        dailyQuest: state.dailyQuest ?? seed.dailyQuest,
        questHistory: state.questHistory ?? seed.questHistory,
        activeShadowQuest: state.activeShadowQuest ?? seed.activeShadowQuest,
        shadowQuestHistory: state.shadowQuestHistory ?? seed.shadowQuestHistory,
        activeMirrorMatch: state.activeMirrorMatch ?? seed.activeMirrorMatch,
        mirrorMatchHistory: state.mirrorMatchHistory ?? seed.mirrorMatchHistory,
        activeTimeAttack: state.activeTimeAttack ?? seed.activeTimeAttack,
        timeAttackHistory: state.timeAttackHistory ?? seed.timeAttackHistory,
        debuffHistory: state.debuffHistory ?? seed.debuffHistory,
        capstone: state.capstone ?? seed.capstone,
        ngPlus: state.ngPlus ?? seed.ngPlus,
        lastSaved: fallbackLastSaved
    };
};

export const migrateLegacyProgressState = (
    source: Partial<UserProgressState> | Partial<GameState> | PersistedUserState | null | undefined,
    fallbackLastSaved: number
): UserProgressState => {
    const candidate = (source && typeof source === 'object'
        ? ('progress' in source && source.progress ? source.progress : source)
        : {}) as Partial<UserProgressState> & Partial<GameState>;
    const initial = createInitialProgressState();
    const lastSaved = candidate.lastSaved ?? fallbackLastSaved ?? initial.lastSaved;

    return {
        xp: candidate.xp ?? initial.xp,
        completedMilestones: cloneStrings(candidate.completedMilestones) || initial.completedMilestones,
        completedCardIds: cloneStrings(candidate.completedCardIds) || initial.completedCardIds,
        completedBossFights: cloneStrings(candidate.completedBossFights) || initial.completedBossFights,
        activatedCombos: candidate.activatedCombos ? [...candidate.activatedCombos] : initial.activatedCombos,
        reviews: candidate.reviews ? [...candidate.reviews] : initial.reviews,
        responseDrafts: normalizeResponseDrafts(candidate.responseDrafts, lastSaved),
        unlockedAchievements: cloneAchievements(candidate.unlockedAchievements),
        streakDays: candidate.streakDays ?? initial.streakDays,
        maxStreakDays: candidate.maxStreakDays ?? initial.maxStreakDays,
        studyLog: cloneStrings(candidate.studyLog),
        taxesPaid: candidate.taxesPaid ? [...candidate.taxesPaid] : initial.taxesPaid,
        nextTaxAt: candidate.nextTaxAt ?? initial.nextTaxAt,
        currentTaxCard: candidate.currentTaxCard ?? initial.currentTaxCard,
        isTaxDue: candidate.isTaxDue ?? initial.isTaxDue,
        dailyQuest: candidate.dailyQuest ?? initial.dailyQuest,
        questHistory: cloneDailyQuests(candidate.questHistory),
        activeShadowQuest: candidate.activeShadowQuest ?? initial.activeShadowQuest,
        shadowQuestHistory: cloneShadowQuests(candidate.shadowQuestHistory),
        activeMirrorMatch: candidate.activeMirrorMatch ?? initial.activeMirrorMatch,
        mirrorMatchHistory: cloneMirrorMatches(candidate.mirrorMatchHistory),
        activeTimeAttack: candidate.activeTimeAttack ?? initial.activeTimeAttack,
        timeAttackHistory: cloneTimeAttacks(candidate.timeAttackHistory),
        debuffHistory: cloneDebuffs(candidate.debuffHistory),
        capstone: candidate.capstone ?? initial.capstone,
        ngPlus: candidate.ngPlus ?? initial.ngPlus,
        lastSaved
    };
};

export const mergeProgressState = (
    local: Partial<UserProgressState> | Partial<GameState>,
    incoming: Partial<UserProgressState> | Partial<GameState>
): UserProgressState => {
    const localProgress = migrateLegacyProgressState(local, local.lastSaved ?? Date.now());
    const incomingProgress = migrateLegacyProgressState(incoming, incoming.lastSaved ?? localProgress.lastSaved);
    const localHasProgress = hasMeaningfulProgress(localProgress);
    const incomingHasProgress = hasMeaningfulProgress(incomingProgress);
    const incomingIsNewer = !localHasProgress && incomingHasProgress
        ? true
        : localHasProgress && !incomingHasProgress
            ? false
            : incomingProgress.lastSaved >= localProgress.lastSaved;
    const primary = incomingIsNewer ? incomingProgress : localProgress;
    const secondary = incomingIsNewer ? localProgress : incomingProgress;

    return {
        ...secondary,
        ...primary,
        responseDrafts: mergeResponseDrafts(
            localProgress.responseDrafts,
            incomingProgress.responseDrafts,
            localProgress.lastSaved,
            incomingProgress.lastSaved
        ),
        lastSaved: Math.max(localProgress.lastSaved, incomingProgress.lastSaved)
    };
};

export const getDefaultStoreState = () => {
    const progress = createInitialProgressState();

    return {
        deviceId: crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`,
        cloudSyncKey: '',
        progress,
        ...getProgressMirror(progress),
        syncStatus: 'idle' as const,
        syncMessage: null,
        syncErrorMessage: null,
        lastSynced: null,
        activePillar: null,
        activeModuleId: '1.1',
        apiKey: null,
        contentCache: {},
        contentStore: {},
        editingCardId: null,
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
    };
};
