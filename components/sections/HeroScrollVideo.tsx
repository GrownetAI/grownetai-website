"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Play } from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   HERO SCROLL VIDEO — cinematic scroll transition

   A storytelling moment between the hero and the rest of the page. It occupies
   a tall section with a STICKY stage: as you scroll past the hero the stage
   fades + scales + un-blurs into view, holds cinematically, then gracefully
   scales/fades out so the next section flows in — no layout shift (the tall
   section reserves the space).

   Only compositor properties animate (opacity / transform / filter), driven by
   `useScroll` → `useTransform`, so it stays GPU-cheap and never triggers layout.
   The video is muted/looping/playsInline, lazily played only while on screen
   (preload="none"). Reduced-motion users get a simple static framed stage.

   No video asset is required to look premium: without `src` it renders an
   on-brand forest stage; drop a file at /public/videos and pass `src` to play it.
════════════════════════════════════════════════════════════════ */

export default function HeroScrollVideo({
  src,
  poster,
  eyebrow = "Coming Soon",
  title = "We don't just build websites. We build businesses.",
}: {
  src?: string;
  poster?: string;
  eyebrow?: string;
  title?: string;
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Fade/scale/blur in on entry → hold while pinned → out on exit.
  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.3, 0.7, 0.95],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.65, 0.95],
    [0.9, 1, 1, 1.05],
  );
  const blurPx = useTransform(
    scrollYProgress,
    [0.05, 0.3, 0.7, 0.95],
    [16, 0, 0, 12],
  );
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const radius = useTransform(
    scrollYProgress,
    [0.05, 0.35, 0.7, 0.95],
    [40, 22, 22, 40],
  );

  // Lazy, courteous playback: only play while the stage is on screen.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  const Stage = (
    <div className="relative h-full w-full overflow-hidden bg-forest">
      {src ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : poster ? (
        <Image
          src={poster}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 dot-grid dot-grid-invert opacity-40"
        />
      )}

      {/* Cinematic scrim (permitted as an image scrim). */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#081714]/80 via-[#081714]/20 to-[#081714]/40"
      />
      <div
        aria-hidden
        className="hero-glow bottom-[-6rem] left-1/2 h-[320px] w-[680px] max-w-[120vw] -translate-x-1/2 bg-moss-400/20"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-paper/25 bg-paper/10 text-paper backdrop-blur-sm transition-transform duration-300 hover:scale-105">
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </span>
        <span className="mt-6 text-xs font-bold uppercase tracking-widest text-moss-300">
          {eyebrow}
        </span>
        <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold text-paper sm:text-3xl md:text-4xl">
          {title}
        </h2>
      </div>
    </div>
  );

  // Reduced motion (or no JS scroll): a calm, static framed stage.
  if (reduce) {
    return (
      <section
        aria-label="GrownetAI in motion"
        className="section-padding-sm bg-paper"
      >
        <div className="container-site">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] shadow-float">
            {Stage}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="GrownetAI in motion"
      className="relative h-[180vh] bg-paper"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4 sm:px-6">
        <motion.div
          style={{ opacity, scale, filter, borderRadius: radius }}
          className="relative h-[78vh] w-full  overflow-hidden shadow-float will-change-transform"
        >
          {Stage}
        </motion.div>
      </div>
    </section>
  );
}
