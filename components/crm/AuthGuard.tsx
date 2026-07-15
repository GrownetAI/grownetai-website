"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getMe, isAdmin, type AuthUser } from "@/lib/api";

/* ════════════════════════════════════════════════════════════════
   AUTH GUARD

   The session is an httpOnly cookie (`gn_session`), and `middleware.ts` already
   gates these routes at the edge by the JWT's `role` claim. This is the second,
   client-side layer: it confirms the session against the backend's /auth/me
   (which the middleware does NOT — it never verifies the signature) and enforces
   the SAME role separation on client-side navigation, where middleware doesn't
   re-run.

   Two mutually-exclusive homes, one account:
     • requireAdmin  — admin panel. A non-admin is refused (they have a home to
                       go to: their dashboard).
     • requireUser   — client dashboard. An admin is redirected to /admin, so the
                       dashboard stays client-only. This is the mirror of the
                       middleware rule and closes the "both open on one user" gap.

   Honest limitation: the pages are still client-rendered, so this is not the
   authorisation boundary — the API is. Every data call is verified by the
   backend, which rejects a forged/expired cookie regardless of what renders.
════════════════════════════════════════════════════════════════ */

export default function AuthGuard({
  children,
  requireAdmin = false,
  requireUser = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
  /** Client dashboard: signed-in but NOT an admin (admins go to /admin). */
  requireUser?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [state, setState] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    let alive = true;

    // The cookie is httpOnly and middleware has already gated this route at the
    // edge. This call confirms the session against the backend (the middleware
    // does NOT verify the signature) and loads the user record.
    getMe()
      .then((me) => {
        if (!alive) return;
        if (requireAdmin && !isAdmin(me)) {
          setState("denied");
          return;
        }
        // An admin has no place in the client dashboard — send them home.
        if (requireUser && isAdmin(me)) {
          router.replace("/admin");
          return;
        }
        setUser(me);
        setState("ok");
      })
      .catch(() => {
        if (!alive) return;
        // Forged or expired cookie that slipped past the edge check — the API
        // rejected it, which is the boundary that actually matters.
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      });

    return () => {
      alive = false;
    };
  }, [router, pathname, requireAdmin, requireUser]);

  if (state === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <Loader2 className="h-6 w-6 animate-spin text-fg-subtle" />
        <span className="sr-only">Checking your session…</span>
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-page px-6 text-center">
        <h1 className="text-xl font-semibold text-fg">Admin access required</h1>
        <p className="max-w-sm text-sm text-fg-muted">
          You&rsquo;re signed in as {user?.email ?? "a standard user"}, which
          doesn&rsquo;t have access to the admin panel.
        </p>
        <button
          onClick={() => router.replace("/dashboard")}
          className="btn btn-primary btn-sm mt-2"
        >
          Go to my dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
