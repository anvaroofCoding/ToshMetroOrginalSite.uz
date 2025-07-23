// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { ArrowRight } from 'lucide-react'
// import Link from 'next/link'

// export default function MetroMapAdCard() {
// 	// Simplified station and line data for visual representation
// 	const lineColors = {
// 		red: '#DC2626',
// 		blue: '#2563EB',
// 		green: '#16A34A',
// 		yellow: '#CA8A04',
// 	}

// 	const abstractLines = [
// 		{ x1: 50, y1: 50, x2: 150, y2: 50, color: lineColors.red },
// 		{ x1: 150, y1: 50, x2: 180, y2: 80, color: lineColors.red },
// 		{ x1: 50, y1: 100, x2: 180, y2: 80, color: lineColors.blue },
// 		{ x1: 100, y1: 20, x2: 100, y2: 120, color: lineColors.green },
// 		{ x1: 180, y1: 80, x2: 220, y2: 120, color: lineColors.yellow },
// 	]

// 	const abstractStations = [
// 		{ cx: 50, cy: 50, color: lineColors.red },
// 		{ cx: 150, cy: 50, color: lineColors.red },
// 		{ cx: 180, cy: 80, color: lineColors.blue },
// 		{ cx: 50, cy: 100, color: lineColors.blue },
// 		{ cx: 100, cy: 20, color: lineColors.green },
// 		{ cx: 100, cy: 120, color: lineColors.green },
// 		{ cx: 220, cy: 120, color: lineColors.yellow },
// 	]

