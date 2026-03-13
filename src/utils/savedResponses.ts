import { ALL_BOSS_FIGHTS, ALL_CARDS } from '../data/all-modules';
import type { DailyQuest, GameState, SavedResponseDraft, SavedResponseEntry } from '../types';

type DraftInput = Record<string, string | SavedResponseDraft> | null | undefined;

const CARD_PREFIX = 'card-recall:';
const BOSS_PREFIX = 'boss-fight:';
const DAILY_PREFIX = 'daily-quest:';

const CARD_TITLE_LOOKUP = new Map(ALL_CARDS.map((card) => [card.id, card.title]));
const BOSS_TITLE_LOOKUP = new Map(ALL_BOSS_FIGHTS.map((boss) => [boss.id, boss.title]));

const DAILY_KIND_LABEL = 'Mision del dia';

const isSavedResponseDraft = (value: unknown): value is SavedResponseDraft => {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const draft = value as SavedResponseDraft;
    return typeof draft.value === 'string' && typeof draft.updatedAt === 'number';
};

export const getResponseDraftText = (draft: string | SavedResponseDraft | null | undefined) => {
    if (!draft) {
        return '';
    }

    return typeof draft === 'string' ? draft : draft.value;
};

export const normalizeResponseDrafts = (
    drafts: DraftInput,
    fallbackUpdatedAt: number
): Record<string, SavedResponseDraft> => {
    if (!drafts || typeof drafts !== 'object') {
        return {};
    }

    return Object.entries(drafts).reduce<Record<string, SavedResponseDraft>>((acc, [key, value]) => {
        const text = getResponseDraftText(value);
        if (!text.trim()) {
            return acc;
        }

        acc[key] = isSavedResponseDraft(value)
            ? value
            : {
                value: text,
                updatedAt: fallbackUpdatedAt
            };

        return acc;
    }, {});
};

export const mergeResponseDrafts = (
    localDrafts: DraftInput,
    cloudDrafts: DraftInput,
    localFallbackUpdatedAt: number,
    cloudFallbackUpdatedAt: number
) => {
    const normalizedLocal = normalizeResponseDrafts(localDrafts, localFallbackUpdatedAt);
    const normalizedCloud = normalizeResponseDrafts(cloudDrafts, cloudFallbackUpdatedAt);
    const merged = { ...normalizedLocal };

    Object.entries(normalizedCloud).forEach(([key, cloudDraft]) => {
        const localDraft = merged[key];
        if (!localDraft || cloudDraft.updatedAt > localDraft.updatedAt) {
            merged[key] = cloudDraft;
        }
    });

    return merged;
};

const buildDailyQuestLookup = (dailyQuest: DailyQuest | null, questHistory: DailyQuest[]) => {
    const lookup = new Map<string, DailyQuest>();

    questHistory.forEach((quest) => {
        lookup.set(quest.id, quest);
    });

    if (dailyQuest) {
        lookup.set(dailyQuest.id, dailyQuest);
    }

    return lookup;
};

export const buildSavedResponseEntries = ({
    responseDrafts,
    completedCardIds,
    completedBossFights,
    dailyQuest,
    questHistory
}: Pick<GameState, 'responseDrafts' | 'completedCardIds' | 'completedBossFights' | 'dailyQuest' | 'questHistory'>): SavedResponseEntry[] => {
    const entries = new Map<string, SavedResponseEntry>();
    const dailyQuestLookup = buildDailyQuestLookup(dailyQuest, questHistory);

    Object.entries(responseDrafts).forEach(([key, draft]) => {
        const content = draft.value.trim();
        if (!content) {
            return;
        }

        if (key.startsWith(CARD_PREFIX)) {
            const cardId = key.slice(CARD_PREFIX.length);
            entries.set(key, {
                id: key,
                kind: 'card',
                status: completedCardIds.includes(cardId) ? 'completed' : 'draft',
                title: CARD_TITLE_LOOKUP.get(cardId) ?? cardId,
                relatedId: cardId,
                content,
                updatedAt: draft.updatedAt
            });
            return;
        }

        if (key.startsWith(BOSS_PREFIX)) {
            const bossFightId = key.slice(BOSS_PREFIX.length);
            entries.set(key, {
                id: key,
                kind: 'bossFight',
                status: completedBossFights.includes(bossFightId) ? 'completed' : 'draft',
                title: BOSS_TITLE_LOOKUP.get(bossFightId) ?? bossFightId,
                relatedId: bossFightId,
                content,
                updatedAt: draft.updatedAt
            });
            return;
        }

        if (key.startsWith(DAILY_PREFIX)) {
            const questId = key.slice(DAILY_PREFIX.length);
            const quest = dailyQuestLookup.get(questId);
            const existingEntry = entries.get(key);
            if (existingEntry?.status === 'completed') {
                return;
            }

            entries.set(key, {
                id: key,
                kind: 'dailyQuest',
                status: quest?.completed ? 'completed' : 'draft',
                title: quest ? `${DAILY_KIND_LABEL} · ${quest.date}` : DAILY_KIND_LABEL,
                relatedId: questId,
                content,
                updatedAt: draft.updatedAt
            });
        }
    });

    dailyQuestLookup.forEach((quest) => {
        const content = quest.userAnswer?.trim();
        if (!quest.completed || !content) {
            return;
        }

        entries.set(`${DAILY_PREFIX}${quest.id}`, {
            id: `${DAILY_PREFIX}${quest.id}`,
            kind: 'dailyQuest',
            status: 'completed',
            title: `${DAILY_KIND_LABEL} · ${quest.date}`,
            relatedId: quest.id,
            content,
            updatedAt: quest.completedAt ?? Date.now()
        });
    });

    return Array.from(entries.values()).sort((left, right) => right.updatedAt - left.updatedAt);
};
