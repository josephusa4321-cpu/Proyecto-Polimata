import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CollapsibleAnswer } from './CollapsibleAnswer';

interface ExerciseSectionProps {
    level: number;
    title: string;
    description: string;
    rubric?: string;
    referenceAnswer?: string;
    completed: boolean;
    onComplete: (rating: 'excellent' | 'good' | 'needs-review', response: string, xp: number) => void;
    savedResponse?: string;
    savedRating?: 'excellent' | 'good' | 'needs-review';
    onChangeResponse?: (value: string) => void;
}

export const ExerciseSection: React.FC<ExerciseSectionProps> = ({ 
    level, title, description, rubric, referenceAnswer, completed, onComplete, savedResponse = '', savedRating, onChangeResponse 
}) => {
    const [response, setResponse] = useState(savedResponse);
    const [rating, setRating] = useState<'excellent' | 'good' | 'needs-review' | null>(savedRating || null);

    const xpReward = 10 + (level * 2); // E.g., Level 1 = 12 XP, Level 5 = 20 XP
    const bonusXp = rating === 'excellent' ? 5 : 0;

    const handleSubmit = () => {
        if (rating && response.trim()) {
            onComplete(rating, response, xpReward + bonusXp);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="p-4 bg-[#1a1f2e] border border-slate-800 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-1 bg-cyan-900/50 text-cyan-400 rounded-lg">
                        Nivel {level} | {title}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Award className="w-4 h-4 text-slate-500" />
                        {xpReward} XP Recompensa
                    </span>
                </div>
                <div className="prose prose-invert max-w-none text-slate-200">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {description}
                    </ReactMarkdown>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Tu Solución</label>
                <textarea
                    value={response}
                    onChange={(e) => {
                        setResponse(e.target.value);
                        if (onChangeResponse) onChangeResponse(e.target.value);
                    }}
                    disabled={completed}
                    placeholder="Escribe tu respuesta aquí..."
                    className="w-full h-40 bg-[#0a0e17] border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-cyan-500 disabled:opacity-75 resize-none"
                />
            </div>

            {rubric && (
                <CollapsibleAnswer title="📋 Rúbrica de auto-evaluación" content={rubric} />
            )}

            {referenceAnswer && (
                <CollapsibleAnswer title="💡 Respuesta de referencia" content={referenceAnswer} />
            )}

            {!completed && (
                <div className="p-4 bg-[#1a1f2e] border border-slate-800 rounded-xl space-y-3">
                    <h4 className="text-sm font-semibold text-white">Auto-evaluación</h4>
                    <div className="flex gap-2">
                        {(['excellent', 'good', 'needs-review'] as const).map((r) => (
                            <button
                                key={r}
                                onClick={() => setRating(r)}
                                className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg border cursor-pointer transition-colors ${
                                    rating === r 
                                        ? r === 'excellent' ? 'bg-emerald-900/40 border-emerald-500 text-emerald-400'
                                          : r === 'good' ? 'bg-cyan-900/40 border-cyan-500 text-cyan-400'
                                          : 'bg-amber-900/40 border-amber-500 text-amber-400'
                                        : 'bg-[#0a0e17] border-slate-800 text-slate-400 hover:border-slate-700'
                                }`}
                            >
                                {r === 'excellent' ? 'Excelente 🌟' : r === 'good' ? 'Bien 👍' : 'Repasar 🔄'}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!rating || !response.trim()}
                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Completar Ejercicio {bonusXp > 0 && `( +${bonusXp} XP Bonus! )`}
                    </button>
                </div>
            )}

            {completed && (
                <div className="p-4 bg-emerald-900/20 border border-emerald-800 rounded-xl text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Ejercicio completado con éxito</span>
                </div>
            )}
        </motion.div>
    );
};
