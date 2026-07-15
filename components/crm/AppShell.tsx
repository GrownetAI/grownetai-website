"use client";

/**
 * Shared themed app shell (sidebar + topbar + scoped light/dark theme).
 * Used by both the company CRM (`/dashboard`) and the owner Admin (`/admin`),
 * parameterized by nav + label, so there is no duplicated layout code.
 *
 * `.dark` toggles on <html> AND this element, so portalled UI (drawers,
 * dropdowns, toasts) inherits the theme. `<ThemeScript>` applies the saved
 * choice before paint to avoid a flash.
 */
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { NavItem } from "./nav";
import { getSession } from "@/lib/crm/api";
import { logout } from "@/lib/api";
import type { Company, TeamMember } from "@/lib/crm/types";

function Shell({
  nav,
  label,
  homeHref,
  searchPlaceholder,
  children,
}: {
  nav: NavItem[];
  label: string;
  homeHref: string;
  searchPlaceholder?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<TeamMember | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    let active = true;
    getSession().then((s) => {
      if (!active) return;
      setUser(s.user);
      setCompany(s.company);
    });
    return () => {
      active = false;
    };
  }, []);

  const signOut = async () => {
    // The session is an httpOnly cookie — only the server can expire it.
    await logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <div
      data-theme-root
      suppressHydrationWarning
      className="min-h-screen bg-page text-fg antialiased crm-scroll"
    >

      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[260px] border-r border-line z-40">
        <Sidebar user={user} company={company} nav={nav} label={label} homeHref={homeHref} onSignOut={signOut} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-overlay/65 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed inset-y-0 left-0 w-[260px] z-50 border-r border-line"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <Sidebar user={user} company={company} nav={nav} label={label} homeHref={homeHref}
                onNavigate={() => setMobileOpen(false)} onSignOut={signOut} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-[260px] flex flex-col min-h-screen">
        <Topbar user={user} nav={nav} searchPlaceholder={searchPlaceholder} scope={label === "Admin" ? "admin" : "crm"} onOpenMenu={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AppShell({
  nav,
  label,
  homeHref,
  searchPlaceholder,
  children,
}: {
  nav: NavItem[];
  label: string;
  homeHref: string;
  searchPlaceholder?: string;
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <Shell nav={nav} label={label} homeHref={homeHref} searchPlaceholder={searchPlaceholder}>
        {children}
      </Shell>
    </ThemeProvider>
  );
}
