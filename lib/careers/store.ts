"use client";

/**
 * Client-side careers store — localStorage-backed, with a tiny pub/sub so the
 * admin module and the public pages stay in sync within a session. Seeded from
 * lib/careers/data.ts on first use.
 *
 * Every read returns SEED_* on the server and on the first client render (so
 * there's no hydration mismatch), then hooks load the persisted data after
 * mount. Replace the read/write helpers with API calls to go server-backed;
 * nothing else changes.
 */

import { useEffect, useState } from "react";
import {
  SEED_JOBS,
  SEED_APPLICATIONS,
  SEED_CONTENT,
  type Job,
  type Application,
  type ApplicationStatus,
  type CareerContent,
} from "./data";

const K_JOBS = "gn_careers_jobs_v1";
const K_APPS = "gn_careers_apps_v1";
const K_CONTENT = "gn_careers_content_v1";

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = () => cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function read<T>(key: string, seed: T): T {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as T;
  } catch {
    return seed;
  }
}
function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode — ignore */
  }
  notify();
}

const uid = (p: string) =>
  `${p}-${(typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 8)
    : Date.now().toString(36))}`;

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ── Raw reads ─────────────────────────────────────────────────────── */
export const readJobs = () => read<Job[]>(K_JOBS, SEED_JOBS);
export const readApplications = () => read<Application[]>(K_APPS, SEED_APPLICATIONS);
export const readContent = () => read<CareerContent>(K_CONTENT, SEED_CONTENT);

/* ── Job mutations ─────────────────────────────────────────────────── */
export function saveJob(job: Job) {
  const jobs = readJobs();
  const i = jobs.findIndex((j) => j.id === job.id);
  if (i >= 0) jobs[i] = job;
  else jobs.push(job);
  write(K_JOBS, jobs);
}

export function createJob(partial: Partial<Job>): Job {
  const jobs = readJobs();
  const title = partial.title || "Untitled role";
  const job: Job = {
    id: uid("job"),
    slug: partial.slug || slugify(title) || uid("role"),
    title,
    department: partial.department || "General",
    location: partial.location || "Remote",
    type: partial.type || "Full-time",
    experienceLevel: partial.experienceLevel || "1–3 years",
    salary: partial.salary,
    summary: partial.summary || "",
    responsibilities: partial.responsibilities || [],
    requirements: partial.requirements || [],
    preferredSkills: partial.preferredSkills || [],
    benefits: partial.benefits || [],
    deadline: partial.deadline,
    status: partial.status || "draft",
    order: jobs.length + 1,
    postedAt: new Date().toISOString().slice(0, 10),
  };
  write(K_JOBS, [...jobs, job]);
  return job;
}

export function updateJob(id: string, patch: Partial<Job>) {
  write(
    K_JOBS,
    readJobs().map((j) => (j.id === id ? { ...j, ...patch } : j)),
  );
}

export function deleteJob(id: string) {
  write(K_JOBS, readJobs().filter((j) => j.id !== id));
}

export function archiveJob(id: string, archived = true) {
  updateJob(id, { archived, status: archived ? "closed" : "draft" });
}

export function duplicateJob(id: string): Job | undefined {
  const src = readJobs().find((j) => j.id === id);
  if (!src) return;
  const copy: Job = {
    ...src,
    id: uid("job"),
    slug: `${src.slug}-copy`,
    title: `${src.title} (copy)`,
    status: "draft",
    order: readJobs().length + 1,
    postedAt: new Date().toISOString().slice(0, 10),
  };
  write(K_JOBS, [...readJobs(), copy]);
  return copy;
}

export function reorderJobs(orderedIds: string[]) {
  const map = new Map(orderedIds.map((id, i) => [id, i + 1]));
  write(
    K_JOBS,
    readJobs().map((j) => ({ ...j, order: map.get(j.id) ?? j.order })),
  );
}

/* ── Application mutations ──────────────────────────────────────────── */
export function submitApplication(
  partial: Omit<Application, "id" | "status" | "appliedAt">,
): Application {
  const app: Application = {
    ...partial,
    id: uid("app"),
    status: "new",
    appliedAt: new Date().toISOString(),
  };
  write(K_APPS, [app, ...readApplications()]);
  return app;
}

export function setApplicationStatus(id: string, status: ApplicationStatus) {
  write(
    K_APPS,
    readApplications().map((a) => (a.id === id ? { ...a, status } : a)),
  );
}

export function updateApplication(id: string, patch: Partial<Application>) {
  write(
    K_APPS,
    readApplications().map((a) => (a.id === id ? { ...a, ...patch } : a)),
  );
}

/* ── Content ───────────────────────────────────────────────────────── */
export function saveContent(content: CareerContent) {
  write(K_CONTENT, content);
}

/* ── Hooks (hydration-safe: seed on server + first render) ─────────── */
function useStoreValue<T>(reader: () => T, seed: T): T {
  const [value, setValue] = useState<T>(seed);
  useEffect(() => {
    setValue(reader());
    return subscribe(() => setValue(reader()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

export function useJobs(): Job[] {
  return useStoreValue(readJobs, SEED_JOBS);
}

/** Public listing: open, non-archived, ordered. */
export function usePublishedJobs(): Job[] {
  const jobs = useJobs();
  return jobs
    .filter((j) => j.status === "open" && !j.archived)
    .sort((a, b) => a.order - b.order);
}

export function useApplications(): Application[] {
  return useStoreValue(readApplications, SEED_APPLICATIONS);
}

export function useCareerContent(): CareerContent {
  return useStoreValue(readContent, SEED_CONTENT);
}
