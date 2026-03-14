import React, { useEffect, useMemo, useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { ALL_CARDS } from '../data/all-modules';
import { Calendar, CheckCircle, Clock, Brain, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getResponseDraftText } from '../utils/savedResponses';

const RETRY_LIMIT_PER_SESSION = 1;

const formatDueLabel = (timestamp: number) => {
    const deltaMs = timestamp - Date.now();

    if (deltaMs <= 0) {
        return 'Ahora';
    }

    const deltaMinutes = Math.round(deltaMs / (60 * 1000));

    if (deltaMinutes < 60) {
        return `En ${deltaMinutes} min`;
    }

    const deltaHours = Math.round(deltaMinutes / 60);
    if (deltaHours < 24) {
        return `En ${deltaHours} h`;
    }

    return new Date(timestamp).toLocaleDateString();
};

export const ReviewSession: React.FC = () => {
    const { reviews, saveReview, responseDrafts } = useGameStore();
    const [sessionQueue, setSessionQueue] = useState<string[]>([]);
    const [retryCounts, setRetryCounts] = useState<Record<string, number>>({});
    const [reviewedCount, setReviewedCount] = useState(0);
    const [rememberedCount, setRememberedCount] = useState(0);
    const [forgottenCount, setForgottenCount] = useState(0);

    const now = Date.now();
    const dueReviews = useMemo(
        () => reviews
            .filter((review) => review.nextReview <= now)
            .sort((left, right) => left.nextReview - right.nextReview),
        [reviews, now]
    );

    const cardsToReview = useMemo(() => dueReviews.map((review) => {
        const card = ALL_CARDS.find((candidate) => candidate.id === review.cardId);
        if (!card) {
            return null;
        }

        const savedRecall = getResponseDraftText(responseDrafts[`card-recall:${card.id}`]);

        return {
            ...card,
            review,
            savedRecall
        };
    }).filter((card): card is NonNullable<typeof card> => Boolean(card)), [dueReviews, responseDrafts]);

    useEffect(() => {
        if (cardsToReview.length > 0 && sessionQueue.length === 0) {
            setSessionQueue(cardsToReview.map((card) => card.id));
        }
    }, [cardsToReview, sessionQueue.length]);

    const reviewLookup = useMemo(
        () => new Map(cardsToReview.map((card) => [card.id, card])),
        [cardsToReview]
    );

    const currentCardId = sessionQueue[0] ?? null;
    const currentCard = currentCardId ? reviewLookup.get(currentCardId) ?? null : null;
    const nextDueTimestamp = reviews.length > 0
        ? reviews.reduce((soonest, review) => Math.min(soonest, review.nextReview), Number.POSITIVE_INFINITY)
        : null;
    const sessionTotal = reviewedCount + sessionQueue.length;

    const handleReviewAction = (cardId: string, success: boolean) => {
        saveReview(cardId, success);
        setReviewedCount((count) => count + 1);

        if (success) {
            setRememberedCount((count) => count + 1);
            setSessionQueue((queue) => queue.slice(1));
            return;
        }

        setForgottenCount((count) => count + 1);
        const nextRetryCount = (retryCounts[cardId] ?? 0) + 1;

        setRetryCounts((current) => ({
            ...current,
            [cardId]: nextRetryCount
        }));

        setSessionQueue((queue) => {
            const [, ...rest] = queue;
            if (nextRetryCount <= RETRY_LIMIT_PER_SESSION) {
                return [...rest, cardId];
            }
            return rest;
        });
    };

    const currentRetryCount = currentCardId ? retryCounts[currentCardId] ?? 0 : 0;

    return (
        <main className="pt-32 pb-24 px-4 max-w-5xl mx-auto">
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                        <Brain size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Repaso Espaciado</h2>
                </div>
                <p className="text-white/40 text-sm max-w-2xl">
                    Recupera el concepto, compáralo con tu explicación guardada y decide con honestidad si ya lo recuerdas o si necesita volver hoy.
                </p>
            </div>

            {currentCard ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">Sesion activa</p>
                            <p className="text-sm text-white/60 mt-2">
                                Card {reviewedCount + 1} de {sessionTotal} en esta ronda
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25">Pendientes</p>
                            <p className="text-2xl font-black text-white">{sessionQueue.length}</p>
                        </div>
                    </div>

                    <motion.div
                        key={currentCard.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-white/10 rounded-3xl overflow-hidden"
                    >
                        <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.03]">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                                    Nivel SRS {currentCard.review.level}
                                </span>
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                                    {currentCard.id}
                                </span>
                                {currentRetryCount > 0 && (
                                    <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">
                                        Reintento final
                                    </span>
                                )}
                            </div>

                            <h3 className="text-3xl font-black text-white mb-3">{currentCard.title}</h3>
                            <p className="text-white/50 text-base">{currentCard.subtitle}</p>

                            <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] text-white/35 font-bold uppercase tracking-widest">
                                <span className="inline-flex items-center gap-2">
                                    <Clock size={12} />
                                    Vencio {new Date(currentCard.review.nextReview).toLocaleDateString()}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <RotateCcw size={12} />
                                    Si marcas olvidado, vuelve hoy mismo
                                </span>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 space-y-5">
                            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 mb-3">
                                    Active Recall
                                </p>
                                <p className="text-white/80 leading-relaxed">
                                    Sin mirar apuntes, explica este concepto con tus palabras y piensa en un caso real donde lo usarías hoy.
                                </p>
                            </div>

                            {currentCard.savedRecall ? (
                                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/35 mb-3">
                                        Tu ultima respuesta guardada
                                    </p>
                                    <p className="text-sm text-white/75 leading-relaxed whitespace-pre-wrap">
                                        {currentCard.savedRecall}
                                    </p>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5">
                                    <p className="text-sm text-white/45">
                                        Esta card aun no tiene una respuesta guardada. Igual puedes usar el titulo y el subtitulo como disparador mental.
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleReviewAction(currentCard.id, false)}
                                    className="px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] text-red-300 border border-red-500/20 hover:bg-red-500/10 transition-all"
                                >
                                    Olvidado
                                    <span className="block mt-2 text-[10px] tracking-normal font-semibold text-red-200/60 normal-case">
                                        Lo repetimos mas tarde en esta misma sesion
                                    </span>
                                </button>
                                <button
                                    onClick={() => handleReviewAction(currentCard.id, true)}
                                    className="px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] bg-primary hover:bg-white text-white hover:text-primary transition-all shadow-lg shadow-primary/20"
                                >
                                    Recordado
                                    <span className="block mt-2 text-[10px] tracking-normal font-semibold text-white/70 normal-case">
                                        Sube de nivel y vuelve mas adelante
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                    <CheckCircle size={40} className="mx-auto mb-4 text-green-500/30" />
                    <p className="text-white/30 font-medium">Todo al dia</p>
                    <p className="text-white/20 text-xs mt-2">No tienes conceptos pendientes de repaso por ahora.</p>
                </div>
            )}

            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <Calendar size={20} className="text-primary mb-3" />
                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Total en repaso</h4>
                    <p className="text-2xl font-black text-white">{reviews.length}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <Brain size={20} className="text-primary mb-3" />
                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Pendientes</h4>
                    <p className="text-2xl font-black text-white">{sessionQueue.length}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <Sparkles size={20} className="text-green-400 mb-3" />
                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Recordadas hoy</h4>
                    <p className="text-2xl font-black text-white">{rememberedCount}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <CheckCircle size={20} className="text-green-500 mb-3" />
                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Proximo vencimiento</h4>
                    <p className="text-lg font-black text-white/70">
                        {nextDueTimestamp ? formatDueLabel(nextDueTimestamp) : 'Ninguno'}
                    </p>
                    {forgottenCount > 0 && (
                        <p className="text-xs text-white/35 mt-2">
                            Olvidadas hoy: {forgottenCount}
                        </p>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {reviewedCount > 0 && sessionQueue.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className="mt-8 rounded-2xl border border-green-500/15 bg-green-500/5 px-5 py-4 text-sm text-green-100"
                    >
                        Cerraste esta ronda de repaso. Recordaste {rememberedCount} conceptos y dejaste {forgottenCount} marcados para volver mas tarde.
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};
