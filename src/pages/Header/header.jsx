'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	Clock,
	Info,
	Instagram,
	Send,
	Twitter,
	Youtube,
} from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

const slides = [
	{
		img: 'https://www.gazeta.uz/media/img/2020/08/MhKnO615986966870345_l.jpg',
		title: 'Toshkent metropoliteni - eski bekat',
	},
	{
		img: 'https://mirmetro.net/sites/default/files/4ee05122-1f49-d1e7-4cbc-163a1cea5210%5B1%5D.jpg',
		title: 'Yangi qurilayotgan liniya',
	},
	{
		img: 'https://www.gazeta.uz/media/img/2023/02/FtLFV716758557867771_l.jpg',
		title: "Metro bekatining ichki ko'rinishi",
	},
	{
		img: 'https://www.gazeta.uz/media/img/2023/11/0SCIBB17008179612714_l.jpg',
		title: 'Metro sizga tez va qulay xizmat korsatadi',
	},
]

const announcements = [
	{
		id: 1,
		title:
			'“Toshkent metropoliteni” DUKda 14-yanvar — Vatan himoyachilari kuniga bag’ishlangan bayram tadbiri bo’lib o’tdi.',
		description:
			'Dastavval so’zga chiqqanlar sana munosabati bilan barchani tabriklab, yanada shijoat bilan kasbiy vazifalarini bajarishda zafarlar tilashdi.Tadbir davomida o’zining shijoati bilan fuqarolar xavsizligini ta’minlashda mehnat qilib kelayotgan bir guruh xodimlar taqdirlandi. Shundan so’ng, harbiy orkestr ijrosidagi taronalar yangrab, yig’ilganlarga bayramona kayfiyat ulashdi.',
		time: '14:30',
		status: 'Normal',
		line: 'Chilonzor',
		img: 'https://tashmetro.uz/wp-content/uploads/2025/01/AN0A6642-scaled.jpg',
	},
	{
		id: 2,
		title:
			'«Toshkent metropoliteni» DUK rahbari hamda mas’ul xodimlari Toshkent Davlat Transport universitetiga tashrif buyurdi.',
		description:
			'Uchrashuvni tashkil etishdan asosiy ko‘zlangan maqsad, metropolitenda xodimlar uchun yaratilgan qulayliklar bilan tanishtirish barobarida oliygoh bitiruvchilarini  ishga taklif etishdan iboratdir.',
		time: '10:15',
		status: 'Yangilik',
		line: 'Yunusobod',
		img: 'https://tashmetro.uz/wp-content/uploads/2025/02/AN0A0565-copy-scaled.jpg',
	},
	{
		id: 3,
		title:
			'Transport vazirligi mutasaddilari hamda “Toshkent metropoliteni” DUK bosh muhandisi boshchiligidagi bir guruh metropoliten mas’ul xodimlari Janubiy Koreya davlatiga tashrif buyurdi',
		description:
			'Tashrif davomida “Toshkent metropoliteni” DUK hamda Hyundai Movex kompaniyasi o’rtasida hamkorlik memorandumi imzolandi. Jumladan, mas’ullar Hyundai Movex kompaniya tajribasini o’rganish barobarida Toshkent metropolitenidagi mavjud vaziyatlarni bartaraf etish choralarini ham ko’rib chiqishmoqda.Shuningdek, kelgusida Janubiy Koreya tajribasiga asosan Toshkent metropolitenini yanada rivojlantirish ko’zda tutildi.',
		time: '16:45',
		status: 'Yangilanish',
		line: "O'zbekiston",
		img: 'https://tashmetro.uz/wp-content/uploads/2025/03/photo_2025-03-12_12-28-00.jpg',
	},
	{
		id: 4,
		title:
			'Toshpo’latov Feruz G’olib o’g’li “Toshkent metropoliteni” DUK “Axborot xavfsizligini ta’minlash va texnik xizmat ko’rsatish” xizmati boshlig’i vazifasini bajaruvchi lavozimiga tayinlandi.',
		description:
			'Feruz Toshpo’latov 1996-yilda tug’ilgan. Ma’lumoti – oliy. 2021-yilda Toshkent davlat transport universiteti bakalavr bosqichini, 2023-yilda Toshkent davlat transport universiteti magistratura bosqichini tamomlagan.Tayinlovga qadar, F.Toshpo’latov “Axborot xavfsizligini ta’minlash va texnik xizmat ko’rsatish” xizmati boshlig’i o’rinbosari — Axborot xavfsizligi bo’limi boshlig’i lavozimida faoliyat yuritgan.',
		time: '09:20',
		status: 'Yangilik',
		line: 'Sergeli',
		img: 'https://tashmetro.uz/wp-content/uploads/2024/08/photo_2024-08-02_15-53-49.jpg',
	},
	{
		id: 5,
		title:
			'Ergashev Dostonjon Qobiljonovich  “Toshkent metropoliteni” DUK boshlig’i o’rinbosari — Harakat xavfsizligi bo’yicha bosh taftishchi lavozimiga tayinlandi.',
		description:
			'Ergashev Dostonjon Qobiljonovich  “Toshkent metropoliteni” DUK boshlig’i o’rinbosari — Harakat xavfsizligi bo’yicha bosh taftishchi lavozimiga tayinlandi. Ma’lumoti – oliy. 2014-yilda Toshkent temir yo’l muhandislik instituti bakalavr bosqichini, 2016-yilda Toshkent temir yo’l muhandislik instituti magistr bosqichini, 2019-yilda O’zbekiston Respublikasi Prezidenti huzuridagi Davlat boshqaruv akademiyasini tamomlagan.Tayinlovga qadar D.Ergashev “Toshkent metropoliteni” DUK bosh muhandisining yer usti metro liniyalarini tasarruf etish bo’yicha o’rinbosari lavozimida faoliyat yuritgan.',
		time: '11:30',
		status: 'Yangilik',
		line: 'Barcha',
		img: 'https://tashmetro.uz/wp-content/uploads/2024/07/photo_2024-07-24_16-24-17-1-1.jpg',
	},
	{
		id: 6,
		title:
			'“Toshkent metropoliteni” DUK da “Korrupsiyaga qarshi kurashish – davr talabi” mavzusida davra suhbati bo’lib o’tdi.',
		description:
			'     Жорий йилнинг 28 март куни “Тошкент метрополитени” давлат унитар корхонаси раҳбар ходимлари билан Ўзбекистон Республикаси Давлат хавфсизлик хизмати ҳамда Ўзбекистон Республикаси Коррупцияга қарshi kurashish agentligi mutaxassis xodimlari ishtirokida “Korrupцияга qarshi kurashish – davr talabi” mavzusida davra suhbati o’tkazildi.Suhbat davomida ishtirokchilar korrupцияning turli, korrupцияviy omillar, kelib chiqishi sabablari, qonuniylik, fuqarolar huquqlari, erkinliklari va qonuniy manfaatlariining ustuvorligini, ochiqlik va shaffoflikni ta’minlash, aholining huquqiy ongi va huquqiy madaniyatini yuksaltirish, jamiyatda korrupцияga nisbatan murosasiz munosabatni shakllantirish, davlat va jamiyatning barcha sohalarida korrupцияning oldini olishga doir chora-tadbirllarni amalga oshirish, korrupцияga oid huquqbuzarliklarni o’z vaqtida aniqlash, ularning oqibatlarini va imkon beruvchi shart-sharoitlarni bartaraf etish haqida keng ma’noda fikr va mulohazalar yuritdilar.',
		time: '13:15',
		status: 'Xavfsizlik',
		line: 'Barcha',
		img: 'https://tashmetro.uz/wp-content/uploads/2024/04/korupsiya-tadbiri.jpg',
	},
	{
		id: 7,
		title:
			'Xabaringiz bor, joriy yilning 10-iyulidan 10-avgustiga qadar “Yong’in xavfsizligini ta’minlash bo’yicha Dolzarb 30 kun” loyihasi doirasida joylarda turli tadbirlar bo’lib o’tmoqda.',
		description:
			'Albatta bu kabi tadbirlar aholini ehtiyot choralarini ko’rish va yong’in ro’y bergan holatlarda to’g’ri harakatlanish qoidalari bilan xabardor etish uchun ayni muddaodir.Shu munosabat bilan Toshkent metropolitenining “O’zbekiston” elektrodeposida ham ishchi xodimlarning malakasini oshirish maqsadida yong’in xavsizligini ta’minlash, favqulotda sodir bo’lgan yong’inni bartaraf etish qoidalarini tadbiq etishni ko’zda tutgan holda o’quv amaliy mashg’uloti o’tkazildi.',
		time: '08:45',
		status: "Ma'lumot",
		line: 'Barcha',
		img: 'https://tashmetro.uz/wp-content/uploads/2023/07/photo_2023-07-21_13-45-48.jpg',
	},
]

