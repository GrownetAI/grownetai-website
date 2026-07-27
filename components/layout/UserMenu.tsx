"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LayoutDashboard, LogOut, Settings, Shield } from "lucide-react";
import { isAdmin, logout } from "@/lib/api";
import { useAuthUser, resetAuthUserCache } from "@/hooks/useAuthUser";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   MARKETING NAVBAR — signed-in state

   The navbar always showed "Sign in", even to someone already signed in.
   Now: signed out -> "Sign in"; signed in -> their avatar, which opens a menu
   into their dashboard and, most usefully, straight to Profile settings.

   Whether a session exists can only be known on the client (the JWT lives in
   localStorage), so this renders NOTHING until it has checked. Guessing wrong
   would either flash "Sign in" at a signed-in user, or the reverse — and it
   would be a hydration mismatch either way.
════════════════════════════════════════════════════════════════ */

export default function UserMenu() {
  const router = useRouter();
  const { user, checked } = useAuthUser();

  // Don't render either state until we know which one is true. Sized to
  // the signed-out pair so the check doesn't jump the layout.
  if (!checked)
    return <span className="hidden h-9 w-[150px] xl:block" aria-hidden />;

  if (!user) {
    // Quiet text pair; the mobile menu carries its own Log in / Sign up.
    return (
      <div className="hidden items-center gap-1 xl:flex">
        <Link
          href="/login"
          className="whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-sand hover:text-ink"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-sand hover:text-ink"
        >
          Sign up
        </Link>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const home = isAdmin(user) ? "/admin" : "/dashboard";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label={`Account menu for ${user.name}`}
          className="hidden h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-hairline bg-sand text-xs font-bold text-ink transition-colors hover:border-hairline-strong lg:inline-flex"
        >
          {user.avatar ? (
            // Remote avatar host isn't in next.config remotePatterns, so a plain
            // <img> — next/image would throw at runtime.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          className="z-[60] w-60 origin-[var(--radix-dropdown-menu-content-transform-origin)]
                     rounded-2xl border border-hairline bg-paper-raised p-1.5 shadow-float
                     data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out"
        >
          <div className="border-b border-hairline px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-ink">
              {user.name}
            </p>
            <p className="truncate text-xs text-ink-muted">{user.email}</p>
          </div>

          <Item href={home} icon={isAdmin(user) ? Shield : LayoutDashboard}>
            {isAdmin(user) ? "Admin panel" : "My dashboard"}
          </Item>
          {/* The brief's ask: the avatar opens their Profile settings. */}
          <Item href="/dashboard/settings" icon={Settings}>
            Profile settings
          </Item>

          <DropdownMenu.Separator className="my-1 h-px bg-hairline" />

          <DropdownMenu.Item
            onSelect={async () => {
              await logout(); // only the server can expire an httpOnly cookie
              resetAuthUserCache();
              router.push("/");
              router.refresh();
            }}
            className="flex cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium
                       text-rose-700 outline-none transition-colors data-[highlighted]:bg-rose-500/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function Item({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu.Item asChild>
      <Link
        href={href}
        className={cn(
          "flex cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors",
          "text-ink-body data-[highlighted]:bg-sand data-[highlighted]:text-ink",
        )}
      >
        <Icon className="h-4 w-4" />
        {children}
      </Link>
    </DropdownMenu.Item>
  );
}
