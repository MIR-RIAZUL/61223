import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names safely with tailwind-merge and clsx.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format relative timestamps (e.g., "2m ago", "just now").
 * Safely accepts an optional reference time for SSR prerender determinism.
 */
export function formatTimeAgo(dateString: string, currentMs?: number): string {
  if (!currentMs) return "recently";
  const date = new Date(dateString);
  const seconds = Math.max(0, Math.floor((currentMs - date.getTime()) / 1000));

  if (seconds < 30) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
