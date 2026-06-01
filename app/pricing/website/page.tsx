"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Clock, Users, Sparkles } from "lucide-react";

const TEAL = "#008080";
const AQUA = "#00E5E5";
const INK = "#0B1F1F";

type CountryCode = "IN" | "US" | "CA" | "GB" | "AU" | "NZ" | "SG" | "AE";

const COUNTRIES: { code: CountryCode; flag: string; label: string; currency: string }[] = [
  { code: "IN", flag: "🇮🇳", label: "India", currency: "INR" },
  { code: "US", flag: "🇺🇸", label: "United States", currency: "USD" },
  { code: "CA", flag: "🇨🇦", label: "Canada", currency: "CAD" },
  { code: "GB", flag: "🇬🇧", label: "United Kingdom", currency: "GBP" },
  { code: "AU", flag: "🇦🇺", label: "Australia", currency: "AUD" },
  { code: "NZ", flag: "🇳🇿", label: "New Zealand", currency: "NZD" },
  { code: "SG", flag: "🇸🇬", label: "Singapore", currency: "SGD" },
  { code: "AE", flag: "🇦🇪", label: "UAE", currency: "AED" },
];

type Pkg = {
  tier: string;
  name: string;
  target: string;
  blurb: string;
  popular?: boolean;
  features: string[];
  price: Record<CountryCode, string>;
};

const PACKAGES: Pkg[] = [
  {
    tier: "Launch",
    name: "Starter Business Website",
    target: "Local businesses",
    blurb: "A sharp, credible presence that turns searches into calls.",
    features: [
      "Up to 5 pages",
      "Conversion-first design",
      "Fully mobile responsive",
      "Basic SEO setup",
      "Contact & lead forms",
      "~2 week delivery",
    ],
    price: {
      IN: "₹15,000 – ₹50,000",
      US: "$3,000 – $8,000",
      CA: "CAD 1,500 – 3,500",
      GB: "£2,000 – £5,000",
      AU: "AUD 3,000 – 7,000",
      NZ: "NZD 2,500 – 6,000",
      SG: "SGD 2,000 – 5,000",
      AE: "AED 4,500 – 12,000",
    },
  },
  {
    tier: "Growth",
    name: "Professional Website",
    target: "Service companies",
    blurb: "A bespoke, CMS-powered site built to win bigger clients.",
    popular: true,
    features: [
      "Up to 12 custom pages",
      "Bespoke UI/UX design",
      "CMS for self-editing",
      "On-page SEO",
      "Analytics & tracking",
      "~3–4 week delivery",
    ],
    price: {
      IN: "₹50,000 – ₹1,50,000",
      US: "$8,000 – $25,000",
      CA: "CAD 4,000 – 8,000",
      GB: "£5,000 – £15,000",
      AU: "AUD 7,000 – 20,000",
      NZ: "NZD 6,000 – 15,000",
      SG: "SGD 5,000 – 15,000",
      AE: "AED 8,000 – 25,000",
    },
  },
  {
    tier: "Startup Platform",
    name: "Startup Website + CMS",
    target: "Funded startups",
    blurb: "A scalable, content-rich platform ready to grow with you.",
    features: [
      "Headless CMS",
      "Blog & dynamic content",
      "Third-party integrations",
      "Performance-tuned",
      "Scalable architecture",
      "Launch support",
    ],
    price: {
      IN: "₹1,00,000 – ₹3,00,000",
      US: "$15,000 – $40,000",
      CA: "CAD 8,000 – 20,000",
      GB: "£10,000 – £30,000",
      AU: "AUD 15,000 – 40,000",
      NZ: "NZD 12,000 – 35,000",
      SG: "SGD 10,000 – 35,000",
      AE: "AED 20,000 – 60,000",
    },
  },
  {
    tier: "Ecommerce Suite",
    name: "Ecommerce Store",
    target: "D2C brands",
    blurb: "A high-converting storefront engineered to sell at scale.",
    features: [
      "Product catalog & cart",
      "Secure payments",
      "Inventory management",
      "Conversion-optimized",
      "Marketing integrations",
      "Analytics dashboards",
    ],
    price: {
      IN: "₹1,50,000 – ₹8,00,000",
      US: "$25,000 – $100,000+",
      CA: "CAD 6,000 – 30,000+",
      GB: "£15,000 – £80,000",
      AU: "AUD 20,000 – 100,000",
      NZ: "NZD 15,000 – 80,000",
      SG: "SGD 15,000 – 100,000",
      AE: "AED 18,000 – 80,000",
    },
  },
  {
    tier: "SaaS MVP",
    name: "SaaS MVP",
    target: "Tech founders",
    blurb: "A production-ready MVP to validate and launch your product.",
    features: [
      "Auth & user dashboards",
      "Database + APIs",
      "Subscriptions & billing",
      "Scalable cloud infra",
      "Admin & analytics",
      "Iterative roadmap",
    ],
    price: {
      IN: "₹5,00,000 – ₹30,00,000+",
      US: "$50,000 – $250,000+",
      CA: "CAD 25,000 – 150,000+",
      GB: "£40,000 – £200,000+",
      AU: "AUD 50,000 – 250,000+",
      NZ: "NZD 40,000 – 200,000+",
      SG: "SGD 40,000 – 250,000+",
      AE: "AED 50,000 – 300,000+",
    },
  },
];

