"use client";

/**
 * REAL leads client — talks to the Express backend, not the mock store.
 *
 * The rest of the CRM (campaigns, team, platforms) still reads `lib/crm/api.ts`,
 * which is an in-browser mock. Manual leads cannot be: the whole point of the
 * feature is that an ADMIN edits a lead and the CLIENT — a different person, in
 * a different browser — sees the new status without refreshing. A module-level
 * JS array cannot do that. These calls hit the API, and `subscribeToLeads()`
 * opens the SSE stream that pushes the change to the client.
 */
import { api } from "@/lib/api";
import type { LeadPriority, LeadStatus, LeadSocial } from "./types";

/** The API speaks snake_case; the UI speaks camelCase. */
export interface ManualLead {
  id: number;
  ownerName: string;
  ownerMobile: string | null;
  ownerEmail: string | null;
  businessName: string | null;
  businessType: string | null;
  address: string | null;
  website: string | null;
  budget: number | null;
  currency: string;
  requirement: string | null;
  startDate: string | null;
  expectedEndDate: string | null;
  status: LeadStatus;
  statusDescription: string | null;
  priority: LeadPriority;
  source: string;
  origin: "manual" | "integration";
  value: number;
  createdAt: string;
  updatedAt: string;
  socials: LeadSocial[];
  timeline: { id: number; type: string; label: string; body: string | null; at: string }[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const toLead = (r: any): ManualLead => ({
  id: r.id,
  ownerName: r.owner_name,
  ownerMobile: r.owner_mobile,
  ownerEmail: r.owner_email,
  businessName: r.business_name,
  businessType: r.business_type,
  address: r.address,
  website: r.website,
  budget: r.budget,
  currency: r.currency,
  requirement: r.requirement,
  startDate: r.start_date,
  expectedEndDate: r.expected_end_date,
  status: r.status,
  statusDescription: r.status_description,
  priority: r.priority,
  source: r.source,
  origin: r.origin,
  value: r.value,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  socials: r.socials ?? [],
  timeline: r.timeline ?? [],
});

export interface ManualLeadInput {
  ownerName: string;
  ownerMobile?: string;
  ownerEmail?: string;
  businessName?: string;
  businessType?: string;
  address?: string;
  website?: string;
  budget?: number | null;
  requirement?: string;
  startDate?: string;
  expectedEndDate?: string;
  status?: LeadStatus;
  statusDescription?: string;
  priority?: LeadPriority;
  socials?: LeadSocial[];
}

const toPayload = (i: ManualLeadInput) => ({
  owner_name: i.ownerName,
  owner_mobile: i.ownerMobile || undefined,
  owner_email: i.ownerEmail || undefined,
  business_name: i.businessName || undefined,
  business_type: i.businessType || undefined,
  address: i.address || undefined,
  website: i.website || undefined,
  // null (not 0) so "unknown budget" stays distinct from "zero budget".
  budget: i.budget ?? null,
  requirement: i.requirement || undefined,
  start_date: i.startDate || undefined,
  expected_end_date: i.expectedEndDate || undefined,
  status: i.status,
  status_description: i.statusDescription || undefined,
  priority: i.priority,
  source: "manual" as const,
  value: i.budget ?? 0,
  socials: i.socials ?? [],
});

export interface LeadPage {
  items: ManualLead[];
  total: number;
  page: number;
  pageCount: number;
}

export async function listManualLeads(q: {
  search?: string;
  status?: LeadStatus;
  page?: number;
  pageSize?: number;
  sortBy?: "created_at" | "owner_name" | "value";
  sortDir?: "asc" | "desc";
}): Promise<LeadPage> {
  const res = await api.get("/leads", {
    params: {
      search: q.search || undefined,
      status: q.status || undefined,
      origin: "manual",
      page: q.page ?? 1,
      page_size: q.pageSize ?? 10,
      sort_by: q.sortBy ?? "created_at",
      sort_dir: q.sortDir ?? "desc",
    },
  });
  return {
    items: res.data.items.map(toLead),
    total: res.data.total,
    page: res.data.page,
    pageCount: res.data.page_count,
  };
}

/** @returns the lead, plus any advisory duplicate matches (same company + phone). */
export async function createManualLead(
  input: ManualLeadInput,
): Promise<{ lead: ManualLead; duplicates: { id: number; owner_name: string }[] }> {
  const res = await api.post("/leads", toPayload(input));
  return { lead: toLead(res.data), duplicates: res.data.duplicates ?? [] };
}

export async function updateManualLead(
  id: number,
  input: Partial<ManualLeadInput>,
): Promise<ManualLead> {
  const res = await api.patch(`/leads/${id}`, toPayload(input as ManualLeadInput));
  return toLead(res.data);
}

export async function deleteManualLead(id: number): Promise<void> {
  await api.delete(`/leads/${id}`);
}

export async function leadStats(): Promise<{
  total: number;
  by_status: Record<string, number>;
  by_source: Record<string, number>;
  won: number;
  lost: number;
  conversion_rate: number;
  budget_total: number;
}> {
  const res = await api.get("/leads/stats");
  return res.data;
}

/* ── Real-time ──────────────────────────────────────────────────────────── */

export type LeadEvent =
  | { type: "lead.created"; lead: ManualLead }
  | { type: "lead.updated"; lead: ManualLead }
  | { type: "lead.status_changed"; lead: ManualLead }
  | { type: "lead.deleted"; lead: { id: number } };

/**
 * Subscribe to this company's lead stream.
 *
 * `EventSource` cannot send an Authorization header — but it DOES send cookies
 * with `withCredentials`, so the httpOnly session authenticates the stream and
 * nothing sensitive appears in the URL. It reconnects on its own; `onError`
 * exists so the UI can fall back to a refetch rather than silently going stale
 * — "real-time synchronization failure" is an explicit edge case in the brief.
 *
 * @returns an unsubscribe function.
 */
export function subscribeToLeads(
  onEvent: (e: LeadEvent) => void,
  onError?: () => void,
  /** Fires when the stream is actually connected — not when data first arrives. */
  onOpen?: () => void,
): () => void {
  if (typeof window === "undefined") return () => {};

  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  // `withCredentials` makes the browser attach the httpOnly session cookie.
  // The token used to be smuggled through the query string, where it leaked
  // into access logs and browser history. It no longer touches the URL.
  const es = new EventSource(`${base}/leads/stream`, { withCredentials: true });

  const handle = (raw: MessageEvent) => {
    try {
      const frame = JSON.parse(raw.data);
      /* The frame carries the RAW backend row — snake_case. It MUST go through
         the same mapper as the REST responses.

         Passing it through untouched is a silent, nasty bug: the fields whose
         names happen to match (`status`, `priority`, `id`) update correctly,
         so it looks like it works — while every renamed field
         (`status_description` -> statusDescription, `owner_name` -> ownerName,
         `business_name`, the dates…) quietly becomes `undefined`. The status
         badge changes and the description vanishes. */
      if (frame.type === "lead.deleted") {
        onEvent({ type: "lead.deleted", lead: { id: frame.lead.id } });
        return;
      }
      onEvent({ type: frame.type, lead: toLead(frame.lead) } as LeadEvent);
    } catch {
      /* malformed frame — ignore rather than kill the stream */
    }
  };

  for (const t of ["lead.created", "lead.updated", "lead.status_changed", "lead.deleted"]) {
    es.addEventListener(t, handle as EventListener);
  }
  // The server sends a `ready` frame on connect. `onopen` alone is not enough —
  // EventSource fires it before the server has authenticated us.
  es.addEventListener("ready", () => onOpen?.());
  es.onerror = () => onError?.();

  return () => es.close();
}
