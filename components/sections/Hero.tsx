"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Code2,
  TrendingUp,
  Sparkles,
  Zap,
  Globe,
  Eye,
} from "lucide-react";
import { SITE_CONFIG, STATS } from "@/lib/constants";

/* ══════════════════════════════════════════════════════════
   ANALYTICS WIDGET — internal components
══════════════════════════════════════════════════════════ */

// const TRAFFIC_DATA = [22, 38, 30, 52, 44, 68, 60, 84, 72, 91, 78, 110];
// const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// const MINI_STATS = [
//   { label: "Organic Traffic", value: "+284%", color: "#00E5E5" },
//   { label: "Leads Generated", value: "+192%", color: "#008080" },
//   { label: "ROAS", value: "6.4×", color: "#00E5E5" },
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
  { label: "Organic Traffic", value: "+284%", color: "#00E5E5" },
  { label: "Leads Generated", value: "+192%", color: "#008080" },
  { label: "ROAS", value: "6.4×", color: "#00E5E5" },
];

// function AnimatedLineChart() {
//   const [progress, setProgress] = useState(0);
//   const rafRef = useRef<number | null>(null);

//   useEffect(() => {
//     const start = performance.now();
//     const dur = 2000;
//     const tick = (now: number) => {
//       const p = Math.min((now - start) / dur, 1);
//       setProgress(1 - Math.pow(1 - p, 3));
//       if (p < 1) rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   const W = 310,
//     H = 120,
//     pad = 10;
//   const max = Math.max(...TRAFFIC_DATA);
//   const min = Math.min(...TRAFFIC_DATA);

//   const pts = TRAFFIC_DATA.map((v, i) => ({
//     x: pad + (i / (TRAFFIC_DATA.length - 1)) * (W - pad * 2),
//     y: H - pad - ((v - min) / (max - min)) * (H - pad * 2 - 12),
//   }));

//   const visiblePts = pts
//     .filter((_, i) => {
//       const t = i / (pts.length - 1);
//       return t <= progress + 1 / (pts.length - 1);
//     })
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
//         <linearGradient id="wlg" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#00E5E5" stopOpacity="0.30" />
//           <stop offset="100%" stopColor="#00E5E5" stopOpacity="0.01" />
//         </linearGradient>
//         <linearGradient id="wline" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0%" stopColor="#008080" />
//           <stop offset="100%" stopColor="#00E5E5" />
//         </linearGradient>
//         <filter id="wglow">
//           <feGaussianBlur stdDeviation="2" result="b" />
//           <feMerge>
//             <feMergeNode in="b" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>

//       {/* grid */}
//       {[0.25, 0.5, 0.75].map((t) => (
//         <line
//           key={t}
//           x1={pad}
//           y1={pad + (1 - t) * (H - pad * 2)}
//           x2={W - pad}
//           y2={pad + (1 - t) * (H - pad * 2)}
//           stroke="rgba(0, 128, 128,0.10)"
//           strokeWidth="1"
//           strokeDasharray="3 4"
//         />
//       ))}

//       {areaD && <path d={areaD} fill="url(#wlg)" />}

//       {visiblePts.length > 1 && (
//         <path
//           d={toD(visiblePts)}
//           fill="none"
//           stroke="url(#wline)"
//           strokeWidth="3"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           filter="url(#wglow)"
//         />
//       )}

//       {/* month labels */}
//       {MONTHS.filter((_, i) => i % 3 === 0).map((m, i) => (
//         <text
//           key={m}
//           x={pad + ((i * 3) / (TRAFFIC_DATA.length - 1)) * (W - pad * 2)}
//           y={H - 1}
//           fill="rgba(255,255,255,0.25)"
//           fontSize="8"
//           textAnchor="middle"
//           fontFamily="sans-serif"
//         >
//           {m}
//         </text>
//       ))}

//       {/* animated tip dot */}
//       {last && progress > 0.05 && (
//         <>
//           <circle
//             cx={last.x}
//             cy={last.y}
//             r="4.5"
//             fill="#00E5E5"
//             filter="url(#wglow)"
//           />
//           <circle
//             cx={last.x}
//             cy={last.y}
//             r="8"
//             fill="none"
//             stroke="#00E5E5"
//             strokeWidth="1.5"
//             strokeOpacity="0.35"
//           />
//         </>
//       )}
//     </svg>
//   );
// }

