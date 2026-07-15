/**
 * CRM data-access seam.
 *
 * The UI imports ONLY from here — never from `data.ts`. Every function is async
 * and shaped like the REST endpoint it will become, so the swap to the real
 * MongoDB-backed API (fed by the platform → SQS → worker pipeline) is a
 * one-file change: replace each body with a `fetch()` to the matching route.
 *
 * Endpoint map (future):
 *   getDashboardSummary   → GET  /api/crm/summary
 *   listLeads             → GET  /api/crm/leads?…            (query below)
 *   getLead               → GET  /api/crm/leads/:id
 *   updateLead            → PATCH/api/crm/leads/:id
 *   createLead            → POST /api/crm/leads
 *   listCampaigns         → GET  /api/crm/campaigns
 *   getPlatformStats      → GET  /api/crm/platforms
 *   getAnalytics          → GET  /api/crm/analytics?granularity=…
 *   listTeam              → GET  /api/crm/team
 *   listIntegrations      → GET  /api/crm/integrations
 *   saveIntegration       → PUT  /api/crm/integrations/:platform
 *   disconnectIntegration → DELETE /api/crm/integrations/:platform
 */
import {
  CAMPAIGNS,
  COMPANY,
  INTEGRATIONS,
  LEADS,
  TEAM,
  TIMESERIES,
} from "./data";
import { PLATFORM_ORDER } from "./platforms";
import { statusLabel } from "@/components/crm/badges";
import type {
  Campaign,
  Company,
  DashboardSummary,
  FunnelStage,
  Granularity,
  Integration,
  Lead,
  LeadPriority,
  LeadStatus,
  PlatformId,
  PlatformStat,
  LeadSocial,
  TeamMember,
  TimeseriesPoint,
} from "./types";

/** Simulated network latency so loading states are exercised for real. */
const latency = () => new Promise((r) => setTimeout(r, 160));
const clone = <T,>(v: T): T =>
  typeof structuredClone === "function"
    ? structuredClone(v)
    : JSON.parse(JSON.stringify(v));

export async function getCompany(): Promise<Company> {
  await latency();
  return clone(COMPANY);
}

/** The signed-in company + current user (the owner in this demo tenant). */
export async function getSession(): Promise<{ company: Company; user: TeamMember }> {
  await latency();
  const owner = TEAM.find((m) => m.role === "owner") ?? TEAM[0];
  return { company: clone(COMPANY), user: clone(owner) };
}

/* ── Dashboard ─────────────────────────────────────────────────────────── */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  await latency();
  const total = LEADS.length;
  const todayKey = new Date().toISOString().slice(0, 10);
  const newToday = LEADS.filter((l) => l.receivedAt.slice(0, 10) === todayKey).length;
  const won = LEADS.filter((l) => l.status === "won");
  const conversionRate = total ? (won.length / total) * 100 : 0;
  const revenue = won.reduce((s, l) => s + l.value, 0);
  const activeCampaigns = CAMPAIGNS.filter((c) => c.status === "active").length;

  const sourceDistribution = PLATFORM_ORDER.map((platform) => ({
    platform,
    value: LEADS.filter((l) => l.source === platform).length,
  })).filter((s) => s.value > 0);

  return {
    totalLeads: total,
    newToday: Math.max(newToday, 6),
    conversionRate,
    revenue,
    activeCampaigns,
    deltas: { totalLeads: 12.4, newToday: 8.1, conversionRate: 2.3, revenue: 18.6 },
    sourceDistribution,
    timeseries: clone(TIMESERIES),
  };
}

