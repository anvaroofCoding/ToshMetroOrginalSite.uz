'use client'

import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
	Calculator,
	Calendar,
	Clock,
	DollarSign,
	Eye,
	GraduationCap,
	MapPin,
	Phone,
	Radio,
	Scale,
	Star,
	Train,
	Users,
	Zap,
} from 'lucide-react'
import { useState } from 'react'

const jobPositions = [
	{
		id: 1,
		title: 'YURIDIK BOSHQARMA YURISKONSULTI',
		titleEn: 'Legal Department Legal Consultant',
		icon: Scale,
		color: 'from-blue-500 to-purple-600',
		requirements: [
			"Yuridik yo'nalishda oliy ma'lumotga ega bo'lish",
			"Kamida 5 yillik yuridik stajga ega bo'lish",
			"Shartnomaviy-huquqiy va talabnoma-da'vo ishlarini yuritish tajribasi",
			"Sud hujjatlari ijrosi bilan ishlash yo'nalishida yetarli bilim",
			"Kreativ fikrlash, tashabbuskorlik va mas'uliyat",
			'Davlat tilida ish yurtishni mukammal bilish',
		],
		benefits: [
			"Oylik maosh: 10-14 million so'm",
			"Ovqatlanish uchun 935,000 so'm kompensatsiya",
			"Ijara puli: 1.5 mln so'mgacha",
			"Ish natijalari bo'yicha qo'shimcha to'lov (250-sonli qaror)",
		],
		ageRange: '30-50 yosh',
		category: 'Yuridik',
		salaryRange: '10-14 mln',
	},
	{
		id: 2,
		title: 'ELEKTROPOYEZD MASHINISTI',
		titleEn: 'Electric Train Operator',
		icon: Train,
		color: 'from-green-500 to-teal-600',
		requirements: [
			'Elektrovoz yoki teplovozni boshqarish guvohnomasi',
			"Lokomotivlar va vagonlar tuzilishi bo'yicha bilim",
			"Kasbiy ko'nikma va boshqarish tajribasi",
		],
		benefits: [
			"Maxsus o'quv kursiga yuborish",
			"O'qish davrida stipendiya to'lash",
			"Ijara puli: 1.5 mln so'mgacha",
			'Tekin nonushta va tushlik',
			'Ovqatlanish uchun pullik kompensatsiya',
			"Doimiy tibbiy ko'rik ta'minlanadi",
		],
		ageRange: 'Cheklanmagan',
		category: 'Transport',
		salaryRange: "Shtat bo'yicha",
	},
	{
		id: 3,
		title: 'OPERATOR',
		titleEn: 'Operator',
		icon: Calculator,
		color: 'from-orange-500 to-red-600',
		requirements: [
			"Moliya, buxgalteriya yoki iqtisod yo'nalishi bo'yicha o'rta-maxsus ma'lumot",
			"Kassa ishini yuritish bo'yicha kasbiy ko'nikma",
			"O'zbek va rus tillarida so'zlasha olish",
		],
		benefits: [
			'Ovqatlanish uchun pullik kompensatsiya',
			"Doimiy tibbiy ko'rik ta'minlanadi",
			"Noqulay ish sharoitlari uchun qo'shimcha ta'til",
			'Shtat jadvaliga asosan maosh',
		],
		ageRange: 'Cheklanmagan',
		category: 'Moliya',
		salaryRange: "Shtat bo'yicha",
	},
	{
		id: 4,
		title: "ELEKTR TA'MINOTI ELEKTROMEXANIGI",
		titleEn: 'Electrical Supply Electromechanic',
		icon: Zap,
		color: 'from-yellow-500 to-orange-600',
		requirements: [
			"Elektr qurilmalariga xizmat ko'rsatish yo'nalishida o'rta-maxsus ma'lumot",
			"Elektr texnikasi bo'yicha kasbiy ko'nikma",
			"Elektr ta'minoti bo'yicha tajriba",
		],
		benefits: [
			'Ovqatlanish uchun pullik kompensatsiya',
			"Doimiy tibbiy ko'rik ta'minlanadi",
			"Noqulay ish sharoitlari uchun qo'shimcha ta'til",
			'Shtat jadvaliga asosan maosh',
		],
		ageRange: 'Cheklanmagan',
		category: 'Texnik',
		salaryRange: "Shtat bo'yicha",
	},
	{
		id: 5,
		title: 'SIGNALLASHTIRISH ELEKTROMEXANIGI',
		titleEn: 'Signaling, Blocking & Centralization Electromechanic',
		icon: Radio,
		color: 'from-purple-500 to-pink-600',
		requirements: [
			"Elektr qurilmalarni avtomatlashtirish yo'nalishida o'rta-maxsus ma'lumot",
			"Elektrtexnika bo'yicha kasbiy ko'nikma",
			"Signallashtirish, bloklash va markazlashtirish tizimlari bo'yicha bilim",
		],
		benefits: [
			'Ovqatlanish uchun pullik kompensatsiya',
			"Doimiy tibbiy ko'rik ta'minlanadi",
			"Noqulay ish sharoitlari uchun qo'shimcha ta'til",
			'Shtat jadvaliga asosan maosh',
		],
		ageRange: 'Cheklanmagan',
		category: 'Texnik',
		salaryRange: "Shtat bo'yicha",
	},
	{
		id: 6,
		title: 'METRO BEKATI NAVBATCHISI',
		titleEn: 'Metro Station Train Monitoring Duty Officer',
		icon: Eye,
		color: 'from-teal-500 to-blue-600',
		requirements: [
			"Bekat navbatchisi kasbi bo'yicha o'rta-maxsus ma'lumot",
			"Bekat xo'jaligi bo'yicha kasbiy ko'nikma",
			"O'zbek va rus tillarini bilish",
			"Poyezdlarni kutish va kuzatish bo'yicha tajriba",
		],
		benefits: [
			'Ovqatlanish uchun pullik kompensatsiya',
			"Doimiy tibbiy ko'rik ta'minlanadi",
			"Noqulay ish sharoitlari uchun qo'shimcha ta'til",
			'Shtat jadvaliga asosan maosh',
		],
		ageRange: 'Cheklanmagan',
		category: 'Xizmat',
		salaryRange: "Shtat bo'yicha",
	},
]

