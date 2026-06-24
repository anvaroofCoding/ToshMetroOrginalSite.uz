export function stripHtml(text = '') {
	return String(text)
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

export function truncate(text = '', max = 160) {
	if (text.length <= max) return text
	return `${text.slice(0, max - 1).trim()}…`
}
