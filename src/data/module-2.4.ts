import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_2_4: Module = {
    id: "2.4",
    title: "Razonamiento Cuantitativo",
    subtitle: "",
    quote: "No necesitas un PhD en estadística. Necesitas no ser engañado por números.",
    pillar: 2,
    pillarName: "Pensamiento Lógico-Analítico",
    totalCards: 6
};

export const CARDS_2_4: ConceptCard[] = [
    { id: "2.4.01", title: "Órdenes de magnitud: pensar en escalas", subtitle: "", type: "fundamental", xp: 100, prerequisites: [], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.4.02", title: "Alfabetización estadística básica: media, mediana, distribución", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.4.01"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.4.03", title: "Regresión a la media: por qué lo extremo se normaliza", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.4.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "1.3.07", priority: "medium", reason: "regresión a la media como heurística probabilística" }], auditNote: null },
    { id: "2.4.04", title: "Paradoja de Simpson: cuando los datos agregados mienten", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.4.02", "1.2.02"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "2.4.05", title: "Sesgo de supervivencia en datos", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["2.4.02"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [{ targetId: "3.2.01", priority: "high", reason: "sesgo de supervivencia como bug de Sistema 1" }], auditNote: null },
    { id: "2.4.06", title: "Ley de los grandes números vs. ley de los pequeños números", subtitle: "", type: "advanced", xp: 50, prerequisites: ["2.4.02", "1.3.03"], isTool: false, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null }
];

export const BOSS_FIGHT_2_4: BossFight = {
    id: "bf-2.4",
    moduleId: "2.4",
    title: "Boss Fight",
    description: "Analiza un artículo que use estadísticas. Encuentra al menos 3 errores o presentaciones engañosas.",
    xp: 150,
    prerequisites: ["2.4.01", "2.4.02", "2.4.03", "2.4.04", "2.4.05", "2.4.06"]
};
