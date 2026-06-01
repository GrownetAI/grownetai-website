"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

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
  Instagram,
  Send,
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
  Bell,
  Settings,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import { SERVICES, STATS, TESTIMONIALS } from "@/lib/constants";

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

/* ── Brand palette (flat) ────────────────────────────────── */
const TEAL = "#008080";
const AQUA = "#00E5E5";
const DEEP = "#006666";
const INK = "#0B1F1F";

/* ════════════════════════════════════════════════════════
   HERO PRODUCT MOCK — a polished preview of the real dashboard
════════════════════════════════════════════════════════ */
function AreaChart() {
  const a = [30, 42, 36, 54, 49, 66, 60, 74, 69, 86];
  const b = [18, 24, 30, 27, 38, 34, 44, 41, 50, 56];
  const W = 560;
  const H = 190;
  const padX = 4;
  const top = 12;
  const bottom = 28;
  const max = 92;
  const toPts = (arr: number[]) =>
    arr.map((v, i) => ({
      x: padX + (i / (arr.length - 1)) * (W - padX * 2),
      y: top + (1 - v / max) * (H - top - bottom),
    }));
  const path = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const pa = toPts(a);
  const pb = toPts(b);
  const area = `${path(pa)} L${pa[pa.length - 1].x.toFixed(1)},${H - bottom} L${pa[0].x.toFixed(1)},${H - bottom} Z`;
  const last = pa[pa.length - 1];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 190 }}>
      <defs>
        <linearGradient id="hgArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.16" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.2, 0.45, 0.7].map((t) => (
        <line
          key={t}
          x1={padX}
          x2={W - padX}
          y1={top + t * (H - top - bottom)}
          y2={top + t * (H - top - bottom)}
          stroke="#eef2f2"
          strokeWidth="1"
        />
      ))}
      <path d={area} fill="url(#hgArea)" />
      <path d={path(pb)} fill="none" stroke={AQUA} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" opacity="0.7" />
      <path d={path(pa)} fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r="4.5" fill={TEAL} stroke="#fff" strokeWidth="2" />
      {months.map((m, i) => (
        <text
          key={m}
          x={padX + (i / (months.length - 1)) * (W - padX * 2)}
          y={H - 8}
          fill="#9aa6a6"
          fontSize="9"
          textAnchor="middle"
        >
          {m}
        </text>
      ))}
    </svg>
  );
}

const MOCK_KPIS = [
  { label: "Total reach", value: "390K", delta: "+12.5%", up: true },
  { label: "Revenue", value: "$89,450", delta: "+8.2%", up: true },
  { label: "Awaiting payout", value: "$2,900", delta: "2 of 23", up: false },
  { label: "Avg. ROAS", value: "6.4×", delta: "+5.1%", up: true },
];

const MOCK_CAMPAIGNS = [
  { name: "Summer campaign", platform: "instagram", status: "Upcoming", tone: "up" },
  { name: "Holliday", platform: "telegram", status: "Ongoing", tone: "on" },
  { name: "Winter is coming!", platform: "instagram", status: "Ended", tone: "end" },
  { name: "Spring collection", platform: "telegram", status: "Ended", tone: "end" },
];

function PlatformChip({ platform }: { platform: string }) {
  const Icon = platform === "telegram" ? Send : Instagram;
  return (
    <span
      className="inline-flex w-7 h-7 rounded-md items-center justify-center"
      style={{ background: "rgba(0,128,128,0.08)", color: TEAL }}
    >
      <Icon className="w-3.5 h-3.5" />
    </span>
  );
}

