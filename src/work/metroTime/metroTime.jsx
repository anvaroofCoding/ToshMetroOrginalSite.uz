'use client'

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

const metroSchedule = [
	{
		station: 'Chilonzor',
		line: 'Chilonzor yoli',
		open: '05:00',
		close: '00:00',
	},
	{
		station: 'Ozbekiston',
		line: 'Ozbekiston yoli',
		open: '05:00',
		close: '00:00',
	},
	{
		station: 'Yunusobod',
		line: 'Yunusobod yoli',
		open: '06:00',
		close: '23:00',
	},
	{
		station: 'Yerusti h.',
		line: 'Yerusti halqa yoli',
		open: '06:00',
		close: '23:00',
	},
]

// type MetroStatus = "open" | "closed"

function getMetroStatus(openTimeStr, closeTimeStr, now = new Date()) {
	const [openHour, openMinute] = openTimeStr.split(':').map(Number)
	const [closeHour, closeMinute] = closeTimeStr.split(':').map(Number)
	const nowMinutes = now.getHours() * 60 + now.getMinutes()
	const openMinutes = openHour * 60 + openMinute
	const closeMinutes = closeHour * 60 + closeMinute

	if (openMinutes <= closeMinutes) {
		if (nowMinutes >= openMinutes && nowMinutes < closeMinutes) return 'open'
	} else {
		if (nowMinutes >= openMinutes || nowMinutes < closeMinutes) return 'open'
	}
	return 'closed'
}

export function MetroCommandBar() {
	const [searchQuery, setSearchQuery] = useState('')
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [currentTime, setCurrentTime] = useState(new Date())
	const searchRef = useRef(null)
	const inputRef = useRef(null)
	const marqueeControls = useAnimationControls()

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 60000)
		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		marqueeControls.start({
			x: '-50%',
			transition: {
				duration: 40,
				ease: 'linear',
				repeat: Number.POSITIVE_INFINITY,
			},
		})
	}, [marqueeControls])

	useClickAway(searchRef, () => {
		if (isSearchOpen) {
			setIsSearchOpen(false)
		}
	})

	useEffect(() => {
		if (isSearchOpen && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isSearchOpen])

	const isAnyLineOpen = metroSchedule.some(
		line => getMetroStatus(line.open, line.close, currentTime) === 'open'
	)

	const filteredSchedule = metroSchedule.filter(
		s =>
			s.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
			s.line.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const scheduleToShow =
		searchQuery.length > 0 ? filteredSchedule : metroSchedule

	return (
		<div
			ref={searchRef}
			className='relative container flex items-center h-6 space-x-4 overflow-hidden rounded-xl shadow-2xl shadow-blue-500/10 backdrop-blur-md'
		>
			{/* Status Indicator */}
			<div className='flex items-center flex-shrink-0 gap-2'>
				<motion.div
					className='w-2.5 h-2.5 rounded-full'
					animate={{ backgroundColor: isAnyLineOpen ? '#22c55e' : '#ef4444' }}
				/>
				<p
					className='hidden sm:block text-sm font-medium'
					style={{ color: '#0E327F' }}
				>
					{isAnyLineOpen ? 'Metro is running' : 'Metro is closed'}
				</p>
			</div>

			<div className='w-px h-6 bg-white/10 flex-shrink-0' />

			{/* Ticker / Search Input */}
			<div className='flex-grow h-full overflow-hidden'>
				<AnimatePresence mode='wait'>
					{isSearchOpen ? (
						<motion.div
							key='search'
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							className='flex items-center h-full'
						>
							<input
								ref={inputRef}
								type='text'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								placeholder='Search stations...'
								className='w-full h-full text-sm bg-transparent focus:outline-none'
								style={{ color: '#9EB3E0' }}
							/>
						</motion.div>
					) : (
						<motion.div
							key='ticker'
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							className='flex items-center h-full'
							onHoverStart={() => marqueeControls.stop()}
							onHoverEnd={() =>
								marqueeControls.start({
									x: '-50%',
									transition: {
										duration: 40,
										ease: 'linear',
										repeat: Number.POSITIVE_INFINITY,
									},
								})
							}
						>
							<motion.div className='flex' animate={marqueeControls}>
								{[...scheduleToShow, ...scheduleToShow].map((s, i) => (
									<div key={i} className='flex items-center flex-shrink-0 px-4'>
										<p
											className='text-sm font-medium'
											style={{ color: '#0E327F' }}
										>
											{s.station}
										</p>
										<p className='ml-2 text-sm' style={{ color: '#9EB3E0' }}>
											{s.open} - {s.close}
										</p>
									</div>
								))}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Search Button */}
			<div className='flex-shrink-0'>
				<button
					onClick={() => setIsSearchOpen(!isSearchOpen)}
					className='p-2 rounded-full hover:bg-white/10 transition-colors'
				>
					<AnimatePresence mode='wait'>
						<motion.div
							key={isSearchOpen ? 'close' : 'search'}
							initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
							animate={{ opacity: 1, scale: 1, rotate: 0 }}
							exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
							transition={{ duration: 0.2 }}
						>
							{isSearchOpen ? (
								<X size={18} style={{ color: '#0E327F' }} />
							) : (
								<Search size={18} style={{ color: '#0E327F' }} />
							)}
						</motion.div>
					</AnimatePresence>
				</button>
			</div>
		</div>
	)
}
