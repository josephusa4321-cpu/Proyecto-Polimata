import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import { CARDS_1_1 } from '../data/module-1.1';
import { Calendar, CheckCircle, Clock, ArrowRight, Brain } from 'lucide-react';
import { motion } from 'motion/react';

export const ReviewSession: React.FC = () => {
    const { reviews, saveReview } = useGameStore();

    const now = Date.now();
    const dueReviews = reviews.filter(r => r.nextReview <= now);

    const cardsToReview = dueReviews.map(review => {
        const card = CARDS_1_1.find(c => c.id === review.cardId);
        return { ...card, review };
    }).filter(c => !!c.id);

    const handleReviewAction = (cardId: string, success: boolean) => {
        saveReview(cardId, success);
    };

    return (
        <main className="pt-32 pb-24 px-4 max-w-5xl mx-auto">
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                        <Brain size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Repaso Espaciado</h2>
                </div>
                <p className="text-white/40 text-sm max-w-lg">
                    Fortalece tus conexiones neuronales revisando los conceptos justo antes de que se olviden.
                </p>
            </div>

            {cardsToReview.length === 0 ? (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                    <CheckCircle size={40} className="mx-auto mb-4 text-green-500/30" />
                    <p className="text-white/30 font-medium">¡Todo al día!</p>
                    <p className="text-white/20 text-xs mt-2">No tienes conceptos pendientes de repaso por ahora.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {cardsToReview.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-card border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-all"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                                        Nivel SRS: {item.review?.level}
                                    </span>
                                    <span className="text-[10px] font-bold text-white/30 flex items-center gap-1">
                                        <Clock size={10} />
                                        Venció {new Date(item.review?.nextReview || 0).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-sm text-white/50">{item.subtitle}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleReviewAction(item.id!, false)}
                                    className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all"
                                >
                                    Olvidado
                                </button>
                                <button
                                    onClick={() => handleReviewAction(item.id!, true)}
                                    className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-white text-white hover:text-primary transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                                >
                                    Recordado
                                    <ArrowRight size={12} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <Calendar size={20} className="text-primary mb-3" />
                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Total en Repaso</h4>
                    <p className="text-2xl font-black text-white">{reviews.length}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <Brain size={20} className="text-primary mb-3" />
                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Pendientes</h4>
                    <p className="text-2xl font-black text-white">{cardsToReview.length}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <CheckCircle size={20} className="text-green-500 mb-3" />
                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Próximo Vencimiento</h4>
                    <p className="text-lg font-black text-white/70">
                        {reviews.length > 0 ? "Pronto" : "Ninguno"}
                    </p>
                </div>
            </div>
        </main>
    );
};
