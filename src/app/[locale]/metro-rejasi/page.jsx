'use client'

import { loadPage } from '@/lib/load-page'

const TashkentMetroMap = loadPage(() => import('./newMapMertopoliten'))

export default function Page() {
	return <TashkentMetroMap />
}
