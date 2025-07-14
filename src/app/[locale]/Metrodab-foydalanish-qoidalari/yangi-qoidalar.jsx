'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
	AlertTriangle,
	CheckCircle,
	Clock,
	FileText,
	Home,
	Scale,
	Shield,
	Train,
	UserCheck,
	Users,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function MetroRegulations2() {
	const [visibleSections, setVisibleSections] = useState(new Set())

	const sectionRefs = useRef([])

	const allSections = [
		{
			id: 1,
			number: '1',
			title: 'Umumiy qoidalar - 1-bob',
			icon: <Home className='w-6 h-6' />,
			color: 'from-blue-600 to-blue-700',
			content:
				"Ushbu Qoidalar metropolitenda yo'lovchilar hamda boshqa shaxslarning (metropoliten xodimlari, metropolitenda o'z xizmat vazifasini bajaruvchi ichki ishlar organlari va O'zbekiston Respublikasi Favqulodda vaziyatlar vazirligi xodimlari hamda metropoliten rahbariyatining ruxsati bilan tashrif buyuruvchi shaxslar) bo'lishi, ularning huquq va majburiyatlarini, shuningdek, metropolitendan foydalanish tartibini belgilaydi.",
		},
		{
			id: 2,
			number: '2',
			title: 'Asosiy tushunchalar',
			icon: <FileText className='w-6 h-6' />,
			color: 'from-indigo-600 to-indigo-700',
			content:
				'Ushbu Qoidalarda quyidagi asosiy tushunchalardan foydalaniladi:',
			definitions: [
				'bekat platformasi — bekatdagi poyezdlarni kutish joyi;',
				"yo'l chiptasi — metropolitendan foydalanish uchun QR-kodli bir martalik yo'l haqi to'lovi amalga oshirilganligini tasdiqlovchi hujjat;",
				"yo'lovchi — metropolitendan foydalanish uchun to'lovni amalga oshirgan yoki imtiyozga hamda bepul yurish huquqiga ega bo'lgan shaxs (iste'molchi);",
				"ko'zdan kechirish — metropolitenda xavfsizlikni ta'minlash maqsadida tashish va foydalanish taqiqlangan moddalar va buyumlarni aniqlash uchun mo'ljallangan, maxsus texnik vositalarni qo'llagan holda amalga oshiriladigan tadbirlar majmui;",
				"metropoliten xodimi — metropolitenda faoliyat olib boruvchi va yo'lovchilarga xizmat ko'rsatuvchi xodim (bekat navbatchisi, mashinist va boshqalar);",
			],
		},
		{
			id: 3,
			number: '3',
			title: 'Shartnoma tasdiqlanishi',
			icon: <CheckCircle className='w-6 h-6' />,
			color: 'from-green-600 to-green-700',
			content:
				"Metropolitenda yo'lovchining bo'lishi va uning yukini tashish shartnomasi tuzilganligi yo'l chiptasi orqali yoki imtiyozga hamda bepul yurish huquqiga ega bo'lgan shaxslarning tegishli hujjatini ko'rsatishi bilan tasdiqlanadi.",
		},
		{
			id: 4,
			number: '4',
			title: 'Xavfsiz harakatlanish',
			icon: <Shield className='w-6 h-6' />,
			color: 'from-emerald-600 to-emerald-700',
			content:
				"Metropolitenda yo'lovchilarning xavfsiz va qulay harakatlanishi ta'minlanadi.",
		},
		{
			id: 5,
			number: '5',
			title: 'Xavfsizlik talablari - 2-bob',
			icon: <Shield className='w-6 h-6' />,
			color: 'from-red-600 to-red-700',
			content:
				"Metropolitenda harakatlanish davomida metropoliten xodimlari va yo'lovchilar ogoh, hushyor va e'tiborli bo'lishi lozim.",
		},
		{
			id: 6,
			number: '6',
			title: 'Shubhali ashyolar haqida xabar berish',
			icon: <AlertTriangle className='w-6 h-6' />,
			color: 'from-orange-600 to-orange-700',
			content:
				"O'tish yo'llari, vestibyullar, bekat platformasi va vagonlarda shubhali va qoldirilgan ashyolar (buyumlar) aniqlanganda, metropolitenning navbatchi xodimlariga yoki ichki ishlar organlari xodimlariga xabar berilishi lozim.",
		},
		{
			id: 7,
			number: '7',
			title: "Qoldirilgan ashyolarga ta'sir qilish taqiqi",
			icon: <AlertTriangle className='w-6 h-6' />,
			color: 'from-red-700 to-red-800',
			content:
				"Qoldirilgan ashyoga (buyumga) biron-bir mexanik ta'sir ko'rsatish (boshqa joyga olib o'tish, ochish va boshqalar), uning atrofidagi yorug'likni, haroratni va tovushni o'zgartirish hamda ashyo yaqinida radioelektr uskunalaridan, shuningdek, aloqa vositalaridan foydalanish qat'iyan man etiladi.",
		},
		{
			id: 8,
			number: '8',
			title: "Ko'zdan kechirish tartibi",
			icon: <Shield className='w-6 h-6' />,
			color: 'from-purple-600 to-purple-700',
			content:
				"Yo'lovchilar va boshqa shaxslar ichki ishlar organlari xodimlarining qonuniy talabiga asosan yuklarini ko'zdan kechirish uchun taqdim etadi. Bunda qidiruvdagi shaxslar deb gumon qilingan yoki ko'zdan kechirish jarayonida o'zini shubhali tutayotgan shaxslar qonunchilikda belgilangan tartibda shaxsiy ko'zdan kechirilishi mumkin.",
		},
		{
			id: 9,
			number: '13',
			title: 'Favqulodda vaziyatlar - 3-bob',
			icon: <AlertTriangle className='w-6 h-6' />,
			color: 'from-yellow-600 to-orange-600',
			content:
				"Yo'lovchilarning hayoti va sog'lig'i uchun xavf tug'diradigan favqulodda vaziyatlar yuz berganda, ular bekatdan tashqariga yoki poyezdda qo'shni bekatga evakuatsiya qilinadilar, shuningdek, metropoliten xodimlarining ko'rsatmalari bo'yicha harakatlanadilar.",
		},
		{
			id: 10,
			number: '14',
			title: 'Texnik nosozliklar',
			icon: <AlertTriangle className='w-6 h-6' />,
			color: 'from-orange-600 to-red-600',
			content:
				"Poyezd yoki boshqa texnik qurilmalarda nosozlik yuz berganda, vaziyatdan kelib chiqqan holda yo'lovchilar poyezdlarda bir yo'ldan ikki tomonlama harakatlanish yo'li bilan bekatlarga yetkaziladi.",
		},
		{
			id: 11,
			number: '15',
			title: 'Xavfsiz evakuatsiya',
			icon: <Shield className='w-6 h-6' />,
			color: 'from-red-600 to-pink-600',
			content:
				"Bekatlar yoki yer usti yo'llari oralig'idagi harakat xavfsizligiga ta'sir etuvchi texnik vositalarda nosozliklar yuz berganda, metropoliten xodimlari tomonidan yo'lovchilarni tonnel va estakada orqali xavfsiz evakuatsiya qilish choralari ko'riladi.",
		},
		{
			id: 12,
			number: '16',
			title: "Yo'lovchilar huquqlari - 4-bob",
			icon: <Users className='w-6 h-6' />,
			color: 'from-green-600 to-teal-600',
			content:
				"Yo'lovchilar metropolitendan foydalanishda quyidagi huquqlarga ega:",
			rights: [
				"o'zlari bilan birgalikda yetti yoshgacha bo'lgan bolalarini, bolalar va nogironligi bo'lgan shaxslar aravachalarini bepul olib yurish;",
				"nogironligi bo'lgan va imkoniyati cheklangan shaxslar tomonidan metropolitenning texnik vositalaridan foydalanish;",
				'bekatlarni havaskorlik foto va videotasvirga olish;',
				'bekatlarda joylashgan tibbiy punktlar yordamidan foydalanish;',
				'telefon va aloqa vositalaridan foydalanish;',
			],
		},
		{
			id: 13,
			number: '17',
			title: "Yo'lovchilar majburiyatlari",
			icon: <Users className='w-6 h-6' />,
			color: 'from-blue-600 to-cyan-600',
			content:
				"Yo'lovchilar metropolitendan foydalanishda quyidagi majburiyatlarga ega:",
			obligations: [
				'jamoat tartibi, sanitariya-gigiyena normalari va qoidalariga rioya qilishi;',
				"qonunchilik hujjatlariga muvofiq yo'lkira haqini to'lashi;",
				"o'tish punktlariga yaqinlashganda yo'l chiptasini tayyorlashi;",
				'eskalatorda xavfsizlik qoidalariga rioya qilishi;',
				'favqulodda vaziyatlar haqida darhol xabar berishi;',
			],
		},
		{
			id: 14,
			number: '18',
			title: 'Xodimlar huquqlari - 5-bob',
			icon: <UserCheck className='w-6 h-6' />,
			color: 'from-purple-600 to-indigo-600',
			content: 'Metropoliten xodimlari quyidagi huquqlarga ega:',
			rights: [
				'metropolitenda bepul yurish huquqini beruvchi barcha hujjatlarni tekshirish;',
				"zaruratga ko'ra yo'lovchilarga yordam ko'rsatish;",
				"yo'lovchilardan metropoliten jihozlariga zarar yetkazmaslikni talab qilish;",
				"xizmat vazifalarini o'tayotgan vaqtida metropolitendan bepul foydalanish;",
			],
		},
		{
			id: 15,
			number: '19',
			title: 'Xodimlar majburiyatlari',
			icon: <UserCheck className='w-6 h-6' />,
			color: 'from-indigo-600 to-purple-600',
			content: 'Metropoliten xodimlari quyidagi majburiyatlarga ega:',
			obligations: [
				"metropoliten poyezdlarini kutib olishi va jo'natishni ta'minlashi;",
				"poyezdlar harakati jadvaliga rioya qilinishini ta'minlashi;",
				"xizmat vaqtida joriy qilingan formali kiyim-boshda bo'lishi;",
				"yo'lovchilarga ehtiyotkor va e'tiborli bo'lish to'g'risida xabar berishi;",
				'favqulodda vaziyatlarda evakuatsiya ishlarini tashkil etishi;',
			],
		},
		{
			id: 16,
			number: '20',
			title: 'Yakunlovchi qoidalar - 6-bob',
			icon: <FileText className='w-6 h-6' />,
			color: 'from-slate-600 to-gray-700',
			content:
				"Mazkur Qoidalar talablarini qo'llashda yuzaga keladigan nizolar qonunchilik hujjatlarida belgilangan tartibda hal etiladi.",
		},
		{
			id: 17,
			number: '21',
			title: 'Javobgarlik',
			icon: <Scale className='w-6 h-6' />,
			color: 'from-gray-600 to-slate-700',
			content:
				"Ushbu Qoidalar talablarining buzilishida aybdor bo'lgan shaxslar qonunchilik hujjatlarida belgilangan tartibda javobgar bo'ladi.",
		},
	]

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					const sectionId = Number.parseInt(
						entry.target.getAttribute('data-section-id') || '0'
					)
					if (entry.isIntersecting) {
						setVisibleSections(prev => new Set([...prev, sectionId]))
					}
				})
			},
			{
				threshold: 0,
				rootMargin: '-50px 0px -50px 0px',
			}
		)

		sectionRefs.current.forEach(ref => {
			if (ref) observer.observe(ref)
		})

		return () => observer.disconnect()
	}, [])

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100'>
			{/* White Header */}
			<div className='relative bg-white '>
				<div className='container mx-auto px-4 py-12'>
					<div className='text-center'>
						<div className='inline-flex items-center gap-4 mb-6'>
							<div className='p-4 bg-blue-600 rounded-full shadow-lg'>
								<Train className='w-12 h-12 text-white' />
							</div>
						</div>
						<h1 className='text-4xl md:text-6xl font-bold text-blue-900 mb-4 animate-fade-in'>
							Metropoliten Qoidalari
						</h1>
						<p className='text-xl text-gray-700 mb-6 font-medium'>
							O'zbekiston Respublikasi Vazirlar Mahkamasi
						</p>
						<div className='flex items-center justify-center gap-3 text-gray-600'>
							<Scale className='w-5 h-5 text-blue-600' />
							<span className='font-medium'>
								2023-yil 10-oktabr, 535-son qaror
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Timeline Container */}
			<div className='relative container mx-auto px-4 py-16'>
				{/* Timeline Line */}
				<div className='absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-indigo-400 h-full opacity-70'></div>

				{/* Timeline Sections */}
				<div className='space-y-24'>
					{allSections.map((section, index) => (
						<div
							key={section.id}
							ref={el => (sectionRefs.current[index] = el)}
							data-section-id={section.id}
							className={`relative transition-all duration-1000 transform ${
								visibleSections.has(section.id)
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-20'
							}`}
							style={{
								transitionDelay: `${index * 100}ms`,
							}}
						>
							{/* Timeline Dot */}
							<div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-10'>
								<div
									className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
										visibleSections.has(section.id)
											? `bg-gradient-to-r ${section.color} scale-110`
											: 'bg-gray-400 scale-100'
									}`}
								>
									<div className='text-white font-bold text-lg'>
										{section.number}
									</div>
								</div>
							</div>

							{/* Content Card */}
							<div
								className={`flex ${
									index % 2 === 0 ? 'justify-start' : 'justify-end'
								}`}
							>
								<div
									className={`w-full max-w-2xl ${
										index % 2 === 0 ? 'pr-16' : 'pl-16'
									}`}
								>
									<Card
										className={`shadow-2xl border-0 overflow-hidden transition-all duration-700 transform bg-white ${
											visibleSections.has(section.id)
												? 'scale-100 rotate-0'
												: index % 2 === 0
												? 'scale-95 -rotate-2'
												: 'scale-95 rotate-2'
										}`}
									>
										<div
											className={`h-2 bg-gradient-to-r ${section.color}`}
										></div>
										<CardContent className='p-8'>
											{/* Section Header */}
											<div className='flex items-center gap-4 mb-6'>
												<div
													className={`p-3 rounded-full bg-gradient-to-r ${section.color} text-white shadow-lg`}
												>
													{section.icon}
												</div>
												<div>
													<Badge
														variant='outline'
														className={`mb-2 border-2 font-semibold ${
															visibleSections.has(section.id)
																? 'border-blue-600 text-blue-700 bg-blue-50'
																: 'border-gray-400 text-gray-600'
														}`}
													>
														{section.number}-modda
													</Badge>
													<h2 className='text-2xl font-bold text-gray-900'>
														{section.title}
													</h2>
												</div>
											</div>

											{/* Main Content */}
											<div className='space-y-6'>
												<p className='text-lg text-gray-800 leading-relaxed font-medium'>
													{section.content}
												</p>

												{/* Definitions */}
												{section.definitions && (
													<div className='space-y-4'>
														<h4 className='font-bold text-blue-700 text-lg flex items-center gap-2'>
															<FileText className='w-5 h-5' />
															Asosiy tushunchalar:
														</h4>
														<div className='grid gap-3'>
															{section.definitions.map((def, defIndex) => (
																<div
																	key={defIndex}
																	className={`p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 transition-all duration-500 transform ${
																		visibleSections.has(section.id)
																			? 'translate-x-0 opacity-100'
																			: 'translate-x-8 opacity-0'
																	}`}
																	style={{
																		transitionDelay: `${
																			(defIndex + 1) * 200
																		}ms`,
																	}}
																>
																	<p className='text-gray-800 font-medium'>
																		{def}
																	</p>
																</div>
															))}
														</div>
													</div>
												)}

												{/* Rights */}
												{section.rights && (
													<div className='space-y-4'>
														<h4 className='font-bold text-green-700 text-lg flex items-center gap-2'>
															<CheckCircle className='w-5 h-5' />
															Huquqlar:
														</h4>
														<div className='grid gap-3'>
															{section.rights.map((right, rightIndex) => (
																<div
																	key={rightIndex}
																	className={`flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500 transition-all duration-500 transform ${
																		visibleSections.has(section.id)
																			? 'translate-x-0 opacity-100'
																			: 'translate-x-8 opacity-0'
																	}`}
																	style={{
																		transitionDelay: `${
																			(rightIndex + 1) * 200
																		}ms`,
																	}}
																>
																	<div className='w-3 h-3 bg-green-600 rounded-full mt-2 flex-shrink-0 animate-pulse'></div>
																	<p className='text-gray-800 font-medium'>
																		{right}
																	</p>
																</div>
															))}
														</div>
													</div>
												)}

												{/* Obligations */}
												{section.obligations && (
													<div className='space-y-4'>
														<h4 className='font-bold text-orange-700 text-lg flex items-center gap-2'>
															<AlertTriangle className='w-5 h-5' />
															Majburiyatlar:
														</h4>
														<div className='grid gap-3'>
															{section.obligations.map(
																(obligation, obligationIndex) => (
																	<div
																		key={obligationIndex}
																		className={`flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500 transition-all duration-500 transform ${
																			visibleSections.has(section.id)
																				? 'translate-x-0 opacity-100'
																				: 'translate-x-8 opacity-0'
																		}`}
																		style={{
																			transitionDelay: `${
																				(obligationIndex + 1) * 200
																			}ms`,
																		}}
																	>
																		<div className='w-3 h-3 bg-orange-600 rounded-full mt-2 flex-shrink-0 animate-pulse'></div>
																		<p className='text-gray-800 font-medium'>
																			{obligation}
																		</p>
																	</div>
																)
															)}
														</div>
													</div>
												)}
											</div>

											{/* Progress Indicator */}
											<div className='mt-6 pt-6 border-t border-gray-200'>
												<div className='flex items-center gap-2 text-sm text-gray-600'>
													<Clock className='w-4 h-4' />
													<span className='font-medium'>
														{index + 1} / {allSections.length} modda
													</span>
													<div className='flex-1 mx-3'>
														<div className='w-full bg-gray-200 rounded-full h-2'>
															<div
																className={`h-2 rounded-full bg-gradient-to-r ${section.color} transition-all duration-1000`}
																style={{
																	width: visibleSections.has(section.id)
																		? '100%'
																		: '0%',
																}}
															></div>
														</div>
													</div>
													{visibleSections.has(section.id) && (
														<CheckCircle className='w-4 h-4 text-green-600' />
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Footer */}
			<footer className='bg-white  py-12 mt-24'>
				<div className='container mx-auto px-4 text-center'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<div className='p-2 bg-blue-600 rounded-full'>
							<Train className='w-6 h-6 text-white' />
						</div>
						<p className='text-xl font-bold text-gray-900'>
							© 2023 O'zbekiston Respublikasi Vazirlar Mahkamasi
						</p>
					</div>
					<p className='text-gray-700 text-lg font-medium'>
						Qonunchilik ma'lumotlari milliy bazasi, 11.10.2023-y.,
						09/23/535/0766-son
					</p>
				</div>
			</footer>

			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fade-in {
					animation: fade-in 1.5s ease-out;
				}
			`}</style>
		</div>
	)
}