/* ── Leads (search / filter / sort / paginate) ─────────────────────────── */
export interface LeadQuery {
  search?: string;
  status?: LeadStatus | "all";
  source?: PlatformId | "all";
  priority?: LeadPriority | "all";
  assigneeId?: string | "all";
  sortBy?: "receivedAt" | "value" | "name";
  sortDir?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface LeadPage {
  items: Lead[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export async function listLeads(query: LeadQuery = {}): Promise<LeadPage> {
  await latency();
  const {
    search = "",
    status = "all",
    source = "all",
    priority = "all",
    assigneeId = "all",
    sortBy = "receivedAt",
    sortDir = "desc",
    page = 1,
    pageSize = 10,
  } = query;

  let rows = LEADS.slice();
  const q = search.trim().toLowerCase();
  if (q) {
    rows = rows.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.email ?? "").toLowerCase().includes(q) ||
        (l.company ?? "").toLowerCase().includes(q),
    );
  }
  if (status !== "all") rows = rows.filter((l) => l.status === status);
  if (source !== "all") rows = rows.filter((l) => l.source === source);
  if (priority !== "all") rows = rows.filter((l) => l.priority === priority);
  if (assigneeId !== "all")
    rows = rows.filter((l) =>
      assigneeId === "unassigned" ? !l.assigneeId : l.assigneeId === assigneeId,
    );

  const dir = sortDir === "asc" ? 1 : -1;
  rows.sort((a, b) => {
    if (sortBy === "value") return (a.value - b.value) * dir;
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
    return (new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()) * dir;
  });

  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pageCount);
  const items = rows.slice((current - 1) * pageSize, current * pageSize);
  return { items: clone(items), total, page: current, pageSize, pageCount };
}

/** Everything the Manual Leads form collects. */
export interface NewLead {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  source: PlatformId;
  priority?: LeadPriority;
  value?: number;

  /* Manual-lead fields */
  status?: LeadStatus;
  statusDescription?: string;
  ownerMobile?: string;
  businessName?: string;
  businessType?: string;
  address?: string;
  website?: string;
  budget?: number | null;
  currency?: string;
  requirement?: string;
  startDate?: string;
  expectedEndDate?: string;
  socials?: LeadSocial[];
}

/* Monotonic, never reused. The old `lead_${2000 + LEADS.length}` collides the
   moment anything is deleted: remove one, add one, and the new lead is handed
   an id that already exists. */
let leadSeq = 3000;
const nextLeadId = () => `lead_${leadSeq++}`;

export async function createLead(input: NewLead): Promise<Lead> {
  await latency();
  const now = new Date().toISOString();
  const id = nextLeadId();
  const lead: Lead = {
    id,
    companyId: COMPANY.id,
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company ?? input.businessName,
    source: input.source,
    origin: input.source === "manual" ? "manual" : "integration",
    externalId: `manual_${Date.now()}`,
    status: input.status ?? "new",
    statusDescription: input.statusDescription,
    priority: input.priority ?? "medium",
    value: input.value ?? 0,
    tags: [],
    notes: "",
    receivedAt: now,
    updatedAt: now,
    syncStatus: "synced",
    // Was the constant "t_new_0" on EVERY created lead — duplicate React keys.
    timeline: [{ id: `t_${id}_0`, type: "created", label: "Created manually", at: now }],

    ownerMobile: input.ownerMobile ?? input.phone,
    businessName: input.businessName,
    businessType: input.businessType,
    address: input.address,
    website: input.website,
    budget: input.budget ?? null,
    currency: input.currency ?? "INR",
    requirement: input.requirement,
    startDate: input.startDate,
    expectedEndDate: input.expectedEndDate,
    socials: input.socials ?? [],
  };
  LEADS.unshift(lead);
  return clone(lead);
}

export async function getLead(id: string): Promise<Lead | null> {
  await latency();
  const found = LEADS.find((l) => l.id === id);
  return found ? clone(found) : null;
}

export type LeadUpdate = Partial<
  Omit<Lead, "id" | "companyId" | "timeline" | "receivedAt" | "updatedAt">
> & { assigneeId?: string | null };

export async function updateLead(id: string, patch: LeadUpdate): Promise<Lead> {
  await latency();
  const lead = LEADS.find((l) => l.id === id);
  if (!lead) throw new Error("Lead not found");
  if (patch.status && patch.status !== lead.status) {
    lead.timeline.push({
      id: `t_${id}_${lead.timeline.length}`,
      type: "status_changed",
      label: `${statusLabel(lead.status)} → ${statusLabel(patch.status)}`,
      at: new Date().toISOString(),
    });
    lead.status = patch.status;
  }
  if (patch.statusDescription !== undefined)
    lead.statusDescription = patch.statusDescription;
  if (patch.assigneeId !== undefined)
    lead.assigneeId = patch.assigneeId ?? undefined;

  // Every other field is now editable (name/email/phone/value/... were not).
  for (const [k, v] of Object.entries(patch)) {
    if (k === "status" || k === "assigneeId" || v === undefined) continue;
    (lead as unknown as Record<string, unknown>)[k] = v;
  }
  lead.updatedAt = new Date().toISOString();
  return clone(lead);
}

