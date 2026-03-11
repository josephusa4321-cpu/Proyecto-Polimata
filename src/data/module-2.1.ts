import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_2_1: Module = {
    id: "2.1",
    title: "Fundamentos de la Lógica",
    subtitle: "",
    quote: "Un argumento válido no es lo mismo que un argumento verdadero.",
    pillar: 2,
    pillarName: "Pensamiento Lógico-Analítico",
    totalCards: 9
};

export const CARDS_2_1: ConceptCard[] = [
    { id: "2.1.01", title: "Proposiciones, premisas y conclusiones", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.1.02", title: "Razonamiento deductivo: de lo general a lo particular", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["2.1.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.1.03", title: "Validez vs. solidez (validity vs. soundness)", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["2.1.02"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.1.04", title: "Razonamiento inductivo: de lo particular a lo general", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["2.1.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.3.03", priority: "high", reason: "inducción y tasas base" }], auditNote: null },
    { id: "2.1.05", title: "Fuerza inductiva: grados de soporte evidencial", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.1.04"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.1.06", title: "Razonamiento abductivo: la mejor explicación disponible", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["2.1.02", "2.1.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "5.1.03", priority: "high", reason: "abducción → método hipotético-deductivo" }], auditNote: null },
    { id: "2.1.07", title: "Lógica formal vs. lógica informal", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.1.02", "2.1.04"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.1.08", title: "Modus ponens y modus tollens", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.1.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.1.09", title: "Reductio ad absurdum: refutar por contradicción", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.1.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null }
];

export const BOSS_FIGHT_2_1: BossFight = {
    id: "bf-2.1",
    moduleId: "2.1",
    title: "Boss Fight",
    description: "Identifica el tipo de razonamiento en 10 argumentos reales de noticias, discursos o papers. Evalúa si es válido/sólido/fuerte.",
    xp: 150,
    prerequisites: ["2.1.01", "2.1.02", "2.1.03", "2.1.04", "2.1.05", "2.1.06", "2.1.07", "2.1.08", "2.1.09"]
};
