"use client";

import { useState } from "react";

const PROJECTS = [
  {
    name: "FreshBite Restaurant",
    tag: "Food & Hospitality",
    color: "#F97316",
    bg: "#FFF7ED",
    emoji: "🍽️",
  },
  {
    name: "LawPoint Advocates",
    tag: "Legal Services",
    color: "#1E3A5F",
    bg: "#EFF6FF",
    emoji: "⚖️",
  },
  {
    name: "GlowSkin Clinic",
    tag: "Beauty & Wellness",
    color: "#DB2777",
    bg: "#FDF2F8",
    emoji: "✨",
  },
  {
    name: "BuildNest Real Estate",
    tag: "Real Estate",
    color: "#0F766E",
    bg: "#E6FBFB",
    emoji: "🏠",
  },
  {
    name: "EduReach Academy",
    tag: "EdTech",
    color: "#006666",
    bg: "#F5F3FF",
    emoji: "🎓",
  },
  {
    name: "FitLife Gym",
    tag: "Health & Fitness",
    color: "#DC2626",
    bg: "#0F0F0F",
    emoji: "💪",
  },
];

export default function PortfolioCards() {
  const [selected, setSelected] = useState(null);

  const rotations = [-18, -9, 0, 9, 18, 27];
  const offsets = [-40, -20, 0, 20, 40, 60];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Fanned deck preview */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        <div style={{ position: "relative", width: 320, height: 240 }}>
          {PROJECTS.slice(0, 6).map((p, i) => (
            <div
              key={p.name}
              onClick={() => setSelected(p)}
              style={{
                position: "absolute",
                width: 200,
                height: 140,
                borderRadius: 14,
                border: "3px solid white",
                overflow: "hidden",
                boxShadow: "4px 6px 20px rgba(0,0,0,0.2)",
                cursor: "pointer",
                left: 20 + offsets[i] * 0.6,
                top: 20,
                transform: `rotate(${rotations[i]}deg)`,
                transformOrigin: "bottom center",
                zIndex: i,
                transition: "transform 0.2s",
                background: p.bg,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `rotate(${rotations[i]}deg) translateY(-12px) scale(1.05)`;
                e.currentTarget.style.zIndex = "99";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${rotations[i]}deg)`;
                e.currentTarget.style.zIndex = String(i);
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 32 }}>{p.emoji}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: p.color,
                    textAlign: "center",
                    padding: "0 8px",
                  }}
                >
                  {p.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <p
        style={{
          fontSize: 13,
          color: "#6B7280",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Our Portfolio — click any card to preview
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 14,
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            onClick={() => setSelected(p)}
            style={{
              borderRadius: 12,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              cursor: "pointer",
              background: "#fff",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div
              style={{
                height: 110,
                background: p.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
              }}
            >
              {p.emoji}
            </div>
            <div style={{ padding: "10px 12px 12px" }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111827",
                  margin: "0 0 3px",
                }}
              >
                {p.name}
              </p>
              <p style={{ fontSize: 11, color: "#6B7280", margin: 0 }}>
                {p.tag}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 16,
              width: "100%",
              maxWidth: 480,
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#111827",
                  margin: 0,
                }}
              >
                {selected.name}
              </p>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 20,
                  color: "#6B7280",
                  padding: 0,
                }}
              >
                ✕
              </button>
            </div>
            <div
              style={{
                height: 200,
                background: selected.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 64 }}>{selected.emoji}</span>
              <span
                style={{ fontSize: 16, fontWeight: 600, color: selected.color }}
              >
                {selected.name}
              </span>
              <span style={{ fontSize: 12, color: "#6B7280" }}>
                {selected.tag}
              </span>
            </div>
            <div
              style={{
                padding: "12px 16px",
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                borderTop: "1px solid #E5E7EB",
              }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{
                  fontSize: 13,
                  padding: "7px 16px",
                  borderRadius: 8,
                  cursor: "pointer",
                  border: "1px solid #E5E7EB",
                  background: "#F9FAFB",
                  color: "#374151",
                }}
              >
                Close
              </button>
              <button
                style={{
                  fontSize: 13,
                  padding: "7px 16px",
                  borderRadius: 8,
                  cursor: "pointer",
                  border: "none",
                  background: selected.color,
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                🔗 Visit Site
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
