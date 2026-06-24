const DEFAULT_API_ORIGIN = 'http://88.88.0.151:8090'

export function getDocumentApiOrigin() {
	const baseUrl =
		process.env.NEXT_PUBLIC_API_BASE_URL ||
		process.env.API_BASE_URL ||
		DEFAULT_API_ORIGIN

	try {
		const url = new URL(baseUrl.includes('://') ? baseUrl : `http://${baseUrl}`)
		return `${url.protocol}//${url.host}`
	} catch {
		return DEFAULT_API_ORIGIN
	}
}

export function isAllowedDocumentUrl(urlString) {
	try {
		const url = new URL(urlString)
		const allowedOrigin = getDocumentApiOrigin()

		if (`${url.protocol}//${url.host}` !== allowedOrigin) return false
		return url.pathname.startsWith('/media/')
	} catch {
		return false
	}
}

export function getDocumentProxyPath(fileUrl) {
	if (!isAllowedDocumentUrl(fileUrl)) return null
	return `/api/document-proxy?url=${encodeURIComponent(fileUrl)}`
}

export function getDocumentProxyAbsoluteUrl(fileUrl, siteOrigin) {
	const path = getDocumentProxyPath(fileUrl)
	if (!path || !siteOrigin) return null
	return `${siteOrigin.replace(/\/$/, '')}${path}`
}
