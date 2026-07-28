"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Store,
  LayoutTemplate,
  PenTool,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   WEBSITE OPTIONS — "Take Your Business Online"

   A centered heading over a 4-up card grid. Each card: icon tile,
   title, description, pill CTA. Cards are equal height (`items-stretch`
   on the grid + `flex flex-col` per card) so the CTA row lines up
   across all four regardless of description length — the reference
   has descriptions of different lengths but their buttons still sit
   flush at the same baseline.

   Icons use lucide-react to stand in for the reference's custom
   icon set; swap for brand-specific icons/illustrations if you have
   them. Href values are placeholders — point them at real routes.
════════════════════════════════════════════════════════════════ */

type WebsiteOption = {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
};

const OPTIONS: WebsiteOption[] = [
  {
    key: "ecommerce",
    icon: Store,
    title: "E-commerce Website",
    description:
      "Maximize your online presence, drive sales, and thrive in the competitive world of ecommerce with a complete online store solution.",
    href: "/services",
  },
  {
    key: "prime",
    icon: LayoutTemplate,
    title: "Prime Website",
    description:
      "Professional business website with instant setup and unlimited pages for growing brands.",
    href: "/services",
  },
  {
    key: "blog",
    icon: PenTool,
    title: "Blog Website",
    description:
      "Unleash your creativity and connect with your audience through a blogging solution built for publishing engaging content.",
    href: "/services",
  },
  {
    key: "basic",
    icon: Briefcase,
    title: "Basic Website",
    description:
      "Engage visitors, showcase your brand, and drive conversions with a streamlined and user-friendly business website.",
    href: "/services",
  },
];

function OptionCard({
  option,
  index,
  reduce,
}: {
  option: WebsiteOption;
  index: number;
  reduce: boolean | null;
}) {
  const Icon = option.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0 : 0.5,
        delay: reduce ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "flex flex-col rounded-2xl border border-hairline bg-paper-raised p-8",
        /* faint dot-grid texture behind the card content, matching the
           reference's subtle background pattern */
        "bg-[radial-gradient(circle,theme(colors.ink/6%)_1px,transparent_1px)] bg-[length:16px_16px]",
      )}
    >
      <div className="flex flex-1 flex-col items-start text-start">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-hairline bg-paper">
          <Icon className="h-6 w-6 text-moss-600" />
        </span>

        <h3 className="mt-6 text-2xl font-bold text-ink">{option.title}</h3>

        <p className="mt-3 text-[15px] leading-relaxed text-ink-body">
          {option.description}
        </p>
      </div>

      {/* mt-auto pins the CTA to the bottom regardless of description length */}
      <a
        href={option.href}
        className={cn(
          "mt-8 flex items-center justify-center gap-1.5 rounded-full border border-hairline bg-paper-raised py-4",
          "font-semibold text-ink transition-colors hover:bg-paper hover:border-moss-600 hover:text-moss-600",
        )}
      >
        View Details
        <ChevronRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}

export default function WebsiteOptions() {
  const reduce = useReducedMotion();

  return (
    <section className="section-padding-sm">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Websites</span>
            <h2 className="heading-section mt-3">Scale your business online</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduce ? 0 : 0.6,
              delay: reduce ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-body-lg"
          >
            Choose from our range of instant websites tailored to your needs
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map((option, i) => (
            <OptionCard
              key={option.key}
              option={option}
              index={i}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
