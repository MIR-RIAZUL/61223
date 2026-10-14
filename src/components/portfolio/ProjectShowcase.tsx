"use client";

import { GithubProject } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, GitFork, ExternalLink, Code2, ShieldAlert } from "lucide-react";

interface ProjectShowcaseProps {
  projects: GithubProject[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            Core Engineered Repositories
          </h3>
          <p className="text-xs text-slate-400">
            High-velocity systems, WebGPU pipelines, and distributed zero-gravity runtimes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="glass-panel border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    project.language === "Rust"
                      ? "amber"
                      : project.language === "TypeScript"
                      ? "cyan"
                      : "purple"
                  }
                >
                  {project.language}
                </Badge>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    {project.starsCount.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    {project.forksCount}
                  </span>
                </div>
              </div>

              <CardTitle className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {project.name}
              </CardTitle>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {project.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-1">
                {project.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                  >
                    #{topic}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-cyan-400" />
                  Health: {project.metrics.healthScore}%
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(project.htmlUrl, "_blank")}
                  className="text-xs h-7"
                >
                  Explore Repo
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
