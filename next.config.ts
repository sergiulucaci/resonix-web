import type { NextConfig } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/audio/:path*",
        destination: `${API_BASE}/audio/:path*`,
      },
    ];
  },
};

export default nextConfig;
