import Link from "next/link";
import { Download, Instagram, Facebook, Linkedin, Tag } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { PROMO } from "@/lib/promo";

/* ════════════════════════════════════════════════════════════════
   UTILITY BAR — the thin strip above the navbar.

   Three jobs, in priority order as space shrinks: the current offer,
   the portfolio download, and social links. Social icons drop below
   sm; the offer text truncates rather than wrapping, so the strip is
   always exactly one line tall.

   It renders inside Navbar's fixed <header>, so --navbar-height in
   globals.css covers BOTH this strip and the nav row. Change this
   component's height without changing that variable and every page's
   top padding — plus the mega-menu offset — goes wrong.
════════════════════════════════════════════════════════════════ */

const SOCIALS = [
  { href: SITE_CONFIG.social.instagram, label: "Instagram", Icon: Instagram },
  { href: SITE_CONFIG.social.facebook, label: "Facebook", Icon: Facebook },
  { href: SITE_CONFIG.social.linkedin, label: "LinkedIn", Icon: Linkedin },
];

export default function UtilityBar() {
  return (
    <div className="w-full bg-forest text-paper">
      <div className="mx-auto flex h-9 w-full items-center gap-3 px-4 sm:px-6">
        {/* ── Offer ── */}
        {PROMO ? (
          <Link
            href="/pricing"
            className="flex min-w-0 items-center gap-2 text-xs transition-opacity hover:opacity-80"
          >
            <Tag className="h-3.5 w-3.5 flex-shrink-0 text-moss-300" aria-hidden />
            {/* Phones only get the headline. The occasion and coupon code are
                the first things dropped so three social icons and the download
                still fit at 320px without the offer truncating to nothing. */}
            <span className="truncate">
              <span className="hidden font-semibold sm:inline">
                {PROMO.occasion}:{" "}
              </span>
              {PROMO.headline}
              {PROMO.code && (
                <span className="hidden sm:inline">
                  {" · code "}
                  <span className="font-semibold text-moss-300">
                    {PROMO.code}
                  </span>
                </span>
              )}
            </span>
          </Link>
        ) : (
          <span className="min-w-0 truncate text-xs text-paper/70">
            AI-first engineering &amp; digital growth
          </span>
        )}

        {/* ── Right cluster ── */}
        <div className="ml-auto flex flex-shrink-0 items-center gap-1">
          <div className="flex items-center gap-0.5">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full p-1 text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper sm:p-1.5"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
            <span
              aria-hidden
              className="mx-1 hidden h-4 w-px bg-paper/20 sm:block"
            />
          </div>

          {/* `download` makes the browser save it rather than navigate to a
              6 MB PDF viewer, which on mobile is a dead end. */}
          <a
            href="/GrownetAI-Portfolio.pdf"
            download
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-paper/10 px-2 py-1 text-xs font-semibold text-paper transition-colors hover:bg-paper/20 sm:px-3"
          >
            <Download className="h-3.5 w-3.5" />
            {/* Icon-only on phones — `xs` is not a breakpoint in this config,
                so the old `xs:inline` was a no-op that never generated. */}
            <span className="hidden sm:inline">Portfolio</span>
            <span className="sr-only">Download portfolio (PDF, 10 pages)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
