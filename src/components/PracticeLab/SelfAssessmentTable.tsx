import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CheckSquare, Square } from 'lucide-react';

interface Props {
    content: string;
    isCompleted: boolean;
    onComplete: (checkboxes: boolean[]) => void;
}

export const SelfAssessmentTable: React.FC<Props> = ({ content, isCompleted, onComplete }) => {
    // We assume 5 checkboxes based on requirements, but could be dynamic
    const [checkboxes, setCheckboxes] = useState<boolean[]>(Array(5).fill(false));

    const toggleCheckbox = (index: number) => {
        if (isCompleted) return;
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    };

    const allChecked = checkboxes.every(c => c);

    return (
        <div className="mb-12 p-8 bg-black/40 border border-white/10 rounded-3xl relative overflow-hidden">
            <h3 className="text-xl font-black text-white leading-tight mb-2">Auto-evaluación final</h3>
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mb-6">Verifica tu aprendizaje</p>

            <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white max-w-none mb-8 relative z-10">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>

            <div className="space-y-3">
                {checkboxes.map((checked, index) => (
                    <button
                        key={index}
                        onClick={() => toggleCheckbox(index)}
                        disabled={isCompleted}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left focus:outline-none
                            ${checked ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/10 hover:border-primary/50'}
                            ${isCompleted ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                    >
                        <div className={`flex items-center justify-center
                            ${checked ? 'text-primary' : 'text-white/20'}
                        `}>
                            {checked ? <CheckSquare size={20} /> : <Square size={20} />}
                        </div>
                        <span className={`text-sm font-medium transition-colors
                            ${checked ? 'text-white/90' : 'text-white/60'}
                        `}>
                            Criterio de evaluación {index + 1}
                        </span>
                    </button>
                ))}
            </div>

            {!isCompleted && (
                <div className="mt-8 flex justify-end">
                    <button
                        disabled={!allChecked}
                        onClick={() => onComplete(checkboxes)}
                        className="px-8 py-4 bg-green-500 text-[#0a0e17] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-green-500 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Completar Practice Lab
                    </button>
                </div>
            )}
        </div>
    );
};
