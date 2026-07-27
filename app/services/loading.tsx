import { Skeleton } from "@/components/ui/Skeleton";

/* Services fallback — hero lines, then the big service-card row. */
export default function Loading() {
  return (
    <main className="min-h-screen bg-paper pb-24 pt-[calc(var(--navbar-height)+3rem)]">
      <div className="container-site">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full max-w-lg" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-[420px] overflow-hidden rounded-3xl" />
          <Skeleton className="hidden h-[420px] overflow-hidden rounded-3xl md:block" />
          <Skeleton className="hidden h-[420px] overflow-hidden rounded-3xl xl:block" />
        </div>
      </div>
    </main>
  );
}
