import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_1_2: Module = {
    id: "1.2",
    title: "Pensamiento Causal y de Segundo Orden",
    subtitle: "",
    quote: "Cualquier idiota puede ver la primera consecuencia. Un estratega ve la quinta.",
    pillar: 1,
    pillarName: "Pensamiento Estratégico-Sistémico",
    totalCards: 11
};

export const CARDS_1_2: ConceptCard[] = [
    { id: "1.2.01", title: "Razonamiento causal: ¿qué causa qué?", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.1.02"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.2.02", title: "Correlación vs. causalidad", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "2.1.04", priority: "high", reason: "inducción y correlación engañosa" }], auditNote: null },
    { id: "1.2.03", title: "Causas próximas vs. causas raíz", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.2.04", title: "Los 5 Porqués (root cause analysis)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.2.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.2.05", title: "Efectos de segundo orden: ¿Y entonces qué?", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.2.01", "1.1.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.2.06", title: "Efectos cascada en sistemas complejos", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.2.05", "1.1.08"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.2.07", title: "Consecuencias no intencionadas: la Ley de Goodhart", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.2.05"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "5.3.03", priority: "critical", reason: "incentivos como causa de consecuencias no intencionadas" }], auditNote: null },
    { id: "1.2.08", title: "Pensamiento contrafactual: ¿Qué habría pasado si...?", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.2.01", "1.2.05"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.2.09", title: "Pre-mortem: imaginar el fracaso antes de que ocurra", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.2.08"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.2.10", title: "Timing y secuencia: por qué el cuándo importa tanto como el qué", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.2.05", "1.2.06"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "1.2.11", title: "Cerca de Chesterton: no destruyas lo que no entiendes", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.2.05", "1.2.03"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "5.4.07", priority: "critical", reason: "Cerca de Chesterton ↔ Via Negativa" }], auditNote: "NUEVA (Auditoría v2.0)" }
];

export const BOSS_FIGHT_1_2: BossFight = {
    id: "bf-1.2",
    moduleId: "1.2",
    title: "Boss Fight",
    description: "Selecciona una decisión histórica famosa (política, militar, o tecnológica). Traza la cadena causal hasta el 3er orden de consecuencias. Identifica al menos una consecuencia no intencionada. Aplica pre-mortem retroactivo.",
    xp: 150,
    prerequisites: ["1.2.01", "1.2.02", "1.2.03", "1.2.04", "1.2.05", "1.2.06", "1.2.07", "1.2.08", "1.2.09", "1.2.10", "1.2.11"]
};
