import { SITE } from '@/lib/seo/site'

const LOCALES = SITE.locales

const STATIC_ROUTES = [
	{ path: '', priority: 1, changeFrequency: 'daily' },
	{ path: 'metro-xaritasi', priority: 0.95, changeFrequency: 'weekly' },
	{ path: 'tolov-usullari', priority: 0.9, changeFrequency: 'weekly' },
	{ path: 'yangiliklar', priority: 0.9, changeFrequency: 'daily' },
	{ path: 'murojaatlar', priority: 0.85, changeFrequency: 'weekly' },
	{ path: 'statistika', priority: 0.8, changeFrequency: 'weekly' },
	{ path: 'tenderlar', priority: 0.8, changeFrequency: 'daily' },
	{ path: 'korrupsiya', priority: 0.75, changeFrequency: 'weekly' },
	{ path: 'metro-rejasi', priority: 0.75, changeFrequency: 'monthly' },
	{ path: 'atto-kartalar', priority: 0.75, changeFrequency: 'monthly' },
	{ path: 'atto-ilova', priority: 0.7, changeFrequency: 'monthly' },
	{ path: 'facepay', priority: 0.7, changeFrequency: 'monthly' },
	{ path: 'palmpay', priority: 0.7, changeFrequency: 'monthly' },
	{ path: 'foydalanish-qoidalari', priority: 0.7, changeFrequency: 'monthly' },
	{ path: 'davlat-ramzlari', priority: 0.65, changeFrequency: 'yearly' },
	{ path: 'mediateka', priority: 0.65, changeFrequency: 'weekly' },
	{ path: 'metropoliten-tarixi', priority: 0.65, changeFrequency: 'yearly' },
	{ path: 'rahbariyat', priority: 0.6, changeFrequency: 'monthly' },
	{ path: 'tashkiliy-tuzilma', priority: 0.6, changeFrequency: 'monthly' },
	{ path: 'vakansiyalar', priority: 0.7, changeFrequency: 'daily' },
	{ path: 'haqimizda', priority: 0.55, changeFrequency: 'monthly' },
	{ path: 'gender-tenglik', priority: 0.55, changeFrequency: 'monthly' },
	{ path: 'normativ-hujjatlar', priority: 0.55, changeFrequency: 'monthly' },
	{ path: 'ai-yordamchi', priority: 0.6, changeFrequency: 'monthly' },
	{ path: 'aloqa', priority: 0.8, changeFrequency: 'monthly' },
]

export default function sitemap() {
	const now = new Date()

	return LOCALES.flatMap(locale =>
		STATIC_ROUTES.map(({ path, priority, changeFrequency }) => {
			const urlPath = path ? `/${locale}/${path}` : `/${locale}`

			return {
				url: `${SITE.baseUrl}${urlPath}`,
				lastModified: now,
				changeFrequency,
				priority,
			}
		}),
	)
}
