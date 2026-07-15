/**
 * Careers data model — the single source of truth for the public /careers pages
 * AND the /admin/careers management module.
 *
 * There is no careers backend yet, so `lib/careers/store.ts` layers a
 * localStorage-backed store on top of this seed: admin edits persist and the
 * public page reflects them, while the types stay shaped for a real backend +
 * email notifications (see Application.status + notes). Swapping the store for
 * API calls later touches only store.ts — nothing that consumes these types.
 */

export type JobStatus = "open" | "closed" | "draft";

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Internship";

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: EmploymentType;
  experienceLevel: string;
  /** Optional — hidden on the public card when empty. */
  salary?: string;
  summary: string;
  responsibilities: string[];
  /** Required skills. */
  requirements: string[];
  preferredSkills: string[];
  benefits: string[];
  /** ISO date (YYYY-MM-DD); optional. */
  deadline?: string;
  status: JobStatus;
  /** Display order on the public page (ascending). */
  order: number;
  /** ISO date the role was posted. */
  postedAt: string;
  archived?: boolean;
}

export const APPLICATION_STATUSES = [
  "new",
  "under_review",
  "shortlisted",
  "interview",
  "selected",
  "rejected",
  "hired",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_STATUS_LABEL: Record<ApplicationStatus, string> = {
  new: "New",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  interview: "Interview Scheduled",
  selected: "Selected",
  rejected: "Rejected",
  hired: "Hired",
};

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  portfolio?: string;
  /** File name only — the binary needs a backend/storage to persist. */
  resumeName?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  /** ISO datetime. */
  appliedAt: string;
  /** Internal notes — notification/email log can hang off this later. */
  notes?: string;
}

export interface CareerContent {
  hero: { eyebrow: string; title: string; subtitle: string; ctaLabel: string };
  intro: string;
  culture: { title: string; desc: string }[];
  hiringProcess: { step: string; desc: string }[];
  benefits: { title: string; desc: string }[];
  cta: { title: string; subtitle: string };
}

/* ══════════════ SEED ══════════════ */

export const SEED_JOBS: Job[] = [
  {
    id: "graphic-designer",
    slug: "graphic-designer",
    title: "Graphic Designer",
    department: "Creative",
    location: "New Delhi / Remote",
    type: "Full-time",
    experienceLevel: "1–3 years",
    summary:
      "Design brand identities, ad creatives, and social assets that make small businesses look like category leaders.",
    responsibilities: [
      "Design logos, brand systems, and marketing collateral",
      "Produce ad creatives for Meta and Google campaigns",
      "Create social media templates, posts, and story sets",
      "Maintain visual consistency across client brands",
      "Collaborate with marketers on campaign concepts",
    ],
    requirements: [
      "Strong portfolio across branding and digital design",
      "Fluency in Figma and the Adobe suite (Illustrator, Photoshop)",
      "Solid grasp of layout, typography, and colour",
      "Ability to work to briefs and deadlines",
    ],
    preferredSkills: [
      "Motion / basic After Effects",
      "Packaging or print experience",
      "AI design tools (Midjourney, Firefly)",
    ],
    benefits: [
      "Remote-friendly, output over clock-ins",
      "Real brands, real budgets",
      "Learning budget",
    ],
    status: "open",
    order: 1,
    postedAt: "2026-06-01",
  },
  {
    id: "digital-marketing-specialist",
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "New Delhi / Remote",
    type: "Full-time",
    experienceLevel: "2–4 years",
    summary:
      "Own SEO, paid, and analytics for a portfolio of clients — and be measured on the number that matters: revenue.",
    responsibilities: [
      "Plan and run Google & Meta ad campaigns end to end",
      "Execute on-page and technical SEO",
      "Build and read analytics dashboards (GA4, Looker)",
      "Own conversion tracking and attribution",
      "Turn data into weekly optimisation decisions",
    ],
    requirements: [
      "Hands-on Google Ads and Meta Ads experience",
      "Working knowledge of SEO (on-page + technical)",
      "Comfort with GA4 and conversion tracking",
      "Analytical, test-and-learn mindset",
    ],
    preferredSkills: [
      "SQL / spreadsheet modelling",
      "Marketing automation tools",
      "Landing-page CRO experience",
    ],
    benefits: [
      "Performance bonuses",
      "Flexible hours",
      "Direct client impact",
    ],
    status: "open",
    order: 2,
    postedAt: "2026-06-05",
  },
  {
    id: "social-media-manager",
    slug: "social-media-manager",
    title: "Social Media Manager",
    department: "Social",
    location: "New Delhi / Hybrid",
    type: "Full-time",
    experienceLevel: "1–2 years",
    summary:
      "Run always-on social for a roster of brands — planning, community, and campaigns that actually grow followers and sales.",
    responsibilities: [
      "Own content calendars across Instagram, LinkedIn, and more",
      "Plan and brief posts, reels, and story sets",
      "Manage community — comments, DMs, engagement",
      "Execute paid + organic social campaigns",
      "Report on growth, reach, and conversions monthly",
    ],
    requirements: [
      "Proven multi-platform social management",
      "Strong content-planning and copy instincts",
      "Community-management experience",
      "Comfort reading social analytics",
    ],
    preferredSkills: [
      "Basic reels editing",
      "Influencer coordination",
      "Meta Business Suite / scheduling tools",
    ],
    benefits: [
      "Hybrid schedule",
      "Creative ownership",
      "Fast growth path",
    ],
    status: "open",
    order: 3,
    postedAt: "2026-06-08",
  },
];

