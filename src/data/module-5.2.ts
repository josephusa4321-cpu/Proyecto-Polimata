import type { Module, ConceptCard, BossFight } from '../types';

export const MODULE_5_2: Module = {
    id: "5.2",
    title: "Ingeniería y Sistemas Optimizados",
    subtitle: "",
    quote: "La ingeniería no es matemática exacta, es el arte civilizado de hacer concesiones.",
    pillar: 5,
    pillarName: "Modelos Mentales Científicos y Prácticos",
    totalCards: 7
};

export const CARDS_5_2: ConceptCard[] = [
    { id: "5.2.01", title: "Margen de seguridad en sistemas no-físicos", subtitle: "", type: "fundamental", xp: 100, prerequisites: ["1.5.06"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.2.02", title: "Redundancia intencional (hot vs. cold stand-by)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["5.2.01"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.2.03", title: "Cuello de botella (Teoría de Restricciones)", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["1.1.04"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.2.04", title: "Eficiencia de Pareto (80/20) y sus límites no-lineales", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["5.2.03", "1.1.06"], isTool: true, isNew: false, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.2.05", title: "Fricción sistémica: reducir arrastre vs. aumentar empuje", subtitle: "", type: "advanced", xp: 50, prerequisites: ["5.2.03", "4.3.11"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "4.3.11", priority: "critical", reason: "fricción psicológica vs. sistémica" }], auditNote: null },
    { id: "5.2.06", title: "Mantenimiento preventivo vs. correctivo en hábitos vitales", subtitle: "", type: "advanced", xp: 50, prerequisites: ["1.2.05"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [], auditNote: null },
    { id: "5.2.07", title: "Optimización local vs. optimización global", subtitle: "", type: "intermediate", xp: 75, prerequisites: ["5.2.03", "1.1.04"], isTool: true, isNew: true, isReframed: false, crossPillarLinks: [{ targetId: "1.1.04", priority: "high", reason: "optimizar partes puede destruir el sistema" }], auditNote: "NUEVA (Auditoría v2.0)" }
];

export const BOSS_FIGHT_5_2: BossFight = {
    id: "bf-5.2",
    moduleId: "5.2",
    title: "Boss Fight",
    description: "Mapea un sistema logístico diario (ej. rutina matutina, ruta al trabajo). Identifica el cuello de botella. Aplica 80/20 para eliminar fricción y diseña un margen de seguridad activo.",
    xp: 150,
    prerequisites: ["5.2.01", "5.2.02", "5.2.03", "5.2.04", "5.2.05", "5.2.06", "5.2.07"]
};
