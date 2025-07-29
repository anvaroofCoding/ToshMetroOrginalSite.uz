// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tashmetro.uz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'atto.uz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.logobank.uz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.seeklogo.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'e7.pngegg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'by.visa.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '1000logos.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn6.aptoide.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'metro-site.onrender.com',
        pathname: '/media/news_images/**',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
