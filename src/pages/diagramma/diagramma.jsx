'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Clock, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const metroLines = {
	chilonzor: {
		name: 'Chilonzor liniyasi',
		color: 'bg-blue-500',
		textColor: 'text-blue-700',
		stations: [
			"Buyuk Ipak Yo'li",
			'Amir Temur Hiyoboni',
			'Yunus Rajabiy',
			"Ming O'rik",
			'Abdulla Qodiriy',
			'Pushkin',
			'Hamid Olimjon',
			'Bodomzor',
			'Medgorodok',
			'Chilonzor',
			"Mirzo Ulug'bek",
			'Novza',
			"Milliy Bog'",
			'Paxtakor',
			'Mustaqillik Maydoni',
			'Amir Temur Maydoni',
			'Chorsu',
			"G'afur G'ulom",
		],
	},
	uzbekistan: {
		name: "O'zbekiston liniyasi",
		color: 'bg-red-500',
		textColor: 'text-red-700',
		stations: [
			'Olmazor',
			'Chkalov',
			'Kosmonavtlar',
			'Oybek',
			'Toshkent',
			'Mashinasozlar',
			"Do'stlik",
			'Alisher Navoiy',
			"Milliy Bog'",
			'Novza',
			'Bunyodkor',
			'Shahriston',
			'Bodomzor',
			'Minor',
			'Universitet',
			"Xalqlar Do'stligi",
		],
	},
	yunusobod: {
		name: 'Yunusobod liniyasi',
		color: 'bg-green-500',
		textColor: 'text-green-700',
		stations: [
			'Yunusobod',
			'Shahriston',
			'Sergeli',
			"Qo'yliq",
			'Xadra',
			"Ming O'rik",
			'Abdulla Qahhor',
			'Paxtakor',
			'Olmaliq',
			'Chortoq',
			'Qatortol',
			'Tinchlik',
			'Yoshlik',
			'Sharq',
			'Janubiy',
			'Shimoliy',
		],
	},
}

const generateRandomStats = () => ({
	morning: Math.floor(Math.random() * 15000) + 5000,
	day: Math.floor(Math.random() * 20000) + 8000,
	evening: Math.floor(Math.random() * 18000) + 7000,
})

