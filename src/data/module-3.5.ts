import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_3_5: Module = {
    id: "3.5",
    title: "Razonamiento Ético",
    subtitle: "",
    quote: "La lógica sin ética es peligrosa. La ética sin lógica es inútil.",
    pillar: 3,
    pillarName: "Pensamiento Crítico-Epistemológico",
    totalCards: 7
};

export const CARDS_3_5: ConceptCard[] = [
    { id: "3.5.01", title: "Los tres grandes frameworks éticos: consecuencialismo, deontología, virtud", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.5.02", title: "Consecuencialismo/utilitarismo: juzgar por resultados", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.5.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.3.05", priority: "high", reason: "utilitarismo usa cálculo de valor esperado" }], auditNote: null },
    { id: "3.5.03", title: "Deontología (Kant): juzgar por principios y deberes", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.5.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.5.04", title: "Ética de la virtud (Aristóteles): juzgar por el carácter", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["3.5.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "3.5.05", title: "Dilemas éticos: cuando los frameworks chocan entre sí", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.5.02", "3.5.03", "3.5.04"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.4.05", priority: "medium", reason: "dilemas éticos como juegos de coordinación" }], auditNote: null },
    { id: "3.5.06", title: "El velo de la ignorancia (Rawls): diseñar reglas justas", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.5.03"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "5.3.07", priority: "high", reason: "velo de ignorancia ↔ skin in the game" }], auditNote: null },
    { id: "3.5.07", title: "Intuiciones morales vs. razonamiento moral", subtitle: "", type: "advanced", xp: 50, prerequisites: ["3.5.05", "3.2.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null }
];

export const BOSS_FIGHT_3_5: BossFight = {
    id: "bf-3.5",
    moduleId: "3.5",
    title: "Boss Fight",
    description: "Analiza un dilema ético real desde los 3 frameworks. Construye tu posición personal explicando qué framework priorizas y por qué.",
    xp: 150,
    prerequisites: ["3.5.01", "3.5.02", "3.5.03", "3.5.04", "3.5.05", "3.5.06", "3.5.07"]
};
