import React, { useState } from 'react';
import { Save, ClipboardPaste } from 'lucide-react';

interface Props {
    onSave: (markdown: string) => void;
}

export const PracticeLabInput: React.FC<Props> = ({ onSave }) => {
    const [markdown, setMarkdown] = useState('');

    return (
        <div className="flex-1 p-8 flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-3xl m-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 ring-1 ring-primary/20">
                <ClipboardPaste size={32} />
            </div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-3">Nuevo Practice Lab</h4>
            <p className="text-sm text-white/40 mb-8 leading-relaxed max-w-[400px] mx-auto text-center font-medium">
                Pega aquí el contenido del Practice Lab generado con tu IA.
            </p>
            <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Pega aquí el markdown..."
                className="w-full h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-all resize-none mb-6"
            />
            <button
                disabled={!markdown.trim()}
                onClick={() => onSave(markdown)}
                className="w-full py-4 bg-primary text-white text-[12px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-primary transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <Save size={16} />
                Guardar Lab
            </button>
        </div>
    );
};
