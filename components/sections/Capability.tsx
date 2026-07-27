"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MonitorPlay,
  Bot,
  Settings2,
  MessageCircle,
  Cloud,
  LineChart,
  Code2,
  Share2,
  MonitorCheck,
  Icon,
  ViewIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   CAPABILITY GRID — service/product tiles for the hero area.

   Two tiers on large screens:
   - LABELS: wide 2-up rows, icon-in-a-tinted-square + label text.
     Purely descriptive, not links.
   - TILES: 4-up cards, solid icon square + title + subtitle. These
     ARE the interactive set — same four surface on mobile as pill
     buttons, so their `href` doubles as the mobile CTA target.

   Below `lg` the two label rows disappear entirely (they're context,
   not controls — same reasoning as HeroArt dropping out on small
   screens) and only the four TILES survive, restyled as a horizontal
   row of small text pills so the capability set stays visible on
   mobile without eating vertical space.
════════════════════════════════════════════════════════════════ */

type LabelItem = {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

type TileItem = {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  href: string;
};

const LABELS: LabelItem[] = [
  { key: "web-dev", icon: MonitorPlay, label: "Website Development" },
  { key: "ai-services", icon: Bot, label: "AI-Integrated Services" },
  { key: "automation", icon: Settings2, label: "Business Automation" },
  {
    key: "Social Media",
    icon: MonitorCheck,
    label: "Social Media Management",
  },
];

const TILES: TileItem[] = [
  {
    key: "Social Media",
    icon: ViewIcon,
    title: "Social Media",
    subtitle: "Insta/Facebook",
    href: "/services",
  },
  {
    key: "crm",
    icon: LineChart,
    title: "CRM",
    subtitle: "Lead system",
    href: "/services",
  },
  {
    key: "websites",
    icon: Code2,
    title: "Websites",
    subtitle: "Custom builds",
    href: "/services",
  },
  {
    key: "automation-wf",
    icon: Share2,
    title: "Automation",
    subtitle: "Workflows",
    href: "/services",
  },
];

export default function CapabilityGrid() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full mx-0 max-w-full xl:py-8">
      {/* ─── Desktop / tablet: full 7-item layout ─────────────────── */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-4">
          {LABELS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  delay: reduce ? 0 : i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-3 rounded-2xl bg-moss-100/30 p-4 hover:border-moss-600/80 hover:bg-moss-200/50 transition-colors border-l-4 border-moss-600"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                  <Icon className="h-8 w-8 text-moss-700" />
                </span>
                <span className="font-semibold text-ink">{item.label}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-4 gap-4">
          {TILES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.key}
                href={item.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  delay: reduce ? 0 : 0.24 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-row gap-3 rounded-2xl border border-hairline bg-paper-raised p-5 transition-colors hover:bg-paper"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-paper">
                  <Icon className="h-8 w-8 text-moss-700" />
                </span>
                <span>
                  <span className="block font-bold text-ink">{item.title}</span>
                  <span className="block text-sm text-ink/70 w-max">
                    {item.subtitle}
                  </span>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* ─── Mobile: only the 4 tiles, as small text pills ─────────── */}
      <div className="flex flex-wrap gap-2.5 lg:hidden py-6">
        {TILES.map((item, i) => (
          <motion.a
            key={item.key}
            href={item.href}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduce ? 0 : 0.5,
              delay: reduce ? 0 : 0.24 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-row gap-3 rounded-2xl border border-hairline bg-paper-raised p-5 transition-colors hover:bg-paper max-w-full mx-auto flex-1"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-paper">
              <item.icon className="h-8 w-8 text-moss-700" />
            </span>
            <span>
              <span className="block font-bold text-ink text-start">
                {item.title}
              </span>
              <span className="block text-sm text-ink/70 w-max text-start">
                {item.subtitle}
              </span>
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
