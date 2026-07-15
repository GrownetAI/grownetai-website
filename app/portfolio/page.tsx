"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus, SearchX } from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   PORTFOLIO — premium filterable showcase

   Reference principles adopted: a quiet tab filter, generous white space,
   image-forward cards with a subtle hover "+" affordance, and typographic
   metadata (name + italic service tags) beneath each preview. Every card is a
   real link into its /portfolio/[slug] case-study detail view.

   Filtering is by service category (the axis clients think in), derived from
   the project serviceIds. Entrances animate Y only — never X — so a wide card
   sliding in can't widen the document on mobile.
════════════════════════════════════════════════════════════════ */

const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "web-dev", label: "Websites" },
  { id: "app-dev", label: "Apps" },
  { id: "design", label: "Design" },
  { id: "ads", label: "Digital Campaigns" },
  { id: "smm", label: "Social Media" },
  { id: "seo", label: "SEO" },
  { id: "ai", label: "AI" },
].filter(
  (c) => c.id === "all" || CASE_STUDIES.some((s) => s.serviceIds.includes(c.id)),
);

export default function PortfolioPage() {
  const [active, setActive] = useState("all");
  const reduce = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const shown = useMemo(
    () =>
      active === "all"
        ? CASE_STUDIES
        : CASE_STUDIES.filter((s) => s.serviceIds.includes(active)),
    [active],
  );

  function onKeyDown(e: React.KeyboardEvent) {
    const last = CATEGORIES.length - 1;
    const cur = CATEGORIES.findIndex((c) => c.id === active);
    let next = cur;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = cur === last ? 0 : cur + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = cur === 0 ? last : cur - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(CATEGORIES[next].id);
    tabsRef.current[next]?.focus();
  }

  return (
    <main className="bg-paper pt-[var(--navbar-height)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20">
        <div aria-hidden className="absolute inset-0 dot-grid opacity-40" />
        <div
          aria-hidden
          className="hero-glow left-1/2 -top-24 h-[340px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-moss-400/10"
        />
        <div className="container-site relative z-10 text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Our work</span>
            <h1 className="heading-display mt-4">
              Proof, not <span className="text-gradient">promises.</span>
            </h1>
            <p className="text-body-lg mx-auto mt-5 max-w-xl">
              Real businesses, real outcomes. Every project below opens into the
              full story — what we built, why, and what it moved.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter + grid ── */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          {/* Filter rail */}
          <div
            role="tablist"
            aria-label="Filter work by service"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-5 mb-10 flex snap-x gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {CATEGORIES.map((c, i) => {
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  role="tab"
                  id={`pf-tab-${c.id}`}
                  aria-controls="pf-panel"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(c.id)}
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

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {shown.length ? (
              <motion.div
                key={active}
                role="tabpanel"
                id="pf-panel"
                aria-labelledby={`pf-tab-${active}`}
                tabIndex={0}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
                className="grid gap-x-6 gap-y-10 focus-visible:outline-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {shown.map((study, i) => (
                  <ProjectCard key={study.slug} study={study} index={i} reduce={!!reduce} />
                ))}
              </motion.div>
            ) : (
              <div className="mx-auto grid max-w-md place-items-center gap-3 rounded-3xl border border-dashed border-hairline-strong bg-paper-raised px-6 py-16 text-center">
                <SearchX className="h-7 w-7 text-ink-faint" />
                <p className="text-ink-muted">No work in this category yet.</p>
                <Link href="/contact" className="btn btn-secondary btn-sm">
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-paper">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-16 text-center sm:px-12">
            <div aria-hidden className="absolute inset-0 dot-grid dot-grid-invert opacity-50" />
            <div
              aria-hidden
              className="hero-glow bottom-[-7rem] left-1/2 h-[320px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-moss-400/15"
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="display-lg text-paper">
                Your project could be the next story here.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-paper/80">
                Tell us where you want to be. We&rsquo;ll show you the path — and
                the price — to get there.
              </p>
              <Link href="/contact" className="btn btn-accent btn-lg mt-8">
                Start your project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Project card ───────────────────────────────────────────────── */
function ProjectCard({
  study,
  index,
  reduce,
}: {
  study: CaseStudy;
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: 12 }}
      transition={{
        duration: reduce ? 0 : 0.45,
        delay: reduce ? 0 : Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/portfolio/${study.slug}`}
        className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-400/50"
      >
        {/* Preview */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline bg-sand">
          <Image
            src={study.image}
            alt={study.client}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-[600ms] ease-premium group-hover:scale-[1.06]"
          />
          {/* status */}
          <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm backdrop-blur">
            Case study
          </span>
          {/* hover overlay + affordance */}
          <div className="absolute inset-0 grid place-items-center bg-[#081714]/0 transition-colors duration-300 group-hover:bg-[#081714]/35">
            <span className="grid h-14 w-14 scale-90 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-brand transition-all duration-300 ease-premium group-hover:scale-100 group-hover:opacity-100">
              <Plus className="h-5 w-5" />
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-moss-600">
            {study.industry} · {study.duration}
          </p>
          <h3 className="mt-1.5 font-heading text-lg font-bold text-ink transition-colors group-hover:text-moss-600">
            {study.client}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{study.title}</p>
          <p className="mt-2.5 text-sm italic leading-relaxed text-ink-body">
            {study.services.join(", ")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
