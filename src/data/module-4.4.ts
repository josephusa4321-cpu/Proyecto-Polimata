import { type Module, type ConceptCard, type BossFight } from '../types';

export const MODULE_4_4: Module = {
    id: "4.4",
    title: "Pensamiento Analógico e Intuitivo",
    subtitle: "",
    quote: "Las mejores ideas vienen de preguntar: ¿Dónde he visto esto antes, en otro contexto?",
    pillar: 4,
    pillarName: "Pensamiento Creativo-Divergente",
    totalCards: 5
};

export const CARDS_4_4: ConceptCard[] = [
    { 
        id: "4.4.01", 
        title: "Analogías cross-domain: transferir soluciones entre campos", 
        subtitle: "", 
        type: "fundamental", 
        xp: 100, 
        prerequisites: ["4.1.04"], 
        isTool: true, 
        isNew: false, 
        isReframed: false, 
        crossPillarLinks: [
            { targetId: "1.1.01", priority: "critical", reason: "analogías cross-domain = base de combos XP" },
            { targetId: "2.1.01", priority: "critical", reason: "analogías cross-domain = base de combos XP" },
            { targetId: "3.1.01", priority: "critical", reason: "analogías cross-domain = base de combos XP" },
            { targetId: "5.1.01", priority: "critical", reason: "analogías cross-domain = base de combos XP" }
        ], 
        auditNote: null 
    },
    { 
        id: "4.4.02", 
        title: "Reconocimiento de patrones: la base de la intuición experta", 
        subtitle: "", 
        type: "intermediate", 
        xp: 75, 
        prerequisites: ["4.4.01"], 
        isTool: false, 
        isNew: false, 
        isReframed: false, 
        crossPillarLinks: [], 
        auditNote: null 
    },
    { 
        id: "4.4.03", 
        title: "Intuición como experiencia comprimida (Kahneman/Klein)", 
        subtitle: "", 
        type: "intermediate", 
        xp: 75, 
        prerequisites: ["4.4.02", "3.2.01"], 
        isTool: false, 
        isNew: false, 
        isReframed: false, 
        crossPillarLinks: [
            { targetId: "3.4.05", priority: "high", reason: "intuición vs. razonamiento emocional" }
        ], 
        auditNote: null 
    },
    { 
        id: "4.4.04", 
        title: "Cuándo confiar en la intuición (y cuándo no)", 
        subtitle: "", 
        type: "intermediate", 
        xp: 75, 
        prerequisites: ["4.4.03", "3.4.02"], 
        isTool: true, 
        isNew: false, 
        isReframed: false, 
        crossPillarLinks: [], 
        auditNote: null 
    },
    { 
        id: "4.4.05", 
        title: "Simulación mental: correr el escenario en la cabeza", 
        subtitle: "", 
        type: "advanced", 
        xp: 50, 
        prerequisites: ["4.4.02", "1.2.05"], 
        isTool: true, 
        isNew: false, 
        isReframed: false, 
        crossPillarLinks: [], 
        auditNote: null 
    }
];

export const BOSS_FIGHT_4_4: BossFight = {
    id: "bf-4.4",
    moduleId: "4.4",
    title: "Boss Fight",
    description: "Resuelve un problema usando analogías de al menos 2 campos completamente distintos.",
    xp: 150,
    prerequisites: ["4.4.01", "4.4.02", "4.4.03", "4.4.04", "4.4.05"]
};
