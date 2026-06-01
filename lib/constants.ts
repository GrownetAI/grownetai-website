// ─── Site Configuration ────────────────────────────────────────────────
export const SITE_CONFIG = {
  name: "GrownetAI",
  tagline: "AI-Powered Growth for Your Business",
  description:
    "Full-service digital marketing agency specializing in SEO, social media, ads, content creation, and web development.",
  url: "https://grownetai.com",
  email: "grownetai@gmail.com",
  phone: "+91 8796432343",
  whatsapp: "+918796432343",
  address: "New Delhi, India",
  founded: "2026",
  social: {
    instagram: "https://instagram.com/grownetai",
    facebook: "https://facebook.com/grownetai",
    linkedin: "https://linkedin.com/company/grownetai",

    youtube: "https://youtube.com/@grownetai",
  },
};

// ─── Navigation ────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Website Development", href: "/services#web-dev", icon: "Code2" },
      { label: "Application Development", href: "/services#app-dev", icon: "Smartphone" },
      { label: "SEO & Performance", href: "/services#seo", icon: "Search" },
      { label: "Ads Management", href: "/services#ads", icon: "Target" },
      { label: "Social Media (SMM)", href: "/services#smm", icon: "Share2" },
      { label: "Social Optimization (SMO)", href: "/services#smo", icon: "ThumbsUp" },
      { label: "Custom AI Agents", href: "/services#ai-agents", icon: "Bot" },
      { label: "LLM Integration", href: "/services#llm", icon: "BrainCircuit" },
      { label: "AI Automation", href: "/services#ai-automation", icon: "Zap" },
      { label: "Custom Model Training", href: "/services#model-training", icon: "Cpu" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

// ─── Services ──────────────────────────────────────────────────────────
export const SERVICES = [
  {
    id: "web-dev",
    icon: "Code2",
    title: "Website Development",
    shortDesc:
      "Fast, conversion-focused websites built to sell — not just to look good.",
    description:
      "We design and build modern, mobile-first websites on a fast, SEO-ready stack. Every page is engineered around a goal: turning visitors into customers.",
    features: [
      "Custom, conversion-first design",
      "Next.js / React build",
      "Mobile-first & accessible",
      "Core Web Vitals performance",
      "CMS for easy editing",
      "Analytics & tracking setup",
    ],
    color: "#008080",
    gradient: "bg-brand-teal-mist",
  },
  {
    id: "app-dev",
    icon: "Smartphone",
    title: "Application Development",
    shortDesc:
      "Web & mobile apps engineered for scale, speed and a great experience.",
    description:
      "From MVP to production, we build robust web and mobile applications with clean architecture, secure APIs and a UX your users will love.",
    features: [
      "Web & mobile (iOS / Android)",
      "Scalable API architecture",
      "Secure auth & user roles",
      "Realtime & offline support",
      "Cloud deployment & CI/CD",
      "Ongoing maintenance",
    ],
    color: "#00B3B3",
    gradient: "bg-brand-teal-mist",
  },
  {
    id: "seo",
    icon: "Search",
    title: "SEO, AI SEO & Performance Marketing",
    shortDesc:
      "Rank higher, get found, and turn search intent into real revenue.",
    description:
      "A data-driven blend of technical SEO, AI-assisted content and performance marketing that compounds organic growth and lowers your cost per lead.",
    features: [
      "Technical SEO audit & fixes",
      "AI-assisted keyword & content",
      "On-page & off-page SEO",
      "Local SEO & Google Business",
      "Performance / CRO tracking",
      "Monthly growth reporting",
    ],
    color: "#008080",
    gradient: "bg-brand-teal-mist",
  },
  {
    id: "ads",
    icon: "Megaphone",
    title: "Ads Management — Google & Meta",
    shortDesc:
      "High-ROI ad campaigns managed end to end across Google and Meta.",
    description:
      "We plan, launch and optimize paid campaigns on Google and Meta — from creative to conversion tracking — to bring you paying customers, profitably.",
    features: [
      "Google Search, Display & Shopping",
      "Instagram & Facebook ads",
      "Audience & creative strategy",
      "Conversion tracking & pixels",
      "A/B testing & optimization",
      "Transparent ROAS reporting",
    ],
    color: "#00B3B3",
    gradient: "bg-brand-teal-mist",
  },
  {
    id: "smm",
    icon: "Share2",
    title: "Social Media Management",
    shortDesc:
      "Always-on content and community management across every platform.",
    description:
      "We own your social presence end to end — strategy, content, posting and engagement — so your brand shows up consistently and grows.",
    features: [
      "Multi-platform management",
      "Content calendar & design",
      "Copywriting & scheduling",
      "Community engagement",
      "Hashtag & trend strategy",
      "Monthly growth reports",
    ],
    color: "#008080",
    gradient: "bg-brand-teal-mist",
  },
  {
    id: "smo",
    icon: "ThumbsUp",
    title: "Social Media Optimization",
    shortDesc:
      "Optimize profiles and content so every post works harder for reach.",
    description:
      "We fine-tune your profiles, content formats and posting strategy to maximize organic reach, engagement and follower quality.",
    features: [
      "Profile & bio optimization",
      "Content format testing",
      "Reach & engagement tuning",
      "Hashtag & social SEO",
      "Competitor benchmarking",
      "Performance insights",
    ],
    color: "#00B3B3",
    gradient: "bg-brand-teal-mist",
  },
  {
    id: "ai-agents",
    icon: "Bot",
    title: "Custom AI Agents & Agentic Workflows",
    shortDesc:
      "Autonomous AI agents that run real workflows for your business.",
    description:
      "We design and ship custom AI agents and agentic workflows that take real actions — handling support, research, operations and more, end to end.",
    features: [
      "Custom agent design",
      "Tool & API integrations",
      "Multi-step agentic workflows",
      "Human-in-the-loop controls",
      "Guardrails & monitoring",
      "Continuous improvement",
    ],
    color: "#008080",
    gradient: "bg-brand-teal-mist",
  },
  {
    id: "llm",
    icon: "BrainCircuit",
    title: "LLM Integration",
    shortDesc:
      "Bring GPT-class intelligence straight into your product and tools.",
    description:
      "We integrate large language models into your apps — chat, search, summarization, copilots — with the right context, safety and cost controls.",
    features: [
      "Chat, copilot & search",
      "RAG over your own data",
      "Prompt & context engineering",
      "Streaming & function calling",
      "Cost & latency optimization",
      "Evaluation & safety",
    ],
    color: "#00B3B3",
    gradient: "bg-brand-teal-mist",
  },
  {
    id: "ai-automation",
    icon: "Zap",
    title: "AI Automation",
    shortDesc:
      "Automate repetitive operations with reliable, AI-driven pipelines.",
    description:
      "We replace manual, repetitive work with dependable AI automations that connect your tools and run quietly in the background.",
    features: [
      "Workflow automation",
      "Document & data processing",
      "Tool & CRM integrations",
      "Triggers & scheduling",
      "Error handling & alerts",
      "Dashboards & logs",
    ],
    color: "#008080",
    gradient: "bg-brand-teal-mist",
  },
  {
    id: "model-training",
    icon: "Cpu",
    title: "Custom Model Training",
    shortDesc:
      "Fine-tuned models trained on your data for your exact use case.",
    description:
      "When off-the-shelf models are not enough, we fine-tune and train custom models on your data for accuracy, privacy and a real competitive edge.",
    features: [
      "Data collection & labeling",
      "Fine-tuning & training",
      "Evaluation & benchmarking",
      "Private / on-prem options",
      "Deployment & serving",
      "Monitoring & retraining",
    ],
    color: "#00B3B3",
    gradient: "bg-brand-teal-mist",
  },
];

// ─── Stats / Social Proof ──────────────────────────────────────────────
export const STATS = [
  { value: 43, suffix: "+", label: "Clients Served", icon: "Users" },
  { value: 99, suffix: "%", label: "Client Satisfaction", icon: "Star" },
  {
    value: 250,
    suffix: "%",
    label: "Average ROI Increase",
    icon: "TrendingUp",
  },
  { value: 90, suffix: "k+", label: "Ad Spend Managed", icon: "DollarSign" },
];

// ─── Testimonials ──────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Founder, TechVista Solutions",
    avatar: "/images/testimonials/rahul.jpg",
    rating: 5,
    text: "GrownetAI completely transformed our online presence. Our organic traffic increased by 340% in just 4 months, and our Google Ads ROI went from 1.8x to 4.2x. Their team is incredibly professional and results-driven.",
    service: "SEO + Google Ads",
    result: "340% traffic increase",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "CEO, Bloom Fashion",
    avatar: "/images/testimonials/priya.jpg",
    rating: 5,
    text: "The Instagram reels they create for us consistently go viral. We gained 50K followers in 3 months and our sales from social media tripled. Best investment we made for our fashion brand.",
    service: "Instagram Ads + Reels",
    result: "50K followers in 3 months",
  },
  {
    id: 3,
    name: "Amit Gupta",
    role: "Director, FoodieHub",
    avatar: "/images/testimonials/amit.jpg",
    rating: 5,
    text: "Their website development team built us a stunning e-commerce site that loads in under 2 seconds. Conversion rate jumped from 1.2% to 3.8% immediately. Outstanding work and amazing support.",
    service: "Website Development",
    result: "3x conversion improvement",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Marketing Head, EduSpark",
    avatar: "/images/testimonials/sneha.jpg",
    rating: 5,
    text: "GrownetAI handled our entire digital marketing — SEO, Google Ads, and social media. Our student enrollments doubled within 6 months. Their AI-powered approach is truly different from other agencies.",
    service: "Full Digital Marketing",
    result: "2x enrollment in 6 months",
  },
  {
    id: 5,
    name: "Vikram Nair",
    role: "Owner, SpiceBox Restaurant",
    avatar: "/images/testimonials/vikram.jpg",
    rating: 5,
    text: "Local SEO and Google Ads from GrownetAI brought in 60% more footfall to our restaurant. The team is responsive, creative, and truly cares about your success. Highly recommended!",
    service: "Local SEO + Google Ads",
    result: "60% increase in footfall",
  },
  {
    id: 6,
    name: "Ananya Singh",
    role: "Co-founder, WellNest",
    avatar: "/images/testimonials/ananya.jpg",
    rating: 5,
    text: "The brand identity and website they created for us perfectly captures our wellness brand ethos. Social media has been phenomenal — our community grew from 0 to 25K in just 2 months.",
    service: "Branding + Social Media",
    result: "25K followers from scratch",
  },
];

