import React, { useMemo } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Crown, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const CapstoneNode: React.FC = () => {
    const { completedMilestones, capstone, openCapstonePanel, getCurrentLevel } = useGameStore();

    const requirements = useMemo(() => {
        return [
            { id: 'milestones', label: '5 Pilares Completados', met: completedMilestones.length >= 5, current: completedMilestones.length, target: 5 },
            { id: 'level', label: 'Nivel 5', met: getCurrentLevel() >= 5, current: getCurrentLevel(), target: 5 }
        ];
    }, [completedMilestones, getCurrentLevel]);

    // Stable random positions for the sparkling dots to avoid hydration mismatch/impure render
    const particles = useMemo(() => {
        return [...Array(6)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        }));
    }, []);

    const isUnlocked = requirements.every(r => r.met);
    const isCompleted = capstone.isCompleted;

    return (
        <div className="flex flex-col items-center py-20 relative">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-white/10 to-transparent z-0" />
            
            <motion.button
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={() => isUnlocked && openCapstonePanel()}
                className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted 
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-600 shadow-[0_0_50px_rgba(234,179,8,0.4)] border-4 border-yellow-200' 
                        : isUnlocked 
                            ? 'bg-gradient-to-br from-yellow-400/20 to-amber-600/20 border-4 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:border-yellow-400 group'
                            : 'bg-white/5 border-4 border-white/10 grayscale cursor-not-allowed'
                }`}
            >
                {/* Corona Glow for Unlocked */}
                {isUnlocked && !isCompleted && (
                    <div className="absolute inset-0 rounded-full animate-pulse bg-yellow-400/20 blur-xl" />
                )}

                <div className={`${isCompleted ? 'text-white' : isUnlocked ? 'text-yellow-500 group-hover:text-yellow-400' : 'text-white/20'}`}>
                    {isCompleted || isUnlocked ? <Crown size={48} /> : <Lock size={40} />}
                </div>

                {/* Sparkling dots */}
                {(isUnlocked || isCompleted) && (
                    <div className="absolute -inset-4 pointer-events-none">
                        {particles.map((style, i) => (
                            <motion.div
                                key={i}
                                animate={{ 
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                    y: [0, -20, -40]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    delay: i * 0.4,
                                    ease: "easeOut"
                                }}
                                className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                                style={style}
                            />
                        ))}
                    </div>
                )}
            </motion.button>

            <div className="mt-8 text-center z-10">
                <h3 className={`text-xl font-black uppercase tracking-tighter ${isCompleted ? 'text-yellow-400' : isUnlocked ? 'text-white' : 'text-white/30'}`}>
                    La Prueba del Polímata
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mt-2">
                    {isCompleted ? 'GRADUADO' : 'PROYECTO FINAL CAPSTONE'}
                </p>

                {!isUnlocked && (
                    <div className="mt-6 flex flex-col gap-2 max-w-xs mx-auto">
                        {requirements.map(req => (
                            <div key={req.id} className="flex items-center gap-3 px-4 py-2 bg-black/40 rounded-full border border-white/5">
                                <div className={`w-2 h-2 rounded-full ${req.met ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-white/10'}`} />
                                <span className={`text-[9px] font-bold uppercase tracking-widest ${req.met ? 'text-white/80' : 'text-white/30'}`}>
                                    {req.label} {req.met ? '✓' : `(${req.current}/${req.target})`}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
