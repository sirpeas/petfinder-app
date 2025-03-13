import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudfront.net', // Allows any CloudFront subdomain
      },
    ],
  },
};

export default nextConfig;
