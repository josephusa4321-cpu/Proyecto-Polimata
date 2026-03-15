import React from 'react';
import { motion } from 'motion/react';
import { Award, Zap } from 'lucide-react';

interface Props {
    totalXPEarned: number;
}

export const LabCompleteBanner: React.FC<Props> = ({ totalXPEarned }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-8 bg-gradient-to-r from-green-500/20 to-primary/20 border border-green-500/30 rounded-3xl relative overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.15)] flex flex-col md:flex-row items-center gap-6"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Award size={160} className="text-green-500" />
            </div>

            <div className="w-20 h-20 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/40 shrink-0 z-10 shadow-inner">
                <Award size={40} />
            </div>
            
            <div className="flex-1 text-center md:text-left z-10">
                <h3 className="text-2xl font-black text-white leading-tight mb-2">¡Practice Lab Completado!</h3>
                <p className="text-sm text-green-200/80 font-medium">Has completado todos los niveles de práctica. La retención para esta carta ahora es mayor.</p>
            </div>

            <div className="bg-black/40 p-4 rounded-2xl border border-white/10 shrink-0 text-center z-10 min-w-[140px]">
                <span className="block text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">XP Ganada</span>
                <div className="flex items-center justify-center gap-2 text-2xl font-black text-yellow-400">
                    <Zap size={20} className="fill-current" />
                    {totalXPEarned}
                </div>
            </div>
        </motion.div>
    );
};
