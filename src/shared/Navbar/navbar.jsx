'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'

import Link from 'next/link'
import { useState } from 'react'
import logo from '../../../public/MetroLogo.png'
import MetroHamburger from './navbarHamburger'
import MetroNavbar from './ul'

import { Bird, Camera, Send, Video } from 'lucide-react'

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => setIsOpen(!isOpen)
	const closeMenu = () => setIsOpen(false)
	const [openIndex, setOpenIndex] = useState(null)

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

	return (
		<>
			{/* NAVBAR */}
			<div className='fixed top-5 left-0 w-full z-[100]'>
				<div className='container  h-[70px] flex justify-between items-center bg-[#0E327F] text-white rounded shadow-lg px-4'>
					<div className='flex items-center gap-2'>
						<Link href={'/'}>
							<Image src={logo} alt='Toshkent metro logo' height={50} />
						</Link>

						<div className='h-[50px] flex flex-col justify-center'>
							<div className='border border-[#00B0FF] h-[30%] w-full'></div>
							<div className='border border-[#FF454B] h-[5%] w-full'></div>
							<div className='border border-white h-[30%] w-full'></div>
							<div className='border border-[#FF454B] h-[5%] w-full'></div>
							<div className='border border-[#00B100] h-[30%] w-full'></div>
						</div>

						<h1 className='md:w-[200px] w-[150px] text-[10px] md:text-sm text-white'>
							O‘zbekiston Respublikasi{' '}
							<span className='font-extrabold'>"Toshkent Metropoliteni"</span>{' '}
							DUK
						</h1>
					</div>

					<div className='hidden 2xl:block'>
						<MetroNavbar />
					</div>

					<MetroHamburger />
					<div className='xl:block 2xl:hidden flex justify-center items-center'>
						<button onClick={toggleMenu}>
							{isOpen ? <X size={28} /> : <Menu size={28} />}
						</button>
					</div>
				</div>
			</div>

			{/* Hamburger modal */}
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							key='overlay'
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='fixed inset-0 bg-black z-[99]'
							onClick={closeMenu}
						/>

						<motion.div
							key='modal'
							initial={{ x: '100vw' }}
							animate={{ x: 0 }}
							exit={{ x: '100vw' }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className='fixed top-0 right-0 w-64 h-full bg-[#0E327F] text-white shadow-lg z-[100] p-4 flex flex-col gap-4 overflow-y-auto'
						>
							<div className='flex justify-between items-center border-b border-white pb-2'>
								<h2 className='text-lg font-bold'>Menyu</h2>
								<button onClick={closeMenu}>
									<X />
								</button>
							</div>

							{/* MetroNavbar menyular */}
							<ul className='flex flex-col gap-2'>
								{menuItems.map((item, index) => (
									<li key={index}>
										<button
											onClick={() =>
												setOpenIndex(openIndex === index ? null : index)
											}
											className='w-full flex justify-between items-center font-bold text-sm pl-2 border-l-2 hover:border-blue-300 hover:text-blue-300 transition'
										>
											{item.label}
											{item.dropdown && (
												<ChevronDown
													size={16}
													className={`ml-1 transition-transform ${
														openIndex === index ? 'rotate-180' : 'rotate-0'
													}`}
												/>
											)}
										</button>

										{item.dropdown && (
											<AnimatePresence>
												{openIndex === index && (
													<motion.ul
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: 'auto', opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.3, ease: 'easeInOut' }}
														className='overflow-hidden ml-3 mt-1 flex flex-col gap-1'
													>
														{item.dropdownItems.map((subItem, subIndex) => (
															<li key={subIndex}>
																<Link
																	href={subItem.href}
																	onClick={closeMenu}
																	className='block text-xs pl-2 hover:text-blue-200 transition'
																>
																	{subItem.label}
																</Link>
															</li>
														))}
													</motion.ul>
												)}
											</AnimatePresence>
										)}
									</li>
								))}
							</ul>

							<div className='my-2 border-t border-white' />

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

							<div className='my-2 border-t border-white' />

							{/* Ijtimoiy tarmoqlar */}
							<div>
								<p className='text-sm font-semibold mb-2'>
									Ijtimoiy tarmoqlar:
								</p>
								<div className='flex flex-col gap-2'>
									<Link
										href='https://t.me/toshkent_metro'
										target='_blank'
										className='flex items-center gap-2 hover:text-blue-400 transition cursor-pointer'
									>
										<Send size={18} className='cursor-pointer' /> Telegram
									</Link>
									<Link
										href='https://instagram.com/toshkent_metro'
										target='_blank'
										className='flex items-center gap-2 hover:text-pink-400 transition cursor-pointer'
									>
										<Camera size={18} className='cursor-pointer' /> Instagram
									</Link>
									<Link
										href='https://twitter.com/toshkent_metro'
										target='_blank'
										className='flex items-center gap-2 hover:text-blue-300 transition cursor-pointer'
									>
										<Bird size={18} className='cursor-pointer' /> Twitter
									</Link>
									<Link
										href='https://youtube.com/toshkent_metro'
										target='_blank'
										className='flex items-center gap-2 hover:text-red-500 transition cursor-pointer'
									>
										<Video size={18} className='cursor-pointer' /> YouTube
									</Link>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* Bu padding kontentni navbar ostidan boshlanishini ta’minlaydi */}
			<div className='pt-[90px]' />
		</>
	)
}
