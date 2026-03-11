import React from 'react';
import { Swords, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useGameStore } from '../stores/useGameStore';
import type { BossFight } from '../types';

interface Props {
    bossFight: BossFight;
    onOpen: () => void;
}

export const BossFightNode: React.FC<Props> = ({ bossFight, onOpen }) => {
    const { completedCardIds, completedBossFights } = useGameStore();

    const isCompleted = completedBossFights.includes(bossFight.id);
    const allPrereqsMet = bossFight.prerequisites.every(id => completedCardIds.includes(id));
    const status = isCompleted ? 'completed' : allPrereqsMet ? 'available' : 'locked';

    if (status === 'locked') {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 p-8 rounded-[40px] border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-center grayscale opacity-50"
            >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                    <Lock size={32} />
                </div>
                <h3 className="text-xl font-black text-white/40 uppercase tracking-tighter mb-2">{bossFight.title}</h3>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Completa las 14 cards para desbloquear</p>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-16 flex flex-col items-center"
        >
            <div className="relative group">
                {status === 'available' && (
                    <div className="absolute inset-0 bg-primary/20 rounded-[50px] blur-2xl animate-pulse group-hover:bg-primary/40 transition-all" />
                )}
                
                <button
                    onClick={onOpen}
                    className={`
                        relative w-full md:w-[500px] p-10 rounded-[40px] border-2 flex flex-col items-center justify-center text-center transition-all active:scale-95
                        ${status === 'completed' 
                            ? 'bg-primary/10 border-primary/40 shadow-xl shadow-primary/5' 
                            : 'bg-card border-primary hover:border-white shadow-2xl shadow-primary/20 cursor-pointer'}
                    `}
                >
                    <div className={`
                        w-24 h-24 rounded-3xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500
                        ${status === 'completed' ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}
                    `}>
                        {status === 'completed' ? <CheckCircle size={48} /> : <Swords size={48} />}
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Módulo 1.1 Completo</span>
                            <div className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-black">+{bossFight.xp} XP</div>
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{bossFight.title}</h3>
                        <p className="text-xs text-white/40 font-medium max-w-[300px] mx-auto leading-relaxed">
                            {status === 'completed' 
                                ? '¡Desafío sistémico conquistado!' 
                                : 'Pon a prueba todo lo aprendido en un desafío final transdisciplinar.'}
                        </p>
                    </div>

                    {status === 'available' && (
                        <div className="mt-8 px-6 py-2 bg-primary rounded-full text-[10px] font-black uppercase tracking-widest text-white animate-bounce">
                            Iniciar Combate
                        </div>
                    )}
                </button>
            </div>
        </motion.div>
    );
};
