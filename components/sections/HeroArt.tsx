"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowUp,
  Star,
  LayoutDashboard,
  ArrowRightCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   HERO VISUAL — right-side composition for the homepage hero.

   A cutout portrait with three floating UI cards layered around it:
   an assistant/chat card (top-left of the photo), a testimonial pill
   (top-right, overlapping the photo's shoulder), and a feature-list
   card (bottom-right, anchored to the photo's hem).

   All copy below is PLACEHOLDER — swap PERSON_IMAGE_SRC, the bot
   name, testimonial count, and feature rows for real content before
   shipping. The photo expects a transparent-background cutout (PNG
   or WEBP) cropped tight to the subject; a busy rectangular photo
   will fight the card overlap.
════════════════════════════════════════════════════════════════ */

const PERSON_IMAGE_SRC = "/images/hero-person-placeholder.png"; // TODO: replace with real cutout

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
        "absolute rounded-2xl border border-hairline bg-paper-raised shadow-card backdrop-blur-sm",
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
      className="relative mx-auto hidden h-[620px] xl:h-[560px] w-full max-w-[530px] lg:block"
    >
      {/* ─── Person cutout ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduce ? 0 : 0.7,
          delay: reduce ? 0 : 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        /* Positioned with right-4, NOT translate classes — framer's inline
           transform (the y entrance) overwrites Tailwind translate utilities,
           which is exactly how this cutout used to drift off-viewport. */
        className="absolute bottom-0 right-2 h-[460px] w-[300px] xl:h-[520px] xl:w-[340px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/business_women.png"
          alt=""
          className="h-full w-full object-cover object-top [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]"
        />
        {/* soft ground shadow so the cutout doesn't float */}
        <div className="absolute -bottom-2 left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-full bg-ink/10 blur-xl" />
      </motion.div>

      {/* ─── Assistant / chat card ─────────────────────────────── */}
      <FloatingCard
        reduce={reduce}
        delay={0.4}
        className="-left-2 top-40 xl:top-44 w-[290px] p-5 xl:w-[320px]"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-moss-400/10 text-moss-600">
            <LayoutDashboard className="h-4 w-4" />
          </span>
          <p className="font-semibold text-ink text-sm">
            Introducing Interactive Dashboard
          </p>
        </div>
        <p className="mt-1 pl-[42px] text-xs text-ink-body">
          Your personal business workspace.
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-full bg-moss-600 px-4 py-2.5">
          <span className="flex text-xs text-paper items-center flex-1 justify-center ">
            <p>Manage your Leads and more </p>{" "}
            <ArrowRightCircle className="ml-1 h-4 w-4 text-paper" />
          </span>
        </div>
      </FloatingCard>

      {/* ─── Testimonial pill ──────────────────────────────────── */}
      <FloatingCard
        reduce={reduce}
        delay={0.55}
        className="left-0 top-4 w-[260px] p-4 xl:w-[300px]"
      >
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
        delay={0.7}
        className="-bottom-6 left-0 w-[290px] overflow-hidden xl:left-auto xl:right-0 xl:w-[320px]"
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
