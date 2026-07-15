"use client";

/**
 * recharts chart components, theme-aware via useChartTokens().
 *
 * Design follows the dataviz method: thin 2px lines, 4px-rounded bar ends, a 2px
 * surface gap between adjacent/stacked marks, recessive grid/axes, a hover layer
 * on every plot, and legends + direct labels so identity is never color-alone
 * (required because the dark palette sits in the CVD floor band).
 */
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipProps,
} from "recharts";
import { useChartTokens } from "@/lib/crm/theme";
import { fmtCompact, fmtMoney } from "@/lib/crm/format";

/* ── Shared tooltip ── */
function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  const t = useChartTokens();
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: t.tooltipBg,
        border: `1px solid ${t.tooltipBorder}`,
        color: t.text,
        borderRadius: 12,
        padding: "8px 12px",
        boxShadow: t.tooltipShadow,
        fontSize: 12,
      }}
    >
      {label !== undefined && (
        <div style={{ color: t.textMuted, marginBottom: 4, fontWeight: 600 }}>
          {String(label)}
        </div>
      )}
      {payload.map((p) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: p.color,
              display: "inline-block",
            }}
          />
          <span style={{ color: t.textMuted }}>{p.name}</span>
          <span style={{ marginLeft: "auto", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {typeof p.value === "number" ? fmtCompact(p.value) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const axisProps = (color: string) => ({
  tick: { fill: color, fontSize: 11 },
  tickLine: false,
  axisLine: false,
});

/* ── Area trend (leads / conversions over time) ── */
export function AreaTrend({
  data,
  series,
  height = 260,
}: {
  data: any[];
  series: { key: string; name: string; colorIndex?: number; brand?: boolean }[];
  height?: number;
}) {
  const t = useChartTokens();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <defs>
          {series.map((s, i) => {
            const color = s.brand ? t.brand : t.series[s.colorIndex ?? i];
            return (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid vertical={false} stroke={t.grid} strokeDasharray="0" />
        <XAxis dataKey="date" {...axisProps(t.axis)} minTickGap={24} />
        <YAxis {...axisProps(t.axis)} width={40} tickFormatter={(v) => fmtCompact(Number(v))} />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: t.axis, strokeWidth: 1 }} />
        {series.map((s, i) => {
          const color = s.brand ? t.brand : t.series[s.colorIndex ?? i];
          return (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={color}
              strokeWidth={2}
              fill={`url(#grad-${s.key})`}
              activeDot={{ r: 4, strokeWidth: 2, stroke: t.surface }}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── Bar series (e.g. leads by source / campaign) ── */
export function BarSeries({
  data,
  bars,
  height = 260,
}: {
  data: any[];
  bars: { key: string; name: string; colorIndex?: number; brand?: boolean }[];
  height?: number;
}) {
  const t = useChartTokens();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }} barGap={4}>
        <CartesianGrid vertical={false} stroke={t.grid} />
        <XAxis dataKey="label" {...axisProps(t.axis)} interval={0} />
        <YAxis {...axisProps(t.axis)} width={40} tickFormatter={(v) => fmtCompact(Number(v))} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: t.grid, opacity: 0.4 }} />
        {bars.map((b, i) => (
          <Bar
            key={b.key}
            dataKey={b.key}
            name={b.name}
            fill={b.brand ? t.brand : t.series[b.colorIndex ?? i]}
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Donut (source distribution) ── */
export function Donut({
  data,
  height = 220,
}: {
  data: { name: string; value: number; colorIndex: number }[];
  height?: number;
}) {
  const t = useChartTokens();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="62%"
          outerRadius="100%"
          paddingAngle={2}
          stroke={t.surface}
          strokeWidth={2}
        >
          {data.map((d) => (
            <Cell key={d.name} fill={t.series[d.colorIndex]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

/* ── Sparkline (stat-card mini trend) ── */
export function Sparkline({
  data,
  dataKey = "leads",
  height = 40,
  brand = true,
}: {
  data: any[];
  dataKey?: string;
  height?: number;
  brand?: boolean;
}) {
  const t = useChartTokens();
  const color = brand ? t.brand : t.series[0];
  const id = `spark-${dataKey}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#${id})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── Funnel (ordinal moss ramp, custom for full theme control) ── */
export function Funnel({
  stages,
}: {
  stages: { stage: string; value: number }[];
}) {
  const t = useChartTokens();
  const max = Math.max(...stages.map((s) => s.value), 1);
  // Was a hardcoded blue ramp: off-brand, and identical in both themes.
  const ramp = t.ordinal;

  return (
    <div className="flex flex-col gap-2.5">
      {stages.map((s, i) => {
        const pct = (s.value / max) * 100;
        const conv = i === 0 ? 100 : (s.value / stages[0].value) * 100;
        return (
          <div key={s.stage}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-fg">{s.stage}</span>
              <span className="text-fg-muted tabular-nums">
                {s.value.toLocaleString()}
                <span className="text-fg-subtle"> · {conv.toFixed(0)}%</span>
              </span>
            </div>
            <div className="h-8 rounded-lg bg-elevated overflow-hidden">
              <div
                className="h-full rounded-lg flex items-center transition-[width] duration-500"
                style={{ width: `${Math.max(pct, 6)}%`, background: ramp[Math.min(i, ramp.length - 1)] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
