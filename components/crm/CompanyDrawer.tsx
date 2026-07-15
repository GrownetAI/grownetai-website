"use client";

import { useEffect, useState } from "react";
import { Globe, Users, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";
import Drawer from "./Drawer";
import PlatformBadge from "./PlatformBadge";
import Avatar from "./Avatar";
import { StatusBadge } from "./badges";
import { Skeleton } from "./states";
import { getCompanyDetail, type CompanyRow } from "@/lib/crm/admin-api";
import { platformMeta } from "@/lib/crm/platforms";
import { fmtMoney, fmtNumber, fmtDate, timeAgo } from "@/lib/crm/format";
import type { Integration, Lead } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

const PLAN_STYLE: Record<string, string> = {
  starter: "text-fg-muted bg-fg-subtle/10",
  growth: "text-primary bg-primary/10",
  enterprise: "text-violet-700 bg-violet-500/10 dark:text-violet-300",
};

/** Read-only company detail for the owner admin view. */
export default function CompanyDrawer({ companyId, onClose }: { companyId: string | null; onClose: () => void }) {
  const [data, setData] = useState<{ company: CompanyRow; integrations: Integration[]; recentLeads: Lead[] } | null>(null);

  useEffect(() => {
    if (!companyId) return;
    setData(null);
    getCompanyDetail(companyId).then(setData);
  }, [companyId]);

  return (
    <Drawer open={!!companyId} onClose={onClose} title={data?.company.name ?? "Company"} subtitle={data?.company.domain} width="max-w-lg">
      {!data ? (
        <div className="space-y-4"><Skeleton className="h-20" /><Skeleton className="h-32" /><Skeleton className="h-40" /></div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl grid place-items-center bg-primary/10 text-primary font-bold text-lg">
              {data.company.name.slice(0, 1)}
            </span>
            <div>
              <p className="font-semibold text-fg">{data.company.name}</p>
              <a href={`https://${data.company.domain}`} target="_blank" rel="noreferrer" className="text-xs text-fg-muted inline-flex items-center gap-1 hover:text-primary">
                <Globe className="w-3 h-3" /> {data.company.domain}
              </a>
            </div>
            <span className={cn("ml-auto text-xs font-semibold px-2 py-0.5 rounded-full capitalize", PLAN_STYLE[data.company.plan])}>{data.company.plan}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Stat icon={Users} label="Leads" value={fmtNumber(data.company.leads)} />
            <Stat icon={CheckCircle2} label="Won" value={fmtNumber(data.company.won)} />
            <Stat icon={DollarSign} label="Revenue" value={fmtMoney(data.company.revenue, true)} />
          </div>
          <p className="text-xs text-fg-subtle">Joined {fmtDate(data.company.createdAt)}</p>

          <div>
            <p className="text-xs font-semibold text-fg-muted mb-3">Integrations</p>
            <ul className="space-y-2">
              {data.integrations.map((it) => (
                <li key={it.platform} className="flex items-center gap-3">
                  <PlatformBadge platform={it.platform} size="sm" withLabel />
                  <span className="ml-auto">
                    {it.status === "connected" ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Connected</span>
                    ) : it.status === "error" ? (
                      <span className="inline-flex items-center gap-1 text-xs text-rose-700 dark:text-rose-400"><AlertCircle className="w-3.5 h-3.5" /> Error</span>
                    ) : (
                      <span className="text-xs text-fg-subtle">Not connected</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-fg-muted mb-3">Recent leads</p>
            <ul className="divide-y divide-line">
              {data.recentLeads.map((l) => (
                <li key={l.id} className="flex items-center gap-3 py-2.5">
                  <Avatar name={l.name} size="sm" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-fg truncate">{l.name}</p>
                    <p className="text-xs text-fg-subtle truncate">{l.email}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <PlatformBadge platform={l.source} size="sm" />
                    <StatusBadge status={l.status} />
                    <span className="text-xs text-fg-subtle w-14 text-right hidden sm:block">{timeAgo(l.receivedAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Drawer>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-elevated/60 p-3 text-center">
      <Icon className="w-4 h-4 mx-auto text-fg-subtle mb-1" />
      <p className="text-sm font-bold text-fg tabular-nums">{value}</p>
      <p className="text-[11px] text-fg-subtle">{label}</p>
    </div>
  );
}
