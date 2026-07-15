"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bell, Check, BellOff } from "lucide-react";
import {
  notificationsFor,
  NOTIF_ICON,
  NOTIF_TONE,
  type CrmNotification,
} from "@/lib/crm/notifications";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   NOTIFICATIONS

   The topbar bell used to be a dead <button> with no handler — clicking did
   nothing. This makes it a real menu: click (or Enter/Space) to open a themed
   panel, click outside or Escape to close, mark items read individually or all
   at once, with a live unread badge. Content is scoped so the admin bell shows
   cross-company signals and the dashboard bell shows the company's own.
════════════════════════════════════════════════════════════════ */

export default function NotificationsMenu({
  scope = "crm",
}: {
  scope?: "admin" | "crm";
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CrmNotification[]>(() =>
    notificationsFor(scope),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const unread = items.filter((n) => n.unread).length;

  // Keep the feed in sync if the shell ever swaps scope (admin <-> crm).
  useEffect(() => {
    setItems(notificationsFor(scope));
  }, [scope]);

  // Close on outside click + Escape, only while open.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markRead = (id: string) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "relative w-9 h-9 grid place-items-center rounded-lg border transition-colors",
          open
            ? "border-fg-subtle bg-elevated text-fg"
            : "border-line text-fg-muted hover:text-fg hover:bg-elevated",
        )}
      >
        <Bell className="w-4 h-4" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 grid place-items-center rounded-full bg-rose-500 text-[10px] font-bold leading-none text-white tabular-nums">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Notifications"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.16, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm origin-top-right rounded-xl border border-line bg-page shadow-xl shadow-black/10 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-fg">Notifications</h2>
                {unread > 0 && (
                  <span className="text-[11px] font-semibold text-primary bg-primary/10 rounded-full px-1.5 py-0.5 tabular-nums">
                    {unread} new
                  </span>
                )}
              </div>
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1 text-xs font-medium text-fg-muted hover:text-fg transition-colors"
                >
                  <Check className="w-3.5 h-3.5" /> Mark all read
                </button>
              )}
            </div>

            {/* List */}
            {items.length ? (
              <ul className="max-h-[min(70vh,380px)] overflow-y-auto crm-scroll divide-y divide-line">
                {items.map((n) => {
                  const Icon = NOTIF_ICON[n.kind];
                  return (
                    <li key={n.id}>
                      <button
                        role="menuitem"
                        onClick={() => markRead(n.id)}
                        className={cn(
                          "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-elevated",
                          n.unread && "bg-primary/[0.035]",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid place-items-center w-8 h-8 rounded-lg shrink-0",
                            NOTIF_TONE[n.kind],
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="text-sm font-medium text-fg truncate">
                              {n.title}
                            </span>
                            {n.unread && (
                              <span
                                aria-hidden
                                className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                              />
                            )}
                          </span>
                          <span className="block text-xs text-fg-muted mt-0.5 leading-relaxed">
                            {n.body}
                          </span>
                          <span className="block text-[11px] text-fg-subtle mt-1">
                            {n.time}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <BellOff className="w-6 h-6 text-fg-subtle" />
                <p className="text-sm text-fg-muted">You&rsquo;re all caught up.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
