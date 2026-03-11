import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Zap } from 'lucide-react';
import type { ActivatedCombo } from '../types';

interface Props {
    combo: ActivatedCombo;
    onClose: (id: number) => void;
}

export const ComboToast: React.FC<Props> = ({ combo, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(combo.timestamp);
        }, 5000);
        return () => clearTimeout(timer);
    }, [combo.timestamp, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="w-full max-w-xs bg-card border border-primary/30 rounded-2xl p-4 shadow-2xl shadow-primary/20 flex gap-4 pointer-events-auto"
        >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Share2 size={24} className="animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white">¡Combo Cross-Pillar!</h4>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary text-white text-[8px] font-black">
                        <Zap size={8} /> +{combo.xp} XP
                    </div>
                </div>
                <p className="text-[11px] text-white/70 font-medium truncate leading-tight mb-1">
                    {combo.reason}
                </p>
                <div className="flex items-center gap-1.5 opacity-30">
                    <span className="text-[8px] font-black uppercase tracking-tight">{combo.cardId}</span>
                    <span className="text-[8px] font-black uppercase tracking-tight">→</span>
                    <span className="text-[8px] font-black uppercase tracking-tight">{combo.targetId}</span>
                </div>
            </div>
        </motion.div>
    );
};

export const ToastContainer: React.FC = () => {
    const { activatedCombos } = useGameStore();
    const [visibleCombos, setVisibleCombos] = React.useState<ActivatedCombo[]>([]);

    useEffect(() => {
        // Only show last 3 combos
        setVisibleCombos(activatedCombos.slice(-3));
    }, [activatedCombos]);

    const handleClose = (timestamp: number) => {
        setVisibleCombos(prev => prev.filter(c => c.timestamp !== timestamp));
    };

    return (
        <div className="fixed bottom-24 right-6 z-[500] flex flex-col gap-3 pointer-events-none w-80">
            <AnimatePresence>
                {visibleCombos.map(combo => (
                    <ComboToast 
                        key={combo.timestamp} 
                        combo={combo} 
                        onClose={handleClose} 
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

// Import useGameStore dynamically within component if needed or pass as prop
import { useGameStore } from '../stores/useGameStore';
