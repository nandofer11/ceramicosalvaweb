/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones para desarrollo
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuraciones para evitar recompilaciones innecesarias
  experimental: {
    // Habilita Fast Refresh optimizado
    esmExternals: 'loose',
  },
  
  // Configuración de compilación
  compiler: {
    // Remover console.log en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de imágenes
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Headers de optimización
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
    ];
  },
  
  // Webpack optimizaciones
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Configuraciones específicas para desarrollo
      config.watchOptions = {
        poll: 1000, // Verificar cambios cada segundo
        aggregateTimeout: 300, // Retrasar la reconstrucción
        ignored: [
          '**/node_modules',
          '**/.next',
          '**/dist',
          '**/.git',
        ],
      };
    }
    
    return config;
  },
};

// Configuración específica para exportación estática
if (process.env.NODE_ENV === 'production') {
  nextConfig.output = 'export';
  nextConfig.distDir = 'dist';
  nextConfig.images = {
    unoptimized: true,
  };
  nextConfig.poweredByHeader = false;
  nextConfig.compress = true;
  
  // Configurar trailing slash para mejor compatibilidad
  nextConfig.trailingSlash = false;
  
  // Generar archivos estáticos para cada ruta
  nextConfig.generateStaticParams = async () => {
    return [
      { slug: [''] },
      { slug: ['cotizacion'] },
      { slug: ['empresa'] },
      { slug: ['productos'] },
      { slug: ['contacto'] }
    ];
  };
}

module.exports = nextConfig;

module.exports = nextConfig 