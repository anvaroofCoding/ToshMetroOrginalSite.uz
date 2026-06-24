/**
 * Navbar dagi barcha sahifalar — sitemap, SiteNavigationElement va SEO validatsiya uchun.
 * Navbar (navbar.jsx) bilan sinxron bo‘lishi kerak.
 */
export const NAV_ROUTE_SEGMENTS = [
	{ path: 'metro-xaritasi', priority: 0.95, changeFrequency: 'weekly' },
	{ path: 'tolov-usullari', priority: 0.9, changeFrequency: 'weekly' },
	{ path: 'atto-kartalar', priority: 0.85, changeFrequency: 'monthly' },
	{ path: 'atto-ilova', priority: 0.85, changeFrequency: 'monthly' },
	{ path: 'palmpay', priority: 0.85, changeFrequency: 'monthly' },
	{ path: 'facepay', priority: 0.85, changeFrequency: 'monthly' },
	{ path: 'foydalanish-qoidalari', priority: 0.85, changeFrequency: 'monthly' },
	{ path: 'davlat-ramzlari', priority: 0.8, changeFrequency: 'yearly' },
	{ path: 'murojaatlar', priority: 0.85, changeFrequency: 'weekly' },
	{ path: 'statistika', priority: 0.85, changeFrequency: 'weekly' },
	{ path: 'yangiliklar', priority: 0.9, changeFrequency: 'daily' },
	{ path: 'korrupsiya', priority: 0.8, changeFrequency: 'weekly' },
	{ path: 'tenderlar', priority: 0.85, changeFrequency: 'daily' },
	{ path: 'mediateka', priority: 0.8, changeFrequency: 'weekly' },
	{ path: 'metropoliten-tarixi', priority: 0.8, changeFrequency: 'yearly' },
	{ path: 'rahbariyat', priority: 0.75, changeFrequency: 'monthly' },
	{ path: 'tashkiliy-tuzilma', priority: 0.75, changeFrequency: 'monthly' },
	{ path: 'vakansiyalar', priority: 0.8, changeFrequency: 'daily' },
	{ path: 'haqimizda', priority: 0.75, changeFrequency: 'monthly' },
	{ path: 'gender-tenglik', priority: 0.75, changeFrequency: 'monthly' },
	{ path: 'normativ-hujjatlar', priority: 0.75, changeFrequency: 'monthly' },
	{ path: 'biznes-rivojlanish', priority: 0.7, changeFrequency: 'monthly' },
	{ path: 'buxgalteriya-balansi', priority: 0.7, changeFrequency: 'monthly' },
	{ path: 'aloqa', priority: 0.9, changeFrequency: 'monthly' },
]

/** Faqat path segmentlari ro‘yxati */
export const NAV_PATHS = NAV_ROUTE_SEGMENTS.map(({ path }) => path)

/** Navbarda yo‘q, lekin saytda mavjud qo‘shimcha sahifalar */
export const SECONDARY_ROUTE_SEGMENTS = [
	{ path: 'metro-rejasi', priority: 0.7, changeFrequency: 'monthly' },
	{ path: 'ai-yordamchi', priority: 0.6, changeFrequency: 'monthly' },
]

export const ALL_STATIC_ROUTE_SEGMENTS = [
	{ path: '', priority: 1, changeFrequency: 'daily' },
	...NAV_ROUTE_SEGMENTS,
	...SECONDARY_ROUTE_SEGMENTS,
]
