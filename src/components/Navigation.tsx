import { LayoutGrid, Hammer, Brain, Target, BarChart3, Trophy } from 'lucide-react';

export type ViewType = 'skilltree' | 'arsenal' | 'review' | 'missions' | 'achievements' | 'stats';

interface Props {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
}

export const Navigation: React.FC<Props> = ({ currentView, onViewChange }) => {
    const tabs = [
        { id: 'skilltree', label: 'Evolución', icon: LayoutGrid },
        { id: 'arsenal', label: 'Arsenal', icon: Hammer },
        { id: 'review', label: 'Repaso', icon: Brain },
        { id: 'missions', label: 'Misiones', icon: Target },
        { id: 'achievements', label: 'Logros', icon: Trophy },
        { id: 'stats', label: 'Stats', icon: BarChart3 },
    ] as const;

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl z-[50] shadow-2xl flex items-center gap-1">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentView === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onViewChange(tab.id as ViewType)}
                        className={`
              flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
              ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                            }
            `}
                    >
                        <Icon size={18} />
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'opacity-100 max-w-[100px] visible' : 'opacity-0 max-w-0 invisible'}`}>
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};
