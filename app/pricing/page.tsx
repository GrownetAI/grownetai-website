import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PartyPopper } from "lucide-react";
import { RESEARCH_META } from "@/lib/pricing-data";
import { PROMO } from "@/lib/promo";
import PricingExplorer from "@/components/pricing/PricingExplorer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "All-in-one growth packages — website build plus ongoing SEO, social and ads management, from one team. Priced below market, shown in your currency.",
  alternates: { canonical: "https://grownetai.com/pricing" },
};

export default function PricingPage() {
  return (
    <main className="bg-paper pt-[var(--navbar-height)]">
      {/* ── Offer banner ──────────────────────────────────────────────────
          Replaces the old display headline. The h1 is kept, just sized down
          to a supporting line — a pricing page with no h1 reads as untitled
          to search engines and to screen-reader landmark navigation. */}
      <section className="bg-paper pb-10 pt-10 md:pb-12 md:pt-12">
        <div className="container-site">
          {PROMO ? (
            <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-10 sm:px-10">
              <div
                aria-hidden
                className="absolute inset-0 dot-grid dot-grid-invert opacity-40"
              />
              <div
                aria-hidden
                className="hero-glow -top-24 left-1/2 h-[280px] w-[560px] max-w-[130vw] -translate-x-1/2 bg-moss-400/20"
              />
              <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-moss-300">
                    <PartyPopper className="h-3.5 w-3.5" aria-hidden />
                    {PROMO.occasion} · {PROMO.window}
                  </span>
                  <h1 className="display-lg mt-4 text-paper">
                    {PROMO.headline}
                  </h1>
                  <p className="mt-3 max-w-xl text-paper/80">{PROMO.detail}</p>
                </div>

                {PROMO.code && (
                  <div className="flex-shrink-0 rounded-2xl border border-dashed border-paper/30 bg-paper/5 px-6 py-4 text-center">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-paper/60">
                      Coupon code
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold text-paper">
                      {PROMO.code}
                    </p>
                    <Link
                      href="/contact"
                      className="btn btn-accent mt-3 w-full whitespace-nowrap"
                    >
                      Claim offer <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <h1 className="display-lg text-center">
              One package. Everything you need to grow.
            </h1>
          )}
        </div>
      </section>

      {/* Intentionally NOT wrapped in FadeIn. On a phone this explorer is a
          single-column stack thousands of pixels tall, and wrapping the whole
          thing in one scroll-triggered reveal is fragile no matter how the
          observer is tuned — it once left every package at opacity 0. The
          cards carry their own entrance animation instead. */}
      <PricingExplorer />

      {/* ── Methodology ── */}
      <section className="section-padding-sm bg-paper">
        <div className="container-site">
          <p className="mx-auto max-w-2xl text-center text-caption">
            Package prices are composed from the floor of each service range and
            discounted for booking together, so they sit below the same scope
            bought separately and below researched market entry rates.{" "}
            {RESEARCH_META.note} Last reviewed {RESEARCH_META.last_updated}.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-paper">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-16 text-center sm:px-12">
            <div
              aria-hidden
              className="absolute inset-0 dot-grid dot-grid-invert opacity-50"
            />
            <div
              aria-hidden
              className="hero-glow bottom-[-7rem] left-1/2 h-[320px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-moss-400/15"
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="display-lg text-paper">
                Want a number for your actual scope?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-paper/80">
                Tell us what you&rsquo;re building and we&rsquo;ll come back
                with a fixed quote — usually within two working days.
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
