'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
	AlertTriangle,
	Book,
	ChevronRight,
	FileText,
	Home,
	Scale,
	Shield,
	Train,
	UserCheck,
	Users,
} from 'lucide-react'
import { useState } from 'react'

export default function MetroRegulations() {
	const [activeChapter, setActiveChapter] = useState(0)

	const chapters = [
		{
			id: 0,
			title: 'Umumiy qoidalar',
			icon: <Home className='w-5 h-5' />,
			content: {
				title: '1-bob. Umumiy qoidalar',
				sections: [
					{
						number: '1',
						text: "Ushbu Qoidalar metropolitenda yo'lovchilar hamda boshqa shaxslarning (metropoliten xodimlari, metropolitenda o'z xizmat vazifasini bajaruvchi ichki ishlar organlari va O'zbekiston Respublikasi Favqulodda vaziyatlar vazirligi xodimlari hamda metropoliten rahbariyatining ruxsati bilan tashrif buyuruvchi shaxslar) bo'lishi, ularning huquq va majburiyatlarini, shuningdek, metropolitendan foydalanish tartibini belgilaydi.",
					},
					{
						number: '2',
						text: 'Ushbu Qoidalarda quyidagi asosiy tushunchalardan foydalaniladi:',
						definitions: [
							'bekat platformasi — bekatdagi poyezdlarni kutish joyi;',
							"yo'l chiptasi — metropolitendan foydalanish uchun QR-kodli bir martalik yo'l haqi to'lovi amalga oshirilganligini tasdiqlovchi hujjat;",
							"yo'lovchi — metropolitendan foydalanish uchun to'lovni amalga oshirgan yoki imtiyozga hamda bepul yurish huquqiga ega bo'lgan shaxs (iste'molchi);",
							"ko'zdan kechirish — metropolitenda xavfsizlikni ta'minlash maqsadida tashish va foydalanish taqiqlangan moddalar va buyumlarni aniqlash uchun mo'ljallangan, maxsus texnik vositalarni qo'llagan holda amalga oshiriladigan tadbirlar majmui;",
							"metropoliten xodimi — metropolitenda faoliyat olib boruvchi va yo'lovchilarga xizmat ko'rsatuvchi xodim (bekat navbatchisi, mashinist va boshqalar);",
							"nazorat-o'tkazish punktlari — yo'l haqi to'lovini nazorat qilish punktlari;",
							"transport kartasi — yo'lovchilar foydalanadigan jamoat transportida yurganlik uchun yo'l haqini to'lashga mo'ljallangan, ko'p martalik to'lov kartasi;",
							"elektron to'lov tizimi — elektron ilovalar orqali to'lovlarni amalga oshirish tizimi;",
							"eskalator — uzluksiz harakatlanuvchi zinapoyalardan iborat bo'lgan yuqoriga ko'taruvchi va pastga tushiruvchi qurilma;",
							"yuk — o'z o'lchamlari va vazniga ko'ra (uchta o'lchovi bo'yicha yig'indisi 200 sm dan oshmaydigan) o'ram turi va xilidan qat'i nazar, yengil ko'tarib yuriladigan, yo'lovchi vagonlarida qiyinchiliksiz joylashtiriladigan yuklar va buyumlar.",
						],
					},
					{
						number: '3',
						text: "Metropolitenda yo'lovchining bo'lishi va uning yukini tashish shartnomasi tuzilganligi yo'l chiptasi orqali yoki imtiyozga hamda bepul yurish huquqiga ega bo'lgan shaxslarning tegishli hujjatini ko'rsatishi bilan tasdiqlanadi.",
					},
					{
						number: '4',
						text: "Metropolitenda yo'lovchilarning xavfsiz va qulay harakatlanishi ta'minlanadi.",
					},
				],
			},
		},
		{
			id: 1,
			title: 'Xavfsizlik talablari',
			icon: <Shield className='w-5 h-5' />,
			content: {
				title: '2-bob. Metropolitendan foydalanishda xavfsizlik talablari',
				sections: [
					{
						number: '5',
						text: "Metropolitenda harakatlanish davomida metropoliten xodimlari va yo'lovchilar ogoh, hushyor va e'tiborli bo'lishi lozim.",
					},
					{
						number: '6',
						text: "O'tish yo'llari, vestibyullar, bekat platformasi va vagonlarda shubhali va qoldirilgan ashyolar (buyumlar) aniqlanganda, metropolitenning navbatchi xodimlariga yoki ichki ishlar organlari xodimlariga xabar berilishi lozim.",
					},
					{
						number: '7',
						text: "Qoldirilgan ashyoga (buyumga) biron-bir mexanik ta'sir ko'rsatish (boshqa joyga olib o'tish, ochish va boshqalar), uning atrofidagi yorug'likni, haroratni va tovushni o'zgartirish hamda ashyo yaqinida radioelektr uskunalaridan, shuningdek, aloqa vositalaridan foydalanish qat'iyan man etiladi.",
					},
					{
						number: '8',
						text: "Yo'lovchilar va boshqa shaxslar ichki ishlar organlari xodimlarining qonuniy talabiga asosan yuklarini ko'zdan kechirish uchun taqdim etadi. Bunda qidiruvdagi shaxslar deb gumon qilingan yoki ko'zdan kechirish jarayonida o'zini shubhali tutayotgan shaxslar qonunchilikda belgilangan tartibda shaxsiy ko'zdan kechirilishi mumkin. Yo'lovchilar va boshqa shaxslar ichki ishlar organlari xodimlarining qonuniy talabiga asosan ko'zdan kechirishdan o'tishni rad etgan taqdirda, metropolitenga kiritilmaydi.",
					},
				],
			},
		},
		{
			id: 2,
			title: 'Favqulodda vaziyatlar',
			icon: <AlertTriangle className='w-5 h-5' />,
			content: {
				title:
					"3-bob. Metropolitenda favqulodda vaziyatlar yuzaga kelganda, yo'lovchilar va boshqa shaxslarning harakatlanish tartibi",
				sections: [
					{
						number: '13',
						text: "Yo'lovchilarning hayoti va sog'lig'i uchun xavf tug'diradigan favqulodda vaziyatlar yuz berganda, ular bekatdan tashqariga yoki poyezdda qo'shni bekatga evakuatsiya qilinadilar, shuningdek, metropoliten xodimlarining ko'rsatmalari bo'yicha harakatlanadilar.",
					},
					{
						number: '14',
						text: "Poyezd yoki boshqa texnik qurilmalarda nosozlik yuz berganda, vaziyatdan kelib chiqqan holda yo'lovchilar poyezdlarda bir yo'ldan ikki tomonlama harakatlanish yo'li bilan bekatlarga yetkaziladi. Agar poyezdlarda tashish imkoni bo'lmaganda, yo'lovchilar mazkur bekat tashqarisiga evakuatsiya qilinib, transport tashkilotlarining avtobuslari yordamida metropoliten yo'nalishida parallel ravishda bekatlarga yetkaziladi.",
					},
					{
						number: '15',
						text: "Bekatlar yoki yer usti yo'llari oralig'idagi harakat xavfsizligiga ta'sir etuvchi texnik vositalarda nosozliklar yuz berganda, metropoliten xodimlari tomonidan yo'lovchilarni tonnel va estakada orqali xavfsiz evakuatsiya qilish choralari ko'riladi.",
					},
				],
			},
		},
		{
			id: 3,
			title: "Yo'lovchilar huquq va majburiyatlari",
			icon: <Users className='w-5 h-5' />,
			content: {
				title: "4-bob. Yo'lovchilarning huquq va majburiyatlari",
				sections: [
					{
						number: '16',
						text: "Yo'lovchilar metropolitendan foydalanishda quyidagi huquqlarga ega:",
						rights: [
							"o'zlari bilan birgalikda yetti yoshgacha bo'lgan bolalarini, bolalar va nogironligi bo'lgan shaxslar aravachalarini, bolalar velosipedlarini, musiqa asboblarini, shuningdek, g'ilofga solingan holda sanchiluvchi, kesuvchi va oson sinuvchi buyumlar, chana, chang'i va baliq ovi uchun qarmoqlarni bepul olib yurish;",
							"nogironligi bo'lgan va imkoniyati cheklangan shaxslar tomonidan metropolitenning texnik vositalaridan (liftlar, nogironligi bo'lgan shaxslar aravachasini ko'taruvchi/tushuruvchi moslamalar va boshqa jihozlar) foydalanish, zaruratga ko'ra tegishli xodimlardan yordam olish;",
							'bekatlarni havaskorlik foto va videotasvirga olish;',
							'bekatlarda joylashgan tibbiy punktlar yordamidan foydalanish;',
							'telefon va aloqa vositalaridan foydalanish;',
							"o'lchamlariga ko'ra uchta o'lchovi yig'indisi bo'yicha 200 santimetr: eni — 60 santimetr, uzunligi — 70 santimetr, balandligi — 70 santimetr bo'lgan yuklarni bepul olib yurish;",
							"zaruratga ko'ra metropoliten xodimlarining ruxsati bilan harakati to'xtagan eskalatordan foydalanish.",
						],
					},
					{
						number: '17',
						text: "Yo'lovchilar metropolitendan foydalanishda quyidagi majburiyatlarga ega:",
						obligations: [
							'jamoat tartibi, sanitariya-gigiyena normalari va qoidalariga, xizmat vazifasini bajarayotgan metropoliten va ichki ishlar organlari xodimlarining qonuniy talablariga hamda ushbu Qoidalarga rioya qilishi;',
							"qonunchilik hujjatlariga va ushbu Qoidalarga muvofiq yo'lkira haqini hamda yuk uchun to'lovlarni amalga oshirishi;",
							"o'tish punktlariga yaqinlashganda yo'l chiptasini, transport kartasini tayyorlashi;",
							"avtomatlashtirilgan nazorat punktlaridan o'tayotganda tegishli tartibni saqlashi;",
							"uzunligi 150 sm dan 220 sm gacha bo'lgan yuklarning har biri uchun to'lovni amalga oshirishi;",
							'eskalatorda xavfsizlik qoidalariga rioya qilishi;',
							'favqulodda vaziyatlar haqida darhol xabar berishi.',
						],
					},
				],
			},
		},
		{
			id: 4,
			title: 'Xodimlar huquq va majburiyatlari',
			icon: <UserCheck className='w-5 h-5' />,
			content: {
				title: '5-bob. Metropoliten xodimlarining huquq va majburiyatlari',
				sections: [
					{
						number: '18',
						text: 'Metropoliten xodimlari quyidagi huquqlariga ega:',
						rights: [
							'metropolitenda bepul yurish huquqini beruvchi barcha hujjatlarni tekshirish;',
							"zaruratga ko'ra yo'lovchilarga yordam ko'rsatish;",
							"yo'lovchilardan yosh bolalarni qarovsiz qoldirmaslik va ularning qo'lidan ushlab olishni so'rash;",
							"yo'lovchilardan metropoliten jihozlariga zarar yetkazmaslikni talab qilish;",
							"metropolitendan foydalanishda yo'lovchilarga tushuntirishlar berish;",
							"yo'lovchilarni platformadagi ogohlantiruvchi chegara chizig'idan o'tmasligini talab qilish;",
							"xizmat vazifalarini o'tayotgan vaqtida metropolitendan bepul foydalanish.",
						],
					},
					{
						number: '19',
						text: 'Metropoliten xodimlari quyidagi majburiyatlarga ega:',
						obligations: [
							"metropoliten poyezdlarini kutib olishi va jo'natishni ta'minlashi;",
							"poyezdlar harakati jadvaliga rioya qilinishini ta'minlashi;",
							"xizmat vaqtida joriy qilingan formali kiyim-boshda bo'lishi;",
							"yo'lovchilarga ehtiyotkor va e'tiborli bo'lish to'g'risida xabar berishi;",
							'eskalatordan foydalanish talabini nazorat qilishi;',
							"nogironligi bo'lgan va imkoniyati cheklangan shaxslarga ko'maklashishi;",
							"vagonlar ozodaligi va tizimlar ishlashini ta'minlashi;",
							"yo'lovchilarni tashishda xavfsizlikni ta'minlashi;",
							'hujjatlarni tekshirishi va nazorat qilishi;',
							'favqulodda vaziyatlarda evakuatsiya ishlarini tashkil etishi.',
						],
					},
				],
			},
		},
		{
			id: 5,
			title: 'Yakunlovchi qoidalar',
			icon: <FileText className='w-5 h-5' />,
			content: {
				title: '6-bob. Yakunlovchi qoidalar',
				sections: [
					{
						number: '20',
						text: "Mazkur Qoidalar talablarini qo'llashda yuzaga keladigan nizolar qonunchilik hujjatlarida belgilangan tartibda hal etiladi.",
					},
					{
						number: '21',
						text: "Ushbu Qoidalar talablarining buzilishida aybdor bo'lgan shaxslar qonunchilik hujjatlarida belgilangan tartibda javobgar bo'ladi.",
					},
				],
			},
		},
	]

	const prohibitions = [
		"Parapetlar, to'siqlar ustiga chiqish",
		"Spirtli ichimliklar iste'mol qilish",
		'Chekish (har qanday shaklda)',
		'Ochiq olov, pirotexnika vositalaridan foydalanish',
		"Oyoq kiyimsiz va kiyimsiz holda bo'lish",
		'Kir qiluvchi yuklar bilan kirish',
		"Yonuvchan gazlar bilan to'ldirilgan sharlar",
		'Mototsikl va skuterlarda harakatlanish',
		"Sport mashqlari va o'yinlar",
		'Ruxsatsiz foto/video suratga olish',
		"Poyezd yo'llariga tushish",
		'Texnologik xonalarga kirish',
		'Vagonlar tomiga chiqish',
		'Metropoliten obyektlariga zarar yetkazish',
		'Ruxsatsiz yozuvlar joylashtirish',
		'Savdo-sotiq amalga oshirish',
		"Yolg'on xabarlar tarqatish",
		"G'ilofsiz kesuvchi buyumlar",
		"Taqiqlangan chegara chizig'idan o'tish",
		"Eskalatorlarga o'tirish va yuk qo'yish",
	]

	const transportProhibitions = [
		"Ruxsatnomasiz o'qotar va tig'li qurollar",
		'Ruxsatnomasiz zaharli moddalar',
		'Tez yonuvchan va portlovchi moddalar',
		'Siqilgan va suyultirilgan gazlar',
		"Germetik idishlarsiz o'yuvchi moddalar",
	]

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
			{/* Header */}
			<div className='text-[#0E327F]'>
				<div className='container mx-auto px-4 py-6'>
					<div className='flex items-center gap-3 mb-4'>
						<Train className='w-8 h-8' />
						<div>
							<h1 className='text-2xl font-bold'>Metropoliten Qoidalari</h1>
							<p className='text-gray-700 text-sm'>
								O'zbekiston Respublikasi Vazirlar Mahkamasi
							</p>
						</div>
					</div>
					<div className='flex items-center gap-2 text-sm text-gray-700'>
						<Scale className='w-4 h-4' />
						<span>2023-yil 10-oktabr, 535-son qaror</span>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 py-8'>
				<div className='grid lg:grid-cols-4 gap-8'>
					{/* Navigation Sidebar */}
					<div className='lg:col-span-1'>
						<Card className='sticky top-8'>
							<CardHeader>
								<CardTitle className='text-[#0E327F] flex items-center gap-2'>
									<Book className='w-5 h-5' />
									Boblar
								</CardTitle>
							</CardHeader>
							<CardContent className='p-0'>
								<nav className='space-y-1'>
									{chapters.map(chapter => (
										<Button
											key={chapter.id}
											variant={
												activeChapter === chapter.id ? 'default' : 'ghost'
											}
											className={`w-full justify-start text-left h-auto p-3 ${
												activeChapter === chapter.id
													? 'bg-[#0E327F] text-white'
													: 'text-gray-700 hover:bg-blue-50'
											}`}
											onClick={() => setActiveChapter(chapter.id)}
										>
											<div className='flex items-center gap-3'>
												{chapter.icon}
												<div>
													<div className='font-medium text-sm'>
														{chapter.id + 1}-bob
													</div>
													<div className='text-xs opacity-80'>
														{chapter.title}
													</div>
												</div>
											</div>
											<ChevronRight className='w-4 h-4 ml-auto' />
										</Button>
									))}
								</nav>
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3'>
						<Card>
							<CardHeader className='border-b bg-gradient-to-r from-[#0E327F] to-blue-600 text-white'>
								<CardTitle className='flex items-center gap-3'>
									{chapters[activeChapter].icon}
									{chapters[activeChapter].content.title}
								</CardTitle>
							</CardHeader>
							<CardContent className='p-6'>
								<ScrollArea className='h-[600px] pr-4'>
									<div className='space-y-6'>
										{chapters[activeChapter].content.sections.map(
											(section, index) => (
												<div key={index} className='space-y-4'>
													<div className='flex items-start gap-3'>
														<Badge
															variant='outline'
															className='text-[#0E327F] border-[#0E327F] mt-1'
														>
															{section.number}
														</Badge>
														<div className='flex-1'>
															<p className='text-gray-700 leading-relaxed'>
																{section.text}
															</p>

															{section.definitions && (
																<div className='mt-4 space-y-2'>
																	{section.definitions.map((def, defIndex) => (
																		<div
																			key={defIndex}
																			className='pl-4 border-l-2 border-blue-100'
																		>
																			<p className='text-sm text-gray-600'>
																				{def}
																			</p>
																		</div>
																	))}
																</div>
															)}

															{section.rights && (
																<div className='mt-4'>
																	<h4 className='font-semibold text-[#0E327F] mb-3'>
																		Huquqlar:
																	</h4>
																	<ul className='space-y-2'>
																		{section.rights.map((right, rightIndex) => (
																			<li
																				key={rightIndex}
																				className='flex items-start gap-2'
																			>
																				<div className='w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
																				<p className='text-sm text-gray-600'>
																					{right}
																				</p>
																			</li>
																		))}
																	</ul>
																</div>
															)}

															{section.obligations && (
																<div className='mt-4'>
																	<h4 className='font-semibold text-[#0E327F] mb-3'>
																		Majburiyatlar:
																	</h4>
																	<ul className='space-y-2'>
																		{section.obligations.map(
																			(obligation, obligationIndex) => (
																				<li
																					key={obligationIndex}
																					className='flex items-start gap-2'
																				>
																					<div className='w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0'></div>
																					<p className='text-sm text-gray-600'>
																						{obligation}
																					</p>
																				</li>
																			)
																		)}
																	</ul>
																</div>
															)}
														</div>
													</div>
													{index <
														chapters[activeChapter].content.sections.length -
															1 && <Separator className='my-6' />}
												</div>
											)
										)}
									</div>
								</ScrollArea>
							</CardContent>
						</Card>

						{/* Additional Information Cards */}
						{activeChapter === 1 && (
							<div className='mt-8 grid md:grid-cols-2 gap-6'>
								<Card>
									<CardHeader>
										<CardTitle className='text-red-600 flex items-center gap-2'>
											<AlertTriangle className='w-5 h-5' />
											Taqiqlangan harakatlar
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ScrollArea className='h-64'>
											<ul className='space-y-2'>
												{prohibitions.map((prohibition, index) => (
													<li key={index} className='flex items-start gap-2'>
														<div className='w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0'></div>
														<p className='text-sm text-gray-600'>
															{prohibition}
														</p>
													</li>
												))}
											</ul>
										</ScrollArea>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className='text-red-600 flex items-center gap-2'>
											<Shield className='w-5 h-5' />
											Tashish taqiqlangan buyumlar
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className='space-y-3'>
											{transportProhibitions.map((item, index) => (
												<li key={index} className='flex items-start gap-2'>
													<div className='w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0'></div>
													<p className='text-sm text-gray-600'>{item}</p>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className='text-[#0E327F] py-6 mt-12 '>
				<div className='container mx-auto px-4 text-center'>
					<p className='text-[#0E327F]'>
						© 2023 O'zbekiston Respublikasi Vazirlar Mahkamasi
					</p>
					<p className='text-sm text-gray-700 mt-1'>
						Qonunchilik ma'lumotlari milliy bazasi, 11.10.2023-y.,
						09/23/535/0766-son
					</p>
				</div>
			</footer>
		</div>
	)
}
