import { Loader } from "lucide-react";
import { SkeletonCard } from "@/components/ui/Skeleton";

/* Blog fallback — dashed spinner up top, then a grid of post skeletons. */
export default function Loading() {
  return (
    <main className="min-h-screen bg-paper pb-24 pt-[calc(var(--navbar-height)+2rem)]">
      <div className="container-site">
        <div className="flex justify-center py-10">
          <Loader className="h-8 w-8 animate-spin text-moss-600" />
        </div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
