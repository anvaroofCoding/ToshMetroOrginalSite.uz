// src/app/[locale]/layout.js

import FloatingActionButton from "@/components/ScreenFixsedButton/screenFixedButton";
import BgImage from "@/components/bg-main-images/bg-images";
import RouteLoader from "@/components/route-loader";
import Layout from "@/layout/Layout";
import Navbar from "@/shared/Navbar/navbar";
import Footer from "@/shared/footer/footer";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "./globals.css";

export const metadata = {
  title: "Toshkent metropoliteni | Rasmiy veb-sayt",
  description:
    "Toshkent shahar metropolitenining rasmiy veb-sayti. Yo‘nalishlar, tariflar, yangiliklar, xizmatlar va boshqa foydali ma’lumotlar.",
  keywords:
    "Toshkent metro, Toshkent metropoliteni, metro yo‘nalishlari, metro tariflari, metro yangiliklari, metro xizmatlari",
  authors: [{ name: "Toshkent metropoliteni IT bo‘limi" }],
  creator: "Toshkent shahar metropoliteni",
  publisher: "Toshkent shahar metropoliteni",
  metadataBase: new URL("https://uzmetro.uz"),
  openGraph: {
    title: "Toshkent shahar metropoliteni | Rasmiy veb-sayt",
    description:
      "Toshkent shahar metropolitenining rasmiy veb-sayti. Yo‘nalishlar, tariflar, yangiliklar, xizmatlar va boshqa foydali ma’lumotlar.",
    url: "https://uzmetro.uz",
    siteName: "Toshkent shahar metropoliteni",
    images: [
      {
        url: "/logos.png",
        width: 800,
        height: 600,
        alt: "Toshkent metropoliteni logotipi",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  icons: {
    icon: "/logos.png",
  },
};

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;

  if (!["uz", "ru", "en"].includes(locale)) notFound();

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className="roboto">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BgImage>
            <RouteLoader />
            <Layout>
              <Navbar />
              {/* <SplashScreen> */}
              {children}
              <Analytics />
              <Footer />
              <FloatingActionButton />
            </Layout>
          </BgImage>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
