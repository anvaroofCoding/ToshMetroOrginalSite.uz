'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ArrowDown,
	ArrowRight,
	CheckCircle,
	Clock,
	CreditCard,
	GraduationCap,
	Info,
	MapPin,
	Minus,
	Plus,
	School,
	Shield,
	Star,
	Users,
	Wallet,
	Zap,
} from 'lucide-react'
import { useState } from 'react'
import DetailedInfoModal from './detail-info-modall'

const mainColor = '#0E327F'

export default function AttoDetailedPage() {
	const [modalType, setModalType] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [openFaq, setOpenFaq] = useState(null)

	const openModal = type => {
		setModalType(type)
		setIsModalOpen(true)
	}

	const toggleFaq = index => {
		setOpenFaq(openFaq === index ? null : index)
	}

	const cardTypes = [
		{
			title: 'Umumiy transport kartasi',
			description:
				"Aholiga, ya'ni barcha turdagi yo'lovchilarga mo'ljallangan.",
			color: "bg-[#3939c6]",
			icon: <Users className='w-8 h-8 text-white' />,
			price: 'Oddiy narx',
			features: [
				'Barcha transport turlari',
				'Cheksiz foydalanish',
				"Tezkor to'lov",
			],
			cardColor: "ko'k",
		},
		{
			title: 'Talabalar uchun',
			description:
				'Jamoat transportida imtiyozli sayohat qilish huquqiga ega talabalar uchun.',
			color: "bg-[#e2d317]",
			icon: <GraduationCap className='w-8 h-8 text-white' />,
			price: 'Imtiyozli tarif',
			features: ['Talaba ID kerak', 'Imtiyozli tarif', 'Universitet tasdiqi'],
			cardColor: 'sariq',
		},
		{
			title: "O'quvchilar uchun",
			description:
				"Jamoat transportida imtiyozli sayohat qilish huquqiga ega o'quvchilar uchun.",
			color: "bg-[#39b84d]",
			icon: <School className='w-8 h-8 text-white' />,
			price: "0 So'm",
			features: ['Maktab guvohnomasi', 'Katta chegirma', 'Ota-ona nazorati'],
			cardColor: 'yashil',
		},
		{
			title: 'Ijtimoiy karta',
			description: "Imtiyozli nafaqaxo'rlar va nogironlar uchun mo'ljallangan.",
			color: "bg-[#ec3641]",
			icon: <CreditCard className='w-8 h-8 text-white' />,
			price: 'Imtiyozli/Bepul',
			features: ['Ijtimoiy himoya', "To'liq imtiyoz", 'Maxsus yordam'],
			cardColor: 'qizil',
		},
	]


	const benefits = [
		{
			icon: <Clock className='w-6 h-6' />,
			title: "Tezkor to'lov",
			desc: "2 soniyada to'lov",
		},
		{
			icon: <Shield className='w-6 h-6' />,
			title: 'Xavfsiz',
			desc: 'NFC texnologiyasi',
		},
		{ icon: <Star className='w-6 h-6' />, title: 'Qulay', desc: 'Naqd pulsiz' },
	]

	const detailedServices = [
		{
			title: 'Qoldiqni tekshirish',
			description: 'Kartangiz balansini har doim nazorat qiling',
			icon: <Clock className='w-6 h-6' />,
			action: () => openModal('balance-check'),
		},
		{
			title: 'Kam balans haqida',
			description: "1700 so'mdan kam balans bo'lsa nima qilish kerak",
			icon: <Shield className='w-6 h-6' />,
			action: () => openModal('low-balance'),
		},
		{
			title: 'Foydalanish qoidalari',
			description: 'Kartani boshqalarga berish va cheklovlar haqida',
			icon: <Users className='w-6 h-6' />,
			action: () => openModal('sharing-rules'),
		},
	]

	const faqs = [
		{
			question: 'ATTO transport kartasi nima?',
			answer:
				'"ATTO" transport kartasi Toshkent shahridagi jamoat transportida yo\'l haqini tez va qulay tarzda to\'lash imkonini beradi. Ular "Toshshahartrans" aksiyadorlik jamiyatining barcha avtobuslarida hamda "Toshkent metropoliteni"ning yer osti va yer usti bekatlarining barcha turniketlarida qabul qilinmoqda.',
		},
		{
			question: 'Transport kartasidagi qoldiqni qanday aniqlash mumkin?',
			answer:
				`"ATTO" transport kartasi balansini ATTO, MyUzcard, Payme, Upay, Apelsin, Click, Oson, Ipak yo'li bank, Alif mobi, Mavrid, Plum, Uzum bank mobil ilovalari, bank infokiosklari, yoki "Toshshahartransxizmat" AJ va metro kassalarida tekshirish mumkin.`,
		},
		{
			question:
				"Transport kartasidagi balans 1700 so'mdan kam bo'lsa nima bo'ladi?",
			answer:
				"Agar qoldiq 1700 so'mdan kam bo'lsa, karta vaqtincha bloklanadi. Balansni to'ldirgandan so'ng 10 daqiqa ichida avtomatik ravishda blokdan chiqariladi. Muammosiz foydalanish uchun balansda 1700 so'mdan ortiq mablag' saqlash tavsiya etiladi.",
		},
		{
			question: 'ATTO transport kartasini uchinchi shaxslarga berish mumkinmi?',
			answer:
				"Yo'q, ATTO transport kartasidan faqat bitta yo'lovchi foydalanishi mumkin. Yo'lovchilar oqimining to'g'ri statistikasini yuritish maqsadida kartani uchinchi shaxslarga o'tkazish yoki qayta ishlatish mumkin emas. Tasodifiy qayta to'lovlarni oldini olish uchun 6 daqiqalik limit o'rnatilgan.",
		},
		{
			question: "ATTO kartasini qayerdan sotib olsam bo'ladi?",
			answer:
				'"ATTO" transport kartalari "Toshshahartransxizmat" AJning barcha chiptalarni sotish nuqtalarida, shuningdek, "Toshkent metropoliteni" DUKning barcha kassalarida sotiladi.',
		},
		{
			question: "ATTO transport kartasi balansini qanday to'ldirish mumkin?",
			answer:
				`"ATTO" transport kartasi balansini ATTO, MyUzcard, Payme, Upay, Apelsin, Click, Oson, Ipak yo'li bank, Alif mobi, Mavrid, Plum, Uzum bank  toʻlov xizmatlari va boshqa elektron toʻlov tizimlarining mobil ilovalari orqali toʻldirish mumkin. Shuningdek, bank infokiosklari va kassalarda ham to\'ldirish mumkin`,
		},
	]

	return (
		<div>
			<div className='container '>
				{/* Hero Section - White Background */}
				<section className='relative flex items-center justify-center py-10'>
					{/* Unique Background Pattern */}


					<div className='relative z-10 mx-auto'>
						<div className='grid lg:grid-cols-2 gap-12 items-center'>
							{/* Left Content */}
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								className='text-gray-900'
							>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.3, type: 'spring' }}
									className='inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6'
								>
									<Zap className='w-4 h-4 text-blue-600' />
									<span className='text-sm font-medium text-blue-800'>
										Kontaktsiz (NFC) texnologiyasi
									</span>
								</motion.div>

								<h1 className='text-5xl lg:text-7xl font-black leading-tight mb-6'>
									<span className='block' style={{ color: mainColor }}>
										ATTO
									</span>
									<span className='block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
										Transport
									</span>
									<span className='block' style={{ color: mainColor }}>
										Kartasi
									</span>
								</h1>

								<p className='text-xl text-gray-600 mb-8 leading-relaxed'>
									Toshkent jamoat transportida kontaktsiz to'lov tizimi. Tez va
									qulay tarzda yo'l haqini to'lang.
								</p>

								<div className='flex flex-wrap gap-4 mb-8'>
									{benefits.map((benefit, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.5 + index * 0.1 }}
											className='flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-100'
										>
											<div className='text-blue-600'>{benefit.icon}</div>
											<span className='text-sm font-medium text-gray-700'>
												{benefit.title}
											</span>
										</motion.div>
									))}
								</div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.8 }}
									className='flex flex-col sm:flex-row gap-4'
								>
									<Button
										size='lg'
										className='font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white'
										style={{ backgroundColor: mainColor }}
										onClick={() => openModal('where-to-buy')}
									>
										Kartani olish <ArrowRight className='w-5 h-5 ml-2' />
									</Button>

								</motion.div>
							</motion.div>

							{/* Right Content - Enhanced 3D Card Display */}
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className='relative'
							>
								<div className='relative w-full max-w-md mx-auto'>
									{/* Main Card with Enhanced Design */}
									<motion.div
										animate={{
											rotateY: [0, 5, 0, -5, 0],
											rotateX: [0, 2, 0, -2, 0],
										}}
										transition={{
											duration: 6,
											repeat: Number.POSITIVE_INFINITY,
											ease: 'easeInOut',
										}}
										className='relative z-30'
									>
										<div className='w-80 h-48 bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl shadow-2xl p-6 border border-gray-100'>
											<div className='flex justify-between items-start mb-4'>
												<div>
													<h3
														className='text-2xl font-bold'
														style={{ color: mainColor }}
													>
														ATTO
													</h3>
													<p className='text-sm text-gray-500'>Transport Card</p>
												</div>
												<div className='w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center'>
													<Zap className='w-6 h-6 text-white' />
												</div>
											</div>

											<div className='space-y-2 mb-4'>
												<div className='w-full h-2 bg-gray-200 rounded-full'>
													<motion.div
														className='h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
														initial={{ width: 0 }}
														animate={{ width: '75%' }}
														transition={{ duration: 2, delay: 1 }}
													/>
												</div>
												<p className='text-xs text-gray-500'>
													Balans: 45,000 so'm
												</p>
											</div>

											<div className='flex justify-between items-end'>
												<div>
													<p className='text-xs text-gray-500'>Karta raqami</p>
													<p
														className='font-mono text-sm font-semibold'
														style={{ color: mainColor }}
													>
														**** **** **** 1234
													</p>
												</div>
												<div className='text-right'>
													<p className='text-xs text-gray-500'>Amal qiladi</p>
													<p
														className='font-mono text-sm font-semibold'
														style={{ color: mainColor }}
													>
														12/28
													</p>
												</div>
											</div>
										</div>
									</motion.div>

									{/* Enhanced Floating Elements */}
									{[...Array(4)].map((_, i) => (
										<motion.div
											key={i}
											className='absolute bg-white/60 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200'
											animate={{
												y: [0, -20, 0],
												rotate: [0, 5, 0],
												scale: [1, 1.05, 1],
											}}
											transition={{
												duration: 3 + i,
												repeat: Number.POSITIVE_INFINITY,
												delay: i * 0.5,
											}}
											style={{
												width: `${40 + i * 8}px`,
												height: `${25 + i * 5}px`,
												right: `${-30 + i * 20}px`,
												top: `${40 + i * 35}px`,
											}}
										>
											<div className='w-full h-full flex items-center justify-center'>
												<div
													className='w-3 h-3 rounded-full'
													style={{
														backgroundColor: `hsl(${220 + i * 30}, 70%, 60%)`,
													}}
												/>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>
					</div>


				</section>

				{/* Card Types Section - Enhanced */}
				<section className='py-10'>
					<div className=' mx-auto'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='text-center mb-16'
						>
							<h2
								className='text-4xl lg:text-5xl font-bold mb-4'
								style={{ color: mainColor }}
							>
								ATTO Transport Kartalari Turlari
							</h2>
							<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
								Hozirgi vaqtda yo'lovchilarning turli toifalari uchun
								mo'ljallangan to'rt turdagi ATTO transport kartalari joriy
								qilingan
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
							{cardTypes.map((card, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.02 }}
									className='group'
								>
									<Card className='h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300'>
										<div
											className={`h-32 bg-gradient-to-br ${card.color} relative overflow-hidden`}
										>
											<div className='absolute inset-0 bg-black/10'></div>
											<div className='absolute top-4 right-4 bg-white/20 p-2 rounded-full'>
												{card.icon}
											</div>
											<div className='absolute bottom-4 left-4 text-white'>
												<div className='text-lg font-bold'>{card.price}</div>
												<div className='text-xs opacity-80'>
													({card.cardColor})
												</div>
											</div>
										</div>

										<CardContent className='p-6'>
											<h3
												className='text-xl font-bold mb-3'
												style={{ color: mainColor }}
											>
												{card.title}
											</h3>
											<p className='text-gray-600 mb-4 text-sm leading-relaxed'>
												{card.description}
											</p>

											<div className='space-y-2'>
												{card.features.map((feature, idx) => (
													<div
														key={idx}
														className='flex items-center gap-2 text-sm'
													>
														<CheckCircle className='w-4 h-4 text-green-500' />
														<span className='text-gray-600'>{feature}</span>
													</div>
												))}
											</div>

											<Button
												className='w-full mt-4 group-hover:bg-blue-600 text-white transition-colors'
												style={{ backgroundColor: mainColor }}
												onClick={() => openModal('where-to-buy')}
											>
												Tanlash
											</Button>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Detailed Services Section - Enhanced */}
				<section className='py-10 '>
					<div className=' mx-auto'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='text-center mb-16'
						>
							<h2
								className='text-4xl lg:text-5xl font-bold mb-4'
								style={{ color: mainColor }}
							>
								Qo'shimcha Xizmatlar
							</h2>
							<p className='text-xl text-gray-600'>
								ATTO kartasidan samarali foydalanish uchun muhim ma'lumotlar
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							{detailedServices.map((service, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ y: -5, scale: 1.02 }}
								>
									<Card
										className='h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white'
										onClick={service.action}
									>
										<CardContent className='p-8 text-center'>
											<motion.div
												className='inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6'
												whileHover={{ scale: 1.1, rotate: 5 }}
											>
												<div style={{ color: mainColor }}>{service.icon}</div>
											</motion.div>
											<h3
												className='text-xl font-bold mb-3'
												style={{ color: mainColor }}
											>
												{service.title}
											</h3>
											<p className='text-gray-600 mb-6 leading-relaxed'>
												{service.description}
											</p>
											<Button
												variant='outline'
												className='border-2 hover:bg-blue-50 bg-transparent transition-all duration-300'
												style={{ borderColor: mainColor, color: mainColor }}
											>
												<Info className='w-4 h-4 mr-2' />
												Ko'rish
											</Button>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Enhanced FAQ Section with Custom Animations */}
				<section className='py-10'>
					<div className=' mx-auto'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='text-center mb-16'
						>
							<h2
								className='text-4xl lg:text-5xl font-bold mb-4'
								style={{ color: mainColor }}
							>
								Savol-Javoblar
							</h2>
							<p className='text-xl text-gray-600'>
								Eng ko'p beriladigan savollar va ularning javoblari
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<div className='space-y-4'>
								{faqs.map((faq, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										viewport={{ once: true }}
										className='border border-blue-900/20 rounded-2xl bg-blue-400/10  transition-all duration-300'
									>
										<motion.button
											className='w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none'
											onClick={() => toggleFaq(index)}
											whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
										>
											<span
												className='text-lg font-semibold pr-4'
												style={{ color: mainColor }}
											>
												{faq.question}
											</span>
											<motion.div
												animate={{ rotate: openFaq === index ? 45 : 0 }}
												transition={{ duration: 0.3 }}
												className='flex-shrink-0'
											>
												{openFaq === index ? (
													<Minus
														className='w-5 h-5'
														style={{ color: mainColor }}
													/>
												) : (
													<Plus
														className='w-5 h-5'
														style={{ color: mainColor }}
													/>
												)}
											</motion.div>
										</motion.button>
										<AnimatePresence>
											{openFaq === index && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: 'auto', opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.3, ease: 'easeInOut' }}
													className='overflow-hidden'
												>
													<motion.div
														initial={{ y: -10 }}
														animate={{ y: 0 }}
														exit={{ y: -10 }}
														transition={{ duration: 0.2 }}
														className='px-6 pb-6'
													>
														<div className='h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4'></div>
														<p className='text-gray-600 leading-relaxed'>
															{faq.answer}
														</p>
													</motion.div>
												</motion.div>
											)}
										</AnimatePresence>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>



				<DetailedInfoModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					type={modalType}
				/>
			</div>
		</div>
	)
}
