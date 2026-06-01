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
  type LucideIcon,
} from "lucide-react";
import {
  COUNTRIES,
  SERVICES,
  RESEARCH_META,
  priceLabel,
  getPrice,
  type Country,
  type CountryCode,
  type Service,
  type Tier,
} from "@/lib/pricing-data";

const TEAL = "#008080";
const AQUA = "#00E5E5";
const INK = "#0B1F1F";

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
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 border flex-shrink-0"
            style={
              isActive
                ? { background: TEAL, color: "#fff", borderColor: TEAL }
                : { background: "#fff", color: "#5c6b6b", borderColor: "#e6ecec" }
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

/* ── Package card ────────────────────────────────────────────────────────── */
function PackageCard({
  service,
  tier,
  country,
}: {
  service: Service;
  tier: Tier;
  country: Country;
}) {
  const range = getPrice(service.id, country.code, tier.id);
  return (
    <div
      className="relative flex flex-col rounded-xl p-6 bg-white transition-all duration-300 hover:-translate-y-1"
      style={{
        border: tier.popular ? `1.5px solid ${TEAL}` : "1px solid #eceeef",
        boxShadow: tier.popular
          ? "0 18px 40px -18px rgba(0,77,77,0.35)"
          : "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {tier.popular && (
        <span
          className="absolute -top-3 left-6 text-[11px] font-bold px-2.5 py-1 rounded-md"
          style={{ background: AQUA, color: INK }}
        >
          Most popular
        </span>
      )}

      <span className="eyebrow text-[11px]">{tier.tier}</span>
      <h3 className="font-heading font-bold text-xl mt-1.5" style={{ color: INK }}>
        {tier.name}
      </h3>
      <p className="text-sm text-brand-slate-gray mt-1">For {tier.target.toLowerCase()}</p>

      <div className="mt-5 mb-1">
        <span
          className="font-display font-extrabold"
          style={{
            color: INK,
            fontSize: "clamp(1.3rem,2vw,1.6rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {priceLabel(country, range)}
        </span>
      </div>
      <p className="text-xs text-brand-light-gray mb-5">
        {service.basisLabel}
        {service.basis === "monthly" ? " / month" : ""}
      </p>

      <p className="text-sm text-brand-slate-gray mb-5">{tier.blurb}</p>

      <ul className="space-y-2.5 mb-7 flex-1">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm"
            style={{ color: "#5c6b6b" }}
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "rgba(0,128,128,0.1)" }}
            >
              <Check className="w-3 h-3" style={{ color: TEAL }} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`btn ${tier.popular ? "btn-primary" : "btn-secondary"} w-full inline-flex items-center justify-center gap-2 font-semibold`}
      >
        Get a quote <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

/* ── One service section ─────────────────────────────────────────────────── */
function ServiceSection({
  service,
  country,
  shaded,
}: {
  service: Service;
  country: Country;
  shaded: boolean;
}) {
  const Icon = ICONS[service.icon] ?? Globe;
  return (
    <section
      id={service.id}
      className={`scroll-mt-32 py-16 ${shaded ? "bg-gray-50/60" : "bg-white"}`}
    >
      <div className="container-site">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-teal bg-teal-50 border border-teal-100">
            <Icon className="w-3.5 h-3.5" />
            {service.eyebrow}
          </span>
          <h2 className="heading-section mt-5">
            {service.title} <span className="text-gradient">{service.accent}</span>
          </h2>
          <p className="text-body mt-3">{service.subtitle}</p>
          <p className="text-xs text-brand-light-gray mt-3">
            Showing {service.basis === "monthly" ? "monthly" : "project"} ranges in{" "}
            {country.currency} for {country.flag} {country.label}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {service.tiers.map((tier) => (
            <PackageCard
              key={tier.id}
              service={service}
              tier={tier}
              country={country}
            />
          ))}
        </div>

        {service.note && (
          <p className="text-center text-xs text-brand-light-gray mt-6 max-w-2xl mx-auto">
            * {service.note}
          </p>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export default function PricingPage() {
  const [country, setCountry] = useState<CountryCode>("IN");
  const active = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];

  return (
    <main className="pt-[var(--navbar-height)] bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20" style={{ background: TEAL }}>
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #00E5E5 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Transparent Pricing
            </div>
            <h1
              className="font-display font-black text-white mb-4"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                textShadow: "0 2px 20px rgba(0,0,0,0.2)",
              }}
            >
              Pricing for Every{" "}
              <span className="relative inline-block">
                <span style={{ color: "#d4f5d4" }}>Market</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/40 rounded-full" />
              </span>
            </h1>
            <p
              className="text-white/90 text-lg max-w-xl mx-auto mb-8 leading-relaxed"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.15)" }}
            >
              Pick your country to see local pricing for every service — from
              websites and ads to AI agents. No hidden fees, fixed-scope quotes.
            </p>

            {/* Quick jump nav */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SERVICES.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
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
        className="sticky top-[var(--navbar-height)] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
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

      {/* ── Service sections ── */}
      {SERVICES.map((service, i) => (
        <ServiceSection
          key={service.id}
          service={service}
          country={active}
          shaded={i % 2 === 1}
        />
      ))}

      {/* ── What's included band ── */}
      <section className="py-12 bg-white">
        <div className="container-site">
          <div className="rounded-xl border border-gray-100 p-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {INCLUDED.map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.label} className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,128,128,0.08)", color: TEAL }}
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
          <p className="text-center text-xs text-brand-light-gray mt-5">
            Prices are indicative market ranges (updated {RESEARCH_META.last_updated}) and
            are confirmed with a fixed-scope quote. Ad spend is billed separately by the ad
            platforms.
          </p>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="py-10 bg-white border-y border-gray-100">
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
                <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: TEAL }}>
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container-site relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2
              className="font-display font-black text-white mb-4"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
                textShadow: "0 2px 20px rgba(0,0,0,0.2)",
              }}
            >
              Get a precise quote in 24 hours.
            </h2>
            <p
              className="text-white/90 text-lg mb-10 max-w-md mx-auto leading-relaxed"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.15)" }}
            >
              Tell us about your project and market — we'll send a fixed-scope proposal
              with timeline and price.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-white text-brand-teal-deep shadow-xl hover:-translate-y-0.5 transition-all duration-200 hover:shadow-2xl"
              >
                Get Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918796432343"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-white/15 border border-white/30 text-white hover:bg-white/25 transition-all duration-200"
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
