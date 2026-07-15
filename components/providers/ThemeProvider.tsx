"use client";

/**
 * Theme system for the CRM/dashboard.
 *
 * The `.dark` class goes on BOTH `<html>` and every `[data-theme-root]`.
 * `<html>` is what makes portalled UI work: Radix drawers/dropdowns and the
 * react-hot-toast <Toaster> mount to <body>, OUTSIDE the shell, so when the
 * class lived only on the shell div they all rendered light inside a dark app
 * (Drawer.tsx had to hand-reapply the class to work around it). Putting it on
 * <html> also fixes the <body> background showing through on overscroll and,
 * via `color-scheme`, the native scrollbars/selects/date-pickers.
 *
 * The marketing site is unaffected: it uses only static tokens (bg-paper,
 * text-ink…) and zero `dark:` utilities, so the class is inert there. We still
 * strip it from <html> on unmount so a user leaving the CRM doesn't carry
 * `color-scheme: dark` back to the marketing pages.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "crm-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** The single source of truth, shared verbatim with the pre-paint script. */
function resolveTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* private mode */
  }
  // Previously never consulted — an OS-dark user always got a light CRM.
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function themeRoots(): Element[] {
  return [
    document.documentElement,
    ...Array.from(document.querySelectorAll("[data-theme-root]")),
  ];
}

/**
 * @param animate false on the very first apply, so a dark-mode user does not
 *   get a 220ms fade on every page load.
 */
function applyTheme(theme: Theme, animate: boolean) {
  if (typeof document === "undefined") return;
  const roots = themeRoots();
  const reduce =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const shouldAnimate = animate && !reduce;

  if (shouldAnimate) {
    roots.forEach((el) => el.classList.add("theme-switching"));
  }
  roots.forEach((el) => el.classList.toggle("dark", theme === "dark"));

  if (shouldAnimate) {
    window.setTimeout(() => {
      roots.forEach((el) => el.classList.remove("theme-switching"));
    }, 240); // 220ms transition + slack
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  /* MUST start "light" — the same value the server renders. Seeding this from
     localStorage instead makes the client's first render disagree with the SSR
     HTML for every consumer of `theme`, which is a real hydration mismatch
     (React #418) and throws the whole tree away to re-render on the client.
     There is no flash: the pre-paint script in <head> has already put `.dark`
     on <html>, so the VISUAL theme is correct before React ever runs. Only the
     JS value catches up, one tick later, and the sole thing that reads it
     during hydration is the toggle's own highlight. */
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    // Adopt what the pre-paint script decided. We never *remove* a class here —
    // applying "light" before resolving would strip `.dark` and flash the app.
    const resolved = resolveTheme();
    applyTheme(resolved, false);
    setThemeState(resolved);
  }, []);

  // Strip the class from <html> when the CRM unmounts (see file header).
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("dark", "theme-switching");
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next, true); // user-initiated -> animate the cross-fade
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* theme still applies for this session */
    }
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme],
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

/* The pre-paint script now lives in app/layout.tsx <head>. It must be
   server-rendered: a script React inserts into the client tree never executes
   on soft navigation, and mutating <html> from inside the tree trips hydration. */

export default ThemeProvider;
