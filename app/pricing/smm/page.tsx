"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Target, MessageCircle } from "lucide-react";

const USD_RATE = 0.012;
function inrToUsd(inr: number) {
  return Math.round(inr * USD_RATE);
}

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const SMM_PLANS = [
  {
    id: "silver",
    name: "Silver",
    price: 17500,
    duration: "3 Months",
    accent: "#64748b",
    popular: false,
    features: [
      "Analyzing & competitor research",
      "Creating attractive ads for your business",
      "Designing ad creative (2-3 options)",
      "Creating audience according to your niche",
      "Creating lead form",
      "Creating eye-catching Primary text",
      "Optimizing headline text",
      "Creating WhatsApp API (if needed)",
      "Designing Facebook cover & profile image",
      "Creating Lead/Like/Brand Awareness Campaigns",
      "Detailed targeting according to the niche",
      "Re targeting campaigns",
    ],
  },
  {
    id: "gold-smm",
    name: "Gold",
    price: 32500,
    duration: "6 Months",
    accent: "#008080",
    popular: true,
    features: [
      "Analyzing & competitor research",
      "Creating attractive ads for your business",
      "Designing ad creative (2-3 options)",
      "Creating audience according to your niche",
      "Creating lead form",
      "Creating eye-catching Primary text",
      "Optimizing headline text",
      "Creating WhatsApp API (if needed)",
      "Designing Facebook cover & profile image",
      "Creating Lead/Like/Brand Awareness Campaigns",
      "Detailed targeting according to the niche",
      "Re targeting campaigns",
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    price: 62500,
    duration: "12 Months",
    accent: "#00E5E5",
    popular: false,
    features: [
      "Analyzing & competitor research",
      "Creating attractive ads for your business",
      "Designing ad creative (2-3 options)",
      "Creating audience according to your niche",
      "Creating lead form",
      "Creating eye-catching Primary text",
      "Optimizing headline text",
      "Creating WhatsApp API (if needed)",
      "Designing Facebook cover & profile image",
      "Creating Lead/Like/Brand Awareness Campaigns",
      "Detailed targeting according to the niche",
      "Re targeting campaigns",
    ],
  },
];

/* ══════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════ */
function CurrencyToggle({
  currency,
  onChange,
}: {
  currency: "INR" | "USD";
  onChange: (c: "INR" | "USD") => void;
}) {
  return (
    <div className="inline-flex items-center gap-3 bg-white/80 border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
      <span
        className={`text-sm font-semibold transition-colors ${currency === "INR" ? "text-brand-teal" : "text-gray-400"}`}
      >
        ₹ INR
      </span>
      <button
        onClick={() => onChange(currency === "INR" ? "USD" : "INR")}
        className="relative w-11 h-6 rounded-full transition-colors duration-300"
        style={{
          background:
            currency === "USD"
              ? "#008080"
              : "#e5e7eb",
        }}
        aria-label="Toggle currency"
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${currency === "USD" ? "left-5" : "left-0.5"}`}
        />
      </button>
      <span
        className={`text-sm font-semibold transition-colors ${currency === "USD" ? "text-brand-teal" : "text-gray-400"}`}
      >
        $ USD
      </span>
    </div>
  );
}

function PlanCard({
  plan,
  currency,
  index,
}: {
  plan: (typeof SMM_PLANS)[0];
  currency: "INR" | "USD";
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="relative flex flex-col"
    >
      {plan.popular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 px-5 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap shadow-md"
          style={{ background: "#008080" }}
        >
          Most Popular
        </div>
      )}
      <div
        className={`relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
          plan.popular
            ? "shadow-[0_8px_40px_rgba(0, 128, 128,0.22)] border-2 border-brand-teal"
            : "shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-gray-100 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
        }`}
        style={{
          background: plan.popular
            ? "#FFFFFF"
            : "#fff",
        }}
      >
        <div
          className="h-1 w-full"
          style={{
            background: `${plan.accent}`,
          }}
        />

        <div className="px-6 pt-6 pb-5">
          <h3 className="font-heading font-bold text-brand-charcoal text-xl mb-3">
            {plan.name}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-400">
              {currency === "INR" ? "₹" : "$"}
            </span>
            <span
              className="text-4xl font-black"
              style={{ color: plan.accent }}
            >
              {currency === "INR"
                ? plan.price.toLocaleString("en-IN")
                : inrToUsd(plan.price).toLocaleString("en-US")}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wider">
            {plan.duration}
          </p>
        </div>

        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="px-6 pt-4 pb-6 flex-1 flex flex-col">
          <ul className="flex-1 space-y-2">
            {plan.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-sm text-gray-600"
              >
                <Check className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-5 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: plan.popular
                ? "#008080"
                : plan.accent,
            }}
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function SmmPricingPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  return (
    <main className="pt-[var(--navbar-height)] bg-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-24"
        style={{
          background:
            "#008080",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute bottom-[-60px] right-[-60px] w-96 h-96 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #006666 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <Target className="w-3.5 h-3.5" />
              SMM Plans
            </div>
            <h1
              className="font-display font-black text-white mb-4"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                textShadow: "0 2px 20px rgba(0,0,0,0.2)",
              }}
            >
              Social Media <span style={{ color: "#d4f5d4" }}>Marketing</span>
            </h1>
            <p className="text-white/90 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Paid ad campaigns that drive real leads. Choose the duration that
              matches your growth goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="section-padding bg-gray-50/60">
        <div className="container-site">
          <div className="flex justify-center mb-10">
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SMM_PLANS.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                currency={currency}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-10 bg-white border-y border-gray-100">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "43+", label: "Clients Served" },
              { val: "99%", label: "Satisfaction Rate" },
              { val: "250%", label: "Avg ROI Increase" },
              { val: "₹90k+", label: "Ad Spend Managed" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-brand-teal">
                  {s.val}
                </div>
                <div className="text-sm text-gray-500 mt-1 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "#008080",
        }}
      >
        <div className="container-site relative z-10 text-center">
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
              }}
            >
              Not Sure Which Plan to Pick?
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Talk to us — we'll recommend the right package for your business
              and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-white text-brand-teal-deep shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Get Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918796432343"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-white/15 border border-white/30 text-white hover:bg-white/25 transition-all"
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
