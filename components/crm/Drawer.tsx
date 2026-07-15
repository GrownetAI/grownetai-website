"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Right-side slide-over built on Radix Dialog (focus trap + a11y) and framer
 * for motion. Theme-aware via CRM tokens. Used for lead detail + connect flows.
 */
export default function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = "max-w-md",
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  // Radix portals to <body>. That used to land OUTSIDE the theme root, so this
  // component had to re-apply the `dark` class by hand. `.dark` now lives on
  // <html>, so the portal inherits it and the hack is gone.
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[60] bg-overlay/65 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  "fixed z-[60] inset-y-0 right-0 w-full bg-panel border-l border-line shadow-2xl flex flex-col focus:outline-none",
                  width,
                )}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              >
                <header className="flex items-start justify-between gap-4 px-5 py-4 border-b border-line">
                  <div className="min-w-0">
                    {title && (
                      <Dialog.Title className="text-base font-semibold text-fg truncate">
                        {title}
                      </Dialog.Title>
                    )}
                    {subtitle && (
                      <p className="text-xs text-fg-muted mt-0.5">{subtitle}</p>
                    )}
                  </div>
                  <Dialog.Close
                    onClick={onClose}
                    className="p-2 -mr-2 rounded-lg text-fg-muted hover:text-fg hover:bg-elevated transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </Dialog.Close>
                </header>

                <div className="flex-1 overflow-y-auto crm-scroll px-5 py-5">
                  {children}
                </div>

                {footer && (
                  <footer className="px-5 py-4 border-t border-line bg-elevated/40">
                    {footer}
                  </footer>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
