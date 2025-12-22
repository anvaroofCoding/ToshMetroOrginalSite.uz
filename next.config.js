const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Xatolarni aniqlash va dev-time warning
  compress: true, // Gzip/Brotli bilan response siqish
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tashmetro.uz", pathname: "/**" },
      { protocol: "https", hostname: "atto.uz", pathname: "/**" },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "api.logobank.uz", pathname: "/**" },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "images.seeklogo.com", pathname: "/**" },
      { protocol: "https", hostname: "e7.pngegg.com", pathname: "/**" },
      { protocol: "https", hostname: "by.visa.com", pathname: "/**" },
      { protocol: "https", hostname: "1000logos.net", pathname: "/**" },
      { protocol: "https", hostname: "cdn6.aptoide.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "metro-site.onrender.com",
        pathname: "/media/news_images/**",
      },
      { protocol: "https", hostname: "mintrans.uz", pathname: "/**" },
      { protocol: "https", hostname: "urdu.uz", pathname: "/**" },
      {
        protocol: "https",
        hostname: "yt3.googleusercontent.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "i.pinimg.com", pathname: "/**" },
      { protocol: "https", hostname: "media.zenfs.com", pathname: "/**" },

      // 🆕 Qo‘shildi: back.uzmetro.uz domeni
      {
        protocol: "https",
        hostname: "back.uzmetro.uz",
        pathname: "/media/news_images/**",
      },
    ],
    unoptimized: false, // Next.js image optimization
  },

  experimental: {
    esmExternals: true, // Modul importlarini tezlashtiradi
    scrollRestoration: true, // Scroll tezroq ishlaydi
  },
};

module.exports = withNextIntl(nextConfig);
