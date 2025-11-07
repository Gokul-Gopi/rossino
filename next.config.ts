import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: {
    position: "bottom-right",
  },
  images: {
    domains: ["www.google.com", "open.spotify.com", "www.youtube.com"],
  },
};

export default nextConfig;
