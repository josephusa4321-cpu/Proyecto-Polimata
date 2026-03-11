import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_3_1: Module = {
    id: "3.1",
    title: "Fundamentos Epistemológicos",
    subtitle: "",
    quote: "La primera pregunta del pensador serio no es '¿qué sé?' sino '¿cómo lo sé?'",
    pillar: 3,
    pillarName: "Pensamiento Crítico-Epistemológico",
    totalCards: 7
};

export const CARDS_3_1: ConceptCard[] = [
    { id: "3.1.01", title: "¿Qué es el conocimiento? Creencia verdadera justificada (y sus problemas)", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.1.02", title: "Fuentes de conocimiento: empírica, racional, testimonial, intuitiva", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["3.1.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.1.03", title: "Grados de certeza: el espectro entre no sé nada y estoy seguro", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.1.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.1.04", title: "El problema de la inducción (Hume): por qué el sol podría no salir mañana", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.1.02", "2.1.04"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.1.05", title: "Falsabilidad (Popper): lo que hace a una idea científica", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["3.1.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "5.1.03", priority: "critical", reason: "falsabilidad → método hipotético-deductivo" }], auditNote: null },
    { id: "3.1.06", title: "Paradigmas y revoluciones científicas (Kuhn)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.1.05"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.1.07", title: "Humildad epistémica: lo que no sabes que no sabes", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["3.1.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.3.08", priority: "high", reason: "humildad epistémica ↔ incertidumbre knightiana" }, { targetId: "3.4.07", priority: "critical", reason: "humildad epistémica → círculo de competencia" }], auditNote: null }
];

export const BOSS_FIGHT_3_1: BossFight = {
    id: "bf-3.1",
    moduleId: "3.1",
    title: "Boss Fight",
    description: "Toma una creencia propia fuerte y somete su justificación a los estándares epistemológicos.",
    xp: 150,
    prerequisites: ["3.1.01", "3.1.02", "3.1.03", "3.1.04", "3.1.05", "3.1.06", "3.1.07"]
};
