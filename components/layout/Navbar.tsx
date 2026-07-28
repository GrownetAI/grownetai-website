"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Search } from "lucide-react";
import {
  SERVICE_ROWS,
  CATEGORY_ROWS,
  TECH_ROWS,
  type NavRow,
  type RailId,
} from "@/lib/navigation";
import MegaPanel, { SearchResults } from "./MegaMenu";
import UserMenu from "./UserMenu";
import { isAdmin, logout } from "@/lib/api";
import { useAuthUser, resetAuthUserCache } from "@/hooks/useAuthUser";
import { cn } from "@/lib/utils";

/* ── Shared item styling, so desktop states never drift apart ────── */
const topItem =
  "flex items-center gap-1.5 whitespace-nowrap px-3 py-2 lg:min-h-[44px] xl:px-5 xl:py-2.5 text-sm xl:text-base font-medium transition-colors duration-150";
const topItemOn =
  "font-semibold text-ink border-b-2 border-moss-600 shadow-none";
const topItemOff =
  "text-ink-muted hover:bg-sand hover:text-ink rounded-full transition-all duration-150";
/* Trigger whose panel is currently open — a filled pill, not the
   page-active underline. */
const topItemOpen = "rounded-full bg-sand font-semibold text-ink";

const SEARCH_PLACEHOLDER = "Search services, projects…";

type BrowseTrigger = "services" | "work";

