import FloatingActionButton from "@/components/ScreenFixsedButton/screenFixedButton";
import BgImage from "@/components/bg-main-images/bg-images";
import RouteLoader from "@/components/route-loader";
import Layout from "@/layout/Layout";
import Navbar from "@/shared/Navbar/navbar";
import Footer from "@/shared/footer/footer";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Toshkent metropoliten DUK | Rasmiy veb-sayt",
  description:
    "Toshkent metropolitenining rasmiy veb-sayti. Metro yo‘nalishlari, tariflar, so‘nggi yangiliklar va yo‘lovchilar uchun foydali xizmatlar haqida to‘liq ma’lumot.",
  keywords:
    "Toshkent metro, Toshkent metropoliteni, metro yo‘nalishlari, metro tariflari, metro yangiliklari, metro xizmatlari, tashmetro.uz, tashmetro, metropoliten, metro, uzmetro, metro xatitasi, metro haqida, tash metro haqida, uzbekiston gerbi, o'zbekiston metrosi, o'zmetro, o'zbekiston metrosi, tashkent metrosi, toshkent metrosi, metro rasmiy sayti, asia metro, osiyoda yagona eng katta metro, toshkent metro, kosmonavtlar bekati, chilonzor metrosi, olmazor metrosi",
  authors: [
    {
      name: "Toshkent metropoliteni Axborot xavfsizligini ta'minlash va Axborot kamunikatsiyalarini rivojlantirish bo'limi",
    },
  ],
  creator: "Toshkent metropoliten DUK | Rasmiy veb-sayt",
  publisher: "Toshkent metropoliten DUK | Rasmiy veb-sayt",
  metadataBase: new URL("https://uzmetro.uz"),
  openGraph: {
    title: "Toshkent metropoliten DUK | Rasmiy veb-sayt",
    description:
      "Toshkent shahar metropolitenining rasmiy veb-sayti. Yo‘nalishlar, tariflar, yangiliklar, xizmatlar va boshqa foydali ma’lumotlar.",
    url: "https://uzmetro.uz",
    siteName: "Toshkent metropoliten DUK | Rasmiy veb-sayt",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Toshkent metropoliten DUK | Rasmiy veb-sayt logosi",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },

  icons: {
    icon: [
      { url: "/logo2.png" },
      { url: "/logo2.pngg", sizes: "32x32", type: "image/png" },
      { url: "/logo2.png", sizes: "16x16", type: "image/png" },
    ],
    Logos: [{ url: "/logo2.png", sizes: "180x180" }],
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
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <BgImage>
              <RouteLoader />
              <Layout>
                <Navbar />
                {children}
                <Toaster position="bottom-right" richColors />
                <Analytics />
                <Footer />
                <FloatingActionButton />
              </Layout>
            </BgImage>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
