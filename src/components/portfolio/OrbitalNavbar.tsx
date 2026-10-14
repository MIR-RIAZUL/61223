"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useGravity } from "@/context/GravityContext";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";
import { 
  Orbit, 
  Terminal, 
  Move3d, 
  Zap, 
  Clock 
} from "lucide-react";

export function OrbitalNavbar() {
  const { isZeroGravity, toggleZeroGravity, triggerShockwave } = useGravity();
  const [dhakaTime, setDhakaTime] = useState<string>("DHAKA 00:00:00 UTC+6");
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setDhakaTime(`DHAKA ${formatter.format(new Date())} UTC+6`);
      } catch {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const dhakaDate = new Date(utc + 3600000 * 6);
        const h = String(dhakaDate.getHours()).padStart(2, "0");
        const m = String(dhakaDate.getMinutes()).padStart(2, "0");
        const s = String(dhakaDate.getSeconds()).padStart(2, "0");
        setDhakaTime(`DHAKA ${h}:${m}:${s} UTC+6`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShockwavePulse = () => {
    setPulseActive(true);
    triggerShockwave();
    setTimeout(() => setPulseActive(false), 600);
  };

  return (
    <header className="sticky top-0 z-50 w-full hud-glass border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section: RIAZUL // DEadEnD Emblem & Geo Telemetry */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="#viewport" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00f0ff] via-indigo-500 to-[#8b5cf6] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.35)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all">
              <div className="w-full h-full bg-[#050508] rounded-[10px] flex items-center justify-center">
                <Orbit className="w-4 h-4 text-[#00f0ff] animate-spin" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase bg-gradient-to-r from-white via-slate-100 to-[#00f0ff] bg-clip-text text-transparent text-glow-cyan">
                  RIAZUL // DEadEnD
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px] text-slate-400 tracking-tight">
                BADDA, DHAKA • 23.78°N 90.42°E
              </span>
            </div>
          </Link>
        </div>

        {/* Center Section: Mission Clock & Quick Navigation Anchors */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Live Ticking Dhaka Mission Clock */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e111f]/80 border border-slate-800/90 text-slate-300 font-mono text-xs shadow-inner">
            <Clock className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
            <span suppressHydrationWarning className="tracking-wide text-slate-200">
              {dhakaTime}
            </span>
          </div>

          {/* Quick Navigation Anchors */}
          <nav className="flex items-center gap-1 text-xs font-mono text-slate-400">
            <a
              href="#viewport"
              className="px-2.5 py-1 rounded-md hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-colors"
            >
              #viewport
            </a>
            <a
              href="#telemetry"
              className="px-2.5 py-1 rounded-md hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-colors"
            >
              #telemetry
            </a>
            <a
              href="#capsules"
              className="px-2.5 py-1 rounded-md hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-colors"
            >
              #capsules
            </a>
            <a
              href="#projects"
              className="px-2.5 py-1 rounded-md hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-colors"
            >
              #projects
            </a>
          </nav>
        </div>

        {/* Right Section: Zero-G Toggle, Shockwave Pulse & Links */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Kinetic Shockwave Impulse Trigger */}
          <Button
            size="sm"
            variant="outline"
            onClick={handleShockwavePulse}
            className={`text-xs font-mono gap-1 border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/15 transition-all ${
              pulseActive
                ? "bg-[#00f0ff]/30 border-[#00f0ff] scale-95 shadow-[0_0_20px_rgba(0,240,255,0.7)]"
                : ""
            }`}
            title="Broadcast kinetic shockwave impulse to all 3D bodies"
          >
            <Zap className={`w-3.5 h-3.5 ${pulseActive ? "animate-bounce" : ""}`} />
            <span className="hidden sm:inline">PULSE WAVE</span>
          </Button>

          {/* Zero-G / 1G Gravity Lock Toggle */}
          <Button
            size="sm"
            variant={isZeroGravity ? "glow" : "outline"}
            onClick={toggleZeroGravity}
            className="text-xs font-mono gap-1"
            title="Toggle between Zero Gravity and Earth Gravity"
          >
            <Move3d className="w-3.5 h-3.5" />
            <span>{isZeroGravity ? "0G WEIGHTLESS" : "1G LOCKED"}</span>
          </Button>

          {/* Admin Matrix Link */}
          <Link href="/admin">
            <Button
              size="sm"
              variant="outline"
              className="text-xs font-mono gap-1 hidden md:inline-flex border-slate-700/80 hover:border-indigo-500/80 hover:text-indigo-400"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>ADMIN MATRIX</span>
            </Button>
          </Link>

          {/* External GitHub Link */}
          <a
            href="https://github.com/MIR-RIAZUL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile @MIR-RIAZUL"
          >
            <Button
              size="sm"
              variant="ghost"
              className="text-xs font-mono gap-1.5 text-slate-300 hover:text-[#00f0ff] px-2 sm:px-3"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">@MIR-RIAZUL</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
