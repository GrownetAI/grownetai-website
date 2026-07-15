"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
  Cpu,
  Users,
  Rocket,
  BookOpen,
  Wallet,
  HeartHandshake,
  Layers,
  TrendingUp,
  Search,
} from "lucide-react";
import { usePublishedJobs, useCareerContent } from "@/lib/careers/store";
import type { CareerContent, Job } from "@/lib/careers/data";

/* ════════════════════════════════════════════════════════════════
   CAREERS — recruitment portal

   Data-driven: everything renders from the careers store (seeded on the server,
   editable from /admin/careers). Culture + benefits are bento; the hiring
   process is a visual flow; each role links to its own detail + apply page.
════════════════════════════════════════════════════════════════ */

const CULTURE_ICONS = [Cpu, GraduationCap, Sparkles, Users];
const BENEFIT_ICONS = [Rocket, TrendingUp, BookOpen, HeartHandshake, Layers, Wallet];

const reveal = (reduce: boolean, delay = 0) => ({
  initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: reduce ? 0 : 0.5, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function CareersPage() {
  const reduce = !!useReducedMotion();
  const content = useCareerContent();
  const jobs = usePublishedJobs();

  return (
    <main className="bg-paper pt-[var(--navbar-height)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20">
        <div aria-hidden className="absolute inset-0 dot-grid opacity-40" />
        <div aria-hidden className="hero-glow left-1/2 -top-24 h-[360px] w-[680px] max-w-[130vw] -translate-x-1/2 bg-moss-400/10" />
        <div className="container-site relative z-10 mx-auto max-w-3xl text-center">
          <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="eyebrow">{content.hero.eyebrow}</span>
            <h1 className="heading-display mt-4">{content.hero.title}</h1>
            <p className="text-body-lg mx-auto mt-5 max-w-xl">{content.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#openings" className="btn btn-primary">
                {content.hero.ctaLabel} <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/about" className="btn btn-secondary">
                About us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Culture (bento) ── */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          <motion.div {...reveal(reduce)} className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Life here</span>
            <h2 className="heading-section mt-3">A culture built for great work.</h2>
            <p className="text-body mt-3">{content.intro}</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.culture.map((c, i) => {
              const Icon = CULTURE_ICONS[i % CULTURE_ICONS.length];
              return (
                <motion.div key={c.title} {...reveal(reduce, Math.min(i * 0.06, 0.24))} className={`rounded-3xl border p-6 shadow-card ${i === 0 ? "border-moss-200 bg-moss-50" : "border-hairline bg-paper-raised"}`}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-moss-100 text-moss-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Hiring process (visual flow) ── */}
      <HiringProcess process={content.hiringProcess} reduce={reduce} />

      {/* ── Benefits (bento) ── */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          <motion.div {...reveal(reduce)} className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Why join us</span>
            <h2 className="heading-section mt-3">Benefits that actually matter.</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.benefits.map((bft, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              const flagship = i === 0;
              return (
                <motion.div key={bft.title} {...reveal(reduce, Math.min(i * 0.05, 0.25))} className={`group rounded-3xl border p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-brand ${flagship ? "border-moss-200 bg-moss-50 hover:border-moss-300" : "border-hairline bg-paper-raised hover:border-moss-300"}`}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-moss-100 text-moss-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink">{bft.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{bft.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Open roles ── */}
      <section id="openings" className="section-padding-sm scroll-mt-24 bg-paper">
        <div className="container-site">
          <motion.div {...reveal(reduce)} className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Open positions</span>
            <h2 className="heading-section mt-3">Roles we&rsquo;re hiring for.</h2>
          </motion.div>

          {jobs.length ? (
            <div className="mx-auto grid max-w-4xl gap-4">
              {jobs.map((job, i) => (
                <motion.div key={job.id} {...reveal(reduce, Math.min(i * 0.06, 0.24))}>
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mx-auto grid max-w-md place-items-center gap-3 rounded-3xl border border-dashed border-hairline-strong bg-paper-raised px-6 py-14 text-center">
              <Search className="h-7 w-7 text-ink-faint" />
              <p className="text-ink-muted">No open roles right now — but we&rsquo;re always meeting great people.</p>
              <Link href="/contact" className="btn btn-secondary btn-sm">
                Introduce yourself <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-sand">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[28px] bg-forest px-6 py-16 text-center sm:px-12">
            <div aria-hidden className="absolute inset-0 dot-grid dot-grid-invert opacity-50" />
            <div aria-hidden className="hero-glow bottom-[-7rem] left-1/2 h-[320px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-moss-400/15" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="display-lg text-paper">{content.cta.title}</h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-paper/80">{content.cta.subtitle}</p>
              <Link href="/contact" className="btn btn-accent btn-lg mt-8">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Job card ───────────────────────────────────────────────────── */
function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex flex-col gap-4 rounded-3xl border border-hairline bg-paper-raised p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-moss-300 hover:shadow-brand sm:flex-row sm:items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-400/50"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-moss-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-moss-700">
            {job.department}
          </span>
        </div>
        <h3 className="mt-2.5 font-heading text-lg font-bold text-ink transition-colors group-hover:text-moss-600">
          {job.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{job.summary}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-ink-body">
          <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-moss-600" /> {job.type}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-moss-600" /> {job.location}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-moss-600" /> {job.experienceLevel}</span>
        </div>
      </div>
      <span className="btn btn-primary btn-sm flex-shrink-0 self-start sm:self-center">
        View role <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

/* ── Hiring process flow ────────────────────────────────────────── */
function HiringProcess({
  process,
  reduce,
}: {
  process: CareerContent["hiringProcess"];
  reduce: boolean;
}) {
  return (
    <section className="section-padding-sm bg-paper">
      <div className="container-site">
        <motion.div {...reveal(reduce)} className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">How hiring works</span>
          <h2 className="heading-section mt-3">A clear, respectful process.</h2>
        </motion.div>

        <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <motion.li
              key={p.step}
              {...reveal(reduce, Math.min(i * 0.06, 0.3))}
              className="relative rounded-2xl border border-hairline bg-paper-raised p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-ink font-mono text-xs font-bold text-paper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-base font-semibold text-ink">{p.step}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
