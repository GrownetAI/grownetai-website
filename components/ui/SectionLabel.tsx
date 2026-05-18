import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("section-label", className)}>{children}</span>;
}
