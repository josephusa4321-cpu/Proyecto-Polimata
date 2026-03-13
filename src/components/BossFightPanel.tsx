import React, { useState } from 'react';
import { X, Swords, ShieldCheck, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../stores/useGameStore';
import type { BossFight } from '../types';

interface Props {
    bossFight: BossFight;
    isOpen: boolean;
    onClose: () => void;
}

export const BossFightPanel: React.FC<Props> = ({ bossFight, isOpen, onClose }) => {
    const { completeBossFight, completedBossFights, responseDrafts, setResponseDraft } = useGameStore();
    const [response, setResponse] = useState('');
    const [isHonest, setIsHonest] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const responseKey = `boss-fight:${bossFight.id}`;
    const savedResponse = responseDrafts[responseKey] ?? '';
    const isCompleted = completedBossFights.includes(bossFight.id);

    React.useEffect(() => {
        if (!isOpen) return;
        setResponse(savedResponse);
        setIsHonest(false);
    }, [isOpen, savedResponse]);

    const handleComplete = () => {
        if (!isHonest || isCompleted) return;

        completeBossFight(bossFight.id, bossFight.xp);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            onClose();
        }, 3000);
    };

    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-background z-[300] flex flex-col items-center justify-center text-center p-6">
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="w-32 h-32 rounded-[40px] bg-primary flex items-center justify-center text-white mb-8 shadow-2xl shadow-primary/40"
                >
                    <Trophy size={64} />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black text-white uppercase tracking-tighter mb-4"
                >
                    Boss Conquistado
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold text-primary mb-2"
                >
                    +{bossFight.xp} XP
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/40 font-medium"
                >
                    Has demostrado maestria en Pensamiento Sistemico.
                </motion.p>
            </div>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[210]"
                    />
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[700px] bg-card border-l border-white/10 z-[211] shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="p-8 border-b border-white/5 bg-primary/5 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />

                            <div className="flex items-center gap-4 relative">
                                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <Swords size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Boss Fight</h3>
                                        <div className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-black">+{bossFight.xp} XP</div>
                                    </div>
                                    <p className="text-sm text-white/40 font-bold uppercase tracking-widest">{bossFight.title}</p>
                                </div>
                            </div>

                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/40 transition-colors relative">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl leading-relaxed">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">El Desafio</h4>
                                <p className="text-white/80 font-medium text-lg tracking-tight">
                                    {bossFight.description}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">
                                    {isCompleted ? 'Tu analisis guardado' : 'Tu Analisis de Sistemas'}
                                </label>
                                <textarea
                                    value={response}
                                    onChange={(e) => {
                                        const nextValue = e.target.value;
                                        setResponse(nextValue);
                                        setResponseDraft(responseKey, nextValue);
                                    }}
                                    placeholder="Mapea el sistema aqui... Define elementos, bucles, apalancamiento y arquetipos."
                                    className="w-full min-h-[300px] bg-black/40 border border-white/10 rounded-3xl p-6 text-white/80 outline-none focus:border-primary/50 transition-all resize-none font-sans leading-relaxed"
                                />
                            </div>

                            {!isCompleted && (
                                <div
                                    onClick={() => setIsHonest(!isHonest)}
                                    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                                        isHonest ? 'bg-primary/10 border-primary/40' : 'bg-white/5 border-transparent hover:border-white/10'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        isHonest ? 'bg-primary text-white' : 'bg-white/5 text-white/10'
                                    }`}>
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-white uppercase tracking-tight">Complete el desafio honestamente</p>
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none mt-1">
                                            Entiendo que mi progreso depende de mi integridad
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t border-white/5 bg-black/20">
                            <button
                                onClick={handleComplete}
                                disabled={!isHonest || isCompleted}
                                className={`w-full py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl ${
                                    isHonest && !isCompleted
                                        ? 'bg-primary hover:bg-white text-white hover:text-primary shadow-primary/20'
                                        : 'bg-white/5 text-white/20 cursor-not-allowed'
                                }`}
                            >
                                {isCompleted ? 'Boss Ya Conquistado' : 'Conquistar Boss'}
                            </button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
