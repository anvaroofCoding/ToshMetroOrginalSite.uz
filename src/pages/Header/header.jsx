'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
	ChevronLeft,
	ChevronRight,
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
		title: 'Metro bekatining ichki ko‘rinishi',
	},

	{
		img: 'https://www.gazeta.uz/media/img/2023/11/0SCIBB17008179612714_l.jpg',
		title: 'Metro sizga tez va qulay xizmat korsatadi',
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

export default function MetroCarousel() {
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
			// x: direction > 0 ? '100%' : '-100%',
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: direction => ({
			// x: direction > 0 ? '-100%' : '100%',
			opacity: 0,
		}),
	}

	return (
		<div className='container mx-auto'>
			<div className='relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl bg-gray-900'>
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
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
					</motion.div>
				</AnimatePresence>

				{/* Content Overlay */}
				<div className='absolute bottom-0 left-0 right-0 p-6 md:p-8'>
					<motion.h2
						key={currentSlide}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4'
						style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
					>
						{slides[currentSlide].title}
					</motion.h2>
				</div>

				{/* Navigation Buttons */}
				<button
					onClick={prevSlide}
					className='absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50'
					aria-label='Oldingi slayd'
				>
					<ChevronLeft className='w-6 h-6' />
				</button>

				<button
					onClick={nextSlide}
					className='absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50'
					aria-label='Keyingi slayd'
				>
					<ChevronRight className='w-6 h-6' />
				</button>

				{/* Slide Indicators */}
				<div className='absolute bottom-6 right-6 flex gap-2'>
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`w-3 h-3 rounded-full transition-all duration-200 ${
								currentSlide === index
									? 'bg-white scale-110'
									: 'bg-white/50 hover:bg-white/70'
							}`}
							aria-label={`${index + 1}-slaydga o'tish`}
						/>
					))}
				</div>

				{/* Social Links */}
				<div className='absolute top-6 left-6 flex gap-3 bg-black/30 backdrop-blur-sm p-3 rounded-full'>
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
									<IconComponent size={20} />
								</Link>
								<div className='absolute top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg'>
									{social.title}
									<div className='absolute left-1/2 -translate-x-1/2 -top-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900' />
								</div>
							</div>
						)
					})}
				</div>

				{/* Progress Bar */}
				<div className='absolute bottom-0 left-0 right-0 h-1 bg-white/20'>
					<motion.div
						className='h-full bg-white'
						initial={{ width: '0%' }}
						animate={{ width: '100%' }}
						transition={{ duration: 5, ease: 'linear' }}
						key={currentSlide}
					/>
				</div>
			</div>
		</div>
	)
}
