'use client'

import FloatingActionButton from '@/components/ScreenFixsedButton/screenFixedButton'
import { GlobalPageLoading } from '@/components/page-loading'
import { NavigationShell } from '@/components/navigation-shell'
import Footer from '@/shared/footer/footer'
import Navbar from '@/shared/Navbar/navbar'
import { isMinimalLayoutPath } from '@/lib/minimal-layout-paths'
import { usePathname } from '@/i18n/navigation'

export function SiteChrome({ children }) {
	const pathname = usePathname()
	const hideChrome = isMinimalLayoutPath(pathname)

	if (hideChrome) {
		return (
			<>
				<GlobalPageLoading />
				{children}
			</>
		)
	}

	return (
		<div className='flex min-h-screen flex-col'>
			<GlobalPageLoading />
			<Navbar />
			<NavigationShell>{children}</NavigationShell>
			<Footer />
			<FloatingActionButton />
		</div>
	)
}
