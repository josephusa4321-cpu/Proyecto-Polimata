import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_2_3: Module = {
    id: "2.3",
    title: "Descomposición Analítica",
    subtitle: "",
    quote: "Todo problema complejo es un montón de problemas simples disfrazados.",
    pillar: 2,
    pillarName: "Pensamiento Lógico-Analítico",
    totalCards: 7
};

export const CARDS_2_3: ConceptCard[] = [
    { id: "2.3.01", title: "Principio MECE: mutuamente excluyente, colectivamente exhaustivo", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["2.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.3.02", title: "Issue trees: descomponer un problema en sub-problemas", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.3.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.3.03", title: "Pensamiento de primeros principios (first principles)", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["2.2.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "4.2.06", priority: "critical", reason: "first principles + reframing = innovación radical" }], auditNote: null },
    { id: "2.3.04", title: "Estimación Fermi: estimar lo aparentemente inestimable", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.3.02", "2.3.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.3.02", priority: "high", reason: "Fermi requiere pensar en distribuciones" }], auditNote: null },
    { id: "2.3.05", title: "Pensamiento convergente: reducir opciones al mejor camino", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.3.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.3.06", title: "Análisis de sensibilidad: ¿qué variables importan más?", subtitle: "", type: "advanced", xp: 50, prerequisites: ["2.3.02", "1.3.05"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.3.07", title: "Dimensionalidad: evitar comparar peras con manzanas", subtitle: "", type: "advanced", xp: 50, prerequisites: ["2.3.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null }
];

export const BOSS_FIGHT_2_3: BossFight = {
    id: "bf-2.3",
    moduleId: "2.3",
    title: "Boss Fight",
    description: "Resuelve un problema Fermi Y construye el issue tree de un problema de negocio o política pública.",
    xp: 150,
    prerequisites: ["2.3.01", "2.3.02", "2.3.03", "2.3.04", "2.3.05", "2.3.06", "2.3.07"]
};