// ─── Pricing Plans ─────────────────────────────────────────────────────
export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    price: 15000,
    currency: "₹",
    period: "/month",
    description:
      "Perfect for small businesses just starting their digital journey.",
    features: [
      "Social Media Management (2 platforms)",
      "12 posts/month with design",
      "Basic SEO optimization",
      "Monthly analytics report",
      "Email support",
      "WhatsApp consultation (2hrs/month)",
    ],
    notIncluded: [
      "Paid ads management",
      "Video / Reels production",
      "Website development",
    ],
    cta: "Get Started",
    color: "brand-teal",
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    price: 35000,
    currency: "₹",
    period: "/month",
    description:
      "Best for growing businesses that want comprehensive digital marketing.",
    features: [
      "Social Media Management (4 platforms)",
      "20 posts/month with premium design",
      "Advanced SEO + content creation",
      "Google Ads management (up to ₹50k budget)",
      "Instagram & Facebook Ads",
      "4 Reels/month with editing",
      "Bi-weekly analytics reports",
      "Priority WhatsApp support",
      "Dedicated account manager",
    ],
    notIncluded: ["Website development", "Email marketing automation"],
    cta: "Start Growing",
    color: "brand-teal",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "Best Value",
    price: 75000,
    currency: "₹",
    period: "/month",
    description:
      "Complete digital presence for established businesses ready to dominate.",
    features: [
      "Full Social Media Management (all platforms)",
      "Unlimited posts + premium design",
      "Full SEO suite + blog (4 articles/month)",
      "Google Ads (unlimited budget management)",
      "Meta Ads (unlimited campaigns)",
      "8 Reels/month + YouTube Shorts",
      "Website maintenance & updates",
      "Email marketing automation",
      "Weekly performance reports",
      "Dedicated team + weekly strategy calls",
      "AI-powered competitor analysis",
      "CRM & lead management setup",
    ],
    notIncluded: [],
    cta: "Contact Us",
    color: "brand-charcoal",
    popular: false,
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────
export const FAQS = [
  {
    question: "How quickly will I see results from digital marketing?",
    answer:
      "Results vary by service. Google Ads and Meta Ads can show results within the first week. SEO typically takes 3–6 months to show significant organic growth. Social media engagement improvements are usually visible within 30 days with consistent posting.",
  },
  {
    question: "Do you work with businesses outside of India?",
    answer:
      "Yes! While we are headquartered in India, we work with clients globally. Our team is fluent in English and can manage campaigns for businesses in the US, UK, UAE, Canada, Australia, and more.",
  },
  {
    question:
      "What makes GrownetAI different from other digital marketing agencies?",
    answer:
      "We integrate AI and data-driven strategies at every step — from AI-powered keyword research and audience targeting to automated reporting and campaign optimization. We also offer a dedicated account manager, transparent reporting, and a results guarantee.",
  },
  {
    question: "Can I start with just one service and scale up later?",
    answer:
      "Absolutely. Many clients start with a single service like SEO or social media management and add more services as they see results. Our modular approach lets you scale your digital marketing investment as your business grows.",
  },
  {
    question: "How do you measure and report campaign performance?",
    answer:
      "You get access to a live dashboard showing all KPIs. We provide detailed monthly reports (bi-weekly for Growth plan, weekly for Enterprise) covering traffic, conversions, ad spend, ROI, social media growth, and actionable insights.",
  },
  {
    question: "Do you require a long-term contract?",
    answer:
      "Our standard engagement is month-to-month with a 30-day notice period. We do offer discounts for 3-month, 6-month, and annual commitments. We believe in earning your business through results, not locking you into contracts.",
  },
  {
    question:
      "How much does Google Ads management cost on top of the agency fee?",
    answer:
      "Our fee covers the management/strategy work. Google Ads spend goes directly to Google through your own ad account — so you always have full transparency and control. We recommend a minimum budget of ₹15,000/month for Google Ads to see meaningful results.",
  },
  {
    question: "Can you redesign my existing website or build from scratch?",
    answer:
      "Both! We can rebuild your existing website on a modern stack (Next.js/React) or design and develop a brand new website from scratch. All our websites are mobile-first, SEO-optimized, and built for Core Web Vitals performance.",
  },
];

