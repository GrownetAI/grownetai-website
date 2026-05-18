"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Search,
  Target,
  Share2,
  Video,
  Code2,
  Palette,
  Mail,
  Instagram,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  TrendingUp,
  DollarSign,
  ChevronDown,
  Eye,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import {
  SERVICES,
  STATS,
  TESTIMONIALS,
  PROCESS_STEPS,
  FAQS,
  BLOG_POSTS,
  INDUSTRIES,
  SITE_CONFIG,
} from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";

/* ── Icon maps ──────────────────────────────────────────── */
type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Search,
  Target,
  Share2,
  Video,
  Code2,
  Palette,
  Mail,
  Instagram,
};
const STAT_ICONS: Record<string, LucideIcon> = {
  Users,
  Star,
  TrendingUp,
  DollarSign,
};

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

/* ══════════════════════════════════════════════════════════
   ANALYTICS WIDGET
══════════════════════════════════════════════════════════ */
// const TRAFFIC_DATA = [22, 38, 30, 52, 44, 68, 60, 84, 72, 91, 78, 110];
// const CHART_MONTHS = [
//   "J",
//   "F",
//   "M",
//   "A",
//   "M",
//   "J",
//   "J",
//   "A",
//   "S",
//   "O",
//   "N",
//   "D",
// ];
// const MINI_STATS = [
//   { label: "Organic Traffic", value: "+284%", color: "#3BC456" },
//   { label: "Leads Generated", value: "+192%", color: "#1AABAB" },
//   { label: "ROAS", value: "6.4×", color: "#3BC456" },
// ];

const TRAFFIC_DATA = [22, 38, 30, 52, 44, 68, 60, 84, 72, 91, 78, 110];
const CHART_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const CHART_STATS = [
  { label: "Organic Traffic", value: "+284%", color: "#3BC456" },
  { label: "Leads Generated", value: "+192%", color: "#1AABAB" },
  { label: "ROAS", value: "6.4×", color: "#3BC456" },
];

// function AnimatedLineChart() {
//   const [progress, setProgress] = useState(0);
//   const rafRef = useRef<number | null>(null);
//   useEffect(() => {
//     const start = performance.now();
//     const tick = (now: number) => {
//       const p = Math.min((now - start) / 2000, 1);
//       setProgress(1 - Math.pow(1 - p, 3));
//       if (p < 1) rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   const W = 310,
//     H = 118,
//     pad = 10;
//   const max = Math.max(...TRAFFIC_DATA),
//     min = Math.min(...TRAFFIC_DATA);
//   const pts = TRAFFIC_DATA.map((v, i) => ({
//     x: pad + (i / (TRAFFIC_DATA.length - 1)) * (W - pad * 2),
//     y: H - pad - ((v - min) / (max - min)) * (H - pad * 2 - 10),
//   }));

//   const visiblePts = pts
//     .filter((_, i) => i / (pts.length - 1) <= progress + 1 / (pts.length - 1))
//     .map((p, i) => {
//       const t = i / (pts.length - 1);
//       if (t <= progress) return p;
//       const prev = pts[i - 1];
//       if (!prev) return p;
//       const prevT = (i - 1) / (pts.length - 1);
//       const frac = (progress - prevT) / (t - prevT);
//       return {
//         x: prev.x + (p.x - prev.x) * frac,
//         y: prev.y + (p.y - prev.y) * frac,
//       };
//     });

//   const toD = (ps: { x: number; y: number }[]) =>
//     ps
//       .map(
//         (p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`,
//       )
//       .join(" ");
//   const last = visiblePts[visiblePts.length - 1];
//   const areaD =
//     visiblePts.length > 1
//       ? `${toD(visiblePts)} L${last.x.toFixed(1)},${H} L${pts[0].x.toFixed(1)},${H} Z`
//       : "";

