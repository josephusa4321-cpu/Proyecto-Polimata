import React, { useState, useMemo } from 'react';
import { ConceptCard } from './ConceptCard';
import { StudyPanel } from './StudyPanel';
import { useGameStore } from '../stores/useGameStore';
import { BossFightNode } from './BossFightNode';
import { DailyQuestBanner } from './DailyQuestBanner';
import { BossFightPanel } from './BossFightPanel';
import { PracticeLabPanel } from './PracticeLab/PracticeLabPanel';
import { CapstoneNode } from './CapstoneNode';
import { PillarSelector } from './PillarSelector';
import { ModuleSelector } from './ModuleSelector';
import { MilestoneList } from './MilestoneList';
import { ALL_MODULES, ALL_CARDS, ALL_BOSS_FIGHTS } from '../data/all-modules';
import type { ConceptCard as IConceptCard } from '../types';
import { SavedResponsesLog } from './SavedResponsesLog';

export const SkillTree: React.FC = () => {
    const { completedCardIds, activePillar, activeModuleId, setActivePillar, setActiveModuleId } = useGameStore();
    const [selectedCard, setSelectedCard] = useState<IConceptCard | null>(null);
    const [practiceLabCard, setPracticeLabCard] = useState<IConceptCard | null>(null);
    const [isBossOpen, setIsBossOpen] = useState(false);

    // Derived State
    const currentModuleInfo = useMemo(() => 
        ALL_MODULES.find(m => m.id === activeModuleId) || ALL_MODULES[0],
    [activeModuleId]);

    const moduleCards = useMemo(() => 
        ALL_CARDS.filter(c => c.id.startsWith(activeModuleId + '.')),
    [activeModuleId]);

    const currentBossFight = useMemo(() => 
        ALL_BOSS_FIGHTS.find(bf => bf.moduleId === activeModuleId),
    [activeModuleId]);

    React.useEffect(() => {
        const handleOpenPracticeLab = (e: CustomEvent<{ cardId: string }>) => {
            const card = ALL_CARDS.find(c => c.id === e.detail.cardId);
            if (card) {
                setPracticeLabCard(card);
            }
        };

        window.addEventListener('openPracticeLab', handleOpenPracticeLab as EventListener);
        return () => window.removeEventListener('openPracticeLab', handleOpenPracticeLab as EventListener);
    }, []);

    const getCardStatus = (card: IConceptCard) => {
        if (completedCardIds.includes(card.id)) return 'completed';
        
        // Ensure empty prerequisites are always met
        if (!card.prerequisites || card.prerequisites.length === 0) return 'available';

        const allPrereqsMet = card.prerequisites.every(id => 
            completedCardIds.includes(id.trim())
        );
        
        return allPrereqsMet ? 'available' : 'locked';
    };

    return (
        <main className="pt-24 pb-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
            <DailyQuestBanner />
            
            <section className="space-y-6">
                <PillarSelector 
                    activePillar={activePillar} 
                    onSelectPillar={(pillar) => {
                        setActivePillar(pillar);
                        // Optional UX improvement: auto-select first module of that pillar
                        if (pillar !== null) {
                            const firstMod = ALL_MODULES.find(m => m.pillar === pillar);
                            if (firstMod) setActiveModuleId(firstMod.id);
                        }
                    }} 
                />
                <ModuleSelector 
                    activePillar={activePillar}
                    activeModuleId={activeModuleId}
                    onSelectModule={setActiveModuleId}
                />
            </section>

            <div className="mb-6 text-center mt-12 bg-card/30 rounded-2xl p-6 border border-border/50 border-t-primary/20 backdrop-blur-sm">
                <h2 className="text-3xl font-black text-white mb-2">
                    {currentModuleInfo.id}: {currentModuleInfo.title}
                </h2>
                <h3 className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
                    {currentModuleInfo.pillarName}
                </h3>
                {currentModuleInfo.quote && (
                    <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto px-4 border-l-2 border-primary/30 py-1">
                        "{currentModuleInfo.quote}"
                    </p>
                )}
            </div>

            <SavedResponsesLog />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative">
                {moduleCards.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        No hay cards definidas para este módulo aún.
                    </div>
                ) : (
                    moduleCards.map((card) => (
                        <ConceptCard
                            key={card.id}
                            card={card}
                            status={getCardStatus(card)}
                            onClick={() => setSelectedCard(card)}
                        />
                    ))
                )}
            </div>

            {currentBossFight && (
                <div className="mt-12">
                     <BossFightNode 
                         bossFight={currentBossFight} 
                         onOpen={() => setIsBossOpen(true)} 
                     />
                </div>
            )}

            {currentBossFight && (
                <BossFightPanel
                    bossFight={currentBossFight}
                    isOpen={isBossOpen}
                    onClose={() => setIsBossOpen(false)}
                />
            )}

            <StudyPanel
                card={selectedCard}
                isOpen={!!selectedCard}
                onClose={() => setSelectedCard(null)}
            />

            <PracticeLabPanel
                card={practiceLabCard}
                isOpen={!!practiceLabCard}
                onClose={() => setPracticeLabCard(null)}
            />

            <div className="pt-20 border-t border-border/20 mt-20">
                <MilestoneList />
            </div>

            <div className="pt-20">
                <CapstoneNode />
            </div>
        </main>
    );
};
