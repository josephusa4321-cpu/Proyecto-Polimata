import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DiagnosticSectionProps {
    content: string;
    completed: boolean;
    onComplete: (response: string) => void;
    savedResponse?: string;
}

export const DiagnosticSection: React.FC<DiagnosticSectionProps> = ({ content, completed, onComplete, savedResponse = '' }) => {
    const [response, setResponse] = useState(savedResponse);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
        >
            <div className="p-4 bg-[#1a1f2e] border border-slate-800 rounded-xl prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content || "*No hay texto de diagnóstico disponible.*"}
                </ReactMarkdown>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">Tu Diagnóstico / Reflexión</label>
                <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    disabled={completed}
                    placeholder="Escribe aquí tu análisis inicial o respuestas..."
                    className="w-full h-32 bg-[#0a0e17] border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-cyan-500 disabled:opacity-75"
                />
            </div>

            {!completed && (
                <button
                    onClick={() => onComplete(response)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                    <CheckCircle className="w-5 h-5" />
                    Completar Diagnóstico
                </button>
            )}

            {completed && (
                <div className="p-4 bg-emerald-900/20 border border-emerald-800 rounded-xl text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Diagnóstico completado</span>
                </div>
            )}
        </motion.div>
    );
};
