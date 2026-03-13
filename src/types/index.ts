export type ConceptCard = {
    id: string;
    title: string;
    subtitle: string;
    type: 'fundamental' | 'intermediate' | 'advanced';
    xp: number;
    prerequisites: string[];
    isTool: boolean;
    isNew: boolean;
    isReframed: boolean;
    trigger?: string;
    crossPillarLinks: {
        targetId: string;
        priority: 'low' | 'medium' | 'high' | 'critical';
        reason: string;
    }[];
    auditNote: string | null;
    content?: string;
}

export type Milestone = {
    id: string;
    pillarId: number;
    title: string;
    description: string;
    xp: number;
    prerequisites: string[];
    status: 'locked' | 'unlocked' | 'completed';
}

export type Pillar = {
    id: number;
    name: string;
    description: string;
    typesAbsorbed: string[];
    modules: string[];
    totalCards: number;
    totalXP: number;
    milestone: Milestone;
    isCore?: boolean;
}

export type Module = {
    id: string;
    title: string;
    subtitle: string;
    quote: string;
    pillar: number;
    pillarName: string;
    totalCards: number;
}

export interface BossFight {
    id: string;
    moduleId: string;
    title: string;
    description: string;
    xp: number;
    prerequisites: string[];
}

export type Level = {
    level: number;
    minXP: number;
    title: string;
}

export type ReviewItem = {
    cardId: string;
    nextReview: number; // Timestamp
    interval: number; // Days (1, 3, 7, 21, 60)
    level: number; // 0-5 (SRS stage)
}

export interface CardContent {
    cardId: string;
    markdown: string;
    addedAt: number;
    source?: string;
}

export interface CachedContent {
    cardId: string;
    content: string;
    generatedDate: number;
}

export interface SavedResponseDraft {
    value: string;
    updatedAt: number;
}

export interface SavedResponseEntry {
    id: string;
    kind: 'card' | 'bossFight' | 'dailyQuest';
    status: 'draft' | 'completed';
    title: string;
    relatedId: string;
    content: string;
    updatedAt: number;
}

export interface ActivatedCombo {
    cardId: string;
    targetId: string;
    xp: number;
    timestamp: number;
    reason: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string; // Lucide icon name
    condition: string;
    xpBonus: number;
}

export interface UnlockedAchievement {
    achievementId: string;
    unlockedAt: number; // Timestamp
}

export interface TeachingTaxEntry {
    id: string;
    cardId: string;
    cardTitle: string;
    explanation: string;
    completedAt: number;
    wordCount: number;
}

export interface DailyQuest {
    id: string;
    date: string; // ISO date
    type: 'connection' | 'application' | 'contradiction';
    cardIds: string[];
    question: string;
    userAnswer: string | null;
    completed: boolean;
    completedAt: number | null;
    xpReward: number;
}

export interface TimeAttack {
    id: string;
    cardId: string;
    cardTitle: string;
    question: string;
    userAnswer: string | null;
    timeLimit: number;              // 60 segundos
    timeUsed: number | null;        // Segundos que tardó
    completed: boolean;
    completedAt: number | null;
    xpReward: number;               // 20 XP base, +10 bonus si < 30 seg
}

export interface ShadowQuest {
    id: string;
    cardId: string;                  // Card asociada
    cardTitle: string;               // Título de la card para contexto
    mission: string;                 // La misión de observación
    userObservation: string | null;  // Lo que escribió
    completed: boolean;
    completedAt: number | null;
    xpReward: number;                // 30 XP
}

export interface MirrorMatch {
    id: string;
    cardId: string;
    cardTitle: string;
    challenge: string;               // El desafío adversarial
    userArgument: string | null;
    completed: boolean;
    completedAt: number | null;
    xpReward: number;                // 40 XP
}

export interface Debuff {
    id: string;
    biasId: string;                  // "confirmation", "anchoring", etc.
    biasName: string;                // "Sesgo de confirmación"
    description: string;
    detectedAt: number;
    xpPenalty: number;               // -10 XP (simbólico)
    context: string;                 // Lo que el usuario escribió
}

export interface BiasDefinition {
    id: string;
    name: string;
    question: string;
    description: string;
    icon: string;
}

export interface CapstoneState {
    isUnlocked: boolean;
    isCompleted: boolean;
    completedAt: number | null;
    submission: string | null;
    xpReward: number;               // 500 XP
}

export interface GameState {
    deviceId: string;
    cloudSyncKey: string;
    responseDrafts: Record<string, SavedResponseDraft>;
    syncStatus: 'idle' | 'syncing' | 'error' | 'success';
    syncMessage: string | null;
    syncErrorMessage: string | null;
    lastSynced: number | null;
    activePillar: number | null;
    activeModuleId: string;
    xp: number;
    completedMilestones: string[];
    completedCardIds: string[];
    completedBossFights: string[];
    activatedCombos: ActivatedCombo[];
    reviews: ReviewItem[];
    apiKey: string | null;
    contentCache: Record<string, CachedContent>;
    contentStore: Record<string, CardContent>;
    unlockedAchievements: UnlockedAchievement[];
    latestUnlockedAchievement: Achievement | null;
    streakDays: number;
    maxStreakDays: number;
    statsVisitCount: number;
    pendingCelebration: 'levelup' | 'boss' | 'achievement' | null;
    lastXPGain: { amount: number, timestamp: number } | null;
    studyLog: string[]; // Array of YYYY-MM-DD strings
    lastSaved: number;
    taxesPaid: TeachingTaxEntry[];
    nextTaxAt: number;
    currentTaxCard: string | null;
    isTaxDue: boolean;
    taxModalOpen: boolean;
    dailyQuest: DailyQuest | null;
    questHistory: DailyQuest[];
    activeShadowQuest: ShadowQuest | null;
    shadowQuestHistory: ShadowQuest[];
    shadowQuestModalOpen: boolean;
    activeMirrorMatch: MirrorMatch | null;
    mirrorMatchHistory: MirrorMatch[];
    mirrorMatchModalOpen: boolean;
    activeTimeAttack: TimeAttack | null;
    timeAttackHistory: TimeAttack[];
    timeAttackModalOpen: boolean;
    debuffHistory: Debuff[];
    debuffPanelOpen: boolean;
    capstone: CapstoneState;
    capstonePanelOpen: boolean;
    ngPlus: NewGamePlusState;
}

export interface RunSummary {
    runNumber: number;
    completedAt: number;
    totalXP: number;
    cardsCompleted: number;
    timeSpentDays: number;
    achievementsEarned: string[];
}

export interface NewGamePlusState {
    isAvailable: boolean;
    ngPlusCount: number;
    previousRuns: RunSummary[];
}
