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

  /* The client dashboard and admin panel were retired along with sign-in.
     Permanent (308) rather than 404 so existing bookmarks, inbound links and
     any indexed URLs land on Pricing instead of dead-ending. `:path*` matches
     zero segments too, so bare /dashboard and /admin are covered.

     Destinations carry the trailing slash deliberately: `trailingSlash: true`
     is set above, so a bare "/pricing" would cost a third redirect hop
     normalising it to "/pricing/". */
  async redirects() {
    return [
      { source: "/login", destination: "/pricing/", permanent: true },
      { source: "/register", destination: "/pricing/", permanent: true },
      { source: "/dashboard/:path*", destination: "/pricing/", permanent: true },
      { source: "/admin/:path*", destination: "/pricing/", permanent: true },
    ];
  },

  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
