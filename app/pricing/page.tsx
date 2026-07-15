"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
  Sparkles,
  MessageCircle,
  Globe,
  Smartphone,
  Search,
  Target,
  Share2,
  ThumbsUp,
  Bot,
  BrainCircuit,
  Zap,
  Cpu,
  Palette,
  type LucideIcon,
} from "lucide-react";
import IndustryExplorer from "@/components/sections/IndustryExplorer";
import { cn } from "@/lib/utils";
import { SMM_DELIVERABLES, SMM_ROWS } from "@/lib/pricing-industries";
import {
  COUNTRIES,
  SERVICES,
  SERVICE_INFO,
  RESEARCH_META,
  formatMoney,
  getPrice,
  type Country,
  type CountryCode,
  type Service,
} from "@/lib/pricing-data";

const INK = "#14120F";
const INK_BODY = "#47423A";
const PAPER = "#FAF9F6";
const HAIRLINE = "#E7E2D8";
const FOREST = "#0E2A24";
const MOSS_DEEP = "#0C6B58";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Search,
  Target,
  Share2,
  ThumbsUp,
  Bot,
  BrainCircuit,
  Zap,
  Cpu,
  Palette,
  Sparkles,
};

const INCLUDED = [
  { icon: Users, label: "A senior, in-house team" },
  { icon: ShieldCheck, label: "Fixed scope & clear quote" },
  { icon: Clock, label: "Defined timeline" },
  { icon: Sparkles, label: "Post-launch support" },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

/* ── Country selector chips ──────────────────────────────────────────────── */
function CountrySelector({
  country,
  onChange,
  compact = false,
}: {
  country: CountryCode;
  onChange: (c: CountryCode) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${compact ? "overflow-x-auto no-scrollbar" : "flex-wrap justify-center"}`}
    >
      {COUNTRIES.map((c) => {
        const isActive = c.code === country;
        return (
          <button
            key={c.code}
            onClick={() => onChange(c.code)}
            aria-pressed={isActive}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors duration-150 border flex-shrink-0"
            style={
              isActive
                ? { background: INK, color: PAPER, borderColor: INK }
                : { background: "#fff", color: INK_BODY, borderColor: HAIRLINE }
            }
          >
            <span className="text-base leading-none">{c.flag}</span>
            <span className={compact ? "hidden md:inline" : "hidden sm:inline"}>
              {c.label}
            </span>
            <span className={compact ? "md:hidden" : "sm:hidden"}>{c.code}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Bento package config ────────────────────────────────────────── */
const FEATURED: Record<string, string> = { "web-dev": "Popular", ai: "AI Recommended" };
const BEST_FOR: Record<string, string> = {
  "web-dev": "Businesses that need a site that converts",
  "app-dev": "Founders launching a product",
  seo: "Brands that want compounding organic growth",
  ads: "Teams ready to scale paid acquisition",
  smm: "Brands that need an always-on presence",
  smo: "Pages that need to grow organically",
  "ai-agents": "Ops teams automating real workflows",
  llm: "Products adding AI features",
  "ai-automation": "Teams drowning in repetitive work",
  "model-training": "Data-rich orgs needing a custom model",
  design: "New and rebranding businesses",
  ai: "Businesses going AI-native",
};

function startingFrom(service: Service, country: Country): string {
  const tier = service.tiers[0];
  const range = tier ? getPrice(service.id, country.code, tier.id) : undefined;
  return range ? formatMoney(country, range.min) : "Custom";
}

/* ── Package card (bento cell) ───────────────────────────────────── */
function PackageCard({ service, country }: { service: Service; country: Country }) {
  const Icon = ICONS[service.icon] ?? Globe;
  const info = SERVICE_INFO[service.id];
  const badge = FEATURED[service.id];
  const featured = Boolean(badge);
  return (
    <div
      id={service.id}
      className={cn(
        "group relative flex h-full scroll-mt-32 flex-col rounded-3xl border p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-brand",
        featured ? "border-moss-300 bg-moss-50 hover:border-moss-400" : "border-hairline bg-paper-raised hover:border-moss-300",
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-paper">
          {service.id === "ai" && <Sparkles className="h-3 w-3" />}
          {badge}
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-moss-100 text-moss-700">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-moss-600">{service.eyebrow}</p>
          <h3 className="font-heading text-lg font-bold text-ink">
            {service.title} {service.accent}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm text-ink-muted">{service.subtitle}</p>

      <div className="mt-4">
        <p className="text-xs font-medium text-ink-muted">Starting from</p>
        <p className="font-display text-2xl font-bold tabular-nums text-ink">{startingFrom(service, country)}</p>
        <p className="text-xs text-ink-muted">
          {service.basisLabel}
          {service.basis === "monthly" ? " / month" : ""}
        </p>
      </div>

      <dl className="mt-4 space-y-2 border-y border-hairline py-3 text-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 flex-shrink-0 text-moss-600" />
          <dt className="text-ink-muted">Timeline</dt>
          <dd className="ml-auto font-semibold text-ink">{info?.timeline ?? "Flexible"}</dd>
        </div>
        <div className="flex items-start gap-2">
          <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-moss-600" />
          <dt className="flex-shrink-0 text-ink-muted">Best for</dt>
          <dd className="ml-auto text-right text-xs font-medium text-ink-body">{BEST_FOR[service.id] ?? "Growing businesses"}</dd>
        </div>
      </dl>

      <ul className="mt-4 flex-1 space-y-1.5">
        {(info?.provides ?? []).slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-body">
            <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-moss-600" /> {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex gap-2">
        <Link href="/contact" className="btn btn-primary btn-sm flex-1 justify-center">Get a quote</Link>
        <a href="#compare" className="btn btn-secondary btn-sm">Compare</a>
      </div>
    </div>
  );
}

/* ── SMM detailed breakdown (supplementary, collapsible) ─────────── */
function SmmBreakdown({ service }: { service: Service }) {
  return (
    <details className="group mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-hairline bg-paper-raised">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-heading text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
        Social Media — full deliverables by level
        <ArrowRight className="h-4 w-4 text-moss-600 transition-transform group-open:rotate-90" />
      </summary>
      <div className="overflow-x-auto no-scrollbar border-t border-hairline">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-hairline text-left">
              <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-ink-muted">What&rsquo;s delivered</th>
              {service.tiers.map((t) => (
                <th key={t.id} className="px-4 py-3 text-center text-xs font-bold text-ink">{SMM_DELIVERABLES[t.id]?.label ?? t.tier}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SMM_ROWS.map((rowLabel, r) => (
              <tr key={rowLabel} className={r % 2 ? "bg-sand/40" : ""}>
                <td className="px-4 py-2.5 font-medium text-ink-body">{rowLabel}</td>
                {service.tiers.map((t) => (
                  <td key={t.id} className="px-4 py-2.5 text-center tabular-nums text-ink">{SMM_DELIVERABLES[t.id]?.values[r] ?? "—"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export default function PricingPage() {
  const [country, setCountry] = useState<CountryCode>("IN");
  const active = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];

  return (
    <main className="pt-[var(--navbar-height)] bg-paper">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 bg-paper">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="hero-glow w-[620px] h-[340px] max-w-[130vw] -top-32 left-1/2 -translate-x-1/2 bg-moss-400/10" />
        <div className="container-site relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper-raised border border-hairline text-ink-body text-xs font-semibold uppercase tracking-widest mb-7">
              <span className="w-2 h-2 rounded-full bg-moss-400 animate-pulse" />
              Transparent Pricing
            </div>
            <h1 className="heading-display mb-5">
              Pricing for Every{" "}
              <em className="italic text-moss-600">Market</em>
            </h1>
            <p className="text-ink-body text-lg max-w-xl mx-auto mb-9 leading-relaxed">
              Pick your country to see local pricing for every service — from
              websites and ads to AI agents. No hidden fees, fixed-scope quotes.
            </p>

            {/* Quick jump nav */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SERVICES.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-ink-body bg-paper-raised border border-hairline hover:border-ink hover:text-ink transition-colors"
                >
                  {s.eyebrow}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky country selector ── */}
      <div
        className="sticky top-[var(--navbar-height)] z-30 bg-paper/90 backdrop-blur-md border-b border-hairline"
        style={{ boxShadow: "0 1px 2px rgba(20,18,15,0.03)" }}
      >
        <div className="container-site py-3">
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs font-bold uppercase tracking-widest text-brand-slate-gray flex-shrink-0">
              Pricing in
            </span>
            <CountrySelector country={country} onChange={setCountry} compact />
          </div>
        </div>
      </div>

      {/* ── Pricing by business type (comparison) ── */}
      <div id="compare">
        <IndustryExplorer country={active} />
      </div>

      {/* ── Packages (bento) ── */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Packages</span>
            <h2 className="heading-section mt-3">Every service, one clear price.</h2>
            <p className="text-body mt-3">
              Live starting-from pricing for {active.flag} {active.label}. Every
              project is quoted to scope.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <PackageCard key={service.id} service={service} country={active} />
            ))}
          </div>
          {SERVICES.filter((s) => s.id === "smm").map((s) => (
            <SmmBreakdown key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* ── What's included band ── */}
      <section className="py-12 bg-white">
        <div className="container-site">
          <div className="rounded-2xl border border-hairline bg-paper-raised p-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {INCLUDED.map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.label} className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(28,168,140,0.12)", color: MOSS_DEEP }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium" style={{ color: INK }}>
                    {it.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-ink-muted mt-5">
            Prices are indicative market ranges (updated {RESEARCH_META.last_updated}) and
            are confirmed with a fixed-scope quote. Ad spend is billed separately by the ad
            platforms.
          </p>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="py-10 bg-paper border-y border-hairline">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "43+", label: "Clients Served" },
              { val: "99%", label: "Satisfaction Rate" },
              { val: "250%", label: "Avg ROI Increase" },
              { val: "8", label: "Markets Covered" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-brand-teal">{s.val}</div>
                <div className="text-sm text-ink-muted mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: FOREST }}>
        <div className="absolute inset-0 dot-grid dot-grid-invert opacity-50" />
        <div className="hero-glow w-[620px] h-[320px] max-w-[130vw] -bottom-28 left-1/2 -translate-x-1/2 bg-moss-400/15" />
        <div className="container-site relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="display-lg text-paper mb-5">
              Get a precise quote in 24 hours.
            </h2>
            <p className="text-paper/80 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Tell us about your project and market — we'll send a fixed-scope proposal
              with timeline and price.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href="/contact"
                className="btn btn-accent btn-lg inline-flex items-center gap-2"
              >
                Get Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918796432343"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-on-dark btn-lg inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
