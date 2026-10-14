"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PhysicsControls } from "./PhysicsControls";
import { WebhookStatus } from "./WebhookStatus";
import { INITIAL_ADMIN_TELEMETRY, INITIAL_IDEA_CAPSULES } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Activity, 
  Layers, 
  PlusCircle,
  Atom,
  Terminal,
  Zap
} from "lucide-react";

export function AdminDashboard() {
  const [telemetry] = useState(INITIAL_ADMIN_TELEMETRY);
  const [capsules, setCapsules] = useState(INITIAL_IDEA_CAPSULES);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("wasm-physics");
  const [newSummary, setNewSummary] = useState("");

  const handleAddCapsule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCapsule = {
      id: `capsule-${Date.now()}`,
      title: newTitle,
      category: newCategory as "wasm-physics",
      summary: newSummary || "Synthesized zero-gravity knowledge capsule.",
      content: "Details and execution trace logged in admin terminal.",
      tags: ["Admin", newCategory],
      gravity: 0,
      state: "ignited" as const,
      metrics: { resonance: 99, mass: 1.1, views: 1, ignitions: 1 },
      colorTheme: "#6366f1",
      author: "Admin In-Orbit",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCapsules([newCapsule, ...capsules]);
    setNewTitle("");
    setNewSummary("");
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 p-4 sm:p-8 space-y-8 cosmic-grid">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button size="sm" variant="outline" className="text-xs font-mono">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Return to Viewport
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                Anti-Gravity Control Matrix
              </h1>
              <Badge variant="emerald" className="font-mono text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                AUTHENTICATED
              </Badge>
            </div>
            <p className="text-xs text-slate-400">
              Central command for Rapier physics configuration, WebGPU buffers, and GitHub webhooks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            NODE STATUS: {telemetry.serverStatus.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Real-Time System Metrics HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="glass-panel border-slate-800/80 p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase">System Uptime</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {Math.floor(telemetry.uptimeSeconds / 3600)}h {Math.floor((telemetry.uptimeSeconds % 3600) / 60)}m
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">99.98% availability</span>
        </Card>

        <Card className="glass-panel border-slate-800/80 p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase">Heap Memory</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {telemetry.memoryUsageMb} MB
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Node.js V8 Optimized</span>
        </Card>

        <Card className="glass-panel border-slate-800/80 p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase">Rapier RigidBodies</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {telemetry.activePhysicsBodies}
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">SIMD Active</span>
        </Card>

        <Card className="glass-panel border-slate-800/80 p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase">Target Framerate</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {telemetry.fpsTarget} FPS
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">vsync locked</span>
        </Card>
      </div>

      {/* Physics & Webhook Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PhysicsControls />
        <WebhookStatus
          lastEventTimestamp={telemetry.lastWebhookTimestamp}
          totalEvents={telemetry.totalWebhooksReceived}
        />
      </div>

      {/* Idea Capsule Ingestion & Management */}
      <Card className="glass-panel border-slate-800/80">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Atom className="w-4 h-4 text-purple-400" />
              Idea Capsule Ingestion Matrix
            </CardTitle>
            <p className="text-xs text-slate-400">
              Create and ignite new floating capsules into the zero-gravity simulation
            </p>
          </div>
          <Badge variant="purple">ACTIVE CAPSULES: {capsules.length}</Badge>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <form onSubmit={handleAddCapsule} className="space-y-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Capsule Title (e.g., Lattice Crypto Mesh)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                required
              />

              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="wasm-physics">WASM Physics</option>
                <option value="webgpu-shaders">WebGPU Shaders</option>
                <option value="distributed-mesh">Distributed Mesh</option>
                <option value="quantum-crypto">Quantum Crypto</option>
                <option value="ai-agents">Autonomous AI</option>
              </select>

              <Button type="submit" size="sm" variant="default" className="text-xs font-mono">
                <PlusCircle className="w-3.5 h-3.5 mr-1" />
                Ignite New Capsule
              </Button>
            </div>

            <input
              type="text"
              placeholder="Short summary of technical thesis..."
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </form>

          {/* List of active capsules in admin */}
          <div className="space-y-2">
            <h5 className="text-xs font-mono text-slate-400 uppercase">
              Current Synced Capsules
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {capsules.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200 truncate">{c.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400">
                      {c.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{c.summary}</p>
                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400">
                    <span className="text-emerald-400">STATE: {c.state}</span>
                    <span className="flex items-center gap-1 text-purple-400">
                      <Zap className="w-3 h-3" /> {c.metrics.resonance}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
