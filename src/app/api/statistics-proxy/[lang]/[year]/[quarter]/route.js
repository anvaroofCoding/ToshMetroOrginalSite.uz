import {
	getStatisticsApiOrigin,
	getStatisticsApiUrl,
	isValidStatisticsParams,
} from '@/lib/statistics-proxy'
import { NextResponse } from 'next/server'

export async function GET(_request, { params }) {
	const { lang, year, quarter } = await params

	if (!isValidStatisticsParams(lang, year, quarter)) {
		return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
	}

	try {
		const upstream = await fetch(getStatisticsApiUrl(lang, year, quarter), {
			headers: { Accept: 'application/json' },
			cache: 'no-store',
		})

		if (!upstream.ok) {
			return NextResponse.json(
				{ error: 'Failed to fetch statistics' },
				{ status: upstream.status },
			)
		}

		const data = await upstream.json()

		return NextResponse.json(data, {
			status: 200,
			headers: {
				'Cache-Control': 'private, max-age=300',
			},
		})
	} catch {
		return NextResponse.json(
			{
				error: `Statistics server is unavailable (${getStatisticsApiOrigin()})`,
			},
			{ status: 502 },
		)
	}
}
