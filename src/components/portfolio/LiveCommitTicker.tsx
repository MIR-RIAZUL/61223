"use client";

import { useEffect, useState } from "react";
import { LiveGithubCommit } from "@/types";
import { INITIAL_COMMITS } from "@/lib/db";
import { formatTimeAgo } from "@/lib/utils";
import { GitCommit, GitBranch, Radio, Plus, Minus, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LiveCommitTicker() {
  const [commits, setCommits] = useState<LiveGithubCommit[]>(INITIAL_COMMITS);
  const [connected, setConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | undefined>(undefined);

  useEffect(() => {
    setCurrentTime(Date.now());
    const interval = setInterval(() => setCurrentTime(Date.now()), 15000);

    let eventSource: EventSource | null = null;

    try {
      eventSource = new EventSource("/api/github/stream");

      eventSource.onopen = () => {
        setConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const newCommit: LiveGithubCommit = JSON.parse(event.data);
          setCommits((prev) => [newCommit, ...prev.slice(0, 5)]);
        } catch {
          // ignore parse errors
        }
      };

      eventSource.onerror = () => {
        setConnected(false);
      };
    } catch {
      setConnected(false);
    }

    return () => {
      clearInterval(interval);
      eventSource?.close();
    };
  }, []);

  return (
    <div className="w-full hud-glass rounded-2xl border-slate-800/80 p-4 relative overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff]">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-display text-slate-100 flex items-center gap-2">
              Live GitHub Telemetry Stream
            </h4>
            <p className="text-[11px] font-mono text-slate-400">
              Webhooks & Server-Sent Events pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-900/80 border border-slate-800">
            <span
              className={`w-2 h-2 rounded-full ${
                connected ? "bg-emerald-400 animate-pulse" : "bg-[#00f0ff] animate-ping"
              }`}
            />
            <Radio className="w-3 h-3 text-[#00f0ff]" />
            {connected ? "STREAM LIVE" : "SSE READY"}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {commits.slice(0, 3).map((commit) => (
            <motion.div
              key={commit.id}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/60 hover:border-[#00f0ff]/30 transition-all gap-2"
            >
              <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                <div className="flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#a78bfa]">
                  <GitBranch className="w-3 h-3 text-[#00f0ff]" />
                  {commit.shortSha}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-200 truncate group-hover:text-white">
                    {commit.message}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                    <span className="text-[#00f0ff]">{commit.repository}</span>
                    <span>·</span>
                    <span>{commit.branch}</span>
                    <span>·</span>
                    <span>{commit.author.username}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/40">
                <div className="flex items-center gap-1 text-[11px] font-mono">
                  <span className="text-emerald-400 flex items-center">
                    <Plus className="w-3 h-3" />
                    {commit.stats.additions}
                  </span>
                  <span className="text-rose-400 flex items-center">
                    <Minus className="w-3 h-3" />
                    {commit.stats.deletions}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {formatTimeAgo(commit.timestamp, currentTime)}
                </span>
                <a
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#00f0ff] p-1 transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
