'use client'

import { loadPage } from '@/lib/load-page'

const PaymentMethods = loadPage(() => import('./newtolov'))

export default function Page() {
	return (
		<div className='my-10'>
			<PaymentMethods />
		</div>
	)
}
