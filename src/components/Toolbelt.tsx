import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import { ALL_CARDS } from '../data/all-modules';
import { Hammer, ExternalLink, Info, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const Toolbelt: React.FC = () => {
    const { completedCardIds } = useGameStore();

    const toolCards = ALL_CARDS.filter(card => card.isTool && completedCardIds.includes(card.id));

    return (
        <main className="pt-32 pb-24 px-4 max-w-5xl mx-auto">
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-500">
                        <Hammer size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Mi Arsenal</h2>
                </div>
                <p className="text-white/40 text-sm max-w-lg">
                    Tu arsenal de modelos mentales y herramientas prácticas desbloqueadas.
                    Úsalas para navegar la complejidad.
                </p>
            </div>

            {toolCards.length === 0 ? (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                    <Info size={40} className="mx-auto mb-4 text-white/10" />
                    <p className="text-white/30 font-medium">No has desbloqueado herramientas aún.</p>
                    <p className="text-white/20 text-xs mt-2">Completa cartas marcadas como "HERRAMIENTA" en el Skill Tree.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {toolCards.map((tool) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group bg-card border border-white/10 p-6 rounded-2xl hover:border-primary/50 transition-all shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest">
                                    {tool.id}
                                </span>
                                <button className="text-white/20 group-hover:text-primary transition-colors">
                                    <ExternalLink size={16} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {tool.title}
                            </h3>
                            <p className="text-sm text-white/50 leading-relaxed mb-6">
                                {tool.subtitle}
                            </p>

                            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                <h4 className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Zap size={10} className="text-yellow-500" />
                                    Gatillo de uso
                                </h4>
                                <p className="text-xs text-white/70 italic leading-relaxed">
                                    ¿Cuándo aplicar? {tool.title} es ideal cuando enfrentas situaciones de {tool.subtitle.toLowerCase()}.
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </main>
    );
};
