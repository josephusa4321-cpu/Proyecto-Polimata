import React from 'react';
import { CheckCircle2, Lock, Beaker } from 'lucide-react';
import type { PracticeLabProgress } from '../../types';

interface Props {
    progress: PracticeLabProgress;
    totalLevels: number;
}

export const LabProgressSidebar: React.FC<Props> = ({ progress, totalLevels }) => {
    const { currentLevel, status } = progress;

    const steps = [
        { level: 0, title: 'Diagnóstico' },
        ...Array.from({ length: totalLevels }, (_, i) => ({ level: i + 1, title: `Ejercicio ${i + 1}` }))
    ];

    return (
        <div className="w-64 border-r border-white/5 bg-card/50 backdrop-blur-md p-6 flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase text-white/50 tracking-widest leading-none mb-4">Progreso del Lab</h3>
            <div className="flex flex-col gap-4 relative">
                {/* Vertical line connecting steps */}
                <div className="absolute left-3 top-4 bottom-4 w-px bg-white/10 z-0"></div>
                {steps.map((step) => {
                    const isCompleted = status === 'completed' || currentLevel > step.level;
                    const isCurrent = currentLevel === step.level && status !== 'completed';
                    const isLocked = currentLevel < step.level && status !== 'completed';

                    return (
                        <div key={step.level} className="flex items-start gap-4 z-10 relative">
                            <div className={`
                                w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300
                                ${isCompleted ? 'bg-green-500 border-green-500 text-[#0a0e17]' : ''}
                                ${isCurrent ? 'bg-card border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse' : ''}
                                ${isLocked ? 'bg-card border-white/10 text-white/20' : ''}
                            `}>
                                {isCompleted && <CheckCircle2 size={12} strokeWidth={3} />}
                                {isCurrent && <Beaker size={12} strokeWidth={2} />}
                                {isLocked && <Lock size={10} strokeWidth={2} />}
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300
                                    ${isCompleted ? 'text-green-400' : ''}
                                    ${isCurrent ? 'text-primary' : ''}
                                    ${isLocked ? 'text-white/30' : ''}
                                `}>
                                    {step.title}
                                </span>
                                {isCurrent && (
                                    <span className="text-[10px] text-white/40 mt-1 font-medium">En curso</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
