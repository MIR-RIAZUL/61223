import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "cyan" | "purple" | "emerald" | "amber" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-indigo-950/70 text-indigo-300 border-indigo-700/50",
    cyan: "bg-cyan-950/70 text-cyan-300 border-cyan-700/50 shadow-[0_0_10px_rgba(6,182,212,0.15)]",
    purple: "bg-purple-950/70 text-purple-300 border-purple-700/50 shadow-[0_0_10px_rgba(168,85,247,0.15)]",
    emerald: "bg-emerald-950/70 text-emerald-300 border-emerald-700/50",
    amber: "bg-amber-950/70 text-amber-300 border-amber-700/50",
    outline: "border-slate-700/70 text-slate-300 bg-slate-900/40",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border backdrop-blur-md transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
