'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import {
	BarChart3,
	Building2,
	CreditCard,
	MapPin,
	Smartphone,
	TrendingUp,
	Users,
	Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function MetroInfoSection() {
	const [currentPaymentIndex, setCurrentPaymentIndex] = useState(0)
	const [currentCardIndex, setCurrentCardIndex] = useState(0)
	const [hoveredPoint, setHoveredPoint] = useState(null)

	const paymentMethods = [
		{
			icon: <CreditCard className='w-8 h-8' />,
			title: 'Plastik kartalar',
			description:
				"Visa, MasterCard va boshqa xalqaro kartalar bilan to'lov qiling",
		},
		{
			icon: <Smartphone className='w-8 h-8' />,
			title: "Click to'lov tizimi",
			description: "Click ilovasi orqali tez va xavfsiz to'lov amalga oshiring",
		},
		{
			icon: <Wallet className='w-8 h-8' />,
			title: "Payme to'lov tizimi",
			description: "Payme ilovasi yordamida qulay to'lov imkoniyati",
		},
	]

	const attoCards = [
		{
			name: 'Atto Classic',
			color: 'from-blue-600 to-blue-800',
			description: 'Standart transport kartasi',
			features: [
				'Barcha transport turlari',
				'Chegirmalar',
				"Online to'ldirish",
			],
		},
		{
			name: 'Atto Student',
			color: 'from-green-600 to-green-800',
			description: 'Talabalar uchun maxsus karta',
			features: ['50% chegirma', 'Universitet ID', 'Oylik abonement'],
		},
		{
			name: "Atto O'quvchilar",
			color: 'from-purple-600 to-purple-800',
			description: "Maktab o'quvchilari uchun",
			features: ['Bepul sayohat', 'Ota-ona nazorati', 'SMS xabarnoma'],
		},
		{
			name: 'Atto Ijtimoiy',
			color: 'from-amber-600 to-amber-800',
			description: 'Ijtimoiy toifalar uchun',
			features: ['Bepul transport', 'Tibbiy xizmatlar', 'Maxsus imtiyozlar'],
		},
	]

	const stationStats = [
		{
			name: 'Alisher Navoiy',
			color: '#3b82f6',
			data: [
				42000, 45000, 48000, 52000, 49000, 46000, 44000, 47000, 50000, 53000,
				51000, 48000,
			],
		},
		{
			name: 'Amir Temur Hiyoboni',
			color: '#ef4444',
			data: [
				35000, 38000, 41000, 44000, 42000, 39000, 37000, 40000, 43000, 46000,
				44000, 41000,
			],
		},
		{
			name: 'Yunus Rajabiy',
			color: '#10b981',
			data: [
				28000, 32000, 35000, 38000, 36000, 33000, 31000, 34000, 37000, 40000,
				38000, 35000,
			],
		},
		{
			name: 'Ming Orik',
			color: '#f59e0b',
			data: [
				25000, 28000, 31000, 34000, 32000, 29000, 27000, 30000, 33000, 36000,
				34000, 31000,
			],
		},
		{
			name: 'Bodomzor',
			color: '#8b5cf6',
			data: [
				22000, 25000, 28000, 31000, 29000, 26000, 24000, 27000, 30000, 33000,
				31000, 28000,
			],
		},
	]

	const months = [
		'Yan',
		'Fev',
		'Mar',
		'Apr',
		'May',
		'Iyn',
		'Iyl',
		'Avg',
		'Sen',
		'Okt',
		'Noy',
		'Dek',
	]

	useEffect(() => {
		const paymentInterval = setInterval(() => {
			setCurrentPaymentIndex(prev => (prev + 1) % paymentMethods.length)
		}, 4000)

		const cardInterval = setInterval(() => {
			setCurrentCardIndex(prev => (prev + 1) % attoCards.length)
		}, 3000)

		return () => {
			clearInterval(paymentInterval)
			clearInterval(cardInterval)
		}
	}, [])

	const maxValue = Math.max(...stationStats.flatMap(station => station.data))
	const chartHeight = 200
	const chartWidth = 700
	const padding = { top: 20, right: 40, bottom: 40, left: 60 }

	return (
		<section className='min-h-screen py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50'>
			<div className='container'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'
				>
					<h2 className='text-4xl md:text-5xl font-bold text-blue-900 mb-4'>
						Metro foydalanuvchilari uchun foydali ma'lumotlar
					</h2>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
					{/* Metro Map Advertisement */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, delay: 0.2 }}
						className='relative'
					>
						<Card className='h-full bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden'>
							<CardContent className='p-8 h-full flex flex-col justify-center relative'>
								{/* Animated Metro Map Background */}
								<div className='absolute inset-0 opacity-20'>
									<svg className='w-full h-full' viewBox='0 0 400 300'>
										{/* Metro Lines */}
										<motion.path
											d='M50 150 L350 150'
											stroke='#60a5fa'
											strokeWidth='4'
											fill='none'
											initial={{ pathLength: 0 }}
											animate={{ pathLength: 1 }}
											transition={{
												duration: 3,
												repeat: Number.POSITIVE_INFINITY,
												repeatType: 'loop',
												ease: 'easeInOut',
											}}
										/>
										<motion.path
											d='M200 50 L200 250'
											stroke='#f87171'
											strokeWidth='4'
											fill='none'
											initial={{ pathLength: 0 }}
											animate={{ pathLength: 1 }}
											transition={{
												duration: 3,
												delay: 1,
												repeat: Number.POSITIVE_INFINITY,
												repeatType: 'loop',
												ease: 'easeInOut',
											}}
										/>
										<motion.path
											d='M100 100 L300 200'
											stroke='#4ade80'
											strokeWidth='4'
											fill='none'
											initial={{ pathLength: 0 }}
											animate={{ pathLength: 1 }}
											transition={{
												duration: 3,
												delay: 2,
												repeat: Number.POSITIVE_INFINITY,
												repeatType: 'loop',
												ease: 'easeInOut',
											}}
										/>

										{/* Animated Stations */}
										{[
											{ x: 80, y: 150 },
											{ x: 140, y: 150 },
											{ x: 200, y: 150 },
											{ x: 260, y: 150 },
											{ x: 320, y: 150 },
											{ x: 200, y: 80 },
											{ x: 200, y: 110 },
											{ x: 200, y: 180 },
											{ x: 200, y: 220 },
											{ x: 130, y: 130 },
											{ x: 160, y: 160 },
											{ x: 240, y: 170 },
											{ x: 270, y: 185 },
										].map((station, index) => (
											<motion.circle
												key={index}
												cx={station.x}
												cy={station.y}
												r='6'
												fill='white'
												initial={{ scale: 0, opacity: 0 }}
												animate={{
													scale: [0, 1.2, 1],
													opacity: [0, 1, 0.8],
												}}
												transition={{
													duration: 2,
													delay: index * 0.2,
													repeat: Number.POSITIVE_INFINITY,
													repeatType: 'loop',
													ease: 'easeInOut',
												}}
											/>
										))}
									</svg>
								</div>

								{/* Content */}
								<div className='relative z-10'>
									<motion.div
										animate={{
											scale: [1, 1.05, 1],
											rotate: [0, 1, 0],
										}}
										transition={{
											duration: 6,
											repeat: Number.POSITIVE_INFINITY,
											ease: 'easeInOut',
										}}
										className='mb-6'
									>
										<MapPin className='w-16 h-16 mx-auto mb-4' />
									</motion.div>
									<h3 className='text-3xl font-bold mb-4 text-center'>
										Metro Xaritasi
									</h3>
									<p className='text-lg text-center mb-6 text-blue-100'>
										Toshkent metro tarmog'ining to'liq xaritasi bilan tanishing
									</p>
									<motion.div
										animate={{ y: [0, -10, 0] }}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: 'easeInOut',
										}}
										className='text-center'
									>
										<Badge variant='secondary' className='text-lg px-6 py-2'>
											Interaktiv xarita
										</Badge>
									</motion.div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Metro Information */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, delay: 0.4 }}
					>
						<Card className='h-full bg-white shadow-xl'>
							<CardContent className='p-8 h-full'>
								<h3 className='text-3xl font-bold text-blue-900 mb-8 text-center'>
									Metro haqida
								</h3>
								<div className='space-y-6'>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: 0.6 }}
										className='flex items-center justify-between p-4 bg-blue-50 rounded-lg'
									>
										<div className='flex items-center'>
											<Building2 className='w-8 h-8 text-blue-900 mr-4' />
											<span className='text-lg font-semibold text-blue-900'>
												Bekatlar soni
											</span>
										</div>
										<motion.span
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ duration: 0.5, delay: 1 }}
											className='text-2xl font-bold text-blue-900'
										>
											43
										</motion.span>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: 0.8 }}
										className='flex items-center justify-between p-4 bg-blue-50 rounded-lg'
									>
										<div className='flex items-center'>
											<MapPin className='w-8 h-8 text-blue-900 mr-4' />
											<span className='text-lg font-semibold text-blue-900'>
												Umumiy masofa
											</span>
										</div>
										<motion.span
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ duration: 0.5, delay: 1.2 }}
											className='text-2xl font-bold text-blue-900'
										>
											65.3 km
										</motion.span>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: 1 }}
										className='flex items-center justify-between p-4 bg-blue-50 rounded-lg'
									>
										<div className='flex items-center'>
											<Users className='w-8 h-8 text-blue-900 mr-4' />
											<span className='text-lg font-semibold text-blue-900'>
												Kunlik yo'lovchilar
											</span>
										</div>
										<motion.span
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ duration: 0.5, delay: 1.4 }}
											className='text-2xl font-bold text-blue-900'
										>
											1M+
										</motion.span>
									</motion.div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>

				{/* Enhanced Station Statistics */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.6 }}
					className='mb-16'
					data-stats-section
				>
					<Card className='bg-white shadow-xl overflow-hidden'>
						<CardContent className='p-8'>
							<div className='flex items-center justify-center mb-8'>
								<BarChart3 className='w-8 h-8 text-blue-900 mr-3' />
								<h3 className='text-3xl font-bold text-blue-900'>
									Bekatlar bo'yicha yillik statistika
								</h3>
							</div>

							{/* Legend */}
							<div className='flex flex-wrap justify-center gap-4 mb-8'>
								{stationStats.map((station, index) => (
									<motion.div
										key={station.name}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
										className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
											hoveredPoint?.stationIndex === index
												? 'bg-blue-100 shadow-md scale-105'
												: 'bg-gray-50 hover:bg-gray-100'
										}`}
										onMouseEnter={() =>
											setHoveredPoint({ stationIndex: index })
										}
										onMouseLeave={() => setHoveredPoint(null)}
									>
										<motion.div
											className='w-4 h-4 rounded-full'
											style={{ backgroundColor: station.color }}
											animate={{
												scale:
													hoveredPoint?.stationIndex === index
														? [1, 1.3, 1]
														: 1,
											}}
											transition={{ duration: 0.5 }}
										/>
										<span className='text-sm font-medium text-slate-700'>
											{station.name}
										</span>
									</motion.div>
								))}
							</div>

							{/* Enhanced Chart Container */}
							<div className='relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 overflow-hidden'>
								<div className='w-full overflow-x-auto'>
									<svg
										className='w-full min-w-[800px]'
										height='350'
										viewBox={`0 0 ${
											chartWidth + padding.left + padding.right
										} ${chartHeight + padding.top + padding.bottom}`}
									>
										{/* Grid Lines */}
										{[0, 1, 2, 3, 4, 5].map(i => (
											<motion.line
												key={`grid-${i}`}
												x1={padding.left}
												y1={padding.top + i * (chartHeight / 5)}
												x2={chartWidth + padding.left}
												y2={padding.top + i * (chartHeight / 5)}
												stroke='#e2e8f0'
												strokeWidth='1'
												initial={{ opacity: 0 }}
												animate={{ opacity: 0.5 }}
												transition={{ duration: 0.5, delay: i * 0.1 }}
											/>
										))}

										{/* Y-axis labels */}
										{[60, 50, 40, 30, 20, 10, 0].map((value, i) => (
											<motion.text
												key={`y-label-${i}`}
												x={padding.left - 10}
												y={padding.top + i * (chartHeight / 6) + 5}
												textAnchor='end'
												className='text-xs fill-slate-600 font-medium'
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
											>
												{value}k
											</motion.text>
										))}

										{/* X-axis labels */}
										{months.map((month, i) => (
											<motion.text
												key={`x-label-${i}`}
												x={
													padding.left + (i * chartWidth) / (months.length - 1)
												}
												y={chartHeight + padding.top + 25}
												textAnchor='middle'
												className='text-xs fill-slate-600 font-medium'
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
											>
												{month}
											</motion.text>
										))}

										{/* Station Lines and Points */}
										{stationStats.map((station, stationIndex) => {
											const pathData = station.data
												.map((value, monthIndex) => {
													const x =
														padding.left +
														(monthIndex * chartWidth) / (months.length - 1)
													const y =
														padding.top +
														chartHeight -
														(value / maxValue) * chartHeight
													return `${monthIndex === 0 ? 'M' : 'L'} ${x} ${y}`
												})
												.join(' ')

											return (
												<g key={station.name}>
													{/* Line Path */}
													<motion.path
														d={pathData}
														stroke={station.color}
														strokeWidth={
															hoveredPoint?.stationIndex === stationIndex
																? '4'
																: '3'
														}
														fill='none'
														initial={{ pathLength: 0, opacity: 0 }}
														animate={{
															pathLength: 1,
															opacity:
																hoveredPoint?.stationIndex === stationIndex
																	? 1
																	: hoveredPoint
																	? 0.3
																	: 1,
														}}
														transition={{
															duration: 2,
															delay: 1.5 + stationIndex * 0.2,
															ease: 'easeInOut',
														}}
														className='drop-shadow-sm'
													/>

													{/* Data Points */}
													{station.data.map((value, monthIndex) => {
														const x =
															padding.left +
															(monthIndex * chartWidth) / (months.length - 1)
														const y =
															padding.top +
															chartHeight -
															(value / maxValue) * chartHeight

														return (
															<motion.circle
																key={`${station.name}-${monthIndex}`}
																cx={x}
																cy={y}
																r={
																	hoveredPoint?.stationIndex === stationIndex
																		? '6'
																		: '4'
																}
																fill={station.color}
																initial={{ scale: 0, opacity: 0 }}
																animate={{
																	scale: 1,
																	opacity:
																		hoveredPoint?.stationIndex === stationIndex
																			? 1
																			: hoveredPoint
																			? 0.3
																			: 1,
																}}
																transition={{
																	duration: 0.3,
																	delay:
																		1.8 +
																		stationIndex * 0.2 +
																		monthIndex * 0.05,
																}}
																className='drop-shadow-sm cursor-pointer hover:scale-125 transition-transform'
																onMouseEnter={() =>
																	setHoveredPoint({
																		station: station.name,
																		value: value.toLocaleString(),
																		month: months[monthIndex],
																		stationIndex,
																		x,
																		y,
																	})
																}
																onMouseLeave={() => setHoveredPoint(null)}
															/>
														)
													})}
												</g>
											)
										})}

										{/* Enhanced Hover Tooltip */}
										{hoveredPoint && hoveredPoint.value && (
											<motion.g
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.2 }}
											>
												<rect
													x={hoveredPoint.x - 80}
													y={hoveredPoint.y - 60}
													width='160'
													height='50'
													rx='12'
													fill='rgba(30, 58, 138, 0.95)'
													stroke='rgba(59, 130, 246, 0.5)'
													strokeWidth='2'
													className='drop-shadow-lg'
												/>
												<text
													x={hoveredPoint.x}
													y={hoveredPoint.y - 38}
													textAnchor='middle'
													className='text-sm fill-white font-bold'
												>
													{hoveredPoint.station}
												</text>
												<text
													x={hoveredPoint.x}
													y={hoveredPoint.y - 22}
													textAnchor='middle'
													className='text-xs fill-blue-200'
												>
													{hoveredPoint.value} yo'lovchi
												</text>
												<text
													x={hoveredPoint.x}
													y={hoveredPoint.y - 10}
													textAnchor='middle'
													className='text-xs fill-blue-300'
												>
													{hoveredPoint.month} oyi
												</text>
											</motion.g>
										)}
									</svg>
								</div>

								{/* Summary Stats */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 3 }}
									className='mt-8 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl'
								>
									<div className='flex-1'>
										<div className='flex items-center mb-4'>
											<TrendingUp className='w-6 h-6 text-blue-900 mr-2' />
											<h4 className='text-xl font-bold text-blue-900'>
												Eng mashhur bekatlar
											</h4>
										</div>
										<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
											{stationStats.slice(0, 3).map((station, index) => {
												const avgPassengers = Math.round(
													station.data.reduce((a, b) => a + b, 0) /
														station.data.length
												)
												return (
													<motion.div
														key={station.name}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{
															duration: 0.5,
															delay: 3.2 + index * 0.1,
														}}
														className='bg-white p-4 rounded-lg shadow-sm border-l-4'
														style={{ borderLeftColor: station.color }}
													>
														<h5 className='font-semibold text-slate-800 mb-1'>
															{station.name}
														</h5>
														<p className='text-sm text-slate-600'>
															O'rtacha: {avgPassengers.toLocaleString()}{' '}
															kishi/oy
														</p>
													</motion.div>
												)
											})}
										</div>
									</div>
								</motion.div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Payment Methods */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.8 }}
					>
						<Card className='h-full bg-white shadow-xl'>
							<CardContent className='p-8 h-full flex flex-col justify-center'>
								<h3 className='text-3xl font-bold text-blue-900 mb-8 text-center'>
									To'lov usullari
								</h3>
								<div className='relative h-64 flex items-center justify-center'>
									<AnimatePresence mode='wait'>
										<motion.div
											key={currentPaymentIndex}
											initial={{ opacity: 0, rotateY: 90 }}
											animate={{ opacity: 1, rotateY: 0 }}
											exit={{ opacity: 0, rotateY: -90 }}
											transition={{ duration: 0.8 }}
											className='text-center'
										>
											<motion.div
												animate={{ scale: [1, 1.1, 1] }}
												transition={{
													duration: 2,
													repeat: Number.POSITIVE_INFINITY,
												}}
												className='mb-6 text-blue-900'
											>
												{paymentMethods[currentPaymentIndex].icon}
											</motion.div>
											<h4 className='text-2xl font-bold text-blue-900 mb-4'>
												{paymentMethods[currentPaymentIndex].title}
											</h4>
											<p className='text-lg text-blue-700'>
												{paymentMethods[currentPaymentIndex].description}
											</p>
										</motion.div>
									</AnimatePresence>
								</div>
								<div className='flex justify-center space-x-2 mt-6'>
									{paymentMethods.map((_, index) => (
										<motion.div
											key={index}
											animate={{
												scale: index === currentPaymentIndex ? 1.2 : 1,
												backgroundColor:
													index === currentPaymentIndex ? '#1e3a8a' : '#cbd5e1',
											}}
											className='w-3 h-3 rounded-full cursor-pointer'
											onClick={() => setCurrentPaymentIndex(index)}
										/>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Enhanced Atto Cards */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1 }}
					>
						<Card className='h-full bg-white shadow-xl'>
							<CardContent className='p-8 h-full flex flex-col justify-center'>
								<h3 className='text-3xl font-bold text-blue-900 mb-8 text-center'>
									Atto kartalar
								</h3>
								<div className='relative h-80 flex items-center justify-center'>
									<AnimatePresence mode='wait'>
										<motion.div
											key={currentCardIndex}
											initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
											animate={{ opacity: 1, scale: 1, rotateX: 0 }}
											exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
											transition={{ duration: 0.8 }}
											className='text-center w-full'
										>
											{/* Enhanced Card Design */}
											<motion.div
												animate={{
													rotateY: [0, 5, 0, -5, 0],
													scale: [1, 1.02, 1],
												}}
												transition={{
													duration: 4,
													repeat: Number.POSITIVE_INFINITY,
												}}
												className={`w-64 h-40 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${attoCards[currentCardIndex].color} shadow-2xl relative overflow-hidden`}
											>
												{/* Card Background Pattern */}
												<div className='absolute inset-0 opacity-20'>
													<div className='absolute top-4 right-4 w-12 h-12 border-2 border-white rounded-full'></div>
													<div className='absolute top-6 right-6 w-8 h-8 border-2 border-white rounded-full'></div>
													<div className='absolute bottom-4 left-4 w-16 h-1 bg-white rounded'></div>
													<div className='absolute bottom-6 left-4 w-12 h-1 bg-white rounded'></div>
												</div>

												{/* Card Content */}
												<div className='relative z-10 p-6 h-full flex flex-col justify-between text-white'>
													<div className='flex justify-between items-start'>
														<div>
															<CreditCard className='w-8 h-8 mb-2' />
															<p className='text-sm opacity-80'>ATTO</p>
														</div>
														<div className='text-right'>
															<p className='text-xs opacity-60'>
																Transport Card
															</p>
														</div>
													</div>

													<div>
														<p className='text-lg font-bold mb-1'>
															{attoCards[currentCardIndex].name}
														</p>
														<p className='text-xs opacity-80'>
															**** **** **** 1234
														</p>
													</div>
												</div>
											</motion.div>

											{/* Card Information */}
											<div className='space-y-4'>
												<h4 className='text-xl font-bold text-blue-900'>
													{attoCards[currentCardIndex].name}
												</h4>
												<p className='text-blue-700 mb-4'>
													{attoCards[currentCardIndex].description}
												</p>

												{/* Features List */}
												<div className='space-y-2'>
													{attoCards[currentCardIndex].features.map(
														(feature, index) => (
															<motion.div
																key={index}
																initial={{ opacity: 0, x: -20 }}
																animate={{ opacity: 1, x: 0 }}
																transition={{
																	duration: 0.3,
																	delay: index * 0.1,
																}}
																className='flex items-center text-sm text-slate-600'
															>
																<div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
																{feature}
															</motion.div>
														)
													)}
												</div>
											</div>
										</motion.div>
									</AnimatePresence>
								</div>
								<div className='flex justify-center space-x-2 mt-6'>
									{attoCards.map((_, index) => (
										<motion.div
											key={index}
											animate={{
												scale: index === currentCardIndex ? 1.2 : 1,
												backgroundColor:
													index === currentCardIndex ? '#1e3a8a' : '#cbd5e1',
											}}
											className='w-3 h-3 rounded-full cursor-pointer'
											onClick={() => setCurrentCardIndex(index)}
										/>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
