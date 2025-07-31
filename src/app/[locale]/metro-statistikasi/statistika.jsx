'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Calendar, Loader2, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const MetroStatistics = () => {
	const [apiStats, setApiStats] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [selectedStation, setSelectedStation] = useState('')
	const [stations, setStations] = useState([])
	const [activeTab, setActiveTab] = useState('bar')

	// Color schemes for different charts
	const colorSchemes = {
		bar: '#3b82f6', // Blue
		line: '#10b981', // Emerald
		area: '#8b5cf6', // Purple
		pie: [
			'#ef4444',
			'#f97316',
			'#eab308',
			'#22c55e',
			'#06b6d4',
			'#6366f1',
			'#ec4899',
			'#84cc16',
		],
	}

	// Function to get month order for sorting
	const getMonthOrder = monthName => {
		const months = {
			Yanvar: 1,
			Fevral: 2,
			Mart: 3,
			Aprel: 4,
			May: 5,
			Iyun: 6,
			Iyul: 7,
			Avgust: 8,
			Sentyabr: 9,
			Oktyabr: 10,
			Noyabr: 11,
			Dekabr: 12,
			January: 1,
			February: 2,
			March: 3,
			April: 4,
			May: 5,
			June: 6,
			July: 7,
			August: 8,
			September: 9,
			October: 10,
			November: 11,
			December: 12,
		}
		return months[monthName] || 0
	}

	useEffect(() => {
		const getStatistika = async () => {
			try {
				const response = await fetch(
					'https://metro-site.onrender.com/api/statistics/uz/'
				)
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}
				const data = await response.json()
				setApiStats(data)

				const uniqueStations = Array.from(
					new Set(data.map(stat => stat.station_name))
				)
				setStations(uniqueStations)

				if (uniqueStations.length > 0) {
					setSelectedStation(uniqueStations[0])
				}
			} catch (err) {
				console.error('Xatolik yuz berdi:', err)
				setError("Ma'lumotlarni yuklashda xatolik yuz berdi.")
			} finally {
				setLoading(false)
			}
		}

		getStatistika()
	}, [])

	// Get data for selected station
	const selectedStationData = apiStats
		.filter(item => item.station_name === selectedStation)
		.reduce((acc, monthData) => {
			const existingMonth = acc.find(item => item.month === monthData.month)
			if (!existingMonth) {
				acc.push({
					month: monthData.month,
					user_count: monthData.user_count,
				})
			}
			return acc
		}, [])
		.sort((a, b) => getMonthOrder(a.month) - getMonthOrder(b.month))

	// Calculate statistics
	const totalUsers = selectedStationData.reduce(
		(sum, item) => sum + item.user_count,
		0
	)
	const averageUsers =
		selectedStationData.length > 0
			? Math.round(totalUsers / selectedStationData.length)
			: 0
	const maxMonth = selectedStationData.reduce(
		(max, item) => (item.user_count > max.user_count ? item : max),
		{
			user_count: 0,
			month: '',
		}
	)
	const minMonth = selectedStationData.reduce(
		(min, item) => (item.user_count < min.user_count ? item : min),
		{
			user_count: Number.POSITIVE_INFINITY,
			month: '',
		}
	)

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
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
			},
		},
	}

	if (loading) {
		return (
			<div className='flex items-center justify-center h-[100vh]'>
				<motion.div
					className='flex items-center space-x-2'
					animate={{ scale: [1, 1.05, 1] }}
					transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
				>
					<Loader2 className='h-6 w-6 animate-spin text-blue-600' />
					<span className='text-lg font-medium'>Yuklanmoqda...</span>
				</motion.div>
			</div>
		)
	}

	if (error) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				className='max-w-md mx-auto mt-8'
			>
				<Alert variant='destructive'>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			</motion.div>
		)
	}

	return (
		<motion.div
			className='container min-h-screen overflow-hidden'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			<motion.div
				className='text-center space-y-2 my-6 sm:my-10 px-4'
				variants={itemVariants}
			>
				<h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900'>
					Metro Bekatlari Statistikasi
				</h1>
				<p className='text-sm sm:text-base text-muted-foreground'>
					Bekatni tanlang va uning oylik Yo'lovchilar statistikasini ko'ring
				</p>
			</motion.div>

			<motion.div variants={itemVariants}>
				<Card className='mb-6 border-2 border-blue-100 shadow-lg'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-blue-900'>
							<TrendingUp className='h-5 w-5' />
							Bekat Tanlash
						</CardTitle>
						<CardDescription>
							Statistikasini ko'rish uchun metro bekatini tanlang
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Select value={selectedStation} onValueChange={setSelectedStation}>
							<SelectTrigger className='w-full max-w-md border-blue-200 focus:border-blue-900 transition-colors'>
								<SelectValue placeholder='Bekatni tanlang...' />
							</SelectTrigger>
							<SelectContent>
								{stations.map(station => (
									<SelectItem
										key={station}
										value={station}
										className='focus:bg-blue-50'
									>
										{station}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</CardContent>
				</Card>
			</motion.div>

			<AnimatePresence mode='wait'>
				{selectedStation && (
					<motion.div
						key={selectedStation}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -30 }}
						transition={{ duration: 0.4 }}
					>
						{/* Statistics Cards */}
						<motion.div
							className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8'
							variants={containerVariants}
						>
							<motion.div variants={itemVariants}>
								<Card className='border-blue-200 hover:shadow-lg transition-shadow'>
									<CardContent className='pt-4 sm:pt-6'>
										<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
											<div className='mb-2 sm:mb-0'>
												<div className='text-lg sm:text-2xl font-bold text-blue-900'>
													{totalUsers.toLocaleString()}
												</div>
												<p className='text-xs sm:text-sm text-blue-600'>
													Jami Yo'lovchilar
												</p>
											</div>
											<Users className='h-6 w-6 sm:h-8 sm:w-8 text-blue-500 self-end sm:self-auto' />
										</div>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={itemVariants}>
								<Card className='border-blue-200 hover:shadow-lg transition-shadow'>
									<CardContent className='pt-4 sm:pt-6'>
										<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
											<div className='mb-2 sm:mb-0'>
												<div className='text-lg sm:text-2xl font-bold text-blue-900'>
													{averageUsers.toLocaleString()}
												</div>
												<p className='text-xs sm:text-sm text-blue-600'>
													O'rtacha oylik
												</p>
											</div>
											<BarChart3 className='h-6 w-6 sm:h-8 sm:w-8 text-blue-600 self-end sm:self-auto' />
										</div>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={itemVariants}>
								<Card className='border-blue-200 hover:shadow-lg transition-shadow'>
									<CardContent className='pt-4 sm:pt-6'>
										<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
											<div className='mb-2 sm:mb-0'>
												<div className='text-lg sm:text-2xl font-bold text-blue-900'>
													{maxMonth.user_count?.toLocaleString()}
												</div>
												<p className='text-xs sm:text-sm text-blue-600'>
													Eng yuqori{' '}
													{window.innerWidth > 640 ? `(${maxMonth.month})` : ''}
												</p>
											</div>
											<TrendingUp className='h-6 w-6 sm:h-8 sm:w-8 text-blue-600 self-end sm:self-auto' />
										</div>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div variants={itemVariants}>
								<Card className='border-blue-200 hover:shadow-lg transition-shadow'>
									<CardContent className='pt-4 sm:pt-6'>
										<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
											<div className='mb-2 sm:mb-0'>
												<div className='text-lg sm:text-2xl font-bold text-blue-900'>
													{minMonth.user_count?.toLocaleString()}
												</div>
												<p className='text-xs sm:text-sm text-blue-600'>
													Eng past{' '}
													{window.innerWidth > 640 ? `(${minMonth.month})` : ''}
												</p>
											</div>
											<Calendar className='h-6 w-6 sm:h-8 sm:w-8 text-blue-500 self-end sm:self-auto' />
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>

						{/* Charts Section */}
						<motion.div variants={itemVariants}>
							<Card className='shadow-xl border-2 border-gray-100'>
								<CardHeader>
									<CardTitle className='text-2xl font-bold text-gray-800'>
										{selectedStation} bekati statistikasi
									</CardTitle>
									<CardDescription>
										Turli ko'rinishlarda oylik Yo'lovchilar statistikasi
									</CardDescription>
								</CardHeader>
								<CardContent>
									{/* Responsive Chart Type Selection */}
									<div className='mb-6'>
										{/* Mobile: Select dropdown */}
										<div className='block sm:hidden'>
											<Select value={activeTab} onValueChange={setActiveTab}>
												<SelectTrigger className='w-full bg-blue-900 text-white border-blue-700 focus:border-blue-500'>
													<SelectValue placeholder='Grafik turini tanlang' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='bar' className='focus:bg-blue-50'>
														Ustunli grafik
													</SelectItem>
													<SelectItem
														value='line'
														className='focus:bg-emerald-50'
													>
														Chiziqli grafik
													</SelectItem>
													<SelectItem
														value='area'
														className='focus:bg-purple-50'
													>
														Maydonli grafik
													</SelectItem>
													<SelectItem
														value='pie'
														className='focus:bg-orange-50'
													>
														Doirasimon grafik
													</SelectItem>
												</SelectContent>
											</Select>
										</div>

										{/* Desktop: Tabs */}
										<div className='hidden sm:block'>
											<div className='flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg'>
												<button
													onClick={() => setActiveTab('bar')}
													className={`flex-1 min-w-0 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
														activeTab === 'bar'
															? 'bg-blue-500 text-white shadow-md'
															: 'text-gray-600 hover:text-gray-900 hover:bg-white'
													}`}
												>
													Ustunli
												</button>
												<button
													onClick={() => setActiveTab('line')}
													className={`flex-1 min-w-0 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
														activeTab === 'line'
															? 'bg-emerald-500 text-white shadow-md'
															: 'text-gray-600 hover:text-gray-900 hover:bg-white'
													}`}
												>
													Chiziqli
												</button>
												<button
													onClick={() => setActiveTab('area')}
													className={`flex-1 min-w-0 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
														activeTab === 'area'
															? 'bg-purple-500 text-white shadow-md'
															: 'text-gray-600 hover:text-gray-900 hover:bg-white'
													}`}
												>
													Maydonli
												</button>
												<button
													onClick={() => setActiveTab('pie')}
													className={`flex-1 min-w-0 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
														activeTab === 'pie'
															? 'bg-orange-500 text-white shadow-md'
															: 'text-gray-600 hover:text-gray-900 hover:bg-white'
													}`}
												>
													{/* <span className='hidden md:inline'>🥧 </span> */}
													Doirasimon
												</button>
											</div>
										</div>
									</div>

									<AnimatePresence mode='wait'>
										{/* Bar Chart */}
										{activeTab === 'bar' && (
											<motion.div
												key='bar'
												initial={{ opacity: 0, scale: 0.95 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.95 }}
												transition={{ duration: 0.3 }}
												className='h-[300px] sm:h-[400px] w-full'
											>
												<ResponsiveContainer width='100%' height='100%'>
													<BarChart
														data={selectedStationData}
														margin={{
															top: 20,
															right: 10,
															left: 10,
															bottom: 60,
														}}
													>
														<XAxis
															dataKey='month'
															tick={{
																fontSize: 10,
																fill: '#1f2937',
																fontWeight: 'bold',
															}}
															angle={-45}
															textAnchor='end'
															height={80}
															interval={0}
														/>
														<YAxis
															tick={{
																fontSize: 10,
																fill: '#1f2937',
																fontWeight: 'bold',
															}}
														/>
														<Tooltip
															formatter={value => [
																value.toLocaleString(),
																"Yo'lovchilar",
															]}
															labelStyle={{
																color: '#1f2937',
																fontWeight: 'bold',
															}}
															contentStyle={{
																backgroundColor: '#f8fafc',
																border: '2px solid #3b82f6',
																borderRadius: '8px',
																boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
																fontSize: '12px',
															}}
														/>
														<Legend wrapperStyle={{ fontSize: '12px' }} />
														<Bar
															dataKey='user_count'
															fill={colorSchemes.bar}
															name="Yo'lovchilar soni"
															radius={[4, 4, 0, 0]}
															animationDuration={1000}
														/>
													</BarChart>
												</ResponsiveContainer>
											</motion.div>
										)}

										{/* Line Chart */}
										{activeTab === 'line' && (
											<motion.div
												key='line'
												initial={{ opacity: 0, scale: 0.95 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.95 }}
												transition={{ duration: 0.3 }}
												className='h-[300px] sm:h-[400px] w-full'
											>
												<ResponsiveContainer width='100%' height='100%'>
													<LineChart
														data={selectedStationData}
														margin={{
															top: 20,
															right: 10,
															left: 10,
															bottom: 60,
														}}
													>
														<XAxis
															dataKey='month'
															tick={{
																fontSize: 10,
																fill: '#1f2937',
																fontWeight: 'bold',
															}}
															angle={-45}
															textAnchor='end'
															height={80}
															interval={0}
														/>
														<YAxis
															tick={{
																fontSize: 10,
																fill: '#1f2937',
																fontWeight: 'bold',
															}}
														/>
														<Tooltip
															formatter={value => [
																value.toLocaleString(),
																"Yo'lovchilar",
															]}
															labelStyle={{
																color: '#1f2937',
																fontWeight: 'bold',
															}}
															contentStyle={{
																backgroundColor: '#f0fdf4',
																border: '2px solid #10b981',
																borderRadius: '8px',
																boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
																fontSize: '12px',
															}}
														/>
														<Legend wrapperStyle={{ fontSize: '12px' }} />
														<Line
															type='monotone'
															dataKey='user_count'
															stroke={colorSchemes.line}
															strokeWidth={2}
															dot={{
																fill: colorSchemes.line,
																strokeWidth: 2,
																r: 4,
															}}
															activeDot={{
																r: 6,
																stroke: colorSchemes.line,
																strokeWidth: 2,
															}}
															name="Yo'lovchilar soni"
															animationDuration={1500}
														/>
													</LineChart>
												</ResponsiveContainer>
											</motion.div>
										)}

										{/* Area Chart */}
										{activeTab === 'area' && (
											<motion.div
												key='area'
												initial={{ opacity: 0, scale: 0.95 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.95 }}
												transition={{ duration: 0.3 }}
												className='h-[300px] sm:h-[400px] w-full'
											>
												<ResponsiveContainer width='100%' height='100%'>
													<AreaChart
														data={selectedStationData}
														margin={{
															top: 20,
															right: 10,
															left: 10,
															bottom: 60,
														}}
													>
														<XAxis
															dataKey='month'
															tick={{
																fontSize: 10,
																fill: '#1f2937',
																fontWeight: 'bold',
															}}
															angle={-45}
															textAnchor='end'
															height={80}
															interval={0}
														/>
														<YAxis
															tick={{
																fontSize: 10,
																fill: '#1f2937',
																fontWeight: 'bold',
															}}
														/>
														<Tooltip
															formatter={value => [
																value.toLocaleString(),
																"Yo'lovchilar",
															]}
															labelStyle={{
																color: '#1f2937',
																fontWeight: 'bold',
															}}
															contentStyle={{
																backgroundColor: '#faf5ff',
																border: '2px solid #8b5cf6',
																borderRadius: '8px',
																boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
																fontSize: '12px',
															}}
														/>
														<Legend wrapperStyle={{ fontSize: '12px' }} />
														<Area
															type='monotone'
															dataKey='user_count'
															stroke={colorSchemes.area}
															fill={colorSchemes.area}
															fillOpacity={0.3}
															strokeWidth={2}
															name="Yo'lovchilar soni"
															animationDuration={1200}
														/>
													</AreaChart>
												</ResponsiveContainer>
											</motion.div>
										)}

										{/* Pie Chart */}
										{activeTab === 'pie' && (
											<motion.div
												key='pie'
												initial={{ opacity: 0, scale: 0.95 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.95 }}
												transition={{ duration: 0.3 }}
												className='h-[300px] sm:h-[400px] w-full'
											>
												<ResponsiveContainer width='100%' height='100%'>
													<PieChart>
														<Pie
															data={selectedStationData}
															cx='50%'
															cy='50%'
															labelLine={false}
															label={({ month, percent }) =>
																window.innerWidth > 640
																	? `${month} ${(percent * 100).toFixed(0)}%`
																	: `${(percent * 100).toFixed(0)}%`
															}
															outerRadius={window.innerWidth > 640 ? 120 : 80}
															fill='#8884d8'
															dataKey='user_count'
															animationDuration={1000}
														>
															{selectedStationData.map((entry, index) => (
																<Cell
																	key={`cell-${index}`}
																	fill={
																		colorSchemes.pie[
																			index % colorSchemes.pie.length
																		]
																	}
																/>
															))}
														</Pie>
														<Tooltip
															formatter={value => [
																value.toLocaleString(),
																"Yo'lovchilar",
															]}
															contentStyle={{
																backgroundColor: '#fff7ed',
																border: '2px solid #f97316',
																borderRadius: '8px',
																boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
																fontSize: '12px',
															}}
														/>
													</PieChart>
												</ResponsiveContainer>
											</motion.div>
										)}
									</AnimatePresence>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{selectedStationData.length === 0 && selectedStation && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					<Alert>
						<AlertDescription>
							{selectedStation} bekati uchun statistika ma'lumotlari topilmadi.
						</AlertDescription>
					</Alert>
				</motion.div>
			)}
		</motion.div>
	)
}

export default MetroStatistics
