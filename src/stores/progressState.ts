import { ACHIEVEMENTS } from '../data/achievements';
import { ALL_BOSS_FIGHTS, ALL_CARDS } from '../data/all-modules';
import { PILLARS } from '../data/pillars';
import type {
    ActivatedCombo,
    CapstoneState,
    DailyQuest,
    GameState,
    MirrorMatch,
    NewGamePlusState,
    PersistedUserState,
    ReviewItem,
    ShadowQuest,
    TimeAttack,
    UnlockedAchievement,
    UserProgressState
} from '../types';
import { mergeResponseDrafts, normalizeResponseDrafts } from '../utils/savedResponses';

type ProgressSource = Partial<UserProgressState> & Partial<GameState> & {
    progress?: Partial<UserProgressState> | null;
};

type EntityWithId = {
    id: string;
};

const CARD_XP_BY_ID = new Map(ALL_CARDS.map((card) => [card.id, card.xp]));
const BOSS_XP_BY_ID = new Map(ALL_BOSS_FIGHTS.map((boss) => [boss.id, boss.xp]));
const MILESTONE_XP_BY_ID = new Map(
    PILLARS.flatMap((pillar) => [
        [pillar.id.toString(), pillar.milestone.xp] as const,
        [pillar.milestone.id, pillar.milestone.xp] as const
    ])
);
const ACHIEVEMENT_XP_BY_ID = new Map(ACHIEVEMENTS.map((achievement) => [achievement.id, achievement.xpBonus]));

const createInitialCapstone = (): CapstoneState => ({
    isUnlocked: false,
    isCompleted: false,
    completedAt: null,
    submission: null,
    xpReward: 500,
    updatedAt: 0
});

const createInitialNgPlus = (): NewGamePlusState => ({
    isAvailable: false,
    ngPlusCount: 0,
    previousRuns: [],
    updatedAt: 0
});

const cloneStrings = (items: string[] | undefined) => items ? [...items] : [];

const uniqueStrings = (...groups: Array<string[] | undefined>) => {
    const seen = new Set<string>();
    const result: string[] = [];

    groups.forEach((group) => {
        group?.forEach((item) => {
            if (!item || seen.has(item)) {
                return;
            }

            seen.add(item);
            result.push(item);
        });
    });

    return result;
};

const mergeRecordsById = <T extends EntityWithId>(
    local: T[],
    incoming: T[],
    getUpdatedAt: (item: T) => number
) => {
    const merged = new Map<string, T>();

    [...local, ...incoming].forEach((item) => {
        const existing = merged.get(item.id);
        if (!existing || getUpdatedAt(item) >= getUpdatedAt(existing)) {
            merged.set(item.id, item);
        }
    });

    return Array.from(merged.values()).sort((a, b) => getUpdatedAt(a) - getUpdatedAt(b));
};

const mergeReviewsByCard = (local: ReviewItem[], incoming: ReviewItem[]) => {
    const merged = new Map<string, ReviewItem>();

    [...local, ...incoming].forEach((review) => {
        const existing = merged.get(review.cardId);
        if (!existing || review.updatedAt >= existing.updatedAt) {
            merged.set(review.cardId, review);
        }
    });

    return Array.from(merged.values()).sort((a, b) => a.updatedAt - b.updatedAt);
};

const mergeAchievements = (local: UnlockedAchievement[], incoming: UnlockedAchievement[]) => {
    const merged = new Map<string, UnlockedAchievement>();

    [...local, ...incoming].forEach((achievement) => {
        const existing = merged.get(achievement.achievementId);
        if (!existing || achievement.unlockedAt < existing.unlockedAt) {
            merged.set(achievement.achievementId, achievement);
        }
    });

    return Array.from(merged.values()).sort((a, b) => a.unlockedAt - b.unlockedAt);
};