//   return (
//     <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
//       <defs>
//         <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#3BC456" stopOpacity="0.32" />
//           <stop offset="100%" stopColor="#3BC456" stopOpacity="0.01" />
//         </linearGradient>
//         <linearGradient id="lGrad" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0%" stopColor="#1AABAB" />
//           <stop offset="100%" stopColor="#3BC456" />
//         </linearGradient>
//         <filter id="dotGlow">
//           <feGaussianBlur stdDeviation="2" result="b" />
//           <feMerge>
//             <feMergeNode in="b" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>
//       {[0.25, 0.5, 0.75].map((t) => (
//         <line
//           key={t}
//           x1={pad}
//           y1={pad + (1 - t) * (H - pad * 2)}
//           x2={W - pad}
//           y2={pad + (1 - t) * (H - pad * 2)}
//           stroke="rgba(255,255,255,0.07)"
//           strokeWidth="1"
//           strokeDasharray="3 4"
//         />
//       ))}
//       {areaD && <path d={areaD} fill="url(#aGrad)" />}
//       {visiblePts.length > 1 && (
//         <path
//           d={toD(visiblePts)}
//           fill="none"
//           stroke="url(#lGrad)"
//           strokeWidth="3"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           filter="url(#dotGlow)"
//         />
//       )}
//       {CHART_MONTHS.filter((_, i) => i % 3 === 0).map((m, i) => (
//         <text
//           key={m}
//           x={pad + ((i * 3) / (TRAFFIC_DATA.length - 1)) * (W - pad * 2)}
//           y={H - 1}
//           fill="rgba(255,255,255,0.22)"
//           fontSize="8"
//           textAnchor="middle"
//           fontFamily="sans-serif"
//         >
//           {m}
//         </text>
//       ))}
//       {last && progress > 0.05 && (
//         <>
//           <circle
//             cx={last.x}
//             cy={last.y}
//             r="4.5"
//             fill="#3BC456"
//             filter="url(#dotGlow)"
//           />
//           <circle
//             cx={last.x}
//             cy={last.y}
//             r="8.5"
//             fill="none"
//             stroke="#3BC456"
//             strokeWidth="1.5"
//             strokeOpacity="0.30"
//           />
//         </>
//       )}
//     </svg>
//   );
// }
function AnimatedLineChart() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 2000, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const W = 400,
    H = 180,
    padX = 36,
    padY = 24;
  const max = Math.max(...TRAFFIC_DATA);
  const min = Math.min(...TRAFFIC_DATA);

  const pts = TRAFFIC_DATA.map((v, i) => ({
    x: padX + (i / (TRAFFIC_DATA.length - 1)) * (W - padX * 2),
    y: H - padY - ((v - min) / (max - min)) * (H - padY * 2 - 8),
  }));

  const visiblePts = pts
    .filter((_, i) => i / (pts.length - 1) <= progress + 1 / (pts.length - 1))
    .map((p, i) => {
      const t = i / (pts.length - 1);
      if (t <= progress) return p;
      const prev = pts[i - 1];
      if (!prev) return p;
      const prevT = (i - 1) / (pts.length - 1);
      const frac = (progress - prevT) / (t - prevT);
      return {
        x: prev.x + (p.x - prev.x) * frac,
        y: prev.y + (p.y - prev.y) * frac,
      };
    });

  const toD = (ps: { x: number; y: number }[]) =>
    ps
      .map(
        (p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`,
      )
      .join(" ");

  const last = visiblePts[visiblePts.length - 1];
  const areaD =
    visiblePts.length > 1
      ? `${toD(visiblePts)} L${last.x.toFixed(1)},${H - padY} L${pts[0].x.toFixed(1)},${H - padY} Z`
      : "";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="cArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3BC456" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3BC456" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="cLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1AABAB" />
          <stop offset="100%" stopColor="#3BC456" />
        </linearGradient>
        <filter id="cGlow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const yPos = padY + (1 - t) * (H - padY * 2 - 8);
        const val = Math.round(min + t * (max - min));
        return (
          <g key={t}>
            <line
              x1={padX}
              y1={yPos}
              x2={W - padX}
              y2={yPos}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <text
              x={padX - 2}
              y={yPos + 3}
              fill="rgba(255,255,255,0.22)"
              fontSize="7"
              textAnchor="end"
              fontFamily="sans-serif"
            >
              {val}k
            </text>
          </g>
        );
      })}

      {areaD && <path d={areaD} fill="url(#cArea)" />}

      {visiblePts.length > 1 && (
        <path
          d={toD(visiblePts)}
          fill="none"
          stroke="url(#cLine)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#cGlow)"
        />
      )}

      {visiblePts.map((p, i) => {
        const t = i / (pts.length - 1);
        if (t > progress) return null;
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2"
            fill="#1AABAB"
            opacity="0.55"
          />
        );
      })}

      {last && progress > 0.05 && (
        <>
          <circle
            cx={last.x}
            cy={last.y}
            r="5"
            fill="#3BC456"
            filter="url(#cGlow)"
          />
          <circle
            cx={last.x}
            cy={last.y}
            r="9"
            fill="none"
            stroke="#3BC456"
            strokeWidth="1.5"
            strokeOpacity="0.30"
          />
          <rect
            x={last.x - 22}
            y={last.y - 24}
            width="44"
            height="16"
            rx="4"
            fill="rgba(59,196,86,0.18)"
            stroke="rgba(59,196,86,0.35)"
            strokeWidth="0.8"
          />
          <text
            x={last.x}
            y={last.y - 13}
            fill="#3BC456"
            fontSize="7.5"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontWeight="700"
          >
            110k
          </text>
        </>
      )}

      {CHART_MONTHS.filter((_, i) => i % 3 === 0).map((m, idx) => (
        <text
          key={m}
          x={padX + ((idx * 3) / (TRAFFIC_DATA.length - 1)) * (W - padX * 2)}
          y={H - 4}
          fill="rgba(255,255,255,0.55)"
          fontSize="9"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          {m}
        </text>
      ))}
    </svg>
  );
}

// function HeroAnalyticsWidget() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 60, y: 24 }}
//       animate={{ opacity: 1, x: 0, y: 0 }}
//       transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
//       className="relative w-full max-w-[340px]"
//     >
//       {/* Halo */}
//       <div
//         className="absolute inset-0 rounded-3xl blur-2xl opacity-20 scale-90"
//         style={{ background: "linear-gradient(135deg,#1AABAB,#3BC456)" }}
//       />

//       {/* Glass card */}
//       <div
//         className="relative rounded-3xl p-5 overflow-hidden"
//         style={{
//           background: "rgba(255,255,255,0.06)",
//           backdropFilter: "blur(24px)",
//           border: "1px solid rgba(255,255,255,0.13)",
//           boxShadow:
//             "0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
//         }}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-0.5">
//               Client Growth Report
//             </p>
//             <p className="text-white font-bold text-sm">Organic Traffic</p>
//           </div>
//           <div
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
//             style={{
//               background: "rgba(59,196,86,0.15)",
//               color: "#3BC456",
//               border: "1px solid rgba(59,196,86,0.25)",
//             }}
//           >
//             <TrendingUp className="w-3 h-3" />
//             +284%
//           </div>
//         </div>

//         {/* Big number */}
//         <div className="mb-3">
//           <span
//             className="font-black text-3xl"
//             style={{
//               background:
//                 "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.65) 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             1,24,830
//           </span>
//           <span className="text-white/35 text-xs ml-2">monthly visitors</span>
//         </div>

//         {/* Chart */}
//         <div className="-mx-1 mb-3">
//           <AnimatedLineChart />
//         </div>

//         <div
//           className="border-t mb-3"
//           style={{ borderColor: "rgba(255,255,255,0.08)" }}
//         />

//         {/* Mini stats */}
//         <div className="flex flex-col gap-2">
//           {MINI_STATS.map((s, i) => (
//             <motion.div
//               key={s.label}
//               initial={{ opacity: 0, x: 12 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
//               className="flex items-center justify-between"
//             >
//               <div className="flex items-center gap-2">
//                 <div
//                   className="w-1.5 h-1.5 rounded-full"
//                   style={{ background: s.color }}
//                 />
//                 <span className="text-white/50 text-xs">{s.label}</span>
//               </div>
//               <span className="text-xs font-bold" style={{ color: s.color }}>
//                 {s.value}
//               </span>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom pill */}
//         <motion.div
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.3, duration: 0.4 }}
//           className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3"
//           style={{
//             background: "rgba(26,171,171,0.08)",
//             border: "1px solid rgba(26,171,171,0.18)",
//           }}
//         >
//           <div className="flex items-center gap-2">
//             <Users className="w-3.5 h-3.5 text-[#1AABAB]" />
//             <span className="text-white/70 text-xs font-semibold">
//               Active Clients
//             </span>
//           </div>
//           <div className="flex items-center gap-1">
//             <span className="text-white font-bold text-sm">500+</span>
//             <ArrowUpRight className="w-3.5 h-3.5 text-[#3BC456]" />
//           </div>
//         </motion.div>

//         {/* LIVE DATA badge */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.6 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1.5, type: "spring", stiffness: 220 }}
//           className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-xl"
//           style={{
//             background: "linear-gradient(135deg,#1AABAB,#3BC456)",
//             border: "2px solid rgba(255,255,255,0.15)",
//           }}
//         >
//           <Eye className="w-4 h-4 text-white mb-0.5" />
//           <span className="text-white text-[8px] font-black leading-tight tracking-wide text-center">
//             LIVE
//             <br />
//             DATA
//           </span>
//         </motion.div>
//       </div>

//       {/* Floating revenue card */}
//       <motion.div
//         initial={{ opacity: 0, y: 16, x: -8 }}
//         animate={{ opacity: 1, y: 0, x: 0 }}
//         transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 flex items-center gap-3"
//         style={{
//           background: "rgba(6,6,10,0.88)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(26,171,171,0.20)",
//           boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
//         }}
//       >
//         <div
//           className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
//           style={{ background: "linear-gradient(135deg,#1AABAB,#3BC456)" }}
//         >
//           <BarChart3 className="w-4 h-4 text-white" />
//         </div>
//         <div>
//           <p className="text-white font-bold text-sm leading-none mb-0.5">
//             ₹42L+ Revenue
//           </p>
//           <p className="text-white/40 text-[11px]">Generated this quarter</p>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
function HeroAnalyticsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 24 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[460px] mx-auto"
    >
      <div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-20 scale-90"
        style={{ background: "linear-gradient(135deg,#1AABAB,#3BC456)" }}
      />

      <div
        className="relative rounded-3xl p-5 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.13)",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-0.5">
              Client Growth Report
            </p>
            <p className="text-white font-bold text-sm">Organic Traffic</p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: "rgba(59,196,86,0.15)",
              color: "#3BC456",
              border: "1px solid rgba(59,196,86,0.25)",
            }}
          >
            <TrendingUp className="w-3 h-3" />
            +284%
          </div>
        </div>

        <div className="mb-1">
          <span
            className="font-black text-3xl"
            style={{
              background:
                "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.65) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            1,24,830
          </span>
          <span className="text-white/35 text-xs ml-2">monthly visitors</span>
        </div>

        <div
          className="mb-4 rounded-xl overflow-hidden"
          style={{ background: "rgba(0,0,0,0.18)", padding: "8px 4px 4px" }}
        >
          <AnimatedLineChart />
        </div>

        <div
          className="border-t mb-3"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        />

        <div className="flex flex-col gap-2">
          {CHART_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="text-white/50 text-xs">{s.label}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: s.color }}>
                {s.value}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 220 }}
          className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-xl"
          style={{
            background: "linear-gradient(135deg,#1AABAB,#3BC456)",
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        >
          <Eye className="w-4 h-4 text-white mb-0.5" />
          <span className="text-white text-[8px] font-black leading-tight tracking-wide text-center">
            LIVE
            <br />
            DATA
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ PAGE ══════════════════════════ */
export default function HomePage() {
  const waHref = whatsappUrl(
    SITE_CONFIG.whatsapp,
    "Hi GrownetAI, I'd like a free consultation!",
  );
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroO = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <main className="pt-[var(--navbar-height)]">
      {/* ══════ HERO ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center bg-gradient-hero overflow-hidden noise-overlay"
      >
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="hero-glow w-[560px] h-[560px] bg-teal-400/25 top-[-160px] left-[-140px]" />
        <div className="hero-glow w-[420px] h-[420px] bg-green-400/20 bottom-[-100px] right-[-80px]" />
        <motion.div
          aria-hidden
          animate={{ top: ["8%", "92%", "8%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        <div className="container-site relative z-10 py-20 lg:py-25">
          <motion.div style={{ y: heroY, opacity: heroO }}>
            {/* Two-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
              {/* LEFT — copy */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="glass inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white/90 mb-3">
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                    AI-Powered Digital Marketing Agency
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-display font-black text-white leading-[1.05] mb-6"
                  style={{
                    fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Grow Your Business with{" "}
                  <span className="relative inline-block">
                    <span
                      style={{
                        background:
                          "linear-gradient(135deg,#3BC456 0%,#fff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      AI-Powered
                    </span>
                    <svg
                      className="absolute -bottom-1 left-0 w-full"
                      viewBox="0 0 320 10"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 7 Q40 2 80 7 Q120 12 160 7 Q200 2 240 7 Q280 12 318 7"
                        stroke="#3BC456"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        opacity=".7"
                      />
                    </svg>
                  </span>{" "}
                  Marketing
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.2 }}
                  className="text-white/80 text-lg md:text-xl leading-relaxed mb-10"
                >
                  SEO · Google Ads · Instagram Ads · Social Media · Reels ·
                  Website Dev — all under one roof, powered by AI.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href="/contact"
                    className="btn btn-white btn-lg inline-flex items-center gap-2 font-bold"
                  >
                    Get Free Consultation <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg border-2 border-white/50 text-white hover:bg-white hover:text-brand-teal-deep transition-all duration-300 font-semibold"
                  >
                    💬 WhatsApp Us
                  </a>
                </motion.div>

                {/* Stats strip */}
                <motion.div
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.52 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12"
                >
                  {STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="glass rounded-2xl px-4 py-4 text-center"
                    >
                      <div
                        className="font-display font-black text-white"
                        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                      >
                        {stat.value}
                        {stat.suffix}
                      </div>
                      <div className="text-white/60 text-[10px] mt-1 font-semibold tracking-widest uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT — widget (desktop only) */}
              {/* <div className="flex justify-center items-center py-8"> */}
              <div className="flex justify-center items-center py-8">
                <HeroAnalyticsWidget />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ══════ INDUSTRIES MARQUEE ════════════════════════ */}
      <section className="py-5 bg-brand-charcoal overflow-hidden border-y border-white/5">
        <div className="marquee-track">
          {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
            <span
              key={i}
              className="text-white/45 font-semibold text-xs flex-shrink-0 inline-flex items-center gap-3 tracking-widest uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0" />
              {ind}
            </span>
          ))}
        </div>
      </section>

      {/* ══════ STATS COUNTERS ════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => {
              const Icon = STAT_ICONS[stat.icon];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                >
                  <div className="card card-hover p-7 text-center group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {Icon && <Icon className="w-7 h-7" />}
                    </div>
                    <div className="stat-card-value mb-1">
                      <Counter to={Number(stat.value)} suffix={stat.suffix} />
                    </div>
                    <p className="text-brand-slate-gray text-sm font-medium">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ SERVICES ══════════════════════════════════ */}
      <section className="section-padding bg-brand-cloud-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-label">Our Services</span>
            <h2 className="heading-section mt-3">
              Everything You Need to{" "}
              <span className="text-gradient">Grow Online</span>
            </h2>
            <p className="text-body-lg mt-4 max-w-2xl mx-auto">
              From search dominance to viral content — measurable results across
              every digital channel.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <Link
                    href={`/services#${service.id}`}
                    className="card card-hover h-full flex flex-col p-6 group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-300"
                      style={{ background: `${service.color}18` }}
                    >
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <h3 className="heading-card mb-2">{service.title}</h3>
                    <p className="text-body text-sm leading-relaxed flex-1">
                      {service.shortDesc}
                    </p>
                    <span className="text-brand-teal text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-4">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="btn btn-secondary btn-lg inline-flex items-center gap-2"
            >
              View All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ PROCESS ═══════════════════════════════════ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-label">How We Work</span>
            <h2 className="heading-section mt-3">
              Our Proven <span className="text-gradient">4-Step Process</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="relative text-center group">
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[62%] w-full h-px bg-gradient-to-r from-brand-teal to-brand-green opacity-20" />
                  )}
                  <div className="step-badge mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <h3 className="font-heading font-bold text-brand-charcoal text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════════════════════════════ */}
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-label">Client Results</span>
            <h2 className="heading-section mt-3">
              Real Results,{" "}
              <span className="text-gradient">Real Businesses</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="card card-hover h-full p-6 flex flex-col gap-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-body text-sm leading-relaxed flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge-teal">{t.service}</span>
                    <span className="badge-green">{t.result}</span>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm font-heading flex-shrink-0">
                      {t.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-charcoal text-sm font-heading">
                        {t.name}
                      </div>
                      <div className="text-caption">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA BANNER ════════════════════════════════ */}
      <section className="py-28 bg-gradient-brand relative overflow-hidden noise-overlay">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="hero-glow w-80 h-80 bg-white/10 top-[-80px] right-[-40px]" />
        <div className="hero-glow w-64 h-64 bg-white/[0.08] bottom-[-60px] left-[-30px]" />
        <div className="container-site relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-display font-black text-white mb-4"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Ready to{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.7) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                10× Your
              </span>{" "}
              Digital Presence?
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Get a free strategy consultation and see how we can transform your
              business with AI-powered marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn btn-white btn-lg font-bold inline-flex items-center gap-2"
              >
                Book Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg border-2 border-white/50 text-white hover:bg-white hover:text-brand-teal-deep transition-all duration-300"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ BLOG PREVIEW ══════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label">Latest Insights</span>
              <h2 className="heading-section mt-3">
                From Our <span className="text-gradient">Blog</span>
              </h2>
            </motion.div>
            <Link
              href="/blog"
              className="btn btn-ghost hidden md:inline-flex items-center gap-2"
            >
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="card card-hover group block h-full overflow-hidden"
                >
                  <div className="h-48 bg-gradient-card flex items-center justify-center border-b border-gray-100">
                    <span className="font-heading font-bold text-brand-teal text-base">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col">
                    <span className="badge-teal mb-3 self-start">
                      {post.category}
                    </span>
                    <h3 className="heading-card mb-2 group-hover:text-brand-teal transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-body text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-caption mt-auto">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link
              href="/blog"
              className="btn btn-secondary inline-flex items-center gap-2"
            >
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ FAQ ═══════════════════════════════════════ */}
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-label">FAQ</span>
            <h2 className="heading-section mt-3">
              Common <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>
          <Accordion.Root type="single" collapsible className="space-y-3">
            {FAQS.slice(0, 5).map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Accordion.Item
                  value={String(i)}
                  className="card overflow-hidden"
                >
                  <Accordion.Trigger className="w-full flex items-center justify-between p-5 text-left font-heading font-semibold text-brand-charcoal hover:text-brand-teal transition-colors group">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-brand-slate-gray transition-transform duration-200 group-data-[state=open]:rotate-180 flex-shrink-0 ml-4" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-5 pb-5 text-body text-sm leading-relaxed animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                    {faq.answer}
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="btn btn-secondary inline-flex items-center gap-2"
            >
              View All FAQs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ INDUSTRIES + FINAL CTA ════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-site text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Industries We Serve</span>
            <h2 className="heading-section mt-3 mb-10">
              Across Every <span className="text-gradient">Industry</span>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {INDUSTRIES.map((ind, i) => (
              <motion.span
                key={ind}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                className="badge-teal px-4 py-2 text-sm cursor-default hover:bg-brand-teal hover:text-white transition-colors duration-200"
              >
                {ind}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28 }}
            className="mt-14"
          >
            <Link
              href="/contact"
              className="btn btn-primary btn-xl inline-flex items-center gap-2"
            >
              Start Your Growth Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import type { ForwardRefExoticComponent, RefAttributes } from "react";
// import {
//   Search,
//   Target,
//   Share2,
//   Video,
//   Code2,
//   Palette,
//   Mail,
//   Instagram,
//   ArrowRight,
//   ChevronRight,
//   Star,
//   Users,
//   TrendingUp,
//   DollarSign,
//   ChevronDown,
// } from "lucide-react";
// import type { LucideProps } from "lucide-react";
// import {
//   SERVICES,
//   STATS,
//   TESTIMONIALS,
//   PROCESS_STEPS,
//   FAQS,
//   BLOG_POSTS,
//   INDUSTRIES,
//   SITE_CONFIG,
// } from "@/lib/constants";
// import { whatsappUrl } from "@/lib/utils";
// import * as Accordion from "@radix-ui/react-accordion";

// /* ── Icon maps ──────────────────────────────────────────── */
// type LucideIcon = ForwardRefExoticComponent<
//   Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
// >;

// const SERVICE_ICONS: Record<string, LucideIcon> = {
//   Search,
//   Target,
//   Share2,
//   Video,
//   Code2,
//   Palette,
//   Mail,
//   Instagram,
// };
// const STAT_ICONS: Record<string, LucideIcon> = {
//   Users,
//   Star,
//   TrendingUp,
//   DollarSign,
// };

// /* ── Animated counter ───────────────────────────────────── */
// function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
//   const [val, setVal] = useState(0);
//   const ref = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => {
//         if (!e.isIntersecting) return;
//         obs.disconnect();
//         let start: number | null = null;
//         const dur = 1600;
//         const step = (ts: number) => {
//           if (start === null) start = ts;
//           const p = Math.min((ts - start) / dur, 1);
//           setVal(Math.round(p * to));
//           if (p < 1) requestAnimationFrame(step);
//         };
//         requestAnimationFrame(step);
//       },
//       { threshold: 0.3 },
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [to]);

//   return (
//     <span ref={ref}>
//       {val}
//       {suffix}
//     </span>
//   );
// }

// /* ═══════════════════════ PAGE ══════════════════════════ */
// export default function HomePage() {
//   const waHref = whatsappUrl(
//     SITE_CONFIG.whatsapp,
//     "Hi GrownetAI, I'd like a free consultation!",
//   );

//   const heroRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
//   const heroO = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

//   return (
//     <main className="pt-[var(--navbar-height)]">
//       {/* ══════ HERO ══════════════════════════════════════ */}
//       <section
//         ref={heroRef}
//         className="relative min-h-[92vh] flex items-center bg-gradient-hero overflow-hidden noise-overlay"
//       >
//         {/* Dot grid */}
//         <div className="absolute inset-0 dot-grid opacity-20" />

//         {/* Ambient glows */}
//         <div className="hero-glow w-[560px] h-[560px] bg-teal-400/25 top-[-160px] left-[-140px]" />
//         <div className="hero-glow w-[420px] h-[420px] bg-green-400/20 bottom-[-100px] right-[-80px]" />

//         {/* Animated scan line */}
//         <motion.div
//           aria-hidden
//           animate={{ top: ["8%", "92%", "8%"] }}
//           transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
//           style={{
//             position: "absolute",
//             left: 0,
//             right: 0,
//             height: 1,
//             background:
//               "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
//             pointerEvents: "none",
//             zIndex: 2,
//           }}
//         />

//         <div className="container-site relative z-10 py-28 lg:py-36">
//           <motion.div style={{ y: heroY, opacity: heroO }}>
//             {/* Pill */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <span className="glass inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white/90 mb-8">
//                 <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
//                 AI-Powered Digital Marketing Agency
//               </span>
//             </motion.div>

//             {/* Headline */}
//             <motion.h1
//               initial={{ opacity: 0, y: 36 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="font-display font-black text-white leading-[1.05] mb-6 max-w-4xl"
//               style={{
//                 fontSize: "clamp(2.8rem, 6.5vw, 5.75rem)",
//                 letterSpacing: "-0.03em",
//               }}
//             >
//               Grow Your Business with{" "}
//               <span className="relative inline-block">
//                 <span
//                   style={{
//                     background: "linear-gradient(135deg,#3BC456 0%,#fff 100%)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                   }}
//                 >
//                   AI-Powered
//                 </span>
//                 {/* Underline squiggle */}
//                 <svg
//                   className="absolute -bottom-1 left-0 w-full"
//                   viewBox="0 0 320 10"
//                   fill="none"
//                   aria-hidden
//                 >
//                   <path
//                     d="M2 7 Q40 2 80 7 Q120 12 160 7 Q200 2 240 7 Q280 12 318 7"
//                     stroke="#3BC456"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     fill="none"
//                     opacity=".7"
//                   />
//                 </svg>
//               </span>{" "}
//               Marketing
//             </motion.h1>

//             {/* Subheading */}
//             <motion.p
//               initial={{ opacity: 0, y: 24 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.65, delay: 0.2 }}
//               className="text-white/80 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl"
//             >
//               SEO · Google Ads · Instagram Ads · Social Media · Reels · Website
//               Dev — all under one roof, powered by AI.
//             </motion.p>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 24 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="flex flex-col sm:flex-row gap-4"
//             >
//               <Link
//                 href="/contact"
//                 className="btn btn-white btn-lg inline-flex items-center gap-2 font-bold"
//               >
//                 Get Free Consultation <ArrowRight className="w-5 h-5" />
//               </Link>
//               <a
//                 href={waHref}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn btn-lg border-2 border-white/50 text-white hover:bg-white hover:text-brand-teal-deep transition-all duration-300 font-semibold"
//               >
//                 💬 WhatsApp Us
//               </a>
//             </motion.div>

//             {/* Stats strip */}
//             <motion.div
//               initial={{ opacity: 0, y: 36 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.75, delay: 0.52 }}
//               className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
//             >
//               {STATS.map((stat) => (
//                 <div
//                   key={stat.label}
//                   className="glass rounded-2xl px-5 py-5 text-center"
//                 >
//                   <div
//                     className="font-display font-black text-white"
//                     style={{ fontSize: "clamp(1.75rem, 3vw, 2.4rem)" }}
//                   >
//                     {stat.value}
//                     {stat.suffix}
//                   </div>
//                   <div className="text-white/60 text-xs mt-1 font-semibold tracking-widest uppercase">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Wave divider into white */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 60"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z"
//               fill="white"
//             />
//           </svg>
//         </div>
//       </section>

//       {/* ══════ INDUSTRIES MARQUEE ════════════════════════ */}
//       <section className="py-5 bg-brand-charcoal overflow-hidden border-y border-white/5">
//         <div className="marquee-track">
//           {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
//             <span
//               key={i}
//               className="text-white/45 font-semibold text-xs flex-shrink-0 inline-flex items-center gap-3 tracking-widest uppercase"
//             >
//               <span className="w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0" />
//               {ind}
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* ══════ STATS COUNTERS ════════════════════════════ */}
//       <section className="section-padding bg-white">
//         <div className="container-site">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {STATS.map((stat, i) => {
//               const Icon = STAT_ICONS[stat.icon];
//               return (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1, duration: 0.55 }}
//                 >
//                   <div className="card card-hover p-7 text-center group">
//                     <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
//                       {Icon && <Icon className="w-7 h-7" />}
//                     </div>
//                     <div className="stat-card-value mb-1">
//                       <Counter to={Number(stat.value)} suffix={stat.suffix} />
//                     </div>
//                     <p className="text-brand-slate-gray text-sm font-medium">
//                       {stat.label}
//                     </p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ══════ SERVICES ══════════════════════════════════ */}
//       <section className="section-padding bg-brand-cloud-white relative overflow-hidden">
//         <div className="absolute inset-0 dot-grid opacity-30" />
//         <div className="container-site relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-14"
//           >
//             <span className="section-label">Our Services</span>
//             <h2 className="heading-section mt-3">
//               Everything You Need to{" "}
//               <span className="text-gradient">Grow Online</span>
//             </h2>
//             <p className="text-body-lg mt-4 max-w-2xl mx-auto">
//               From search dominance to viral content — measurable results across
//               every digital channel.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {SERVICES.map((service, i) => {
//               const Icon = SERVICE_ICONS[service.icon];
//               return (
//                 <motion.div
//                   key={service.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.07, duration: 0.5 }}
//                 >
//                   <Link
//                     href={`/services#${service.id}`}
//                     className="card card-hover h-full flex flex-col p-6 group"
//                   >
//                     <div
//                       className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-300"
//                       style={{ background: `${service.color}18` }}
//                     >
//                       {Icon && <Icon className="w-6 h-6" />}
//                     </div>
//                     <h3 className="heading-card mb-2">{service.title}</h3>
//                     <p className="text-body text-sm leading-relaxed flex-1">
//                       {service.shortDesc}
//                     </p>
//                     <span className="text-brand-teal text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-4">
//                       Learn More <ChevronRight className="w-4 h-4" />
//                     </span>
//                   </Link>
//                 </motion.div>
//               );
//             })}
//           </div>

