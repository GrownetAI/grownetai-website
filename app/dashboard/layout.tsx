"use client";

/**
 * CRM dashboard shell (company user). The marketing Navbar/Footer already
 * self-hide on `/dashboard`, so the shared AppShell is the only chrome here.
 */
import AppShell from "@/components/crm/AppShell";
import AuthGuard from "@/components/crm/AuthGuard";
import { CRM_NAV } from "@/components/crm/nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireUser>
    <AppShell nav={CRM_NAV} label="CRM" homeHref="/dashboard" searchPlaceholder="Search leads, campaigns…">
      {children}
    </AppShell>
    </AuthGuard>
  );
}
