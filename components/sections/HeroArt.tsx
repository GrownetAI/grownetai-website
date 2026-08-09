"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   HERO VISUAL — right-side composition for the homepage hero.

   Two stacked UI cards: social proof and a feature list. They used to
   be absolutely positioned AROUND a stock portrait cutout; with the
   photo gone they flow as a plain column, so nothing is anchored to a
   subject that is no longer there. A third card pitching the client
   dashboard was dropped along with the dashboard itself.
════════════════════════════════════════════════════════════════ */

const MOSS = "#1CA88C"; // logo emerald — fills, marks
const MOSS_DEEP = "#0C6B58"; // text-safe accent
const LAGOON = "#009AA8"; // decorative chart secondary
const FEATURES: { label: string; value: string }[] = [
  { label: "AI Powered", value: "Modern Tech" },
  { label: "Automation", value: "Save Time & Effort" },
  { label: "Support", value: "24/7 Dedicated Team" },
  { label: "Trusted Brand", value: "Since 2025" },
];

const AVATAR_COUNT = 4;

function FloatingCard({
  className,
  delay,
  reduce,
  children,
}: {
  className?: string;
  delay: number;
  reduce: boolean | null;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduce ? 0 : 0.6,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "rounded-2xl border border-hairline bg-paper-raised shadow-card backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export default function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="mx-auto hidden w-full max-w-[420px] flex-col gap-5 lg:flex"
    >
      {/* ─── Testimonial pill ──────────────────────────────────── */}
      <FloatingCard reduce={reduce} delay={0.3} className="w-full p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-3 text-ink-muted text-sm mx-auto sm:mx-0 sm:justify-start"
        >
          <div className="flex -space-x-2">
            {[MOSS_DEEP, MOSS, LAGOON].map((c, i) => (
              <span
                key={i}
                className="w-7 h-7 rounded-full border-2 border-paper flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: c }}
              >
                {["R", "S", "M"][i]}
              </span>
            ))}
          </div>
          <span>
            <span className="text-ink font-semibold">4.9/5</span> from 43+
            businesses
          </span>
        </motion.div>
        <p className="mt-3 font-semibold text-ink">
          People Say &ldquo;Excellent&rdquo;
        </p>
        <p className="text-sm text-ink-muted">Based on 1000+ feedbacks</p>
      </FloatingCard>

      {/* ─── Feature list card ─────────────────────────────────── */}
      <FloatingCard
        reduce={reduce}
        delay={0.6}
        className="w-full overflow-hidden"
      >
        <div className="border-b border-hairline bg-amber-100/60 px-5 py-3">
          <p className="font-semibold text-ink">Why Choose GrownetAI?</p>
        </div>
        <dl className="divide-y divide-hairline px-5">
          {FEATURES.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3">
              <dt className="font-medium text-ink">{label}</dt>
              <dd className="text-sm text-ink-body">{value}</dd>
            </div>
          ))}
        </dl>
      </FloatingCard>
    </div>
  );
}
