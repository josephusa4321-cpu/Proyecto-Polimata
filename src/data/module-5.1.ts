import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_5_1: Module = {
    id: "5.1",
    title: "Filosofía Práctica de la Ciencia",
    subtitle: "",
    quote: "La ciencia no es un cuerpo de verdades, sino un método para descubrir mentiras sistemáticamente.",
    pillar: 5,
    pillarName: "Modelos Mentales Científicos y Prácticos",
    totalCards: 6
};

export const CARDS_5_1: ConceptCard[] = [
    { id: "5.1.01", title: "El método científico como heurística vital", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.1.02", title: "Hipótesis vs. teorías vs. leyes: distinciones formales", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["5.1.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.1.03", title: "Método hipotético-deductivo en escenarios cotidianos", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["5.1.01", "2.1.02", "3.1.05"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "2.1.06", priority: "critical", reason: "abducción sugiere la hipótesis, deducción la prueba" }, { targetId: "3.1.05", priority: "high", reason: "falsabilidad es central para la hipótesis" }], auditNote: null },
    { id: "5.1.04", title: "Replicabilidad empírica, no sólo racionalidad teórica", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["5.1.02"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.1.05", title: "Experimentos ciegos y efecto placebo en decisiones no médicas", subtitle: "", type: "advanced", xp: 50, prerequisites: ["5.1.03", "3.2.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.1.06", title: "Falsacionismo fuerte en pruebas A/B", subtitle: "", type: "advanced", xp: 50, prerequisites: ["5.1.03", "3.1.05"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [], auditNote: null }
];

export const BOSS_FIGHT_5_1: BossFight = {
    id: "bf-5.1",
    moduleId: "5.1",
    title: "Boss Fight",
    description: "Plantea una hipótesis sobre tu productividad, falsable empíricamente, diseña un experimento semanal, ejecútalo y documenta si la hipótesis resiste.",
    xp: 150,
    prerequisites: ["5.1.01", "5.1.02", "5.1.03", "5.1.04", "5.1.05", "5.1.06"]
};
