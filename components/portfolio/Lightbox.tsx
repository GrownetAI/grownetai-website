"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import MockScreen from "./MockScreen";
import type { GalleryKind } from "@/lib/case-study-details";
import type { CaseStudy } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   LIGHTBOX

   Full-screen gallery viewer: previous / next, keyboard navigation
   (← → Esc, + / − to zoom), click-to-zoom, focus-trapped dialog, body-scroll
   lock, and reduced-motion-aware transitions. Content is the same on-brand
   MockScreen used in the grid, so there are no separate assets to load.
════════════════════════════════════════════════════════════════ */

type Item = { label: string; kind: GalleryKind };

export default function Lightbox({
  items,
  study,
  index,
  onClose,
  onNavigate,
}: {
  items: Item[];
  study: CaseStudy;
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState(false);
  const [dir, setDir] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (delta: number) => {
      setZoom(false);
      setDir(delta);
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  // Latest nav/close in refs so the setup effect is mount-only — it must NOT
  // re-run on navigation, or it would yank focus back to the dialog root every
  // time Next/Prev is pressed.
  const goRef = useRef(go);
  goRef.current = go;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // On open: remember the opener, focus the dialog, lock body scroll, trap Tab.
  // On close: restore focus to the opener and unlock scroll.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return onCloseRef.current();
      if (e.key === "ArrowRight") return goRef.current(1);
      if (e.key === "ArrowLeft") return goRef.current(-1);
      if (e.key === "+" || e.key === "=") return setZoom(true);
      if (e.key === "-") return setZoom(false);
      if (e.key === "Tab") {
        const f = focusable();
        if (!f.length) {
          e.preventDefault();
          dialogRef.current?.focus();
          return;
        }
        const first = f[0];
        const last = f[f.length - 1];
        const el = document.activeElement;
        if (e.shiftKey && (el === first || el === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && el === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const item = items[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${study.client} gallery — ${item.label}`}
      ref={dialogRef}
      tabIndex={-1}
      initial={reduce ? { opacity: 0 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#081714]/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-4 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-paper">{item.label}</p>
          <p className="text-xs text-paper/60">
            {study.client} · {index + 1} / {items.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => !z)}
            aria-label={zoom ? "Zoom out" : "Zoom in"}
            className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:bg-paper/10"
          >
            {zoom ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:bg-paper/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-2 z-10 grid h-11 w-11 place-items-center rounded-full border border-paper/20 bg-[#081714]/40 text-paper transition-colors hover:bg-paper/10 sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          className={cn(
            "relative flex max-h-full w-full max-w-5xl items-center justify-center",
            item.kind === "mobile" ? "h-full" : "aspect-[16/10]",
          )}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-full items-center justify-center"
            >
              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                aria-label={zoom ? "Zoom out" : "Zoom in"}
                className={cn(
                  "h-full w-full transition-transform duration-300 ease-premium",
                  zoom ? "scale-[1.5] cursor-zoom-out" : "cursor-zoom-in",
                  item.kind === "mobile" && "mx-auto w-auto",
                )}
              >
                <MockScreen item={item} study={study} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-2 z-10 grid h-11 w-11 place-items-center rounded-full border border-paper/20 bg-[#081714]/40 text-paper transition-colors hover:bg-paper/10 sm:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnails */}
      <div
        className="flex items-center [justify-content:safe_center] gap-2 overflow-x-auto px-4 pb-5 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((it, i) => (
          <button
            key={`${it.label}-${i}`}
            onClick={() => {
              setZoom(false);
              setDir(i > index ? 1 : -1);
              onNavigate(i);
            }}
            aria-label={`Show ${it.label}`}
            aria-current={i === index}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
              i === index
                ? "bg-paper text-ink"
                : "border border-paper/20 text-paper/70 hover:text-paper",
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
