import { createElement } from "react";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Typography — the single source of truth for text styling.
 *
 * Every piece of UI text should use a predefined role here (or the matching
 * `.ty-*` utility class in globals.css). This keeps the type scale strict,
 * the hierarchy consistent, and accessibility (contrast + sizing) centralized.
 *
 * Roles map to the strict scale (12 → 36px) defined in tailwind.config.ts.
 * Headings scale up at the `sm` breakpoint for mobile-first responsiveness.
 *
 * @example Dashboard
 *   <Typography variant="h3">Performance overview</Typography>
 *   <Typography variant="caption">Updated 2 min ago</Typography>
 *
 * @example Forms
 *   <Typography variant="label" as="label" htmlFor="email">Email</Typography>
 *   <Typography variant="caption" className="text-red-600">Required</Typography>
 *
 * @example Tables
 *   <Typography variant="overline" as="th">Status</Typography>
 *   <Typography variant="body-sm" as="td">Active</Typography>
 */
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body-lg"
  | "body"
  | "body-sm"
  | "caption"
  | "label"
  | "button"
  | "overline"
  | "code";

/** Role → utility classes. Mirrored by the `.ty-*` classes in globals.css. */
export const typographyVariants: Record<TypographyVariant, string> = {
  h1: "font-display font-bold text-3xl sm:text-4xl tracking-tight leading-tight text-content",
  h2: "font-display font-semibold text-2xl sm:text-3xl tracking-tight leading-tight text-content",
  h3: "font-heading font-semibold text-xl sm:text-2xl tracking-tight leading-snug text-content",
  h4: "font-heading font-medium text-lg sm:text-xl leading-snug text-content",
  "body-lg": "font-normal text-lg leading-relaxed text-content",
  body: "font-normal text-base leading-relaxed text-content",
  "body-sm": "font-normal text-sm leading-normal text-content",
  caption: "font-normal text-xs leading-normal text-muted",
  label: "font-medium text-sm leading-normal text-content",
  button: "font-semibold text-sm leading-none",
  overline:
    "font-semibold text-xs uppercase tracking-widest leading-normal text-muted",
  code: "font-mono text-sm leading-normal text-content",
};

/** Sensible default HTML element for each role (override with `as`). */
const defaultElement: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  caption: "span",
  label: "span",
  button: "span",
  overline: "span",
  code: "code",
};

export interface TypographyProps {
  variant?: TypographyVariant;
  /** Render as a different element/component while keeping the role's styles. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

export function Typography({
  variant = "body",
  as,
  className,
  children,
  ...rest
}: TypographyProps) {
  const Tag = as ?? defaultElement[variant];
  return createElement(
    Tag,
    { className: cn(typographyVariants[variant], className), ...rest },
    children,
  );
}

export default Typography;
