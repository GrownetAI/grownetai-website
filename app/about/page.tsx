import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Eye,
  ShieldCheck,
  Gauge,
  HeartHandshake,
  Users,
  BarChart3,
  Globe,
} from "lucide-react";
import {
  TEAM,
  INDUSTRIES,
  STATS,
  TECH_STACK,
  SITE_CONFIG,
} from "@/lib/constants";
import { COUNTRIES } from "@/lib/pricing-data";
import { getInitials } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";
import {
  ArtDiscovery,
  ArtStrategy,
  ArtDevelopment,
  ArtGrowthLaunch,
  ArtFutureReady,
  ArtBranding,
  ArtPartnership,
  ArtResults,
} from "@/components/illustrations/scenes";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "GrownetAI is an AI-powered digital agency built for measurable outcomes — our story, mission, values, process, and the team behind the work.",
  alternates: { canonical: "https://grownetai.com/about" },
};

/* ── Content (preserves the existing brand narrative) ─────────────── */

const VALUES = [
  { title: "AI-first strategy", desc: "Automation and intelligence woven into every layer — not bolted on." },
  { title: "Radical transparency", desc: "Live dashboards, no-surprises invoicing, plain-English reporting." },
  { title: "Results over vanity", desc: "We track pipeline and revenue, not reach and impressions." },
  { title: "Continuous optimisation", desc: "Weekly iteration and A/B testing — never set-and-forget." },
  { title: "Long-term partnerships", desc: "26-month average tenure. We grow when you grow." },
  { title: "Dedicated managers", desc: "A named point of contact, not a rotating helpdesk queue." },
];

const WHY_US = [
  { icon: Sparkles, title: "AI-native, end to end", desc: "From audience intelligence to automation, AI runs through the whole engagement." },
  { icon: Eye, title: "Everything is measurable", desc: "Live dashboards on every campaign — you always know what's working and why." },
  { icon: Gauge, title: "Built to compound", desc: "Weekly optimisation cycles that turn early wins into durable growth." },
  { icon: HeartHandshake, title: "One senior team", desc: "In-house specialists and a dedicated manager — no juniors learning on your budget." },
];

const PROCESS = [
  { n: 1, title: "Discover", desc: "Understand the business, the market, and the number that matters.", art: ArtDiscovery },
  { n: 2, title: "Strategise", desc: "A complete plan and roadmap before a rupee is spent.", art: ArtStrategy },
  { n: 3, title: "Build", desc: "Design and ship the site, app, or system — on the right stack.", art: ArtDevelopment },
  { n: 4, title: "Grow", desc: "Launch, measure, and scale the channels that convert.", art: ArtGrowthLaunch },
  { n: 5, title: "Automate", desc: "Weave in AI so the growth keeps running without you.", art: ArtFutureReady },
];

const TECH_GROUPS: { label: string; items: { name: string }[] }[] = [
  { label: "Frontend", items: TECH_STACK.frontend },
  { label: "Backend", items: TECH_STACK.backend },
  { label: "Data & Cloud", items: TECH_STACK.database },
  { label: "Platforms", items: TECH_STACK.cms },
];

const CELL =
  "group rounded-3xl border border-hairline bg-paper-raised p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-moss-300 hover:shadow-brand";

