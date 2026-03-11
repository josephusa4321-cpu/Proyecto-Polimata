import React from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../stores/useGameStore';
import { ACHIEVEMENTS } from '../data/achievements';
import type { ShadowQuest, TeachingTaxEntry, MirrorMatch } from '../types';
import {
    GraduationCap,
    History,
    Eye,
    MapPin,
    Trophy,
    Star,
    Target,
    Shield,
    Zap,
    Swords,
    Flame,
    ScrollText,
    Timer,
    Info,
    CheckCircle,
    FlipHorizontal,
    Scale
} from 'lucide-react';

export const AchievementsPanel: React.FC = () => {
    const { unlockedAchievements, taxesPaid, shadowQuestHistory, mirrorMatchHistory } = useGameStore();

    const isUnlocked = (id: string) => unlockedAchievements.some(u => u.achievementId === id);
    const getUnlockDate = (id: string) => {
        const ach = unlockedAchievements.find(u => u.achievementId === id);
        return ach ? ach.unlockedAt : null;
    };

    return (
        <main className="max-w-5xl mx-auto p-4 pt-24 pb-32">
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                        <Trophy size={20} />
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Sala de Trofeos</h1>
                </div>
                <p className="text-white/40 font-medium ml-14">Documenta tu evolución hacia la maestría polímata.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map((ach) => {
                    const unlocked = isUnlocked(ach.id);
                    // We use the string matching for dynamic icons if we must, but here we can just map them or use a fallback
                    // Since we can't easily map strings to components without an object, let's use a helper or the Trophy fallback
                    const iconMap: Record<string, any> = {
                        Trophy, Star, Target, Shield, Zap, Swords, Flame, ScrollText, Timer, GraduationCap, Eye, MapPin, Scale, FlipHorizontal
                    };
                    const IconComponent = iconMap[ach.icon] || Trophy;
                    const date = getUnlockDate(ach.id);

                    return (
                        <motion.div
                            key={ach.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`
                                p-6 rounded-[32px] border-2 transition-all relative overflow-hidden group
                                ${unlocked 
                                    ? 'bg-[#1a1f2e] border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]' 
                                    : 'bg-white/[0.02] border-white/5 opacity-60 grayscale'}
                            `}
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`
                                        w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg
                                        ${unlocked ? 'bg-primary text-white' : 'bg-white/5 text-white/20'}
                                    `}>
                                        <IconComponent size={24} />
                                    </div>
                                    {unlocked && date && (
                                        <div className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-lg">
                                            {new Date(date).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1 mb-6">
                                    <h3 className={`text-sm font-black uppercase tracking-tight ${unlocked ? 'text-white' : 'text-white/40'}`}>
                                        {ach.title}
                                    </h3>
                                    <p className={`text-[11px] leading-tight ${unlocked ? 'text-white/60' : 'text-white/20'}`}>
                                        {ach.description}
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <Info size={10} className={unlocked ? 'text-primary' : 'text-white/10'} />
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${unlocked ? 'text-white/60' : 'text-white/20'}`}>
                                            {ach.condition}
                                        </span>
                                    </div>
                                    {unlocked && (
                                        <div className="flex items-center gap-1">
                                            <Zap size={8} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-[10px] font-black text-yellow-500">+{ach.xpBonus}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {unlocked && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute top-2 right-2"
                                >
                                    <CheckCircle size={12} className="text-primary" />
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Teaching Tax History */}
            <div className="mt-16 bg-[#1a1f2e] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full translate-y-[-50%] translate-x-[50%]" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <History size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Historial de Maestría</h2>
                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Tributos y Aprendizaje</p>
                        </div>
                    </div>

                    {taxesPaid.length === 0 ? (
                        <div className="py-12 flex flex-col items-center text-center opacity-30">
                            <GraduationCap size={48} className="mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest">Nadie ha pagado impuestos todavía.</p>
                            <p className="text-xs text-white/60">Sigue aprendiendo para desbloquear este hito.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {taxesPaid.map((tax: TeachingTaxEntry, idx: number) => (
                                <div key={idx} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-primary/20 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Zap size={12} className="text-primary" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Impuesto Pagado</span>
                                            </div>
                                            <h3 className="text-lg font-black text-white uppercase tracking-tight">{tax.cardId}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">
                                                {new Date(tax.completedAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-[10px] font-bold text-primary italic uppercase">{tax.wordCount} palabras</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/50 leading-relaxed font-medium bg-black/20 p-4 rounded-2xl border border-white/5">
                                        {tax.explanation}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Shadow Quest History */}
            <div className="mt-8 bg-[#1a1f2e] border border-primary/10 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <Eye size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Diario de Observación</h2>
                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Misiones de Campo Completadas</p>
                        </div>
                    </div>

                    {shadowQuestHistory.length === 0 ? (
                        <div className="py-12 flex flex-col items-center text-center opacity-30">
                            <MapPin size={48} className="mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest">Tu diario de campo está vacío.</p>
                            <p className="text-xs text-white/60">Completa cards para activar misiones de observación en el mundo real.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {shadowQuestHistory.map((quest: ShadowQuest) => (
                                <div key={quest.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-primary/20 transition-all group relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <MapPin size={12} className="text-primary" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Hallazgo Confirmado</span>
                                            </div>
                                            <h3 className="text-base font-black text-white uppercase tracking-tight truncate leading-tight">{quest.cardTitle}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">
                                                {new Date(quest.completedAt || 0).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-2 italic leading-none">Misión:</p>
                                            <p className="text-xs text-white/60 leading-relaxed italic line-clamp-2">"{quest.mission}"</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em] mb-2 leading-none">Observación:</p>
                                            <p className="text-sm text-white/80 leading-relaxed font-medium">
                                                {quest.userObservation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Mirror Match History */}
            <div className="mt-8 bg-[#1a1f2e] border border-red-500/10 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center text-red-400 shadow-inner">
                            <FlipHorizontal size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Diario de Debates</h2>
                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Mirror Matches Completados</p>
                        </div>
                    </div>

                    {mirrorMatchHistory.length === 0 ? (
                        <div className="py-12 flex flex-col items-center text-center opacity-30">
                            <Scale size={48} className="mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest">Tu diario de debates está vacío.</p>
                            <p className="text-xs text-white/60">Completa 8 cards para activar tu primer Mirror Match.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mirrorMatchHistory.map((match: MirrorMatch) => (
                                <div key={match.id} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-red-500/20 transition-all group relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <FlipHorizontal size={12} className="text-red-400" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Argumento Presentado</span>
                                            </div>
                                            <h3 className="text-base font-black text-white uppercase tracking-tight truncate leading-tight">{match.cardTitle}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">
                                                {new Date(match.completedAt || 0).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-2 italic leading-none">Desafío:</p>
                                            <p className="text-xs text-white/60 leading-relaxed italic line-clamp-2">"{match.challenge}"</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-red-400/60 uppercase tracking-[0.2em] mb-2 leading-none">Tu Argumento:</p>
                                            <p className="text-sm text-white/80 leading-relaxed font-medium line-clamp-4">
                                                {match.userArgument}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
