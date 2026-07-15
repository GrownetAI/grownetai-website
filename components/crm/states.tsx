import { AlertTriangle, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Shimmer skeleton block for loading states. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-fg-subtle/15 dark:bg-fg-subtle/10",
        className,
      )}
    />
  );
}

/** Full-panel empty state: icon, title, description, optional action. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-14 px-6",
        className,
      )}
    >
      <span className="w-12 h-12 rounded-2xl grid place-items-center bg-primary/10 text-primary mb-4">
        <Icon className="w-6 h-6" />
      </span>
      <p className="text-sm font-semibold text-fg">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-fg-muted max-w-xs">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/**
 * Error state. The CRM previously had none — every data call was a bare
 * `.then(setState)` with no `.catch()`, so a failed request left the UI stuck
 * on its skeleton forever with no way to retry.
 */
export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-6 py-14 text-center",
        className,
      )}
    >
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/10">
        <AlertTriangle className="h-5 w-5 text-rose-700 dark:text-rose-400" />
      </div>
      <p className="font-semibold text-fg">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-fg-muted">{description}</p>
      )}
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary btn-sm mt-5">
          <RotateCw className="h-4 w-4" /> Try again
        </button>
      )}
    </div>
  );
}
