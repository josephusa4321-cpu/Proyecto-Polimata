import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_1_4: Module = {
    id: "1.4",
    title: "Pensamiento Estratégico Puro",
    subtitle: "",
    quote: "Estrategia es el arte de elegir qué NO hacer.",
    pillar: 1,
    pillarName: "Pensamiento Estratégico-Sistémico",
    totalCards: 10
};

export const CARDS_1_4: ConceptCard[] = [
    { id: "1.4.01", title: "Estrategia vs. táctica vs. operaciones", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.4.02", title: "Ventaja asimétrica: ¿qué te da un edge desigual?", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.4.01"], isTool: true, isNew: false, isReframed: true, crossPillarLinks: [], auditNote: null },
    { id: "1.4.03", title: "Trade-offs: la esencia de toda estrategia", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.4.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "5.3.01", priority: "critical", reason: "trade-offs estratégicos = costo de oportunidad" }], auditNote: null },
    { id: "1.4.04", title: "Selección de arena: el poder de elegir dónde jugar", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.4.03"], isTool: true, isNew: false, isReframed: true, crossPillarLinks: [], auditNote: null },
    { id: "1.4.05", title: "Teoría de juegos básica: equilibrio de Nash", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.3.05"], isTool: true, isNew: false, isReframed: true, crossPillarLinks: [{ targetId: "3.5.05", priority: "medium", reason: "dilemas éticos como juegos de coordinación" }], auditNote: null },
    { id: "1.4.06", title: "Juegos de suma cero vs. suma positiva", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.4.05"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.4.07", title: "Compromisos estratégicos y credibilidad", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.4.05", "1.2.05"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.4.08", title: "Estrategias asimétricas: cómo el débil vence al fuerte", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.4.03", "1.4.06"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "4.2.03", priority: "high", reason: "estrategias asimétricas ↔ inversión lateral" }], auditNote: null },
    { id: "1.4.09", title: "Señales y signaling: comunicar intenciones estratégicas", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.4.07"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.4.10", title: "Coopetición: cooperar y competir simultáneamente", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.4.06"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null }
];

export const BOSS_FIGHT_1_4: BossFight = {
    id: "bf-1.4",
    moduleId: "1.4",
    title: "Boss Fight",
    description: "Diseña una estrategia para un escenario competitivo asimétrico. Usa teoría de juegos para anticipar respuestas. Identifica los trade-offs explícitos.",
    xp: 150,
    prerequisites: ["1.4.01", "1.4.02", "1.4.03", "1.4.04", "1.4.05", "1.4.06", "1.4.07", "1.4.08", "1.4.09", "1.4.10"]
};
