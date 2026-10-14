import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "cyan" | "purple" | "emerald" | "amber" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#8b5cf6]/15 text-[#a78bfa] border-[#8b5cf6]/40 shadow-[0_0_10px_rgba(139,92,246,0.15)]",
    cyan: "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]",
    purple: "bg-[#8b5cf6]/10 text-[#a78bfa] border-[#8b5cf6]/40 shadow-[0_0_12px_rgba(139,92,246,0.2)]",
    emerald: "bg-[#10b981]/10 text-[#34d399] border-[#10b981]/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    amber: "bg-[#f59e0b]/10 text-[#fbbf24] border-[#f59e0b]/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    outline: "border-slate-800 text-slate-300 bg-slate-950/60",
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
