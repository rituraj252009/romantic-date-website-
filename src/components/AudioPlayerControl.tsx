import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Pause, Play } from 'lucide-react';
import { soundEngine } from '../audio/soundEffects';

export const AudioPlayerControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const handleTogglePlay = () => {
    setHasInteracted(true);
    const playing = soundEngine.toggleMusic();
    setIsPlaying(playing);
    if (playing) {
      soundEngine.playSparkle();
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed top-3 sm:top-5 right-3 sm:right-5 z-50 flex items-center gap-2">
      <div 
        onClick={handleTogglePlay}
        className={`group cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 backdrop-blur-xl border shadow-lg select-none ${
          isPlaying
            ? 'bg-rose-950/70 border-rose-500/50 shadow-rose-900/30 text-rose-200'
            : 'bg-slate-900/60 border-slate-700/50 hover:border-rose-400/40 text-slate-300 hover:text-white'
        }`}
        title={isPlaying ? "Pause Romantic Music" : "Play Romantic Music"}
      >
        {/* Animated equalizer waves when playing */}
        <div className="flex items-center gap-0.5 h-4">
          {isPlaying ? (
            <>
              <span className="w-1 bg-rose-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-pink-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-4" />
              <span className="w-1 bg-rose-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2" />
              <span className="w-1 bg-amber-300 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3.5" />
            </>
          ) : (
            <Music className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          )}
        </div>

        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? "Romantic Melody Playing" : "Romantic Music (OFF)"}
        </span>

        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 text-rose-300" />
        ) : (
          <Play className="w-3.5 h-3.5 text-rose-400" />
        )}

        {/* Mute button */}
        <button
          onClick={handleToggleMute}
          className="ml-1 p-1 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-white transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>
      </div>

      {!hasInteracted && (
        <span className="hidden sm:inline-block text-[11px] text-rose-300/80 bg-rose-950/40 px-2.5 py-1 rounded-full border border-rose-500/20 backdrop-blur-md animate-pulse">
          Tap for sound 🎵
        </span>
      )}
    </div>
  );
};
