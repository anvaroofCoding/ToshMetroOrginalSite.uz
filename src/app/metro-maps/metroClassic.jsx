'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import {
	Clock,
	Info,
	MapPin,
	Menu,
	Route,
	Star,
	Train,
	Users,
	X,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import sxema from '../../../public/images/sxema.jpg'

// Real Tashkent Metro Lines with actual stations
const metroLines = [
	{
		id: 1,
		name: 'Chilonzor Line',
		color: '#0E327F',
		stations: [
			'Chilonzor',
			'Mirzo Ulugbek',
			'Novza',
			'Ming Orik',
			'Abdulla Qodiriy',
			'Pakhtakor',
			'Mustakillik Maydoni',
			'Amir Temur Hiyoboni',
			'Alisher Navoiy',
			'Chorsu',
		],
	},
	{
		id: 2,
		name: 'Yunusobod Line',
		color: '#FF6B35',
		stations: [
			'Yunusobod',
			'Shahriston',
			'Kosmonavtlar',
			'Oybek',
			'Toshkent',
			'Ming Orik',
			'Hamid Olimjon',
			'Pushkin',
			'Gafur Gulom',
			'Buyuk Ipak Yoli',
		],
	},
	{
		id: 3,
		name: 'Sergeli Line',
		color: '#4ECDC4',
		stations: [
			'Sergeli',
			'Qoyliq',
			'Dustlik',
			'Olmazor',
			'Chilonzor',
			'Mirabad',
			'Alisher Navoiy',
			'Milliy Bog',
			'Bodomzor',
			'Minor',
		],
	},
]

const transferStations = ['Ming Orik', 'Alisher Navoiy', 'Chilonzor']

const allStations = metroLines.flatMap(line =>
	line.stations.map(station => ({
		name: station,
		line: line.name,
		color: line.color,
		passengers: Math.floor(Math.random() * 12000) + 3000,
		nextTrain: Math.floor(Math.random() * 8) + 1,
		rating: (Math.random() * 1.5 + 3.5).toFixed(1),
		isTransfer: transferStations.includes(station),
		openTime: '05:30',
		closeTime: '00:00',
	}))
)