const socialLinks = [
	{ href: 'https://t.me/toshkent_metro', icon: Send, title: 'Telegram' },
	{
		href: 'https://instagram.com/toshkent_metro',
		icon: Instagram,
		title: 'Instagram',
	},
	{
		href: 'https://twitter.com/toshkent_metro',
		icon: Twitter,
		title: 'Twitter',
	},
	{
		href: 'https://youtube.com/toshkent_metro',
		icon: Youtube,
		title: 'YouTube',
	},
]

export default function MetroCarouselWithNews() {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [direction, setDirection] = useState(0)

	const nextSlide = useCallback(() => {
		setDirection(1)
		setCurrentSlide(prev => (prev + 1) % slides.length)
	}, [])

	const prevSlide = useCallback(() => {
		setDirection(-1)
		setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
	}, [])

	const goToSlide = useCallback(
		index => {
			setDirection(index > currentSlide ? 1 : -1)
			setCurrentSlide(index)
		},
		[currentSlide]
	)

	useEffect(() => {
		const interval = setInterval(nextSlide, 5000)
		return () => clearInterval(interval)
	}, [nextSlide])

	const slideVariants = {
		enter: direction => ({
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: direction => ({
			opacity: 0,
		}),
	}

	// Calculate approximate height of each announcement card for scrolling animation
	// New layout: image w-24 h-24 (96px) on left, text on right.
	// CardContent: p-4 (16px top/bottom padding) = 32px
	// Inner content height (max of image or text block):
	//   Image: 96px
	//   Text block: Status/Line/Time (~20px) + Title (~20px) + Description (3 lines * 16px/line = 48px) = 88px
	//   So, effective content height is 96px (from image height)
	// Total card height: 96px (content) + 32px (CardContent padding) = 128px
	// Plus space-y-4 (16px) between cards.
	const cardHeightWithSpacing = 128 + 16 // 144px

	return (
		<div className='container mx-auto py-2'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Carousel Section */}
				<div className='relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-2xl bg-blue-900'>
					<AnimatePresence initial={false} custom={direction} mode='wait'>
						<motion.div
							key={currentSlide}
							custom={direction}
							variants={slideVariants}
							initial='enter'
							animate='center'
							exit='exit'
							transition={{
								opacity: { duration: 0.3 },
							}}
							className='absolute inset-0'
						>
							<img
								src={slides[currentSlide].img || '/placeholder.svg'}
								alt={slides[currentSlide].title}
								className='w-full h-full object-cover'
								loading='lazy'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent' />
						</motion.div>
					</AnimatePresence>
					{/* Content Overlay */}
					<div className='absolute bottom-0 left-0 right-0 p-4 md:p-6'>
						<motion.h2
							key={currentSlide}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className='text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2'
							style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
						>
							{slides[currentSlide].title}
						</motion.h2>
					</div>
					{/* Navigation Buttons */}
					<button
						onClick={prevSlide}
						className='absolute top-1/2 left-4 -translate-y-1/2 bg-blue-900/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-blue-900/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300'
						aria-label='Oldingi slayd'
					>
						<ChevronLeft className='w-5 h-5' />
					</button>
					<button
						onClick={nextSlide}
						className='absolute top-1/2 right-4 -translate-y-1/2 bg-blue-900/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-blue-900/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300'
						aria-label='Keyingi slayd'
					>
						<ChevronRight className='w-5 h-5' />
					</button>
					{/* Slide Indicators */}
					<div className='absolute bottom-4 right-4 flex gap-2'>
						{slides.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-2 h-2 rounded-full transition-all duration-200 ${
									currentSlide === index
										? 'bg-white scale-110'
										: 'bg-white/50 hover:bg-white/70'
								}`}
								aria-label={`${index + 1}-slaydga o'tish`}
							/>
						))}
					</div>
					{/* Social Links */}
					<div className='absolute top-4 left-4 flex gap-2 bg-blue-900/30 backdrop-blur-sm p-2 rounded-full'>
						{socialLinks.map((social, index) => {
							const IconComponent = social.icon
							return (
								<div key={index} className='relative group'>
									<Link
										href={social.href}
										target='_blank'
										rel='noopener noreferrer'
										className='text-white hover:text-blue-300 transition-all duration-200 block hover:scale-110'
										aria-label={social.title}
									>
										<IconComponent size={16} />
									</Link>
									<div className='absolute top-10 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg'>
										{social.title}
										<div className='absolute left-1/2 -translate-x-1/2 -top-1 w-0 h-0 border-l-2 border-r-2 border-b-2 border-l-transparent border-r-transparent b' />
									</div>
								</div>
							)
						})}
					</div>
					{/* Progress Bar */}
					<div className='absolute bottom-0 left-0 right-0 h-1 bg-blue-900/20'>
						<motion.div
							className='h-full bg-blue-300'
							initial={{ width: '0%' }}
							animate={{ width: '100%' }}
							transition={{ duration: 5, ease: 'linear' }}
							key={currentSlide}
						/>
					</div>
				</div>

				{/* Metro Announcements Section */}
				<div className='bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-2xl border border-slate-200 h-[300px] md:h-[400px] flex flex-col overflow-hidden'>
					{/* Header */}
					<div className='flex items-center justify-between p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm flex-shrink-0'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg'>
								<Info className='w-5 h-5 text-white' />
							</div>
							<div>
								<h3 className='text-lg font-bold text-slate-800'>
									Metrodagi so'ngi yangiliklar
								</h3>
								<p className='text-xs text-slate-500'>
									Joriy holat va e'lonlar
								</p>
							</div>
						</div>
						<Link href={'/yangiliklar'} className='flex items-center'>
							<Button
								variant='outline'
								size='sm'
								className='text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 bg-transparent font-medium text-xs'
							>
								Barchasi
								<ArrowRight className='w-3 h-3 ml-1' />
							</Button>
						</Link>
					</div>
					{/* Scrolling Container */}
					<div className='flex-1 relative overflow-hidden'>
						<motion.div
							className='space-y-4 p-4'
							animate={{
								y: [0, -announcements.length * cardHeightWithSpacing],
							}}
							transition={{
								duration: announcements.length * 4, // Adjusted duration for smoother scroll with smaller cards
								ease: 'linear',
								repeat: Number.POSITIVE_INFINITY,
							}}
						>
							{[...announcements, ...announcements].map(
								(announcement, index) => (
									<Card
										key={`${announcement.id}-${Math.floor(
											index / announcements.length
										)}`}
										className='w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-none'
									>
										<CardContent className='p-4 flex gap-4 items-start'>
											<img
												src={announcement.img || '/placeholder.svg'}
												alt={announcement.title}
												className='w-24 h-24 object-cover rounded-md flex-shrink-0'
												loading='lazy'
											/>
											<div className='flex-1'>
												<div className='flex items-center gap-2 mb-2'>
													<span className='px-2 py-1 text-xs font-semibold rounded-full border bg-blue-50 text-blue-700 border-blue-200'>
														{announcement.status}
													</span>
													{announcement.line !== 'Barcha' && (
														<div className='flex items-center gap-1'>
															<div className='w-2 h-2 rounded-full bg-blue-500' />
															<span className='text-xs text-slate-600 font-medium'>
																{announcement.line}
															</span>
														</div>
													)}
													<div className='flex items-center gap-1 text-xs text-slate-500 ml-auto'>
														<Clock className='w-3 h-3' />
														{announcement.time}
													</div>
												</div>
												<h4 className='text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-1'>
													{announcement.title}
												</h4>
												<p className='text-xs text-slate-600 leading-relaxed line-clamp-3'>
													{announcement.description}
												</p>
											</div>
										</CardContent>
									</Card>
								)
							)}
						</motion.div>
					</div>
					{/* Bottom Gradient Overlay */}
					<div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none' />
				</div>
			</div>
		</div>
	)
}
