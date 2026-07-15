"use client";
import { useState } from "react";
import Link from "next/link";
import { Clock, User, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import Image from "next/image";

const CATEGORIES = [
  "All",
  ...Array.from(new Set(BLOG_POSTS.map((p) => p.category))),
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featuredPost = BLOG_POSTS.find((p) => p.featured);
  const filtered = BLOG_POSTS.filter(
    (p) =>
      !p.featured &&
      (activeCategory === "All" || p.category === activeCategory),
  );

  return (
    <main className="pt-[var(--navbar-height)]">
      {/* Hero */}
      <section className="relative bg-gradient-hero py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <span className="section-label mb-4">
            Blog & Insights
          </span>
          <h1 className="font-display text-ink text-5xl md:text-6xl mt-4 mb-4">
            Marketing <em className="italic text-moss-600">Tips & Insights</em>
          </h1>
          <p className="text-ink-body text-xl max-w-xl mx-auto">
            AI-powered strategies, industry trends, and actionable growth
            tactics for your business.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding bg-paper">
          <div className="container-site">
            <FadeIn>
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="card card-hover overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto min-h-[260px] overflow-hidden">
                      {featuredPost.image ? (
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-gradient-brand h-full w-full flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-white/40" />
                        </div>
                      )}
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="badge-teal">
                          {featuredPost.category}
                        </span>
                        <span className="badge-green">Featured</span>
                      </div>
                      <h2 className="font-heading font-bold text-brand-charcoal text-2xl lg:text-3xl mb-4 group-hover:text-brand-teal transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-brand-slate-gray leading-relaxed mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-brand-slate-gray mb-6 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" /> {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />{" "}
                          {formatDate(featuredPost.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> {featuredPost.readTime}
                        </span>
                      </div>
                      <span className="text-brand-teal font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="section-padding bg-sand">
        <div className="container-site">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${activeCategory === cat ? "bg-ink text-paper" : "bg-paper-raised text-ink-body border border-hairline hover:border-ink hover:text-ink"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Bento: the latest post leads as a wide feature; dense flow keeps the
              mixed spans gapless. */}
          <div className="grid grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => {
              const feature = i === 0;
              return (
                <FadeIn key={post.id} delay={Math.min(i * 0.06, 0.3)} className={feature ? "md:col-span-2" : ""}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-paper-raised shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-moss-300 hover:shadow-brand">
                      <div className={`relative overflow-hidden ${feature ? "h-56 sm:h-72" : "h-44"}`}>
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes={feature ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-moss-50">
                            <BookOpen className="h-10 w-10 text-moss-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="mb-3 self-start rounded-full bg-moss-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-moss-700">
                          {post.category}
                        </span>
                        <h3 className={`mb-2 flex-1 font-heading font-bold text-ink transition-colors group-hover:text-moss-600 ${feature ? "text-xl sm:text-2xl" : "text-lg"}`}>
                          {post.title}
                        </h3>
                        <p className="mb-4 text-sm leading-relaxed text-ink-muted">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 border-t border-hairline pt-4 text-xs text-ink-muted">
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" /> {post.author}
                          </span>
                          <span className="ml-auto flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {post.readTime}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-brand-slate-gray mt-10">
              No posts in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-forest text-paper text-center">
        <div className="container-site max-w-xl mx-auto">
          <h2 className="display-lg text-paper mb-5">
            Want us to grow your business too?
          </h2>
          <p className="text-paper/80 mb-9">
            Join 150+ businesses already growing with GrownetAI.
          </p>
          <Link href="/contact" className="btn btn-accent btn-lg">
            Get Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
