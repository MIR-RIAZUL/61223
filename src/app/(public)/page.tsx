"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroViewport } from "@/components/portfolio/HeroViewport";
import { LiveCommitTicker } from "@/components/portfolio/LiveCommitTicker";
import { BioLocationCard } from "@/components/portfolio/BioLocationCard";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { IdeaCapsulesGrid } from "@/components/portfolio/IdeaCapsulesGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/icons";
import { 
  INITIAL_PROFILE_BIO, 
  INITIAL_GITHUB_PROJECTS, 
  INITIAL_IDEA_CAPSULES 
} from "@/lib/db";
import { 
  Orbit, 
  Terminal, 
  Radio, 
  ShieldCheck
} from "lucide-react";

export default function PublicPortfolioPage() {
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<string | null>(null);

  const handleSelectCapsule = (id: string) => {
    setSelectedCapsuleId(id);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Cosmic Navigation Bar */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <div className="w-full h-full bg-[#050508] rounded-[10px] flex items-center justify-center">
                <Orbit className="w-4 h-4 text-cyan-400 animate-spin" />
              </div>
            </div>
            <div>
              <span className="font-black text-sm tracking-wider uppercase bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                RIAZUL // DEadEnD
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>DHAKA STATION</span>
                <span>·</span>
                <span className="text-cyan-400">FLUTTER & WASM READY</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/MIR-RIAZUL"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button size="sm" variant="ghost" className="text-xs font-mono gap-1.5 text-slate-300">
                <GithubIcon className="w-3.5 h-3.5" />
                @MIR-RIAZUL
              </Button>
            </a>

            <Link href="/admin">
              <Button size="sm" variant="glow" className="text-xs font-mono gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>ADMIN PANEL</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Anti-Gravity 3D WebGPU & Rapier WASM Physics Viewport */}
        <section aria-label="3D Anti-Gravity Physics Canvas">
          <HeroViewport onSelectCapsule={handleSelectCapsule} />
        </section>

        {/* Live Real-Time GitHub Webhook / Stream Ticker */}
        <section aria-label="Live GitHub Commit Stream">
          <LiveCommitTicker />
        </section>

        {/* Dual Grid: Orbital Bio Telemetry + Idea Capsules */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 w-full">
            <BioLocationCard bio={INITIAL_PROFILE_BIO} />
          </div>

          <div className="lg:col-span-7 w-full space-y-6">
            <IdeaCapsulesGrid
              capsules={INITIAL_IDEA_CAPSULES}
              onSelectCapsule={handleSelectCapsule}
              selectedId={selectedCapsuleId}
            />
          </div>
        </section>

        {/* Core Engineered Repositories Showcase */}
        <section id="projects-section" className="pt-2">
          <ProjectShowcase projects={INITIAL_GITHUB_PROJECTS} />
        </section>
      </main>

      {/* Futuristic Spacecraft Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-[#020204] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Telemetry Link: SECURE // RIAZUL (DEadEnD) // DHAKA, BD</span>
          </div>

          <p className="font-mono text-[11px] text-slate-400">
            © 2026 RIAZUL // DEadEnD. All systems operational.
          </p>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">
              <ShieldCheck className="w-3 h-3 text-emerald-400 mr-1" />
              Turbopack Ready
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
