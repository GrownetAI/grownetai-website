"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Building2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TABS, BUSINESS_TYPES, type TabId } from "./data";
import BriefModal from "./BriefModal";

/* ════════════════════════════════════════════════════════════════
   COMMAND BAR

   The reference's search row, repurposed: business-type selector where
   its Filter sat, a requirement field where its search input sat, the
   content tabs inline on the right, and Submit where its sort control was.

   Desktop and mobile diverge the way the two references do — the tabs are
   inline pills on `lg+` and collapse behind a single chevron below that,
   and the Submit button drops its label to become a circular send button.
════════════════════════════════════════════════════════════════ */

export default function CommandBar({
  tab,
  onTabChange,
  businessType,
  onBusinessTypeChange,
  requirement,
  onRequirementChange,
}: {
  tab: TabId;
  onTabChange: (t: TabId) => void;
  businessType: string;
  onBusinessTypeChange: (v: string) => void;
  requirement: string;
  onRequirementChange: (v: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  /* The bar collects nothing itself — every path (field, Enter, Submit)
     opens the brief dialog, which owns the real form and POSTs it. */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    openModal();
  }

  const activeTab = TABS.find((t) => t.id === tab)!;

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 sm:gap-3"
      noValidate
    >
      {/* ── Business type — the reference's "Filter" ── */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label={`Business type: ${businessType}`}
            className="flex h-[52px] min-w-[44px] flex-shrink-0 items-center justify-center gap-2 rounded-full
                       border border-hairline bg-paper-raised px-3 text-sm font-medium text-ink-body shadow-card
                       transition-colors hover:border-hairline-strong hover:text-ink sm:px-4"
          >
            <Building2 className="h-4 w-4 flex-shrink-0 text-ink-muted" />
            {/* Label drops below `md`, matching the mobile reference's icon-only filter */}
            <span className="hidden max-w-[112px] truncate md:inline">
              {businessType}
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 flex-shrink-0 text-ink-muted md:inline" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="start"
            sideOffset={8}
            className="z-50 w-60 origin-[var(--radix-dropdown-menu-content-transform-origin)]
                       rounded-2xl border border-hairline bg-paper-raised p-1.5 shadow-float
                       data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out"
          >
            {BUSINESS_TYPES.map((b) => (
              <DropdownMenu.Item
                key={b}
                onSelect={() => onBusinessTypeChange(b)}
                className={cn(
                  "flex cursor-pointer select-none items-center justify-between rounded-xl px-3 py-2.5 text-sm outline-none transition-colors",
                  b === businessType
                    ? "bg-sand font-semibold text-ink"
                    : "text-ink-body data-[highlighted]:bg-sand/60 data-[highlighted]:text-ink",
                )}
              >
                {b}
                {b === businessType && <Check className="h-4 w-4 text-moss-600" />}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* ── The field ── */}
      <div
        className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-full border border-hairline
                   bg-paper-raised pl-4 pr-1.5 shadow-card transition-[border-color,box-shadow]
                   focus-within:border-moss-500 focus-within:shadow-card-hover"
      >
        <Sparkles className="h-4 w-4 flex-shrink-0 text-moss-600" />
        {/* Read-only launcher — no inline typing, so no mobile keyboard.
            Enter submits the form; Space is handled here since readOnly eats it. */}
        <input
          type="text"
          value={requirement}
          readOnly
          role="button"
          aria-haspopup="dialog"
          aria-expanded={modalOpen}
          onClick={openModal}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
              openModal();
            }
          }}
          placeholder="Tell us about your business or project…"
          aria-label="Your business or project requirements"
          className="min-w-0 flex-1 cursor-pointer bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
        />

        <span aria-hidden className="hidden h-6 w-px flex-shrink-0 bg-hairline lg:block" />

        {/* Tabs, inline — lg and up */}
        <div className="hidden flex-shrink-0 items-center gap-0.5 lg:flex">
          {TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onTabChange(t.id)}
                aria-pressed={on}
                className={cn(
                  "whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors duration-150 xl:px-3",
                  on
                    ? "bg-paper-raised font-semibold text-ink shadow-card"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* …and collapsed behind a chevron below that, as the mobile reference does */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label={`Showing ${activeTab.label}. Change what's shown`}
              className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full
                         text-ink-muted transition-colors hover:text-ink lg:hidden"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="z-50 w-48 origin-[var(--radix-dropdown-menu-content-transform-origin)]
                         rounded-2xl border border-hairline bg-paper-raised p-1.5 shadow-float
                         data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out"
            >
              {TABS.map((t) => (
                <DropdownMenu.Item
                  key={t.id}
                  onSelect={() => onTabChange(t.id)}
                  className={cn(
                    "flex cursor-pointer select-none items-center justify-between rounded-xl px-3 py-2.5 text-sm outline-none transition-colors",
                    t.id === tab
                      ? "bg-sand font-semibold text-ink"
                      : "text-ink-body data-[highlighted]:bg-sand/60 data-[highlighted]:text-ink",
                  )}
                >
                  {t.label}
                  {t.id === tab && <Check className="h-4 w-4 text-moss-600" />}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        aria-haspopup="dialog"
        className="flex h-[52px] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-ink
                   px-4 text-sm font-semibold text-paper transition-[background-color,transform]
                   duration-200 hover:bg-ink-body active:scale-[0.98] sm:px-5"
      >
        {/* Label on desktop; a send arrow alone where the bar is tight */}
        <span className="hidden sm:inline">Submit</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>

    <BriefModal
      open={modalOpen}
      onOpenChange={setModalOpen}
      initialMessage={requirement}
      businessType={businessType}
      onSubmitted={() => onRequirementChange("")}
    />
    </>
  );
}
