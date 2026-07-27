"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   FLOATING "HIRE US" — a persistent bottom-right CTA on every
   marketing page, all breakpoints.

   Hidden on the app surfaces (login/register/dashboard/admin) where
   a marketing CTA is noise, and on /contact itself — floating a
   button that links to the page you are already on is clutter.

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

  if (
    HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-4 z-40 sm:right-6"
      // Clears iOS home-indicator / gesture areas.
      style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/contact"
        aria-label="Hire us — start a project"
        className="group flex items-center gap-2 rounded-full bg-ink py-3.5 pl-5 pr-4 text-sm
                   font-semibold text-paper shadow-float transition-[transform,background-color,box-shadow]
                   duration-200 hover:-translate-y-0.5 hover:bg-black/40 hover:shadow-brand-lg
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
    </motion.div>
  );
}