// ─── Process Steps ──────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We start with a deep-dive audit of your business, competitors, audience, and goals. Then we craft a custom digital strategy tailored specifically for your growth.",
    icon: "Lightbulb",
  },
  {
    step: "02",
    title: "Setup & Onboarding",
    description:
      "We set up all tools, accounts, tracking pixels, analytics, and campaigns. Your dedicated account manager gets fully onboarded with your brand voice and guidelines.",
    icon: "Settings",
  },
  {
    step: "03",
    title: "Execute & Create",
    description:
      "Our team of specialists gets to work — creating content, launching campaigns, optimizing SEO, designing posts, and producing reels that capture attention.",
    icon: "Zap",
  },
  {
    step: "04",
    title: "Optimize & Scale",
    description:
      "We continuously monitor performance, A/B test, and refine strategies based on data. What works gets scaled. What doesn't gets improved. Your growth compounds.",
    icon: "TrendingUp",
  },
];

// ─── Team ──────────────────────────────────────────────────────────────
export const TEAM = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    bio: "Digital strategist with 8+ years of experience scaling D2C and B2B brands through AI-powered marketing.",
    avatar: "/images/team/arjun.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Kavya Sharma",
    role: "Head of SEO & Content",
    bio: "SEO expert specializing in technical optimization and AI-powered content strategies that rank.",
    avatar: "/images/team/kavya.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Rohan Verma",
    role: "Paid Ads Manager",
    bio: "Google Ads certified expert with ₹10Cr+ in ad spend managed across diverse industries.",
    avatar: "/images/team/rohan.jpg",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Nisha Kapoor",
    role: "Creative Director",
    bio: "Award-winning designer and video creator behind viral reels and brand identities.",
    avatar: "/images/team/nisha.jpg",
    linkedin: "#",
    twitter: "#",
  },
];

