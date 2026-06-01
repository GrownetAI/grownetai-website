"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Pricing sub-pages — injected as a dropdown in the navbar
// ---------------------------------------------------------------------------
const PRICING_CHILDREN = [
  { label: "Website Packages", href: "/pricing#web-dev" },
  { label: "App Development", href: "/pricing#app-dev" },
  { label: "SEO & Performance", href: "/pricing#seo" },
  { label: "Ads Management", href: "/pricing#ads" },
  { label: "Social Media (SMM)", href: "/pricing#smm" },
  { label: "Social Optimization (SMO)", href: "/pricing#smo" },
  { label: "AI Agents", href: "/pricing#ai-agents" },
  { label: "LLM Integration", href: "/pricing#llm" },
  { label: "AI Automation", href: "/pricing#ai-automation" },
  { label: "Custom Model Training", href: "/pricing#model-training" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  function isChildExactActive(href: string) {
    const [hrefPath, hrefHash] = href.split("#");
    const pathMatches = pathname === hrefPath || pathname === hrefPath + "/";
    if (!hrefHash) return pathMatches;
    return pathMatches && activeHash === "#" + hrefHash;
  }

  function isChildActive(children: { href: string }[]) {
    return children.some((child) => isChildExactActive(child.href));
  }

  // Is any pricing sub-page active?
  const isPricingActive = PRICING_CHILDREN.some((c) =>
    isChildExactActive(c.href),
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setServicesOpen(false);
    setPricingOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  function handleDesktopChildClick(href: string) {
    setServicesOpen(false);
    setPricingOpen(false);
    router.push(href);
  }

  function handleMobileChildClick(href: string) {
    setServicesOpen(false);
    setPricingOpen(false);
    setIsMobileOpen(false);
    router.push(href);
  }

  // Hide the marketing navbar on the authenticated app routes.
  const APP_PREFIXES = ["/login", "/register", "/dashboard", "/admin"];
  if (APP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ height: "var(--navbar-height)", padding: "10px 24px" }}
    >
      {/* ── Floating Pill ── */}
      <div
        className={cn(
          "flex items-center w-full px-3 py-2 rounded-xl border border-gray-200 bg-white transition-all duration-300",
          "max-w-5xl",
          isScrolled
            ? "shadow-[0_4px_28px_rgba(0,0,0,0.12)]"
            : "shadow-[0_2px_12px_rgba(0,0,0,0.07)]",
        )}
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center flex-shrink-0 pl-1 mr-3">
          <Image
            src="/images/logo.png"
            alt="GrownetAI"
            width={140}
            height={36}
            priority
            className="h-8 w-auto brightness-110"
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center justify-center gap-0.5 flex-1 min-w-0">
          {NAV_LINKS.map((link) => {
            // ── Services dropdown (existing) ──
            if (link.children) {
              const childActive = isChildActive(link.children);
              return (
                <div
                  key={link.label}
                  className="relative group flex-shrink-0"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap",
                      childActive
                        ? "text-brand-teal bg-brand-teal-mist font-semibold"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  <div className="absolute top-full left-0 w-full h-2" />

                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl border border-gray-100 bg-white shadow-xl py-2 px-1.5 transition-all duration-200",
                      servicesOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none",
                    )}
                  >
                    {link.children.map((child) => {
                      const childPageActive = isChildExactActive(child.href);
                      return (
                        <button
                          key={child.href}
                          onClick={() => handleDesktopChildClick(child.href)}
                          className={cn(
                            "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left font-medium",
                            childPageActive
                              ? "text-brand-teal bg-brand-teal-mist"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                          )}
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full flex-shrink-0",
                              childPageActive ? "bg-brand-teal" : "bg-gray-300",
                            )}
                          />
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // ── Pricing dropdown (injected) ──
            if (link.href === "/pricing") {
              return (
                <div
                  key="pricing"
                  className="relative group flex-shrink-0"
                  onMouseEnter={() => setPricingOpen(true)}
                  onMouseLeave={() => setPricingOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap",
                      isPricingActive
                        ? "text-brand-teal bg-brand-teal-mist font-semibold"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  <div className="absolute top-full left-0 w-full h-2" />

                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl border border-gray-100 bg-white shadow-xl py-2 px-1.5 transition-all duration-200",
                      pricingOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none",
                    )}
                  >
                    {PRICING_CHILDREN.map((child) => {
                      const childPageActive = isChildExactActive(child.href);
                      return (
                        <button
                          key={child.href}
                          onClick={() => handleDesktopChildClick(child.href)}
                          className={cn(
                            "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left font-medium",
                            childPageActive
                              ? "text-brand-teal bg-brand-teal-mist"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                          )}
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full flex-shrink-0",
                              childPageActive ? "bg-brand-teal" : "bg-gray-300",
                            )}
                          />
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // ── Regular link ──
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex-shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap",
                  active
                    ? "text-brand-teal bg-brand-teal-mist font-semibold"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0 ml-3 pr-0.5">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-brand-teal text-white hover:text-black/60 active:translate-y-0 transition-[background-color,transform] duration-200 ease-out whitespace-nowrap"
          >
            See the Dashboard
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="lg:hidden ml-auto p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {isMobileOpen && (
        <div
          className="lg:hidden absolute mt-1 rounded-2xl border border-gray-100 bg-white shadow-xl max-h-[80vh] overflow-y-auto"
          style={{ top: "var(--navbar-height)", left: 24, right: 24 }}
        >
          <div className="p-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              // Services dropdown
              if (link.children) {
                const childActive = isChildActive(link.children);
                return (
                  <div key={link.label}>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        childActive
                          ? "text-brand-teal bg-brand-teal-mist font-semibold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                      )}
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          servicesOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="ml-3 mt-1 flex flex-col gap-0.5">
                        {link.children.map((child) => {
                          const childPageActive = isChildExactActive(
                            child.href,
                          );
                          return (
                            <button
                              key={child.href}
                              onClick={() => handleMobileChildClick(child.href)}
                              className={cn(
                                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm transition-all text-left w-full font-medium",
                                childPageActive
                                  ? "text-brand-teal bg-brand-teal-mist"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              )}
                            >
                              <span
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full flex-shrink-0",
                                  childPageActive
                                    ? "bg-brand-teal"
                                    : "bg-gray-300",
                                )}
                              />
                              {child.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Pricing dropdown (mobile)
              if (link.href === "/pricing") {
                return (
                  <div key="pricing">
                    <button
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        isPricingActive
                          ? "text-brand-teal bg-brand-teal-mist font-semibold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                      )}
                      onClick={() => setPricingOpen(!pricingOpen)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          pricingOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {pricingOpen && (
                      <div className="ml-3 mt-1 flex flex-col gap-0.5">
                        {PRICING_CHILDREN.map((child) => {
                          const childPageActive = isChildExactActive(
                            child.href,
                          );
                          return (
                            <button
                              key={child.href}
                              onClick={() => handleMobileChildClick(child.href)}
                              className={cn(
                                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm transition-all text-left w-full font-medium",
                                childPageActive
                                  ? "text-brand-teal bg-brand-teal-mist"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              )}
                            >
                              <span
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full flex-shrink-0",
                                  childPageActive
                                    ? "bg-brand-teal"
                                    : "bg-gray-300",
                                )}
                              />
                              {child.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Regular link
              const active = isActive(link.href);
              return (
                <button
                  key={link.href}
                  onClick={() => {
                    setIsMobileOpen(false);
                    router.push(link.href);
                  }}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all text-left w-full",
                    active
                      ? "text-brand-teal bg-brand-teal-mist font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="mt-2 pt-3 border-t border-gray-100 flex flex-col gap-2 px-2 pb-1">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 text-center transition-all"
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsMobileOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-brand-teal text-white text-center hover:bg-brand-teal-deep active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out"
              >
                See the Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