/* ── Mobile: one accordion group ─────────────────────────────────── */
function MobileSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium text-ink-body transition-colors hover:bg-sand/60 hover:text-ink"
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
            <div className="ml-3 mt-1 flex flex-col gap-0.5 pb-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileRow({ row, onNavigate }: { row: NavRow; onNavigate: () => void }) {
  return (
    <Link
      href={row.href}
      onClick={onNavigate}
      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-ink-body transition-colors hover:bg-sand/60 hover:text-ink"
    >
      <span className="min-w-0 truncate">{row.label}</span>
      {row.count !== undefined && (
        <span className="flex-shrink-0 text-xs tabular-nums text-ink-muted">
          {row.count}
        </span>
      )}
    </Link>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  // Session state for the mobile panel; UserMenu shares the same
  // cached check, so this never double-fetches.
  const { user, checked } = useAuthUser();

  /* Mega panel state. One panel serves three openers (two nav
     triggers + the search field); openTrigger is the single source of
     truth for open/mode, lastTrigger is where focus returns. */
  const [openTrigger, setOpenTrigger] = useState<
    BrowseTrigger | "search" | null
  >(null);
  const [rail, setRail] = useState<RailId>("services");
  const [query, setQuery] = useState("");
  const lastTrigger = useRef<HTMLElement | null>(null);

  const megaOpen = openTrigger !== null;
  const searching = openTrigger === "search";

  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const workBtnRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  /* Programmatic re-focus of the search input must not re-open the
     panel we just closed — this flag swallows exactly one focus. */
  const ignoreFocus = useRef(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  /* Elevation on scroll. */
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

  const closeMega = useCallback((focusBack: boolean) => {
    setOpenTrigger(null);
    if (focusBack && lastTrigger.current) {
      if (
        lastTrigger.current === searchRef.current &&
        document.activeElement !== searchRef.current
      ) {
        ignoreFocus.current = true;
      }
      lastTrigger.current.focus();
    }
  }, []);

  /* Route change closes everything (without yanking focus around). */
  useEffect(() => {
    setOpenTrigger(null);
    setMobileOpen(false);
    setQuery("");
    setMobileQuery("");
  }, [pathname]);

  /* One overlay at a time owns the page scroll. */
  useEffect(() => {
    document.body.style.overflow = mobileOpen || megaOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, megaOpen]);

  /* Crossing the lg breakpoint closes the overlay that no longer
     renders there, so the scroll lock and aria state can't go stale. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
      else setOpenTrigger(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Escape closes the mega panel and hands focus back to its opener. */
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMega(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen, closeMega]);

  const openSearchPanel = useCallback(() => {
    lastTrigger.current = searchRef.current;
    setOpenTrigger("search");
  }, []);

  const toggleBrowse = useCallback(
    (which: BrowseTrigger, el: HTMLElement | null) => {
      if (openTrigger === which) {
        closeMega(true);
        return;
      }
      lastTrigger.current = el;
      setRail(which === "services" ? "services" : "category");
      setOpenTrigger(which);
    },
    [openTrigger, closeMega],
  );

  /* Picking a rail entry always lands in browse mode — it is the way
     back out of search results. */
  const handleRail = useCallback((r: RailId) => {
    setRail(r);
    setOpenTrigger((t) =>
      t === "search" ? (r === "services" ? "services" : "work") : t,
    );
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    burgerRef.current?.focus();
  }, []);

  /* Escape closes, and Tab cycles inside the mobile panel instead of
     walking into the page behind it. */
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const SEL =
      'a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])';
    // Focus the panel itself, not its first input — auto-focusing an
    // input pops the soft keyboard on touch devices.
    panel.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobile();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(SEL)).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === panel)
      ) {
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

  // Hide the marketing navbar on the authenticated app routes.
  // (/portfolio is a marketing page — the navbar shows there.)
  const APP_PREFIXES = ["/login", "/register", "/dashboard", "/admin"];
  if (
    APP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return null;
  }

  const servicesOpen = openTrigger === "services";
  const workOpen = openTrigger === "work";

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 w-full"
      style={{ height: "var(--navbar-height)", paddingBottom: 12 }}
    >
      <div
        onClick={(e) => {
          // Blank bar space is outside the menu too — close on it.
          if (megaOpen && e.target === e.currentTarget) closeMega(false);
        }}
        className={cn(
          "mx-auto flex w-full items-center gap-2 border-b px-4 py-3 sm:px-6 outline-none",
          "transition-[background-color,border-color,box-shadow] duration-300 bg-paper",
          scrolled ? "border-hairline shadow-card" : "border-transparent",
        )}
      >
        <div className="flex flex-shrink-0 items-center justify-start">
          <Link href="/" className="flex-shrink-0 rounded-md">
            <Image
              src="/images/g_logo_nav.png"
              alt="GrownetAI"
              width={150}
              height={37}
              priority
              className="block h-8 w-auto lg:h-9"
            />
          </Link>
        </div>

        {/* ── Desktop nav ── */}
        <nav className="hidden flex-none items-center gap-0.5 lg:flex">
          <button
            ref={servicesBtnRef}
            type="button"
            onClick={() => toggleBrowse("services", servicesBtnRef.current)}
            aria-expanded={servicesOpen}
            {...(megaOpen ? { "aria-controls": "mega-panel" } : {})}
            aria-haspopup="true"
            className={cn(
              topItem,
              servicesOpen
                ? topItemOpen
                : isActive("/services")
                  ? topItemOn
                  : topItemOff,
            )}
          >
            Explore Services
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                servicesOpen && "rotate-180",
              )}
            />
          </button>

          <Link
            href="/about"
            className={cn(topItem, isActive("/about") ? topItemOn : topItemOff)}
          >
            About
          </Link>

          <button
            ref={workBtnRef}
            type="button"
            onClick={() => toggleBrowse("work", workBtnRef.current)}
            aria-expanded={workOpen}
            {...(megaOpen ? { "aria-controls": "mega-panel" } : {})}
            aria-haspopup="true"
            className={cn(
              topItem,
              workOpen
                ? topItemOpen
                : isActive("/portfolio")
                  ? topItemOn
                  : topItemOff,
            )}
          >
            Work
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                workOpen && "rotate-180",
              )}
            />
          </button>

          <Link
            href="/contact"
            className={cn(
              topItem,
              isActive("/contact") ? topItemOn : topItemOff,
            )}
          >
            Hire Us
          </Link>
        </nav>

        {/* ── Search — the wide pill in the middle ── */}
        <div className="relative mx-2 hidden min-w-[170px] max-w-[480px] flex-1 lg:mx-3 lg:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            placeholder={SEARCH_PLACEHOLDER}
            aria-label="Search the site"
            aria-expanded={searching}
            {...(megaOpen ? { "aria-controls": "mega-panel" } : {})}
            onFocus={() => {
              if (ignoreFocus.current) {
                ignoreFocus.current = false;
                return;
              }
              openSearchPanel();
            }}
            onClick={() => {
              if (!searching) openSearchPanel();
            }}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!searching) openSearchPanel();
            }}
            onKeyDown={(e) => {
              // Close but keep typing position — Escape must not
              // bounce focus (which would instantly re-open), and the
              // native search-clear input event must not either.
              if (e.key === "Escape") {
                e.preventDefault();
                closeMega(false);
              }
            }}
            className="w-full rounded-full bg-sand py-3 pl-11 pr-4 text-sm text-ellipsis text-ink outline-none transition-shadow placeholder:text-ink-faint focus:ring-2 focus:ring-moss-400/60"
          />
        </div>

        {/* ── Right cluster ── */}
        <div className="ml-auto flex flex-none items-center justify-end gap-3">
          {/* Log in / Sign up when signed out; avatar menu when signed in. */}
          <UserMenu />
          <Link
            href="/dashboard"
            className="group hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-forest-ink hover:text-paper lg:inline-flex"
          >
            See Growth
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <button
            ref={burgerRef}
            className="rounded-full p-3 text-ink transition-colors hover:bg-sand lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            {...(mobileOpen ? { "aria-controls": "mobile-menu" } : {})}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ── Desktop mega panel ── */}
      <MegaPanel
        open={megaOpen}
        rail={rail}
        searching={searching}
        query={query}
        onRail={handleRail}
        onClose={() => closeMega(true)}
        onNavigate={() => closeMega(false)}
      />

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
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
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              tabIndex={-1}
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
                <div className="relative mb-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    type="search"
                    value={mobileQuery}
                    onChange={(e) => setMobileQuery(e.target.value)}
                    placeholder={SEARCH_PLACEHOLDER}
                    aria-label="Search the site"
                    className="w-full rounded-full bg-sand py-3 pl-11 pr-4 text-sm text-ink outline-none transition-shadow placeholder:text-ink-faint focus:ring-2 focus:ring-moss-400/60"
                  />
                </div>

                {mobileQuery.trim() ? (
                  <SearchResults
                    dense
                    query={mobileQuery}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ) : (
                  <>
                    <MobileSection label="Explore Services">
                      {SERVICE_ROWS.map((row) => (
                        <MobileRow
                          key={row.href}
                          row={row}
                          onNavigate={() => setMobileOpen(false)}
                        />
                      ))}
                    </MobileSection>

                    <MobileSection label="Work">
                      <p className="eyebrow px-4 pb-1 pt-2">By Category</p>
                      {CATEGORY_ROWS.map((row) => (
                        <MobileRow
                          key={row.href}
                          row={row}
                          onNavigate={() => setMobileOpen(false)}
                        />
                      ))}
                      <p className="eyebrow px-4 pb-1 pt-3">By Technology</p>
                      {TECH_ROWS.map((row) => (
                        <MobileRow
                          key={row.href}
                          row={row}
                          onNavigate={() => setMobileOpen(false)}
                        />
                      ))}
                    </MobileSection>

                    {[
                      { label: "About", href: "/about" },
                      { label: "Blog", href: "/blog" },
                      { label: "Hire Us", href: "/contact" },
                    ].map((link) => (
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
                    ))}

                    <div className="mt-2 flex flex-col gap-2 border-t border-hairline pt-3">
                      {/* Session-aware rows; nothing until the check lands. */}
                      {checked &&
                        (user ? (
                          <div className="flex flex-col gap-0.5">
                            <div className="px-4 pb-1 pt-2">
                              <p className="truncate text-sm font-semibold text-ink">
                                {user.name}
                              </p>
                              <p className="truncate text-xs text-ink-muted">
                                {user.email}
                              </p>
                            </div>
                            <Link
                              href={isAdmin(user) ? "/admin" : "/dashboard"}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-2xl px-4 py-3.5 text-sm font-medium text-ink-body transition-colors hover:bg-sand/60 hover:text-ink"
                            >
                              {isAdmin(user) ? "Admin panel" : "My dashboard"}
                            </Link>
                            <Link
                              href="/dashboard/settings"
                              onClick={() => setMobileOpen(false)}
                              className="rounded-2xl px-4 py-3.5 text-sm font-medium text-ink-body transition-colors hover:bg-sand/60 hover:text-ink"
                            >
                              Profile settings
                            </Link>
                            <button
                              type="button"
                              onClick={async () => {
                                await logout();
                                resetAuthUserCache();
                                setMobileOpen(false);
                                router.push("/");
                                router.refresh();
                              }}
                              className="rounded-2xl px-4 py-3.5 text-left text-sm font-medium text-rose-700 transition-colors hover:bg-rose-500/10"
                            >
                              Sign out
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <Link
                              href="/login"
                              onClick={() => setMobileOpen(false)}
                              className="rounded-full border border-hairline px-4 py-3 text-center text-sm font-medium text-ink-body transition-colors hover:bg-sand"
                            >
                              Log in
                            </Link>
                            <Link
                              href="/register"
                              onClick={() => setMobileOpen(false)}
                              className="rounded-full border border-hairline px-4 py-3 text-center text-sm font-medium text-ink-body transition-colors hover:bg-sand"
                            >
                              Sign up
                            </Link>
                          </div>
                        ))}
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-4 text-center text-base font-semibold text-paper transition-[background-color,transform] duration-200 hover:bg-forest-ink active:scale-[0.98]"
                      >
                        See Growth
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
