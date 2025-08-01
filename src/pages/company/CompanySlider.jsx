'use client'

import { animate, motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const companies = [
	{
		name: `O'zbekiston Respublikasi hukumat portali`,
		logo: 'https://parliament.gov.uz/media/interactive_services/favicon_31jjx8x.png',
		desc: 'gov.uz',
		link: 'https://gov.uz/uz',
	},
	{
		name: 'Oʼzbekiston Respublikasi Oliy Majlisi Senati',
		logo: 'https://parliament.gov.uz/media/interactive_services/senat-build_tFdRS5u.png',
		desc: 'www.senat.uz',
		link: 'https://senat.uz/',
	},
	{
		name: `O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti`,
		logo: 'https://parliament.gov.uz/media/interactive_services/usefull5_T39hHvI.png',
		desc: 'www.president.uz',
		link: 'www.president.uz',
	},
	{
		name: `O'zbekiston Respublikasi Transport Vazirligi`,
		logo: 'https://sirdaryo.mintrans.uz/logo.png',
		desc: 'mintrans.uz',
		link: 'https://www.mintrans.uz/',
	},
]

export default function CompanySlider() {
	const x = useMotionValue(0)
	const [isHovered, setIsHovered] = useState(false)
	const [cardWidth, setCardWidth] = useState(280)
	const containerRef = useRef(null)
	const animationRef = useRef(null)

	// Calculate responsive card width
	useEffect(() => {
		const updateCardWidth = () => {
			if (window.innerWidth < 640) {
				setCardWidth(200)
			} else if (window.innerWidth < 768) {
				setCardWidth(240)
			} else {
				setCardWidth(280)
			}
		}

		updateCardWidth()
		window.addEventListener('resize', updateCardWidth)
		return () => window.removeEventListener('resize', updateCardWidth)
	}, [])

	// Duplicate companies for seamless loop
	const duplicatedCompanies = [
		...companies,
		...companies,
		...companies,
		...companies,
	]
	const totalWidth = useMemo(() => {
		return duplicatedCompanies.length * (cardWidth + 24)
	}, [cardWidth])

	const loopScroll = () => {
		const current = x.get()
		const next = current - 1

		x.set(next >= -totalWidth / 2 ? next : 0)

		animationRef.current = requestAnimationFrame(loopScroll)
	}

	const startAnimation = () => {
		stopAnimation()
		animationRef.current = requestAnimationFrame(loopScroll)
	}

	const stopAnimation = () => {
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current)
		}
	}

	useEffect(() => {
		if (!isHovered) {
			startAnimation()
		} else {
			stopAnimation()
		}

		return () => {
			stopAnimation()
		}
	}, [isHovered, cardWidth])

	const handleShift = direction => {
		const currentX = x.get()
		const shiftAmount = direction * (cardWidth + 24) * 2

		stopAnimation()

		animate(x, currentX + shiftAmount, {
			duration: 0.6,
			ease: 'easeInOut',
		}).then(() => {
			if (!isHovered) {
				startAnimation()
			}
		})
	}

	return (
		<div className='relative overflow-hidden'>
			<div className=''>
				<div className='flex justify-between items-center mb-8 container  pb-10'>
					<h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900'>
						Foydali havolalar
					</h2>
					<div className='flex gap-2'>
						<button
							onClick={() => handleShift(1)}
							className='bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl'
							aria-label='Previous'
						>
							<ChevronLeft size={20} />
						</button>
						<button
							onClick={() => handleShift(-1)}
							className='bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl'
							aria-label='Next'
						>
							<ChevronRight size={20} />
						</button>
					</div>
				</div>

				<div
					className='relative overflow-hidden py-1 '
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<motion.div ref={containerRef} className='flex gap-6' style={{ x }}>
						{duplicatedCompanies.map((company, index) => (
							<motion.div
								key={`${company.name}-${index}`}
								className='flex-shrink-0 bg-blue-400/10 border border-blue-900/20 rounded-xl p-4 sm:p-6 hover:scale-102 duration-100 transition-all duration-300 hover:scale-100 hover:border-blue-300'
								style={{ width: cardWidth }}
								// whileHover={{ y: -5 }}
							>
								<div className='flex flex-col items-center text-center h-full '>
									<div className='w-12 h-12 bg-white sm:w-16 sm:h-16 mb-4 flex items-center justify-center rounded-lg shadow-sm'>
										<img
											src={company.logo || '/placeholder.svg'}
											alt={`${company.name} logo`}
											className='max-w-full max-h-full object-contain'
											loading='lazy'
										/>
									</div>

									<h3 className='text-sm sm:text-base font-semibold text-gray-800 mb-3 line-clamp-3 leading-tight'>
										{company.name}
									</h3>

									<a
										href={company.link}
										target='_blank'
										rel='noopener noreferrer'
										className='text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors duration-200 hover:underline mt-auto'
									>
										{company.desc}
									</a>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	)
}
