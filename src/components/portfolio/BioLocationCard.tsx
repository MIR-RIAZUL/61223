"use client";

import Image from "next/image";
import { ProfileBio } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/icons";
import { 
  Globe2, 
  Satellite, 
  Orbit, 
  Activity, 
  Compass, 
  Sparkles,
  Layers,
  MapPin,
  ExternalLink
} from "lucide-react";

interface BioLocationCardProps {
  bio: ProfileBio;
}

export function BioLocationCard({ bio }: BioLocationCardProps) {
  return (
    <Card className="glass-panel border-slate-800/80 shadow-2xl overflow-hidden relative group">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-indigo-500/30 p-0.5 bg-gradient-to-tr from-indigo-500 to-cyan-400">
            <Image
              src={bio.avatarUrl}
              alt={bio.name}
              width={64}
              height={64}
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#050508]" />
          </span>
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <CardTitle className="text-xl font-bold text-white tracking-tight">
              {bio.name}
            </CardTitle>
            <Badge variant="cyan">
              <Orbit className="w-3 h-3 animate-spin text-cyan-400" />
              {bio.status}
            </Badge>
          </div>
          <a
            href={`https://github.com/${bio.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-indigo-300 hover:text-cyan-300 truncate inline-flex items-center gap-1 transition-colors w-fit"
          >
            @{bio.handle}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">{bio.role}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-0">
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          {bio.bio}
        </p>

        {/* Orbital Location Telemetry */}
        <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
              <Satellite className="w-3.5 h-3.5" />
              TELEMETRY & GEOLOCATION
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              {bio.location.timezone}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="flex flex-col bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
              <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400" />
                Station Base
              </span>
              <span className="text-slate-200 font-semibold truncate mt-0.5">
                {bio.location.city}
              </span>
              <span className="text-[10px] text-slate-400">
                {bio.location.country} ({bio.location.countryCode})
              </span>
            </div>

            <div className="flex flex-col bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
              <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                <Compass className="w-3 h-3 text-emerald-400" />
                Coordinates & Velocity
              </span>
              <span className="text-slate-200 font-semibold truncate mt-0.5">
                {bio.location.coordinates.latitude}° N, {bio.location.coordinates.longitude}° E
              </span>
              <span className="text-[10px] text-cyan-400">
                {bio.location.orbitalVelocityKmh.toLocaleString()} km/h · LEO
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-col items-center">
            <GithubIcon className="w-3.5 h-3.5 text-slate-400 mb-1" />
            <span className="text-base font-bold text-white font-mono">
              {bio.stats.totalCommits.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 uppercase">Commits</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-col items-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 mb-1" />
            <span className="text-base font-bold text-white font-mono">
              {bio.stats.githubStars.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 uppercase">Stars</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-col items-center">
            <Layers className="w-3.5 h-3.5 text-cyan-400 mb-1" />
            <span className="text-base font-bold text-white font-mono">
              {bio.stats.publicRepos}
            </span>
            <span className="text-[10px] text-slate-400 uppercase">Repos</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-col items-center">
            <Activity className="w-3.5 h-3.5 text-indigo-400 mb-1" />
            <span className="text-base font-bold text-white font-mono">
              {bio.stats.experienceYears}y
            </span>
            <span className="text-[10px] text-slate-400 uppercase">Exp</span>
          </div>
        </div>

        {/* Skills Tag Cloud */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
              Core Competencies
            </span>
          </div>
          <div className="space-y-2">
            {bio.skills.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
                  {skillGroup.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item) => (
                    <Badge key={item} variant="outline" className="text-[11px] py-0.5">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
