import React from 'react';
import { FileText, PenSquare } from 'lucide-react';

interface Props {
    status: 'draft' | 'completed';
    compact?: boolean;
}

export const ResponseStatusBadge: React.FC<Props> = ({ status, compact = false }) => {
    const isCompleted = status === 'completed';
    const Icon = isCompleted ? FileText : PenSquare;

    return (
        <div
            className={`inline-flex items-center gap-1.5 rounded-full border font-black uppercase tracking-widest ${
                compact ? 'px-2 py-1 text-[8px]' : 'px-3 py-1.5 text-[9px]'
            } ${
                isCompleted
                    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                    : 'border-amber-400/30 bg-amber-400/10 text-amber-300'
            }`}
        >
            <Icon size={compact ? 10 : 12} />
            {isCompleted ? 'Respuesta guardada' : 'Borrador guardado'}
        </div>
    );
};
