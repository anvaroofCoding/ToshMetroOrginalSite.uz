'use client'

import { loadPage } from '@/lib/load-page'

const TashkentMetroMap = loadPage(() => import('./metroxaritasi'))

export default function Page() {
	return <TashkentMetroMap />
}
