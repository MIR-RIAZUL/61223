"use client";

import { useState } from "react";
import { PhysicsConfig } from "@/types";
import { DEFAULT_PHYSICS_CONFIG } from "@/lib/physics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sliders, RotateCcw, Save, Check } from "lucide-react";

interface PhysicsControlsProps {
  onUpdateConfig?: (config: PhysicsConfig) => void;
}

export function PhysicsControls({ onUpdateConfig }: PhysicsControlsProps) {
  const [config, setConfig] = useState<PhysicsConfig>(DEFAULT_PHYSICS_CONFIG);
  const [saved, setSaved] = useState(false);

  const handleSliderChange = (
    key: keyof PhysicsConfig,
    value: number | boolean | string
  ) => {
    const updated = { ...config, [key]: value };
    setConfig(updated);
    onUpdateConfig?.(updated);
  };

  const handleGravityChange = (axis: 0 | 1 | 2, val: number) => {
    const updatedGravity = [...config.gravity] as [number, number, number];
    updatedGravity[axis] = val;
    const updated = { ...config, gravity: updatedGravity };
    setConfig(updated);
    onUpdateConfig?.(updated);
  };

  const handleReset = () => {
    setConfig(DEFAULT_PHYSICS_CONFIG);
    onUpdateConfig?.(DEFAULT_PHYSICS_CONFIG);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="glass-panel border-slate-800/80">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            Rust WASM Physics Configuration
          </CardTitle>
          <p className="text-xs text-slate-400">
            Tune real-time Rapier simulation parameters and WebGPU rendering constraints
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={config.zeroGravity ? "cyan" : "amber"}>
            {config.zeroGravity ? "ZERO-GRAVITY ON" : "MICRO-GRAVITY"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* Gravity Vector Controls */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300 flex justify-between">
            <span>Gravity Vector (X, Y, Z)</span>
            <span className="text-cyan-400">
              [{config.gravity[0]}, {config.gravity[1]}, {config.gravity[2]}]
            </span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-xs font-mono text-slate-400">X:</span>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={config.gravity[0]}
                onChange={(e) => handleGravityChange(0, parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-xs font-mono text-slate-400">Y:</span>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={config.gravity[1]}
                onChange={(e) => handleGravityChange(1, parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-xs font-mono text-slate-400">Z:</span>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={config.gravity[2]}
                onChange={(e) => handleGravityChange(2, parseFloat(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Restitution and Friction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Restitution (Bounciness)</span>
              <span className="text-indigo-400">{config.restitution.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={config.restitution}
              onChange={(e) =>
                handleSliderChange("restitution", parseFloat(e.target.value))
              }
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Linear Damping</span>
              <span className="text-cyan-400">{config.linearDamping.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={config.linearDamping}
              onChange={(e) =>
                handleSliderChange("linearDamping", parseFloat(e.target.value))
              }
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Repulsion Force</span>
              <span className="text-purple-400">{config.repulsionForce.toFixed(1)} N</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={config.repulsionForce}
              onChange={(e) =>
                handleSliderChange("repulsionForce", parseFloat(e.target.value))
              }
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Particle Field Density</span>
              <span className="text-emerald-400">{config.spaceFieldDensity}</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={config.spaceFieldDensity}
              onChange={(e) =>
                handleSliderChange("spaceFieldDensity", parseInt(e.target.value, 10))
              }
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="text-xs font-mono text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Restore Zero-G Default
          </Button>

          <Button
            size="sm"
            variant={saved ? "outline" : "default"}
            onClick={handleSave}
            className="text-xs font-mono"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Applied to WASM Memory
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 mr-1" />
                Commit Parameters
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
