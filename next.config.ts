import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.INTERNAL_ALLOWED_DEV_ORIGINS?.split(",") || [],
};

export default nextConfig;
