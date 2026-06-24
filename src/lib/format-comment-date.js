function parseCommentDate(raw) {
	if (raw == null || raw === '') return null

	if (typeof raw === 'number') {
		const ms = raw < 1e12 ? raw * 1000 : raw
		const date = new Date(ms)
		return Number.isNaN(date.getTime()) ? null : date
	}

	if (typeof raw === 'string') {
		const isoLike = raw.match(
			/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/,
		)
		if (isoLike) {
			const [, year, month, day, hour, minute] = isoLike
			const date = new Date(
				Number(year),
				Number(month) - 1,
				Number(day),
				Number(hour),
				Number(minute),
			)
			return Number.isNaN(date.getTime()) ? null : date
		}
	}

	const date = new Date(raw)
	return Number.isNaN(date.getTime()) ? null : date
}

export function getCommentDateValue(comment) {
	if (!comment) return null

	return (
		comment.created_at ??
		comment.createdAt ??
		comment.timestamp ??
		comment.date ??
		comment.published_at ??
		comment.publishedAt ??
		null
	)
}

export function getCommentAuthor(comment) {
	if (!comment) return ''

	return (
		comment.author ??
		comment.user_name ??
		comment.username ??
		comment.full_name ??
		comment.name ??
		''
	)
}

function formatAbsolute(date) {
	const pad = n => String(n).padStart(2, '0')
	return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function formatCommentDate(raw) {
	const date = parseCommentDate(raw)
	if (!date) return ''

	return formatAbsolute(date)
}
