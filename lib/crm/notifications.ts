import {
  UserPlus,
  TrendingUp,
  CreditCard,
  Megaphone,
  Building2,
  ShieldAlert,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

/**
 * Notification feed for the CRM topbar.
 *
 * There is no notifications endpoint yet, so this is a small, realistic seed
 * that makes the bell functional today and gives a clean shape to swap for a
 * real feed later. The two scopes deliberately differ: a company user sees
 * their own leads/billing/campaigns; the owner admin sees cross-company signals.
 */
export type NotificationKind =
  | "lead"
  | "billing"
  | "campaign"
  | "company"
  | "system"
  | "alert";

export interface CrmNotification {
  id: string;
  title: string;
  body: string;
  /** Pre-formatted relative time — static, so no SSR/CSR hydration drift. */
  time: string;
  unread: boolean;
  kind: NotificationKind;
}

export const NOTIF_ICON: Record<NotificationKind, LucideIcon> = {
  lead: UserPlus,
  billing: CreditCard,
  campaign: Megaphone,
  company: Building2,
  system: CheckCircle2,
  alert: ShieldAlert,
};

/** Tone classes for the icon chip, dark-mode aware. */
export const NOTIF_TONE: Record<NotificationKind, string> = {
  lead: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-400",
  billing: "text-violet-700 bg-violet-500/10 dark:text-violet-300",
  campaign: "text-primary bg-primary/10",
  company: "text-sky-700 bg-sky-500/10 dark:text-sky-300",
  system: "text-fg-muted bg-fg-subtle/10",
  alert: "text-rose-700 bg-rose-500/10 dark:text-rose-400",
};

/** Company user (dashboard) feed. */
export const CRM_NOTIFICATIONS: CrmNotification[] = [
  {
    id: "c1",
    title: "New lead from Meta Ads",
    body: "Priya Sharma enquired about your Growth plan.",
    time: "12m ago",
    unread: true,
    kind: "lead",
  },
  {
    id: "c2",
    title: "Campaign went live",
    body: "“Monsoon Sale” is now running on Google Ads.",
    time: "1h ago",
    unread: true,
    kind: "campaign",
  },
  {
    id: "c3",
    title: "Payment received",
    body: "Your July invoice of ₹24,000 has been paid.",
    time: "Yesterday",
    unread: false,
    kind: "billing",
  },
  {
    id: "c4",
    title: "Weekly report ready",
    body: "Your performance summary for last week is available.",
    time: "2d ago",
    unread: false,
    kind: "system",
  },
];

/** Owner admin (cross-company) feed. */
export const ADMIN_NOTIFICATIONS: CrmNotification[] = [
  {
    id: "a1",
    title: "New company onboarded",
    body: "FreshBite Foods just completed sign-up.",
    time: "20m ago",
    unread: true,
    kind: "company",
  },
  {
    id: "a2",
    title: "Revenue milestone",
    body: "Platform crossed ₹50L in tracked revenue this month.",
    time: "3h ago",
    unread: true,
    kind: "billing",
  },
  {
    id: "a3",
    title: "Lead volume spike",
    body: "LawPoint saw a 40% jump in leads today.",
    time: "5h ago",
    unread: false,
    kind: "lead",
  },
  {
    id: "a4",
    title: "Plan upgraded",
    body: "Nova Logistics moved from Growth to Enterprise.",
    time: "Yesterday",
    unread: false,
    kind: "company",
  },
];

export function notificationsFor(scope: "admin" | "crm"): CrmNotification[] {
  return scope === "admin" ? ADMIN_NOTIFICATIONS : CRM_NOTIFICATIONS;
}
