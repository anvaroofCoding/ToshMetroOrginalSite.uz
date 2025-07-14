// src/app/[locale]/layout.js

import AIFloatingChat from '@/components/Flowechat/FloatingChat'
import RouteLoader from '@/components/route-loader'
import SplashScreen from '@/components/splashScreen/splashScreen'
import Layout from '@/layout/Layout'
import Footer from '@/shared/footer/footer'
import Navbar from '@/shared/Navbar/navbar'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import './globals.css'

export const metadata = {
	title: '"TOSHKENT METROPOLITENI" DUK | Rasmiy veb-sayt',
	description:
		'Toshkent metropolitenining rasmiy veb-sayti: yo‘nalishlar, tariflar, yangiliklar va ko‘proq ma’lumot.',
	keywords:
		'Toshkent metro, Toshkent metropoliteni, metro yo‘nalishlari, metro tariflar, metro yangiliklar',
	authors: [{ name: 'Toshkent Metropoliteni IT bo‘limi' }],
	creator: 'Toshkent Metropoliteni',
	publisher: 'Toshkent Metropoliteni',
	metadataBase: new URL('https://toshmetro.uz'),
	openGraph: {
		title: '"TOSHKENT METROPOLITENI" DUK | Rasmiy veb-sayt',
		description:
			'Toshkent metropolitenining rasmiy veb-sayti: yo‘nalishlar, tariflar, yangiliklar va ko‘proq ma’lumot.',
		url: 'https://toshmetro.uz',
		siteName: 'Toshkent Metropoliteni',
		images: [
			{
				url: '/logo.png',
				width: 800,
				height: 600,
				alt: 'Toshkent Metropoliteni Logosi',
			},
		],
		locale: 'uz_UZ',
		type: 'website',
	},
	icons: {
		icon: '/MetroLogo.png',
	},
}

export async function generateStaticParams() {
	return [{ locale: 'uz' }, { locale: 'ru' }, { locale: 'en' }]
}

export default async function RootLayout(props) {
	const locale = props.params?.locale // ✅ to‘g‘ri usul

	if (!['uz', 'ru', 'en'].includes(locale)) notFound()

	const messages = (await import(`../../../messages/${locale}.json`)).default

	return (
		<html lang={locale}>
			<body className='roboto'>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<RouteLoader />
					<Layout>
						<Navbar />
						<SplashScreen>{props.children}</SplashScreen>
						<Footer />
						<AIFloatingChat />
					</Layout>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
