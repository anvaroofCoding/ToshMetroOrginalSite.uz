'use client'

import { loadPage } from '@/lib/load-page'

const MetroStatisticsDashboard = loadPage(() => import('./newStatis'))

export default function Page() {
	return <MetroStatisticsDashboard />
}
