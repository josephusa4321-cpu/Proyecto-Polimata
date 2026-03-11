export const QUEST_TEMPLATES: Record<'connection' | 'application' | 'contradiction', string[]> = {
    connection: [
        '¿Cómo se relacionan "{card1}" y "{card2}"? Describe la conexión más profunda entre ambos conceptos.',
        '¿Qué tienen en común "{card1}" y "{card2}"? ¿En qué situación usarías ambos juntos?',
        'Explica cómo "{card1}" potencia o complementa a "{card2}" en la práctica.',
    ],
    application: [
        'Diseña un escenario real donde apliques "{card1}" para resolver un problema concreto.',
        '¿Cómo usarías "{card1}" en un proyecto actual tuyo? Sé específico.',
        'Da un ejemplo de "{card1}" que hayas observado en el mundo real esta semana.',
    ],
    contradiction: [
        '¿Hay algún caso donde "{card1}" y "{card2}" sean contradictorios? ¿Cómo lo resolverías?',
        '¿Cuáles son las limitaciones de "{card1}"? ¿Cuándo NO deberías aplicarlo?',
        'Desafía "{card1}": ¿en qué contexto este concepto podría fallar o ser contraproducente?',
    ],
};
