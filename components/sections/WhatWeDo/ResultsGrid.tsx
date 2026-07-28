"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star, SearchX, ArrowUpRight } from "lucide-react";
import { TESTIMONIALS, CASE_STUDIES, type CaseStudy } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { type TabId } from "./data";

/* ════════════════════════════════════════════════════════════════
   RESULTS — BENTO

   Projects and testimonials render as an asymmetric bento rather than a uniform
   grid: a hero tile leads, with occasional wide tiles for rhythm, the rest
   filling around them (grid-flow: dense so there are no holes). Project tiles
   are full-bleed images with a scrim + overlaid metadata, so the text stays
   readable at every tile size. The pattern adapts to the filtered count.
════════════════════════════════════════════════════════════════ */

/* Bento tiling, tuned to be GAP-FREE on the desktop 4-col grid for any count:
   item 0 is a 2×2 hero (when there are ≥3 to balance it), then the last few
   items widen to 2-col exactly enough to complete the final row. 1- and 2-item
   filters get their own balanced treatment. `big` drives the richer overlay. */
function tileFor(i: number, total: number): { span: string; big: boolean } {
  if (total === 1)
    return { span: "col-span-2 row-span-2 sm:col-span-3 lg:col-span-4", big: true };
  if (total === 2)
    return { span: "col-span-2 row-span-2 sm:col-span-3 lg:col-span-2", big: true };

  if (i === 0) return { span: "col-span-2 row-span-2", big: true }; // hero

  // Cells used so far if the rest were all 1×1: hero(4) + (total-1) normals.
  // Widen the last `pad` tiles (each +1 cell) to fill the final 4-col row.
  const baseCells = 4 + (total - 1);
  const pad = (4 - (baseCells % 4)) % 4;
  if (pad > 0 && i >= total - pad) return { span: "col-span-2", big: false }; // wide
  return { span: "", big: false }; // normal 1×1
}

type Item =
  | { kind: "project"; key: string; data: CaseStudy }
  | { kind: "testimonial"; key: string; data: (typeof TESTIMONIALS)[number] };

function matches(ids: string[] | undefined, serviceId: string | null) {
  if (!serviceId) return true;
  return Boolean(ids?.includes(serviceId));
}

export default function ResultsGrid({
  tab,
  serviceId,
}: {
  tab: TabId;
  serviceId: string | null;
}) {
  const reduce = useReducedMotion();

  const items: Item[] =
    tab === "projects"
      ? CASE_STUDIES.filter((p) => matches(p.serviceIds, serviceId)).map((p) => ({
          kind: "project",
          key: `project-${p.id}`,
          data: p,
        }))
      : tab === "testimonials"
        ? TESTIMONIALS.filter((t) => matches(t.serviceIds, serviceId)).map((t) => ({
            kind: "testimonial",
            key: `testimonial-${t.id}`,
            data: t,
          }))
        : [];

  return (
    <div>
      <AnimatePresence mode="popLayout" initial={false}>
        {items.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-hairline-strong bg-paper-raised/60 px-6 py-16 text-center"
          >
            <SearchX className="mb-3 h-7 w-7 text-ink-faint" />
            <p className="font-semibold text-ink">Nothing here yet</p>
            <p className="mt-1 max-w-sm text-sm text-ink-muted">
              We haven&rsquo;t published a {tab.slice(0, -1)} for this service yet
              — but we almost certainly do the work.
            </p>
            <Link href="/contact" className="btn btn-secondary btn-sm mt-5">
              Ask us about it
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key={tab + (serviceId ?? "all")}
            className="grid grid-flow-row-dense auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
          >
            {items.map((item, i) => {
              const { span, big } = tileFor(i, items.length);
              return (
                <motion.div
                  key={item.key}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{
                    duration: reduce ? 0 : 0.35,
                    delay: reduce ? 0 : Math.min(i * 0.04, 0.24),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={span}
                >
                  {item.kind === "project" ? (
                    <ProjectTile p={item.data} big={big} />
                  ) : (
                    <TestimonialTile t={item.data} big={big} />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Project tile — full-bleed image + scrim + overlay ──────────────── */
function ProjectTile({ p, big }: { p: CaseStudy; big: boolean }) {
  return (
    <Link
      href={`/portfolio/${p.slug}`}
      className="group relative block h-full overflow-hidden rounded-2xl border border-hairline bg-sand shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-moss-300 hover:shadow-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-400/50"
    >
      <Image
        src={p.image}
        alt={p.client}
        fill
        sizes={
          big
            ? "(max-width: 640px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        className="object-cover transition-transform duration-[600ms] ease-premium group-hover:scale-[1.05]"
      />
      {/* Scrim — the design system permits gradients only as an image scrim. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
      />
      {/* Hover affordance */}
      <span className="absolute right-3 top-3 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-paper/90 text-ink opacity-0 shadow-sm transition-all duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-paper/80">
          {p.industry}
        </p>
        <h3
          className={cn(
            "mt-1 font-heading font-bold text-paper",
            big ? "text-2xl" : "text-base",
          )}
        >
          {p.client}
        </h3>
        {big && (
          <p className="mt-1 line-clamp-2 max-w-md text-sm text-paper/85">
            {p.title}
          </p>
        )}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {p.results.slice(0, big ? 3 : 1).map((r) => (
            <span
              key={r.metric}
              className="rounded-full bg-paper/15 px-2.5 py-1 text-[11px] font-semibold text-paper backdrop-blur-sm"
            >
              {r.value} {r.metric.toLowerCase()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ── Testimonial tile — readable text card, size-aware ──────────────── */
function TestimonialTile({
  t,
  big,
}: {
  t: (typeof TESTIMONIALS)[number];
  big: boolean;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-paper-raised p-5 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-moss-300 hover:shadow-card-hover">
      <div className="flex items-center gap-1 text-[#E0A32E]">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>
      <p
        className={cn(
          "mt-3 flex-1 leading-relaxed text-ink-body",
          big ? "text-lg line-clamp-[9]" : "text-sm line-clamp-3",
        )}
      >
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3 border-t border-hairline pt-4">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-paper">
          {t.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
          <p className="truncate text-xs text-ink-muted">{t.role}</p>
        </div>
      </div>
    </article>
  );
}
