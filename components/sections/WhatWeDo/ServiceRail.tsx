"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { SERVICE_SCENES } from "@/components/illustrations/scenes";
import { cn } from "@/lib/utils";
import { SERVICE_CHIPS } from "./data";

/* ════════════════════════════════════════════════════════════════
   SERVICE RAIL

   The reference's category row: same chip geometry, same gap, same
   horizontal rail, same circular pager floating over the right edge —
   but rendered as a light chip on our paper surface rather than a dark
   photo card, and filled with ink when active (the pill convention this
   codebase already uses on /pricing and /portfolio).

   The rail keeps scrolling at every breakpoint. Ten chips never fit a
   viewport, so turning it into a wrap-grid on desktop would just make a
   second, ragged row.
════════════════════════════════════════════════════════════════ */

export default function ServiceRail({
  serviceId,
  onSelect,
}: {
  serviceId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const page = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={railRef}
        /* The negative margin cancels .container-site's padding so the rail
           bleeds to the screen edge and the last chip is visibly cut — that
           cut is what tells you it scrolls.

           scroll-pl must mirror the padding: without it, snap-mandatory aligns
           the first chip *past* the padding and parks scrollLeft at 24px, so
           the rail thinks it is already scrolled and shows a back-arrow on load. */
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-2.5 overflow-x-auto
                   scroll-pl-6 px-6 py-1"
      >
        {/* "All" — the rail's default, so the grid is never empty on load */}
        <li className="shrink-0 snap-start">
          <Chip
            label="All services"
            active={serviceId === null}
            onClick={() => onSelect(null)}
            icon={<LayoutGrid className="h-5 w-5" />}
          />
        </li>

        {SERVICE_CHIPS.map((c) => {
          const Scene = SERVICE_SCENES[c.id];
          return (
            <li key={c.id} className="shrink-0 snap-start">
              <Chip
                label={c.label}
                active={serviceId === c.id}
                onClick={() => onSelect(serviceId === c.id ? null : c.id)}
                thumb={Scene ? <Scene className="h-full w-full" /> : null}
              />
            </li>
          );
        })}
      </ul>

      {/* Pagers — floated over the rail's edges, as in the reference. Hidden
          from assistive tech: the rail is already keyboard-scrollable and each
          chip is a real focusable button. */}
      <Pager side="left" show={!atStart} onClick={() => page(-1)} />
      <Pager side="right" show={!atEnd} onClick={() => page(1)} />
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
  thumb,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  thumb?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex h-[60px] w-[196px] items-center gap-3 rounded-xl border px-3 text-left",
        "transition-[background-color,border-color,box-shadow,transform] duration-200",
        "hover:-translate-y-0.5",
        active
          ? "border-ink bg-ink text-paper shadow-card-hover"
          : "border-hairline bg-paper-raised text-ink shadow-card hover:border-hairline-strong hover:shadow-card-hover",
      )}
    >
      <span
        className={cn(
          "flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg",
          active ? "bg-paper/10 text-paper" : "bg-sand text-ink-muted",
        )}
      >
        {thumb ?? icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
        {label}
      </span>
    </button>
  );
}

function Pager({
  side,
  show,
  onClick,
}: {
  side: "left" | "right";
  show: boolean;
  onClick: () => void;
}) {
  if (!show) return null;
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      aria-hidden="true"
      className={cn(
        "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center",
        "rounded-full border border-hairline bg-paper-raised text-ink shadow-float",
        "transition-colors hover:bg-sand",
        side === "left" ? "-left-1" : "-right-1",
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
