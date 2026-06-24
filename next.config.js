const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js')

const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true, // Xatolarni aniqlash va dev-time warning
	compress: true, // Gzip/Brotli bilan response siqish
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '88.88.150.151',
				port: '8090',
				pathname: '/media/**',
			},
			{
				protocol: 'http',
				hostname: '88.88.150.151',
				port: '9030',
				pathname: '/media/**',
			},
			{ protocol: 'https', hostname: 'tashmetro.uz', pathname: '/**' },
			{ protocol: 'https', hostname: 'atto.uz', pathname: '/**' },
			{
				protocol: 'https',
				hostname: 'play-lh.googleusercontent.com',
				pathname: '/**',
			},
			{ protocol: 'https', hostname: 'api.logobank.uz', pathname: '/**' },
			{
				protocol: 'https',
				hostname: 'encrypted-tbn0.gstatic.com',
				pathname: '/**',
			},
			{ protocol: 'https', hostname: 'images.seeklogo.com', pathname: '/**' },
			{ protocol: 'https', hostname: 'e7.pngegg.com', pathname: '/**' },
			{ protocol: 'https', hostname: 'by.visa.com', pathname: '/**' },
			{ protocol: 'https', hostname: '1000logos.net', pathname: '/**' },
			{ protocol: 'https', hostname: 'cdn6.aptoide.com', pathname: '/**' },
			{
				protocol: 'https',
				hostname: 'metro-site.onrender.com',
				pathname: '/media/news_images/**',
			},
			{ protocol: 'https', hostname: 'mintrans.uz', pathname: '/**' },
			{ protocol: 'https', hostname: 'urdu.uz', pathname: '/**' },
			{
				protocol: 'https',
				hostname: 'yt3.googleusercontent.com',
				pathname: '/**',
			},
			{ protocol: 'https', hostname: 'i.pinimg.com', pathname: '/**' },
			{ protocol: 'https', hostname: 'media.zenfs.com', pathname: '/**' },

			{
				protocol: 'https',
				hostname: 'abbos.uzmetro.uz',
				pathname: '/media/**',
			},
		],
		// Dev: Node SSL (UNABLE_TO_VERIFY_LEAF_SIGNATURE) — tashqi URL lar brauzerda to'g'ridan-to'g'ri yuklanadi
		unoptimized: isDev,
	},

	experimental: {
		esmExternals: true,
		scrollRestoration: true,
		optimizePackageImports: [
			'lucide-react',
			'@tabler/icons-react',
			'framer-motion',
			'antd',
			'recharts',
		],
		staleTimes: {
			dynamic: 30,
			static: 180,
		},
	},

	async redirects() {
		return [
			{
				source: '/:locale/FacePay',
				destination: '/:locale/facepay',
				permanent: true,
			},
			{
				source: '/FacePay',
				destination: '/uz/facepay',
				permanent: true,
			},
		]
	},
}

module.exports = withNextIntl(nextConfig)
