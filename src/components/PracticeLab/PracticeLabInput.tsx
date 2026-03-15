import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, HelpCircle } from 'lucide-react';

interface PracticeLabInputProps {
    onSave: (content: string) => void;
}

export const PracticeLabInput: React.FC<PracticeLabInputProps> = ({ onSave }) => {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (content.trim()) {
            onSave(content);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-[#1a1f2e] border border-slate-800 rounded-xl space-y-4"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    🧪 Practice Lab
                </h3>
                <div className="group relative">
                    <HelpCircle className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
                    <div className="absolute right-0 top-6 w-64 p-3 bg-[#0a0e17] border border-slate-800 rounded-lg text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Pega el contenido generado por tu IA. Debe contener secciones como `## 🎯 Diagnóstico rápido` y `## 🔨 Ejercicio 1`.
                    </div>
                </div>
            </div>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`## 🎯 Diagnóstico rápido\nPregunta diagnóstico...\n\n## 🔨 Ejercicio 1: Nivel de Entrada\nDescripción del ejercicio...\n### 💡 Respuesta de referencia\nRúbrica o respuesta clave...`}
                className="w-full h-80 bg-[#0a0e17] border border-slate-800 rounded-lg p-4 text-slate-200 font-mono text-sm focus:outline-none focus:border-cyan-500 resize-none"
            />

            <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
                <Save className="w-5 h-5" />
                Guardar Practice Lab
            </button>
        </motion.div>
    );
};
