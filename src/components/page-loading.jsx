'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageLoading({ className, label }) {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center gap-3 text-blue-900',
				className,
			)}
			role='status'
			aria-live='polite'
			aria-busy='true'
		>
			<Loader2 className='h-10 w-10 animate-spin text-blue-800' />
			{label ? (
				<span className='text-sm font-medium text-blue-900/80'>{label}</span>
			) : null}
		</div>
	)
}

export function PageLoadingBar() {
	return (
		<div className='pointer-events-none fixed top-0 left-0 z-[9999] h-1 w-full overflow-hidden bg-blue-100/60'>
			<div className='h-full w-1/3 animate-[loading-bar_0.8s_ease-in-out_infinite] bg-blue-700' />
		</div>
	)
}
