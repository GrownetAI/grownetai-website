"use client";

import { useEffect, useState } from "react";
import { getMe, type AuthUser } from "@/lib/api";

/* One /auth/me round-trip shared by every subscriber (UserMenu and
   Navbar's mobile panel) — cached at module level so two components
   mounting in the same session don't double-fetch. */
let cached: Promise<AuthUser | null> | null = null;

export function resetAuthUserCache() {
  cached = null;
}

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let alive = true;
    // The cookie is httpOnly, so only the server knows — a 401 just
    // means "signed out"; the interceptor ignores /auth/me.
    cached ??= getMe().catch(() => null);
    cached.then((me) => {
      if (alive) {
        setUser(me);
        setChecked(true);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  return { user, checked };
}
