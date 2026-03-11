import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_MODULES } from '../data/all-modules';
import { useGameStore } from '../stores/useGameStore';
import { Lock, Unlock, Zap, Brain } from 'lucide-react';
import { ALL_CARDS } from '../data/all-modules';

interface ModuleSelectorProps {
    activePillar: number | null;
    activeModuleId: string;
    onSelectModule: (moduleId: string) => void;
}

export const ModuleSelector: React.FC<ModuleSelectorProps> = ({ activePillar, activeModuleId, onSelectModule }) => {
    const { completedCardIds, completedBossFights } = useGameStore();

    // Filter modules based on active pillar
    const filteredModules = activePillar 
        ? ALL_MODULES.filter(m => m.pillar === activePillar)
        : ALL_MODULES;

    // Check if module is unlocked (MVP: sequential logic or just all unlocked for now)
    // For Phase 4, we assume modules within a pillar are sequential, but across pillars it depends on cards.
    // For simplicity in the selector, we'll mark a module as "started" if it has completed cards.
    
    return (
        <div className="w-full">
            <h3 className="text-sm font-bold text-muted-foreground mb-3 px-1 uppercase tracking-wider flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Módulos de Aprendizaje
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                <AnimatePresence>
                    {filteredModules.map((module) => {
                        const isActive = activeModuleId === module.id;
                        
                        // Calculate progress
                        const moduleCards = ALL_CARDS.filter(c => c.id.startsWith(module.id + '.'));
                        const completedInModule = moduleCards.filter(c => completedCardIds.includes(c.id)).length;
                        const progress = moduleCards.length > 0 ? (completedInModule / moduleCards.length) * 100 : 0;
                        const isBossBeaten = completedBossFights.includes(`bf-${module.id}`);
                        const isFullyComplete = progress === 100 && isBossBeaten;

                        return (
                            <motion.button
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={module.id}
                                onClick={() => onSelectModule(module.id)}
                                className={`relative text-left p-4 rounded-xl border transition-all overflow-hidden ${
                                    isActive 
                                    ? 'border-primary/50 bg-primary/5 shadow-[0_4px_20px_rgba(var(--primary),0.15)] ring-1 ring-primary/20' 
                                    : 'border-border/40 bg-card hover:border-primary/30 hover:bg-accent/5'
                                }`}
                            >
                                {/* Background Progress Fill */}
                                <div 
                                    className="absolute inset-0 bg-primary/5 transition-all duration-1000 ease-out z-0"
                                    style={{ width: `${progress}%` }}
                                />

                                <div className="relative z-10 flex justify-between items-start mb-2">
                                    <span className="text-xs font-mono font-bold text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
                                        MOD {module.id}
                                    </span>
                                    {isFullyComplete ? (
                                        <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
                                    ) : completedInModule > 0 ? (
                                        <Unlock className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                        <Lock className="w-4 h-4 text-muted-foreground/50" />
                                    )}
                                </div>
                                
                                <h4 className="font-bold text-sm leading-tight mb-1 relative z-10">
                                    {module.title}
                                </h4>
                                
                                <div className="flex justify-between items-center mt-3 relative z-10">
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                        Progreso
                                    </span>
                                    <span className="text-xs font-mono font-bold text-primary">
                                        {completedInModule}/{moduleCards.length}
                                    </span>
                                </div>
                                
                                {/* Mini Progress Bar */}
                                <div className="mt-2 h-1 w-full bg-secondary rounded-full overflow-hidden relative z-10">
                                    <div 
                                        className={`h-full transition-all duration-500 ${isFullyComplete ? 'bg-yellow-500' : 'bg-primary'}`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};