//           <div className="text-center mt-10">
//             <Link
//               href="/services"
//               className="btn btn-secondary btn-lg inline-flex items-center gap-2"
//             >
//               View All Services <ArrowRight className="w-5 h-5" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ══════ PROCESS ═══════════════════════════════════ */}
//       <section className="section-padding bg-white relative overflow-hidden">
//         <div className="absolute inset-0 dot-grid opacity-40" />
//         <div className="container-site relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-14"
//           >
//             <span className="section-label">How We Work</span>
//             <h2 className="heading-section mt-3">
//               Our Proven <span className="text-gradient">4-Step Process</span>
//             </h2>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {PROCESS_STEPS.map((step, i) => (
//               <motion.div
//                 key={step.step}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.12, duration: 0.5 }}
//               >
//                 <div className="relative text-center group">
//                   {i < PROCESS_STEPS.length - 1 && (
//                     <div className="hidden lg:block absolute top-6 left-[62%] w-full h-px bg-gradient-to-r from-brand-teal to-brand-green opacity-20" />
//                   )}
//                   <div className="step-badge mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
//                     {step.step}
//                   </div>
//                   <h3 className="font-heading font-bold text-brand-charcoal text-lg mb-2">
//                     {step.title}
//                   </h3>
//                   <p className="text-body text-sm leading-relaxed">
//                     {step.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════ TESTIMONIALS ══════════════════════════════ */}
//       <section className="section-padding bg-brand-cloud-white">
//         <div className="container-site">
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-14"
//           >
//             <span className="section-label">Client Results</span>
//             <h2 className="heading-section mt-3">
//               Real Results,{" "}
//               <span className="text-gradient">Real Businesses</span>
//             </h2>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {TESTIMONIALS.map((t, i) => (
//               <motion.div
//                 key={t.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1, duration: 0.5 }}
//               >
//                 <div className="card card-hover h-full p-6 flex flex-col gap-4">
//                   <div className="flex gap-1">
//                     {Array.from({ length: t.rating }).map((_, j) => (
//                       <Star
//                         key={j}
//                         className="w-4 h-4 fill-amber-400 text-amber-400"
//                       />
//                     ))}
//                   </div>
//                   <p className="text-body text-sm leading-relaxed flex-1 italic">
//                     &ldquo;{t.text}&rdquo;
//                   </p>
//                   <div className="flex gap-2 flex-wrap">
//                     <span className="badge-teal">{t.service}</span>
//                     <span className="badge-green">{t.result}</span>
//                   </div>
//                   <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
//                     <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm font-heading flex-shrink-0">
//                       {t.name
//                         .split(" ")
//                         .map((n: string) => n[0])
//                         .join("")}
//                     </div>
//                     <div>
//                       <div className="font-semibold text-brand-charcoal text-sm font-heading">
//                         {t.name}
//                       </div>
//                       <div className="text-caption">{t.role}</div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════ CTA BANNER ════════════════════════════════ */}
//       <section className="py-28 bg-gradient-brand relative overflow-hidden noise-overlay">
//         <div className="absolute inset-0 dot-grid opacity-20" />
//         <div className="hero-glow w-80 h-80 bg-white/10 top-[-80px] right-[-40px]" />
//         <div className="hero-glow w-64 h-64 bg-white/[0.08] bottom-[-60px] left-[-30px]" />

