"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Building2, Tag, Save } from "lucide-react";
import toast from "react-hot-toast";
import Drawer from "./Drawer";
import PlatformBadge from "./PlatformBadge";
import Avatar from "./Avatar";
import Timeline from "./Timeline";
import { SyncBadge, LEAD_STATUSES, LEAD_PRIORITIES, statusLabel } from "./badges";
import { Select } from "./controls";
import { Skeleton } from "./states";
import { getLead, updateLead } from "@/lib/crm/api";
import { platformMeta } from "@/lib/crm/platforms";
import { fmtMoney, fmtDate } from "@/lib/crm/format";
import type { Lead, TeamMember } from "@/lib/crm/types";

/** Lead detail slide-over: view + inline-edit status/priority/assignee/notes. */
export default function LeadDrawer({
  leadId,
  team,
  onClose,
  onUpdated,
}: {
  leadId: string | null;
  team: TeamMember[];
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!leadId) return;
    setLead(null);
    getLead(leadId).then((l) => {
      setLead(l);
      setNotes(l?.notes ?? "");
    });
  }, [leadId]);

  async function patch(field: "status" | "priority" | "assigneeId", value: string) {
    if (!lead) return;
    const updated = await updateLead(lead.id, {
      [field]: field === "assigneeId" && value === "unassigned" ? null : value,
    } as never);
    setLead(updated);
    onUpdated();
  }

  async function saveNotes() {
    if (!lead) return;
    setSaving(true);
    await updateLead(lead.id, { notes });
    setSaving(false);
    onUpdated();
    toast.success("Notes saved");
  }

  const meta = lead ? platformMeta(lead.source) : null;
  const assigneeOptions = [
    { value: "unassigned", label: "Unassigned" },
    ...team.map((m) => ({ value: m.id, label: m.name })),
  ];

  return (
    <Drawer
      open={!!leadId}
      onClose={onClose}
      title={lead ? lead.name : "Lead"}
      subtitle={lead && meta ? `From ${meta.label}` : undefined}
      footer={
        lead ? (
          <button onClick={saveNotes} disabled={saving} className="btn btn-primary w-full justify-center disabled:opacity-60">
            <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save notes"}
          </button>
        ) : undefined
      }
    >
      {!lead ? (
        <div className="space-y-4">
          <Skeleton className="h-16" />
          <Skeleton className="h-24" />
          <Skeleton className="h-40" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <Avatar name={lead.name} size="lg" />
            <div className="min-w-0">
              <p className="font-semibold text-fg">{lead.name}</p>
              <div className="mt-1"><SyncBadge status={lead.syncStatus} /></div>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-fg-muted">Value</p>
              <p className="text-lg font-bold text-fg tabular-nums">{fmtMoney(lead.value)}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            {lead.email && <ContactRow icon={Mail} value={lead.email} href={`mailto:${lead.email}`} />}
            {lead.phone && <ContactRow icon={Phone} value={lead.phone} href={`tel:${lead.phone}`} />}
            {lead.company && <ContactRow icon={Building2} value={lead.company} />}
            <div className="flex items-center gap-3 text-sm">
              <PlatformBadge platform={lead.source} size="sm" withLabel />
              <span className="ml-auto text-xs text-fg-subtle">Captured {fmtDate(lead.receivedAt)}</span>
            </div>
          </div>

          {/* Editable fields */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Status">
              <Select
                className="w-full [&_select]:w-full"
                value={lead.status}
                onChange={(e) => patch("status", e.target.value)}
                options={LEAD_STATUSES.map((s) => ({ value: s, label: statusLabel(s) }))}
              />
            </Field>
            <Field label="Priority">
              <Select
                className="w-full [&_select]:w-full"
                value={lead.priority}
                onChange={(e) => patch("priority", e.target.value)}
                options={LEAD_PRIORITIES.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))}
              />
            </Field>
            <Field label="Assignee" full>
              <Select
                className="w-full [&_select]:w-full"
                value={lead.assigneeId ?? "unassigned"}
                onChange={(e) => patch("assigneeId", e.target.value)}
                options={assigneeOptions}
              />
            </Field>
          </div>

          {/* Tags */}
          {lead.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-fg-subtle" />
              {lead.tags.map((t) => (
                <span key={t} className="text-xs font-medium px-2 py-0.5 rounded-md bg-elevated text-fg-muted">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-fg-muted mb-1.5 block">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add context, next steps…"
              className="field resize-y"
            />
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs font-semibold text-fg-muted mb-3">Activity</p>
            <Timeline events={lead.timeline} />
          </div>
        </div>
      )}
    </Drawer>
  );
}

function ContactRow({ icon: Icon, value, href }: { icon: typeof Mail; value: string; href?: string }) {
  const inner = (
    <span className="flex items-center gap-2.5 text-sm text-fg">
      <Icon className="w-4 h-4 text-fg-subtle flex-shrink-0" />
      <span className="truncate">{value}</span>
    </span>
  );
  return href ? (
    <a href={href} className="block hover:text-primary transition-colors">{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="text-xs font-semibold text-fg-muted mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
