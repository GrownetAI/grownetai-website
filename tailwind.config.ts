import type { Config } from "tailwindcss";

const config: Config = {
  // Scoped dark mode: the `.dark` class is toggled on the CRM shell root only,
  // so the marketing site (all hardcoded-light) is never affected.
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Font Families ─────────────────────────────
         Two typefaces, two jobs:
           display → Instrument Serif, editorial headlines only (weight 400)
           sans    → Inter, everything else (UI, body, labels)
         `heading` stays on Inter so card titles and UI headings keep
         their legibility at small sizes. */
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        /* Display is now Inter Tight, not a serif. `serif` is kept pointing at
           the same face so the handful of legacy `font-serif` usages don't
           fall through to Georgia and reintroduce a second type system. */
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },

      /* ── Strict Type Scale (12 → 36px) — never use arbitrary sizes ── */
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.65rem" }],
        lg: ["1.125rem", { lineHeight: "1.8rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.9rem", letterSpacing: "-0.014em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.022em" }],
      },

      lineHeight: {
        tight: "1.15",
        snug: "1.3",
        normal: "1.5",
        relaxed: "1.7",
      },

      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.02em",
        wider: "0.08em",
        widest: "0.16em",
      },

      /* ══════════════════════════════════════════════════════════
         COLOR SYSTEM — "Paper & Ink"

         Canvas is warm paper, type is warm near-black, and exactly one
         saturated hue does the accent work: the emerald sampled straight
         out of the GrownetAI logo (#1CA88C). The logo's cyan and lime are
         kept as *decorative-only* tints for charts and small marks — they
         never carry text.

         Every text colour below is checked against its intended surface:
           ink        on paper → 17.6:1  (AAA)
           ink-body   on paper →  9.5:1  (AAA)
           ink-muted  on paper →  5.2:1  (AA)
           moss-600   on paper →  6.1:1  (AA, links + accents)
           paper      on forest → 15.3:1 (AAA)
      ══════════════════════════════════════════════════════════ */
      colors: {
        /* ── Canvas ── */
        paper: {
          DEFAULT: "#FAF9F6", // page background — warm off-white
          sunk: "#F3F1EA", // alternating band / inset surfaces
          raised: "#FFFFFF", // cards sitting on paper
        },
        sand: "#F3F1EA",

        /* ── Type ── */
        ink: {
          DEFAULT: "#14120F", // headings
          body: "#47423A", // body copy
          muted: "#6E6860", // secondary / captions
          faint: "#9C968C", // disabled, axis labels
          inverse: "#FAF9F6", // type on dark surfaces
        },

        /* ── Structure ── */
        hairline: {
          DEFAULT: "#E7E2D8",
          strong: "#D8D2C4",
        },

        /* ── Dark surfaces (hero cards, CTA band, footer) ── */
        forest: {
          DEFAULT: "#0E2A24",
          deep: "#0B211C",
          ink: "#081714",
        },

        /* ── The one accent: logo emerald ── */
        moss: {
          50: "#F0F8F5",
          100: "#DDF0E8",
          200: "#B6E0D1",
          300: "#5FC7A7",
          400: "#1CA88C", // logo emerald — fills, icons, marks
          500: "#12907A",
          600: "#0C6B58", // text-safe on paper: links, eyebrows
          700: "#08543F",
        },

        /* ── Decorative only — never text ── */
        lagoon: "#009AA8", // logo cyan
        sprout: "#79D65B", // logo lime

        /* ══════════════════════════════════════════════════════
           LEGACY ALIASES — remapped to the new palette.
           The old `brand-*` names are used ~300× across the pages;
           repointing them here reskins every page that hasn't been
           hand-touched, instead of leaving teal islands behind.
        ══════════════════════════════════════════════════════ */
        brand: {
          teal: "#0C6B58", // → moss-600 (was #008080)
          "teal-deep": "#08543F", // → moss-700
          "teal-dark": "#0E2A24", // → forest
          "teal-mist": "#DDF0E8", // → moss-100
          aqua: "#1CA88C", // → moss-400
          "aqua-deep": "#12907A", // → moss-500
          green: "#1CA88C",
          forest: "#08543F",
          "mint-cream": "#F0F8F5",
          charcoal: "#14120F", // → ink
          "dark-leaf": "#0B211C",
          "slate-gray": "#6E6860", // → ink-muted
          "cloud-white": "#F3F1EA", // → sand
          "light-gray": "#9C968C", // → ink-faint
          white: "#FFFFFF",
        },

        /* ── Semantic text colors (mirror of ink.*) ── */
        content: {
          DEFAULT: "#14120F",
          secondary: "#47423A",
          muted: "#6E6860",
          disabled: "#9C968C",
          inverse: "#FAF9F6",
        },
        muted: "#6E6860",
        disabled: "#9C968C",

        /* ── CRM semantic tokens (theme-flipping via CSS vars) ──
           Used ONLY by the dashboard/CRM. Values resolve to light or dark
           in styles/globals.css (:root / .dark). The rgb(var / <alpha-value>)
           form keeps opacity utilities (bg-panel/60, …) working in both. */
        page: "rgb(var(--c-page) / <alpha-value>)",
        panel: "rgb(var(--c-panel) / <alpha-value>)",
        elevated: "rgb(var(--c-elevated) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        "line-strong": "rgb(var(--c-line-strong) / <alpha-value>)",
        overlay: "rgb(var(--c-overlay) / <alpha-value>)",
        fg: "rgb(var(--c-fg) / <alpha-value>)",
        "fg-muted": "rgb(var(--c-fg-muted) / <alpha-value>)",
        "fg-subtle": "rgb(var(--c-fg-subtle) / <alpha-value>)",
        primary: "rgb(var(--c-brand) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
      },

      /* ── No gradients in the brand system ── */
      backgroundImage: {
        none: "none",
      },

      spacing: {
        navbar: "72px",
        "18": "72px",
        "22": "88px",
        section: "112px",
      },

      /* ── Border Radius — softer, more generous ── */
      borderRadius: {
        xl2: "20px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "36px",
      },

      /* ── Box Shadows — warm-tinted, low and wide (no coloured glow) ── */
      boxShadow: {
        card: "0 1px 2px rgba(20,18,15,.04), 0 8px 24px -14px rgba(20,18,15,.14)",
        "card-hover":
          "0 2px 4px rgba(20,18,15,.05), 0 18px 44px -20px rgba(20,18,15,.22)",
        brand: "0 8px 28px -12px rgba(20,18,15,.24)",
        "brand-lg": "0 20px 56px -24px rgba(20,18,15,.32)",
        float: "0 28px 70px -30px rgba(20,18,15,.35)",
        "inner-hairline": "inset 0 0 0 1px rgba(20,18,15,.06)",
      },

      animation: {
        "fade-in": "fadeIn .5s ease-out both",
        "slide-up": "slideUp .55s ease-out both",
        "slide-down": "slideDown .3s ease-out both",
        "scale-in": "scaleIn .3s ease-out both",
        /* Radix defers unmounting until the exit animation ends — without
           a closed-state animation the dropdown would vanish instantly. */
        "scale-out": "scaleOut .14s ease-in both",
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
        scaleOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(.96)" },
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

      transitionTimingFunction: {
        premium: "cubic-bezier(.4,0,.2,1)",
        spring: "cubic-bezier(.34,1.56,.64,1)",
      },

      maxWidth: {
        site: "1200px",
        prose: "68ch",
        form: "640px",
      },
    },
  },
  plugins: [],
};

export default config;
