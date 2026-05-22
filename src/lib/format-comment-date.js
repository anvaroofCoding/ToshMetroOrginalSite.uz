const RELATIVE_LABELS = {
	uz: {
		now: 'Hozir',
		minutes: n => `${n} daqiqa oldin`,
		hours: n => `${n} soat oldin`,
		yesterday: 'Kecha',
	},
	ru: {
		now: 'Сейчас',
		minutes: n => `${n} мин. назад`,
		hours: n => `${n} ч. назад`,
		yesterday: 'Вчера',
	},
	en: {
		now: 'Just now',
		minutes: n => `${n} min ago`,
		hours: n => `${n} h ago`,
		yesterday: 'Yesterday',
	},
}

function parseCommentDate(raw) {
	if (raw == null || raw === '') return null

	if (typeof raw === 'number') {
		const ms = raw < 1e12 ? raw * 1000 : raw
		const date = new Date(ms)
		return Number.isNaN(date.getTime()) ? null : date
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

function formatAbsolute(date, locale) {
	const pad = n => String(n).padStart(2, '0')
	const localeTag =
		locale === 'uz' ? 'uz-UZ' : locale === 'ru' ? 'ru-RU' : 'en-US'

	try {
		return new Intl.DateTimeFormat(localeTag, {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		}).format(date)
	} catch {
		return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`
	}
}

export function formatCommentDate(raw, locale = 'uz') {
	const date = parseCommentDate(raw)
	if (!date) return ''

	const labels = RELATIVE_LABELS[locale] ?? RELATIVE_LABELS.uz
	const diffMs = Date.now() - date.getTime()
	const diffMin = Math.floor(diffMs / 60000)

	if (diffMin < 1) return labels.now
	if (diffMin < 60) return labels.minutes(diffMin)

	const diffHours = Math.floor(diffMin / 60)
	if (diffHours < 24) return labels.hours(diffHours)

	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)
	if (date.toDateString() === yesterday.toDateString()) {
		return labels.yesterday
	}

	return formatAbsolute(date, locale)
}
