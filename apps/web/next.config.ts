import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Silence "inferred workspace root" warnings in monorepos by telling Next
  // where the root of the repo is for output file tracing.
  outputFileTracingRoot: path.join(__dirname, "../../.."),
  
  // Ensure proper dependency resolution in monorepo for API routes
  experimental: {
    outputFileTracingIncludes: {
      '/api/**': ['./node_modules/**'],
    },
  },
  
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
