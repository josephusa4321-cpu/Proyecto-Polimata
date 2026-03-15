import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../stores/useGameStore';

interface FloatingXP {
    id: number;
    amount: number;
}

export const XPGainIndicator: React.FC = () => {
    const lastXPGain = useGameStore(state => state.lastXPGain);
    const [indicators, setIndicators] = useState<FloatingXP[]>([]);

    useEffect(() => {
        if (lastXPGain) {
            const newIndicator = {
                id: lastXPGain.timestamp,
                amount: lastXPGain.amount
            };
            
            setIndicators(prev => [...prev.slice(-4), newIndicator]); // Keep last 5

            const timer = setTimeout(() => {
                setIndicators(prev => prev.filter(i => i.id !== newIndicator.id));
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [lastXPGain]);

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 pointer-events-none z-[100] flex flex-col items-center gap-2">
            <AnimatePresence>
                {indicators.map((indicator) => (
                    <motion.div
                        key={indicator.id}
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: -40, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="relative overflow-visible bg-primary/20 backdrop-blur-md border border-primary/40 px-4 py-1 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                        {/* Partículas de XP (Chispas) */}
                        {Array.from({ length: 12 }).map((_, idx) => {
                            const angle = (idx / 12) * Math.PI * 2;
                            const radius = 30 + Math.random() * 20;
                            const sparkX = Math.cos(angle) * radius;
                            const sparkY = Math.sin(angle) * radius;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                                    animate={{
                                        x: [0, sparkX, sparkX - 250 - Math.random() * 100],
                                        y: [0, sparkY, sparkY - 120 - Math.random() * 50],
                                        scale: [0, 1.5, 0],
                                        opacity: [1, 1, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeOut",
                                        times: [0, 0.2, 1],
                                        delay: idx * 0.02
                                    }}
                                    className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-[0_0_15px_rgba(234,179,8,1)] z-10 pointer-events-none"
                                />
                            );
                        })}

                        <span className="text-primary font-black text-sm tracking-tighter">
                            +{indicator.amount} XP
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
