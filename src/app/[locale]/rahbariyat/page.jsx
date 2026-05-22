'use client'

import { loadPage } from '@/lib/load-page'

const ManagementPage = loadPage(() => import('./raxbariyat'))

export default function Page() {
	return <ManagementPage />
}
