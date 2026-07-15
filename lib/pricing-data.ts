/**
 * Shared pricing data for the multi-country /pricing page.
 *
 * - COUNTRIES: the 8 English-business markets shown in the selector.
 * - SERVICES: display content (tiers, features, copy) for every service.
 * - PRICES: numeric ranges keyed [serviceId][countryCode][tierId].
 *     • Website ranges originated from an earlier standalone website-pricing
 *       page and now live here as the single source of truth.
 *     • The 9 other services come from market research (see RESEARCH_META),
 *       normalised to realistic local-currency ranges (2024–2026).
 *
 * Prices are intentionally separated from copy so the numbers can be
 * refreshed without touching the UI — usable as a pricing-engine config.
 */

export type CountryCode = "IN" | "US" | "CA" | "GB" | "AU" | "NZ" | "SG" | "AE";

export interface Country {
  code: CountryCode;
  flag: string;
  label: string;
  currency: string;
  symbol: string;
  locale: string;
}

export const COUNTRIES: Country[] = [
  { code: "IN", flag: "🇮🇳", label: "India", currency: "INR", symbol: "₹", locale: "en-IN" },
  { code: "US", flag: "🇺🇸", label: "United States", currency: "USD", symbol: "$", locale: "en-US" },
  { code: "CA", flag: "🇨🇦", label: "Canada", currency: "CAD", symbol: "C$", locale: "en-CA" },
  { code: "GB", flag: "🇬🇧", label: "United Kingdom", currency: "GBP", symbol: "£", locale: "en-GB" },
  { code: "AU", flag: "🇦🇺", label: "Australia", currency: "AUD", symbol: "A$", locale: "en-AU" },
  { code: "NZ", flag: "🇳🇿", label: "New Zealand", currency: "NZD", symbol: "NZ$", locale: "en-NZ" },
  { code: "SG", flag: "🇸🇬", label: "Singapore", currency: "SGD", symbol: "S$", locale: "en-SG" },
  { code: "AE", flag: "🇦🇪", label: "UAE", currency: "AED", symbol: "AED ", locale: "en-AE" },
];

export type Basis = "monthly" | "one-time";

export interface Tier {
  id: string;
  tier: string; // short eyebrow label, e.g. "Growth"
  name: string; // descriptive package name
  target: string; // who it's for
  blurb: string;
  popular?: boolean;
  features: string[];
}

export interface Service {
  id: string;
  eyebrow: string;
  title: string;
  accent: string; // gradient-highlighted word(s) in the heading
  subtitle: string;
  icon: string; // lucide-react icon name
  basis: Basis;
  basisLabel: string; // caption under each price
  note?: string; // optional disclaimer (e.g. ad spend)
  tiers: Tier[];
}

export interface PriceRange {
  min: number;
  max: number;
  plus?: boolean; // render a trailing "+" on the max
}

/* ──────────────────────────────────────────────────────────────────────────
   SERVICE CONTENT
   ────────────────────────────────────────────────────────────────────────── */

const WEB_FEATURES = {
  launch: [
    "Up to 5 pages",
    "Conversion-first design",
    "Fully mobile responsive",
    "Basic SEO setup",
    "Contact & lead forms",
    "~2 week delivery",
  ],
  growth: [
    "Up to 12 custom pages",
    "Bespoke UI/UX design",
    "CMS for self-editing",
    "On-page SEO",
    "Analytics & tracking",
    "~3–4 week delivery",
  ],
  startup: [
    "Headless CMS",
    "Blog & dynamic content",
    "Third-party integrations",
    "Performance-tuned",
    "Scalable architecture",
    "Launch support",
  ],
  ecommerce: [
    "Product catalog & cart",
    "Secure payments",
    "Inventory management",
    "Conversion-optimized",
    "Marketing integrations",
    "Analytics dashboards",
  ],
  saas: [
    "Auth & user dashboards",
    "Database + APIs",
    "Subscriptions & billing",
    "Scalable cloud infra",
    "Admin & analytics",
    "Iterative roadmap",
  ],
};

