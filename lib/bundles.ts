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

export type BundleCategory = "no-code" | "code" | "marketing" | "automation";
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

/* Build work is discounted too when booked with a retainer. */
const BUILD_FACTOR = 0.85;

/**
 * We deliver from India. For a client outside India that IS the offer: the same
 * scope, billed off an Indian cost base instead of a local agency's.
 *
 * pricing-data holds each market's LOCAL rate, so quoting those verbatim would
 * price us like a local agency and throw away the entire advantage. Instead an
 * overseas package is a documented fraction of the local rate. Expressed as a
 * factor rather than an FX conversion deliberately — factors don't go stale
 * when the rupee moves, and no fabricated exchange rate ends up baked in.
 *
 * Research (2026): India-based delivery runs 50–70% under US/UK at equivalent
 * seniority — Indian agency devs $20–65/hr vs $150–180/hr for a comparable US
 * hire; workflow automation 40–60% below US counterparts. US/GB sit at the wide
 * end of that band, the Gulf at the narrow end where local rates are closer to
 * India's. IN is 1.0: Indian clients already buy at the Indian rate.
 *
 * Sources: TechVinta, DistantJob, Acquaint Softtech, Uran Company (2026
 * offshore rate guides). Re-check when RESEARCH_META.last_updated is bumped.
 */
const EXPORT_FACTOR: Record<CountryCode, number> = {
  IN: 1,
  US: 0.32,
  GB: 0.32,
  CA: 0.38,
  AU: 0.38,
  NZ: 0.38,
  SG: 0.38,
  AE: 0.45,
};

/**
 * Deliberately positioned under the market.
 *
 * Every bundle composes from the FLOOR of each service range in pricing-data,
 * then takes the factors above — so a bundle always lands below the same scope
 * bought à la carte, and below the researched entry rates below. Because the
 * factors are proportional they hold in all 8 currencies, which a fixed
 * discount anchored to one market would not.
 *
 * Researched India market entry rates (2026) for the services we bundle:
 *   logo / brand identity   ₹10,000–25,000 experienced freelancer, ₹25,000+ studio
 *   WordPress site          ₹8,000–30,000 basic, ₹30,000–1,50,000 agency
 *   SEO retainer            ₹15,000/mo small local, ₹25,000+/mo agency
 *   social media management ₹15,000–40,000/mo basic agency package
 *   Google / Meta ads mgmt  ₹8,000–50,000/mo fixed retainer
 *   AI chatbot / integration ₹30,000–75,000 basic, ₹1,00,000–4,00,000 business
 *
 * Sources: upGrowth, RankOn Technologies, Jootoor, Zethic, Brainguru (2026
 * India pricing guides). Re-check when RESEARCH_META.last_updated is bumped.
 */

/**
 * Figures above this are not published — the card shows a quote CTA instead.
 *
 * Applied to the figure AS DISPLAYED, not converted. In practice that means it
 * only bites in INR: the price tables are market-normalised rather than FX
 * conversions, so no other market's bundle figures come near 150,000. Today it
 * withholds exactly one number, the AI Development build at ₹2,00,000.
 */
