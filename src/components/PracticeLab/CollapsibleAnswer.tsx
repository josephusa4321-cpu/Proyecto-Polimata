import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CollapsibleAnswerProps {
    title?: string;
    content: string;
}

export const CollapsibleAnswer: React.FC<CollapsibleAnswerProps> = ({ title = "💡 Respuesta de referencia", content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-800 rounded-lg overflow-hidden bg-[#1a1f2e]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                    <Lock className={`w-4 h-4 text-cyan-500 ${isOpen ? 'opacity-0' : 'opacity-100'} transition-opacity`} />
                    {title}
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-800 bg-[#0a0e17] p-4 text-sm text-slate-300 prose prose-invert max-w-none"
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
