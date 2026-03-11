import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { useGameStore } from '../stores/useGameStore';
import type { Achievement } from '../types';

export const AchievementToast: React.FC = () => {
    const { latestUnlockedAchievement, clearLatestAchievement } = useGameStore();
    const [visible, setVisible] = useState(false);
    const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

    useEffect(() => {
        if (latestUnlockedAchievement) {
            setCurrentAchievement(latestUnlockedAchievement);
            setVisible(true);
            
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(clearLatestAchievement, 500); // Wait for exit animation
            }, 6000);
            
            return () => clearTimeout(timer);
        }
    }, [latestUnlockedAchievement, clearLatestAchievement]);

    if (!currentAchievement) return null;

    // Dynamically get the icon component
    const IconComponent = (LucideIcons as any)[currentAchievement.icon] || LucideIcons.Trophy;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[600] w-[90%] max-w-sm"
                >
                    <div className="bg-primary p-[2px] rounded-[32px] shadow-[0_20px_50px_rgba(59,130,246,0.3)]">
                        <div className="bg-[#0a0e17] rounded-[30px] p-6 flex items-center gap-6 overflow-hidden relative">
                            {/* Decorative background glow */}
                            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative">
                                <motion.div 
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20"
                                >
                                    <IconComponent size={32} />
                                </motion.div>
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: 'spring' }}
                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-[#0a0e17]"
                                >
                                    <LucideIcons.Star size={12} fill="currentColor" />
                                </motion.div>
                            </div>

                            <div className="flex-1">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Logro Desbloqueado</h4>
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                                    {currentAchievement.title}
                                </h3>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                    +{currentAchievement.xpBonus} XP
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
