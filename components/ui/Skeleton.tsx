import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   SKELETON — shimmer placeholders for content that is still loading.

   Server-safe (no client hooks) so route loading.tsx files can use it.
════════════════════════════════════════════════════════════════ */

export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("animate-pulse rounded-xl bg-sand", className)} />
  );
}

/** Portfolio-style card: image block + three text lines. */
export function SkeletonCard() {
  return (
    <div>
      <Skeleton className="aspect-[4/3] rounded-2xl" />
      <div className="mt-4 space-y-2.5">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
