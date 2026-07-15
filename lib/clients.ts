/**
 * Clients shown in the homepage "Our Clients" logo wall.
 *
 * These are the brands already established across the site (the case-study
 * clients + the companies behind the testimonials), so the section stays
 * consistent with the portfolio and proof content — no invented logos.
 *
 * `logo` is an optional path to a real logo asset (SVG/PNG in /public). When
 * absent, the section renders a styled wordmark, so real client logos can be
 * dropped in later without touching the component.
 */
export interface Client {
  name: string;
  /** Optional /public path to a logo image; falls back to a wordmark. */
  logo?: string;
}

export const CLIENTS: Client[] = [
  { name: "FreshBite", logo: "/images/clientsLogo/DRIVMAN LOGO 1080X1080.png" },
  { name: "Rangriti" },
  { name: "More Coming Soon...", },
];
