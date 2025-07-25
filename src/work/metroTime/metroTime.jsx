'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

// Metro liniyalari
const metroLines = [
	{
		name: 'Chilonzor liniyasi',
		color: '#7E0200',
		open: '05:00',
		close: '00:00',
	},
	{
		name: "O'zbekiston liniyasi",
		color: '#1e40af',
		open: '05:00',
		close: '00:00',
	},
	{
		name: 'Yunusobod liniyasi',
		color: '#166534',
		open: '05:00',
		close: '00:00',
	},
	{
		name: 'Yerusti Halqa liniyasi',
		color: '#a16207',
		open: '06:00',
		close: '23:00',
	},
]

export default function MetroSystem() {
	const marqueeControls = useAnimationControls()

	useEffect(() => {
		// Boshlang‘ich animatsiya
		marqueeControls.start({
			x: ['0%', '-50%'],
			transition: {
				duration: 40,
				ease: 'linear',
				repeat: Infinity,
			},
		})
	}, [marqueeControls])

	// Liniyalarni ikki marta ko‘paytiramiz, cheksiz aylanishni ta’minlash uchun
	const repeatedLines = [...metroLines, ...metroLines]

	return (
		<div className='bg-white container flex justify-center items-center rounded-md overflow-hidden shadow-xl border border-gray-200 h-[50px]'>
			{/* Yuqori panel */}
			<DotLottieReact
				src='https://lottie.host/cb45b20b-6ad3-4d3f-9081-44a8599aeb16/T6qQDU3hJb.lottie'
				loop
				autoplay
				className='w-40 h-20 relative -left-5 '
			/>

			{/* Cheksiz aylanuvchi liniyalar */}
			<div className='relative overflow-hidden -left-7 w-full h-14'>
				<AnimatePresence>
					<motion.div
						className='absolute top-0  left-0 flex items-center h-14'
						animate={marqueeControls}
					>
						{repeatedLines.map((line, index) => (
							<div
								key={index}
								className='flex items-center flex-shrink-0 px-6 whitespace-nowrap'
							>
								<div
									className='w-2 h-2 rounded-full mr-2'
									style={{ backgroundColor: line.color }}
								/>
								<p className='text-gray-900 font-medium mr-2'>{line.name}</p>
								<p className='text-gray-500 text-sm'>
									{line.open} - {line.close}
								</p>
							</div>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
