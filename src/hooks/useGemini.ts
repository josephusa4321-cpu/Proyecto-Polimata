import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useGameStore } from '../stores/useGameStore';

export const useGemini = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { apiKey, cacheContent, getCachedContent } = useGameStore();

    const generateLesson = useCallback(async (cardTitle: string, cardSubtitle: string, cardId: string) => {
        // Check cache first
        const cached = getCachedContent(cardId);
        if (cached) return cached;

        if (!apiKey) {
            setError("No API Key found. Please set your Google AI API Key in settings.");
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `
        Actúa como un Tutor Polímata experto en aprendizaje acelerado y pensamiento sistémico.
        Tu objetivo es generar una lección magistral sobre el concepto: "${cardTitle}" (${cardSubtitle}).
        
        Sigue ESTRICTAMENTE esta estructura en Markdown (Español Colombia):
        
        # ${cardTitle}
        
        ## 🎯 Definición
        (Una explicación clara, concisa y técnica del concepto en 2-3 párrafos)
        
        ## 🧠 Explicación Feynman
        (Explica este concepto como si se lo contaras a un niño de 10 años, usando analogías cotidianas)
        
        ## 💡 Ejemplos Prácticos
        - **Ejemplo 1**: (Contexto real)
        - **Ejemplo 2**: (Contexto transdisciplinar)
        
        ## ⚠️ Contra-ejemplos y Malentendidos
        (Qué NO es este concepto o qué errores comunes comete la gente al usarlo)
        
        ## 🔄 Conexiones Sistémicas
        (Cómo se relaciona este concepto con otros sistemas o pilares del conocimiento)
        
        ## 📝 Active Recall (Pregunta de Retención)
        ---
        (Genera UNA pregunta desafiante que obligue al estudiante a recuperar la esencia de lo aprendido. No des la respuesta.)
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            cacheContent(cardId, text);
            return text;
        } catch (err: unknown) {
            console.error("Gemini Error:", err);
            setError(err instanceof Error ? err.message : "Error generating content");
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [apiKey, cacheContent, getCachedContent]);

    return { generateLesson, isLoading, error };
};
