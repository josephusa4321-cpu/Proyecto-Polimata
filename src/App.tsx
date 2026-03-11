import React, { useState } from 'react'
import { HUD } from './components/HUD'
import { SkillTree } from './components/SkillTree'
import { Navigation } from './components/Navigation'
import type { ViewType } from './components/Navigation'
import { Toolbelt } from './components/Toolbelt'
import { ReviewSession } from './components/ReviewSession'
import { ContentEditor } from './components/ContentEditor'
import { useGameStore } from './stores/useGameStore'
import { ToastContainer } from './components/ComboToast'
import { AchievementsPanel } from './components/AchievementsPanel'
import { AchievementToast } from './components/AchievementToast'
import { XPGainIndicator } from './components/XPGainIndicator'
import { CelebrationOverlay } from './components/CelebrationOverlay'
import { TeachingTaxModal } from './components/TeachingTaxModal'
import { ShadowQuestPanel } from './components/ShadowQuestPanel'
import { TimeAttackModal } from './components/TimeAttackModal'
import { MirrorMatchPanel } from './components/MirrorMatchPanel'
import { DebuffPanel } from './components/DebuffPanel'
import { CapstonePanel } from './components/CapstonePanel'

import { MissionsPanel } from './components/MissionsPanel'
import { StatsDashboard } from './components/StatsDashboard'

const App: React.FC = () => {
  const { incrementStatsVisit } = useGameStore();
  const [currentView, setCurrentView] = useState<ViewType>('skilltree');

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    if (view === 'stats') {
      incrementStatsVisit();
    }
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-primary-foreground">
      <HUD />

      {currentView === 'skilltree' && <SkillTree />}
      {currentView === 'arsenal' && <Toolbelt />}
      {currentView === 'review' && <ReviewSession />}
      {currentView === 'missions' && <MissionsPanel />}
      {currentView === 'achievements' && <AchievementsPanel />}
      {currentView === 'stats' && <StatsDashboard />}

      <Navigation currentView={currentView} onViewChange={handleViewChange} />

      <ContentEditorWrapper />
      <ToastContainer />
      <AchievementToast />
      <XPGainIndicator />
      <CelebrationOverlay />
      <TeachingTaxModal />
      <ShadowQuestPanel />
      <TimeAttackModal />
      <MirrorMatchPanel />
      <DebuffPanel />
      <CapstonePanel />

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  )
}

import type { ConceptCard } from './types';

const ContentEditorWrapper: React.FC = () => {
  const { editingCardId, closeContentEditor } = useGameStore();
  const [card, setCard] = useState<ConceptCard | null>(null);

  React.useEffect(() => {
    if (editingCardId) {
      import('./data/all-modules').then(module => {
        const found = module.ALL_CARDS.find(c => c.id === editingCardId);
        setCard(found || null);
      });
    } else {
      setCard(null);
    }
  }, [editingCardId]);

  return (
    <ContentEditor
      card={card}
      isOpen={!!editingCardId}
      onClose={closeContentEditor}
    />
  );
};

export default App
