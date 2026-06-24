'use client'

import { pageLoadingStore } from '@/components/page-loading'
import { cn } from '@/lib/utils'
import { usePathname } from '@/i18n/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const MIN_LOADING_MS = 280
const MAX_LOADING_MS = 5000
const LOCALES = new Set(['uz', 'ru', 'en'])

function normalizeAppPath(pathname) {
	if (!pathname) return '/'

	const path = pathname.startsWith('/') ? pathname : `/${pathname}`
	const parts = path.split('/').filter(Boolean)

	if (parts.length > 0 && LOCALES.has(parts[0])) {
		const rest = parts.slice(1).join('/')
		return rest ? `/${rest}` : '/'
	}

	return path
}

function isInternalNavLink(anchor, currentPath) {
	if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
		return false
	}

	const href = anchor.getAttribute('href')
	if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
		return false
	}

	try {
		const next = new URL(href, window.location.href)
		if (next.origin !== window.location.origin) return false

		return normalizeAppPath(next.pathname) !== normalizeAppPath(currentPath)
	} catch {
		return false
	}
}

export function NavigationShell({ children, className }) {
	const pathname = usePathname()
	const currentPath = normalizeAppPath(pathname)
	const [loading, setLoading] = useState(false)
	const hideTimer = useRef(null)
	const safetyTimer = useRef(null)
	const startedAt = useRef(0)
	const isFirstPath = useRef(true)
	const loadingActive = useRef(false)

	const clearTimers = useCallback(() => {
		if (hideTimer.current) {
			clearTimeout(hideTimer.current)
			hideTimer.current = null
		}
		if (safetyTimer.current) {
			clearTimeout(safetyTimer.current)
			safetyTimer.current = null
		}
	}, [])

	const forceStop = useCallback(() => {
		clearTimers()
		loadingActive.current = false
		setLoading(false)
	}, [clearTimers])

	const stopLoading = useCallback(() => {
		if (!loadingActive.current) return

		const elapsed = Date.now() - startedAt.current
		const remain = Math.max(0, MIN_LOADING_MS - elapsed)

		if (hideTimer.current) clearTimeout(hideTimer.current)
		hideTimer.current = setTimeout(() => {
			forceStop()
		}, remain)
	}, [forceStop])

	const startLoading = useCallback(() => {
		clearTimers()
		startedAt.current = Date.now()
		loadingActive.current = true
		setLoading(true)

		safetyTimer.current = setTimeout(() => {
			forceStop()
		}, MAX_LOADING_MS)
	}, [clearTimers, forceStop])

	useEffect(() => {
		const onClick = e => {
			if (!isInternalNavLink(e.target.closest('a[href]'), currentPath)) return
			startLoading()
		}

		document.addEventListener('click', onClick, true)
		return () => document.removeEventListener('click', onClick, true)
	}, [currentPath, startLoading])

	useEffect(() => {
		if (isFirstPath.current) {
			isFirstPath.current = false
			return
		}

		stopLoading()
	}, [currentPath, stopLoading])

	useEffect(() => {
		if (!loading) return
		return pageLoadingStore.acquire()
	}, [loading])

	useEffect(() => () => forceStop(), [forceStop])

	return (
		<div className={cn('relative w-full flex-1', className)}>{children}</div>
	)
}
