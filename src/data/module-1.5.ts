import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_1_5: Module = {
    id: "1.5",
    title: "Pensamiento Prospectivo",
    subtitle: "",
    quote: "La mejor forma de predecir el futuro es prepararse para múltiples futuros.",
    pillar: 1,
    pillarName: "Pensamiento Estratégico-Sistémico",
    totalCards: 8
};

export const CARDS_1_5: ConceptCard[] = [
    { id: "1.5.01", title: "Predicción vs. preparación: por qué predecir falla", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.3.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.5.02", title: "Señales débiles: detectar cambios antes de que sean obvios", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.5.01", "1.1.09"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "3.2.04", priority: "high", reason: "disponibilidad puede hacerte ignorar señales débiles" }], auditNote: null },
    { id: "1.5.03", title: "Planificación por escenarios: metodología paso a paso", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.5.01", "1.3.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.5.04", title: "Backcasting: diseñar desde el futuro deseado hacia el presente", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.5.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.5.05", title: "Opciones reales: el valor estratégico de mantener opciones abiertas", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.3.05", "1.3.09", "1.5.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.5.06", title: "Robustez vs. optimización: prepararse para lo inesperado", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.3.06", "1.5.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.5.07", title: "Efecto Lindy: lo que sobrevive más tiempo, sobrevivirá más", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.3.06"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "3.2.11", priority: "high", reason: "Lindy vs. falacia narrativa" }], auditNote: null },
    { id: "1.5.08", title: "Antifragilidad: beneficiarse del desorden", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.5.06", "1.3.06"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "1.3.10", priority: "critical", reason: "antifrágil en ensemble, frágil en time-average" }], auditNote: null }
];

export const BOSS_FIGHT_1_5: BossFight = {
    id: "bf-1.5",
    moduleId: "1.5",
    title: "Boss Fight",
    description: "Construye 3 escenarios para una industria o dominio. Diseña una estrategia robusta que funcione en los 3. Identifica señales débiles. Aplica el espectro frágil/robusto/antifrágil.",
    xp: 150,
    prerequisites: ["1.5.01", "1.5.02", "1.5.03", "1.5.04", "1.5.05", "1.5.06", "1.5.07", "1.5.08"]
};
