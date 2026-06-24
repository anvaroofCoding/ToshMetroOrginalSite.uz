import { buildPageMetadata } from './build-metadata'
import { stripHtml, truncate } from './text-utils'

const API_BASE =
	process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://88.88.0.151:8090/api'

async function fetchJson(url) {
	const res = await fetch(url, { next: { revalidate: 300 } })
	if (!res.ok) return null
	return res.json()
}

export async function buildNewsArticleMetadata(locale, id) {
	const data = await fetchJson(`${API_BASE}/news/${locale}/${id}`)
	if (!data?.title) {
		return null
	}

	const description = truncate(
		stripHtml(data.description || data.fullContent || data.title),
		160,
	)

	return buildPageMetadata({
		locale,
		pathSegment: `yangiliklar/${id}`,
		title: data.title,
		description,
		keywords: ['metro yangiliklari', data.title, 'Toshkent metropoliteni'],
		image: data?.images?.[0]?.image || undefined,
	})
}

export async function buildTenderMetadata(locale, id) {
	const data = await fetchJson(`${API_BASE}/announcements/${locale}/${id}`)
	if (!data?.title) return null

	return buildPageMetadata({
		locale,
		pathSegment: `tenderlar/${id}`,
		title: data.title,
		description: truncate(stripHtml(data.description || data.fullContent || data.title), 160),
		keywords: ['metro tender', data.title],
		image: data?.images?.[0]?.image || undefined,
	})
}

export async function buildKorrupsiyaMetadata(locale, id) {
	const data = await fetchJson(`${API_BASE}/korrupsiya/${locale}/${id}`)
	if (!data?.title) return null

	return buildPageMetadata({
		locale,
		pathSegment: `korrupsiya/${id}`,
		title: data.title,
		description: truncate(stripHtml(data.description || data.fullContent || data.title), 160),
		keywords: ['korrupsiya', 'metro', data.title],
		image: data?.images?.[0]?.image || undefined,
	})
}
