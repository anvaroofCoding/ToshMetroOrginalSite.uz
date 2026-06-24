import {
	getDocumentApiOrigin,
	isAllowedDocumentUrl,
} from '@/lib/document-proxy'
import { NextResponse } from 'next/server'

export async function GET(request) {
	const fileUrl = request.nextUrl.searchParams.get('url')

	if (!fileUrl) {
		return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
	}

	if (!isAllowedDocumentUrl(fileUrl)) {
		return NextResponse.json({ error: 'URL is not allowed' }, { status: 403 })
	}

	try {
		const upstream = await fetch(fileUrl, {
			headers: {
				Accept: '*/*',
			},
			cache: 'no-store',
		})

		if (!upstream.ok) {
			return NextResponse.json(
				{ error: 'Failed to fetch document' },
				{ status: upstream.status },
			)
		}

		const contentType =
			upstream.headers.get('content-type') || 'application/octet-stream'
		const body = await upstream.arrayBuffer()

		return new NextResponse(body, {
			status: 200,
			headers: {
				'Content-Type': contentType,
				'Content-Disposition': 'inline',
				'Cache-Control': 'private, max-age=3600',
				'X-Content-Type-Options': 'nosniff',
			},
		})
	} catch {
		return NextResponse.json(
			{ error: `Document server is unavailable (${getDocumentApiOrigin()})` },
			{ status: 502 },
		)
	}
}
