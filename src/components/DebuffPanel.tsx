import React, { useState } from 'react';
import { useGameStore, XP_VALUES } from '../stores/useGameStore';
import { COGNITIVE_BIASES } from '../data/debuffs';
import { X, Shield, ShieldAlert, ChevronRight, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';

export const DebuffPanel: React.FC = () => {
    const { debuffPanelOpen, closeDebuffPanel, applyDebuff, debuffHistory } = useGameStore();
    const [selectedBiasId, setSelectedBiasId] = useState<string | null>(null);
    const [context, setContext] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [lastBiasName, setLastBiasName] = useState("");

    const handleReport = () => {
        if (!selectedBiasId) return;
        const bias = COGNITIVE_BIASES.find(b => b.id === selectedBiasId);
        if (bias) {
            setLastBiasName(bias.name);
            applyDebuff(selectedBiasId, context);
            setShowSuccess(true);
            setSelectedBiasId(null);
            setContext("");
            setTimeout(() => {
                setShowSuccess(false);
                closeDebuffPanel();
            }, 3000);
        }
    };

    const selectedBias = COGNITIVE_BIASES.find(b => b.id === selectedBiasId);

    // Helper to render lucide icons dynamically
    const IconComponent = (iconName: string) => {
        const LucideIcon = (Icons as any)[iconName];
        return LucideIcon ? <LucideIcon size={20} /> : <AlertCircle size={20} />;
    };

    return (
        <AnimatePresence>
            {debuffPanelOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeDebuffPanel}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300]"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed top-0 right-0 h-full w-full max-w-lg bg-card border-l border-white/10 z-[301] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                            <div className="flex items-center gap-3">
                                <Shield className="text-primary" size={24} />
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tight text-white leading-none">Auto-Diagnóstico</h2>
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Integridad Intelectual</p>
                                </div>
                            </div>
                            <button onClick={closeDebuffPanel} className="p-2 hover:bg-white/5 rounded-full text-white/40 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
                            {showSuccess ? (
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase">Sesgo Detectado</h3>
                                    <p className="text-white/60 max-w-xs mx-auto leading-relaxed">
                                        🛡️ Honestidad intelectual confirmada: <span className="text-primary font-bold">{lastBiasName}</span>. 
                                        <br />{XP_VALUES.DEBUFF_PENALTY} XP. Tu compromiso con la verdad te hace más fuerte.
                                    </p>
                                </motion.div>
                            ) : selectedBias ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <button 
                                        onClick={() => setSelectedBiasId(null)}
                                        className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-1"
                                    >
                                        <ChevronRight size={12} className="rotate-180" /> Volver a la lista
                                    </button>

                                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                                                {IconComponent(selectedBias.icon)}
                                            </div>
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">{selectedBias.name}</h3>
                                        </div>
                                        <p className="text-sm text-white/70 leading-relaxed italic mb-4">
                                            "{selectedBias.question}"
                                        </p>
                                        <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                            <p className="text-xs text-white/50 leading-relaxed">
                                                {selectedBias.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 px-2">
                                            <MessageSquare size={12} /> Contexto (Opcional)
                                        </label>
                                        <textarea
                                            value={context}
                                            onChange={(e) => setContext(e.target.value)}
                                            placeholder="¿En qué situación detectaste este sesgo hoy?"
                                            className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-primary/50 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handleReport}
                                        className="w-full py-5 bg-primary hover:bg-white text-white hover:text-primary font-black uppercase tracking-tighter transition-all rounded-2xl flex items-center justify-center gap-3 group shadow-xl shadow-primary/20"
                                    >
                                        <ShieldAlert size={20} className="group-hover:scale-110 transition-transform" />
                                        Me atrapó hoy ({XP_VALUES.DEBUFF_PENALTY} XP)
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded-3xl mb-8">
                                        <p className="text-xs text-white/60 leading-relaxed">
                                            Sé honesto contigo mismo. Reconocer tus propios sesgos es el primer nivel de la maestría cognitiva.
                                            Reportar un sesgo deduce <span className="text-primary font-bold">{Math.abs(XP_VALUES.DEBUFF_PENALTY)} XP</span> como penalización simbólica por el error de pensamiento, pero fortalece tu integridad.
                                        </p>
                                    </div>

                                    <div className="grid gap-3">
                                        {COGNITIVE_BIASES.map((bias) => (
                                            <button
                                                key={bias.id}
                                                onClick={() => setSelectedBiasId(bias.id)}
                                                className="group text-left p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-primary/30 transition-all flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-black/40 rounded-xl text-white/40 group-hover:text-primary transition-colors">
                                                        {IconComponent(bias.icon)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{bias.name}</h4>
                                                        <p className="text-[10px] text-white/30 line-clamp-1">{bias.question}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-white/10 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {debuffHistory.length > 0 && (
                                        <div className="mt-12 space-y-4 pt-8 border-t border-white/5">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">Historial Reciente</h3>
                                            <div className="space-y-2">
                                                {debuffHistory.slice(-5).reverse().map((d) => (
                                                    <div key={d.id} className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="text-xs font-bold text-white uppercase">{d.biasName}</p>
                                                            <p className="text-[10px] text-white/40 mt-1">{new Date(d.detectedAt).toLocaleDateString()}</p>
                                                            {d.context && <p className="text-[10px] text-white/60 mt-2 italic leading-relaxed">"{d.context}"</p>}
                                                        </div>
                                                        <span className="text-[10px] font-black text-red-500/50">{d.xpPenalty} XP</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