const INCLUDED = [
  { icon: Users, label: "A senior, in-house team" },
  { icon: ShieldCheck, label: "Fixed scope & clear quote" },
  { icon: Clock, label: "Defined timeline" },
  { icon: Sparkles, label: "Post-launch support" },
];

export default function WebsitePackagesPage() {
  const [country, setCountry] = useState<CountryCode>("IN");
  const active = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];

  return (
    <main className="pt-[var(--navbar-height)] bg-white">
      {/* Header */}
      <section className="pt-16 pb-10">
        <div className="container-site text-center max-w-3xl mx-auto">
          <span className="eyebrow">Packages</span>
          <h1
            className="font-display font-extrabold mt-3 mb-4"
            style={{
              color: INK,
              fontSize: "clamp(2.2rem,4.6vw,3.6rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            Transparent packages for every market.
          </h1>
          <p className="text-body-lg">
            Choose your country to see local pricing. Every project is
            fixed-scope with a clear quote — no surprises, no hourly billing.
          </p>
        </div>

        {/* Country toggle */}
        <div className="container-site mt-9">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {COUNTRIES.map((c) => {
              const isActive = c.code === country;
              return (
                <button
                  key={c.code}
                  onClick={() => setCountry(c.code)}
                  aria-pressed={isActive}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 border"
                  style={
                    isActive
                      ? { background: TEAL, color: "#fff", borderColor: TEAL }
                      : { background: "#fff", color: "#5c6b6b", borderColor: "#e6ecec" }
                  }
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="hidden sm:inline">{c.label}</span>
                  <span className="sm:hidden">{c.code}</span>
                </button>
              );
            })}
          </div>
          <p className="text-center text-xs text-brand-light-gray mt-3">
            Showing estimated project ranges in {active.currency} for {active.flag}{" "}
            {active.label}
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="pb-20">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {PACKAGES.map((p) => (
              <div
                key={p.name}
                className="relative flex flex-col rounded-xl p-6 bg-white transition-all duration-300"
                style={{
                  border: p.popular ? `1.5px solid ${TEAL}` : "1px solid #eceeef",
                  boxShadow: p.popular
                    ? "0 18px 40px -18px rgba(0,77,77,0.35)"
                    : "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                {p.popular && (
                  <span
                    className="absolute -top-3 left-6 text-[11px] font-bold px-2.5 py-1 rounded-md"
                    style={{ background: AQUA, color: INK }}
                  >
                    Most popular
                  </span>
                )}

                <span className="eyebrow text-[11px]">{p.tier}</span>
                <h3 className="font-heading font-bold text-xl mt-1.5" style={{ color: INK }}>
                  {p.name}
                </h3>
                <p className="text-sm text-brand-slate-gray mt-1">
                  For {p.target.toLowerCase()}
                </p>

                <div className="mt-5 mb-1">
                  <span
                    className="font-display font-extrabold"
                    style={{
                      color: INK,
                      fontSize: "clamp(1.35rem,2.1vw,1.65rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.price[country]}
                  </span>
                </div>
                <p className="text-xs text-brand-light-gray mb-5">
                  Estimated project range
                </p>

                <p className="text-sm text-brand-slate-gray mb-5">{p.blurb}</p>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#5c6b6b" }}>
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
                  className={`btn ${p.popular ? "btn-primary" : "btn-secondary"} w-full inline-flex items-center justify-center gap-2 font-semibold`}
                >
                  Get a quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}

            {/* Custom / enterprise card */}
            <div
              className="flex flex-col rounded-xl p-6 justify-center"
              style={{ background: "#f6fbfb", border: "1px dashed #cfe3e3" }}
            >
              <h3 className="font-heading font-bold text-lg" style={{ color: INK }}>
                Something more custom?
              </h3>
              <p className="text-sm text-brand-slate-gray mt-2 mb-5">
                AI agents, app development, automation or a multi-market rollout —
                we will scope it and give you a fixed quote.
              </p>
              <Link
                href="/contact"
                className="btn btn-secondary inline-flex items-center justify-center gap-2 font-semibold"
              >
                Talk to us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Included band */}
          <div className="mt-12 rounded-xl border border-gray-100 p-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
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
            style={{
              fontSize: "clamp(1.9rem,4vw,2.9rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.06,
            }}
          >
            Get a precise quote in 24 hours.
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Tell us about your project and market — we will send a fixed-scope
            proposal with timeline and price.
          </p>
          <Link
            href="/contact"
            className="btn btn-accent btn-lg inline-flex items-center gap-2 font-bold"
          >
            Request a quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
