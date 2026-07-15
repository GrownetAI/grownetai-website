"use client";

import { useEffect, useMemo, useState } from "react";
import { Users, ArrowUpDown, ArrowUp, ArrowDown, X } from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import Avatar from "@/components/crm/Avatar";
import PlatformBadge from "@/components/crm/PlatformBadge";
import Pagination from "@/components/crm/Pagination";
import Drawer from "@/components/crm/Drawer";
import Timeline from "@/components/crm/Timeline";
import { SearchInput, Select } from "@/components/crm/controls";
import { StatusBadge, PriorityBadge, SyncBadge, LEAD_STATUSES, LEAD_PRIORITIES, statusLabel } from "@/components/crm/badges";
import { Skeleton, EmptyState } from "@/components/crm/states";
import { listAllLeads, listCompaniesLite, type AdminLeadQuery, type AdminLeadPage, type AdminLeadRow } from "@/lib/crm/admin-api";
import { PLATFORM_ORDER, platformMeta } from "@/lib/crm/platforms";
import { fmtMoney, fmtDate, timeAgo } from "@/lib/crm/format";

export default function AdminLeadsPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [companyId, setCompanyId] = useState("all");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sortBy, setSortBy] = useState<AdminLeadQuery["sortBy"]>("receivedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<AdminLeadPage | null>(null);
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);
  const [selected, setSelected] = useState<AdminLeadRow | null>(null);

  useEffect(() => { listCompaniesLite().then(setCompanies); }, []);
  useEffect(() => { const t = setTimeout(() => setDebounced(search), 300); return () => clearTimeout(t); }, [search]);
  useEffect(() => { setPage(1); }, [debounced, companyId, status, source, priority, sortBy, sortDir]);

  const query = useMemo<AdminLeadQuery>(() => ({
    search: debounced, companyId, status: status as AdminLeadQuery["status"], source: source as AdminLeadQuery["source"],
    priority: priority as AdminLeadQuery["priority"], sortBy, sortDir, page, pageSize: 12,
  }), [debounced, companyId, status, source, priority, sortBy, sortDir, page]);

  useEffect(() => { listAllLeads(query).then(setData); }, [query]);

  function toggleSort(col: NonNullable<AdminLeadQuery["sortBy"]>) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir(col === "name" ? "asc" : "desc"); }
  }

  const activeFilters = [companyId, status, source, priority].filter((v) => v !== "all").length + (debounced ? 1 : 0);
  function reset() { setSearch(""); setCompanyId("all"); setStatus("all"); setSource("all"); setPriority("all"); }

  return (
    <div>
      <PageHeader title="All Leads" description="Every lead across every company — searchable, sortable, filterable." />

      <Panel className="mb-4">
        <div className="flex flex-col xl:flex-row xl:items-center gap-3">
          <SearchInput value={search} onChange={setSearch} placeholder="Search name or email…" className="xl:w-64" />
          <div className="flex flex-wrap items-center gap-2 xl:ml-auto">
            <Select label="Company" value={companyId} onChange={(e) => setCompanyId(e.target.value)}
              options={[{ value: "all", label: "All companies" }, ...companies.map((c) => ({ value: c.id, label: c.name }))]} />
            <Select label="Source" value={source} onChange={(e) => setSource(e.target.value)}
              options={[{ value: "all", label: "All sources" }, ...PLATFORM_ORDER.map((p) => ({ value: p, label: platformMeta(p).label }))]} />
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}
              options={[{ value: "all", label: "All statuses" }, ...LEAD_STATUSES.map((s) => ({ value: s, label: statusLabel(s) }))]} />
            <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}
              options={[{ value: "all", label: "All priorities" }, ...LEAD_PRIORITIES.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))]} />
            {activeFilters > 0 && <button onClick={reset} className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg px-2 py-2"><X className="w-3.5 h-3.5" /> Clear ({activeFilters})</button>}
          </div>
        </div>
      </Panel>

      <Panel padded={false}>
        <div className="overflow-x-auto crm-scroll">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-line text-left">
                <SortTh label="Lead" col="name" {...{ sortBy, sortDir, toggleSort }} className="pl-5" />
                <th className="py-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Company</th>
                <th className="py-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Source</th>
                <th className="py-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Status</th>
                <th className="py-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Priority</th>
                <SortTh label="Value" col="value" align="right" {...{ sortBy, sortDir, toggleSort }} />
                <SortTh label="Received" col="receivedAt" align="right" {...{ sortBy, sortDir, toggleSort }} className="pr-5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {!data ? (
                Array.from({ length: 9 }).map((_, i) => <tr key={i}><td colSpan={7} className="px-5 py-3"><Skeleton className="h-9" /></td></tr>)
              ) : data.items.length ? (
                data.items.map((l) => (
                  <tr key={l.id} onClick={() => setSelected(l)} className="cursor-pointer hover:bg-elevated/60 transition-colors">
                    <td className="pl-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={l.name} size="sm" />
                        <div className="min-w-0"><p className="font-medium text-fg truncate">{l.name}</p><p className="text-xs text-fg-subtle truncate">{l.email}</p></div>
                      </div>
                    </td>
                    <td className="py-3 text-fg-muted">{l.companyName}</td>
                    <td className="py-3"><PlatformBadge platform={l.source} size="sm" withLabel /></td>
                    <td className="py-3"><StatusBadge status={l.status} /></td>
                    <td className="py-3"><PriorityBadge priority={l.priority} /></td>
                    <td className="py-3 text-right tabular-nums text-fg font-medium">{fmtMoney(l.value)}</td>
                    <td className="pr-5 py-3 text-right text-fg-subtle whitespace-nowrap">{timeAgo(l.receivedAt)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7}><EmptyState icon={Users} title="No leads match" description="Adjust your filters or search." action={activeFilters > 0 ? <button onClick={reset} className="btn btn-secondary btn-sm">Clear filters</button> : undefined} /></td></tr>
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

      {/* Read-only lead detail */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name} subtitle={selected ? `${selected.companyName} · ${platformMeta(selected.source).label}` : undefined}>
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Avatar name={selected.name} size="lg" />
              <div className="min-w-0">
                <p className="font-semibold text-fg truncate">{selected.name}</p>
                <div className="mt-1"><SyncBadge status={selected.syncStatus} /></div>
              </div>
              <div className="ml-auto text-right"><p className="text-xs text-fg-muted">Value</p><p className="text-lg font-bold text-fg tabular-nums">{fmtMoney(selected.value)}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Company" value={selected.companyName} />
              <Info label="Source" value={platformMeta(selected.source).label} />
              <Info label="Status" value={statusLabel(selected.status)} />
              <Info label="Priority" value={selected.priority} />
              {selected.email && <Info label="Email" value={selected.email} full />}
              {selected.phone && <Info label="Phone" value={selected.phone} />}
              <Info label="Captured" value={fmtDate(selected.receivedAt)} />
            </div>
            <div>
              <p className="text-xs font-semibold text-fg-muted mb-3">Activity</p>
              <Timeline events={selected.timeline} />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function Info({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-xs text-fg-subtle">{label}</p>
      <p className="text-sm text-fg font-medium capitalize truncate">{value}</p>
    </div>
  );
}

function SortTh({ label, col, sortBy, sortDir, toggleSort, align = "left", className = "" }: {
  label: string; col: NonNullable<AdminLeadQuery["sortBy"]>; sortBy: AdminLeadQuery["sortBy"]; sortDir: "asc" | "desc";
  toggleSort: (c: NonNullable<AdminLeadQuery["sortBy"]>) => void; align?: "left" | "right"; className?: string;
}) {
  const active = sortBy === col;
  const Icon = !active ? ArrowUpDown : sortDir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th className={`py-3 ${className}`}>
      <button onClick={() => toggleSort(col)} className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors ${active ? "text-fg" : "text-fg-subtle hover:text-fg"} ${align === "right" ? "flex-row-reverse w-full" : ""}`}>
        {label}<Icon className="w-3.5 h-3.5" />
      </button>
    </th>
  );
}
