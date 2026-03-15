import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { PracticeLabProgress } from '../../types';

interface Props {
    content: string;
    cardId: string;
    progress: PracticeLabProgress;
    onComplete: (passed: boolean, response: string) => void;
}

export const DiagnosticSection: React.FC<Props> = ({ content, progress, onComplete }) => {
    const isCompleted = progress.currentLevel > 0 || progress.status === 'completed';
    const [response, setResponse] = useState(progress.diagnosticResponses[0] || '');
    const [passed, setPassed] = useState(progress.diagnosticPassed || false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 bg-card/50 border border-white/10 rounded-3xl shadow-xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Target size={120} />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                    <Target size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white leading-tight">Diagnóstico Rápido</h3>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Punto de partida</p>
                </div>
            </div>

            <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-strong:text-purple-400 max-w-none mb-8 relative z-10">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>

            <div className="bg-black/30 p-6 rounded-2xl border border-white/5 relative z-10">
                <textarea
                    disabled={isCompleted}
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/20 focus:border-purple-500/50 outline-none transition-all resize-none mb-6 disabled:opacity-50"
                />

                {!isCompleted ? (
                    <div className="flex items-center justify-between gap-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={passed}
                                    onChange={(e) => setPassed(e.target.checked)}
                                    className="peer appearance-none w-5 h-5 rounded border border-white/20 checked:bg-purple-500 checked:border-purple-500 transition-all cursor-pointer"
                                />
                                <CheckCircle2 size={12} className="absolute left-1 opacity-0 peer-checked:opacity-100 text-[#0a0e17] transition-opacity pointer-events-none" />
                            </div>
                            <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors font-medium">
                                Auto-evaluación: Considero que domino este concepto básico. (+15 XP)
                            </span>
                        </label>
                        <button
                            disabled={!response.trim()}
                            onClick={() => onComplete(passed, response)}
                            className="px-6 py-3 bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-purple-500 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                        >
                            Completar Diagnóstico
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-widest">
                        <CheckCircle2 size={16} /> Diagnóstico completado
                    </div>
                )}
            </div>
        </motion.div>
    );
};
