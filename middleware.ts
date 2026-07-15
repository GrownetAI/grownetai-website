import { NextResponse, type NextRequest } from "next/server";

/**
 * Server-side route protection.
 *
 * This is only possible because the session is an httpOnly COOKIE. When the JWT
 * lived in localStorage, middleware could not see it — so the only option was a
 * client-side guard, which ships the whole protected page to the browser and
 * *then* redirects. Anyone could read the markup before the bounce.
 *
 * Now the redirect happens at the edge, before a single byte of /admin is sent.
 *
 * IMPORTANT — what this is and is not:
 *   This is a ROUTING gate, not the authorisation boundary. It reads the JWT's
 *   `role` claim WITHOUT verifying the signature (verifying needs the secret,
 *   which belongs on the backend). A forged cookie could therefore get the
 *   /admin *page* to render — and it would then be useless, because every API
 *   call it makes is verified properly by the backend, which rejects it.
 *   The data is protected by the API. This just avoids showing the wrong UI.
 */

const SESSION_COOKIE = "gn_session";

/** Decode a JWT payload without verifying. Routing only — never for authz. */
function readRole(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const json = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    // An expired token is treated as no session, so a stale cookie can't linger.
    if (typeof json.exp === "number" && json.exp * 1000 < Date.now()) return null;
    return typeof json.role === "string" ? json.role : null;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const role = token ? readRole(token) : null;
  const signedIn = Boolean(role);

  const isAdminArea = pathname.startsWith("/admin");
  const isAppArea = isAdminArea || pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // Signed out, going somewhere private -> login, remembering where you wanted.
  if (isAppArea && !signedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  // A client must never land in the admin panel. Send them to their own.
  if (isAdminArea && role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // The mirror rule: the client dashboard is for clients. An admin belongs in
  // the admin panel, so the two areas stay strictly separate — one account,
  // one home. Without this an admin could sit in /dashboard, which is exactly
  // the "both open on the same user" bug this fixes.
  const isDashboardArea = pathname.startsWith("/dashboard");
  if (isDashboardArea && role === "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Already signed in? /login and /register are pointless — go where you belong.
  if (isAuthPage && signedIn) {
    const url = req.nextUrl.clone();
    url.pathname = role === "admin" ? "/admin" : "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
