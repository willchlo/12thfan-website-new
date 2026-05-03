import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/social", destination: "/events/social", permanent: true }];
  },
  /** Browsers often request `/favicon.ico` first; without this they keep an old cached .ico. */
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/favicon.png" }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
