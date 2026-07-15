"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import PlatformBadge from "@/components/crm/PlatformBadge";
import ConnectDrawer from "@/components/crm/ConnectDrawer";
import { Skeleton } from "@/components/crm/states";
import { getPlatformStats, listIntegrations } from "@/lib/crm/api";
import { CONNECTABLE_PLATFORMS, platformMeta } from "@/lib/crm/platforms";
import { fmtNumber } from "@/lib/crm/format";
import { cn } from "@/lib/utils";
import type { Integration, PlatformId, PlatformStat } from "@/lib/crm/types";

export default function PlatformsPage() {
  const [stats, setStats] = useState<PlatformStat[] | null>(null);
  const [integrations, setIntegrations] = useState<Integration[] | null>(null);
  const [connect, setConnect] = useState<PlatformId | null>(null);

  const load = () => {
    getPlatformStats().then(setStats);
    listIntegrations().then(setIntegrations);
  };
  useEffect(load, []);

  const statFor = (p: PlatformId) => stats?.find((s) => s.platform === p);
  const intFor = (p: PlatformId) => integrations?.find((i) => i.platform === p);
  const loading = !stats || !integrations;

  return (
    <div>
      <PageHeader
        title="Social Platforms"
        description="Per-channel lead performance and connection health."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-56" />)
          : CONNECTABLE_PLATFORMS.map((p) => {
              const s = statFor(p)!;
              const it = intFor(p);
              const meta = platformMeta(p);
              const connected = it?.status === "connected";
              const error = it?.status === "error";
              const convRate = s.totalLeads ? (s.converted / s.totalLeads) * 100 : 0;
              return (
                <Panel key={p} className="flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <PlatformBadge platform={p} withLabel />
                    <ConnStatus connected={connected} error={error} />
                  </div>

                  {connected ? (
                    <>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <Stat label="Total" value={fmtNumber(s.totalLeads)} />
                        <Stat label="Won" value={fmtNumber(s.converted)} />
                        <Stat label="Pending" value={fmtNumber(s.pending)} />
                      </div>
                      <div className="space-y-2 text-sm mt-auto">
                        <Row label="Conversion" value={`${convRate.toFixed(0)}%`} />
                        <Row label="Engagement" value={`${s.engagement}%`} />
                        <div className="flex items-center justify-between">
                          <span className="text-fg-muted">Trend</span>
                          <span className={cn("inline-flex items-center gap-0.5 font-semibold tabular-nums", s.trend >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400")}>
                            {s.trend >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                            {Math.abs(s.trend)}%
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                      <p className="text-sm text-fg-muted mb-1">{error ? "Connection needs attention" : `Not connected`}</p>
                      <p className="text-xs text-fg-subtle mb-4">{it?.note ?? `Connect ${meta.label} to capture leads.`}</p>
                      <button onClick={() => setConnect(p)} className="btn btn-primary btn-sm">
                        <Plus className="w-4 h-4" /> {error ? "Reconnect" : "Connect"}
                      </button>
                    </div>
                  )}
                </Panel>
              );
            })}
      </div>

      <ConnectDrawer
        platform={connect}
        open={!!connect}
        onClose={() => setConnect(null)}
        onConnected={() => {
          setConnect(null);
          load();
        }}
      />
    </div>
  );
}

function ConnStatus({ connected, error }: { connected: boolean; error: boolean }) {
  if (connected)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
        <CheckCircle2 className="w-3.5 h-3.5" /> Connected
      </span>
    );
  if (error)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 dark:text-rose-400">
        <AlertCircle className="w-3.5 h-3.5" /> Error
      </span>
    );
  return <span className="text-xs font-medium text-fg-subtle">Not connected</span>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-elevated/60 p-2.5 text-center">
      <p className="text-sm font-bold text-fg tabular-nums">{value}</p>
      <p className="text-[11px] text-fg-subtle mt-0.5">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-fg-muted">{label}</span>
      <span className="font-semibold text-fg tabular-nums">{value}</span>
    </div>
  );
}
