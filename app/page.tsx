"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "@/lib/utils";
import HeroArt from "@/components/sections/HeroArt";
import HeroScrollVideo from "@/components/sections/HeroScrollVideo";
import WhatWeDo from "@/components/sections/WhatWeDo";
import CaseStudyShowcase from "@/components/sections/CaseStudyShowcase";
import BuildProcess from "@/components/sections/BuildProcess";
import Clients from "@/components/sections/Clients";
import PricingPreview from "@/components/sections/PricingPreview";

import {
  Search,
  Share2,
  Code2,
  Smartphone,
  Megaphone,
  ThumbsUp,
  Bot,
  BrainCircuit,
  Zap,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  Star,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  LineChart as LineChartIcon,
  Repeat,
  Frown,
  Play,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import {
  SERVICES,
  STATS,
  TESTIMONIALS,
} from "@/lib/constants";

/* ── Icon map for feature cards ──────────────────────────── */
type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Search,
  Megaphone,
  Share2,
  ThumbsUp,
  Bot,
  BrainCircuit,
  Zap,
  Cpu,
};

/* ── Palette — mirrors the tokens in tailwind.config.ts ──────
   Inline styles need literals, so the handful used here are kept in
   sync with the CSS custom properties by name, not re-invented. */
const INK = "#14120F"; // headings
const PAPER = "#FAF9F6";
const FOREST = "#0E2A24"; // dark CTA band
const MOSS = "#1CA88C"; // logo emerald — fills, marks
const MOSS_DEEP = "#0C6B58"; // text-safe accent
const LAGOON = "#009AA8"; // decorative chart secondary





/* ── Animated counter ───────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        let start: number | null = null;
        const step = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / 1600, 1);
          setVal(Math.round(p * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ── Section content ─────────────────────────────────────── */
const PAINS = [
  {
    icon: Megaphone,
    quote: "I post every day and still hear crickets.",
    sub: "Effort going in, nothing coming back — no leads, no DMs, no sales.",
  },
  {
    icon: TrendingUp,
    quote: "My ads burn budget and bring nothing back.",
    sub: "You boost a post, the money disappears, and results never show up.",
  },
  {
    icon: Search,
    quote: "We are invisible on Google.",
    sub: "Competitors rank on page one while customers cannot find you.",
  },
  {
    icon: Frown,
    quote: "My site looks fine, but nobody buys.",
    sub: "Traffic lands, looks around, and leaves without taking action.",
  },
];

const STORY_PILLARS = [
  {
    icon: LineChartIcon,
    title: "Accountable to revenue",
    text: "Not likes, not impressions — the only number that pays your bills.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent by default",
    text: "A live dashboard and plain-English reports. You always know what works.",
  },
  {
    icon: Repeat,
    title: "No lock-in contracts",
    text: "Month to month. We earn next month by getting results in this one.",
  },
];

