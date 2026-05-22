import { SITE } from '@/lib/seo/site'

const NOINDEX_PATHS = [
	'/uz/kirish',
	'/ru/kirish',
	'/en/kirish',
	'/uz/royxatdan-otish',
	'/ru/royxatdan-otish',
	'/en/royxatdan-otish',
]

export default function robots() {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', ...NOINDEX_PATHS],
		},
		sitemap: `${SITE.baseUrl}/sitemap.xml`,
		host: SITE.baseUrl,
	}
}
