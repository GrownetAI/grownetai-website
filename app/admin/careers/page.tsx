"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Copy,
  Archive,
  ArchiveRestore,
  Trash2,
  ArrowUp,
  ArrowDown,
  X,
  Briefcase,
  Save,
} from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import { Field, TextArea } from "@/components/crm/controls";
import { EmptyState } from "@/components/crm/states";
import {
  useJobs,
  useCareerContent,
  createJob,
  updateJob,
  deleteJob,
  archiveJob,
  duplicateJob,
  reorderJobs,
  saveContent,
} from "@/lib/careers/store";
import {
  type Job,
  type JobStatus,
  type EmploymentType,
  type CareerContent,
} from "@/lib/careers/data";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<JobStatus, string> = {
  open: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
  closed: "bg-rose-500/12 text-rose-700 dark:text-rose-400",
  draft: "bg-fg-subtle/15 text-fg-muted",
};
const EMPLOYMENT: EmploymentType[] = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

export default function AdminCareersPage() {
  const [tab, setTab] = useState<"jobs" | "content">("jobs");
  return (
    <div>
      <PageHeader
        title="Careers"
        description="Manage open roles and the public careers page content."
        actions={
          <div className="inline-flex rounded-full border border-line bg-panel p-1">
            {(["jobs", "content"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors",
                  tab === t ? "bg-fg text-page" : "text-fg-muted hover:text-fg",
                )}
              >
                {t === "content" ? "Page content" : "Jobs"}
              </button>
            ))}
          </div>
        }
      />
      {tab === "jobs" ? <JobsPanel /> : <ContentPanel />}
    </div>
  );
}

