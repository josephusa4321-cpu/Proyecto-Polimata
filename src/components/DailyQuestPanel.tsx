import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Scroll, Sparkles, X, Send, BrainCircuit, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const DailyQuestPanel: React.FC<Props> = ({ isOpen, onClose }) => {
    const { dailyQuest, completeDailyQuest, responseDrafts, setResponseDraft, clearResponseDraft } = useGameStore();
    const [answer, setAnswer] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const draftKey = dailyQuest ? `daily-quest:${dailyQuest.id}` : '';

    React.useEffect(() => {
        if (!isOpen || !dailyQuest) return;
        setAnswer(dailyQuest.userAnswer ?? responseDrafts[draftKey] ?? '');
        setIsSubmitting(false);
    }, [isOpen, dailyQuest, draftKey, responseDrafts]);

    if (!dailyQuest) return null;

    const isCompleted = dailyQuest.completed;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!answer.trim() || isSubmitting || isCompleted) return;

        setIsSubmitting(true);
        setTimeout(() => {
            completeDailyQuest(answer);
            clearResponseDraft(draftKey);
            setIsSubmitting(false);
            onClose();
        }, 1200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 md:p-6 bg-[#0a0e17]/90 backdrop-blur-xl">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-2xl bg-[#1a1f2e] border border-white/10 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="p-8 border-b border-white/5 flex justify-between items-start bg-gradient-to-r from-primary/5 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${isCompleted ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-primary/30'}`}>
                                    {isCompleted ? <CheckCircle size={28} /> : <Scroll size={28} />}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Mision del Dia</h2>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{dailyQuest.date}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/20 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <BrainCircuit size={14} className="text-primary/60" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Sincronizando Conceptos</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {dailyQuest.cardIds.map((id, i) => (
                                            <div key={id} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                <span className="text-xs font-bold text-white/80 uppercase">Concepto {i + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl relative">
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg">
                                        <Sparkles size={16} />
                                    </div>
                                    <p className="text-xl font-black text-white leading-tight italic">
                                        {dailyQuest.question}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">
                                            {isCompleted ? 'Tu respuesta guardada' : 'Tu Resolucion Sistemica'}
                                        </label>
                                        <textarea
                                            value={answer}
                                            readOnly={isCompleted}
                                            onChange={(e) => {
                                                const nextValue = e.target.value;
                                                setAnswer(nextValue);
                                                setResponseDraft(draftKey, nextValue);
                                            }}
                                            placeholder="Escribe tu respuesta aqui..."
                                            className="w-full min-h-[200px] bg-black/40 border-2 border-white/5 rounded-3xl p-6 text-white/90 placeholder:text-white/10 focus:border-primary/50 outline-none transition-all resize-none leading-relaxed text-lg"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-white/30">
                                            <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase">+{dailyQuest.xpReward} XP</div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest leading-none">
                                                {isCompleted ? 'Respuesta Persistida' : 'Honor System'}
                                            </p>
                                        </div>

                                        {isCompleted ? (
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs bg-white/5 text-white/60 hover:bg-white/10 transition-all"
                                            >
                                                Cerrar
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={!answer.trim() || isSubmitting}
                                                className={`px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all ${
                                                    answer.trim() && !isSubmitting
                                                        ? 'bg-primary text-white hover:bg-white hover:text-primary shadow-xl shadow-primary/20'
                                                        : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'
                                                }`}
                                            >
                                                {isSubmitting ? 'Forjando Conexion...' : (
                                                    <>
                                                        Completar Mision
                                                        <Send size={14} />
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
