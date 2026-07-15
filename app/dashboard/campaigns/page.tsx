"use client";

import { useEffect, useMemo, useState } from "react";
import { Megaphone, TrendingUp, Plus } from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import StatCard from "@/components/crm/StatCard";
import PlatformBadge from "@/components/crm/PlatformBadge";
import { Select } from "@/components/crm/controls";
import { Skeleton, EmptyState } from "@/components/crm/states";
import { listCampaigns } from "@/lib/crm/api";
import { platformMeta } from "@/lib/crm/platforms";
import { fmtMoney, fmtNumber } from "@/lib/crm/format";
import { cn } from "@/lib/utils";
import type { Campaign } from "@/lib/crm/types";
import { DollarSign, Target } from "lucide-react";

const STATUS_STYLE: Record<Campaign["status"], string> = {
  active: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-300",
  scheduled: "text-blue-700 bg-blue-500/10 dark:text-blue-300",
  ended: "text-fg-muted bg-fg-subtle/10",
  paused: "text-amber-700 bg-amber-500/10 dark:text-amber-300",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    listCampaigns().then(setCampaigns);
  }, []);

  const filtered = useMemo(
    () => (campaigns ?? []).filter((c) => filter === "all" || c.status === filter),
    [campaigns, filter],
  );

  const totals = useMemo(() => {
    const list = campaigns ?? [];
    const spend = list.reduce((s, c) => s + c.spend, 0);
    const revenue = list.reduce((s, c) => s + c.revenue, 0);
    const leads = list.reduce((s, c) => s + c.leads, 0);
    return {
      active: list.filter((c) => c.status === "active").length,
      spend,
      revenue,
      leads,
      roi: spend ? ((revenue - spend) / spend) * 100 : 0,
    };
  }, [campaigns]);

  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Performance, ROI and lead generation across your paid & organic campaigns."
        actions={<button className="btn btn-primary btn-sm"><Plus className="w-4 h-4" /> New campaign</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {campaigns ? (
          <>
            <StatCard label="Active campaigns" value={fmtNumber(totals.active)} icon={Megaphone} />
            <StatCard label="Total leads" value={fmtNumber(totals.leads)} icon={Target} />
            <StatCard label="Total spend" value={fmtMoney(totals.spend, true)} icon={DollarSign} />
            <StatCard label="Blended ROI" value={`${totals.roi.toFixed(0)}%`} icon={TrendingUp} />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[132px]" />)
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-fg-muted">{filtered.length} campaign{filtered.length === 1 ? "" : "s"}</p>
        <Select label="Filter status" value={filter} onChange={(e) => setFilter(e.target.value)}
          options={[
            { value: "all", label: "All statuses" },
            { value: "active", label: "Active" },
            { value: "scheduled", label: "Scheduled" },
            { value: "paused", label: "Paused" },
            { value: "ended", label: "Ended" },
          ]} />
      </div>

      {!campaigns ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-56" />)}
        </div>
      ) : filtered.length === 0 ? (
        <Panel><EmptyState icon={Megaphone} title="No campaigns here" description="No campaigns match this status filter." /></Panel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => {
            const roi = c.spend ? ((c.revenue - c.spend) / c.spend) * 100 : 0;
            const conv = c.leads ? (c.conversions / c.leads) * 100 : 0;
            return (
              <Panel key={c.id} className="hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <PlatformBadge platform={c.platform} />
                    <div className="min-w-0">
                      <p className="font-semibold text-fg truncate">{c.name}</p>
                      <p className="text-xs text-fg-subtle">{platformMeta(c.platform).label}</p>
                    </div>
                  </div>
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full capitalize flex-shrink-0", STATUS_STYLE[c.status])}>
                    {c.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <Metric label="Leads" value={fmtNumber(c.leads)} />
                  <Metric label="Conversions" value={`${fmtNumber(c.conversions)} · ${conv.toFixed(0)}%`} />
                  <Metric label="Spend" value={fmtMoney(c.spend, true)} />
                  <Metric label="Revenue" value={fmtMoney(c.revenue, true)} />
                </div>

                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs text-fg-muted">Return on investment</span>
                  <span className={cn("inline-flex items-center gap-1 text-sm font-bold tabular-nums", roi >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400")}>
                    <TrendingUp className="w-4 h-4" /> {roi.toFixed(0)}%
                  </span>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-fg-subtle">{label}</p>
      <p className="text-sm font-semibold text-fg tabular-nums mt-0.5">{value}</p>
    </div>
  );
}
