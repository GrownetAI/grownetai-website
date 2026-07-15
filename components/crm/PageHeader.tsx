import type { ReactNode } from "react";

/** Consistent page title block with an optional right-aligned action slot. */
export default function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-fg tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-fg-muted">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
