import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Sparkles, ArrowRight } from 'lucide-react';

interface LevelUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    level: number;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ isOpen, onClose, level }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[1000] flex items-center justify-center p-4"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            y: 0,
                            transition: { type: 'spring', damping: 15, stiffness: 200 }
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="fixed inset-0 m-auto w-full max-w-md h-fit bg-card border border-white/10 rounded-[40px] z-[1001] shadow-[0_0_100px_rgba(234,179,8,0.2)] overflow-hidden flex flex-col items-center p-8 text-center"
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent -z-10" />

                        {/* Animated Icon Crown */}
                        <motion.div
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', damping: 12 }}
                            className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center text-black shadow-2xl mb-6 relative"
                        >
                            <Crown size={48} className="animate-pulse" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                                className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
                            />
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl font-black uppercase tracking-tight text-white mb-2 flex items-center gap-2 justify-center"
                        >
                            <Sparkles size={24} className="text-yellow-400" /> ¡NIVEL ALCANZADO! <Sparkles size={24} className="text-yellow-400" />
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-xs mb-8"
                        >
                            Tu maestría polimática crece
                        </motion.p>

                        {/* Level Display Display */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, type: 'spring' }}
                            className="bg-white/5 border border-white/10 px-8 py-4 rounded-3xl mb-10 flex flex-col items-center shadow-inner"
                        >
                            <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">NUEVA MAESTRÍA</span>
                            <span className="text-5xl font-black text-white mt-1">
                                {level}
                            </span>
                        </motion.div>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            onClick={onClose}
                            className="w-full py-5 bg-yellow-400 hover:bg-white hover:text-black text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group"
                        >
                            Continuar mi Expansión
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
