const DEFAULT_STATISTICS_ORIGIN = 'https://abbos.uzmetro.uz'

const ALLOWED_LANGS = new Set(['uz', 'ru', 'en'])

export function getStatisticsApiOrigin() {
	const base =
		process.env.NEXT_PUBLIC_STATISTICS_API_ORIGIN ||
		process.env.STATISTICS_API_ORIGIN ||
		DEFAULT_STATISTICS_ORIGIN

	try {
		const url = new URL(base.includes('://') ? base : `https://${base}`)
		return `${url.protocol}//${url.host}`
	} catch {
		return DEFAULT_STATISTICS_ORIGIN
	}
}

export function isValidStatisticsParams(lang, year, quarter) {
	if (!ALLOWED_LANGS.has(lang)) return false
	if (!/^\d{4}$/.test(String(year))) return false
	if (!['1', '2'].includes(String(quarter))) return false
	return true
}

export function getStatisticsApiUrl(lang, year, quarter) {
	return `${getStatisticsApiOrigin()}/api/statistics/${lang}/${year}/${quarter}/`
}

export function getStatisticsProxyPath(lang, year, quarter) {
	return `/api/statistics-proxy/${lang}/${year}/${quarter}`
}
