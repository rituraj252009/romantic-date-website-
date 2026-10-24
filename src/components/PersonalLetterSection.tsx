import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Heart, Sparkles } from 'lucide-react';
import { ROMANTIC_DATA } from '../config/romanticData';
import { soundEngine } from '../audio/soundEffects';

interface PersonalLetterSectionProps {
  onProceedToProposal: () => void;
}

export const PersonalLetterSection: React.FC<PersonalLetterSectionProps> = ({
  onProceedToProposal,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [revealedIndex, setRevealedIndex] = useState<number>(0);
  const { salutation, paragraphs, closing, buttonText } = ROMANTIC_DATA.letter;

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    soundEngine.playSparkle();
    soundEngine.playChime();
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    const timers: any[] = [];
    paragraphs.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setRevealedIndex(idx + 1);
      }, (idx + 1) * 700);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  const handleProposalClick = () => {
    soundEngine.playCelebrationSound();
    onProceedToProposal();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10 select-none">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-900/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 inline-block mb-3">
          Special Letter 💌
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide text-glow-rose">
          Ek Dil Ki Baat, Sirf Asmita Ke Liye
        </h2>
      </div>

      {/* Interactive Envelope & Letter Container */}
      <div className="relative max-w-2xl w-full mx-auto">
        {!isOpen ? (
          /* Closed Envelope Card */
          <div
            onClick={handleOpenEnvelope}
            className="group cursor-pointer p-10 sm:p-14 rounded-3xl glass-panel-glow border-2 border-rose-500/40 text-center transition-all duration-500 hover:scale-[1.02] hover:border-rose-400/80 shadow-[0_15px_40px_rgba(244,63,94,0.3)]"
          >
            {/* Wax Seal Simulation */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-950/60 border-2 border-rose-300/40 group-hover:scale-110 transition-transform duration-300 animate-heartbeat">
              <Mail className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-rose-100 mt-6 font-medium">
              You Have Received a Special Letter 💌
            </h3>

            <p className="font-handwriting text-3xl sm:text-4xl text-rose-300 mt-2 text-glow-rose">
              For Asmita (Motku Ji) ❤️
            </p>

            <div className="mt-8">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600/60 group-hover:bg-rose-500 text-white font-medium text-sm tracking-wider uppercase transition-colors shadow-md">
                <span>Tap To Open Envelope</span>
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              </span>
            </div>
          </div>
        ) : (
          /* Opened Letter Paper (Cinematic Parchment Glass) */
          <div className="relative p-8 sm:p-14 rounded-3xl glass-panel-glow border border-amber-300/30 shadow-[0_20px_60px_rgba(244,63,94,0.35)] animate-fade-in transition-all duration-700">
            {/* Top letter header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-rose-500/20">
              <div className="flex items-center gap-2">
                <MailOpen className="w-5 h-5 text-rose-400" />
                <span className="text-xs uppercase tracking-wider text-rose-300/80 font-medium">
                  Confidential & Dil Se
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-400">
                <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
                <span className="font-handwriting text-2xl text-rose-200">Asmita</span>
              </div>
            </div>

            {/* Dear Asmita... */}
            <h3 className="font-serif text-3xl sm:text-4xl text-rose-200 font-semibold mb-6 text-glow-rose">
              {salutation}
            </h3>

            {/* Paragraphs revealed step by step */}
            <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-light">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={`transition-all duration-700 ${
                    revealedIndex > idx
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                  } ${idx === 1 ? 'font-medium text-rose-300 text-xl' : ''}`}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Closing text */}
            <div
              className={`mt-10 pt-6 border-t border-rose-500/20 text-center transition-all duration-1000 ${
                revealedIndex >= paragraphs.length
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="font-serif text-xl sm:text-2xl text-amber-200 font-medium italic mb-6">
                "{closing}"
              </p>

              {/* Glowing Button: Tell Me The Question 💖 */}
              <button
                onClick={handleProposalClick}
                onMouseEnter={() => soundEngine.playChime()}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 shadow-[0_0_35px_rgba(244,63,94,0.6)] hover:shadow-[0_0_50px_rgba(244,63,94,0.9)] transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span>{buttonText}</span>
                <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