// ─── Industries Served ──────────────────────────────────────────────────
export const INDUSTRIES = [
  "E-commerce",
  "Real Estate",
  "Healthcare",
  "Education",
  "Food & Beverage",
  "Fashion & Lifestyle",
  "Technology",
  "Finance",
  "Hospitality",
  "Fitness & Wellness",
  "Legal Services",
  "Events & Entertainment",
];

// ─── Portfolio / Case Studies ───────────────────────────────────────────
export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    client: "TechVista Solutions",
    category: "SEO + Web Dev",
    title: "From Page 5 to #1 in 4 Months",
    description:
      "Complete SEO overhaul and website rebuild that drove 340% organic traffic growth.",
    image: "/images/portfolio/techvista.jpg",
    results: [
      { metric: "Organic Traffic", value: "+340%" },
      { metric: "Keyword Rankings", value: "#1 for 45 terms" },
      { metric: "Lead Generation", value: "+180%" },
    ],
    tags: ["SEO", "Next.js", "Content Marketing"],
  },
  {
    id: 2,
    client: "Bloom Fashion",
    category: "Social Media + Instagram Ads",
    title: "50K Followers & 3x Sales in 3 Months",
    description:
      "Viral reel strategy and targeted Instagram ads that exploded brand growth.",
    image: "/images/portfolio/bloom.jpg",
    results: [
      { metric: "New Followers", value: "50K+" },
      { metric: "Sales Revenue", value: "+200%" },
      { metric: "ROAS", value: "5.8x" },
    ],
    tags: ["Instagram Ads", "Reels", "Social Media"],
  },
  {
    id: 3,
    client: "FoodieHub",
    category: "Website + Google Ads",
    title: "E-commerce Conversion Rate Tripled",
    description:
      "Redesigned their Shopify store and ran Google Shopping ads that 3x'd conversions.",
    image: "/images/portfolio/foodiehub.jpg",
    results: [
      { metric: "Conversion Rate", value: "1.2% → 3.8%" },
      { metric: "Google Ads ROAS", value: "6.2x" },
      { metric: "Monthly Revenue", value: "+₹12L" },
    ],
    tags: ["Website Dev", "Google Ads", "E-commerce"],
  },
  {
    id: 4,
    client: "EduSpark",
    category: "Full Digital Marketing",
    title: "Student Enrollments Doubled in 6 Months",
    description:
      "End-to-end digital marketing campaign combining SEO, paid ads, and social media.",
    image: "/images/portfolio/eduspark.jpg",
    results: [
      { metric: "Enrollments", value: "+100%" },
      { metric: "Cost per Lead", value: "-45%" },
      { metric: "Brand Awareness", value: "+280%" },
    ],
    tags: ["SEO", "Google Ads", "Meta Ads"],
  },
];

