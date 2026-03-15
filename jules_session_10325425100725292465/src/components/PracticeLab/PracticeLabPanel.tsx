import React from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { X, Beaker } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ConceptCard as IConceptCard } from '../../types';
import { PracticeLabInput } from './PracticeLabInput';
import { LabProgressSidebar } from './LabProgressSidebar';
import { DiagnosticSection } from './DiagnosticSection';
import { ExerciseSection } from './ExerciseSection';
import { LabCompleteBanner } from './LabCompleteBanner';
import { MethodologySection } from './MethodologySection';
import { SelfAssessmentTable } from './SelfAssessmentTable';
import { parsePracticeLabMarkdown } from '../../utils/markdownParser';

interface Props {
    card: IConceptCard | null;
    isOpen: boolean;
    onClose: () => void;
}

export const PracticeLabPanel: React.FC<Props> = ({ card, isOpen, onClose }) => {
    const { progress, savePracticeLab, updatePracticeLabProgress } = useGameStore();

    if (!card) return null;

    const currentLab = progress.practiceLabsData.find(lab => lab.cardId === card.id);
    const parsedLab = currentLab ? parsePracticeLabMarkdown(currentLab.rawContent) : null;
    
    // Fallback to not-started if status is invalid
    let validStatus = currentLab?.progress?.status || 'not-started';
    if (!['not-started', 'content-added', 'diagnostic', 'in-progress', 'completed'].includes(validStatus)) {
        validStatus = 'not-started';
    }

    const currentLevel = currentLab?.progress?.currentLevel || 0;

    const handleSaveMarkdown = (markdown: string) => {
        savePracticeLab(card.id, markdown);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[700px] bg-card border-l border-white/10 z-[101] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-white/5 bg-card/50 backdrop-blur-md sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <Beaker size={20} className="text-primary" />
                                <span className="text-xs font-black uppercase text-white/50 tracking-widest leading-none">Practice Lab</span>
                            </div>
                            <div className="flex gap-2">
                                {currentLab && (
                                    <button 
                                        onClick={() => {
                                            if (window.confirm('¿Seguro que quieres borrar el progreso y pegar nuevo contenido?')) {
                                                savePracticeLab(card.id, '');
                                            }
                                        }}
                                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold transition-colors border border-red-500/20"
                                        title="Borrar progreso y regenerar"
                                    >
                                        Re-generar Lab
                                    </button>
                                )}
                                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/50 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar flex">
                            {!currentLab || !currentLab.rawContent ? (
                                <PracticeLabInput onSave={handleSaveMarkdown} />
                            ) : (
                                <>
                                    <LabProgressSidebar progress={currentLab.progress} totalLevels={parsedLab?.exercises.length || 0} />
                                    <div className="flex-1 p-8">
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-black text-white mb-2 leading-tight">Practice Lab: {card.title}</h2>
                                        </div>

                                        {validStatus === 'completed' && <LabCompleteBanner totalXPEarned={currentLab.progress.totalXPEarned} />}

                                        {parsedLab && (
                                            <>
                                                {parsedLab.methodologies && (
                                                    <MethodologySection content={parsedLab.methodologies} />
                                                )}

                                                {parsedLab.diagnostic && (
                                                    <DiagnosticSection
                                                        content={parsedLab.diagnostic}
                                                        cardId={card.id}
                                                        progress={currentLab.progress}
                                                        onComplete={(passed, response) => {
                                                            updatePracticeLabProgress(card.id, {
                                                                status: 'in-progress',
                                                                currentLevel: 1,
                                                                diagnosticPassed: passed,
                                                                diagnosticResponses: { 0: response },
                                                                totalXPEarned: (currentLab.progress.totalXPEarned || 0) + (passed ? 15 : 0)
                                                            });
                                                        }}
                                                    />
                                                )}

                                                {parsedLab.exercises.map((exercise, index) => {
                                                    const exerciseLevel = index + 1;
                                                    // Show the exercise if it's the current level, previously completed, or lab is done
                                                    if (currentLevel >= exerciseLevel || validStatus === 'completed') {
                                                        return (
                                                            <ExerciseSection
                                                                key={exercise.id}
                                                                exercise={exercise}
                                                                cardId={card.id}
                                                                level={exerciseLevel}
                                                                progress={currentLab.progress}
                                                                isLocked={currentLevel < exerciseLevel && validStatus !== 'completed'}
                                                                onComplete={(response, rating, xp) => {
                                                                    const updatedResponses = { ...currentLab.progress.exerciseResponses, [exerciseLevel]: response };
                                                                    const updatedRatings = { ...currentLab.progress.exerciseRatings, [exerciseLevel]: rating };
                                                                    const updatedExercisesCompleted = [...currentLab.progress.exercisesCompleted, exerciseLevel];
                                                                    
                                                                    const nextLevel = exerciseLevel + 1;

                                                                    updatePracticeLabProgress(card.id, {
                                                                        status: 'in-progress',
                                                                        currentLevel: nextLevel,
                                                                        exerciseResponses: updatedResponses,
                                                                        exerciseRatings: updatedRatings,
                                                                        exercisesCompleted: updatedExercisesCompleted,
                                                                        totalXPEarned: (currentLab.progress.totalXPEarned || 0) + xp
                                                                    });
                                                                }}
                                                            />
                                                        );
                                                    }
                                                    return null;
                                                })}

                                                {parsedLab.selfAssessment && (currentLevel > parsedLab.exercises.length || validStatus === 'completed') && (
                                                    <SelfAssessmentTable
                                                        content={parsedLab.selfAssessment}
                                                        isCompleted={validStatus === 'completed'}
                                                        onComplete={(checkboxes) => {
                                                            const allExcellent = parsedLab.exercises.every(
                                                                (_, index) => currentLab.progress.exerciseRatings[index + 1] === 'excellent'
                                                            );
                                                            const bonusXP = allExcellent ? 50 : 0;
                                                            
                                                            updatePracticeLabProgress(card.id, {
                                                                status: 'completed',
                                                                selfAssessment: checkboxes,
                                                                completedAt: Date.now(),
                                                                totalXPEarned: (currentLab.progress.totalXPEarned || 0) + bonusXP
                                                            });
                                                        }}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
