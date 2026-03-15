import React from 'react';
import { CheckCircle2, Lock, Play } from 'lucide-react';

interface SidebarStep {
    id: string;
    label: string;
    completed: boolean;
    locked: boolean;
}

interface LabProgressSidebarProps {
    steps: SidebarStep[];
    activeStepId: string;
    onStepClick: (id: string) => void;
}

export const LabProgressSidebar: React.FC<LabProgressSidebarProps> = ({ steps, activeStepId, onStepClick }) => {
    return (
        <div className="flex flex-col gap-2 w-full md:w-64 bg-[#1a1f2e] border border-slate-800 rounded-xl p-4 h-fit sticky top-20">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Progreso del Lab</h3>
            <div className="space-y-1">
                {steps.map((step) => {
                    const isActive = activeStepId === step.id;
                    const canClick = !step.locked || step.completed || isActive;

                    let icon = <Lock className="w-4 h-4 text-slate-600" />;
                    if (step.completed) {
                        icon = <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
                    } else if (isActive) {
                        icon = <Play className="w-4 h-4 text-cyan-500 animate-pulse" />;
                    } else if (!step.locked) {
                        icon = <div className="w-2 h-2 rounded-full bg-cyan-500/50" />;
                    }

                    return (
                        <button
                            key={step.id}
                            disabled={step.locked && !step.completed && !isActive}
                            onClick={() => canClick && onStepClick(step.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                                isActive 
                                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-white' 
                                    : 'border border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                            } ${!canClick ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <div className="flex-shrink-0 w-5 flex justify-center">
                                {icon}
                            </div>
                            <span className="text-sm font-medium truncate">{step.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
