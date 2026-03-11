import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Lock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { PILLARS } from '../data/pillars';
import { useGameStore } from '../stores/useGameStore';
import { ALL_CARDS, ALL_BOSS_FIGHTS } from '../data/all-modules';

export const MilestoneList: React.FC = () => {
    const { completedCardIds, completedBossFights, completedMilestones } = useGameStore();
    const [expandedMilestone, setExpandedMilestone] = React.useState<string | null>(null);

    return (
        <div className="w-full space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-yellow-500">
                <Award className="w-6 h-6" /> Milestones de Pilar
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PILLARS.map(pillar => {
                    const milestone = pillar.milestone;
                    
                    // Evaluate completion dynamically
                    // 1. All cards in the pillar must be completed
                    const pillarCards = ALL_CARDS.filter(c => c.id.startsWith(`${pillar.id}.`));
                    const completedPillarCards = pillarCards.filter(c => completedCardIds.includes(c.id));
                    const progressCards = pillarCards.length > 0 ? completedPillarCards.length / pillarCards.length : 0;
                    
                    // 2. All boss fights in the pillar must be completed
                    const pillarBosses = ALL_BOSS_FIGHTS.filter(bf => bf.moduleId.startsWith(`${pillar.id}.`));
                    const completedPillarBosses = pillarBosses.filter(bf => completedBossFights.includes(bf.id));
                    const progressBosses = pillarBosses.length > 0 ? completedPillarBosses.length / pillarBosses.length : 0;
                    
                    const isFullyComplete = completedMilestones.includes(pillar.id.toString());
                    const isExpanded = expandedMilestone === milestone.id;
                    const totalProgress = (progressCards * 0.7) + (progressBosses * 0.3); // weighted progress

                    return (
                        <motion.div
                            layout
                            key={milestone.id}
                            className={`relative overflow-hidden rounded-2xl border transition-all ${
                                isFullyComplete 
                                ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)]' 
                                : 'bg-card border-border/50 hover:border-primary/30'
                            }`}
                        >
                            {/* Background Progress Bar */}
                            <div 
                                className={`absolute inset-0 z-0 opacity-20 transition-all duration-1000 ease-out ${isFullyComplete ? 'bg-yellow-500' : 'bg-primary'}`}
                                style={{ width: `${totalProgress * 100}%` }}
                            />
                            
                            <div className="relative z-10 p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${isFullyComplete ? 'bg-yellow-500/20 text-yellow-500' : 'bg-muted text-muted-foreground'}`}>
                                            {isFullyComplete ? <CheckCircle className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Pilar {pillar.id}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-yellow-500">+{milestone.xp} XP</span>
                                    </div>
                                </div>
                                
                                <h4 className="font-bold text-lg mb-1">{milestone.title}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">{milestone.description}</p>
                                
                                <button 
                                    onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                                    className="mt-4 flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-primary/80 hover:text-primary transition-colors"
                                >
                                    <span>Requisitos</span>
                                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-4 space-y-2 overflow-hidden"
                                        >
                                            <div className="flex justify-between items-center text-sm p-2 bg-background/50 rounded-md">
                                                <span className="text-muted-foreground">Cards Completadas:</span>
                                                <span className={`font-mono font-bold ${progressCards === 1 ? 'text-emerald-500' : 'text-primary'}`}>
                                                    {completedPillarCards.length} / {pillarCards.length}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm p-2 bg-background/50 rounded-md">
                                                <span className="text-muted-foreground">Boss Fights Derrotados:</span>
                                                <span className={`font-mono font-bold ${progressBosses === 1 ? 'text-emerald-500' : 'text-primary'}`}>
                                                    {completedPillarBosses.length} / {pillarBosses.length}
                                                </span>
                                            </div>
                                            {milestone.prerequisites.length > 0 && (
                                                <div className="pt-2 text-xs text-muted-foreground/70 border-t border-border/50 mt-2">
                                                    Otros requisitos: {milestone.prerequisites.join(', ')}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
