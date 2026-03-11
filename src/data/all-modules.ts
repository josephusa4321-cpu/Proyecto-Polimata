import { type Module, type ConceptCard, type BossFight } from '../types';

// Pillar 1 modules
import { MODULE_1_1, CARDS_1_1, BOSS_FIGHT_1_1 } from './module-1.1';
import { MODULE_1_2, CARDS_1_2, BOSS_FIGHT_1_2 } from './module-1.2';
import { MODULE_1_3, CARDS_1_3, BOSS_FIGHT_1_3 } from './module-1.3';
import { MODULE_1_4, CARDS_1_4, BOSS_FIGHT_1_4 } from './module-1.4';
import { MODULE_1_5, CARDS_1_5, BOSS_FIGHT_1_5 } from './module-1.5';

// Pillar 2 modules
import { MODULE_2_1, CARDS_2_1, BOSS_FIGHT_2_1 } from './module-2.1';
import { MODULE_2_2, CARDS_2_2, BOSS_FIGHT_2_2 } from './module-2.2';
import { MODULE_2_3, CARDS_2_3, BOSS_FIGHT_2_3 } from './module-2.3';
import { MODULE_2_4, CARDS_2_4, BOSS_FIGHT_2_4 } from './module-2.4';

// Pillar 3 modules
import { MODULE_3_1, CARDS_3_1, BOSS_FIGHT_3_1 } from './module-3.1';
import { MODULE_3_2, CARDS_3_2, BOSS_FIGHT_3_2 } from './module-3.2';
import { MODULE_3_3, CARDS_3_3, BOSS_FIGHT_3_3 } from './module-3.3';
import { MODULE_3_4, CARDS_3_4, BOSS_FIGHT_3_4 } from './module-3.4';
import { MODULE_3_5, CARDS_3_5, BOSS_FIGHT_3_5 } from './module-3.5';

// Pillar 4 modules
import { MODULE_4_1, CARDS_4_1, BOSS_FIGHT_4_1 } from './module-4.1';
import { MODULE_4_2, CARDS_4_2, BOSS_FIGHT_4_2 } from './module-4.2';
import { MODULE_4_3, CARDS_4_3, BOSS_FIGHT_4_3 } from './module-4.3';

// Pillar 5 modules
import { MODULE_5_1, CARDS_5_1, BOSS_FIGHT_5_1 } from './module-5.1';
import { MODULE_5_2, CARDS_5_2, BOSS_FIGHT_5_2 } from './module-5.2';
import { MODULE_5_3, CARDS_5_3, BOSS_FIGHT_5_3 } from './module-5.3';
import { MODULE_5_4, CARDS_5_4, BOSS_FIGHT_5_4 } from './module-5.4';

export const ALL_MODULES: Module[] = [
    MODULE_1_1, MODULE_1_2, MODULE_1_3, MODULE_1_4, MODULE_1_5,
    MODULE_2_1, MODULE_2_2, MODULE_2_3, MODULE_2_4,
    MODULE_3_1, MODULE_3_2, MODULE_3_3, MODULE_3_4, MODULE_3_5,
    MODULE_4_1, MODULE_4_2, MODULE_4_3,
    MODULE_5_1, MODULE_5_2, MODULE_5_3, MODULE_5_4
];

export const ALL_CARDS: ConceptCard[] = [
    ...CARDS_1_1, ...CARDS_1_2, ...CARDS_1_3, ...CARDS_1_4, ...CARDS_1_5,
    ...CARDS_2_1, ...CARDS_2_2, ...CARDS_2_3, ...CARDS_2_4,
    ...CARDS_3_1, ...CARDS_3_2, ...CARDS_3_3, ...CARDS_3_4, ...CARDS_3_5,
    ...CARDS_4_1, ...CARDS_4_2, ...CARDS_4_3,
    ...CARDS_5_1, ...CARDS_5_2, ...CARDS_5_3, ...CARDS_5_4
];

export const ALL_BOSS_FIGHTS: BossFight[] = [
    BOSS_FIGHT_1_1, BOSS_FIGHT_1_2, BOSS_FIGHT_1_3, BOSS_FIGHT_1_4, BOSS_FIGHT_1_5,
    BOSS_FIGHT_2_1, BOSS_FIGHT_2_2, BOSS_FIGHT_2_3, BOSS_FIGHT_2_4,
    BOSS_FIGHT_3_1, BOSS_FIGHT_3_2, BOSS_FIGHT_3_3, BOSS_FIGHT_3_4, BOSS_FIGHT_3_5,
    BOSS_FIGHT_4_1, BOSS_FIGHT_4_2, BOSS_FIGHT_4_3,
    BOSS_FIGHT_5_1, BOSS_FIGHT_5_2, BOSS_FIGHT_5_3, BOSS_FIGHT_5_4
];
