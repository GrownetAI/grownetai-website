import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * The CRM surface primitive — a theme-aware card. Optional header with title,
 * subtitle and a right-aligned action slot.
 */
export default function Panel({
  title,
  subtitle,
  action,
  children,
  className,
  bodyClassName,
  padded = true,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  padded?: boolean;
}) {
  return (
    <section className={cn("panel overflow-hidden", className)}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-4 px-5 pt-5">
          <div className="min-w-0">
            {title && (
              <h3 className="text-[0.95rem] font-semibold text-fg leading-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-fg-muted">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </header>
      )}
      <div className={cn(padded && "p-5", title && padded && "pt-4", bodyClassName)}>
        {children}
      </div>
    </section>
  );
}
