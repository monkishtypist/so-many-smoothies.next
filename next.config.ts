// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Allow Sanity images for development
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    unoptimized: true, // Required for S3 deployments
  },
  output: 'export', // Static export for S3 deployment
  reactStrictMode: true,
};

export default nextConfig;
