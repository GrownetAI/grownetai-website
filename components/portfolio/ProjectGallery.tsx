"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import MockScreen from "./MockScreen";
import Lightbox from "./Lightbox";
import type { GalleryKind } from "@/lib/case-study-details";
import type { CaseStudy } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* Gallery grid → opens the interactive Lightbox. The first tile is featured
   (spans two columns); the rest tile evenly. Every tile is keyboard-focusable
   and opens the viewer at its index. */

type Item = { label: string; kind: GalleryKind };

export default function ProjectGallery({
  study,
  gallery,
}: {
  study: CaseStudy;
  gallery: Item[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {gallery.map((item, i) => (
          <button
            key={`${item.label}-${i}`}
            onClick={() => setOpen(i)}
            aria-label={`Open ${item.label} in gallery viewer`}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline bg-sand p-2 text-left transition-[transform,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-1 hover:border-moss-300 hover:shadow-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-400/50",
              i === 0 && "col-span-2 lg:col-span-2 lg:row-span-2 lg:aspect-auto",
            )}
          >
            <div className="h-full w-full overflow-hidden rounded-xl transition-transform duration-500 ease-premium group-hover:scale-[1.02]">
              <MockScreen item={item} study={study} />
            </div>

            {/* Label + expand affordance */}
            <div className="pointer-events-none absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-xl bg-[#081714]/0 px-3 py-2 opacity-0 transition-all duration-300 group-hover:bg-[#081714]/70 group-hover:opacity-100">
              <span className="truncate text-xs font-semibold text-paper">
                {item.label}
              </span>
              <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-paper/20 text-paper">
                <Maximize2 className="h-3 w-3" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            items={gallery}
            study={study}
            index={open}
            onClose={() => setOpen(null)}
            onNavigate={setOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}