const mergeCombos = (local: ActivatedCombo[], incoming: ActivatedCombo[]) => {
    const merged = new Map<string, ActivatedCombo>();

    [...local, ...incoming].forEach((combo) => {
        const key = `${combo.cardId}|${combo.targetId}`;
        const existing = merged.get(key);
        if (!existing || combo.timestamp >= existing.timestamp) {
            merged.set(key, combo);
        }
    });

    return Array.from(merged.values()).sort((a, b) => a.timestamp - b.timestamp);
};

const normalizeReview = (review: ReviewItem, fallbackUpdatedAt: number): ReviewItem => ({
    ...review,
    updatedAt: review.updatedAt ?? review.nextReview ?? fallbackUpdatedAt
});

const normalizeDailyQuest = (quest: Partial<DailyQuest> | null | undefined, fallbackUpdatedAt: number): DailyQuest | null => {
    if (!quest) {
        return null;
    }

    return {
        id: quest.id ?? `quest-${new Date(fallbackUpdatedAt || Date.now()).toISOString().split('T')[0]}`,
        date: quest.date ?? new Date(fallbackUpdatedAt || Date.now()).toISOString().split('T')[0],
        type: quest.type ?? 'connection',
        cardIds: cloneStrings(quest.cardIds),
        question: quest.question ?? '',
        userAnswer: quest.userAnswer ?? null,
        completed: quest.completed ?? false,
        completedAt: quest.completedAt ?? null,
        xpReward: quest.xpReward ?? 25,
        updatedAt: quest.updatedAt ?? quest.completedAt ?? fallbackUpdatedAt
    };
};

const normalizeShadowQuest = (
    quest: Partial<ShadowQuest> | null | undefined,
    fallbackUpdatedAt: number
): ShadowQuest | null => {
    if (!quest) {
        return null;
    }

    return {
        id: quest.id ?? `shadow-${fallbackUpdatedAt}`,
        cardId: quest.cardId ?? '',
        cardTitle: quest.cardTitle ?? quest.cardId ?? '',
        mission: quest.mission ?? '',
        userObservation: quest.userObservation ?? null,
        completed: quest.completed ?? false,
        completedAt: quest.completedAt ?? null,
        xpReward: quest.xpReward ?? 30,
        updatedAt: quest.updatedAt ?? quest.completedAt ?? fallbackUpdatedAt
    };
};

const normalizeMirrorMatch = (
    match: Partial<MirrorMatch> | null | undefined,
    fallbackUpdatedAt: number
): MirrorMatch | null => {
    if (!match) {
        return null;
    }

    return {
        id: match.id ?? `mirror-${fallbackUpdatedAt}`,
        cardId: match.cardId ?? '',
        cardTitle: match.cardTitle ?? match.cardId ?? '',
        challenge: match.challenge ?? '',
        userArgument: match.userArgument ?? null,
        completed: match.completed ?? false,
        completedAt: match.completedAt ?? null,
        xpReward: match.xpReward ?? 40,
        updatedAt: match.updatedAt ?? match.completedAt ?? fallbackUpdatedAt
    };
};

const normalizeTimeAttack = (
    attack: Partial<TimeAttack> | null | undefined,
    fallbackUpdatedAt: number
): TimeAttack | null => {
    if (!attack) {
        return null;
    }

    return {
        id: attack.id ?? `ta-${fallbackUpdatedAt}`,
        cardId: attack.cardId ?? '',
        cardTitle: attack.cardTitle ?? attack.cardId ?? '',
        question: attack.question ?? '',
        userAnswer: attack.userAnswer ?? null,
        timeLimit: attack.timeLimit ?? 60,
        timeUsed: attack.timeUsed ?? null,
        completed: attack.completed ?? false,
        completedAt: attack.completedAt ?? null,
        xpReward: attack.xpReward ?? 20,
        updatedAt: attack.updatedAt ?? attack.completedAt ?? fallbackUpdatedAt
    };
};

const normalizeCapstone = (
    capstone: Partial<CapstoneState> | null | undefined,
    fallbackUpdatedAt: number
): CapstoneState => {
    const initial = createInitialCapstone();

    return {
        isUnlocked: capstone?.isUnlocked ?? initial.isUnlocked,
        isCompleted: capstone?.isCompleted ?? initial.isCompleted,
        completedAt: capstone?.completedAt ?? initial.completedAt,
        submission: capstone?.submission ?? initial.submission,
        xpReward: capstone?.xpReward ?? initial.xpReward,
        updatedAt: capstone?.updatedAt ?? capstone?.completedAt ?? fallbackUpdatedAt ?? initial.updatedAt
    };
};

