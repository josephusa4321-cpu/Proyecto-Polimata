import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Eye, Edit3, ClipboardPaste, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../stores/useGameStore';
import type { ConceptCard } from '../types';
import { FormattedCardContent } from './FormattedCardContent';

interface Props {
    card: ConceptCard | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ContentEditor: React.FC<Props> = ({ card, isOpen, onClose }) => {
    const { addContent, removeContent, contentStore } = useGameStore();
    const [markdown, setMarkdown] = useState('');
    const [source, setSource] = useState('Claude');
    const [mode, setMode] = useState<'edit' | 'preview'>('edit');
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (isOpen && card) {
            const existing = contentStore[card.id];
            setMarkdown(existing?.markdown || '');
            setSource(existing?.source || 'Claude');
            setMode('edit');
            setIsSaved(false);
        }
    }, [isOpen, card, contentStore]);

    if (!card) return null;

    const handleSave = () => {
        if (!markdown.trim()) {
            removeContent(card.id);
        } else {
            addContent(card.id, markdown, source);
        }
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este contenido manual?')) {
            removeContent(card.id);
            setMarkdown('');
        }
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110]"
                    />
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-card border-l border-white/10 z-[111] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-card/50 backdrop-blur-md flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                                    <ClipboardPaste size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">Editor de Contenido</h3>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight">{card.id} • {card.title}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/40 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Toolbar */}
                        <div className="px-6 py-3 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setMode('edit')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'edit' ? 'bg-primary text-white' : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    <Edit3 size={14} />
                                    Editar
                                </button>
                                <button
                                    onClick={() => setMode('preview')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'preview' ? 'bg-primary text-white' : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    <Eye size={14} />
                                    Preview
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <select 
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-black uppercase text-white/60 outline-none focus:border-primary/50 transition-all cursor-pointer"
                                >
                                    <option value="Claude">Claude</option>
                                    <option value="ChatGPT">ChatGPT</option>
                                    <option value="Gemini">Gemini</option>
                                    <option value="Perplexity">Perplexity</option>
                                    <option value="DeepSeek">DeepSeek</option>
                                    <option value="Otra">Otra</option>
                                </select>

                                {markdown && (
                                    <button
                                        onClick={handleDelete}
                                        className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                                        title="Eliminar contenido"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                                <button
                                    onClick={handleSave}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${isSaved
                                            ? 'bg-green-500 text-white shadow-green-500/20'
                                            : 'bg-primary hover:bg-white text-white hover:text-primary shadow-primary/20'
                                        }`}
                                >
                                    {isSaved ? <CheckCircle size={14} /> : <Save size={14} />}
                                    {isSaved ? 'Guardado' : 'Guardar'}
                                </button>
                            </div>
                        </div>

                        {/* Main Area */}
                        <div className="flex-1 overflow-hidden relative bg-black/20">
                            {mode === 'edit' ? (
                                <textarea
                                    value={markdown}
                                    onChange={(e) => setMarkdown(e.target.value)}
                                    placeholder="Pega aquí el Markdown generado por tu IA..."
                                    className="w-full h-full min-h-[400px] bg-transparent p-8 text-white/80 font-mono text-sm leading-relaxed outline-none resize-none placeholder:text-white/10 custom-scrollbar"
                                />
                            ) : (
                                <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-strong:text-primary max-w-none">
                                    {markdown ? (
                                        <FormattedCardContent content={markdown} />
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                                            <Edit3 size={40} className="mb-4" />
                                            <p className="font-medium">No hay contenido para previsualizar</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer Tip */}
                        <div className="p-4 bg-white/[0.02] border-t border-white/5 text-center">
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
                                Usa el "Prompt Maestro" en Claude o ChatGPT y pega el resultado aquí
                            </p>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
