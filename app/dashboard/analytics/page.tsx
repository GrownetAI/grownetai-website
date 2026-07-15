"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import PlatformBadge from "@/components/crm/PlatformBadge";
import { Skeleton } from "@/components/crm/states";
import { AreaTrend, BarSeries, Funnel } from "@/components/crm/charts";
import { getAnalytics, type AnalyticsResult } from "@/lib/crm/api";
import { useChartTokens } from "@/lib/crm/theme";
import { platformMeta } from "@/lib/crm/platforms";
import { fmtNumber, fmtPercent } from "@/lib/crm/format";
import type { Granularity } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

const RANGES: { value: Granularity; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export default function AnalyticsPage() {
  const chartTokens = useChartTokens();
  const [granularity, setGranularity] = useState<Granularity>("daily");
  const [data, setData] = useState<AnalyticsResult | null>(null);

  useEffect(() => {
    setData(null);
    getAnalytics(granularity).then(setData);
  }, [granularity]);

  const trend =
    data?.timeseries.map((p) => ({
      date:
        granularity === "monthly"
          ? new Date(p.date).toLocaleDateString("en-US", { month: "short" })
          : new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      Leads: p.leads,
      Conversions: p.conversions,
      Revenue: p.revenue,
    })) ?? [];

  const bySource =
    data?.bySource
      .slice()
      .sort((a, b) => b.leads - a.leads)
      .map((s) => ({
        label: platformMeta(s.platform).label,
        Leads: s.leads,
        Won: s.conversions,
      })) ?? [];

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Trends, conversion funnel and platform comparison."
        actions={
          <button className="btn btn-secondary btn-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        }
      />

      {/* Granularity toggle */}
      <div className="inline-flex items-center gap-1 p-1 rounded-lg border border-line bg-panel mb-4">
        {RANGES.map((r) => (
          <button
            key={r.value}
            onClick={() => setGranularity(r.value)}
            className={cn(
              "px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors",
              granularity === r.value ? "bg-primary/12 text-primary" : "text-fg-muted hover:text-fg",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Trend */}
      <Panel className="mb-4" title="Leads & conversions" subtitle={`${granularity[0].toUpperCase()}${granularity.slice(1)} trend`}>
        {data ? (
          <>
            <AreaTrend
              height={300}
              data={trend}
              series={[
                { key: "Leads", name: "Leads", brand: true },
                { key: "Conversions", name: "Conversions", colorIndex: 1 },
              ]}
            />
            <div className="flex items-center gap-5 mt-2 px-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted"><span className="w-2.5 h-2.5 rounded-sm bg-primary" /> Leads</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: chartTokens.series[1] }} /> Conversions</span>
            </div>
          </>
        ) : (
          <Skeleton className="h-[300px]" />
        )}
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Funnel */}
        <Panel title="Conversion funnel" subtitle="Captured → Contacted → Qualified → Won">
          {data ? <Funnel stages={data.funnel} /> : <Skeleton className="h-52" />}
        </Panel>

        {/* Source comparison */}
        <Panel title="Leads by source" subtitle="Volume vs. won per platform">
          {data ? (
            <>
              <BarSeries
                data={bySource}
                bars={[
                  { key: "Leads", name: "Leads", brand: true },
                  { key: "Won", name: "Won", colorIndex: 3 },
                ]}
              />
              <div className="flex items-center gap-5 mt-2 px-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted"><span className="w-2.5 h-2.5 rounded-sm bg-primary" /> Leads</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: chartTokens.series[3] }} /> Won</span>
              </div>
            </>
          ) : (
            <Skeleton className="h-[260px]" />
          )}
        </Panel>
      </div>

      {/* Source table */}
      <Panel title="Platform breakdown" padded={false}>
        <div className="overflow-x-auto crm-scroll">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="pl-5 py-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Platform</th>
                <th className="py-3 text-right text-xs font-semibold uppercase tracking-wide text-fg-subtle">Leads</th>
                <th className="py-3 text-right text-xs font-semibold uppercase tracking-wide text-fg-subtle">Won</th>
                <th className="pr-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-fg-subtle">Conv. rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data ? (
                data.bySource
                  .slice()
                  .sort((a, b) => b.leads - a.leads)
                  .map((s) => (
                    <tr key={s.platform} className="hover:bg-elevated/60 transition-colors">
                      <td className="pl-5 py-3"><PlatformBadge platform={s.platform} size="sm" withLabel /></td>
                      <td className="py-3 text-right tabular-nums text-fg">{fmtNumber(s.leads)}</td>
                      <td className="py-3 text-right tabular-nums text-fg">{fmtNumber(s.conversions)}</td>
                      <td className="pr-5 py-3 text-right tabular-nums text-fg-muted">
                        {fmtPercent(s.leads ? (s.conversions / s.leads) * 100 : 0)}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr><td colSpan={4} className="p-5"><Skeleton className="h-24" /></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
