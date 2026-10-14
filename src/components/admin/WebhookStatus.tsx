"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Webhook, Radio, Send, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

interface WebhookStatusProps {
  lastEventTimestamp?: string | null;
  totalEvents?: number;
}

export function WebhookStatus({
  lastEventTimestamp = new Date().toISOString(),
  totalEvents = 142,
}: WebhookStatusProps) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const triggerTestWebhook = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      const mockPayload = {
        ref: "refs/heads/main",
        repository: {
          name: "antigravity-engine",
          html_url: "https://github.com/stellar-core/antigravity-engine",
        },
        head_commit: {
          id: `test-${Math.random().toString(16).substring(2, 10)}`,
          message: "test(sim): live zero-gravity telemetry impulse test",
          timestamp: new Date().toISOString(),
          url: "https://github.com/stellar-core/antigravity-engine",
          added: ["src/wasm/physics_simd.rs"],
          removed: [],
          modified: ["src/shaders/webgpu_particles.wgsl"],
          author: {
            name: "Admin Tester",
          },
        },
        sender: {
          login: "anti-gravity-admin",
          avatar_url:
            "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80",
        },
      };

      const res = await fetch("/api/github/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Event": "push",
        },
        body: JSON.stringify(mockPayload),
      });

      const data = await res.json();
      if (res.ok) {
        setTestResult(`Success! Dispatched event ${data.commit?.shortSha ?? "OK"} to stream subscribers.`);
      } else {
        setTestResult(`Error: ${data.error ?? "Failed to dispatch"}`);
      }
    } catch {
      setTestResult("Network error testing webhook endpoint.");
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="glass-panel border-slate-800/80">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <Webhook className="w-4 h-4 text-cyan-400" />
            GitHub Webhook Pipeline Telemetry
          </CardTitle>
          <p className="text-xs text-slate-400">
            Real-time ingestion for GitHub push events and zero-gravity impulse broadcasts
          </p>
        </div>
        <Badge variant="cyan" className="flex items-center gap-1 font-mono">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          LISTENING (POST & SSE)
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              Webhook Ingress Route
            </span>
            <div className="text-xs font-mono text-slate-200 mt-1 truncate">
              /api/github/webhook
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
              <ShieldCheck className="w-3 h-3" /> HMAC SHA256 Ready
            </div>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              Live Stream Broadcast Route
            </span>
            <div className="text-xs font-mono text-slate-200 mt-1 truncate">
              /api/github/stream
            </div>
            <div className="text-[10px] text-cyan-400 mt-1 font-mono">
              Server-Sent Events (SSE)
            </div>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              Events Processed
            </span>
            <div className="text-base font-bold font-mono text-white mt-0.5">
              {totalEvents.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 font-mono truncate">
              <Clock className="w-3 h-3 text-slate-400" />
              {lastEventTimestamp ? new Date(lastEventTimestamp).toLocaleTimeString() : "Idle"}
            </div>
          </div>
        </div>

        {/* Test Trigger Section */}
        <div className="p-3.5 rounded-xl bg-slate-900/30 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h5 className="text-xs font-semibold text-slate-200">
              Simulate Live GitHub Push Webhook
            </h5>
            <p className="text-[11px] text-slate-400">
              Dispatches a simulated commit payload to trigger zero-g physics impulses across active clients.
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={triggerTestWebhook}
            disabled={testing}
            className="text-xs font-mono shrink-0"
          >
            <Send className="w-3.5 h-3.5 mr-1 text-indigo-400" />
            {testing ? "Broadcasting..." : "Dispatch Test Event"}
          </Button>
        </div>

        {testResult && (
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{testResult}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
