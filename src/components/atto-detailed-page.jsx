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
			color: 'from-blue-500 to-blue-700',
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
			color: 'from-green-500 to-green-700',
			icon: <GraduationCap className='w-8 h-8 text-white' />,
			price: 'Imtiyozli tarif',
			features: ['Talaba ID kerak', 'Imtiyozli tarif', 'Universitet tasdiqi'],
			cardColor: 'yashil',
		},
		{
			title: "O'quvchilar uchun",
			description:
				"Jamoat transportida imtiyozli sayohat qilish huquqiga ega o'quvchilar uchun.",
			color: 'from-yellow-500 to-orange-500',
			icon: <School className='w-8 h-8 text-white' />,
			price: 'Imtiyozli tarif',
			features: ['Maktab guvohnomasi', 'Katta chegirma', 'Ota-ona nazorati'],
			cardColor: 'sariq',
		},
		{
			title: 'Ijtimoiy karta',
			description: "Imtiyozli nafaqaxo'rlar va nogironlar uchun mo'ljallangan.",
			color: 'from-red-500 to-red-700',
			icon: <CreditCard className='w-8 h-8 text-white' />,
			price: 'Imtiyozli/Bepul',
			features: ['Ijtimoiy himoya', "To'liq imtiyoz", 'Maxsus yordam'],
			cardColor: 'qizil',
		},
	]

	const steps = [
		{
			number: '01',
			title: 'Kartani oling',
			description:
				'Metro kassalari yoki maxsus nuqtalardan ATTO kartasini sotib oling',
			icon: <CreditCard className='w-6 h-6' />,
			action: () => openModal('where-to-buy'),
		},
		{
			number: '02',
			title: "Balansni to'ldiring",
			description:
				"Mobil ilovalar yoki kassalar orqali kartangiz balansini to'ldiring",
			icon: <Wallet className='w-6 h-6' />,
			action: () => openModal('how-to-topup'),
		},
		{
			number: '03',
			title: 'Tekkizing va boring',
			description:
				'Validatorga kartani tekkizing va yashil signal kutib transport kiriting',
			icon: <Zap className='w-6 h-6' />,
			action: () => openModal('how-to-pay'),
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
				'"ATTO" transport kartasi balansini ATTO, MyUzcard, Payme, Upay, Apelsin mobil ilovalari, bank infokiosklari, yoki "Toshshahartransxizmat" AJ va metro kassalarida tekshirish mumkin.',
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
				'"ATTO" transport kartasi balansini ATTO, MyUzcard, Payme, Upay, Apelsin toʻlov xizmatlari va boshqa elektron toʻlov tizimlarining mobil ilovalari orqali toʻldirish mumkin. Shuningdek, bank infokiosklari va kassalarda ham to\'ldirish mumkin.',
		},
	]

	return (
		<div className='bg-white container'>
			{/* Hero Section - White Background */}
			<section className='relative min-h-screen flex items-center justify-center  bg-white'>
				{/* Unique Background Pattern */}
				<div className='absolute inset-0'>
					<div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50'></div>
					<div className='absolute inset-0 opacity-30'>
						<div className='absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl'></div>
						<div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl'></div>
						<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-100 rounded-full blur-3xl'></div>
					</div>
					{/* Geometric Shapes */}
					<div className='absolute inset-0 overflow-hidden'>
						{[...Array(8)].map((_, i) => (
							<motion.div
								key={i}
								className='absolute'
								animate={{
									rotate: [0, 360],
									scale: [1, 1.1, 1],
								}}
								transition={{
									duration: 20 + i * 3,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'linear',
								}}
								style={{
									left: `${Math.random() * 100}%`,
									top: `${Math.random() * 100}%`,
									width: `${20 + Math.random() * 40}px`,
									height: `${20 + Math.random() * 40}px`,
								}}
							>
								<div
									className='w-full h-full border-2 opacity-20'
									style={{
										borderColor: mainColor,
										borderRadius: i % 2 === 0 ? '50%' : '0%',
									}}
								/>
							</motion.div>
						))}
					</div>
				</div>

				<div className='relative z-10 mx-auto  py-20'>
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
								<Button
									variant='outline'
									size='lg'
									className='border-2 font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-300 bg-transparent'
									style={{ borderColor: mainColor, color: mainColor }}
								>
									Batafsil ma'lumot
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

				{/* Enhanced Scroll Indicator */}
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
					className='absolute md:bottom-8 bottom-5 left-1/2 transform -translate-x-1/2'
					style={{ color: mainColor }}
				>
					<div className='flex flex-col items-center gap-2 '>
						<span className='text-sm font-medium'>Pastga aylantiring</span>
						<ArrowDown className='w-6 h-6' />
					</div>
				</motion.div>
			</section>

			{/* Card Types Section - Enhanced */}
			<section className='py-20 bg-gradient-to-b from-gray-50 to-white'>
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

			{/* How to Use Section - Enhanced */}
			<section className='py-20 bg-white'>
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
							Kartadan Foydalanish
						</h2>
						<p className='text-xl text-gray-600'>
							3 ta oddiy qadam bilan transport kartasidan foydalaning
						</p>
					</motion.div>

					<div className='relative'>
						{/* Enhanced Connection Line */}
						<div className='hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent transform -translate-y-1/2 rounded-full'></div>

						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
							{steps.map((step, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.2 }}
									viewport={{ once: true }}
									className='relative'
								>
									<motion.div
										whileHover={{ scale: 1.05 }}
										className='text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'
									>
										{/* Enhanced Step Number */}
										<div className='relative mx-auto w-20 h-20 mb-6'>
											<motion.div
												className='w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg'
												style={{ backgroundColor: mainColor }}
												whileHover={{ rotate: 360 }}
												transition={{ duration: 0.5 }}
											>
												{step.number}
											</motion.div>
											<div className='absolute -inset-2 rounded-full bg-blue-100 -z-10'></div>
										</div>

										{/* Enhanced Icon */}
										<motion.div
											className='inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4'
											whileHover={{ scale: 1.1 }}
										>
											<div style={{ color: mainColor }}>{step.icon}</div>
										</motion.div>

										{/* Content */}
										<h3
											className='text-2xl font-bold mb-3'
											style={{ color: mainColor }}
										>
											{step.title}
										</h3>
										<p className='text-gray-600 leading-relaxed mb-6'>
											{step.description}
										</p>

										<Button
											variant='outline'
											className='border-2 hover:bg-blue-50 bg-transparent transition-all duration-300'
											style={{ borderColor: mainColor, color: mainColor }}
											onClick={step.action}
										>
											<Info className='w-4 h-4 mr-2' />
											Batafsil
										</Button>
									</motion.div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Detailed Services Section - Enhanced */}
			<section className='py-20 bg-gradient-to-b from-gray-50 to-white'>
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
			<section className='py-20 bg-white'>
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
									className='border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300'
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

			{/* Enhanced CTA Section */}
			<section className='py-20  relative overflow-hidden'>
				{/* Background Animation */}
				<div className='absolute inset-0'>
					{[...Array(6)].map((_, i) => (
						<motion.div
							key={i}
							className='absolute w-32 h-32 bg-white/10 rounded-full blur-xl'
							animate={{
								x: [0, 100, 0],
								y: [0, -100, 0],
								scale: [1, 1.2, 1],
							}}
							transition={{
								duration: 15 + i * 2,
								repeat: Number.POSITIVE_INFINITY,
								ease: 'easeInOut',
							}}
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
						/>
					))}
				</div>

				<div className='max-w-4xl mx-auto text-center text-white relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className='text-4xl lg:text-5xl font-bold mb-6 text-[#0E327F]'>
							Bugun ATTO kartasini oling
						</h2>
						<p className='text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600'>
							Toshkent jamoat transportida qulay va tezkor sayohat qiling.
							Kontaktsiz to'lov - kelajak bugun!
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button
								size='lg'
								className='bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
								onClick={() => openModal('where-to-buy')}
							>
								Eng yaqin nuqtani topish <MapPin className='w-5 h-5 ml-2' />
							</Button>
							<Button
								// variant='outline'
								size='lg'
								className='bg-[#0E327F] text-white hover:bg-[#0E327F]/60 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
							>
								Mobil ilova yuklab olish
							</Button>
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
	)
}
