'use client'

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { Briefcase, ChevronRight, Clock, MapPin, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

const metroLines = {
	chilonzor: {
		name: 'Chilonzor liniyasi',
		color: '#7E0200',
		stations: [
			{ id: 'olmazor', name: 'Olmazor', open: '05:00', close: '00:00' },
			{ id: 'chilonzor', name: 'Chilonzor', open: '05:00', close: '00:00' },
			{
				id: 'mirzo-ulugbek',
				name: "Mirzo Ulug'bek",
				open: '05:00',
				close: '00:00',
			},
			{ id: 'novza', name: 'Novza', open: '05:00', close: '00:00' },
			{ id: 'milliy-bog', name: "Milliy bog'", open: '05:00', close: '00:00' },
			{
				id: 'amir-temur',
				name: 'Amir Temur Hiyoboni',
				open: '05:00',
				close: '00:00',
			},
			{
				id: 'alisher-navoiy',
				name: 'Alisher Navoiy',
				open: '05:00',
				close: '00:00',
			},
			{ id: 'ming-orik', name: "Ming O'rik", open: '05:00', close: '00:00' },
			{
				id: 'hamid-olimjon',
				name: 'Hamid Olimjon',
				open: '05:00',
				close: '00:00',
			},
			{ id: 'pushkin', name: 'Pushkin', open: '05:00', close: '00:00' },
			{
				id: 'buyuk-ipak-yoli',
				name: "Buyuk Ipak Yo'li",
				open: '05:00',
				close: '00:00',
			},
		],
	},
	ozbekiston: {
		name: "O'zbekiston liniyasi",
		color: '#1e40af',
		stations: [
			{ id: 'toshkent', name: 'Toshkent', open: '05:00', close: '00:00' },
			{ id: 'ozbekiston', name: "O'zbekiston", open: '05:00', close: '00:00' },
			{
				id: 'kosmonavtlar',
				name: 'Kosmonavtlar',
				open: '05:00',
				close: '00:00',
			},
			{ id: 'oybek', name: 'Oybek', open: '05:00', close: '00:00' },
			{
				id: 'toshkent-shahar',
				name: 'Toshkent Shahar',
				open: '05:00',
				close: '00:00',
			},
			{
				id: 'mashinasozlar',
				name: 'Mashinasozlar',
				open: '05:00',
				close: '00:00',
			},
			{ id: 'dustlik', name: "Do'stlik", open: '05:00', close: '00:00' },
		],
	},
	yunusobod: {
		name: 'Yunusobod liniyasi',
		color: '#166534',
		stations: [
			{ id: 'yunusobod', name: 'Yunusobod', open: '05:00', close: '00:00' },
			{ id: 'shahriston', name: 'Shahriston', open: '05:00', close: '00:00' },
			{ id: 'bodomzor', name: 'Bodomzor', open: '05:00', close: '00:00' },
			{ id: 'minor', name: 'Minor', open: '05:00', close: '00:00' },
			{
				id: 'abdulla-qodiriy',
				name: 'Abdulla Qodiriy',
				open: '05:00',
				close: '00:00',
			},
			{ id: 'ming-orik-2', name: "Ming O'rik", open: '05:00', close: '00:00' },
			{ id: 'tinchlik', name: 'Tinchlik', open: '05:00', close: '00:00' },
		],
	},
	yerusti: {
		name: 'Yerusti Halqa liniyasi',
		color: '#a16207',
		stations: [
			{ id: 'yerusti-1', name: 'Yerusti 1', open: '05:00', close: '00:00' },
			{ id: 'yerusti-2', name: 'Yerusti 2', open: '05:00', close: '00:00' },
			{ id: 'yerusti-3', name: 'Yerusti 3', open: '05:00', close: '00:00' },
			{ id: 'yerusti-4', name: 'Yerusti 4', open: '05:00', close: '00:00' },
			{ id: 'yerusti-5', name: 'Yerusti 5', open: '05:00', close: '00:00' },
		],
	},
}

function getMetroStatus(openTimeStr, closeTimeStr, now = new Date()) {
	const [openHour, openMinute] = openTimeStr.split(':').map(Number)
	const [closeHour, closeMinute] = closeTimeStr.split(':').map(Number)

	const nowMinutes = now.getHours() * 200 + now.getMinutes()
	const openMinutes = openHour * 200 + openMinute
	const closeMinutes = closeHour * 200 + closeMinute

	if (openMinutes <= closeMinutes) {
		if (nowMinutes >= openMinutes && nowMinutes < closeMinutes) return 'open'
	} else {
		if (nowMinutes >= openMinutes || nowMinutes < closeMinutes) return 'open'
	}

	return 'closed'
}

export default function MetroSystem() {
	const [searchQuery, setSearchQuery] = useState('')
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [currentTime, setCurrentTime] = useState(new Date())
	const [selectedStation, setSelectedStation] = useState(null)
	const [activeView, setActiveView] = useState('ticker')

	const searchRef = useRef(null)
	const inputRef = useRef(null)
	const marqueeControls = useAnimationControls()

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 60000)
		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		if (activeView === 'ticker') {
			marqueeControls.start({
				x: '-50%',
				transition: {
					duration: 200,
					ease: 'linear',
					repeat: Number.POSITIVE_INFINITY,
				},
			})
		}
	}, [marqueeControls, activeView])

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

	const allStations = Object.values(metroLines).flatMap(line =>
		line.stations.map(station => ({
			...station,
			line: line.name,
			lineColor: line.color,
		}))
	)

	const isAnyLineOpen = allStations.some(
		station =>
			getMetroStatus(station.open, station.close, currentTime) === 'open'
	)

	const filteredStations = allStations.filter(
		station =>
			station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			station.line.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const stationsToShow = searchQuery.length > 0 ? filteredStations : allStations

	return (
		<div className='container bg-white rounded-md overflow-hidden shadow-lg'>
			{/* Enhanced Command Bar */}
			<motion.div
				ref={searchRef}
				className='relative bg-white border-gray-200 shadow-2xl overflow-hidden'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className='flex items-center h-16 px-6'>
					{/* Status Indicator */}
					<div className='flex items-center gap-3 flex-shrink-0'>
						<motion.div
							className='w-3 h-3 rounded-full shadow-lg'
							animate={{
								backgroundColor: isAnyLineOpen ? '#22c55e' : '#ef4444',
								boxShadow: isAnyLineOpen
									? '0 0 20px #22c55e'
									: '0 0 20px #ef4444',
							}}
						/>
						<div className='hidden sm:block'>
							<p className='text-sm font-semibold text-gray-900'>
								{isAnyLineOpen ? 'Tizim Faol' : 'Tizim Yopiq'}
							</p>
							<p className='text-xs text-gray-600'>Metro liniyalari</p>
						</div>
					</div>

					<div className='w-px h-8 bg-white/20 mx-4 flex-shrink-0' />

					{/* Main Content Area */}
					<div className='flex-grow h-full overflow-hidden'>
						<AnimatePresence mode='wait'>
							{isSearchOpen ? (
								<motion.div
									key='search'
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className='flex items-center h-full'
								>
									<input
										ref={inputRef}
										type='text'
										value={searchQuery}
										onChange={e => setSearchQuery(e.target.value)}
										placeholder='Bekatlar yoki liniyalarni qidiring...'
										className='w-full h-full text-gray-900 bg-transparent placeholder-gray-400 focus:outline-none'
									/>
								</motion.div>
							) : (
								<motion.div
									key='ticker'
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className='flex items-center h-full cursor-pointer'
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
										{[...stationsToShow, ...stationsToShow].map(
											(station, i) => (
												<div
													key={i}
													className='flex items-center flex-shrink-0 px-6'
												>
													<div
														className='w-2 h-2 rounded-full mr-3'
														style={{ backgroundColor: station.lineColor }}
													/>
													<p className='text-gray-900 font-medium mr-2'>
														{station.name}
													</p>
													<p className='text-gray-600 text-sm'>
														{station.open} - {station.close}
													</p>
												</div>
											)
										)}
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Action Buttons */}
					<div className='flex items-center gap-2 flex-shrink-0'>
						<button
							onClick={() =>
								setActiveView(activeView === 'map' ? 'ticker' : 'map')
							}
							className='p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-900'
						>
							<MapPin size={18} />
						</button>
						<button
							onClick={() => setIsSearchOpen(!isSearchOpen)}
							className='p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-900'
						>
							<AnimatePresence mode='wait'>
								<motion.div
									key={isSearchOpen ? 'close' : 'search'}
									initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
									animate={{ opacity: 1, scale: 1, rotate: 0 }}
									exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
									transition={{ duration: 0.2 }}
								>
									{isSearchOpen ? <X size={18} /> : <Search size={18} />}
								</motion.div>
							</AnimatePresence>
						</button>
					</div>
				</div>
			</motion.div>

			{/* Main Content */}
			<AnimatePresence mode='wait'>
				{activeView === 'map' && (
					<motion.div
						key='map'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
					>
						{Object.entries(metroLines).map(([key, line]) => (
							<motion.div
								key={key}
								className='bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-lg'
								whileHover={{ scale: 1.02 }}
							>
								<div className='flex items-center gap-3 mb-4'>
									<div
										className='w-4 h-4 rounded-full shadow-sm'
										style={{ backgroundColor: line.color }}
									/>
									<h3 className='text-gray-900 font-semibold'>{line.name}</h3>
								</div>
								<div className='space-y-2'>
									{line.stations.map(station => (
										<motion.button
											key={station.id}
											onClick={() =>
												setSelectedStation({
													...station,
													line: line.name,
													lineColor: line.color,
												})
											}
											className='w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors text-left border border-transparent hover:border-gray-200'
											whileHover={{ x: 4 }}
										>
											<div className='flex items-center gap-2'>
												<div
													className='w-3 h-3 rounded-full'
													style={{ backgroundColor: line.color }}
												/>
												<span className='text-gray-900 text-sm font-medium'>
													{station.name}
												</span>
											</div>
											<div className='flex items-center gap-2'>
												<div
													className={`w-2 h-2 rounded-full ${
														getMetroStatus(
															station.open,
															station.close,
															currentTime
														) === 'open'
															? 'bg-green-400'
															: 'bg-red-400'
													}`}
												/>
												<ChevronRight size={14} className='text-gray-400' />
											</div>
										</motion.button>
									))}
								</div>
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Station Details Modal */}
			<AnimatePresence>
				{selectedStation && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'
						onClick={() => setSelectedStation(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className='bg-white border border-gray-200 shadow-xl rounded-2xl p-6 max-w-md w-full'
							onClick={e => e.stopPropagation()}
						>
							<div className='flex items-center gap-3 mb-4'>
								<div
									className='w-6 h-6 rounded-full shadow-sm'
									style={{ backgroundColor: selectedStation.lineColor }}
								/>
								<div>
									<h3 className='text-xl font-bold text-gray-900'>
										{selectedStation.name}
									</h3>
									<p className='text-gray-600'>{selectedStation.line}</p>
								</div>
							</div>

							<div className='space-y-3'>
								<div className='flex items-center gap-2'>
									<Clock size={16} className='text-gray-600' />
									<span className='text-gray-900'>
										Ish vaqti: {selectedStation.open} - {selectedStation.close}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<div
										className={`w-3 h-3 rounded-full ${
											getMetroStatus(
												selectedStation.open,
												selectedStation.close,
												currentTime
											) === 'open'
												? 'bg-green-400'
												: 'bg-red-400'
										}`}
									/>
									<span className='text-gray-900'>
										Holati:{' '}
										{getMetroStatus(
											selectedStation.open,
											selectedStation.close,
											currentTime
										) === 'open'
											? 'Faol'
											: 'Faol emas'}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<Briefcase size={16} className='text-gray-600' />
									<span className='text-gray-900'>
										Metro bekati ma'lumotlari
									</span>
								</div>
							</div>

							<button
								onClick={() => setSelectedStation(null)}
								className='w-full mt-6 p-3 bg-blue-900 hover:bg-blue-800 text-white border border-blue-900 rounded-lg transition-colors'
							>
								Yopish
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
