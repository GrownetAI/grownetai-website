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
      fontFamily: {
        sans:    ["var(--font-manrope)",    "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)",    "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },

      /* ── Brand Colors ──────────────────────────── */
      colors: {
        brand: {
          teal:        "#1AABAB",
          "teal-deep": "#0D7A7A",
          "teal-mist": "#E1F8F8",
          green:       "#3BC456",
          forest:      "#27924A",
          "mint-cream":"#EDF9F0",
          charcoal:    "#1B1B1B",
          "dark-leaf": "#2C2C2C",
          "slate-gray":"#636363",
          "cloud-white":"#F5F5F5",
          "light-gray":"#999999",
          white:       "#FFFFFF",
        },
      },

      /* ── Background Gradients ──────────────────── */
      backgroundImage: {
        "gradient-brand":   "linear-gradient(135deg, #1AABAB 0%, #3BC456 100%)",
        "gradient-brand-2": "linear-gradient(135deg, #0D7A7A 0%, #1AABAB 50%, #3BC456 100%)",
        "gradient-dark":    "linear-gradient(135deg, #1B1B1B 0%, #1AABAB 100%)",
        "gradient-hero":    "linear-gradient(135deg, #0D7A7A 0%, #1AABAB 55%, #2db84c 100%)",
        "gradient-card":    "linear-gradient(145deg, #E1F8F8 0%, #EDF9F0 100%)",
      },

      /* ── Spacing / Sizing ──────────────────────── */
      spacing: {
        "navbar": "72px",
        "18":     "72px",
        "22":     "88px",
        "section":"96px",
      },

      /* ── Border Radius ─────────────────────────── */
      borderRadius: {
        "xl2": "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
      },

      /* ── Box Shadows ────────────────────────────── */
      boxShadow: {
        card:         "0 2px 12px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04)",
        "card-hover": "0 8px 32px rgba(26,171,171,.14), 0 2px 8px rgba(0,0,0,.06)",
        brand:        "0 8px 32px rgba(26,171,171,.25)",
        "brand-lg":   "0 16px 48px rgba(26,171,171,.35)",
        float:        "0 20px 60px rgba(0,0,0,.12)",
        "inner-teal": "inset 0 0 0 2px rgba(26,171,171,.2)",
      },

      /* ── Animations ─────────────────────────────── */
      animation: {
        "fade-in":         "fadeIn .5s ease-out both",
        "slide-up":        "slideUp .55s ease-out both",
        "slide-down":      "slideDown .3s ease-out both",
        "scale-in":        "scaleIn .3s ease-out both",
        float:             "float 5s ease-in-out infinite",
        shimmer:           "shimmer 2.5s linear infinite",
        "accordion-down":  "accordion-down .25s ease-out",
        "accordion-up":    "accordion-up .2s ease-out",
        ping:              "ping 1.5s cubic-bezier(0,0,.2,1) infinite",
        marquee:           "marquee 28s linear infinite",
        "spin-slow":       "spin 8s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to:   { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to:   { height: "0", opacity: "0" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      /* ── Transition timing ──────────────────────── */
      transitionTimingFunction: {
        premium: "cubic-bezier(.4,0,.2,1)",
        spring:  "cubic-bezier(.34,1.56,.64,1)",
      },

      /* ── Container ─────────────────────────────── */
      maxWidth: {
        site:  "1200px",
        prose: "72ch",
        form:  "640px",
      },
    },
  },
  plugins: [],
};

export default config;
