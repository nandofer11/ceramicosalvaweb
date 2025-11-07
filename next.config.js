/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Mantiene consola fuera del build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configuración de imágenes (esto está bien)
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // REQUIRED para SSR con API
  output: 'standalone',

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },

  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