/* ══════════════ JOBS ══════════════ */
function JobsPanel() {
  const jobs = useJobs();
  const sorted = useMemo(() => [...jobs].sort((a, b) => a.order - b.order), [jobs]);
  const [editing, setEditing] = useState<Job | "new" | null>(null);

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...sorted];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    reorderJobs(arr.map((x) => x.id));
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-fg-muted">{sorted.length} roles</p>
        <button
          onClick={() => setEditing("new")}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> New role
        </button>
      </div>

      <Panel padded={false}>
        {sorted.length === 0 ? (
          <EmptyState icon={Briefcase} title="No roles yet" description="Create your first opening." />
        ) : (
          <div className="overflow-x-auto crm-scroll">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-fg-subtle">
                  <th className="py-3 pl-5">Order</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">Type</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sorted.map((job, i) => (
                  <tr key={job.id} className="hover:bg-elevated/50">
                    <td className="py-3 pl-5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="grid h-6 w-6 place-items-center rounded text-fg-subtle hover:text-fg disabled:opacity-30">
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => move(i, 1)} disabled={i === sorted.length - 1} aria-label="Move down" className="grid h-6 w-6 place-items-center rounded text-fg-subtle hover:text-fg disabled:opacity-30">
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-fg">{job.title}</p>
                      <p className="text-xs text-fg-subtle">{job.department} · {job.location}</p>
                    </td>
                    <td className="py-3 text-fg-muted">{job.type}</td>
                    <td className="py-3">
                      <select
                        value={job.status}
                        onChange={(e) => updateJob(job.id, { status: e.target.value as JobStatus })}
                        className={cn("rounded-full px-2.5 py-1 text-xs font-semibold capitalize outline-none", STATUS_STYLE[job.status])}
                      >
                        <option value="open">open</option>
                        <option value="closed">closed</option>
                        <option value="draft">draft</option>
                      </select>
                    </td>
                    <td className="py-3 pr-5">
                      <div className="flex items-center justify-end gap-1">
                        <IconBtn label="Edit" onClick={() => setEditing(job)}><Pencil className="h-4 w-4" /></IconBtn>
                        <IconBtn label="Duplicate" onClick={() => duplicateJob(job.id)}><Copy className="h-4 w-4" /></IconBtn>
                        <IconBtn label={job.archived ? "Unarchive" : "Archive"} onClick={() => archiveJob(job.id, !job.archived)}>
                          {job.archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                        </IconBtn>
                        <IconBtn label="Delete" danger onClick={() => { if (confirm(`Delete "${job.title}"?`)) deleteJob(job.id); }}>
                          <Trash2 className="h-4 w-4" />
                        </IconBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {editing && (
        <JobEditor
          job={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

function IconBtn({ children, label, onClick, danger }: { children: React.ReactNode; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} aria-label={label} title={label}
      className={cn("grid h-8 w-8 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:bg-elevated", danger ? "hover:text-rose-600" : "hover:text-fg")}>
      {children}
    </button>
  );
}

/* ── Job editor (drawer) ─────────────────────────────────────────── */
function JobEditor({ job, onClose }: { job: Job | null; onClose: () => void }) {
  const [f, setF] = useState({
    title: job?.title ?? "",
    department: job?.department ?? "",
    location: job?.location ?? "Remote",
    type: job?.type ?? ("Full-time" as EmploymentType),
    experienceLevel: job?.experienceLevel ?? "1–3 years",
    salary: job?.salary ?? "",
    deadline: job?.deadline ?? "",
    status: job?.status ?? ("draft" as JobStatus),
    summary: job?.summary ?? "",
    responsibilities: (job?.responsibilities ?? []).join("\n"),
    requirements: (job?.requirements ?? []).join("\n"),
    preferredSkills: (job?.preferredSkills ?? []).join("\n"),
    benefits: (job?.benefits ?? []).join("\n"),
  });
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  const save = () => {
    const patch = {
      title: f.title,
      department: f.department,
      location: f.location,
      type: f.type,
      experienceLevel: f.experienceLevel,
      salary: f.salary || undefined,
      deadline: f.deadline || undefined,
      status: f.status,
      summary: f.summary,
      responsibilities: lines(f.responsibilities),
      requirements: lines(f.requirements),
      preferredSkills: lines(f.preferredSkills),
      benefits: lines(f.benefits),
    };
    if (job) updateJob(job.id, patch);
    else createJob(patch);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-overlay/60 backdrop-blur-sm" onClick={onClose}>
      <div className="flex h-full w-full max-w-xl flex-col bg-page shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-lg font-bold text-fg">{job ? "Edit role" : "New role"}</h2>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg-muted hover:text-fg">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto crm-scroll p-6">
          <Field label="Job title" required><input className="field" value={f.title} onChange={(e) => set("title", e.target.value)} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Department"><input className="field" value={f.department} onChange={(e) => set("department", e.target.value)} /></Field>
            <Field label="Location"><input className="field" value={f.location} onChange={(e) => set("location", e.target.value)} /></Field>
            <Field label="Employment type">
              <select className="field" value={f.type} onChange={(e) => set("type", e.target.value)}>
                {EMPLOYMENT.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Experience level"><input className="field" value={f.experienceLevel} onChange={(e) => set("experienceLevel", e.target.value)} /></Field>
            <Field label="Salary (optional)"><input className="field" value={f.salary} onChange={(e) => set("salary", e.target.value)} placeholder="e.g. ₹6–10 LPA" /></Field>
            <Field label="Application deadline"><input type="date" className="field" value={f.deadline} onChange={(e) => set("deadline", e.target.value)} /></Field>
            <Field label="Status">
              <select className="field" value={f.status} onChange={(e) => set("status", e.target.value)}>
                <option value="draft">Draft</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </Field>
          </div>
          <Field label="Summary"><TextArea rows={2} value={f.summary} onChange={(e) => set("summary", e.target.value)} /></Field>
          <Field label="Responsibilities" hint="One per line"><TextArea rows={5} value={f.responsibilities} onChange={(e) => set("responsibilities", e.target.value)} /></Field>
          <Field label="Requirements" hint="One per line"><TextArea rows={4} value={f.requirements} onChange={(e) => set("requirements", e.target.value)} /></Field>
          <Field label="Preferred skills" hint="One per line"><TextArea rows={3} value={f.preferredSkills} onChange={(e) => set("preferredSkills", e.target.value)} /></Field>
          <Field label="Benefits" hint="One per line"><TextArea rows={3} value={f.benefits} onChange={(e) => set("benefits", e.target.value)} /></Field>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-line px-6 py-4">
          <button onClick={onClose} className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-fg-muted hover:text-fg">Cancel</button>
          <button onClick={save} disabled={!f.title.trim()} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
            <Save className="h-4 w-4" /> Save role
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════ CONTENT ══════════════ */
function ContentPanel() {
  const stored = useCareerContent();
  const [c, setC] = useState<CareerContent>(stored);
  const [saved, setSaved] = useState(false);

  const save = () => { saveContent(c); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-4">
      <Panel title="Hero">
        <div className="space-y-4">
          <Field label="Eyebrow"><input className="field" value={c.hero.eyebrow} onChange={(e) => setC({ ...c, hero: { ...c.hero, eyebrow: e.target.value } })} /></Field>
          <Field label="Title"><input className="field" value={c.hero.title} onChange={(e) => setC({ ...c, hero: { ...c.hero, title: e.target.value } })} /></Field>
          <Field label="Subtitle"><TextArea rows={2} value={c.hero.subtitle} onChange={(e) => setC({ ...c, hero: { ...c.hero, subtitle: e.target.value } })} /></Field>
          <Field label="CTA label"><input className="field" value={c.hero.ctaLabel} onChange={(e) => setC({ ...c, hero: { ...c.hero, ctaLabel: e.target.value } })} /></Field>
          <Field label="Intro"><TextArea rows={2} value={c.intro} onChange={(e) => setC({ ...c, intro: e.target.value })} /></Field>
        </div>
      </Panel>

      <ListEditor title="Company culture" items={c.culture} keyA="title" keyB="desc" labelA="Title" labelB="Description"
        onChange={(culture) => setC({ ...c, culture })} />
      <ListEditor title="Hiring process" items={c.hiringProcess} keyA="step" keyB="desc" labelA="Step" labelB="Description"
        onChange={(hiringProcess) => setC({ ...c, hiringProcess })} />
      <ListEditor title="Benefits" items={c.benefits} keyA="title" keyB="desc" labelA="Title" labelB="Description"
        onChange={(benefits) => setC({ ...c, benefits })} />

      <Panel title="Closing CTA">
        <div className="space-y-4">
          <Field label="Title"><input className="field" value={c.cta.title} onChange={(e) => setC({ ...c, cta: { ...c.cta, title: e.target.value } })} /></Field>
          <Field label="Subtitle"><TextArea rows={2} value={c.cta.subtitle} onChange={(e) => setC({ ...c, cta: { ...c.cta, subtitle: e.target.value } })} /></Field>
        </div>
      </Panel>

      <div className="flex items-center justify-end gap-3">
        {saved && <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Saved — live on /careers</span>}
        <button onClick={save} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
          <Save className="h-4 w-4" /> Save content
        </button>
      </div>
    </div>
  );
}

function ListEditor<T extends Record<string, string>>({
  title, items, keyA, keyB, labelA, labelB, onChange,
}: {
  title: string; items: T[]; keyA: keyof T; keyB: keyof T; labelA: string; labelB: string; onChange: (items: T[]) => void;
}) {
  const upd = (i: number, k: keyof T, v: string) => onChange(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));
  const add = () => onChange([...items, { [keyA]: "", [keyB]: "" } as T]);
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  return (
    <Panel title={title} action={<button onClick={add} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"><Plus className="h-3.5 w-3.5" /> Add</button>}>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2 rounded-xl border border-line bg-elevated/40 p-3">
            <div className="grid flex-1 gap-2 sm:grid-cols-[1fr_2fr]">
              <input className="field" placeholder={labelA} value={it[keyA]} onChange={(e) => upd(i, keyA, e.target.value)} />
              <input className="field" placeholder={labelB} value={it[keyB]} onChange={(e) => upd(i, keyB, e.target.value)} />
            </div>
            <button onClick={() => remove(i)} aria-label="Remove" className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg border border-line text-fg-muted hover:text-rose-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-fg-subtle">Nothing here yet — add an item.</p>}
      </div>
    </Panel>
  );
}
