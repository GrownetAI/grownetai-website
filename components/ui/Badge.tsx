import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "teal" | "green" | "dark";

const variantClasses: Record<Variant, string> = {
  teal: "badge-teal",
  green: "badge-green",
  dark: "bg-brand-charcoal text-white",
};

export default function Badge({
  variant = "teal",
  children,
  className,
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("badge", variantClasses[variant], className)}>
      {children}
    </span>
  );
}
