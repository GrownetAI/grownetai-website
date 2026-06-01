import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | GrownetAI Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="pt-[var(--navbar-height)]">
      <section className="section-padding bg-white">
        <div className="container-site max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-teal font-semibold mb-8 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="badge-teal text-xs flex items-center gap-1">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-charcoal mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-brand-slate-gray text-sm mb-8">
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
            <span>{post.date}</span>
          </div>

          {post.image && (
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <p className="text-brand-slate-gray text-lg leading-relaxed">{post.excerpt}</p>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-brand-slate-gray mb-4">Ready to grow your business?</p>
            <Link href="/contact" className="btn btn-primary inline-flex">
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
