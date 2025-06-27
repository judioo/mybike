import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable TypeScript type checking in production builds
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint checking in production builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  // Set output to standalone for better Vercel compatibility
  output: 'standalone',

  // Disable static optimization and force dynamic rendering
  experimental: {
    // Disable static optimization completely
    optimizeCss: false,
    // Better handling of ESM packages
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },

  // Only use transpilePackages for client-side rendering
  transpilePackages: ['react-image-gallery'],

  // Configure images to allow external domains if needed
  images: {
    domains: ['localhost', 'placehold.co', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Webpack configuration for handling ESM modules
  webpack: (config, { isServer }) => {
    // Handle ESM modules better
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
    }
    return config;
  },
};

export default nextConfig;
