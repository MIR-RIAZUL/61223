"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Orbit, 
  Cpu, 
  ChevronRight,
  Move3d,
  Terminal,
  Sparkles
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
  const [zeroGravity, setZeroGravity] = useState(true);

  const toggleGravity = () => {
    setZeroGravity((prev) => !prev);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-800/80 bg-[#050508] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      {/* 3D WebGPU & Rapier WASM Canvas */}
      <div className="w-full h-[540px] relative z-0">
        <AntiGravityCanvas
          onSelectCapsule={onSelectCapsule}
          gravity={zeroGravity ? [0, 0, 0] : [0, -4.5, 0]}
        />
      </div>

      {/* Futuristic Floating HUD Overlays */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
          <Badge variant="cyan" className="py-1 px-3">
            <Orbit className="w-3.5 h-3.5 text-[#00f0ff] animate-spin" />
            <span className="font-mono">RIAZUL // DEadEnD</span>
          </Badge>
          <Badge variant="purple" className="py-1 px-3 hidden md:inline-flex">
            <Cpu className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span className="font-mono">FLUTTER & WEBGPU ARCHITECTURE</span>
          </Badge>
          <Badge variant="emerald" className="py-1 px-2.5 hidden sm:inline-flex text-[11px] font-mono">
            <Sparkles className="w-3 h-3 text-emerald-400 mr-1" />
            DHAKA (UTC+6)
          </Badge>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <Button
            size="sm"
            variant={zeroGravity ? "glow" : "outline"}
            onClick={toggleGravity}
            className="text-xs font-mono"
          >
            <Move3d className="w-3.5 h-3.5" />
            {zeroGravity ? "ZERO-G: ACTIVE" : "MICRO-G: RESTORE"}
          </Button>

          <Link href="/admin">
            <Button size="sm" variant="outline" className="text-xs font-mono gap-1">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              ADMIN PANEL
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Hero Callout Banner with HUD Glass */}
      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
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
                const el = document.getElementById("projects-section");
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
