'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
	Bird, // Twitter
	Camera, // Instagram
	Menu, // Hamburger
	Send, // Telegram
	Video, // YouTube
	X,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function MetroHamburger() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => setIsOpen(!isOpen)

	const closeMenu = () => setIsOpen(false)

	return (
		<div>
			{/* HEADER */}
			<div className='2xl:flex justify-between items-center h-16 text-white hidden'>
				<button onClick={toggleMenu} aria-label='Toggle menu'>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* OVERLAY */}
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
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className='fixed top-0 right-0 w-64 h-full bg-[#0E327F] text-white shadow-lg z-50 p-4 flex flex-col gap-4'
						>
							<div className='flex justify-between items-center border-b border-white pb-2'>
								<h2 className='text-lg font-bold'>Menyu</h2>
								<button onClick={closeMenu} aria-label='Yopish'>
									<X />
								</button>
							</div>

							{/* Tillar */}
							<div>
								<p className='text-sm font-semibold mb-2'>Tilni tanlang:</p>
								<div className='flex gap-2'>
									<button
										title="O'zbek tili"
										className='border border-white px-2 py-1 rounded hover:bg-white hover:text-[#0E327F] transition'
									>
										UZ
									</button>
									<button
										title='Rus tili'
										className='border border-white px-2 py-1 rounded hover:bg-white hover:text-[#0E327F] transition'
									>
										RU
									</button>
									<button
										title='Ingliz tili'
										className='border border-white px-2 py-1 rounded hover:bg-white hover:text-[#0E327F] transition'
									>
										EN
									</button>
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
		</div>
	)
}
