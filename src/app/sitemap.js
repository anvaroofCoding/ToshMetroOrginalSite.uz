import { ALL_STATIC_ROUTE_SEGMENTS } from '@/lib/seo/nav-routes'
import { SITE } from '@/lib/seo/site'
import {
	fetchAllKorrupsiyaIds,
	fetchAllNewsIds,
	fetchAllTenderIds,
} from '@/lib/seo/server-api'

const LOCALES = SITE.locales

function staticEntries(now) {
	return LOCALES.flatMap(locale =>
		ALL_STATIC_ROUTE_SEGMENTS.map(({ path, priority, changeFrequency }) => {
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

async function dynamicEntries(now) {
	const entries = []

	try {
		for (const locale of LOCALES) {
			const [newsIds, tenderIds, korrupsiyaIds] = await Promise.all([
				fetchAllNewsIds(locale),
				fetchAllTenderIds(locale),
				fetchAllKorrupsiyaIds(locale),
			])

			for (const id of newsIds) {
				entries.push({
					url: `${SITE.baseUrl}/${locale}/yangiliklar/${id}`,
					lastModified: now,
					changeFrequency: 'weekly',
					priority: 0.7,
				})
			}

			for (const id of tenderIds) {
				entries.push({
					url: `${SITE.baseUrl}/${locale}/tenderlar/${id}`,
					lastModified: now,
					changeFrequency: 'weekly',
					priority: 0.65,
				})
			}

			for (const id of korrupsiyaIds) {
				entries.push({
					url: `${SITE.baseUrl}/${locale}/korrupsiya/${id}`,
					lastModified: now,
					changeFrequency: 'weekly',
					priority: 0.65,
				})
			}
		}
	} catch {
		return entries
	}

	return entries
}

export default async function sitemap() {
	const now = new Date()
	const [staticUrls, dynamicUrls] = await Promise.all([
		Promise.resolve(staticEntries(now)),
		dynamicEntries(now),
	])

	return [...staticUrls, ...dynamicUrls]
}
