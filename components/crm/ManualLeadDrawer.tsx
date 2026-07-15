"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Drawer from "./Drawer";
import { Field, Select, TextArea } from "./controls";
import { LEAD_PRIORITIES, LEAD_STATUSES, statusLabel } from "./badges";
import {
  createManualLead,
  updateManualLead,
  type ManualLead,
  type ManualLeadInput,
} from "@/lib/crm/leads-api";
import type { LeadPriority, LeadStatus, LeadSocial } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   MANUAL LEAD — create / edit

   One drawer for both. The brief's target is "a team member can enter a lead in
   under two minutes", so only the name is required; everything else can be
   filled in later from the same form. Validation is inline and on blur, not on
   submit, so the form never rejects you after you have finished typing.
════════════════════════════════════════════════════════════════ */

const BUSINESS_TYPES = [
  "Retail & E-commerce", "Food & Hospitality", "Health & Wellness",
  "Real Estate", "Education & EdTech", "SaaS & Technology",
  "Professional Services", "Manufacturing", "Other",
];

const SOCIAL_PLATFORMS = [
  "instagram", "facebook", "linkedin", "youtube",
  "threads", "x", "whatsapp", "other",
] as const;

type Draft = {
  name: string; ownerMobile: string; email: string;
  businessName: string; businessType: string; address: string; website: string;
  budget: string; requirement: string; startDate: string; expectedEndDate: string;
  status: LeadStatus; statusDescription: string; priority: LeadPriority;
  socials: LeadSocial[];
};

const EMPTY: Draft = {
  name: "", ownerMobile: "", email: "",
  businessName: "", businessType: BUSINESS_TYPES[0], address: "", website: "",
  budget: "", requirement: "", startDate: "", expectedEndDate: "",
  status: "new", statusDescription: "", priority: "medium", socials: [],
};

const fromLead = (l: ManualLead): Draft => ({
  name: l.ownerName,
  ownerMobile: l.ownerMobile ?? "",
  email: l.ownerEmail ?? "",
  businessName: l.businessName ?? "",
  businessType: l.businessType ?? BUSINESS_TYPES[0],
  address: l.address ?? "",
  website: l.website ?? "",
  budget: l.budget != null ? String(l.budget) : "",
  requirement: l.requirement ?? "",
  startDate: l.startDate ? l.startDate.slice(0, 10) : "",
  expectedEndDate: l.expectedEndDate ? l.expectedEndDate.slice(0, 10) : "",
  status: l.status,
  statusDescription: l.statusDescription ?? "",
  priority: l.priority,
  socials: l.socials ?? [],
});

/** Inline validation. Only `name` is genuinely required. */
function validate(d: Draft): Partial<Record<keyof Draft, string>> {
  const e: Partial<Record<keyof Draft, string>> = {};
  if (!d.name.trim()) e.name = "Owner name is required";
  else if (d.name.trim().length < 2) e.name = "At least 2 characters";

  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()))
    e.email = "Enter a valid email address";
  if (d.ownerMobile && !/^[+()\-\s\d]{7,20}$/.test(d.ownerMobile.trim()))
    e.ownerMobile = "Enter a valid phone number";
  // Website is optional — but if given, it must be a real URL.
  if (d.website && !/^https?:\/\/.+\..+/.test(d.website.trim()))
    e.website = "Include https:// — or leave it blank";
  if (d.budget && (Number.isNaN(Number(d.budget)) || Number(d.budget) < 0))
    e.budget = "Enter a number, or leave it blank";
  if (d.startDate && d.expectedEndDate && d.expectedEndDate < d.startDate)
    e.expectedEndDate = "End date is before the start date";
  return e;
}

