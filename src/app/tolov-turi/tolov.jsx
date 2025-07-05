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
import { motion } from 'framer-motion'
import {
	CreditCard,
	GraduationCap,
	Heart,
	QrCode,
	Smartphone,
	Users,
	Wallet,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function TransportDashboard() {
	const [selectedCard, setSelectedCard] = useState(null)
	const [activeTab, setActiveTab] = useState('cards')

	const transportCards = [
		{
			id: 'student',

			name: 'Talabalar uchun',

			nameEn: 'Student Transport Card',

			type: 'student',

			price: "15,000 so'm",

			color: 'bg-yellow-400',

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

			color: 'bg-red-500',

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

			color: 'bg-blue-600',

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

			color: 'bg-green-600',

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

			features: ['Mobil ilova orqali', 'Kiosk orqali', 'Onlayn xarid'],
		},

		{
			id: 'mobile',

			name: "Mobil to'lov",

			description: "Telefon orqali to'lov tizimlari",

			icon: <Smartphone className='w-8 h-8' />,

			features: ['NFC texnologiyasi', 'Mobil bank', 'Elektron hamyon'],
		},
	]

	return (
		<div className=' container '>
			<div className='mx-auto space-y-8'>
				{/* Header */}

				<div className='text-start space-y-4'>
					<h1 className='text-4xl font-bold text-blue-900'>
						Transport Kartalar Tizimi
					</h1>

					<p className='text-lg text-gray-600'>
						Toshkent shahar transport to'lov tizimlarini boshqarish
					</p>
				</div>

				<Tabs defaultValue='cards' className='w-full'>
					<TabsList className='grid h-auto w-full grid-cols-2 rounded-lg p-1 sm:h-auto sm:grid-cols-3 gap-3'>
						<TabsTrigger
							value='cards'
							className='relative rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors data-[state=active]:text-[#0E327F] border'
						>
							{activeTab === 'cards' && (
								<motion.div
									layoutId='active-tab-indicator'
									className='absolute inset-0 rounded-md bg-white shadow'
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								/>
							)}
							<span className='relative z-10 flex items-center gap-2'>
								<CreditCard className='h-4 w-4' />
								Transport Kartalari
							</span>
						</TabsTrigger>
						<TabsTrigger
							value='payments'
							className='relative rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors data-[state=active]:text-[#0E327F] border'
						>
							{activeTab === 'payments' && (
								<motion.div
									layoutId='active-tab-indicator'
									className='absolute inset-0 rounded-md bg-white shadow'
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								/>
							)}
							<span className='relative z-10 flex items-center gap-2'>
								<Wallet className='h-4 w-4' />
								To'lov Usullari
							</span>
						</TabsTrigger>
						<TabsTrigger
							value='gallery'
							className='relative rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors data-[state=active]:text-[#0E327F] border'
						>
							{activeTab === 'gallery' && (
								<motion.div
									layoutId='active-tab-indicator'
									className='absolute inset-0 rounded-md bg-white shadow'
									transition={{ type: 'spring', stiffness: 300, damping: 30 }}
								/>
							)}
							<span className='relative z-10 flex items-center gap-2'>
								<QrCode className='h-4 w-4' />
								Galereya
							</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent value='cards' className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{transportCards.map(card => (
								<Card
									key={card.id}
									className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
										selectedCard === card.id
											? 'ring-2 ring-blue-500 shadow-lg'
											: ''
									}`}
									onClick={() =>
										setSelectedCard(selectedCard === card.id ? null : card.id)
									}
								>
									<CardHeader>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-3'>
												<div
													className={`p-3 rounded-lg ${card.color} text-white`}
												>
													{card.icon}
												</div>

												<div>
													<CardTitle className='text-xl'>{card.name}</CardTitle>

													<CardDescription className='text-sm'>
														{card.nameEn}
													</CardDescription>
												</div>
											</div>

											<Badge
												variant='secondary'
												className='text-lg font-semibold'
											>
												{card.price}
											</Badge>
										</div>
									</CardHeader>

									<CardContent className='space-y-4'>
										<p className='text-sm text-gray-600'>{card.description}</p>

										{selectedCard === card.id && (
											<div className='space-y-4 pt-4 border-t'>
												<div>
													<h4 className='font-semibold text-sm mb-2'>
														Hujjatlar:
													</h4>

													<p className='text-sm text-gray-600'>
														{card.requirements}
													</p>
												</div>

												{card.pricing && (
													<div>
														<h4 className='font-semibold text-sm mb-2'>
															Narx tarkibi:
														</h4>

														<ul className='text-sm text-gray-600 space-y-1'>
															<li>• {card.pricing.card}</li>

															<li>• {card.pricing.account}</li>
														</ul>
													</div>
												)}

												{card.benefits && (
													<div>
														<h4 className='font-semibold text-sm mb-2'>
															Imtiyozlar:
														</h4>

														<ul className='text-sm text-gray-600 space-y-1'>
															{card.benefits.map((benefit, index) => (
																<li key={index}>• {benefit}</li>
															))}
														</ul>
													</div>
												)}
											</div>
										)}
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value='payments' className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{paymentMethods.map(method => (
								<Card
									key={method.id}
									className='hover:shadow-lg transition-shadow'
								>
									<CardHeader className='text-center'>
										<div className='mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit'>
											{method.icon}
										</div>

										<CardTitle className='text-lg'>{method.name}</CardTitle>

										<CardDescription>{method.description}</CardDescription>
									</CardHeader>

									<CardContent>
										<ul className='space-y-2'>
											{method.features.map((feature, index) => (
												<li
													key={index}
													className='flex items-center gap-2 text-sm'
												>
													<div className='w-2 h-2 bg-green-500 rounded-full'></div>

													{feature}
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value='gallery' className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<Card>
								<CardHeader>
									<CardTitle>Transport Kartalari</CardTitle>

									<CardDescription>Talaba va ijtimoiy kartalar</CardDescription>
								</CardHeader>

								<CardContent>
									<Image
										src='/images/student-card.png'
										alt='Student and Social Transport Cards'
										width={600}
										height={400}
										className='rounded-lg w-full h-auto'
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Yagona va O'quvchi Kartalari</CardTitle>

									<CardDescription>
										Universal va maktab o'quvchilari kartalari
									</CardDescription>
								</CardHeader>

								<CardContent>
									<Image
										src='/images/transport-cards.png'
										alt='Universal and School Transport Cards'
										width={600}
										height={400}
										className='rounded-lg w-full h-auto'
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>HUMO va Mobil To'lovlar</CardTitle>

									<CardDescription>
										Bank kartalari va mobil to'lov tizimlari
									</CardDescription>
								</CardHeader>

								<CardContent>
									<Image
										src='/images/humo-payment.png'
										alt='HUMO Bank Card and Mobile Payments'
										width={600}
										height={400}
										className='rounded-lg w-full h-auto'
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>QR-bilet Tizimi</CardTitle>

									<CardDescription>
										Bir martalik QR-bilet va to'lov usullari
									</CardDescription>
								</CardHeader>

								<CardContent>
									<Image
										src='/images/qr-payment.png'
										alt='QR Ticket System'
										width={600}
										height={400}
										className='rounded-lg w-full h-auto'
									/>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>

				{/* Quick Actions */}

				<Card>
					<CardHeader>
						<CardTitle>Tezkor Amallar</CardTitle>

						<CardDescription>
							Eng ko'p ishlatiladigan funksiyalar
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							<Button variant='outline' className='h-20 flex-col gap-2'>
								<CreditCard className='w-6 h-6' />
								Karta Sotib Olish
							</Button>

							<Button variant='outline' className='h-20 flex-col gap-2'>
								<Wallet className='w-6 h-6' />
								Balansni To'ldirish
							</Button>

							<Button variant='outline' className='h-20 flex-col gap-2'>
								<QrCode className='w-6 h-6' />
								QR-bilet Olish
							</Button>

							<Button variant='outline' className='h-20 flex-col gap-2'>
								<Smartphone className='w-6 h-6' />
								Mobil Ilova
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
