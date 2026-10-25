/**
 * sound-engine.ts
 * ───────────────
 * Procedural Web Audio API sound synthesizer for zero-g physical interactions.
 * Fully SSR-safe, zero external asset dependencies, running on browser AudioContext.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;

  /**
   * Lazily initialize or resume the browser AudioContext safely on user gesture.
   */
  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {
        // Handled silently if autoplay policy blocks before first interaction
      });
    }

    return this.ctx;
  }

  /**
   * Deep sub-bass kinetic shockwave blast sweep.
   * Sweeps from 140Hz down to 28Hz over 0.65s through a resonant low-pass filter.
   */
  public playShockwaveSound(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.65);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, now);
      filter.frequency.exponentialRampToValueAtTime(45, now + 0.65);
      filter.Q.setValueAtTime(4.5, now);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Audio error suppressed gracefully
    }
  }

  /**
   * Crystalline high-tech collision tick ping.
   * Triangle burst between 880Hz and 1320Hz over 0.06s.
   */
  public playCollisionTick(intensity = 1.0): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.06);

      const targetGain = Math.min(0.12 * Math.max(0.3, intensity), 0.22);
      gain.gain.setValueAtTime(targetGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio error suppressed gracefully
    }
  }

  /**
   * Crisp dual-tone HUD telemetry toggle chirp.
   * 520Hz -> 780Hz when activating, 780Hz -> 440Hz when deactivating.
   */
  public playToggleSound(active: boolean): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";

      if (active) {
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(780, now + 0.04);
      } else {
        osc.frequency.setValueAtTime(780, now);
        osc.frequency.setValueAtTime(440, now + 0.04);
      }

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio error suppressed gracefully
    }
  }

  /**
   * Ascending quantum harmonic sweep.
   * Sweeps from 220Hz up to 880Hz over 0.35s with bandpass resonance.
   */
  public playRecallSound(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(440, now);
      filter.frequency.exponentialRampToValueAtTime(880, now + 0.35);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio error suppressed gracefully
    }
  }
}

export const soundEngine = new SoundEngine();

export const playShockwaveSound = () => soundEngine.playShockwaveSound();
export const playCollisionTick = (intensity?: number) => soundEngine.playCollisionTick(intensity);
export const playToggleSound = (active: boolean) => soundEngine.playToggleSound(active);
export const playRecallSound = () => soundEngine.playRecallSound();
