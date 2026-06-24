import BgImage from '@/components/bg-main-images/bg-images'
import {
	OrganizationJsonLd,
	SiteNavigationJsonLd,
	WebSiteJsonLd,
} from '@/components/seo/json-ld'
import { SiteChrome } from '@/components/site-chrome'
import { getPageSeoConfig } from '@/lib/seo/build-metadata'
import { SITE } from '@/lib/seo/site'
import { Analytics } from '@vercel/analytics/next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Toaster } from 'sonner'
import './globals.css'
import Providers from './providers'

const LOCALES = SITE.locales

export async function generateMetadata({ params }) {
	const { locale } = await params

	if (!LOCALES.includes(locale)) {
		return {}
	}

	const homeConfig = getPageSeoConfig('home', locale)

	return {
		metadataBase: new URL(SITE.baseUrl),
		title: {
			default: homeConfig?.title ?? SITE.name,
			template: `%s | TOSHKENT METROPOLITENI DUK`,
		},
		applicationName: SITE.legalName,
		authors: [
			{
				name: "Toshkent metropoliteni Axborot xavfsizligini ta'minlash va Axborot kamunikatsiyalarini rivojlantirish bo'limi",
			},
		],
		creator: SITE.legalName,
		publisher: SITE.legalName,
		icons: {
			icon: [
				{ url: SITE.logoPath },
				{ url: SITE.logoPath, sizes: '32x32', type: 'image/png' },
				{ url: SITE.logoPath, sizes: '16x16', type: 'image/png' },
			],
			apple: [{ url: SITE.logoPath, sizes: '180x180' }],
		},
		category: 'transportation',
	}
}

export default async function RootLayout({ children, params }) {
	const resolvedParams = await params
	const locale = resolvedParams?.locale

	if (!LOCALES.includes(locale)) notFound()

	const messages = (await import(`../../../messages/${locale}.json`)).default

	return (
		<html lang={locale}>
			<body className='roboto' suppressHydrationWarning={true}>
				<OrganizationJsonLd locale={locale} />
				<WebSiteJsonLd locale={locale} />
				<SiteNavigationJsonLd locale={locale} />
				<Providers>
					<NextIntlClientProvider locale={locale} messages={messages}>
						<BgImage>
							<SiteChrome>{children}</SiteChrome>
							<Toaster position='bottom-right' richColors />
							<Analytics />
						</BgImage>
					</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	)
}
