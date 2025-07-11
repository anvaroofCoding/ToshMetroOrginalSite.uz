import AIFloatingChat from '@/components/Flowechat/FloatingChat'
import RouteLoader from '@/components/route-loader'
import SplashScreen from '@/components/splashScreen/splashScreen'
import Layout from '@/layout/Layout'
import Footer from '@/shared/footer/footer'
import Navbar from '@/shared/Navbar/navbar'
import { NextIntlClientProvider, useMessages } from 'next-intl'
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
				url: '/logo.png', // Quyida logoni qanday qo‘shishni ko‘rsataman
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

export default function RootLayout({ children, params: { locale } }) {
	const messages = useMessages()

	if (!['uz', 'en', 'ru'].includes(locale)) notFound()

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<html lang={locale}>
				<body className='roboto'>
					<RouteLoader />
					<Layout>
						<Navbar />
						<SplashScreen>{children}</SplashScreen>
						<Footer />
						<AIFloatingChat />
					</Layout>
				</body>
			</html>
		</NextIntlClientProvider>
	)
}