function HeroDashboardMock() {
  const toneStyle: Record<string, { bg: string; color: string }> = {
    up: { bg: "rgba(0,128,128,0.1)", color: DEEP },
    on: { bg: "rgba(0,229,229,0.18)", color: DEEP },
    end: { bg: "#f1f5f5", color: "#7c8a8a" },
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-5xl mx-auto"
    >
      <div
        className="rounded-xl overflow-hidden bg-white text-left"
        style={{
          border: "1px solid rgba(11,31,31,0.08)",
          boxShadow:
            "0 40px 80px -24px rgba(0,77,77,0.45), 0 12px 24px -12px rgba(0,0,0,0.2)",
        }}
      >
        {/* window top bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: TEAL }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: AQUA }} />
            </span>
            <span className="font-heading font-bold text-sm" style={{ color: INK }}>
              Campaign Dashboard
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs">
            {["Overview", "Campaigns", "Finance"].map((t, i) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-md font-medium"
                style={
                  i === 0
                    ? { background: "rgba(0,128,128,0.1)", color: DEEP }
                    : { color: "#8a9a9a" }
                }
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md border border-gray-100 flex items-center justify-center text-gray-400">
              <Bell className="w-3.5 h-3.5" />
            </span>
            <span className="w-7 h-7 rounded-md border border-gray-100 flex items-center justify-center text-gray-400">
              <Settings className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* header + segmented control */}
          <div className="flex items-end justify-between mb-5 gap-4 flex-wrap">
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg" style={{ color: INK }}>
                Performance overview
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Your growth, ad spend and campaigns at a glance.
              </p>
            </div>
            <div className="flex items-center rounded-lg border border-gray-100 p-0.5 text-xs">
              {["Today", "This week", "This month"].map((t, i) => (
                <span
                  key={t}
                  className="px-2.5 py-1.5 rounded-md font-medium"
                  style={i === 2 ? { background: TEAL, color: "#fff" } : { color: "#8a9a9a" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {MOCK_KPIS.map((k) => (
              <div key={k.label} className="rounded-lg border border-gray-100 p-3.5">
                <p className="text-[11px] text-gray-400 font-medium mb-1.5">{k.label}</p>
                <p className="font-heading font-bold text-xl" style={{ color: INK }}>
                  {k.value}
                </p>
                <span
                  className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold px-1.5 py-0.5 rounded"
                  style={
                    k.up
                      ? { background: "rgba(0,128,128,0.1)", color: DEEP }
                      : { background: "#f1f5f5", color: "#7c8a8a" }
                  }
                >
                  {k.up && <ArrowUpRight className="w-3 h-3" />}
                  {k.delta}
                </span>
              </div>
            ))}
          </div>

          {/* chart + campaigns */}
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 rounded-lg border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-heading font-semibold text-sm" style={{ color: INK }}>
                  Growth overview
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 rounded-full" style={{ background: TEAL }} />
                    This year
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 rounded-full" style={{ background: AQUA }} />
                    Last year
                  </span>
                </div>
              </div>
              <AreaChart />
            </div>

            <div className="lg:col-span-2 rounded-lg border border-gray-100 p-4">
              <p className="font-heading font-semibold text-sm mb-3" style={{ color: INK }}>
                Latest campaigns
              </p>
              <div className="flex flex-col gap-2.5">
                {MOCK_CAMPAIGNS.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <PlatformChip platform={c.platform} />
                    <span className="text-xs font-medium flex-1 truncate" style={{ color: INK }}>
                      {c.name}
                    </span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={toneStyle[c.tone]}
                    >
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   PROOF — portfolio "screenshots"
════════════════════════════════════════════════════════ */
const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    name: "FreshBite Restaurant",
    tag: "Food & Hospitality",
    emoji: "🍽️",
    navItems: ["Menu", "Reservations", "About"],
    tagline: "Fresh. Local. Delicious.",
    sub: "Farm-to-table dining in the heart of the city",
    cta: "Reserve a Table",
    results: ["340% orders", "2.1L reach", "4.8★ rating"],
    previewImg:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=480&q=80",
  },
  {
    id: 2,
    name: "GlowSkin Clinic",
    tag: "Beauty & Wellness",
    emoji: "✨",
    navItems: ["Services", "Treatments", "Book"],
    tagline: "Your skin. Our passion.",
    sub: "Certified dermatologists & aesthetic experts",
    cta: "Book Appointment",
    results: ["6.4× ROAS", "800+ bookings", "₹42L revenue"],
    previewImg:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=480&q=80",
  },
  {
    id: 3,
    name: "BuildNest Real Estate",
    tag: "Real Estate",
    emoji: "🏠",
    navItems: ["Buy", "Rent", "Sell"],
    tagline: "Find Your Dream Home",
    sub: "Premium properties across India's top cities",
    cta: "Explore Properties",
    results: ["₹2.4Cr sales", "284% traffic", "120+ inquiries"],
    previewImg:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=480&q=80",
  },
  {
    id: 4,
    name: "EduReach Academy",
    tag: "EdTech",
    emoji: "🎓",
    navItems: ["Courses", "Mentors", "Enroll"],
    tagline: "Learn Without Limits",
    sub: "Live & recorded courses for working professionals",
    cta: "Start Learning",
    results: ["12k+ students", "4.9★ rating", "₹3.2Cr GMV"],
    previewImg:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&q=80",
  },
];

function MiniWebsite({ project }: { project: (typeof PORTFOLIO_PROJECTS)[0] }) {
  return (
    <div className="w-full h-full flex flex-col font-sans overflow-hidden">
      <div
        className="flex items-center justify-between flex-shrink-0 px-5 py-3"
        style={{ background: TEAL }}
      >
        <span className="text-white font-bold text-base">
          {project.emoji} {project.name.split(" ")[0]}
        </span>
        <div className="flex gap-4">
          {project.navItems.map((x) => (
            <span key={x} className="text-white/85 text-xs">
              {x}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <img
          src={project.previewImg}
          alt={project.name}
          className="w-full h-full object-cover block"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-white font-extrabold text-xl m-0" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
            {project.tagline}
          </p>
          <p className="text-white/75 text-xs mt-1.5 mb-3.5 leading-relaxed" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
            {project.sub}
          </p>
          <span className="inline-block px-6 py-2.5 rounded-lg text-white text-xs font-bold" style={{ background: TEAL }}>
            {project.cta}
          </span>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0 px-5 py-3 bg-white" style={{ borderTop: "1px solid rgba(0,128,128,0.15)" }}>
        {project.results.map((r) => (
          <span key={r} className="text-xs font-semibold px-3 py-1.5 rounded-md" style={{ color: TEAL, background: "rgba(0,128,128,0.1)" }}>
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

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
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <main>
      {/* ══════════════════ HERO ══════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: TEAL,
          paddingTop: "calc(var(--navbar-height) + 56px)",
          paddingBottom: "80px",
        }}
      >
        <div className="absolute inset-0 dot-grid opacity-[0.12]" />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[120%] h-[420px] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(0,229,229,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold mb-7"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              <Star className="w-3.5 h-3.5" style={{ color: AQUA }} fill={AQUA} />
              Trusted by 43+ growing businesses
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="display-hero text-glossy mx-auto max-w-[15ch] mb-6"
            >
              Become the brand your market can&rsquo;t ignore.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto"
            >
              One AI-powered team runs your website, ads, SEO and content — and
              reports to a single dashboard built around the numbers that matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
            >
              <Link
                href="/contact"
                className="btn btn-accent btn-lg inline-flex items-center gap-2 font-bold"
              >
                Get my free growth plan <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white transition-colors hover:text-black/80"
                style={{ border: "1px solid rgba(255,255,255,0.35)" }}
              >
                <Play className="w-4 h-4" style={{ color: AQUA }} /> See the dashboard
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-3 text-white/75 text-sm "
            >
              <div className="flex -space-x-2">
                {[TEAL, AQUA, DEEP].map((c, i) => (
                  <span
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white/30 flex items-center justify-center text-[10px] font-bold"
                    style={{ background: c, color: i === 1 ? INK : "#fff" }}
                  >
                    {["R", "S", "M"][i]}
                  </span>
                ))}
              </div>
              <span>
                <span className="text-white font-semibold">4.9/5</span> from 43+
                businesses
              </span>
            </motion.div>
          </div>

          {/* The product preview — shown wide and only half-visible, fading
              ("smoked") into the hero so it reads like a live app continuing
              below the fold. */}
          <div className="relative mt-12 sm:mt-16">
            <div
              className="relative mx-auto w-full max-w-5xl overflow-hidden px-1"
              style={{ maxHeight: "clamp(260px, 44vw, 480px)" }}
            >
              <HeroDashboardMock />
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,128,128,0) 0%, #008080 92%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════ PROBLEM ══════════════════ */}
      <section className="section-padding bg-white">
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
                <span style={{ color: TEAL }}>system</span> problem — and that is
                fixable.
              </p>
            </div>

            {/* right — pain list */}
            <div className="divide-y divide-gray-100">
              {PAINS.map((pain, i) => {
                const Icon = pain.icon;
                return (
                  <motion.div
                    key={pain.quote}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}
                    className="flex gap-4 py-5 first:pt-0"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,128,128,0.08)", color: TEAL }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p
                        className="font-heading font-semibold text-lg leading-snug"
                        style={{ color: INK }}
                      >
                        &ldquo;{pain.quote}&rdquo;
                      </p>
                      <p className="text-body text-sm mt-1">{pain.sub}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ STORY ══════════════════ */}
      <section className="section-padding" style={{ background: "#f6fbfb" }}>
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
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-100"
                  >
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                      style={{ background: TEAL }}
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

      {/* ══════════════════ PROOF ══════════════════ */}
      <section className="section-padding bg-white">
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
                className="rounded-xl border border-gray-100 p-6 text-center"
              >
                <div className="stat-card-value mb-1">
                  <Counter to={Number(stat.value)} suffix={stat.suffix} />
                </div>
                <p className="text-brand-slate-gray text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Screenshots */}
          <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
            <h3 className="font-heading font-bold text-xl" style={{ color: INK }}>
              Sites we have shipped
            </h3>
            <span className="text-sm text-brand-slate-gray">
              Tap any preview to open it
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                onClick={() => setSelected(i)}
                className="group cursor-pointer rounded-xl border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.previewImg}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)" }} />
                  <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-md text-white" style={{ background: "rgba(0,128,128,0.9)" }}>
                    {project.tag}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm" style={{ color: INK }}>
                      {project.name}
                    </h4>
                    <ArrowUpRight className="w-4 h-4 text-brand-light-gray group-hover:text-brand-teal transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.results.map((r) => (
                      <span key={r} className="text-[11px] font-semibold px-2 py-0.5 rounded-md" style={{ background: "rgba(0,128,128,0.08)", color: TEAL }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
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
                className="rounded-xl border border-gray-100 p-6 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-brand-slate-gray text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ background: TEAL }}>
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: INK }}>
                      {t.name}
                    </p>
                    <p className="text-xs text-brand-slate-gray">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Preview modal */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 24 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[560px] rounded-xl overflow-hidden bg-white"
                style={{ boxShadow: "0 32px 80px rgba(0,77,77,0.35)", border: "1px solid rgba(0,128,128,0.3)" }}
              >
                <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: "rgba(0,128,128,0.1)" }}>
                      {PORTFOLIO_PROJECTS[selected].emoji}
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: INK }}>
                        {PORTFOLIO_PROJECTS[selected].name}
                      </p>
                      <p className="text-xs text-brand-slate-gray">
                        {PORTFOLIO_PROJECTS[selected].tag}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-slate-gray"
                    style={{ background: "rgba(0,0,0,0.05)" }}
                    aria-label="Close preview"
                  >
                    ✕
                  </button>
                </div>
                <div className="h-[380px]">
                  <MiniWebsite project={PORTFOLIO_PROJECTS[selected]} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section className="section-padding" style={{ background: "#f6fbfb" }}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                >
                  <Link
                    href={`/services#${service.id}`}
                    className="group block h-full bg-white rounded-xl p-6 border border-gray-100 hover:border-brand-teal/30 hover:shadow-md transition-all duration-300"
                  >
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: "rgba(0,128,128,0.08)", color: TEAL }}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <h3 className="heading-card mb-2">{service.title}</h3>
                    <p className="text-body text-sm leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>
                    <span
                      className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                      style={{ color: TEAL }}
                    >
                      What you get <ArrowRight className="w-4 h-4" />
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
        style={{ background: TEAL, paddingTop: "104px", paddingBottom: "104px" }}
      >
        <div className="absolute inset-0 dot-grid opacity-[0.12]" />
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[120%] h-[360px] pointer-events-none"
          style={{ background: "radial-gradient(60% 100% at 50% 100%, rgba(0,229,229,0.16) 0%, transparent 70%)" }}
        />
        <div className="container-site relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="display-lg text-white mb-4">
              Ready to grow on <span style={{ color: AQUA }}>purpose</span>?
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Get a free, no-pressure growth plan built for your business — see
              exactly how we would turn your traffic into revenue.
            </p>
            <Link
              href="/contact"
              className="btn btn-accent btn-lg inline-flex items-center gap-2 font-bold"
            >
              Get my free growth plan <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 text-white/75 text-sm">
              {["No contracts", "No fluff", "Just a plan"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: AQUA }} /> {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
