import type { Metadata } from "next";
import Link from "next/link";
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
  ArrowRight,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { whatsappUrl, cn } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website & app development, SEO and performance marketing, Google & Meta ads, social media, custom AI agents, LLM integration, AI automation and custom model training.",
  alternates: { canonical: "https://grownetai.com/services" },
};

type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
const ICONS: Record<string, LucideIcon> = {
  Code2, Smartphone, Search, Megaphone, Share2, ThumbsUp, Bot, BrainCircuit, Zap, Cpu,
};

type Service = (typeof SERVICES)[number];

/* The 10 flat services, grouped into the three disciplines clients think in.
   Order + ids preserved so every /services#<id> deep link still resolves. */
const CATEGORIES: { key: string; label: string; tagline: string; ids: string[] }[] = [
  { key: "build", label: "Build", tagline: "Websites, apps, and platforms engineered to convert.", ids: ["web-dev", "app-dev"] },
  { key: "grow", label: "Grow", tagline: "SEO, ads, and social that compound into pipeline.", ids: ["seo", "ads", "smm", "smo"] },
  { key: "ai", label: "AI", tagline: "Agents, automation, and models that do the work for you.", ids: ["ai-agents", "llm", "ai-automation", "model-training"] },
];

export default function ServicesPage() {
  const waHref = whatsappUrl(
    SITE_CONFIG.whatsapp,
    "Hi, I would like help choosing a service.",
  );
  const byId = (id: string) => SERVICES.find((s) => s.id === id)!;

  return (
    <main className="bg-paper pt-[var(--navbar-height)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-paper py-20">
        <div aria-hidden className="absolute inset-0 dot-grid opacity-40" />
        <div aria-hidden className="hero-glow left-1/2 -top-32 h-[360px] w-[640px] max-w-[130vw] -translate-x-1/2 bg-moss-400/10" />
        <div className="container-site relative z-10 mx-auto max-w-3xl text-center">
          <span className="eyebrow">Services</span>
          <h1 className="heading-display mb-6 mt-4">
            Everything you need to grow, built in one place.
          </h1>
          <p className="text-body-lg">
            From websites and apps to AI agents and automation — one senior team
            covering the full stack of digital growth.
          </p>
          {/* Category quick-jump */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <a
                key={c.key}
                href={`#${c.key}`}
                className="rounded-full border border-hairline bg-paper-raised px-4 py-2 text-sm font-semibold text-ink-body transition-colors hover:border-ink hover:text-ink"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category bentos ── */}
      {CATEGORIES.map((cat, ci) => (
        <section
          key={cat.key}
          id={cat.key}
          className={cn("section-padding-sm scroll-mt-24", ci % 2 === 0 ? "bg-sand" : "bg-paper")}
        >
          <div className="container-site">
            <FadeIn direction="up" className="mx-auto mb-10 max-w-2xl text-center">
              <span className="eyebrow">{cat.label}</span>
              <h2 className="heading-section mt-3">{cat.tagline}</h2>
            </FadeIn>

            <div className="grid gap-4 md:grid-cols-2">
              {cat.ids.map((id, i) => (
                <FadeIn key={id} direction="up" delay={Math.min(i * 0.07, 0.28)}>
                  <ServiceCard service={byId(id)} flagship={i === 0} waHref={waHref} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="section-padding bg-paper">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-16 text-center sm:px-12">
            <div aria-hidden className="absolute inset-0 dot-grid dot-grid-invert opacity-50" />
            <div aria-hidden className="hero-glow bottom-[-7rem] left-1/2 h-[320px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-moss-400/15" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="display-lg text-paper">Not sure which service you need?</h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-paper/80">
                Book a free 30-minute call and we&rsquo;ll map out exactly what
                will move the needle for your business.
              </p>
              <Link href="/contact" className="btn btn-accent btn-lg mt-8">
                Get a free consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── One service card (flagship = the first in its category) ─────────── */
function ServiceCard({
  service,
  flagship,
  waHref,
}: {
  service: Service;
  flagship: boolean;
  waHref: string;
}) {
  const Icon = ICONS[service.icon] ?? Code2;
  return (
    <div
      id={service.id}
      className={cn(
        "group flex h-full scroll-mt-28 flex-col rounded-3xl border p-7 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-brand",
        flagship
          ? "border-moss-200 bg-moss-50 hover:border-moss-300"
          : "border-hairline bg-paper-raised hover:border-moss-300",
      )}
    >
      <div className="mb-4 flex items-start gap-4">
        <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-moss-100 text-moss-700">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          {flagship && (
            <span className="mb-1 inline-block rounded-full bg-moss-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Flagship
            </span>
          )}
          <h3 className="heading-card text-lg">{service.title}</h3>
          <p className="text-body mt-1 text-sm">{service.shortDesc}</p>
        </div>
      </div>

      <p className="text-body mb-5 text-sm leading-relaxed">{service.description}</p>

      <ul className="mb-6 grid grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-body">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-moss-600" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3">
        <Link href="/contact" className="btn btn-primary btn-sm">
          Get started <ArrowRight className="h-4 w-4" />
        </Link>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
          Ask a question
        </a>
      </div>
    </div>
  );
}
