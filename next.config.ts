import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    domains: ["grownetai.com"],
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },

  experimental: {
    optimizeCss: true,
  },

  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
