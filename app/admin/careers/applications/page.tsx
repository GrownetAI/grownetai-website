"use client";

import { Fragment, useMemo, useState } from "react";
import { Inbox, FileText, Download, ChevronDown } from "lucide-react";
import PageHeader from "@/components/crm/PageHeader";
import Panel from "@/components/crm/Panel";
import StatCard from "@/components/crm/StatCard";
import { SearchInput, Select } from "@/components/crm/controls";
import { EmptyState } from "@/components/crm/states";
import {
  useApplications,
  useJobs,
  setApplicationStatus,
} from "@/lib/careers/store";
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_LABEL,
  type ApplicationStatus,
} from "@/lib/careers/data";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<ApplicationStatus, string> = {
  new: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
  under_review: "bg-amber-500/12 text-amber-700 dark:text-amber-400",
  shortlisted: "bg-violet-500/12 text-violet-700 dark:text-violet-300",
  interview: "bg-primary/12 text-primary",
  selected: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
  rejected: "bg-rose-500/12 text-rose-700 dark:text-rose-400",
  hired: "bg-emerald-600/15 text-emerald-800 dark:text-emerald-300",
};

export default function AdminApplicationsPage() {
  const apps = useApplications();
  const jobs = useJobs();
  const [q, setQ] = useState("");
  const [job, setJob] = useState("all");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return apps.filter(
      (a) =>
        (job === "all" || a.jobId === job) &&
        (status === "all" || a.status === status) &&
        (!query ||
          a.name.toLowerCase().includes(query) ||
          a.email.toLowerCase().includes(query)),
    );
  }, [apps, q, job, status]);

  const counts = useMemo(() => {
    const c = { total: apps.length, new: 0, interview: 0, hired: 0 };
    apps.forEach((a) => {
      if (a.status === "new") c.new++;
      if (a.status === "interview") c.interview++;
      if (a.status === "hired") c.hired++;
    });
    return c;
  }, [apps]);

  return (
    <div>
      <PageHeader title="Applications" description="Review and progress candidates across every role." />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total" value={String(counts.total)} icon={Inbox} />
        <StatCard label="New" value={String(counts.new)} icon={Inbox} />
        <StatCard label="Interviewing" value={String(counts.interview)} icon={Inbox} />
        <StatCard label="Hired" value={String(counts.hired)} icon={Inbox} />
      </div>

      <Panel className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput value={q} onChange={setQ} placeholder="Search name or email…" className="min-w-[220px] flex-1" />
          <Select
            label="Role"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            options={[{ value: "all", label: "All roles" }, ...jobs.map((j) => ({ value: j.id, label: j.title }))]}
          />
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[{ value: "all", label: "All statuses" }, ...APPLICATION_STATUSES.map((s) => ({ value: s, label: APPLICATION_STATUS_LABEL[s] }))]}
          />
        </div>
      </Panel>

      <Panel padded={false}>
        {filtered.length === 0 ? (
          <EmptyState icon={Inbox} title="No applications" description="Nothing matches these filters yet." />
        ) : (
          <div className="overflow-x-auto crm-scroll">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-fg-subtle">
                  <th className="py-3 pl-5">Candidate</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">Experience</th>
                  <th className="py-3">Applied</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 pr-5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((a) => (
                  <Fragment key={a.id}>
                    <tr className="hover:bg-elevated/50">
                      <td className="py-3 pl-5">
                        <p className="font-semibold text-fg">{a.name}</p>
                        <p className="text-xs text-fg-subtle">{a.email} · {a.phone}</p>
                      </td>
                      <td className="py-3 text-fg-muted">{a.jobTitle}</td>
                      <td className="py-3 text-fg-muted">{a.experience}</td>
                      <td className="py-3 text-fg-subtle whitespace-nowrap">
                        {new Date(a.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </td>
                      <td className="py-3">
                        <select
                          value={a.status}
                          onChange={(e) => setApplicationStatus(a.id, e.target.value as ApplicationStatus)}
                          className={cn("rounded-full px-2.5 py-1 text-xs font-semibold outline-none", STATUS_STYLE[a.status])}
                        >
                          {APPLICATION_STATUSES.map((s) => (
                            <option key={s} value={s}>{APPLICATION_STATUS_LABEL[s]}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 pr-5 text-right">
                        <button
                          onClick={() => setOpen(open === a.id ? null : a.id)}
                          aria-expanded={open === a.id}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          Details <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open === a.id && "rotate-180")} />
                        </button>
                      </td>
                    </tr>
                    {open === a.id && (
                      <tr className="bg-elevated/40">
                        <td colSpan={6} className="px-5 py-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-fg-subtle">Résumé</p>
                              {a.resumeName ? (
                                <button className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2 text-sm text-fg-muted hover:text-fg" title="Download requires backend storage">
                                  <FileText className="h-4 w-4 text-primary" /> {a.resumeName}
                                  <Download className="h-3.5 w-3.5" />
                                </button>
                              ) : (
                                <p className="text-sm text-fg-subtle">No résumé uploaded</p>
                              )}
                              {a.portfolio && (
                                <p className="mt-2 text-sm text-fg-muted">Portfolio: <span className="text-primary">{a.portfolio}</span></p>
                              )}
                            </div>
                            <div>
                              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-fg-subtle">Cover note</p>
                              <p className="text-sm leading-relaxed text-fg-muted">{a.coverLetter || "—"}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
