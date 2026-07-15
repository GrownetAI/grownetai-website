/**
 * Multi-tenant mock data for the owner Admin god-view.
 *
 * Models several registered companies (tenants), each with their own leads and
 * platform integrations, so the admin dashboard has cross-company data to
 * search / sort / filter. Isolated from the UI — the admin pages read through
 * `lib/crm/admin-api.ts`. Maps onto the real shape: one Mongo `companies`
 * collection + a `leads` collection scoped by `companyId`.
 */
import type {
  Company,
  Integration,
  Lead,
  LeadStatus,
  LeadPriority,
  PlatformId,
  SyncStatus,
} from "./types";
import { CONNECTABLE_PLATFORMS, PLATFORM_ORDER } from "./platforms";

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(88061979);
const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const int = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;
const DAY = 86_400_000;
const iso = (offsetDays: number) => new Date(Date.now() - offsetDays * DAY).toISOString();

const COMPANY_DEFS: { id: string; name: string; domain: string; plan: Company["plan"]; ageDays: number }[] = [
  { id: "co_grownetai", name: "GrownetAI", domain: "grownetai.com", plan: "growth", ageDays: 180 },
  { id: "co_pini", name: "Pini Shop", domain: "pinishop.com", plan: "enterprise", ageDays: 240 },
  { id: "co_bloom", name: "Bloom Fashion", domain: "bloomfashion.co", plan: "growth", ageDays: 120 },
  { id: "co_foodiehub", name: "FoodieHub", domain: "foodiehub.io", plan: "starter", ageDays: 64 },
  { id: "co_vertex", name: "Vertex Labs", domain: "vertexlabs.ai", plan: "enterprise", ageDays: 300 },
  { id: "co_harbor", name: "Harbor Fit", domain: "harborfit.com", plan: "starter", ageDays: 30 },
];

export const ALL_COMPANIES: Company[] = COMPANY_DEFS.map((c) => ({
  id: c.id,
  name: c.name,
  domain: c.domain,
  plan: c.plan,
  createdAt: iso(c.ageDays),
}));

const FIRST = ["Olivia", "Liam", "Emma", "Noah", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "Lucas", "Mia", "Kai", "Zoe", "Arjun", "Priya", "Chen", "Fatima", "Leo", "Nina", "Omar", "Yuki", "Sam", "Ivy", "Dev"];
const LAST = ["Bennett", "Carter", "Diaz", "Ford", "Gupta", "Hughes", "Ito", "Kane", "Lopez", "Mehta", "Novak", "Owens", "Park", "Quinn", "Reyes", "Singh", "Tran", "Vance", "Wong", "Zhao"];
const STATUS_POOL: LeadStatus[] = ["new", "new", "contacted", "contacted", "qualified", "qualified", "won", "lost"];
const PRIORITY_POOL: LeadPriority[] = ["low", "medium", "medium", "high"];
const SYNC_POOL: SyncStatus[] = ["synced", "synced", "synced", "synced", "pending", "failed"];

let counter = 5000;
function makeLead(companyId: string): Lead {
  const name = `${pick(FIRST)} ${pick(LAST)}`;
  const source = CONNECTABLE_PLATFORMS[int(0, CONNECTABLE_PLATFORMS.length - 1)];
  const status = pick(STATUS_POOL);
  const days = int(0, 45);
  const value = status === "won" ? int(1000, 12000) : int(0, 7000);
  const id = `lead_${counter++}`;
  return {
    id,
    companyId,
    origin: "integration" as const,
    name,
    email: `${name.toLowerCase().replace(/[^a-z]/g, ".")}@${pick(["gmail.com", "outlook.com", "company.co"])}`,
    phone: `+1 ${int(200, 989)} ${int(200, 989)} ${int(1000, 9999)}`,
    source,
    externalId: `${source}_${int(10000, 99999)}`,
    status,
    priority: pick(PRIORITY_POOL),
    value,
    tags: [],
    notes: "",
    receivedAt: iso(days),
    updatedAt: iso(Math.max(0, days - 1)),
    syncStatus: pick(SYNC_POOL),
    timeline: [{ id: `${id}_0`, type: "created", label: `Captured from ${source}`, at: iso(days) }],
  };
}

export const ALL_LEADS: Lead[] = ALL_COMPANIES.flatMap((c) =>
  Array.from({ length: int(28, 72) }, () => makeLead(c.id)),
);

export const ALL_INTEGRATIONS: Integration[] = ALL_COMPANIES.flatMap((c) =>
  CONNECTABLE_PLATFORMS.map((platform, i): Integration => {
    const roll = rand();
    const status: Integration["status"] =
      roll > 0.82 ? "error" : roll > 0.35 ? "connected" : "disconnected";
    const ingested = status === "connected" || status === "error"
      ? ALL_LEADS.filter((l) => l.companyId === c.id && l.source === platform).length
      : 0;
    return {
      platform,
      companyId: c.id,
      status,
      connectedAt: status !== "disconnected" ? iso(int(10, 150)) : undefined,
      lastSyncedAt: status === "connected" ? iso(0) : undefined,
      config: {},
      note: status === "error" ? "Token expired — reconnect required." : undefined,
      leadsIngested: ingested,
    };
  }),
);
