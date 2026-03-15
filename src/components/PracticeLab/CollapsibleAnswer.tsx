import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    answer: string;
}

export const CollapsibleAnswer: React.FC<Props> = ({ answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-6 bg-[#141824] border border-[#2a3042] rounded-xl overflow-hidden transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors focus:outline-none"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        {isOpen ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white/70">
                        {isOpen ? 'Ocultar respuesta de referencia' : 'Ver respuesta de referencia'}
                    </span>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-2 border-t border-[#2a3042]/50 text-sm text-white/60">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
