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
          <span className="section-label bg-white/20 text-white border-white/30 mb-4">
            Blog & Insights
          </span>
          <h1 className="font-heading font-bold text-white text-5xl md:text-6xl mt-4 mb-4">
            Marketing <span className="text-brand-green">Tips & Insights</span>
          </h1>
          <p className="text-white/80 text-xl max-w-xl mx-auto">
            AI-powered strategies, industry trends, and actionable growth
            tactics for your business.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding bg-white">
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
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${activeCategory === cat ? "bg-brand-teal text-white shadow-sm" : "bg-white text-brand-slate-gray border border-gray-200 hover:border-brand-teal hover:text-brand-teal"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <FadeIn key={post.id} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <div className="card card-hover h-full flex flex-col overflow-hidden">
                    {/* <div className="bg-brand-teal-mist h-44 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-brand-teal/30" />
                    </div> */}
                    <div className="relative h-44 overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-brand-teal-mist h-full w-full flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-brand-teal/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="badge-teal self-start mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-heading font-bold text-brand-charcoal text-lg mb-2 group-hover:text-brand-teal transition-colors flex-1">
                        {post.title}
                      </h3>
                      <p className="text-brand-slate-gray text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-brand-slate-gray border-t border-gray-100 pt-4">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" /> {post.author}
                        </span>
                        <span className="flex items-center gap-1 ml-auto">
                          <Clock className="w-3.5 h-3.5" /> {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-brand-slate-gray mt-10">
              No posts in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-teal text-white text-center">
        <div className="container-site max-w-xl mx-auto">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-white">
            Want us to grow your business too?
          </h2>
          <p className="text-white/80 mb-8">
            Join 150+ businesses already growing with GrownetAI.
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