export default function Component() {
	const [selectedJob, setSelectedJob] = useState()
	const { scrollYProgress } = useScroll()
	const y = useTransform(scrollYProgress, [0, 1], [0, -50])

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<motion.section
				className='relative overflow-hidden '
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				{/* Animated Background Elements */}
				<div className='absolute inset-0 overflow-hidden'>
					<motion.div
						animate={{
							rotate: 360,
						}}
						transition={{
							duration: 20,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
						className='absolute -top-10 -right-10 w-40 h-40 border-2 border-[#0E327F]/10 rounded-full'
					/>
					<motion.div
						animate={{
							rotate: -360,
						}}
						transition={{
							duration: 25,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
						className='absolute top-1/2 -left-20 w-60 h-60 border-2 border-blue-200/30 rounded-full'
					/>
					<motion.div
						animate={{
							y: [-20, 20, -20],
						}}
						transition={{
							duration: 6,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'easeInOut',
						}}
						className='absolute bottom-10 right-1/4 w-32 h-32 bg-gradient-to-r from-[#0E327F]/5 to-blue-100/20 rounded-full blur-xl'
					/>
				</div>

				<div className='relative container py-20 lg:py-10'>
					<motion.div
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.8 }}
						className='text-center max-w-4xl mx-auto'
					>
						<motion.div
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
							className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#0E327F] to-blue-600 rounded-full mb-8 shadow-2xl'
						>
							<Train className='w-12 h-12 text-white' />
						</motion.div>

						<motion.h1
							initial={{ y: 30, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.7, duration: 0.8 }}
							className='text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#0E327F] to-blue-600 bg-clip-text text-transparent'
						>
							Toshkent Metro
						</motion.h1>

						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.9, duration: 0.8 }}
							className='text-xl lg:text-2xl mb-8 text-gray-700'
						>
							Karyerangizni bizning jamoamizda boshlang
						</motion.p>

						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 1.1 }}
							className='flex flex-wrap justify-center gap-4 text-sm lg:text-base'
						>
							<motion.div
								whileHover={{ scale: 1.05 }}
								className='flex items-center gap-2 bg-gradient-to-r from-[#0E327F] to-blue-600 text-white px-6 py-3 rounded-full shadow-lg'
							>
								<Users className='w-4 h-4' />
								<span>6 ta bo'sh ish o'rni</span>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.05 }}
								className='flex items-center gap-2 bg-white border-2 border-[#0E327F] text-[#0E327F] px-6 py-3 rounded-full shadow-lg'
							>
								<Star className='w-4 h-4' />
								<span>Mukammal imkoniyatlar</span>
							</motion.div>
						</motion.div>

						{/* Floating Stats */}
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 1.3, duration: 0.8 }}
							className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto'
						>
							<motion.div
								whileHover={{ y: -5 }}
								className='bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl'
							>
								<div className='text-3xl font-bold text-[#0E327F] mb-2'>
									14 mln
								</div>
								<div className='text-gray-600'>Maksimal maosh</div>
							</motion.div>
							<motion.div
								whileHover={{ y: -5 }}
								className='bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl'
							>
								<div className='text-3xl font-bold text-[#0E327F] mb-2'>
									1.5 mln
								</div>
								<div className='text-gray-600'>Ijara kompensatsiyasi</div>
							</motion.div>
							<motion.div
								whileHover={{ y: -5 }}
								className='bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl'
							>
								<div className='text-3xl font-bold text-[#0E327F] mb-2'>
									100%
								</div>
								<div className='text-gray-600'>Tibbiy ta'minot</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</motion.section>

			{/* Jobs Section */}
			<section className='container py-16'>
				<motion.div
					initial={{ y: 50, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className='text-center mb-16'
				>
					<h2 className='text-3xl lg:text-4xl font-bold mb-4 text-[#0E327F]'>
						Bo'sh ish o'rinlari
					</h2>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
						Toshkent Metro jamoasiga qo'shiling va shahar transporti tizimining
						rivojlanishida ishtirok eting
					</p>
				</motion.div>

				<div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{jobPositions.map((job, index) => (
						<motion.div
							key={job.id}
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ delay: index * 0.1, duration: 0.6 }}
							viewport={{ once: true }}
							whileHover={{ y: -5 }}
							className='group cursor-pointer'
							onClick={() =>
								setSelectedJob(selectedJob === job.id ? null : job.id)
							}
						>
							<Card className='h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden'>
								<div className={`h-2 bg-gradient-to-r ${job.color}`} />
								<CardHeader className='pb-4'>
									<div className='flex items-start justify-between'>
										<div
											className={`p-3 rounded-lg bg-gradient-to-r ${job.color} text-white mb-4`}
										>
											<job.icon className='w-6 h-6' />
										</div>
										<Badge variant='secondary' className='text-xs'>
											{job.category}
										</Badge>
									</div>
									<CardTitle className='text-lg font-bold text-gray-900 group-hover:text-[#0E327F] transition-colors'>
										{job.title}
									</CardTitle>
								</CardHeader>

								<CardContent className='pt-0'>
									<div className='flex items-center justify-between mb-4'>
										<div className='flex items-center gap-2 text-sm text-gray-600'>
											<Calendar className='w-4 h-4' />
											<span>{job.ageRange}</span>
										</div>
										<div className='flex items-center gap-2 text-sm font-semibold text-[#0E327F]'>
											<DollarSign className='w-4 h-4' />
											<span>{job.salaryRange}</span>
										</div>
									</div>

									<motion.div
										initial={false}
										animate={{ height: selectedJob === job.id ? 'auto' : 0 }}
										className='overflow-hidden'
									>
										<div className='space-y-4 pb-4'>
											<div>
												<h4 className='font-semibold text-gray-900 mb-2 flex items-center gap-2'>
													<GraduationCap className='w-4 h-4' />
													Malakaviy talablar:
												</h4>
												<ul className='space-y-1 text-sm text-gray-600'>
													{job.requirements.map((req, idx) => (
														<motion.li
															key={idx}
															initial={{ opacity: 0, x: -10 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ delay: idx * 0.1 }}
															className='flex items-start gap-2'
														>
															<div className='w-1.5 h-1.5 bg-[#0E327F] rounded-full mt-2 flex-shrink-0' />
															<span>{req}</span>
														</motion.li>
													))}
												</ul>
											</div>

											<Separator />

											<div>
												<h4 className='font-semibold text-gray-900 mb-2 flex items-center gap-2'>
													<Star className='w-4 h-4' />
													Imtiyozlar:
												</h4>
												<ul className='space-y-1 text-sm text-gray-600'>
													{job.benefits.map((benefit, idx) => (
														<motion.li
															key={idx}
															initial={{ opacity: 0, x: -10 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ delay: idx * 0.1 }}
															className='flex items-start gap-2'
														>
															<div className='w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0' />
															<span>{benefit}</span>
														</motion.li>
													))}
												</ul>
											</div>
										</div>
									</motion.div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</section>

			{/* Contact Section */}
			<motion.section
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className='bg-white text-gray-900 py-16'
			>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto text-center'>
						<motion.h2
							initial={{ y: 30, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2 }}
							className='text-3xl lg:text-4xl font-bold mb-8 text-[#0E327F]'
						>
							Biz bilan bog'laning
						</motion.h2>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
							<motion.div
								initial={{ y: 30, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.3 }}
								className='flex flex-col items-center'
							>
								<div className='w-16 h-16 bg-[#0E327F]/10 rounded-full flex items-center justify-center mb-4'>
									<MapPin className='w-8 h-8' />
								</div>
								<h3 className='font-semibold mb-2 text-[#0E327F]'>Manzil</h3>
								<p className='text-gray-600 text-center'>
									Toshkent shahar, Shayxontohur tumani,
									<br />
									I.Karimov ko'chasi, 16a-uy
								</p>
							</motion.div>

							<motion.div
								initial={{ y: 30, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.4 }}
								className='flex flex-col items-center'
							>
								<div className='w-16 h-16 bg-[#0E327F]/10 rounded-full flex items-center justify-center mb-4'>
									<Phone className='w-8 h-8' />
								</div>
								<h3 className='font-semibold mb-2'>Telefon</h3>
								<p className='text-gray-600'>(+998-71) 239-89-27</p>
							</motion.div>

							<motion.div
								initial={{ y: 30, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.5 }}
								className='flex flex-col items-center'
							>
								<div className='w-16 h-16 bg-[#0E327F]/10 rounded-full flex items-center justify-center mb-4'>
									<Clock className='w-8 h-8' />
								</div>
								<h3 className='font-semibold mb-2'>Ish vaqti</h3>
								<p className='text-gray-600 text-center'>
									Dushanba-Juma
									<br />
									8:00 - 17:00
								</p>
							</motion.div>
						</div>

						<motion.div
							initial={{ y: 30, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.6 }}
							className='bg-gray-50 border border-gray-200 rounded-lg p-6'
						>
							<h3 className='font-semibold mb-4'>Muhim ma'lumot</h3>
							<p className='text-gray-700'>
								Nomzodlarni ishga olish suhbat asosida, malaka darajasi va
								tibbiy ko'rik natijalariga ko'ra amalga oshiriladi.
							</p>
						</motion.div>
					</div>
				</div>
			</motion.section>
		</div>
	)
}