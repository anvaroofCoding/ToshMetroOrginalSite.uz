const LANGUAGES = ['UZ', 'RU', 'EN']
const getMenuItems = t => [
	{
		label: t('map'),
		href: '/metro-xaritasi',
		icon: MapPin,
	},
	{
		label: t('payments'),
		href: '',
		dropdown: true,
		icon: CreditCard,
		dropdownItems: [
			{ label: t('paymentTypes'), href: '/tolov-usullari', icon: CreditCard },
			{ label: t('attoCards'), href: '/atto-kartalar', icon: CreditCard },
			{ label: t('attoApp'), href: '/atto-ilova', icon: Phone },
			{ label: t('palmpay'), href: '/palmpay', icon: Hand },
			{ label: t('facepay'), href: '/facepay', icon: ScanFace },
		],
	},
	{
		label: t('passengers'),
		href: '',
		dropdown: true,
		icon: Users,
		dropdownItems: [
			{
				label: t('metroRules'),
				href: '/foydalanish-qoidalari',
				icon: Info,
			},
			{
				label: t('stateSymbols'),
				href: '/davlat-ramzlari',
				icon: Sparkles,
			},
			{ label: t('contact'), href: '/murojaatlar', icon: Phone },
			{
				label: t('passengerStats'),
				href: '/statistika',
				icon: ChartNoAxesCombined,
			},
		],
	},
	{
		label: t('infoService'),
		href: '',
		dropdown: true,
		icon: ShieldUser,
		dropdownItems: [
			{ label: t('news'), href: '/yangiliklar', icon: Info },
			{ label: t('media'), href: '/mediateka', icon: Film },
		],
	},
	{
		label: t('aboutMetro'),
		href: '',
		dropdown: true,
		icon: Building,
		dropdownItems: [
			{
				label: t('aboutOrganization'),
				href: '/metropoliten-tarixi',
				icon: Building,
			},
			{ label: t('management'), href: '/rahbariyat', icon: Users },
			{
				label: t('structure'),
				href: '/tashkiliy-tuzilma',
				icon: Building,
			},
			{ label: t('vacancies'), href: '/vakansiyalar', icon: Users },
		],
	},
	{
		label: t('genderEquality'),
		href: '',
		dropdown: true,
		icon: UsersRound,
		dropdownItems: [
			{ label: t('generalInfo'), href: '/haqimizda', icon: Info },
			{
				label: t('genderInCountry'),
				href: '/gender-tenglik',
				icon: UsersRound,
			},
			{
				label: t('normativeDocs'),
				href: '/normativ-hujjatlar',
				icon: FileCheck2,
			},
		],
	},
	{
		label: t('contact'),
		href: '',
		dropdown: true,
		icon: Phone,
		dropdownItems: [{ label: t('contact'), href: '/aloqa', icon: Phone }],
	},
]
