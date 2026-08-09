import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingHireUs from "@/components/layout/FloatingHireUs";

// ─── Font Configuration ────────────────────────────────────────────────
// Two typefaces, one family. Inter carries all UI and body copy; Inter Tight
// carries every display headline. Inter Tight is Inter's purpose-built display
// cut — tighter sidebearings and a real weight range up to 800 — so headlines
// can be genuinely heavy instead of a light editorial serif that could never
// bold (Instrument Serif shipped a single 400 weight).
//
// Both are self-hosted by next/font at build time: no runtime call to Google.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// ─── Site Metadata ─────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://grownetai.com"),
  title: {
    default: "GrownetAI — AI-Powered Digital Marketing & Web Solutions",
    template: "%s | GrownetAI",
  },
  description:
    "GrownetAI is a full-service digital marketing agency specializing in AI-powered SEO, Google Ads, Instagram Ads, social media management, reels & content creation, and professional website development for businesses.",
  keywords: [
    "digital marketing agency",
    "AI marketing",
    "SEO services",
    "Google Ads",
    "Instagram Ads",
    "social media marketing",
    "website development",
    "content creation",
    "reels production",
    "online marketing India",
    "GrownetAI",
    "business growth",
  ],
  authors: [{ name: "GrownetAI Team", url: "https://grownetai.com" }],
  creator: "GrownetAI",
  publisher: "GrownetAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://grownetai.com",
    siteName: "GrownetAI",
    title: "GrownetAI — AI-Powered Digital Marketing & Web Solutions",
    description:
      "Grow your business with AI-powered digital marketing, SEO, social media, Google Ads, and professional websites.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GrownetAI — Helping Businesses Grow Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GrownetAI — AI-Powered Digital Marketing",
    description:
      "Grow your business with AI-powered digital marketing, SEO, social media, and professional websites.",
    images: ["/og-image.jpg"],
    creator: "@grownetai",
  },
  // ─── Icons ───────────────────────────────────────────────────────────
  // Every file below lives at the web root (`public/`), copied verbatim from
  // the brand logo kit's `01-favicon-web/` set. Deliberately NOT wired up:
  // the master `grownetai-logo.svg`. An SVG favicon outranks every PNG in
  // Chrome/Firefox, and that master is the transparent lockup — its `G`
  // stroke is white negative space and the `ai` is solid black, so it half
  // vanishes against dark browser chrome. The PNGs and .ico carry a solid
  // green plate and read correctly on any tab background.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-256x256.png", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#00BF34" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#00BF34",
    "msapplication-config": "/browserconfig.xml",
  },
  alternates: {
    canonical: "https://grownetai.com",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0E2A24" },
  ],
};

// ─── JSON-LD Organization Schema ───────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GrownetAI",
  url: "https://grownetai.com",
  logo: "https://grownetai.com/images/logo.png",
  description:
    "AI-powered digital marketing agency specializing in SEO, Google Ads, Instagram Ads, social media, and website development.",
  foundingDate: "2026",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://instagram.com/grownetai",
    "https://linkedin.com/company/grownetai",
    "https://facebook.com/grownetai",
    "https://twitter.com/grownetai",
  ],
  serviceType: [
    "Digital Marketing",
    "SEO Services",
    "Social Media Marketing",
    "Google Ads Management",
    "Website Development",
    "Content Creation",
  ],
};

// ─── Root Layout ───────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} font-sans`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-paper text-ink-body">
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "var(--font-inter)",
              borderRadius: "999px",
              fontSize: "14px",
              padding: "10px 16px",
            },
            /* Driven by CSS vars (see globals.css) rather than literal hexes,
               because these land as INLINE styles that Tailwind cannot override
               — every toast used to render light inside the dark CRM. */
            success: {
              style: {
                background: "var(--toast-ok-bg)",
                color: "var(--toast-ok-fg)",
                border: "1px solid var(--toast-ok-border)",
              },
              iconTheme: {
                primary: "var(--toast-ok-fg)",
                secondary: "var(--toast-ok-bg)",
              },
            },
            error: {
              style: {
                background: "var(--toast-err-bg)",
                color: "var(--toast-err-fg)",
                border: "1px solid var(--toast-err-border)",
              },
              iconTheme: {
                primary: "var(--toast-err-fg)",
                secondary: "var(--toast-err-bg)",
              },
            },
          }}
        />
        <Navbar />

        {children}
        <FloatingHireUs />
        <Footer />
      </body>
    </html>
  );
}