/* ════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════ */
export default function HomePage() {

  return (
    <main>
      {/* ══════════════════ HERO ══════════════════ */}
      <section
        className="relative overflow-hidden bg-paper xl:flex xl:min-h-[840px] xl:items-center 2xl:min-h-[920px]"
        style={{
          paddingTop: "calc(var(--navbar-height) + 48px)",
          paddingBottom: "72px",
        }}
      >
        <div className="absolute inset-0 dot-grid opacity-40" />
        {/* One soft emerald bloom behind the headline — the only colour
            in the upper fold, so the type stays the loudest thing. */}
        <div className="hero-glow w-[720px] h-[420px] max-w-[130vw] -top-40 left-1/2 -translate-x-1/2 bg-moss-400/10" />

        {/* Services left, outcomes right — decorative framing, xl and up. */}
        <HeroArt />

        <div className="container-site relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 bg-paper-raised border border-hairline text-ink-body"
            >
              <Star className="w-3.5 h-3.5" style={{ color: MOSS }} fill={MOSS} />
              Trusted by 43+ growing businesses
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="display-hero mx-auto max-w-[15ch] mb-7"
            >
              Become the brand your market{" "}
              {/* The accent is colour, not italic — the reference does the same,
                  and a heavy sans does not italicise gracefully. */}
              <span className="text-moss-600">can&rsquo;t ignore.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-ink-body text-lg leading-relaxed mb-9 max-w-xl mx-auto"
            >
              One AI-powered team runs your website, ads, SEO and content — and
              reports to a single dashboard built around the numbers that matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-9"
            >
              <Link
                href="/contact"
                className="btn btn-primary btn-lg inline-flex items-center gap-2"
              >
                Get my free growth plan <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="btn btn-secondary btn-lg inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" style={{ color: MOSS_DEEP }} /> See the
                dashboard
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-3 text-ink-muted text-sm"
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
          </div>
        </div>
      </section>

      {/* ══════════════ HERO SCROLL VIDEO ══════════════ */}
      {/* Cinematic scroll transition between the hero and the page. Ships with a
          branded stage; drop a file at /public/videos and pass `src` to play it. */}
      <HeroScrollVideo />

      {/* ══════════════ HOW WE BUILD ══════════════ */}
      {/* The hero reads as a distinct object (full-height, art, glow), not a
          flat paper band — so this first real section being bg-paper reads
          cleanly, and the paper/sand alternation continues from here. */}
      <BuildProcess />

      {/* ══════════════ WHAT WE DO ══════════════ */}
      <WhatWeDo />

      {/* ══════════════ PRICING PREVIEW ══════════════ */}
      <PricingPreview />

      {/* ══════════════════ PROBLEM ══════════════════ */}
      <section className="section-padding bg-paper">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* left — framing */}
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow">The problem</span>
              <h2 className="heading-section mt-3 mb-5">
                If this sounds familiar, you are not the problem.
              </h2>
              <p className="text-body-lg mb-6">
                You are not lazy and your business is not broken. You are just
                missing a system that turns effort into customers.
              </p>
              <p
                className="font-heading font-semibold text-lg"
                style={{ color: INK }}
              >
                It is not an effort problem. It is a{" "}
                <span style={{ color: MOSS_DEEP }}>system</span> problem — and
                that is fixable.
              </p>
            </div>

            {/* right — pain bento */}
            <div className="grid gap-3 sm:grid-cols-2">
              {PAINS.map((pain, i) => {
                const Icon = pain.icon;
                return (
                  <motion.div
                    key={pain.quote}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.06, 0.24), duration: 0.45 }}
                    className="flex h-full flex-col rounded-2xl border border-hairline bg-paper-raised p-5 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-moss-300 hover:shadow-brand"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-moss-100 text-moss-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-display text-lg leading-snug text-ink">
                      &ldquo;{pain.quote}&rdquo;
                    </p>
                    <p className="text-body mt-1.5 text-sm">{pain.sub}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ STORY ══════════════════ */}
      <section className="section-padding bg-sand">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow">Why we built this</span>
              <h2 className="heading-section mt-3 mb-5">
                We got tired of agencies selling busywork.
              </h2>
              <div className="space-y-4 text-body-lg">
                <p>
                  Most agencies hand you a report full of impressions, reach and
                  likes — numbers that look impressive and change nothing in your
                  bank account.
                </p>
                <p>
                  So we built the opposite: one AI-powered team that owns your
                  whole funnel — the website, the ads, the SEO, the content — and
                  answers to a single number that matters. Revenue.
                </p>
                <p className="font-semibold" style={{ color: INK }}>
                  When you grow, we grow. That is the entire model.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-3">
              {STORY_PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    /* Offset on Y, not X: an off-screen `x` offset on a
                       full-width card widens the document and produces a
                       horizontal scrollbar on narrow viewports. */
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="flex gap-4 items-start bg-paper-raised rounded-2xl p-5 sm:p-6 border border-hairline"
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-paper"
                      style={{ background: INK }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="heading-card mb-1">{p.title}</h3>
                      <p className="text-body text-sm">{p.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ OUR CLIENTS ══════════════ */}
      {/* Dark-green social-proof band leading into the proof section. Its forest
          surface is a deliberate accent break between STORY (sand) and PROOF
          (paper). */}
      <Clients />

      {/* ══════════════════ PROOF ══════════════════ */}
      <section className="section-padding bg-paper">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">The proof</span>
            <h2 className="heading-section mt-3 mb-4">Receipts beat promises.</h2>
            <p className="text-body-lg">
              Real numbers, real client websites, and real words from the people
              we have helped grow.
            </p>
          </div>

          {/* Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="rounded-2xl border border-hairline bg-paper-raised p-6 text-center"
              >
                <div className="stat-card-value mb-1.5">
                  <Counter to={Number(stat.value)} suffix={stat.suffix} />
                </div>
                <p className="text-ink-muted text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* The work — one story at a time.
              This used to be a 4-up thumbnail grid of the same four projects
              the What-We-Do section already renders three sections above, so
              the page showed the identical cards twice. A grid cannot tell a
              story; this can. */}
          <div className="mb-16">
            <CaseStudyShowcase />
          </div>

          {/* Quotes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="rounded-2xl border border-hairline bg-paper-raised p-6 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#E0A32E] text-[#E0A32E]" />
                  ))}
                </div>
                <p className="text-ink-body text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-hairline">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-paper font-semibold text-xs flex-shrink-0" style={{ background: INK }}>
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: INK }}>
                      {t.name}
                    </p>
                    <p className="text-xs text-ink-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section className="section-padding bg-sand">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">What is inside</span>
            <h2 className="heading-section mt-3 mb-4">
              One team. Your whole growth stack.
            </h2>
            <p className="text-body-lg">
              Everything that brings customers in, under one roof — so nothing
              falls through the cracks.
            </p>
          </div>

          {/* Bento: the first service leads as a wide feature; dense flow keeps
              the mixed spans gapless. */}
          <div className="grid grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon];
              const feature = i === 0;
              // First and last widen to 2 cols so 10 tiles fill the 4-col grid.
              const wide = i === 0 || i === SERVICES.length - 1;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.45 }}
                  className={wide ? "sm:col-span-2" : ""}
                >
                  <Link
                    href={`/services#${service.id}`}
                    className={cn(
                      "group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brand",
                      feature
                        ? "border-moss-200 bg-moss-50 hover:border-moss-300 sm:p-8"
                        : "border-hairline bg-paper-raised hover:border-moss-300",
                    )}
                  >
                    <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-moss-100 text-moss-700">
                      {Icon && <Icon className="h-5 w-5" />}
                    </span>
                    <h3 className={cn("heading-card mb-2", feature && "sm:text-xl")}>
                      {service.title}
                    </h3>
                    <p className="text-body mb-5 flex-1 text-sm leading-relaxed">
                      {feature ? service.description : service.shortDesc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-moss-600 transition-all group-hover:gap-2">
                      What you get <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: FOREST, paddingTop: "112px", paddingBottom: "112px" }}
      >
        <div className="absolute inset-0 dot-grid dot-grid-invert opacity-50" />
        <div className="hero-glow w-[680px] h-[360px] max-w-[130vw] -bottom-32 left-1/2 -translate-x-1/2 bg-moss-400/15" />
        <div className="container-site relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="display-lg text-paper mb-5">
              Ready to grow on{" "}
              <em className="italic text-moss-300">purpose</em>?
            </h2>
            <p className="text-paper/80 text-lg mb-9 leading-relaxed">
              Get a free, no-pressure growth plan built for your business — see
              exactly how we would turn your traffic into revenue.
            </p>
            <Link
              href="/contact"
              className="btn btn-accent btn-lg inline-flex items-center gap-2"
            >
              Get my free growth plan <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-paper/80 text-sm">
              {["No contracts", "No fluff", "Just a plan"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-moss-300" /> {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
