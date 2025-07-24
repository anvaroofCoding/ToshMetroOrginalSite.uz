'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import {
	Building2,
	CreditCard,
	MapPin,
	Smartphone,
	Users,
	Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function MetroInfoSection() {
	const [currentPaymentIndex, setCurrentPaymentIndex] = useState(0)
	const [currentCardIndex, setCurrentCardIndex] = useState(0)

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
			image: '/classic-blue-metro-card.png',
		},
		{
			name: 'Atto Student',
			color: 'from-green-600 to-green-800',
			image: '/green-student-metro-card.png',
		},
		{
			name: 'Atto Senior',
			color: 'from-purple-600 to-purple-800',
			image: '/purple-senior-metro-card.png',
		},
		{
			name: 'Atto Premium',
			color: 'from-gold-600 to-gold-800',
			image: '/premium-metro-card.png',
		},
	]

	const stationStats = [
		{ name: 'Alisher Navoiy', users: 45000, percentage: 90 },
		{ name: 'Amir Temur Hiyoboni', users: 38000, percentage: 76 },
		{ name: 'Yunus Rajabiy', users: 32000, percentage: 64 },
		{ name: 'Ming Orik', users: 28000, percentage: 56 },
		{ name: 'Bodomzor', users: 25000, percentage: 50 },
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

	return (
		<section className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4'>
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
							<CardContent className='p-8 h-full flex flex-col justify-center'>
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

				{/* Station Statistics */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.6 }}
					className='mb-16'
				>
					<Card className='bg-white shadow-xl'>
						<CardContent className='p-8'>
							<h3 className='text-3xl font-bold text-blue-900 mb-8 text-center'>
								Eng ko'p foydalaniladigan bekatlar
							</h3>
							<div className='space-y-4'>
								{stationStats.map((station, index) => (
									<motion.div
										key={station.name}
										initial={{ opacity: 0, x: -50 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
										className='flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg'
									>
										<div className='flex-1'>
											<h4 className='text-lg font-semibold text-blue-900 mb-2'>
												{station.name}
											</h4>
											<div className='w-full bg-blue-200 rounded-full h-3 overflow-hidden'>
												<motion.div
													initial={{ width: 0 }}
													animate={{ width: `${station.percentage}%` }}
													transition={{ duration: 1.5, delay: 1 + index * 0.1 }}
													className='h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full'
												/>
											</div>
										</div>
										<motion.div
											initial={{ opacity: 0, scale: 0 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
											className='ml-6 text-right'
										>
											<span className='text-2xl font-bold text-blue-900'>
												{station.users.toLocaleString()}
											</span>
											<p className='text-sm text-blue-600'>kunlik</p>
										</motion.div>
									</motion.div>
								))}
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
											className='w-3 h-3 rounded-full'
										/>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Atto Cards */}
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
								<div className='relative h-64 flex items-center justify-center'>
									<AnimatePresence mode='wait'>
										<motion.div
											key={currentCardIndex}
											initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
											animate={{ opacity: 1, scale: 1, rotateX: 0 }}
											exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
											transition={{ duration: 0.8 }}
											className='text-center'
										>
											<motion.div
												animate={{
													rotateY: [0, 10, 0, -10, 0],
													scale: [1, 1.05, 1],
												}}
												transition={{
													duration: 4,
													repeat: Number.POSITIVE_INFINITY,
												}}
												className={`w-48 h-32 mx-auto mb-6 rounded-xl bg-gradient-to-br ${attoCards[currentCardIndex].color} shadow-2xl flex items-center justify-center`}
											>
												<div className='text-white text-center'>
													<CreditCard className='w-12 h-12 mx-auto mb-2' />
													<p className='text-lg font-bold'>
														{attoCards[currentCardIndex].name}
													</p>
												</div>
											</motion.div>
											<p className='text-lg text-blue-700'>
												Tez, xavfsiz va qulay to'lov tizimi
											</p>
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
											className='w-3 h-3 rounded-full'
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
