import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function Card({
  hover = false,
  brand = false,
  children,
  className,
  padding = "p-6",
}: {
  hover?: boolean;
  brand?: boolean;
  children: ReactNode;
  className?: string;
  padding?: string;
}) {
  return (
    <div
      className={cn(
        "card",
        hover && "card-hover",
        brand && "card-brand",
        padding,
        className,
      )}
    >
      {children}
    </div>
  );
}
