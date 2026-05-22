'use client'

import { loadPage } from '@/lib/load-page'

const MurojaatlaStatistikasi = loadPage(() =>
	import('./murojaatlar-statistikasi'),
)
const MetroLostItemForm = loadPage(() => import('./murojaatlar-uchun'))

export default function Page() {
	return (
		<>
			<MurojaatlaStatistikasi />
			<MetroLostItemForm />
		</>
	)
}
