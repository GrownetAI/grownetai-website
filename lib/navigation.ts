import { SERVICES, CASE_STUDIES, BLOG_POSTS } from "@/lib/constants";

/* ════════════════════════════════════════════════════════════════
   NAVIGATION DATA

   Everything the mega menu (and the portfolio filter bar) lists is
   derived from lib/constants.ts at module load — no hand-maintained
   copies of service titles, tech names or counts.
════════════════════════════════════════════════════════════════ */

export type NavRow = {
  label: string;
  href: string;
  /** Shown muted on the right of the row; omitted when 0. */
  count?: number;
  /** Secondary line (e.g. a project's headline under the client name). */
  hint?: string;
};

export type RailId = "services" | "category" | "tech" | "blog";

export type SearchGroup = {
  id: string;
  label: string;
  rows: NavRow[];
};

/* Shared with the portfolio page — ids are part of the URL contract
   (/portfolio?filter=<id>), so they must stay exactly these strings. */
export const PORTFOLIO_CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "web-dev", label: "Websites" },
  { id: "app-dev", label: "Apps" },
  { id: "design", label: "Design" },
  { id: "ads", label: "Digital Campaigns" },
  { id: "smm", label: "Social Media" },
  { id: "seo", label: "SEO" },
  { id: "ai", label: "AI" },
];

const studiesWith = (serviceId: string) =>
  CASE_STUDIES.filter((c) => c.serviceIds.includes(serviceId)).length;

export const SERVICE_ROWS: NavRow[] = SERVICES.map((s) => {
  const count = studiesWith(s.id);
  return {
    label: s.title,
    href: `/services#${s.id}`,
    ...(count > 0 ? { count } : {}),
  };
});

export const CATEGORY_ROWS: NavRow[] = PORTFOLIO_CATEGORIES.filter(
  (c) => c.id !== "all",
).map((c) => {
  const count = studiesWith(c.id);
  return {
    label: c.label,
    href: `/portfolio?filter=${c.id}`,
    ...(count > 0 ? { count } : {}),
  };
});

/* Unique tech names across case studies, in first-seen order, with
   how many studies use each. Names go into the URL verbatim
   (encoded) — the portfolio page matches on the exact string. */
const techCounts = new Map<string, number>();
for (const cs of CASE_STUDIES) {
  for (const t of cs.tech) techCounts.set(t, (techCounts.get(t) ?? 0) + 1);
}

export const TECH_ROWS: NavRow[] = Array.from(techCounts, ([name, count]) => ({
  label: name,
  href: `/portfolio?tech=${encodeURIComponent(name)}`,
  count,
}));

export const BLOG_ROWS: NavRow[] = BLOG_POSTS.map((p) => ({
  label: p.title,
  href: "/blog",
}));

export const RAILS: { id: RailId; label: string }[] = [
  { id: "services", label: "Services" },
  { id: "category", label: "By Category" },
  { id: "tech", label: "By Technology" },
  { id: "blog", label: "Blog" },
];

export const RAIL_ROWS: Record<RailId, NavRow[]> = {
  services: SERVICE_ROWS,
  category: CATEGORY_ROWS,
  tech: TECH_ROWS,
  blog: BLOG_ROWS,
};

/* Case-insensitive substring search across everything the site can
   link to. An empty query returns the full catalogue (used as the
   "browse everything" state when the search panel first opens);
   groups with no matches are dropped. */
export function searchSite(query: string): SearchGroup[] {
  const q = query.trim().toLowerCase();
  const hit = (text: string) => !q || text.toLowerCase().includes(q);

  const projects: NavRow[] = CASE_STUDIES.filter(
    (c) => hit(c.client) || hit(c.title),
  ).map((c) => ({
    label: c.client,
    hint: c.title,
    href: `/portfolio/${c.slug}`,
  }));

  const groups: SearchGroup[] = [
    {
      id: "services",
      label: "Services",
      rows: SERVICE_ROWS.filter((r) => hit(r.label)),
    },
    {
      id: "categories",
      label: "Categories",
      rows: CATEGORY_ROWS.filter((r) => hit(r.label)),
    },
    {
      id: "tech",
      label: "Technologies",
      rows: TECH_ROWS.filter((r) => hit(r.label)),
    },
    { id: "projects", label: "Projects", rows: projects },
    {
      id: "blog",
      label: "Blog posts",
      rows: BLOG_ROWS.filter((r) => hit(r.label)),
    },
  ];

  return groups.filter((g) => g.rows.length > 0);
}
