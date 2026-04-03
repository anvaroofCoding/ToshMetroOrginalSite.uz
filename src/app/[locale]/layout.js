import FloatingActionButton from '@/components/ScreenFixsedButton/screenFixedButton'
import BgImage from '@/components/bg-main-images/bg-images'
import RouteLoader from '@/components/route-loader'
import Layout from '@/layout/Layout'
import Navbar from '@/shared/Navbar/navbar'
import Footer from '@/shared/footer/footer'
import { Analytics } from '@vercel/analytics/next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Toaster } from 'sonner'
import './globals.css'
import Providers from './providers'

const LOCALES = ['uz', 'ru', 'en']
const METADATA_BASE_URL = 'https://uzmetro.uz'
const SITE_TITLE = 'TOSHKENT METROPOLITENI DUK | Rasmiy veb-sayt'
const SITE_DESCRIPTION =
	'Toshkent metropolitenining rasmiy veb-sayti. Metro yo‘nalishlari, tariflar, so‘nggi yangiliklar va yo‘lovchilar uchun foydali xizmatlar haqida to‘liq ma’lumot.'

const OG_LOCALE_MAP = {
	uz: 'uz_UZ',
	ru: 'ru_RU',
	en: 'en_US',
}

export async function generateMetadata({ params }) {
	const resolvedParams = await params
	const locale = resolvedParams?.locale

	if (!LOCALES.includes(locale)) {
		return {}
	}

	return {
		metadataBase: new URL(METADATA_BASE_URL),
		title: {
			default: SITE_TITLE,
			template: `%s | ${SITE_TITLE}`,
		},
		description: SITE_DESCRIPTION,
		applicationName: SITE_TITLE,
		keywords: [
			'Toshkent metro',
			'Toshkent metropoliteni',
			"metro yo'nalishlari",
			'metro tariflari',
			'metro yangiliklari',
			'metro xizmatlari',
			'uzmetro',
			'tashmetro',
			'metro xaritasi',
			'Toshkent metrosi',
			"O'zbekiston metrosi",
			'davlat sayti',
		],
		authors: [
			{
				name: "Toshkent metropoliteni Axborot xavfsizligini ta'minlash va Axborot kamunikatsiyalarini rivojlantirish bo'limi",
			},
		],
		creator: SITE_TITLE,
		publisher: SITE_TITLE,
		alternates: {
			canonical: `/${locale}`,
			languages: {
				uz: '/uz',
				ru: '/ru',
				en: '/en',
				'x-default': '/uz',
			},
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-image-preview': 'large',
				'max-snippet': -1,
				'max-video-preview': -1,
			},
		},
		openGraph: {
			title: SITE_TITLE,
			description: SITE_DESCRIPTION,
			url: `/${locale}`,
			siteName: SITE_TITLE,
			locale: OG_LOCALE_MAP[locale],
			type: 'website',
			images: [
				{
					url: '/logo2.png',
					width: 512,
					height: 512,
					alt: 'Toshkent metropoliteni rasmiy logosi',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: SITE_TITLE,
			description: SITE_DESCRIPTION,
			images: ['/logo2.png'],
		},
		icons: {
			icon: [
				{ url: '/logo2.png' },
				{ url: '/logo2.png', sizes: '32x32', type: 'image/png' },
				{ url: '/logo2.png', sizes: '16x16', type: 'image/png' },
			],
			apple: [{ url: '/logo2.png', sizes: '180x180' }],
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
				<Providers>
					<NextIntlClientProvider locale={locale} messages={messages}>
						<BgImage>
							<RouteLoader />
							<Layout>
								<Navbar />
								{children}
								<Toaster position='bottom-right' richColors />
								<Analytics />
								<Footer />
								<FloatingActionButton />
							</Layout>
						</BgImage>
					</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	)
}
