'use client'

import { motion } from 'framer-motion'
import { Bird, Instagram, Send, Video } from 'lucide-react'
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
			setCurrent(prev => (prev + 1) % slides.length)
		}, 4000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className='relative container w-full h-[700px] overflow-hidden rounded-lg shadow-lg'>
			{slides.map((slide, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0 }}
					animate={{ opacity: current === index ? 1 : 0 }}
					transition={{ duration: 4 }}
					className='absolute inset-0 w-full h-full'
				>
					<img
						src={slide.img}
						alt={`slide-${index}`}
						className='w-full h-full object-cover'
					/>
					{current === index && (
						<div className='absolute top-0 left-0 w-full bg-black/50 text-white text-center py-4'>
							<h1 className='text-xl font-semibold'>{slide.title}</h1>
						</div>
					)}
				</motion.div>
			))}

			{/* Ijtimoiy tarmoqlar */}
			<div className='absolute bottom-4 left-4 flex gap-3 bg-black/50 p-2 rounded'>
				{socialLinks.map((social, idx) => (
					<div key={idx} className='relative group'>
						<Link
							href={social.href}
							target='_blank'
							className='text-white hover:text-blue-300 transition'
						>
							{social.icon}
						</Link>
						<div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap'>
							{social.title}
						</div>
					</div>
				))}
			</div>

			{/* Indicator dots */}
			<div className='absolute bottom-4 right-4 flex gap-2'>
				{slides.map((_, index) => (
					<div
						key={index}
						className={`w-3 h-3 rounded-full ${
							current === index ? 'bg-white' : 'bg-gray-400'
						}`}
					></div>
				))}
			</div>
		</div>
	)
}