//         <div className="container-site relative z-10 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2
//               className="font-display font-black text-white mb-4"
//               style={{
//                 fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
//                 letterSpacing: "-0.03em",
//               }}
//             >
//               Ready to{" "}
//               <span
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.7) 100%)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 10× Your
//               </span>{" "}
//               Digital Presence?
//             </h2>
//             <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
//               Get a free strategy consultation and see how we can transform your
//               business with AI-powered marketing.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 href="/contact"
//                 className="btn btn-white btn-lg font-bold inline-flex items-center gap-2"
//               >
//                 Book Free Consultation <ArrowRight className="w-5 h-5" />
//               </Link>
//               <a
//                 href={waHref}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn btn-lg border-2 border-white/50 text-white hover:bg-white hover:text-brand-teal-deep transition-all duration-300"
//               >
//                 💬 Chat on WhatsApp
//               </a>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ══════ BLOG PREVIEW ══════════════════════════════ */}
//       <section className="section-padding bg-white">
//         <div className="container-site">
//           <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <span className="section-label">Latest Insights</span>
//               <h2 className="heading-section mt-3">
//                 From Our <span className="text-gradient">Blog</span>
//               </h2>
//             </motion.div>
//             <Link
//               href="/blog"
//               className="btn btn-ghost hidden md:inline-flex items-center gap-2"
//             >
//               View All Posts <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {BLOG_POSTS.map((post, i) => (
//               <motion.div
//                 key={post.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1, duration: 0.5 }}
//               >
//                 <Link
//                   href={`/blog/${post.slug}`}
//                   className="card card-hover group block h-full overflow-hidden"
//                 >
//                   <div className="h-48 bg-gradient-card flex items-center justify-center border-b border-gray-100">
//                     <span className="font-heading font-bold text-brand-teal text-base">
//                       {post.category}
//                     </span>
//                   </div>
//                   <div className="p-6 flex flex-col">
//                     <span className="badge-teal mb-3 self-start">
//                       {post.category}
//                     </span>
//                     <h3 className="heading-card mb-2 group-hover:text-brand-teal transition-colors line-clamp-2">
//                       {post.title}
//                     </h3>
//                     <p className="text-body text-sm line-clamp-2 mb-4">
//                       {post.excerpt}
//                     </p>
//                     <div className="flex items-center justify-between text-caption mt-auto">
//                       <span>{post.author}</span>
//                       <span>{post.readTime}</span>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>

