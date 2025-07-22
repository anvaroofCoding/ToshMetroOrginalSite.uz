'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
	Camera,
	ChevronDown,
	Globe,
	Menu,
	Send,
	Twitter,
	X,
	Youtube,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import logo from '../../../public/MetroLogo.png' // Assuming this path is correct relative to the component


const menuItems = [
	{
		label: 'Metro xaritasi',
		href: '/metro-xaritasis',
		dropdown: false,
		dropdownItems: [],
	},
	{
		label: "To'lovlar",
		href: '',
		dropdown: true,
		dropdownItems: [
			{ label: `To'lov turlari`, href: '/tolov-turi' },
			{ label: 'ATTO kartalari', href: '/atto-kartalari' },
			{ label: 'ATTO mobile ilovasi', href: '/atto-mobile-ilovasi' },
		],
	},
	{
		label: "Yo'lovchilar",
		href: '',
		dropdown: true,
		dropdownItems: [
			{
				label: 'Metrodan foydalanish qoidalari',
				href: '/Metrodab-foydalanish-qoidalari',
			},
			{
				label: 'Davlat ramzlari',
				href: '/davlat-ramzlari',
			},
		],
	},
	{
		label: 'Pressa',
		href: '',
		dropdown: true,
		dropdownItems: [{ label: 'Yangiliklar', href: '/yangiliklar' }],
	},
	{
		label: 'Hamkorlik',
		href: '',
		dropdown: false,
		dropdownItems: [],
	},
	{
		label: 'Metro haqida',
		href: '',
		dropdown: true,
		dropdownItems: [
			{ label: 'Tashkilod haqida', href: '/metro-tarixi' },
			{ label: 'Rahbariyat', href: '/Raxbariyat' },
			{ label: "Tarkibiy bo'linmalar", href: '/tarkibiy-bolinmalar' },
			{ label: "Bo'sh ish o'rinlari", href: '/bosh-ish-orinlari' },
		],
	},
	{
		label: 'Gender tenglik',
		href: '',
		dropdown: true,
		dropdownItems: [{ label: "Umumiy ma'lumot", href: 'umumiy-malumot' }],
	},
	{
		label: 'Aloqa',
		href: '',
		dropdown: true,
		dropdownItems: [{ label: 'Aloqa', href: '/contact' }],
	},
]

const socialLinks = [
	{
		icon: Send,
		href: 'https://t.me/toshkent_metro',
		name: 'Telegram',
		color: 'hover:text-blue-400',
	},
	{
		icon: Camera,
		href: 'https://instagram.com/toshkent_metro',
		name: 'Instagram',
		color: 'hover:text-pink-400',
	},
	{
		icon: Twitter,
		href: 'https://twitter.com/toshkent_metro',
		name: 'Twitter',
		color: 'hover:text-sky-400',
	},
	{
		icon: Youtube,
		href: 'https://youtube.com/toshkent_metro',
		name: 'YouTube',
		color: 'hover:text-red-500',
	},
]

const languages = ['UZ', 'RU', 'EN']


