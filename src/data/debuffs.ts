import type { BiasDefinition } from '../types';

export const COGNITIVE_BIASES: BiasDefinition[] = [
  {
    id: "confirmation",
    name: "Sesgo de Confirmación",
    question: "¿Busqué solo información que confirma lo que ya creo?",
    description: "Tendencia a buscar, interpretar y recordar información que confirma nuestras creencias previas.",
    icon: "Search"
  },
  {
    id: "anchoring",
    name: "Anclaje",
    question: "¿Me dejé influenciar demasiado por la primera información que recibí?",
    description: "Dependencia excesiva de la primera pieza de información ofrecida.",
    icon: "Anchor"
  },
  {
    id: "dunning-kruger",
    name: "Dunning-Kruger",
    question: "¿Estoy sobreestimando mi comprensión de este tema?",
    description: "Las personas con poco conocimiento tienden a sobreestimar su competencia.",
    icon: "TrendingUp"
  },
  {
    id: "availability",
    name: "Sesgo de Disponibilidad",
    question: "¿Estoy juzgando la probabilidad basándome en ejemplos fáciles de recordar?",
    description: "Sobreestimar la probabilidad de eventos que vienen fácilmente a la mente.",
    icon: "Brain"
  },
  {
    id: "sunk-cost",
    name: "Falacia del Costo Hundido",
    question: "¿Sigo invirtiendo en algo solo porque ya invertí mucho?",
    description: "Continuar un esfuerzo debido a recursos ya invertidos que no se pueden recuperar.",
    icon: "TrendingDown"
  },
  {
    id: "bandwagon",
    name: "Efecto Manada",
    question: "¿Creo esto solo porque muchos otros lo creen?",
    description: "Adoptar creencias o comportamientos porque muchos otros lo hacen.",
    icon: "Users"
  },
  {
    id: "hindsight",
    name: "Sesgo Retrospectivo",
    question: "¿Estoy diciendo 'yo ya lo sabía' después de conocer el resultado?",
    description: "Creer que un evento pasado era predecible después de que ocurrió.",
    icon: "History"
  },
  {
    id: "framing",
    name: "Efecto de Encuadre",
    question: "¿Mi opinión cambiaría si la misma información se presentara de otra forma?",
    description: "Reaccionar diferente a la misma información según cómo se presenta.",
    icon: "Frame"
  },
];
