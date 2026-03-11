import type { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: "first-blood",
        title: "Primera Sangre",
        description: "Has dado el primer paso hacia la polimatía.",
        icon: "Zap",
        condition: "Completa tu primera card",
        xpBonus: 50
    },
    {
        id: "module-clear",
        title: "Módulo Conquistado",
        description: "Dominio total del primer bloque de conocimiento.",
        icon: "Flag",
        condition: "Completa todas las cards de un módulo",
        xpBonus: 100
    },
    {
        id: "boss-slayer",
        title: "Cazador de Jefes",
        description: "Has derrotado a tu primer gran desafío sistémico.",
        icon: "Swords",
        condition: "Completa tu primer Boss Fight",
        xpBonus: 150
    },
    {
        id: "streak-7",
        title: "Racha Semanal",
        description: "Siete días de expansión mental ininterrumpida.",
        icon: "Flame",
        condition: "Estudia 7 días consecutivos",
        xpBonus: 100
    },
    {
        id: "streak-30",
        title: "Racha Mensual",
        description: "Un mes de consistencia polimática. Eres imparable.",
        icon: "Crown",
        condition: "Estudia 30 días consecutivos",
        xpBonus: 500
    },
    {
        id: "toolsmith",
        title: "Herrero Mental",
        description: "Tu caja de herramientas está empezando a pesar.",
        icon: "Wrench",
        condition: "Completa 10 Tool Cards",
        xpBonus: 100
    },
    {
        id: "master-toolsmith",
        title: "Maestro Herrero",
        description: "Dominas las herramientas del pensamiento.",
        icon: "Hammer",
        condition: "Completa 20 Tool Cards",
        xpBonus: 250
    },
    {
        id: "cross-pollinator",
        title: "Polinizador",
        description: "Conectas ideas a través de las fronteras de los pilares.",
        icon: "GitBranch",
        condition: "Activa 3 Cross-Pillar Combos",
        xpBonus: 100
    },
    {
        id: "recall-master",
        title: "Maestro del Recall",
        description: "Tu memoria a largo plazo te lo agradecerá.",
        icon: "Brain",
        condition: "Completa 5 repasos de Spaced Repetition",
        xpBonus: 100
    },
    {
        id: "night-owl",
        title: "Búho Nocturno",
        description: "La sabiduría florece bajo la luz de la luna.",
        icon: "Moon",
        condition: "Estudia después de las 11pm",
        xpBonus: 50
    },
    {
        id: "early-bird",
        title: "Madrugador",
        description: "El mundo duerme, tu mente despierta.",
        icon: "Sun",
        condition: "Estudia antes de las 6am",
        xpBonus: 50
    },
    {
        id: "content-creator",
        title: "Creador de Contenido",
        description: "No solo consumes, también construyes tu propio saber.",
        icon: "FileEdit",
        condition: "Carga contenido manual en 10 cards",
        xpBonus: 200
    },
    {
        id: "tax-collector",
        title: "Recaudador",
        description: "Has contribuido significativamente al conocimiento colectivo.",
        icon: "GraduationCap",
        condition: "Paga 5 Teaching Taxes",
        xpBonus: 150
    },
    {
        id: "quest-warrior",
        title: "Guerrero de Misiones",
        description: "Un hábito inquebrantable de conexión mental.",
        icon: "Scroll",
        condition: "Completa 7 Daily Quests",
        xpBonus: 100
    },
    {
        id: "quest-legend",
        title: "Leyenda de Misiones",
        description: "Tu mente es una red perfectamente sincronizada.",
        icon: "ScrollText",
        condition: "Completa 30 Daily Quests",
        xpBonus: 500
    },
    {
        id: "shadow-walker",
        title: "Caminante de Sombras",
        description: "Llevas la teoría a la práctica en los rincones del mundo real.",
        icon: "Eye",
        condition: "Completa 5 Shadow Quests",
        xpBonus: 100
    },
    {
        id: "devils-advocate",
        title: "Abogado del Diablo",
        description: "Cuestionas tus propias certezas. La mente más peligrosa es la que se desafía a sí misma.",
        icon: "Scale",
        condition: "Completa 3 Mirror Matches",
        xpBonus: 150
    },
    {
        id: "speed-thinker",
        title: "Pensador Relámpago",
        description: "Completa 5 Time Attacks a tiempo.",
        icon: "Zap",
        condition: "5 Time Attacks exitosos",
        xpBonus: 100
    },
    {
        id: "lightning-fast",
        title: "Velocidad Mental",
        description: "Completa un Time Attack en menos de 15 segundos.",
        icon: "Timer",
        condition: "TA < 15 seg",
        xpBonus: 200
    },
    {
        id: "self-aware",
        title: "Auto-Consciente",
        description: "Has dado el primer paso hacia la honestidad intelectual reportando tu primer sesgo.",
        icon: "Shield",
        condition: "Reporta tu primer sesgo",
        xpBonus: 50
    },
    {
        id: "bias-hunter",
        title: "Cazador de Sesgos",
        description: "Tu integridad intelectual es una brújula infalible. Has detectado 10 sesgos en ti mismo.",
        icon: "ShieldCheck",
        condition: "Reporta 10 sesgos",
        xpBonus: 200
    },
    {
        id: "polymath",
        title: "Polímata Verificado",
        description: "Has demostrado la capacidad de integrar múltiples modelos mentales para resolver problemas complejos.",
        icon: "Crown",
        condition: "Completa el Capstone Final",
        xpBonus: 500
    },
    {
        id: "reborn",
        title: "Renacido",
        description: "Inicia New Game+",
        icon: "RefreshCw",
        condition: "ngPlus.ngPlusCount > 0",
        xpBonus: 100
    },
    {
        id: "eternal-student",
        title: "Eterno Estudiante",
        description: "Completa New Game+",
        icon: "Infinity",
        condition: "ngPlus.isCompleted && ngPlusCount > 0", // Generic logic check
        xpBonus: 1000
    },
    {
        id: "stat-nerd",
        title: "Nerd de las Estadísticas",
        description: "Has visitado el dashboard de estadísticas 10 veces. Los datos no mienten.",
        icon: "BarChart3",
        condition: "Visita Stats 10 veces",
        xpBonus: 50
    },
    {
        id: "pillar-master-1",
        title: "Maestro del Pensamiento Sistémico",
        description: "Has dominado el primer pilar de la polimatía.",
        icon: "Network",
        condition: "Completa el Milestone del Pilar 1",
        xpBonus: 300
    },
    {
        id: "pillar-master-2",
        title: "Maestro de la Metacognición",
        description: "Has dominado el segundo pilar de la polimatía.",
        icon: "BrainCircuit",
        condition: "Completa el Milestone del Pilar 2",
        xpBonus: 300
    },
    {
        id: "pillar-master-3",
        title: "Maestro del Pensamiento Crítico",
        description: "Has dominado el tercer pilar de la polimatía.",
        icon: "Search",
        condition: "Completa el Milestone del Pilar 3",
        xpBonus: 300
    },
    {
        id: "pillar-master-4",
        title: "Maestro de la Creatividad",
        description: "Has dominado el cuarto pilar de la polimatía.",
        icon: "Lightbulb",
        condition: "Completa el Milestone del Pilar 4",
        xpBonus: 300
    },
    {
        id: "pillar-master-5",
        title: "Maestro del Pensamiento Computacional",
        description: "Has dominado el quinto pilar de la polimatía.",
        icon: "Terminal",
        condition: "Completa el Milestone del Pilar 5",
        xpBonus: 300
    }
];
