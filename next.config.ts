import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: false,
  images: {
    domains: ["www.google.com", "open.spotify.com", "www.youtube.com"],
  },
};

export default nextConfig;
