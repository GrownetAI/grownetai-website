"use client";

import Image from "next/image";
import { SERVICE_SCENES } from "@/components/illustrations/scenes";
import type { GalleryKind } from "@/lib/case-study-details";
import type { CaseStudy } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   MOCK SCREEN

   A gallery tile / lightbox visual for one "screen" of a project. We don't own
   client screenshots, so instead of hot-linking fakes we present the work as
   tasteful brand mockups:
     · desktop / mobile → the real project image inside a device frame
     · dashboard / analytics → on-brand UI mockups (the product surfaces)
     · feature → the matching flat illustration on a moss field
   All strictly on palette (paper / ink / moss / hairline); the only gradient is
   the image scrim, which the design system permits.
════════════════════════════════════════════════════════════════ */

export default function MockScreen({
  item,
  study,
  className,
}: {
  item: { label: string; kind: GalleryKind };
  study: CaseStudy;
  className?: string;
}) {
  return (
    <div className={cn("h-full w-full", className)}>
      {item.kind === "desktop" && <DesktopScreen study={study} label={item.label} />}
      {item.kind === "mobile" && <MobileScreen study={study} label={item.label} />}
      {item.kind === "dashboard" && <DashboardScreen study={study} label={item.label} />}
      {item.kind === "analytics" && <AnalyticsScreen label={item.label} />}
      {item.kind === "feature" && <FeatureScreen study={study} label={item.label} />}
    </div>
  );
}

/* ── Desktop browser ─────────────────────────────────────────────── */
function DesktopScreen({ study, label }: { study: CaseStudy; label: string }) {
  return (
    <figure className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-hairline bg-paper-raised shadow-card">
      <div className="flex items-center gap-2 border-b border-hairline bg-sand px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
        </span>
        <span className="ml-2 truncate rounded-md bg-paper-raised px-3 py-1 text-[11px] text-ink-muted">
          {study.slug}.in
        </span>
      </div>
      <div className="relative flex-1">
        <Image
          src={study.image}
          alt={`${study.client} — ${label}`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}

/* ── Phone ───────────────────────────────────────────────────────── */
function MobileScreen({ study, label }: { study: CaseStudy; label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-3">
      <figure className="relative aspect-[9/17] h-full max-h-full overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-ink shadow-brand">
        <span className="absolute left-1/2 top-1.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-paper/30" />
        <div className="relative h-full w-full overflow-hidden rounded-[1.15rem]">
          <Image
            src={study.image}
            alt={`${study.client} — ${label}`}
            fill
            sizes="360px"
            className="object-cover object-top"
          />
        </div>
      </figure>
    </div>
  );
}

/* ── Dashboard mock ──────────────────────────────────────────────── */
function DashboardScreen({ study, label }: { study: CaseStudy; label: string }) {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-2xl border border-hairline bg-paper-raised shadow-card">
      {/* sidebar */}
      <div className="hidden w-1/5 flex-col gap-2 border-r border-hairline bg-sand p-3 sm:flex">
        <span className="h-6 w-6 rounded-lg bg-moss-400" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "h-2 rounded-full",
              i === 1 ? "w-full bg-moss-300" : "w-3/4 bg-hairline-strong",
            )}
          />
        ))}
      </div>
      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="h-3 w-28 rounded-full bg-ink/80" />
          <span className="h-6 w-16 rounded-full bg-moss-400" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {study.results.slice(0, 3).map((r) => (
            <div key={r.metric} className="rounded-xl border border-hairline bg-sand p-2.5">
              <p className="font-display text-sm font-bold text-ink">{r.value}</p>
              <p className="mt-0.5 truncate text-[9px] text-ink-muted">{r.metric}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-xl border border-hairline bg-sand/60 p-3">
          {[38, 52, 44, 66, 58, 78, 70, 92].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={cn(
                "flex-1 rounded-t-sm",
                i >= 6 ? "bg-moss-400" : "bg-moss-200",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Analytics mock ──────────────────────────────────────────────── */
function AnalyticsScreen({ label }: { label: string }) {
  const pts = [30, 34, 28, 42, 46, 58, 54, 70, 76, 92];
  const d = pts
    .map((p, i) => `${(i / (pts.length - 1)) * 100},${100 - p}`)
    .join(" ");
  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-hidden rounded-2xl border border-hairline bg-paper-raised p-4 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-ink">{label}</span>
        <span className="rounded-full bg-moss-100 px-2 py-0.5 text-[10px] font-bold text-moss-700">
          ↑ trending
        </span>
      </div>
      <div className="relative flex-1 rounded-xl border border-hairline bg-sand/60 p-2">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <polyline
            points={d}
            fill="none"
            stroke="var(--moss-400)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon points={`0,100 ${d} 100,100`} fill="var(--moss-400)" opacity="0.10" />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Reach", "Convert", "Retain"].map((k, i) => (
          <div key={k} className="rounded-lg border border-hairline bg-sand p-2 text-center">
            <p className="font-display text-xs font-bold text-ink">
              {["+284%", "6.4×", "92%"][i]}
            </p>
            <p className="text-[9px] text-ink-muted">{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature (illustration) ──────────────────────────────────────── */
function FeatureScreen({ study, label }: { study: CaseStudy; label: string }) {
  // Vary the scene by label so multiple feature tiles on one project don't repeat.
  const ids = study.serviceIds.length ? study.serviceIds : ["web-dev"];
  const h = [...label].reduce((a, c) => a + c.charCodeAt(0), 0);
  const Art = SERVICE_SCENES[ids[h % ids.length]] ?? SERVICE_SCENES["web-dev"];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-hairline bg-moss-50 p-6">
      <span className="grid h-24 w-24 place-items-center rounded-3xl border border-hairline bg-paper-raised shadow-card sm:h-28 sm:w-28">
        <Art className="h-full w-full" />
      </span>
      <p className="text-center text-sm font-semibold text-ink">{label}</p>
    </div>
  );
}
