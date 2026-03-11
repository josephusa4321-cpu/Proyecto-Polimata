import React, { useState, useMemo } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { X, Trophy, Crown, CheckCircle, ArrowRight, Share2, Award, BookOpen, Target, Scale, Zap, Eye, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CapstonePanel: React.FC = () => {
    const { 
        capstone, 
        capstonePanelOpen, 
        closeCapstonePanel, 
        completeCapstone,
        startNewGamePlus,
        ngPlus,
        xp,
        completedCardIds,
        completedBossFights,
        taxesPaid,
        questHistory,
        mirrorMatchHistory,
        debuffHistory,
        streakDays
    } = useGameStore();

    const [submission, setSubmission] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showStats, setShowStats] = useState(false);

    const handleSubmit = () => {
        if (submission.length < 50) return; // Minimum length requirement

        setIsSubmitting(true);
        setTimeout(() => {
            completeCapstone(submission);
            setIsSubmitting(false);
            setShowStats(true);
        }, 1500);
    };

    const stats = useMemo(() => [
        { label: 'XP Totales', value: xp + (showStats ? 500 : 0), icon: <Zap size={14} />, color: 'text-primary' },
        { label: 'Cards', value: completedCardIds.length, icon: <BookOpen size={14} />, color: 'text-blue-400' },
        { label: 'Jefes', value: completedBossFights.length, icon: <Target size={14} />, color: 'text-red-400' },
        { label: 'Taxes', value: taxesPaid.length, icon: <Award size={14} />, color: 'text-purple-400' },
        { label: 'Quests', value: questHistory.length, icon: <CheckCircle size={14} />, color: 'text-green-400' },
        { label: 'Mirrors', value: mirrorMatchHistory.length, icon: <Scale size={14} />, color: 'text-orange-400' },
        { label: 'Sesgos', value: debuffHistory.length, icon: <Shield size={14} />, color: 'text-indigo-400' },
        { label: 'Racha', value: `${streakDays}d`, icon: <Eye size={14} />, color: 'text-pink-400' },
    ], [xp, completedCardIds, completedBossFights, taxesPaid, questHistory, mirrorMatchHistory, debuffHistory, streakDays, showStats]);

    return (
        <AnimatePresence>
            {capstonePanelOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCapstonePanel}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[400]"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-4 md:inset-10 bg-card border border-white/10 rounded-[40px] z-[401] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {showStats || capstone.isCompleted ? (
                            <div className="h-full flex flex-col overflow-y-auto custom-scrollbar">
                                <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-[0_0_80px_rgba(234,179,8,0.5)] mb-10"
                                    >
                                        <Crown size={64} />
                                    </motion.div>

                                    <motion.h1 
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, type: 'spring' }}
                                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4"
                                    >
                                        ¡POLÍMATA VERIFICADO!
                                    </motion.h1>
                                    <p className="text-yellow-500 font-black uppercase tracking-[0.4em] text-sm md:text-base mb-16">
                                        Nivel de Maestría: Explorador Sistémico
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                                        {stats.map((stat, i) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 + i * 0.1 }}
                                                className="bg-white/5 border border-white/5 p-6 rounded-3xl"
                                            >
                                                <div className={`flex items-center justify-center gap-2 mb-2 ${stat.color} font-black uppercase tracking-widest text-[10px]`}>
                                                    {stat.icon} {stat.label}
                                                </div>
                                                <div className="text-2xl font-black text-white">{stat.value}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-10 border-t border-white/5 flex flex-col items-center gap-6 bg-black/20">
                                    <p className="text-xs text-white/40 max-w-lg text-center leading-relaxed">
                                        Tu viaje apenas comienza. La polimatía no es un destino, sino una forma de percibir el mundo a través de todas las lentes posibles.
                                    </p>
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={closeCapstonePanel}
                                            className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-yellow-400 transition-all shadow-xl"
                                        >
                                            Continuar mi Expansión
                                        </button>
                                        {ngPlus.isAvailable && (
                                            <button 
                                                onClick={startNewGamePlus}
                                                className="px-10 py-5 bg-yellow-500 text-[#0a0e17] font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white transition-all shadow-xl flex items-center gap-2"
                                            >
                                                Iniciar New Game+
                                            </button>
                                        )}
                                        <button className="p-5 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2">
                                            <Share2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Submission View */}
                                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-yellow-400/20 rounded-2xl flex items-center justify-center text-yellow-400">
                                            <Crown size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black uppercase tracking-tight text-white leading-none">La Prueba del Polímata</h2>
                                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Proyecto de Integración Final</p>
                                        </div>
                                    </div>
                                    <button onClick={closeCapstonePanel} className="p-3 hover:bg-white/5 rounded-full text-white/40 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                                    <div className="max-w-3xl mx-auto space-y-12">
                                        <section className="space-y-6">
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                                                <Trophy size={16} className="text-yellow-400" /> El Desafío
                                            </h3>
                                            <div className="bg-white/5 border border-white/5 p-8 rounded-[32px] space-y-4 text-white/70 text-sm leading-relaxed">
                                                <p>
                                                    Has recorrido un largo camino. Ahora demuestra que puedes **INTEGRAR** todo lo aprendido. 
                                                    Selecciona un problema complejo del mundo real y analízalo usando al menos 5 conceptos diferentes de los que has estudiado.
                                                </p>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                                    <li className="flex gap-2 text-xs"><CheckCircle size={14} className="text-primary shrink-0" /> Identificar el sistema y sus componentes</li>
                                                    <li className="flex gap-2 text-xs"><CheckCircle size={14} className="text-primary shrink-0" /> Mapear al menos 2 bucles de retroalimentación</li>
                                                    <li className="flex gap-2 text-xs"><CheckCircle size={14} className="text-primary shrink-0" /> Encontrar puntos de apalancamiento</li>
                                                    <li className="flex gap-2 text-xs"><CheckCircle size={14} className="text-primary shrink-0" /> Reconocer tus propios sesgos al analizarlo</li>
                                                </ul>
                                            </div>
                                        </section>

                                        <section className="space-y-4">
                                            <label className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3 px-2">
                                                <BookOpen size={16} className="text-primary" /> Tu Tesis Polimática
                                            </label>
                                            <textarea
                                                value={submission}
                                                onChange={(e) => setSubmission(e.target.value)}
                                                placeholder="Comienza tu análisis aquí... (Mínimo 50 caracteres)"
                                                className="w-full h-80 bg-black/40 border border-white/10 rounded-[32px] p-8 text-base text-white focus:border-yellow-400/50 outline-none transition-all resize-none shadow-inner"
                                            />
                                            <div className="flex justify-between items-center px-4">
                                                <span className={`text-[10px] font-bold uppercase transition-colors ${submission.length >= 50 ? 'text-green-500' : 'text-white/20'}`}>
                                                    {submission.length} caracteres
                                                </span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">+500 XP al completar</span>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                <div className="p-8 border-t border-white/5 bg-black/20 flex justify-center">
                                    <button
                                        disabled={submission.length < 50 || isSubmitting}
                                        onClick={handleSubmit}
                                        className="w-full max-w-md py-6 bg-yellow-400 hover:bg-white text-black font-black uppercase tracking-tighter transition-all rounded-3xl flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale group shadow-[0_20px_40px_rgba(234,179,8,0.2)]"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Presentar Capstone Final
                                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
