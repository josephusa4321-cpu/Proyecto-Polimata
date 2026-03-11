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
                        className="bg-primary/20 backdrop-blur-md border border-primary/40 px-4 py-1 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                        <span className="text-primary font-black text-sm tracking-tighter">
                            +{indicator.amount} XP
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
