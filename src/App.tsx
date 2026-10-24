import { useState, useRef, useEffect } from 'react';
import { ThreeRomanticCanvas } from './components/ThreeRomanticCanvas';
import { FloatingPetalsOverlay } from './components/FloatingPetalsOverlay';
import { AudioPlayerControl } from './components/AudioPlayerControl';
import { CinematicIntro } from './components/CinematicIntro';
import { RomanticShayariSection } from './components/RomanticShayariSection';
import { PersonalLetterSection } from './components/PersonalLetterSection';
import { ProposalSection } from './components/ProposalSection';
import { YesCelebrationModal } from './components/YesCelebrationModal';
import { DatePlannerSection } from './components/DatePlannerSection';
import { RomanticFooter } from './components/RomanticFooter';
import { soundEngine } from './audio/soundEffects';
import { Heart } from 'lucide-react';

type Scene = 'intro' | 'shayari' | 'letter' | 'proposal' | 'celebration' | 'planner';

export function App() {
  const [currentScene, setCurrentScene] = useState<Scene>('intro');
  const [isCelebrationActive, setIsCelebrationActive] = useState<boolean>(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Scroll to top smoothly on scene change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScene]);

  const handleStartStory = () => {
    setCurrentScene('shayari');
  };

  const handleContinueToLetter = () => {
    setCurrentScene('letter');
  };

  const handleProceedToProposal = () => {
    setCurrentScene('proposal');
  };

  const handleYesClicked = () => {
    setIsCelebrationActive(true);
    setCurrentScene('celebration');
  };

  const handleProceedToPlanner = () => {
    setCurrentScene('planner');
  };

  const handleScrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigationItems: { id: Scene; label: string; icon: string }[] = [
    { id: 'intro', label: 'Intro', icon: '🌙' },
    { id: 'shayari', label: 'Shayari', icon: '🌹' },
    { id: 'letter', label: 'Letter', icon: '💌' },
    { id: 'proposal', label: 'Proposal', icon: '❤️' },
    { id: 'planner', label: 'Date Plan', icon: '☕' },
  ];

  return (
    <div className="relative min-h-screen bg-[#08020f] text-slate-100 overflow-x-hidden">
      {/* 1. 3D WebGL Canvas Layer */}
      <ThreeRomanticCanvas
        sceneState={currentScene}
        isCelebrationActive={isCelebrationActive}
      />

      {/* 2. Floating Atmospheric Rose Petals */}
      <FloatingPetalsOverlay />

      {/* 3. Audio & Music Player */}
      <AudioPlayerControl />

      {/* 4. Top Navigation Bar (Shown after Intro) */}
      {currentScene !== 'intro' && (
        <header className="fixed top-3 sm:top-5 left-3 sm:left-5 z-40 animate-fade-in max-w-[calc(100vw-145px)] sm:max-w-none overflow-x-auto">
          <nav className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass-panel border border-rose-500/30 backdrop-blur-xl shadow-lg whitespace-nowrap">
            <span className="font-handwriting text-lg sm:text-xl text-rose-300 font-bold pr-2 border-r border-rose-500/30 flex items-center gap-1">
              <span>Asmita</span>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            </span>

            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playChime();
                  setCurrentScene(item.id);
                }}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1 ${
                  currentScene === item.id
                    ? 'bg-rose-600/70 text-white shadow-sm'
                    : 'text-slate-400 hover:text-rose-200 hover:bg-rose-950/40'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </header>
      )}

      {/* 5. Main Scenes Flow */}
      <main className="relative z-10 w-full min-h-screen">
        {currentScene === 'intro' && (
          <CinematicIntro onStartStory={handleStartStory} />
        )}

        {currentScene === 'shayari' && (
          <RomanticShayariSection onContinueToLetter={handleContinueToLetter} />
        )}

        {currentScene === 'letter' && (
          <PersonalLetterSection onProceedToProposal={handleProceedToProposal} />
        )}

        {currentScene === 'proposal' && (
          <ProposalSection onYesClicked={handleYesClicked} />
        )}

        {currentScene === 'celebration' && (
          <YesCelebrationModal onProceedToPlanner={handleProceedToPlanner} />
        )}

        {currentScene === 'planner' && (
          <DatePlannerSection onScrollToFooter={handleScrollToFooter} />
        )}
      </main>

      {/* 6. Special Personal Footer — Motku Ji (Shown after intro) */}
      {currentScene !== 'intro' && (
        <div ref={footerRef}>
          <RomanticFooter />
        </div>
      )}
    </div>
  );
}

export default App;
