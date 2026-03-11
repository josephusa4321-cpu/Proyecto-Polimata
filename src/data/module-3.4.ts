import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_3_4: Module = {
    id: "3.4",
    title: "Metacognición",
    subtitle: "",
    quote: "El poder supremo no es pensar bien. Es saber cuándo estás pensando mal.",
    pillar: 3,
    pillarName: "Pensamiento Crítico-Epistemológico",
    totalCards: 7
};

export const CARDS_3_4: ConceptCard[] = [
    { id: "3.4.01", title: "¿Qué es la metacognición? Monitorear tu propio proceso mental", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["3.2.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.4.02", title: "Calibración de confianza: escala personal de certeza", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.4.01", "1.3.04"], isTool: true, isNew: false, isReframed: true, crossPillarLinks: [{ targetId: "bf-1.3", priority: "critical", reason: "calibración usa datos del Boss Fight probabilístico" }], auditNote: null },
    { id: "3.4.03", title: "Honestidad intelectual: la disciplina de no engañarte a ti mismo", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.4.01", "3.1.07"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.4.04", title: "Strong opinions, weakly held: convicción + apertura", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.4.03", "1.3.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.3.04", priority: "high", reason: "Bayes = mecanismo formal de weakly held" }], auditNote: null },
    { id: "3.4.05", title: "Reconocer razonamiento emocional: cuando sientes antes de pensar", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.4.01", "3.2.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.4.06", title: "El arte de cambiar de opinión: actualizar creencias sin crisis de identidad", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.4.04", "1.3.04"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.4.07", title: "Círculo de competencia: saber dónde sabes y dónde no", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.4.01", "3.1.07"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "3.2.12", priority: "critical", reason: "Gell-Mann Amnesia ↔ círculo de competencia" }], auditNote: null }
];

export const BOSS_FIGHT_3_4: BossFight = {
    id: "bf-3.4",
    moduleId: "3.4",
    title: "Boss Fight",
    description: "Mirror Match: Elige un tema sobre el que tengas una opinión fuerte. Defiende la postura opuesta durante 20 minutos.",
    xp: 150,
    prerequisites: ["3.4.01", "3.4.02", "3.4.03", "3.4.04", "3.4.05", "3.4.06", "3.4.07"]
};
