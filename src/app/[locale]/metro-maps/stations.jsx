'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

const stations = [
	// Chilonzor yo'nalishi
	'Olmazor',
	'Chilonzor',
	"Mirzo Ulug'bek",
	'Novza',
	"Milliy bog'",
	"Xalqlar Do'stligi",
	'Paxtakor',
	'Mustaqillik Maydoni',
	'Amir Temur Xiyoboni',
	'Hamid Olimjon',
	'Pushkin',
	"Buyuk Ipak Yo'li",

	// O'zbekiston yo'nalishi
	'Beruniy',
	'Tinchlik',
	'Chorsu',
	"G'afur G'ulom",
	'Alisher Navoiy',
	'Uzbekiston',
	'Kosmonavtlar',
	'Oybek',
	'Toshkent',
	'Mashinasozlar',
	"Do'stlik",

	// Yunusobod yo'nalishi
	'Yunusobod',
	'Shahriston',
	'Bodomzor',
	'Minor',
	'Turkiston',
	'Yunus Rajabiy',
	'Habib Abdullayev',
]

export default function MetroStationSlider() {
	const controls = useAnimation()

	useEffect(() => {
		startScroll()
	}, [])

	const startScroll = () => {
		controls.start({
			x: ['0%', '-100%'],
			transition: {
				x: {
					repeat: Infinity,
					repeatType: 'loop',
					duration: 100,
					ease: 'linear',
				},
			},
		})
	}

	const stopScroll = () => {
		controls.stop()
	}

	return (
		<div
			className='relative overflow-hidden bg-blue-50 py-4'
			onMouseEnter={stopScroll}
			onMouseLeave={startScroll}
		>
			<motion.div
				className='flex gap-8 text-blue-900 font-medium whitespace-nowrap'
				animate={controls}
				style={{ width: 'max-content' }}
			>
				{Array(4) // cheksiz ko‘rinishi uchun 4 marta takrorlash
					.fill(stations)
					.flat()
					.map((station, index) => (
						<div
							key={index}
							className='bg-white border border-blue-100 rounded-full px-4 py-1 shadow hover:shadow-lg transition'
						>
							{station}
						</div>
					))}
			</motion.div>
		</div>
	)
}
