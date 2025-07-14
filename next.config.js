// next.config.js
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['tashmetro.uz'], // kerakli ruxsat etilgan tashqi rasm domeni
	},
}

module.exports = withNextIntl(nextConfig)
