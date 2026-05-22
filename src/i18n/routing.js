import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["uz", "en", "ru"],
	defaultLocale: "uz",
	// Brauzer tili va cookie asosida til almashtirmaslik — doim o‘zbek tilida ochiladi
	localeDetection: false,
});
