'use client'

import dynamic from 'next/dynamic'

function resolveModuleComponent(mod) {
	if (mod?.default && typeof mod.default === 'function') {
		return mod.default
	}

	const named = Object.values(mod).find(value => typeof value === 'function')
	if (named) return named

	throw new Error('loadPage: komponent export topilmadi')
}

/** Sahifa kontenti — loading NavigationShell + loading.js orqali ko'rsatiladi */
export function loadPage(importFn, options = {}) {
	return dynamic(
		() => importFn().then(mod => ({ default: resolveModuleComponent(mod) })),
		{
			loading: () => null,
			...options,
		},
	)
}
