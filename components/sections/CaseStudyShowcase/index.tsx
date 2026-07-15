"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import BrowserFrame from "./BrowserFrame";
import { CASE_STUDIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   CASE STUDY SHOWCASE  —  homepage PROOF

   Deliberately NOT a grid. The What-We-Do section three sections above already
   renders these same projects as a browse-many grid; a second grid here showed
   the identical four cards twice. This surface does the thing a grid cannot:
   it tells one story at a time — challenge, what we did, what happened.

   Why tabs and not a scroll-driven narrative: scrollytelling looks impressive
   in a demo and then falls apart. It is fragile on mobile, it has no sensible
   behaviour under `prefers-reduced-motion`, and it cannot be operated from a
   keyboard at all. A real tablist gives the same story, works everywhere, and
   is navigable with the arrow keys.
════════════════════════════════════════════════════════════════ */

export default function CaseStudyShowcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const study = CASE_STUDIES[active];

  /* Roving tabindex: the tablist is ONE tab stop, and the arrows move within
     it. Making each tab its own tab stop would put six stops in front of the
     rest of the page for no benefit. */
  function onKeyDown(e: React.KeyboardEvent) {
    const last = CASE_STUDIES.length - 1;
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;

    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <div className="relative">
      {/* The one permitted piece of colour: a soft moss bloom. No gradient
          fills anywhere — the brand forbids gradients as a surface. */}
      <div
        aria-hidden
        className="hero-glow -top-16 left-1/2 h-[380px] w-[680px] max-w-[110vw] -translate-x-1/2 bg-moss-400/10"
      />

      <div className="relative">
        {/* ── The rail ── */}
        <div
          role="tablist"
          aria-label="Case studies"
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-pl-5 px-5 pb-1 sm:mx-0 sm:scroll-pl-0 sm:px-0 lg:flex-wrap lg:overflow-visible"
        >
          {CASE_STUDIES.map((c, i) => {
            const on = i === active;
            return (
              <button
                key={c.slug}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`cs-tab-${c.slug}`}
                aria-selected={on}
                aria-controls={`cs-panel-${c.slug}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "flex shrink-0 snap-start flex-col items-start rounded-2xl border px-4 py-3 text-left transition-colors duration-200",
                  on
                    ? "border-ink bg-ink text-paper" // the codebase's canonical active pill
                    : "border-hairline bg-paper-raised text-ink hover:border-hairline-strong",
                )}
              >
                <span className="text-sm font-semibold">{c.client}</span>
                <span
                  className={cn(
                    "mt-0.5 text-[11px]",
                    on ? "text-paper/70" : "text-ink-muted",
                  )}
                >
                  {c.industry}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── The story ── */}
        <div className="mt-6 lg:mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={study.slug}
              role="tabpanel"
              id={`cs-panel-${study.slug}`}
              aria-labelledby={`cs-tab-${study.slug}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              {/* Narrative */}
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-moss-600">
                  {study.industry} · {study.duration}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
                  {study.title}
                </h3>

                <dl className="mt-6 space-y-4">
                  <Beat label="The challenge" body={study.challenge} />
                  <Beat label="What we did" body={study.solution} />
                </dl>

                {/* Outcome — the payoff line, given its own weight. */}
                <div className="mt-6 flex gap-3 rounded-2xl border border-hairline bg-sand p-4">
                  <Quote className="h-4 w-4 flex-shrink-0 text-moss-600" aria-hidden />
                  <p className="text-sm font-medium leading-relaxed text-ink">
                    {study.outcome}
                  </p>
                </div>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {study.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-hairline bg-paper-raised px-2.5 py-1 text-[11px] font-medium text-ink-body"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/portfolio/${study.slug}`}
                  className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-moss-600"
                >
                  See the full case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Visual */}
              <div className="relative min-w-0">
                <BrowserFrame
                  src={study.image}
                  alt={`${study.client} — work we shipped`}
                  url={`${study.slug}.com`}
                  imageClassName="hover:scale-[1.03]"
                  className="group"
                />

                {/* Floating results. Absolute on lg+ so they overlap the frame
                    and give the composition depth; below that they fall into a
                    plain row, because overlapping cards on a phone is just
                    clutter. */}
                <ul className="mt-4 grid grid-cols-3 gap-2 lg:absolute lg:-bottom-6 lg:-left-6 lg:mt-0 lg:flex lg:flex-col lg:gap-2">
                  {study.results.map((r, i) => (
                    <motion.li
                      key={r.metric}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: reduce ? 0 : 0.15 + i * 0.08,
                        duration: reduce ? 0 : 0.4,
                      }}
                      className="rounded-xl border border-hairline bg-paper-raised px-3 py-2 shadow-card lg:min-w-[148px]"
                    >
                      <p className="font-display text-lg font-bold leading-none text-ink">
                        {r.value}
                      </p>
                      <p className="mt-1 text-[11px] text-ink-muted">{r.metric}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center lg:mt-16">
          <Link href="/portfolio" className="btn btn-secondary">
            View all work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Beat({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-ink-body">{body}</dd>
    </div>
  );
}
