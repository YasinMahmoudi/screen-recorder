import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    globalNotFound: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
