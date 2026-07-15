import { Skeleton } from "@/components/crm/states";

/** Route-level skeleton shown while a dashboard page compiles/navigates. */
export default function DashboardLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="h-80 lg:col-span-2" />
        <Skeleton className="h-80" />
      </div>
    </div>
  );
}
