"use client";

import { useMemo, useState } from "react";
import { ShieldCheck, Zap, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import Drawer from "./Drawer";
import PlatformBadge from "./PlatformBadge";
import { Select } from "./controls";
import { platformMeta, type IntegrationField } from "@/lib/crm/platforms";
import { saveIntegration } from "@/lib/crm/api";
import type { PlatformId } from "@/lib/crm/types";

/**
 * The onboarding "connect a lead source" flow. Collects exactly the credentials
 * a platform needs to fetch leads (per the platform registry) so the record is
 * ready for the ingestion pipeline (webhook/poller → SQS → worker → Mongo).
 */
export default function ConnectDrawer({
  platform,
  open,
  onClose,
  onConnected,
}: {
  platform: PlatformId | null;
  open: boolean;
  onClose: () => void;
  onConnected: () => void;
}) {
  const meta = platform ? platformMeta(platform) : null;
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // Deterministic "generated" values for webhook/api-key fields.
  const generated = useMemo(() => {
    if (!platform) return {} as Record<string, string>;
    return {
      apiKey: `gnt_live_${platform}_${"x".repeat(6)}${platform.length}9f2`,
      webhookUrl: `https://api.grownetai.com/ingest/${platform}`,
      webhookVerify: `vgn_${platform}_${platform.length}7a3`,
    };
  }, [platform]);

  if (!meta) return <Drawer open={open} onClose={onClose}>{null}</Drawer>;

  const fieldValue = (f: IntegrationField) =>
    f.type === "generated"
      ? generated[f.id] ?? "—"
      : values[f.id] ?? (f.type === "select" ? f.options?.[0] ?? "" : "");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!platform) return;
    const missing = meta!.fields.filter((f) => f.required && f.type !== "generated" && !values[f.id]?.trim());
    if (missing.length) {
      toast.error(`Fill required: ${missing.map((m) => m.label).join(", ")}`);
      return;
    }
    setSaving(true);
    const config: Record<string, string> = { ...values };
    meta!.fields.filter((f) => f.type === "generated").forEach((f) => (config[f.id] = generated[f.id] ?? ""));
    await saveIntegration(platform, config);
    setSaving(false);
    toast.success(`${meta!.label} connected`);
    setValues({});
    onConnected();
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`Connect ${meta.label}`}
      subtitle="Authorize lead access"
      footer={
        <button form="connect-form" type="submit" disabled={saving} className="btn btn-primary w-full justify-center disabled:opacity-60">
          <Zap className="w-4 h-4" /> {saving ? "Connecting…" : `Connect ${meta.label}`}
        </button>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <PlatformBadge platform={meta.id} size="lg" />
          <div>
            <p className="font-semibold text-fg">{meta.label}</p>
            <p className="text-xs text-fg-muted">
              {meta.authType === "oauth" ? `OAuth · ${meta.provider}` : meta.authType === "webhook" ? "Webhook / API key" : "API key"}
            </p>
          </div>
        </div>

        <p className="text-sm text-fg-muted flex gap-2">
          <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          {meta.ingest}
        </p>

        <form id="connect-form" onSubmit={submit} className="space-y-4">
          {meta.fields.map((f) => (
            <div key={f.id}>
              <label className="text-xs font-semibold text-fg-muted mb-1.5 block">
                {f.label} {f.required && <span className="text-rose-500">*</span>}
              </label>

              {f.type === "generated" ? (
                <GeneratedField value={fieldValue(f)} />
              ) : f.type === "select" ? (
                <Select
                  className="w-full [&_select]:w-full"
                  value={fieldValue(f)}
                  onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                  options={(f.options ?? []).map((o) => ({ value: o, label: o }))}
                />
              ) : (
                <input
                  className="field"
                  type={f.type === "password" ? "password" : "text"}
                  placeholder={f.placeholder}
                  value={values[f.id] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                />
              )}

              {f.help && <p className="text-xs text-fg-subtle mt-1">{f.help}</p>}
            </div>
          ))}
        </form>
      </div>
    </Drawer>
  );
}

function GeneratedField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <code className="field flex-1 font-mono text-xs truncate">{value}</code>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="w-10 h-[42px] grid place-items-center rounded-xl border border-line text-fg-muted hover:text-fg hover:bg-elevated flex-shrink-0"
        aria-label="Copy"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
