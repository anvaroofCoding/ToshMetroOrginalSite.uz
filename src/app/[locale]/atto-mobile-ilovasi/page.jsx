'use client'

import { Button } from '@/components/ui/button'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Bell, ChevronRight, Menu, QrCode } from 'lucide-react'
import Image from 'next/image'
import img1 from '../../../images/AppStore.png'
import img2 from '../../../images/PlayMarket.png'

export default function AttoLandingPage() {
	const x = useMotionValue(200)
	const y = useMotionValue(200)

	const rotateX = useTransform(y, [0, 400], [15, -15])
	const rotateY = useTransform(x, [0, 400], [-15, 15])

	function handleMouse(event) {
		const rect = event.currentTarget.getBoundingClientRect()
		x.set(event.clientX - rect.left)
		y.set(event.clientY - rect.top)
	}

	const features = [
		'Xarajatlaringizni nazorat qiling',
		"Kartani onlayn tarzda to'ldiring",
		"Yo'qolgan taqdirda kartani bloklang",
		'Bepul virtual ATTO kartasini buyurtma qiling',
	]

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
			},
		},
	}

	return (
		<div className='bg-gray-50 min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto'>
				{/* iPhone 16 Pro Max Mockup */}
				<motion.div
					style={{
						perspective: 2500,
					}}
					onMouseMove={handleMouse}
					onMouseLeave={() => {
						x.set(160)
						y.set(325)
					}}
					className='mx-auto w-[280px] h-[570px] sm:w-[320px] sm:h-[650px]'
				>
					<motion.div
						style={{
							width: '100%',
							height: '100%',
							rotateX,
							rotateY,
							transformStyle: 'preserve-3d',
						}}
						className='bg-gray-800 rounded-[40px] sm:rounded-[50px] p-1.5 shadow-2xl shadow-gray-400/30 border-2 sm:border-4 border-gray-300'
					>
						<div className='w-full h-full bg-black rounded-[32px] sm:rounded-[42px] overflow-hidden relative'>
							{/* Screen Content */}
							<div className='absolute inset-0 bg-[#2C3A8A] p-4 flex flex-col'>
								{/* App Header */}
								<div className='flex justify-between items-center text-white mb-4 sm:mb-6 pt-6 sm:pt-8'>
									<Menu size={24} />
									<span className='font-semibold text-sm sm:text-base'>
										Asosiy
									</span>
									<div className='relative'>
										<Bell size={24} />
										<span className='absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#2C3A8A]'></span>
									</div>
								</div>

								{/* Card */}
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.5, duration: 0.5 }}
									className='bg-white/10 rounded-2xl p-4 flex-grow relative overflow-hidden backdrop-blur-sm'
								>
									<div className='flex justify-between items-start'>
										<div>
											<p className='text-white font-bold text-base sm:text-lg'>
												ATTO
											</p>
											<p className='text-white text-2xl sm:text-3xl font-bold mt-1'>
												0.0 so'm
											</p>
										</div>
										<div className='flex space-x-1'>
											<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/50'></div>
											<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/50'></div>
											<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/50'></div>
										</div>
									</div>
									<div className='mt-4 sm:mt-8'>
										<p className='text-white/70 tracking-widest text-base sm:text-lg'>
											9900 0000 0000 0000
										</p>
										<p className='text-white/70 text-xs sm:text-sm mt-2'>
											Karta nomi: ATTO
										</p>
									</div>
									<Image
										src='/placeholder.svg?width=200&height=100'
										alt='Bus'
										width={200}
										height={100}
										className='absolute bottom-2 right-0 opacity-20'
									/>
								</motion.div>

								{/* Buttons */}
								<div className='mt-4 sm:mt-6 space-y-3'>
									<Button className='w-full h-12 sm:h-14 bg-green-400 hover:bg-green-500 text-black font-bold text-base sm:text-lg rounded-full shadow-lg'>
										Hisobni to'ldirish
									</Button>
									<Button
										variant='outline'
										className='w-full h-12 sm:h-14 bg-white/90 hover:bg-white text-black font-bold text-base sm:text-lg rounded-full border-gray-300 shadow-lg backdrop-blur-sm'
									>
										<QrCode className='mr-2' />
										Qr-Kod orqali to'lash
									</Button>
								</div>
								<div className='flex justify-center items-center mt-3 sm:mt-4 space-x-2'>
									<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/30'></div>
									<div className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white'></div>
									<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/30'></div>
								</div>
							</div>
							{/* Dynamic Island */}
							<div className='absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 sm:h-7 bg-black rounded-full flex items-center justify-center'></div>
						</div>
					</motion.div>
				</motion.div>

				{/* Right Content */}
				<motion.div
					className='flex flex-col space-y-8 items-center text-center lg:items-start lg:text-left'
					variants={containerVariants}
					initial='hidden'
					animate='visible'
				>
					<motion.div variants={itemVariants} className='space-y-2'>
						<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800'>
							ATTO Mobil Ilovasi
						</h1>
						<p className='text-md sm:text-lg text-gray-600'>
							Barcha transport to'lovlari bir joyda.
						</p>
					</motion.div>
					<motion.div
						variants={itemVariants}
						className='flex flex-col sm:flex-row items-center gap-4'
					>
						<a
							href='https://apps.apple.com/uz/app/atto/id1529073358'
							target='_blank'
							rel='noopener noreferrer'
							className='transform transition-transform hover:scale-105'
						>
							<Image
								src={img1}
								alt='App Store'
								width={160}
								height={54}
								className='rounded-lg shadow-md'
							/>
						</a>
						<a
							href='https://play.google.com/store/apps/details?id=uz.ssd.atto'
							target='_blank'
							rel='noopener noreferrer'
							className='transform transition-transform hover:scale-105'
						>
							<Image
								src={img2}
								alt='Google Play'
								width={160}
								height={54}
								className='rounded-lg shadow-md'
							/>
						</a>
					</motion.div>

					<ul className='space-y-4 max-w-md'>
						{features.map((feature, index) => (
							<motion.li
								key={index}
								className='flex items-center gap-3'
								custom={index}
								variants={itemVariants}
							>
								<div className='bg-blue-100 p-1 rounded-full flex-shrink-0'>
									<ChevronRight className='text-blue-600' size={20} />
								</div>
								<span className='text-base sm:text-lg text-gray-700'>
									{feature}
								</span>
							</motion.li>
						))}
					</ul>

					<motion.div variants={itemVariants}>
						<Button
							variant='outline'
							className='rounded-lg bg-gray-100 border-gray-300'
						>
							UZB
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</div>
	)
}
