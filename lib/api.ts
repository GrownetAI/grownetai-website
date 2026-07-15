"use client";

/**
 * Typed API client for the GrownetAI backend.
 *
 * The session is an httpOnly cookie set by the server, NOT a token in
 * localStorage. Consequences, all of them good:
 *   - JS cannot read it, so an XSS cannot steal the session.
 *   - The browser attaches it automatically, so `EventSource` (which cannot set
 *     headers) works without smuggling the token through the URL.
 *   - Next middleware can see it, so /dashboard and /admin are gated on the
 *     SERVER, before the page is ever sent.
 *
 * `withCredentials` is what makes the browser send it cross-origin
 * (localhost:3000 -> localhost:8002); the backend already sets
 * `Access-Control-Allow-Credentials`.
 */
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const api = axios.create({ baseURL: API_URL, withCredentials: true });

/**
 * A 401 means the session expired or was revoked. Without this, an expired
 * session left the UI silently failing every request with no way back.
 * `/auth/me` is excluded — it is how we probe for a session in the first place,
 * and a 401 there is a normal "signed out", not an error.
 */
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status;
    const url: string = err?.config?.url ?? "";
    const isProbe = url.includes("/auth/me") || url.includes("/auth/login");
    if (status === 401 && !isProbe && typeof window !== "undefined") {
      const next = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?next=${next}`;
    }
    return Promise.reject(err);
  },
);

/* ── Types ──────────────────────────────────────────────────────────────── */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  shop?: string | null;
  role: string;
  avatar?: string | null;
  currency: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface Campaign {
  id: number;
  name: string;
  platform: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
  budget: number;
}

export interface DashboardOverview {
  user: {
    id: number;
    name: string;
    email: string;
    shop?: string | null;
    role: string;
    avatar?: string | null;
  };
  date: string;
  growth_rate: {
    value: number;
    previous: number;
    delta: number;
    delta_label: string;
  };
  wallet: { balance: number; currency: string };
  last_campaign: {
    name: string;
    platform: string;
    start: string;
    end: string;
  } | null;
  chart: { points: { label: string; value: number }[]; max: number };
  campaigns_run: { count: number; month: string; calendar: number[] };
  awaiting_payment: {
    count: number;
    total: number;
    amount: number;
    currency: string;
  };
  guideline: { id: number; title: string; body: string } | null;
  latest_campaigns: Campaign[];
}

/* ── Auth ───────────────────────────────────────────────────────────────── */
export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await api.post("/auth/login", { email, password });
  // No client-side storage: the server set an httpOnly cookie on this response.
  return res.data as AuthResponse;
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
  shop?: string;
}): Promise<AuthResponse> {
  const res = await api.post("/auth/register", payload);
  // No client-side storage: the server set an httpOnly cookie on this response.
  return res.data as AuthResponse;
}

export async function getMe(): Promise<AuthUser> {
  const res = await api.get("/auth/me");
  return res.data as AuthUser;
}

/** The cookie is httpOnly, so only the server can clear it. */
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    /* already expired — the cookie is gone either way */
  }
}

/* ── Dashboard / campaigns ──────────────────────────────────────────────── */
export async function getOverview(): Promise<DashboardOverview> {
  const res = await api.get("/dashboard/overview");
  return res.data as DashboardOverview;
}

export async function getCampaigns(): Promise<Campaign[]> {
  const res = await api.get("/campaigns");
  return res.data as Campaign[];
}

export async function createCampaign(payload: {
  name: string;
  platform: string;
  scheduled_date: string;
  scheduled_time?: string;
  budget?: number;
  status?: string;
}): Promise<Campaign> {
  const res = await api.post("/campaigns", payload);
  return res.data as Campaign;
}

/* ── Role helpers ───────────────────────────────────────────────────────── */
export function isAdmin(user: AuthUser | null | undefined): boolean {
  return user?.role === "admin";
}

/* ── Error helper ───────────────────────────────────────────────────────── */
export function apiErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(err)) {
    const detail = err.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg;
    if (err.message) return err.message;
  }
  return fallback;
}
