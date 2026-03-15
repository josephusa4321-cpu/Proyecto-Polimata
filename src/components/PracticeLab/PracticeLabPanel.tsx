import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/useGameStore';
import { parsePracticeLabMarkdown } from '../../utils/markdownParser';
import { PracticeLabInput } from './PracticeLabInput';
import { LabProgressSidebar } from './LabProgressSidebar';
import { DiagnosticSection } from './DiagnosticSection';
import { ExerciseSection } from './ExerciseSection';
import { BookOpen, RefreshCw } from 'lucide-react';
import { MethodologySection } from './MethodologySection';
import { LabCompleteBanner } from './LabCompleteBanner';

interface PracticeLabPanelProps {
    cardId: string;
}

export const PracticeLabPanel: React.FC<PracticeLabPanelProps> = ({ cardId }) => {
    const { progress, savePracticeLabContent, updateLabProgress, completeLabExercise } = useGameStore();
    const labProgress = progress.practiceLabsData?.[cardId];
    const rawContent = labProgress?.content;

    const parsedLab = useMemo(() => {
        if (!rawContent) return null;
        return parsePracticeLabMarkdown(rawContent);
    }, [rawContent]);

    const [activeStepId, setActiveStepId] = useState('diagnostic');

    if (!rawContent || !parsedLab) {
        return (
            <PracticeLabInput 
                onSave={(content) => savePracticeLabContent(cardId, content)} 
            />
        );
    }

    // Prepare steps for sidebar
    const steps = [
        {
            id: 'diagnostic',
            label: '🎯 Diagnóstico',
            completed: labProgress.diagnosticCompleted,
            locked: false
        },
        ...[1, 2, 3, 4, 5].map(level => {
            const exercise = parsedLab.exercises[level];
            const hasExercise = !!exercise;
            
            // Check locked condition
            let locked = true;
            if (level === 1) {
                locked = !labProgress.diagnosticCompleted;
            } else {
                const prev = labProgress.exerciseResponses?.[level - 1];
                locked = !prev;
            }

            return {
                id: `ex-${level}`,
                label: `🔨 Ejercicio ${level}`,
                completed: !!labProgress.exerciseResponses?.[level],
                locked: !hasExercise || locked
            };
        })
    ];

    if (parsedLab.methodology) {
        steps.push({
            id: 'methodology',
            label: '📚 Metodología',
            completed: false,
            locked: false
        });
    }

    const currentStep = steps.find(s => s.id === activeStepId);

    const handleDiagnosticComplete = (response: string) => {
        updateLabProgress(cardId, {
            diagnosticCompleted: true,
            diagnosticResponse: response,
            status: 'draft'
        });
        setActiveStepId('ex-1');
    };

    const handleExerciseComplete = (level: number, rating: 'excellent' | 'good' | 'needs-review', response: string, xp: number) => {
        completeLabExercise(cardId, level, rating, response, xp);
        if (level < 5 && parsedLab.exercises[level + 1]) {
            setActiveStepId(`ex-${level + 1}`);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row gap-6 p-1 bg-[#0a0e17]"
        >
            <LabProgressSidebar 
                steps={steps} 
                activeStepId={activeStepId} 
                onStepClick={setActiveStepId} 
            />

            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between bg-[#1a1f2e] p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                        <BookOpen className="w-5 h-5" />
                        <span>{currentStep?.label || "Sección"}</span>
                    </div>
                    <button 
                        onClick={() => {
                            if (confirm("¿Estás seguro de que deseas regenerar? Perderás el progreso de este Lab.")) {
                                savePracticeLabContent(cardId, ""); // Clear content to trigger re-paste
                            }
                        }}
                        className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                    >
                        <RefreshCw className="w-3 h-3" />
                        Regenerar Lab
                    </button>
                </div>

                {/* Banner de Completado */}
                {labProgress?.status === 'completed' && (
                    <LabCompleteBanner totalXPEarned={(progress.practiceLabsTotalXP || 0)} />
                )}

                {activeStepId === 'diagnostic' && (
                    <DiagnosticSection 
                        content={parsedLab.diagnostic}
                        completed={labProgress.diagnosticCompleted}
                        savedResponse={labProgress.diagnosticResponse}
                        onComplete={handleDiagnosticComplete}
                    />
                )}

                {activeStepId.startsWith('ex-') && (() => {
                    const level = parseInt(activeStepId.split('-')[1], 10);
                    const ex = parsedLab.exercises[level];
                    const responseInfo = labProgress.exerciseResponses?.[level];

                    if (!ex) return <div>Ejercicio no disponible en el contenido pegado.</div>;

                    return (
                        <ExerciseSection 
                            level={level}
                            title={ex.title}
                            description={ex.description}
                            rubric={ex.rubric}
                            referenceAnswer={ex.referenceAnswer}
                            completed={!!responseInfo}
                            savedResponse={responseInfo?.response}
                            savedRating={responseInfo?.rating}
                            onComplete={(rating, res, xp) => handleExerciseComplete(level, rating, res, xp)}
                        />
                    );
                })()}

                {activeStepId === 'methodology' && parsedLab.methodology && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <MethodologySection content={parsedLab.methodology} />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};