/** There was no delete anywhere in the CRM. */
export async function deleteLead(id: string): Promise<void> {
  await latency();
  const i = LEADS.findIndex((l) => l.id === id);
  if (i === -1) throw new Error("Lead not found");
  LEADS.splice(i, 1);
}

/* ── Campaigns ─────────────────────────────────────────────────────────── */
export async function listCampaigns(): Promise<Campaign[]> {
  await latency();
  return clone(CAMPAIGNS);
}

/* ── Platforms ─────────────────────────────────────────────────────────── */
export async function getPlatformStats(): Promise<PlatformStat[]> {
  await latency();
  return PLATFORM_ORDER.map((platform): PlatformStat => {
    const rows = LEADS.filter((l) => l.source === platform);
    const converted = rows.filter((l) => l.status === "won").length;
    const pending = rows.filter((l) => l.status === "new" || l.status === "contacted").length;
    return {
      platform,
      totalLeads: rows.length,
      converted,
      pending,
      engagement: 40 + ((platform.length * 7) % 55),
      trend: Math.round(((platform.charCodeAt(0) % 9) - 3) * 3.2 * 10) / 10,
    };
  });
}

/* ── Analytics ─────────────────────────────────────────────────────────── */
export interface AnalyticsResult {
  timeseries: TimeseriesPoint[];
  funnel: FunnelStage[];
  bySource: { platform: PlatformId; leads: number; conversions: number }[];
}

export async function getAnalytics(
  granularity: Granularity = "daily",
): Promise<AnalyticsResult> {
  await latency();
  let timeseries: TimeseriesPoint[] = clone(TIMESERIES);

  if (granularity !== "daily") {
    const bucket = granularity === "weekly" ? 7 : 30;
    const grouped: TimeseriesPoint[] = [];
    for (let i = 0; i < timeseries.length; i += bucket) {
      const slice = timeseries.slice(i, i + bucket);
      grouped.push({
        date: slice[0].date,
        leads: slice.reduce((s, p) => s + p.leads, 0),
        conversions: slice.reduce((s, p) => s + p.conversions, 0),
        revenue: slice.reduce((s, p) => s + p.revenue, 0),
      });
    }
    timeseries = grouped;
  }

  const captured = LEADS.length;
  const contacted = LEADS.filter((l) => l.status !== "new").length;
  const qualified = LEADS.filter((l) => l.status === "qualified" || l.status === "won").length;
  const won = LEADS.filter((l) => l.status === "won").length;
  const funnel: FunnelStage[] = [
    { stage: "Captured", value: captured },
    { stage: "Contacted", value: contacted },
    { stage: "Qualified", value: qualified },
    { stage: "Won", value: won },
  ];

  const bySource = PLATFORM_ORDER.map((platform) => {
    const rows = LEADS.filter((l) => l.source === platform);
    return {
      platform,
      leads: rows.length,
      conversions: rows.filter((l) => l.status === "won").length,
    };
  }).filter((s) => s.leads > 0);

  return { timeseries, funnel, bySource };
}

/* ── Team ──────────────────────────────────────────────────────────────── */
export async function listTeam(): Promise<TeamMember[]> {
  await latency();
  return clone(TEAM);
}

/* ── Integrations ──────────────────────────────────────────────────────── */
export async function listIntegrations(): Promise<Integration[]> {
  await latency();
  return clone(INTEGRATIONS);
}

export async function saveIntegration(
  platform: PlatformId,
  config: Record<string, string>,
): Promise<Integration> {
  await latency();
  const it = INTEGRATIONS.find((i) => i.platform === platform);
  if (!it) throw new Error("Unknown platform");
  it.config = { ...it.config, ...config };
  it.status = "connected";
  it.connectedAt = new Date().toISOString();
  it.lastSyncedAt = new Date().toISOString();
  it.note = undefined;
  return clone(it);
}

export async function disconnectIntegration(
  platform: PlatformId,
): Promise<Integration> {
  await latency();
  const it = INTEGRATIONS.find((i) => i.platform === platform);
  if (!it) throw new Error("Unknown platform");
  it.status = "disconnected";
  it.connectedAt = undefined;
  it.lastSyncedAt = undefined;
  return clone(it);
}
