import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { ROMANTIC_DATA } from '../config/romanticData';
import { soundEngine } from '../audio/soundEffects';

interface CinematicIntroProps {
  onStartStory: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onStartStory }) => {
  const [step, setStep] = useState<number>(0);
  const [typedGreeting, setTypedGreeting] = useState<string>('');
  const [isTypingDone, setIsTypingDone] = useState<boolean>(false);
  const fullGreeting = ROMANTIC_DATA.intro.greeting;

  // Step 1: Typewriter for "Hey Asmita... ❤️"
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullGreeting.length) {
        setTypedGreeting(fullGreeting.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setIsTypingDone(true);
        // After small pause, reveal step 2
        setTimeout(() => setStep(1), 700);
        // After another pause, reveal step 3
        setTimeout(() => setStep(2), 2200);
        // Reveal button
        setTimeout(() => setStep(3), 3600);
      }
    }, 75);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    soundEngine.playCelebrationSound();
    soundEngine.playSparkle();
    onStartStory();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 z-10 text-center select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] h-[340px] sm:h-[550px] bg-rose-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Intro Card Container */}
      <div className="relative max-w-2xl w-full mx-auto p-8 sm:p-12 rounded-3xl glass-panel-glow border border-rose-500/30 transition-all duration-700 shadow-2xl">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium tracking-wide mb-8 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>A Special Romantic Surprise Just For You</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>

        {/* 1. "Hey Asmita... ❤️" */}
        <h1 className="font-handwriting text-5xl sm:text-7xl text-rose-200 tracking-wider text-glow-rose min-h-[75px] sm:min-h-[95px] flex items-center justify-center">
          {typedGreeting}
          {!isTypingDone && (
            <span className="inline-block w-1.5 h-10 sm:h-14 bg-rose-400 ml-1.5 animate-pulse" />
          )}
        </h1>

        {/* 2. Subtext reveal */}
        <div className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-serif text-lg sm:text-2xl text-slate-200 mt-6 leading-relaxed font-light italic">
            "Ek chhoti si baat kehni thi tumse...<br />
            <span className="text-rose-300 font-normal">Par socha, kyun na use thoda special banaya jaaye? 🥹</span>"
          </p>
        </div>

        {/* 3. Call to Action line */}
        <div className={`transition-all duration-1000 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-400/60 to-transparent mx-auto my-7" />
          <p className="text-base sm:text-xl text-amber-200/90 font-medium tracking-wide">
            "Toh madam ji, ready ho apne liye banayi gayi ek chhoti si duniya explore karne ke liye? 🌹✨"
          </p>
        </div>

        {/* 4. Elegant Glowing Button */}
        <div className={`mt-10 transition-all duration-1000 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <button
            onClick={handleStart}
            onMouseEnter={() => soundEngine.playChime()}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-600 shadow-[0_0_35px_rgba(244,63,94,0.6)] hover:shadow-[0_0_55px_rgba(244,63,94,0.9)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </span>

            <span>{ROMANTIC_DATA.intro.buttonText}</span>
            <span className="group-hover:rotate-12 transition-transform duration-300 text-xl">🌹</span>
          </button>

          <p className="text-xs text-rose-300/60 mt-4 tracking-wider">
            Curated exclusively for Asmita with lots of pyaar 💕
          </p>
        </div>
      </div>
    </div>
  );
};
