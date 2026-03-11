import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_5_4: Module = {
    id: "5.4",
    title: "Navegación Táctica Combinada",
    subtitle: "",
    quote: "Saber qué hacer y hacerlo bajo fuego son dos disciplinas distintas.",
    pillar: 5,
    pillarName: "Modelos Mentales Científicos y Prácticos",
    totalCards: 9
};

export const CARDS_5_4: ConceptCard[] = [
    { id: "5.4.01", title: "Matriz de Eishenhower y el mito de la Urgencia", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.4.02", title: "Proceso de DECISIÓN RÁPIDA: heurística en tiempo real", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.3.04", "5.4.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.3.05", priority: "high", reason: "decisión rápida requiere estimación intuitiva de valor esperado" }], auditNote: null },
    { id: "5.4.03", title: "Ciclo OODA (Observación, Orientación, Decisión, Acción)", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.1.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.4.04", title: "Navaja de Ockham: priorizando hipótesis simples", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["5.1.03", "1.3.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.3.03", priority: "critical", reason: "Ockham funciona mejor con alta tasa base" }], auditNote: null },
    { id: "5.4.05", title: "Navaja de Hanlon: ineptitud sobre malicia", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.2.01", "5.4.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "4.3.11", priority: "medium", reason: "ineptitud causada por alta fricción de diseño" }], auditNote: null },
    { id: "5.4.06", title: "Via Negativa sistémica: solucionar restando elementos", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.1.04", "5.2.05"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.2.11", priority: "critical", reason: "Via Negativa respeta la valla de Chesterton" }], auditNote: null },
    { id: "5.4.07", title: "Triaje: sacrificio selectivo para salvar el núcleo", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.4.03", "5.4.01"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "1.4.03", priority: "high", reason: "Triaje = trade-off en escenario extremo" }], auditNote: null },
    { id: "5.4.08", title: "Mapa vs. Territorio: cuando el modelo mental falla", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.1.07", "5.1.02"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "3.1.07", priority: "critical", reason: "Mapa vs Territorio requiere humildad epistémica absoluta" }], auditNote: null },
    { id: "5.4.09", title: "El Efecto de Masa Crítica y Puntos de Inflexión", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.1.06"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "1.1.06", priority: "high", reason: "masa crítica genera no-linealidad súbita" }], auditNote: "NUEVA (Auditoría v2.0)" }
];

export const BOSS_FIGHT_5_4: BossFight = {
    id: "bf-5.4",
    moduleId: "5.4",
    title: "Boss Fight",
    description: "Crisis Simulada: Define un proyecto actualmente atascado. Aplica OODA, corta la hipótesis más débil con Ockham, ejecuta Via Negativa quitando una dependencia, rescríbelo en Modo Triaje.",
    xp: 150,
    prerequisites: ["5.4.01", "5.4.02", "5.4.03", "5.4.04", "5.4.05", "5.4.06", "5.4.07", "5.4.08", "5.4.09"]
};
