"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGravity } from "@/context/GravityContext";
import { INITIAL_IDEA_CAPSULES } from "@/lib/db";
import { 
  Orbit, 
  Cpu, 
  ChevronRight, 
  Move3d, 
  Terminal, 
  Sparkles, 
  Zap, 
  Radio, 
  Activity,
  RotateCcw,
  Share2,
  X 
} from "lucide-react";

// Dynamically import the AntiGravityCanvas to prevent SSR window/webgl evaluation
const AntiGravityCanvas = dynamic(
  () =>
    import("@/components/canvas/AntiGravityCanvas").then(
      (mod) => mod.AntiGravityCanvas
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#050508] text-slate-400 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase">
          Synthesizing Zero-G Mesh...
        </span>
      </div>
    ),
  }
);

interface HeroViewportProps {
  onSelectCapsule?: (id: string) => void;
}

export function HeroViewport({ onSelectCapsule }: HeroViewportProps) {
  const { 
    isZeroGravity, 
    toggleZeroGravity, 
    triggerShockwave, 
    physicsConfig,
    cursorForceEnabled,
    toggleCursorForce,
    selectedCapsuleId,
    selectCapsule,
    formationMode,
    setFormationMode,
    collisionCount,
    resetSimulation,
    tethersEnabled,
    toggleTethers,
  } = useGravity();

  const [fps, setFps] = useState<number>(60);

  // High-precision live client FPS telemetry monitor
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 500) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const activeCapsule = INITIAL_IDEA_CAPSULES.find(
    (c) => c.id === selectedCapsuleId
  );

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-800/80 bg-[#050508] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      {/* 3D WebGPU & Rapier WASM Canvas */}
      <div className="w-full h-[540px] relative z-0">
        <AntiGravityCanvas
          onSelectCapsule={onSelectCapsule}
          gravity={physicsConfig.gravity}
        />
      </div>

      {/* Futuristic Floating HUD Overlays */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 pointer-events-none">
        {/* Left Section: Badges & Segmented Formation Switcher */}
        <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
          <Badge variant="cyan" className="py-1 px-3">
            <Orbit className="w-3.5 h-3.5 text-[#00f0ff] animate-spin" />
            <span className="font-mono">RIAZUL // DEadEnD</span>
          </Badge>
          <Badge variant="purple" className="py-1 px-3 hidden sm:inline-flex">
            <Cpu className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span className="font-mono">FLUTTER & WEBGPU</span>
          </Badge>
          <Badge variant="emerald" className="py-1 px-2.5 hidden md:inline-flex text-[11px] font-mono">
            <Sparkles className="w-3 h-3 text-emerald-400 mr-1" />
            DHAKA (UTC+6)
          </Badge>

          {/* Sleek Segmented HUD Formation Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-md font-mono text-[10px] sm:text-[11px] shadow-inner">
            <button
              onClick={() => setFormationMode("free-drift")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                formationMode === "free-drift"
                  ? "bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.3)] font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              FREE DRIFT
            </button>
            <button
              onClick={() => setFormationMode("orbital-ring")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                formationMode === "orbital-ring"
                  ? "bg-[#8b5cf6]/25 text-[#c084fc] border border-[#8b5cf6]/50 shadow-[0_0_10px_rgba(139,92,246,0.3)] font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              ORBITAL RING
            </button>
            <button
              onClick={() => setFormationMode("vortex-well")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                formationMode === "vortex-well"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)] font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              VORTEX WELL
            </button>
          </div>
        </div>

        {/* Right Section: Telemetry & Controls */}
        <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
          {/* Live Collisions / Impacts Counter */}
          <Badge
            variant="outline"
            className={`py-1 px-2.5 text-[11px] font-mono border-amber-500/40 text-amber-400 bg-amber-500/10 transition-all ${
              collisionCount > 0 ? "animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.35)]" : ""
            }`}
          >
            <Activity className="w-3 h-3 text-amber-400 mr-1" />
            IMPACTS: {collisionCount}
          </Badge>

          {/* 3D Cursor Force Field Toggle */}
          <Button
            size="sm"
            variant={cursorForceEnabled ? "glow" : "outline"}
            onClick={toggleCursorForce}
            className="text-xs font-mono gap-1"
            title="Toggle 3D Kinematic Cursor Force-Field"
          >
            <Radio className={`w-3.5 h-3.5 ${cursorForceEnabled ? "text-[#00f0ff] animate-pulse" : "text-slate-400"}`} />
            <span className="hidden sm:inline">{cursorForceEnabled ? "FORCE FIELD: ON" : "FORCE FIELD: OFF"}</span>
            <span className="sm:hidden">{cursorForceEnabled ? "FORCE: ON" : "FORCE: OFF"}</span>
          </Button>

          {/* 3D Orbital Energy Tether Beams Toggle */}
          <Button
            size="sm"
            variant={tethersEnabled ? "glow" : "outline"}
            onClick={toggleTethers}
            className="text-xs font-mono gap-1 text-[#00f0ff] border-[#00f0ff]/40 hover:bg-[#00f0ff]/10"
            title="Toggle 3D Orbital Energy Tether Beams"
          >
            <Share2 className={`w-3.5 h-3.5 ${tethersEnabled ? "text-[#00f0ff]" : "text-slate-400"}`} />
            <span className="hidden sm:inline">{tethersEnabled ? "TETHERS: ON" : "TETHERS: OFF"}</span>
            <span className="sm:hidden">{tethersEnabled ? "TETHERS: ON" : "TETHERS: OFF"}</span>
          </Button>

          {/* Orbit Re-Center Recall */}
          <Button
            size="sm"
            variant="outline"
            onClick={resetSimulation}
            className="text-xs font-mono gap-1 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/10"
            title="Recall all capsules to initial orbit positions"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">RE-CENTER</span>
          </Button>

          {/* Kinetic Shockwave Impulse Trigger */}
          <Button
            size="sm"
            variant="outline"
            onClick={triggerShockwave}
            className="text-xs font-mono gap-1 text-[#00f0ff] border-[#00f0ff]/40 hover:bg-[#00f0ff]/10"
            title="Broadcast kinetic shockwave impulse"
          >
            <Zap className="w-3.5 h-3.5 text-[#00f0ff]" />
            PULSE WAVE
          </Button>

          {/* Zero-G Toggle */}
          <Button
            size="sm"
            variant={isZeroGravity ? "glow" : "outline"}
            onClick={toggleZeroGravity}
            className="text-xs font-mono gap-1"
          >
            <Move3d className="w-3.5 h-3.5" />
            {isZeroGravity ? "0G WEIGHTLESS" : "1G LOCKED"}
          </Button>

          {/* Admin Panel Link */}
          <Link href="/admin">
            <Button size="sm" variant="outline" className="text-xs font-mono gap-1 hidden md:inline-flex">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              ADMIN PANEL
            </Button>
          </Link>
        </div>
      </div>

      {/* Interactive HUD Capsule Telemetry Inspector */}
      {activeCapsule && (
        <div className="absolute top-20 right-4 z-20 w-72 sm:w-80 hud-glass rounded-2xl p-4 border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.25)] animate-in fade-in duration-300">
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#00f0ff]">
                CAPSULE TELEMETRY // {activeCapsule.category}
              </span>
              <h4 className="text-sm font-bold font-display text-white">
                {activeCapsule.title}
              </h4>
            </div>
            <button
              onClick={() => selectCapsule(null)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Close Inspector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2 line-clamp-2">
            {activeCapsule.summary}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">MASS</span>
              <span className="text-white font-semibold">{activeCapsule.metrics.mass} kg</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">RESONANCE</span>
              <span className="text-[#00f0ff] font-semibold">{activeCapsule.metrics.resonance}%</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {activeCapsule.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Hero Callout Banner & Micro-Telemetry Strip with HUD Glass */}
      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex flex-col gap-2.5">
        {/* JetBrains Mono Micro-Telemetry Readout Strip */}
        <div className="pointer-events-auto flex items-center justify-between gap-3 px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-800/80 backdrop-blur-md font-mono text-[10px] sm:text-[11px] text-slate-400 shadow-md flex-wrap">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#00f0ff] font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              PHYSICS TELEMETRY
            </span>
            <span className="text-slate-700 hidden xs:inline">|</span>
            <span className="text-emerald-400 font-bold tracking-wider">{fps} FPS</span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="hidden sm:inline">
              RIGID BODIES: <strong className="text-slate-200">{INITIAL_IDEA_CAPSULES.length + 1}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <span>
              GRAVITY VECTOR:{" "}
              <strong className={isZeroGravity ? "text-[#00f0ff]" : "text-amber-400"}>
                [{physicsConfig.gravity.map((v) => v.toFixed(2)).join(", ")}]
              </strong>
            </span>
            <span className="text-slate-700 hidden md:inline">|</span>
            <span className="hidden md:inline">
              FORMATION: <strong className="text-purple-400 uppercase">{formationMode}</strong>
            </span>
            <span className="text-slate-700 hidden lg:inline">|</span>
            <span className="hidden lg:inline text-slate-500">
              TETHERS:{" "}
              <strong className={tethersEnabled ? "text-[#00f0ff]" : "text-slate-500"}>
                {tethersEnabled ? "ACTIVE" : "OFF"}
              </strong>
            </span>
          </div>
        </div>

        <div className="hud-glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-auto border-[#00f0ff]/25 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest text-[#00f0ff] uppercase">
                RIAZUL // CALLSIGN: DEadEnD
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display text-glow-cyan">
              Full-Stack Web, Mobile Apps & Zero-Gravity Physics
            </h1>
            <p className="text-xs text-slate-300 max-w-xl font-sans">
              Engineered with Cross-Platform Flutter, Next.js WebGPU, and Rust WebAssembly physics.
              Live telemetry anchored from Badda, Dhaka, Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                const el = document.getElementById("projects") || document.getElementById("projects-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-mono"
            >
              Explore Ecosystem
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
