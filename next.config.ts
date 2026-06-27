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
};

export default nextConfig;
