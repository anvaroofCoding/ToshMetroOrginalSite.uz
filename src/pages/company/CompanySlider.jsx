'use client'

import { animate, motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

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
		name: `Yagona interaktiv davlat xizmatlari portali`,
		logo: 'https://parliament.gov.uz/media/interactive_services/usefull4.png',
		desc: 'www.my.gov.uz ',
		link: 'www.my.gov.uz ',
	},
	{
		name: `O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti`,
		logo: 'https://parliament.gov.uz/media/interactive_services/usefull5_T39hHvI.png',
		desc: 'www.president.uz ',
		link: 'www.president.uz ',
	},
	{
		name: `O'zbekiston Respublikasi Prezidenti huzuridagi Davlat boshqaruvi akademiyasi`,
		logo: 'https://parliament.gov.uz/media/interactive_services/favicon_31jjx8x.png',
		desc: 'www.dba.uz',
		link: 'www.dba.uz',
	},
	{
		name: `O'zbekiston Respublikasi Oliy Majlisining Inson huquqlari bo'yicha vakili`,
		logo: 'https://parliament.gov.uz/media/interactive_services/usefull3.png',
		desc: 'www.data.gov.uz',
		link: 'www.data.gov.uz',
	},
	{
		name: `O'zbekiston Respublikasi Oliy Majlisining Inson huquqlari bo'yicha vakili`,
		logo: 'https://parliament.gov.uz/media/interactive_services/usefulll.png',
		desc: 'www.ombudsman.uz ',
		link: 'www.ombudsman.uz ',
	},
]

export default function CompanySlider() {
	const x = useMotionValue(0)
	const containerRef = useRef()

	useEffect(() => {
		startScroll()
	}, [])

	const startScroll = () => {
		animate(x, -containerRef.current.scrollWidth / 2, {
			type: 'linear',
			duration: 100,
			repeat: Infinity,
		})
	}

	const stopScroll = () => {
		x.stop()
	}

	const shift = dir => {
		const currentX = x.get()
		animate(x, currentX + dir * 200, { duration: 0.5, ease: 'easeOut' })
	}

	return (
		<div className='relative overflow-hidden bg-white  py-6'>
			<div className='flex container justify-between items-center mb-4'>
				<h2 className='text-[36px] font-bold text-blue-900'>
					Foydali havolalar
				</h2>
				<div className='flex gap-2'>
					<button
						onClick={() => shift(1)}
						className='bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition border-none'
					>
						<ChevronLeft size={20} />
					</button>
					<button
						onClick={() => shift(-1)}
						className='bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition'
					>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>

			<div
				className='relative mt-10 overflow-hidden'
				onMouseEnter={stopScroll}
				onMouseLeave={startScroll}
			>
				<motion.div
					ref={containerRef}
					className='flex gap-4 sm:gap-6'
					style={{ x }}
				>
					{Array(4)
						.fill(companies)
						.flat()
						.map((company, i) => (
							<div
								key={i}
								className='min-w-[160px] sm:min-w-[200px] md:min-w-[240px] bg-blue-50  border-blue-100 rounded-lg p-2 sm:p-3 shadow hover:shadow-lg transition'
							>
								<img
									src={company.logo}
									alt={`${company.name} logo`}
									className='h-10 sm:h-12 mx-auto mb-1 sm:mb-2'
								/>
								<p className='text-xs sm:text-[12px] text-center mb-1 font-semibold'>
									{company.name}
								</p>

								<a
									href={company.link}
									target='_blank'
									rel='noopener noreferrer'
									className='block text-center under-none mt-1 text-blue-600 text-[10px] sm:text-xs hover:text-blue-800'
								>
									{company.desc}
								</a>
							</div>
						))}
				</motion.div>
			</div>
		</div>
	)
}
