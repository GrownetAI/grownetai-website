import type { MetadataRoute } from "next";
import { BLOG_POSTS, SERVICES } from "@/lib/constants";

export const dynamic = "force-static";

const BASE = "https://grownetai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                     changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,          changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`,       changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pricing`,        changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/portfolio`,      changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`,           changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/contact`,        changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/faq`,            changeFrequency: "monthly", priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date(post.date),
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services#${s.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes];
}
