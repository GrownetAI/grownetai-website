"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   SMOOTH IMAGE — drop-in for next/image `fill` usage.

   Shimmers a sand placeholder while the network fetch is in flight,
   then fades the image in. The fade lives on a wrapper div so it never
   fights a transition-transform (hover scale) passed in via className.
   On error the placeholder stays, with a small ImageOff mark.
════════════════════════════════════════════════════════════════ */

export default function SmoothImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-sand" role="img" aria-label={alt}>
        <ImageOff className="h-6 w-6 text-ink-faint" />
      </div>
    );
  }

  return (
    <>
      {!loaded && <div aria-hidden className="absolute inset-0 animate-pulse bg-sand" />}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={className}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      </div>
    </>
  );
}
