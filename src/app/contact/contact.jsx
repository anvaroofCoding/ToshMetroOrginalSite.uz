'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Textarea from '@/components/ui/textarea'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
	Building2,
	Clock,
	Facebook,
	VoicemailIcon as Fax,
	Instagram,
	Mail,
	MapPin,
	MessageCircle,
	MessageSquare,
	Phone,
	Send,
	Sparkles,
	User,
	Utensils,
	Youtube,
} from 'lucide-react'
import { useState } from 'react'

const socialLinks = [
	{
		name: 'YouTube',
		icon: Youtube,
		url: '#',
		color: '#FF0000',
		bgColor: 'bg-red-50',
		hoverColor: 'hover:bg-red-100',
	},
	{
		name: 'Facebook',
		icon: Facebook,
		url: '#',
		color: '#1877F2',
		bgColor: 'bg-blue-50',
		hoverColor: 'hover:bg-blue-100',
	},
	{
		name: 'Instagram',
		icon: Instagram,
		url: '#',
		color: '#E4405F',
		bgColor: 'bg-pink-50',
		hoverColor: 'hover:bg-pink-100',
	},
	{
		name: 'Telegram',
		icon: MessageCircle,
		url: '#',
		color: '#0088CC',
		bgColor: 'bg-sky-50',
		hoverColor: 'hover:bg-sky-100',
	},
]

const contactInfo = [
	{
		icon: MapPin,
		title: 'Manzil',
		content: 'Toshkent shahri, Shayxontohur tumani, Islom Karimov 16А, 100027',
		delay: 0.1,
		color: 'text-emerald-600',
		bgColor: 'bg-emerald-50',
		borderColor: 'border-emerald-200',
	},
	{
		icon: Phone,
		title: 'Telefon',
		content: [
			'Qabul xona: +998 (71) 241-65-14',
			'Murojaatlar uchun: +998 (71) 245-56-03',
		],
		delay: 0.2,
		color: 'text-green-600',
		bgColor: 'bg-green-50',
		borderColor: 'border-green-200',
	},
	{
		icon: Clock,
		title: 'Ish rejimi',
		content: 'Dushanba - Juma (8:00 - 17:00)',
		delay: 0.3,
		color: 'text-orange-600',
		bgColor: 'bg-orange-50',
		borderColor: 'border-orange-200',
	},
	{
		icon: Utensils,
		title: 'Tushlik vaqti',
		content: '12:00 - 13:00',
		delay: 0.4,
		color: 'text-amber-600',
		bgColor: 'bg-amber-50',
		borderColor: 'border-amber-200',
	},
	{
		icon: Mail,
		title: 'Elektron pochta',
		content: 'igup@tashmetro.uz',
		delay: 0.5,
		color: 'text-purple-600',
		bgColor: 'bg-purple-50',
		borderColor: 'border-purple-200',
	},
	{
		icon: Fax,
		title: 'FAKS',
		content: '+998 (71) 233-66-81',
		delay: 0.6,
		color: 'text-slate-600',
		bgColor: 'bg-slate-50',
		borderColor: 'border-slate-200',
	},
]

