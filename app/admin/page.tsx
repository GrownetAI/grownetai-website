"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Users, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import StatCard from "@/components/crm/StatCard";
import Panel from "@/components/crm/Panel";
import { Skeleton } from "@/components/crm/states";
import { AreaTrend, Donut } from "@/components/crm/charts";
import { getAdminOverview, type AdminOverview } from "@/lib/crm/admin-api";
import { platformMeta } from "@/lib/crm/platforms";
import { fmtMoney, fmtNumber } from "@/lib/crm/format";
import { cn } from "@/lib/utils";
import { useChartTokens } from "@/lib/crm/theme";

const PLAN_STYLE: Record<string, string> = {
  starter: "text-fg-muted bg-fg-subtle/10",
  growth: "text-primary bg-primary/10",
  enterprise: "text-violet-700 bg-violet-500/10 dark:text-violet-300",
};

export default function AdminOverviewPage() {
  const chartTokens = useChartTokens();
  const [data, setData] = useState<AdminOverview | null>(null);
  useEffect(() => { getAdminOverview().then(setData); }, []);

  const chart = data?.timeseries.map((p) => ({
    date: new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    Leads: p.leads,
    Conversions: p.conversions,
  })) ?? [];

  const donut = data?.sourceDistribution.map((s) => ({
    name: platformMeta(s.platform).label,
    value: s.value,
    colorIndex: platformMeta(s.platform).chartSlot,
  })) ?? [];
  const donutTotal = data?.sourceDistribution.reduce((s, d) => s + d.value, 0) ?? 0;

  return (
    <div>
      <PageHeader title="Platform Overview" description="Everything across every company on GrownetAI." />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {data ? (
          <>
            <StatCard label="Companies" value={fmtNumber(data.totalCompanies)} icon={Building2}>
              <p className="text-xs text-fg-muted">+{data.newCompaniesThisMonth} this month</p>
            </StatCard>
            <StatCard label="Total Leads" value={fmtNumber(data.totalLeads)} icon={Users} />
            <StatCard label="Total Revenue" value={fmtMoney(data.totalRevenue, true)} icon={DollarSign} />
            <StatCard
              label="Avg. leads / company"
              value={fmtNumber(
                data.totalCompanies
                  ? Math.round(data.totalLeads / data.totalCompanies)
                  : 0,
              )}
              icon={TrendingUp}
            />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[132px]" />)
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel className="lg:col-span-2" title="Leads across all companies" subtitle="Last 30 days">
          {data ? (
            <>
              <AreaTrend data={chart} series={[{ key: "Leads", name: "Leads", brand: true }, { key: "Conversions", name: "Conversions", colorIndex: 1 }]} />
              <div className="flex items-center gap-5 mt-2 px-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted"><span className="w-2.5 h-2.5 rounded-sm bg-primary" /> Leads</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: chartTokens.series[1] }} /> Conversions</span>
              </div>
            </>
          ) : <Skeleton className="h-[260px]" />}
        </Panel>

        <Panel title="Lead sources" subtitle="All companies">
          {data ? (
            <div className="relative">
              <Donut data={donut} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-fg tabular-nums">{fmtNumber(donutTotal)}</span>
                <span className="text-xs text-fg-muted">total leads</span>
              </div>
            </div>
          ) : <Skeleton className="h-[220px]" />}
        </Panel>
      </div>

      <Panel
        title="Top companies"
        subtitle="By lead volume"
        action={<Link href="/admin/companies" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">All companies <ArrowRight className="w-3.5 h-3.5" /></Link>}
        padded={false}
      >
        <div className="overflow-x-auto crm-scroll">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="pl-5 py-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Company</th>
                <th className="py-3 text-xs font-semibold uppercase tracking-wide text-fg-subtle">Plan</th>
                <th className="py-3 text-right text-xs font-semibold uppercase tracking-wide text-fg-subtle">Leads</th>
                <th className="pr-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-fg-subtle">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data ? data.topCompanies.map((c) => (
                <tr key={c.id} className="hover:bg-elevated/60 transition-colors">
                  <td className="pl-5 py-3">
                    <Link href={`/admin/companies?c=${c.id}`} className="font-medium text-fg hover:text-primary">{c.name}</Link>
                    <p className="text-xs text-fg-subtle">{c.domain}</p>
                  </td>
                  <td className="py-3"><span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full capitalize", PLAN_STYLE[c.plan])}>{c.plan}</span></td>
                  <td className="py-3 text-right tabular-nums text-fg">{fmtNumber(c.leads)}</td>
                  <td className="pr-5 py-3 text-right tabular-nums text-fg">{fmtMoney(c.revenue, true)}</td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="p-5"><Skeleton className="h-24" /></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
