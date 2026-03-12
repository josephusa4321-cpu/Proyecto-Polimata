import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { X, Key, Info, Download, Upload, AlertCircle, CheckCircle, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsPanel: React.FC<Props> = ({ isOpen, onClose }) => {
    const {
        apiKey,
        setApiKey,
        exportAllContent,
        importAllContent,
        syncToCloud,
        loadFromCloud,
        syncStatus,
        syncMessage,
        syncErrorMessage,
        cloudSyncKey,
        setCloudSyncKey,
        deviceId,
        lastSynced,
        resetProgress
    } = useGameStore();
    const [tempKey, setTempKey] = useState(apiKey || '');
    const [tempCloudKey, setTempCloudKey] = useState(cloudSyncKey || '');
    const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const effectiveSyncKey = tempCloudKey.trim() || deviceId;

    React.useEffect(() => {
        if (!isOpen) return;
        setTempKey(apiKey || '');
        setTempCloudKey(cloudSyncKey || '');
    }, [apiKey, cloudSyncKey, isOpen]);

    const handleSave = () => {
        setApiKey(tempKey);
        setCloudSyncKey(tempCloudKey);
        onClose();
    };

    const handleExport = () => {
        const data = exportAllContent();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `polymath-content-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = importAllContent(event.target?.result as string);
            setImportStatus({
                type: result.success ? 'success' : 'error',
                msg: result.message
            });
            if (result.success) {
                setTimeout(() => setImportStatus(null), 3000);
            }
        };
        reader.readAsText(file);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-card border border-white/10 p-8 rounded-3xl z-[201] shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                    >
                        <div className="flex justify-between items-center mb-8 font-black uppercase tracking-tight">
                            <div className="flex items-center gap-3 text-white">
                                <Info size={20} className="text-primary" />
                                <h2>Configuracion</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/40 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-10">
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <Key size={14} className="text-primary" />
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Gemini AI (Auto-generacion)</h3>
                                </div>
                                <div className="relative mb-3">
                                    <input
                                        type="password"
                                        value={tempKey}
                                        onChange={(e) => setTempKey(e.target.value)}
                                        placeholder="AIzaSy..."
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 outline-none transition-all pr-12"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                                        <ShieldCheck size={18} />
                                    </div>
                                </div>
                                <a
                                    href="https://aistudio.google.com/app/apikey"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-[10px] text-primary font-bold hover:underline mb-2"
                                >
                                    Obtener API Key gratuita <ExternalLink size={10} />
                                </a>
                                <p className="text-[10px] text-white/30 leading-relaxed font-medium">
                                    Se usa como respaldo si una card no tiene contenido manual cargado.
                                </p>
                            </section>

                            <section className="pt-6 border-t border-white/5">
                                <div className="flex items-center gap-2 mb-4">
                                    <Download size={14} className="text-green-400" />
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-green-400">Respaldo de Contenido Manual</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <button
                                        onClick={handleExport}
                                        className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all font-black text-white group"
                                    >
                                        <Download size={20} className="mb-2 text-white/40 group-hover:text-green-400" />
                                        <span className="text-[9px] uppercase tracking-widest">Exportar</span>
                                    </button>

                                    <label className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all font-black text-white group cursor-pointer relative overflow-hidden">
                                        <input
                                            type="file"
                                            accept=".json"
                                            onChange={handleImport}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <Upload size={20} className="mb-2 text-white/40 group-hover:text-primary" />
                                        <span className="text-[9px] uppercase tracking-widest">Importar</span>
                                    </label>
                                </div>

                                {importStatus && (
                                    <div className={`p-4 rounded-xl flex items-center gap-3 border ${importStatus.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                        {importStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                        <span className="text-xs font-bold">{importStatus.msg}</span>
                                    </div>
                                )}

                                <p className="text-[10px] text-white/30 leading-relaxed font-medium">
                                    Exporta tus lecciones manuales como JSON para cargarlas en otros dispositivos o para backup.
                                </p>
                            </section>

                            <section className="pt-6 border-t border-white/5">
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck size={14} className="text-blue-400" />
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Progreso en la Nube (Supabase)</h3>
                                </div>

                                <div className="mb-4 space-y-3">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40">
                                        Clave de sincronizacion
                                    </label>
                                    <input
                                        type="text"
                                        value={tempCloudKey}
                                        onChange={(e) => setTempCloudKey(e.target.value)}
                                        placeholder="Opcional: usa la misma clave en todos tus dispositivos"
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-blue-400/50 outline-none transition-all"
                                    />
                                    <p className="text-[10px] text-white/30 leading-relaxed font-medium">
                                        Si la dejas vacia, la app usara este navegador como identificador. Si escribes la misma clave en otros dispositivos, compartiran el mismo progreso.
                                    </p>
                                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Identificador activo</p>
                                        <p className="mt-2 break-all text-xs text-white/70">{effectiveSyncKey}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <button
                                        onClick={() => {
                                            setCloudSyncKey(tempCloudKey);
                                            void syncToCloud();
                                        }}
                                        disabled={syncStatus === 'syncing'}
                                        className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all font-black text-white group disabled:opacity-50 disabled:cursor-wait"
                                    >
                                        <Upload size={20} className={`mb-2 ${syncStatus === 'syncing' ? 'animate-bounce text-blue-400' : 'text-white/40 group-hover:text-blue-400'}`} />
                                        <span className="text-[9px] uppercase tracking-widest">
                                            {syncStatus === 'syncing' ? 'Guardando...' : 'Guardar Nube'}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setCloudSyncKey(tempCloudKey);
                                            void loadFromCloud();
                                        }}
                                        disabled={syncStatus === 'syncing'}
                                        className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all font-black text-white group disabled:opacity-50 disabled:cursor-wait"
                                    >
                                        <Download size={20} className="mb-2 text-white/40 group-hover:text-amber-400" />
                                        <span className="text-[9px] uppercase tracking-widest">Cargar Nube</span>
                                    </button>
                                </div>

                                {syncStatus === 'success' && (
                                    <div className="p-4 rounded-xl flex items-center gap-3 border bg-green-500/10 border-green-500/20 text-green-400 mb-2">
                                        <CheckCircle size={16} />
                                        <span className="text-xs font-bold">{syncMessage || 'Sincronizacion exitosa'}</span>
                                    </div>
                                )}
                                {syncStatus === 'error' && (
                                    <div className="p-4 rounded-xl flex items-center gap-3 border bg-red-500/10 border-red-500/20 text-red-400 mb-2">
                                        <AlertCircle size={16} />
                                        <span className="text-xs font-bold">{syncErrorMessage || 'Error al sincronizar con la nube'}</span>
                                    </div>
                                )}

                                <p className="text-[10px] text-white/30 leading-relaxed font-medium">
                                    El guardado ahora intenta sincronizar automaticamente. Estos botones te sirven para forzar la operacion y ver la respuesta real de Supabase.
                                </p>
                                {lastSynced && (
                                    <p className="mt-2 text-[10px] text-white/20 leading-relaxed font-medium">
                                        Ultima sync local: {new Date(lastSynced).toLocaleString()}
                                    </p>
                                )}
                            </section>

                            <section className="pt-6 border-t border-white/5 space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <ExternalLink size={14} className="text-white/20" />
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/20">Zona de Pruebas</h3>
                                </div>

                                <button
                                    onClick={() => {
                                        onClose();
                                        useGameStore.getState().openDebuffPanel();
                                    }}
                                    className="w-full py-4 bg-primary/10 border border-primary/40 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
                                >
                                    <ShieldCheck size={14} />
                                    Reportar Sesgo Cognitivo
                                </button>

                                <button
                                    onClick={() => {
                                        const { addCombo } = useGameStore.getState();
                                        addCombo({
                                            cardId: 'TEST',
                                            targetId: 'COMBO',
                                            xp: 25,
                                            reason: 'Simulacion de conexion sistemica critica'
                                        });
                                    }}
                                    className="w-full py-4 border border-primary/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary/60 hover:bg-primary/5 transition-all"
                                >
                                    Simular Combo (+25 XP)
                                </button>

                                <button
                                    onClick={() => {
                                        useGameStore.getState().addXP(1000);
                                    }}
                                    className="w-full py-4 border border-primary/40 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all"
                                >
                                    Simular Level Up (+1000 XP)
                                </button>

                                <button
                                    onClick={() => {
                                        useGameStore.setState({ pendingCelebration: 'boss' });
                                    }}
                                    className="w-full py-4 border border-yellow-500/40 rounded-2xl text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:bg-yellow-500/5 transition-all"
                                >
                                    Simular Victoria Jefe
                                </button>
                            </section>

                            <section className="pt-6 border-t border-red-500/20">
                                <div className="flex items-center gap-2 mb-4">
                                    <AlertTriangle size={14} className="text-red-500" />
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-red-500">Zona de Peligro</h3>
                                </div>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Estas seguro de que quieres empezar de cero? Perderas todo el progreso, nivel y XP. Esto no se puede deshacer a menos que tengas un backup.')) {
                                            resetProgress();
                                            onClose();
                                        }
                                    }}
                                    className="w-full py-4 bg-red-500/10 border border-red-500/40 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <AlertTriangle size={14} />
                                    Empezar de Cero (Reset)
                                </button>
                            </section>

                            <div className="pt-4 flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white/40 border border-white/5 hover:bg-white/5 transition-all"
                                >
                                    Cerrar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 py-4 rounded-2xl bg-primary hover:bg-white text-white hover:text-primary font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
                                >
                                    Guardar Ajustes
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