//           <div className="text-center mt-8 md:hidden">
//             <Link
//               href="/blog"
//               className="btn btn-secondary inline-flex items-center gap-2"
//             >
//               View All Posts <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ══════ FAQ ═══════════════════════════════════════ */}
//       <section className="section-padding bg-brand-cloud-white">
//         <div className="container-site max-w-3xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <span className="section-label">FAQ</span>
//             <h2 className="heading-section mt-3">
//               Common <span className="text-gradient">Questions</span>
//             </h2>
//           </motion.div>

//           <Accordion.Root type="single" collapsible className="space-y-3">
//             {FAQS.slice(0, 5).map((faq, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.05 }}
//               >
//                 <Accordion.Item
//                   value={String(i)}
//                   className="card overflow-hidden"
//                 >
//                   <Accordion.Trigger className="w-full flex items-center justify-between p-5 text-left font-heading font-semibold text-brand-charcoal hover:text-brand-teal transition-colors group">
//                     {faq.question}
//                     <ChevronDown className="w-5 h-5 text-brand-slate-gray transition-transform duration-200 group-data-[state=open]:rotate-180 flex-shrink-0 ml-4" />
//                   </Accordion.Trigger>
//                   <Accordion.Content className="px-5 pb-5 text-body text-sm leading-relaxed animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
//                     {faq.answer}
//                   </Accordion.Content>
//                 </Accordion.Item>
//               </motion.div>
//             ))}
//           </Accordion.Root>

//           <div className="text-center mt-8">
//             <Link
//               href="/faq"
//               className="btn btn-secondary inline-flex items-center gap-2"
//             >
//               View All FAQs <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ══════ INDUSTRIES + FINAL CTA ════════════════════ */}
//       <section className="section-padding bg-white">
//         <div className="container-site text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <span className="section-label">Industries We Serve</span>
//             <h2 className="heading-section mt-3 mb-10">
//               Across Every <span className="text-gradient">Industry</span>
//             </h2>
//           </motion.div>

//           <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
//             {INDUSTRIES.map((ind, i) => (
//               <motion.span
//                 key={ind}
//                 initial={{ opacity: 0, scale: 0.88 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.04, duration: 0.35 }}
//                 className="badge-teal px-4 py-2 text-sm cursor-default hover:bg-brand-teal hover:text-white transition-colors duration-200"
//               >
//                 {ind}
//               </motion.span>
//             ))}
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.28 }}
//             className="mt-14"
//           >
//             <Link
//               href="/contact"
//               className="btn btn-primary btn-xl inline-flex items-center gap-2"
//             >
//               Start Your Growth Journey <ArrowRight className="w-5 h-5" />
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </main>
//   );
// }
