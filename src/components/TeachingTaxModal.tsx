import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../stores/useGameStore';
import { GraduationCap, Send, AlertCircle, X, BookOpen } from 'lucide-react';

export const TeachingTaxModal: React.FC = () => {
    const { isTaxDue, taxModalOpen, currentTaxCard, closeTaxModal, payTeachingTax } = useGameStore();
    const [explanation, setExplanation] = useState('');
    const [cardTitle, setCardTitle] = useState('...');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (currentTaxCard) {
            import('../data/module-1.1').then(module => {
                const card = module.CARDS_1_1.find(c => c.id === currentTaxCard);
                if (card) setCardTitle(card.title);
            });
        }
    }, [currentTaxCard]);

    const words = explanation.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const isReady = wordCount >= 50;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isReady || isSubmitting) return;

        setIsSubmitting(true);
        // Simulate a small delay for "processing" the wisdom
        setTimeout(() => {
            payTeachingTax(explanation, cardTitle);
            setExplanation('');
            setIsSubmitting(false);
        }, 1000);
    };

    if (!isTaxDue || !taxModalOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-[#0a0e17]/95 backdrop-blur-2xl"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    className="relative w-full max-w-2xl bg-card border border-white/10 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                    {/* Header */}
                    <div className="relative p-8 border-b border-white/5 flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                                <GraduationCap size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Teaching Tax</h2>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Impuesto del Maestro — Hora de Enseñar</p>
                            </div>
                        </div>
                        <button 
                            onClick={closeTaxModal}
                            className="p-2 hover:bg-white/5 rounded-full text-white/20 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <form onSubmit={handleSubmit} className="relative flex-1 flex flex-col p-8 overflow-y-auto custom-scrollbar">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen size={14} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Concepto a Explicar</span>
                            </div>
                            <h3 className="text-3xl font-black text-white italic tracking-tight">"{cardTitle}"</h3>
                            <p className="mt-4 text-sm text-white/50 leading-relaxed font-medium">
                                Para consolidar este conocimiento en tu red sistémica, debes explicarlo con tus propias palabras. 
                                Imagina que se lo enseñas a alguien que no conoce nada del tema.
                            </p>
                        </div>

                        <div className="relative flex-1 group">
                            <textarea
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                placeholder="Escribe tu explicación aquí..."
                                className="w-full h-full min-h-[300px] bg-black/40 border-2 border-white/5 rounded-3xl p-6 text-white/90 placeholder:text-white/10 focus:border-primary/50 outline-none transition-all resize-none leading-relaxed text-lg font-medium"
                            />
                            
                            <div className="absolute bottom-4 right-6 flex items-center gap-4">
                                <div className={`flex flex-col items-end transition-all ${wordCount >= 50 ? 'text-green-400' : 'text-white/20'}`}>
                                    <span className="text-2xl font-black">{wordCount}</span>
                                    <span className="text-[9px] uppercase font-black tracking-widest">Palabras (mín. 50)</span>
                                </div>
                            </div>
                        </div>

                        {wordCount < 50 && (
                            <div className="mt-6 flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl text-primary/80">
                                <AlertCircle size={18} />
                                <p className="text-xs font-bold uppercase tracking-wide">Faltan {50 - wordCount} palabras para cumplir el tributo.</p>
                            </div>
                        )}

                        <div className="mt-8 flex gap-4">
                            <button
                                type="button"
                                onClick={closeTaxModal}
                                className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-white/30 border border-white/5 hover:bg-white/5 transition-all"
                            >
                                Guardar como Borrador
                            </button>
                            <button
                                type="submit"
                                disabled={!isReady || isSubmitting}
                                className={`
                                    flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-2xl
                                    ${isReady 
                                        ? 'bg-primary text-white hover:bg-white hover:text-primary shadow-primary/20' 
                                        : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'}
                                `}
                            >
                                {isSubmitting ? 'Procesando Sabiduría...' : (
                                    <>
                                        Pagar Impuesto (Enseñar)
                                        <Send size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