export default function MetroNavbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [activeDropdown, setActiveDropdown] = useState(null)
	const [isLangOpen, setIsLangOpen] = useState(false)
	const [currentLang, setCurrentLang] = useState('UZ') // Default to UZ, consider getting from locale
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const parts = pathname.split('/').filter(Boolean)
	const isHiddenPath = parts[1] === 'metro-xaritasis'

	


	useEffect(() => {
		// Set initial language based on locale
		setCurrentLang(locale.toUpperCase())
	}, [locale])

	const changeLanguage = lang => {
		const segments = pathname.split('/')
		segments[1] = lang.toLowerCase() // locale ni almashtiramiz
		router.push(segments.join('/'))
	}

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20)
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		const handleClickOutside = event => {
			const target = event.target
			// Only close desktop dropdowns and language selector if mobile menu is not open
			// and the click is outside the dropdown containers.
			if (!isMenuOpen && !target.closest('.dropdown-container')) {
				setActiveDropdown(null)
				setIsLangOpen(false)
			}
		}
		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	}, [isMenuOpen]) // Re-run effect when isMenuOpen changes

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

	const handleDropdownClick = index => {
		setActiveDropdown(activeDropdown === index ? null : index)
	}

	const handleLangClick = () => {
		setIsLangOpen(!isLangOpen)
		setActiveDropdown(null)
	}

	const menuVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3 } },
	}

	const dropdownVariants = {
		hidden: {
			opacity: 0,
			y: -10,
			scale: 0.95,
			transition: { duration: 0.2 },
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.2, ease: 'easeOut' },
		},
	}

	return (
		<>
			<header
				className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
					? 'bg-gradient-to-r from-[#0E327F] to-blue-800 pt-0 shadow-md'
					: 'bg-transparent pt-5'
					}
					${isHiddenPath ? "hidden" : "block"}
					`
				}
			>
				<div className='container mx-auto'>
					<motion.div
						layout
						className={`flex items-center justify-between h-[70px] text-white rounded-lg px-4 ${isScrolled
							? 'bg-transparent'
							: 'bg-gradient-to-r from-[#0E327F] to-blue-800 shadow-lg'
							}`}
					>
						<div className='flex items-center gap-3'>
							<Link href={'/'}>
								<Image
									src={logo || '/placeholder.svg'}
									alt='Toshkent metro logo'
									width={50}
									height={50}
								/>
							</Link>
							<div className='h-[40px] flex-col justify-center hidden sm:flex'>
								<div className='border-l border-[#00B0FF] h-[30%] w-full'></div>
								<div className='border-l border-[#FF454B] h-[5%] w-full'></div>
								<div className='border-l border-white h-[30%] w-full'></div>
								<div className='border-l border-[#FF454B] h-[5%] w-full'></div>
								<div className='border-l border-[#00B100] h-[30%] w-full'></div>
							</div>
							<h1 className='hidden md:block text-[11px] lg:text-xs w-[150px] lg:w-[200px]'>
								O'zbekiston Respublikasi{' '}
								<span className='font-bold'>"Toshkent Metropoliteni"</span> DUK
							</h1>
						</div>
						<nav className='hidden xl:flex items-center'>
							{menuItems.map((item, index) => (
								<div
									key={item.label}
									className='relative h-full flex items-center dropdown-container'
								>
									{item.dropdown ? (
										<button
											onClick={() => handleDropdownClick(index)}
											className='px-2.5 py-2 text-[12px] text-gray-300 hover:text-white transition-colors relative flex items-center gap-1'
										>
											{item.label}
											<ChevronDown
												className='h-4 w-4 transition-transform duration-200'
												style={{
													transform:
														activeDropdown === index
															? 'rotate(180deg)'
															: 'rotate(0deg)',
												}}
											/>
										</button>
									) : (
										<Link
											href={item.href}
											className='px-2.5 py-2 text-[12px] text-gray-300 hover:text-white transition-colors relative flex items-center gap-1'
										>
											{item.label}
										</Link>
									)}
									{index < menuItems.length - 1 && (
										<span className='text-gray-600'>|</span>
									)}
									<AnimatePresence>
										{item.dropdown && activeDropdown === index && (
											<motion.div
												variants={dropdownVariants}
												initial='hidden'
												animate='visible'
												exit='hidden'
												className='absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 z-50'
											>
												<div className='bg-[#0E327F]/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 overflow-hidden'>
													{item.dropdownItems.map(subItem => (
														<Link
															key={subItem.label}
															href={subItem.href}
															onClick={() => setActiveDropdown(null)}
															className='block px-4 py-3 text-sm text-gray-300 hover:bg-white/15 hover:text-white transition-all duration-200 border-b border-white/10 last:border-b-0'
														>
															{subItem.label}
														</Link>
													))}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							))}
						</nav>
						<div className='flex items-center gap-4'>
							<div className='hidden xl:flex items-center relative dropdown-container'>
								<button
									onClick={handleLangClick}
									className='flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors'
								>
									<Globe size={20} />
									{currentLang}
									<ChevronDown
										size={16}
										className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''
											}`}
									/>
								</button>
								<AnimatePresence>
									{isLangOpen && (
										<motion.div
											variants={dropdownVariants}
											initial='hidden'
											animate='visible'
											exit='hidden'
											className='absolute top-full right-0 mt-2 w-24 bg-[#0E327F]/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 overflow-hidden z-50'
										>
											{/* Desktop til tanlash */}
											{languages
												.filter(lang => lang !== currentLang)
												.map(lang => (
													<button
														key={lang}
														onClick={() => {
															setCurrentLang(lang)
															setIsLangOpen(false)
															changeLanguage(lang)
														}}
														className='block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/15 hover:text-white transition-all duration-200 border-b border-white/10 last:border-b-0'
													>
														{lang}
													</button>
												))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
							<button
								onClick={toggleMenu}
								className='xl:hidden z-50 text-white'
								aria-label='Toggle menu'
							>
								<Menu size={28} />
							</button>
						</div>
					</motion.div>
				</div>
			</header>
			{/* Mobile Menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						variants={menuVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						className='fixed inset-0 bg-[#0E327F] z-50 flex flex-col'
					>
						<div className='container mx-auto px-4'>
							<div className='flex items-center justify-between h-[90px]'>
								<div className='flex items-center gap-3 justify-center'>
									<Link href={'/'}>
										<Image
											src={logo || '/placeholder.svg'}
											alt='Toshkent metro logo'
											width={50}
											height={50}
										/>
									</Link>
									<div className='h-[40px] flex flex-col justify-center'>
										<div className='border-l border-[#00B0FF] h-[30%] w-full'></div>
										<div className='border-l border-[#FF454B] h-[5%] w-full'></div>
										<div className='border-l border-white h-[30%] w-full'></div>
										<div className='border-l border-[#FF454B] h-[5%] w-full'></div>
										<div className='border-l border-[#00B100] h-[30%] w-full'></div>
									</div>
									<h2 className='text-white text-[10px]'>
										O'zbekiston Respublikasi
										<span className='font-bold'>
											{' '}
											"Toshkent Metropoliteni"
										</span>{' '}
										DUK
									</h2>
								</div>
								<button
									onClick={toggleMenu}
									className='text-white'
									aria-label='Close menu'
								>
									<X size={32} />
								</button>
							</div>
						</div>
						<nav className='flex-grow overflow-y-auto container mx-auto px-4'>
							<motion.ul
								initial='hidden'
								animate='visible'
								variants={{
									visible: { transition: { staggerChildren: 0.05 } },
								}}
								className='flex flex-col text-xl text-white'
							>
								{menuItems.map((item, index) => (
									<MobileNavItem
										key={item.label}
										item={item}
										index={index}
										activeDropdown={activeDropdown}
										setActiveDropdown={setActiveDropdown}
										closeMenu={() => setIsMenuOpen(false)}
									/>
								))}
							</motion.ul>
						</nav>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.3 }}
							className='container mx-auto px-4 py-6'
						>
							<div className='flex justify-center gap-4 mb-6'>
								{/* Mobile til tanlash */}
								{languages
									.filter(lang => lang !== currentLang)
									.map(lang => (
										<button
											key={lang}
											onClick={() => {
												setCurrentLang(lang)
												changeLanguage(lang)
												setIsMenuOpen(false)
											}}
											className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${currentLang === lang
												? 'bg-white text-[#0E327F]'
												: 'bg-white/10 text-white hover:bg-white/20'
												}`}
										>
											{lang}
										</button>
									))}
							</div>
							<div className='w-full h-px bg-white/20 mb-6' />
							<div className='flex justify-center gap-8'>
								{socialLinks.map(social => (
									<a
										key={social.name}
										href={social.href}
										target='_blank'
										rel='noopener noreferrer'
										className={`text-white/70 transition-colors ${social.color}`}
									>
										<social.icon className='h-6 w-6' />
									</a>
								))}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

const MobileNavItem = ({
	item,
	index,
	activeDropdown,
	setActiveDropdown,
	closeMenu,
}) => {
	const isOpen = activeDropdown === index
	const handleClick = e => {
		e.stopPropagation() // Prevent event from bubbling up to document listener
		if (item.dropdown) {
			setActiveDropdown(isOpen ? null : index)
		} else {
			closeMenu()
		}
	}

	return (
		<motion.li
			variants={{
				hidden: { opacity: 0, x: -30 },
				visible: { opacity: 1, x: 0 },
			}}
			className='border-b border-white/10'
		>
			<div
				className='flex justify-between items-center cursor-pointer py-4'
				onClick={handleClick}
			>
				{item.dropdown ? (
					<span className='hover:opacity-80 transition-opacity'>
						{item.label}
					</span>
				) : (
					<Link
						href={item.href}
						className='hover:opacity-80 transition-opacity'
					>
						{item.label}
					</Link>
				)}
				{item.dropdown && (
					<ChevronDown
						className={`h-6 w-6 text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
							}`}
					/>
				)}
			</div>
			<AnimatePresence>
				{isOpen && item.dropdown && (
					<motion.ul
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className='overflow-hidden pl-4'
					>
						{item.dropdownItems.map(subItem => (
							<motion.li
								key={subItem.label}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.2 }}
								className='py-2'
							>
								<Link
									href={subItem.href}
									onClick={closeMenu}
									className='text-white/80 hover:text-white transition-colors text-lg'
								>
									{subItem.label}
								</Link>
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</motion.li>
	)
}