// function HeroAnalyticsWidget() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 60, y: 30 }}
//       animate={{ opacity: 1, x: 0, y: 0 }}
//       transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       className="relative w-full max-w-[340px] mx-auto"
//     >
//       {/* Glow halo */}
//       <div
//         className="absolute inset-0 rounded-3xl blur-2xl opacity-25 scale-90"
//         style={{ background: "#008080" }}
//       />

//       {/* Main glass card */}
//       <div
//         className="relative rounded-3xl p-5 overflow-hidden"
//         style={{
//           background: "rgba(255,255,255,0.05)",
//           backdropFilter: "blur(24px)",
//           border: "1px solid rgba(0, 128, 128,0.20)",
//           boxShadow:
//             "0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
//         }}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-0.5">
//               Client Growth Report
//             </p>
//             <p className="text-white font-bold text-sm">Organic Traffic</p>
//           </div>
//           <div
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
//             style={{
//               background: "rgba(0, 229, 229,0.15)",
//               color: "#00E5E5",
//               border: "1px solid rgba(0, 229, 229,0.25)",
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
//                 "#FFFFFF",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             1,24,830
//           </span>
//           <span className="text-white/35 text-xs ml-2">monthly visitors</span>
//         </div>

//         {/* Chart */}
//         <div className="-mx-1 mb-4">
//           <AnimatedLineChart />
//         </div>

//         {/* Divider */}
//         <div
//           className="border-t mb-4"
//           style={{ borderColor: "rgba(0, 128, 128,0.12)" }}
//         />

//         {/* Mini stats */}
//         <div className="flex flex-col gap-2.5">
//           {MINI_STATS.map((s, i) => (
//             <motion.div
//               key={s.label}
//               initial={{ opacity: 0, x: 12 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 1.0 + i * 0.1, duration: 0.45 }}
//               className="flex items-center justify-between"
//             >
//               <div className="flex items-center gap-2">
//                 <div
//                   className="w-1.5 h-1.5 rounded-full flex-shrink-0"
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
//           transition={{ delay: 1.35, duration: 0.45 }}
//           className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3"
//           style={{
//             background: "rgba(0, 128, 128,0.08)",
//             border: "1px solid rgba(0, 128, 128,0.18)",
//           }}
//         >
//           <div className="flex items-center gap-2">
//             <Users className="w-3.5 h-3.5 text-[#008080]" />
//             <span className="text-white/70 text-xs font-semibold">
//               Active Clients
//             </span>
//           </div>
//           <div className="flex items-center gap-1">
//             <span className="text-white font-bold text-sm">500+</span>
//             <ArrowUpRight className="w-3.5 h-3.5 text-[#00E5E5]" />
//           </div>
//         </motion.div>

//         {/* LIVE DATA badge */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.6 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1.55, type: "spring", stiffness: 220 }}
//           className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-xl"
//           style={{
//             background: "#008080",
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
//         transition={{ delay: 1.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 flex items-center gap-3"
//         style={{
//           background: "rgba(6,13,13,0.90)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(0, 128, 128,0.20)",
//           boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
//         }}
//       >
//         <div
//           className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
//           style={{ background: "#008080" }}
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
          <stop offset="0%" stopColor="#00E5E5" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#00E5E5" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="cLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#008080" />
          <stop offset="100%" stopColor="#00E5E5" />
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
            fill="#008080"
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
            fill="#00E5E5"
            filter="url(#cGlow)"
          />
          <circle
            cx={last.x}
            cy={last.y}
            r="9"
            fill="none"
            stroke="#00E5E5"
            strokeWidth="1.5"
            strokeOpacity="0.30"
          />
          <rect
            x={last.x - 22}
            y={last.y - 24}
            width="44"
            height="16"
            rx="4"
            fill="rgba(0, 229, 229,0.18)"
            stroke="rgba(0, 229, 229,0.35)"
            strokeWidth="0.8"
          />
          <text
            x={last.x}
            y={last.y - 13}
            fill="#00E5E5"
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
function HeroAnalyticsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[460px] mx-auto"
    >
      <div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-20 scale-90"
        style={{ background: "#008080" }}
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
              background: "rgba(0, 229, 229,0.15)",
              color: "#00E5E5",
              border: "1px solid rgba(0, 229, 229,0.25)",
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
                "#FFFFFF",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            1,24,830
          </span>
          <span className="text-white/35 text-xs ml-2">monthly visitors</span>
        </div>

        <div className="-mx-2 mb-3">
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
            background: "#008080",
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

