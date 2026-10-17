import type { NextConfig } from "next";

const nextConfig = {
  output: 'export', // Enables the static exports feature
  images: {
    unoptimized: true, // Required if using Next.js <Image /> component in static exports
  },
};

module.exports = nextConfig;

export default nextConfig;
