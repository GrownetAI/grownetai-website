"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { CRM_NAV, isNavActive, type NavItem } from "./nav";
import Avatar from "./Avatar";
import type { TeamMember, Company } from "@/lib/crm/types";

/**
 * Sidebar contents — used both in the fixed desktop rail and the mobile drawer.
 * `nav`/`label` let the same component serve the CRM and the owner Admin.
 * `onNavigate` lets the mobile drawer close on selection.
 */
export default function Sidebar({
  user,
  company,
  nav = CRM_NAV,
  label = "CRM",
  homeHref = "/dashboard",
  onNavigate,
  onSignOut,
}: {
  user?: TeamMember | null;
  company?: Company | null;
  nav?: NavItem[];
  label?: string;
  homeHref?: string;
  onNavigate?: () => void;
  onSignOut?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-panel">
      {/* Brand */}
      <Link
        href={homeHref}
        onClick={onNavigate}
        className="flex items-center gap-2 px-5 h-16 border-b border-line flex-shrink-0"
      >
        {/* Two variants, swapped by CSS — no JS, so no flash on load.
            The wordmark is "Grow" in a teal->lime gradient plus "netAI" and the
            leaf in SOLID BLACK. On the dark panel that black half sits at ~1.5:1
            and simply disappears. The old fix here was `brightness-110`, which is
            a mathematical no-op: brightness() multiplies each channel, and
            rgb(0,0,0) x 1.1 is still rgb(0,0,0).
            logo-dark.png lifts only the near-black pixels to #ECEDEE and leaves
            the gradient untouched — unlike `brightness-0 invert` (the footer's
            hack), which flattens the whole mark to white and kills the brand. */}
        <Image
          src="/images/logo.png"
          alt="GrownetAI"
          width={132}
          height={34}
          priority
          className="h-8 w-auto dark:hidden"
        />
        <Image
          src="/images/logo-dark.png"
          alt="GrownetAI"
          width={132}
          height={34}
          priority
          className="hidden h-8 w-auto dark:block"
        />
        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-fg-muted bg-elevated px-1.5 py-0.5 rounded">
          {label}
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto crm-scroll px-3 py-4">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-fg-subtle">
          {label === "Admin" ? "Platform" : "Workspace"}
        </p>
        <ul className="flex flex-col gap-0.5">
          {nav.map(({ label: itemLabel, href, icon: Icon }) => {
            const active = isNavActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/12 text-primary"
                      : "text-fg-muted hover:text-fg hover:bg-elevated",
                  )}
                >
                  <Icon className={cn("w-[18px] h-[18px]", active ? "text-primary" : "text-fg-subtle group-hover:text-fg")} />
                  {itemLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer: user + actions */}
      <div className="border-t border-line p-3 flex-shrink-0">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar name={user?.name ?? "Guest"} src={user?.avatar} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-fg truncate">{user?.name ?? "Guest"}</p>
            <p className="text-xs text-fg-subtle truncate capitalize">
              {user?.role ?? "member"}
              {company ? ` · ${company.name}` : ""}
            </p>
          </div>
        </div>
        <div className="mt-1 flex flex-col gap-0.5">
          <Link
            href="/"
            onClick={onNavigate}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-fg-muted hover:text-fg hover:bg-elevated transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> View website
          </Link>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-rose-700 dark:text-rose-400 hover:bg-rose-500/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
