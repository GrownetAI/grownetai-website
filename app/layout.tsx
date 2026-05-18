import type { Metadata, Viewport } from "next";
import { Poppins, Manrope, Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Font Configuration ────────────────────────────────────────────────
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
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
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/site.webmanifest",
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
    { media: "(prefers-color-scheme: light)", color: "#1AABAB" },
    { media: "(prefers-color-scheme: dark)", color: "#0D7A7A" },
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
  foundingDate: "2024",
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
      className={`${poppins.variable} ${manrope.variable} ${montserrat.variable}`}
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
      <body className="font-sans antialiased bg-white text-brand-slate-gray">
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "var(--font-manrope)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#EDF9F0",
                color: "#27924A",
                border: "1px solid #3BC456",
              },
              iconTheme: {
                primary: "#3BC456",
                secondary: "#fff",
              },
            },
            error: {
              style: {
                background: "#FEF2F2",
                color: "#DC2626",
                border: "1px solid #FCA5A5",
              },
            },
          }}
        />
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
