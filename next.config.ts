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
  experimental: {
    turbo: {
      rules: {
        '*@components/*': ['app/components/*'],
      },
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': require('path').resolve(__dirname, './app'),
      '@components': require('path').resolve(__dirname, './app/_components'),
      '@services': require('path').resolve(__dirname, './app/_services'),
      '@types': require('path').resolve(__dirname, './app/_types'),
    };
    return config;
  },
};

export default nextConfig;
