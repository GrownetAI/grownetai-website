"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Briefcase, Star } from "lucide-react";
import { PORTFOLIO_ITEMS, TESTIMONIALS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";

const CATEGORIES = [
  "All",
  ...Array.from(new Set(PORTFOLIO_ITEMS.map((p) => p.category))),
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = PORTFOLIO_ITEMS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory,
  );

  return (
    <main className="pt-[var(--navbar-height)]">
      {/* Hero */}
      <section className="relative bg-gradient-hero py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <span className="section-label bg-white/20 text-white border-white/30 mb-4">
            Our Work
          </span>
          <h1 className="font-heading font-bold text-white text-5xl md:text-6xl mt-4 mb-6">
            Real Results for{" "}
            <span className="text-brand-green">Real Businesses</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            150+ clients. Hundreds of campaigns. Millions in revenue generated.
            Here are some of our favourite wins.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-white">
        <div className="container-site">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${activeCategory === cat ? "bg-brand-teal text-white shadow-sm" : "bg-white text-brand-slate-gray border border-gray-200 hover:border-brand-teal hover:text-brand-teal"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.07}>
                <div className="card card-hover overflow-hidden h-full flex flex-col">
                  <div className="bg-gradient-to-br from-brand-teal-mist to-brand-mint-cream h-52 flex items-center justify-center">
                    <Briefcase className="w-14 h-14 text-brand-teal/30" />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-teal">{item.category}</span>
                    </div>
                    <h2 className="font-heading font-bold text-brand-charcoal text-xl mb-2">
                      {item.title}
                    </h2>
                    <p className="text-brand-slate-gray text-sm leading-relaxed mb-5">
                      {item.description}
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {item.results.map((r) => (
                        <div
                          key={r.metric}
                          className="bg-brand-teal-mist rounded-xl p-3 text-center"
                        >
                          <div className="font-heading font-bold text-brand-teal text-lg">
                            {r.value}
                          </div>
                          <div className="text-xs text-brand-slate-gray mt-0.5">
                            {r.metric}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-gray-100 text-brand-slate-gray rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">Client Stories</span>
            <h2 className="heading-section mt-2">
              Straight From Our <span className="text-gradient">Clients</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.07}>
                <div className="card card-hover p-6 flex flex-col gap-4 h-full">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-brand-slate-gray text-sm leading-relaxed flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge-teal text-xs">{t.service}</span>
                    <span className="badge-green text-xs">{t.result}</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-white font-bold text-sm font-heading">
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-charcoal text-sm font-heading">
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

      {/* CTA */}
      <section className="section-padding bg-gradient-brand text-white text-center">
        <div className="container-site max-w-2xl mx-auto">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-white/70" />
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Ready to be our next success story?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let&apos;s build a campaign that gets you results like these.
          </p>
          <Link
            href="/contact"
            className="btn btn-lg bg-white text-brand-teal font-bold hover:bg-white/90 inline-flex items-center gap-2"
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
