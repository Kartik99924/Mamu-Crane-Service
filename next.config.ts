import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP as the fallback. Source files are already WebP, so this
    // mainly buys smaller AVIF variants for browsers that support them.
    formats: ['image/avif', 'image/webp'],
    // Photographs are static and never re-uploaded under the same name.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  // Keeps the "x-powered-by: Next.js" fingerprint out of responses.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // No page here needs a camera, microphone or location.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
