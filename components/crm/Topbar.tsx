"use client";

import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { navTitle, CRM_NAV, type NavItem } from "./nav";
import ThemeToggle from "./ThemeToggle";
import Avatar from "./Avatar";
import NotificationsMenu from "./NotificationsMenu";
import type { TeamMember } from "@/lib/crm/types";

/** Sticky top bar: mobile menu button, page title, search, theme, alerts, user. */
export default function Topbar({
  user,
  nav = CRM_NAV,
  searchPlaceholder = "Search leads, campaigns…",
  scope = "crm",
  onOpenMenu,
}: {
  user?: TeamMember | null;
  nav?: NavItem[];
  searchPlaceholder?: string;
  scope?: "admin" | "crm";
  onOpenMenu: () => void;
}) {
  const pathname = usePathname();
  const title = navTitle(pathname, nav);

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 sm:px-6 border-b border-line bg-page/80 backdrop-blur supports-[backdrop-filter]:bg-page/70">
      <button
        onClick={onOpenMenu}
        className="lg:hidden w-9 h-9 grid place-items-center rounded-lg border border-line text-fg-muted hover:text-fg"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="text-lg font-semibold text-fg">{title}</h1>

      {/* Global search — hidden on the smallest screens */}
      <div className="relative ml-auto hidden md:block w-64">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle pointer-events-none" />
        <input
          className="field pl-9 py-2"
          placeholder={searchPlaceholder}
          aria-label="Search"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto md:ml-0">
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        <div className="sm:hidden">
          <ThemeToggle compact />
        </div>
        <NotificationsMenu scope={scope} />
        <Avatar name={user?.name ?? "Guest"} src={user?.avatar} size="md" />
      </div>
    </header>
  );
}
