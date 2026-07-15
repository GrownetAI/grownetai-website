/** CRM-specific formatting helpers (USD money, percentages, relative time). */

export const fmtNumber = (n: number): string =>
  new Intl.NumberFormat("en-US").format(Math.round(n));

export const fmtCompact = (n: number): string => {
  const a = Math.abs(n);
  if (a >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (a >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${Math.round(n)}`;
};

export const fmtMoney = (n: number, compact = false): string =>
  compact
    ? `$${fmtCompact(n)}`
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

export const fmtPercent = (n: number, digits = 1): string =>
  `${n.toFixed(digits)}%`;

export const fmtSignedPercent = (n: number, digits = 1): string =>
  `${n >= 0 ? "+" : ""}${n.toFixed(digits)}%`;

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
