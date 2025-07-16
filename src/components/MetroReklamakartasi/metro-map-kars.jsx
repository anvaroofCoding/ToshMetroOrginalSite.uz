import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function MetroMapAdCard() {
	// Simplified station and line data for visual representation
	const lineColors = {
		red: '#DC2626',
		blue: '#2563EB',
		green: '#16A34A',
		yellow: '#CA8A04',
	}

	const abstractLines = [
		{ x1: 50, y1: 50, x2: 150, y2: 50, color: lineColors.red },
		{ x1: 150, y1: 50, x2: 180, y2: 80, color: lineColors.red },
		{ x1: 50, y1: 100, x2: 180, y2: 80, color: lineColors.blue },
		{ x1: 100, y1: 20, x2: 100, y2: 120, color: lineColors.green },
		{ x1: 180, y1: 80, x2: 220, y2: 120, color: lineColors.yellow },
	]

	const abstractStations = [
		{ cx: 50, cy: 50, color: lineColors.red },
		{ cx: 150, cy: 50, color: lineColors.red },
		{ cx: 180, cy: 80, color: lineColors.blue },
		{ cx: 50, cy: 100, color: lineColors.blue },
		{ cx: 100, cy: 20, color: lineColors.green },
		{ cx: 100, cy: 120, color: lineColors.green },
		{ cx: 220, cy: 120, color: lineColors.yellow },
	]

	return (
		<section className=' text-white flex items-center justify-center'>
			<div className='container'>
				<Card className='w-full  border-none bg-white text-blue-900 shadow-2xl rounded-xl overflow-hidden md:flex'>
					<div className='md:w-1/2 p-8 flex flex-col justify-center items-start text-left'>
						<CardHeader className='p-0 mb-4'>
							<CardTitle className='text-4xl font-bold leading-tight'>
								Toshkent Metropoliteni Xaritasi
							</CardTitle>
						</CardHeader>
						<CardContent className='p-0 mb-6 text-lg text-gray-700'>
							<p>
								Shaharning yuragi bo&apos;ylab sayohat qiling. Toshkent metro
								xaritasi bilan yo&apos;nalishlarni osonlikcha toping va
								stansiyalar haqida batafsil ma&apos;lumot oling.
							</p>
						</CardContent>
						<Link href={'/metro-xaritasis'}>
							<Button className='bg-blue-900 text-white hover:bg-blue-800 px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-200'>
								Xaritani Ko&apos;rish
								<ArrowRight className='ml-2 h-5 w-5' />
							</Button>
						</Link>
					</div>
					<div className='md:w-1/2 bg-blue-100 flex items-center justify-center p-6 relative overflow-hidden'>
						{/* Abstract SVG representation of metro lines */}
						<svg
							viewBox='0 0 250 150'
							className='w-full h-full max-w-[300px] max-h-[200px]'
						>
							<defs>
								<filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
									<feGaussianBlur
										in='SourceGraphic'
										stdDeviation='3'
										result='blur'
									/>
									<feFlood
										floodColor='rgba(0, 0, 0, 0.2)'
										floodOpacity='1'
										result='flood'
									/>
									<feComposite
										in='flood'
										in2='blur'
										operator='in'
										result='shadow'
									/>
									<feMerge>
										<feMergeNode in='shadow' />
										<feMergeNode in='SourceGraphic' />
									</feMerge>
								</filter>
							</defs>
							{abstractLines.map((line, index) => (
								<line
									key={`line-${index}`}
									x1={line.x1}
									y1={line.y1}
									x2={line.x2}
									y2={line.y2}
									stroke={line.color}
									strokeWidth='8'
									strokeLinecap='round'
									filter='url(#glow)'
								/>
							))}
							{abstractStations.map((station, index) => (
								<g key={`station-${index}`}>
									<circle
										cx={station.cx}
										cy={station.cy}
										r='6'
										fill='white'
										stroke={station.color}
										strokeWidth='2'
										filter='url(#glow)'
									/>
									<circle
										cx={station.cx}
										cy={station.cy}
										r='3'
										fill={station.color}
									/>
								</g>
							))}
						</svg>
						<div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50 -z-10'></div>
					</div>
				</Card>
			</div>
		</section>
	)
}
