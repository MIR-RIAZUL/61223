"use client";

import { GravityProvider, useGravity } from "@/context/GravityContext";
import { OrbitalNavbar } from "@/components/portfolio/OrbitalNavbar";
import { HeroViewport } from "@/components/portfolio/HeroViewport";
import { LiveCommitTicker } from "@/components/portfolio/LiveCommitTicker";
import { BioLocationCard } from "@/components/portfolio/BioLocationCard";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { IdeaCapsulesGrid } from "@/components/portfolio/IdeaCapsulesGrid";
import { Badge } from "@/components/ui/badge";
import { 
  INITIAL_PROFILE_BIO, 
  INITIAL_GITHUB_PROJECTS, 
  INITIAL_IDEA_CAPSULES 
} from "@/lib/db";
import { 
  Radio, 
  ShieldCheck
} from "lucide-react";

function PortfolioViewportContent() {
  const { selectedCapsuleId, selectCapsule } = useGravity();

  const handleSelectCapsule = (id: string) => {
    selectCapsule(id);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col font-sans">
      {/* Orbital Command HUD Navbar */}
      <OrbitalNavbar />

      {/* Main Viewport Content with Non-Intrusive HUD Scanlines */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Anti-Gravity 3D WebGPU & Rapier WASM Physics Viewport */}
        <section 
          id="viewport" 
          aria-label="3D Anti-Gravity Physics Canvas" 
          className="hud-scanline rounded-3xl overflow-hidden scroll-mt-20"
        >
          <HeroViewport onSelectCapsule={handleSelectCapsule} />
        </section>

        {/* Live Real-Time GitHub Webhook / Stream Ticker */}
        <section 
          id="telemetry" 
          aria-label="Live GitHub Commit Stream"
          className="scroll-mt-20"
        >
          <LiveCommitTicker />
        </section>

        {/* Dual Grid: Orbital Bio Telemetry + Idea Capsules */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 w-full">
            <BioLocationCard bio={INITIAL_PROFILE_BIO} />
          </div>

          <div 
            id="capsules" 
            className="lg:col-span-7 w-full space-y-6 scroll-mt-20"
          >
            <IdeaCapsulesGrid
              capsules={INITIAL_IDEA_CAPSULES}
              onSelectCapsule={handleSelectCapsule}
              selectedId={selectedCapsuleId}
            />
          </div>
        </section>

        {/* Core Engineered Repositories Showcase */}
        <section 
          id="projects" 
          className="pt-2 scroll-mt-20"
        >
          <ProjectShowcase projects={INITIAL_GITHUB_PROJECTS} />
        </section>
      </main>

      {/* Futuristic Spacecraft Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-[#020204] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Radio className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
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

export default function PublicPortfolioPage() {
  return (
    <GravityProvider>
      <PortfolioViewportContent />
    </GravityProvider>
  );
}
