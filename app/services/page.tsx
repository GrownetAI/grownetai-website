import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Target,
  Share2,
  Video,
  Code2,
  Palette,
  Mail,
  Instagram,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  SERVICES,
  PRICING_PLANS,
  PROCESS_STEPS,
  SITE_CONFIG,
} from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "AI-powered SEO, Google Ads, Instagram Ads, social media management, reels production, website development, graphic design and email marketing.",
  alternates: { canonical: "https://grownetai.com/services" },
};

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-7 h-7" />,
  Target: <Target className="w-7 h-7" />,
  Share2: <Share2 className="w-7 h-7" />,
  Video: <Video className="w-7 h-7" />,
  Code2: <Code2 className="w-7 h-7" />,
  Palette: <Palette className="w-7 h-7" />,
  Mail: <Mail className="w-7 h-7" />,
  Instagram: <Instagram className="w-7 h-7" />,
};

const processEmoji: Record<string, string> = {
  Lightbulb: "💡",
  Settings: "⚙️",
  Zap: "⚡",
  TrendingUp: "📈",
};

export default function ServicesPage() {
  const waHref = whatsappUrl(
    SITE_CONFIG.whatsapp,
    "Hi GrownetAI, I need help choosing a service.",
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
            What We Offer
          </span>
          <h1 className="font-heading font-bold text-white text-5xl md:text-6xl leading-tight mt-4 mb-6">
            AI-Powered{" "}
            <span className="text-brand-green">Marketing Services</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Every digital channel covered — all powered by AI and managed by
            certified experts.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container-site space-y-8">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.04}>
              <div id={service.id} className="card p-8 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-brand-teal"
                      style={{ background: `${service.color}18` }}
                    >
                      {iconMap[service.icon]}
                    </div>
                    <h2 className="font-heading font-bold text-brand-charcoal text-2xl mb-3">
                      {service.title}
                    </h2>
                    <p className="text-brand-slate-gray leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <Link
                        href="/contact"
                        className="btn btn-primary inline-flex items-center gap-2"
                      >
                        Get Started <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        Ask a Question
                      </a>
                    </div>
                  </div>
                  <div
                    className={`rounded-2xl p-6 bg-gradient-to-br ${service.gradient}`}
                  >
                    <h3 className="font-heading font-semibold text-brand-charcoal mb-4">
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-brand-slate-gray text-sm"
                        >
                          <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">How We Work</span>
            <h2 className="heading-section mt-2">
              Our Proven <span className="text-gradient">4-Step Process</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="card p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold font-heading text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="text-2xl mb-3">{processEmoji[step.icon]}</div>
                  <h3 className="font-heading font-bold text-brand-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-slate-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      {/* <section className="section-padding bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">Simple Pricing</span>
            <h2 className="heading-section mt-2">Plans That <span className="text-gradient">Scale With You</span></h2>
            <p className="text-brand-slate-gray text-lg mt-4">Month-to-month. No lock-in. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan, i) => (
              <FadeIn key={plan.id} delay={i * 0.1}>
                <div className={`card p-7 flex flex-col ${plan.popular ? "ring-2 ring-brand-teal shadow-brand" : ""}`}>
                  {plan.badge && <span className="badge-teal self-start mb-3">{plan.badge}</span>}
                  <h3 className="font-heading font-bold text-brand-charcoal text-xl mb-1">{plan.name}</h3>
                  <p className="text-brand-slate-gray text-sm mb-4">{plan.description}</p>
                  <div className="font-heading font-bold text-3xl text-brand-teal mb-6">
                    {plan.currency}{(plan.price / 1000).toFixed(0)}K
                    <span className="text-sm font-sans font-normal text-brand-slate-gray">/mo</span>
                  </div>
                  <Link href="/pricing" className={`btn mt-auto ${plan.popular ? "btn-primary" : "btn-secondary"}`}>
                    View Full Plan
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="btn btn-ghost inline-flex items-center gap-2">
              See Full Pricing Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="section-padding bg-gradient-brand text-white text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book a free 30-minute strategy call and we&apos;ll tell you exactly
            what will move the needle for your business.
          </p>
          <Link
            href="/contact"
            className="btn btn-lg bg-white text-brand-teal font-bold hover:bg-white/90"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
