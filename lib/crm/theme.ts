"use client";

/**
 * Chart colour tokens for recharts.
 *
 * recharts needs concrete colour strings (it can't read Tailwind classes), so
 * the palette lives here and is picked by the current theme.
 *
 * EVERY value below is derived 1:1 from the CSS custom properties in
 * styles/globals.css. That matters: this file previously described a DIFFERENT
 * dark theme from the one that shipped — it was validated against a slate-grey
 * surface (#111C1F) while the CSS painted forest green (#0E2A24). The Donut
 * strokes its segment gaps with `surface`, so it was drawing a slate ring onto
 * a green panel; tooltips were a third colour family again; and `LIGHT.brand`
 * was #008080, a legacy teal that exists nowhere else in the product.
 *
 * Two rules worth keeping:
 *  - Platform -> slot mapping is FIXED (lib/crm/platforms.tsx) so a series never
 *    changes colour when the set is filtered.
 *  - `brand` may be co-plotted with slots 0-6, but NOT slot 7 (pink), which sits
 *    ~6 dE from moss under deuteranopia. Nothing does this today.
 */
import { useTheme } from "@/components/providers/ThemeProvider";

/* 8 categorical slots. Lightness is deliberately staggered — that is what makes
   red/green and blue/violet separable under colour-vision deficiency. Do not
   "even out" the lightness later; a uniform ramp collapses green<->red to dE 0.5.
   Worst adjacent-pair CVD separation: dE 26.1 dark / 27.9 light. */
export const CHART_SERIES_LIGHT = [
  "#3571C9", // 0 blue
  "#B48300", // 1 amber
  "#6D41A9", // 2 violet
  "#30933B", // 3 green
  "#017FA1", // 4 cyan
  "#BA2B2E", // 5 red
  "#DA751D", // 6 orange
  "#B3487E", // 7 pink
  // 8 moss — the MANUAL source. Manual leads are our own, so they wear the
  // brand colour. Verified dE 34.1 from its nearest neighbour (cyan).
  "#0C6B58",
] as const;

export const CHART_SERIES_DARK = [
  "#5390EB", // 0 blue
  "#876200", // 1 amber
  "#845BC0", // 2 violet
  "#4CAC53", // 3 green
  "#0992B8", // 4 cyan
  "#C94845", // 5 red
  "#D67523", // 6 orange
  "#C1588B", // 7 pink
  "#2FC59E", // 8 moss — MANUAL (dE 29.7 from its nearest neighbour)
] as const;

/* Ordinal moss ramp (light -> dark) for the Funnel, which used to hardcode an
   off-brand blue that never flipped with the theme. */
export const CHART_ORDINAL_LIGHT = [
  "#42BCA0",
  "#159F85",
  "#04816B",
  "#006453",
] as const;
export const CHART_ORDINAL_DARK = [
  "#60D6B9",
  "#42BCA0",
  "#159F85",
  "#04816B",
] as const;

export interface ChartTokens {
  series: readonly string[];
  /** Single-hue ramp for ordered stages (funnel). */
  ordinal: readonly string[];
  /** Primary brand accent for single-series charts. */
  brand: string;
  accent: string;
  grid: string;
  axis: string;
  text: string;
  textMuted: string;
  surface: string;
  /** Surface ring drawn between overlapping/adjacent marks (2px gap). */
  gap: string;
  /** Track behind a partially-filled bar. */
  track: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipShadow: string;
  good: string;
  bad: string;
}

const LIGHT: ChartTokens = {
  series: CHART_SERIES_LIGHT,
  ordinal: CHART_ORDINAL_LIGHT,
  brand: "#0C6B58", // --c-brand
  accent: "#1CA88C", // --c-accent
  grid: "#E7E2D8", // --c-line
  axis: "#736D65", // --c-fg-subtle
  text: "#14120F", // --c-fg
  textMuted: "#6E6860", // --c-fg-muted
  surface: "#FFFFFF", // --c-panel
  gap: "#FFFFFF", // --c-panel
  track: "#FAF9F6", // --c-elevated
  tooltipBg: "#FFFFFF", // --c-panel
  tooltipBorder: "#E7E2D8", // --c-line
  tooltipShadow: "0 10px 30px rgb(20 18 15 / 0.10)",
  good: "#0F7A4F",
  bad: "#C0342F",
};

const DARK: ChartTokens = {
  series: CHART_SERIES_DARK,
  ordinal: CHART_ORDINAL_DARK,
  brand: "#1CA88C", // --c-brand
  accent: "#5FC7A7", // --c-accent
  grid: "#2A3036", // --c-line
  axis: "#8794A0", // --c-fg-subtle
  text: "#E8ECEF", // --c-fg
  textMuted: "#A7B1B9", // --c-fg-muted
  surface: "#171B1F", // --c-panel   (was #111C1F — a different theme entirely)
  gap: "#171B1F", // --c-panel
  track: "#1F242A", // --c-elevated
  tooltipBg: "#1F242A", // --c-elevated — a tooltip floats ABOVE the panel
  tooltipBorder: "#646F7A", // --c-line-strong
  tooltipShadow: "0 16px 40px -12px rgb(0 0 0 / 0.70)",
  good: "#3FBF87",
  bad: "#E06C6C",
};

/** Theme-aware chart tokens. Re-renders when the theme flips. */
export function useChartTokens(): ChartTokens {
  const { theme } = useTheme();
  return theme === "dark" ? DARK : LIGHT;
}
