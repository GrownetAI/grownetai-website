import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Font Families ─────────────────────────── */
      /* Single primary typeface (Inter). Monospace is for code only. */
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },

      /* ── Strict Type Scale (12 → 36px) — never use arbitrary sizes ── */
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.625rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.9rem", letterSpacing: "-0.014em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.022em" }],
      },

      /* ── Named line-heights ────────────────────── */
      lineHeight: {
        tight: "1.15",
        snug: "1.3",
        normal: "1.5",
        relaxed: "1.65",
      },

      /* ── Letter-spacing (tight for headings) ───── */
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.02em",
        wider: "0.08em",
        widest: "0.16em",
      },

      /* ── Brand Colors — FLAT two-tone system ───── */
      /* Teal = primary/background · Aqua = accent · NO gradients */
      colors: {
        brand: {
          teal: "#008080",
          "teal-deep": "#006666",
          "teal-dark": "#004D4D",
          "teal-mist": "#E0F7F7",
          aqua: "#00E5E5",
          "aqua-deep": "#00B3B3",
          green: "#00E5E5",
          forest: "#006666",
          "mint-cream": "#E6FBFB",
          charcoal: "#0B1F1F",
          "dark-leaf": "#0F2E2E",
          "slate-gray": "#5C6B6B",
          "cloud-white": "#F2FBFB",
          "light-gray": "#94A3A3",
          white: "#FFFFFF",
        },

        /* ── Semantic text colors (WCAG AA on white) ──
           text-content           → primary  (#0B1F1F · 16.5:1 · AAA)
           text-content-secondary → support  (#41514E · 7.4:1  · AAA)
           text-muted             → muted    (#5C6B6B · 4.9:1  · AA)
           text-disabled          → disabled-only states */
        content: {
          DEFAULT: "#0B1F1F",
          secondary: "#41514E",
          muted: "#5C6B6B",
          disabled: "#97A4A4",
          inverse: "#FFFFFF",
        },
        muted: "#5C6B6B",
        disabled: "#97A4A4",
      },

      /* ── Solid brand fills (NO gradients) ──────── */
      backgroundImage: {
        none: "none",
      },

      /* ── Spacing / Sizing ──────────────────────── */
      spacing: {
        navbar: "72px",
        "18": "72px",
        "22": "88px",
        section: "96px",
      },

      /* ── Border Radius ─────────────────────────── */
      borderRadius: {
        xl2: "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
      },

      /* ── Box Shadows ───────────────────────────── */
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04)",
        "card-hover": "0 8px 32px rgba(0,128,128,.14), 0 2px 8px rgba(0,0,0,.06)",
        brand: "0 8px 32px rgba(0,128,128,.25)",
        "brand-lg": "0 16px 48px rgba(0,128,128,.35)",
        float: "0 20px 60px rgba(0,0,0,.12)",
        "inner-teal": "inset 0 0 0 2px rgba(0,128,128,.2)",
      },

      /* ── Animations ────────────────────────────── */
      animation: {
        "fade-in": "fadeIn .5s ease-out both",
        "slide-up": "slideUp .55s ease-out both",
        "slide-down": "slideDown .3s ease-out both",
        "scale-in": "scaleIn .3s ease-out both",
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "accordion-down": "accordion-down .25s ease-out",
        "accordion-up": "accordion-up .2s ease-out",
        ping: "ping 1.5s cubic-bezier(0,0,.2,1) infinite",
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      /* ── Transition timing ─────────────────────── */
      transitionTimingFunction: {
        premium: "cubic-bezier(.4,0,.2,1)",
        spring: "cubic-bezier(.34,1.56,.64,1)",
      },

      /* ── Container ─────────────────────────────── */
      maxWidth: {
        site: "1200px",
        prose: "72ch",
        form: "640px",
      },
    },
  },
  plugins: [],
};

export default config;
