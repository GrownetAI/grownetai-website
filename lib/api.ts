"use client";

/**
 * Typed API client for the GrownetAI FastAPI backend.
 *
 * Base URL comes from NEXT_PUBLIC_API_URL (see .env.local), defaulting to the
 * local backend. A request interceptor attaches the stored JWT automatically.
 */
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const api = axios.create({ baseURL: API_URL });

const TOKEN_KEY = "gn_token";

export const tokenStore = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },
  set(token: string) {
    if (typeof window !== "undefined") window.localStorage.setItem(TOKEN_KEY, token);
  },
  clear() {
    if (typeof window !== "undefined") window.localStorage.removeItem(TOKEN_KEY);
  },
};

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  const data = res.data as AuthResponse;
  tokenStore.set(data.access_token);
  return data;
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
  shop?: string;
}): Promise<AuthResponse> {
  const res = await api.post("/auth/register", payload);
  const data = res.data as AuthResponse;
  tokenStore.set(data.access_token);
  return data;
}

export async function getMe(): Promise<AuthUser> {
  const res = await api.get("/auth/me");
  return res.data as AuthUser;
}

export function logout() {
  tokenStore.clear();
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
