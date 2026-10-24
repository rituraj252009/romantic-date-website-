import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Feather } from 'lucide-react';
import { ROMANTIC_DATA, type ShayariItem } from '../config/romanticData';
import { soundEngine } from '../audio/soundEffects';

interface RomanticShayariSectionProps {
  onContinueToLetter: () => void;
}

export const RomanticShayariSection: React.FC<RomanticShayariSectionProps> = ({
  onContinueToLetter,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [revealedLines, setRevealedLines] = useState<number>(0);
  const [cardTilt, setCardTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const shayaris = ROMANTIC_DATA.shayaris;
  const currentShayari: ShayariItem = shayaris[currentIndex];

  // Smooth line-by-line reveal when switching shayari
  useEffect(() => {
    setRevealedLines(0);
    setIsTransitioning(true);
    const timeoutInitial = setTimeout(() => setIsTransitioning(false), 300);

    const lineIntervals: any[] = [];
    currentShayari.lines.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setRevealedLines(idx + 1);
      }, (idx + 1) * 350);
      lineIntervals.push(timer);
    });

    return () => {
      clearTimeout(timeoutInitial);
      lineIntervals.forEach(clearTimeout);
    };
  }, [currentIndex]);

  const handleNext = () => {
    soundEngine.playChime();
    soundEngine.playSparkle();
    setCurrentIndex((prev) => (prev + 1) % shayaris.length);
  };

  const handlePrev = () => {
    soundEngine.playChime();
    setCurrentIndex((prev) => (prev - 1 + shayaris.length) % shayaris.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 8;
    const rotateX = -(y / (rect.height / 2)) * 8;
    setCardTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10 select-none">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/25 text-rose-300 text-xs sm:text-sm font-medium mb-3">
          <Feather className="w-3.5 h-3.5 text-rose-400" />
          <span>Dil Se Likhit Alfaaz</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide text-glow-rose">
          Thodi Si Shayari, Sirf Tumhare Liye 🌹
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base mt-2 max-w-lg mx-auto">
          Kuch lines jo sirf Asmita ke liye dil se nikli hain...
        </p>
      </div>

      {/* 3D Tilt Glass Card Container */}
      <div
        className="relative max-w-xl w-full mx-auto perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          style={{
            transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
            transition: cardTilt.x === 0 ? 'transform 0.5s ease-out' : 'none',
          }}
          className={`relative p-8 sm:p-12 rounded-3xl glass-panel-glow border border-rose-500/40 shadow-[0_15px_45px_rgba(225,29,72,0.25)] transition-all duration-300 ${
            isTransitioning ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'
          }`}
        >
          {/* Top tag & Heart badge */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-rose-500/20">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20">
              {currentShayari.tagline}
            </span>
            <div className="flex items-center gap-1.5 text-rose-400">
              <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
              <span className="font-handwriting text-xl text-rose-200">
                {currentIndex + 1} / {shayaris.length}
              </span>
            </div>
          </div>

          {/* Shayari Heading */}
          <h3 className="font-serif text-2xl sm:text-3xl text-rose-100 font-medium mb-6 text-glow-rose">
            {currentShayari.title}
          </h3>

          {/* Shayari Lines with handwritten typography & line-by-line reveal */}
          <div className="space-y-4 min-h-[170px] sm:min-h-[190px] flex flex-col justify-center">
            {currentShayari.lines.map((line, idx) => (
              <p
                key={idx}
                className={`font-casual text-xl sm:text-2xl text-rose-100/90 leading-relaxed tracking-wide transition-all duration-700 ${
                  revealedLines > idx
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3'
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Card Footer with Next Shayari Button & Controls */}
          <div className="mt-8 pt-6 border-t border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-2 order-2 sm:order-1">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-slate-900/60 hover:bg-rose-950/60 border border-rose-500/30 text-rose-300 hover:text-white transition-all transform hover:scale-105 active:scale-95"
                title="Pichhli Shayari"
                aria-label="Previous Shayari"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5 px-2">
                {shayaris.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      soundEngine.playChime();
                      setCurrentIndex(i);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? 'w-6 bg-rose-400'
                        : 'w-2 bg-slate-600 hover:bg-rose-400/50'
                    }`}
                    aria-label={`Go to shayari ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-slate-900/60 hover:bg-rose-950/60 border border-rose-500/30 text-rose-300 hover:text-white transition-all transform hover:scale-105 active:scale-95"
                title="Agli Shayari"
                aria-label="Next Shayari"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* "Madam Ji, Ek Aur Shayari? 💕" Button */}
            <button
              onClick={handleNext}
              className="order-1 sm:order-2 w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600/80 to-pink-600/80 hover:from-rose-500 hover:to-pink-500 border border-rose-400/40 text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40 transition-all hover:scale-105 active:scale-95"
            >
              <span>{ROMANTIC_DATA.shayariButton}</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Button to proceed to Personal Letter */}
      <div className="mt-12 text-center">
        <button
          onClick={() => {
            soundEngine.playChime();
            soundEngine.playSparkle();
            onContinueToLetter();
          }}
          className="group inline-flex items-center gap-2 text-rose-300 hover:text-rose-100 text-sm sm:text-base font-medium px-6 py-3 rounded-full bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 hover:border-rose-400/60 transition-all shadow-md"
        >
          <span>Ek Khaas Khat Tumhare Naam Bhi Hai... 💌</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};
