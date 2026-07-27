"use client";

import { cn } from "@/lib/utils";
import SmoothImage from "@/components/ui/SmoothImage";

/* ════════════════════════════════════════════════════════════════
   BROWSER FRAME

   A screenshot on its own reads as a stock photo. The same screenshot inside
   browser chrome reads as a thing we shipped — which is the entire point of a
   portfolio. This is the cheapest credibility in the section.

   The scrim over the image is the ONE gradient the brand permits
   (globals.css:10 — "gradients only ever scrim imagery"), and it exists so the
   industry chip stays legible on a bright photo.
════════════════════════════════════════════════════════════════ */

export default function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  /** Fake address bar — it sells the "this is a real site" read. */
  url: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-hairline bg-paper-raised shadow-float",
        className,
      )}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-hairline bg-sand px-3.5 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
        </span>
        <span className="ml-1 min-w-0 flex-1 truncate rounded-md bg-paper-raised px-2.5 py-1 text-[11px] text-ink-muted">
          {url}
        </span>
      </div>

      {/* Screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        <SmoothImage
          src={src}
          alt={alt}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 620px"
          className={cn(
            "object-cover transition-transform duration-700 ease-premium",
            imageClassName,
          )}
        />
        {/* Scrim — permitted only because it sits over imagery. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,23,20,0) 55%, rgba(8,23,20,0.35) 100%)",
          }}
        />
      </div>
    </div>
  );
}
