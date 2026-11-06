import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * The site is exported as static files (`out/`) for GitHub Pages or any
 * static host. Set NEXT_PUBLIC_BASE_PATH when serving from a sub-path
 * (for example "/portfolio" on a project page).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    // Images are pre-sized WebP files; there is no image server on a static host.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
