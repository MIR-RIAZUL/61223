import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "glow" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-lg shadow-[#8b5cf6]/30 border border-[#8b5cf6]/30 font-medium",
      outline:
        "border border-slate-700/80 bg-slate-900/50 hover:bg-slate-800/80 hover:border-slate-600 text-slate-200",
      glow: "border border-[#00f0ff]/50 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] font-mono",
      ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
      danger:
        "bg-rose-600/80 hover:bg-rose-500 text-white border border-rose-500/30 shadow-lg shadow-rose-600/20",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
