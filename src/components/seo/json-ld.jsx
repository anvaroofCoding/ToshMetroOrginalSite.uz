import { SITE } from '@/lib/seo/site'

export function OrganizationJsonLd({ locale = 'uz' }) {
	const descriptions = {
		uz: 'Toshkent metropolitenining rasmiy veb-sayti — yo‘lovchilar uchun xarita, tariflar, yangiliklar va xizmatlar.',
		ru: 'Официальный сайт Ташкентского метрополитена для пассажиров.',
		en: 'Official website of Tashkent Metro for passengers.',
	}

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'GovernmentOrganization',
		name: SITE.legalName,
		alternateName: SITE.name,
		url: SITE.baseUrl,
		logo: `${SITE.baseUrl}${SITE.logoPath}`,
		description: descriptions[locale] ?? descriptions.uz,
		email: SITE.email,
		sameAs: SITE.sameAs,
		areaServed: {
			'@type': 'City',
			name: 'Tashkent',
		},
	}

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}

export function WebSiteJsonLd({ locale = 'uz' }) {
	const names = {
		uz: 'Toshkent metropoliteni rasmiy sayti',
		ru: 'Официальный сайт метрополитена Ташкента',
		en: 'Official Tashkent Metro website',
	}

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: names[locale] ?? names.uz,
		url: `${SITE.baseUrl}/${locale}`,
		inLanguage: locale,
		publisher: {
			'@type': 'Organization',
			name: SITE.legalName,
			logo: `${SITE.baseUrl}${SITE.logoPath}`,
		},
		potentialAction: {
			'@type': 'SearchAction',
			target: `${SITE.baseUrl}/${locale}/yangiliklar?search={search_term_string}`,
			'query-input': 'required name=search_term_string',
		},
	}

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}