// ─── Blog Posts (sample) ────────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    id: 1,
    title: "10 AI-Powered SEO Strategies That Actually Work in 2025",
    slug: "ai-seo-strategies-2025",
    excerpt:
      "How to leverage AI tools to dominate search rankings and build authority faster than ever before.",
    category: "SEO",

    author: "Kavya Sharma",
    authorAvatar: "/images/team/kavya.jpg",
    date: "2025-01-10",
    readTime: "8 min read",
    image: "/images/seo.png",
    tags: ["SEO", "AI", "Content Marketing"],
    featured: true,
  },
  {
    id: 2,
    title: "Why Your Instagram Reels Aren't Getting Views (And How to Fix It)",
    slug: "instagram-reels-views-guide",
    excerpt:
      "A data-driven breakdown of what makes reels go viral and actionable steps to improve your reach.",
    category: "Social Media",
    author: "Nisha Kapoor",
    authorAvatar: "/images/team/nisha.jpg",
    date: "2025-01-05",
    readTime: "6 min read",
    image: "/images/paid-ads.png",
    tags: ["Instagram", "Reels", "Video Marketing"],
    featured: false,
  },
  {
    id: 3,
    title: "Google Ads vs Meta Ads: Which is Right for Your Business in 2025?",
    slug: "google-ads-vs-meta-ads",
    excerpt:
      "An objective comparison of Google and Meta advertising platforms with real data from our client campaigns.",
    category: "Paid Ads",
    author: "Rohan Verma",
    authorAvatar: "/images/team/rohan.jpg",
    date: "2026-12-28",
    readTime: "10 min read",
    image: "/images/social-media.png",
    tags: ["Google Ads", "Meta Ads", "PPC"],
    featured: false,
  },
];

// ─── Tech Stack ─────────────────────────────────────────────────────────────
export const TECH_STACK = {
  frontend: [
    { name: "Next.js", color: "#ffffff" },
    { name: "React", color: "#61DAFB" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Tailwind", color: "#06B6D4" },
    { name: "Framer", color: "#BB4B96" },
    { name: "Vite", color: "#646CFF" },
  ],
  backend: [
    { name: "Node.js", color: "#68A063" },
    { name: "Express", color: "#ffffff" },
    { name: "Python", color: "#3776AB" },
    { name: "FastAPI", color: "#009688" },
    { name: "GraphQL", color: "#E10098" },
    { name: "REST", color: "#008080" },
  ],
  database: [
    { name: "PostgreSQL", color: "#336791" },
    { name: "MongoDB", color: "#47A248" },
    { name: "Redis", color: "#DC382D" },
    { name: "Supabase", color: "#3ECF8E" },
    { name: "Firebase", color: "#FFCA28" },
    { name: "AWS", color: "#FF9900" },
  ],
  cms: [
    { name: "Contentful", color: "#2478CC" },
    { name: "Sanity", color: "#F03E2F" },
    { name: "WordPress", color: "#21759B" },
    { name: "Shopify", color: "#96BF48" },
    { name: "Webflow", color: "#4353FF" },
    { name: "Notion", color: "#ffffff" },
  ],
  other: [
    { name: "OpenAI", color: "#10A37F" },
    { name: "Vercel", color: "#ffffff" },
    { name: "Docker", color: "#2496ED" },
    { name: "GitHub", color: "#ffffff" },
    { name: "Figma", color: "#F24E1E" },
    { name: "GA4", color: "#E37400" },
  ],
};
