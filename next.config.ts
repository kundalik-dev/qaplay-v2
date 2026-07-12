import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.INTERNAL_ALLOWED_DEV_ORIGINS?.split(",") || [],

  // Prisma 7 + Next.js 16 Turbopack: prevent bundling of Prisma client and pg driver.
  // Without this, Turbopack loses the .prisma/client/default module reference during SSR.
  serverExternalPackages: ["@prisma/client", "pg"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  async headers() {
    return [
      {
        // Static SVG icons (practice card icons, nav icons, etc.) never
        // change content at a given path — cache them aggressively in the
        // browser so repeat visits to /practice don't re-request them.
        source: "/:path((?:mainicons|icons).*\\.svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
