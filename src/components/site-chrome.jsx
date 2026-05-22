'use client'

import FloatingActionButton from '@/components/ScreenFixsedButton/screenFixedButton'
import { NavigationShell } from '@/components/navigation-shell'
import Footer from '@/shared/footer/footer'
import Navbar from '@/shared/Navbar/navbar'
import { isMinimalLayoutPath } from '@/lib/minimal-layout-paths'
import { usePathname } from '@/i18n/navigation'

export function SiteChrome({ children }) {
	const pathname = usePathname()
	const hideChrome = isMinimalLayoutPath(pathname)

	if (hideChrome) {
		return <>{children}</>
	}

	return (
		<div className='flex min-h-screen flex-col'>
			<Navbar />
			<NavigationShell>{children}</NavigationShell>
			<Footer />
			<FloatingActionButton />
		</div>
	)
}
