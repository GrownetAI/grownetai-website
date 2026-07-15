"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BUILD_STEPS, type BuildStep } from "./data";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   HOW WE BUILD — BENTO GRID

   The message: we don't build websites, we build businesses. Nine stages
   presented as one cohesive premium dashboard, NOT a timeline. Four decisive
   stages (Identity, UI/UX, Development, AI Automation) are large feature blocks
   that anchor an asymmetric grid; the rest fill in around them.

   The desktop tiling is hand-packed into a 4-col × 6-row grid with ZERO holes
   (see PLACEMENT). Source order stays 1→9 so tablet (2-col) and mobile (1-col)
   flow naturally; only ≥lg rearranges into the bento. A subtle "0X" index on
   each card carries the sequence — no arrows, connectors, or nodes.
════════════════════════════════════════════════════════════════ */

// Desktop-only explicit placement. Verified gapless: every one of the 24 cells
// (4 cols × 6 rows) is covered exactly once.
const PLACEMENT: Record<number, string> = {
  1: "lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-1", // Discovery  · wide
  2: "lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:row-span-2", // Identity   · feature
  3: "lg:col-start-1 lg:col-span-1 lg:row-start-2 lg:row-span-1", // Protection · small
  4: "lg:col-start-2 lg:col-span-1 lg:row-start-2 lg:row-span-1", // Strategy   · small
  5: "lg:col-start-1 lg:col-span-2 lg:row-start-3 lg:row-span-2", // UI/UX      · feature
  6: "lg:col-start-3 lg:col-span-2 lg:row-start-3 lg:row-span-2", // Development· feature
  7: "lg:col-start-1 lg:col-span-2 lg:row-start-5 lg:row-span-1", // Social     · wide
  8: "lg:col-start-1 lg:col-span-2 lg:row-start-6 lg:row-span-1", // Marketing  · wide
  9: "lg:col-start-3 lg:col-span-2 lg:row-start-5 lg:row-span-2", // AI Auto    · feature
};

// Tablet (2-col) spans: features + wides go full width, smalls sit two-up.
const MD_SPAN: Record<BuildStep["size"], string> = {
  feature: "sm:col-span-2",
  wide: "sm:col-span-2",
  small: "sm:col-span-1",
};

export default function BuildProcess() {
  const reduce = useReducedMotion();

  return (
    <section className="section-padding relative overflow-hidden bg-sand">
      <div aria-hidden className="absolute inset-0 dot-grid opacity-30" />
      <div
        aria-hidden
        className="hero-glow left-1/2 top-24 h-[420px] w-[820px] max-w-[120vw] -translate-x-1/2 bg-moss-400/[0.06]"
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
          <span className="eyebrow">How we build</span>
          <h2 className="heading-section mt-3">
            We don&rsquo;t just build websites. We build businesses.
          </h2>
          <p className="text-body-lg mx-auto mt-5 max-w-xl">
            One end-to-end system — identity, protection, product, growth and the
            automation that keeps it running. Nine stages, built to compound.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(10rem,1fr)]">
          {BUILD_STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: reduce ? 0 : 0.5,
                delay: reduce ? 0 : Math.min(i * 0.05, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(PLACEMENT[step.n], MD_SPAN[step.size])}
            >
              <BentoCard step={step} />
            </motion.div>
          ))}
        </div>

        {/* Close */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center lg:mt-14">
          <p className="max-w-md text-ink-body">
            From a name on a napkin to a business that runs itself — we walk every
            stage of it with you.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Start your journey
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── One bento cell ─────────────────────────────────────────────────
   All three sizes share the same shell (so the grid reads as one board);
   only the internal layout + density change by size. */
function BentoCard({ step }: { step: BuildStep }) {
  const Art = step.art;
  const feature = step.size === "feature";
  const small = step.size === "small";
  const idx = String(step.n).padStart(2, "0");

  return (
    <div
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-hairline bg-paper-raised shadow-card",
        "transition-[transform,box-shadow,border-color] duration-300 ease-premium",
        "hover:-translate-y-1 hover:border-moss-300 hover:shadow-brand",
        feature ? "p-6" : "p-5",
        // Feature cards get a whisper of moss on their surface to read as primary.
        feature && "bg-moss-50/40",
      )}
    >
      {/* Soft glow on hover — feature cards only, kept faint. */}
      {feature && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-moss-300/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      {/* Animated accent line — grows from the left on hover. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-full bg-moss-400 transition-transform duration-500 ease-premium group-hover:scale-x-100"
      />

      {small ? (
        /* ── Small: index + compact illustration + title + one line ── */
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-hairline bg-sand transition-transform duration-300 group-hover:-translate-y-0.5">
              <Art className="h-full w-full" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-ink-muted">
              {idx}
            </span>
          </div>
          <h3 className="mt-3 font-heading text-base font-semibold text-ink">
            {step.title}
          </h3>
          <p className="mt-1 text-sm leading-snug text-ink-muted">{step.lead}</p>
        </div>
      ) : feature ? (
        /* ── Feature: big illustration, heading, lead, full highlights ── */
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border border-hairline bg-sand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.03]">
              <Art className="h-full w-full" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-ink-muted">
              {idx}
            </span>
          </div>
          <h3 className="mt-5 font-heading text-xl font-bold text-ink">
            {step.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-ink-body">{step.lead}</p>
          <ul className="mt-5 grid gap-2">
            {step.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-sm text-ink-muted"
              >
                <span
                  aria-hidden
                  className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-moss-400"
                />
                {p}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        /* ── Wide: illustration left, title + lead + two chips right ── */
        <div className="relative flex h-full items-start gap-4">
          <span className="grid h-14 w-14 flex-shrink-0 place-items-center overflow-hidden rounded-2xl border border-hairline bg-sand transition-transform duration-300 group-hover:-translate-y-0.5">
            <Art className="h-full w-full" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <span className="font-mono text-xs font-semibold tracking-wider text-ink-muted">
                {idx}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{step.lead}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {step.points.slice(0, 2).map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-hairline bg-sand px-2.5 py-1 text-[11px] font-medium text-ink-body"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
