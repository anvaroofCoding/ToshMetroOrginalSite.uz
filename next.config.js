// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'tashmetro.uz',
      'atto.uz',
      'play-lh.googleusercontent.com', // ← bu yerga yangi domen qo‘shildi
	  'api.logobank.uz',
	  'encrypted-tbn0.gstatic.com',
	  "images.seeklogo.com",
	  'e7.pngegg.com'
    ],
  },
};

module.exports = withNextIntl(nextConfig);
