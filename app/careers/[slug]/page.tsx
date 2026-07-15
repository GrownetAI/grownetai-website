import type { Metadata } from "next";
import { SEED_JOBS } from "@/lib/careers/data";
import JobDetail from "@/components/careers/JobDetail";

type Props = { params: Promise<{ slug: string }> };

// SSG the seeded roles for SEO; admin-added roles render on demand (the client
// store resolves them), so we intentionally do NOT notFound() unknown slugs.
export function generateStaticParams() {
  return SEED_JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = SEED_JOBS.find((j) => j.slug === slug);
  if (!job) return { title: "Careers — GrownetAI" };
  return {
    title: `${job.title} — Careers | GrownetAI`,
    description: job.summary,
  };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const seedJob = SEED_JOBS.find((j) => j.slug === slug);
  return <JobDetail slug={slug} seedJob={seedJob} />;
}
