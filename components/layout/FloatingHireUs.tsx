"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   FLOATING "HIRE US" — a persistent bottom-right CTA on every
   marketing page, all breakpoints.

   Hidden on the app surfaces (login/register/dashboard/admin) where
   a marketing CTA is noise, and on /contact itself — floating a
   button that links to the page you are already on is clutter.

   Fades out while the footer is on screen so it never sits on top
   of the legal links.

   z-40: above page content, below the navbar overlays and modals
   (z-50+), so an open mega menu or dialog always covers it.
════════════════════════════════════════════════════════════════ */

const HIDDEN_PREFIXES = [
  "/login",
  "/register",
  "/dashboard",
  "/admin",
  "/contact",
];

export default function FloatingHireUs() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [footerVisible, setFooterVisible] = useState(false);

  const hidden = HIDDEN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  useEffect(() => {
    if (hidden) return;
    const footer = document.querySelector("footer");
    if (!footer) return;

    // Negative bottom rootMargin: only counts as intersecting once the
    // footer is more than ~120px into the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -120px 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [hidden, pathname]);

  if (hidden) return null;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-40"
      // Clears iOS home-indicator / gesture areas.
      style={{
        bottom: "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 0.5rem))",
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
    >
      {/* Fade lives on an inner div: framer-motion owns the outer
          element's inline opacity, which would override a class. */}
      <div
        className={`transition-opacity duration-200 ${
          footerVisible ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Link
          href="/contact"
          aria-label="Hire us — start a project"
          className="group flex items-center gap-2 rounded-full bg-ink py-3.5 pl-5 pr-4 text-sm
                     font-semibold text-paper shadow-float transition-[transform,background-color,color,box-shadow]
                     duration-200 hover:-translate-y-0.5 hover:bg-forest-ink hover:text-paper hover:shadow-brand-lg
                     active:scale-[0.97] sm:py-4 sm:pl-6 sm:pr-5 sm:text-base"
        >
          {/* Live-dot: signals "we're taking projects" without extra copy. */}
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-moss-400" />
          </span>
          Hire Us
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
