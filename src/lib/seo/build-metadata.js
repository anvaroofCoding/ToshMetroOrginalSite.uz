import { OG_LOCALE, SITE } from './site'
import { PAGE_SEO } from './pages'

const SITE_TITLE_SUFFIX = 'TOSHKENT METROPOLITENI DUK | Rasmiy veb-sayt'

function languageAlternates(pathSegment) {
	const path = pathSegment ? `/${pathSegment}` : ''
	return {
		uz: `/uz${path}`,
		ru: `/ru${path}`,
		en: `/en${path}`,
		'x-default': `/uz${path}`,
	}
}

/**
 * @param {object} options
 * @param {string} options.locale
 * @param {string} [options.pathSegment] — URL segment (masalan: metro-xaritasi)
 * @param {string} [options.title]
 * @param {string} [options.description]
 * @param {string[]} [options.keywords]
 * @param {boolean} [options.noIndex]
 * @param {string} [options.canonicalPath] — to‘liq path: /uz/metro-xaritasi
 * @param {string} [options.image] — OG rasm
 */
export function buildPageMetadata({
	locale,
	pathSegment = '',
	title,
	description,
	keywords = [],
	noIndex = false,
	canonicalPath,
	image = SITE.logoPath,
}) {
	const canonical =
		canonicalPath ??
		(pathSegment ? `/${locale}/${pathSegment}` : `/${locale}`)

	const pageUrl = `${SITE.baseUrl}${canonical}`

	return {
		title,
		description,
		keywords,
		alternates: {
			canonical,
			languages: languageAlternates(pathSegment),
		},
		robots: noIndex
			? { index: false, follow: false }
			: {
					index: true,
					follow: true,
					googleBot: {
						index: true,
						follow: true,
						'max-image-preview': 'large',
						'max-snippet': -1,
						'max-video-preview': -1,
					},
				},
		openGraph: {
			title,
			description,
			url: pageUrl,
			siteName: SITE_TITLE_SUFFIX,
			locale: OG_LOCALE[locale] ?? OG_LOCALE.uz,
			type: 'website',
			images: [
				{
					url: image,
					width: 512,
					height: 512,
					alt: `${title} — ${SITE.name}`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
		},
	}
}

export function getPageSeoConfig(segment, locale) {
	return PAGE_SEO[segment]?.[locale] ?? PAGE_SEO[segment]?.uz ?? null
}

export function metadataFromSegment(segment, locale, overrides = {}) {
	const config = getPageSeoConfig(segment, locale)
	if (!config) return {}

	return buildPageMetadata({
		locale,
		pathSegment: segment,
		title: config.title,
		description: config.description,
		keywords: config.keywords,
		noIndex: config.noIndex,
		...overrides,
	})
}
