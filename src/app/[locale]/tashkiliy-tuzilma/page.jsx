'use client'

import { loadPage } from '@/lib/load-page'

const TransportDirectory = loadPage(() => import('./tarkib'))

export default function Page() {
	return <TransportDirectory />
}
