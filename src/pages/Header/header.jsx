'use client'

import { motion } from 'framer-motion'
import {
	Bird,
	ChevronLeft,
	ChevronRight,
	Instagram,
	Send,
	Video,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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

export default function MetroCarousel() {
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide()
		}, 5000)
		return () => clearInterval(interval)
	}, [current])

	const nextSlide = () => {
		setCurrent(prev => (prev + 1) % slides.length)
	}

	const prevSlide = () => {
		setCurrent(prev => (prev - 1 + slides.length) % slides.length)
	}

	const goToSlide = index => {
		setCurrent(index)
	}

	return (
		<div className='relative container h-[300px] sm:h-[400px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg'>
			{slides.map((slide, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0 }}
					animate={{ opacity: current === index ? 1 : 0 }}
					transition={{ duration: 1 }}
					className='absolute inset-0 w-full h-full'
				>
					<img
						src={slide.img}
						alt={`slide-${index}`}
						className='w-full h-full object-cover'
					/>
					{current === index && (
						<div className='absolute top-0 left-0 w-full bg-black/50 text-white text-center py-2 sm:py-4'>
							<h1 className='text-sm sm:text-lg md:text-xl font-semibold'>
								{slide.title}
							</h1>
						</div>
					)}
				</motion.div>
			))}

			{/* Tugmalar */}
			<button
				onClick={prevSlide}
				className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition'
			>
				<ChevronLeft className='w-10 h-10' />
			</button>

			<button
				onClick={nextSlide}
				className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition'
			>
				<ChevronRight className='w-10 h-10' />
			</button>

			{/* Ijtimoiy tarmoqlar */}
			<div className='absolute bottom-2 left-2 flex gap-2 sm:gap-3 bg-black/50 p-1 sm:p-2 rounded'>
				{socialLinks.map((social, idx) => (
					<div key={idx} className='relative group'>
						<Link
							href={social.href}
							target='_blank'
							className='text-white hover:text-blue-300 transition'
						>
							{social.icon}
						</Link>
						<div className='absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 bg-blue-800 text-white text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap'>
							{social.title}
						</div>
					</div>
				))}
			</div>

			{/* Indicator dots */}
			<div className='absolute bottom-2 right-2 flex gap-1 sm:gap-2'>
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
							current === index ? 'bg-white' : 'bg-gray-400'
						}`}
					></button>
				))}
			</div>
		</div>
	)
}
