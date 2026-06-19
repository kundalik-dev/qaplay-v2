import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.INTERNAL_ALLOWED_DEV_ORIGINS?.split(",") || [],

  // Prisma 7 + Next.js 16 Turbopack: prevent bundling of Prisma client and pg driver.
  // Without this, Turbopack loses the .prisma/client/default module reference during SSR.
  serverExternalPackages: ["@prisma/client", "pg"],
};

export default nextConfig;