// 	return (
// 		<section className=' text-white flex items-center justify-center'>
// 			<div className='container'>
// 				<Card className='w-full  border-none bg-white text-blue-900 shadow-2xl rounded-xl overflow-hidden md:flex'>
// 					<div className='md:w-1/2 p-8 flex flex-col justify-center items-start text-left'>
// 						<CardHeader className='p-0 mb-4'>
// 							<CardTitle className='text-4xl font-bold leading-tight'>
// 								Toshkent Metropoliteni Xaritasi
// 							</CardTitle>
// 						</CardHeader>
// 						<CardContent className='p-0 mb-6 text-lg text-gray-700'>
// 							<p>
// 								Shaharning yuragi bo&apos;ylab sayohat qiling. Toshkent metro
// 								xaritasi bilan yo&apos;nalishlarni osonlikcha toping va
// 								stansiyalar haqida batafsil ma&apos;lumot oling.
// 							</p>
// 						</CardContent>
// 						<Link href={'/metro-xaritasis'}>
// 							<Button className='bg-blue-900 text-white hover:bg-blue-800 px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-200'>
// 								Xaritani Ko&apos;rish
// 								<ArrowRight className='ml-2 h-5 w-5' />
// 							</Button>
// 						</Link>
// 					</div>
// 					<div className='md:w-1/2 bg-blue-100 flex items-center justify-center p-6 relative overflow-hidden'>
// 						{/* Abstract SVG representation of metro lines */}
// 						<svg
// 							viewBox='0 0 250 150'
// 							className='w-full h-full max-w-[300px] max-h-[200px]'
// 						>
// 							<defs>
// 								<filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
// 									<feGaussianBlur
// 										in='SourceGraphic'
// 										stdDeviation='3'
// 										result='blur'
// 									/>
// 									<feFlood
// 										floodColor='rgba(0, 0, 0, 0.2)'
// 										floodOpacity='1'
// 										result='flood'
// 									/>
// 									<feComposite
// 										in='flood'
// 										in2='blur'
// 										operator='in'
// 										result='shadow'
// 									/>
// 									<feMerge>
// 										<feMergeNode in='shadow' />
// 										<feMergeNode in='SourceGraphic' />
// 									</feMerge>
// 								</filter>
// 							</defs>
// 							{abstractLines.map((line, index) => (
// 								<line
// 									key={`line-${index}`}
// 									x1={line.x1}
// 									y1={line.y1}
// 									x2={line.x2}
// 									y2={line.y2}
// 									stroke={line.color}
// 									strokeWidth='8'
// 									strokeLinecap='round'
// 									filter='url(#glow)'
// 								/>
// 							))}
// 							{abstractStations.map((station, index) => (
// 								<g key={`station-${index}`}>
// 									<circle
// 										cx={station.cx}
// 										cy={station.cy}
// 										r='6'
// 										fill='white'
// 										stroke={station.color}
// 										strokeWidth='2'
// 										filter='url(#glow)'
// 									/>
// 									<circle
// 										cx={station.cx}
// 										cy={station.cy}
// 										r='3'
// 										fill={station.color}
// 									/>
// 								</g>
// 							))}
// 						</svg>
// 						<div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50 -z-10'></div>
// 					</div>
// 				</Card>
// 			</div>
// 		</section>
// 	)
// }

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MetroMapAdCard() {
	const [isVisible, setIsVisible] = useState(false)
	const [animationStarted, setAnimationStarted] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 500)
		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => setAnimationStarted(true), 2000)
			return () => clearTimeout(timer)
		}
	}, [isVisible])

	// Accurate Tashkent Metro Lines with real colors
	const metroLines = [
		{
			id: "chilonzor-line",
			name: "Chilonzor liniyasi",
			color: "#DC2626", // Red
			path: "M70,380 Q90,360 110,340 Q140,310 170,280 Q200,250 230,220 Q260,190 290,160 Q320,130 350,100 Q380,70 410,40",
			duration: "10s",
			delay: "0s",
		},
		{
			id: "uzbekiston-line",
			name: "O'zbekiston liniyasi",
			color: "#2563EB", // Blue
			path: "M50,80 Q70,110 90,140 Q120,170 150,200 Q180,230 210,260 Q240,290 270,320 Q300,350 330,380",
			duration: "9s",
			delay: "0.8s",
		},
		{
			id: "yunusobod-line",
			name: "Yunusobod liniyasi",
			color: "#16A34A", // Green
			path: "M240,30 L240,70 L240,110 L240,150 L240,190 L240,230 L240,270 L240,310 L240,350",
			duration: "8s",
			delay: "1.6s",
		},

		{
			id: "circle-line",
			name: "Halqa liniyasi",
			color: "#06B6D4", // Cyan
			path: "M180,120 Q220,100 260,120 Q300,140 320,180 Q340,220 320,260 Q300,300 260,320 Q220,340 180,320 Q140,300 120,260 Q100,220 120,180 Q140,140 180,120",
			duration: "12s",
			delay: "3.2s",
		},
	]

	// More accurate station positions
	const stationsByLine = {
		chilonzor: [
			{ x: 70, y: 380, name: "Olmazor" },
			{ x: 100, y: 350, name: "Chilonzor" },
			{ x: 140, y: 310, name: "Mirzo Ulug'bek" },
			{ x: 170, y: 280, name: "Novza" },
			{ x: 200, y: 250, name: "Milliy bog'" },
			{ x: 230, y: 220, name: "Kosmonavtlar" },
			{ x: 260, y: 190, name: "Oybek" },
			{ x: 290, y: 160, name: "Toshkent" },
			{ x: 320, y: 130, name: "Mustaqillik maydoni" },
			{ x: 350, y: 100, name: "Amir Temur hiyoboni" },
		],
		uzbekiston: [
			{ x: 50, y: 80, name: "Beruni" },
			{ x: 70, y: 110, name: "Tinchlik" },
			{ x: 90, y: 140, name: "Chorsu" },
			{ x: 120, y: 170, name: "G'afur G'ulom" },
			{ x: 150, y: 200, name: "Alisher Navoiy" },
			{ x: 180, y: 230, name: "Paxtakor" },
			{ x: 210, y: 260, name: "O'zbekiston" },
			{ x: 240, y: 290, name: "Ming o'rik" },
			{ x: 270, y: 320, name: "Do'stlik" },
		],
		yunusobod: [
			{ x: 240, y: 30, name: "Yunusobod" },
			{ x: 240, y: 70, name: "Shahriston" },
			{ x: 240, y: 110, name: "Bodomzor" },
			{ x: 240, y: 150, name: "Minor" },
			{ x: 240, y: 190, name: "Abdulla Qodiriy" },
			{ x: 240, y: 230, name: "Amir Temur hiyoboni" },
			{ x: 240, y: 270, name: "Mashinasozlar" },
			{ x: 240, y: 310, name: "Texnopark" },
		],
		sirghali: [
			{ x: 80, y: 220, name: "Sergeli" },
			{ x: 130, y: 220, name: "Qipchaq" },
			{ x: 180, y: 220, name: "Yangiobod" },
			{ x: 230, y: 220, name: "Xonobod" },
			{ x: 280, y: 220, name: "Tolibjon" },
			{ x: 330, y: 220, name: "Matonat" },
			{ x: 380, y: 220, name: "Qo'yliq" },
		],
		circle: [
			{ x: 180, y: 120, name: "Buyuk Ipak Yo'li" },
			{ x: 220, y: 100, name: "Turkiston" },
			{ x: 260, y: 120, name: "Yunusobod" },
			{ x: 300, y: 140, name: "Shahriston" },
			{ x: 320, y: 180, name: "Bodomzor" },
			{ x: 300, y: 220, name: "Minor" },
			{ x: 260, y: 240, name: "Abdulla Qodiriy" },
			{ x: 220, y: 260, name: "Pushkin" },
		],
	}

	return (
		<div className="container">
			<Card className="w-full border-none bg-white shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
					{/* Enhanced Content Section */}
					<div className="order-2 lg:order-1 p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center space-y-6 lg:space-y-8 bg-gradient-to-br from-slate-50 to-blue-50">
						<div className="space-y-6 lg:space-y-8">
							<div className="space-y-3 lg:space-y-4">
								<div className="flex items-center gap-2 lg:gap-3 text-blue-600">
									<MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
									<span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
										Interaktiv Metro Xaritasi
									</span>
								</div>

								<CardHeader className="p-0">
									<CardTitle className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight">
										<span >
											Toshkent
										</span>
										<br />
										<span className="text-blue-900">Metropoliteni</span>
									</CardTitle>
								</CardHeader>
							</div>

							<CardContent className="p-0 space-y-4 lg:space-y-6 xl:space-y-8">
								<p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
									Shaharning eng zamonaviy transport tizimi. Barcha liniyalar, stansiyalar va yo'nalishlar haqida to'liq
									interaktiv ma'lumot.
								</p>

								{/* Metro Lines Legend */}
								<div className="space-y-3 lg:space-y-4">
									<h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">Metro Liniyalari:</h3>
									<div className="grid grid-cols-1 gap-2 lg:gap-3">
										{metroLines.map((line) => (
											<div
												key={line.id}
												className="flex items-center gap-2 lg:gap-3 bg-white rounded-lg px-3 py-2 lg:px-4 lg:py-3 shadow-sm"
											>
												<div
													className="w-3 h-3 lg:w-4 lg:h-4 rounded-full shadow-sm flex-shrink-0"
													style={{ backgroundColor: line.color }}
												></div>
												<span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{line.name}</span>
											</div>
										))}
									</div>
								</div>

								{/* Stats */}
								<div className="flex flex-wrap gap-2 lg:gap-4">
									<div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 lg:px-4 lg:py-2 shadow-sm">
										<Clock className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600 flex-shrink-0" />
										<span className="text-xs sm:text-sm font-medium text-gray-700">05:00 - 00:00</span>
									</div>
									<div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 lg:px-4 lg:py-2 shadow-sm">
										<MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-green-600 flex-shrink-0" />
										<span className="text-xs sm:text-sm font-medium text-gray-700">70+ Stansiya</span>
									</div>
								</div>
							</CardContent>
						</div>

						<Link href="/metro-xaritasis" className="inline-block">
							<Button
								size="lg"
								className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl font-semibold rounded-xl lg:rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-100 group"
							>
								<span className="hidden sm:inline">Interaktiv Xaritani Ko'rish</span>
								<span className="sm:hidden">Xaritani Ko'rish</span>
								<ArrowRight className="ml-2 lg:ml-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:translate-x-1" />
							</Button>
						</Link>
					</div>

					{/* Enhanced Map Visualization Section */}
					<div className="order-1 lg:order-2 bg-gradient-to-br from-gray-50 to-slate-100 p-4 sm:p-6 lg:p-8 xl:p-12 flex items-center justify-center relative overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-0">
						{/* Background Pattern */}
						<div className="absolute inset-0 opacity-5">
							<div
								className="absolute inset-0"
								style={{
									backgroundImage: `radial-gradient(circle at 25% 25%, #3B82F6 1px, transparent 1px),
                                 radial-gradient(circle at 75% 75%, #6366F1 1px, transparent 1px)`,
									backgroundSize: "20px 20px",
								}}
							></div>
						</div>

						{/* Enhanced Metro Map */}
						<div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl aspect-square">
							<svg viewBox="0 0 600 450" className="w-full h-full drop-shadow-lg lg:drop-shadow-xl">
								<defs>
									{/* Enhanced Glow Effects for each color */}
									{metroLines.map((line) => (
										<filter key={`glow-${line.id}`} id={`glow-${line.id}`} x="-50%" y="-50%" width="200%" height="200%">
											<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
											<feFlood floodColor={line.color} floodOpacity="0.4" result="flood" />
											<feComposite in="flood" in2="blur" operator="in" result="shadow" />
											<feMerge>
												<feMergeNode in="shadow" />
												<feMergeNode in="SourceGraphic" />
											</feMerge>
										</filter>
									))}

									{/* Gradient definitions for each line */}
									{metroLines.map((line) => (
										<linearGradient
											key={`gradient-${line.id}`}
											id={`gradient-${line.id}`}
											x1="0%"
											y1="0%"
											x2="100%"
											y2="100%"
										>
											<stop offset="0%" stopColor={line.color} stopOpacity="0.8" />
											<stop offset="50%" stopColor={line.color} stopOpacity="1" />
											<stop offset="100%" stopColor={line.color} stopOpacity="0.8" />
										</linearGradient>
									))}
								</defs>

								{/* Metro Lines with Enhanced Drawing Animation */}
								{metroLines.map((line, index) => (
									<g key={line.id}>
										<path
											d={line.path}
											stroke={`url(#gradient-${line.id})`}
											strokeWidth="6"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											filter={`url(#glow-${line.id})`}
											className={`transition-all duration-1500 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
											style={{
												strokeDasharray: "2000",
												strokeDashoffset: isVisible ? "0" : "2000",
												transitionDelay: `${index * 600}ms`,
											}}
										/>

										{/* Enhanced Moving Point Animation */}
										{animationStarted && (
											<circle r="4" fill="#ffffff" stroke={line.color} strokeWidth="2" filter={`url(#glow-${line.id})`}>
												<animateMotion dur={line.duration} repeatCount="indefinite" begin={line.delay}>
													<mpath href={`#path-${line.id}`} />
												</animateMotion>
											</circle>
										)}

										{/* Hidden path for animation reference */}
										<path id={`path-${line.id}`} d={line.path} fill="none" stroke="none" />
									</g>
								))}

								{/* Enhanced Station Points */}
								{Object.entries(stationsByLine).map(([lineKey, stations], lineIndex) =>
									stations.map((station, stationIndex) => {
										const line = metroLines[lineIndex]
										return (
											<g key={`${lineKey}-station-${stationIndex}`}>
												<circle
													cx={station.x}
													cy={station.y}
													r="4"
													fill="#ffffff"
													stroke={line?.color || "#1e3a8a"}
													strokeWidth="2"
													className={`transition-all duration-400 ease-out cursor-pointer ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
														}`}
													style={{
														transitionDelay: `${3000 + lineIndex * 200 + stationIndex * 100}ms`,
													}}
												/>
												<circle
													cx={station.x}
													cy={station.y}
													r="2"
													fill={line?.color || "#1e3a8a"}
													className={`transition-all duration-300 animate-pulse ${isVisible ? "opacity-100" : "opacity-0"
														}`}
													style={{
														transitionDelay: `${3200 + lineIndex * 200 + stationIndex * 100}ms`,
													}}
												/>
											</g>
										)
									}),
								)}

								{/* Major Intersection Points */}
								<circle
									cx="240"
									cy="220"
									r="8"
									fill="#ffffff"
									stroke="#1e3a8a"
									strokeWidth="3"
									className={`transition-all duration-600 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
										}`}
									style={{
										transitionDelay: "4000ms",
									}}
								/>
								<circle
									cx="240"
									cy="220"
									r="4"
									fill="#1e3a8a"
									className="animate-pulse"
									style={{
										animationDelay: "4500ms",
									}}
								/>
							</svg>
						</div>

						{/* Enhanced Metro Logo */}
						<div className="absolute top-4 left-4 lg:top-8 lg:left-8 bg-white rounded-full p-2 lg:p-4 shadow-lg">
							<div className="text-blue-900 font-bold text-lg lg:text-2xl">
								<span className="font-sans">M</span>
							</div>
						</div>

						{/* Floating Animation Elements - Hidden on small screens */}
						<div className="absolute inset-0 pointer-events-none hidden sm:block">
							{metroLines.map((line, index) => (
								<div
									key={`float-${index}`}
									className="absolute w-2 h-2 lg:w-3 lg:h-3 rounded-full animate-bounce opacity-60"
									style={{
										backgroundColor: line.color,
										top: `${20 + index * 15}%`,
										left: `${80 + (index % 2) * 10}%`,
										animationDelay: `${index * 0.5}s`,
										animationDuration: `${2 + index * 0.3}s`,
									}}
								></div>
							))}
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}
