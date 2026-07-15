import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fmtSignedPercent } from "@/lib/crm/format";
import type { ReactNode } from "react";

/**
 * KPI stat tile: label, hero value, trend chip (vs previous period), an icon,
 * and an optional slot (e.g. a sparkline) below.
 */
export default function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  children,
  invertDelta = false,
}: {
  label: string;
  value: ReactNode;
  delta?: number;
  icon: LucideIcon;
  children?: ReactNode;
  /** When true, a negative delta is "good" (e.g. cost per lead). */
  invertDelta?: boolean;
}) {
  const good = delta === undefined ? true : invertDelta ? delta <= 0 : delta >= 0;

  return (
    <div className="panel p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-fg-muted">{label}</span>
        <span className="w-9 h-9 rounded-xl grid place-items-center bg-primary/10 text-primary">
          <Icon className="w-[18px] h-[18px]" />
        </span>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="text-[1.75rem] font-bold leading-none text-fg tracking-tight tabular-nums">
          {value}
        </span>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md mb-0.5",
              good
                ? "text-emerald-700 bg-emerald-500/10 dark:text-emerald-400"
                : "text-rose-700 bg-rose-500/10 dark:text-rose-400",
            )}
          >
            {good ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {fmtSignedPercent(delta)}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}
