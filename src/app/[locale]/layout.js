// src/app/[locale]/layout.js

import AIFloatingChat, { MetroChat } from '../../components/Flowechat/FloatingChat'
import RouteLoader from '@/components/route-loader'
import SplashScreen from '@/components/splashScreen/splashScreen'
import Layout from '@/layout/Layout'
import Navbar from '@/shared/Navbar/navbar'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import './globals.css'
import TashkentMetroChat from '../../components/Flowechat/FloatingChat'
import Footer from '@/shared/footer/footer'
import FloatingActionButton from '@/components/ScreenFixsedButton/screenFixedButton'
import BgImage from '@/components/bg-main-images/bg-images'

export const metadata = {
	title: 'Toshkent shahar metropoliteni | Rasmiy veb-sayt',
	description:
		'Toshkent shahar metropolitenining rasmiy veb-sayti. Yo‘nalishlar, tariflar, yangiliklar, xizmatlar va boshqa foydali ma’lumotlar.',
	keywords:
		'Toshkent metro, Toshkent metropoliteni, metro yo‘nalishlari, metro tariflari, metro yangiliklari, metro xizmatlari',
	authors: [{ name: 'Toshkent metropoliteni IT bo‘limi' }],
	creator: 'Toshkent shahar metropoliteni',
	publisher: 'Toshkent shahar metropoliteni',
	metadataBase: new URL('https://toshmetro.uz'),
	openGraph: {
		title: 'Toshkent shahar metropoliteni | Rasmiy veb-sayt',
		description:
			'Toshkent shahar metropolitenining rasmiy veb-sayti. Yo‘nalishlar, tariflar, yangiliklar, xizmatlar va boshqa foydali ma’lumotlar.',
		url: 'https://toshmetro.uz',
		siteName: 'Toshkent shahar metropoliteni',
		images: [
			{
				url: '/logo.png',
				width: 800,
				height: 600,
				alt: 'Toshkent metropoliteni logotipi',
			},
		],
		locale: 'uz_UZ',
		type: 'website',
	},
	icons: {
		icon: '/MetroLogo.png',
	},
};


export default async function RootLayout({ children, params }) {
	const locale = params?.locale;

	if (!['uz', 'ru', 'en'].includes(locale)) notFound();

	const messages = (await import(`../../../messages/${locale}.json`)).default;
	const hideLayout = ['/metro-xaritasis'];

	return (
		<html lang={locale}>
			<body className='roboto'>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<BgImage>
						<RouteLoader />
						<Layout>
							<Navbar />
							<SplashScreen>{children}</SplashScreen>
							<Footer />
							<FloatingActionButton />
						</Layout>
					</BgImage>
				</NextIntlClientProvider>

			</body>
		</html>
	);
}
