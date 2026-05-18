"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  X,
  ChevronDown,
  MessageCircle,
  Phone,
} from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { whatsappUrl, cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [servicesOpen, setServicesOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    onClose();
    setServicesOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const waHref = whatsappUrl(
    SITE_CONFIG.whatsapp,
    "Hi GrownetAI, I need help!",
  );

  // Click on a submenu child → close everything and navigate
  function handleChildClick(href: string) {
    setServicesOpen(false);
    onClose();
    router.push(href);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 left-0 bottom-0 z-50 w-[85vw] max-w-sm bg-white flex flex-col shadow-2xl lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-heading font-bold text-brand-charcoal text-lg">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-brand-slate-gray" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setServicesOpen((v) => !v)}
                        className="flex items-center justify-between w-full px-3 py-3 text-brand-charcoal font-semibold font-heading rounded-xl hover:bg-brand-teal-mist transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-brand-slate-gray transition-transform duration-200",
                            servicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3"
                          >
                            {link.children.map((child) => (
                              // Clicking submenu item closes menu and navigates
                              <button
                                key={child.href}
                                onClick={() => handleChildClick(child.href)}
                                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-brand-slate-gray hover:text-brand-teal hover:bg-brand-teal-mist rounded-lg transition-colors text-left"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0" />
                                {child.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "block px-3 py-3 font-semibold font-heading rounded-xl transition-colors",
                      isActive
                        ? "bg-brand-teal text-white"
                        : "text-brand-charcoal hover:bg-brand-teal-mist hover:text-brand-teal",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom CTAs */}
            <div className="px-4 py-5 border-t border-gray-100 space-y-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20ba5a] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-teal text-white font-semibold hover:bg-brand-teal-deep transition-colors"
              >
                <Phone className="w-5 h-5" />
                Free Consultation
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
