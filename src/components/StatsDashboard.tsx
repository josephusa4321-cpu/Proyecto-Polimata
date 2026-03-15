import React, { useMemo } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { 
    Zap, BookOpen, Flame, Calendar, BarChart3, 
    GraduationCap, Scroll, Eye, Scale, Timer, 
    Shield, GitBranch, ArrowUpRight, Hammer, Swords
} from 'lucide-react';
import { motion } from 'motion/react';
import { LEVELS } from '../data/levels';
import { ALL_CARDS } from '../data/all-modules';

export const StatsDashboard: React.FC = () => {
    const { 
        xp, completedCardIds, completedBossFights, 
        streakDays, maxStreakDays, studyLog,
        taxesPaid, activatedCombos,
        getCurrentLevel, progress
    } = useGameStore();

    const questHistory = progress?.questHistory || [];
    const shadowQuestHistory = progress?.shadowQuestHistory || [];
    const mirrorMatchHistory = progress?.mirrorMatchHistory || [];
    const timeAttackHistory = progress?.timeAttackHistory || [];
    const debuffHistory = progress?.debuffHistory || [];

    const currentLevel = getCurrentLevel();
    const nextLevel = LEVELS.find(l => l.level === currentLevel + 1);
    const prevLevel = LEVELS.find(l => l.level === currentLevel);
    
    const xpProgress = useMemo(() => {
        if (!nextLevel || !prevLevel) return 100;
        const range = nextLevel.minXP - prevLevel.minXP;
        const currentTotal = xp - prevLevel.minXP;
        return Math.min(100, Math.max(0, (currentTotal / range) * 100));
    }, [xp, nextLevel, prevLevel]);

    const daysSinceStart = useMemo(() => {
        if (studyLog.length === 0) return 0;
        const sorted = [...studyLog].sort();
        const start = new Date(sorted[0]);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }, [studyLog]);

    const stats = [
        { label: 'Cards Completadas', value: `${completedCardIds.length}`, total: `${ALL_CARDS.length}`, icon: <BookOpen className="text-blue-400" />, color: 'bg-blue-400/10' },
        { label: 'Tool Cards', value: completedCardIds.filter(id => id.includes('.T')).length || '3', total: `${ALL_CARDS.filter(c => c.isTool).length}`, icon: <Hammer className="text-orange-400" />, color: 'bg-orange-400/10' },
        { label: 'Boss Fights', value: `${completedBossFights.length}`, total: '22', icon: <Swords className="text-red-400" />, color: 'bg-red-400/10' },
        { label: 'Taxes Pagados', value: `${taxesPaid.length}`, icon: <GraduationCap className="text-purple-400" />, color: 'bg-purple-400/10' },
        { label: 'Daily Quests', value: `${questHistory.length}`, icon: <Scroll className="text-emerald-400" />, color: 'bg-emerald-400/10' },
        { label: 'Shadow Quests', value: `${shadowQuestHistory.length}`, icon: <Eye className="text-indigo-400" />, color: 'bg-indigo-400/10' },
        { label: 'Mirror Matches', value: `${mirrorMatchHistory.length}`, icon: <Scale className="text-amber-400" />, color: 'bg-amber-400/10' },
        { label: 'Time Attacks', value: `${timeAttackHistory.length}`, icon: <Timer className="text-cyan-400" />, color: 'bg-cyan-400/10' },
        { label: 'Sesgos Reportados', value: `${debuffHistory.length}`, icon: <Shield className="text-rose-400" />, color: 'bg-rose-400/10' },
        { label: 'Combos Activados', value: `${activatedCombos.length}`, icon: <GitBranch className="text-primary" />, color: 'bg-primary/10' },
    ];

    const avgTimeAttack = useMemo(() => {
        if (timeAttackHistory.length === 0) return '0s';
        const total = timeAttackHistory.reduce((acc, curr) => acc + (curr.timeUsed || 0), 0);
        return `${(total / timeAttackHistory.length).toFixed(1)}s`;
    }, [timeAttackHistory]);

    // Simple weekly activity simulation for the chart
    const activityData = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return date.toISOString().split('T')[0];
        });

        return last7Days.map(date => ({
            date,
            count: studyLog.includes(date) ? 1 : 0
        }));
    }, [studyLog]);

    return (
        <div className="pb-32 pt-10 px-4 max-w-7xl mx-auto custom-scrollbar overflow-y-auto max-h-screen">
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <BarChart3 className="text-primary" size={24} />
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Dashboard Central</h1>
                </div>
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Métricas de Evolución Polimática</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Level Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-[#1a1f2e] border border-white/5 rounded-[40px] p-8 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Nivel Actual</span>
                                <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase">Lvl {currentLevel}</div>
                            </div>
                            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-2">{prevLevel?.title}</h2>
                            <p className="text-white/30 text-xs font-medium max-w-md">Has recorrido {daysSinceStart} días de expansión mental desde que iniciaste tu viaje.</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">XP Totales</span>
                                <span className="text-3xl font-black text-white">{xp.toLocaleString()}</span>
                            </div>
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 text-primary">
                                <Zap size={32} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Progreso hacia nivel {currentLevel + 1}</span>
                            <span className="text-[10px] font-black text-primary">{Math.round(xpProgress)}%</span>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${xpProgress}%` }}
                                className="h-full bg-gradient-to-r from-primary via-blue-500 to-primary-foreground rounded-full shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-black text-white/20 uppercase tracking-widest">
                            <span>{prevLevel?.minXP} XP</span>
                            <span>{nextLevel?.minXP || 'MAX'} XP</span>
                        </div>
                    </div>
                </motion.div>

                {/* Streak Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-[40px] p-8 flex flex-col justify-between"
                >
                    <div className="flex justify-between items-start">
                        <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                            <Flame size={28} />
                        </div>
                        <div className="text-right">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-orange-400/40 mb-1">Max Histórico</span>
                            <span className="text-2xl font-black text-white">{maxStreakDays}d</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-5xl font-black text-white mb-2">{streakDays}d</h3>
                        <p className="text-orange-400 font-black uppercase tracking-widest text-[10px]">Racha Actual de Estudio</p>
                    </div>
                    <div className="pt-4 border-t border-orange-500/10 mt-6">
                        <div className="flex gap-2">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`flex-1 h-8 rounded-lg border border-white/5 ${i < (streakDays % 7 || (streakDays > 0 ? 7 : 0)) ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-white/5'}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-[#1a1f2e] border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group"
                    >
                        <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-tight text-white/30 block leading-tight">
                                {stat.label}
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-white">{stat.value}</span>
                                {stat.total && <span className="text-[10px] font-bold text-white/10">/ {stat.total}</span>}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Chart (CSS Pure) */}
                <div className="bg-[#1a1f2e] border border-white/5 rounded-[40px] p-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-10 flex items-center gap-3">
                        <Calendar size={14} /> Actividad última semana
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-4 px-4">
                        {activityData.map((day, i) => (
                            <div key={day.date} className="flex-1 flex flex-col items-center gap-4">
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: day.count ? '100%' : '10%' }}
                                    className={`w-full rounded-t-xl transition-all duration-500 ${day.count ? 'bg-gradient-to-t from-primary to-blue-500 shadow-[0_0_20px_rgba(var(--primary),0.2)]' : 'bg-white/5'}`}
                                />
                                <span className="text-[8px] font-black text-white/20">D{i+1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Metrics */}
                <div className="bg-[#1a1f2e] border border-white/5 rounded-[40px] p-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-10 flex items-center gap-3">
                        <ArrowUpRight size={14} /> Rendimiento de desafíos
                    </h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <Timer className="text-cyan-400" size={18} />
                                <span className="text-xs font-bold text-white/70">Promedio Time Attack</span>
                            </div>
                            <span className="text-xl font-black text-white">{avgTimeAttack}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <Shield className="text-rose-400" size={18} />
                                <span className="text-xs font-bold text-white/70">Sesgos Auto-reportados</span>
                            </div>
                            <span className="text-xl font-black text-white">{debuffHistory.length}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <GitBranch className="text-primary" size={18} />
                                <span className="text-xs font-bold text-white/70">Combos Cross-Pillar</span>
                            </div>
                            <span className="text-xl font-black text-white">{activatedCombos.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
