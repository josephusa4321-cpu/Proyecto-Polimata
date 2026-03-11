import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_4_2: Module = {
    id: "4.2",
    title: "Técnicas de Ideación",
    subtitle: "",
    quote: "La imaginación no se espera, se invoca mediante métodos estructurados.",
    pillar: 4,
    pillarName: "Pensamiento Innovador y Creativo",
    totalCards: 9
};

export const CARDS_4_2: ConceptCard[] = [
    { id: "4.2.01", title: "SCAMPER (Sustituir, Combinar, Adaptar, Modificar, Proponer, Eliminar, Reordenar)", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["4.1.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.2.02", title: "Técnica de la palabra aleatoria", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.1.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.2.03", title: "Pensamiento lateral (De Bono): salir de la vía principal", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["4.1.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.4.08", priority: "high", reason: "pensamiento lateral ↔ estrategias asimétricas" }], auditNote: null },
    { id: "4.2.04", title: "Los Seis Sombreros para Pensar (De Bono)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.2.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.2.05", title: "Brainstorming vs. Brainwriting (y por qué el segundo es mejor)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.1.02"], isTool: true, isNew: false, isReframed: true, crossPillarLinks: [], auditNote: null },
    { id: "4.2.06", title: "Reencuadre de problemas (reframing)", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["4.1.05"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "3.2.09", priority: "critical", reason: "reframing = hackeo intencional del efecto de encuadre" }, { targetId: "2.3.03", priority: "high", reason: "first principles facilita el reframing" }], auditNote: null },
    { id: "4.2.07", title: "Matriz morfológica: exploración forzada de atributos", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.2.08", title: "Provocación (PO): enunciados deliberadamente absurdos", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.2.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.2.09", title: "Sinéctica: unión de elementos distintos usando analogías", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.1.05"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null }
];

export const BOSS_FIGHT_4_2: BossFight = {
    id: "bf-4.2",
    moduleId: "4.2",
    title: "Boss Fight",
    description: "Toma un objeto común y mejóralo aplicando SCAMPER, Seis Sombreros y una Provocación.",
    xp: 150,
    prerequisites: ["4.2.01", "4.2.02", "4.2.03", "4.2.04", "4.2.05", "4.2.06", "4.2.07", "4.2.08", "4.2.09"]
};
