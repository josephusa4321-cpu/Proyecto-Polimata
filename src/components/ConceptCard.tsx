import React from 'react';
import type { ConceptCard as IConceptCard, ReviewItem } from '../types';
import { useGameStore } from '../stores/useGameStore';
import { Lock, CheckCircle, ArrowRight, Zap, Brain, ClipboardPaste } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
    card: IConceptCard;
    status: 'locked' | 'available' | 'completed';
    onClick: () => void;
}

export const ConceptCard: React.FC<Props> = ({ card, status, onClick }) => {
    const { completedCardIds, reviews, contentStore, openContentEditor } = useGameStore();

    const isLocked = status === 'locked';
    const isCompleted = completedCardIds.includes(card.id);
    const hasManualContent = !!contentStore[card.id];

    // Check if needs review (SRS)
    const review = reviews.find((r: ReviewItem) => r.cardId === card.id);
    const needsReview = review && review.nextReview <= Date.now();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={!isLocked ? { y: -5, scale: 1.02 } : {}}
            onClick={!isLocked ? onClick : undefined}
            className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group
                ${isLocked ? 'bg-white/5 border-white/10 opacity-50 grayscale cursor-not-allowed' : ''}
                ${!isLocked && status === 'available' ? 'bg-card border-white/10 hover:border-primary/50 shadow-lg hover:shadow-primary/10' : ''}
                ${!isLocked && (status === 'completed' || isCompleted) ? 'bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-primary/20' : ''}
                ${needsReview ? 'border-yellow-500/60 shadow-[0_0_25px_rgba(234,179,8,0.2)] animate-pulse' : ''}
            `}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter
                        ${card.type === 'fundamental' ? 'bg-green-500/20 text-green-400' :
                            card.type === 'intermediate' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-purple-500/20 text-purple-400'}
                    `}>
                        <span>{card.type}</span>
                        {hasManualContent && <span className="text-[10px]" title="Contenido manual cargado">📝</span>}
                    </div>
                </div>

                <div className="flex items-center gap-2.5">
                    {needsReview && (
                        <div className="bg-yellow-500 text-black p-1 rounded-md shadow-lg" title="Necesita Repaso">
                            <Brain size={12} fill="currentColor" />
                        </div>
                    )}
                    {!isLocked && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                openContentEditor(card);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all z-30 hover:scale-110 active:scale-95"
                            title="Editar Contenido"
                        >
                            <ClipboardPaste size={14} />
                        </button>
                    )}

                    {isCompleted ? (
                        <CheckCircle size={16} className="text-green-400" />
                    ) : isLocked ? (
                        <Lock size={16} className="text-white/20" />
                    ) : (
                        <div className="flex items-center gap-1.5 text-primary border border-primary/20 bg-primary/5 px-2 py-1 rounded-lg">
                            <Zap size={12} fill="currentColor" className="shrink-0" />
                            <span className="text-[10px] font-black whitespace-nowrap leading-none">{card.xp} XP</span>
                        </div>
                    )}
                </div>
            </div>

            <h3 className={`font-black text-xl mb-1 leading-tight transition-colors
                ${isLocked ? 'text-white/30' : 'text-white group-hover:text-primary'}
            `}>
                {card.title}
            </h3>
            <p className="text-xs text-white/40 font-medium line-clamp-2 leading-relaxed">
                {card.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
                {card.prerequisites.map(pre => (
                    <span key={pre} className="text-[8px] font-bold text-white/20 uppercase tracking-widest border border-white/5 px-1.5 py-0.5 rounded bg-black/20">
                        {pre}
                    </span>
                ))}
            </div>

            {/* Progress indicators/Icons */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-1.5">
                    {card.isTool && <div className="w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-500" title="Tool"><Zap size={10} /></div>}
                    {card.isReframed && <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400" title="Reframed"><ArrowRight size={10} /></div>}
                </div>
                <div className="p-1 rounded-full group-hover:bg-primary/20 transition-colors">
                    <ArrowRight size={14} className={`${isLocked ? 'text-white/10' : 'text-primary'}`} />
                </div>
            </div>


            <motion.div
                className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500
                    ${status === 'locked' ? 'from-white/5 to-transparent' : ''}
                    ${status === 'available' ? 'from-primary/10 to-transparent group-hover:from-primary/20' : ''}
                    ${status === 'completed' || isCompleted ? 'from-green-500/10 to-transparent' : ''}
                    ${needsReview ? 'from-yellow-500/10 to-transparent' : ''}
                `}
            />
        </motion.div>
    );
};
