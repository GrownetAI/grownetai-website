"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Wallet,
  Check,
  Sparkles,
  Star,
  Gift,
  Upload,
  Loader2,
  CheckCircle2,
  Send,
  SearchX,
} from "lucide-react";
import { useJobs, submitApplication } from "@/lib/careers/store";
import type { Job } from "@/lib/careers/data";
import { cn } from "@/lib/utils";

const applySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  experience: z.string().min(1, "Tell us your experience"),
  portfolio: z.string().optional(),
  coverLetter: z.string().optional(),
});
type ApplyData = z.infer<typeof applySchema>;

const LIST = "grid gap-2 sm:grid-cols-2";

export default function JobDetail({
  slug,
  seedJob,
}: {
  slug: string;
  seedJob?: Job;
}) {
  const reduce = !!useReducedMotion();
  const jobs = useJobs();
  const job = jobs.find((j) => j.slug === slug) ?? seedJob;
  const [resumeName, setResumeName] = useState<string>("");
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplyData>({ resolver: zodResolver(applySchema) });

  if (!job) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-paper pt-[var(--navbar-height)]">
        <div className="grid place-items-center gap-3 text-center">
          <SearchX className="h-8 w-8 text-ink-faint" />
          <h1 className="heading-section">Role not found</h1>
          <p className="text-ink-muted">This opening may have closed.</p>
          <Link href="/careers" className="btn btn-primary btn-sm mt-2">
            View open roles
          </Link>
        </div>
      </main>
    );
  }

  const onSubmit = async (data: ApplyData) => {
    await new Promise((r) => setTimeout(r, 700)); // simulated network
    submitApplication({
      jobId: job.id,
      jobTitle: job.title,
      name: data.name,
      email: data.email,
      phone: data.phone,
      experience: data.experience,
      portfolio: data.portfolio || undefined,
      resumeName: resumeName || undefined,
      coverLetter: data.coverLetter || undefined,
    });
    setDone(true);
    reset();
    setResumeName("");
    toast.success("Application submitted — we'll be in touch!");
  };

  return (
    <main className="bg-paper pt-[var(--navbar-height)]">
      {/* Hero */}
      <section className="relative overflow-hidden py-14 lg:py-16">
        <div aria-hidden className="hero-glow left-1/2 -top-20 h-[300px] w-[620px] max-w-[130vw] -translate-x-1/2 bg-moss-400/[0.08]" />
        <div className="container-site relative z-10">
          <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> All roles
          </Link>
          <div className="mt-6 max-w-3xl">
            <span className="rounded-full bg-moss-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-moss-700">
              {job.department}
            </span>
            <h1 className="heading-display mt-4">{job.title}</h1>
            <p className="text-body-lg mt-4 max-w-2xl">{job.summary}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink-body">
              <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-moss-600" /> {job.type}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-moss-600" /> {job.location}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-moss-600" /> {job.experienceLevel}</span>
              {job.salary && <span className="inline-flex items-center gap-1.5"><Wallet className="h-4 w-4 text-moss-600" /> {job.salary}</span>}
            </div>
            <a href="#apply" className="btn btn-primary mt-7">
              Apply now <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* JD */}
          <div className="space-y-4">
            <Block title="What you'll do" icon={Briefcase}>
              <ul className={LIST}>
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-ink-body">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-moss-600" /> {r}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="What we're looking for" icon={Star}>
              <ul className={LIST}>
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-ink-body">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-moss-600" /> {r}
                  </li>
                ))}
              </ul>
            </Block>
            {job.preferredSkills.length > 0 && (
              <Block title="Nice to have" icon={Sparkles}>
                <div className="flex flex-wrap gap-2">
                  {job.preferredSkills.map((s) => (
                    <span key={s} className="rounded-full border border-hairline bg-sand px-3 py-1.5 text-xs font-medium text-ink-body">
                      {s}
                    </span>
                  ))}
                </div>
              </Block>
            )}
            {job.benefits.length > 0 && (
              <Block title="What you get" icon={Gift}>
                <ul className={LIST}>
                  {job.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-ink-body">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-moss-600" /> {b}
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>

          {/* Apply */}
          <div id="apply" className="scroll-mt-24 lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-hairline bg-paper-raised p-6 shadow-card"
            >
              {done ? (
                <div className="grid place-items-center gap-3 py-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-moss-500" />
                  <h3 className="font-heading text-lg font-bold text-ink">Application received</h3>
                  <p className="text-sm text-ink-muted">
                    Thanks for applying to <strong>{job.title}</strong>. We review
                    every application and will reach out if there&rsquo;s a fit.
                  </p>
                  <button onClick={() => setDone(false)} className="btn btn-secondary btn-sm mt-2">
                    Submit another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                  <h3 className="font-heading text-lg font-bold text-ink">Apply for this role</h3>
                  <Field label="Full name" error={errors.name?.message}>
                    <input {...register("name")} className="input" placeholder="Your name" />
                  </Field>
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <Field label="Email" error={errors.email?.message}>
                      <input {...register("email")} type="email" className="input" placeholder="you@email.com" />
                    </Field>
                    <Field label="Phone" error={errors.phone?.message}>
                      <input {...register("phone")} className="input" placeholder="+91 …" />
                    </Field>
                  </div>
                  <Field label="Years of experience" error={errors.experience?.message}>
                    <input {...register("experience")} className="input" placeholder="e.g. 2 years" />
                  </Field>
                  <Field label="Portfolio / LinkedIn (optional)">
                    <input {...register("portfolio")} className="input" placeholder="link" />
                  </Field>
                  <Field label="Resume">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-hairline-strong bg-sand px-4 py-3 text-sm text-ink-muted transition-colors hover:border-moss-400">
                      <Upload className="h-4 w-4 flex-shrink-0 text-moss-600" />
                      <span className="truncate">{resumeName || "Upload PDF / DOC"}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? "")}
                      />
                    </label>
                  </Field>
                  <Field label="Cover note (optional)">
                    <textarea {...register("coverLetter")} rows={3} className="input resize-none" placeholder="Why you're a great fit…" />
                  </Field>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full disabled:opacity-70">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit application <Send className="h-4 w-4" /></>}
                  </button>
                  <p className="text-center text-[11px] text-ink-faint">
                    We reply to every application within a few days.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Block({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-hairline bg-paper-raised p-6 shadow-card sm:p-7">
      <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold text-ink">
        <Icon className="h-5 w-5 text-moss-600" /> {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-ink-body">{label}</label>
      {children}
      {error && <p className={cn("mt-1 text-xs text-red-500")}>{error}</p>}
    </div>
  );
}
