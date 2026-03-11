import type { Pillar } from '../types'

export const PILLARS: Pillar[] = [
  {
    id: 1,
    name: "Pensamiento Estratégico-Sistémico",
    description: "Tipos absorbidos: Estratégico, Sistémico, 2do Orden, Prospectivo, Probabilístico, Causal, Contrafactual",
    typesAbsorbed: ["Estratégico", "Sistémico", "2do Orden", "Prospectivo", "Probabilístico", "Causal", "Contrafactual"],
    modules: ["1.1", "1.2", "1.3", "1.4", "1.5"],
    totalCards: 53,
    totalXP: 4900,
    milestone: {
      id: "ms-p1",
      pillarId: 1,
      title: "El Estratega Sistémico",
      description: "Selecciona un problema complejo real (geopolítico, tecnológico, o social). Aplica al menos 8 herramientas de tu Toolbelt del Pilar 1 para: (a) mapear el sistema con bucles de retroalimentación, (b) identificar causas raíz vs. próximas, (c) cuantificar incertidumbre con distribuciones, (d) diseñar una estrategia con trade-offs explícitos, (e) construir 2 escenarios alternativos, (f) hacer un pre-mortem, (g) evaluar la antifragilidad de tu propuesta. Entrega: documento de 3-5 páginas.",
      xp: 300,
      prerequisites: ["bf-1.1", "bf-1.2", "bf-1.3", "bf-1.4", "bf-1.5"],
      status: "locked"
    }
  },
  {
    id: 2,
    name: "Pensamiento Lógico-Analítico",
    description: "Tipos absorbidos: Deductivo, Inductivo, Abductivo, Convergente, Analítico",
    typesAbsorbed: ["Deductivo", "Inductivo", "Abductivo", "Convergente", "Analítico"],
    modules: ["2.1", "2.2", "2.3", "2.4"],
    totalCards: 38,
    totalXP: 3775,
    milestone: {
      id: "ms-p2",
      pillarId: 2,
      title: "El Desarmador de Argumentos",
      description: "Selecciona un debate público actual (político, económico, tecnológico). Toma los argumentos de ambos lados y: (a) mapea su estructura lógica, (b) identifica premisas ocultas, (c) evalúa la evidencia cuantitativa, (d) steel-man ambas posiciones, (e) construye tu posición con cadena de razonamiento explícita. Entrega: análisis de 2-3 páginas.",
      xp: 300,
      prerequisites: ["bf-2.1", "bf-2.2", "bf-2.3", "bf-2.4"],
      status: "locked"
    }
  },
  {
    id: 3,
    name: "Pensamiento Crítico-Epistemológico",
    description: "Tipos absorbidos: Crítico, Metacognitivo, Reflexivo, Epistemológico, Ético/Moral",
    typesAbsorbed: ["Crítico", "Metacognitivo", "Reflexivo", "Epistemológico", "Ético/Moral"],
    modules: ["3.1", "3.2", "3.3", "3.4", "3.5"],
    totalCards: 45,
    totalXP: 4325,
    milestone: {
      id: "ms-p3",
      pillarId: 3,
      title: "El Escéptico Honesto",
      description: "Selecciona una creencia personal fuerte e importante (política, filosófica, económica, o científica). Somete tu propia creencia a un audit completo: (a) identifica en qué evidencia se basa y evalúa su calidad epistemológica, (b) busca activamente evidencia que la contradiga, (c) mapea qué sesgos podrían estar influyendo tu posición, (d) steel-man la posición opuesta, (e) evalúa éticamente las implicaciones de tu creencia, (f) recalibra tu nivel de confianza usando la escala de 3.4.02. Entrega: ensayo de 2-3 páginas con conclusión honesta.",
      xp: 300,
      prerequisites: ["bf-3.1", "bf-3.2", "bf-3.3", "bf-3.4", "bf-3.5"],
      status: "locked"
    }
  },
  {
    id: 4,
    name: "Pensamiento Creativo-Divergente",
    description: "Tipos absorbidos: Lateral, Divergente, Analógico, Intuitivo, Design Thinking, Creativo",
    typesAbsorbed: ["Lateral", "Divergente", "Analógico", "Intuitivo", "Design Thinking", "Creativo"],
    modules: ["4.1", "4.2", "4.3", "4.4"],
    totalCards: 29,
    totalXP: 2875,
    milestone: {
      id: "ms-p4",
      pillarId: 4,
      title: "El Innovador de Conexiones",
      description: "Selecciona un problema sin resolver (técnico, social, o de negocio). Genera al menos 30 ideas usando un mínimo de 5 técnicas distintas de este pilar. Usa pensamiento convergente (Pilar 2) para filtrar a las 3 mejores. Externaliza una de ellas (prototipo conceptual). Entrega: documento de 2-3 páginas + las 30 ideas con la técnica usada para cada una.",
      xp: 300,
      prerequisites: ["bf-4.1", "bf-4.2", "bf-4.3", "bf-4.4"],
      status: "locked"
    }
  },
  {
    id: 5,
    name: "Pensamiento Aplicado-Computacional",
    description: "Tipos absorbidos: Computacional, Económico (trade-offs/incentivos), Científico, Hipotético-Deductivo",
    typesAbsorbed: ["Computacional", "Económico", "Científico", "Hipotético-Deductivo"],
    modules: ["5.1", "5.2", "5.3", "5.4"],
    totalCards: 29,
    totalXP: 2950,
    milestone: {
      id: "ms-p5",
      pillarId: 5,
      title: "El Tomador de Decisiones",
      description: "Selecciona 3 decisiones reales de distintas escalas: una micro (personal/diaria), una media (proyecto/laboral), una macro (sociedad/política). Para cada una: (a) aplica costo de oportunidad + incentivos, (b) diseña un mini-experimento para testear tu hipótesis, (c) usa al menos 2 frameworks de decisión, (d) identifica quién tiene skin in the game y quién no, (e) evalúa si tu solución escala. Entrega: documento de 3-4 páginas.",
      xp: 300,
      prerequisites: ["bf-5.1", "bf-5.2", "bf-5.3", "bf-5.4"],
      status: "locked"
    }
  }
]