const normalizeNgPlus = (
    ngPlus: Partial<NewGamePlusState> | null | undefined,
    fallbackUpdatedAt: number
): NewGamePlusState => {
    const initial = createInitialNgPlus();
    const previousRuns = ngPlus?.previousRuns ? [...ngPlus.previousRuns] : initial.previousRuns;
    const latestRun = previousRuns[previousRuns.length - 1];

    return {
        isAvailable: ngPlus?.isAvailable ?? initial.isAvailable,
        ngPlusCount: ngPlus?.ngPlusCount ?? initial.ngPlusCount,
        previousRuns,
        updatedAt: ngPlus?.updatedAt ?? latestRun?.completedAt ?? fallbackUpdatedAt ?? initial.updatedAt
    };
};

const chooseLatestEntity = <T extends EntityWithId & { completed?: boolean | null; updatedAt: number }>(
    local: T | null,
    incoming: T | null
) => {
    if (!local) {
        return incoming;
    }

    if (!incoming) {
        return local;
    }

    if (local.id === incoming.id) {
        if ((incoming.completed ?? false) && !(local.completed ?? false)) {
            return incoming;
        }

        if ((local.completed ?? false) && !(incoming.completed ?? false)) {
            return local;
        }
    }

    return incoming.updatedAt >= local.updatedAt ? incoming : local;
};

const clearIfCompletedInHistory = <T extends EntityWithId>(active: T | null, history: T[]) => {
    if (!active) {
        return null;
    }

    return history.some((entry) => entry.id === active.id) ? null : active;
};

const mergeCapstone = (local: CapstoneState, incoming: CapstoneState) => {
    const completed = local.isCompleted || incoming.isCompleted;
    const completedCandidate = completed
        ? (incoming.completedAt ?? 0) >= (local.completedAt ?? 0) ? incoming : local
        : null;
    const newer = incoming.updatedAt >= local.updatedAt ? incoming : local;

    return {
        ...newer,
        isUnlocked: local.isUnlocked || incoming.isUnlocked || newer.isUnlocked,
        isCompleted: completed,
        completedAt: completedCandidate?.completedAt ?? newer.completedAt,
        submission: completedCandidate?.submission ?? newer.submission,
        xpReward: completedCandidate?.xpReward ?? newer.xpReward,
        updatedAt: Math.max(local.updatedAt, incoming.updatedAt)
    };
};

const mergeNgPlus = (local: NewGamePlusState, incoming: NewGamePlusState) => {
    const previousRuns = mergeRecordsById(
        local.previousRuns.map((run) => ({ ...run, id: `run-${run.runNumber}` })),
        incoming.previousRuns.map((run) => ({ ...run, id: `run-${run.runNumber}` })),
        (run) => run.completedAt
    ).map(({ id: _ignored, ...run }) => run);

    return {
        isAvailable: local.isAvailable || incoming.isAvailable,
        ngPlusCount: Math.max(local.ngPlusCount, incoming.ngPlusCount),
        previousRuns,
        updatedAt: Math.max(local.updatedAt, incoming.updatedAt)
    };
};

const resolveTaxState = (local: UserProgressState, incoming: UserProgressState) => {
    const candidates = [local, incoming].sort((a, b) => b.lastSaved - a.lastSaved);
    const active = candidates.find((candidate) => candidate.isTaxDue && candidate.currentTaxCard);

    return {
        nextTaxAt: Math.max(local.nextTaxAt, incoming.nextTaxAt),
        currentTaxCard: active?.currentTaxCard ?? null,
        isTaxDue: Boolean(active?.currentTaxCard)
    };
};

