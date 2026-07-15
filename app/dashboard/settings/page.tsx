"use client";

import { useEffect, useState } from "react";
import {
  User,
  Plug,
  Bell,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import PlatformBadge from "@/components/crm/PlatformBadge";
import Avatar from "@/components/crm/Avatar";
import ThemeToggle from "@/components/crm/ThemeToggle";
import ConnectDrawer from "@/components/crm/ConnectDrawer";
import { Select } from "@/components/crm/controls";
import { Skeleton } from "@/components/crm/states";
import {
  getSession,
  listIntegrations,
  disconnectIntegration,
} from "@/lib/crm/api";
import { CONNECTABLE_PLATFORMS, platformMeta } from "@/lib/crm/platforms";
import { timeAgo } from "@/lib/crm/format";
import { cn } from "@/lib/utils";
import type { Company, Integration, PlatformId, TeamMember } from "@/lib/crm/types";

type Tab = "account" | "integrations" | "notifications" | "preferences";
const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "account", label: "Account", icon: User },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("account");

  return (
    <div>
      <PageHeader title="Settings" description="Manage your account, lead sources and preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        {/* Sub-nav */}
        <nav className="flex lg:flex-col gap-1 overflow-x-auto crm-scroll lg:overflow-visible">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0",
                tab === id ? "bg-primary/12 text-primary" : "text-fg-muted hover:text-fg hover:bg-elevated",
              )}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </nav>

        <div>
          {tab === "account" && <AccountTab />}
          {tab === "integrations" && <IntegrationsTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "preferences" && <PreferencesTab />}
        </div>
      </div>
    </div>
  );
}

/* ── Account ── */
function AccountTab() {
  const [session, setSession] = useState<{ company: Company; user: TeamMember } | null>(null);
  useEffect(() => { getSession().then(setSession); }, []);

  if (!session) return <Panel><Skeleton className="h-64" /></Panel>;
  const { user, company } = session;

  return (
    <Panel title="Account" subtitle="Your profile and company details">
      <div className="flex items-center gap-4 mb-6">
        <Avatar name={user.name} src={user.avatar} size="lg" />
        <div>
          <p className="font-semibold text-fg">{user.name}</p>
          <p className="text-xs text-fg-muted capitalize">{user.role} · {company.name}</p>
        </div>
        <button className="btn btn-secondary btn-sm ml-auto">Change photo</button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Account updated"); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Full name"><input className="field" defaultValue={user.name} /></FieldRow>
        <FieldRow label="Email"><input className="field" type="email" defaultValue={user.email} /></FieldRow>
        <FieldRow label="Company"><input className="field" defaultValue={company.name} /></FieldRow>
        <FieldRow label="Plan"><input className="field capitalize" defaultValue={company.plan} readOnly /></FieldRow>
        <div className="sm:col-span-2 flex justify-end">
          <button className="btn btn-primary btn-sm" type="submit">Save changes</button>
        </div>
      </form>
    </Panel>
  );
}

/* ── Integrations ── */
function IntegrationsTab() {
  const [integrations, setIntegrations] = useState<Integration[] | null>(null);
  const [connect, setConnect] = useState<PlatformId | null>(null);
  const load = () => listIntegrations().then(setIntegrations);
  useEffect(() => {
    load();
  }, []);

  async function disconnect(p: PlatformId) {
    await disconnectIntegration(p);
    toast.success(`${platformMeta(p).label} disconnected`);
    load();
  }

  return (
    <Panel title="Integrations" subtitle="Connect a platform and we'll capture its leads automatically" padded={false}>
      {!integrations ? (
        <div className="p-5 space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
      ) : (
        <ul className="divide-y divide-line">
          {CONNECTABLE_PLATFORMS.map((p) => {
            const it = integrations.find((i) => i.platform === p)!;
            const meta = platformMeta(p);
            const connected = it.status === "connected";
            const error = it.status === "error";
            return (
              <li key={p} className="flex items-center gap-4 px-5 py-4">
                <PlatformBadge platform={p} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-fg">{meta.label}</p>
                  <p className="text-xs text-fg-subtle truncate">
                    {connected
                      ? `${it.leadsIngested} leads · synced ${it.lastSyncedAt ? timeAgo(it.lastSyncedAt) : "recently"}`
                      : error
                        ? it.note
                        : meta.ingest}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {connected && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                    </span>
                  )}
                  {error && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-rose-700 dark:text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5" /> Error
                    </span>
                  )}
                  {connected ? (
                    <button onClick={() => disconnect(p)} className="btn btn-secondary btn-sm">Disconnect</button>
                  ) : (
                    <button onClick={() => setConnect(p)} className="btn btn-primary btn-sm">
                      {error ? <><RefreshCw className="w-3.5 h-3.5" /> Reconnect</> : "Connect"}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <ConnectDrawer platform={connect} open={!!connect} onClose={() => setConnect(null)} onConnected={() => { setConnect(null); load(); }} />
    </Panel>
  );
}

/* ── Notifications ── */
function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    newLead: true,
    dailyDigest: true,
    assigned: true,
    weeklyReport: false,
    syncErrors: true,
  });
  const toggle = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  const items: { key: keyof typeof prefs; title: string; desc: string }[] = [
    { key: "newLead", title: "New lead captured", desc: "Notify me whenever a new lead arrives from any platform." },
    { key: "assigned", title: "Lead assigned to me", desc: "When a teammate assigns a lead to you." },
    { key: "dailyDigest", title: "Daily digest", desc: "A morning summary of yesterday's lead activity." },
    { key: "weeklyReport", title: "Weekly performance report", desc: "Conversion and revenue rollup every Monday." },
    { key: "syncErrors", title: "Sync errors", desc: "Alert me when a platform integration fails to sync." },
  ];

  return (
    <Panel title="Notifications" subtitle="Choose what you want to hear about" padded={false}>
      <ul className="divide-y divide-line">
        {items.map((it) => (
          <li key={it.key} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-sm font-medium text-fg">{it.title}</p>
              <p className="text-xs text-fg-muted mt-0.5">{it.desc}</p>
            </div>
            <Switch on={prefs[it.key]} onClick={() => toggle(it.key)} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ── Preferences ── */
function PreferencesTab() {
  return (
    <div className="space-y-4">
      <Panel title="Appearance" subtitle="Theme for your dashboard">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-fg">Theme</p>
            <p className="text-xs text-fg-muted mt-0.5">Switch between light and dark. Saved to this browser.</p>
          </div>
          <ThemeToggle />
        </div>
      </Panel>

      <Panel title="Defaults" subtitle="Workspace preferences">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldRow label="Default lead view">
            <Select className="w-full [&_select]:w-full" defaultValue="table"
              options={[{ value: "table", label: "Table" }, { value: "board", label: "Board" }]} />
          </FieldRow>
          <FieldRow label="Timezone">
            <Select className="w-full [&_select]:w-full" defaultValue="ist"
              options={[
                { value: "ist", label: "Asia/Kolkata (IST)" },
                { value: "utc", label: "UTC" },
                { value: "est", label: "America/New_York (EST)" },
              ]} />
          </FieldRow>
        </div>
      </Panel>
    </div>
  );
}

/* ── shared bits ── */
function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-fg-muted mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function Switch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors flex-shrink-0",
        on ? "bg-primary" : "bg-fg-subtle/30",
      )}
    >
      <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", on && "translate-x-5")} />
    </button>
  );
}
