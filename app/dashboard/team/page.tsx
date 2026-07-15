"use client";

import { useEffect, useMemo, useState } from "react";
import { UserPlus, Trophy } from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import Avatar from "@/components/crm/Avatar";
import { Skeleton } from "@/components/crm/states";
import { listTeam, listLeads } from "@/lib/crm/api";
import { fmtMoney } from "@/lib/crm/format";
import type { TeamMember, Lead } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

interface MemberStats {
  member: TeamMember;
  assigned: number;
  won: number;
  revenue: number;
  workload: number; // % of max
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[] | null>(null);
  const [leads, setLeads] = useState<Lead[] | null>(null);

  useEffect(() => {
    listTeam().then(setTeam);
    // pull a large page to compute per-member stats client-side (mock)
    listLeads({ pageSize: 500 }).then((p) => setLeads(p.items));
  }, []);

  const stats = useMemo<MemberStats[]>(() => {
    if (!team || !leads) return [];
    const raw = team.map((member) => {
      const mine = leads.filter((l) => l.assigneeId === member.id);
      const won = mine.filter((l) => l.status === "won");
      return {
        member,
        assigned: mine.filter((l) => l.status !== "won" && l.status !== "lost").length,
        won: won.length,
        revenue: won.reduce((s, l) => s + l.value, 0),
      };
    });
    const maxAssigned = Math.max(1, ...raw.map((r) => r.assigned));
    return raw
      .map((r) => ({ ...r, workload: (r.assigned / maxAssigned) * 100 }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [team, leads]);

  const loading = !team || !leads;

  return (
    <div>
      <PageHeader
        title="Team"
        description="Workload, assigned leads and performance across your team."
        actions={<button className="btn btn-primary btn-sm"><UserPlus className="w-4 h-4" /> Invite member</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-52" />)
          : stats.map(({ member, assigned, won, revenue, workload }, i) => (
              <Panel key={member.id}>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar name={member.name} src={member.avatar} size="lg" />
                  <div className="min-w-0">
                    <p className="font-semibold text-fg truncate flex items-center gap-1.5">
                      {member.name}
                      {i === 0 && <Trophy className="w-3.5 h-3.5 text-amber-500" />}
                    </p>
                    <p className="text-xs text-fg-subtle capitalize">{member.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <Stat label="Active" value={String(assigned)} />
                  <Stat label="Won" value={String(won)} />
                  <Stat label="Revenue" value={fmtMoney(revenue, true)} />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-fg-muted">Workload</span>
                    <span className="text-fg-subtle tabular-nums">{workload.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-elevated overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", workload > 80 ? "bg-rose-500" : workload > 50 ? "bg-amber-500" : "bg-primary")}
                      style={{ width: `${Math.max(workload, 4)}%` }}
                    />
                  </div>
                </div>
              </Panel>
            ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-elevated/60 p-2.5 text-center">
      <p className="text-sm font-bold text-fg tabular-nums">{value}</p>
      <p className="text-[11px] text-fg-subtle mt-0.5">{label}</p>
    </div>
  );
}