export const SERVICES: Service[] = [
  /* 1 ── Website Development ─────────────────────────────────────────────── */
  {
    id: "web-dev",
    eyebrow: "Website Packages",
    title: "Professional",
    accent: "Websites",
    subtitle:
      "From static landing pages to full e-commerce platforms — fixed-scope and built to convert.",
    icon: "Globe",
    basis: "one-time",
    basisLabel: "Estimated project range",
    tiers: [
      { id: "launch", tier: "Launch", name: "Starter Business Website", target: "Local businesses", blurb: "A sharp, credible presence that turns searches into calls.", features: WEB_FEATURES.launch },
      { id: "growth", tier: "Growth", name: "Professional Website", target: "Service companies", popular: true, blurb: "A bespoke, CMS-powered site built to win bigger clients.", features: WEB_FEATURES.growth },
      { id: "startup", tier: "Startup Platform", name: "Startup Website + CMS", target: "Funded startups", blurb: "A scalable, content-rich platform ready to grow with you.", features: WEB_FEATURES.startup },
      { id: "ecommerce", tier: "Ecommerce Suite", name: "Ecommerce Store", target: "D2C brands", blurb: "A high-converting storefront engineered to sell at scale.", features: WEB_FEATURES.ecommerce },
      { id: "saas", tier: "SaaS MVP", name: "SaaS MVP", target: "Tech founders", blurb: "A production-ready MVP to validate and launch your product.", features: WEB_FEATURES.saas },
    ],
  },

  /* 2 ── Application Development ─────────────────────────────────────────── */
  {
    id: "app-dev",
    eyebrow: "App Development",
    title: "Web & Mobile",
    accent: "Apps",
    subtitle:
      "Custom web and mobile applications — from a validated MVP to an enterprise-grade platform.",
    icon: "Smartphone",
    basis: "one-time",
    basisLabel: "Estimated project range",
    tiers: [
      { id: "starter", tier: "Starter", name: "MVP App", target: "Early-stage founders", blurb: "A focused MVP on a single platform to validate your idea fast.", features: ["Web or mobile (one platform)", "Up to 5 core screens", "Auth & basic backend", "REST API integration", "App store / launch setup", "~4–6 week delivery"] },
      { id: "professional", tier: "Professional", name: "Cross-Platform App", target: "Growing businesses", popular: true, blurb: "A polished iOS + Android + web app from one shared codebase.", features: ["iOS + Android + web", "Up to 12 screens", "Custom UI/UX design", "Payments & push notifications", "Admin dashboard", "Analytics & tracking"] },
      { id: "advanced", tier: "Advanced", name: "Scalable Product", target: "Funded startups", blurb: "A scalable app with complex workflows and deep integrations.", features: ["Complex business logic", "Third-party integrations", "Real-time features", "Role-based access control", "CI/CD & cloud infra", "Performance-tuned"] },
      { id: "enterprise", tier: "Enterprise", name: "Enterprise Platform", target: "Enterprises", blurb: "A mission-critical platform built for scale and compliance.", features: ["Microservices architecture", "Enterprise SSO & security", "High availability & SLAs", "Dedicated delivery team", "Compliance (SOC 2 / GDPR)", "Ongoing roadmap"] },
    ],
  },

  /* 3 ── SEO / AI SEO / Performance Marketing ───────────────────────────── */
  {
    id: "seo",
    eyebrow: "SEO & Performance",
    title: "SEO &",
    accent: "AI SEO",
    subtitle:
      "Technical SEO, AI-assisted content and performance marketing that compounds organic growth.",
    icon: "Search",
    basis: "monthly",
    basisLabel: "Estimated monthly retainer",
    tiers: [
      { id: "starter", tier: "Starter", name: "Local SEO", target: "Local businesses", blurb: "Get found locally and turn searches into calls.", features: ["Keyword & competitor research", "On-page optimization (10 pages)", "Google Business Profile", "Technical SEO fixes", "Monthly reporting"] },
      { id: "growth", tier: "Growth", name: "Growth SEO", target: "Growing brands", popular: true, blurb: "Compounding organic growth across more keywords.", features: ["25–40 target keywords", "AI-assisted content (4 blogs/mo)", "On-page & off-page SEO", "Link building", "Conversion tracking"] },
      { id: "advanced", tier: "Advanced", name: "Performance SEO", target: "Competitive niches", blurb: "Aggressive growth with content and digital PR.", features: ["60+ keywords", "8 articles / month", "Digital PR & authority links", "CRO experiments", "Dedicated strategist"] },
      { id: "enterprise", tier: "Enterprise", name: "Enterprise SEO", target: "Large websites", blurb: "Programmatic and technical SEO at scale.", features: ["Programmatic / technical SEO at scale", "Multi-location / multi-domain", "Custom dashboards", "In-house content team", "Quarterly strategy"] },
    ],
  },

  /* 4 ── Ads Management ──────────────────────────────────────────────────── */
  {
    id: "ads",
    eyebrow: "Ads Management",
    title: "Google & Meta",
    accent: "Ads",
    subtitle:
      "Performance-driven paid media across Google and Meta, engineered for a lower cost per lead.",
    icon: "Target",
    basis: "monthly",
    basisLabel: "Monthly management fee",
    note: "Management fee only — ad spend is paid directly to Google / Meta through your own account.",
    tiers: [
      { id: "starter", tier: "Starter", name: "Single Channel", target: "Small budgets", blurb: "One platform, dialed in for qualified leads.", features: ["Google or Meta (1 platform)", "Campaign setup & structure", "Conversion tracking", "Monthly optimization", "Performance reporting"] },
      { id: "growth", tier: "Growth", name: "Multi-Channel", target: "Scaling brands", popular: true, blurb: "Google and Meta working together across the funnel.", features: ["Google + Meta Ads", "Creative & copy testing", "Audiences & retargeting", "Landing page guidance", "Bi-weekly optimization"] },
      { id: "advanced", tier: "Advanced", name: "Full-Funnel", target: "High spenders", blurb: "Full-funnel paid media across every channel.", features: ["Search, Social, Display, Video", "Advanced audience strategy", "Shopping / feed ads", "A/B creative pipeline", "Weekly optimization"] },
      { id: "enterprise", tier: "Enterprise", name: "Performance Partner", target: "Enterprises", blurb: "A dedicated paid-media team as an extension of yours.", features: ["Omni-channel management", "Dedicated media buyer", "Custom attribution modelling", "Daily monitoring", "Quarterly planning"] },
    ],
  },

  /* 5 ── Social Media Management (SMM) ───────────────────────────────────── */
  {
    id: "smm",
    eyebrow: "Social Media (SMM)",
    title: "Social Media",
    accent: "Management",
    subtitle:
      "Always-on content, posting and community management that grows an engaged audience.",
    icon: "Share2",
    basis: "monthly",
    basisLabel: "Estimated monthly retainer",
    tiers: [
      { id: "starter", tier: "Starter", name: "Essentials", target: "Small businesses", blurb: "A consistent, on-brand presence on your core channels.", features: ["2 platforms", "12 posts / month", "Content calendar", "Basic engagement", "Monthly report"] },
      { id: "growth", tier: "Growth", name: "Growth", target: "Growing brands", popular: true, blurb: "More content, more engagement, more reach.", features: ["3 platforms", "20 posts + 4 reels / month", "Community management", "Hashtag & social SEO", "Analytics & insights"] },
      { id: "advanced", tier: "Advanced", name: "Premium", target: "Established brands", blurb: "A full content engine with video and UGC.", features: ["4 platforms", "30 posts + 8 reels / month", "Influencer coordination", "UGC & video editing", "Growth strategy"] },
      { id: "enterprise", tier: "Enterprise", name: "Brand Studio", target: "Enterprises", blurb: "A dedicated social team and content studio.", features: ["All platforms", "Daily posting", "Dedicated social manager", "Photo / video shoots", "Reputation management"] },
    ],
  },

  /* 6 ── Social Media Optimization (SMO) ─────────────────────────────────── */
  {
    id: "smo",
    eyebrow: "Social Optimization (SMO)",
    title: "Social Media",
    accent: "Optimization",
    subtitle:
      "Optimize your profiles and grow organic reach, followers and engagement.",
    icon: "ThumbsUp",
    basis: "monthly",
    basisLabel: "Estimated monthly retainer",
    tiers: [
      { id: "starter", tier: "Starter", name: "Profile Optimization", target: "New pages", blurb: "Set up and optimize your profiles to convert.", features: ["Profile setup & optimization", "Cover & profile design", "Bio & CTA optimization", "Hashtag strategy", "15 optimized posts"] },
      { id: "growth", tier: "Growth", name: "Engagement Boost", target: "Growing pages", popular: true, blurb: "Optimize and grow engagement organically.", features: ["30 optimized posts", "Engagement & group sharing", "Best-time posting", "Comment & DM responses", "Monthly insights"] },
      { id: "advanced", tier: "Advanced", name: "Organic Growth", target: "Active brands", blurb: "Maximize organic reach and follower growth.", features: ["60 optimized posts", "Reels / Shorts optimization", "Community building", "A/B content testing", "Growth reporting"] },
      { id: "enterprise", tier: "Enterprise", name: "Authority Builder", target: "Enterprises", blurb: "Build authority across every channel.", features: ["Multi-platform optimization", "Dedicated specialist", "Thought-leadership content", "Advanced analytics", "Quarterly strategy"] },
    ],
  },

  /* 7 ── AI Agent Development ────────────────────────────────────────────── */
  {
    id: "ai-agents",
    eyebrow: "AI Agents",
    title: "AI Agents &",
    accent: "Agentic Workflows",
    subtitle:
      "Custom AI agents that take real actions — handling support, research and operations end to end.",
    icon: "Bot",
    basis: "one-time",
    basisLabel: "Estimated build cost",
    tiers: [
      { id: "starter", tier: "Starter", name: "Single Agent", target: "First AI use case", blurb: "One focused agent that automates a real task.", features: ["1 use case (support / research / ops)", "Single LLM provider", "Basic tool & API integration", "Guardrails & testing", "Deployment"] },
      { id: "professional", tier: "Professional", name: "Agentic Workflow", target: "Operations teams", popular: true, blurb: "A multi-step agent that runs an end-to-end workflow.", features: ["Multi-step agentic workflow", "3–5 tool integrations", "Memory & context handling", "Human-in-the-loop controls", "Monitoring & logs"] },
      { id: "advanced", tier: "Advanced", name: "Multi-Agent System", target: "Complex operations", blurb: "Orchestrated multi-agent system over your data.", features: ["Multiple coordinated agents", "RAG over your knowledge", "Complex tool orchestration", "Evals & observability", "Scalable infrastructure"] },
      { id: "enterprise", tier: "Enterprise", name: "Agent Platform", target: "Enterprises", blurb: "A governed agent platform for the whole org.", features: ["Org-wide agent platform", "SSO, security & governance", "Custom integrations", "SLAs & support", "Dedicated team"] },
    ],
  },

  /* 8 ── LLM Integration ─────────────────────────────────────────────────── */
  {
    id: "llm",
    eyebrow: "LLM Integration",
    title: "LLM",
    accent: "Integration",
    subtitle:
      "Bring large language models into your product — chat, RAG and AI features that ship.",
    icon: "BrainCircuit",
    basis: "one-time",
    basisLabel: "Estimated build cost",
    tiers: [
      { id: "starter", tier: "Starter", name: "Quick Integration", target: "Simple features", blurb: "Add a single LLM feature to your product.", features: ["One feature (chat / summarize)", "API integration", "Prompt engineering", "Basic guardrails", "Deployment"] },
      { id: "professional", tier: "Professional", name: "RAG Integration", target: "Knowledge apps", popular: true, blurb: "Chat over your own data with retrieval (RAG).", features: ["RAG pipeline", "Vector database setup", "Document ingestion", "Citations & guardrails", "Usage analytics"] },
      { id: "advanced", tier: "Advanced", name: "Custom AI Feature", target: "Product teams", blurb: "Production-grade AI features with evals.", features: ["Multi-feature integration", "Fine-tuned prompts / models", "Evals & quality monitoring", "Cost optimization", "Scalable backend"] },
      { id: "enterprise", tier: "Enterprise", name: "Enterprise LLM", target: "Enterprises", blurb: "A secure, governed LLM platform.", features: ["Private / secure deployment", "SSO & data governance", "Multi-model routing", "Compliance", "Dedicated support"] },
    ],
  },

  /* 9 ── AI Automation ───────────────────────────────────────────────────── */
  {
    id: "ai-automation",
    eyebrow: "AI Automation",
    title: "AI",
    accent: "Automation",
    subtitle:
      "Replace manual, repetitive work with dependable automations that connect your tools.",
    icon: "Zap",
    basis: "one-time",
    basisLabel: "Estimated build cost",
    tiers: [
      { id: "starter", tier: "Starter", name: "Workflow Automation", target: "Small teams", blurb: "Automate one repetitive workflow start to finish.", features: ["1 workflow automated", "2–3 app integrations", "Trigger & action setup", "Error handling", "Documentation"] },
      { id: "professional", tier: "Professional", name: "Connected Ops", target: "Growing teams", popular: true, blurb: "Connect your tools and automate across them.", features: ["Up to 5 workflows", "CRM / email / sheets integrations", "AI-assisted steps", "Notifications & logging", "Monitoring"] },
      { id: "advanced", tier: "Advanced", name: "Process Automation", target: "Operations", blurb: "End-to-end automation of complex processes.", features: ["Complex multi-step processes", "Custom API integrations", "Data pipelines", "Dashboards", "Maintenance & support"] },
      { id: "enterprise", tier: "Enterprise", name: "Automation Suite", target: "Enterprises", blurb: "Org-wide automation with governance.", features: ["Org-wide automations", "Dedicated build team", "Security & compliance", "SLAs", "Ongoing optimization"] },
    ],
  },

  /* 10 ── Custom Model Training ──────────────────────────────────────────── */
  {
    id: "model-training",
    eyebrow: "Custom Models",
    title: "Custom Model",
    accent: "Training",
    subtitle:
      "Fine-tune and train models on your own data — from a focused fine-tune to a full ML platform.",
    icon: "Cpu",
    basis: "one-time",
    basisLabel: "Estimated project cost",
    tiers: [
      { id: "starter", tier: "Starter", name: "Fine-Tune", target: "A focused task", blurb: "Fine-tune a base model on your data.", features: ["Dataset prep (small)", "Fine-tune open / base model", "Evaluation", "Deployment endpoint", "Documentation"] },
      { id: "professional", tier: "Professional", name: "Custom Model", target: "Specialized needs", popular: true, blurb: "A custom-trained model for your domain.", features: ["Data labeling & curation", "Fine-tuning + eval suite", "Hyperparameter tuning", "Serving infrastructure", "Monitoring"] },
      { id: "advanced", tier: "Advanced", name: "Domain Model", target: "Data-rich orgs", blurb: "A robust, domain-specific model.", features: ["Large dataset pipeline", "Advanced training (LoRA / RLHF)", "Rigorous evals", "Scalable inference", "MLOps setup"] },
      { id: "enterprise", tier: "Enterprise", name: "ML Platform", target: "Enterprises", blurb: "An end-to-end ML platform and team.", features: ["Custom architecture", "Dedicated ML team", "Private infrastructure", "Compliance & governance", "Ongoing retraining"] },
    ],
  },

  /* 11 ── Logo & Graphic Design ──────────────────────────────────────────── */
  {
    id: "design",
    eyebrow: "Design",
    title: "Logo & Graphic",
    accent: "Design",
    subtitle:
      "A memorable brand identity — from a sharp logo to a full visual system your business can grow into.",
    icon: "Palette",
    basis: "one-time",
    basisLabel: "Estimated project cost",
    tiers: [
      { id: "starter", tier: "Logo", name: "Logo Design", target: "New businesses", blurb: "A distinctive logo with the essentials to launch.", features: ["3 logo concepts", "2 revision rounds", "Colour & font pairing", "PNG / SVG / vector files", "Social avatar & favicon"] },
      { id: "growth", tier: "Identity", name: "Brand Identity", target: "Growing brands", popular: true, blurb: "A cohesive identity system, not just a mark.", features: ["Logo + variations", "Full colour & type system", "Brand guidelines PDF", "Business card & letterhead", "Social media kit"] },
      { id: "advanced", tier: "Brand System", name: "Complete Brand", target: "Funded / scaling", blurb: "Everything you need to look established everywhere.", features: ["Complete visual identity", "Iconography & illustration style", "Marketing collateral set", "Pitch / deck template", "Packaging or signage (as needed)"] },
      { id: "enterprise", tier: "Studio", name: "Brand + Content Studio", target: "Enterprises", blurb: "An ongoing design partner for every asset.", features: ["Rebrand or identity refresh", "Dedicated designer retainer", "On-demand creatives", "Motion & video graphics", "Brand governance"] },
    ],
  },

  /* 12 ── Artificial Intelligence (umbrella) ─────────────────────────────── */
  {
    id: "ai",
    eyebrow: "AI",
    title: "Artificial",
    accent: "Intelligence",
    subtitle:
      "AI woven into your product and operations — assistants, automation and custom models, built to your goals.",
    icon: "Sparkles",
    basis: "one-time",
    basisLabel: "Estimated build cost",
    tiers: [
      { id: "starter", tier: "Integrate", name: "AI Integration", target: "First AI feature", blurb: "Add a genuinely useful AI feature to what you have.", features: ["1 AI feature (chat / search / summarise)", "LLM provider integration", "Prompt & guardrail design", "In-product deployment", "Usage monitoring"] },
      { id: "professional", tier: "Automate", name: "AI Assistant & Automation", target: "Operations teams", popular: true, blurb: "An assistant that runs a real workflow end to end.", features: ["Multi-step agentic workflow", "3–5 tool / API integrations", "RAG over your knowledge", "Human-in-the-loop controls", "Monitoring & logs"] },
      { id: "advanced", tier: "Scale", name: "Multi-Agent System", target: "Complex operations", blurb: "Coordinated agents and a fine-tuned model on your data.", features: ["Orchestrated multi-agent system", "Custom / fine-tuned model", "Evals & observability", "Scalable inference infra", "MLOps setup"] },
      { id: "enterprise", tier: "Platform", name: "AI Platform", target: "Enterprises", blurb: "A governed AI platform for the whole organisation.", features: ["Org-wide AI platform", "SSO, security & governance", "Custom integrations", "SLAs & dedicated team", "Ongoing optimisation"] },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   SERVICE_INFO — the concise "what we provide" summary shown on /pricing.

   The pricing page presents each service as one informational panel (not a
   grid of tier cards): a short list of what the engagement includes plus a
   realistic timeline. The "starting from" price is still composed live from
   PRICES (the entry tier), so this stays purely descriptive — no numbers here.
   Each `provides` list is distilled from the service's own tier features, kept
   service-level and brief.
   ────────────────────────────────────────────────────────────────────────── */
export interface ServiceInfo {
  provides: string[];
  timeline: string;
}

export const SERVICE_INFO: Record<string, ServiceInfo> = {
  "web-dev": {
    provides: [
      "Conversion-first design & UX",
      "Fully mobile-responsive build",
      "CMS to edit it yourself",
      "On-page SEO & analytics",
      "Lead capture & contact forms",
    ],
    // Spans a ~2-week landing site up to an e-commerce store / SaaS MVP build.
    timeline: "2–8 weeks",
  },
  "app-dev": {
    provides: [
      "iOS, Android & web from one codebase",
      "Custom UI/UX design",
      "Auth, payments & push notifications",
      "Admin dashboard & APIs",
      "Analytics & app-store launch",
    ],
    timeline: "4–10 weeks",
  },
  seo: {
    provides: [
      "Keyword & competitor research",
      "On-page & technical SEO",
      "AI-assisted content & blogs",
      "Link building & digital PR",
      "Monthly reporting",
    ],
    timeline: "Ongoing · monthly",
  },
  ads: {
    provides: [
      "Google & Meta campaign setup",
      "Creative & copy testing",
      "Audiences & retargeting",
      "Conversion tracking",
      "Ongoing optimization & reports",
    ],
    timeline: "Ongoing · monthly",
  },
  smm: {
    provides: [
      "Content calendar & scheduling",
      "Feed posts, reels & stories",
      "Community management",
      "Photo / video creatives",
      "Analytics & reporting",
    ],
    timeline: "Ongoing · monthly",
  },
  smo: {
    provides: [
      "Profile setup & optimization",
      "Optimized, on-brand posts",
      "Engagement & community growth",
      "Reels / Shorts optimization",
      "Growth reporting",
    ],
    timeline: "Ongoing · monthly",
  },
  "ai-agents": {
    provides: [
      "Custom AI agents for real tasks",
      "Tool & API integrations",
      "Memory & context handling",
      "Human-in-the-loop controls",
      "Monitoring & guardrails",
    ],
    timeline: "2–8 weeks",
  },
  llm: {
    provides: [
      "LLM features inside your product",
      "RAG over your own data",
      "Prompt engineering & guardrails",
      "Vector database setup",
      "Usage analytics",
    ],
    timeline: "1–6 weeks",
  },
  "ai-automation": {
    provides: [
      "Automate repetitive workflows",
      "Connect your existing tools",
      "AI-assisted steps",
      "Data pipelines & dashboards",
      "Monitoring & support",
    ],
    timeline: "1–6 weeks",
  },
  "model-training": {
    provides: [
      "Dataset prep & labeling",
      "Fine-tuning & evaluation",
      "Serving infrastructure",
      "Quality & cost monitoring",
      "MLOps setup",
    ],
    timeline: "3–10 weeks",
  },
  design: {
    provides: [
      "Logo & visual identity",
      "Colour & type system",
      "Brand guidelines",
      "Marketing & social collateral",
      "Source & vector files",
    ],
    timeline: "1–3 weeks",
  },
  ai: {
    provides: [
      "Useful AI features in your product",
      "Assistants & agentic workflows",
      "RAG over your knowledge",
      "Custom / fine-tuned models",
      "Deployment & monitoring",
    ],
    timeline: "2–8 weeks",
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   PRICES — [serviceId][countryCode][tierId] = { min, max, plus? }
   ────────────────────────────────────────────────────────────────────────── */

export const PRICES: Record<
  string,
  Partial<Record<CountryCode, Record<string, PriceRange>>>
> = {
  "web-dev": {
    IN: { launch: { min: 15000, max: 50000 }, growth: { min: 50000, max: 150000 }, startup: { min: 100000, max: 300000 }, ecommerce: { min: 150000, max: 800000 }, saas: { min: 500000, max: 3000000, plus: true } },
    US: { launch: { min: 3000, max: 8000 }, growth: { min: 8000, max: 25000 }, startup: { min: 15000, max: 40000 }, ecommerce: { min: 25000, max: 100000, plus: true }, saas: { min: 50000, max: 250000, plus: true } },
    CA: { launch: { min: 1500, max: 3500 }, growth: { min: 4000, max: 8000 }, startup: { min: 8000, max: 20000 }, ecommerce: { min: 6000, max: 30000, plus: true }, saas: { min: 25000, max: 150000, plus: true } },
    GB: { launch: { min: 2000, max: 5000 }, growth: { min: 5000, max: 15000 }, startup: { min: 10000, max: 30000 }, ecommerce: { min: 15000, max: 80000 }, saas: { min: 40000, max: 200000, plus: true } },
    AU: { launch: { min: 3000, max: 7000 }, growth: { min: 7000, max: 20000 }, startup: { min: 15000, max: 40000 }, ecommerce: { min: 20000, max: 100000 }, saas: { min: 50000, max: 250000, plus: true } },
    NZ: { launch: { min: 2500, max: 6000 }, growth: { min: 6000, max: 15000 }, startup: { min: 12000, max: 35000 }, ecommerce: { min: 15000, max: 80000 }, saas: { min: 40000, max: 200000, plus: true } },
    SG: { launch: { min: 2000, max: 5000 }, growth: { min: 5000, max: 15000 }, startup: { min: 10000, max: 35000 }, ecommerce: { min: 15000, max: 100000 }, saas: { min: 40000, max: 250000, plus: true } },
    AE: { launch: { min: 4500, max: 12000 }, growth: { min: 8000, max: 25000 }, startup: { min: 20000, max: 60000 }, ecommerce: { min: 18000, max: 80000 }, saas: { min: 50000, max: 300000, plus: true } },
  },

  "app-dev": {
    IN: { starter: { min: 150000, max: 400000 }, professional: { min: 400000, max: 1200000 }, advanced: { min: 1200000, max: 5000000 }, enterprise: { min: 5000000, max: 20000000 } },
    US: { starter: { min: 20000, max: 50000 }, professional: { min: 50000, max: 150000 }, advanced: { min: 150000, max: 300000 }, enterprise: { min: 300000, max: 750000 } },
    CA: { starter: { min: 15000, max: 75000 }, professional: { min: 75000, max: 200000 }, advanced: { min: 200000, max: 540000 }, enterprise: { min: 540000, max: 950000 } },
    GB: { starter: { min: 15000, max: 35000 }, professional: { min: 35000, max: 80000 }, advanced: { min: 80000, max: 250000 }, enterprise: { min: 250000, max: 500000 } },
    AU: { starter: { min: 30000, max: 100000 }, professional: { min: 100000, max: 250000 }, advanced: { min: 250000, max: 500000 }, enterprise: { min: 500000, max: 900000 } },
    NZ: { starter: { min: 25000, max: 45000 }, professional: { min: 45000, max: 90000 }, advanced: { min: 90000, max: 200000 }, enterprise: { min: 200000, max: 400000 } },
    SG: { starter: { min: 15000, max: 30000 }, professional: { min: 30000, max: 80000 }, advanced: { min: 80000, max: 150000 }, enterprise: { min: 150000, max: 400000 } },
    AE: { starter: { min: 25000, max: 60000 }, professional: { min: 60000, max: 150000 }, advanced: { min: 150000, max: 350000 }, enterprise: { min: 350000, max: 800000 } },
  },

  seo: {
    IN: { starter: { min: 8000, max: 25000 }, growth: { min: 25000, max: 60000 }, advanced: { min: 60000, max: 150000 }, enterprise: { min: 150000, max: 500000 } },
    US: { starter: { min: 700, max: 1500 }, growth: { min: 1500, max: 3500 }, advanced: { min: 3500, max: 7500 }, enterprise: { min: 7500, max: 20000 } },
    CA: { starter: { min: 800, max: 2000 }, growth: { min: 2000, max: 5000 }, advanced: { min: 5000, max: 10000 }, enterprise: { min: 10000, max: 20000 } },
    GB: { starter: { min: 500, max: 1200 }, growth: { min: 1200, max: 3000 }, advanced: { min: 3000, max: 6000 }, enterprise: { min: 6000, max: 20000 } },
    AU: { starter: { min: 1500, max: 3000 }, growth: { min: 3000, max: 5000 }, advanced: { min: 5000, max: 8000 }, enterprise: { min: 8000, max: 20000 } },
    NZ: { starter: { min: 1000, max: 2500 }, growth: { min: 2500, max: 6000 }, advanced: { min: 6000, max: 10000 }, enterprise: { min: 10000, max: 25000 } },
    SG: { starter: { min: 800, max: 1500 }, growth: { min: 1500, max: 3500 }, advanced: { min: 3500, max: 6000 }, enterprise: { min: 6000, max: 20000 } },
    AE: { starter: { min: 2500, max: 6000 }, growth: { min: 6000, max: 10000 }, advanced: { min: 10000, max: 18000 }, enterprise: { min: 18000, max: 40000 } },
  },

  ads: {
    IN: { starter: { min: 8000, max: 20000 }, growth: { min: 20000, max: 60000 }, advanced: { min: 60000, max: 150000 }, enterprise: { min: 150000, max: 400000 } },
    US: { starter: { min: 750, max: 1500 }, growth: { min: 1500, max: 3500 }, advanced: { min: 3500, max: 7500 }, enterprise: { min: 7500, max: 20000 } },
    CA: { starter: { min: 800, max: 1500 }, growth: { min: 1500, max: 3000 }, advanced: { min: 3000, max: 6000 }, enterprise: { min: 6000, max: 15000 } },
    GB: { starter: { min: 500, max: 1000 }, growth: { min: 1000, max: 2500 }, advanced: { min: 2500, max: 5000 }, enterprise: { min: 5000, max: 12000 } },
    AU: { starter: { min: 800, max: 1500 }, growth: { min: 1500, max: 3500 }, advanced: { min: 3500, max: 7000 }, enterprise: { min: 7000, max: 15000 } },
    NZ: { starter: { min: 750, max: 1500 }, growth: { min: 1500, max: 3500 }, advanced: { min: 3500, max: 7500 }, enterprise: { min: 7500, max: 18000 } },
    SG: { starter: { min: 1000, max: 2500 }, growth: { min: 2500, max: 5000 }, advanced: { min: 5000, max: 9000 }, enterprise: { min: 9000, max: 20000 } },
    AE: { starter: { min: 2500, max: 6000 }, growth: { min: 6000, max: 12000 }, advanced: { min: 12000, max: 22000 }, enterprise: { min: 22000, max: 55000 } },
  },

  smm: {
    IN: { starter: { min: 10000, max: 30000 }, growth: { min: 35000, max: 80000 }, advanced: { min: 80000, max: 250000 }, enterprise: { min: 250000, max: 500000 } },
    US: { starter: { min: 500, max: 1500 }, growth: { min: 1500, max: 5000 }, advanced: { min: 5000, max: 10000 }, enterprise: { min: 10000, max: 25000 } },
    CA: { starter: { min: 500, max: 1500 }, growth: { min: 1500, max: 5000 }, advanced: { min: 5000, max: 10000 }, enterprise: { min: 10000, max: 20000 } },
    GB: { starter: { min: 250, max: 600 }, growth: { min: 600, max: 1500 }, advanced: { min: 1500, max: 5000 }, enterprise: { min: 5000, max: 10000 } },
    AU: { starter: { min: 500, max: 2000 }, growth: { min: 2000, max: 5000 }, advanced: { min: 5000, max: 15000 }, enterprise: { min: 15000, max: 30000 } },
    NZ: { starter: { min: 800, max: 2500 }, growth: { min: 2500, max: 6000 }, advanced: { min: 6000, max: 15000 }, enterprise: { min: 15000, max: 30000 } },
    SG: { starter: { min: 500, max: 1500 }, growth: { min: 1500, max: 3500 }, advanced: { min: 3500, max: 8000 }, enterprise: { min: 8000, max: 20000 } },
    AE: { starter: { min: 3000, max: 6000 }, growth: { min: 6000, max: 12000 }, advanced: { min: 12000, max: 25000 }, enterprise: { min: 25000, max: 50000 } },
  },

  smo: {
    IN: { starter: { min: 10000, max: 25000 }, growth: { min: 25000, max: 50000 }, advanced: { min: 50000, max: 100000 }, enterprise: { min: 100000, max: 200000 } },
    US: { starter: { min: 500, max: 1500 }, growth: { min: 1500, max: 4000 }, advanced: { min: 4000, max: 10000 }, enterprise: { min: 10000, max: 20000 } },
    CA: { starter: { min: 500, max: 1500 }, growth: { min: 1500, max: 5000 }, advanced: { min: 5000, max: 12000 }, enterprise: { min: 12000, max: 20000 } },
    GB: { starter: { min: 300, max: 800 }, growth: { min: 800, max: 2000 }, advanced: { min: 2000, max: 5000 }, enterprise: { min: 5000, max: 10000 } },
    AU: { starter: { min: 1500, max: 3000 }, growth: { min: 3000, max: 6000 }, advanced: { min: 6000, max: 12000 }, enterprise: { min: 12000, max: 25000 } },
    NZ: { starter: { min: 1000, max: 2500 }, growth: { min: 2500, max: 5000 }, advanced: { min: 5000, max: 10000 }, enterprise: { min: 10000, max: 20000 } },
    SG: { starter: { min: 1500, max: 3000 }, growth: { min: 3000, max: 8000 }, advanced: { min: 8000, max: 15000 }, enterprise: { min: 15000, max: 30000 } },
    AE: { starter: { min: 3000, max: 6000 }, growth: { min: 6000, max: 12000 }, advanced: { min: 12000, max: 20000 }, enterprise: { min: 20000, max: 35000 } },
  },

  "ai-agents": {
    IN: { starter: { min: 800000, max: 2000000 }, professional: { min: 2000000, max: 5000000 }, advanced: { min: 5000000, max: 10000000 }, enterprise: { min: 10000000, max: 20000000 } },
    US: { starter: { min: 10000, max: 50000 }, professional: { min: 50000, max: 120000 }, advanced: { min: 120000, max: 250000 }, enterprise: { min: 250000, max: 500000 } },
    CA: { starter: { min: 10000, max: 55000 }, professional: { min: 55000, max: 130000 }, advanced: { min: 130000, max: 270000 }, enterprise: { min: 270000, max: 550000 } },
    GB: { starter: { min: 8000, max: 10000 }, professional: { min: 10000, max: 40000 }, advanced: { min: 40000, max: 100000 }, enterprise: { min: 100000, max: 250000 } },
    AU: { starter: { min: 15000, max: 60000 }, professional: { min: 60000, max: 150000 }, advanced: { min: 150000, max: 350000 }, enterprise: { min: 350000, max: 750000 } },
    NZ: { starter: { min: 20000, max: 70000 }, professional: { min: 70000, max: 170000 }, advanced: { min: 170000, max: 380000 }, enterprise: { min: 380000, max: 800000 } },
    SG: { starter: { min: 20000, max: 60000 }, professional: { min: 60000, max: 130000 }, advanced: { min: 130000, max: 250000 }, enterprise: { min: 250000, max: 500000 } },
    AE: { starter: { min: 20000, max: 75000 }, professional: { min: 75000, max: 200000 }, advanced: { min: 200000, max: 500000 }, enterprise: { min: 500000, max: 1200000 } },
  },

  llm: {
    IN: { starter: { min: 200000, max: 600000 }, professional: { min: 600000, max: 1500000 }, advanced: { min: 1500000, max: 4000000 }, enterprise: { min: 4000000, max: 10000000 } },
    US: { starter: { min: 15000, max: 40000 }, professional: { min: 40000, max: 120000 }, advanced: { min: 120000, max: 250000 }, enterprise: { min: 250000, max: 500000 } },
    CA: { starter: { min: 15000, max: 65000 }, professional: { min: 65000, max: 175000 }, advanced: { min: 175000, max: 350000 }, enterprise: { min: 350000, max: 750000 } },
    GB: { starter: { min: 15000, max: 45000 }, professional: { min: 45000, max: 100000 }, advanced: { min: 100000, max: 200000 }, enterprise: { min: 200000, max: 400000 } },
    AU: { starter: { min: 20000, max: 60000 }, professional: { min: 60000, max: 150000 }, advanced: { min: 150000, max: 350000 }, enterprise: { min: 350000, max: 750000 } },
    NZ: { starter: { min: 25000, max: 65000 }, professional: { min: 65000, max: 170000 }, advanced: { min: 170000, max: 350000 }, enterprise: { min: 350000, max: 750000 } },
    SG: { starter: { min: 10000, max: 30000 }, professional: { min: 30000, max: 70000 }, advanced: { min: 70000, max: 150000 }, enterprise: { min: 150000, max: 300000 } },
    AE: { starter: { min: 20000, max: 75000 }, professional: { min: 75000, max: 200000 }, advanced: { min: 200000, max: 500000 }, enterprise: { min: 500000, max: 1200000 } },
  },

  "ai-automation": {
    IN: { starter: { min: 50000, max: 200000 }, professional: { min: 200000, max: 600000 }, advanced: { min: 600000, max: 1500000 }, enterprise: { min: 1500000, max: 5000000 } },
    US: { starter: { min: 5000, max: 15000 }, professional: { min: 15000, max: 80000 }, advanced: { min: 80000, max: 250000 }, enterprise: { min: 250000, max: 1000000 } },
    CA: { starter: { min: 3000, max: 10000 }, professional: { min: 10000, max: 50000 }, advanced: { min: 50000, max: 150000 }, enterprise: { min: 150000, max: 500000 } },
    GB: { starter: { min: 3000, max: 10000 }, professional: { min: 10000, max: 30000 }, advanced: { min: 30000, max: 100000 }, enterprise: { min: 100000, max: 400000 } },
    AU: { starter: { min: 3000, max: 10000 }, professional: { min: 10000, max: 35000 }, advanced: { min: 35000, max: 120000 }, enterprise: { min: 120000, max: 500000 } },
    NZ: { starter: { min: 3000, max: 10000 }, professional: { min: 10000, max: 40000 }, advanced: { min: 40000, max: 150000 }, enterprise: { min: 150000, max: 600000 } },
    SG: { starter: { min: 8000, max: 20000 }, professional: { min: 20000, max: 80000 }, advanced: { min: 80000, max: 200000 }, enterprise: { min: 200000, max: 700000 } },
    AE: { starter: { min: 10000, max: 30000 }, professional: { min: 30000, max: 100000 }, advanced: { min: 100000, max: 300000 }, enterprise: { min: 300000, max: 1000000 } },
  },

  "model-training": {
    IN: { starter: { min: 200000, max: 500000 }, professional: { min: 500000, max: 1500000 }, advanced: { min: 1500000, max: 5000000 }, enterprise: { min: 5000000, max: 15000000 } },
    US: { starter: { min: 5000, max: 25000 }, professional: { min: 50000, max: 200000 }, advanced: { min: 200000, max: 500000 }, enterprise: { min: 500000, max: 2000000 } },
    CA: { starter: { min: 7000, max: 30000 }, professional: { min: 65000, max: 250000 }, advanced: { min: 250000, max: 650000 }, enterprise: { min: 650000, max: 2500000 } },
    GB: { starter: { min: 5000, max: 20000 }, professional: { min: 40000, max: 150000 }, advanced: { min: 150000, max: 400000 }, enterprise: { min: 400000, max: 1500000 } },
    AU: { starter: { min: 8000, max: 35000 }, professional: { min: 60000, max: 250000 }, advanced: { min: 250000, max: 600000 }, enterprise: { min: 600000, max: 2000000 } },
    NZ: { starter: { min: 10000, max: 40000 }, professional: { min: 65000, max: 275000 }, advanced: { min: 275000, max: 650000 }, enterprise: { min: 650000, max: 2200000 } },
    SG: { starter: { min: 10000, max: 50000 }, professional: { min: 60000, max: 250000 }, advanced: { min: 250000, max: 600000 }, enterprise: { min: 600000, max: 2000000 } },
    AE: { starter: { min: 20000, max: 90000 }, professional: { min: 150000, max: 600000 }, advanced: { min: 600000, max: 1500000 }, enterprise: { min: 1500000, max: 5500000 } },
  },

  // Logo & graphic design — smaller-ticket creative work; researched 2026 ranges.
  design: {
    IN: { starter: { min: 8000, max: 25000 }, growth: { min: 25000, max: 75000 }, advanced: { min: 75000, max: 200000 }, enterprise: { min: 200000, max: 600000 } },
    US: { starter: { min: 300, max: 1200 }, growth: { min: 1200, max: 4000 }, advanced: { min: 4000, max: 10000 }, enterprise: { min: 10000, max: 30000 } },
    CA: { starter: { min: 400, max: 1500 }, growth: { min: 1500, max: 5000 }, advanced: { min: 5000, max: 12000 }, enterprise: { min: 12000, max: 35000 } },
    GB: { starter: { min: 250, max: 1000 }, growth: { min: 1000, max: 3500 }, advanced: { min: 3500, max: 9000 }, enterprise: { min: 9000, max: 25000 } },
    AU: { starter: { min: 400, max: 1500 }, growth: { min: 1500, max: 5000 }, advanced: { min: 5000, max: 12000 }, enterprise: { min: 12000, max: 35000 } },
    NZ: { starter: { min: 400, max: 1600 }, growth: { min: 1600, max: 5500 }, advanced: { min: 5500, max: 13000 }, enterprise: { min: 13000, max: 38000 } },
    SG: { starter: { min: 400, max: 1500 }, growth: { min: 1500, max: 5000 }, advanced: { min: 5000, max: 12000 }, enterprise: { min: 12000, max: 35000 } },
    AE: { starter: { min: 1000, max: 4000 }, growth: { min: 4000, max: 12000 }, advanced: { min: 12000, max: 30000 }, enterprise: { min: 30000, max: 90000 } },
  },

  // Artificial Intelligence (umbrella) — starts lower than ai-agents because a
  // first AI feature is more accessible than a full agentic build.
  ai: {
    IN: { starter: { min: 150000, max: 500000 }, professional: { min: 500000, max: 2000000 }, advanced: { min: 2000000, max: 6000000 }, enterprise: { min: 6000000, max: 20000000, plus: true } },
    US: { starter: { min: 5000, max: 20000 }, professional: { min: 20000, max: 75000 }, advanced: { min: 75000, max: 200000 }, enterprise: { min: 200000, max: 500000, plus: true } },
    CA: { starter: { min: 6000, max: 25000 }, professional: { min: 25000, max: 90000 }, advanced: { min: 90000, max: 240000 }, enterprise: { min: 240000, max: 600000, plus: true } },
    GB: { starter: { min: 4000, max: 16000 }, professional: { min: 16000, max: 60000 }, advanced: { min: 60000, max: 160000 }, enterprise: { min: 160000, max: 450000, plus: true } },
    AU: { starter: { min: 7000, max: 28000 }, professional: { min: 28000, max: 100000 }, advanced: { min: 100000, max: 280000 }, enterprise: { min: 280000, max: 700000, plus: true } },
    NZ: { starter: { min: 8000, max: 30000 }, professional: { min: 30000, max: 110000 }, advanced: { min: 110000, max: 300000 }, enterprise: { min: 300000, max: 750000, plus: true } },
    SG: { starter: { min: 7000, max: 26000 }, professional: { min: 26000, max: 95000 }, advanced: { min: 95000, max: 250000 }, enterprise: { min: 250000, max: 600000, plus: true } },
    AE: { starter: { min: 9000, max: 35000 }, professional: { min: 35000, max: 130000 }, advanced: { min: 130000, max: 350000 }, enterprise: { min: 350000, max: 900000, plus: true } },
  },
};

export const RESEARCH_META = {
  last_updated: "2026-06",
  confidence: "medium" as "high" | "medium" | "low",
  note: "Website ranges are agency list prices; the other nine services are normalised market ranges (2024–2026). Figures are indicative — every project is quoted to scope.",
};

/* ──────────────────────────────────────────────────────────────────────────
   Formatting helpers
   ────────────────────────────────────────────────────────────────────────── */

export function formatMoney(country: Country, n: number): string {
  return `${country.symbol}${n.toLocaleString(country.locale)}`;
}

/** "₹15,000 – 50,000" — symbol shown once, optional trailing "+". */
export function priceLabel(country: Country, range?: PriceRange): string {
  if (!range) return "Custom quote";
  const min = formatMoney(country, range.min);
  const max = range.max.toLocaleString(country.locale);
  return `${min} – ${max}${range.plus ? "+" : ""}`;
}

export function getPrice(
  serviceId: string,
  country: CountryCode,
  tierId: string,
): PriceRange | undefined {
  return PRICES[serviceId]?.[country]?.[tierId];
}
