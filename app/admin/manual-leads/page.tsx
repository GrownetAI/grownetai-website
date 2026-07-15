"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PenLine, Pencil, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import Pagination from "@/components/crm/Pagination";
import Avatar from "@/components/crm/Avatar";
import ManualLeadDrawer from "@/components/crm/ManualLeadDrawer";
import { SearchInput, Select } from "@/components/crm/controls";
import { StatusBadge, PriorityBadge, LEAD_STATUSES, statusLabel } from "@/components/crm/badges";
import { EmptyState, ErrorState, Skeleton } from "@/components/crm/states";
import { deleteManualLead, listManualLeads, subscribeToLeads, type ManualLead } from "@/lib/crm/leads-api";
import { fmtMoney, timeAgo } from "@/lib/crm/format";
import type { LeadStatus } from "@/lib/crm/types";

/* ════════════════════════════════════════════════════════════════
   MANUAL LEADS  —  ADMIN PANEL

   Where the team enters leads captured offline: meetings, walk-ins, calls,
   referrals, exhibitions.

   These go through the REAL backend, not the CRM's mock store. That is not
   incidental: the whole point of the module is that an admin edits a lead here
   and the CLIENT — a different person, in a different browser — sees the new
   status on their dashboard without refreshing. A module-level JS array cannot
   cross a browser boundary; the API + its SSE stream can.
════════════════════════════════════════════════════════════════ */

const PAGE_SIZE = 10;

export default function AdminManualLeadsPage() {
  const [rows, setRows] = useState<ManualLead[] | null>(null);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"receivedAt" | "value" | "name">("receivedAt");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<ManualLead | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => setPage(1), [debounced, status, sortBy]);

  useEffect(() => {
    let alive = true;
    setRows(null);
    setError(false);
    listManualLeads({
      search: debounced || undefined,
      status: status === "all" ? undefined : status,
      sortBy: sortBy === "name" ? "owner_name" : sortBy === "value" ? "value" : "created_at",
      sortDir: "desc",
      page,
      pageSize: PAGE_SIZE,
    })
      .then((res) => {
        if (!alive) return;
        setRows(res.items);
        setTotal(res.total);
      })
      // The CRM had no .catch() anywhere: a failed request left the page stuck
      // on its skeleton forever, with no way to retry.
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [debounced, status, sortBy, page, reloadKey]);

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(total / PAGE_SIZE)),
    [total],
  );

  // Another admin's create/edit/delete lands here too, without a refresh.
  useEffect(() => subscribeToLeads(() => reload()), [reload]);

  async function remove(lead: ManualLead) {
    if (!window.confirm(`Delete ${lead.ownerName}? This cannot be undone.`)) return;
    try {
      await deleteManualLead(lead.id);
      toast.success("Lead deleted");
      reload();
    } catch {
      toast.error("Could not delete the lead.");
    }
  }

  return (
    <>
      <PageHeader
        title="Manual Leads"
        description="Leads your team captured in person — meetings, walk-ins, calls, referrals and events."
        actions={
          <button
            onClick={() => {
              setEditing(null);
              setDrawerOpen(true);
            }}
            className="btn btn-primary btn-sm"
          >
            <Plus className="h-4 w-4" /> Add lead
          </button>
        }
      />

      <Panel className="mt-6" bodyClassName="p-0">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name, business, phone or email…"
            className="sm:max-w-sm sm:flex-1"
          />
          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus | "all")}
              options={[
                { value: "all", label: "All statuses" },
                ...LEAD_STATUSES.map((s) => ({ value: s, label: statusLabel(s) })),
              ]}
            />
            <Select
              label="Sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              options={[
                { value: "receivedAt", label: "Newest" },
                { value: "value", label: "Budget" },
                { value: "name", label: "Name" },
              ]}
            />
          </div>
        </div>

        {error ? (
          <ErrorState
            className="m-4 border-0"
            description="We couldn't load your manual leads."
            onRetry={reload}
          />
        ) : rows === null ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <EmptyState
            className="border-0"
            icon={PenLine}
            title={debounced || status !== "all" ? "No matching leads" : "No manual leads yet"}
            description={
              debounced || status !== "all"
                ? "Try a different search or status filter."
                : "Add the first lead your team captured offline — it takes under two minutes."
            }
            action={
              <button
                onClick={() => {
                  setEditing(null);
                  setDrawerOpen(true);
                }}
                className="btn btn-primary btn-sm"
              >
                <Plus className="h-4 w-4" /> Add lead
              </button>
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
                    <th className="px-4 py-3">Lead</th>
                    <th className="px-4 py-3">Business</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3 text-right">Budget</th>
                    <th className="px-4 py-3 text-right">Added</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((l) => (
                    <tr
                      key={l.id}
                      className="border-b border-line last:border-0 transition-colors hover:bg-elevated"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={l.ownerName} size="sm" />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-fg">{l.ownerName}</p>
                            <p className="truncate text-xs text-fg-subtle">
                              {l.ownerMobile ?? l.ownerEmail ?? "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="truncate text-fg">{l.businessName ?? "—"}</p>
                        <p className="truncate text-xs text-fg-subtle">{l.businessType ?? ""}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={l.status} />
                      </td>
                      <td className="px-4 py-3">
                        <PriorityBadge priority={l.priority} />
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-fg">
                        {/* An empty budget is valid and must not read as zero. */}
                        {l.budget != null ? fmtMoney(l.budget) : <span className="text-fg-subtle">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-fg-muted">
                        {timeAgo(l.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            aria-label={`Edit ${l.ownerName}`}
                            onClick={() => {
                              setEditing(l);
                              setDrawerOpen(true);
                            }}
                            className="rounded-lg p-2 text-fg-subtle transition-colors hover:bg-panel hover:text-fg"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            aria-label={`Delete ${l.ownerName}`}
                            onClick={() => remove(l)}
                            className="rounded-lg p-2 text-fg-subtle transition-colors hover:bg-panel hover:text-rose-700 dark:hover:text-rose-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={page}
              pageCount={pageCount}
              pageSize={PAGE_SIZE}
              total={total}
              onPage={setPage}
            />
          </>
        )}
      </Panel>

      <ManualLeadDrawer
        open={drawerOpen}
        lead={editing}
        onClose={() => setDrawerOpen(false)}
        onSaved={reload}
      />
    </>
  );
}
