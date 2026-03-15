import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Eye, Send, X, MapPin, Camera, ClipboardCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ShadowQuestPanel: React.FC = () => {
    const { progress, shadowQuestModalOpen, closeShadowQuestModal, completeShadowQuest } = useGameStore();
    const { activeShadowQuest } = progress;
    const [observation, setObservation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!activeShadowQuest) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!observation.trim() || isSubmitting) return;

        setIsSubmitting(true);
        // Simulation of "processing" the observation
        setTimeout(() => {
            completeShadowQuest(observation);
            setObservation('');
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {shadowQuestModalOpen && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 md:p-6 bg-[#0a0e17]/95 backdrop-blur-2xl">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#1a1f2e] border border-primary/20 rounded-[40px] shadow-[0_0_100px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Detective Header */}
                        <div className="p-8 border-b border-white/5 flex justify-between items-start bg-gradient-to-r from-primary/10 to-transparent">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30 relative">
                                    <Eye size={32} />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg flex items-center justify-center text-primary shadow-lg scale-75">
                                        <MapPin size={14} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Shadow Quest</span>
                                        <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                            <Sparkles size={10} />
                                            Misión de Campo
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Reporte de Observación</h2>
                                </div>
                            </div>
                            <button 
                                onClick={closeShadowQuestModal}
                                className="p-3 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all active:scale-90"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="space-y-8">
                                {/* Mission Context */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-white/30">
                                        <ClipboardCheck size={14} className="text-primary/60" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Contexto: {activeShadowQuest.cardTitle}</span>
                                    </div>
                                    <div className="p-8 bg-black/40 border-2 border-primary/20 rounded-[32px] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16" />
                                        <p className="text-xl font-black text-white leading-tight italic relative z-10">
                                            "{activeShadowQuest.mission}"
                                        </p>
                                    </div>
                                </div>

                                {/* Observation Input */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center ml-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2">
                                                <Camera size={12} />
                                                Tus hallazgos en el mundo real
                                            </label>
                                            <span className="text-[9px] font-bold text-white/10 uppercase italic">Confidencial / Solo para tus ojos</span>
                                        </div>
                                        <textarea
                                            value={observation}
                                            onChange={(e) => setObservation(e.target.value)}
                                            placeholder="Describe lo que viste hoy..."
                                            className="w-full min-h-[220px] bg-white/[0.03] border-2 border-white/5 rounded-[32px] p-7 text-white/90 placeholder:text-white/10 focus:border-primary/40 focus:bg-primary/5 outline-none transition-all resize-none leading-relaxed text-lg"
                                        />
                                    </div>

                                    {/* Footer / Action */}
                                    <div className="flex items-center justify-between gap-6 pt-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <div className="px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-lg text-[10px] font-black uppercase transition-all group-hover:bg-primary group-hover:text-white">
                                                    +{activeShadowQuest.xpReward} XP
                                                </div>
                                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Recompensa de Campo</span>
                                            </div>
                                            <p className="text-[9px] text-white/10 font-medium">Esta observación se guardará en tu historial de maestría.</p>
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            disabled={!observation.trim() || isSubmitting}
                                            className={`
                                                relative px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-4 transition-all overflow-hidden
                                                ${observation.trim() && !isSubmitting 
                                                    ? 'bg-primary text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-105 active:scale-95' 
                                                    : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'}
                                            `}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <motion.div 
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    >
                                                        <Eye size={16} />
                                                    </motion.div>
                                                    Procesando...
                                                </>
                                            ) : (
                                                <>
                                                    Enviar Reporte
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