export default function ManualLeadDrawer({
  open,
  lead,
  onClose,
  onSaved,
}: {
  open: boolean;
  /** null => create; a lead => edit. */
  lead: ManualLead | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [d, setD] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  // Reset when the drawer opens (and when switching between create/edit).
  useEffect(() => {
    if (!open) return;
    setD(lead ? fromLead(lead) : EMPTY);
    setErrors({});
    setTouched({});
  }, [open, lead]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    const next = { ...d, [k]: v };
    setD(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Draft) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(d));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(d);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(d).map((k) => [k, true])));
    if (Object.keys(found).length) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    const payload: ManualLeadInput = {
      ownerName: d.name.trim(),
      ownerMobile: d.ownerMobile.trim() || undefined,
      ownerEmail: d.email.trim() || undefined,
      businessName: d.businessName.trim() || undefined,
      businessType: d.businessType || undefined,
      address: d.address.trim() || undefined,
      website: d.website.trim() || undefined,
      // An empty budget is valid — send null, not 0, so "unknown" and "zero"
      // stay distinguishable in the analytics.
      budget: d.budget ? Number(d.budget) : null,
      requirement: d.requirement.trim() || undefined,
      startDate: d.startDate || undefined,
      expectedEndDate: d.expectedEndDate || undefined,
      status: d.status,
      statusDescription: d.statusDescription.trim() || undefined,
      priority: d.priority,
      socials: d.socials.filter((s) => s.handle.trim()),
    };

    setSaving(true);
    try {
      if (lead) {
        await updateManualLead(lead.id, payload);
        toast.success("Lead updated — the client sees it immediately");
      } else {
        const { duplicates } = await createManualLead(payload);
        toast.success("Lead added");
        // Advisory, never blocking: a business can legitimately enquire twice.
        if (duplicates.length) {
          toast(
            `Heads up: ${duplicates.length} existing lead${duplicates.length > 1 ? "s" : ""} share this phone number.`,
            { icon: "⚠️", duration: 6000 },
          );
        }
      }
      onSaved();
      onClose();
    } catch {
      // The CRM had no .catch() anywhere — a failed save silently did nothing.
      toast.error("Could not save the lead. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={lead ? "Edit lead" : "Add a lead"}
      subtitle={
        lead
          ? lead.ownerName
          : "Captured at a meeting, walk-in, call, referral or event."
      }
      width="max-w-xl"
      footer={
        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
            Cancel
          </button>
          <button
            type="submit"
            form="manual-lead-form"
            disabled={saving}
            className="btn btn-primary btn-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </>
            ) : lead ? (
              "Save changes"
            ) : (
              "Add lead"
            )}
          </button>
        </div>
      }
    >
      <form id="manual-lead-form" onSubmit={submit} noValidate className="flex flex-col gap-6">
        <Section title="Owner">
          <Field label="Owner name" required error={touched.name ? errors.name : undefined}>
            <input
              className="field" value={d.name} autoFocus
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => blur("name")}
              placeholder="Ravi Kumar"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Mobile" error={touched.ownerMobile ? errors.ownerMobile : undefined}>
              <input
                className="field" value={d.ownerMobile} inputMode="tel"
                onChange={(e) => set("ownerMobile", e.target.value)}
                onBlur={() => blur("ownerMobile")}
                placeholder="+91 98765 43210"
              />
            </Field>
            <Field label="Email" error={touched.email ? errors.email : undefined}>
              <input
                className="field" value={d.email} inputMode="email"
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => blur("email")}
                placeholder="ravi@business.in"
              />
            </Field>
          </div>
        </Section>

        <Section title="Business">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Shop / company name">
              <input
                className="field" value={d.businessName}
                onChange={(e) => set("businessName", e.target.value)}
                placeholder="Sharma Electronics"
              />
            </Field>
            <Field label="Business type">
              <Select
                className="w-full [&_select]:w-full"
                value={d.businessType}
                onChange={(e) => set("businessType", e.target.value)}
                options={BUSINESS_TYPES.map((b) => ({ value: b, label: b }))}
              />
            </Field>
          </div>
          <Field label="Address">
            <TextArea
              value={d.address} rows={2}
              onChange={(e) => set("address", e.target.value)}
              placeholder="14 MG Road, Bengaluru, Karnataka 560001"
            />
          </Field>
          <Field
            label="Website"
            hint="Optional"
            error={touched.website ? errors.website : undefined}
          >
            <input
              className="field" value={d.website} inputMode="url"
              onChange={(e) => set("website", e.target.value)}
              onBlur={() => blur("website")}
              placeholder="https://sharmaelectronics.in"
            />
          </Field>
        </Section>

        <Section title="Project">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Estimated budget"
              hint="Leave blank if unknown"
              error={touched.budget ? errors.budget : undefined}
            >
              <input
                className="field" value={d.budget} inputMode="decimal"
                onChange={(e) => set("budget", e.target.value)}
                onBlur={() => blur("budget")}
                placeholder="250000"
              />
            </Field>
            <Field label="Priority">
              <Select
                className="w-full [&_select]:w-full"
                value={d.priority}
                onChange={(e) => set("priority", e.target.value as LeadPriority)}
                options={LEAD_PRIORITIES.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))}
              />
            </Field>
          </div>
          <Field label="Requirement">
            <TextArea
              value={d.requirement} rows={4}
              onChange={(e) => set("requirement", e.target.value)}
              placeholder="What do they need? Scope, must-haves, constraints…"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Start date">
              <input
                type="date" className="field" value={d.startDate}
                onChange={(e) => set("startDate", e.target.value)}
              />
            </Field>
            <Field
              label="Expected end date"
              error={touched.expectedEndDate ? errors.expectedEndDate : undefined}
            >
              <input
                type="date" className="field" value={d.expectedEndDate}
                onChange={(e) => set("expectedEndDate", e.target.value)}
                onBlur={() => blur("expectedEndDate")}
              />
            </Field>
          </div>
        </Section>

        <Section title="Status">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Lead status">
              <Select
                className="w-full [&_select]:w-full"
                value={d.status}
                onChange={(e) => set("status", e.target.value as LeadStatus)}
                options={LEAD_STATUSES.map((s) => ({ value: s, label: statusLabel(s) }))}
              />
            </Field>
          </div>
          <Field
            label="Status description"
            hint="Why did it change? Internal notes — the client sees this on their dashboard."
          >
            <TextArea
              value={d.statusDescription} rows={3}
              onChange={(e) => set("statusDescription", e.target.value)}
              placeholder="Met at the Bengaluru expo; demo booked for Friday."
            />
          </Field>
        </Section>

        <Section
          title="Social presence"
          action={
            <button
              type="button"
              aria-label="Add social profile"
              onClick={() =>
                set("socials", [...d.socials, { platform: "instagram", handle: "" }])
              }
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          }
        >
          {d.socials.length === 0 ? (
            <p className="text-xs text-fg-subtle">No social profiles yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {d.socials.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Select
                    className="[&_select]:w-36"
                    value={s.platform}
                    onChange={(e) => {
                      const next = [...d.socials];
                      next[i] = { ...next[i], platform: e.target.value as LeadSocial["platform"] };
                      set("socials", next);
                    }}
                    options={SOCIAL_PLATFORMS.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))}
                  />
                  <input
                    className="field flex-1"
                    value={s.handle}
                    onChange={(e) => {
                      const next = [...d.socials];
                      next[i] = { ...next[i], handle: e.target.value };
                      set("socials", next);
                    }}
                    placeholder="@handle or profile URL"
                  />
                  <button
                    type="button"
                    aria-label="Remove social profile"
                    onClick={() => set("socials", d.socials.filter((_, j) => j !== i))}
                    className="rounded-lg p-2 text-fg-subtle transition-colors hover:bg-elevated hover:text-rose-700 dark:hover:text-rose-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>
      </form>
    </Drawer>
  );
}

function Section({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between border-b border-line pb-2">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-fg-subtle">
          {title}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}
