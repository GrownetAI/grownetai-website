/**
 * CRM domain types.
 *
 * These are written to map cleanly onto the eventual persistence + ingestion
 * stack (MongoDB documents fed by platform webhooks/pollers → AWS SQS → workers).
 * Every record is scoped to a `companyId` (tenant) and lead-bearing records
 * carry ingestion metadata (`source`, `externalId`, `receivedAt`, `syncStatus`)
 * so swapping the mock data layer for real collections is a drop-in.
 */

/** The eight supported lead channels. Stable string ids = Mongo enum values. */
export type PlatformId =
  | "manual"
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "website"
  | "email"
  | "youtube"
  | "threads"
  | "x";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "meeting_scheduled"
  | "proposal_sent"
  | "negotiation"
  | "in_progress"
  | "on_hold"
  | "won"
  | "lost"
  | "completed";

/** Where a lead came from: hand-entered by the team, or ingested from a channel. */
export type LeadOrigin = "manual" | "integration";

/** A dynamic number of handles per lead (the brief requires this to be open-ended). */
export interface LeadSocial {
  platform:
    | "instagram" | "facebook" | "linkedin" | "youtube"
    | "threads" | "x" | "whatsapp" | "other";
  handle: string;
}

export type LeadPriority = "low" | "medium" | "high";

/** Where a synced record currently sits in the ingestion pipeline. */
export type SyncStatus = "synced" | "pending" | "failed";

export interface Company {
  id: string;
  name: string;
  domain?: string;
  plan: "starter" | "growth" | "enterprise";
  createdAt: string;
}

export interface TeamMember {
  id: string;
  companyId: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "agent";
  avatar?: string;
  activeLeads: number;
}

export interface LeadTimelineEvent {
  id: string;
  type:
    | "created"
    | "status_changed"
    | "note_added"
    | "assigned"
    | "contacted"
    | "email"
    | "call";
  label: string;
  at: string;
  by?: string;
}

export interface Lead {
  id: string;
  companyId: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  source: PlatformId;
  /** Provider-native id (e.g. Meta lead id) — the ingestion idempotency key. */
  externalId?: string;
  campaignId?: string;
  status: LeadStatus;
  priority: LeadPriority;
  value: number;
  assigneeId?: string;
  tags: string[];
  notes: string;
  /** When the lead was captured on the source platform. */
  receivedAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
  timeline: LeadTimelineEvent[];

  /* ── Manual-lead fields ────────────────────────────────────────────────
     Present on every lead so the table/drawer never branch on origin; they are
     simply empty for leads that arrived through an integration. */
  origin: LeadOrigin;
  /** Why the status changed / internal notes. */
  statusDescription?: string;
  ownerMobile?: string;
  businessName?: string;
  businessType?: string;
  address?: string;
  website?: string;
  /** Estimated budget. Optional — an empty budget is a valid lead. */
  budget?: number | null;
  currency?: string;
  requirement?: string;
  startDate?: string;
  expectedEndDate?: string;
  socials?: LeadSocial[];
}

export interface Campaign {
  id: string;
  companyId: string;
  name: string;
  platform: PlatformId;
  status: "active" | "scheduled" | "ended" | "paused";
  startDate: string;
  endDate?: string;
  budget: number;
  spend: number;
  leads: number;
  conversions: number;
  revenue: number;
}

/** Per-platform connection — the object the onboarding/Integrations UI writes. */
export interface Integration {
  platform: PlatformId;
  companyId: string;
  status: "connected" | "syncing" | "error" | "disconnected";
  connectedAt?: string;
  lastSyncedAt?: string;
  /** Captured credential/config values, keyed by the platform's field ids. */
  config: Record<string, string>;
  /** Human-readable ingestion note (e.g. last error, webhook health). */
  note?: string;
  leadsIngested: number;
}

/* ── Aggregates the API returns pre-computed (server-side in production) ── */

export interface PlatformStat {
  platform: PlatformId;
  totalLeads: number;
  converted: number;
  pending: number;
  engagement: number;
  /** % change vs previous period. */
  trend: number;
}

export interface TimeseriesPoint {
  /** ISO date (day granularity) or period label. */
  date: string;
  leads: number;
  conversions: number;
  revenue: number;
}

export interface FunnelStage {
  stage: string;
  value: number;
}

export interface DashboardSummary {
  totalLeads: number;
  newToday: number;
  conversionRate: number;
  revenue: number;
  activeCampaigns: number;
  /** Deltas vs the previous period, for the KPI trend chips. */
  deltas: {
    totalLeads: number;
    newToday: number;
    conversionRate: number;
    revenue: number;
  };
  sourceDistribution: { platform: PlatformId; value: number }[];
  timeseries: TimeseriesPoint[];
}

export type Granularity = "daily" | "weekly" | "monthly";
