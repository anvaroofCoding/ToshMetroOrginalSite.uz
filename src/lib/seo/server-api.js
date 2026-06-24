const API_BASE =
	process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://88.88.0.151:8090/api'

const REVALIDATE = 300

async function fetchJson(url) {
	try {
		const res = await fetch(url, { next: { revalidate: REVALIDATE } })
		if (!res.ok) return null
		return res.json()
	} catch {
		return null
	}
}

async function fetchAllPages(buildUrl) {
	const all = []
	let page = 1
	const pageSize = 100

	while (page <= 50) {
		const data = await fetchJson(buildUrl(page, pageSize))
		const results = data?.results ?? (Array.isArray(data) ? data : [])
		if (!results.length) break
		all.push(...results)
		if (data?.count != null && all.length >= data.count) break
		if (results.length < pageSize) break
		page += 1
	}

	return all
}

export async function fetchNewsList(locale, { search = '', page = 1, pageSize = 12 } = {}) {
	return fetchJson(
		`${API_BASE}/news/${locale}?search=${encodeURIComponent(search)}&page=${page}&page_size=${pageSize}`,
	)
}

export async function fetchNewsDetail(locale, id) {
	return fetchJson(`${API_BASE}/news/${locale}/${id}`)
}

export async function fetchTendersList(locale, { search = '', page = 1, pageSize = 12 } = {}) {
	return fetchJson(
		`${API_BASE}/announcements/${locale}?search=${encodeURIComponent(search)}&page=${page}&page_size=${pageSize}`,
	)
}

export async function fetchTenderDetail(locale, id) {
	return fetchJson(`${API_BASE}/announcements/${locale}/${id}`)
}

export async function fetchKorrupsiyaList(locale, { search = '', page = 1, pageSize = 12 } = {}) {
	return fetchJson(
		`${API_BASE}/korrupsiya/${locale}?search=${encodeURIComponent(search)}&page=${page}&page_size=${pageSize}`,
	)
}

export async function fetchKorrupsiyaDetail(locale, id) {
	return fetchJson(`${API_BASE}/korrupsiya/${locale}/${id}`)
}

export async function fetchMediaPhotos(locale) {
	const data = await fetchJson(`${API_BASE}/media-photos/${locale}`)
	return Array.isArray(data) ? data : data?.results ?? []
}

export async function fetchMediaVideos(locale) {
	const data = await fetchJson(`${API_BASE}/media-videos/${locale}`)
	return Array.isArray(data) ? data : data?.results ?? []
}

export async function fetchAllNewsIds(locale) {
	const items = await fetchAllPages((page, pageSize) =>
		`${API_BASE}/news/${locale}?search=&page=${page}&page_size=${pageSize}`,
	)
	return items.map(item => item.id).filter(Boolean)
}

export async function fetchAllNewsItems(locale) {
	return fetchAllPages((page, pageSize) =>
		`${API_BASE}/news/${locale}?search=&page=${page}&page_size=${pageSize}`,
	)
}

export async function fetchAllTenderIds(locale) {
	const items = await fetchAllPages((page, pageSize) =>
		`${API_BASE}/announcements/${locale}?search=&page=${page}&page_size=${pageSize}`,
	)
	return items.map(item => item.id).filter(Boolean)
}

export async function fetchAllTenderItems(locale) {
	return fetchAllPages((page, pageSize) =>
		`${API_BASE}/announcements/${locale}?search=&page=${page}&page_size=${pageSize}`,
	)
}

export async function fetchAllKorrupsiyaIds(locale) {
	const items = await fetchAllPages((page, pageSize) =>
		`${API_BASE}/korrupsiya/${locale}?search=&page=${page}&page_size=${pageSize}`,
	)
	return items.map(item => item.id).filter(Boolean)
}

export async function fetchAllKorrupsiyaItems(locale) {
	return fetchAllPages((page, pageSize) =>
		`${API_BASE}/korrupsiya/${locale}?search=&page=${page}&page_size=${pageSize}`,
	)
}
