"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Star,
  ArrowUpRight,
  ChevronRight,
  X,
} from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";

/* ── Portfolio data ─────────────────────────────────────── */
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "FreshBite Restaurant",
    category: "Food & Hospitality",
    tag: "Performance Marketing",
    accent: "#F97316",
    accentLight: "#FFF7ED",
    emoji: "🍽️",
    description:
      "Full-funnel digital strategy for a Mumbai farm-to-table restaurant — from brand identity to Instagram Reels to Google Ads, driving consistent table bookings.",
    results: [
      { metric: "Orders", value: "340%", label: "increase in online orders" },
      { metric: "Reach", value: "2.1L", label: "monthly social reach" },
      { metric: "Rating", value: "4.8★", label: "Google Maps rating" },
    ],
    tags: ["Instagram Ads", "Google Ads", "Reels", "SEO"],
    previewImg:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    duration: "8 months",
    industry: "F&B",
  },
  {
    id: 2,
    title: "GlowSkin Derma Clinic",
    category: "Healthcare & Wellness",
    tag: "Lead Generation",
    accent: "#DB2777",
    accentLight: "#FDF2F8",
    emoji: "✨",
    description:
      "High-intent lead generation for a premium dermatology clinic in Bangalore. Meta Ads, Google Search, and a landing page CRO overhaul drove a 6× return on ad spend.",
    results: [
      { metric: "ROAS", value: "6.4×", label: "return on ad spend" },
      { metric: "Bookings", value: "800+", label: "appointments booked" },
      { metric: "Revenue", value: "₹42L", label: "revenue attributed" },
    ],
    tags: ["Meta Ads", "Google Search", "CRO", "Landing Page"],
    previewImg:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    duration: "6 months",
    industry: "Healthcare",
  },
  {
    id: 3,
    title: "BuildNest Real Estate",
    category: "Real Estate",
    tag: "SEO & Paid Media",
    accent: "#0F766E",
    accentLight: "#E6FBFB",
    emoji: "🏠",
    description:
      "End-to-end digital presence for a Pune-based premium developer — website rebuild, SEO, and Google Ads targeting high-intent property buyers across Maharashtra.",
    results: [
      { metric: "Revenue", value: "₹2.4Cr", label: "in attributed sales" },
      { metric: "Traffic", value: "+284%", label: "organic traffic growth" },
      { metric: "Inquiries", value: "120+", label: "qualified leads/month" },
    ],
    tags: ["Technical SEO", "Google Ads", "Web Dev", "Content"],
    previewImg:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    duration: "12 months",
    industry: "Real Estate",
  },
  {
    id: 4,
    title: "FitLife Gym Chain",
    category: "Health & Fitness",
    tag: "Local SEO & Ads",
    accent: "#DC2626",
    accentLight: "#FEF2F2",
    emoji: "💪",
    description:
      "Local SEO domination and paid acquisition for a 3-location gym chain in Hyderabad. Ranked #1 for all key local terms within 5 months.",
    results: [
      { metric: "Members", value: "900+", label: "new memberships sold" },
      { metric: "SEO Rank", value: "#1", label: "for all local keywords" },
      { metric: "MRR", value: "₹9L", label: "monthly recurring revenue" },
    ],
    tags: ["Local SEO", "Google My Business", "Meta Ads", "Creatives"],
    previewImg:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    duration: "5 months",
    industry: "Fitness",
  },
  {
    id: 5,
    title: "LawPoint Advocates",
    category: "Professional Services",
    tag: "Brand & Lead Gen",
    accent: "#006666",
    accentLight: "#F5F3FF",
    emoji: "⚖️",
    description:
      "Brand positioning and lead generation for a Delhi-based civil & corporate law firm. Thought-leadership content strategy combined with targeted Google Ads.",
    results: [
      { metric: "Clients", value: "3×", label: "client acquisition growth" },
      { metric: "Revenue", value: "₹1.8Cr", label: "revenue in 10 months" },
      { metric: "Win Rate", value: "98%", label: "documented case outcomes" },
    ],
    tags: ["Google Ads", "Content Strategy", "Brand Identity", "SEO"],
    previewImg:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    duration: "10 months",
    industry: "Legal",
  },
  {
    id: 6,
    title: "EduReach Academy",
    category: "Education & EdTech",
    tag: "Growth Marketing",
    accent: "#0EA5E9",
    accentLight: "#F0F9FF",
    emoji: "🎓",
    description:
      "Full growth stack for an EdTech platform offering live courses for working professionals — from YouTube Ads to email nurturing sequences and referral loops.",
    results: [
      { metric: "Students", value: "12k+", label: "enrolled in 12 months" },
      { metric: "Rating", value: "4.9★", label: "average course rating" },
      { metric: "GMV", value: "₹3.2Cr", label: "gross merchandise value" },
    ],
    tags: ["YouTube Ads", "Email Marketing", "SEO", "Referral"],
    previewImg:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    duration: "12 months",
    industry: "EdTech",
  },
];

const CATEGORIES = [
  "All",
  "Food & Hospitality",
  "Healthcare & Wellness",
  "Real Estate",
  "Health & Fitness",
  "Professional Services",
  "Education & EdTech",
];

