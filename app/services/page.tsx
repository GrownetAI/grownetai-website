import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import ServiceCarousel from "@/components/services/ServiceCarousel";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website & app development, SEO and performance marketing, Google & Meta ads, social media, custom AI agents, LLM integration, AI automation and custom model training.",
  alternates: { canonical: "https://grownetai.com/services" },
};

/* The 10 flat services, grouped into the three disciplines clients think in.
   Order + ids preserved so every /services#<id> deep link still resolves. */
const CATEGORIES: {
  key: string;
  label: string;
  tagline: string;
  supporting: string;
  ids: string[];
}[] = [
  {
    key: "build",
    label: "Build",
    tagline: "Websites, apps, and platforms engineered to convert.",
    supporting:
      "Product-grade engineering with a marketer's eye — every screen we ship is built around a business goal.",
    ids: ["web-dev", "app-dev"],
  },
  {
    key: "grow",
    label: "Grow",
    tagline: "SEO, ads, and social that compound into pipeline.",
    supporting:
      "Channels run end-to-end by one senior team, so search, paid, and social pull in the same direction.",
    ids: ["seo", "ads", "smm", "smo"],
  },
  {
    key: "ai",
    label: "AI",
    tagline: "Agents, automation, and models that do the work for you.",
    supporting:
      "From a single agent to a custom-trained model — practical AI that removes real work from your team's plate.",
    ids: ["ai-agents", "llm", "ai-automation", "model-training"],
  },
];

export default function ServicesPage() {
  const byId = (id: string) => SERVICES.find((s) => s.id === id)!;

  return (
    <main className="bg-paper pt-[var(--navbar-height)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div aria-hidden className="hero-glow left-1/2 -top-32 h-[360px] w-[640px] max-w-[130vw] -translate-x-1/2 bg-moss-400/10" />
        <div className="container-site relative z-10 mx-auto max-w-3xl text-start md:text-center">
          <span className="eyebrow">Services</span>
          <h1 className="heading-display mb-6 mt-4">
            Everything you need to grow, built in one place.
          </h1>
          <p className="text-body-lg">
            From websites and apps to AI agents and automation — one senior team
            covering the full stack of digital growth.
          </p>
          {/* Category quick-jump */}
          <div className="mt-8 flex flex-wrap gap-2 md:justify-center">
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

      {/* ── Category carousels ── */}
      {CATEGORIES.map((cat, ci) => (
        <section
          key={cat.key}
          id={cat.key}
          className={cn(
            "section-padding-sm scroll-mt-24 overflow-hidden",
            ci % 2 === 0 ? "bg-sand" : "bg-paper",
          )}
        >
          <div className="container-site">
            <FadeIn direction="up">
              <ServiceCarousel
                eyebrow={cat.label}
                tagline={cat.tagline}
                supporting={cat.supporting}
                services={cat.ids.map(byId)}
                whatsapp={SITE_CONFIG.whatsapp}
              />
            </FadeIn>
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
