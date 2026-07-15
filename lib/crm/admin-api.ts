/**
 * Owner Admin data-access seam (cross-company god-view).
 *
 * The admin UI imports ONLY from here. Shaped like the future admin REST API:
 *   getAdminOverview     → GET /api/admin/overview
 *   listAllCompanies     → GET /api/admin/companies?…
 *   getCompanyDetail     → GET /api/admin/companies/:id
 *   listAllLeads         → GET /api/admin/leads?…      (company filter added)
 *   listAllIntegrations  → GET /api/admin/integrations?…
 */
import { ALL_COMPANIES, ALL_INTEGRATIONS, ALL_LEADS } from "./admin-data";
import { PLATFORM_ORDER } from "./platforms";
import type {
  Company,
  Integration,
  Lead,
  LeadPriority,
  LeadStatus,
  PlatformId,
} from "./types";

const latency = () => new Promise((r) => setTimeout(r, 160));
const clone = <T,>(v: T): T =>
  typeof structuredClone === "function" ? structuredClone(v) : JSON.parse(JSON.stringify(v));
const DAY = 86_400_000;

export interface CompanyRow extends Company {
  leads: number;
  won: number;
  revenue: number;
  connectedPlatforms: number;
  erroredPlatforms: number;
}

function companyRow(c: Company): CompanyRow {
  const leads = ALL_LEADS.filter((l) => l.companyId === c.id);
  const won = leads.filter((l) => l.status === "won");
  const ints = ALL_INTEGRATIONS.filter((i) => i.companyId === c.id);
  return {
    ...c,
    leads: leads.length,
    won: won.length,
    revenue: won.reduce((s, l) => s + l.value, 0),
    connectedPlatforms: ints.filter((i) => i.status === "connected").length,
    erroredPlatforms: ints.filter((i) => i.status === "error").length,
  };
}

/* ── Overview ── */
export interface AdminOverview {
  totalCompanies: number;
  totalLeads: number;
  totalRevenue: number;
  connectedIntegrations: number;
  erroredIntegrations: number;
  newCompaniesThisMonth: number;
  timeseries: { date: string; leads: number; conversions: number }[];
  topCompanies: CompanyRow[];
  sourceDistribution: { platform: PlatformId; value: number }[];
}

export async function getAdminOverview(): Promise<AdminOverview> {
  await latency();
  const rows = ALL_COMPANIES.map(companyRow);
  const won = ALL_LEADS.filter((l) => l.status === "won");

  // 30-day global timeseries by receivedAt day
  const days = 30;
  const timeseries = Array.from({ length: days }, (_, i) => {
    const dayStart = new Date(Date.now() - (days - 1 - i) * DAY).toISOString().slice(0, 10);
    const dayLeads = ALL_LEADS.filter((l) => l.receivedAt.slice(0, 10) === dayStart);
    return {
      date: dayStart,
      leads: dayLeads.length,
      conversions: dayLeads.filter((l) => l.status === "won").length,
    };
  });

  const monthAgo = Date.now() - 30 * DAY;

  return {
    totalCompanies: ALL_COMPANIES.length,
    totalLeads: ALL_LEADS.length,
    totalRevenue: won.reduce((s, l) => s + l.value, 0),
    connectedIntegrations: ALL_INTEGRATIONS.filter((i) => i.status === "connected").length,
    erroredIntegrations: ALL_INTEGRATIONS.filter((i) => i.status === "error").length,
    newCompaniesThisMonth: ALL_COMPANIES.filter((c) => new Date(c.createdAt).getTime() > monthAgo).length,
    timeseries,
    topCompanies: rows.sort((a, b) => b.leads - a.leads).slice(0, 5),
    sourceDistribution: PLATFORM_ORDER.map((platform) => ({
      platform,
      value: ALL_LEADS.filter((l) => l.source === platform).length,
    })).filter((s) => s.value > 0),
  };
}

/* ── Companies ── */
export interface CompanyQuery {
  search?: string;
  plan?: Company["plan"] | "all";
  sortBy?: "name" | "leads" | "revenue" | "createdAt";
  sortDir?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}
