'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Bird, Camera, Send, Video } from 'lucide-react'
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

export default function MetroModalNavbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [activeIndex, setActiveIndex] = useState(null)

	const toggleMenu = () => setIsOpen(!isOpen)
	const closeMenu = () => setIsOpen(false)

	return (
		<>
			{/* Trigger tugma */}
			<button onClick={toggleMenu} className='text-white'>
				{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>

			{/* Modal */}
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							key='overlay'
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='fixed inset-0 bg-black z-40'
							onClick={closeMenu}
						/>

						<motion.div
							key='modal'
							initial={{ x: '100vw' }}
							animate={{ x: 0 }}
							exit={{ x: '100vw' }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className='fixed top-0 right-0 w-72 h-full bg-[#0E327F] text-white shadow-lg z-50 p-4 flex flex-col gap-4 overflow-y-auto'
						>
							<div className='flex justify-between items-center border-b border-white pb-2'>
								<h2 className='text-lg font-bold'>Menyu</h2>
								<button onClick={closeMenu}>
									<X />
								</button>
							</div>

							{/* UL menyu */}
							<ul className='flex flex-col gap-2'>
								{menuItems.map((item, index) => (
									<li key={index}>
										<Link
											href={item.href}
											onClick={closeMenu}
											className='block font-bold text-sm border-l-2 pl-2 hover:text-blue-300 hover:border-blue-300 transition'
										>
											{item.label}
										</Link>

										{item.dropdown && (
											<ul className='ml-4 mt-1 flex flex-col gap-1'>
												{item.dropdownItems.map((subItem, subIndex) => (
													<li key={subIndex}>
														<Link
															href={subItem.href}
															onClick={closeMenu}
															className='block text-xs hover:text-blue-200 transition'
														>
															{subItem.label}
														</Link>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>

							<hr className='border-white' />

							{/* Tillar */}
							<div>
								<p className='text-sm font-semibold mb-2'>Tilni tanlang:</p>
								<div className='flex gap-2'>
									{['UZ', 'RU', 'EN'].map(lang => (
										<button
											key={lang}
											className='border border-white px-2 py-1 rounded hover:bg-white hover:text-[#0E327F] transition'
										>
											{lang}
										</button>
									))}
								</div>
							</div>

							<hr className='border-white' />

							{/* Ijtimoiy tarmoqlar */}
							<div>
								<p className='text-sm font-semibold mb-2'>
									Ijtimoiy tarmoqlar:
								</p>
								<div className='flex flex-col gap-2'>
									<Link
										href='https://t.me/toshkent_metro'
										target='_blank'
										className='flex items-center gap-2 hover:text-blue-400 transition'
									>
										<Send size={18} /> Telegram
									</Link>
									<Link
										href='https://instagram.com/toshkent_metro'
										target='_blank'
										className='flex items-center gap-2 hover:text-pink-400 transition'
									>
										<Camera size={18} /> Instagram
									</Link>
									<Link
										href='https://twitter.com/toshkent_metro'
										target='_blank'
										className='flex items-center gap-2 hover:text-blue-300 transition'
									>
										<Bird size={18} /> Twitter
									</Link>
									<Link
										href='https://youtube.com/toshkent_metro'
										target='_blank'
										className='flex items-center gap-2 hover:text-red-500 transition'
									>
										<Video size={18} /> YouTube
									</Link>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	)
}
