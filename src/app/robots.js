export default function robots() {
	const baseUrl = 'https://uzmetro.uz'

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/login', '/register'],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	}
}
