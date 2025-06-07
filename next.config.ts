import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deshabilita ESLint durante el build en producción
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Deshabilita TypeScript type checking durante el build si es necesario
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;