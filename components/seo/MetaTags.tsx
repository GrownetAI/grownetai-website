import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage = "/og-image.jpg",
  noindex = false,
}: MetaTagsProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — AI-Powered Digital Marketing & Web Solutions`;
  const metaDescription = description ?? SITE_CONFIG.description;
  const canonicalUrl = canonical
    ? `${SITE_CONFIG.url}${canonical}`
    : SITE_CONFIG.url;

  return {
    title: fullTitle,
    description: metaDescription,
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
      creator: "@grownetai",
    },
  };
}

export default buildMetadata;