export default function Component() {
	const [selectedStation, setSelectedStation] = useState(null)
	const [stationStats, setStationStats] = useState({})
	const [animatedCards, setAnimatedCards] = useState(false)

	useEffect(() => {
		// Generate stats for all stations
		const stats = {}
		Object.values(metroLines).forEach(line => {
			line.stations.forEach(station => {
				stats[station] = generateRandomStats()
			})
		})
		setStationStats(stats)

		// Trigger card animation
		setTimeout(() => setAnimatedCards(true), 100)
	}, [])

	const totalStations = Object.values(metroLines).reduce(
		(acc, line) => acc + line.stations.length,
		0
	)
	const avgDailyPassengers =
		Object.values(stationStats).reduce((acc, stats) => {
			return (
				acc + (stats?.morning || 0) + (stats?.day || 0) + (stats?.evening || 0)
			)
		}, 0) / Math.max(totalStations, 1)

	const selectedStats = selectedStation ? stationStats[selectedStation] : null

	return (
		<div className='h-[700px] bg-white pt-10 overflow-hidden'>
			<div className='container'>
				<div className='mb-8 text-start'>
					<h1 className='text-3xl md:text-4xl font-bold text-blue-900 mb-2'>
						Toshkent Metro Boshqaruv Paneli
					</h1>
					<p className='text-gray-600'>
						Yo'lovchilar statistikasi va bekat ma'lumotlari
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Left Side - Statistics Cards */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Overview Cards */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<Card
								className={`bg-blue-900 text-white transform transition-all duration-700 hover:scale-105 ${
									animatedCards
										? 'translate-y-0 opacity-100'
										: 'translate-y-4 opacity-0'
								}`}
							>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium flex items-center gap-2'>
										<Users className='h-4 w-4' />
										Jami bekatlar
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>{totalStations}</div>
									<p className='text-blue-200 text-xs'>3 ta liniya bo'ylab</p>
								</CardContent>
							</Card>

							<Card
								className={`bg-blue-900 text-white transform transition-all duration-700 delay-100 hover:scale-105 ${
									animatedCards
										? 'translate-y-0 opacity-100'
										: 'translate-y-4 opacity-0'
								}`}
							>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium flex items-center gap-2'>
										<TrendingUp className='h-4 w-4' />
										O'rtacha kunlik oqim
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>
										{Math.floor(avgDailyPassengers).toLocaleString()}
									</div>
									<p className='text-blue-200 text-xs'>
										Har bir bekat uchun yo'lovchilar
									</p>
								</CardContent>
							</Card>

							<Card
								className={`bg-blue-900 text-white transform transition-all duration-700 delay-200 hover:scale-105 ${
									animatedCards
										? 'translate-y-0 opacity-100'
										: 'translate-y-4 opacity-0'
								}`}
							>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm font-medium flex items-center gap-2'>
										<Clock className='h-4 w-4' />
										Eng yuqori vaqt
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-bold'>7-9 ertalab</div>
									<p className='text-blue-200 text-xs'>Ertalabki rush</p>
								</CardContent>
							</Card>
						</div>

						{/* Selected Station Details */}
						{selectedStation && selectedStats ? (
							<Card
								className={`bg-gradient-to-br from-blue-900 to-blue-800 text-white transform transition-all duration-500 ${
									selectedStation
										? 'scale-100 opacity-100'
										: 'scale-95 opacity-0'
								}`}
							>
								<CardHeader>
									<CardTitle className='text-xl'>
										{selectedStation} bekati
									</CardTitle>
									<p className='text-blue-200'>
										Kunlik yo'lovchilar oqimining taqsimoti
									</p>
								</CardHeader>
								<CardContent>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
										<div className='bg-white/10 rounded-lg p-4 backdrop-blur-sm'>
											<div className='text-sm text-blue-200 mb-1'>
												Ertalab (6-12)
											</div>
											<div className='text-2xl font-bold'>
												{selectedStats.morning.toLocaleString()}
											</div>
										</div>
										<div className='bg-white/10 rounded-lg p-4 backdrop-blur-sm'>
											<div className='text-sm text-blue-200 mb-1'>
												Kun (12-18)
											</div>
											<div className='text-2xl font-bold'>
												{selectedStats.day.toLocaleString()}
											</div>
										</div>
										<div className='bg-white/10 rounded-lg p-4 backdrop-blur-sm'>
											<div className='text-sm text-blue-200 mb-1'>
												Kechqurun (18-24)
											</div>
											<div className='text-2xl font-bold'>
												{selectedStats.evening.toLocaleString()}
											</div>
										</div>
									</div>
									<div className='mt-4 pt-4 border-t border-white/20'>
										<div className='text-sm text-blue-200'>
											Jami kunlik yo'lovchilar
										</div>
										<div className='text-3xl font-bold'>
											{(
												selectedStats.morning +
												selectedStats.day +
												selectedStats.evening
											).toLocaleString()}
										</div>
									</div>
								</CardContent>
							</Card>
						) : (
							<div className='text-center text-blue-200 bg-blue-900 p-6 rounded-lg'>
								Diagramma chizilishi uchun o'ng tarafdan kerakli stansiyalarni
								bosing
							</div>
						)}
					</div>

					{/* Right Side - Metro Stations List */}
					<div className='lg:col-span-1'>
						<Card className='h-[600px] lg:h-[500px] border-0 shadow-2xl pb-2 rounded-[10px]'>
							<CardHeader>
								<CardTitle className='text-lg'>Metro bekatlari</CardTitle>
								<p className='text-sm text-gray-600'>
									Statistikani ko'rish uchun bekatni bosing
								</p>
							</CardHeader>
							<CardContent className='p-0'>
								<ScrollArea className='h-[500px] lg:h-[380px] px-4'>
									<div className='space-y-6'>
										{Object.entries(metroLines).map(
											([lineKey, line], lineIndex) => (
												<div
													key={lineKey}
													className={`transform transition-all duration-500 delay-${
														lineIndex * 100
													}`}
												>
													<div className='flex items-center gap-2 mb-3 sticky top-0 bg-white py-2 z-10'>
														<div
															className={`w-4 h-4 rounded-full ${line.color}`}
														></div>
														<h3 className={`font-semibold ${line.textColor}`}>
															{line.name}
														</h3>
														<Badge variant='secondary' className='text-xs'>
															{line.stations.length} ta bekat
														</Badge>
													</div>
													<div className='space-y-2 ml-6'>
														{line.stations.map((station, stationIndex) => (
															<button
																key={station}
																onClick={() => setSelectedStation(station)}
																className={`w-full text-left p-3 rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] ${
																	selectedStation === station
																		? 'bg-blue-50 border-2 border-blue-200 shadow-md'
																		: 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
																}`}
																style={{
																	animationDelay: `${
																		lineIndex * 100 + stationIndex * 50
																	}ms`,
																}}
															>
																<div className='flex items-center justify-between'>
																	<span
																		className={`font-medium ${
																			selectedStation === station
																				? 'text-blue-900'
																				: 'text-gray-900'
																		}`}
																	>
																		{station}
																	</span>
																	{stationStats[station] && (
																		<span className='text-xs text-gray-500'>
																			{(
																				(stationStats[station].morning +
																					stationStats[station].day +
																					stationStats[station].evening) /
																				1000
																			).toFixed(1)}
																			k
																		</span>
																	)}
																</div>
															</button>
														))}
													</div>
												</div>
											)
										)}
									</div>
								</ScrollArea>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
