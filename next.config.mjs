/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.VIAFERRA_DIST_DIR || process.env.VANTARA_DIST_DIR || '.next',
  images: {
    // This app runs through Next's Node server (not static export). Next 14's
    // bundled Squoosh fallback provides responsive WebP without new packages.
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [360, 390, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

export default nextConfig;