export const SEED_CONTENT: CareerContent = {
  hero: {
    eyebrow: "Careers",
    title: "Build the agency for the AI era.",
    subtitle:
      "We're a small, senior team doing outsized work for real businesses. If you care about outcomes over busywork, you'll fit right in.",
    ctaLabel: "See open roles",
  },
  intro:
    "No juniors learning on client budgets, no vanity metrics, no set-and-forget. Just senior people, real ownership, and the tools to do the best work of your career.",
  culture: [
    { title: "Remote-first", desc: "Work where you do your best thinking. We measure output, not hours." },
    { title: "Always learning", desc: "A learning budget and a team that shares what it discovers, weekly." },
    { title: "AI-native", desc: "You'll use cutting-edge AI tools daily and stay ahead of the industry." },
    { title: "Real collaboration", desc: "Small, tight-knit team where your ideas ship, not sit in a deck." },
  ],
  hiringProcess: [
    { step: "Application", desc: "Send your details, portfolio, and a short note." },
    { step: "Review", desc: "We read every application within a few days." },
    { step: "Interview", desc: "A conversation about you, the work, and the fit." },
    { step: "Technical round", desc: "A practical task close to the real job." },
    { step: "Offer", desc: "We move fast when we know it's right." },
    { step: "Joining", desc: "Onboarding, tools, and your first real project." },
  ],
  benefits: [
    { title: "Flexible work", desc: "Remote and hybrid roles with hours that fit your life." },
    { title: "Growth opportunities", desc: "Clear paths to lead work, clients, and eventually teams." },
    { title: "Learning budget", desc: "Courses, tools, and events on us — keep levelling up." },
    { title: "Collaborative culture", desc: "A senior team that has your back and shares the wins." },
    { title: "Latest technologies", desc: "Modern stack and AI tooling, not legacy busywork." },
    { title: "Career development", desc: "Real ownership and mentorship from day one." },
  ],
  cta: {
    title: "Don't see your role?",
    subtitle: "We're always meeting great people. Tell us what you do and how you'd help us grow.",
  },
};

export const SEED_APPLICATIONS: Application[] = [
  {
    id: "app-1001",
    jobId: "graphic-designer",
    jobTitle: "Graphic Designer",
    name: "Riya Malhotra",
    email: "riya.m@example.com",
    phone: "+91 98xxxxxx01",
    experience: "2 years",
    portfolio: "behance.net/riyam",
    resumeName: "riya-malhotra-resume.pdf",
    coverLetter: "I love brand systems and have shipped 20+ identities…",
    status: "shortlisted",
    appliedAt: "2026-07-10T09:20:00.000Z",
  },
  {
    id: "app-1002",
    jobId: "digital-marketing-specialist",
    jobTitle: "Digital Marketing Specialist",
    name: "Karan Shah",
    email: "karan.shah@example.com",
    phone: "+91 98xxxxxx02",
    experience: "3 years",
    portfolio: "linkedin.com/in/karanshah",
    resumeName: "karan-shah-cv.pdf",
    coverLetter: "Managed ₹4Cr+ in ad spend across D2C…",
    status: "interview",
    appliedAt: "2026-07-11T14:05:00.000Z",
  },
  {
    id: "app-1003",
    jobId: "social-media-manager",
    jobTitle: "Social Media Manager",
    name: "Aisha Khan",
    email: "aisha.k@example.com",
    phone: "+91 98xxxxxx03",
    experience: "1.5 years",
    resumeName: "aisha-khan.pdf",
    status: "new",
    appliedAt: "2026-07-13T11:40:00.000Z",
  },
];
