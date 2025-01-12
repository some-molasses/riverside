import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  outputFileTracingIncludes: {
    "/api/search/items": ["./**/*.md", "./**/*.json"],
    "/app/work/writing/\\[\\[\\.\\.\\.slug\\]\\]": ["./**/*.md", "./**/*.json"],
  },
};

export default nextConfig;
