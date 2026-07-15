"use client";

/**
 * Owner Admin shell (cross-company god-view). Rebuilt on the shared themed
 * AppShell so it matches the CRM design system (light/dark, sidebar/topbar).
 * The marketing Navbar/Footer already self-hide on `/admin`.
 */
import AppShell from "@/components/crm/AppShell";
import AuthGuard from "@/components/crm/AuthGuard";
import { ADMIN_NAV } from "@/components/crm/nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAdmin>
    <AppShell nav={ADMIN_NAV} label="Admin" homeHref="/admin" searchPlaceholder="Search companies, leads…">
      {children}
    </AppShell>
    </AuthGuard>
  );
}
