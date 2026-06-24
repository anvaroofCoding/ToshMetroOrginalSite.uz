import {
	CONTACT_INFO,
	getContactOpeningHoursSpecification,
	getContactPostalAddress,
} from '@/lib/contact-info'
import { getPageSeoConfig } from '@/lib/seo/build-metadata'
import { NAV_ROUTE_SEGMENTS } from '@/lib/seo/nav-routes'
import { SITE } from '@/lib/seo/site'
import { stripHtml } from '@/lib/seo/text-utils'

function JsonLdScript({ schema }) {
	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}

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
		email: CONTACT_INFO.emails,
		telephone: [
			CONTACT_INFO.receptionPhone.tel,
			CONTACT_INFO.inquiriesPhone.tel,
		],
		address: getContactPostalAddress(),
		openingHoursSpecification: getContactOpeningHoursSpecification(),
		sameAs: SITE.sameAs,
		areaServed: {
			'@type': 'City',
			name: 'Tashkent',
		},
	}

	return <JsonLdScript schema={schema} />
}

const CONTACT_PAGE_NAMES = {
	uz: "Bog'lanish ma'lumotlari — Toshkent metropoliteni",
	ru: 'Контактная информация — Ташкентский метрополитен',
	en: 'Contact information — Tashkent Metro',
}

export function ContactPageJsonLd({ locale = 'uz' }) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: CONTACT_PAGE_NAMES[locale] ?? CONTACT_PAGE_NAMES.uz,
		url: `${SITE.baseUrl}/${locale}/aloqa`,
		inLanguage: locale,
		mainEntity: {
			'@type': 'GovernmentOrganization',
			name: SITE.legalName,
			alternateName: SITE.name,
			url: SITE.baseUrl,
			logo: `${SITE.baseUrl}${SITE.logoPath}`,
			email: CONTACT_INFO.emails,
			telephone: [
				CONTACT_INFO.receptionPhone.tel,
				CONTACT_INFO.inquiriesPhone.tel,
			],
			address: getContactPostalAddress(),
			openingHoursSpecification: getContactOpeningHoursSpecification(),
		},
	}

	return <JsonLdScript schema={schema} />
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

	return <JsonLdScript schema={schema} />
}

/** Navbar sahifalari — Google sitelinklar uchun SiteNavigationElement */
export function SiteNavigationJsonLd({ locale = 'uz' }) {
	const elements = NAV_ROUTE_SEGMENTS.map(({ path }, index) => {
		const seo = getPageSeoConfig(path, locale)
		return {
			'@type': 'SiteNavigationElement',
			position: index + 1,
			name: seo?.title ?? path,
			description: seo?.description,
			url: `${SITE.baseUrl}/${locale}/${path}`,
		}
	})

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name:
			locale === 'ru'
				? 'Навигация сайта Ташкентского метрополитена'
				: locale === 'en'
					? 'Tashkent Metro site navigation'
					: 'Toshkent metropoliteni sayt navigatsiyasi',
		itemListElement: elements.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item,
		})),
	}

	return <JsonLdScript schema={schema} />
}

export function ItemListJsonLd({ items = [], locale, segment, listName }) {
	if (!items?.length) return null

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: listName,
		url: `${SITE.baseUrl}/${locale}/${segment}`,
		numberOfItems: items.length,
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url: `${SITE.baseUrl}/${locale}/${segment}/${item.id}`,
			name: item.title,
			description: stripHtml(item.description || ''),
		})),
	}

	return <JsonLdScript schema={schema} />
}

export function NewsArticleJsonLd({ data, locale, segment = 'yangiliklar' }) {
	if (!data?.title) return null

	const image = data?.images?.[0]?.image
	const body = stripHtml(
		[data.description, data.fullContent, data.content]
			.filter(Boolean)
			.join(' '),
	)

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		headline: data.title,
		description: stripHtml(data.description || data.title),
		articleBody: body,
		datePublished: data.publishedAt || undefined,
		dateModified: data.updatedAt || data.publishedAt || undefined,
		inLanguage: locale,
		url: `${SITE.baseUrl}/${locale}/${segment}/${data.id}`,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE.baseUrl}/${locale}/${segment}/${data.id}`,
		},
		publisher: {
			'@type': 'Organization',
			name: SITE.legalName,
			logo: {
				'@type': 'ImageObject',
				url: `${SITE.baseUrl}${SITE.logoPath}`,
			},
		},
		...(image
			? {
					image: {
						'@type': 'ImageObject',
						url: image,
					},
				}
			: {}),
	}

	return <JsonLdScript schema={schema} />
}

export function MediaGalleryJsonLd({ photos = [], videos = [], locale }) {
	const elements = [
		...photos.map((photo, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'ImageObject',
				name: photo.title,
				contentUrl: photo.src,
				description: photo.category,
			},
		})),
		...videos.map((video, index) => ({
			'@type': 'ListItem',
			position: photos.length + index + 1,
			item: {
				'@type': 'VideoObject',
				name: video.title,
				description: video.category,
				thumbnailUrl: video.thumbnail,
				contentUrl: video.url,
			},
		})),
	]

	if (!elements.length) return null

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Toshkent metropoliteni mediateka',
		url: `${SITE.baseUrl}/${locale}/mediateka`,
		numberOfItems: elements.length,
		itemListElement: elements,
	}

	return <JsonLdScript schema={schema} />
}
