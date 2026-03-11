import { ALL_CARDS } from './all-modules';

// Validation script to ensure all cross-pillar links point to valid card IDs
export const validateCrossPillarLinks = () => {
    const validCardIds = new Set(ALL_CARDS.map(c => c.id));
    const errors: string[] = [];

    ALL_CARDS.forEach(card => {
        card.crossPillarLinks.forEach(link => {
            if (!validCardIds.has(link.targetId)) {
                errors.push(`Invalid cross-pillar link in card ${card.id}: target ${link.targetId} does not exist.`);
            }
        });
    });

    if (errors.length > 0) {
        console.warn("Cross-Pillar Link Validation Errors:", errors);
    }
    return errors;
};
