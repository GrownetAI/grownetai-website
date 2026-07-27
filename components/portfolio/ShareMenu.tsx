"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Facebook,
  Link2,
  Linkedin,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Twitter,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════
   SHARE MENU — reusable share popover (awwwards-style utility action)

   The page URL is captured when the menu opens (not at render) so share
   intents always carry the live location — including ?filter=/?tech=
   params the visitor has applied since mount.
════════════════════════════════════════════════════════════════ */

const ROW =
  "flex w-full cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 py-2.5 " +
  "text-sm font-medium text-ink-body outline-none transition-colors " +
  "data-[highlighted]:bg-sand data-[highlighted]:text-ink";

export default function ShareMenu({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const [url, setUrl] = useState("");

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const intents: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    external: boolean;
  }[] = [
    {
      label: "Share on X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      external: true,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      external: true,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      external: true,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${t}%20${u}`,
      external: true,
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${t}&body=${u}`,
      external: false, // mailto in a new tab leaves a blank window behind
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy the link");
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url: url || window.location.href });
    } catch {
      // visitor dismissed the OS share sheet — nothing to report
    }
  }

  return (
    <DropdownMenu.Root
      onOpenChange={(open) => {
        if (open) setUrl(window.location.href);
      }}
    >
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Share this page"
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full border border-hairline bg-paper-raised text-ink transition-colors hover:bg-sand",
            className,
          )}
        >
          <Share2 className="h-[18px] w-[18px]" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          className="z-[60] w-56 origin-[var(--radix-dropdown-menu-content-transform-origin)]
                     rounded-2xl border border-hairline bg-paper-raised p-2 shadow-float
                     data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out"
        >
          <DropdownMenu.Item onSelect={copyLink} className={ROW}>
            <Link2 className="h-4 w-4" /> Copy link
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-hairline" />

          {intents.map(({ label, icon: Icon, href, external }) => (
            <DropdownMenu.Item key={label} asChild>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={ROW}
              >
                <Icon className="h-4 w-4" /> {label}
              </a>
            </DropdownMenu.Item>
          ))}

          {typeof navigator !== "undefined" &&
            typeof navigator.share === "function" && (
              <>
                <DropdownMenu.Separator className="my-1 h-px bg-hairline" />
                <DropdownMenu.Item onSelect={nativeShare} className={ROW}>
                  <MoreHorizontal className="h-4 w-4" /> More…
                </DropdownMenu.Item>
              </>
            )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
