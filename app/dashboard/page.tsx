"use client";

/**
 * Lead management dashboard — the overview.
 * Replaces the previous campaign demo dashboard (backed up in scratchpad).
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Target,
  DollarSign,
  Megaphone,
  ArrowRight,
  Plus,
  Download,
  Zap,
} from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import StatCard from "@/components/crm/StatCard";
import Panel from "@/components/crm/Panel";
import PlatformBadge from "@/components/crm/PlatformBadge";
import Avatar from "@/components/crm/Avatar";
import { StatusBadge } from "@/components/crm/badges";
import { Skeleton, EmptyState } from "@/components/crm/states";
import { AreaTrend, Donut, Sparkline } from "@/components/crm/charts";
import { getDashboardSummary, listLeads } from "@/lib/crm/api";
import { useChartTokens } from "@/lib/crm/theme";
import { platformMeta } from "@/lib/crm/platforms";
import { fmtMoney, fmtNumber, fmtPercent, timeAgo } from "@/lib/crm/format";
import type { DashboardSummary, Lead } from "@/lib/crm/types";

const QUICK_ACTIONS = [
  { label: "Add lead", href: "/dashboard/leads", icon: Plus },
  { label: "New campaign", href: "/dashboard/campaigns", icon: Megaphone },
  { label: "Connect platform", href: "/dashboard/settings", icon: Zap },
  { label: "Export report", href: "/dashboard/analytics", icon: Download },
];

export default function DashboardPage() {
  const chartTokens = useChartTokens();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recent, setRecent] = useState<Lead[] | null>(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
    listLeads({ sortBy: "receivedAt", sortDir: "desc", pageSize: 6 }).then((p) =>
      setRecent(p.items),
    );
  }, []);

  const chartData =
    summary?.timeseries.map((p) => ({
      date: new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      Leads: p.leads,
      Conversions: p.conversions,
    })) ?? [];

  const donutData =
    summary?.sourceDistribution.map((s) => ({
      name: platformMeta(s.platform).label,
      value: s.value,
      colorIndex: platformMeta(s.platform).chartSlot,
    })) ?? [];

  const totalSourceLeads = summary?.sourceDistribution.reduce((s, d) => s + d.value, 0) ?? 0;

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Where your leads come from, what's converting, and what needs attention today."
        actions={
          <Link href="/dashboard/leads" className="btn btn-primary btn-sm">
            View all leads <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {summary ? (
          <>
            <StatCard label="Total Leads" value={fmtNumber(summary.totalLeads)} delta={summary.deltas.totalLeads} icon={Users}>
              <Sparkline data={summary.timeseries} dataKey="leads" />
            </StatCard>
            <StatCard label="New Today" value={fmtNumber(summary.newToday)} delta={summary.deltas.newToday} icon={UserPlus}>
              <Sparkline data={summary.timeseries.slice(-10)} dataKey="conversions" />
            </StatCard>
            <StatCard label="Conversion Rate" value={fmtPercent(summary.conversionRate)} delta={summary.deltas.conversionRate} icon={Target} />
            <StatCard label="Revenue" value={fmtMoney(summary.revenue, true)} delta={summary.deltas.revenue} icon={DollarSign} />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[132px]" />)
        )}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel
          className="lg:col-span-2"
          title="Leads over time"
          subtitle="Daily captured leads vs. conversions (last 30 days)"
        >
          {summary ? (
            <>
              <AreaTrend
                data={chartData}
                series={[
                  { key: "Leads", name: "Leads", brand: true },
                  { key: "Conversions", name: "Conversions", colorIndex: 1 },
                ]}
              />
              <div className="flex items-center gap-5 mt-2 px-1">
                <Legend swatchClass="bg-primary" label="Leads" />
                <Legend color={chartTokens.series[1]} label="Conversions" />
              </div>
            </>
          ) : (
            <Skeleton className="h-[260px]" />
          )}
        </Panel>

        <Panel title="Lead sources" subtitle="Distribution by platform">
          {summary ? (
            <div>
              <div className="relative">
                <Donut data={donutData} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-fg tabular-nums">{fmtNumber(totalSourceLeads)}</span>
                  <span className="text-xs text-fg-muted">total leads</span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {summary.sourceDistribution
                  .slice()
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 5)
                  .map((s) => {
                    const meta = platformMeta(s.platform);
                    const pct = totalSourceLeads ? (s.value / totalSourceLeads) * 100 : 0;
                    return (
                      <li key={s.platform} className="flex items-center gap-2.5 text-sm">
                        <PlatformBadge platform={s.platform} size="sm" />
                        <span className="text-fg font-medium">{meta.label}</span>
                        <span className="ml-auto text-fg-muted tabular-nums">
                          {s.value} · {pct.toFixed(0)}%
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : (
            <Skeleton className="h-[300px]" />
          )}
        </Panel>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel
          className="lg:col-span-2"
          title="Recent leads"
          subtitle="Newest captures across all platforms"
          action={
            <Link href="/dashboard/leads" className="text-sm font-semibold text-primary hover:underline">
              View all
            </Link>
          }
          padded={false}
        >
          {!recent ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
            </div>
          ) : recent.length === 0 ? (
            <EmptyState icon={Users} title="No leads yet" description="Connect a platform to start capturing leads." />
          ) : (
            <ul className="divide-y divide-line">
              {recent.map((l) => (
                <li key={l.id} className="flex items-center gap-3 px-5 py-3">
                  <Avatar name={l.name} size="sm" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-fg truncate">{l.name}</p>
                    <p className="text-xs text-fg-subtle truncate">{l.email}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <PlatformBadge platform={l.source} size="sm" />
                    <div className="hidden sm:block"><StatusBadge status={l.status} /></div>
                    <span className="text-xs text-fg-subtle w-16 text-right hidden md:block">{timeAgo(l.receivedAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="Quick actions">
            <div className="grid grid-cols-2 gap-2.5">
              {QUICK_ACTIONS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col gap-2 p-3 rounded-xl border border-line hover:border-primary/40 hover:bg-elevated transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg grid place-items-center bg-primary/10 text-primary">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-medium text-fg">{label}</span>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Active campaigns" action={<Link href="/dashboard/campaigns" className="text-sm font-semibold text-primary hover:underline">All</Link>}>
            {summary ? (
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl grid place-items-center bg-primary/10 text-primary">
                  <Megaphone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold text-fg tabular-nums leading-none">{summary.activeCampaigns}</p>
                  <p className="text-xs text-fg-muted mt-1">campaigns running now</p>
                </div>
              </div>
            ) : (
              <Skeleton className="h-12" />
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, swatchClass, label }: { color?: string; swatchClass?: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
      <span className={`w-2.5 h-2.5 rounded-sm ${swatchClass ?? ""}`} style={color ? { background: color } : undefined} />
      {label}
    </span>
  );
}
