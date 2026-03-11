import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_3_2: Module = {
    id: "3.2",
    title: "Sesgos Cognitivos Core",
    subtitle: "",
    quote: "No eres tan racional como crees. Y eso no es un insulto, es un hecho neurológico.",
    pillar: 3,
    pillarName: "Pensamiento Crítico-Epistemológico",
    totalCards: 12
};

export const CARDS_3_2: ConceptCard[] = [
    { id: "3.2.01", title: "¿Qué son los sesgos cognitivos? (Kahneman: Sistema 1 vs. Sistema 2)", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.2.02", title: "Sesgo de confirmación: buscar lo que ya crees", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["3.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.2.03", title: "Efecto ancla (anchoring): el primer dato secuestra tu juicio", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.2.04", title: "Heurística de disponibilidad: confundir fácil de recordar con frecuente", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.2.05", title: "Efecto Dunning-Kruger: incompetencia inconsciente", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.2.01", "3.1.07"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.2.06", title: "Falacia del costo hundido (sunk cost)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "5.3.01", priority: "critical", reason: "costo hundido = ignorar costo de oportunidad real" }], auditNote: null },
    { id: "3.2.07", title: "Sesgo de statu quo: la preferencia irracional por no cambiar", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.2.08", title: "Sesgo de retrospección (hindsight): yo sabía que iba a pasar", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.2.01", "1.2.08"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.2.09", title: "Efecto de encuadre (framing): cómo la presentación cambia la decisión", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "4.2.06", priority: "high", reason: "framing es reframing involuntario" }], auditNote: null },
    { id: "3.2.10", title: "El punto ciego de los sesgos: eso les pasa a otros, no a mí", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.2.02", "3.2.05"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.2.11", title: "Falacia narrativa: confundir una buena historia con una buena explicación", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.2.01", "3.2.08"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "1.5.07", priority: "high", reason: "falacia narrativa corrompe el juicio Lindy" }], auditNote: null },
    { id: "3.2.12", title: "Gell-Mann Amnesia: confiar en medios sobre lo que no dominas", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.2.02", "3.1.02"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "3.4.07", priority: "critical", reason: "Gell-Mann Amnesia ↔ círculo de competencia" }], auditNote: null }
];

export const BOSS_FIGHT_3_2: BossFight = {
    id: "bf-3.2",
    moduleId: "3.2",
    title: "Boss Fight",
    description: "Pasa 15 minutos en redes sociales o viendo un debate político. Caza al menos 3 sesgos cognitivos en operación (en otros Y en ti mismo).",
    xp: 150,
    prerequisites: ["3.2.01", "3.2.02", "3.2.03", "3.2.04", "3.2.05", "3.2.06", "3.2.07", "3.2.08", "3.2.09", "3.2.10", "3.2.11", "3.2.12"]
};
