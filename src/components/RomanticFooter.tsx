import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { ROMANTIC_DATA } from '../config/romanticData';

export const RomanticFooter: React.FC = () => {
  const { specialTitle, loveNote, dedication } = ROMANTIC_DATA.footer;

  return (
    <footer className="relative w-full overflow-hidden pt-24 pb-16 px-4 z-10 border-t border-rose-500/20 bg-gradient-to-b from-transparent via-[#130522]/80 to-[#07010e]">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[350px] bg-rose-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating 3D-style Hearts */}
      <div className="absolute left-[10%] top-12 animate-float-slow opacity-60 pointer-events-none">
        <div className="text-3xl filter drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]">
          💗
        </div>
      </div>
      <div className="absolute right-[12%] top-16 animate-float-reverse opacity-60 pointer-events-none">
        <div className="text-4xl filter drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
          💖
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 select-none">
        {/* Soft floating stars & rose badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span className="text-xl">🌹</span>
          <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
        </div>

        {/* Exact text: "♡ Meri Cute Si Madam (Motku) Ji Ke Liye ♡" */}
        <h2 className="font-handwriting text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent tracking-wider text-glow-rose leading-tight mb-4 animate-heartbeat">
          {specialTitle}
        </h2>

        {/* Love Note */}
        <p className="font-serif text-base sm:text-xl text-rose-100/90 font-light max-w-xl mx-auto leading-relaxed mt-4 italic">
          "{loveNote}"
        </p>

        {/* Decorative divider with heart */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-rose-400/40" />
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-rose-400/40" />
        </div>

        {/* Final small dedication line */}
        <p className="text-xs sm:text-sm text-slate-400/80 tracking-widest font-light">
          {dedication}
        </p>

        {/* Sweet timestamp & signoff */}
        <p className="text-[11px] text-rose-400/40 mt-6 uppercase tracking-widest">
          Always & Forever • Made For Asmita
        </p>
      </div>
    </footer>
  );
};
