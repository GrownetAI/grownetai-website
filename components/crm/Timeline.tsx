import {
  Plus,
  MessageSquare,
  UserCheck,
  RefreshCw,
  Mail,
  Phone,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { timeAgo } from "@/lib/crm/format";
import type { LeadTimelineEvent } from "@/lib/crm/types";

const ICON: Record<LeadTimelineEvent["type"], LucideIcon> = {
  created: Plus,
  status_changed: RefreshCw,
  note_added: MessageSquare,
  assigned: UserCheck,
  contacted: CheckCircle2,
  email: Mail,
  call: Phone,
};

/** Vertical event timeline (newest first). */
export default function Timeline({ events }: { events: LeadTimelineEvent[] }) {
  const ordered = [...events].sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
  );

  return (
    <ol className="relative">
      {ordered.map((ev, i) => {
        const Icon = ICON[ev.type] ?? RefreshCw;
        const last = i === ordered.length - 1;
        return (
          <li key={ev.id} className="relative flex gap-3 pb-4 last:pb-0">
            {!last && (
              <span className="absolute left-[15px] top-8 bottom-0 w-px bg-line" />
            )}
            <span className="w-8 h-8 rounded-full grid place-items-center bg-primary/10 text-primary flex-shrink-0 z-[1]">
              <Icon className="w-4 h-4" />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-sm text-fg leading-snug">{ev.label}</p>
              <p className="text-xs text-fg-subtle mt-0.5">
                {timeAgo(ev.at)}
                {ev.by ? ` · ${ev.by}` : ""}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
