const BASE_URL = 'https://uzmetro.uz'
const LOCALES = ['uz', 'ru', 'en']

const STATIC_ROUTES = [
	'',
	'atto-kartalar',
	'atto-ilova',
	'vakansiyalar',
	'aloqa',
	'gender-tenglik',
	'davlat-ramzlari',
	'facepay',
	'korrupsiya',
	'mediateka',
	'statistika',
	'metropoliten-tarixi',
	'metro-xaritasi',
	'foydalanish-qoidalari',
	'normativ-hujjatlar',
	'ai-yordamchi',
	'murojaatlar',
	'metro-rejasi',
	'palmpay',
	'rahbariyat',
	'tashkiliy-tuzilma',
	'tenderlar',
	'tolov-usullari',
	'haqimizda',
	'yangiliklar',
]

export default function sitemap() {
	const now = new Date()

	return LOCALES.flatMap(locale =>
		STATIC_ROUTES.map(route => {
			const path = route ? `/${locale}/${route}` : `/${locale}`

			return {
				url: `${BASE_URL}${path}`,
				lastModified: now,
				changeFrequency: route === '' ? 'daily' : 'weekly',
				priority: route === '' ? 1 : 0.8,
			}
		}),
	)
}
