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
  },

  // External packages that need to be transpiled
  serverExternalPackages: ['react-image-gallery'],

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
};

export default nextConfig;
