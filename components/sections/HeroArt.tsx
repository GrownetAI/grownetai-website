"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SERVICE_ART, OUTCOME_ART } from "@/components/illustrations/scenes";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   HERO ART — the two illustration clusters that frame the headline.

   Left says what we do, right says what the client gets. They are
   decoration, not navigation: `aria-hidden` and `pointer-events-none`,
   so they add eleven pictures to the page and zero tab stops in front
   of the CTAs.

   Only from `xl` up. Below 1280px the gutters are too narrow to hold
   art without crowding the type — so the art drops out and the hero
   is the clean centred column it already is. The capability strip
   directly below carries the same message on small screens.
════════════════════════════════════════════════════════════════ */

type Placement = {
  /** distance from the top of the hero, as a % of its height */
  top: number;
  /** distance from the *outer* screen edge, as a % of the column width.
      Negative bleeds the tile off-screen, which is what makes the
      cluster feel like it continues past the viewport. */
  x: number;
  /** multiplier on the column's base tile size */
  scale: number;
};

/* Hand-placed rather than generated: an even distribution reads as a
   grid, and the point is that it should not. Verified against the
   centre column's edge at 1280px — the widest tile stops 26px short. */
const LEFT: Placement[] = [
  { top: 5, x: 42, scale: 0.92 },
  { top: 19, x: -8, scale: 1.14 },
  { top: 40, x: 46, scale: 0.86 },
  { top: 57, x: 2, scale: 1.06 },
  { top: 77, x: 40, scale: 0.96 },
];

const RIGHT: Placement[] = [
  { top: 3, x: 44, scale: 0.88 },
  { top: 15, x: -6, scale: 1.1 },
  { top: 35, x: 46, scale: 0.94 },
  { top: 51, x: 0, scale: 1.04 },
  { top: 69, x: 44, scale: 0.9 },
  { top: 82, x: -4, scale: 1.08 },
];

function Cluster({
  side,
  items,
  placements,
}: {
  side: "left" | "right";
  items: typeof SERVICE_ART | typeof OUTCOME_ART;
  placements: Placement[];
}) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        /* Starts *below* the navbar, not at the top of the section — otherwise
           the first tile on each side slides under the floating pill and shows
           through its blur. */
        "pointer-events-none absolute bottom-0 top-[var(--navbar-height)] z-0 hidden xl:block",
        "w-[236px] [--tile:104px] 2xl:w-[330px] 2xl:[--tile:132px]",
        side === "left" ? "left-0" : "right-0",
      )}
    >
      {items.map(({ key, Art }, i) => {
        const p = placements[i];
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.45 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute"
            style={{
              top: `${p.top}%`,
              left: side === "left" ? `${p.x}%` : undefined,
              right: side === "right" ? `${p.x}%` : undefined,
              width: `calc(var(--tile) * ${p.scale})`,
            }}
          >
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-hairline bg-paper-raised shadow-card",
                !reduce && "animate-float",
              )}
              /* Staggered periods so the tiles never bob in unison —
                 in sync they read as one moving object. */
              style={
                reduce
                  ? undefined
                  : {
                      animationDelay: `${i * 0.7}s`,
                      animationDuration: `${6.5 + (i % 3)}s`,
                    }
              }
            >
              <Art className="block h-auto w-full" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HeroArt() {
  return (
    <>
      <Cluster side="left" items={SERVICE_ART} placements={LEFT} />
      <Cluster side="right" items={OUTCOME_ART} placements={RIGHT} />
    </>
  );
}
