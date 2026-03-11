import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_5_3: Module = {
    id: "5.3",
    title: "Economía y Asignación Práctica",
    subtitle: "",
    quote: "La escasez impone elecciones; los incentivos modelan el comportamiento.",
    pillar: 5,
    pillarName: "Modelos Mentales Científicos y Prácticos",
    totalCards: 8
};

export const CARDS_5_3: ConceptCard[] = [
    { id: "5.3.01", title: "Costo de oportunidad real vs. aparente", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.4.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "3.2.06", priority: "critical", reason: "costo hundido ciega al costo de oportunidad" }], auditNote: null },
    { id: "5.3.02", title: "Utilidad marginal decreciente", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["5.3.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.3.03", title: "Incentivos y diseño de mecanismos", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.2.07"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.2.07", priority: "high", reason: "Ley de Goodhart ocurre por mal diseño de incentivos" }], auditNote: null },
    { id: "5.3.04", title: "Ventaja comparativa en equipos interdisciplinares", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["5.3.01", "1.4.06"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.3.05", title: "Externalidades positivas y negativas", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.2.05", "5.3.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.3.06", title: "Costo transaccional: lo implícito de operar", subtitle: "", type: "advanced", xp: 50, prerequisites: ["5.2.05", "5.3.01"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "5.2.05", priority: "medium", reason: "fricción sistémica = costo transaccional" }], auditNote: null },
    { id: "5.3.07", title: "Skin in the game: el imperativo moral y epistémico", subtitle: "", type: "advanced", xp: 50, prerequisites: ["5.3.03", "3.5.06"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "3.5.06", priority: "high", reason: "Velo de Ignorancia sin skin=game es teoría inútil" }, { targetId: "1.3.10", priority: "critical", reason: "sin ergodicidad, el skin in the game es ruleta rusa" }], auditNote: null },
    { id: "5.3.08", title: "Efecto Mateo: ventaja acumulativa sistémica", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.1.08"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "1.1.08", priority: "high", reason: "Efecto Mateo es un ciclo virtuoso puro" }], auditNote: "NUEVA (Auditoría v2.0) - Reemplaza Ventos de Cola" }
];

export const BOSS_FIGHT_5_3: BossFight = {
    id: "bf-5.3",
    moduleId: "5.3",
    title: "Boss Fight",
    description: "Auditoría de carrera o proyecto: Mapea tu costo de oportunidad, tus incentivos ocultos y tu verdadera ventaja comparativa. Evalúa tu \"skin in the game\".",
    xp: 150,
    prerequisites: ["5.3.01", "5.3.02", "5.3.03", "5.3.04", "5.3.05", "5.3.06", "5.3.07", "5.3.08"]
};
