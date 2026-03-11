import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../stores/useGameStore';
import { Trophy, Swords, Sparkles } from 'lucide-react';
import { LEVELS } from '../data/levels';

export const CelebrationOverlay: React.FC = () => {
    const { pendingCelebration, clearCelebration, getCurrentLevel } = useGameStore();
    
    if (!pendingCelebration) return null;

    const currentLevelNum = getCurrentLevel();
    const currentLevel = LEVELS.find(l => l.level === currentLevelNum) || LEVELS[0];

    const isBoss = pendingCelebration === 'boss';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#0a0e17]/90 backdrop-blur-xl"
            >
                {/* Particles Effect (Simplified CSS/Motion Particles) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ 
                                x: '50%', 
                                y: '50%', 
                                scale: 0,
                                opacity: 1 
                            }}
                            animate={{ 
                                x: `${Math.random() * 100}%`, 
                                y: `${Math.random() * 100}%`, 
                                scale: Math.random() * 2,
                                opacity: 0 
                            }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: Math.random() * 2,
                                ease: "easeOut" 
                            }}
                            className={`absolute w-2 h-2 rounded-full ${isBoss ? 'bg-yellow-400' : 'bg-primary'}`}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    className={`
                        relative w-full max-w-sm p-8 rounded-[48px] border-2 shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden
                        ${isBoss ? 'bg-card border-yellow-500/30' : 'bg-card border-primary/30'}
                    `}
                >
                    {/* Decorative backglow */}
                    <div className={`absolute -top-20 -left-20 w-64 h-64 blur-3xl rounded-full ${isBoss ? 'bg-yellow-500/10' : 'bg-primary/10'}`} />

                    <div className="relative flex flex-col items-center text-center">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className={`
                                w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-2xl
                                ${isBoss ? 'bg-yellow-500 text-[#0a0e17]' : 'bg-primary text-white'}
                            `}
                        >
                            {isBoss ? <Swords size={48} /> : <Trophy size={48} />}
                        </motion.div>

                        <h4 className={`text-xs font-black uppercase tracking-[0.3em] mb-2 ${isBoss ? 'text-yellow-500' : 'text-primary'}`}>
                            {isBoss ? '¡Victoria de Jefe!' : '¡Nuevo Nivel Alcanzado!'}
                        </h4>
                        
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-1">
                            {isBoss ? 'Desafío Superado' : `Nivel ${currentLevelNum}`}
                        </h2>
                        
                        <p className="text-sm text-white/40 font-bold uppercase tracking-widest mb-8">
                            {isBoss ? 'Has conquistado este pilar' : currentLevel.title}
                        </p>

                        {!isBoss && (
                            <div className="w-full bg-white/5 rounded-2xl p-4 mb-8 border border-white/5">
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2">Desbloqueaste</p>
                                <div className="flex items-center gap-2 justify-center text-white font-black text-sm uppercase italic">
                                    <Sparkles size={14} className="text-primary" />
                                    Nuevas Capacidades Sistémicas
                                </div>
                            </div>
                        )}

                        <button
                            onClick={clearCelebration}
                            className={`
                                w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all
                                active:scale-95 shadow-lg
                                ${isBoss 
                                    ? 'bg-yellow-500 text-[#0a0e17] hover:bg-yellow-400' 
                                    : 'bg-primary text-white hover:bg-primary/90'}
                            `}
                        >
                            Continuar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
