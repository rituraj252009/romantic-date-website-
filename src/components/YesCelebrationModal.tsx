import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Coffee, PartyPopper } from 'lucide-react';
import { ROMANTIC_DATA } from '../config/romanticData';
import { soundEngine } from '../audio/soundEffects';

interface YesCelebrationModalProps {
  onProceedToPlanner: () => void;
}

export const YesCelebrationModal: React.FC<YesCelebrationModalProps> = ({
  onProceedToPlanner,
}) => {
  const [step, setStep] = useState<number>(0);
  const { headline, subHeadline, message, buttonText } = ROMANTIC_DATA.celebration;

  useEffect(() => {
    // 1. Play celebration sound
    soundEngine.playCelebrationSound();

    // 2. Fire majestic heart confetti showers
    const fireConfetti = () => {
      // Center burst
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff1744', '#f50057', '#ff4081', '#ffd700', '#ffffff'],
        shapes: ['circle'],
        ticks: 200,
        gravity: 0.8,
      });

      // Left cannon
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff1744', '#ff4081', '#ffd700'],
      });

      // Right cannon
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff1744', '#ff4081', '#ffd700'],
      });
    };

    fireConfetti();
    const interval = setInterval(fireConfetti, 2500);

    // 3. Sequential reveals of text
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 2200);
    const timer3 = setTimeout(() => setStep(3), 3600);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handlePlanClick = () => {
    soundEngine.playSparkle();
    onProceedToPlanner();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 z-20 select-none">
      {/* Background celebration radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-rose-600/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Celebration Card */}
      <div className="relative max-w-2xl w-full mx-auto p-8 sm:p-14 rounded-3xl glass-panel-glow border-2 border-rose-400/80 text-center shadow-[0_20px_80px_rgba(244,63,94,0.5)] animate-fade-in">
        {/* Animated Poppers & Badges */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <PartyPopper className="w-6 h-6 text-amber-300 animate-bounce" />
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40">
            Yayyy! She Said Yesss! 🎉
          </span>
          <PartyPopper className="w-6 h-6 text-amber-300 animate-bounce" />
        </div>

        {/* 1. "WAITTTT... SACCHIII? 🥹❤️" */}
        <h2 className="font-handwriting text-4xl sm:text-6xl text-rose-300 tracking-wider text-glow-rose mb-3">
          {headline}
        </h2>

        {/* 2. "Asmita Ji Ne YES Bol Diyaaaa!!! 😭💗" */}
        <div
          className={`transition-all duration-1000 ${
            step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h3 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight text-glow-gold mb-6">
            {subHeadline}
          </h3>
        </div>

        {/* 3. Emotional & Playful Message */}
        <div
          className={`transition-all duration-1000 ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6" />
          <div className="font-serif text-lg sm:text-xl text-slate-100 leading-relaxed font-light space-y-4 max-w-lg mx-auto whitespace-pre-line">
            {message}
          </div>
        </div>

        {/* 4. Action Button: Plan Our Little Date 💌 */}
        <div
          className={`mt-10 transition-all duration-1000 ${
            step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          <button
            onClick={handlePlanClick}
            onMouseEnter={() => soundEngine.playChime()}
            className="group relative inline-flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-pink-500 shadow-[0_0_40px_rgba(244,63,94,0.8)] hover:shadow-[0_0_60px_rgba(244,63,94,1)] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span>{buttonText}</span>
            <Coffee className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