export const PRICE_CEILING = 150_000;

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

  /* ── Digital Marketing ────────────────────────────────────────────────────
     Retainer-only: no build, for businesses that already have a site. `build`
     is deliberately empty — the card omits the one-time figure entirely. */
  {
    id: "growth-essentials",
    category: "marketing",
    name: "Growth Essentials",
    tagline: "SEO and social, run month to month on the site you already have.",
    includes: [
      "Search engine optimisation",
      "Social media management",
      "Google My Business",
      "Monthly content calendar",
      "Rank & traffic reporting",
    ],
    pros: [
      "No build cost — starts on your existing site",
      "Organic traffic compounds instead of stopping with the budget",
      "Lowest monthly entry point we offer",
      "Cancel or step up at the end of the term",
    ],
    cons: [
      "No paid reach, so early months are slow",
      "Needs a site that already converts",
      "SEO results typically take 3–6 months",
      "Not enough on its own for a hard launch date",
    ],
    build: [],
    monthly: [
      { service: "seo", tier: "starter" },
      { service: "smm", tier: "starter" },
    ],
  },
  {
    id: "full-funnel",
    category: "marketing",
    name: "Full Funnel",
    tagline: "Organic and paid together — search, social and ads in one plan.",
    includes: [
      "Search engine optimisation",
      "Social media management",
      "Google & Meta Ads management",
      "Google My Business",
      "Landing page conversion fixes",
      "Monthly performance reporting",
    ],
    pros: [
      "Paid traffic from week one while SEO builds",
      "Ad data feeds the keyword and content plan",
      "One team, so channels stop contradicting each other",
      "Clear attribution across organic and paid",
    ],
    cons: [
      "Ad spend is billed separately by the platforms",
      "Needs a working budget to be worth running",
      "More moving parts to review each month",
      "Paid traffic stops the day the budget does",
    ],
    popular: true,
    build: [],
    monthly: [
      { service: "seo", tier: "starter" },
      { service: "smm", tier: "starter" },
      { service: "ads", tier: "starter" },
    ],
  },
  {
    id: "market-leader",
    category: "marketing",
    name: "Market Leader",
    tagline: "Higher content volume, multi-platform social and scaled ads.",
    includes: [
      "Advanced SEO & content production",
      "Multi-platform social management",
      "Social media optimisation",
      "Scaled Google & Meta Ads",
      "Competitor & share-of-voice tracking",
      "Dedicated account strategist",
    ],
    pros: [
      "Content volume high enough to hold competitive terms",
      "Covers every platform your buyers actually use",
      "Strategist owns the plan, not just the execution",
      "Built to take share, not just maintain position",
    ],
    cons: [
      "Highest monthly commitment of the marketing plans",
      "Needs real internal capacity to feed approvals",
      "Overkill for a purely local service business",
      "Takes 2–3 months to reach full output",
    ],
    build: [],
    monthly: [
      { service: "seo", tier: "growth" },
      { service: "smm", tier: "growth" },
      { service: "ads", tier: "growth" },
      { service: "smo", tier: "starter" },
    ],
  },

  /* ── Automation ───────────────────────────────────────────────────────────
     One-time builds: `monthly` is empty, so the card shows no retainer line. */
  {
    id: "workflow-automation",
    category: "automation",
    name: "Workflow Automation",
    tagline: "Your repetitive back-office work, running itself.",
    includes: [
      "Process audit & mapping",
      "3–5 app integrations",
      "Automated workflows (n8n / Make)",
      "Error handling & failure alerts",
      "Handover documentation",
      "30 days of post-launch support",
    ],
    pros: [
      "Pays for itself in staff hours within months",
      "Removes the copy-paste work people quietly hate",
      "Runs on tools you can inspect and own",
      "Fastest automation to get live",
    ],
    cons: [
      "Only worth it for genuinely repeated processes",
      "Breaks if the connected apps change their APIs",
      "Platform subscriptions are billed separately",
      "Needs your process documented before we start",
    ],
    popular: true,
    build: [{ service: "ai-automation", tier: "starter" }],
    monthly: [],
  },
  {
    id: "ai-assistant",
    category: "automation",
    name: "AI Assistant",
    tagline: "A trained assistant that answers, qualifies and routes for you.",
    includes: [
      "Custom AI assistant",
      "Website & WhatsApp deployment",
      "Trained on your own content",
      "Lead capture & routing",
      "Conversation analytics",
      "Clean handover to a human",
    ],
    pros: [
      "Answers customers outside working hours",
      "Qualifies leads before they reach your team",
      "Trained on your material, not generic replies",
      "Scales with volume without new headcount",
    ],
    cons: [
      "Needs decent source content to answer well",
      "Model usage is billed on consumption",
      "Requires review cycles to tune tone",
      "Not a replacement for complex human support",
    ],
    build: [{ service: "ai", tier: "starter" }],
    monthly: [],
  },
  {
    id: "custom-agent",
    category: "automation",
    name: "Custom AI Agent",
    tagline: "A bespoke agent with custom training and deep integrations.",
    includes: [
      "Discovery & data audit",
      "Custom RAG / model pipeline",
      "Multi-system integration",
      "Evaluation & safety guardrails",
      "Monitoring dashboard",
      "Ongoing tuning cycle",
    ],
    pros: [
      "Handles work a rules-based bot cannot",
      "Reads across your systems, not one inbox",
      "Measured against real evaluation sets",
      "A genuine operational moat",
    ],
    cons: [
      "Longest build and highest investment",
      "Needs clean, accessible internal data",
      "Requires monitoring once live",
      "Scoping alone takes a couple of weeks",
    ],
    build: [{ service: "llm", tier: "starter" }],
    monthly: [],
  },
];

/** Delivery expectation per category — rendered as a premium badge. */
export const DELIVERY: Record<BundleCategory, { icon: string; label: string }> = {
  "no-code": { icon: "🚀", label: "Launch-ready in 1–2 weeks" },
  code: { icon: "⚡", label: "Production-ready in 3–4 weeks" },
  marketing: { icon: "📈", label: "First results in 4–8 weeks" },
  automation: { icon: "🤖", label: "Live in 2–3 weeks" },
};

const sumFloors = (items: Ingredient[], country: CountryCode) =>
  items.reduce((sum, it) => {
    const r = getPrice(it.service, country, it.tier);
    return sum + (r ? r.min : 0);
  }, 0);

/**
 * Round to a clean "from" figure so composed sums don't read as odd numbers.
 *
 * The bands have to track magnitude, not assume rupees. The original version
 * rounded everything under 10,000 to the nearest 500, which was fine for INR
 * but silently produced "$0/mo" once EXPORT_FACTOR pushed overseas monthlies
 * into the low hundreds — and collapsed genuinely different packages onto the
 * same figure. Small amounts therefore round finely, and a positive input can
 * never round down to zero.
 */
function tidy(n: number): number {
  if (n <= 0) return 0;
  if (n >= 100000) return Math.round(n / 5000) * 5000;
  if (n >= 10000) return Math.round(n / 1000) * 1000;
  if (n >= 1000) return Math.round(n / 100) * 100;
  if (n >= 100) return Math.round(n / 50) * 50;
  return Math.max(10, Math.round(n / 10) * 10);
}

export interface BundlePrice {
  /** One-time build cost, bundled. */
  build: number;
  /** Same build bought à la carte — the strike-through reference. */
  listBuild: number;
  perMonth: number;
  /** Same retainer bought à la carte. */
  listPerMonth: number;
  total: number;
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
  if (!bundle)
    return { build: 0, listBuild: 0, perMonth: 0, listPerMonth: 0, total: 0 };

  /* `list*` stay at the LOCAL market rate — that is the honest comparison a
     client makes, and outside India it is what carries the offshore saving. */
  const xf = EXPORT_FACTOR[country] ?? 1;
  const buildList = sumFloors(bundle.build, country);
  const build = buildList * BUILD_FACTOR * xf;
  const monthlyList = sumFloors(bundle.monthly, country);
  const monthly =
    monthlyList * BUNDLE_FACTOR * (term === 12 ? TERM_12_DISCOUNT : 1) * xf;

  return {
    build: tidy(build),
    listBuild: tidy(buildList),
    perMonth: tidy(monthly),
    listPerMonth: tidy(monthlyList),
    total: tidy(build + monthly * term),
  };
}
