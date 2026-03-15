import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Settings2 } from 'lucide-react';

interface Props {
    content: string;
}

export const MethodologySection: React.FC<Props> = ({ content }) => {
    return (
        <div className="mb-12 p-8 bg-blue-500/5 border border-blue-500/20 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Settings2 size={120} />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                    <Settings2 size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white leading-tight">Metodologías</h3>
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Aproximación sugerida</p>
                </div>
            </div>

            <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-strong:text-blue-400 max-w-none relative z-10">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
        </div>
    );
};
