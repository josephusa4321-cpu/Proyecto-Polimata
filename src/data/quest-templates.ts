export type QuestType = 'connection' | 'application' | 'contradiction' | 'synthesis' | 'realworld';

export const QUEST_TEMPLATES: Record<QuestType, string[]> = {

  // ═══════════════════════════════════════════
  // CONEXIONES: Encontrar el hilo invisible
  // ═══════════════════════════════════════════
  connection: [
    // --- Originales (3) ---
    '¿Cómo se relacionan "{card1}" y "{card2}"? Describe la conexión más profunda entre ambos conceptos.',
    '¿Qué tienen en común "{card1}" y "{card2}"? ¿En qué situación usarías ambos juntos?',
    'Explica cómo "{card1}" potencia o complementa a "{card2}" en la práctica.',

    // --- Nuevas: Conexiones Locas (15) ---
    'Si "{card1}" fuera una herramienta física y "{card2}" fuera otra, ¿qué construirías combinándolas?',
    
    'Imagina que eres profesor y tienes que enseñar "{card1}" usando "{card2}" como analogía principal. ¿Cómo lo harías?',
    
    'Un historiador del futuro estudia nuestra época. ¿Cómo usaría "{card1}" y "{card2}" juntos para explicar un fenómeno actual?',
    
    '¿Puede "{card1}" ser un CASO ESPECIAL de "{card2}"? Argumenta por qué sí o por qué no.',
    
    '¿Puede "{card2}" ser una CONSECUENCIA de aplicar mal "{card1}"? Construye el escenario.',
    
    'Si "{card1}" es la enfermedad, ¿puede "{card2}" ser la cura? ¿O viceversa?',
    
    'Encuentra el ancestro común: ¿qué principio más profundo comparten "{card1}" y "{card2}"?',
    
    'Un detective usa "{card1}" para encontrar pistas y "{card2}" para descartarlas. ¿Cómo funciona esa investigación?',
    
    '¿En qué profesión sería LETAL no entender la relación entre "{card1}" y "{card2}"? ¿Por qué?',
    
    'Escribe un tweet (280 caracteres) que capture la conexión entre "{card1}" y "{card2}".',
    
    '¿Qué decisión tomarías DIFERENTE si entendieras "{card1}" y "{card2}" simultáneamente vs. solo uno de los dos?',
    
    'Si "{card1}" fuera el acelerador de un carro y "{card2}" fuera el freno, ¿qué carro estás conduciendo y hacia dónde va?',
    
    'Nombra una película, serie o libro donde "{card1}" y "{card2}" estén operando al mismo tiempo. Explica la escena.',
    
    '¿Cómo le explicarías la relación entre "{card1}" y "{card2}" a un niño de 10 años usando solo ejemplos de su vida cotidiana?',
    
    'Diseña un experimento mental donde eliminas "{card1}" del mundo. ¿Qué le pasa a "{card2}"? ¿Sigue funcionando?',
  ],

  // ═══════════════════════════════════════════
  // APLICACIÓN: Llevar la teoría a la calle
  // ═══════════════════════════════════════════
  application: [
    // --- Originales (3) ---
    'Diseña un escenario real donde apliques "{card1}" para resolver un problema concreto.',
    '¿Cómo usarías "{card1}" en un proyecto actual tuyo? Sé específico.',
    'Da un ejemplo de "{card1}" que hayas observado en el mundo real esta semana.',

    // --- Nuevas (12) ---
    'Tu jefe te pide resolver un problema urgente. Tienes 5 minutos para presentar una solución. ¿Cómo usas "{card1}" para estructurar tu respuesta?',
    
    'Estás en una discusión con un amigo sobre política. ¿Cómo aplicarías "{card1}" para mejorar la calidad de la conversación?',
    
    'Una startup acaba de perder el 40% de sus clientes. Usa "{card1}" y "{card2}" para diagnosticar qué pudo pasar y proponer un plan.',
    
    'Estás criando un hijo de 8 años. ¿Cómo le enseñarías "{card1}" sin usar la palabra "{card1}"?',
    
    'Tu ciudad tiene un problema de tráfico terrible. Aplica "{card1}" para analizarlo y proponer algo que la mayoría no vería.',
    
    'Acabas de leer una noticia que te indigna. Antes de compartirla, ¿cómo aplicas "{card1}" para evaluarla?',
    
    'Estás negociando tu salario. ¿Cómo te ayuda "{card1}" a prepararte?',
    
    'Un restaurante popular cerró después de 20 años. Usa "{card1}" y "{card2}" para hacer la autopsia del negocio.',
    
    'Tienes que elegir entre dos ofertas de trabajo. Aplica "{card1}" para tomar la decisión. ¿Qué cambia vs. decidir "con la tripa"?',
    
    'Estás designing tu rutina matutina ideal. ¿Cómo aplicas "{card1}" para hacerla mejor que simplemente copiar la de un influencer?',
    
    'Tu equipo de trabajo tiene un conflicto recurrente que nadie resuelve. Usa "{card1}" para ver lo que los demás no están viendo.',
    
    'Un gobierno quiere reducir la obesidad en su población. Usa "{card1}" y "{card2}" para diseñar una política que no tenga consecuencias no intencionadas graves.',
  ],

  // ═══════════════════════════════════════════
  // CONTRADICCIÓN: Romper y reconstruir
  // ═══════════════════════════════════════════
  contradiction: [
    // --- Originales (3) ---
    '¿Hay algún caso donde "{card1}" y "{card2}" sean contradictorios? ¿Cómo lo resolverías?',
    '¿Cuáles son las limitaciones de "{card1}"? ¿Cuándo NO deberías aplicarlo?',
    'Desafía "{card1}": ¿en qué contexto este concepto podría fallar o ser contraproducente?',

    // --- Nuevas (12) ---
    '¿Qué consejo darían "{card1}" y "{card2}" sobre la MISMA situación? If dicen cosas diferentes, ¿quién tiene razón y cuándo?',
    
    'Construye el mejor argumento posible de que "{card1}" es SOBREVALORADO y la gente lo usa mal.',
    
    'Si "{card1}" es verdad, ¿qué otra cosa que la mayoría cree debería ser FALSA? Sigue la cadena lógica.',
    
    '¿En qué contexto "{card1}" no aplicaría? ¿Eso lo invalida o lo matiza?',
    
    'Alguien usa "{card1}" para justificar una decisión terrible. ¿Cómo lo está mal-aplicando y cómo lo confrontarías?',
    
    '"{card1}" y "{card2}" parecen decir lo mismo. ¿Realmente son idénticos o hay una diferencia sutil pero crucial?',
    
    'If solo pudieras conservar UNO de estos dos conceptos y olvidar el otro para siempre, ¿cuál conservas: "{card1}" o "{card2}"? Justifica.',
    
    '¿Cuál es el "lado oscuro" de "{card1}"? ¿Cómo podría usarse para manipular o engañar?',
    
    'Un experto en "{card1}" y un experto en "{card2}" debaten sobre cómo resolver la crisis climática. ¿En qué punto se contradecirían?',
    
    'Encuentra el punto de quiebre: ¿a partir de qué magnitud o escala "{card1}" deja de funcionar?',
    
    '¿Puedes usar "{card2}" para REFUTAR una aplicación ingenua de "{card1}"? Construye el contra-argumento.',
    
    'Si "{card1}" fuera una ley, ¿quién la violaría primero y por qué?',
  ],

  // ═══════════════════════════════════════════
  // 🆕 SÍNTESIS: Crear algo nuevo combinando
  // ═══════════════════════════════════════════
  synthesis: [
    'Combina "{card1}" y "{card2}" para crear un NUEVO modelo mental que no existe. Dale nombre y describe cómo funciona.',
    
    'Diseña un checklist de 5 preguntas que una persona debería hacerse antes de tomar una decisión importante, usando "{card1}" y "{card2}" como base.',
    
    'Crea una metáfora original que explique "{card1}" usando algo de la naturaleza (biología, física, clima, etc.).',
    
    'Escribe las "3 reglas de oro" de "{card1}" que le dirías a tu yo de hace 5 años.',
    
    'Si "{card1}" y "{card2}" tuvieran un hijo conceptual, ¿qué concepto nuevo nacería? Descríbelo.',
    
    'Diseña un "algoritmo mental" de 4 pasos que combine "{card1}" y "{card2}" para analizar cualquier problema complejo.',
    
    'Crea un principio nuevo combinando la FORTALEZA de "{card1}" con la FORTALEZA de "{card2}" y eliminando la debilidad de ambos.',
    
    'Si tuvieras que escribir un capítulo de un libro llamado "Cómo Pensar Mejor", ¿cómo organizarías "{card1}" y "{card2}" en la misma lección?',
    
    'Inventa una "pregunta gatillo" (una sola pregunta) que te obligue a activar tanto "{card1}" como "{card2}" al mismo tiempo.',
    
    'Diseña una herramienta visual (diagrama, canvas, framework) que integre "{card1}" y "{card2}" en un solo proceso de análisis.',
    
    'Si tuvieras que resolver el problema de la desinformación en redes sociales usando SOLO "{card1}" y "{card2}", ¿qué solución diseñarías?',
    
    '¿Qué profesión nueva se crearía si todo el mundo dominara "{card1}" y "{card2}"? ¿Qué haría esa persona?',
  ],

  // ═══════════════════════════════════════════
  // 🆕 MUNDO REAL: Observación y campo
  // ═══════════════════════════════════════════
  realworld: [
    'Sal a caminar 10 minutos (o mira por la ventana). Encuentra un ejemplo de "{card1}" en lo que observas. Descríbelo.',
    
    'Abre tu app de noticias favorita. El primer artículo que veas: ¿cómo se relaciona con "{card1}"?',
    
    'Piensa en la última decisión importante que tomaste. ¿Habrías decidido diferente si hubieras aplicado "{card1}"?',
    
    'Observa una conversación entre dos personas hoy (en persona, en TV, en redes). ¿Dónde ves "{card1}" operando sin que ellos lo sepan?',
    
    'Piensa en el líder mundial que más admiras. ¿Usa "{card1}" consciente o inconscientemente? Da un ejemplo concreto.',
    
    '¿En qué momento de tu última semana "{card1}" te habría ahorrado tiempo, dinero o frustración?',
    
    'Abre Twitter/X o Instagram. Encuentra un post viral y analízalo usando "{card1}". ¿Por qué se hizo viral visto desde ese concepto?',
    
    'Piensa en tu familia. ¿Qué dinámica familiar es un ejemplo perfecto de "{card1}" en acción?',
    
    'Recuerda la última vez que te equivocaste en algo. ¿"{card1}" te habría ayudado a evitarlo?',
    
    'Observa un negocio local (tienda, restaurante, etc). ¿Dónde ves "{card1}" operando en su modelo? ¿Dónde lo están ignorando?',
    
    'Piensa en tu deporte o hobby favorito. ¿Cómo aplica "{card1}" ahí de una forma que la mayoría no nota?',
    
    'Mira tu escritorio o tu cuarto. ¿Qué objeto es una metáfora visual de "{card1}"? Explica por qué.',
  ],
};

