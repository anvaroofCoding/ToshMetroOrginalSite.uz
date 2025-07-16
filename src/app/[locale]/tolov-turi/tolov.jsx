'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ChevronDown,
	CreditCard,
	GraduationCap,
	Heart,
	QrCode,
	Smartphone,
	Users,
	Wallet,
} from 'lucide-react'
import { useState } from 'react'

export default function TransportDashboard() {
	const [selectedCard, setSelectedCard] = useState()
	const [activeTab, setActiveTab] = useState('cards')

	const transportCards = [
		{
			id: 'student',
			name: 'Talabalar uchun',
			nameEn: 'Student Transport Card',
			type: 'student',
			price: "15,000 so'm",
			color: 'from-yellow-400 to-orange-500',
			icon: <GraduationCap className='w-6 h-6' />,
			description: "Yo'lovchilar toifasi: universitet va kollej talabalari",
			requirements:
				"Sotib olish va to'lash uchun hujjatlar: pasport va talaba ID nusxasi",
			benefits: [
				"30 kunlik haq to'lanadigan tariflardan biri majburiy tarzda yuklab olinadi",
				"avtobus-80,000 so'm yoki avtobus va metro-110,500 so'm",
			],
		},
		{
			id: 'social',
			name: 'Ijtimoiy',
			nameEn: 'Social Transport Card',
			type: 'social',
			price: "15,000 so'm",
			color: 'from-red-500 to-pink-600',
			icon: <Heart className='w-6 h-6' />,
			description: "Yo'lovchilar toifasi: nafaqaxo'rlar va nogironlar",
			requirements:
				"Sotib olish va to'lash uchun hujjatlar: pasport va pensiya guvohnomasi yoki nogironlik guvohnomasining nusxasi",
			benefits: [
				"30 kunlik haq to'lanadigan tariflardan biri majburiy tarzda yuklab olinadi",
				"avtobus-80,000 so'm yoki metro bepul",
			],
		},
		{
			id: 'universal',
			name: 'Yagona/Umumiy',
			nameEn: 'Universal Transport Card',
			type: 'universal',
			price: "20,000 so'm",
			color: 'from-blue-600 to-indigo-700',
			icon: <Users className='w-6 h-6' />,
			description: "Yo'lovchilar toifasi: har qanday",
			requirements: "Sotib olish va to'lash uchun hujjatlar: talab qilinmaydi",
			pricing: {
				card: "16,000 so'm - karta narxi",
				account: "4,000 so'm - hisobdagi qoldiq",
			},
		},
		{
			id: 'school',
			name: "O'quvchilar uchun",
			nameEn: 'School Students Card',
			type: 'school',
			price: "0 so'm",
			color: 'from-green-600 to-emerald-700',
			icon: <GraduationCap className='w-6 h-6' />,
			description: "Yo'lovchilar toifasi: o'rta maktab va litsey o'quvchilari",
			requirements:
				"Sotib olish va to'lash uchun kerak bo'ladigan hujjatlar: ota-onalardan birining pasportining nusxasi, ta'lim muassasasidan (maktab, litsey) sertifikat, talabaning tug'ilganlik haqidagi guvohnomasi.",
			benefits: [
				"30 kunlik haq to'lanadigan tariflardan biri majburiy tarzda yuklab olinadi",
				"avtobus-80,000 so'm yoki avtobus va metro-110,500 so'm",
			],
		},
	]

	const paymentMethods = [
		{
			id: 'humo',
			name: 'HUMO Bank kartasi',
			description: "Bank kartasi orqali to'lov",
			icon: <CreditCard className='w-8 h-8' />,
			color: 'from-purple-500 to-purple-700',
			features: [
				"Kontaktsiz to'lov",
				'Metro va avtobusda',
				"UZCARD qo'llab-quvvatlash",
			],
		},
		{
			id: 'qr',
			name: 'QR-bilet',
			description: 'Bir martalik QR-bilet',
			icon: <QrCode className='w-8 h-8' />,
			color: 'from-teal-500 to-cyan-600',
			features: ['Mobil ilova orqali', 'Kiosk orqali', 'Onlayn xarid'],
		},
		{
			id: 'mobile',
			name: "Mobil to'lov",
			description: "Telefon orqali to'lov tizimlari",
			icon: <Smartphone className='w-8 h-8' />,
			color: 'from-rose-500 to-pink-600',
			features: ['NFC texnologiyasi', 'Mobil bank', 'Elektron hamyon'],
		},
	]

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
		hover: {
			scale: 1.02,
			y: -5,
			transition: { type: 'spring', stiffness: 300, damping: 20 },
		},
	}

	const iconVariants = {
		hover: {
			rotate: 360,
			scale: 1.1,
			transition: { duration: 0.6, ease: 'easeInOut' },
		},
	}

	return (
		<div className='min-h-screen bg-white'>
			<div className='container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8'>
				{/* Header */}
				<motion.div
					className='text-center space-y-4'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<motion.h1
						className='text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900'
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Transport Kartalar Tizimi
					</motion.h1>
					<motion.p
						className='text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						Toshkent shahar transport to'lov tizimlarini boshqarish
					</motion.p>
					<motion.div
						className='flex justify-center'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						{/* <Sparkles className='w-6 h-6 sm:w-8 sm:h-8 text-blue-500 animate-pulse' /> */}
					</motion.div>
				</motion.div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
					<TabsList className='grid h-auto w-full grid-cols-2 rounded-lg p-1 bg-gray-100'>
						{[
							{
								value: 'cards',
								icon: CreditCard,
								label: 'Transport Kartalari',
							},
							{ value: 'payments', icon: Wallet, label: "To'lov Usullari" },
						].map(tab => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className='relative rounded-md px-3 py-2 sm:px-4 sm:py-3 text-sm font-medium transition-all duration-300 text-gray-600 data-[state=active]:text-white data-[state=active]:bg-blue-600 hover:text-gray-800'
							>
								<span className='flex items-center gap-2'>
									<tab.icon className='h-4 w-4' />
									<span className='hidden sm:inline'>{tab.label}</span>
									<span className='sm:hidden'>
										{tab.value === 'cards' ? 'Kartalar' : "To'lovlar"}
									</span>
								</span>
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value='cards' className='space-y-6 mt-6 sm:mt-8'>
						<motion.div
							className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'
							initial='hidden'
							animate='visible'
							variants={{
								visible: {
									transition: {
										staggerChildren: 0.1,
									},
								},
							}}
						>
							{transportCards.map((card, index) => (
								<motion.div
									key={card.id}
									variants={cardVariants}
									whileHover='hover'
									transition={{ delay: index * 0.1 }}
								>
									<Card
										className={`cursor-pointer transition-all duration-500 hover:shadow-lg bg-white border border-gray-200 overflow-hidden group ${
											selectedCard === card.id
												? 'ring-2 ring-blue-500 shadow-lg'
												: ''
										}`}
										onClick={() =>
											setSelectedCard(selectedCard === card.id ? null : card.id)
										}
									>
										<CardHeader className='relative p-4 sm:p-6'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-3 sm:gap-4'>
													<motion.div
														className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md group-hover:shadow-lg transition-shadow duration-300`}
														variants={iconVariants}
														whileHover='hover'
													>
														{card.icon}
													</motion.div>
													<div>
														<CardTitle className='text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-900 transition-colors'>
															{card.name}
														</CardTitle>
														<CardDescription className='text-xs sm:text-sm text-gray-600'>
															{card.nameEn}
														</CardDescription>
													</div>
												</div>
												<motion.div
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													<Badge
														variant='secondary'
														className='text-[10px] text-center sm:text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
													>
														{card.price}
													</Badge>
												</motion.div>
											</div>
										</CardHeader>

										<CardContent className='space-y-4 p-4 sm:p-6 pt-0'>
											<p className='text-sm text-gray-700 leading-relaxed'>
												{card.description}
											</p>

											<motion.div
												className='flex items-center gap-2 text-blue-600 cursor-pointer'
												whileHover={{ x: 5 }}
											>
												<span className='text-sm font-medium'>
													Batafsil ma'lumot
												</span>
												<motion.div
													animate={{
														rotate: selectedCard === card.id ? 180 : 0,
													}}
													transition={{ duration: 0.3 }}
												>
													<ChevronDown className='w-4 h-4' />
												</motion.div>
											</motion.div>

											<AnimatePresence>
												{selectedCard === card.id && (
													<motion.div
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: 'auto' }}
														exit={{ opacity: 0, height: 0 }}
														transition={{ duration: 0.3 }}
														className='space-y-4 pt-4 border-t border-gray-200'
													>
														<div className='bg-blue-50 p-3 sm:p-4 rounded-lg'>
															<h4 className='font-semibold text-sm mb-2 text-blue-900'>
																Hujjatlar:
															</h4>
															<p className='text-sm text-gray-700 leading-relaxed'>
																{card.requirements}
															</p>
														</div>

														{card.pricing && (
															<div className='bg-green-50 p-3 sm:p-4 rounded-lg'>
																<h4 className='font-semibold text-sm mb-2 text-green-900'>
																	Narx tarkibi:
																</h4>
																<ul className='text-sm text-gray-700 space-y-1'>
																	<li className='flex items-center gap-2'>
																		<div className='w-2 h-2 bg-green-500 rounded-full flex-shrink-0' />
																		{card.pricing.card}
																	</li>
																	<li className='flex items-center gap-2'>
																		<div className='w-2 h-2 bg-green-500 rounded-full flex-shrink-0' />
																		{card.pricing.account}
																	</li>
																</ul>
															</div>
														)}

														{card.benefits && (
															<div className='bg-purple-50 p-3 sm:p-4 rounded-lg'>
																<h4 className='font-semibold text-sm mb-2 text-purple-900'>
																	Imtiyozlar:
																</h4>
																<ul className='text-sm text-gray-700 space-y-1'>
																	{card.benefits.map((benefit, index) => (
																		<motion.li
																			key={index}
																			initial={{ opacity: 0, x: -10 }}
																			animate={{ opacity: 1, x: 0 }}
																			transition={{ delay: index * 0.1 }}
																			className='flex items-start gap-2'
																		>
																			<div className='w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0' />
																			<span className='flex-1'>{benefit}</span>
																		</motion.li>
																	))}
																</ul>
															</div>
														)}
													</motion.div>
												)}
											</AnimatePresence>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</motion.div>
					</TabsContent>

					<TabsContent value='payments' className='space-y-6 mt-6 sm:mt-8'>
						<motion.div
							className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
							initial='hidden'
							animate='visible'
							variants={{
								visible: {
									transition: {
										staggerChildren: 0.15,
									},
								},
							}}
						>
							{paymentMethods.map((method, index) => (
								<motion.div
									key={method.id}
									variants={cardVariants}
									whileHover='hover'
									transition={{ delay: index * 0.1 }}
								>
									<Card className='hover:shadow-lg transition-all duration-500 bg-white border border-gray-200 group overflow-hidden relative'>
										<CardHeader className='text-center relative z-10 p-4 sm:p-6'>
											<motion.div
												className={`mx-auto mb-4 p-4 sm:p-6 bg-gradient-to-br ${method.color} rounded-2xl w-fit group-hover:shadow-lg transition-shadow duration-300`}
												whileHover={{
													scale: 1.1,
													rotate: [0, -5, 5, 0],
													transition: { duration: 0.5 },
												}}
											>
												<motion.div
													whileHover={{ scale: 1.2 }}
													className='text-white'
												>
													{method.icon}
												</motion.div>
											</motion.div>
											<CardTitle className='text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-900 transition-colors'>
												{method.name}
											</CardTitle>
											<CardDescription className='text-sm text-gray-600'>
												{method.description}
											</CardDescription>
										</CardHeader>

										<CardContent className='relative z-10 p-4 sm:p-6 pt-0'>
											<ul className='space-y-2 sm:space-y-3'>
												{method.features.map((feature, index) => (
													<motion.li
														key={index}
														initial={{ opacity: 0, x: -10 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ delay: 0.3 + index * 0.1 }}
														className='flex items-center gap-3 text-sm group-hover:text-gray-800 transition-colors'
													>
														<motion.div
															className='w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex-shrink-0'
															whileHover={{ scale: 1.3 }}
														/>
														<span className='flex-1'>{feature}</span>
													</motion.li>
												))}
											</ul>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</motion.div>
					</TabsContent>
				</Tabs>

				{/* Quick Actions */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<Card className='bg-white border border-gray-200'>
						<CardHeader className='text-center p-4 sm:p-6'>
							<CardTitle className='text-xl sm:text-2xl font-bold text-blue-900'>
								Tezkor Amallar
							</CardTitle>
							<CardDescription className='text-base sm:text-lg'>
								Eng ko'p ishlatiladigan funksiyalar
							</CardDescription>
						</CardHeader>
						<CardContent className='p-4 sm:p-6 pt-0'>
							<div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
								{[
									{
										icon: CreditCard,
										label: 'Karta Sotib Olish',
										color: 'from-blue-500 to-blue-700',
									},
									{
										icon: Wallet,
										label: "Balansni To'ldirish",
										color: 'from-green-500 to-green-700',
									},
									{
										icon: QrCode,
										label: 'QR-bilet Olish',
										color: 'from-purple-500 to-purple-700',
									},
									{
										icon: Smartphone,
										label: 'Mobil Ilova',
										color: 'from-pink-500 to-pink-700',
									},
								].map((action, index) => (
									<motion.div
										key={index}
										whileHover={{ scale: 1.05, y: -5 }}
										whileTap={{ scale: 0.95 }}
										transition={{ type: 'spring', stiffness: 300, damping: 20 }}
									>
										<Button
											variant='outline'
											className={`h-20 sm:h-24 flex-col gap-2 sm:gap-3 bg-gradient-to-br ${action.color} text-white border-0 hover:shadow-lg transition-all duration-300 group w-full`}
										>
											<motion.div
												whileHover={{ rotate: 360 }}
												transition={{ duration: 0.6 }}
											>
												<action.icon className='w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform' />
											</motion.div>
											<span className='text-xs sm:text-sm font-medium text-center leading-tight'>
												{action.label}
											</span>
										</Button>
									</motion.div>
								))}
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	)
}
