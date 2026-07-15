"use client";

import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

/** Search input with a leading icon, wired to the theme tokens. */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle pointer-events-none" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field pl-9"
        type="search"
      />
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  label?: string;
}

/** Themed native select (accessible, keyboard-friendly) with a chevron. */
export function Select({ options, label, className, ...rest }: SelectProps) {
  return (
    <label className={cn("relative inline-flex items-center", className)}>
      {label && <span className="sr-only">{label}</span>}
      <select
        {...rest}
        className="field appearance-none pr-9 cursor-pointer"
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 absolute right-3 text-fg-subtle pointer-events-none" />
    </label>
  );
}

/**
 * Labelled form row. Both `LeadDrawer` and `app/dashboard/leads/page.tsx`
 * defined their own private copy of this; it belongs here.
 */
export function Field({
  label,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-fg-muted">
        {label}
        {required && <span className="text-rose-600 dark:text-rose-400">*</span>}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs font-medium text-rose-700 dark:text-rose-400">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-fg-subtle">{hint}</span>
      ) : null}
    </label>
  );
}

export function TextArea({
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("field resize-y min-h-[96px]", className)} {...rest} />;
}
