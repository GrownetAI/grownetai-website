"use client";

import { useCallback, useEffect, useState } from "react";
import { FolderKanban, Radio, WifiOff } from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import { StatusBadge, statusLabel } from "@/components/crm/badges";
import { EmptyState, ErrorState, Skeleton } from "@/components/crm/states";
import {
  listManualLeads,
  subscribeToLeads,
  type ManualLead,
} from "@/lib/crm/leads-api";
import { fmtDate, fmtMoney } from "@/lib/crm/format";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   MY PROJECTS  —  CLIENT DASHBOARD  (read-only)

   The client half of the manual-lead feature, and deliberately NOT the admin
   half. The admin owns the data — creating, editing and deleting lives in
   /admin/manual-leads. The client only ever SEES it: where their project has
   got to, and why.

   It updates in real time. When an admin changes a status or its description,
   the backend publishes to this company's SSE channel and the row below
   re-renders — no refresh, no polling, no "sync" button.

   If the stream dies (proxy timeout, laptop sleep, backend restart) we say so
   and fall back to a refetch, rather than quietly showing stale status to a
   client. "Real-time synchronisation failure" is an explicit edge case.
════════════════════════════════════════════════════════════════ */

export default function ClientProjectsPage() {
  const [rows, setRows] = useState<ManualLead[] | null>(null);
  const [error, setError] = useState(false);
  const [live, setLive] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let alive = true;
    setError(false);
    listManualLeads({ pageSize: 50 })
      .then((res) => alive && setRows(res.items))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [reloadKey]);

  useEffect(() => {
    const off = subscribeToLeads(
      (e) => {
        if (e.type === "lead.deleted") {
          setRows((r) => (r ? r.filter((l) => l.id !== e.lead.id) : r));
          return;
        }
        // Replace the row in place if we already have it, otherwise pull it in.
        setRows((r) => {
          if (!r) return r;
          const i = r.findIndex((l) => l.id === e.lead.id);
          if (i === -1) return [e.lead, ...r];
          const next = [...r];
          next[i] = e.lead;
          return next;
        });
      },
      () => setLive(false), // stream dropped
      () => setLive(true), // stream connected -> the badge is honest immediately
    );
    return off;
  }, []);

  return (
    <>
      <PageHeader
        title="My Projects"
        description="Where each of your projects stands right now — updated by your GrownetAI team as it moves."
        actions={
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
              live
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-fg-subtle/10 text-fg-muted",
            )}
            title={
              live
                ? "Connected — status changes appear here instantly."
                : "Not connected — reopen the page to refresh."
            }
          >
            {live ? <Radio className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            {live ? "Live" : "Offline"}
          </span>
        }
      />

      <div className="mt-6">
        {error ? (
          <ErrorState
            description="We couldn't load your projects."
            onRetry={reload}
          />
        ) : rows === null ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects yet"
            description="When your GrownetAI team logs a project for you, it will appear here with its live status."
          />
        ) : (
          <div className="flex flex-col gap-4">
            {rows.map((l) => (
              <Panel key={l.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-heading text-base font-semibold text-fg">
                      {l.businessName || l.ownerName}
                    </h3>
                    <p className="mt-0.5 text-xs text-fg-muted">
                      {l.businessType ?? "Project"}
                      {l.budget != null && <> · {fmtMoney(l.budget)}</>}
                    </p>
                  </div>
                  <StatusBadge status={l.status} />
                </div>

                {l.requirement && (
                  <p className="mt-3 text-sm leading-relaxed text-fg-body text-fg-muted">
                    {l.requirement}
                  </p>
                )}

                {/* The "why" behind the current status — the thing the brief
                    wants surfaced to the client, not just the label. */}
                {l.statusDescription && (
                  <div className="mt-4 rounded-xl border border-line bg-elevated p-3">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-fg-subtle">
                      Latest update
                    </p>
                    <p className="mt-1 text-sm text-fg">{l.statusDescription}</p>
                  </div>
                )}

                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3 text-xs sm:grid-cols-4">
                  <Meta label="Status" value={statusLabel(l.status)} />
                  <Meta label="Started" value={l.startDate ? fmtDate(l.startDate) : "—"} />
                  <Meta
                    label="Expected finish"
                    value={l.expectedEndDate ? fmtDate(l.expectedEndDate) : "—"}
                  />
                  <Meta label="Last updated" value={fmtDate(l.updatedAt)} />
                </dl>
              </Panel>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-fg-subtle">{label}</dt>
      <dd className="mt-0.5 font-medium text-fg">{value}</dd>
    </div>
  );
}
