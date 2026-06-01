"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    name: "FreshBite Restaurant",
    tag: "Food & Hospitality",
    accent: "#F97316",
    cardBg: "#FFF7ED",
    emoji: "🍽️",
    headerBg: "#F97316",
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
    accent: "#DB2777",
    cardBg: "#FDF2F8",
    emoji: "✨",
    headerBg: "#DB2777",
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
    accent: "#0F766E",
    cardBg: "#E6FBFB",
    emoji: "🏠",
    headerBg: "#0F766E",
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
    name: "FitLife Gym",
    tag: "Health & Fitness",
    accent: "#DC2626",
    cardBg: "#111111",
    emoji: "💪",
    headerBg: "#DC2626",
    navItems: ["Classes", "Trainers", "Plans"],
    tagline: "NO LIMITS",
    sub: "Transform your body. Transform your life.",
    cta: "JOIN NOW",
    results: ["900+ members", "#1 local SEO", "₹9L MRR"],
    previewImg:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=480&q=80",
  },
];

// 4 cards — fan angles (wider spread for bigger cards)
const FAN = [
  { rotate: -16, x: -110, y: 24 },
  { rotate: -5, x: -32, y: 6 },
  { rotate: 5, x: 32, y: 6 },
  { rotate: 16, x: 110, y: 24 },
];

