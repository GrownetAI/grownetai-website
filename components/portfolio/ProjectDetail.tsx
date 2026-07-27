"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Globe,
  Quote,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import BrowserFrame from "@/components/sections/CaseStudyShowcase/BrowserFrame";
import ProjectGallery from "./ProjectGallery";
import type { CaseStudy } from "@/lib/constants";
import type { CaseStudyDetail } from "@/lib/case-study-details";

/* ════════════════════════════════════════════════════════════════
   PROJECT DETAIL — the case-study page body

   Hero → impact → gallery (with lightbox) → brief & challenges → solution &
   features → journey timeline → tech → CTA. Surfaces alternate paper/sand so
   the long page keeps rhythm. Every reveal is Y-only and reduced-motion gated.
════════════════════════════════════════════════════════════════ */

/* Top margin is huge on purpose: after an anchor jump (e.g. #gallery), the
   sections ABOVE the viewport never intersected, so with a tight margin they
   stayed invisible until scrolled back up to. Extending the observation root
   far upward marks them revealed immediately; the bottom extension starts the
   reveal ~200px before a section scrolls in, so content never appears late. */
const reveal = (reduce: boolean, delay = 0) => ({
  initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "4000px 0px 200px 0px" },
  transition: { duration: reduce ? 0 : 0.5, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ProjectDetail({
  study,
  detail,
}: {
  study: CaseStudy;
  detail: CaseStudyDetail;
}) {
  const reduce = !!useReducedMotion();
  const impact = [...study.results, ...detail.extraImpact];

  return (
    <main className="bg-paper pt-[var(--navbar-height)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div
          aria-hidden
          className="hero-glow left-1/2 -top-24 h-[320px] w-[680px] max-w-[130vw] -translate-x-1/2 bg-moss-400/[0.08]"
        />
        <div className="container-site relative z-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            {/* Text */}
            <motion.div {...reveal(reduce)}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-moss-600">
                {study.industry} · {study.duration}
              </p>
              <h1 className="heading-display mt-3 text-balance">{study.title}</h1>
              <p className="mt-3 text-lg font-semibold text-ink-body">
                {study.client} — {detail.clientType}
              </p>
              <p className="text-body mt-5 max-w-xl">{detail.overview}</p>

              {/* meta chips */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink-body">
                  <Globe className="h-3.5 w-3.5 text-moss-600" /> {detail.liveDomain}
                </span>
                {study.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink-body"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Start a project like this <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#gallery" className="btn btn-secondary">
                  See the screens
                </Link>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div {...reveal(reduce, 0.1)}>
              <BrowserFrame
                src={study.image}
                alt={study.client}
                url={`${detail.liveDomain}`}
                priority
                className="shadow-brand-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Impact strip ── */}
      <section className="border-y border-hairline bg-sand py-10">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {impact.map((r, i) => (
              <motion.div
                key={r.metric}
                {...reveal(reduce, Math.min(i * 0.05, 0.25))}
                className="rounded-2xl border border-hairline bg-paper-raised p-4 text-center"
              >
                <p className="stat-card-value text-3xl text-ink">{r.value}</p>
                <p className="mt-1 text-xs text-ink-muted">{r.metric}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="section-padding-sm scroll-mt-24 bg-paper">
        <div className="container-site">
          <motion.div {...reveal(reduce)} className="mb-8 max-w-2xl">
            <span className="eyebrow">A look inside</span>
            <h2 className="heading-section mt-3">The work, screen by screen.</h2>
            <p className="text-body mt-3">
              Tap any screen to open the gallery — arrow keys, zoom and all.
            </p>
          </motion.div>
          <motion.div {...reveal(reduce, 0.05)}>
            <ProjectGallery study={study} gallery={detail.gallery} />
          </motion.div>
        </div>
      </section>

      {/* ── The brief: requirements + challenges ── */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div {...reveal(reduce)}>
            <span className="eyebrow">The brief</span>
            <h2 className="heading-section mt-3">What they needed.</h2>
            <ul className="mt-6 space-y-3">
              {detail.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-ink-body">
                  <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-moss-100">
                    <Check className="h-3 w-3 text-moss-700" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>

          <div>
            <motion.h3
              {...reveal(reduce)}
              className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ink-muted"
            >
              <Target className="h-4 w-4 text-moss-600" /> The challenges
            </motion.h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {detail.challenges.map((c, i) => (
                <motion.div
                  key={c.title}
                  {...reveal(reduce, Math.min(i * 0.06, 0.24))}
                  className="rounded-2xl border border-hairline bg-paper-raised p-5 shadow-card"
                >
                  <h4 className="font-heading text-base font-semibold text-ink">
                    {c.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {c.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our solution + key features ── */}
      <section className="section-padding-sm bg-paper">
        <div className="container-site">
          <motion.div {...reveal(reduce)} className="max-w-3xl">
            <span className="eyebrow">Our solution</span>
            {/* The solution is a full paragraph — display type is for short
                headlines, so it gets a headline of its own and body text. */}
            <h2 className="heading-section mt-3">What we built.</h2>
            <p className="text-body-lg mt-4 leading-relaxed">
              {study.solution}
            </p>
          </motion.div>

          <motion.div {...reveal(reduce, 0.05)} className="mt-6 flex flex-wrap gap-2">
            {detail.solutionPoints.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-sand px-3.5 py-1.5 text-sm font-medium text-ink-body"
              >
                <Sparkles className="h-3.5 w-3.5 text-moss-500" /> {p}
              </span>
            ))}
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detail.keyFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                {...reveal(reduce, Math.min(i * 0.05, 0.25))}
                className="group rounded-2xl border border-hairline bg-paper-raised p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-moss-300 hover:shadow-brand"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-moss-100 text-moss-700">
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {f.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact + outcome quote ── */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <motion.div {...reveal(reduce)}>
            <span className="eyebrow">The impact</span>
            <h2 className="heading-section mt-3">Business impact.</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {impact.slice(0, 4).map((r) => (
                <div
                  key={r.metric}
                  className="rounded-2xl border border-hairline bg-paper-raised p-5"
                >
                  <p className="stat-card-value text-3xl text-moss-600">{r.value}</p>
                  <p className="mt-1 text-sm text-ink-muted">{r.metric}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.figure
            {...reveal(reduce, 0.1)}
            className="relative rounded-3xl border border-hairline bg-paper-raised p-8 shadow-card"
          >
            <Quote className="h-8 w-8 text-moss-300" />
            <blockquote className="mt-4 font-display text-xl font-medium leading-relaxed text-ink">
              {study.outcome}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
              <TrendingUp className="h-4 w-4 text-moss-600" />
              {study.client}
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ── Journey timeline ── */}
      <section className="section-padding-sm bg-paper">
        <div className="container-site">
          <motion.div {...reveal(reduce)} className="mb-10 max-w-2xl">
            <span className="eyebrow">How it came together</span>
            <h2 className="heading-section mt-3">The project journey.</h2>
          </motion.div>

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {detail.timeline.map((t, i) => (
              <motion.li
                key={t.phase}
                {...reveal(reduce, Math.min(i * 0.06, 0.3))}
                className="relative rounded-2xl border border-hairline bg-paper-raised p-6 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-ink font-mono text-xs font-bold text-paper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-ink">
                    {t.phase}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {t.detail}
                </p>
                {/* Vertical connector only where cards truly stack (1-col mobile). */}
                {i < detail.timeline.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -bottom-6 left-1/2 block h-6 w-px -translate-x-1/2 bg-hairline sm:hidden"
                  />
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Tech ── */}
      <section className="border-t border-hairline bg-sand py-12">
        <div className="container-site text-center">
          <motion.div {...reveal(reduce)}>
            <span className="eyebrow">Built with</span>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {study.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-paper-raised px-4 py-2.5 text-sm font-semibold text-ink"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-moss-400" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-paper">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-16 text-center sm:px-12">
            <div aria-hidden className="absolute inset-0 dot-grid dot-grid-invert opacity-50" />
            <div
              aria-hidden
              className="hero-glow bottom-[-7rem] left-1/2 h-[320px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-moss-400/15"
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="display-lg text-paper">
                Like what you see? Let&rsquo;s build something like it.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-paper/80">
                Book a consultation and we&rsquo;ll map the fastest path from where
                you are to a result worth writing up.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-accent btn-lg">
                  Book a consultation <ArrowRight className="h-4 w-4" />
                </Link>
                {/* <Link href="/pricing" className="btn btn-on-dark btn-lg">
                  Get a quote
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
