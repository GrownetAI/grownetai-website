import { cn } from "@/lib/utils";
import { platformMeta } from "@/lib/crm/platforms";
import type { PlatformId } from "@/lib/crm/types";

/**
 * Platform identity chip — brand-colored icon tile + optional label.
 * Monochrome marks (X, Threads) invert with the theme so they stay legible.
 */
export default function PlatformBadge({
  platform,
  size = "md",
  withLabel = false,
  className,
}: {
  platform: PlatformId;
  size?: "sm" | "md" | "lg";
  withLabel?: boolean;
  className?: string;
}) {
  const meta = platformMeta(platform);
  const Icon = meta.icon;

  const box = size === "sm" ? "w-7 h-7" : size === "lg" ? "w-11 h-11" : "w-9 h-9";
  const glyph = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-[18px] h-[18px]";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "rounded-xl grid place-items-center flex-shrink-0",
          box,
          meta.monochrome && "text-fg bg-fg-subtle/10 ring-1 ring-line",
        )}
        style={
          meta.monochrome
            ? undefined
            : { color: meta.brand, background: `${meta.brand}1A` }
        }
      >
        <Icon className={glyph} />
      </span>
      {withLabel && (
        <span className="text-sm font-medium text-fg">{meta.label}</span>
      )}
    </span>
  );
}
