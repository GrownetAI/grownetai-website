"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Users,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import Avatar from "@/components/crm/Avatar";
import PlatformBadge from "@/components/crm/PlatformBadge";
import Pagination from "@/components/crm/Pagination";
import Drawer from "@/components/crm/Drawer";
import LeadDrawer from "@/components/crm/LeadDrawer";
import { SearchInput, Select } from "@/components/crm/controls";
import { StatusBadge, PriorityBadge, LEAD_STATUSES, LEAD_PRIORITIES, statusLabel } from "@/components/crm/badges";
import { Skeleton, EmptyState } from "@/components/crm/states";
import { listLeads, listTeam, createLead, type LeadQuery, type LeadPage } from "@/lib/crm/api";
import { PLATFORM_ORDER, platformMeta } from "@/lib/crm/platforms";
import { fmtMoney, timeAgo } from "@/lib/crm/format";
import type { PlatformId, TeamMember, LeadPriority } from "@/lib/crm/types";

const PAGE_SIZE = 10;

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [source, setSource] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [assignee, setAssignee] = useState<string>("all");
  const [sortBy, setSortBy] = useState<LeadQuery["sortBy"]>("receivedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<LeadPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    listTeam().then(setTeam);
  }, []);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debounced, status, source, priority, assignee, sortBy, sortDir]);

  const query = useMemo<LeadQuery>(
    () => ({
      search: debounced,
      status: status as LeadQuery["status"],
      source: source as LeadQuery["source"],
      priority: priority as LeadQuery["priority"],
      assigneeId: assignee,
      sortBy,
      sortDir,
      page,
      pageSize: PAGE_SIZE,
    }),
    [debounced, status, source, priority, assignee, sortBy, sortDir, page],
  );

  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    setLoading(true);
    listLeads(query).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [query, reloadKey]);

  const reload = () => setReloadKey((k) => k + 1);

  function toggleSort(col: NonNullable<LeadQuery["sortBy"]>) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir(col === "name" ? "asc" : "desc");
    }
  }

  const activeFilters =
    (status !== "all" ? 1 : 0) +
    (source !== "all" ? 1 : 0) +
    (priority !== "all" ? 1 : 0) +
    (assignee !== "all" ? 1 : 0) +
    (debounced ? 1 : 0);

  function resetFilters() {
    setSearch("");
    setStatus("all");
    setSource("all");
    setPriority("all");
    setAssignee("all");
  }

  const memberById = useMemo(() => Object.fromEntries(team.map((m) => [m.id, m])), [team]);

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Every lead captured across your connected platforms."
        actions={
          <button onClick={() => setAddOpen(true)} className="btn btn-primary btn-sm">
            <Plus className="w-4 h-4" /> Add lead
          </button>
        }
      />

      {/* Filters */}
      <Panel className="mb-4" padded>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, company…" className="lg:w-72" />
          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}
              options={[{ value: "all", label: "All statuses" }, ...LEAD_STATUSES.map((s) => ({ value: s, label: statusLabel(s) }))]} />
            <Select label="Source" value={source} onChange={(e) => setSource(e.target.value)}
              options={[{ value: "all", label: "All sources" }, ...PLATFORM_ORDER.map((p) => ({ value: p, label: platformMeta(p).label }))]} />
            <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}
              options={[{ value: "all", label: "All priorities" }, ...LEAD_PRIORITIES.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))]} />
            <Select label="Assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)}
              options={[{ value: "all", label: "All assignees" }, { value: "unassigned", label: "Unassigned" }, ...team.map((m) => ({ value: m.id, label: m.name }))]} />
            {activeFilters > 0 && (
              <button onClick={resetFilters} className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg px-2 py-2">
                <X className="w-3.5 h-3.5" /> Clear ({activeFilters})
              </button>
            )}
          </div>
        </div>
      </Panel>

      {/* Table */}
      <Panel padded={false}>
        <div className="overflow-x-auto crm-scroll">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="border-b border-line text-left">
                <SortHeader label="Lead" col="name" sortBy={sortBy} sortDir={sortDir} onSort={toggleSort} className="pl-5" />
                <Th>Source</Th>
                <Th>Status</Th>
                <Th>Priority</Th>
                <Th>Assignee</Th>
                <SortHeader label="Value" col="value" sortBy={sortBy} sortDir={sortDir} onSort={toggleSort} align="right" />
                <SortHeader label="Received" col="receivedAt" sortBy={sortBy} sortDir={sortDir} onSort={toggleSort} align="right" className="pr-5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {loading && !data ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-5 py-3"><Skeleton className="h-9" /></td>
                  </tr>
                ))
              ) : data && data.items.length > 0 ? (
                data.items.map((l) => {
                  const m = l.assigneeId ? memberById[l.assigneeId] : undefined;
                  return (
                    <tr
                      key={l.id}
                      onClick={() => setSelected(l.id)}
                      className="cursor-pointer hover:bg-elevated/60 transition-colors"
                    >
                      <td className="pl-5 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={l.name} size="sm" />
                          <div className="min-w-0">
                            <p className="font-medium text-fg truncate">{l.name}</p>
                            <p className="text-xs text-fg-subtle truncate">{l.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3"><PlatformBadge platform={l.source} size="sm" withLabel /></td>
                      <td className="py-3"><StatusBadge status={l.status} /></td>
                      <td className="py-3"><PriorityBadge priority={l.priority} /></td>
                      <td className="py-3">
                        {m ? (
                          <span className="flex items-center gap-2"><Avatar name={m.name} src={m.avatar} size="sm" /><span className="text-fg-muted hidden xl:inline">{m.name}</span></span>
                        ) : (
                          <span className="text-fg-subtle">—</span>
                        )}
                      </td>
                      <td className="py-3 text-right tabular-nums text-fg font-medium">{fmtMoney(l.value)}</td>
                      <td className="pr-5 py-3 text-right text-fg-subtle whitespace-nowrap">{timeAgo(l.receivedAt)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <EmptyState icon={Users} title="No leads match your filters" description="Try clearing filters or broadening your search."
                      action={activeFilters > 0 ? <button onClick={resetFilters} className="btn btn-secondary btn-sm">Clear filters</button> : undefined} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {data && data.total > 0 && (
          <div className="px-5 py-3 border-t border-line">
            <Pagination page={data.page} pageCount={data.pageCount} pageSize={data.pageSize} total={data.total} onPage={setPage} />
          </div>
        )}
      </Panel>

      <LeadDrawer leadId={selected} team={team} onClose={() => setSelected(null)} onUpdated={reload} />
      <AddLeadDrawer open={addOpen} onClose={() => setAddOpen(false)} onCreated={() => { reload(); setAddOpen(false); }} />
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th className={`py-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle ${align === "right" ? "text-right" : "text-left"}`}>
      {children}
    </th>
  );
}

function SortHeader({
  label, col, sortBy, sortDir, onSort, align = "left", className = "",
}: {
  label: string;
  col: NonNullable<LeadQuery["sortBy"]>;
  sortBy: LeadQuery["sortBy"];
  sortDir: "asc" | "desc";
  onSort: (c: NonNullable<LeadQuery["sortBy"]>) => void;
  align?: "left" | "right";
  className?: string;
}) {
  const active = sortBy === col;
  const Icon = !active ? ArrowUpDown : sortDir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th className={`py-3 ${className}`}>
      <button
        onClick={() => onSort(col)}
        className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors ${active ? "text-fg" : "text-fg-subtle hover:text-fg"} ${align === "right" ? "flex-row-reverse w-full justify-start" : ""}`}
      >
        {label}
        <Icon className="w-3.5 h-3.5" />
      </button>
    </th>
  );
}

/* ── Add lead ── */
function AddLeadDrawer({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", source: "website" as PlatformId, priority: "medium" as LeadPriority, value: "" });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Name is required");
    setSaving(true);
    await createLead({
      name: form.name.trim(),
      email: form.email || undefined,
      phone: form.phone || undefined,
      company: form.company || undefined,
      source: form.source,
      priority: form.priority,
      value: form.value ? Number(form.value) : 0,
    });
    setSaving(false);
    toast.success("Lead added");
    setForm({ name: "", email: "", phone: "", company: "", source: "website", priority: "medium", value: "" });
    onCreated();
  }

  return (
    <Drawer open={open} onClose={onClose} title="Add lead" subtitle="Create a lead manually"
      footer={<button form="add-lead" type="submit" disabled={saving} className="btn btn-primary w-full justify-center disabled:opacity-60">{saving ? "Adding…" : "Add lead"}</button>}>
      <form id="add-lead" onSubmit={submit} className="space-y-4">
        <FormRow label="Full name" required><input className="field" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Cooper" /></FormRow>
        <FormRow label="Email"><input className="field" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" /></FormRow>
        <div className="grid grid-cols-2 gap-3">
          <FormRow label="Phone"><input className="field" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 …" /></FormRow>
          <FormRow label="Company"><input className="field" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Inc" /></FormRow>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormRow label="Source">
            <Select className="w-full [&_select]:w-full" value={form.source} onChange={(e) => set("source", e.target.value)}
              options={PLATFORM_ORDER.map((p) => ({ value: p, label: platformMeta(p).label }))} />
          </FormRow>
          <FormRow label="Priority">
            <Select className="w-full [&_select]:w-full" value={form.priority} onChange={(e) => set("priority", e.target.value)}
              options={LEAD_PRIORITIES.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))} />
          </FormRow>
        </div>
        <FormRow label="Estimated value (USD)"><input className="field" type="number" min="0" value={form.value} onChange={(e) => set("value", e.target.value)} placeholder="0" /></FormRow>
      </form>
    </Drawer>
  );
}

function FormRow({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-fg-muted mb-1.5 block">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}