/* ══════════════════════════════════════════════════════════
   STAT COUNTER (unchanged)
══════════════════════════════════════════════════════════ */
function StatCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  return (
    <span>
      {to}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO PAGE
══════════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi GrownetAI! I'd like to discuss my project.",
  )}`;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "#003B3B",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #008080 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          animation: "grid-pan 20s linear infinite",
        }}
      />

      {/* Ambient glows */}
      <div className="hero-glow w-[700px] h-[700px] bg-[#008080] opacity-[0.08] top-[-200px] left-[-200px]" />
      <div className="hero-glow w-[500px] h-[500px] bg-[#00E5E5] opacity-[0.06] bottom-[-100px] right-[-100px]" />
      <div className="hero-glow w-[400px] h-[400px] bg-[#008080] opacity-[0.05] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Scan line */}
      <motion.div
        aria-hidden
        animate={{ top: ["5%", "95%", "5%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0, 128, 128,.25) 50%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div className="container-site relative z-10 pt-[var(--navbar-height)]">
        <motion.div style={{ y, opacity }}>
          <div className="py-20 lg:py-28">
            {/* ── Two-column layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">
              {/* LEFT — copy */}
              <div className="max-w-xl">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.12em] mb-8"
                  style={{
                    background: "rgba(0, 128, 128,.10)",
                    border: "1px solid rgba(0, 128, 128,.25)",
                    color: "#008080",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5E5] animate-pulse" />
                  Premium Digital Agency · Web Dev + AI Marketing
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1 }}
                  className="font-heading font-black text-white mb-6 leading-[1.05]"
                  style={{
                    fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
                    letterSpacing: "-0.035em",
                  }}
                >
                  Build, Launch &{" "}
                  <span
                    style={{
                      background:
                        "#008080",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Dominate
                  </span>{" "}
                  Your Digital Market
                </motion.h1>

                {/* Sub */}
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white/55 text-lg leading-relaxed mb-10"
                >
                  We engineer high-performance websites, SaaS platforms, and
                  AI-powered marketing campaigns that turn your brand into a
                  growth machine.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 mb-10"
                >
                  <Link
                    href="/contact"
                    className="btn btn-primary btn-lg group"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                </motion.div>

                {/* Capability tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="flex flex-wrap items-center gap-2.5 mb-14"
                >
                  {[
                    {
                      icon: <Globe className="w-3.5 h-3.5" />,
                      text: "Web Development",
                    },
                    {
                      icon: <Code2 className="w-3.5 h-3.5" />,
                      text: "SaaS & Web Apps",
                    },
                    {
                      icon: <Sparkles className="w-3.5 h-3.5" />,
                      text: "AI Integration",
                    },
                    {
                      icon: <TrendingUp className="w-3.5 h-3.5" />,
                      text: "SEO & Ads",
                    },
                    {
                      icon: <Zap className="w-3.5 h-3.5" />,
                      text: "Automation",
                    },
                  ].map(({ icon, text }) => (
                    <span
                      key={text}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "rgba(255,255,255,0.60)",
                      }}
                    >
                      <span className="text-[#008080]">{icon}</span>
                      {text}
                    </span>
                  ))}
                </motion.div>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                      className="rounded-2xl p-4 text-center"
                      style={{
                        background: "rgba(22,22,22,.80)",
                        border: "1px solid rgba(0, 128, 128,.15)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      <div
                        className="text-2xl font-heading font-black mb-0.5"
                        style={{
                          background:
                            "#008080",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        <StatCounter to={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-white/40 text-[10px] font-medium leading-tight">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT — analytics widget */}
              <div className="flex justify-center items-center py-10">
                <HeroAnalyticsWidget />
              </div>
            </div>
            {/* end grid */}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #003B3B, transparent)" }}
      />
    </section>
  );
}
