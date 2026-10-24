import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Coffee } from 'lucide-react';
import { ROMANTIC_DATA } from '../config/romanticData';
import { soundEngine } from '../audio/soundEffects';

interface ProposalSectionProps {
  onYesClicked: () => void;
}

export const ProposalSection: React.FC<ProposalSectionProps> = ({ onYesClicked }) => {
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noTextIndex, setNoTextIndex] = useState<number>(0);
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const { leadIn, question, subtext, yesButton, noButtonDefault, noPlayfulTexts } =
    ROMANTIC_DATA.proposal;

  const currentNoText = dodgeCount === 0 ? noButtonDefault : noPlayfulTexts[noTextIndex];

  // Playful dodge logic
  const dodgeButton = () => {
    soundEngine.playSparkle();

    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const btnWidth = 200;

    // Calculate safe bounds within the container
    const maxRangeX = Math.max(40, (container.width / 2) - btnWidth / 2 - 20);
    const maxRangeY = 80;

    // Generate random offset that is distinctly away from center/YES button
    const randomSignX = Math.random() > 0.5 ? 1 : -1;
    const randomSignY = Math.random() > 0.5 ? 1 : -1;
    
    // Ensure displacement is noticeable
    const newX = randomSignX * (60 + Math.random() * (maxRangeX - 60));
    const newY = randomSignY * (30 + Math.random() * maxRangeY);

    setNoPosition({ x: newX, y: newY });
    setNoTextIndex((prev) => (prev + 1) % noPlayfulTexts.length);
    setDodgeCount((prev) => prev + 1);
  };

  const handleNoMouseEnter = () => {
    dodgeButton();
  };

  const handleNoTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    dodgeButton();
  };

  const handleYes = () => {
    soundEngine.playCelebrationSound();
    onYesClicked();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10 select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-rose-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Proposal Card */}
      <div
        ref={containerRef}
        className="relative max-w-2xl w-full mx-auto p-8 sm:p-14 rounded-3xl glass-panel-glow border-2 border-rose-500/50 text-center shadow-[0_20px_70px_rgba(244,63,94,0.35)] overflow-hidden"
      >
        {/* Floating decorative badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 animate-pulse">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>The Most Special Moment</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        {/* Lead in text */}
        <p className="font-handwriting text-3xl sm:text-4xl text-rose-300 mb-4 text-glow-rose">
          {leadIn}
        </p>

        {/* Central Proposal Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6 text-glow-rose">
          {question}
        </h2>

        {/* Romantic subtext */}
        <p className="text-base sm:text-xl text-rose-100/90 font-light max-w-lg mx-auto leading-relaxed mb-10 flex items-center justify-center gap-2">
          <Coffee className="w-5 h-5 text-amber-300 shrink-0 inline" />
          <span>{subtext}</span>
        </p>

        {/* Interactive Buttons Container */}
        <div className="relative min-h-[140px] sm:min-h-[120px] flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* YES Button - Stationary, Heartbeat, Glowing */}
          <button
            onClick={handleYes}
            onMouseEnter={() => soundEngine.playChime()}
            className="group relative z-20 px-10 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 border-2 border-rose-300/80 shadow-[0_0_35px_rgba(244,63,94,0.7)] hover:shadow-[0_0_55px_rgba(244,63,94,1)] animate-heartbeat transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <Heart className="w-6 h-6 fill-white text-white group-hover:scale-125 transition-transform" />
            <span>{yesButton}</span>
            <Sparkles className="w-5 h-5 text-amber-300" />
          </button>

          {/* NO Button - Playfully dodging with spring physics */}
          <button
            ref={noButtonRef}
            onMouseEnter={handleNoMouseEnter}
            onTouchStart={handleNoTouchStart}
            onClick={dodgeButton}
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="z-10 px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-600/60 shadow-lg cursor-pointer select-none transition-colors"
          >
            <span>{currentNoText}</span>
          </button>
        </div>

        {/* Playful hint text if dodged */}
        {dodgeCount > 0 && (
          <p className="text-xs text-rose-300/80 mt-6 animate-fade-in font-casual text-lg">
            (Hehe Asmita ji, NO button thoda sharmeela hai, pakad nahi paogi! 😉❤️)
          </p>
        )}

        {/* Discreet polite decline option for 100% comfort */}
        <div className="mt-8 pt-4 border-t border-rose-500/10">
          <button
            onClick={() => setShowDeclineModal(true)}
            className="text-[12px] text-slate-400 hover:text-slate-300 underline underline-offset-4 transition-colors"
          >
            Agar sach mein nahi chalna, toh yahan click kar sakti ho 🤍
          </button>
        </div>
      </div>

      {/* Respectful decline modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full p-8 rounded-3xl glass-panel-glow border border-rose-400/40 text-center animate-fade-in">
            <span className="text-4xl inline-block mb-3">🌸</span>
            <h3 className="font-serif text-2xl text-white font-medium mb-3">
              Koi Baat Nahi, Asmita Ji!
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Aapki khushi, comfort aur marzi sabse pehle aati hai. No pressure at all! Ek pyari si dosti aur respect hamesha rahegi. 🤍✨
            </p>
            <button
              onClick={() => setShowDeclineModal(false)}
              className="px-6 py-2.5 rounded-full bg-rose-600 text-white text-sm font-medium hover:bg-rose-500 transition-colors"
            >
              Theek Hai, Samajh Gayi 🌸
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
