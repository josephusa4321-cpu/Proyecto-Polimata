import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { FlipHorizontal, Send, X, Scale, Sparkles, Swords } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MirrorMatchPanel: React.FC = () => {
    const { activeMirrorMatch, mirrorMatchModalOpen, closeMirrorMatchModal, completeMirrorMatch, ngPlus } = useGameStore();
    const [argument, setArgument] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!activeMirrorMatch) return null;

    const requiredWords = ngPlus.ngPlusCount > 0 ? 100 : 75;
    const wordCount = argument.trim() === '' ? 0 : argument.trim().split(/\s+/).filter(Boolean).length;
    const isReady = wordCount >= requiredWords;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isReady || isSubmitting) return;

        setIsSubmitting(true);
        setTimeout(() => {
            completeMirrorMatch(argument);
            setArgument('');
            setIsSubmitting(false);
        }, 1200);
    };

    return (
        <AnimatePresence>
            {mirrorMatchModalOpen && (
                <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 md:p-6 bg-[#0a0e17]/95 backdrop-blur-2xl">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#1a1f2e] border border-red-500/20 rounded-[40px] shadow-[0_0_100px_rgba(239,68,68,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Adversarial Header */}
                        <div className="p-8 border-b border-white/5 flex justify-between items-start bg-gradient-to-r from-red-500/10 to-purple-500/5">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-red-500/30 relative">
                                    <FlipHorizontal size={28} />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-lg scale-75">
                                        <Scale size={14} className="text-red-500" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Mirror Match</span>
                                        <div className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                            <Sparkles size={10} />
                                            Debate Interno
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Defiende lo Contrario</h2>
                                </div>
                            </div>
                            <button
                                onClick={closeMirrorMatchModal}
                                className="p-3 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all active:scale-90"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="space-y-8">
                                {/* Card context */}
                                <div className="flex items-center gap-3 text-white/30">
                                    <Swords size={14} className="text-red-400/60" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Concepto en disputa: {activeMirrorMatch.cardTitle}</span>
                                </div>

                                {/* Challenge */}
                                <div className="p-8 bg-red-500/5 border-2 border-red-500/20 rounded-[32px] relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
                                    <p className="text-xl font-black text-white leading-tight italic relative z-10">
                                        "{activeMirrorMatch.challenge}"
                                    </p>
                                </div>

                                {/* Argument Input */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center ml-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2">
                                                <FlipHorizontal size={12} />
                                                Tu argumento adversarial
                                            </label>
                                            <span className={`text-[10px] font-black uppercase transition-colors ${isReady ? 'text-red-400' : 'text-white/20'}`}>
                                                {wordCount} / {requiredWords} palabras
                                            </span>
                                        </div>
                                        <textarea
                                            value={argument}
                                            onChange={(e) => setArgument(e.target.value)}
                                            placeholder="Defiende la postura contraria..."
                                            className="w-full min-h-[220px] bg-white/[0.03] border-2 border-white/5 rounded-[32px] p-7 text-white/90 placeholder:text-white/10 focus:border-red-500/30 focus:bg-red-500/5 outline-none transition-all resize-none leading-relaxed text-lg"
                                        />
                                        {/* Word count bar */}
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                animate={{ width: `${Math.min(100, (wordCount / requiredWords) * 100)}%` }}
                                                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                                                className={`h-full rounded-full ${isReady ? 'bg-gradient-to-r from-red-500 to-purple-500' : 'bg-white/20'}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between gap-6 pt-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <div className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-[10px] font-black uppercase">
                                                    +{activeMirrorMatch.xpReward} XP
                                                </div>
                                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Pensamiento Adversarial</span>
                                            </div>
                                            <p className="text-[9px] text-white/10 font-medium">Mínimo {requiredWords} palabras para presentar tu argumento.</p>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!isReady || isSubmitting}
                                            className={`
                                                relative px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-4 transition-all overflow-hidden
                                                ${isReady && !isSubmitting
                                                    ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] scale-105 active:scale-95'
                                                    : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'}
                                            `}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                                    >
                                                        <FlipHorizontal size={16} />
                                                    </motion.div>
                                                    Procesando...
                                                </>
                                            ) : (
                                                <>
                                                    Presentar Argumento
                                                    <Send size={16} />
                                                </>
                                            )}
                                        </button>
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