export interface CompanyPage {
  items: CompanyRow[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export async function listAllCompanies(q: CompanyQuery = {}): Promise<CompanyPage> {
  await latency();
  const { search = "", plan = "all", sortBy = "leads", sortDir = "desc", page = 1, pageSize = 8 } = q;
  let rows = ALL_COMPANIES.map(companyRow);
  const s = search.trim().toLowerCase();
  if (s) rows = rows.filter((r) => r.name.toLowerCase().includes(s) || (r.domain ?? "").toLowerCase().includes(s));
  if (plan !== "all") rows = rows.filter((r) => r.plan === plan);

  const dir = sortDir === "asc" ? 1 : -1;
  rows.sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
    if (sortBy === "revenue") return (a.revenue - b.revenue) * dir;
    if (sortBy === "createdAt") return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
    return (a.leads - b.leads) * dir;
  });

  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pageCount);
  return { items: clone(rows.slice((current - 1) * pageSize, current * pageSize)), total, page: current, pageSize, pageCount };
}

export async function getCompanyDetail(id: string): Promise<{
  company: CompanyRow;
  integrations: Integration[];
  recentLeads: Lead[];
} | null> {
  await latency();
  const company = ALL_COMPANIES.find((c) => c.id === id);
  if (!company) return null;
  return {
    company: companyRow(company),
    integrations: clone(ALL_INTEGRATIONS.filter((i) => i.companyId === id)),
    recentLeads: clone(
      ALL_LEADS.filter((l) => l.companyId === id)
        .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
        .slice(0, 5),
    ),
  };
}

/* ── All leads (global) ── */
export interface AdminLeadQuery {
  search?: string;
  companyId?: string | "all";
  status?: LeadStatus | "all";
  source?: PlatformId | "all";
  priority?: LeadPriority | "all";
  sortBy?: "receivedAt" | "value" | "name";
  sortDir?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}
export interface AdminLeadRow extends Lead {
  companyName: string;
}
export interface AdminLeadPage {
  items: AdminLeadRow[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

const companyName = (id: string) => ALL_COMPANIES.find((c) => c.id === id)?.name ?? "—";

export async function listAllLeads(q: AdminLeadQuery = {}): Promise<AdminLeadPage> {
  await latency();
  const {
    search = "", companyId = "all", status = "all", source = "all", priority = "all",
    sortBy = "receivedAt", sortDir = "desc", page = 1, pageSize = 12,
  } = q;

  let rows = ALL_LEADS.slice();
  const s = search.trim().toLowerCase();
  if (s) rows = rows.filter((l) => l.name.toLowerCase().includes(s) || (l.email ?? "").toLowerCase().includes(s));
  if (companyId !== "all") rows = rows.filter((l) => l.companyId === companyId);
  if (status !== "all") rows = rows.filter((l) => l.status === status);
  if (source !== "all") rows = rows.filter((l) => l.source === source);
  if (priority !== "all") rows = rows.filter((l) => l.priority === priority);

  const dir = sortDir === "asc" ? 1 : -1;
  rows.sort((a, b) => {
    if (sortBy === "value") return (a.value - b.value) * dir;
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
    return (new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()) * dir;
  });

  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pageCount);
  const items = rows.slice((current - 1) * pageSize, current * pageSize).map((l) => ({ ...clone(l), companyName: companyName(l.companyId) }));
  return { items, total, page: current, pageSize, pageCount };
}

/* ── All integrations (health) ── */
export interface AdminIntegrationRow extends Integration {
  companyName: string;
}
export async function listAllIntegrations(q: { status?: string; platform?: string; companyId?: string } = {}): Promise<AdminIntegrationRow[]> {
  await latency();
  const { status = "all", platform = "all", companyId = "all" } = q;
  let rows = ALL_INTEGRATIONS.slice();
  if (status !== "all") rows = rows.filter((i) => i.status === status);
  if (platform !== "all") rows = rows.filter((i) => i.platform === platform);
  if (companyId !== "all") rows = rows.filter((i) => i.companyId === companyId);
  return rows.map((i) => ({ ...clone(i), companyName: companyName(i.companyId) }));
}

export async function listCompaniesLite(): Promise<{ id: string; name: string }[]> {
  await latency();
  return ALL_COMPANIES.map((c) => ({ id: c.id, name: c.name }));
}