const recalculateProgressXP = (
    progress: UserProgressState,
    localXP: number,
    incomingXP: number
) => {
    let total = 0;
    let usedFallback = false;

    progress.completedCardIds.forEach((cardId) => {
        const xp = CARD_XP_BY_ID.get(cardId);
        if (typeof xp === 'number') {
            total += xp;
        } else {
            usedFallback = true;
        }
    });

    progress.completedBossFights.forEach((bossId) => {
        const xp = BOSS_XP_BY_ID.get(bossId);
        if (typeof xp === 'number') {
            total += xp;
        } else {
            usedFallback = true;
        }
    });

    progress.completedMilestones.forEach((milestoneId) => {
        const xp = MILESTONE_XP_BY_ID.get(milestoneId);
        if (typeof xp === 'number') {
            total += xp;
        } else {
            usedFallback = true;
        }
    });

    progress.activatedCombos.forEach((combo) => {
        total += combo.xp;
    });

    progress.unlockedAchievements.forEach((achievement) => {
        const xp = ACHIEVEMENT_XP_BY_ID.get(achievement.achievementId);
        if (typeof xp === 'number') {
            total += xp;
        } else {
            usedFallback = true;
        }
    });

    progress.questHistory.forEach((quest) => {
        if (quest.completed) {
            total += quest.xpReward;
        }
    });

    if (
        progress.dailyQuest?.completed
        && !progress.questHistory.some((quest) => quest.id === progress.dailyQuest?.id)
    ) {
        total += progress.dailyQuest.xpReward;
    }

    progress.shadowQuestHistory.forEach((quest) => {
        if (quest.completed) {
            total += quest.xpReward;
        }
    });

    progress.mirrorMatchHistory.forEach((match) => {
        if (match.completed) {
            total += match.xpReward;
        }
    });

    progress.timeAttackHistory.forEach((attack) => {
        if (attack.completed) {
            total += attack.xpReward;
        }
    });

    progress.debuffHistory.forEach((debuff) => {
        total += debuff.xpPenalty;
    });

    if (progress.capstone.isCompleted) {
        total += progress.capstone.xpReward;
    }

    return usedFallback ? Math.max(total, localXP, incomingXP) : total;
};

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
    ngPlus: createInitialNgPlus(),
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
        reviews: (state.reviews ?? seed.reviews).map((review) => normalizeReview(review, fallbackLastSaved)),
        responseDrafts: normalizeResponseDrafts(state.responseDrafts ?? seed.responseDrafts, fallbackLastSaved),
        unlockedAchievements: state.unlockedAchievements ?? seed.unlockedAchievements,
        streakDays: state.streakDays ?? seed.streakDays,
        maxStreakDays: state.maxStreakDays ?? seed.maxStreakDays,
        studyLog: state.studyLog ?? seed.studyLog,
        taxesPaid: state.taxesPaid ?? seed.taxesPaid,
        nextTaxAt: state.nextTaxAt ?? seed.nextTaxAt,
        currentTaxCard: state.currentTaxCard ?? seed.currentTaxCard,
        isTaxDue: state.isTaxDue ?? seed.isTaxDue,
        dailyQuest: normalizeDailyQuest(state.dailyQuest ?? seed.dailyQuest, fallbackLastSaved),
        questHistory: (state.questHistory ?? seed.questHistory)
            .map((quest) => normalizeDailyQuest(quest, fallbackLastSaved))
            .filter((quest): quest is DailyQuest => Boolean(quest)),
        activeShadowQuest: normalizeShadowQuest(state.activeShadowQuest ?? seed.activeShadowQuest, fallbackLastSaved),
        shadowQuestHistory: (state.shadowQuestHistory ?? seed.shadowQuestHistory)
            .map((quest) => normalizeShadowQuest(quest, fallbackLastSaved))
            .filter((quest): quest is ShadowQuest => Boolean(quest)),
        activeMirrorMatch: normalizeMirrorMatch(state.activeMirrorMatch ?? seed.activeMirrorMatch, fallbackLastSaved),
        mirrorMatchHistory: (state.mirrorMatchHistory ?? seed.mirrorMatchHistory)
            .map((match) => normalizeMirrorMatch(match, fallbackLastSaved))
            .filter((match): match is MirrorMatch => Boolean(match)),
        activeTimeAttack: normalizeTimeAttack(state.activeTimeAttack ?? seed.activeTimeAttack, fallbackLastSaved),
        timeAttackHistory: (state.timeAttackHistory ?? seed.timeAttackHistory)
            .map((attack) => normalizeTimeAttack(attack, fallbackLastSaved))
            .filter((attack): attack is TimeAttack => Boolean(attack)),
        debuffHistory: state.debuffHistory ?? seed.debuffHistory,
        capstone: normalizeCapstone(state.capstone ?? seed.capstone, fallbackLastSaved),
        ngPlus: normalizeNgPlus(state.ngPlus ?? seed.ngPlus, fallbackLastSaved),
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
        reviews: candidate.reviews ? candidate.reviews.map((review) => normalizeReview(review, lastSaved)) : initial.reviews,
        responseDrafts: normalizeResponseDrafts(candidate.responseDrafts, lastSaved),
        unlockedAchievements: candidate.unlockedAchievements ? [...candidate.unlockedAchievements] : initial.unlockedAchievements,
        streakDays: candidate.streakDays ?? initial.streakDays,
        maxStreakDays: candidate.maxStreakDays ?? initial.maxStreakDays,
        studyLog: cloneStrings(candidate.studyLog),
        taxesPaid: candidate.taxesPaid ? [...candidate.taxesPaid] : initial.taxesPaid,
        nextTaxAt: candidate.nextTaxAt ?? initial.nextTaxAt,
        currentTaxCard: candidate.currentTaxCard ?? initial.currentTaxCard,
        isTaxDue: candidate.isTaxDue ?? initial.isTaxDue,
        dailyQuest: normalizeDailyQuest(candidate.dailyQuest, lastSaved),
        questHistory: (candidate.questHistory ?? [])
            .map((quest) => normalizeDailyQuest(quest, lastSaved))
            .filter((quest): quest is DailyQuest => Boolean(quest)),
        activeShadowQuest: normalizeShadowQuest(candidate.activeShadowQuest, lastSaved),
        shadowQuestHistory: (candidate.shadowQuestHistory ?? [])
            .map((quest) => normalizeShadowQuest(quest, lastSaved))
            .filter((quest): quest is ShadowQuest => Boolean(quest)),
        activeMirrorMatch: normalizeMirrorMatch(candidate.activeMirrorMatch, lastSaved),
        mirrorMatchHistory: (candidate.mirrorMatchHistory ?? [])
            .map((match) => normalizeMirrorMatch(match, lastSaved))
            .filter((match): match is MirrorMatch => Boolean(match)),
        activeTimeAttack: normalizeTimeAttack(candidate.activeTimeAttack, lastSaved),
        timeAttackHistory: (candidate.timeAttackHistory ?? [])
            .map((attack) => normalizeTimeAttack(attack, lastSaved))
            .filter((attack): attack is TimeAttack => Boolean(attack)),
        debuffHistory: candidate.debuffHistory ? [...candidate.debuffHistory] : initial.debuffHistory,
        capstone: normalizeCapstone(candidate.capstone, lastSaved),
        ngPlus: normalizeNgPlus(candidate.ngPlus, lastSaved),
        lastSaved
    };
};

