import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import {
    Eye, Scale, Timer, ChevronRight,
    Sparkles, Target, Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { DailyQuestBanner } from './DailyQuestBanner';

export const MissionsPanel: React.FC = () => {
    const {
        activeShadowQuest, openShadowQuestModal,
        activeMirrorMatch, openMirrorMatchModal,
        activeTimeAttack, checkTimeAttack, completedCardIds
    } = useGameStore();

    const hasMissions = completedCardIds.length >= 2;

    const missionCards = [
        {
            id: 'shadow',
            title: 'Shadow Quest',
            subtitle: 'Observacion en el Mundo Real',
            description: activeShadowQuest
                ? `Mision activa: "${activeShadowQuest.mission.substring(0, 60)}..."`
                : 'Se genera automaticamente cada 5 cards completadas.',
            icon: <Eye size={24} />,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            active: !!activeShadowQuest,
            action: openShadowQuestModal,
            label: activeShadowQuest ? 'Reportar Hallazgos' : 'Pendiente de Generacion',
            xp: 30
        },
        {
            id: 'mirror',
            title: 'Mirror Match',
            subtitle: 'Debate Adversarial',
            description: activeMirrorMatch
                ? `Desafio activo: "${activeMirrorMatch.challenge.substring(0, 60)}..."`
                : 'Se activa al completar cards con alto potencial de debate.',
            icon: <Scale size={24} />,
            color: 'text-amber-400',
            bgColor: 'bg-amber-400/10',
            active: !!activeMirrorMatch,
            action: openMirrorMatchModal,
            label: activeMirrorMatch ? 'Iniciar Debate' : 'Esperando Desafio',
            xp: 40
        },
        {
            id: 'timeattack',
            title: 'Time Attack',
            subtitle: 'Velocidad de Respuesta',
            description: activeTimeAttack
                ? `Desafio activo: "${activeTimeAttack.question.substring(0, 60)}..."`
                : 'Genera un desafio rapido con una de tus cards completadas.',
            icon: <Timer size={24} />,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-400/10',
            active: true,
            action: () => { void checkTimeAttack(true); },
            label: activeTimeAttack ? 'Continuar Reto' : 'Iniciar Entrenamiento',
            xp: 20
        }
    ];

    if (!hasMissions) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-white/20 mb-6">
                    <Target size={40} />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Misiones Bloqueadas</h2>
                <p className="text-white/40 max-w-sm text-sm font-medium">
                    Completa al menos 2 cards para empezar a recibir misiones y desafios especiales.
                </p>
            </div>
        );
    }

    return (
        <div className="pb-32 pt-10 px-4 max-w-4xl mx-auto custom-scrollbar overflow-y-auto max-h-screen">
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <Target className="text-primary" size={24} />
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Centro de Misiones</h1>
                </div>
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Desafios Especiales de Integracion</p>
            </header>

            <DailyQuestBanner />

            <div className="space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Desafios Disponibles</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {missionCards.map((mission, i) => (
                        <motion.div
                            key={mission.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`
                                relative group overflow-hidden rounded-[32px] border transition-all duration-300 p-8 flex flex-col justify-between min-h-[280px]
                                ${mission.active
                                    ? 'bg-[#1a1f2e] border-white/5 hover:border-white/10 shadow-xl'
                                    : 'bg-white/[0.02] border-white/5 opacity-60'}
                            `}
                        >
                            <div>
                                <div className={`w-14 h-14 ${mission.bgColor} ${mission.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    {mission.icon}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight">{mission.title}</h3>
                                        {mission.active && (
                                            <div className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                                <Sparkles size={10} />
                                                +{mission.xp} XP
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">{mission.subtitle}</p>
                                    <p className="text-sm text-white/40 leading-relaxed pt-2">
                                        {mission.description}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={mission.action}
                                disabled={!mission.active}
                                className={`
                                    mt-8 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95
                                    ${mission.active
                                        ? 'bg-white text-black hover:bg-primary hover:text-white'
                                        : 'bg-white/5 text-white/10 cursor-not-allowed'}
                                `}
                            >
                                {mission.label}
                                <ChevronRight size={14} />
                            </button>
                        </motion.div>
                    ))}

                    <div className="rounded-[32px] border border-dashed border-white/5 flex flex-col items-center justify-center p-8 min-h-[280px]">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/10 mb-4">
                            <Zap size={20} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/10">Nuevos Desafios Proximamente</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
