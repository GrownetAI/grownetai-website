import type { Metadata } from "next";
import Link from "next/link";
import { Linkedin, Twitter, CheckCircle2, ArrowRight } from "lucide-react";
import { TEAM, INDUSTRIES, STATS, SITE_CONFIG } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about GrownetAI — our mission, team, and the AI-powered approach that helps businesses grow online.",
  alternates: { canonical: "https://grownetai.com/about" },
};

const statEmoji: Record<string, string> = {
  Users: "👥", Star: "⭐", TrendingUp: "📈", DollarSign: "💰",
};

const VALUES = [
  "AI-first strategy at every step",
  "Radical transparency in reporting",
  "Results over vanity metrics",
  "Continuous optimisation, not set-and-forget",
  "Long-term partnerships, not one-time projects",
  "Dedicated account managers for every client",
];

export default function AboutPage() {
  return (
    <main className="pt-[var(--navbar-height)]">

      {/* Hero */}
      <section className="relative bg-gradient-hero py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="container-site relative z-10 text-center">
          <span className="section-label bg-white/20 text-white border-white/30 mb-4">About GrownetAI</span>
          <h1 className="font-heading font-bold text-white text-5xl md:text-6xl leading-tight mt-4 mb-6">
            We Help Businesses <span className="text-brand-green">Grow Online</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Founded in {SITE_CONFIG.founded}, GrownetAI is an AI-powered digital marketing agency based in {SITE_CONFIG.address}, serving clients globally.
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Our Mission", body: "To empower every business — from local startups to global enterprises — with AI-powered digital marketing that delivers measurable, compounding growth." },
              { title: "Our Vision", body: "To become India's most trusted AI-first digital marketing partner, known for transparency, innovation, and results that speak louder than promises." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="card card-brand p-8 h-full">
                  <h2 className="font-heading font-bold text-brand-charcoal text-2xl mb-4">{item.title}</h2>
                  <p className="text-brand-slate-gray leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">By the Numbers</span>
            <h2 className="heading-section mt-2">Our <span className="text-gradient">Impact</span></h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="card p-6 text-center">
                  <div className="text-3xl mb-3">{statEmoji[stat.icon]}</div>
                  <div className="font-heading font-bold text-4xl text-brand-teal">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-brand-slate-gray text-sm mt-2">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <span className="section-label">How We Operate</span>
                <h2 className="heading-section mt-2 mb-6">Our <span className="text-gradient">Core Values</span></h2>
                <ul className="space-y-3">
                  {VALUES.map((v) => (
                    <li key={v} className="flex items-start gap-3 text-brand-slate-gray">
                      <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="bg-gradient-brand rounded-3xl p-10 text-white text-center">
                <p className="font-heading font-bold text-5xl mb-3">Since {SITE_CONFIG.founded}</p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Helping businesses across India and the world unlock their true digital growth potential.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">The People Behind It</span>
            <h2 className="heading-section mt-2">Meet Our <span className="text-gradient">Team</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08}>
                <div className="card card-hover p-6 text-center flex flex-col items-center gap-3 h-full">
                  <div className="w-20 h-20 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-2xl font-heading">
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-brand-charcoal text-lg">{member.name}</h3>
                    <p className="text-brand-teal text-sm font-semibold">{member.role}</p>
                  </div>
                  <p className="text-brand-slate-gray text-sm leading-relaxed flex-1">{member.bio}</p>
                  <div className="flex gap-3">
                    <a href={member.linkedin} className="text-brand-slate-gray hover:text-brand-teal transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                    <a href={member.twitter} className="text-brand-slate-gray hover:text-brand-teal transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-brand-mint-cream text-center">
        <div className="container-site">
          <span className="section-label">Industries We Serve</span>
          <h2 className="heading-section mt-2 mb-10">Across Every <span className="text-gradient">Sector</span></h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="badge-teal px-4 py-2 text-sm">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-brand text-white text-center">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">Ready to Work With Us?</h2>
          <p className="text-white/80 text-lg mb-8">Join 150+ businesses growing with GrownetAI.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-lg bg-white text-brand-teal font-bold hover:bg-white/90 inline-flex items-center gap-2">
              Get Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/portfolio" className="btn btn-lg border-2 border-white/60 text-white hover:bg-white hover:text-brand-teal transition-all">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
