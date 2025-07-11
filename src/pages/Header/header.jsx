'use client'

import { Button } from '@/components/ui/button'
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
		title: 'Chilonzor liniyasi - normal ish rejimi',
		description:
			"Barcha bekatlar normal ishlayapti. Poyezdlar 2-3 daqiqa oralig'ida harakat qilmoqda.",
		time: '14:30',
		status: 'Normal',
		line: 'Chilonzor',
	},
	{
		id: 2,
		title: 'Yunusobod liniyasi - texnik ishlar',
		description:
			'Bugun kechqurun 23:00 dan texnik ishlar olib boriladi. Xizmat vaqti qisqartiriladi.',
		time: '10:15',
		status: 'Ogohlantirish',
		line: 'Yunusobod',
	},
	{
		id: 3,
		title: "O'zbekiston liniyasi - yangi jadval",
		description:
			'Ish kunlarida birinchi poyezd 05:30 da, oxirgi poyezd 00:30 da harakat qiladi.',
		time: '16:45',
		status: 'Yangilanish',
		line: "O'zbekiston",
	},
	{
		id: 4,
		title: 'Sergeli liniyasi - yangi bekat',
		description:
			"Sergeli liniyasida yangi 'Qo'yliq' bekati ochildi va yo'lovchilar xizmatiga taqdim etildi.",
		time: '09:20',
		status: 'Yangilik',
		line: 'Sergeli',
	},
	{
		id: 5,
		title: 'Talabalar uchun chegirma',
		description:
			"Talaba guvohnomasi bo'yicha metro kartasida 50% chegirma amal qiladi.",
		time: '11:30',
		status: 'Chegirma',
		line: 'Barcha',
	},
	{
		id: 6,
		title: 'Kechki vaqtda xavfsizlik',
		description:
			'22:00 dan keyin har bir vagon va bekatda xavfsizlik xodimlari navbatchilik qiladi.',
		time: '13:15',
		status: 'Xavfsizlik',
		line: 'Barcha',
	},
	{
		id: 7,
		title: 'Ekologik transport tanlovi',
		description:
			"Metro - shaharning eng toza va ekologik transport turi. Kuniga 2 million yo'lovchi.",
		time: '08:45',
		status: "Ma'lumot",
		line: 'Barcha',
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
								x: { type: 'spring', stiffness: 300, damping: 30 },
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
										<div className='absolute left-1/2 -translate-x-1/2 -top-1 w-0 h-0 border-l-2 border-r-2 border-b-2 border-l-transparent border-r-transparent border-b-blue-900' />
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
									Metro Ma'lumotlari
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
							className='space-y-3 p-4'
							animate={{
								y: [0, -announcements.length * 100],
							}}
							transition={{
								duration: announcements.length * 3,
								ease: 'linear',
								repeat: Number.POSITIVE_INFINITY,
							}}
						>
							{[...announcements, ...announcements].map(
								(announcement, index) => (
									<div
										key={`${announcement.id}-${Math.floor(
											index / announcements.length
										)}`}
										className='bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer group flex-shrink-0 min-h-[90px]'
									>
										<div className='flex items-start gap-3'>
											<div className='flex-shrink-0 mt-1'>
												<div className='w-3 h-3 rounded-full bg-blue-600 shadow-sm' />
											</div>
											<div className='flex-1 min-w-0'>
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
												<p className='text-xs text-slate-600 leading-relaxed'>
													{announcement.description}
												</p>
											</div>
										</div>
									</div>
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
