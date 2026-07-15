/**
 * Structured mock data for the CRM.
 *
 * ISOLATED from the UI — components import from `lib/crm/api.ts`, never from
 * here. A seeded PRNG makes the dataset deterministic within a session so
 * numbers are stable across renders. When the real MongoDB + SQS pipeline lands,
 * this file is deleted and `api.ts` points at REST endpoints instead.
 */
import type {
  Campaign,
  Company,
  Integration,
  Lead,
  LeadStatus,
  LeadPriority,
  PlatformId,
  TeamMember,
} from "./types";
import { CONNECTABLE_PLATFORMS, PLATFORM_ORDER } from "./platforms";

/* ── seeded PRNG (mulberry32) ── */
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
const rand = rng(20260709);
const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const int = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const DAY = 86_400_000;
const iso = (offsetDays: number, jitterMs = 0) =>
  new Date(Date.now() - offsetDays * DAY - jitterMs).toISOString();

export const COMPANY: Company = {
  id: "co_grownetai",
  name: "GrownetAI",
  domain: "grownetai.com",
  plan: "growth",
  createdAt: iso(180),
};

export const TEAM: TeamMember[] = [
  { id: "u_jenny", companyId: COMPANY.id, name: "Jenny Wilson", email: "jenny@grownetai.com", role: "owner", avatar: "https://i.pravatar.cc/150?img=47", activeLeads: 0 },
  { id: "u_marcus", companyId: COMPANY.id, name: "Marcus Lee", email: "marcus@grownetai.com", role: "admin", avatar: "https://i.pravatar.cc/150?img=12", activeLeads: 0 },
  { id: "u_aisha", companyId: COMPANY.id, name: "Aisha Khan", email: "aisha@grownetai.com", role: "agent", avatar: "https://i.pravatar.cc/150?img=32", activeLeads: 0 },
  { id: "u_diego", companyId: COMPANY.id, name: "Diego Ramos", email: "diego@grownetai.com", role: "agent", avatar: "https://i.pravatar.cc/150?img=15", activeLeads: 0 },
  { id: "u_sara", companyId: COMPANY.id, name: "Sara Novak", email: "sara@grownetai.com", role: "agent", avatar: "https://i.pravatar.cc/150?img=45", activeLeads: 0 },
];

const CAMPAIGN_NAMES: Record<PlatformId, string[]> = {
  manual: [],
  instagram: ["Reels Retargeting", "Summer Story Ads"],
  facebook: ["Lead Ads — Q3", "Lookalike Prospecting"],
  whatsapp: ["Click-to-WhatsApp"],
  website: ["Pricing Page CTA", "Blog Content Offer"],
  email: ["Newsletter Nurture"],
  youtube: ["Demo Walkthrough Ads"],
  threads: ["Threads Launch Buzz"],
  x: ["X Lead Gen Cards"],
};

export const CAMPAIGNS: Campaign[] = CONNECTABLE_PLATFORMS.flatMap((platform, pi) =>
  CAMPAIGN_NAMES[platform].map((name, ci): Campaign => {
    const leads = int(40, 320);
    const conversions = Math.round(leads * (0.08 + rand() * 0.22));
    const spend = int(400, 6000);
    const statuses: Campaign["status"][] = ["active", "active", "scheduled", "ended", "paused"];
    return {
      id: `cmp_${platform}_${ci}`,
      companyId: COMPANY.id,
      name,
      platform,
      status: pick(statuses),
      startDate: iso(int(20, 120)),
      endDate: rand() > 0.5 ? iso(int(0, 10)) : undefined,
      budget: spend + int(200, 3000),
      spend,
      leads,
      conversions,
      revenue: conversions * int(600, 2400),
    };
  }),
);

const FIRST = ["Olivia", "Liam", "Emma", "Noah", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "Lucas", "Mia", "Kai", "Zoe", "Arjun", "Priya", "Chen", "Fatima", "Leo", "Nina", "Omar"];
const LAST = ["Bennett", "Carter", "Diaz", "Ford", "Gupta", "Hughes", "Ito", "Kane", "Lopez", "Mehta", "Novak", "Owens", "Park", "Quinn", "Reyes", "Singh", "Tran", "Vance"];
const COMPANIES = ["Northwind Co", "Bloom Studio", "Vertex Labs", "Pini Shop", "Lumen Foods", "Cedar & Co", "Nimbus Tech", "Harbor Fit", "", ""];
const TAGS = ["hot", "enterprise", "referral", "demo-requested", "pricing", "newsletter", "returning", "budget-approved"];
const STATUS_POOL: LeadStatus[] = ["new", "new", "contacted", "contacted", "qualified", "qualified", "won", "lost"];
const PRIORITY_POOL: LeadPriority[] = ["low", "medium", "medium", "high"];

