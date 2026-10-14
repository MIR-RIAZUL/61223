"use client";

import { IdeaCapsule } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Atom, Flame, Eye } from "lucide-react";

interface IdeaCapsulesGridProps {
  capsules: IdeaCapsule[];
  onSelectCapsule?: (id: string) => void;
  selectedId?: string | null;
}

export function IdeaCapsulesGrid({
  capsules,
  onSelectCapsule,
  selectedId,
}: IdeaCapsulesGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold font-display text-slate-100 flex items-center gap-2">
            <Atom className="w-5 h-5 text-[#00f0ff]" />
            Zero-G Idea Capsules
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            Interactive physics concepts synchronized with the 3D WebGPU Rapier canvas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {capsules.map((capsule) => {
          const isSelected = selectedId === capsule.id;

          return (
            <Card
              key={capsule.id}
              onClick={() => onSelectCapsule?.(capsule.id)}
              className={`cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                isSelected
                  ? "hud-glass border-[#00f0ff] scale-[1.02] shadow-[0_0_25px_rgba(0,240,255,0.25)]"
                  : "hud-glass hover:border-slate-700 hover:scale-[1.01]"
              }`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: capsule.colorTheme }}
              />

              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="purple" className="text-[10px]">
                    {capsule.category}
                  </Badge>
                  <span className="text-[11px] font-mono text-[#00f0ff] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#00f0ff]" />
                    Resonance: {capsule.metrics.resonance}%
                  </span>
                </div>

                <CardTitle className="text-base font-bold font-display text-white group-hover:text-[#00f0ff] transition-colors">
                  {capsule.title}
                </CardTitle>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {capsule.summary}
                </p>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-rose-400" />
                    Ignitions: {capsule.metrics.ignitions}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#8b5cf6]" />
                    Views: {capsule.metrics.views}
                  </span>
                  <span className="text-[10px] uppercase text-emerald-400">
                    State: {capsule.state}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
