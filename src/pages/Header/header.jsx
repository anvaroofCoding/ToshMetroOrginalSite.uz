// const slides = [
// 	{
// 		img: 'https://www.gazeta.uz/media/img/2020/08/MhKnO615986966870345_l.jpg',
// 		title: 'Toshkent metropoliteni - eski bekat',
// 	},
// 	{
// 		img: 'https://mirmetro.net/sites/default/files/4ee05122-1f49-d1e7-4cbc-163a1cea5210%5B1%5D.jpg',
// 		title: 'Yangi qurilayotgan liniya',
// 	},
// 	{
// 		img: 'https://www.gazeta.uz/media/img/2023/02/FtLFV716758557867771_l.jpg',
// 		title: 'Metro bekatining ichki ko‘rinishi',
// 	},
// 	{
// 		img: 'https://www.gazeta.uz/media/img/2023/11/0SCIBB17008179612714_l.jpg',
// 		title: 'Metro sizga tez va qulay xizmat korsatadi',
// 	},
// ]

// const socialLinks = [
// 	{
// 		href: 'https://t.me/toshkent_metro',
// 		icon: <Send size={20} />,
// 		title: 'Telegram',
// 	},
// 	{
// 		href: 'https://instagram.com/toshkent_metro',
// 		icon: <Instagram size={20} />,
// 		title: 'Instagram',
// 	},
// 	{
// 		href: 'https://twitter.com/toshkent_metro',
// 		icon: <Bird size={20} />,
// 		title: 'Twitter',
// 	},
// 	{
// 		href: 'https://youtube.com/toshkent_metro',
// 		icon: <Video size={20} />,
// 		title: 'YouTube',
// 	},
// ]

'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
	Bird,
	ChevronLeft,
	ChevronRight,
	Instagram,
	Send,
	Video,
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
	{
		href: 'https://t.me/toshkent_metro',
		icon: <Send size={20} />,
		title: 'Telegram',
	},
	{
		href: 'https://instagram.com/toshkent_metro',
		icon: <Instagram size={20} />,
		title: 'Instagram',
	},
	{
		href: 'https://twitter.com/toshkent_metro',
		icon: <Bird size={20} />,
		title: 'Twitter',
	},
	{
		href: 'https://youtube.com/toshkent_metro',
		icon: <Video size={20} />,
		title: 'YouTube',
	},
]

const slideVariants = {
	initial: direction => ({
		x: direction > 0 ? '100%' : '-100%',
		opacity: 0,
	}),
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			x: { type: 'spring', stiffness: 300, damping: 30 },
			opacity: { duration: 0.2 },
		},
	},
	exit: direction => ({
		x: direction > 0 ? '-100%' : '100%',
		opacity: 0,
		transition: {
			x: { type: 'spring', stiffness: 300, damping: 30 },
			opacity: { duration: 0.2 },
		},
	}),
}

export default function MetroCarousel() {
	const [[current, direction], setCurrent] = useState([0, 0])

	const nextSlide = useCallback(() => {
		setCurrent(prev => [prev[0] === slides.length - 1 ? 0 : prev[0] + 1, 1])
	}, [])

	const prevSlide = () => {
		setCurrent(prev => [prev[0] === 0 ? slides.length - 1 : prev[0] - 1, -1])
	}

	const goToSlide = index => {
		setCurrent(prev => [index, index > prev[0] ? 1 : -1])
	}

	useEffect(() => {
		const interval = setInterval(nextSlide, 4000)
		return () => clearInterval(interval)
	}, [nextSlide])

	return (
		<div className='w-full h-autoflex items-center justify-center'>
			<div className='relative w-full container h-[300px] sm:h-[450px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl'>
				<AnimatePresence initial={false} custom={direction}>
					<motion.div
						key={current}
						custom={direction}
						variants={slideVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						className='absolute inset-0 w-full h-full'
					>
						<img
							src={slides[current].img || '/placeholder.svg'}
							alt={slides[current].title}
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />
					</motion.div>
				</AnimatePresence>

				<div className='absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 text-white'>
					<motion.h1
						key={current}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className='text-lg sm:text-2xl md:text-4xl font-bold text-shadow'
						style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
					>
						{slides[current].title}
					</motion.h1>
				</div>

				<button
					onClick={prevSlide}
					className='absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
				>
					<ChevronLeft className='w-6 h-6 sm:w-8 sm:h-8' />
				</button>
				<button
					onClick={nextSlide}
					className='absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
				>
					<ChevronRight className='w-6 h-6 sm:w-8 sm:h-8' />
				</button>

				<div className='absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex items-center gap-2'>
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors'
							style={{
								backgroundColor:
									current === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
							}}
						/>
					))}
				</div>

				<div className='absolute top-4 left-4 flex gap-2 sm:gap-3 bg-black/40 p-2 rounded-full'>
					{socialLinks.map((social, idx) => (
						<div key={idx} className='relative group'>
							<Link
								href={social.href}
								target='_blank'
								rel='noopener noreferrer'
								className='text-white hover:text-blue-300 transition-transform duration-200 ease-in-out block hover:scale-110'
							>
								{social.icon}
							</Link>
							<div className='absolute top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg'>
								{social.title}
								<div className='absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-neutral-800'></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
