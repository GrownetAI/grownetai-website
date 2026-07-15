/**
 * Homepage pricing-preview bundles.
 *
 * These are composite packages (a build + ongoing marketing), not the single
 * services in pricing-data.ts. Rather than invent a parallel price table, each
 * bundle's "starting from" figure is COMPOSED from the real per-service floor
 * prices in pricing-data — so it stays consistent with /pricing and works in
 * all 8 countries automatically.
 *
 * Pros/cons are researched, real trade-offs (WordPress/Shopify/AI/static/custom
 * each differ) — never reused across bundles.
 */
import { getPrice, type CountryCode } from "./pricing-data";

export type BundleCategory = "no-code" | "code";
export type Term = 6 | 12;

/** A price component drawn from pricing-data: a service + one of its tiers. */
interface Ingredient {
  service: string;
  tier: string;
}

export interface Bundle {
  id: string;
  category: BundleCategory;
  name: string;
  tagline: string;
  /** Services the client gets, shown as a checklist. */
  includes: string[];
  /** Distinct, researched trade-offs. */
  pros: string[];
  cons: string[];
  popular?: boolean;
  /** One-time build cost = sum of these service floors. */
  build: Ingredient[];
  /** Monthly marketing = sum of these service floors, bundled below list price. */
  monthly: Ingredient[];
}

/* The bundle discount: booked together, ongoing work is cheaper than à la carte.
   A 12-month commitment earns a further per-month reduction. */
const BUNDLE_FACTOR = 0.72;
const TERM_12_DISCOUNT = 0.87;

const MARKETING = "and ongoing SEO, social & ads management";

export const BUNDLES: Bundle[] = [
  /* ── No-Code ──────────────────────────────────────────────────────────── */
  {
    id: "wordpress",
    category: "no-code",
    name: "WordPress",
    tagline: `A managed WordPress site ${MARKETING}.`,
    includes: [
      "Logo & graphic design",
      "WordPress website",
      "Social media management",
      "SEO",
      "Google My Business",
      "Google & Meta Ads",
    ],
    pros: [
      "Fastest, lowest-cost route to launch",
      "You can edit content yourself, no dev needed",
      "Huge plugin ecosystem for extra features",
      "Proven for blogs & content-led SEO",
    ],
    cons: [
      "Plugins need regular updates & maintenance",
      "Speed depends heavily on hosting",
      "Harder to scale under heavy traffic",
      "Security needs ongoing attention",
    ],
    popular: true,
    build: [
      { service: "design", tier: "starter" },
      { service: "web-dev", tier: "launch" },
    ],
    monthly: [
      { service: "smm", tier: "starter" },
      { service: "seo", tier: "starter" },
    ],
  },
  {
    id: "shopify",
    category: "no-code",
    name: "Shopify",
    tagline: `A managed Shopify store ${MARKETING}.`,
    includes: [
      "Logo & graphic design",
      "Shopify website",
      "Social media management",
      "SEO",
      "Google My Business",
      "Google & Meta Ads",
    ],
    pros: [
      "Hosting & security fully managed for you",
      "Built for selling — checkout that just works",
      "Scales through traffic spikes without crashing",
      "24/7 platform support & app store",
    ],
    cons: [
      "Monthly platform fee + transaction fees",
      "Less design freedom than custom code",
      "Advanced features can mean paid apps",
      "Migrating away later is non-trivial",
    ],
    build: [
      { service: "design", tier: "starter" },
      { service: "web-dev", tier: "launch" },
    ],
    monthly: [
      { service: "smm", tier: "starter" },
      { service: "seo", tier: "starter" },
      { service: "ads", tier: "starter" },
    ],
  },

  /* ── Code ─────────────────────────────────────────────────────────────── */
  {
    id: "ai-dev",
    category: "code",
    name: "AI Development",
    tagline: "A custom, AI-native product built for your goals.",
    includes: [
      "AI integration (Python / Node)",
      "React / Next.js / Laravel build",
      "SEO",
      "Social media management",
      "Google My Business",
      "Google & Meta Ads",
    ],
    pros: [
      "AI capability baked into the product itself",
      "Fully bespoke — no platform ceiling",
      "Owns its data & automations end to end",
      "A genuine competitive moat",
    ],
    cons: [
      "Highest upfront investment",
      "Longer build than no-code",
      "Needs a dev partner to evolve",
      "AI features need monitoring & tuning",
    ],
    popular: true,
    build: [
      { service: "ai", tier: "starter" },
      { service: "web-dev", tier: "growth" },
    ],
    monthly: [
      { service: "smm", tier: "starter" },
      { service: "seo", tier: "starter" },
      { service: "ads", tier: "starter" },
    ],
  },
  {
    id: "static",
    category: "code",
    name: "Static Development",
    tagline: "A hand-coded HTML/CSS/JS site — fast and lean.",
    includes: [
      "HTML / CSS / JavaScript build",
      "Blazing-fast, CDN-served pages",
      "SEO",
      "Social media management",
      "Google My Business",
      "Google & Meta Ads",
    ],
    pros: [
      "Fastest possible load times",
      "Smallest attack surface — very secure",
      "Almost no ongoing maintenance",
      "Cheap, resilient CDN hosting",
    ],
    cons: [
      "No CMS — edits go through a developer",
      "Not suited to dynamic / logged-in features",
      "Large sites get tedious to update",
      "Limited interactivity out of the box",
    ],
    build: [
      { service: "design", tier: "starter" },
      { service: "web-dev", tier: "launch" },
    ],
    monthly: [
      { service: "smm", tier: "starter" },
      { service: "seo", tier: "starter" },
      { service: "ads", tier: "starter" },
    ],
  },
  {
    id: "custom",
    category: "code",
    name: "Custom Development",
    tagline: "A bespoke app on a modern stack — without AI.",
    includes: [
      "Python / Node / React / Next.js / Laravel",
      "Custom features & integrations",
      "SEO",
      "Social media management",
      "Google My Business",
      "Google & Meta Ads",
    ],
    pros: [
      "Total control over design & features",
      "Scales cleanly as you grow",
      "No platform lock-in or transaction fees",
      "Tuned for performance & SEO",
    ],
    cons: [
      "Higher cost than no-code",
      "Several weeks to build properly",
      "Needs developers to maintain",
      "Overkill for a simple brochure site",
    ],
    build: [
      { service: "web-dev", tier: "growth" },
      { service: "design", tier: "growth" },
    ],
    monthly: [
      { service: "smm", tier: "starter" },
      { service: "seo", tier: "starter" },
      { service: "ads", tier: "starter" },
    ],
  },
];

