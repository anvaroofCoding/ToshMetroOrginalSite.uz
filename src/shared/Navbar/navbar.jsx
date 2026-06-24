'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { CONTACT_INFO } from '@/lib/contact-info'
import { useMeQuery } from '@/store/services/api'
import {
	IconBrandRumble,
	IconBrandStorytel,
	IconBriefcase,
	IconBubbleText,
	IconBuilding,
	IconChartArrowsVertical,
	IconClipboardText,
	IconCreditCard,
	IconCreditCardFilled,
	IconDatabaseExport,
	IconDeviceMobile,
	IconFaceId,
	IconHandStop,
	IconInfoSquareRounded,
	IconMail,
	IconFolderOpen,
	IconReportMoney,
	IconSparkles,
	IconTrendingUp,
	IconTrain,
	IconUsers,
	IconUserSquareRounded,
	IconWorld,
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import {
	Building,
	ChevronDown,
	CreditCard,
	Globe,
	MapPin,
	LogOut,
	Menu,
	Phone,
	ShieldAlert as ShieldUser,
	User,
	Users,
	UsersRound,
	X,
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const LANGUAGES = ['UZ', 'RU', 'EN']

function NavDropdownLink({ sub, className, iconClassName, onClick }) {
	const Icon = sub.icon
	const iconClasses = iconClassName ?? 'h-4 w-4 text-blue-600 shrink-0'
	const content = (
		<>
			<Icon className={iconClasses} />
			{sub.label}
		</>
	)

	if (sub.external || sub.href?.startsWith('mailto:')) {
		return (
			<a href={sub.href} className={className} onClick={onClick}>
				{content}
			</a>
		)
	}

	return (
		<Link href={sub.href} prefetch className={className} onClick={onClick}>
			{content}
		</Link>
	)
}

function readAuthToken() {
	if (typeof window === 'undefined') return null
	return localStorage.getItem('token')
}

function AuthNavButton({ isAuthenticated, me, t, onLogoutRequest, className }) {
	if (!isAuthenticated) {
		return (
			<Button
				variant='link'
				asChild
				className={cn('font-bold text-white hover:text-white/80', className)}
			>
				<Link href='/kirish'>{t('login')}</Link>
			</Button>
		)
	}

	const displayName = [me?.first_name, me?.last_name].filter(Boolean).join(' ')

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className={cn(
						'flex h-auto items-center gap-1 border-0 bg-transparent px-2 py-1 font-bold text-white shadow-none',
						'no-underline outline-none ring-0 hover:bg-white/10 hover:text-white/90 hover:no-underline',
						'focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
						'data-[state=open]:bg-white/10 data-[state=open]:outline-none data-[state=open]:ring-0',
						className,
					)}
				>
					<User className='h-4 w-4 shrink-0' />
					<span className='max-w-[140px] truncate'>
						{displayName || t('logout')}
					</span>
					<ChevronDown className='h-4 w-4 shrink-0 opacity-80' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='min-w-[200px] border-blue-100'>
				{displayName ? (
					<DropdownMenuLabel className='text-blue-900'>
						{displayName}
					</DropdownMenuLabel>
				) : null}
				{displayName ? <DropdownMenuSeparator /> : null}
				<DropdownMenuItem
					className='cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600'
					onSelect={() => onLogoutRequest()}
				>
					<LogOut className='h-4 w-4' />
					{t('logout')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const getMenuItems = t => [
	{ label: t('map'), href: '/metro-xaritasi', icon: MapPin },
	{
		label: t('payments'),
		href: '',
		dropdown: true,
		icon: CreditCard,
		dropdownItems: [
			{
				label: t('paymentTypes'),
				href: '/tolov-usullari',
				icon: IconCreditCard,
			},
			{
				label: t('attoCards'),
				href: '/atto-kartalar',
				icon: IconCreditCardFilled,
			},
			{
				label: t('attoApp'),
				href: '/atto-ilova',
				icon: IconDeviceMobile,
			},
			{ label: t('palmpay'), href: '/palmpay', icon: IconHandStop },
			{ label: t('facepay'), href: '/facepay', icon: IconFaceId },
		],
	},
	{
		label: t('passengers'),
		href: '',
		dropdown: true,
		icon: Users,
		dropdownItems: [
			{
				label: t('metroRules'),
				href: '/foydalanish-qoidalari',
				icon: IconInfoSquareRounded,
			},
			{
				label: t('stateSymbols'),
				href: '/davlat-ramzlari',
				icon: IconSparkles,
			},
			{ label: t('contact'), href: '/murojaatlar', icon: IconBrandStorytel },
			{
				label: t('passengerStats'),
				href: '/statistika',
				icon: IconChartArrowsVertical,
			},
		],
	},
	{
		label: t('infoService'),
		href: '',
		dropdown: true,
		icon: ShieldUser,
		dropdownItems: [
			{ label: t('news'), href: '/yangiliklar', icon: IconInfoSquareRounded },
			{ label: t('antiCorruption'), href: '/korrupsiya', icon: IconWorld },
			{ label: t('media'), href: '/mediateka', icon: IconBrandRumble },
		],
	},
	{
		label: t('aboutMetro'),
		href: '',
		dropdown: true,
		icon: Building,
		dropdownItems: [
			{
				label: t('aboutOrganization'),
				href: '/metropoliten-tarixi',
				icon: IconTrain,
			},
			{ label: t('management'), href: '/rahbariyat', icon: IconUsers },
			{
				label: t('structure'),
				href: '/tashkiliy-tuzilma',
				icon: IconBuilding,
			},
			{
				label: t('vacancies'),
				href: '/vakansiyalar',
				icon: IconBriefcase,
			},
		],
	},
	{
		label: t('genderEquality'),
		href: '',
		dropdown: true,
		icon: UsersRound,
		dropdownItems: [
			{
				label: t('generalInfo'),
				href: '/haqimizda',
				icon: IconDatabaseExport,
			},
			{
				label: t('genderInCountry'),
				href: '/gender-tenglik',
				icon: IconUserSquareRounded,
			},
			{
				label: t('normativeDocs'),
				href: '/normativ-hujjatlar',
				icon: IconClipboardText,
			},
		],
	},
	{
		label: t('openData'),
		href: '',
		dropdown: true,
		icon: IconFolderOpen,
		dropdownItems: [
			{
				label: t('businessDevelopment'),
				href: '/biznes-rivojlanish',
				icon: IconTrendingUp,
			},
			{
				label: t('accountingBalance'),
				href: '/buxgalteriya-balansi',
				icon: IconReportMoney,
			},
			{ label: t('tenders'), href: '/tenderlar', icon: IconReportMoney },
		],
	},
	{
		label: t('contact'),
		href: '',
		dropdown: true,
		icon: Phone,
		dropdownItems: [
			{ label: t('contact_info'), href: '/aloqa', icon: IconBubbleText },
			...CONTACT_INFO.emails.map(email => ({
				label: email,
				href: `mailto:${email}`,
				icon: IconMail,
				external: true,
			})),
		],
	},
]

// Desktop hover dropdown component
function HoverDropdown({ item }) {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const timeoutRef = useRef(null)

	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		setIsOpen(true)
		item.dropdownItems?.forEach(sub => {
			if (sub.href) router.prefetch(sub.href)
		})
	}

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	return (
		<div
			className='relative'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<button className='flex items-center gap-1 text-xs font-medium text-white hover:bg-white/10 hover:text-gray-300 rounded-lg px-3 py-2 transition-colors duration-200'>
				{item.label}
				<ChevronDown
					className={cn(
						'h-4 w-4 transition-transform duration-200',
						isOpen && 'rotate-180',
					)}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.15 }}
						className='absolute left-0 top-full pt-2 z-50'
					>
						<div className='w-56 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden'>
							{item.dropdownItems?.map(sub => (
								<NavDropdownLink
									key={sub.label}
									sub={sub}
									className='flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-100 transition-colors'
								/>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

// Language dropdown with hover
function LanguageDropdown({ locale, onChangeLanguage }) {
	const [isOpen, setIsOpen] = useState(false)
	const timeoutRef = useRef(null)
	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		setIsOpen(true)
	}

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	return (
		<div
			className='relative hidden sm:block'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Button
				variant='link'
				className='flex items-center gap-2 text-white hover:bg-white/10 hover:text-white/60 rounded-lg  py-2 transition-colors duration-200'
			>
				<Globe className='h-4 w-4' />
				{locale.toUpperCase()}
				<ChevronDown
					className={cn(
						'h-4 w-4 transition-transform duration-200',
						isOpen && 'rotate-180',
					)}
				/>
			</Button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.15 }}
						className='absolute right-0 top-full pt-2 z-50'
					>
						<div className='bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden'>
							{LANGUAGES.filter(l => l !== locale.toUpperCase()).map(lang => (
								<button
									key={lang}
									onClick={() => {
										onChangeLanguage(lang)
										setIsOpen(false)
									}}
									className='block w-full px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-100 transition-colors text-center'
								>
									{lang}
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

// Mobile menu sliding from right
function MobileMenu({
	isOpen,
	onClose,
	menuItems,
	locale,
	onChangeLanguage,
	isAuthenticated,
	onLogoutRequest,
	t,
}) {
	const [expandedMenu, setExpandedMenu] = useState(null)

	// Lock body scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='fixed inset-0 bg-black/50 z-40 xl:hidden'
						onClick={onClose}
					/>

					{/* Sliding panel from right */}
					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'spring', damping: 25, stiffness: 200 }}
						className='fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#173aad] z-50 xl:hidden overflow-y-auto'
					>
						{/* Pattern overlay */}
						<div className='absolute inset-0 opacity-20 pointer-events-none'>
							<div
								className='w-full h-full bg-repeat'
								style={{
									backgroundImage: 'url("/naqsh.png")',
									backgroundSize: '200px',
								}}
							/>
						</div>

						<div className='relative z-10'>
							{/* Close button */}
							<div className='flex justify-between p-4'>
								{isAuthenticated ? (
									<Button
										onClick={() => {
											onLogoutRequest()
											onClose()
										}}
										variant='default'
										className='text-white font-bold bg-white/10 hover:bg-white/20 xl:hidden block'
									>
										{t('logout')}
									</Button>
								) : (
									<Button
										asChild
										variant='default'
										className='text-white font-bold bg-white/10 hover:bg-white/20 xl:hidden block'
									>
										<Link href='/kirish' onClick={onClose}>
											{t('login')}
										</Link>
									</Button>
								)}
								<button
									onClick={onClose}
									className='p-2 rounded-lg hover:bg-white/10 transition-colors'
									aria-label='Close menu'
								>
									<X className='h-6 w-6 text-white' />
								</button>
							</div>

							{/* Menu items */}
							<nav className='px-4 pb-6 space-y-1'>
								{menuItems.map(item =>
									item.dropdownItems ? (
										<div key={item.label}>
											<button
												onClick={() =>
													setExpandedMenu(
														expandedMenu === item.label ? null : item.label,
													)
												}
												className='w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-white rounded-lg hover:bg-white/10 transition-colors'
											>
												<span className='flex items-center gap-3'>
													<item.icon className='h-5 w-5' />
													{item.label}
												</span>
												<ChevronDown
													className={cn(
														'h-4 w-4 transition-transform duration-200',
														expandedMenu === item.label && 'rotate-180',
													)}
												/>
											</button>

											<AnimatePresence>
												{expandedMenu === item.label && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: 'auto', opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.2 }}
														className='overflow-hidden'
													>
														<div className='pl-6 py-2 space-y-1'>
															{item.dropdownItems.map(sub => (
																<NavDropdownLink
																	key={sub.label}
																	sub={sub}
																	onClick={onClose}
																	iconClassName='h-4 w-4 shrink-0'
																	className='flex items-center gap-3 px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors'
																/>
															))}
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									) : (
										<Link
											key={item.label}
											href={item.href}
											prefetch
											onClick={onClose}
											className='flex items-center gap-3 px-3 py-3 text-sm font-medium text-white rounded-lg hover:bg-white/10 transition-colors'
										>
											<item.icon className='h-5 w-5' />
											{item.label}
										</Link>
									),
								)}

								{/* Language section */}
								<div className='border-t border-white/20 pt-4 mt-4'>
									<div className='flex items-center gap-2 px-3 mb-3 text-xs font-semibold text-white/70'>
										<Globe className='h-4 w-4' />
										{t('Language')}
									</div>
									<div className='flex gap-2 px-3'>
										{LANGUAGES.filter(l => l !== locale.toUpperCase()).map(
											lang => (
												<button
													key={lang}
													onClick={() => onChangeLanguage(lang)}
													className='flex-1 py-2.5 text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors'
												>
													{lang}
												</button>
											),
										)}
									</div>
								</div>
							</nav>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

// Logo component
function Logo({ t }) {
	return (
		<motion.div
			className='flex items-center gap-2'
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.2 }}
		>
			<Link href='/'>
				<motion.div
					whileHover={{ rotate: 5, scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.2 }}
				>
					<Image
						src='/logos.png'
						alt='Toshkent metro logo'
						width={50}
						height={50}
						className='rounded-full  object-cover'
						priority
					/>
				</motion.div>
			</Link>

			<div className='h-10 flex-col justify-center hidden sm:flex'>
				{[
					{ color: '#00B0FF', height: '30%' },
					{ color: '#FF454B', height: '5%' },
					{ color: 'white', height: '30%' },
					{ color: '#FF454B', height: '5%' },
					{ color: '#00B100', height: '30%' },
				].map((line, i) => (
					<div
						key={i}
						className='w-full'
						style={{
							borderLeft: `2px solid ${line.color}`,
							height: line.height,
						}}
					/>
				))}
			</div>

			<h1 className='hidden md:block text-[11px] lg:text-[10px] w-[150px] font-bold leading-tight text-white'>
				{t('logo1')} <span>{t('logo2')}</span> {t('logo3')}
			</h1>
		</motion.div>
	)
}

// Main Navbar component
export default function Navbar() {
	const [token, setToken] = useState(null)
	const isAuthenticated = Boolean(token)
	const { data: me } = useMeQuery(undefined, {
		skip: !isAuthenticated,
		refetchOnMountOrArgChange: false,
		refetchOnFocus: false,
		refetchOnReconnect: false,
	})
	const t = useTranslations('menu')
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const [mobileOpen, setMobileOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

	const menuItems = getMenuItems(t)
	const isHidden =
		pathname.includes('metro-xaritasi') ||
		pathname.includes('metro-rejasi') ||
		pathname.includes('/kirish') ||
		pathname.includes('/royxatdan-otish')
	const isHomePage = pathname === '/'

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 0)
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		const syncToken = () => setToken(readAuthToken())

		syncToken()
		window.addEventListener('storage', syncToken)
		window.addEventListener('auth-change', syncToken)

		return () => {
			window.removeEventListener('storage', syncToken)
			window.removeEventListener('auth-change', syncToken)
		}
	}, [])

	const handleLogoutRequest = useCallback(() => {
		setLogoutDialogOpen(true)
	}, [])

	const handleLogoutConfirm = useCallback(() => {
		localStorage.removeItem('token')
		window.dispatchEvent(new Event('auth-change'))
		setLogoutDialogOpen(false)
		setMobileOpen(false)
		router.push('/')
	}, [router])

	const changeLanguage = useCallback(
		lang => {
			router.replace(pathname, { locale: lang.toLowerCase() })
			setMobileOpen(false)
		},
		[pathname, router],
	)

	useEffect(() => {
		const routes = [
			'/metro-xaritasi',
			'/tolov-usullari',
			'/yangiliklar',
			'/murojaatlar',
			'/statistika',
		]
		routes.forEach(href => router.prefetch(href))
	}, [router])

	if (isHidden) return null

	const headerClass = cn(
		'w-full z-50 transition-all duration-300',
		isHomePage ? 'fixed top-0' : 'sticky top-0',
		isHomePage && !isScrolled ? 'bg-transparent' : 'bg-[#173aad]',
	)

	return (
		<>
			<header className={headerClass}>
				{/* Pattern overlay */}
				{(!isHomePage || isScrolled) && (
					<div className='absolute inset-0 opacity-20 -z-10 pointer-events-none'>
						<div
							className='w-full h-full bg-repeat'
							style={{
								backgroundImage: 'url("/naqsh.png")',
								backgroundSize: '200px',
							}}
						/>
					</div>
				)}

				<AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>{t('logoutConfirmTitle')}</AlertDialogTitle>
							<AlertDialogDescription>
								{t('logoutConfirmText')}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
							<AlertDialogAction
								className='bg-red-600 hover:bg-red-700'
								onClick={handleLogoutConfirm}
							>
								{t('logout')}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				<div className='container mx-auto flex items-center justify-between py-4'>
					<Logo t={t} />

					{/* Desktop navigation */}
					<nav className='hidden xl:flex items-center gap-1'>
						{menuItems.map(item =>
							item.dropdown ? (
								<HoverDropdown key={item.label} item={item} />
							) : (
								<Link
									key={item.label}
									href={item.href}
									prefetch
									className='text-xs font-medium text-white hover:bg-white/10 hover:text-gray-300 rounded-lg px-3 py-2 transition-colors duration-200'
								>
									{item.label}
								</Link>
							),
						)}
					</nav>

					{/* Right side */}
					<div className='flex items-center gap-2'>
						<LanguageDropdown
							locale={locale}
							onChangeLanguage={changeLanguage}
						/>

						<Tooltip
							text={
								isAuthenticated
									? [me?.first_name, me?.last_name].filter(Boolean).join(' ') ||
										t('logout')
									: t('loginz')
							}
						>
							<div className='hidden xl:block'>
								<AuthNavButton
									isAuthenticated={isAuthenticated}
									me={me}
									t={t}
									onLogoutRequest={handleLogoutRequest}
								/>
							</div>
						</Tooltip>

						<Button
							variant='ghost'
							size='sm'
							onClick={() => setMobileOpen(true)}
							className='xl:hidden hover:bg-white/10'
							aria-label='Open menu'
						>
							<Menu className='h-5 w-5 text-white' />
						</Button>
					</div>
				</div>
			</header>

			{/* Mobile menu */}
			<MobileMenu
				isOpen={mobileOpen}
				onClose={() => setMobileOpen(false)}
				menuItems={menuItems}
				locale={locale}
				onChangeLanguage={changeLanguage}
				isAuthenticated={isAuthenticated}
				onLogoutRequest={handleLogoutRequest}
				t={t}
			/>
		</>
	)
}
