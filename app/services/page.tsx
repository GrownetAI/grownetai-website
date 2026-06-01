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
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website & app development, SEO and performance marketing, Google & Meta ads, social media, custom AI agents, LLM integration, AI automation and custom model training.",
  alternates: { canonical: "https://grownetai.com/services" },
};

const TEAL = "#008080";
const AQUA = "#00E5E5";

type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
const ICONS: Record<string, LucideIcon> = {
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
};

export default function ServicesPage() {
  const waHref = whatsappUrl(
    SITE_CONFIG.whatsapp,
    "Hi, I would like help choosing a service.",
  );

  return (
    <main className="pt-[var(--navbar-height)]">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: TEAL, paddingTop: "72px", paddingBottom: "72px" }}
      >
        <div className="absolute inset-0 dot-grid opacity-[0.12]" />
        <div className="container-site relative z-10 text-center max-w-3xl mx-auto">
          <span className="eyebrow" style={{ color: AQUA }}>
            Services
          </span>
          <h1
            className="font-display font-extrabold text-white mt-3 mb-5"
            style={{ fontSize: "clamp(2.2rem,4.6vw,3.6rem)", letterSpacing: "-0.035em", lineHeight: 1.05 }}
          >
            Everything you need to grow, built in one place.
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            From websites and apps to AI agents and automation — one senior team
            covering the full stack of digital growth.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => {
              const Icon = ICONS[service.icon] ?? Code2;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-28 rounded-xl border border-gray-100 p-7 hover:border-brand-teal/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,128,128,0.08)", color: TEAL }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="heading-card text-lg">{service.title}</h2>
                      <p className="text-body text-sm mt-1">{service.shortDesc}</p>
                    </div>
                  </div>
                  <p className="text-body text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#5c6b6b" }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: TEAL }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="btn btn-primary btn-sm inline-flex items-center gap-2">
                      Get started <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      Ask a question
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden"
        style={{ background: TEAL, paddingTop: "88px", paddingBottom: "88px" }}
      >
        <div className="absolute inset-0 dot-grid opacity-[0.12]" />
        <div className="container-site relative z-10 text-center max-w-2xl mx-auto">
          <h2
            className="font-display font-extrabold text-white mb-4"
            style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)", letterSpacing: "-0.035em", lineHeight: 1.06 }}
          >
            Not sure which service you need?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book a free 30-minute call and we will map out exactly what will move
            the needle for your business.
          </p>
          <Link href="/contact" className="btn btn-accent btn-lg inline-flex items-center gap-2 font-bold">
            Get a free consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
