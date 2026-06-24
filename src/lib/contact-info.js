/** Bog'lanish sahifasi va SEO uchun yagona manba */
export const CONTACT_INFO = {
	streetAddress: "Islom Karimov ko'chasi 16-A",
	addressLocality: 'Toshkent shahri',
	addressRegion: 'Shayxontohur tumani',
	postalCode: '100027',
	addressCountry: 'UZ',
	receptionPhone: {
		tel: '+998712416514',
		display: '+998 (71) 241-65-14',
	},
	inquiriesPhone: {
		tel: '+998712455603',
		display: '+998 (71) 245-56-03',
	},
	emails: ['gup@tashmetro.uz', 'metro@tashmetro.uz'],
	openingHours: {
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
		opens: '08:00',
		closes: '17:00',
	},
	lunchBreak: '12:00-13:00',
}

export function getContactPostalAddress() {
	return {
		'@type': 'PostalAddress',
		streetAddress: CONTACT_INFO.streetAddress,
		addressLocality: CONTACT_INFO.addressLocality,
		addressRegion: CONTACT_INFO.addressRegion,
		postalCode: CONTACT_INFO.postalCode,
		addressCountry: CONTACT_INFO.addressCountry,
	}
}

export function getContactOpeningHoursSpecification() {
	return {
		'@type': 'OpeningHoursSpecification',
		dayOfWeek: CONTACT_INFO.openingHours.days,
		opens: CONTACT_INFO.openingHours.opens,
		closes: CONTACT_INFO.openingHours.closes,
	}
}