function makeLead(i: number): Lead {
  const name = `${pick(FIRST)} ${pick(LAST)}`;
  const source = CONNECTABLE_PLATFORMS[int(0, CONNECTABLE_PLATFORMS.length - 1)];
  const status = pick(STATUS_POOL);
  const assignee = rand() > 0.15 ? pick(TEAM) : undefined;
  const receivedDays = int(0, 34);
  const camp = CAMPAIGNS.filter((c) => c.platform === source);
  const handle = name.toLowerCase().replace(/[^a-z]/g, ".");
  const value = status === "won" ? int(1200, 9000) : int(0, 6000);

  const timeline: Lead["timeline"] = [
    { id: `t${i}_0`, type: "created", label: `Captured from ${source}`, at: iso(receivedDays) },
  ];
  if (status !== "new") timeline.push({ id: `t${i}_1`, type: "contacted", label: "First response sent", at: iso(Math.max(0, receivedDays - 1)), by: assignee?.name });
  if (status === "qualified" || status === "won") timeline.push({ id: `t${i}_2`, type: "status_changed", label: "Marked qualified", at: iso(Math.max(0, receivedDays - 2)), by: assignee?.name });
  if (status === "won") timeline.push({ id: `t${i}_3`, type: "status_changed", label: `Deal won — $${value.toLocaleString()}`, at: iso(Math.max(0, receivedDays - 3)), by: assignee?.name });

  return {
    id: `lead_${1000 + i}`,
    companyId: COMPANY.id,
    origin: "integration" as const,
    name,
    email: `${handle}@${pick(["gmail.com", "outlook.com", "company.co"])}`,
    phone: `+1 ${int(200, 989)} ${int(200, 989)} ${int(1000, 9999)}`,
    company: pick(COMPANIES) || undefined,
    source,
    externalId: `${source}_${int(10000, 99999)}`,
    campaignId: camp.length ? pick(camp).id : undefined,
    status,
    priority: pick(PRIORITY_POOL),
    value,
    assigneeId: assignee?.id,
    tags: Array.from(new Set([pick(TAGS), pick(TAGS)])).slice(0, rand() > 0.5 ? 2 : 1),
    notes: rand() > 0.6 ? "Asked about the Growth plan and onboarding timeline." : "",
    receivedAt: iso(receivedDays, int(0, DAY)),
    updatedAt: iso(Math.max(0, receivedDays - int(0, 3))),
    syncStatus: rand() > 0.94 ? "failed" : rand() > 0.88 ? "pending" : "synced",
    timeline,
  };
}

export const LEADS: Lead[] = Array.from({ length: 64 }, (_, i) => makeLead(i));

// backfill each member's active-lead count from the generated leads
for (const m of TEAM) {
  m.activeLeads = LEADS.filter(
    (l) => l.assigneeId === m.id && l.status !== "won" && l.status !== "lost",
  ).length;
}

export const INTEGRATIONS: Integration[] = CONNECTABLE_PLATFORMS.map((platform, i) => {
  const connected = i < 4; // Instagram, Facebook, WhatsApp, Website connected
  const error = platform === "email";
  return {
    platform,
    companyId: COMPANY.id,
    status: error ? "error" : connected ? "connected" : "disconnected",
    connectedAt: connected ? iso(int(30, 160)) : undefined,
    lastSyncedAt: connected ? iso(0, int(0, DAY)) : undefined,
    config: {},
    note: error ? "Inbox token expired — reconnect to resume syncing." : undefined,
    leadsIngested: connected ? LEADS.filter((l) => l.source === platform).length : 0,
  };
});

/** 30-day daily timeseries derived to look organic but stable. */
export const TIMESERIES = Array.from({ length: 30 }, (_, i) => {
  const day = 29 - i;
  const base = 18 + Math.round(10 * Math.sin(i / 3.2) + i * 0.4);
  const leads = Math.max(4, base + int(-4, 6));
  const conversions = Math.round(leads * (0.12 + rand() * 0.16));
  return {
    date: new Date(Date.now() - day * DAY).toISOString().slice(0, 10),
    leads,
    conversions,
    revenue: conversions * int(700, 2100),
  };
});
