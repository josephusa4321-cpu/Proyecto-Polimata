import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_3_3: Module = {
    id: "3.3",
    title: "Falacias Lógicas Core",
    subtitle: "",
    quote: "Una falacia no es un error inocente. Es un argumento que parece válido pero no lo es.",
    pillar: 3,
    pillarName: "Pensamiento Crítico-Epistemológico",
    totalCards: 10
};

export const CARDS_3_3: ConceptCard[] = [
    { id: "3.3.01", title: "¿Qué es una falacia lógica? Diferencia con sesgo cognitivo", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["2.2.01", "3.2.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.3.02", title: "Ad hominem: atacar a la persona, no al argumento", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.3.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.3.03", title: "Hombre de paja (straw man): distorsionar la posición del otro", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.3.01", "2.2.06"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "2.2.06", priority: "critical", reason: "straw man = inverso del steel-man" }], auditNote: null },
    { id: "3.3.04", title: "Apelación a la autoridad: la expertise no es argumento en sí", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.3.01", "3.1.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.3.05", title: "Falsa dicotomía: o estás conmigo o contra mí", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.3.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.3.06", title: "Pendiente resbaladiza (slippery slope)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.3.01", "1.2.05"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.2.05", priority: "high", reason: "pendiente resbaladiza abusa del pensamiento de 2do orden" }], auditNote: null },
    { id: "3.3.07", title: "Razonamiento circular (petitio principii)", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.3.01", "2.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.3.08", title: "Red herring: desviar la atención del punto central", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.3.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.3.09", title: "Tu quoque: tú también lo haces no invalida el argumento", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.3.02"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.3.10", title: "Apelación a la naturaleza/tradición: siempre fue así no es argumento", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.3.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null }
];

export const BOSS_FIGHT_3_3: BossFight = {
    id: "bf-3.3",
    moduleId: "3.3",
    title: "Boss Fight",
    description: "Mira un debate político de TV (15-20 minutos). Caza al menos 5 falacias lógicas. Documenta quién la usó, qué tipo, por qué parece convincente.",
    xp: 150,
    prerequisites: ["3.3.01", "3.3.02", "3.3.03", "3.3.04", "3.3.05", "3.3.06", "3.3.07", "3.3.08", "3.3.09", "3.3.10"]
};
