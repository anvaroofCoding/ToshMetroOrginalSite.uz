// app/loading.js
'use client'

import { Loader2 } from 'lucide-react'

export default function Loading() {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-white/80 z-50'>
			<Loader2 className='w-12 h-12 animate-spin text-blue-700' />
		</div>
	)
}
