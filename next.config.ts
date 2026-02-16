import type { NextConfig } from "next";

const itemSources = [
  "./writing-database/**/*.md",
  "./public/**/*.md",
  "./src/app/**/*.md",
  "./**/metadata.json",
  "./**/item-metadata.json",
  "./src/app/search-engine/**/*.json",
];

const nextConfig: NextConfig = {
  /* config options here */

  outputFileTracingIncludes: {
    "/api/search/items": itemSources,
    "/app/work/writing/\\[\\[\\.\\.\\.slug\\]\\]": itemSources,
  },
};

export default nextConfig;
