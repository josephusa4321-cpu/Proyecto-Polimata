import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Hammer, Star, ThumbsUp, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { CollapsibleAnswer } from './CollapsibleAnswer';
import type { PracticeLabProgress } from '../../types';

interface ExerciseData {
    id: number;
    content: string;
    rubric: string | null;
    answer: string | null;
}

interface Props {
    exercise: ExerciseData;
    cardId: string;
    level: number;
    progress: PracticeLabProgress;
    isLocked: boolean;
    onComplete: (response: string, rating: 'excellent' | 'good' | 'needs-review', xp: number) => void;
}

export const ExerciseSection: React.FC<Props> = ({ exercise, level, progress, isLocked, onComplete }) => {
    const isCompleted = progress.exercisesCompleted.includes(level) || progress.status === 'completed';
    const savedResponse = progress.exerciseResponses[level] || '';
    const savedRating = progress.exerciseRatings[level] || null;

    const [response, setResponse] = useState(savedResponse);
    const [rating, setRating] = useState<'excellent' | 'good' | 'needs-review' | null>(savedRating);

    const xpConfig = {
        1: { excellent: 20, good: 10, needsReview: 0 },
        2: { excellent: 30, good: 15, needsReview: 0 },
        3: { excellent: 40, good: 20, needsReview: 0 },
        4: { excellent: 35, good: 15, needsReview: 0 },
        5: { excellent: 25, good: 10, needsReview: 0 },
    };

    const currentXpConfig = xpConfig[level as keyof typeof xpConfig] || xpConfig[1];

    if (isLocked) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="mb-8 p-6 bg-white/5 border border-white/5 rounded-3xl relative overflow-hidden grayscale pointer-events-none"
            >
                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-white/30 flex items-center justify-center border border-white/20">
                        <Hammer size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white/50 leading-tight">Nivel {level}</h3>
                        <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Bloqueado</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-12 p-6 rounded-3xl relative overflow-hidden border transition-colors duration-500
                ${isCompleted ? 'bg-primary/5 border-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-card/50 border-white/10 shadow-xl'}
            `}
        >
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border
                    ${isCompleted ? 'bg-primary/20 text-primary border-primary/30' : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'}
                `}>
                    <Hammer size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white leading-tight">Nivel {level}</h3>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-widest">
                        {level === 1 ? 'Conceptos Base' : level === 2 ? 'Aplicación' : level === 3 ? 'Análisis' : level === 4 ? 'Síntesis' : 'Evaluación'}
                    </p>
                </div>
            </div>

            <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-strong:text-cyan-400 max-w-none mb-8 relative z-10">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{exercise.content}</ReactMarkdown>
            </div>

            {exercise.rubric && (
                <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-2">📋 Rúbrica de Evaluación</h4>
                    <div className="text-sm text-white/60">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{exercise.rubric}</ReactMarkdown>
                    </div>
                </div>
            )}

            <div className="bg-[#1a1f2e] p-6 rounded-2xl border border-[#2a3042] relative z-10 focus-within:border-cyan-500 transition-colors">
                <textarea
                    disabled={isCompleted}
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Escribe tu respuesta o análisis aquí..."
                    className="w-full h-40 bg-transparent border-none text-sm text-white placeholder:text-white/20 outline-none resize-none disabled:opacity-50"
                />

                {!isCompleted && exercise.answer && (
                    <CollapsibleAnswer answer={exercise.answer} />
                )}

                {!isCompleted && (
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-4">Auto-evaluación</h4>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <button
                                onClick={() => setRating('excellent')}
                                className={`flex-1 flex items-center gap-2 p-3 rounded-xl border transition-all text-xs font-bold
                                    ${rating === 'excellent' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'bg-white/5 border-white/10 text-white/50 hover:border-yellow-500/50 hover:text-white/80'}
                                `}
                            >
                                <Star size={16} className={rating === 'excellent' ? 'fill-current' : ''} />
                                <span>Excelente (+{currentXpConfig.excellent} XP)</span>
                            </button>
                            <button
                                onClick={() => setRating('good')}
                                className={`flex-1 flex items-center gap-2 p-3 rounded-xl border transition-all text-xs font-bold
                                    ${rating === 'good' ? 'bg-orange-500/20 border-orange-500 text-orange-500' : 'bg-white/5 border-white/10 text-white/50 hover:border-orange-500/50 hover:text-white/80'}
                                `}
                            >
                                <ThumbsUp size={16} />
                                <span>Bien (+{currentXpConfig.good} XP)</span>
                            </button>
                            <button
                                onClick={() => setRating('needs-review')}
                                className={`flex-1 flex items-center gap-2 p-3 rounded-xl border transition-all text-xs font-bold
                                    ${rating === 'needs-review' ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-white/5 border-white/10 text-white/50 hover:border-red-500/50 hover:text-white/80'}
                                `}
                            >
                                <AlertTriangle size={16} />
                                <span>Repasar (0 XP)</span>
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                disabled={!response.trim() || !rating}
                                onClick={() => {
                                    if (rating) {
                                        let xp = 0;
                                        if (rating === 'excellent') xp = currentXpConfig.excellent;
                                        if (rating === 'good') xp = currentXpConfig.good;
                                        onComplete(response, rating, xp);
                                    }
                                }}
                                className="px-8 py-3 bg-cyan-500 text-[#0a0e17] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Completar Nivel
                            </button>
                        </div>
                    </div>
                )}
                {isCompleted && (
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                            <Star size={14} className="fill-current" />
                            Nivel Completado
                        </div>
                        {savedRating && (
                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                                ${savedRating === 'excellent' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : ''}
                                ${savedRating === 'good' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : ''}
                                ${savedRating === 'needs-review' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : ''}
                            `}>
                                {savedRating === 'excellent' ? '⭐ Excelente' : savedRating === 'good' ? '🔶 Bien' : '🔴 Necesita Repasar'}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
