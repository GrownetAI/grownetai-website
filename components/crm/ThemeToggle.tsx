"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/** Light/dark switch. Segmented on lg, single icon-button on small screens. */
export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, toggleTheme } = useTheme();

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="w-9 h-9 grid place-items-center rounded-lg border border-line text-fg-muted hover:text-fg hover:bg-elevated transition-colors"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    );
  }

  const opt =
    "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors";
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg border border-line bg-panel">
      <button
        onClick={() => setTheme("light")}
        className={cn(opt, theme === "light" ? "bg-primary/12 text-primary" : "text-fg-muted hover:text-fg")}
        aria-pressed={theme === "light"}
      >
        <Sun className="w-3.5 h-3.5" /> Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(opt, theme === "dark" ? "bg-primary/20 text-accent" : "text-fg-muted hover:text-fg")}
        aria-pressed={theme === "dark"}
      >
        <Moon className="w-3.5 h-3.5" /> Dark
      </button>
    </div>
  );
}
