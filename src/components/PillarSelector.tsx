import React from 'react';
import { motion } from 'framer-motion';
import { PILLARS } from '../data/pillars';

interface PillarSelectorProps {
    activePillar: number | null;
    onSelectPillar: (pillarId: number | null) => void;
}

export const PillarSelector: React.FC<PillarSelectorProps> = ({ activePillar, onSelectPillar }) => {
    return (
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-4 min-w-max px-4">
                <button
                    onClick={() => onSelectPillar(null)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        activePillar === null 
                        ? 'border-primary bg-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]' 
                        : 'border-border/50 bg-background/50 hover:bg-muted/50'
                    }`}
                >
                    <span className="text-sm font-bold mb-1">ALL</span>
                    <span className="text-xs text-muted-foreground">Todos los Módulos</span>
                </button>

                {PILLARS.map((pillar) => {
                    const isActive = activePillar === pillar.id;
                    return (
                        <button
                            key={pillar.id}
                            onClick={() => onSelectPillar(pillar.id)}
                            className={`relative flex flex-col items-start p-4 rounded-xl border-2 transition-all w-64 ${
                                isActive 
                                ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.2)]' 
                                : 'border-border/50 bg-background/50 hover:bg-muted/50'
                            }`}
                        >
                            <div className="flex justify-between w-full mb-2">
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                    Pilar {pillar.id}
                                </span>
                                {pillar.isCore && (
                                    <span className="text-[10px] items-center flex text-amber-500 font-bold uppercase tracking-wider">
                                        Core
                                    </span>
                                )}
                            </div>
                            <h3 className="font-bold text-sm text-left line-clamp-2 leading-tight">
                                {pillar.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2 text-left">
                                {pillar.description}
                            </p>
                            
                            {isActive && (
                                <motion.div 
                                    layoutId="pillar-indicator"
                                    className="absolute -bottom-2 left-1/2 w-8 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                                    style={{ translateX: "-50%" }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
