import type { ComponentType, SVGProps } from "react";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Globe,
  Mail,
  Youtube,
  AtSign,
  PenLine,
} from "lucide-react";

import type { PlatformId } from "./types";

/* ── Brand glyphs lucide doesn't ship (X, Threads) ── */
function XGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function ThreadsGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.19 21.5c-3.02-.02-5.34-1.02-6.9-2.97C3.9 16.77 3.2 14.3 3.16 11.98v-.03c.04-2.33.74-4.8 2.13-6.55C6.85 3.45 9.17 2.45 12.19 2.43h.02c2.32.02 4.26.6 5.76 1.73 1.41 1.06 2.4 2.58 2.94 4.5l-1.9.53c-.9-3.2-3.16-4.83-6.8-4.86-2.4.02-4.22.79-5.4 2.28-1.1 1.4-1.67 3.42-1.7 5.86.03 2.44.6 4.46 1.7 5.86 1.18 1.49 3 2.26 5.4 2.28 2.17-.02 3.6-.53 4.8-1.7 1.37-1.35 1.35-3.01 1.9-3.86-.32-.55-1.63-1.03-2.56-1.15-.13 1.02-.44 1.77-.94 2.27-.62.62-1.5.93-2.6.93-1.02 0-1.9-.32-2.5-.9-.6-.58-.9-1.36-.85-2.2.08-1.5 1.36-2.6 3.44-2.6.7 0 1.35.06 1.94.18-.08-1.24-.7-1.9-1.94-1.9-.9 0-1.55.35-1.95 1.03l-1.6-1.04c.75-1.24 1.98-1.9 3.55-1.9 2.5 0 3.9 1.5 3.98 4.05.5.28 1.9.98 2.35 2.02.5 1.15.03 3.5-1.7 5.2-1.5 1.47-3.32 2.1-5.9 2.13Zm-.6-6.9c-.9 0-1.53.42-1.56 1 0 .5.5.95 1.35.95 1.1 0 1.75-.62 1.9-1.78-.5-.11-1.05-.17-1.7-.17Z" />
    </svg>
  );
}

export type IntegrationFieldType =
  | "text"
  | "password"
  | "select"
  | "generated";

export interface IntegrationField {
  id: string;
  label: string;
  type: IntegrationFieldType;
  placeholder?: string;
  help?: string;
  required?: boolean;
  options?: string[];
}

export interface PlatformMeta {
  /** Integrations pages skip these — a manual source has nothing to connect. */
  connectable?: boolean;
  id: PlatformId;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Brand identity color for icon chips (NOT used for chart series). */
  brand: string;
  /** True where the brand mark is black (needs inversion in dark mode). */
  monochrome?: boolean;
  /** Fixed categorical chart slot (0–7) — keeps series colors stable. */
  chartSlot: number;
  /** How the company authorizes lead access. */
  authType: "oauth" | "api_key" | "webhook" | "none";
  /** OAuth provider label, when authType === "oauth". */
  provider?: string;
  /** One-liner describing how leads flow in from this platform. */
  ingest: string;
  /** Exactly what the onboarding flow must collect to fetch leads. */
  fields: IntegrationField[];
}

/**
 * The single source of truth for lead channels. `PLATFORM_ORDER` is the fixed
 * canonical order; `chartSlot` pins each platform to a validated color slot so a
 * series never repaints when the set is filtered.
 */