export default function StationMetro() {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedLine, setSelectedLine] = useState(null)
	const [selectedStation, setSelectedStation] = useState(null)
	const [zoom, setZoom] = useState(1)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const mapRef = useRef(null)

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const filteredStations = allStations.filter(
		station =>
			station.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedLine === null ||
				metroLines.find(line => line.name === station.line)?.id ===
					selectedLine)
	)

	const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 4))
	const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.5))
	const handleResetZoom = () => setZoom(1)

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	}

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 100,
				damping: 12,
			},
		},
	}

	return (
		<motion.div
			className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
			initial='hidden'
			animate='visible'
			variants={containerVariants}
		>
			{/* Mobile-Optimized Header */}
			<motion.header
				variants={itemVariants}
				className='bg-white/95 backdrop-blur-lg border-b border-blue-100 top-0 z-50 shadow-sm'
			>
				<div className='container mx-auto px-4 sm:px-6 py-3 sm:py-4'>
					<div className='flex items-center justify-between'>
						<motion.div
							className='flex items-center space-x-3'
							whileHover={{ scale: 1.02 }}
							transition={{ type: 'spring', stiffness: 400, damping: 10 }}
						>
							<div className='relative'>
								<div className='w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0E327F] via-blue-600 to-blue-700 flex items-center justify-center shadow-lg'>
									<Train className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
								</div>
								<div className='absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse' />
							</div>
							<div>
								<h1 className='text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#0E327F] via-blue-600 to-indigo-600 bg-clip-text text-transparent'>
									Toshkent Metro
								</h1>
								<p className='text-xs sm:text-sm text-gray-600 font-medium hidden sm:block'>
									Interactive Metro Navigation
								</p>
							</div>
						</motion.div>

						<div className='flex items-center space-x-2 sm:space-x-4'>
							{/* Mobile Menu Button */}
							<Button
								variant='outline'
								size='sm'
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className='lg:hidden border-blue-200'
							>
								{isMobileMenuOpen ? (
									<X className='w-4 h-4' />
								) : (
									<Menu className='w-4 h-4' />
								)}
							</Button>

							{/* Desktop Search */}
							{/* <div className='relative hidden sm:block'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
								<Input
									placeholder='Search stations...'
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
									className='pl-10 w-48 sm:w-64 lg:w-72 border-blue-200 focus:border-[#0E327F] focus:ring-[#0E327F] bg-white/80'
								/>
							</div> */}

							<Badge
								variant='secondary'
								className='bg-blue-100 text-[#0E327F] px-2 py-1 text-xs sm:text-sm hidden sm:inline-flex'
							>
								{allStations.length} Stations
							</Badge>
						</div>
					</div>

					{/* Mobile Search */}
					{/* <div className='mt-3 sm:hidden'>
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
							<Input
								placeholder='Search stations...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='pl-10 w-full border-blue-200 focus:border-[#0E327F] focus:ring-[#0E327F] bg-white/80'
							/>
						</div>
					</div> */}
				</div>
			</motion.header>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '100%' }}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						className='inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl lg:hidden'
					>
						<div className='p-6 border-b border-gray-200'>
							<div className='flex items-center justify-between'>
								<h3 className='text-lg font-semibold text-[#0E327F]'>
									Metro Lines
								</h3>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => setIsMobileMenuOpen(false)}
								>
									<X className='w-4 h-4' />
								</Button>
							</div>
						</div>

						<div className='p-4 space-y-3 max-h-screen overflow-y-auto'>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => {
									setSelectedLine(null)
									setIsMobileMenuOpen(false)
								}}
								className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
									selectedLine === null
										? 'bg-gradient-to-r from-[#0E327F] to-blue-600 text-white shadow-lg'
										: 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
								}`}
							>
								<div className='font-medium'>All Lines</div>
								<div
									className={`text-sm ${
										selectedLine === null ? 'text-blue-100' : 'text-gray-500'
									}`}
								>
									View all stations
								</div>
							</motion.button>

							{metroLines.map((line, index) => (
								<motion.button
									key={line.id}
									initial={{ x: 50, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.1 * index }}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => {
										setSelectedLine(line.id)
										setIsMobileMenuOpen(false)
									}}
									className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
										selectedLine === line.id
											? 'text-white shadow-lg'
											: 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
									}`}
									style={{
										backgroundColor:
											selectedLine === line.id ? line.color : undefined,
									}}
								>
									<div className='flex items-center space-x-3'>
										<div
											className='w-4 h-4 rounded-full shadow-sm'
											style={{ backgroundColor: line.color }}
										/>
										<div className='flex-1'>
											<div className='font-medium'>{line.name}</div>
											<div
												className={`text-sm ${
													selectedLine === line.id
														? 'text-white/80'
														: 'text-gray-500'
												}`}
											>
												{line.stations.length} stations
											</div>
										</div>
									</div>
								</motion.button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className='container mx-auto px-4 sm:px-6 py-4 sm:py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8'>
					{/* Metro Map Display - Mobile First */}
					<motion.div variants={itemVariants} className='lg:col-span-8 order-1'>
						<Card className='border-blue-200 shadow-xl overflow-hidden'>
							{/* <CardHeader className='bg-gradient-to-r from-[#0E327F] to-blue-600 text-white p-4 sm:p-6'>
								<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0'>
									{/* <div>
										<CardTitle className='text-lg sm:text-xl lg:text-2xl flex items-center space-x-2'>
											<MapPin className='w-5 h-5 sm:w-6 sm:h-6' />
											<span>Official Metro Map</span>
										</CardTitle>
										<CardDescription className='text-blue-100 text-sm'>
											Interactive Tashkent Metro System Map
										</CardDescription>
									</div> */}

							{/* Map Controls */}
							{/* <div className='flex items-center space-x-2'>
										<Button
											size='sm'
											variant='secondary'
											onClick={handleZoomIn}
											className='bg-white/20 hover:bg-white/30 text-white border-white/30 p-2'
										>
											<ZoomIn className='w-4 h-4' />
										</Button>
										<Button
											size='sm'
											variant='secondary'
											onClick={handleZoomOut}
											className='bg-white/20 hover:bg-white/30 text-white border-white/30 p-2'
										>
											<ZoomOut className='w-4 h-4' />
										</Button>
										<Button
											size='sm'
											variant='secondary'
											onClick={handleResetZoom}
											className='bg-white/20 hover:bg-white/30 text-white border-white/30 p-2'
										>
											<RotateCcw className='w-4 h-4' />
										</Button>
										<Button
											size='sm'
											variant='secondary'
											onClick={() => setIsFullscreen(!isFullscreen)}
											className='bg-white/20 hover:bg-white/30 text-white border-white/30 p-2'
										>
											<Maximize2 className='w-4 h-4' />
										</Button>
									</div> */}
							{/* </div>
							</CardHeader> */}

							{/* <CardContent className='p-0 bg-gradient-to-br from-gray-50 to-blue-50'>
								<div
									ref={mapRef}
									className={`relative overflow-auto ${
										isFullscreen
											? 'fixed inset-0 z-50 bg-white'
											: 'h-64 sm:h-80 lg:h-[600px]'
									} bg-white touch-pan-x touch-pan-y`}
									style={{
										background:
											'radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%)',
									}}
								>
									{isFullscreen && (
										<div className='absolute top-4 right-4 z-10'>
											<Button
												onClick={() => setIsFullscreen(false)}
												className='bg-white/90 text-gray-800 hover:bg-white'
											>
												<X className='w-4 h-4' />
											</Button>
										</div>
									)}

									
								</div>
							</CardContent> */}
							<motion.div
								className='relative min-w-full min-h-full flex items-center justify-center p-2 sm:p-4'
								animate={{ scale: zoom }}
								transition={{ type: 'spring', stiffness: 300, damping: 30 }}
							>
								<div className='relative w-full max-w-full p-10'>
									<Image
										src={sxema}
										alt='Tashkent Metro Map'
										width={1200}
										height={800}
										className='rounded-lg w-full h-auto object-cover'
										style={{
											filter: 'contrast(1.1) saturate(1.1) brightness(1.05)',
											maxWidth: '100%',
											height: 'auto',
										}}
										priority
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
									/>

									{/* Mobile-Optimized Overlay Information */}
									{/* <div className='absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg'>
										<div className='text-xs sm:text-sm font-medium text-gray-800 mb-1'>
											Zoom: {Math.round(zoom * 100)}%
										</div>
										<div className='text-xs text-gray-600'>Pinch to zoom</div>
									</div> */}
								</div>
							</motion.div>
						</Card>
					</motion.div>

					{/* Desktop Station Information Panel */}
					<motion.div
						variants={itemVariants}
						className='lg:col-span-4 space-y-4 sm:space-y-6 order-2 hidden lg:block'
					>
						{/* Metro Lines - Desktop */}
						<Card className='border-blue-200 shadow-xl'>
							<CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 p-4'>
								<CardTitle className='flex items-center space-x-2 text-[#0E327F] text-lg'>
									<Route className='w-5 h-5' />
									<span>Metro Lines</span>
								</CardTitle>
							</CardHeader>
							<CardContent className='p-4 space-y-3'>
								<motion.button
									whileHover={{ scale: 1.02, x: 5 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setSelectedLine(null)}
									className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
										selectedLine === null
											? 'bg-gradient-to-r from-[#0E327F] to-blue-600 text-white shadow-lg'
											: 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300'
									}`}
								>
									<div className='font-medium'>All Lines</div>
									<div
										className={`text-sm ${
											selectedLine === null ? 'text-blue-100' : 'text-gray-500'
										}`}
									>
										View all stations
									</div>
								</motion.button>

								{metroLines.map((line, index) => (
									<motion.button
										key={line.id}
										initial={{ x: -50, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: 0.1 * index }}
										whileHover={{ scale: 1.02, x: 5 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setSelectedLine(line.id)}
										className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
											selectedLine === line.id
												? 'text-white shadow-lg transform scale-105'
												: 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300'
										}`}
										style={{
											backgroundColor:
												selectedLine === line.id ? line.color : undefined,
										}}
									>
										<div className='flex items-center space-x-3'>
											<div
												className='w-5 h-5 rounded-full shadow-sm'
												style={{ backgroundColor: line.color }}
											/>
											<div className='flex-1'>
												<div className='font-medium'>{line.name}</div>
												<div
													className={`text-sm ${
														selectedLine === line.id
															? 'text-white/80'
															: 'text-gray-500'
													}`}
												>
													{line.stations.length} stations
												</div>
											</div>
										</div>
									</motion.button>
								))}
							</CardContent>
						</Card>

						{/* Station List - Desktop */}
						<Card className='border-blue-200 shadow-xl'>
							<CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 p-4'>
								<CardTitle className='flex items-center justify-between'>
									<div className='flex items-center space-x-2 text-[#0E327F] text-lg'>
										<Train className='w-5 h-5' />
										<span>Stations</span>
									</div>
									<Badge
										variant='secondary'
										className='bg-blue-100 text-[#0E327F]'
									>
										{filteredStations.length}
									</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent className='p-0'>
								<div className='max-h-[400px] overflow-y-auto'>
									<AnimatePresence>
										{filteredStations.slice(0, 10).map((station, index) => (
											<motion.div
												key={`${station.name}-${station.line}`}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: 20 }}
												transition={{ delay: index * 0.05 }}
												whileHover={{ backgroundColor: '#f8fafc', x: 5 }}
												className='p-4 border-b border-gray-100 cursor-pointer transition-all duration-200'
												onClick={() =>
													setSelectedStation(
														selectedStation === station.name
															? null
															: station.name
													)
												}
											>
												<div className='flex items-center justify-between'>
													<div className='flex items-center space-x-3'>
														<div
															className='w-3 h-3 rounded-full shadow-sm'
															style={{ backgroundColor: station.color }}
														/>
														<div>
															<h3 className='font-semibold text-gray-900 flex items-center space-x-2'>
																<span>{station.name}</span>
																{station.isTransfer && (
																	<Badge
																		variant='outline'
																		className='text-xs bg-yellow-50 text-yellow-700 border-yellow-200'
																	>
																		Transfer
																	</Badge>
																)}
															</h3>
															<p className='text-sm text-gray-600'>
																{station.line}
															</p>
														</div>
													</div>
													<div className='text-right'>
														<div className='text-sm font-medium text-green-600'>
															{station.nextTrain} min
														</div>
														<div className='text-xs text-gray-500'>
															Next train
														</div>
													</div>
												</div>

												<AnimatePresence>
													{selectedStation === station.name && (
														<motion.div
															initial={{ height: 0, opacity: 0 }}
															animate={{ height: 'auto', opacity: 1 }}
															exit={{ height: 0, opacity: 0 }}
															transition={{ duration: 0.3 }}
															className='mt-4 pt-4 border-t border-gray-200'
														>
															<div className='grid grid-cols-2 gap-4 text-sm'>
																<div className='space-y-2'>
																	<div className='flex items-center space-x-2'>
																		<Users className='w-4 h-4 text-[#0E327F]' />
																		<span className='text-gray-600'>
																			Daily passengers:
																		</span>
																	</div>
																	<div className='font-semibold text-[#0E327F]'>
																		{station.passengers.toLocaleString()}
																	</div>
																</div>
																<div className='space-y-2'>
																	<div className='flex items-center space-x-2'>
																		<Clock className='w-4 h-4 text-green-600' />
																		<span className='text-gray-600'>
																			Operating hours:
																		</span>
																	</div>
																	<div className='font-semibold text-green-600'>
																		{station.openTime} - {station.closeTime}
																	</div>
																</div>
																<div className='space-y-2'>
																	<div className='flex items-center space-x-2'>
																		<Star className='w-4 h-4 text-yellow-500' />
																		<span className='text-gray-600'>
																			Rating:
																		</span>
																	</div>
																	<div className='font-semibold text-yellow-600'>
																		{station.rating} / 5.0
																	</div>
																</div>
																<div className='space-y-2'>
																	<div className='flex items-center space-x-2'>
																		<Info className='w-4 h-4 text-blue-500' />
																		<span className='text-gray-600'>
																			Status:
																		</span>
																	</div>
																	<div className='font-semibold text-green-600'>
																		Active
																	</div>
																</div>
															</div>
														</motion.div>
													)}
												</AnimatePresence>
											</motion.div>
										))}
									</AnimatePresence>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Mobile Station List */}
					<motion.div variants={itemVariants} className='lg:hidden order-3'>
						<Card className='border-blue-200 shadow-xl'>
							<CardHeader className='bg-gradient-to-r from-blue-50 to-indigo-50 p-4'>
								<CardTitle className='flex items-center justify-between'>
									<div className='flex items-center space-x-2 text-[#0E327F]'>
										<Train className='w-5 h-5' />
										<span>Stations</span>
									</div>
									<Badge
										variant='secondary'
										className='bg-blue-100 text-[#0E327F]'
									>
										{filteredStations.length}
									</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent className='p-0'>
								<div className='max-h-96 overflow-y-auto'>
									<AnimatePresence>
										{filteredStations.slice(0, 8).map((station, index) => (
											<motion.div
												key={`mobile-${station.name}-${station.line}`}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												transition={{ delay: index * 0.05 }}
												whileHover={{ backgroundColor: '#f8fafc' }}
												className='p-4 border-b border-gray-100 cursor-pointer transition-all duration-200'
												onClick={() =>
													setSelectedStation(
														selectedStation === station.name
															? null
															: station.name
													)
												}
											>
												<div className='flex items-center justify-between'>
													<div className='flex items-center space-x-3 flex-1 min-w-0'>
														<div
															className='w-3 h-3 rounded-full shadow-sm flex-shrink-0'
															style={{ backgroundColor: station.color }}
														/>
														<div className='min-w-0 flex-1'>
															<h3 className='font-semibold text-gray-900 truncate'>
																{station.name}
																{station.isTransfer && (
																	<Badge
																		variant='outline'
																		className='ml-2 text-xs bg-yellow-50 text-yellow-700 border-yellow-200'
																	>
																		Transfer
																	</Badge>
																)}
															</h3>
															<p className='text-sm text-gray-600 truncate'>
																{station.line}
															</p>
														</div>
													</div>
													<div className='text-right flex-shrink-0 ml-2'>
														<div className='text-sm font-medium text-green-600'>
															{station.nextTrain} min
														</div>
														<div className='text-xs text-gray-500'>Next</div>
													</div>
												</div>

												<AnimatePresence>
													{selectedStation === station.name && (
														<motion.div
															initial={{ height: 0, opacity: 0 }}
															animate={{ height: 'auto', opacity: 1 }}
															exit={{ height: 0, opacity: 0 }}
															transition={{ duration: 0.3 }}
															className='mt-4 pt-4 border-t border-gray-200'
														>
															<div className='grid grid-cols-2 gap-3 text-sm'>
																<div className='space-y-1'>
																	<div className='flex items-center space-x-2'>
																		<Users className='w-4 h-4 text-[#0E327F]' />
																		<span className='text-gray-600 text-xs'>
																			Passengers:
																		</span>
																	</div>
																	<div className='font-semibold text-[#0E327F] text-sm'>
																		{station.passengers.toLocaleString()}
																	</div>
																</div>
																<div className='space-y-1'>
																	<div className='flex items-center space-x-2'>
																		<Star className='w-4 h-4 text-yellow-500' />
																		<span className='text-gray-600 text-xs'>
																			Rating:
																		</span>
																	</div>
																	<div className='font-semibold text-yellow-600 text-sm'>
																		{station.rating} / 5.0
																	</div>
																</div>
															</div>
														</motion.div>
													)}
												</AnimatePresence>
											</motion.div>
										))}
									</AnimatePresence>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>

				{/* Mobile-Optimized Quick Stats */}
				<motion.div
					variants={itemVariants}
					className='mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6'
				>
					{[
						{ icon: Train, label: 'Metro Lines', value: '3', color: '#0E327F' },
						{
							icon: MapPin,
							label: 'Total Stations',
							value: allStations.length.toString(),
							color: '#FF6B35',
						},
						{
							icon: Users,
							label: 'Daily Passengers',
							value: '500K+',
							color: '#4ECDC4',
						},
						{
							icon: Clock,
							label: 'Operating Hours',
							value: '18.5h',
							color: '#10B981',
						},
					].map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{
								delay: 0.8 + index * 0.1,
								type: 'spring',
								stiffness: 200,
								duration: 0.6,
							}}
							whileHover={{ scale: 1.05, y: -5 }}
							whileTap={{ scale: 0.95 }}
						>
							<Card className='border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300'>
								<CardContent className='p-3 sm:p-6 text-center'>
									<motion.div
										className='w-8 h-8 sm:w-12 sm:h-12 rounded-full mx-auto mb-2 sm:mb-4 flex items-center justify-center'
										style={{ backgroundColor: `${stat.color}20` }}
										whileHover={{ rotate: 360 }}
										transition={{ duration: 0.6 }}
									>
										<stat.icon
											className='w-4 h-4 sm:w-6 sm:h-6'
											style={{ color: stat.color }}
										/>
									</motion.div>
									<div className='text-lg sm:text-2xl font-bold text-gray-900 mb-1'>
										{stat.value}
									</div>
									<div className='text-xs sm:text-sm text-gray-600'>
										{stat.label}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.div>
	)
}
