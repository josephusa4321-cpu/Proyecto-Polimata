import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_2_2: Module = {
    id: "2.2",
    title: "Estructura de Argumentos",
    subtitle: "",
    quote: "Si no puedes mapear la estructura de un argumento, no puedes evaluarlo.",
    pillar: 2,
    pillarName: "Pensamiento Lógico-Analítico",
    totalCards: 6
};

export const CARDS_2_2: ConceptCard[] = [
    { id: "2.2.01", title: "Mapeo de argumentos: hacer visible la estructura lógica", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["2.1.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.2.02", title: "Premisas ocultas (hidden assumptions)", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["2.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "3.2.02", priority: "critical", reason: "premisas ocultas alimentadas por sesgo de confirmación" }], auditNote: null },
    { id: "2.2.03", title: "Cadenas de razonamiento: argumentos multi-paso", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.2.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.2.04", title: "Condiciones necesarias vs. condiciones suficientes", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.1.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.2.05", title: "Contraejemplos: la herramienta más poderosa de la lógica", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.1.03", "2.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.2.06", title: "Steel-manning: construir la versión más fuerte del argumento contrario", subtitle: "", type: "advanced", xp: 50, prerequisites: ["2.2.01", "2.2.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "3.4.04", priority: "critical", reason: "strong opinions weakly held requiere steel-manning" }], auditNote: null }
];

export const BOSS_FIGHT_2_2: BossFight = {
    id: "bf-2.2",
    moduleId: "2.2",
    title: "Boss Fight",
    description: "Toma un editorial de opinión y mapea todos sus argumentos, identifica premisas ocultas, contraejemplos posibles, y steel-man la posición opuesta.",
    xp: 150,
    prerequisites: ["2.2.01", "2.2.02", "2.2.03", "2.2.04", "2.2.05", "2.2.06"]
};
