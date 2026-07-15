"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import Pagination from "@/components/crm/Pagination";
import CompanyDrawer from "@/components/crm/CompanyDrawer";
import { SearchInput, Select } from "@/components/crm/controls";
import { Skeleton, EmptyState } from "@/components/crm/states";
import { listAllCompanies, type CompanyQuery, type CompanyPage } from "@/lib/crm/admin-api";
import { fmtMoney, fmtNumber, fmtDate } from "@/lib/crm/format";
import { cn } from "@/lib/utils";

const PLAN_STYLE: Record<string, string> = {
  starter: "text-fg-muted bg-fg-subtle/10",
  growth: "text-primary bg-primary/10",
  enterprise: "text-violet-700 bg-violet-500/10 dark:text-violet-300",
};

export default function AdminCompaniesPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [plan, setPlan] = useState("all");
  const [sortBy, setSortBy] = useState<CompanyQuery["sortBy"]>("leads");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<CompanyPage | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // Auto-open a company when linked from the overview (?c=<id>), client-side.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    if (c) setSelected(c);
  }, []);

  useEffect(() => { const t = setTimeout(() => setDebounced(search), 300); return () => clearTimeout(t); }, [search]);
  useEffect(() => { setPage(1); }, [debounced, plan, sortBy, sortDir]);

  const query = useMemo<CompanyQuery>(() => ({ search: debounced, plan: plan as CompanyQuery["plan"], sortBy, sortDir, page, pageSize: 8 }), [debounced, plan, sortBy, sortDir, page]);
  useEffect(() => { listAllCompanies(query).then(setData); }, [query]);

  function toggleSort(col: NonNullable<CompanyQuery["sortBy"]>) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir(col === "name" ? "asc" : "desc"); }
  }

  return (
    <div>
      <PageHeader title="Companies" description="Every tenant on the platform." />

      <Panel className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <SearchInput value={search} onChange={setSearch} placeholder="Search company or domain…" className="sm:w-72" />
          <Select label="Plan" value={plan} onChange={(e) => setPlan(e.target.value)} className="sm:ml-auto"
            options={[{ value: "all", label: "All plans" }, { value: "starter", label: "Starter" }, { value: "growth", label: "Growth" }, { value: "enterprise", label: "Enterprise" }]} />
        </div>
      </Panel>

      <Panel padded={false}>
        <div className="overflow-x-auto crm-scroll">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="border-b border-line text-left">
                <SortTh label="Company" col="name" {...{ sortBy, sortDir, toggleSort }} className="pl-5" />
                <th className="py-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Plan</th>
                <SortTh label="Leads" col="leads" align="right" {...{ sortBy, sortDir, toggleSort }} />
                <SortTh label="Revenue" col="revenue" align="right" {...{ sortBy, sortDir, toggleSort }} />
                <th className="py-3 text-right text-xs font-semibold uppercase tracking-wide text-fg-subtle">Platforms</th>
                <SortTh label="Joined" col="createdAt" align="right" {...{ sortBy, sortDir, toggleSort }} className="pr-5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {!data ? (
                Array.from({ length: 6 }).map((_, i) => <tr key={i}><td colSpan={6} className="px-5 py-3"><Skeleton className="h-9" /></td></tr>)
              ) : data.items.length ? (
                data.items.map((c) => (
                  <tr key={c.id} onClick={() => setSelected(c.id)} className="cursor-pointer hover:bg-elevated/60 transition-colors">
                    <td className="pl-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg grid place-items-center bg-primary/10 text-primary font-bold flex-shrink-0">{c.name.slice(0, 1)}</span>
                        <div className="min-w-0"><p className="font-medium text-fg truncate">{c.name}</p><p className="text-xs text-fg-subtle truncate">{c.domain}</p></div>
                      </div>
                    </td>
                    <td className="py-3"><span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full capitalize", PLAN_STYLE[c.plan])}>{c.plan}</span></td>
                    <td className="py-3 text-right tabular-nums text-fg font-medium">{fmtNumber(c.leads)}</td>
                    <td className="py-3 text-right tabular-nums text-fg">{fmtMoney(c.revenue, true)}</td>
                    <td className="py-3 text-right tabular-nums text-fg-muted">
                      {c.connectedPlatforms}{c.erroredPlatforms > 0 && <span className="text-rose-700 dark:text-rose-400"> · {c.erroredPlatforms}⚠</span>}
                    </td>
                    <td className="pr-5 py-3 text-right text-fg-subtle whitespace-nowrap">{fmtDate(c.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6}><EmptyState icon={Building2} title="No companies found" description="Try a different search or plan filter." /></td></tr>
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

      <CompanyDrawer companyId={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function SortTh({ label, col, sortBy, sortDir, toggleSort, align = "left", className = "" }: {
  label: string; col: NonNullable<CompanyQuery["sortBy"]>; sortBy: CompanyQuery["sortBy"]; sortDir: "asc" | "desc";
  toggleSort: (c: NonNullable<CompanyQuery["sortBy"]>) => void; align?: "left" | "right"; className?: string;
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