export const PLATFORMS: Record<PlatformId, PlatformMeta> = {
  /* Hand-entered leads. It lives in this registry so it inherits the badge, the
     source filter, the chart slot and the bySource analytics bucket for free —
     every page keys off PLATFORMS/PLATFORM_ORDER. It is NOT connectable, so the
     Platforms and Integrations pages filter it out via `connectable: false`;
     otherwise they would render a nonsense "Connect Manual" card. */
  manual: {
    id: "manual",
    label: "Manual",
    icon: PenLine,
    brand: "#1CA88C",
    chartSlot: 8, // NOT 7 — that is `x`. Two platforms on one slot = one colour.
    authType: "none",
    provider: "GrownetAI",
    connectable: false,
    ingest: "Entered by the team — client meetings, walk-ins, calls, referrals, events.",
    fields: [],
  },
  instagram: {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    brand: "#E4405F",
    chartSlot: 0,
    authType: "oauth",
    provider: "Meta",
    ingest: "Instagram lead-form submissions via the Meta Graph API + leadgen webhook.",
    fields: [
      { id: "pageId", label: "Facebook Page ID", type: "text", placeholder: "1029384756", required: true, help: "The Page linked to your Instagram professional account." },
      { id: "igBusinessId", label: "IG Business Account ID", type: "text", placeholder: "17841400000000000", required: true },
      { id: "accessToken", label: "Access Token", type: "password", placeholder: "EAAG…", required: true, help: "Long-lived token with leads_retrieval scope." },
      { id: "webhookVerify", label: "Webhook Verify Token", type: "text", placeholder: "auto-generated", required: true },
    ],
  },
  facebook: {
    id: "facebook",
    label: "Facebook",
    icon: Facebook,
    brand: "#1877F2",
    chartSlot: 1,
    authType: "oauth",
    provider: "Meta",
    ingest: "Facebook Lead Ads forms, delivered in real time to the leadgen webhook.",
    fields: [
      { id: "pageId", label: "Page ID", type: "text", placeholder: "1029384756", required: true },
      { id: "leadAccessToken", label: "Lead Access Token", type: "password", placeholder: "EAAG…", required: true },
      { id: "formIds", label: "Lead Form IDs", type: "text", placeholder: "comma-separated (optional)" },
      { id: "webhookVerify", label: "Webhook Verify Token", type: "text", placeholder: "auto-generated", required: true },
    ],
  },
  whatsapp: {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    brand: "#25D366",
    chartSlot: 2,
    authType: "api_key",
    ingest: "Inbound WhatsApp Business Cloud API conversations captured as leads.",
    fields: [
      { id: "wabaId", label: "WhatsApp Business Account ID", type: "text", placeholder: "WABA id", required: true },
      { id: "phoneNumberId", label: "Phone Number ID", type: "text", placeholder: "1009…", required: true },
      { id: "accessToken", label: "Permanent Access Token", type: "password", placeholder: "EAAG…", required: true },
      { id: "webhookVerify", label: "Webhook Verify Token", type: "text", placeholder: "auto-generated", required: true },
    ],
  },
  website: {
    id: "website",
    label: "Website",
    icon: Globe,
    brand: "#008080",
    chartSlot: 3,
    authType: "webhook",
    ingest: "Form submissions posted to your capture endpoint or the embed snippet.",
    fields: [
      { id: "domain", label: "Allowed Domain", type: "text", placeholder: "yourbrand.com", required: true },
      { id: "apiKey", label: "API Key", type: "generated", help: "Generated on connect — used to authenticate form posts." },
      { id: "webhookUrl", label: "Capture Endpoint", type: "generated", help: "POST your form payloads here." },
    ],
  },
  email: {
    id: "email",
    label: "Email",
    icon: Mail,
    brand: "#EA4335",
    chartSlot: 4,
    authType: "oauth",
    provider: "Google / Outlook",
    ingest: "Enquiry emails parsed from a connected inbox or forwarding address.",
    fields: [
      { id: "provider", label: "Provider", type: "select", options: ["Gmail", "Outlook", "IMAP"], required: true },
      { id: "inbox", label: "Inbox Address", type: "text", placeholder: "leads@yourbrand.com", required: true },
      { id: "imapHost", label: "IMAP Host", type: "text", placeholder: "imap.yourhost.com (IMAP only)" },
      { id: "appPassword", label: "App Password", type: "password", placeholder: "•••• (IMAP only)" },
      { id: "labelRule", label: "Label / Parse Rule", type: "text", placeholder: "e.g. subject contains \"Enquiry\"" },
    ],
  },
  youtube: {
    id: "youtube",
    label: "YouTube",
    icon: Youtube,
    brand: "#FF0000",
    chartSlot: 5,
    authType: "oauth",
    provider: "Google",
    ingest: "Leads from channel lead forms and description CTAs via the YouTube Data API.",
    fields: [
      { id: "channelId", label: "Channel ID", type: "text", placeholder: "UC…", required: true },
      { id: "leadFormPattern", label: "Lead Form URL Pattern", type: "text", placeholder: "https://… (optional)" },
    ],
  },
  threads: {
    id: "threads",
    label: "Threads",
    icon: ThreadsGlyph,
    brand: "#000000",
    monochrome: true,
    chartSlot: 6,
    authType: "oauth",
    provider: "Meta",
    ingest: "Replies and DMs on your Threads account captured via the Threads API.",
    fields: [
      { id: "threadsAccountId", label: "Threads Account ID", type: "text", placeholder: "account id", required: true },
      { id: "accessToken", label: "Access Token", type: "password", placeholder: "TH…", required: true },
    ],
  },
  x: {
    id: "x",
    label: "X",
    icon: XGlyph,
    brand: "#000000",
    monochrome: true,
    chartSlot: 7,
    authType: "oauth",
    provider: "X",
    ingest: "Lead-gen cards and DMs from your X account via the X API v2.",
    fields: [
      { id: "handle", label: "Account Handle", type: "text", placeholder: "@yourbrand", required: true },
      { id: "apiKey", label: "API Key", type: "password", placeholder: "consumer key", required: true },
      { id: "apiSecret", label: "API Secret", type: "password", placeholder: "consumer secret", required: true },
      { id: "bearerToken", label: "Bearer Token", type: "password", placeholder: "AAAA…", required: true },
    ],
  },
};

/** Canonical platform order (matches the fixed chart slots). */
export const PLATFORM_ORDER: PlatformId[] = [
  "manual",
  "instagram",
  "facebook",
  "whatsapp",
  "website",
  "email",
  "youtube",
  "threads",
  "x",
];

export const platformMeta = (id: PlatformId): PlatformMeta => PLATFORMS[id];

/**
 * Platforms that can actually be CONNECTED.
 *
 * `PLATFORM_ORDER` deliberately includes "manual" so hand-entered leads flow
 * through every badge, filter, chart slot and analytics bucket for free. But a
 * manual source has no OAuth flow and no credentials, so the Platforms /
 * Integrations / Settings screens must iterate this list instead — otherwise
 * they render a nonsense "Connect Manual" card with an empty form.
 */
export const CONNECTABLE_PLATFORMS: PlatformId[] = PLATFORM_ORDER.filter(
  (p) => PLATFORMS[p].connectable !== false,
);
