"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import {
  BUNDLES,
  DELIVERY,
  bundlePrice,
  type Bundle,
  type BundleCategory,
  type Term,
} from "@/lib/bundles";
import { COUNTRIES, formatMoney } from "@/lib/pricing-data";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   AFFORDABLE YET CONSISTENT — homepage pricing preview

   A taste of pricing before the full /pricing page: No-Code vs Code, with a
   6-/12-month toggle. Figures are composed from the real per-service floors in
   pricing-data (see lib/bundles.ts), so they stay honest and match /pricing.

   The pros/cons comparison opens on hover AND on click/focus — hover can never
   be the only way in, or keyboard and touch users are locked out.
════════════════════════════════════════════════════════════════ */

// One currency here; the full country switcher lives on /pricing.
const COUNTRY = COUNTRIES.find((c) => c.code === "IN")!;

export default function PricingPreview() {
  const [category, setCategory] = useState<BundleCategory>("no-code");
  const [term, setTerm] = useState<Term>(6);
  const reduce = useReducedMotion();

  const cards = useMemo(
    () => BUNDLES.filter((b) => b.category === category),
    [category],
  );

  return (
    <section className="section-padding relative overflow-hidden bg-sand">
      <div aria-hidden className="absolute inset-0 dot-grid opacity-30" />
      <div
        aria-hidden
        className="hero-glow left-1/2 top-24 h-[380px] w-[680px] max-w-[110vw] -translate-x-1/2 bg-moss-400/[0.07]"
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Affordable yet consistent</span>
          <h2 className="heading-section mt-3">
            Pricing that fits how you want to build.
          </h2>
          <p className="text-body-lg mx-auto mt-5 max-w-xl">
            Every package bundles the build with the marketing that makes it
            pay off. Start no-code and fast, or go fully custom — the choice is
            about your goals, not the sticker price.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          {/* Category */}
          <Segmented
            label="Build type"
            value={category}
            onChange={(v) => setCategory(v as BundleCategory)}
            options={[
              { value: "no-code", label: "No-Code" },
              { value: "code", label: "Code" },
            ]}
          />
          {/* Term */}
          <Segmented
            label="Billing term"
            value={String(term)}
            onChange={(v) => setTerm(Number(v) as Term)}
            options={[
              { value: "6", label: "6 Months" },
              { value: "12", label: "12 Months", hint: "best value" },
            ]}
          />
        </div>

        {/* Cards — a snap carousel on mobile, the original grid at sm+ */}
        <AnimatePresence mode="wait">
          <BundleDeck key={category} cards={cards} term={term} reduce={Boolean(reduce)} />
        </AnimatePresence>

        <p className="mt-8 text-center text-xs text-ink-muted">
          Indicative starting prices in {COUNTRY.currency}. Every project is
          quoted to scope —{" "}
          <Link href="/pricing" className="font-semibold text-moss-600 hover:underline">
            see full pricing for your market
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

/* ── Bundle deck ──────────────────────────────────────────────────
   Mobile (<sm): a touch/swipe snap carousel with pagination dots and
   prev/next controls. sm+ reverts to the exact original grid, so tablet and
   desktop are unchanged. Cards keep full width (85vw) on mobile — never shrunk. */
function BundleDeck({
  cards,
  term,
  reduce,
}: {
  cards: Bundle[];
  term: Term;
  reduce: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track the centered card on mobile so the dots stay in sync with swipes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const idx = slides.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root: track, threshold: [0.6] },
    );
    slides.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cards.length]);

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(cards.length - 1, i));
    const slide = trackRef.current?.children[clamped] as HTMLElement | undefined;
    slide?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Package options"
        className={cn(
          // mobile: full-bleed snap carousel
          "-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 no-scrollbar",
          // sm+: revert to the original static grid (tablet/desktop unchanged)
          "sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid",
          cards.length === 2
            ? "sm:mx-auto sm:max-w-3xl sm:grid-cols-2"
            : "sm:mx-0 lg:grid-cols-3",
        )}
      >
        {cards.map((b, i) => (
          <div
            key={b.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Package ${i + 1} of ${cards.length}`}
            className="w-[85%] shrink-0 snap-center sm:w-auto"
          >
            <BundleCard bundle={b} term={term} reduce={reduce} />
          </div>
        ))}
      </div>

      {/* Mobile controls — hidden from sm up */}
      <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
        <button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous package"
          className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-ink transition-colors disabled:opacity-40 enabled:hover:border-ink"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose a package">
          {cards.map((b, i) => (
            <button
              key={b.id}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to package ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-ink" : "w-2 bg-hairline-strong hover:bg-ink-faint",
              )}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(active + 1)}
          disabled={active === cards.length - 1}
          aria-label="Next package"
          className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-ink transition-colors disabled:opacity-40 enabled:hover:border-ink"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Segmented control (the canonical active pill) ────────────────── */
function Segmented({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; hint?: string }[];
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full border border-hairline bg-paper-raised p-1 shadow-card"
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
              on ? "text-paper" : "text-ink-muted hover:text-ink",
            )}
          >
            {on && (
              <motion.span
                layoutId={`seg-${label}`}
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {o.label}
              {o.hint && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                    on ? "bg-paper/20 text-paper" : "bg-moss-100 text-moss-700",
                  )}
                >
                  {o.hint}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Bundle card ──────────────────────────────────────────────────── */
function BundleCard({
  bundle,
  term,
  reduce,
}: {
  bundle: Bundle;
  term: Term;
  reduce: boolean;
}) {
  const [open, setOpen] = useState(false);
  const price = bundlePrice(bundle.id, COUNTRY.code, term);
  const delivery = DELIVERY[bundle.category];

  return (
    <article
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={cn(
        "group relative flex flex-col rounded-3xl border bg-paper-raised p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        bundle.popular ? "border-ink" : "border-hairline hover:border-hairline-strong",
      )}
    >
      {bundle.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-paper">
          Most popular
        </span>
      )}

      {/* Delivery badge */}
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-hairline bg-sand px-2.5 py-1 text-[11px] font-semibold text-ink-body">
        <span aria-hidden>{delivery.icon}</span>
        {delivery.label}
      </span>

      <h3 className="mt-4 font-display text-xl font-bold text-ink">
        {bundle.name}
      </h3>
      <p className="mt-1 text-sm text-ink-muted">{bundle.tagline}</p>

      {/* Price */}
      <div className="mt-5">
        <p className="text-xs font-medium text-ink-muted">Starting from</p>
        <p className="font-display text-2xl font-bold tabular-nums text-ink">
          {formatMoney(COUNTRY, price.total)}
        </p>
        <p className="text-xs text-ink-muted">
          for {term} months · ≈ {formatMoney(COUNTRY, price.perMonth)}/mo
        </p>
      </div>

      {/* Includes */}
      <ul className="mt-5 flex-1 space-y-2">
        {bundle.includes.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-body">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-moss-500" />
            {f}
          </li>
        ))}
      </ul>

      {/* Pros/cons — opens on hover AND on click/focus (keyboard + touch). */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`compare-${bundle.id}`}
        className="mt-5 flex items-center justify-between rounded-xl border border-hairline bg-sand px-3.5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-hairline-strong"
      >
        Pros &amp; cons
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`compare-${bundle.id}`}
            initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 grid gap-3 rounded-xl border border-hairline bg-paper p-3.5 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-moss-600">
                  <Plus className="h-3 w-3" /> Pros
                </p>
                <ul className="space-y-1">
                  {bundle.pros.map((p) => (
                    <li key={p} className="text-xs leading-relaxed text-ink-body">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                  <Minus className="h-3 w-3" /> Trade-offs
                </p>
                <ul className="space-y-1">
                  {bundle.cons.map((c) => (
                    <li key={c} className="text-xs leading-relaxed text-ink-muted">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Link
        href="/pricing"
        className={cn(
          "btn mt-5 w-full",
          bundle.popular ? "btn-primary" : "btn-secondary",
        )}
      >
        View Full Pricing
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
