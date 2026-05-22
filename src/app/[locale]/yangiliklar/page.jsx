'use client'

import { loadPage } from '@/lib/load-page'

const NewsMain = loadPage(() => import('./new'))

export default function Page() {
	return <NewsMain />
}
