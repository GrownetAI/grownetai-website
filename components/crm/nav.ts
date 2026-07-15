import {
  PenLine,
  FolderKanban,
  LayoutDashboard,
  Users,
  BarChart3,
  Megaphone,
  Share2,
  UsersRound,
  Settings,
  Building2,
  Briefcase,
  Inbox,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Section base paths that must match exactly (index routes). */
const SECTION_ROOTS = new Set(["/dashboard", "/admin"]);

/** Primary CRM navigation (company user). Order = sidebar order. */
export const CRM_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "My Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { label: "Platforms", href: "/dashboard/platforms", icon: Share2 },
  { label: "Team", href: "/dashboard/team", icon: UsersRound },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

/** Owner Admin navigation (cross-company god-view). Platform/app integrations
 *  are a client concern (they live in the user dashboard), so the admin panel
 *  deliberately has no Integrations section. */
export const ADMIN_NAV: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Companies", href: "/admin/companies", icon: Building2 },
  { label: "All Leads", href: "/admin/leads", icon: Users },
  { label: "Manual Leads", href: "/admin/manual-leads", icon: PenLine },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Applications", href: "/admin/careers/applications", icon: Inbox },
];

/** Normalize trailing slashes then match exact (section roots) or nested. */
export function isNavActive(pathname: string, href: string): boolean {
  const p = pathname.replace(/\/$/, "") || "/";
  const h = href.replace(/\/$/, "") || "/";
  if (SECTION_ROOTS.has(h)) return p === h;
  return p === h || p.startsWith(h + "/");
}

/** Active item's label for the given nav list (defaults to CRM). */
export function navTitle(pathname: string, nav: NavItem[] = CRM_NAV): string {
  return nav.find((n) => isNavActive(pathname, n.href))?.label ?? nav[0]?.label ?? "";
}
