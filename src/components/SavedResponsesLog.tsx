import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpenText, ChevronDown, Clock3, FileText, X } from 'lucide-react';
import { useGameStore } from '../stores/useGameStore';
import { buildSavedResponseEntries } from '../utils/savedResponses';
import { ResponseStatusBadge } from './ResponseStatusBadge';
import type { SavedResponseEntry } from '../types';

const KIND_LABELS: Record<SavedResponseEntry['kind'], string> = {
    card: 'Active Recall',
    bossFight: 'Boss Fight',
    dailyQuest: 'Misión diaria',
    timeAttack: 'Relámpago',
    shadowQuest: 'Observación',
    mirrorMatch: 'Mirror Match'
};

const formatResponseTimestamp = (timestamp: number) =>
    new Intl.DateTimeFormat('es-CO', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(timestamp));

export const SavedResponsesLog: React.FC = () => {
    const {
        progress,
        responseDrafts
    } = useGameStore();

    const {
        completedCardIds,
        completedBossFights,
        dailyQuest,
        questHistory,
        timeAttackHistory = [],
        shadowQuestHistory = [],
        mirrorMatchHistory = []
    } = progress;

    const [isExpanded, setIsExpanded] = React.useState(true);
    const [selectedEntry, setSelectedEntry] = React.useState<SavedResponseEntry | null>(null);

    const entries = React.useMemo(
        () => buildSavedResponseEntries({
            responseDrafts,
            completedCardIds,
            completedBossFights,
            dailyQuest,
            questHistory,
            timeAttackHistory,
            shadowQuestHistory,
            mirrorMatchHistory
        }),
        [responseDrafts, completedCardIds, completedBossFights, dailyQuest, questHistory, timeAttackHistory, shadowQuestHistory, mirrorMatchHistory]
    );

    return (
        <>
            <section className="rounded-[32px] border border-white/10 bg-card/40 backdrop-blur-sm overflow-hidden">
                <button
                    type="button"
                    onClick={() => setIsExpanded((value) => !value)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-lg shadow-primary/10">
                            <BookOpenText size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">Bitacora de respuestas</h3>
                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
                                {entries.length > 0
                                    ? `${entries.length} respuesta${entries.length === 1 ? '' : 's'} guardada${entries.length === 1 ? '' : 's'}`
                                    : 'Tus respuestas apareceran aqui en cuanto empieces a escribir'}
                            </p>
                        </div>
                    </div>
                    <motion.div animate={{ rotate: isExpanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={18} className="text-white/40" />
                    </motion.div>
                </button>

                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/5"
                        >
                            {entries.length === 0 ? (
                                <div className="px-6 pb-6">
                                    <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 text-white/30 flex items-center justify-center mx-auto mb-4">
                                            <FileText size={24} />
                                        </div>
                                        <p className="text-white/70 font-bold mb-2">Aun no hay respuestas visibles</p>
                                        <p className="text-sm text-white/40 max-w-xl mx-auto">
                                            Cuando escribas en una card, un boss fight o la mision diaria, aqui vas a poder ver si quedo como borrador o respuesta final.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="px-4 pb-4 md:px-6 md:pb-6 space-y-3">
                                    {entries.map((entry) => (
                                        <button
                                            key={entry.id}
                                            type="button"
                                            onClick={() => setSelectedEntry(entry)}
                                            className="w-full rounded-[26px] border border-white/10 bg-black/20 p-5 text-left hover:border-primary/30 hover:bg-primary/5 transition-all"
                                        >
                                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/70">
                                                            {KIND_LABELS[entry.kind]}
                                                        </span>
                                                        <ResponseStatusBadge status={entry.status} compact />
                                                    </div>
                                                    <h4 className="text-white font-black text-lg leading-tight mb-2">{entry.title}</h4>
                                                    <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{entry.content}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] text-white/35 font-bold uppercase tracking-widest shrink-0">
                                                    <Clock3 size={12} />
                                                    {formatResponseTimestamp(entry.updatedAt)}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <AnimatePresence>
                {selectedEntry && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[220] bg-black/70 backdrop-blur-md"
                            onClick={() => setSelectedEntry(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 24 }}
                            className="fixed inset-x-4 top-[10vh] z-[221] mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-card shadow-2xl"
                        >
                            <div className="flex items-start justify-between gap-4 border-b border-white/5 p-6">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/70">
                                            {KIND_LABELS[selectedEntry.kind]}
                                        </span>
                                        <ResponseStatusBadge status={selectedEntry.status} compact />
                                    </div>
                                    <h4 className="text-2xl font-black text-white leading-tight">{selectedEntry.title}</h4>
                                    <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/35">
                                        {formatResponseTimestamp(selectedEntry.updatedAt)}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedEntry(null)}
                                    className="p-2 rounded-full text-white/40 hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto p-6 custom-scrollbar">
                                <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                                    <p className="whitespace-pre-wrap text-white/80 leading-relaxed">{selectedEntry.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
