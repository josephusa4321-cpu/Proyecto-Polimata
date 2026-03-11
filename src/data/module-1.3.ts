import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_1_3: Module = {
    id: "1.3",
    title: "Pensamiento Probabilístico",
    subtitle: "",
    quote: "El mundo no funciona con certezas. Funciona con probabilidades.",
    pillar: 1,
    pillarName: "Pensamiento Estratégico-Sistémico",
    totalCards: 10
};

export const CARDS_1_3: ConceptCard[] = [
    { id: "1.3.01", title: "Incertidumbre vs. riesgo: la distinción fundamental de Knight", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.3.02", title: "Pensamiento en distribuciones, no en puntos", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.3.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.3.03", title: "Tasas base (base rates) y su importancia", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.3.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.3.04", title: "Actualización bayesiana: cambiar de opinión con evidencia nueva", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.3.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "3.4.04", priority: "critical", reason: "Bayes como herramienta de strong opinions weakly held" }], auditNote: null },
    { id: "1.3.05", title: "Valor esperado: la brújula del decisor racional", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.3.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "5.4.02", priority: "high", reason: "valor esperado → análisis costo-beneficio" }], auditNote: null },
    { id: "1.3.06", title: "Colas gruesas (fat tails) y Cisnes Negros", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.3.02", "1.3.05"], isTool: true, isNew: false, isReframed: true, crossPillarLinks: [{ targetId: "1.5.08", priority: "critical", reason: "fat tails → antifragilidad" }], auditNote: null },
    { id: "1.3.07", title: "Heurísticas y sesgos en estimación de probabilidades", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.3.04"], isTool: false, isNew: false, isReframed: true, crossPillarLinks: [{ targetId: "3.2.01", priority: "high", reason: "heurísticas probabilísticas = sesgos de Sistema 1" }], auditNote: null },
    { id: "1.3.08", title: "Decisiones bajo incertidumbre profunda (incertidumbre knightiana)", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.3.01", "1.3.06"], isTool: false, isNew: false, isReframed: true, crossPillarLinks: [], auditNote: null },
    { id: "1.3.09", title: "Asimetría de resultados: upside ilimitado vs. downside limitado", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.3.05", "1.3.06"], isTool: true, isNew: false, isReframed: true, crossPillarLinks: [], auditNote: null },
    { id: "1.3.10", title: "Ergodicidad: por qué el promedio del grupo no es TU promedio", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.3.02", "1.3.06"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "5.3.07", priority: "critical", reason: "ergodicidad ↔ skin in the game" }], auditNote: null }
];

export const BOSS_FIGHT_1_3: BossFight = {
    id: "bf-1.3",
    moduleId: "1.3",
    title: "Boss Fight",
    description: "Calibración personal. Haz 20 predicciones sobre eventos reales con niveles de confianza (60%, 70%, 80%, 90%). Registra resultados.",
    xp: 150,
    prerequisites: ["1.3.01", "1.3.02", "1.3.03", "1.3.04", "1.3.05", "1.3.06", "1.3.07", "1.3.08", "1.3.09", "1.3.10"]
};
