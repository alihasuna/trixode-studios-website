/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize for Vercel
  compress: true,
  poweredByHeader: false,

  // Enable static optimization
  trailingSlash: false,

  // Optimize bundles
  experimental: {
    gzipSize: true,
  },
  turbopack: {
    root: process.cwd(),
  },

  // Security headers (caching is handled by vercel.json)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },

  // Redirect old routes
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/pricing',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
