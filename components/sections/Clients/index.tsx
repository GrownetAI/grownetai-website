"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { CLIENTS, type Client } from "@/lib/clients";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   OUR CLIENTS — logo wall

   A dark-green (forest) social-proof band: a premium logo wall on the brand
   palette. Reference-inspired (heading + grid + "Load More") but upgraded —
   muted wordmarks that brighten and lift on hover, a moss accent, a smooth
   progressive reveal, and full keyboard/reduced-motion support. Logos render
   from real assets when a `logo` path exists, else as styled wordmarks.
════════════════════════════════════════════════════════════════ */

const STEP = 8; // how many to reveal at a time

export default function Clients() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(STEP);

  const shown = CLIENTS.slice(0, count);
  const allShown = count >= CLIENTS.length;

  return (
    <section className="section-padding relative overflow-hidden bg-forest">
      <div aria-hidden className="absolute inset-0 dot-grid dot-grid-invert opacity-40" />
      <div
        aria-hidden
        className="hero-glow left-1/2 top-10 h-[360px] w-[760px] max-w-[120vw] -translate-x-1/2 bg-moss-400/[0.12]"
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-moss-300">
            Trusted by
          </span>
          <h2 className="heading-section mt-3 text-paper">
            Our <span className="text-moss-300">Clients</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-paper/70">
            From neighbourhood favourites to funded startups — brands that trusted
            us to build, grow, and run what comes next.
          </p>
        </div>

        {/* Logo grid — flex-wrap + centered so an incomplete last row
            (13 doesn't divide evenly) centres instead of orphaning left. */}
        <div className="flex flex-wrap justify-center gap-4">
          <AnimatePresence initial={false}>
            {shown.map((client, i) => (
              <ClientTile
                key={client.name}
                client={client}
                index={i}
                reduce={!!reduce}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Load more */}
        {!allShown && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setCount((c) => Math.min(c + STEP, CLIENTS.length))}
              className="inline-flex items-center gap-2 rounded-full bg-moss-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-paper shadow-brand transition-colors duration-200 hover:bg-moss-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-300/60"
            >
              <Plus className="h-4 w-4" />
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── One logo tile ──────────────────────────────────────────────── */
function ClientTile({
  client,
  index,
  reduce,
}: {
  client: Client;
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      layout={!reduce}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: 8 }}
      transition={{
        duration: reduce ? 0 : 0.4,
        delay: reduce ? 0 : Math.min((index % STEP) * 0.05, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group grid h-24 basis-[calc(50%-0.5rem)] place-items-center rounded-2xl border border-paper/10 bg-paper/[0.03] px-4 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-moss-400/50 hover:bg-paper/[0.06] sm:h-28 sm:basis-[calc(33.333%-0.667rem)] lg:basis-[calc(25%-0.75rem)]"
    >
      {client.logo ? (
        <Image
          src={client.logo}
          alt={client.name}
          width={200}
          height={200}
          className={cn(
            "max-h-44 w-auto object-cover opacity-100 transition-all duration-300 pb-12",
          )}
        />
      ) : (
        <span className="text-center font-display text-lg font-bold tracking-tight text-paper/55 transition-colors duration-300 group-hover:text-paper sm:text-xl">
          {client.name}
        </span>
      )}
    </motion.div>
  );
}
