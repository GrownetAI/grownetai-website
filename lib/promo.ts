/**
 * The current offer / coupon, surfaced in two places: the utility bar above
 * the navbar, and the banner at the top of /pricing.
 *
 * Deliberately a plain static config with NO date gating. Two reasons:
 *
 *  1. Every page here is statically generated, so a `new Date()` check would
 *     freeze at build time and keep showing a dead offer until the next deploy.
 *  2. Evaluating it client-side instead would render differently on the server
 *     and the client around the cutoff, which is a hydration mismatch.
 *
 * `window` is the human-readable run — copy only. To end an offer, set PROMO
 * to null; both surfaces handle that and collapse cleanly.
 */
export interface Promo {
  /** Short occasion label, e.g. "Independence Day". */
  occasion: string;
  /** The offer itself, kept short enough for one line on a phone. */
  headline: string;
  /** Coupon code, or null when the offer needs no code. */
  code: string | null;
  /** Human-readable validity, e.g. "Ends 20 Aug". Display only. */
  window: string;
  /** Longer supporting line — banner only, not the utility bar. */
  detail: string;
}

export const PROMO: Promo | null = {
  occasion: "Independence Day",
  headline: "15% off every package",
  code: "FREEDOM15",
  window: "15–20 August",
  detail:
    "Book any package during Independence Week and take 15% off the one-time build, plus your first month of management free.",
};
