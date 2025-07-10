'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ArrowRight,
	Calendar,
	ChevronLeft,
	ChevronRight,
	Clock,
	Instagram,
	Newspaper,
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

const newsData = [
	{
		id: 1,
		title: 'Yangi metro liniyasi ochildi',
		description:
			"Toshkent metrosining yangi liniyasi rasmiy ravishda ochildi va yo'lovchilar xizmatiga taqdim etildi.",
		date: '2024-01-15',
		time: '14:30',
		category: 'Yangilik',
	},
	{
		id: 2,
		title: 'Metro bekatlarida Wi-Fi xizmati',
		description:
			'Barcha metro bekatlarida bepul Wi-Fi internet xizmati ishga tushirildi.',
		date: '2024-01-12',
		time: '10:15',
		category: 'Xizmat',
	},
	{
		id: 3,
		title: 'Metro ish vaqti uzaytirildi',
		description: 'Dam olish kunlarida metro ish vaqti kechgacha uzaytirildi.',
		date: '2024-01-10',
		time: '16:45',
		category: "E'lon",
	},
	{
		id: 4,
		title: 'Yangi poyezdlar keldi',
		description:
			'Zamonaviy va qulay yangi metro poyezdlari xizmatga kiritildi.',
		date: '2024-01-08',
		time: '09:20',
		category: 'Yangilik',
	},
	{
		id: 5,
		title: 'Metro kartasi chegirma',
		description:
			"Talabalar uchun metro kartasida maxsus chegirma e'lon qilindi.",
		date: '2024-01-05',
		time: '11:30',
		category: 'Chegirma',
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
	const [currentNewsIndex, setCurrentNewsIndex] = useState(0)

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

	useEffect(() => {
		const newsInterval = setInterval(() => {
			setCurrentNewsIndex(prev => (prev + 1) % newsData.length)
		}, 4000)
		return () => clearInterval(newsInterval)
	}, [])

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

	const getCategoryColor = category => {
		switch (category) {
			case 'Yangilik':
				return 'bg-emerald-500'
			case 'Xizmat':
				return 'bg-blue-500'
			case "E'lon":
				return 'bg-amber-500'
			case 'Chegirma':
				return 'bg-rose-500'
			default:
				return 'bg-blue-900'
		}
	}

	const getCategoryColorLight = category => {
		switch (category) {
			case 'Yangilik':
				return 'bg-emerald-50 text-emerald-700 border-emerald-200'
			case 'Xizmat':
				return 'bg-blue-50 text-blue-700 border-blue-200'
			case "E'lon":
				return 'bg-amber-50 text-amber-700 border-amber-200'
			case 'Chegirma':
				return 'bg-rose-50 text-rose-700 border-rose-200'
			default:
				return 'bg-blue-50 text-blue-700 border-blue-200'
		}
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

				{/* Redesigned News Section */}
				<div className='bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-2xl border border-slate-200 h-[300px] md:h-[400px] flex flex-col overflow-hidden'>
					{/* Header */}
					<div className='flex items-center justify-between p-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm'>
						<div className='flex items-center gap-3'>
							<div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg'>
								<Newspaper className='w-6 h-6 text-white' />
							</div>
							<div>
								<h3 className='text-xl font-bold text-slate-800'>
									So'nggi Yangiliklar
								</h3>
								<p className='text-sm text-slate-500'>Eng muhim xabarlar</p>
							</div>
						</div>
						<Link href={'/yangiliklar'}>
							<Button
								variant='outline'
								size='sm'
								className='text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 bg-transparent font-medium'
							>
								Barchasi
								<ArrowRight className='w-4 h-4 ml-1' />
							</Button>
						</Link>
					</div>

					{/* News Content */}
					<div className='flex-1 relative overflow-hidden'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={currentNewsIndex}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.6, ease: 'easeInOut' }}
								className='absolute inset-0 p-6'
							>
								{/* Featured News */}
								<div className='mb-6'>
									<div className='bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300'>
										<div className='flex items-start gap-4'>
											<div className='flex-shrink-0'>
												<div
													className={`w-12 h-12 rounded-xl ${getCategoryColor(
														newsData[currentNewsIndex].category
													)} flex items-center justify-center shadow-sm`}
												>
													<Calendar className='w-6 h-6 text-white' />
												</div>
											</div>
											<div className='flex-1 min-w-0'>
												<div className='flex items-center gap-2 mb-3'>
													<span
														className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColorLight(
															newsData[currentNewsIndex].category
														)}`}
													>
														{newsData[currentNewsIndex].category}
													</span>
													<div className='flex items-center gap-1 text-xs text-slate-500'>
														<Clock className='w-3 h-3' />
														{newsData[currentNewsIndex].time}
													</div>
												</div>
												<h4 className='text-lg font-bold text-slate-800 mb-2 leading-tight'>
													{newsData[currentNewsIndex].title}
												</h4>
												<p className='text-slate-600 text-sm leading-relaxed mb-4'>
													{newsData[currentNewsIndex].description}
												</p>
												<div className='flex items-center justify-between'>
													<span className='text-xs text-slate-400 font-medium'>
														{newsData[currentNewsIndex].date}
													</span>
													<button className='flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors text-sm font-semibold group'>
														Batafsil
														<ArrowRight className='w-3 h-3 group-hover:translate-x-1 transition-transform' />
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Related News */}
								<div className='space-y-3'>
									<h5 className='text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2'>
										<div className='w-1 h-4 bg-blue-600 rounded-full'></div>
										Boshqa yangiliklar
									</h5>
									<div className='space-y-2'>
										{newsData
											.filter((_, index) => index !== currentNewsIndex)
											.slice(0, 2)
											.map((news, index) => (
												<motion.div
													key={news.id}
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{
														delay: index * 0.1,
														duration: 0.4,
														ease: 'easeOut',
													}}
													className='bg-slate-50 hover:bg-white rounded-lg p-3 border border-slate-100 hover:border-slate-200 transition-all duration-300 cursor-pointer group'
												>
													<div className='flex items-start gap-3'>
														<div className='flex-shrink-0 mt-1'>
															<div
																className={`w-2 h-2 rounded-full ${getCategoryColor(
																	news.category
																)}`}
															/>
														</div>
														<div className='flex-1 min-w-0'>
															<h6 className='text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1'>
																{news.title}
															</h6>
															<div className='flex items-center gap-2 mt-1'>
																<span className='text-xs text-slate-500'>
																	{news.date}
																</span>
																<span
																	className={`px-2 py-0.5 text-xs rounded-full border ${getCategoryColorLight(
																		news.category
																	)}`}
																>
																	{news.category}
																</span>
															</div>
														</div>
													</div>
												</motion.div>
											))}
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Progress Indicators */}
					<div className='flex justify-center gap-2 p-4 bg-white/50 backdrop-blur-sm border-t border-slate-200'>
						{newsData.map((_, index) => (
							<motion.div
								key={index}
								className={`h-1.5 rounded-full transition-all duration-500 ${
									index === currentNewsIndex
										? 'bg-blue-600 w-8'
										: 'bg-slate-300 w-2'
								}`}
								animate={{
									width: index === currentNewsIndex ? 32 : 8,
									backgroundColor:
										index === currentNewsIndex ? '#2563eb' : '#cbd5e1',
								}}
								transition={{ duration: 0.3 }}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
