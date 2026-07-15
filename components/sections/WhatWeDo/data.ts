/* Shared contract for the What-We-Do section. Everything here is derived
   from data that already exists — no new copy is invented. */

export type TabId = "projects" | "testimonials";

/* Packages was removed: it read pricing-data and duplicated the new homepage
   pricing-preview section. The command bar now offers just the two content
   lenses; pricing lives in its own section and on /pricing. */
export const TABS: { id: TabId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
];

/* Five primary services. Every id is a real service in lib/pricing-data.ts and
   has a SERVICE_SCENES thumbnail, so each chip filters real Projects/
   Testimonials and never renders a blank tile. "Artificial Intelligence" is
   the umbrella `ai` service; the four granular AI services stay on /pricing. */
export const SERVICE_CHIPS: { id: string; label: string }[] = [
  { id: "web-dev", label: "Websites" },
  { id: "app-dev", label: "Apps" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "smm", label: "Social Media" },
  { id: "design", label: "Logo & Graphic Design" },
];

/* Business types, taken from the industries our own case studies already
   cover (PORTFOLIO_PROJECTS.tag) plus the obvious rest. */
export const BUSINESS_TYPES = [
  "E-commerce & Retail",
  "Food & Hospitality",
  "Health & Wellness",
  "Real Estate",
  "Education & EdTech",
  "SaaS & Technology",
  "Professional Services",
  "Other",
];

/** Prices are shown in one currency here; the full country switcher lives on /pricing. */
export const DEFAULT_COUNTRY = "IN" as const;
