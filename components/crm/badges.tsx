import { cn } from "@/lib/utils";
import type { LeadPriority, LeadStatus, SyncStatus } from "@/lib/crm/types";

/* ── Lead status ── */
const STATUS: Record<LeadStatus, { label: string; cls: string; dot: string }> = {
  new: { label: "New", cls: "text-blue-700 bg-blue-500/10 dark:text-blue-300", dot: "bg-blue-500" },
  contacted: { label: "Contacted", cls: "text-violet-700 bg-violet-500/10 dark:text-violet-300", dot: "bg-violet-500" },
  qualified: { label: "Qualified", cls: "text-amber-700 bg-amber-500/10 dark:text-amber-300", dot: "bg-amber-500" },
  won: { label: "Won", cls: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-300", dot: "bg-emerald-500" },
  meeting_scheduled: { label: "Meeting scheduled", cls: "text-sky-700 bg-sky-500/10 dark:text-sky-300", dot: "bg-sky-500" },
  proposal_sent: { label: "Proposal sent", cls: "text-indigo-700 bg-indigo-500/10 dark:text-indigo-300", dot: "bg-indigo-500" },
  negotiation: { label: "Negotiation", cls: "text-orange-700 bg-orange-500/10 dark:text-orange-300", dot: "bg-orange-500" },
  in_progress: { label: "In progress", cls: "text-teal-700 bg-teal-500/10 dark:text-teal-300", dot: "bg-teal-500" },
  on_hold: { label: "On hold", cls: "text-fg-muted bg-fg-subtle/10 dark:text-fg-muted", dot: "bg-fg-subtle" },
  lost: { label: "Lost", cls: "text-rose-700 bg-rose-500/10 dark:text-rose-300", dot: "bg-rose-500" },
  completed: { label: "Completed", cls: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-300", dot: "bg-emerald-600" },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const s = STATUS[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", s.cls)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

/* Pipeline order — this drives the status <Select> in the lead form. */
export const LEAD_STATUSES: LeadStatus[] = [
  "new", "contacted", "qualified", "meeting_scheduled", "proposal_sent",
  "negotiation", "in_progress", "on_hold", "won", "completed", "lost",
];
export const statusLabel = (s: LeadStatus) => STATUS[s].label;

/* ── Priority ── */
const PRIORITY: Record<LeadPriority, { label: string; cls: string }> = {
  low: { label: "Low", cls: "text-fg-muted bg-fg-subtle/10 ring-1 ring-line" },
  medium: { label: "Medium", cls: "text-amber-700 bg-amber-500/10 dark:text-amber-300" },
  high: { label: "High", cls: "text-rose-700 bg-rose-500/10 dark:text-rose-300" },
};

export function PriorityBadge({ priority }: { priority: LeadPriority }) {
  const p = PRIORITY[priority];
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold", p.cls)}>
      {p.label}
    </span>
  );
}

export const LEAD_PRIORITIES: LeadPriority[] = ["low", "medium", "high"];

/* ── Sync status (ingestion pipeline health) ── */
const SYNC: Record<SyncStatus, { label: string; dot: string; text: string }> = {
  synced: { label: "Synced", dot: "bg-emerald-500", text: "text-fg-muted" },
  pending: { label: "Pending", dot: "bg-amber-500 animate-pulse", text: "text-fg-muted" },
  failed: { label: "Failed", dot: "bg-rose-500", text: "text-rose-700 dark:text-rose-400" },
};

export function SyncBadge({ status }: { status: SyncStatus }) {
  const s = SYNC[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", s.text)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}
