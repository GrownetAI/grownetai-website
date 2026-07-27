"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus, SearchX, X } from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "@/lib/constants";
import { PORTFOLIO_CATEGORIES } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import ShareMenu from "@/components/portfolio/ShareMenu";
import SmoothImage from "@/components/ui/SmoothImage";

/* ════════════════════════════════════════════════════════════════
   PORTFOLIO — awwwards-collection-style showcase

   Hero mirrors an awwwards collection page: a utility row (share), a
   "Curated by" byline, a huge uppercase display title, and a short
   collection intro. Below it: a live project count, the category tab
   rail, and the filterable grid.

   Filters live in the URL so views are shareable:
     ?filter=<categoryId>  — preselects a tab (invalid ids → "all")
     ?tech=<name>          — case-insensitive match on CASE_STUDIES[].tech,
                             shown as a dismissible chip; composes with filter.

   Entrances animate Y only — never X — so a wide card sliding in can't
   widen the document on mobile.
════════════════════════════════════════════════════════════════ */

const CATEGORIES = PORTFOLIO_CATEGORIES.filter(
  (c) => c.id === "all" || CASE_STUDIES.some((s) => s.serviceIds.includes(c.id)),
);

const ALL_TECH = Array.from(new Set(CASE_STUDIES.flatMap((s) => s.tech)));

export default function PortfolioPage() {
  // useSearchParams requires a Suspense boundary or the build fails.
  return (
    <Suspense fallback={<main className="min-h-screen bg-paper" />}>
      <PortfolioContent />
    </Suspense>
  );
}

function PortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const urlFilter = searchParams.get("filter");
  const validFilter = CATEGORIES.some((c) => c.id === urlFilter)
    ? (urlFilter as string)
    : "all";

  const [active, setActive] = useState(validFilter);
  useEffect(() => setActive(validFilter), [validFilter]);

  // Canonicalise ?tech= to the exact string used in CASE_STUDIES[].tech.
  const techParam = searchParams.get("tech");
  const tech = useMemo(() => {
    if (!techParam) return null;
    const q = techParam.trim().toLowerCase();
    return ALL_TECH.find((t) => t.toLowerCase() === q) ?? null;
  }, [techParam]);

  // An unmatched ?tech= filters nothing and shows no chip — drop it from the URL.
  useEffect(() => {
    if (techParam && !tech) replaceParams((p) => p.delete("tech"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [techParam, tech]);

  const shown = useMemo(
    () =>
      CASE_STUDIES.filter(
        (s) =>
          (active === "all" || s.serviceIds.includes(active)) &&
          (!tech || s.tech.includes(tech)),
      ),
    [active, tech],
  );

  function replaceParams(mutate: (p: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const qs = params.toString();
    router.replace(qs ? `/portfolio?${qs}` : "/portfolio", { scroll: false });
  }

  function selectTab(id: string) {
    setActive(id);
    replaceParams((p) => {
      if (id === "all") p.delete("filter");
      else p.set("filter", id);
    });
  }

  function clearTech() {
    replaceParams((p) => p.delete("tech"));
  }

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
    selectTab(CATEGORIES[next].id);
    tabsRef.current[next]?.focus();
  }

  return (
    <main className="bg-paper">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-14 pt-[calc(var(--navbar-height)+2rem)] sm:pb-16">
        <div
          aria-hidden
          className="hero-glow left-1/2 -top-24 h-[340px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-moss-400/10"
        />
        <div className="container-site relative z-10">
          {/* Utility row */}
          <div className="flex items-center justify-end">
            <ShareMenu title="GrownetAI — Our Work" />
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-center sm:mt-6"
          >
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-ink-muted">
              Curated by
              <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                <Image
                  src="/images/g_logo.png"
                  alt="GrownetAI logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full border border-hairline object-cover"
                />
                GrownetAI
              </span>
            </p>
            <h1 className="mt-5 font-display text-[clamp(3.2rem,11vw,8rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
              Our Work
            </h1>
            <p className="text-body-lg mx-auto mt-6 max-w-2xl">
              A curated collection of the websites, apps, campaigns and AI
              systems we&rsquo;ve shipped for real businesses. Every project
              opens into the full story — what we built, why, and what it
              moved.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Count + filter + grid ── */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          <p className="mb-6 text-center text-sm text-ink-muted">
            <b className="font-bold text-ink">{shown.length}</b>{" "}
            {shown.length === 1 ? "project" : "projects"}.
          </p>

          {/* Filter rail */}
          <div
            role="tablist"
            aria-label="Filter work by service"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-5 mb-8 flex snap-x gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
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
                  onClick={() => selectTab(c.id)}
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

          {/* Technology chip (?tech=) */}
          {tech && (
            <div className="mb-8 flex justify-center">
              <button
                type="button"
                onClick={clearTech}
                aria-label={`Clear technology filter: ${tech}`}
                className="inline-flex items-center gap-2 rounded-full border border-moss-300 bg-moss-100 px-4 py-2 text-sm font-semibold text-moss-700 transition-colors hover:border-moss-500"
              >
                Technology: {tech}
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Grid — tabpanel lives on a stable wrapper so the crossfade
             never duplicates #pf-panel and the empty state stays inside it. */}
          <div
            role="tabpanel"
            id="pf-panel"
            aria-labelledby={`pf-tab-${active}`}
            tabIndex={0}
            className="focus-visible:outline-none"
          >
            <AnimatePresence mode="popLayout">
              {shown.length ? (
                <motion.div
                  key={`${active}-${tech ?? "any"}`}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                  className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {shown.map((study, i) => (
                    <ProjectCard key={study.slug} study={study} index={i} reduce={!!reduce} />
                  ))}
                </motion.div>
              ) : (
                <div className="mx-auto grid max-w-md place-items-center gap-3 rounded-3xl border border-dashed border-hairline-strong bg-paper-raised px-6 py-16 text-center">
                  <SearchX className="h-7 w-7 text-ink-faint" />
                  <p className="text-ink-muted">No work matches this filter yet.</p>
                  <Link href="/contact" className="btn btn-secondary btn-sm">
                    Start a project <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </AnimatePresence>
          </div>
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
          <SmoothImage
            src={study.image}
            alt={study.client}
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