const FloatingOrb = ({
	delay = 0,
	size = 'w-32 h-32',
	position = 'top-20 left-20',
}) => (
	<motion.div
		className={`absolute ${position} ${size} rounded-full bg-gradient-to-br from-[#0E327F]/10 to-blue-200/20 blur-xl`}
		animate={{
			x: [0, 50, -30, 0],
			y: [0, -30, 50, 0],
			scale: [1, 1.2, 0.8, 1],
			rotate: [0, 180, 360],
		}}
		transition={{
			duration: 15,
			repeat: Number.POSITIVE_INFINITY,
			delay,
			ease: 'easeInOut',
		}}
	/>
)

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		comment: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { toast } = useToast()
	const { scrollY } = useScroll()
	const y1 = useTransform(scrollY, [0, 500], [0, -100])
	const y2 = useTransform(scrollY, [0, 500], [0, 100])
	const springY = useSpring(y1, { stiffness: 100, damping: 30 })

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsSubmitting(true)

		await new Promise(resolve => setTimeout(resolve, 2000))

		toast({
			title: '🎉 Muvaffaqiyatli yuborildi!',
			description: 'Sizning xabaringiz qabul qilindi. Tez orada javob beramiz.',
			duration: 5000,
		})

		setFormData({ name: '', email: '', phone: '', comment: '' })
		setIsSubmitting(false)
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 30, scale: 0.9 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	}

	const titleVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.03,
			},
		},
	}

	const letterVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	}

	const title = 'METROPOLITENDA REKLAMA'

	return (
		<div className='min-h-screen relative overflow-hidden'>
			{/* Floating Background Elements */}
			<FloatingOrb delay={0} size='w-40 h-40' position='top-20 left-10' />
			<FloatingOrb delay={3} size='w-24 h-24' position='top-40 right-20' />
			<FloatingOrb delay={6} size='w-32 h-32' position='bottom-20 left-1/4' />
			<FloatingOrb delay={9} size='w-28 h-28' position='bottom-40 right-10' />

			{/* Animated Grid Pattern */}
			<div className='absolute inset-0 opacity-5'>
				<div
					className='absolute inset-0'
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, #0E327F 1px, transparent 0)`,
						backgroundSize: '40px 40px',
					}}
				/>
			</div>

			<div className='container mx-auto px-4 py-12 relative z-10'>
				{/* Simple Header */}
				<motion.div className='text-center mb-20'>
					<motion.div
						variants={titleVariants}
						initial='hidden'
						animate='visible'
						className='mb-8'
					>
						<motion.h1
							variants={letterVariants}
							className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0E327F] mb-4'
						>
							<h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#0E327F] via-blue-600 to-[#0E327F] bg-clip-text text-transparent leading-tight'>
								Gender Tenglik Dashboard
							</h1>
						</motion.h1>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className='relative max-w-4xl mx-auto'
					>
						<div className='bg-gray-50 rounded-2xl px-8 py-6 border border-gray-200 shadow-lg'>
							<p className='text-lg sm:text-xl text-gray-700 font-medium'>
								Metropolitenda reklama joylashtirish masalalari bo'yicha
								quyidagi aloqa vositalari orqali murojaat qilishingiz mumkin
							</p>
						</div>
					</motion.div>
				</motion.div>

				<div className='grid lg:grid-cols-3 gap-12'>
					{/* Contact Information */}
					<motion.div
						className='lg:col-span-2'
						variants={containerVariants}
						initial='hidden'
						animate='visible'
					>
						<motion.div variants={itemVariants} className='mb-12'>
							<h2 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-4 flex items-center'>
								<Building2 className='w-10 h-10 text-[#0E327F] mr-4' />
								Aloqa ma'lumotlari
							</h2>
							<div className='w-24 h-1 bg-[#0E327F] rounded-full'></div>
						</motion.div>

						<div className='grid sm:grid-cols-2 gap-6 mb-12'>
							{contactInfo.map((info, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									whileHover={{
										y: -8,
										scale: 1.02,
										transition: { duration: 0.3 },
									}}
									className='group'
								>
									<Card
										className={`${info.bgColor} border-2 ${info.borderColor} hover:shadow-xl transition-all duration-500 overflow-hidden relative h-full`}
									>
										<motion.div className='absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
										<CardContent className='p-6 relative z-10'>
											<div className='flex items-start space-x-4'>
												<motion.div
													className={`p-4 rounded-2xl bg-white shadow-lg ${info.color}`}
													whileHover={{
														rotate: [0, -10, 10, 0],
														scale: 1.1,
													}}
													transition={{ duration: 0.5 }}
												>
													<info.icon className='w-7 h-7' />
												</motion.div>
												<div className='flex-1'>
													<h3 className='font-bold text-gray-800 mb-3 text-lg'>
														{info.title}
													</h3>
													{Array.isArray(info.content) ? (
														<div className='space-y-2'>
															{info.content.map((item, idx) => (
																<motion.p
																	key={idx}
																	className='text-gray-600 leading-relaxed'
																	initial={{ opacity: 0, x: -20 }}
																	animate={{ opacity: 1, x: 0 }}
																	transition={{ delay: info.delay + idx * 0.1 }}
																>
																	{item}
																</motion.p>
															))}
														</div>
													) : (
														<motion.p
															className='text-gray-600 leading-relaxed'
															initial={{ opacity: 0, x: -20 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ delay: info.delay }}
														>
															{info.content}
														</motion.p>
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>

						{/* Social Media */}
						<motion.div variants={itemVariants}>
							<Card className='bg-[#0E327F] border-0 overflow-hidden relative shadow-2xl'>
								<motion.div
									className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent'
									animate={{ x: [-200, 400] }}
									transition={{
										duration: 3,
										repeat: Number.POSITIVE_INFINITY,
										repeatDelay: 2,
										ease: 'linear',
									}}
								/>
								<CardContent className='p-8 relative z-10'>
									<h3 className='font-bold text-white mb-8 text-2xl flex items-center'>
										<motion.div
											animate={{ rotate: 360 }}
											transition={{
												duration: 4,
												repeat: Number.POSITIVE_INFINITY,
												ease: 'linear',
											}}
											className='mr-4'
										>
											<Sparkles className='w-8 h-8' />
										</motion.div>
										Ijtimoiy tarmoqlar
									</h3>
									<div className='grid grid-cols-2 sm:grid-cols-4 gap-6'>
										{socialLinks.map((social, index) => (
											<motion.a
												key={index}
												href={social.url}
												className={`flex flex-col items-center space-y-3 p-6 ${social.bgColor} ${social.hoverColor} rounded-2xl font-semibold shadow-lg relative overflow-hidden group border-2 border-white/20`}
												whileHover={{
													scale: 1.1,
													rotate: [0, -3, 3, 0],
													transition: { duration: 0.4 },
												}}
												whileTap={{ scale: 0.95 }}
												initial={{ opacity: 0, scale: 0, rotate: 180 }}
												animate={{ opacity: 1, scale: 1, rotate: 0 }}
												transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
											>
												<motion.div
													className='absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
													initial={{ scale: 0 }}
													whileHover={{ scale: 1 }}
												/>
												<social.icon
													className='w-8 h-8 relative z-10'
													style={{ color: social.color }}
												/>
												<span className='text-sm text-gray-700 relative z-10 font-semibold'>
													{social.name}
												</span>
											</motion.a>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						className='lg:col-span-1'
						initial={{ opacity: 0, x: 50, rotateY: -10 }}
						animate={{ opacity: 1, x: 0, rotateY: 0 }}
						transition={{ delay: 0.5, duration: 0.8 }}
						style={{ y: springY }}
					>
						<Card className='bg-white border-2 border-gray-200 shadow-2xl overflow-hidden relative sticky top-8'>
							<motion.div
								className='absolute top-0 left-0 w-full h-2 bg-[#0E327F]'
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ delay: 1, duration: 1.2 }}
							/>

							<CardContent className='p-8'>
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 1.2, duration: 0.6 }}
									className='mb-8'
								>
									<h2 className='text-2xl font-bold text-gray-800 mb-3 flex items-center'>
										<motion.div
											animate={{
												rotate: [0, 360],
												scale: [1, 1.1, 1],
											}}
											transition={{
												duration: 3,
												repeat: Number.POSITIVE_INFINITY,
												ease: 'easeInOut',
											}}
											className='mr-3'
										>
											<Send className='w-7 h-7 text-[#0E327F]' />
										</motion.div>
										Xabar yuborish
									</h2>
									<p className='text-gray-600'>
										Bizga xabar yuboring va biz tez orada javob beramiz
									</p>
								</motion.div>

								<form onSubmit={handleSubmit} className='space-y-6'>
									<motion.div
										initial={{ opacity: 0, x: -30 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 1.3, duration: 0.5 }}
										className='space-y-2'
									>
										<Label
											htmlFor='name'
											className='flex items-center text-gray-700 font-semibold'
										>
											<User className='w-4 h-4 mr-2 text-[#0E327F]' />
											Ism
										</Label>
										<Input
											id='name'
											name='name'
											value={formData.name}
											onChange={handleInputChange}
											placeholder='Ismingizni kiriting'
											required
											className='border-2 border-gray-200 focus:border-[#0E327F] focus:ring-[#0E327F] transition-all duration-300 bg-gray-50 focus:bg-white'
										/>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, x: 30 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 1.4, duration: 0.5 }}
										className='space-y-2'
									>
										<Label
											htmlFor='email'
											className='flex items-center text-gray-700 font-semibold'
										>
											<Mail className='w-4 h-4 mr-2 text-[#0E327F]' />
											Elektron pochta
										</Label>
										<Input
											id='email'
											name='email'
											type='email'
											value={formData.email}
											onChange={handleInputChange}
											placeholder='email@example.com'
											required
											className='border-2 border-gray-200 focus:border-[#0E327F] focus:ring-[#0E327F] transition-all duration-300 bg-gray-50 focus:bg-white'
										/>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 1.5, duration: 0.5 }}
										className='space-y-2'
									>
										<Label
											htmlFor='phone'
											className='flex items-center text-gray-700 font-semibold'
										>
											<Phone className='w-4 h-4 mr-2 text-[#0E327F]' />
											Telefon raqami
										</Label>
										<Input
											id='phone'
											name='phone'
											type='tel'
											value={formData.phone}
											onChange={handleInputChange}
											placeholder='+998 XX XXX XX XX'
											required
											className='border-2 border-gray-200 focus:border-[#0E327F] focus:ring-[#0E327F] transition-all duration-300 bg-gray-50 focus:bg-white'
										/>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 1.6, duration: 0.5 }}
										className='space-y-2'
									>
										<Label
											htmlFor='comment'
											className='flex items-center text-gray-700 font-semibold'
										>
											<MessageSquare className='w-4 h-4 mr-2 text-[#0E327F]' />
											Xabar
										</Label>
										<Textarea
											id='comment'
											name='comment'
											value={formData.comment}
											onChange={handleInputChange}
											placeholder='Xabaringizni yozing...'
											rows={5}
											required
											className='border-2 border-gray-200 focus:border-[#0E327F] focus:ring-[#0E327F] transition-all duration-300 resize-none bg-gray-50 focus:bg-white'
										/>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 1.7, duration: 0.5 }}
									>
										<Button
											type='submit'
											disabled={isSubmitting}
											className='w-full bg-[#0E327F] hover:bg-[#0E327F]/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group'
										>
											<motion.div
												className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
												initial={{ x: '-100%' }}
												animate={isSubmitting ? { x: '100%' } : {}}
												transition={{
													duration: 1.5,
													repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0,
													ease: 'linear',
												}}
											/>
											<div className='relative z-10 flex items-center justify-center'>
												{isSubmitting ? (
													<motion.div
														animate={{ rotate: 360 }}
														transition={{
															duration: 1,
															repeat: Number.POSITIVE_INFINITY,
															ease: 'linear',
														}}
														className='w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3'
													/>
												) : (
													<Send className='w-5 h-5 mr-3' />
												)}
												<span className='text-lg'>
													{isSubmitting ? 'Yuborilmoqda...' : 'Xabar yuborish'}
												</span>
											</div>
										</Button>
									</motion.div>
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
			<Toaster />
		</div>
	)
}
