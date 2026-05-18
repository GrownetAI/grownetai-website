"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Handle desktop submenu item click — navigate and close dropdown
  function handleDesktopChildClick(href: string) {
    setServicesOpen(false);
    router.push(href);
  }

  // Handle mobile submenu item click — navigate and close everything
  function handleMobileChildClick(href: string) {
    setServicesOpen(false);
    setIsMobileOpen(false);
    router.push(href);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-gray-100"
          : "bg-white",
      )}
      style={{ height: "var(--navbar-height)" }}
    >
      <div className="container-site h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="GrownetAI"
            width={160}
            height={44}
            priority
            className="h-10 w-auto brightness-110"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            if (link.children) {
              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-brand-slate-gray hover:text-brand-teal hover:bg-brand-teal-mist transition-all duration-200">
                    {link.label}
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={cn(
                      "absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-card-hover border border-gray-100 p-2 transition-all duration-200",
                      servicesOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none",
                    )}
                  >
                    {link.children.map((child) => (
                      // Desktop: clicking navigates directly to the hash section
                      <button
                        key={child.href}
                        onClick={() => handleDesktopChildClick(child.href)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-brand-slate-gray hover:text-brand-teal hover:bg-brand-teal-mist transition-all duration-150 text-left"
                      >
                        <span className="w-2 h-2 rounded-full bg-brand-teal flex-shrink-0" />
                        {child.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                  pathname === link.href
                    ? "text-brand-teal bg-brand-teal-mist"
                    : "text-brand-slate-gray hover:text-brand-teal hover:bg-brand-teal-mist",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand-slate-gray hover:text-brand-teal transition-colors"
          >
            <Phone className="w-4 h-4" />
            {SITE_CONFIG.phone}
          </a>
          <Link href="/contact" className="btn-primary btn-sm">
            Free Consultation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg text-brand-charcoal hover:bg-brand-teal-mist transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-card-hover max-h-[80vh] overflow-y-auto">
          <div className="container-site py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              if (link.children) {
                return (
                  <div key={link.label}>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-brand-slate-gray hover:text-brand-teal hover:bg-brand-teal-mist transition-all"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          servicesOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {link.children.map((child) => (
                          // Mobile: clicking submenu item closes everything and navigates
                          <button
                            key={child.href}
                            onClick={() => handleMobileChildClick(child.href)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-brand-slate-gray hover:text-brand-teal hover:bg-brand-teal-mist transition-all text-left w-full"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                // Mobile: clicking any regular link closes the menu
                <button
                  key={link.href}
                  onClick={() => {
                    setIsMobileOpen(false);
                    router.push(link.href);
                  }}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left w-full",
                    pathname === link.href
                      ? "text-brand-teal bg-brand-teal-mist"
                      : "text-brand-slate-gray hover:text-brand-teal hover:bg-brand-teal-mist",
                  )}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2 text-sm font-semibold text-brand-slate-gray"
              >
                <Phone className="w-4 h-4 text-brand-teal" />
                {SITE_CONFIG.phone}
              </a>

              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="btn-primary justify-center rounded-xl px-6 py-3 mx-2"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
