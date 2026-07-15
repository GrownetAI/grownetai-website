import { BUILD_PROCESS_ART } from "@/components/illustrations/scenes";

/* The nine stages of building a brand end-to-end. The copy is the brief's,
   condensed to what reads on a card; `art` is the matching in-repo scene.

   `size` drives the bento hierarchy: the four decisive stages (Brand Identity,
   UI/UX Design, Development, AI Automation) are "feature" blocks; the rest are
   "wide" or "small". The desktop tiling is hand-packed in index.tsx. */
export type StepSize = "feature" | "wide" | "small";

export interface BuildStep {
  n: number;
  title: string;
  lead: string;
  points: string[];
  size: StepSize;
  art: (typeof BUILD_PROCESS_ART)[number];
}

export const BUILD_STEPS: BuildStep[] = [
  {
    n: 1,
    title: "Brand Discovery",
    lead: "We learn the business before we build anything.",
    points: [
      "Understand the business & its goals",
      "Identify the target audience",
      "Study the competitors",
      "Define brand positioning",
    ],
    size: "wide",
    art: BUILD_PROCESS_ART[0],
  },
  {
    n: 2,
    title: "Brand Identity",
    lead: "A memorable identity that matches the vision.",
    points: [
      "Logo design",
      "Brand colours & typography",
      "Visual identity system",
      "Brand guidelines",
    ],
    size: "feature",
    art: BUILD_PROCESS_ART[1],
  },
  {
    n: 3,
    title: "Brand Protection",
    lead: "We help you own your business assets for the long run.",
    points: [
      "Trademark guidance",
      "Domain acquisition",
      "Professional email setup",
      "Social handles & ownership",
    ],
    size: "small",
    art: BUILD_PROCESS_ART[2],
  },
  {
    n: 4,
    title: "Strategy Planning",
    lead: "A complete plan before a line of code is written.",
    points: [
      "Growth roadmap",
      "Product & marketing strategy",
      "Feature planning",
      "Business requirements",
    ],
    size: "small",
    art: BUILD_PROCESS_ART[3],
  },
  {
    n: 5,
    title: "UI/UX Design",
    lead: "Production-level interfaces built to convert.",
    points: [
      "Website, dashboard & app UI",
      "Wireframes & prototypes",
      "User experience flows",
      "Usability & trust",
    ],
    size: "feature",
    art: BUILD_PROCESS_ART[4],
  },
  {
    n: 6,
    title: "Development",
    lead: "The right stack for your goals — not the trendy one.",
    points: [
      "Next.js / React / Node.js",
      "Python / Laravel",
      "Shopify / WordPress",
      "AI-native stack",
    ],
    size: "feature",
    art: BUILD_PROCESS_ART[5],
  },
  {
    n: 7,
    title: "Social Presence",
    lead: "Established on the platforms your customers use.",
    points: [
      "Instagram, Facebook, LinkedIn",
      "YouTube, Threads, X",
      "Platform fit by business type",
      "Consistent, on-brand presence",
    ],
    size: "wide",
    art: BUILD_PROCESS_ART[6],
  },
  {
    n: 8,
    title: "Marketing & Growth",
    lead: "Launch, measure, and compound the results.",
    points: [
      "Meta & Google Ads",
      "Google Business Profile",
      "SEO & advanced AI SEO",
      "Performance analytics",
    ],
    size: "wide",
    art: BUILD_PROCESS_ART[7],
  },
  {
    n: 9,
    title: "AI Automation",
    lead: "Future-ready — AI woven into how the business runs.",
    points: [
      "AI assistants & chatbots",
      "Workflow & CRM automation",
      "Lead qualification",
      "Internal tools & integrations",
    ],
    size: "feature",
    art: BUILD_PROCESS_ART[8],
  },
];
