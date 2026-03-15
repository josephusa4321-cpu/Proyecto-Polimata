import React, { useState, useEffect } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Scroll, Sparkles, ChevronRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { DailyQuestPanel } from './DailyQuestPanel';
import { ResponseStatusBadge } from './ResponseStatusBadge';
import { getResponseDraftText } from '../utils/savedResponses';

export const DailyQuestBanner: React.FC = () => {
    const { progress, checkDailyQuest, completedCardIds, responseDrafts } = useGameStore();
    const { dailyQuest } = progress;
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        // Only check if we have enough cards
        if (completedCardIds.length >= 2) {
            checkDailyQuest();
        }
    }, [completedCardIds.length, checkDailyQuest]);

    if (!dailyQuest || completedCardIds.length < 2) return null;

    const isCompleted = dailyQuest.completed;
    const draftKey = `daily-quest:${dailyQuest.id}`;
    const savedDraft = getResponseDraftText(responseDrafts[draftKey]);
    const responseStatus = dailyQuest.userAnswer?.trim()
        ? 'completed'
        : savedDraft
            ? 'draft'
            : null;

    return (
        <div className="mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                    relative group overflow-hidden rounded-[32px] border transition-all duration-500
                    ${isCompleted 
                        ? 'bg-green-500/5 border-green-500/20' 
                        : 'bg-primary/5 border-primary/20 hover:border-primary/40 shadow-xl shadow-primary/5'}
                `}
            >
                {/* Decorative background effects */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 rounded-full -translate-y-1/2 translate-x-1/2 ${isCompleted ? 'bg-green-500' : 'bg-primary'}`} />

                <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110
                            ${isCompleted ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-primary/20'}
                        `}>
                            {isCompleted ? <CheckCircle size={28} /> : <Scroll size={28} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isCompleted ? 'text-green-500' : 'text-primary'}`}>
                                    {isCompleted ? 'Misión Diaria Cumplida' : 'Misión del Día'}
                                </span>
                                {responseStatus && <ResponseStatusBadge status={responseStatus} compact />}
                                {!isCompleted && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest">
                                        <Sparkles size={10} />
                                        +25 XP
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">
                                {isCompleted 
                                    ? 'Sabiduría Sincronizada' 
                                    : 'Conecta tu Red Mental'}
                            </h3>
                            <p className="text-sm text-white/40 font-medium">
                                {isCompleted 
                                    ? 'Has reforzado las conexiones de hoy. Vuelve mañana para un nuevo desafío.' 
                                    : 'Responde una pregunta crítica para cruzar tus modelos mentales.'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsPanelOpen(true)}
                        className={`
                            px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all active:scale-95
                            ${isCompleted 
                                ? 'bg-white/5 text-white/40 hover:bg-white/10' 
                                : 'bg-primary text-white hover:bg-white hover:text-primary shadow-lg shadow-primary/20'}
                        `}
                    >
                        {isCompleted ? 'Ver Respuesta' : 'Comenzar Misión'}
                        <ChevronRight size={14} />
                    </button>
                </div>
            </motion.div>

            <DailyQuestPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
        </div>
    );
};
