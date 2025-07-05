'use client'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
	ArrowDown,
	Bus,
	CreditCard,
	GraduationCap,
	MapPin,
	School,
	Smartphone,
	Users,
	Wallet,
} from 'lucide-react'

const mainColor = '#0E327F'

export default function AttoDetailedPage() {
	const cardTypes = [
		{
			title: 'Umumiy transport kartasi',
			description:
				'Aholiga, ya’ni barcha turdagi yo‘lovchilarga mo‘ljallangan.',
			color: 'bg-blue-600',
			icon: <Users className='w-10 h-10 text-white' />,
		},
		{
			title: 'Talabalar uchun',
			description:
				'Jamoat transportida imtiyozli sayohat qilish huquqiga ega talabalar uchun.',
			color: 'bg-green-600',
			icon: <GraduationCap className='w-10 h-10 text-white' />,
		},
		{
			title: "O'quvchilar uchun",
			description:
				"Jamoat transportida imtiyozli sayohat qilish huquqiga ega o'quvchilar uchun.",
			color: 'bg-yellow-500',
			icon: <School className='w-10 h-10 text-white' />,
		},
		{
			title: 'Ijtimoiy karta',
			description: "Imtiyozli nafaqaxo‘rlar va nogironlar uchun mo'ljallangan.",
			color: 'bg-red-600',
			icon: <CreditCard className='w-10 h-10 text-white' />,
		},
	]

	const faqs = [
		{
			question: 'Transport kartasidagi qoldiqni qanday aniqlash mumkin?',
			answer:
				'“ATTO” transport kartasi balansini ATTO, MyUzcard, Payme, Upay, Apelsin mobil ilovalari, bank infokiosklari, yoki “Toshshahartransxizmat” AJ va metro kassalarida tekshirish mumkin.',
		},
		{
			question:
				'Transport kartasidagi balans 1700 so‘mdan kam bo’lsa nima bo‘ladi?',
			answer:
				"Agar qoldiq 1700 so‘mdan kam bo‘lsa, karta vaqtincha bloklanadi. Balansni to'ldirgandan so'ng 10 daqiqa ichida avtomatik ravishda blokdan chiqariladi. Muammosiz foydalanish uchun balansda 1700 so‘mdan ortiq mablag' saqlash tavsiya etiladi.",
		},
		{
			question: 'ATTO transport kartasini uchinchi shaxslarga berish mumkinmi?',
			answer:
				"Yo'q, ATTO transport kartasidan faqat bitta yo'lovchi foydalanishi mumkin. Yo'lovchilar oqimining to'g'ri statistikasini yuritish maqsadida kartani uchinchi shaxslarga o'tkazish yoki qayta ishlatish mumkin emas. Tasodifiy qayta to'lovlarni oldini olish uchun 6 daqiqalik limit o'rnatilgan.",
		},
	]

	const sectionVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		},
	}

	return (
		<div className='w-full container overflow-x-hidden bg-white'>
			{/* Hero Section */}
			<section
				className='relative w-full h-[600px] flex flex-col items-center justify-center text-center text-white p-4 overflow-hidden'
				// style={{ backgroundColor: mainColor }}
			>
				<div className='absolute inset-0 bg-opacity-20' />
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
					className='z-10 p-5 py-10 rounded-xl'
					style={{ backgroundColor: mainColor }}
				>
					<div className='inline-block p-4 bg-white/10 rounded-full mb-4'>
						<CreditCard className='w-12 h-12 text-white' />
					</div>
					<h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight'>
						ATTO Transport Kartasi
					</h1>
					<p className='mt-4 text-lg md:text-2xl max-w-3xl mx-auto text-gray-200'>
						Kontaktsiz (NFC) texnologiyasi bilan Toshkent jamoat transportida
						qulay va tezkor to'lov.
					</p>
					<motion.a
						href='#about'
						className='mt-10 inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-lg font-semibold rounded-full shadow-lg transition-transform duration-300'
						style={{ color: mainColor }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Batafsil ma'lumot <ArrowDown className='w-5 h-5' />
					</motion.a>
				</motion.div>
			</section>

			{/* About Section */}
			<motion.section
				id='about'
				className='py-20 px-4 md:px-8'
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.3 }}
				variants={sectionVariants}
			>
				<div className='max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
					<div className='text-center md:text-left'>
						<h2
							className='text-3xl md:text-4xl font-bold'
							style={{ color: mainColor }}
						>
							ATTO transport kartasi nima?
						</h2>
						<p className='mt-4 text-lg text-gray-600'>
							“ATTO” transport kartasi Toshkent shahridagi jamoat transportida
							yo‘l haqini tez va qulay tarzda to‘lash imkonini beradi. Ayni
							paytda ular “Toshshahartrans” aksiyadorlik jamiyatining barcha
							avtobuslarida hamda “Toshkent metropoliteni”ning yer osti va yer
							usti bekatlarining barcha turniketlarida qabul qilinmoqda.
						</p>
					</div>
					<div className='flex justify-center items-center'>
						<motion.div
							className='relative w-64 h-64'
							initial={{ scale: 0 }}
							whileInView={{ scale: 1 }}
							transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
						>
							<div className='absolute inset-0 bg-blue-100 rounded-full' />
							<Bus
								className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32'
								style={{ color: mainColor }}
							/>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Card Types Section */}
			<motion.section
				className='py-20 px-4 md:px-8 bg-gray-50'
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.2 }}
				variants={sectionVariants}
			>
				<div className='max-w-6xl mx-auto'>
					<h2
						className='text-3xl md:text-4xl font-bold text-center'
						style={{ color: mainColor }}
					>
						ATTO Transport Kartalari Turlari
					</h2>
					<p className='mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto'>
						Hozirgi vaqtda yo'lovchilarning turli toifalari uchun mo'ljallangan
						to'rt turdagi ATTO transport kartalari joriy qilingan.
					</p>
					<div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
						{cardTypes.map((card, index) => (
							<motion.div
								key={card.title}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.15 }}
								viewport={{ once: true }}
							>
								<Card className='text-center overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col'>
									<CardHeader
										className={`${card.color} flex flex-col items-center justify-center p-6 flex-grow`}
									>
										<div className='bg-white/20 p-4 rounded-full mb-4'>
											{card.icon}
										</div>
										<CardTitle className='text-xl font-bold text-white'>
											{card.title}
										</CardTitle>
									</CardHeader>
									<CardContent className='p-6 bg-white'>
										<p className='text-gray-600'>{card.description}</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* How to Use Section */}
			<motion.section
				className='py-20 px-4 md:px-8'
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.2 }}
				variants={sectionVariants}
			>
				<div className='max-w-5xl mx-auto'>
					<h2
						className='text-3xl md:text-4xl font-bold text-center mb-16'
						style={{ color: mainColor }}
					>
						Kartadan Foydalanish
					</h2>
					<div className='grid md:grid-cols-3 gap-10 text-center'>
						<div className='flex flex-col items-center'>
							<div className='p-5 rounded-full bg-blue-100 mb-4'>
								<MapPin className='w-10 h-10' style={{ color: mainColor }} />
							</div>
							<h3
								className='text-xl font-bold mb-2'
								style={{ color: mainColor }}
							>
								Qayerdan sotib olish
							</h3>
							<p className='text-gray-600'>
								“Toshshahartransxizmat” AJ chipta sotish nuqtalarida va metro
								kassalarida.
							</p>
						</div>
						<div className='flex flex-col items-center'>
							<div className='p-5 rounded-full bg-green-100 mb-4'>
								<Wallet className='w-10 h-10 text-green-700' />
							</div>
							<h3 className='text-xl font-bold mb-2 text-green-700'>
								Balansni to'ldirish
							</h3>
							<p className='text-gray-600'>
								ATTO, MyUzcard, Payme kabi mobil ilovalar, infokiosklar yoki
								kassalar orqali.
							</p>
						</div>
						<div className='flex flex-col items-center'>
							<div className='p-5 rounded-full bg-yellow-100 mb-4'>
								<Smartphone className='w-10 h-10 text-yellow-700' />
							</div>
							<h3 className='text-xl font-bold mb-2 text-yellow-700'>
								Yo'l haqini to'lash
							</h3>
							<p className='text-gray-600'>
								Avtobus yoki metro validatoriga kartani tekkizing va yashil
								chiroqni kuting.
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* FAQ Section */}
			<motion.section
				className='py-20 px-4 md:px-8 bg-gray-50'
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.2 }}
				variants={sectionVariants}
			>
				<div className='max-w-3xl mx-auto'>
					<h2
						className='text-3xl md:text-4xl font-bold text-center mb-12'
						style={{ color: mainColor }}
					>
						Qo'shimcha ma'lumotlar
					</h2>
					<Accordion type='single' collapsible className='w-full'>
						{faqs.map((faq, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger className='text-left text-lg font-semibold hover:no-underline'>
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className='text-base text-gray-600 leading-relaxed'>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</motion.section>
		</div>
	)
}
