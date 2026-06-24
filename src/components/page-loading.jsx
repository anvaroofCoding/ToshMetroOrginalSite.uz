'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { createPortal } from 'react-dom'
import { useEffect, useState, useSyncExternalStore } from 'react'

const LOADING_Z = 'z-[99999]'

function createPageLoadingStore() {
	let count = 0
	let label = undefined
	const listeners = new Set()

	const notify = () => listeners.forEach(fn => fn())

	return {
		acquire(nextLabel) {
			count++
			if (nextLabel !== undefined) label = nextLabel
			notify()
			return () => {
				count = Math.max(0, count - 1)
				if (count === 0) label = undefined
				notify()
			}
		},
		subscribe(fn) {
			listeners.add(fn)
			return () => listeners.delete(fn)
		},
		getSnapshot() {
			return { active: count > 0, label }
		},
	}
}

export const pageLoadingStore = createPageLoadingStore()

export function PageLoading({ className, label }) {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center gap-3 text-blue-900',
				className,
			)}
		>
			<Loader2
				className='h-10 w-10 animate-spin text-blue-800'
				aria-hidden='true'
			/>
			{label ? (
				<span className='text-sm font-medium text-blue-900/80'>{label}</span>
			) : null}
		</div>
	)
}

export function PageLoadingBar() {
	return (
		<div
			className={cn(
				'pointer-events-none fixed top-0 left-0 h-1 w-full overflow-hidden bg-blue-100/60',
				LOADING_Z,
			)}
		>
			<div className='h-full w-1/3 animate-[loading-bar_0.8s_ease-in-out_infinite] bg-blue-700' />
		</div>
	)
}

/** Bitta global overlay — faqat birinchi marta mount bo‘lganda ko‘rinadi */
export function GlobalPageLoading() {
	const t = useTranslations('menu')
	const [mounted, setMounted] = useState(false)
	const { active, label } = useSyncExternalStore(
		cb => pageLoadingStore.subscribe(cb),
		() => pageLoadingStore.getSnapshot(),
		() => ({ active: false, label: undefined }),
	)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted || !active) return
		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = prev
		}
	}, [mounted, active])

	if (!mounted || !active) return null

	const text = label ?? t('two_hundred_thirteen')

	return createPortal(
		<>
			<PageLoadingBar />
			<div
				className={cn(
					'pointer-events-auto fixed inset-0 flex items-center justify-center bg-white/92 backdrop-blur-[1px]',
					LOADING_Z,
				)}
				role='status'
				aria-live='polite'
				aria-busy='true'
				aria-label={text}
			>
				<PageLoading label={text} />
			</div>
		</>,
		document.body,
	)
}

/** Sahifa yuklanishini global overlay orqali ko‘rsatish (portal emas — bitta nusxa) */
export function PageLoadingOverlay({ label }) {
	useEffect(() => pageLoadingStore.acquire(label), [label])
	return null
}
