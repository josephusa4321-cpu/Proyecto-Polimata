export interface ParsedExercise {
    level: number;
    title: string;
    description: string;
    rubric?: string;
    referenceAnswer?: string; // New: Para desplegar la respuesta óptima
}

export interface ParsedLab {
    diagnostic: string;
    exercises: Record<number, ParsedExercise>;
    methodology?: string;
}

export const parsePracticeLabMarkdown = (content: string): ParsedLab => {
    // Splits by ANY level header like ## or ###
    const sections = content.split(/^#+\s+/m);
    let diagnostic = '';
    const exercises: Record<number, ParsedExercise> = {};
    let methodology = '';

    sections.forEach((section) => {
        if (!section.trim()) return;

        // Diagnostic
        if (section.toLowerCase().includes('diagnóstico') || section.includes('🎯')) {
            diagnostic = section.replace(/^[^\n]*\n/, '').trim();
        } 
        // Methodology
        else if (section.toLowerCase().includes('metodología') || section.includes('📚')) {
            methodology = section.replace(/^[^\n]*\n/, '').trim();
        }
        // Exercise
        else if (section.includes('🔨') || section.toLowerCase().includes('ejercicio')) {
            const firstLine = section.split('\n')[0];
            const levelMatch = firstLine.match(/Ejercicio\s*(\d+)/i) || section.match(/(\d+)/);
            const level = levelMatch ? parseInt(levelMatch[1], 10) : 0;

            if (level > 0 && level <= 5) {
                // Isolated Rubric and Answer extraction
                const rubricMatch = section.match(/(?:###|>\s*|>\s*📋\s*)(?:📋|Rúbrica|auto-evaluación)[\s\S]*?(?=(?:###|>\s*|>\s*💡\s*)(?:💡|Respuesta|Respuestas)|$)/i);
                const answerMatch = section.match(/(?:###|>\s*|>\s*💡\s*)(?:💡|Respuesta|Respuestas)[\s\S]*$/i);

                // Clean Description: Excludes Title line, then stops before rubric/answer triggers
                const description = section
                    .replace(/^[^\n]*\n/, '') // removes title
                    .split(/(?:###|>\s*)(?:📋|💡|Rúbrica|Respuesta)/i)[0]
                    .trim();

                const rubric = rubricMatch ? rubricMatch[0].trim() : undefined;
                const referenceAnswer = answerMatch ? answerMatch[0].trim() : undefined;

                exercises[level] = {
                    level,
                    title: firstLine.trim(),
                    description,
                    rubric,
                    referenceAnswer
                };
            }
        }
    });

    return { diagnostic, exercises, methodology };
};
