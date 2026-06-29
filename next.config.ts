import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Our own trusted SVG icons (svc-*.svg) live in /public/assets.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // YouTube video thumbnails (Videos page).
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // Keep the Prisma MySQL driver adapter out of the bundler.
  serverExternalPackages: ["@prisma/adapter-mariadb", "mariadb"],
  // Serve /favicon.ico from the current Settings favicon (busts the old
  // cached default and covers crawlers that request /favicon.ico directly).
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/api/favicon" }];
  },
};

export default nextConfig;
