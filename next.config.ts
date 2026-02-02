import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

if (!process.env.SERWIST_SUPPRESS_TURBOPACK_WARNING) {
  process.env.SERWIST_SUPPRESS_TURBOPACK_WARNING = "1";
}

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV !== "production",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
};

export default withSerwist(nextConfig);
