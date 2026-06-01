"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Wallet,
  BarChart3,
  Settings,
  LifeBuoy,
  LogOut,
  Search,
  Plus,
  Bell,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Send,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
  TrendingUp,
  ArrowUpRight,
  Loader2,
  X,
} from "lucide-react";
import {
  getOverview,
  createCampaign,
  logout,
  tokenStore,
  apiErrorMessage,
  type DashboardOverview,
  type Campaign,
} from "@/lib/api";

const TEAL = "#008080";
const AQUA = "#00E5E5";
const DEEP = "#006666";

/* ── helpers ─────────────────────────────────────────────────────────────── */
function compact(n: number): string {
  const a = Math.abs(n);
  if (a >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (a >= 1_000) return `${Math.round(n / 1_000)}K`;
  return `${n}`;
}

const PLATFORM_ICON: Record<string, typeof Instagram> = {
  instagram: Instagram,
  telegram: Send,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};

function PlatformBadge({ platform }: { platform: string }) {
  const Icon = PLATFORM_ICON[platform] ?? Globe;
  return (
    <span
      className="inline-flex w-8 h-8 rounded-lg items-center justify-center"
      style={{ background: "rgba(0,128,128,0.1)", color: TEAL }}
    >
      <Icon className="w-4 h-4" />
    </span>
  );
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  upcoming: { bg: "rgba(0,128,128,0.1)", color: DEEP },
  ongoing: { bg: "rgba(0,229,229,0.18)", color: DEEP },
  ended: { bg: "#f1f5f5", color: "#64748b" },
  paused: { bg: "#fff7ed", color: "#c2410c" },
};

function StatusPill({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.ended;
  return (
    <span
      className="text-xs font-semibold px-3 py-1 rounded-full capitalize"
      style={{ background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}

/* ── SVG line chart ──────────────────────────────────────────────────────── */
function LineChart({ points }: { points: { label: string; value: number }[] }) {
  const W = 520;
  const H = 170;
  const padX = 8;
  const padTop = 14;
  const padBottom = 26;
  if (points.length < 2) return <div className="h-[170px]" />;
  const values = points.map((p) => p.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const coords = points.map((p, i) => {
    const x = padX + (i / (points.length - 1)) * (W - padX * 2);
    const y =
      padTop + (1 - (p.value - min) / range) * (H - padTop - padBottom);
    return { x, y };
  });
  const line = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${coords[coords.length - 1].x.toFixed(1)},${H - padBottom} L${coords[0].x.toFixed(1)},${H - padBottom} Z`;
  const last = coords[coords.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.18" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={padX}
          x2={W - padX}
          y1={padTop + t * (H - padTop - padBottom)}
          y2={padTop + t * (H - padTop - padBottom)}
          stroke="rgba(0,128,128,0.08)"
          strokeWidth="1"
        />
      ))}
      <path d={area} fill="url(#dashArea)" />
      <path
        d={line}
        fill="none"
        stroke={TEAL}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last.x} cy={last.y} r="5" fill={AQUA} stroke="#fff" strokeWidth="2" />
      {points.map((p, i) =>
        i % 2 === 0 ? (
          <text
            key={p.label}
            x={padX + (i / (points.length - 1)) * (W - padX * 2)}
            y={H - 8}
            fill="#94a3a3"
            fontSize="9"
            textAnchor="middle"
          >
            {p.label}
          </text>
        ) : null,
      )}
    </svg>
  );
}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
const MENU = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "campaign", label: "Campaign", icon: Megaphone },
  { key: "finance", label: "Finance", icon: Wallet },
  { key: "report", label: "Report", icon: BarChart3 },
  { key: "account", label: "Account Setting", icon: Settings },
  { key: "support", label: "Support", icon: LifeBuoy },
];

/* ── New Campaign modal ──────────────────────────────────────────────────── */
function NewCampaignModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("00:00");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("upcoming");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createCampaign({
        name,
        platform,
        scheduled_date: date,
        scheduled_time: time,
        budget: budget ? Number(budget) : 0,
        status,
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not create campaign"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-bold text-lg text-brand-charcoal">
            New Campaign
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-slate-gray"
            style={{ background: "rgba(0,0,0,0.05)" }}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {error && (
          <div className="mb-4 rounded-lg px-3 py-2 text-sm bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}
        <form onSubmit={submit} className="space-y-3">
          <input
            required
            className="input"
            placeholder="Campaign name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className="input"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="instagram">Instagram</option>
              <option value="telegram">Telegram</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
              <option value="linkedin">LinkedIn</option>
            </select>
            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="ended">Ended</option>
              <option value="paused">Paused</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              className="input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <input
            type="number"
            min="0"
            className="input"
            placeholder="Budget (USD)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary btn-lg w-full font-bold disabled:opacity-70"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create campaign"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [guideIdx, setGuideIdx] = useState(0);

  const load = useCallback(async () => {
    try {
      const overview = await getOverview();
      setData(overview);
    } catch (err: unknown) {
      const status =
        typeof err === "object" && err && "response" in err
          ? (err as { response?: { status?: number } }).response?.status
          : undefined;
      if (status === 401) {
        logout();
        router.replace("/login");
        return;
      }
      setError(apiErrorMessage(err, "Could not load your dashboard."));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!tokenStore.get()) {
      router.replace("/login");
      return;
    }
    load();
  }, [router, load]);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  const dateParts = useMemo(() => {
    if (!data) return { day: "--", weekday: "", monthYear: "" };
    const d = new Date(data.date);
    return {
      day: String(d.getDate()).padStart(2, "0"),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      monthYear: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
  }, [data]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#f2fbfb" }}
      >
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: TEAL }} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ background: "#f2fbfb" }}
      >
        <p className="text-brand-charcoal font-semibold">{error || "No data"}</p>
        <p className="text-sm text-brand-slate-gray">
          Is the backend running on{" "}
          <code className="px-1.5 py-0.5 rounded bg-white border">
            localhost:8000
          </code>
          ?
        </p>
        <button onClick={() => { setLoading(true); load(); }} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  const { user, growth_rate, wallet, last_campaign, chart, campaigns_run, awaiting_payment, guideline, latest_campaigns } = data;
  const guides = guideline ? [guideline] : [];
  const activeGuide = guides[guideIdx % Math.max(guides.length, 1)] ?? guideline;

  return (
    <div className="min-h-screen flex" style={{ background: "#f2fbfb" }}>
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-100 p-5 sticky top-0 h-screen">
        <div className="flex items-center justify-between mb-8">
          <span className="font-display font-black text-xl" style={{ color: TEAL }}>
            Grownet<span style={{ color: AQUA }}>AI</span>
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl mb-8" style={{ background: "#f2fbfb" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar || "https://i.pravatar.cc/100"}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="font-semibold text-sm text-brand-charcoal truncate">
              {user.shop || user.name}
            </p>
            <p className="text-xs text-brand-slate-gray truncate">{user.name}</p>
          </div>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-light-gray mb-3 px-2">
          Menu
        </p>
        <nav className="flex flex-col gap-1 flex-1">
          {MENU.map((m) => {
            const Icon = m.icon;
            const active = m.key === "overview";
            return (
              <button
                key={m.key}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left"
                style={
                  active
                    ? { background: "rgba(0,128,128,0.1)", color: TEAL }
                    : { color: "#5c6b6b" }
                }
              >
                <Icon className="w-[18px] h-[18px]" />
                {m.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-2"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Log Out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-5 sm:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="font-heading font-bold text-2xl text-brand-charcoal">
              Dashboard
            </h1>
            <p className="text-sm text-brand-slate-gray">Overview</p>
          </div>
          <div className="flex items-center gap-3">
            {[Bell, Wallet].map((Icon, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-brand-slate-gray"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
            <button
              onClick={() => setShowNew(true)}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Campaign
            </button>
          </div>
        </div>

        {/* Search + date */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-light-gray" />
            <input className="input pl-11" placeholder="Search..." />
          </div>
          <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-2">
            <span
              className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg"
              style={{ background: "rgba(0,128,128,0.1)", color: TEAL }}
            >
              {dateParts.day}
            </span>
            <div className="text-sm">
              <p className="font-semibold text-brand-charcoal leading-tight">
                {dateParts.weekday}
              </p>
              <p className="text-brand-slate-gray leading-tight">
                {dateParts.monthYear}
              </p>
            </div>
          </div>
        </div>

        {/* Stat cards + chart */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Growth */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-sm text-brand-slate-gray mb-3">Growth Rate</p>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ background: "rgba(0,128,128,0.1)", color: TEAL }}
              >
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="font-black text-2xl text-brand-charcoal">
                {compact(growth_rate.value)}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-brand-slate-gray">
                  {compact(growth_rate.previous)}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(0,229,229,0.2)", color: DEEP }}
                >
                  {growth_rate.delta_label}
                </span>
              </div>
            </div>

            {/* Wallet */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-sm text-brand-slate-gray mb-3">Wallet</p>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ background: "rgba(0,128,128,0.1)", color: TEAL }}
              >
                <Wallet className="w-4 h-4" />
              </div>
              <p className="font-black text-2xl text-brand-charcoal">
                {wallet.balance.toLocaleString()}
                <span className="text-lg">$</span>
              </p>
              <p className="text-xs text-brand-slate-gray mt-1">Current balance</p>
            </div>

            {/* Last campaign */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-sm text-brand-slate-gray mb-3">Last campaign</p>
              {last_campaign ? (
                <>
                  <PlatformBadge platform={last_campaign.platform} />
                  <p className="font-bold text-brand-charcoal mt-3">
                    {last_campaign.name}
                  </p>
                  <p className="text-xs text-brand-slate-gray mt-1">
                    {last_campaign.start} – {last_campaign.end}
                  </p>
                </>
              ) : (
                <p className="text-sm text-brand-slate-gray">No campaigns yet</p>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <LineChart points={chart.points} />
          </div>
        </div>

        {/* Table + right column */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Latest campaigns */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-heading font-bold text-lg text-brand-charcoal">
                Latest registered campaigns
              </h2>
              <button className="text-sm font-semibold inline-flex items-center gap-1" style={{ color: TEAL }}>
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-brand-slate-gray mb-5">
              You have{" "}
              {latest_campaigns.filter((c) => c.status === "upcoming").length}{" "}
              campaign upcoming
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-brand-slate-gray border-y border-gray-100">
                    <th className="text-left font-semibold py-3 px-2">#</th>
                    <th className="text-left font-semibold py-3 px-2">Details</th>
                    <th className="text-left font-semibold py-3 px-2">Platform</th>
                    <th className="text-left font-semibold py-3 px-2">Time</th>
                    <th className="text-left font-semibold py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latest_campaigns.map((c: Campaign, i: number) => (
                    <tr key={c.id} className="border-b border-gray-50">
                      <td className="py-3 px-2 text-brand-slate-gray">{i + 1}</td>
                      <td className="py-3 px-2 font-medium text-brand-charcoal">
                        {c.name}
                      </td>
                      <td className="py-3 px-2">
                        <PlatformBadge platform={c.platform} />
                      </td>
                      <td className="py-3 px-2 text-brand-slate-gray">
                        <div>{c.scheduled_date}</div>
                        <div className="text-xs">{c.scheduled_time}</div>
                      </td>
                      <td className="py-3 px-2">
                        <StatusPill status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Campaigns run + awaiting */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <p className="font-black text-2xl text-brand-charcoal">
                  {campaigns_run.count}
                </p>
                <p className="text-xs text-brand-slate-gray mb-3">
                  Campaign run in {campaigns_run.month}
                </p>
                <div className="grid grid-cols-7 gap-1">
                  {campaigns_run.calendar.map((cell, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background:
                          cell === 2 ? AQUA : cell === 1 ? TEAL : "#e2e8e8",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col">
                <p className="text-xs text-brand-slate-gray">
                  {awaiting_payment.count}/{awaiting_payment.total}
                </p>
                <p className="text-xs text-brand-slate-gray mb-2">Awaiting payment</p>
                <p className="font-black text-xl text-brand-charcoal mt-auto">
                  {awaiting_payment.amount.toLocaleString()}$
                </p>
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white mt-3 self-end"
                  style={{ background: TEAL }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Guideline */}
            {activeGuide && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-light-gray">
                    Guideline
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGuideIdx((i) => Math.max(0, i - 1))}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-brand-slate-gray"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGuideIdx((i) => i + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-brand-slate-gray"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="font-heading font-bold text-brand-charcoal mb-2">
                  {activeGuide.title}
                </h3>
                <p className="text-sm text-brand-slate-gray leading-relaxed">
                  {activeGuide.body}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showNew && (
        <NewCampaignModal onClose={() => setShowNew(false)} onCreated={load} />
      )}
    </div>
  );
}
