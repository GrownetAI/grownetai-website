"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Code2,
  Smartphone,
  Search,
  Megaphone,
  Share2,
  ThumbsUp,
  Bot,
  BrainCircuit,
  Zap,
  Cpu,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
const ICONS: Record<string, LucideIcon> = {
  Code2, Smartphone, Search, Megaphone, Share2, ThumbsUp, Bot, BrainCircuit, Zap, Cpu,
};

export type CarouselService = {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  description: string;
  features: readonly string[];
};

interface ServiceCarouselProps {
  eyebrow: string;
  tagline: string;
  supporting?: string;
  services: readonly CarouselService[];
  whatsapp: string;
}

export default function ServiceCarousel({
  eyebrow,
  tagline,
  supporting,
  services,
  whatsapp,
}: ServiceCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Deep links: /services#<serviceId> must land on the right slide. Native
  // fragment scroll and Next.js Link hash nav (neither fires hashchange nor
  // popstate) scroll the swiper container itself, desyncing the slides — so
  // zero the container scroll before positioning, and watch for corruption.
  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    const el = swiper.el;

    const syncToHash = () => {
      el.scrollLeft = 0;
      el.scrollTop = 0;
      const hash = window.location.hash.slice(1);
      if (!hash) return null;
      const index = services.findIndex((s) => s.id === hash);
      if (index === -1) return null;
      swiper.slideTo(index, 0);
      return hash;
    };

    const hash = syncToHash();
    if (hash) {
      const card = document.getElementById(hash);
      const section = card?.closest("section") ?? card;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }

    const onScroll = () => {
      if (el.scrollLeft !== 0) syncToHash();
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [swiper, services]);

  const syncEdges = (s: SwiperClass) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  return (
    <div>
      {/* Editorial header row */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6 lg:mb-10">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="heading-section mt-3">{tagline}</h2>
          {supporting && <p className="text-body mt-3">{supporting}</p>}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            aria-label={`Previous ${eyebrow} service`}
            onClick={() => swiper?.slidePrev()}
            disabled={isBeginning}
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-paper-raised text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-hairline"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={`Next ${eyebrow} service`}
            onClick={() => swiper?.slideNext()}
            disabled={isEnd}
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-paper-raised text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-hairline"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* -mx / !px keep card shadows from clipping at the swiper edges */}
      <Swiper
        modules={[Navigation, Pagination, A11y, Keyboard]}
        onSwiper={(s) => {
          setSwiper(s);
          syncEdges(s);
        }}
        onSlideChange={syncEdges}
        onResize={syncEdges}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        slidesPerView={1.05}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1.6 },
          1024: { slidesPerView: 2.2 },
          1536: { slidesPerView: 2.8 },
        }}
        className="!-mx-2 !px-2 !pt-2 !pb-14"
      >
        {services.map((service) => (
          <SwiperSlide key={service.id} className="!h-auto">
            <ServiceSlideCard service={service} categoryLabel={eyebrow} whatsapp={whatsapp} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ServiceSlideCard({
  service,
  categoryLabel,
  whatsapp,
}: {
  service: CarouselService;
  categoryLabel: string;
  whatsapp: string;
}) {
  const Icon = ICONS[service.icon] ?? Code2;
  const waHref = whatsappUrl(
    whatsapp,
    `Hi! I have a question about your ${service.title} service.`,
  );

  return (
    <article
      id={service.id}
      className="flex h-full min-h-[420px] scroll-mt-28 flex-col rounded-3xl border border-hairline bg-paper-raised p-7 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover lg:min-h-[460px] lg:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-moss-100 text-moss-700">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full border border-hairline px-3 py-1 text-xs font-semibold text-ink-muted">
          {categoryLabel}
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink lg:text-[1.65rem]">
        {service.title}
      </h3>
      <p className="mt-1.5 text-sm text-ink-muted">{service.shortDesc}</p>
      <p className="text-body mt-3 text-sm leading-relaxed">{service.description}</p>

      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-ink-body sm:text-sm">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-moss-600" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        <Link
          href={`/contact?service=${encodeURIComponent(service.title)}`}
          className="btn btn-primary btn-sm"
        >
          Start this project <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
        >
          Ask a question
        </a>
      </div>
    </article>
  );
}
