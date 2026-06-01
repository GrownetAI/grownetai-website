"use client";

/**
 * Admin panel shell — integrated into the main website (not a separate app)
 * under /admin. Access is gated to users whose role is "admin"; the backend
 * additionally enforces admin on every write endpoint, so the UI guard is a
 * convenience, not the security boundary.
 */
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Loader2,
  ShieldAlert,
  Briefcase,
  Tag,
  Users,
  Settings,
} from "lucide-react";
import {
  getMe,
  logout,
  isAdmin,
  tokenStore,
  type AuthUser,
} from "@/lib/api";

const TEAL = "#008080";

const NAV = [{ label: "Overview", href: "/admin", icon: LayoutDashboard }];

const COMING_SOON = [
  { label: "Services", icon: Briefcase },
  { label: "Pricing", icon: Tag },
  { label: "Leads", icon: Users },
  { label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "denied">("loading");

  useEffect(() => {
    if (!tokenStore.get()) {
      router.replace("/login?next=/admin");
      return;
    }
    getMe()
      .then((u) => {
        if (isAdmin(u)) {
          setUser(u);
          setState("ok");
        } else {
          setState("denied");
        }
      })
      .catch(() => setState("denied"));
  }, [router]);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: TEAL }} />
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-sm w-full text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <span className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </span>
          <h1 className="font-heading font-bold text-lg text-brand-charcoal mb-1.5">
            Admins only
          </h1>
          <p className="text-sm text-brand-slate-gray mb-6">
            This area is restricted to administrator accounts. Sign in with an
            admin account to manage the website.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                logout();
                router.replace("/login?next=/admin");
              }}
              className="btn btn-primary w-full justify-center font-semibold"
            >
              Sign in as admin
            </button>
            <Link href="/" className="btn btn-secondary w-full justify-center font-semibold">
              Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  const navLinks = (
    <>
      {NAV.map(({ label, href, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex-shrink-0"
            style={
              active
                ? { background: TEAL, color: "#fff" }
                : { color: "#5c6b6b" }
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-white border-r border-gray-100 px-4 py-6">
        <Link href="/admin" className="flex items-center gap-2 px-2 mb-8">
          <span className="font-display font-black text-xl" style={{ color: TEAL }}>
            Grownet<span style={{ color: "#00E5E5" }}>AI</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white px-1.5 py-0.5 rounded" style={{ background: TEAL }}>
            Admin
          </span>
        </Link>

        <nav className="flex flex-col gap-1">{navLinks}</nav>

        <div className="mt-6 px-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-light-gray mb-2">
            Coming soon
          </p>
          <div className="flex flex-col gap-1">
            {COMING_SOON.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-300 cursor-not-allowed"
              >
                <Icon className="w-4 h-4" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="px-2 mb-3">
            <p className="text-sm font-semibold text-brand-charcoal truncate">
              {user?.name}
            </p>
            <p className="text-xs text-brand-light-gray truncate">{user?.email}</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-brand-slate-gray hover:bg-gray-50"
          >
            <ExternalLink className="w-4 h-4" /> View site
          </Link>
          <button
            onClick={() => {
              logout();
              router.replace("/login");
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-display font-black text-lg" style={{ color: TEAL }}>
              Grownet<span style={{ color: "#00E5E5" }}>AI</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white px-1.5 py-0.5 rounded" style={{ background: TEAL }}>
              Admin
            </span>
          </Link>
          <button
            onClick={() => {
              logout();
              router.replace("/login");
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
        <nav className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">{navLinks}</nav>
      </header>

      {/* ── Content ── */}
      <div className="lg:pl-64">
        <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-5xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
