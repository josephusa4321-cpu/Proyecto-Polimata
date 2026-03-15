import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import { LEVELS } from '../data/levels';
import { Zap, Target, Settings, Flame, AlertTriangle, FlipHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SettingsPanel } from './SettingsPanel';
import { ALL_CARDS } from '../data/all-modules';

export const HUD: React.FC = () => {
    const { 
        xp, 
        getCurrentLevel, 
        completedCardIds, 
        streakDays, 
        isTaxDue, 
        openTaxModal,
        activeShadowQuest,
        openShadowQuestModal,
        checkTimeAttack,
        activeMirrorMatch,
        openMirrorMatchModal,
        ngPlus,
    } = useGameStore();
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
    const currentLevelNum = getCurrentLevel();
    const currentLevel = LEVELS.find(l => l.level === currentLevelNum) || LEVELS[0];
    const nextLevel = LEVELS.find(l => l.level === currentLevelNum + 1);

    const progressToNext = nextLevel
        ? ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
        : 100;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-white/10 p-4 shadow-xl">
            <div className="max-w-5xl mx-auto flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <span className="text-xl font-bold text-primary leading-none">{currentLevelNum}</span>
                            {ngPlus.ngPlusCount > 0 && (
                                <span className="text-[8px] font-black text-yellow-500 mt-0.5">NG+{ngPlus.ngPlusCount}</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-white uppercase tracking-wider">{currentLevel.title}</h1>
                            <div className="flex items-center gap-2 text-xs text-white/50">
                                <Zap size={12} className="text-yellow-400" />
                                <span>{xp} XP Totales</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end text-xs text-white/50 uppercase font-semibold">
                                <Target size={12} />
                                <span>Cards</span>
                            </div>
                            <p className="text-lg font-bold text-white leading-none">
                                {completedCardIds.length} <span className="text-xs text-white/50">/ {ALL_CARDS.length}</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end text-xs text-white/50 uppercase font-semibold">
                                <div className="relative flex items-center justify-center">
                                    <AnimatePresence>
                                        {streakDays >= 3 && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ 
                                                    opacity: [0.3, 0.8, 0.3], 
                                                    scale: [1, 1.3, 1],
                                                }}
                                                transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                                                className="absolute inset-0 bg-orange-500/40 rounded-full blur-md -z-10"
                                            />
                                        )}
                                    </AnimatePresence>
                                    <Flame size={12} className={`${streakDays >= 3 ? 'text-orange-400 animate-pulse' : 'text-orange-500'}`} />
                                </div>
                                <span>Racha</span>
                            </div>
                            <p className={`text-lg font-bold leading-none ${streakDays >= 3 ? 'text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]' : 'text-white'}`}>
                                {streakDays} Días
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {completedCardIds.length > 0 && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => checkTimeAttack(true)}
                                className="p-2 bg-primary/10 hover:bg-primary/20 rounded-xl text-primary transition-colors border border-primary/20 flex items-center gap-2"
                                title="Time Attack"
                            >
                                <Zap size={16} className="fill-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Relámpago</span>
                            </motion.button>
                        )}
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-2 hover:bg-white/5 rounded-xl text-white/30 hover:text-white transition-colors border border-transparent hover:border-white/10"
                        >
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

                <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, progressToNext)}%` }}
                        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                        className="absolute top-0 left-0 h-full bg-linear-to-r from-primary to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                </div>

                <AnimatePresence>
                    {isTaxDue && (
                        <motion.button
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onClick={openTaxModal}
                            className="mt-3 w-full bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-center justify-between group hover:bg-yellow-500/20 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-yellow-500 text-[#0a0e17]">
                                    <AlertTriangle size={14} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest leading-none mb-1">Teaching Tax Pendiente</p>
                                    <p className="text-[11px] text-white/60 font-medium">Debes pagar tu tributo para seguir avanzando</p>
                                </div>
                            </div>
                            <div className="text-[10px] font-black text-yellow-500 uppercase tracking-widest px-3 py-1 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500 group-hover:text-[#0a0e17] transition-all">
                                Pagar 🎓
                            </div>
                        </motion.button>
                    )}
                    {activeShadowQuest && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={openShadowQuestModal}
                            className="mt-2 w-full flex items-center justify-between px-5 py-3 bg-primary/10 border border-primary/20 rounded-xl hover:bg-primary/20 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Target size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-0.5">Shadow Quest Disponible</p>
                                    <p className="text-[11px] font-bold text-white uppercase truncate max-w-[180px]">{activeShadowQuest.cardTitle}</p>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <Target size={12} />
                            </div>
                        </motion.button>
                    )}
                    {activeMirrorMatch && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={openMirrorMatchModal}
                            className="mt-2 w-full flex items-center justify-between px-5 py-3 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/15 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                                    <FlipHorizontal size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em] mb-0.5">Mirror Match Activo</p>
                                    <p className="text-[11px] font-bold text-white uppercase truncate max-w-[180px]">{activeMirrorMatch.cardTitle}</p>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                                <FlipHorizontal size={12} />
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};
