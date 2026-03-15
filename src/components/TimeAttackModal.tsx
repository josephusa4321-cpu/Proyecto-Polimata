import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../stores/useGameStore';
import { Zap, Timer, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const TimeAttackModal: React.FC = () => {
    const { 
        progress: storeProgress,
        timeAttackModalOpen, 
        closeTimeAttackModal, 
        completeTimeAttack 
    } = useGameStore();
    const { activeTimeAttack } = storeProgress;

    const [answer, setAnswer] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [isFinishing, setIsFinishing] = useState(false);
    const timerRef = useRef<any>(null);

    // Reset when modal opens
    useEffect(() => {
        if (timeAttackModalOpen && activeTimeAttack) {
            setSecondsLeft(activeTimeAttack.timeLimit);
            setAnswer('');
            setIsFinishing(false);

            timerRef.current = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timeAttackModalOpen, activeTimeAttack]);

    const handleSubmit = () => {
        if (!activeTimeAttack || !answer.trim() || secondsLeft === 0) return;
        
        setIsFinishing(true);
        const timeUsed = activeTimeAttack.timeLimit - secondsLeft;
        
        // Delay a bit to show success state before closing
        setTimeout(() => {
            completeTimeAttack(answer, timeUsed);
        }, 500);
    };

    if (!activeTimeAttack) return null;

    const progress = activeTimeAttack ? (secondsLeft / activeTimeAttack.timeLimit) * 100 : 0;
    const colorClass = secondsLeft > 30 ? 'text-green-400' : secondsLeft > 15 ? 'text-yellow-400' : 'text-red-500';
    const strokeColor = secondsLeft > 30 ? '#4ade80' : secondsLeft > 15 ? '#facc15' : '#ef4444';

    return (
        <AnimatePresence>
            {timeAttackModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#0a0e17]/95 backdrop-blur-xl"
                        onClick={secondsLeft === 0 ? closeTimeAttackModal : undefined}
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-[#1a1f2e] border-2 border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
                    >
                        {/* Header with Urgency Timer */}
                        <div className="p-8 text-center relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                <motion.div 
                                    className={`h-full ${secondsLeft > 15 ? 'bg-primary' : 'bg-red-500'}`}
                                    initial={{ width: '100%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "linear" }}
                                />
                            </div>

                            <div className="relative inline-block mb-6">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-white/5"
                                    />
                                    <motion.circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        stroke={strokeColor}
                                        strokeWidth="8"
                                        strokeDasharray="364.4"
                                        strokeDashoffset={364.4 - (364.4 * progress) / 100}
                                        fill="transparent"
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-linear"
                                    />
                                </svg>
                                <div className={`absolute inset-0 flex flex-col items-center justify-center font-black ${colorClass}`}>
                                    <span className="text-4xl leading-none">{secondsLeft}</span>
                                    <span className="text-[10px] uppercase tracking-widest mt-1 opacity-60">Seg</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Zap size={16} className="text-primary fill-primary" />
                                <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Relámpago Mental</span>
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight px-4">
                                {activeTimeAttack.question}
                            </h2>
                        </div>

                        {/* Input Area */}
                        <div className="px-8 pb-8 space-y-6">
                            {secondsLeft > 0 ? (
                                <>
                                    <div className="relative group">
                                        <textarea
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            placeholder="Escribe tu respuesta rápida aquí..."
                                            className="w-full bg-black/40 border-2 border-white/5 rounded-3xl p-5 text-white placeholder:text-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none h-40 font-medium text-lg"
                                            autoFocus
                                        />
                                        <div className="absolute top-4 right-4 text-white/10 group-focus-within:text-primary/30 transition-colors">
                                            <Timer size={20} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={!answer.trim() || isFinishing}
                                        className={`
                                            w-full py-5 rounded-[24px] font-black text-lg uppercase tracking-tighter transition-all disabled:opacity-30 flex items-center justify-center gap-3
                                            ${isFinishing ? 'bg-green-500 text-white' : 'bg-primary text-white hover:scale-[1.02] shadow-xl shadow-primary/20'}
                                        `}
                                    >
                                        {isFinishing ? (
                                            <>
                                                <CheckCircle2 size={24} />
                                                Respuesta Enviada
                                            </>
                                        ) : (
                                            <>
                                                ¡Responder Ahora!
                                                <Zap size={20} className="fill-current" />
                                            </>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-10 space-y-6"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="p-4 bg-red-500/10 rounded-full text-red-500">
                                            <Clock size={48} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-red-500 uppercase tracking-tighter">¡Se acabó el tiempo!</h3>
                                            <p className="text-sm text-white/40 font-medium max-w-[280px] mx-auto mt-2">
                                                No te preocupes, la velocidad viene con la práctica. Inténtalo de nuevo en la siguiente misión.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeTimeAttackModal}
                                        className="w-full py-5 rounded-[24px] bg-white/5 text-white/60 font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
                                    >
                                        Seguir Entrenando
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Status Footer */}
                        <div className="bg-black/20 px-8 py-4 flex items-center justify-between border-t border-white/5 text-[10px] font-black uppercase tracking-widest">
                            <div className="flex items-center gap-2 text-white/20">
                                <AlertCircle size={12} />
                                <span>Respuesta rápida obligatoria</span>
                            </div>
                            <div className="flex items-center gap-1 text-primary">
                                <Zap size={10} className="fill-primary" />
                                <span>Recompensa: 20-30 XP</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
