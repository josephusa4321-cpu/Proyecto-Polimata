import React, { useState, useEffect } from 'react';
import type { ConceptCard as IConceptCard } from '../types';
import { useGameStore } from '../stores/useGameStore';
import { X, CheckCircle2, Key, Info, ClipboardPaste, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGemini } from '../hooks/useGemini';

interface Props {
    card: IConceptCard | null;
    isOpen: boolean;
    onClose: () => void;
}

export const StudyPanel: React.FC<Props> = ({ card, isOpen, onClose }) => {
    const { 
        completeCard, 
        completedCardIds, 
        saveReview, 
        getApiKey, 
        contentStore, 
        openContentEditor, 
        removeContent,
        isTaxDue,
        openTaxModal
    } = useGameStore();
    const { generateLesson, isLoading, error: aiError } = useGemini();

    const [content, setContent] = useState<string>("");
    const [recallResponse, setRecallResponse] = useState("");
    const [isHonest, setIsHonest] = useState(false);

    const isCompleted = card ? completedCardIds.includes(card.id) : false;
    const hasApiKey = !!getApiKey();
    const manualContent = card ? contentStore[card.id]?.markdown : null;

    useEffect(() => {
        if (isOpen && card) {
            // Reset state for new card
            setRecallResponse("");
            setIsHonest(false);

            // Prioridad: Manual > Gemini (si hay API Key) > Placeholder
            if (manualContent) {
                setContent(manualContent);
            } else if (hasApiKey) {
                generateLesson(card.title, card.subtitle, card.id).then(res => {
                    if (res) setContent(res);
                });
            } else {
                setContent(""); // Show placeholder
            }
        }
    }, [isOpen, card, manualContent, hasApiKey, generateLesson]);

    if (!card) return null;

    const handleComplete = () => {
        if (!isHonest && !isCompleted) return;
        completeCard(card.id, card.xp);
        saveReview(card.id, true); // Phase 2: First review success
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-card border-l border-white/10 z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex justify-between items-center border-b border-white/5 bg-card/50 backdrop-blur-md sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <Brain size={20} className="text-primary" />
                                <span className="text-xs font-black uppercase text-white/50 tracking-widest leading-none">Estudio Profundo</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/50 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {/* Title Section */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase">{card.type}</span>
                                    {card.isTool && <span className="text-[10px] font-bold bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full uppercase">Herramienta</span>}
                                </div>
                                <h2 className="text-4xl font-black text-white mb-2 leading-tight">{card.title}</h2>
                                <p className="text-lg text-white/40 leading-relaxed font-medium">{card.subtitle}</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-10">
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="block text-[9px] font-black uppercase text-white/30 mb-1">XP Recompensa</span>
                                    <span className="text-sm font-bold text-yellow-400">+{card.xp}</span>
                                </div>
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="block text-[9px] font-black uppercase text-white/30 mb-1">Identificador</span>
                                    <span className="text-sm font-bold text-primary">{card.id}</span>
                                </div>
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="block text-[9px] font-black uppercase text-white/30 mb-1">Estado</span>
                                    <span className={`text - sm font - bold ${isCompleted ? 'text-green-400' : 'text-primary'} `}>
                                        {isCompleted ? 'MAESTRÍA' : 'APRENDIZAJE'}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-strong:text-primary max-w-none min-h-[200px] relative">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                                        <div className="w-12 h-12 rounded-full border-t-2 border-primary border-r-2 animate-spin mb-6" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Sintetizando lección polímata...</p>
                                    </div>
                                ) : aiError && !hasApiKey ? (
                                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                                        <Key size={24} className="mx-auto mb-3 text-red-400" />
                                        <p className="text-sm text-red-200 mb-4">{aiError}</p>
                                        <p className="text-xs text-red-200/50">Debes configurar tu API Key de Google AI para generar lecciones dinámicas.</p>
                                    </div>
                                ) : content ? (
                                    <>
                                        {content && manualContent && !content.toLowerCase().includes(card.title.toLowerCase()) && (
                                            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3">
                                                <div className="p-1.5 bg-yellow-500/20 rounded-lg text-yellow-500">
                                                    <Info size={14} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] text-yellow-200/70 font-medium leading-tight">
                                                        El contenido cargado parece no coincidir con esta card.
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeContent(card.id)}
                                                    className="text-[10px] font-black uppercase text-yellow-500 hover:text-white transition-colors"
                                                >
                                                    Restaurar
                                                </button>
                                            </div>
                                        )}
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {content}
                                        </ReactMarkdown>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 px-6 bg-white/5 border border-white/5 rounded-3xl text-center">
                                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 ring-1 ring-primary/20">
                                            <ClipboardPaste size={32} />
                                        </div>
                                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-3">Sin Contenido</h4>
                                        <p className="text-sm text-white/40 mb-8 leading-relaxed max-w-[280px] mx-auto font-medium">
                                            Esta card aún no tiene contenido. Genera la lección con tu IA preferida usando el **Prompt Maestro** y pégala aquí.
                                        </p>
                                        <button
                                            onClick={() => openContentEditor(card)}
                                            className="px-8 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-primary transition-all shadow-lg shadow-primary/20"
                                        >
                                            Cargar Contenido
                                        </button>

                                        {!hasApiKey && (
                                            <p className="mt-6 text-[10px] text-white/20 uppercase font-black tracking-widest flex items-center gap-2">
                                                <Key size={10} /> O configura Gemini para auto-generar
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Active Recall Gate */}
                            {!isCompleted && !isLoading && content && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-2xl"
                                >
                                    <h3 className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-4">
                                        <Brain size={14} fill="currentColor" />
                                        Active Recall Gate
                                    </h3>
                                    <p className="text-sm text-white/70 mb-4">
                                        Antes de completar, recupera lo aprendido: ¿Cómo explicarías este concepto con tus propias palabras?
                                    </p>
                                    <textarea
                                        value={recallResponse}
                                        onChange={(e) => setRecallResponse(e.target.value)}
                                        placeholder="Escribe tu respuesta aquí..."
                                        className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-all resize-none mb-4"
                                    />
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={isHonest}
                                                onChange={(e) => setIsHonest(e.target.checked)}
                                                className="peer appearance-none w-5 h-5 rounded border border-white/20 checked:bg-primary checked:border-primary transition-all cursor-pointer"
                                            />
                                            <CheckCircle2 size={12} className="absolute left-1 opacity-0 peer-checked:opacity-100 text-white transition-opacity pointer-events-none" />
                                        </div>
                                        <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors font-medium">
                                            He respondido con honestidad y entiendo el concepto.
                                        </span>
                                    </label>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer Action */}
                        <div className="p-8 border-t border-white/5 bg-black/20">
                            {isTaxDue && !isCompleted && (
                                <button 
                                    onClick={openTaxModal}
                                    className="mb-4 w-full p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/20 transition-all"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    Paga tu Impuesto al Maestro 🎓
                                </button>
                            )}
                            <button
                                disabled={isCompleted || (!isHonest && !isCompleted) || !content || isTaxDue}
                                onClick={handleComplete}
                                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all
                  ${isCompleted
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default flex items-center justify-center gap-2'
                                        : (isHonest && content && !isTaxDue)
                                            ? 'bg-primary hover:bg-white text-white hover:text-primary shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-white/10'
                                            : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                                    }
`}
                            >
                                {isCompleted ? (
                                    <>
                                        <CheckCircle2 size={16} />
                                        Completada
                                    </>
                                ) : isTaxDue ? 'Bloqueado por Tributo' : 'Completar y Ganar XP'}
                            </button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
