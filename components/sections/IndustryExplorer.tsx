"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Clock, Plus } from "lucide-react";
import { INDUSTRIES } from "@/lib/pricing-industries";
import {
  SERVICES,
  getPrice,
  priceLabel,
  type Country,
} from "@/lib/pricing-data";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   PRICING BY BUSINESS TYPE

   The /pricing page lists prices by service. This adds the axis clients think
   in — their industry — and, for the chosen one, shows the recommended package,
   deliverables, tech, timeline and add-ons. The "from" price is composed from
   the same pricing-data the rest of the page uses, so nothing drifts.

   A real tablist with roving tabindex + Arrow keys (the codebase's accessible-
   tab convention), so the whole strip is one tab stop.
════════════════════════════════════════════════════════════════ */

export default function IndustryExplorer({ country }: { country: Country }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const ind = INDUSTRIES[active];

  const svc = SERVICES.find((s) => s.id === ind.recommend.service);
  const range = getPrice(ind.recommend.service, country.code, ind.recommend.tier);
  const from = range ? priceLabel(country, range).split("–")[0].trim() : "Custom";

  function onKeyDown(e: React.KeyboardEvent) {
    const last = INDUSTRIES.length - 1;
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
    <section className="section-padding-sm bg-sand">
      <div className="container-site">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Find your fit</span>
          <h2 className="heading-section mt-3">Pricing for your business type</h2>
          <p className="text-body-lg mx-auto mt-4 max-w-xl">
            Every business needs a different mix. Pick yours to see what we&rsquo;d
            recommend — and what it includes.
          </p>
        </div>

        {/* Industry rail */}
        <div
          role="tablist"
          aria-label="Business type"
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-5 mb-8 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-pl-5 px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {INDUSTRIES.map((c, i) => {
            const on = i === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`ind-tab-${c.id}`}
                aria-selected={on}
                aria-controls={`ind-panel-${c.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 snap-start rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-200",
                  on
                    ? "border-ink bg-ink text-paper"
                    : "border-hairline bg-paper-raised text-ink-body hover:border-ink hover:text-ink",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={ind.id}
            role="tabpanel"
            id={`ind-panel-${ind.id}`}
            aria-labelledby={`ind-tab-${ind.id}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl rounded-3xl border border-hairline bg-paper-raised p-6 shadow-card sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              {/* Left — the recommendation */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-moss-600">
                  Recommended for {ind.label}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                  {svc?.title} {svc?.accent}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">
                  {ind.summary}
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                      Deliverables
                    </p>
                    <ul className="space-y-1.5">
                      {ind.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-1.5 text-sm text-ink-body">
                          <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-moss-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                      Add-ons
                    </p>
                    <ul className="space-y-1.5">
                      {ind.addons.map((a) => (
                        <li key={a} className="flex items-start gap-1.5 text-sm text-ink-muted">
                          <Plus className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-ink-faint" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right — price + facts */}
              <div className="flex flex-col rounded-2xl border border-hairline bg-sand p-5">
                <p className="text-xs font-medium text-ink-muted">Starting from</p>
                <p className="font-display text-3xl font-bold tabular-nums text-ink">
                  {from}
                </p>
                <p className="text-xs text-ink-muted">{svc?.basisLabel}</p>

                <dl className="mt-5 space-y-3 border-t border-hairline pt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0 text-moss-600" />
                    <dt className="text-ink-muted">Timeline</dt>
                    <dd className="ml-auto font-semibold text-ink">{ind.timeline}</dd>
                  </div>
                  <div>
                    <dt className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
                      Tech
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {ind.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-hairline bg-paper-raised px-2.5 py-1 text-[11px] font-medium text-ink-body"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <a
                  href={`#${ind.recommend.service}`}
                  className="btn btn-primary btn-sm mt-5 w-full"
                >
                  See {svc?.eyebrow} pricing
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
