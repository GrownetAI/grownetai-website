import { Loader } from "lucide-react";

/* Route-level fallback — dashed spinner while the next page streams in. */
export default function Loading() {
  return (
    <main className="grid min-h-[60vh] place-items-center bg-paper pt-[var(--navbar-height)]">
      <div className="flex flex-col items-center gap-3">
        <Loader className="h-8 w-8 animate-spin text-moss-600" />
        <p className="text-sm text-ink-muted">Loading…</p>
      </div>
    </main>
  );
}