/* ── Card: looks like a real website screenshot ── */
function CardPreview({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Navbar strip ── */}
      <div
        style={{
          background: "rgba(0,0,0,0.82)",
          padding: "7px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
          zIndex: 3,
          position: "relative",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: 10,
            letterSpacing: 1,
          }}
        >
          {project.name.split(" ")[0].toUpperCase()}
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {project.navItems.map((x) => (
            <span
              key={x}
              style={{ color: "rgba(255,255,255,0.7)", fontSize: 9 }}
            >
              {x}
            </span>
          ))}
        </div>
        <div
          style={{
            background: project.accent,
            color: "#fff",
            fontSize: 8,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 8,
          }}
        >
          {project.cta.split(" ").slice(0, 2).join(" ")}
        </div>
      </div>

      {/* ── Hero image fills the rest ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img
          src={project.previewImg}
          alt={project.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        {/* Tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            right: 12,
          }}
        >
          <p
            style={{
              fontSize: project.id === 4 ? 13 : 12,
              fontWeight: 800,
              color: "#fff",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: project.id === 4 ? 1.5 : 0.2,
              textShadow: "0 1px 6px rgba(0,0,0,0.8)",
            }}
          >
            {project.tagline}
          </p>
          <p
            style={{
              fontSize: 8.5,
              color: "rgba(255,255,255,0.75)",
              margin: "3px 0 0",
              lineHeight: 1.3,
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            {project.sub}
          </p>
        </div>
      </div>

      {/* ── Bottom nav bar in accent color ── */}
      <div
        style={{
          background: project.headerBg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          padding: "5px 0",
          flexShrink: 0,
          zIndex: 3,
        }}
      >
        {project.navItems.map((nav) => (
          <span
            key={nav}
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: 0.3,
            }}
          >
            {nav}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Full modal preview ── */
function MiniWebsite({ project }: { project: (typeof PROJECTS)[0] }) {
  const isDark = project.id === 4;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          background: project.headerBg,
          padding: "13px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
          {project.emoji} {project.name.split(" ")[0]}
        </span>
        <div style={{ display: "flex", gap: 16 }}>
          {project.navItems.map((x) => (
            <span
              key={x}
              style={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}
            >
              {x}
            </span>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img
          src={project.previewImg}
          alt={project.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 24,
            right: 24,
          }}
        >
          <p
            style={{
              fontSize: isDark ? 22 : 20,
              fontWeight: 800,
              color: "#fff",
              margin: 0,
              letterSpacing: isDark ? 3 : 0,
              textShadow: "0 2px 12px rgba(0,0,0,0.7)",
            }}
          >
            {project.tagline}
          </p>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.75)",
              margin: "6px 0 14px",
              lineHeight: 1.5,
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            {project.sub}
          </p>
          <div
            style={{
              display: "inline-block",
              padding: "10px 24px",
              background: project.headerBg,
              color: "#fff",
              borderRadius: 28,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {project.cta}
          </div>
        </div>
      </div>

      {/* Footer results */}
      <div
        style={{
          padding: "12px 20px",
          background: isDark ? "#1c1c1c" : "rgba(255,255,255,0.95)",
          display: "flex",
          gap: 8,
          borderTop: `1px solid ${project.accent}22`,
          flexShrink: 0,
        }}
      >
        {project.results.map((r) => (
          <span
            key={r}
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: project.accent,
              background: `${project.accent}18`,
              padding: "5px 12px",
              borderRadius: 20,
            }}
          >
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroPortfolioWidget() {
  const [selected, setSelected] = useState<number | null>(null);
  const [topIndex, setTopIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setTopIndex((prev) => (prev + 1) % PROJECTS.length);
      }, 2800);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* ── Fan deck — bigger container ── */}
      <motion.div
        initial={{ opacity: 0, x: 60, y: 24 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "relative",
          width: 540, // ← was 420
          height: 400, // ← was 300
          margin: "0 auto",
        }}
      >
        {PROJECTS.map((project, i) => {
          const fan = FAN[i];
          const isTop = i === topIndex;

          return (
            <motion.div
              key={project.id}
              onClick={() => setSelected(i)}
              animate={{
                rotate: fan.rotate,
                x: fan.x,
                y: isTop ? fan.y - 28 : fan.y,
                scale: isTop ? 1.08 : 1,
                zIndex: isTop ? 10 : i,
              }}
              whileHover={{
                y: fan.y - 36,
                scale: 1.12,
                zIndex: 20,
                transition: { duration: 0.18 },
              }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -155, // ← half of new width
                marginTop: -115, // ← half of new height
                width: 310, // ← was 240
                height: 218, // ← was 168
                borderRadius: 18,
                border: isTop
                  ? `3px solid ${project.accent}`
                  : "3px solid rgba(255,255,255,0.92)",
                boxShadow: isTop
                  ? `0 24px 64px ${project.accent}50, 0 8px 24px rgba(0,0,0,0.25)`
                  : "0 10px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transformOrigin: "bottom center",
                overflow: "hidden",
              }}
            >
              <CardPreview project={project} />

              {/* Tap hint on top card */}
              {isTop && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    position: "absolute",
                    top: 32,
                    right: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "sans-serif",
                    background: "rgba(0,0,0,0.50)",
                    backdropFilter: "blur(4px)",
                    padding: "4px 10px",
                    borderRadius: 20,
                    zIndex: 10,
                  }}
                >
                  tap to preview ↗
                </motion.div>
              )}

              {/* Active glow overlay */}
              {isTop && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 16,
                    background: `radial-gradient(ellipse at 50% 0%, ${project.accent}25, transparent 65%)`,
                    pointerEvents: "none",
                    zIndex: 4,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Dot indicators ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 20,
        }}
      >
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setTopIndex(i)}
            style={{
              width: i === topIndex ? 28 : 8,
              height: 8,
              borderRadius: 99,
              background: i === topIndex ? "#ffffff" : "rgba(255,255,255,0.35)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </motion.div>

      {/* ── Popup modal ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 28 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 28 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 540,
                borderRadius: 22,
                overflow: "hidden",
                boxShadow: `0 32px 80px ${PROJECTS[selected].accent}50, 0 8px 32px rgba(0,0,0,0.5)`,
                border: `2.5px solid ${PROJECTS[selected].accent}70`,
              }}
            >
              {/* Modal header */}
              <div
                style={{
                  background: "#fff",
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: `2px solid ${PROJECTS[selected].accent}20`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${PROJECTS[selected].accent}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    {PROJECTS[selected].emoji}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        margin: 0,
                        color: "#111",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {PROJECTS[selected].name}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#888",
                        margin: 0,
                        fontFamily: "sans-serif",
                      }}
                    >
                      {PROJECTS[selected].tag}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#F3F4F6",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 16,
                    color: "#6B7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Full preview */}
              <div style={{ height: 360 }}>
                <MiniWebsite project={PROJECTS[selected]} />
              </div>

              {/* Modal footer */}
              <div
                style={{
                  background: "#fff",
                  padding: "14px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: `1px solid ${PROJECTS[selected].accent}20`,
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {PROJECTS[selected].results.map((r) => (
                    <span
                      key={r}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: PROJECTS[selected].accent,
                        background: `${PROJECTS[selected].accent}15`,
                        padding: "4px 10px",
                        borderRadius: 20,
                        fontFamily: "sans-serif",
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      fontSize: 13,
                      padding: "8px 18px",
                      borderRadius: 10,
                      cursor: "pointer",
                      border: "1px solid #E5E7EB",
                      background: "#F9FAFB",
                      color: "#374151",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Close
                  </button>
                  <button
                    style={{
                      fontSize: 13,
                      padding: "8px 18px",
                      borderRadius: 10,
                      cursor: "pointer",
                      border: "none",
                      background: "#008080",
                      color: "#fff",
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                    }}
                  >
                    🔗 Visit Site
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
