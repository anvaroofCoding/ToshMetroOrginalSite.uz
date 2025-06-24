'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const menuItems = [
	{
		label: 'Metro xaritasi',
		href: '/xarita',
		dropdown: false,
		dropdownItems: [],
	},
	{
		label: "To'lovlar",
		href: '/tolovlar',
		dropdown: true,
		dropdownItems: [
			{ label: 'Chipta narxlari', href: '/tolovlar/chipta-narxlari' },
			{ label: 'To‘lov usullari', href: '/tolovlar/usullar' },
			{ label: 'Chegirmalar', href: '/tolovlar/chegirmalar' },
		],
	},
	{
		label: "Yo'lovchilar",
		href: '/yolovchilar',
		dropdown: true,
		dropdownItems: [
			{ label: 'Qoidalar', href: '/yolovchilar/qoidalar' },
			{ label: 'Huquq va majburiyatlar', href: '/yolovchilar/huquq' },
			{ label: 'Imtiyozlar', href: '/yolovchilar/imtiyozlar' },
		],
	},
	{
		label: 'Pressa',
		href: '/pressa',
		dropdown: true,
		dropdownItems: [
			{ label: 'Yangiliklar', href: '/pressa/yangiliklar' },
			{ label: 'Matbuot bayonotlari', href: '/pressa/bayonotlar' },
			{ label: 'Foto galereya', href: '/pressa/galereya' },
		],
	},
	{
		label: 'Hamkorlik',
		href: '/hamkorlik',
		dropdown: false,
		dropdownItems: [],
	},
	{
		label: 'Metro haqida',
		href: '/metro-haqida',
		dropdown: true,
		dropdownItems: [
			{ label: 'Tarixi', href: '/metro-haqida/tarix' },
			{ label: 'Rivojlanish', href: '/metro-haqida/rivojlanish' },
			{ label: 'Yangi loyihalar', href: '/metro-haqida/loyihalar' },
		],
	},
	{
		label: 'Gender tenglik',
		href: '/gender',
		dropdown: true,
		dropdownItems: [
			{ label: 'Dasturlar', href: '/gender/dasturlar' },
			{ label: 'Statistika', href: '/gender/statistika' },
			{ label: 'Tadbirlar', href: '/gender/tadbirlar' },
		],
	},
	{
		label: 'Aloqa',
		href: '/aloqa',
		dropdown: true,
		dropdownItems: [
			{ label: 'Kontaktlar', href: '/aloqa/kontaktlar' },
			{ label: 'Manzil', href: '/aloqa/manzil' },
			{ label: 'Fikr bildirish', href: '/aloqa/fikr' },
		],
	},
]

export default function MetroNavbar() {
	const [activeIndex, setActiveIndex] = useState(null)

	return (
		<ul className='flex gap-4 flex-wrap cursor-pointer'>
			{menuItems.map((item, index) => (
				<li
					key={index}
					className='relative group cursor-pointer'
					onMouseEnter={() => item.dropdown && setActiveIndex(index)}
					onMouseLeave={() => item.dropdown && setActiveIndex(null)}
				>
					<Link
						href={item.href}
						className='text-[12px] font-bold border-l-2 border-blue-600 pl-1 pr-1 2xl:pl-3 2xl:pr-2 py-1 rounded-sm hover:text-blue-600 hover:border-blue-800 transition-all duration-300 ease-in-out cursor-pointer'
					>
						{item.label}
					</Link>

					<AnimatePresence>
						{activeIndex === index && item.dropdown && (
							<motion.ul
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.3, ease: 'easeOut' }}
								className='absolute top-full left-0 bg-white cursor-pointer text-black shadow-lg rounded-lg mt-2 py-2 w-56 z-50 border border-gray-200'
								onMouseEnter={() => setActiveIndex(index)}
								onMouseLeave={() => setActiveIndex(null)}
							>
								{item.dropdownItems.map((subItem, subIndex) => (
									<li key={subIndex}>
										<Link
											href={subItem.href}
											className='block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 cursor-pointer'
										>
											{subItem.label}
										</Link>
									</li>
								))}
							</motion.ul>
						)}
					</AnimatePresence>
				</li>
			))}
		</ul>
	)
}
