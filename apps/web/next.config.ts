import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed outputFileTracingRoot - Vercel handles monorepo path resolution automatically
  // when Root Directory is set to "apps/web" in Vercel dashboard settings.
  // This prevents the "path0/path0" double path issue during build traces.
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