/** Delivery expectation per category — rendered as a premium badge. */
export const DELIVERY: Record<BundleCategory, { icon: string; label: string }> = {
  "no-code": { icon: "🚀", label: "Launch-ready in 1–2 weeks" },
  code: { icon: "⚡", label: "Production-ready in 3–4 weeks" },
};

const sumFloors = (items: Ingredient[], country: CountryCode) =>
  items.reduce((sum, it) => {
    const r = getPrice(it.service, country, it.tier);
    return sum + (r ? r.min : 0);
  }, 0);

/** Round to a clean "from" figure so composed sums don't read as odd numbers. */
function tidy(n: number): number {
  if (n >= 100000) return Math.round(n / 5000) * 5000;
  if (n >= 10000) return Math.round(n / 1000) * 1000;
  return Math.round(n / 500) * 500;
}

export interface BundlePrice {
  total: number;
  perMonth: number;
}

/**
 * A grounded "starting from" for a bundle over the chosen term. Composed from
 * the real per-service floors in pricing-data, discounted for bundling (and
 * further for a 12-month commitment).
 */
export function bundlePrice(
  bundleId: string,
  country: CountryCode,
  term: Term,
): BundlePrice {
  const bundle = BUNDLES.find((b) => b.id === bundleId);
  if (!bundle) return { total: 0, perMonth: 0 };

  const build = sumFloors(bundle.build, country);
  const monthlyList = sumFloors(bundle.monthly, country);
  const monthly =
    monthlyList * BUNDLE_FACTOR * (term === 12 ? TERM_12_DISCOUNT : 1);

  return {
    total: tidy(build + monthly * term),
    perMonth: tidy(monthly),
  };
}