/* ── Case study modal ───────────────────────────────────── */
function CaseStudyModal({
  item,
  onClose,
}: {
  item: (typeof PORTFOLIO_ITEMS)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(12px)" }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white"
        style={{
          boxShadow: `0 40px 100px ${item.accent}30, 0 8px 40px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Hero image */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <img
            src={item.previewImg}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%)",
            }}
          />
          {/* Close btn */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm
                       flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {/* Identity */}
          <div className="absolute bottom-5 left-6 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: item.accent }}
            >
              {item.emoji}
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">
                {item.title}
              </p>
              <p className="text-white/60 text-xs">{item.category}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-7">
          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                background: `${item.accent}15`,
                color: item.accent,
                border: `1px solid ${item.accent}30`,
              }}
            >
              {item.tag}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-brand-slate-gray">
              {item.duration} engagement
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-brand-slate-gray">
              {item.industry}
            </span>
          </div>

          {/* Description */}
          <p className="text-brand-slate-gray leading-relaxed mb-7 text-[15px]">
            {item.description}
          </p>

          {/* Services used */}
          <h4 className="font-heading font-bold text-brand-charcoal text-sm uppercase tracking-wider mb-3">
            Services delivered
          </h4>
          <div className="flex flex-wrap gap-2 mb-7">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border font-medium text-brand-slate-gray"
                style={{ borderColor: "rgba(0,0,0,0.1)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="btn btn-primary flex-1 justify-center"
            >
              Get similar results <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={onClose} className="btn btn-secondary px-5">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<
    (typeof PORTFOLIO_ITEMS)[0] | null
  >(null);

  const filtered = PORTFOLIO_ITEMS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory,
  );

  return (
    <main className="pt-[var(--navbar-height)]">
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div
          className="aurora-orb aurora-orb-green absolute"
          style={{
            width: 440,
            height: 440,
            top: "-100px",
            right: "-60px",
            opacity: 0.3,
          }}
        />

        <div className="container-site relative z-10 py-24 lg:py-28">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase
                         tracking-widest text-white/90 mb-5 rounded-full border border-white/20"
            >
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              Our Work
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black text-white leading-[1.06] mb-5"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Real results for{" "}
              <span
                style={{
                  background: "#00E5E5",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                real businesses
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mb-10"
            >
              150+ clients. Hundreds of campaigns. Millions in revenue
              generated. Every case study below is real — with verifiable
              results.
            </motion.p>

            {/* Aggregate stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-5"
            ></motion.div>
          </div>
        </div>
      </section>

      {/* ── Filter + Grid ──────────────────────────────── */}
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-teal text-white shadow-brand"
                    : "bg-white text-brand-slate-gray border border-gray-200 hover:border-brand-teal hover:text-brand-teal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer"
                >
                  <div className="card card-hover h-full flex flex-col overflow-hidden">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.previewImg}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)",
                        }}
                      />

                      {/* Category badge */}
                      <span
                        className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{
                          background: `${item.accent}dd`,
                          color: "#fff",
                        }}
                      >
                        {item.tag}
                      </span>

                      {/* Duration badge */}
                      <span
                        className="absolute top-4 right-4 text-xs font-semibold px-3 py-1.5
                                       rounded-full bg-black/40 backdrop-blur-sm text-white/90"
                      >
                        {item.duration}
                      </span>

                      {/* Hover CTA overlay */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0
                                   group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0,0,0,0.38)" }}
                      >
                        <span
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm
                                     font-bold text-white shadow-lg"
                          style={{ background: item.accent }}
                        >
                          View Case Study <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>

                      {/* Bottom identity */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                          style={{ background: item.accent }}
                        >
                          {item.emoji}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm leading-tight">
                            {item.title}
                          </p>
                          <p className="text-white/55 text-xs">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-brand-slate-gray text-sm leading-relaxed mb-5 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 bg-gray-100 text-brand-slate-gray
                                       rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs px-2.5 py-1 bg-gray-100 text-brand-slate-gray rounded-full font-medium">
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Read more */}
                      <button
                        className="mt-4 text-brand-teal text-sm font-bold inline-flex items-center
                                   gap-1 group-hover:gap-2 transition-all self-start"
                      >
                        View case study <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <section className="section-padding aurora-bg">
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="aurora-section-label">Client stories</span>
            <h2 className="heading-section mt-4">
              Straight from our <span className="text-gradient">clients</span>
            </h2>
            <p className="text-brand-slate-gray mt-3 max-w-md mx-auto">
              Unedited feedback from founders and marketing leads who've worked
              with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.08}>
                <div className="aurora-card p-6 flex flex-col gap-4 h-full">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-brand-slate-gray text-sm leading-relaxed flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Result badges */}
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge-teal text-xs">{t.service}</span>
                    <span className="badge-green text-xs">{t.result}</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-brand flex items-center
                                 justify-center text-white font-bold text-sm font-heading"
                    >
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-brand-charcoal text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-brand-slate-gray">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process callout ────────────────────────────── */}
      <section className="section-padding-sm bg-white border-t border-black/[0.06]">
        <div className="container-site">
          <div
            className="rounded-3xl p-10 lg:p-14 relative overflow-hidden noise-overlay"
            style={{
              background:
                "#008080",
            }}
          >
            <div className="dot-grid absolute inset-0 opacity-20" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs
                             font-bold uppercase tracking-widest mb-5 text-white/90"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <TrendingUp className="w-3 h-3" />
                  You could be next
                </span>
                <h2
                  className="font-display font-black text-white mb-4"
                  style={{
                    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Ready to be our next success story?
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Free 30-minute strategy call — no commitment, no pitch deck.
                  We'll map out what's possible for your specific business.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                <Link
                  href="/contact"
                  className="btn btn-white btn-lg font-bold inline-flex items-center gap-2 justify-center"
                >
                  Book free consultation <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="btn btn-lg border-2 border-white/40 text-white font-semibold
                             hover:bg-white/10 transition-all inline-flex items-center gap-2 justify-center"
                >
                  Explore our services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case study modal ───────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <CaseStudyModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
