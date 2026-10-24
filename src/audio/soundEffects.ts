// Web Audio API based romantic ambient synthesizer & sound effects
// 100% self-contained, no external CDN / MP3 failures, zero CORS issues, works offline

class RomanticSoundEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private isMuted: boolean = false;
  private musicInterval: any = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Romantic arpeggio notes (warm dreamy romantic scale in E major / C# minor)
  // E3, G#3, B3, E4, F#4, G#4, B4, C#5, D#5
  private readonly melodyNotes = [
    // Chord 1: E Maj9
    [164.81, 207.65, 246.94, 329.63, 392.00, 493.88],
    // Chord 2: C# min7
    [138.59, 164.81, 207.65, 277.18, 329.63, 415.30],
    // Chord 3: A Maj7
    [110.00, 164.81, 220.00, 277.18, 329.63, 440.00],
    // Chord 4: B Sus4 / B
    [123.47, 164.81, 246.94, 329.63, 369.99, 493.88],
  ];

  public toggleMusic(): boolean {
    this.initContext();
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public startMusic() {
    this.initContext();
    if (!this.ctx || !this.musicGain) return;
    this.isMusicPlaying = true;

    let chordIndex = 0;
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;

      const currentChord = this.melodyNotes[chordIndex];
      const freq = currentChord[noteIndex % currentChord.length];

      this.playPluckNote(freq, 1.8, 0.2);

      // Play soft bass note on first beat
      if (noteIndex === 0) {
        this.playPluckNote(currentChord[0] / 2, 3.0, 0.35, 'triangle');
      }

      noteIndex++;
      if (noteIndex >= currentChord.length * 2) {
        noteIndex = 0;
        chordIndex = (chordIndex + 1) % this.melodyNotes.length;
      }
    };

    // Arpeggio tempo ~ 420ms
    playNextNote();
    this.musicInterval = setInterval(playNextNote, 420);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  private playPluckNote(frequency: number, duration: number, volume: number = 0.2, type: OscillatorType = 'sine') {
    if (!this.ctx || !this.musicGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);

      // Gentle low-pass filter for cozy warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio fallback safe
    }
  }

  // Soft romantic chime sound effect
  public playChime() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || !this.sfxGain) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.start(now);
          osc.stop(now + 0.85);
        } catch {}
      }, idx * 75);
    });
  }

  // Heart celebration sound effect
  public playCelebrationSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    // A rising magical harp glissando
    const notes = [
      261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98
    ];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx || !this.sfxGain) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

          osc.connect(gain);
          gain.connect(this.sfxGain);

          osc.start(now);
          osc.stop(now + 1.3);
        } catch {}
      }, i * 65);
    });
  }

  // Soft sparkle / transition sound
  public playSparkle() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.3);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  }
}

export const soundEngine = new RomanticSoundEngine();