// ═══════════════════════════════════════════
// QUEST DIFFICULTY MODIFIERS
// ═══════════════════════════════════════════

export const QUEST_DIFFICULTY: Record<string, { minCards: number; types: QuestType[]; xp: number }> = {
  beginner:     { minCards: 2,  types: ['connection', 'application', 'realworld'], xp: 25 },
  intermediate: { minCards: 10, types: ['connection', 'application', 'contradiction', 'realworld'], xp: 30 },
  advanced:     { minCards: 30, types: ['connection', 'contradiction', 'synthesis', 'realworld'], xp: 40 },
  expert:       { minCards: 80, types: ['contradiction', 'synthesis'], xp: 50 },
};

// ═══════════════════════════════════════════
// SPECIAL CROSS-PILLAR QUEST TEMPLATES
// ═══════════════════════════════════════════

export const CROSS_PILLAR_QUEST_TEMPLATES: string[] = [
  '🔗 COMBO QUEST: "{card1}" (Pilar {pillar1}) y "{card2}" (Pilar {pillar2}) vienen de mundos diferentes. ¿Qué puente invisible los conecta?',
  
  '🔗 COMBO QUEST: Un problema que normalmente resolverías solo con "{card1}" (Pilar {pillar1}). ¿Cómo cambia tu solución si agregas la perspectiva de "{card2}" (Pilar {pillar2})?',
  
  '🔗 COMBO QUEST: ¿Cuándo "{card1}" del pensamiento {pillar1Name} y "{card2}" del pensamiento {pillar2Name} se NECESITAN mutuamente? Da un ejemplo donde usar solo uno sea peligroso.',
  
  '🔗 COMBO QUEST: Estás entrenando a alguien en pensamiento crítico. ¿Por qué le enseñarías "{card1}" y "{card2}" juntos en vez de por separado?',
  
  '🔗 COMBO QUEST: Crea un "super-modelo mental" que fusione "{card1}" de Pilar {pillar1} con "{card2}" de Pilar {pillar2}. ¿Cómo lo llamarías y cómo funciona?',
  
  '🔗 COMBO QUEST: Un CEO, un científico y un artista debaten. El CEO usa "{card1}", el científico usa "{card2}". ¿Quién tiene razón y por qué la respuesta es "depende"?',
];

export function selectQuestTemplate(
  completedCount: number,
  card1PillarId: number,
  card2PillarId: number
): { type: QuestType; template: string; isCrossPillar: boolean } {
  
  const difficulty = completedCount >= 80 ? 'expert' 
    : completedCount >= 30 ? 'advanced'
    : completedCount >= 10 ? 'intermediate' 
    : 'beginner';
  
  const config = QUEST_DIFFICULTY[difficulty];
  const isCrossPillar = card1PillarId !== card2PillarId && Math.random() < 0.4;
  
  if (isCrossPillar) {
    const template = CROSS_PILLAR_QUEST_TEMPLATES[
      Math.floor(Math.random() * CROSS_PILLAR_QUEST_TEMPLATES.length)
    ];
    return { type: 'connection', template, isCrossPillar: true };
  }
  
  const type = config.types[Math.floor(Math.random() * config.types.length)];
  const templates = QUEST_TEMPLATES[type];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return { type, template, isCrossPillar: false };
}
