export interface ParsedPracticeLab {
    diagnostic: string | null;
    exercises: {
        id: number;
        content: string;
        rubric: string | null;
        answer: string | null;
    }[];
    methodologies: string | null;
    selfAssessment: string | null;
    integration: string | null;
}

export const parsePracticeLabMarkdown = (markdown: string): ParsedPracticeLab => {
    const lines = markdown.split('\n');
    let currentSection: string | null = null;
    let currentExerciseId: number | null = null;
    let currentSubsection: 'content' | 'rubric' | 'answer' | null = null;

    const parsed: ParsedPracticeLab = {
        diagnostic: null,
        exercises: [],
        methodologies: null,
        selfAssessment: null,
        integration: null,
    };

    let buffer: string[] = [];

    const flushBuffer = () => {
        const text = buffer.join('\n').trim();
        if (!text) return;

        if (currentSection === 'diagnostic') {
            parsed.diagnostic = (parsed.diagnostic || '') + text;
        } else if (currentSection === 'methodologies') {
            parsed.methodologies = (parsed.methodologies || '') + text;
        } else if (currentSection === 'selfAssessment') {
            parsed.selfAssessment = (parsed.selfAssessment || '') + text;
        } else if (currentSection === 'integration') {
            parsed.integration = (parsed.integration || '') + text;
        } else if (currentSection === 'exercise' && currentExerciseId !== null) {
            let exercise = parsed.exercises.find(e => e.id === currentExerciseId);
            if (!exercise) {
                exercise = { id: currentExerciseId, content: '', rubric: null, answer: null };
                parsed.exercises.push(exercise);
            }

            if (currentSubsection === 'content') {
                exercise.content = (exercise.content || '') + (exercise.content ? '\n' : '') + text;
            } else if (currentSubsection === 'rubric') {
                exercise.rubric = (exercise.rubric || '') + (exercise.rubric ? '\n' : '') + text;
            } else if (currentSubsection === 'answer') {
                exercise.answer = (exercise.answer || '') + (exercise.answer ? '\n' : '') + text;
            }
        }
        buffer = [];
    };

    for (const line of lines) {
        const lowerLine = line.toLowerCase().trim();

        // Check for headers
        if (lowerLine.startsWith('#')) {
            const cleanHeader = lowerLine.replace(/^#+\s*/, '');

            if (cleanHeader.includes('diagnóstico rápido') || cleanHeader.includes('diagnostico rapido')) {
                flushBuffer();
                currentSection = 'diagnostic';
                currentExerciseId = null;
                currentSubsection = null;
                buffer.push(line); // Keep header
                continue;
            }

            if (cleanHeader.includes('ejercicio ') && !cleanHeader.includes('integración') && !cleanHeader.includes('integracion')) {
                flushBuffer();
                currentSection = 'exercise';
                const match = cleanHeader.match(/ejercicio\s+(\d+)/);
                currentExerciseId = match ? parseInt(match[1], 10) : (currentExerciseId ? currentExerciseId + 1 : 1);
                currentSubsection = 'content';
                buffer.push(line); // Keep header
                continue;
            }

            if (cleanHeader.includes('metodologías') || cleanHeader.includes('metodologias')) {
                flushBuffer();
                currentSection = 'methodologies';
                currentExerciseId = null;
                currentSubsection = null;
                buffer.push(line); // Keep header
                continue;
            }

            if (cleanHeader.includes('auto-evaluación final') || cleanHeader.includes('auto-evaluacion final')) {
                flushBuffer();
                currentSection = 'selfAssessment';
                currentExerciseId = null;
                currentSubsection = null;
                buffer.push(line); // Keep header
                continue;
            }

            if (cleanHeader.includes('ejercicio de integración') || cleanHeader.includes('ejercicio de integracion')) {
                flushBuffer();
                currentSection = 'integration';
                currentExerciseId = null;
                currentSubsection = null;
                buffer.push(line); // Keep header
                continue;
            }

            // Subsections within an exercise
            if (currentSection === 'exercise') {
                if (cleanHeader.includes('rúbrica') || cleanHeader.includes('rubrica')) {
                    flushBuffer();
                    currentSubsection = 'rubric';
                    buffer.push(line); // Keep header
                    continue;
                }

                if (cleanHeader.includes('respuesta') || cleanHeader.includes('análisis') || cleanHeader.includes('analisis') || cleanHeader.includes('guía') || cleanHeader.includes('guia') || cleanHeader.includes('modelo')) {
                    flushBuffer();
                    currentSubsection = 'answer';
                    buffer.push(line); // Keep header
                    continue;
                }
            }
        }

        buffer.push(line);
    }

    flushBuffer();

    return parsed;
};
