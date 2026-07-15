/**
 * Pricing by business type.
 *
 * The /pricing page breaks pricing down by SERVICE (web-dev, seo, ads…). This
 * adds the axis clients actually think in — their industry — mapping each to a
 * recommended package, the deliverables that matter for it, the tech we'd use,
 * a realistic timeline, and optional add-ons.
 *
 * `recommend` points at a real pricing-data service + tier, so the "from" price
 * is composed live and stays consistent with the rest of the page — no second
 * price table.
 */
export interface Industry {
  id: string;
  label: string;
  /** One-line framing of what this business needs. */
  summary: string;
  /** Which pricing-data service + tier anchors the "from" price. */
  recommend: { service: string; tier: string };
  deliverables: string[];
  tech: string[];
  timeline: string;
  addons: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: "saas",
    label: "SaaS",
    summary:
      "A product-led site plus the MVP or platform behind it — built to convert trials and scale.",
    recommend: { service: "web-dev", tier: "saas" },
    deliverables: [
      "Marketing site + product pages",
      "Auth & user dashboards",
      "Subscriptions & billing",
      "Docs / changelog setup",
      "Analytics & product tracking",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    timeline: "6–12 weeks",
    addons: ["AI features", "Mobile app", "SOC 2 readiness", "In-app onboarding"],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    summary:
      "A storefront engineered to sell — fast checkout, clean catalog, and the ads to fill it.",
    recommend: { service: "web-dev", tier: "ecommerce" },
    deliverables: [
      "Product catalog & cart",
      "Secure payments & checkout",
      "Inventory management",
      "Conversion-optimised PDPs",
      "Marketing & pixel integrations",
    ],
    tech: ["Shopify", "Next.js", "Meta / Google feeds"],
    timeline: "4–8 weeks",
    addons: ["Subscriptions", "Loyalty program", "Marketplace listings", "WhatsApp catalog"],
  },
  {
    id: "local",
    label: "Local Business",
    summary:
      "Get found on the map, get the call, get the booking — a lean site plus local SEO and ads.",
    recommend: { service: "web-dev", tier: "launch" },
    deliverables: [
      "Fast 5-page website",
      "Google Business Profile setup",
      "Local SEO & citations",
      "Click-to-call & maps",
      "Reviews & booking flow",
    ],
    tech: ["WordPress or Next.js", "Google Business", "Local Ads"],
    timeline: "1–2 weeks",
    addons: ["WhatsApp booking", "Menu / service builder", "Multi-location pages"],
  },
  {
    id: "corporate",
    label: "Corporate",
    summary:
      "A credible, content-rich presence that wins bigger clients and reflects an established brand.",
    recommend: { service: "web-dev", tier: "growth" },
    deliverables: [
      "Bespoke multi-page site",
      "CMS for self-editing",
      "Careers & investor pages",
      "On-page SEO",
      "Analytics & lead capture",
    ],
    tech: ["Next.js", "Headless CMS", "Analytics"],
    timeline: "3–5 weeks",
    addons: ["Multi-language", "Intranet / portal", "Brand refresh"],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    summary:
      "A striking personal or studio site that makes the work the hero and turns visits into enquiries.",
    recommend: { service: "web-dev", tier: "launch" },
    deliverables: [
      "Visual-first design",
      "Project / case-study pages",
      "Contact & enquiry form",
      "Basic SEO",
      "Fast, image-optimised build",
    ],
    tech: ["Next.js", "Static / CDN"],
    timeline: "1–3 weeks",
    addons: ["Blog / journal", "Store for prints", "Motion & interactions"],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    summary:
      "Trust-first design that fills the calendar — clear services, credentials, and easy booking.",
    recommend: { service: "web-dev", tier: "growth" },
    deliverables: [
      "Services & treatments pages",
      "Doctor / credential profiles",
      "Appointment booking",
      "Local & health SEO",
      "Privacy-conscious forms",
    ],
    tech: ["Next.js", "Booking integration", "Local SEO"],
    timeline: "3–5 weeks",
    addons: ["Patient portal", "Tele-consult", "Multi-clinic pages"],
  },
  {
    id: "education",
    label: "Education",
    summary:
      "Enrolments up, drop-off down — a site (or app) that markets the courses and keeps students.",
    recommend: { service: "app-dev", tier: "professional" },
    deliverables: [
      "Course catalog & landing pages",
      "Enrolment & payment flow",
      "Student area / LMS",
      "SEO for course intent",
      "Lifecycle campaigns",
    ],
    tech: ["Next.js", "React Native", "Payments"],
    timeline: "6–10 weeks",
    addons: ["Mobile app", "Live classes", "Certificates", "Community"],
  },
  {
    id: "realestate",
    label: "Real Estate",
    summary:
      "Listings that rank and convert — search-friendly pages plus the paid layer for high-intent buyers.",
    recommend: { service: "web-dev", tier: "startup" },
    deliverables: [
      "Property listing pages",
      "Search & filters",
      "City / budget landing pages",
      "Technical & local SEO",
      "Enquiry & lead routing",
    ],
    tech: ["Next.js", "Schema.org", "CRM integration"],
    timeline: "4–7 weeks",
    addons: ["Virtual tours", "Agent portal", "WhatsApp lead capture"],
  },
];

/**
 * Detailed per-level Social Media deliverables, shown as a breakdown table
 * beneath the SMM panel on /pricing. The panel gives the headline "what we
 * provide"; this shows exactly how much of each you get at every level.
 *
 * Rows are rendered by index across levels, so every level MUST list the same
 * deliverables in the same order (SMM_ROWS is the single source of truth); each
 * level supplies a positional value per row.
 */
export const SMM_ROWS = [
  "Platforms",
  "Feed posts",
  "Stories",
  "Reels",
  "Creatives",
  "Professional shoot",
  "Community mgmt",
  "Reporting",
  "Ad management",
] as const;

export const SMM_DELIVERABLES: Record<
  string,
  { label: string; values: string[] }
> = {
  // values are positional, aligned to SMM_ROWS above; keyed by the smm tier ids.
  starter: {
    label: "Essentials",
    values: ["2", "12 / month", "8 / month", "—", "Included", "—", "Basic", "Monthly", "Add-on"],
  },
  growth: {
    label: "Growth",
    values: ["3", "20 / month", "16 / month", "4 / month", "Included", "—", "Active", "Bi-weekly", "1 platform"],
  },
  advanced: {
    label: "Premium",
    values: ["4", "30 / month", "24 / month", "8 / month", "Included", "1 / month", "Full", "Weekly", "Multi-platform"],
  },
  enterprise: {
    label: "Brand Studio",
    values: ["All", "Daily", "Daily", "12+ / month", "Included", "2 / month", "Dedicated manager", "Weekly + reviews", "Full-funnel"],
  },
};
