import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "grownetai.com" },
      { protocol: "https", hostname: "www.grownetai.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizeCss: false,
  },

  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
