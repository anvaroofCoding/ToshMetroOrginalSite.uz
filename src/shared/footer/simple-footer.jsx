'use client'

import { motion } from 'framer-motion'
import {
	ChevronUp,
	Clock,
	Facebook,
	Instagram,
	Mail,
	MapPin,
	Phone,
	Send,
	Train,
	Youtube,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import logos from '../../../public/MetroLogo.png'

// Mock logo - replace with your actual logo
const logo = '/placeholder.svg?height=50&width=50'

const contacts = [
	{
		icon: <MapPin className='w-4 h-4' />,
		text: "Toshkent sh, I.Karimov ko'chasi, 16a uy",
		title: 'Manzil',
	},
	{
		icon: <Phone className='w-4 h-4' />,
		text: '+99871 241-65-14',
		title: 'Telefon',
	},
	{
		icon: <Mail className='w-4 h-4' />,
		text: 'gup@tashmetro.uz',
		title: 'Email',
	},
]

const socialLinks = [
	{
		href: 'https://t.me/tashkent_metro',
		icon: <Send className='w-5 h-5' />,
		title: 'Telegram',
	},
	{
		href: 'https://instagram.com/tashkent_metro',
		icon: <Instagram className='w-5 h-5' />,
		title: 'Instagram',
	},
	{
		href: 'https://youtube.com/tashkent_metro',
		icon: <Youtube className='w-5 h-5' />,
		title: 'YouTube',
	},
	{
		href: 'https://facebook.com/tashkent_metro',
		icon: <Facebook className='w-5 h-5' />,
		title: 'Facebook',
	},
]

const quickInfo = [
	{
		icon: <Clock className='w-5 h-5' />,
		title: 'Ish Vaqti',
		info: '05:30 - 00:00',
	},
	{
		icon: <Train className='w-5 h-5' />,
		title: 'Poyezdlar',
		info: 'Har 2-4 daqiqada',
	},
]

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
		},
	},
}

export default function SimpleFooter() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<footer className='bg-[#0E327F] text-white mt-16'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-50px' }}
				className='container mx-auto px-4 py-12'
			>
				{/* Main Content */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
					{/* Company Info */}
					<motion.div variants={itemVariants} className='lg:col-span-2'>
						<div className='flex items-center gap-3'>
							<Link href={'/'}>
								<Image
									src={logos}
									alt='Toshkent metro logo'
									width={50}
									height={50}
								/>
							</Link>
							<div className='h-[40px] flex-col justify-center flex'>
								<div className='border-l border-[#00B0FF] h-[30%] w-full'></div>
								<div className='border-l border-[#FF454B] h-[5%] w-full'></div>
								<div className='border-l border-white h-[30%] w-full'></div>
								<div className='border-l border-[#FF454B] h-[5%] w-full'></div>
								<div className='border-l border-[#00B100] h-[30%] w-full'></div>
							</div>
							<h1 className=' text-[11px] lg:text-xs w-[150px] lg:w-[200px] text-white'>
								O‘zbekiston Respublikasi{' '}
								<span className='font-bold'>"Toshkent Metropoliteni"</span> DUK
							</h1>
						</div>
						<p className='text-gray-300 text-sm mb-6 max-w-md mt-5'>
							Shahar bo'ylab tez, xavfsiz va qulay sayohat. Har kuni minglab
							yo'lovchilarga xizmat ko'rsatamiz.
						</p>

						{/* Contact Info */}
						<div className='space-y-3'>
							{contacts.map((item, idx) => (
								<motion.div
									key={idx}
									className='flex items-center gap-3 text-sm'
									whileHover={{ x: 5 }}
									transition={{ duration: 0.2 }}
								>
									<span className='text-[#00B0FF]'>{item.icon}</span>
									<span className='text-gray-300'>{item.text}</span>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Quick Info */}
					<motion.div variants={itemVariants}>
						<h3 className='text-lg font-semibold mb-4 text-[#00B0FF]'>
							Tezkor Ma'lumot
						</h3>
						<div className='space-y-4'>
							{quickInfo.map((item, idx) => (
								<div key={idx} className='flex items-center gap-3'>
									<span className='text-[#00B0FF]'>{item.icon}</span>
									<div>
										<p className='text-xs text-gray-400'>{item.title}</p>
										<p className='text-sm font-medium'>{item.info}</p>
									</div>
								</div>
							))}
							<div className='pt-2'>
								<p className='text-xs text-gray-400 mb-1'>Metro Kartalari</p>
								<p className='text-sm'>2,000 so'm dan boshlab</p>
							</div>
						</div>
					</motion.div>

					{/* Social Media */}
					<motion.div variants={itemVariants}>
						<h3 className='text-lg font-semibold mb-4 text-[#00B0FF]'>
							Ijtimoiy Tarmoqlar
						</h3>
						<div className='grid grid-cols-2 gap-3'>
							{socialLinks.map((item, idx) => (
								<motion.div
									key={idx}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link
										href={item.href}
										target='_blank'
										aria-label={item.title}
										className='flex items-center justify-center text-[14px]  gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors '
									>
										{item.icon}
										<span className='hidden sm:inline'>{item.title}</span>
									</Link>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>

				{/* Metro Lines Info */}
				{/* <motion.div
					variants={itemVariants}
					className='border-t border-white/20 pt-8 mb-8'
				>
					<h3 className='text-lg font-semibold mb-4 text-center'>
						Metro Liniyalari
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='flex items-center justify-center gap-3 p-4 bg-white/5 rounded-lg'>
							<div className='w-4 h-4 bg-[#00B0FF] rounded-full'></div>
							<span className='text-sm'>Chilonzor liniyasi</span>
						</div>
						<div className='flex items-center justify-center gap-3 p-4 bg-white/5 rounded-lg'>
							<div className='w-4 h-4 bg-[#FF454B] rounded-full'></div>
							<span className='text-sm'>Yunusobod liniyasi</span>
						</div>
						<div className='flex items-center justify-center gap-3 p-4 bg-white/5 rounded-lg'>
							<div className='w-4 h-4 bg-[#00B100] rounded-full'></div>
							<span className='text-sm'>Sirgali liniyasi</span>
						</div>
					</div>
				</motion.div> */}
			</motion.div>

			{/* Bottom Bar */}
			<div className='bg-[#0b295d] border-t border-white/10'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
						<p className='text-xs text-gray-400 text-center md:text-left'>
							© 2024 "Toshkent metropoliteni" DUK | Barcha Huquqlar Himoyalangan
						</p>
						<div className='flex items-center gap-4 text-xs text-gray-400'>
							<span>Maxfiylik</span>
							<span>•</span>
							<span>Qoidalar</span>
							<span>•</span>
							<span>Yordam</span>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll to Top Button */}
			<motion.button
				onClick={scrollToTop}
				className='fixed bottom-6 right-6 w-12 h-12 bg-[#00B0FF] text-white rounded-full shadow-lg flex items-center justify-center z-50'
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<ChevronUp className='w-5 h-5' />
			</motion.button>
		</footer>
	)
}
