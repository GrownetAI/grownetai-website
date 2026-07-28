"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Layers, FolderOpen, Cpu, Newspaper, X } from "lucide-react";
import {
  RAILS,
  RAIL_ROWS,
  searchSite,
  type NavRow,
  type RailId,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

const RAIL_ICONS: Record<RailId, React.ComponentType<{ className?: string }>> =
  {
    services: Layers,
    category: FolderOpen,
    tech: Cpu,
    blog: Newspaper,
  };

/* ── One list row: label left, count (or project hint) right ────── */
function Row({
  row,
  dense,
  onNavigate,
}: {
  row: NavRow;
  dense?: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={row.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl transition-colors",
        "hover:bg-sand/70 focus-visible:bg-sand/70 outline-none",
        dense ? "px-4 py-2.5" : "px-5 py-3",
      )}
    >
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate font-display font-semibold text-ink",
            dense ? "text-sm" : "text-lg",
          )}
        >
          {row.label}
        </span>
        {row.hint && (
          <span className="block truncate text-sm text-ink-muted">
            {row.hint}
          </span>
        )}
      </span>
      {row.count !== undefined && (
        <span className="flex-shrink-0 text-sm tabular-nums text-ink-muted">
          {row.count}
        </span>
      )}
    </Link>
  );
}

/* ── Grouped search results — shared by the desktop panel and the
      mobile menu (dense). Empty query = full catalogue, so the panel
      is never blank when opened from the search field. ───────────── */
export function SearchResults({
  query,
  dense,
  onNavigate,
}: {
  query: string;
  dense?: boolean;
  onNavigate: () => void;
}) {
  const groups = searchSite(query);

  if (groups.length === 0) {
    return (
      <p className={cn("text-body px-5", dense ? "py-6" : "py-10")}>
        No matches for &ldquo;{query.trim()}&rdquo; — try
        &lsquo;websites&rsquo;, &lsquo;SEO&rsquo;, &lsquo;Next.js&rsquo;…
      </p>
    );
  }

  return (
    <div className={cn("flex flex-col", dense ? "gap-4" : "gap-6")}>
      {groups.map((group) => (
        <div key={group.id}>
          <p className={cn("eyebrow mb-1", dense ? "px-4" : "px-5")}>
            {group.label}
          </p>
          <div className="flex flex-col">
            {group.rows.map((row) => (
              <Row
                key={`${group.id}-${row.label}`}
                row={row}
                dense={dense}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   DESKTOP MEGA PANEL

   Full-width sheet under the fixed header: left rail switches the
   right-hand list (browse), or the right zone shows grouped live
   search results (search mode). The scrim behind it sits at -z-10
   inside the header's stacking context, so the bar stays clickable
   while the page behind dims.
════════════════════════════════════════════════════════════════ */
export default function MegaPanel({
  open,
  rail,
  searching,
  query,
  onRail,
  onClose,
  onNavigate,
}: {
  open: boolean;
  rail: RailId;
  searching: boolean;
  query: string;
  onRail: (rail: RailId) => void;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const rows = RAIL_ROWS[rail];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
            className="fixed inset-0 -z-10 hidden bg-ink/40 backdrop-blur-[2px] lg:block"
          />

          <motion.div
            key="panel"
            id="mega-panel"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            /* A click on the strip beside the sheet is an outside click —
               without this, only the scrim below the sheet would close. */
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
            className="absolute inset-x-0 hidden px-4 sm:px-6 lg:block"
            style={{ top: "var(--navbar-height)" }}
          >
            <div
              className="mx-auto flex w-full max-w-[1350px] gap-3 overflow-hidden rounded-3xl
                         border border-hairline bg-paper-raised p-3 shadow-float"
            >
              {/* Left rail */}
              <div className="flex w-60 flex-shrink-0 flex-col gap-1 rounded-2xl bg-sand/60 p-2">
                {RAILS.map((entry) => {
                  const Icon = RAIL_ICONS[entry.id];
                  const active = !searching && rail === entry.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => onRail(entry.id)}
                      /* Hover must not yank the user out of search results. */
                      onPointerEnter={() => {
                        if (!searching) onRail(entry.id);
                      }}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium",
                        "outline-none transition-colors focus-visible:ring-2 focus-visible:ring-moss-400",
                        active
                          ? "bg-paper-raised font-semibold text-ink shadow-card"
                          : "text-ink-muted hover:bg-paper-raised/60 hover:text-ink",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 flex-shrink-0",
                          active ? "text-moss-600" : "text-ink-faint",
                        )}
                      />
                      {entry.label}
                    </button>
                  );
                })}
              </div>

              {/* Right list */}
              <div
                className="min-w-0 flex-1 overflow-y-auto overscroll-contain py-1"
                style={{
                  maxHeight: "calc(100dvh - var(--navbar-height) - 48px)",
                }}
              >
                {/* Always-visible escape hatch — on short viewports the sheet
                    can cover nearly all of the scrim, leaving nothing obvious
                    to click to get out. */}
                <div className="flex items-center justify-end px-2 pb-1">
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close menu"
                    className="grid h-9 w-9 place-items-center rounded-full text-ink-muted
                               transition-colors hover:bg-sand hover:text-ink
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-400"
                  >
                    <X className="h-[18px] w-[18px]" />
                  </button>
                </div>
                {searching ? (
                  <SearchResults query={query} onNavigate={onNavigate} />
                ) : (
                  <div className="flex max-w-2xl flex-col">
                    {rows.map((row) => (
                      <Row
                        key={`${rail}-${row.label}`}
                        row={row}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
