"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/constants";

type Category = keyof typeof TECH_STACK;

const categoryLabels: Record<Category, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database & Cloud",
  cms: "CMS & Platforms",
  other: "Other Skills",
};

// SVG-based tech icons using simple shapes/letters for reliable rendering
function TechIcon({ name, color }: { name: string; color: string }) {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black font-mono"
      style={{
        background: `${color}18`,
        border: `1.5px solid ${color}35`,
        color: color,
      }}
    >
      {initials}
    </div>
  );
}

export default function TechStack() {
  const [active, setActive] = useState<Category>("frontend");

  const allTechs = Object.values(TECH_STACK).flat();

  return (
    <section
      id="tech"
      className="section-pad relative overflow-hidden"
      style={{ background: "#090909" }}
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1AABAB]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label mx-auto">Tech Stack</div>
          <h2 className="section-heading mb-4">
            Technologies We <span className="accent">Master</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Modern, battle-tested technologies chosen for performance,
            scalability, and developer experience.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(Object.keys(TECH_STACK) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-250 ${
                active === cat
                  ? "text-white"
                  : "text-white/35 hover:text-white/65"
              }`}
              style={
                active === cat
                  ? {
                      background: "var(--gradient-brand)",
                      boxShadow: "0 4px 16px rgba(26,171,171,.30)",
                    }
                  : {
                      background: "rgba(22,22,22,.70)",
                      border: "1px solid rgba(255,255,255,.07)",
                    }
              }
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 mb-16"
        >
          {TECH_STACK[active].map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="tech-badge cursor-default"
            >
              <TechIcon name={tech.name} color={tech.color} />
              <span className="text-[11px] text-white/45 font-medium text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee strip — all techs */}
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #090909, transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #090909, transparent)",
            }}
          />

          <div className="marquee-container">
            <div className="marquee-track gap-6">
              {[...allTechs, ...allTechs].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl shrink-0"
                  style={{
                    background: "rgba(22,22,22,.60)",
                    border: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <span
                    className="w-5 h-5 rounded text-[9px] font-black font-mono flex items-center justify-center"
                    style={{ background: `${tech.color}20`, color: tech.color }}
                  >
                    {tech.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="text-xs text-white/50 font-medium whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
