import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