export default function AboutPage() {
  return (
    <main className="bg-paper pt-[var(--navbar-height)]">
      {/* ══════════════ HERO (bento) ══════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div aria-hidden className="absolute inset-0 dot-grid opacity-30" />
        <div aria-hidden className="hero-glow left-1/2 -top-24 h-[360px] w-[720px] max-w-[130vw] -translate-x-1/2 bg-moss-400/10" />
        <div className="container-site relative z-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
            <FadeIn direction="up">
              <span className="eyebrow">About GrownetAI</span>
              <h1 className="heading-display mt-4">
                We help businesses{" "}
                <span className="text-gradient">grow faster</span> online.
              </h1>
              <p className="text-body-lg mt-5 max-w-xl">
                An AI-powered digital agency built for measurable outcomes — not
                vanity metrics. Based in Mumbai, serving clients across India and
                globally since {SITE_CONFIG.founded}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Work with us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/portfolio" className="btn btn-secondary">
                  See our work
                </Link>
              </div>
            </FadeIn>

            {/* Stat bento */}
            <FadeIn direction="up" delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-hairline bg-paper-raised p-5 text-center shadow-card">
                    <p className="stat-card-value text-3xl text-ink">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════ OUR STORY (bento) ══════════════ */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site grid gap-4 lg:grid-cols-3">
          <FadeIn direction="up" className="lg:col-span-2">
            <div className="h-full rounded-3xl border border-hairline bg-paper-raised p-8 shadow-card">
              <span className="eyebrow">Our story</span>
              <h2 className="heading-section mt-3">Why we exist.</h2>
              <div className="mt-5 space-y-4 text-ink-body">
                <p>
                  Most digital agencies sell effort — long hours, big decks,
                  weekly calls. We sell outcomes. Every decision is anchored to
                  one question: does this move the revenue needle?
                </p>
                <p>
                  We founded GrownetAI after watching too many businesses burn
                  budgets on agencies that couldn&rsquo;t explain their own
                  results — so we built a process that combines AI-driven
                  audience intelligence, transparent tracking, and senior human
                  expertise.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <figure className="flex h-full flex-col justify-between rounded-3xl bg-forest p-8 text-paper shadow-brand">
              <Sparkles className="h-8 w-8 text-moss-300" />
              <blockquote className="mt-6 font-display text-xl font-medium leading-relaxed">
                &ldquo;The benchmark isn&rsquo;t last month. It&rsquo;s
                what&rsquo;s possible when every decision is data-informed.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-paper/70">
                — The GrownetAI principle
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ MISSION & VISION (bento) ══════════════ */}
      <section className="section-padding-sm bg-paper">
        <div className="container-site grid gap-4 md:grid-cols-2">
          <FadeIn direction="up">
            <div className={CELL + " h-full"}>
              <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-hairline bg-sand">
                <ArtResults className="h-full w-full" />
              </span>
              <span className="eyebrow mt-5 block">Our mission</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                Turn marketing spend into measurable growth.
              </h3>
              <p className="mt-3 text-ink-body">
                To give every business — not just the ones with big budgets —
                access to the intelligence, systems, and craft that actually move
                revenue.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className={CELL + " h-full"}>
              <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-hairline bg-sand">
                <ArtFutureReady className="h-full w-full" />
              </span>
              <span className="eyebrow mt-5 block">Our vision</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                A world where businesses compete on intelligence, not budget.
              </h3>
              <p className="mt-3 text-ink-body">
                We&rsquo;re building the agency for the AI era — where automation
                and data let a small team punch far above its weight.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ CORE VALUES (bento) ══════════════ */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          <FadeIn direction="up" className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">What we stand for</span>
            <h2 className="heading-section mt-3">Core values.</h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} direction="up" delay={Math.min(i * 0.06, 0.3)}>
                <div className={CELL + " h-full"}>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-moss-100 text-moss-700">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {v.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WHY CHOOSE US (bento) ══════════════ */}
      <section className="section-padding-sm bg-paper">
        <div className="container-site grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <FadeIn direction="up">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-hairline bg-moss-50 p-8">
              <div>
                <span className="eyebrow">Why choose us</span>
                <h2 className="heading-section mt-3">
                  The reasons clients stay.
                </h2>
                <p className="mt-4 text-ink-body">
                  Not the biggest agency — the one whose incentives are aligned
                  with your growth.
                </p>
              </div>
              <p className="mt-8 font-display text-4xl font-bold text-moss-600">
                26<span className="text-xl"> months</span>
                <span className="mt-1 block text-sm font-medium text-ink-muted">
                  average client tenure
                </span>
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY_US.map((w, i) => (
              <FadeIn key={w.title} direction="up" delay={Math.min(i * 0.07, 0.28)}>
                <div className={CELL + " h-full"}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-moss-100 text-moss-700">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink">
                    {w.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {w.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ OUR PROCESS (bento) ══════════════ */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          <FadeIn direction="up" className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">How we work</span>
            <h2 className="heading-section mt-3">A process built to compound.</h2>
          </FadeIn>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((p, i) => (
              <FadeIn key={p.n} direction="up" delay={Math.min(i * 0.06, 0.3)}>
                <div className={CELL + " h-full"}>
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl border border-hairline bg-sand">
                      <p.art className="h-full w-full" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-ink-muted">
                      0{p.n}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {p.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TECHNOLOGIES (bento) ══════════════ */}
      <section className="section-padding-sm bg-paper">
        <div className="container-site">
          <FadeIn direction="up" className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Our toolkit</span>
            <h2 className="heading-section mt-3">Technologies we build on.</h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_GROUPS.map((g, i) => (
              <FadeIn key={g.label} direction="up" delay={Math.min(i * 0.07, 0.28)}>
                <div className={CELL + " h-full"}>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-moss-600">
                    {g.label}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <span
                        key={t.name}
                        className="rounded-full border border-hairline bg-sand px-3 py-1.5 text-xs font-medium text-ink-body"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ INDUSTRIES (bento) ══════════════ */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          <FadeIn direction="up" className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Industries we serve</span>
            <h2 className="heading-section mt-3">Expertise across every sector.</h2>
          </FadeIn>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <FadeIn key={ind} direction="up" delay={Math.min(i * 0.04, 0.3)}>
                <div className="flex h-full items-center gap-3 rounded-2xl border border-hairline bg-paper-raised p-4 shadow-card transition-colors hover:border-moss-300">
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-moss-400" />
                  <span className="text-sm font-semibold text-ink">{ind}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TEAM PHILOSOPHY (bento) ══════════════ */}
      <section className="section-padding-sm bg-paper">
        <div className="container-site grid gap-4 lg:grid-cols-[1fr_2fr]">
          <FadeIn direction="up">
            <div className="flex h-full flex-col justify-between rounded-3xl bg-forest p-8 text-paper shadow-brand">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-moss-300">
                  Team philosophy
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  Senior people, aligned incentives.
                </h2>
                <p className="mt-4 text-paper/75">
                  Full-time specialists, one dedicated manager per client, and a
                  network of vetted creatives across India. We grow when you grow.
                </p>
              </div>
              <HeartHandshake className="mt-8 h-8 w-8 text-moss-300" />
            </div>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {TEAM.map((m, i) => (
              <FadeIn key={m.name} direction="up" delay={Math.min(i * 0.07, 0.28)}>
                <div className={CELL + " flex h-full items-center gap-4"}>
                  <span className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-moss-600 font-heading text-lg font-bold text-white">
                    {getInitials(m.name)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-base font-bold text-ink">
                      {m.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wide text-moss-600">
                      {m.role}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">
                      {m.bio}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ GLOBAL VISION (bento) ══════════════ */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site grid items-center gap-4 lg:grid-cols-2">
          <FadeIn direction="up">
            <span className="eyebrow">Global vision</span>
            <h2 className="heading-section mt-3">
              Rooted in India, built for the world.
            </h2>
            <p className="text-body mt-4 max-w-lg">
              From Mumbai we serve businesses across eight markets — with local
              pricing, local context, and a standard of work that travels.
            </p>
            <div className="mt-6 flex items-center gap-3 text-ink-body">
              <Globe className="h-5 w-5 text-moss-600" />
              <span className="text-sm font-semibold">8 markets served</span>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {COUNTRIES.map((c) => (
                <div
                  key={c.code}
                  className="flex items-center gap-2.5 rounded-2xl border border-hairline bg-paper-raised p-4 shadow-card"
                >
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{c.code}</p>
                    <p className="truncate text-[11px] text-ink-muted">{c.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="section-padding bg-paper">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-16 text-center sm:px-12">
            <div aria-hidden className="absolute inset-0 dot-grid dot-grid-invert opacity-50" />
            <div aria-hidden className="hero-glow bottom-[-7rem] left-1/2 h-[320px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-moss-400/15" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="display-lg text-paper">Let&rsquo;s build your growth engine.</h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-paper/80">
                Tell us where you want to be. We&rsquo;ll show you the path — and
                the price — to get there.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-accent btn-lg">
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/pricing" className="btn btn-on-dark btn-lg">
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
