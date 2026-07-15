"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { PRIMARY_NAV, MORE_NAV } from "@/lib/constants";
import UserMenu from "./UserMenu";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string };

/* ── Shared item styling, so desktop and mobile never drift apart ── */
const topItem =
  "flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-150";
const topItemOn = "bg-sand font-semibold text-ink";
const topItemOff = "text-ink-muted hover:bg-sand/70 hover:text-ink";

/* ════════════════════════════════════════════════════════════════
   DESKTOP DROPDOWN

   Radix, not hand-rolled. The old menus could not be opened by keyboard
   at all, never unmounted (so twenty invisible items sat in the tab
   order), and had no Escape or outside-click. Radix gives all of that,
   plus aria-expanded/haspopup and focus return, for free.

   Controlled open state layers hover-to-open on top — but only where a
   real pointer exists, so a tap on touch does not fight the click.
════════════════════════════════════════════════════════════════ */
function NavDropdown({
  label,
  items,
  active,
  isChildActive,
}: {
  label: string;
  items: readonly NavChild[];
  active: boolean;
  isChildActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverable = useRef(false);

  useEffect(() => {
    hoverable.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const cancel = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };
  const hoverOpen = () => {
    if (!hoverable.current) return;
    cancel();
    setOpen(true);
  };
  // A short grace period, so crossing the gap from trigger to panel
  // does not snap the menu shut under the cursor.
  const hoverClose = () => {
    if (!hoverable.current) return;
    cancel();
    timer.current = setTimeout(() => setOpen(false), 130);
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <div
        className="relative"
        onPointerEnter={hoverOpen}
        onPointerLeave={hoverClose}
      >
        <DropdownMenu.Trigger asChild>
          <button className={cn(topItem, active ? topItemOn : topItemOff)}>
            {label}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="center"
            sideOffset={12}
            onPointerEnter={hoverOpen}
            onPointerLeave={hoverClose}
            className="z-[60] w-64 origin-[var(--radix-dropdown-menu-content-transform-origin)]
                       rounded-2xl border border-hairline bg-paper-raised p-1.5 shadow-float
                       data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out"
          >
            {items.map((child) => {
              const on = isChildActive(child.href);
              return (
                <DropdownMenu.Item key={child.href} asChild>
                  <Link
                    href={child.href}
                    className={cn(
                      "flex cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors",
                      on
                        ? "bg-sand font-semibold text-ink"
                        : "text-ink-body data-[highlighted]:bg-sand/60 data-[highlighted]:text-ink",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 flex-shrink-0 rounded-full",
                        on ? "bg-moss-400" : "bg-hairline-strong",
                      )}
                    />
                    {child.label}
                  </Link>
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </div>
    </DropdownMenu.Root>
  );
}

/* ── Mobile accordion group ─────────────────────────────────────── */
function MobileGroup({
  label,
  items,
  active,
  isChildActive,
  onNavigate,
}: {
  label: string;
  items: readonly NavChild[];
  active: boolean;
  isChildActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium transition-colors",
          active
            ? "bg-sand font-semibold text-ink"
            : "text-ink-body hover:bg-sand/60 hover:text-ink",
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-3 mt-1 flex flex-col gap-0.5">
              {items.map((child) => {
                const on = isChildActive(child.href);
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                      on
                        ? "bg-sand font-semibold text-ink"
                        : "text-ink-body hover:bg-sand/60 hover:text-ink",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 flex-shrink-0 rounded-full",
                        on ? "bg-moss-400" : "bg-hairline-strong",
                      )}
                    />
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  /* Elevation on scroll. This state existed before but was never read —
     the listener ran on every scroll event and drove nothing. */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    burgerRef.current?.focus();
  }, []);

  /* Escape closes, and Tab cycles inside the panel instead of walking
     into the page behind it. */
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const SEL =
      'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
    panel.querySelector<HTMLElement>(SEL)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobile();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(SEL),
      ).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  /* A child is active on an exact hash match, or — when it has no hash —
     on a plain path match. The old version only ever checked the hash, so
     landing on /services with no fragment highlighted nothing. */
  function isChildActive(href: string) {
    const [path, hash] = href.split("#");
    const pathMatches = pathname === path || pathname === path + "/";
    return hash ? pathMatches && activeHash === "#" + hash : pathMatches;
  }

  const moreActive = MORE_NAV.some((l) => isActive(l.href));

  // Hide the marketing navbar on the authenticated app routes.
  const APP_PREFIXES = ["/login", "/register", "/dashboard", "/admin"];
  if (APP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 px-4 sm:px-6"
      style={{ height: "var(--navbar-height)", paddingTop: 12, paddingBottom: 12 }}
    >
      {/* ── Floating pill. It had no border-radius, no shadow and a
             default-grey border — a "pill" in name only. ── */}
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1240px] items-center rounded-full border px-3 py-2 sm:px-4",
          "transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-hairline bg-paper-raised/85 shadow-float backdrop-blur-xl backdrop-saturate-150"
            : "border-hairline/60 bg-paper-raised/70 shadow-card backdrop-blur-md",
        )}
      >
        {/* Logo — flex-1 on both flanks is what keeps the nav truly centred,
            rather than merely "centred if the two sides happen to match". */}
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex flex-shrink-0 items-center pl-1.5">
            <Image
              src="/images/logo.png"
              alt="GrownetAI"
              width={140}
              height={36}
              priority
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* ── Desktop nav ── */}
        <nav className="hidden flex-none items-center gap-0.5 lg:flex">
          {PRIMARY_NAV.map((link) =>
            "children" in link && link.children ? (
              <NavDropdown
                key={link.label}
                label={link.label}
                items={link.children}
                active={isActive(link.href)}
                isChildActive={isChildActive}
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  topItem,
                  isActive(link.href) ? topItemOn : topItemOff,
                )}
              >
                {link.label}
              </Link>
            ),
          )}

          <NavDropdown
            label="More"
            items={MORE_NAV}
            active={moreActive}
            isChildActive={isChildActive}
          />
        </nav>

        {/* ── Right cluster: two actions, like the reference ── */}
        <div className="flex flex-1 items-center justify-end gap-1">
          {/* "Sign in" when signed out; the user's avatar when signed in. */}
          <UserMenu />
          <Link
            href="/dashboard"
            className="group hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-gray-200 lg:inline-flex"
          >
            See the Dashboard
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <button
            ref={burgerRef}
            className="rounded-full p-2.5 text-ink transition-colors hover:bg-sand lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* The old menu had no backdrop at all, so a tap outside it did
                nothing. */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobile}
              className="fixed inset-0 -z-10 bg-ink/25 backdrop-blur-[2px] lg:hidden"
            />

            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute mt-1 max-h-[calc(100dvh-var(--navbar-height)-24px)] overflow-y-auto
                         overscroll-contain rounded-3xl border border-hairline bg-paper-raised
                         shadow-float lg:hidden"
              style={{ top: "var(--navbar-height)", left: 16, right: 16 }}
            >
              <div className="flex flex-col gap-1 p-3">
                {PRIMARY_NAV.map((link) =>
                  "children" in link && link.children ? (
                    <MobileGroup
                      key={link.label}
                      label={link.label}
                      items={link.children}
                      active={isActive(link.href)}
                      isChildActive={isChildActive}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-2xl px-4 py-3.5 text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "bg-sand font-semibold text-ink"
                          : "text-ink-body hover:bg-sand/60 hover:text-ink",
                      )}
                    >
                      {link.label}
                    </Link>
                  ),
                )}

                <MobileGroup
                  label="More"
                  items={MORE_NAV}
                  active={moreActive}
                  isChildActive={isChildActive}
                  onNavigate={() => setMobileOpen(false)}
                />

                <div className="mt-2 flex flex-col gap-2 border-t border-hairline px-2 pb-1 pt-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full px-4 py-3 text-center text-sm font-medium text-ink-body transition-colors hover:bg-sand"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-3 text-center text-sm font-semibold text-paper transition-[background-color,transform] duration-200 hover:bg-ink-body active:scale-[0.98]"
                  >
                    See the Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