export const mergeProgressState = (
    local: Partial<UserProgressState> | Partial<GameState>,
    incoming: Partial<UserProgressState> | Partial<GameState>
): UserProgressState => {
    const localProgress = migrateLegacyProgressState(local, local.lastSaved ?? Date.now());
    const incomingProgress = migrateLegacyProgressState(incoming, incoming.lastSaved ?? localProgress.lastSaved);

    const mergedQuestHistory = mergeRecordsById(
        localProgress.questHistory,
        incomingProgress.questHistory,
        (quest) => quest.updatedAt
    );
    const mergedShadowHistory = mergeRecordsById(
        localProgress.shadowQuestHistory,
        incomingProgress.shadowQuestHistory,
        (quest) => quest.updatedAt
    );
    const mergedMirrorHistory = mergeRecordsById(
        localProgress.mirrorMatchHistory,
        incomingProgress.mirrorMatchHistory,
        (match) => match.updatedAt
    );
    const mergedTimeHistory = mergeRecordsById(
        localProgress.timeAttackHistory,
        incomingProgress.timeAttackHistory,
        (attack) => attack.updatedAt
    );
    const mergedTaxesPaid = mergeRecordsById(
        localProgress.taxesPaid,
        incomingProgress.taxesPaid,
        (entry) => entry.completedAt
    );

    const mergedCapstone = mergeCapstone(localProgress.capstone, incomingProgress.capstone);
    const mergedNgPlus = mergeNgPlus(localProgress.ngPlus, incomingProgress.ngPlus);
    const mergedDailyQuest = chooseLatestEntity(localProgress.dailyQuest, incomingProgress.dailyQuest);
    const mergedActiveShadowQuest = clearIfCompletedInHistory(
        chooseLatestEntity(localProgress.activeShadowQuest, incomingProgress.activeShadowQuest),
        mergedShadowHistory
    );
    const mergedActiveMirrorMatch = clearIfCompletedInHistory(
        chooseLatestEntity(localProgress.activeMirrorMatch, incomingProgress.activeMirrorMatch),
        mergedMirrorHistory
    );
    const mergedActiveTimeAttack = clearIfCompletedInHistory(
        chooseLatestEntity(localProgress.activeTimeAttack, incomingProgress.activeTimeAttack),
        mergedTimeHistory
    );
    const mergedTaxState = resolveTaxState(localProgress, incomingProgress);

    const mergedProgress: UserProgressState = {
        xp: 0,
        completedMilestones: uniqueStrings(localProgress.completedMilestones, incomingProgress.completedMilestones),
        completedCardIds: uniqueStrings(localProgress.completedCardIds, incomingProgress.completedCardIds),
        completedBossFights: uniqueStrings(localProgress.completedBossFights, incomingProgress.completedBossFights),
        activatedCombos: mergeCombos(localProgress.activatedCombos, incomingProgress.activatedCombos),
        reviews: mergeReviewsByCard(localProgress.reviews, incomingProgress.reviews),
        responseDrafts: mergeResponseDrafts(
            localProgress.responseDrafts,
            incomingProgress.responseDrafts,
            localProgress.lastSaved,
            incomingProgress.lastSaved
        ),
        unlockedAchievements: mergeAchievements(localProgress.unlockedAchievements, incomingProgress.unlockedAchievements),
        streakDays: Math.max(localProgress.streakDays, incomingProgress.streakDays),
        maxStreakDays: Math.max(localProgress.maxStreakDays, incomingProgress.maxStreakDays),
        studyLog: uniqueStrings(localProgress.studyLog, incomingProgress.studyLog),
        taxesPaid: mergedTaxesPaid,
        nextTaxAt: mergedTaxState.nextTaxAt,
        currentTaxCard: mergedTaxState.currentTaxCard,
        isTaxDue: mergedTaxState.isTaxDue,
        dailyQuest: mergedDailyQuest,
        questHistory: mergedQuestHistory,
        activeShadowQuest: mergedActiveShadowQuest,
        shadowQuestHistory: mergedShadowHistory,
        activeMirrorMatch: mergedActiveMirrorMatch,
        mirrorMatchHistory: mergedMirrorHistory,
        activeTimeAttack: mergedActiveTimeAttack,
        timeAttackHistory: mergedTimeHistory,
        debuffHistory: mergeRecordsById(localProgress.debuffHistory, incomingProgress.debuffHistory, (debuff) => debuff.detectedAt),
        capstone: mergedCapstone,
        ngPlus: mergedNgPlus,
        lastSaved: Math.max(localProgress.lastSaved, incomingProgress.lastSaved)
    };

    return {
        ...mergedProgress,
        xp: recalculateProgressXP(mergedProgress, localProgress.xp, incomingProgress.xp)
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
