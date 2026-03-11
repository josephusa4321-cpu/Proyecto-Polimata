import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_4_1: Module = {
    id: "4.1",
    title: "Mecánicas de la Creatividad",
    subtitle: "",
    quote: "La creatividad no es magia. Es la conexión inesperada de nodos existentes.",
    pillar: 4,
    pillarName: "Pensamiento Innovador y Creativo",
    totalCards: 9
};

export const CARDS_4_1: ConceptCard[] = [
    { id: "4.1.01", title: "¿Qué es la creatividad? Combinatoria vs. creación ex nihilo", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.1.02", title: "Pensamiento divergente vs. pensamiento convergente", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["4.1.01", "2.3.05"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "2.3.05", priority: "critical", reason: "divergencia sin convergencia es brainstorming inútil" }], auditNote: null },
    { id: "4.1.03", title: "Asociación remota: conectar ideas aparentemente no relacionadas", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.1.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.1.04", title: "Fluidez, flexibilidad, originalidad, elaboración (test de Torrance)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.1.02"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.1.05", title: "Transferencia analógica: resolver en dominio A mapeando a B", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.1.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.1.06", title: "El papel del inconsciente: incubación e iluminación (el momento Eureka)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.1.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.1.07", title: "Atención desenfocada vs. atención enfocada", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.1.06"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.1.08", title: "Gestión de tensión creativa: frustración como combustible", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.1.06"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.1.09", title: "Diseño generativo mental: iterar variaciones masivamente", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.1.02"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [], auditNote: null }
];

export const BOSS_FIGHT_4_1: BossFight = {
    id: "bf-4.1",
    moduleId: "4.1",
    title: "Boss Fight",
    description: "Toma dos objetos al azar. Genera 20 conexiones, usos o relaciones posibles entre ellos usando divergencia y asociación remota.",
    xp: 150,
    prerequisites: ["4.1.01", "4.1.02", "4.1.03", "4.1.04", "4.1.05", "4.1.06", "4.1.07", "4.1.08", "4.1.09"]
};
