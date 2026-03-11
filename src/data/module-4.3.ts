import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_4_3: Module = {
    id: "4.3",
    title: "Diseño y Resolución Aplicada",
    subtitle: "",
    quote: "La idea es el 1%. El 99% es diseñar la forma en que el mundo interactúa con ella.",
    pillar: 4,
    pillarName: "Pensamiento Innovador y Creativo",
    totalCards: 11
};

export const CARDS_4_3: ConceptCard[] = [
    { id: "4.3.01", title: "Design Thinking: empatizar, definir, idear, prototipar, evaluar", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["4.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.3.02", title: "Innovación incremental vs. radical", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.3.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.3.03", title: "Teoría de la Innovación Disruptiva (Christensen)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.3.02"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.3.04", title: "Jobs-to-be-Done (JTBD): la gente no compra productos, alquila soluciones", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["4.3.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.3.05", title: "TRIZ: teoría para la resolución inventiva de problemas", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.2.07"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.3.06", title: "Prototipado rápido vs. MVP (Mínimo Producto Viable)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.3.01", "4.3.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.3.07", title: "Descubrimiento conducido por asunción (Océano Azul)", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.3.03", "1.4.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.4.04", priority: "critical", reason: "Océano Azul requiere selección de arena" }], auditNote: null },
    { id: "4.3.08", title: "Serendipia: cultivar la suerte sistemáticamente", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.1.06"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "4.3.09", title: "Pensamiento sistémico en diseño corporativo", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.3.01", "1.1.04"], isTool: false, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "1.1.04", priority: "high", reason: "diseño no existe en el vacío, afecta al sistema" }], auditNote: null },
    { id: "4.3.10", title: "Desconexión de lo óptimo: diseño su-bóptimo para resilencia", subtitle: "", type: "advanced", xp: 50, prerequisites: ["4.3.09", "1.5.06"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "1.5.06", priority: "high", reason: "ideal de eficiencia destruye robustez" }], auditNote: null },
    { id: "4.3.11", title: "Carga cognitiva y fricción en el diseño de soluciones", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["4.3.01"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "5.4.05", priority: "critical", reason: "fricción impacta adopción de sesgos de acción" }], auditNote: "NUEVA (Auditoría v2.0)" }
];

export const BOSS_FIGHT_4_3: BossFight = {
    id: "bf-4.3",
    moduleId: "4.3",
    title: "Boss Fight",
    description: "Identifica un Job-to-be-Done de tu vida diaria mal resuelto. Diseña un prototipo inicial, defínelo, e itera usando TRIZ para limar bordes.",
    xp: 150,
    prerequisites: ["4.3.01", "4.3.02", "4.3.03", "4.3.04", "4.3.05", "4.3.06", "4.3.07", "4.3.08", "4.3.09", "4.3.10", "4.3.11"]
};
