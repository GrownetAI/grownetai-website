import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/constants";
import { getCaseStudyDetail } from "@/lib/case-study-details";
import ProjectDetail from "@/components/portfolio/ProjectDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) return { title: "Case study — GrownetAI" };
  return {
    title: `${study.client} — ${study.title} | GrownetAI`,
    description: study.challenge,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  const detail = getCaseStudyDetail(slug);
  if (!study || !detail) notFound();
  return <ProjectDetail study={study} detail={detail} />;
}
