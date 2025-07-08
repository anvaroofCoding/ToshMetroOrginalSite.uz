// 'use client'

import SimpleFooter from './simple-footer'

// import { motion } from 'framer-motion'
// import {
// 	Facebook,
// 	Instagram,
// 	Mail,
// 	MapPin,
// 	Phone,
// 	Send,
// 	Youtube,
// } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import logo from '../../../public/MetroLogo.png'

// const contacts = [
// 	{
// 		icon: <MapPin className='w-5 h-5' />,
// 		text: "Toshkent sh, I.Karimov ko'chasi, 16a uy, 100027",
// 		title: 'Manzil',
// 	},
// 	{
// 		icon: <Phone className='w-5 h-5' />,
// 		text: '+99871 241-65-14',
// 		title: 'Telefon',
// 	},
// 	{
// 		icon: <Mail className='w-5 h-5' />,
// 		text: 'gup@tashmetro.uz',
// 		title: 'Email',
// 	},
// ]

// const socialLinks = [
// 	{
// 		href: 'https://t.me/tashkent_metro',
// 		icon: <Send className='w-5 h-5' />,
// 		title: 'Telegram',
// 	},
// 	{
// 		href: 'https://instagram.com/tashkent_metro',
// 		icon: <Instagram className='w-5 h-5' />,
// 		title: 'Instagram',
// 	},
// 	{
// 		href: 'https://youtube.com/tashkent_metro',
// 		icon: <Youtube className='w-5 h-5' />,
// 		title: 'YouTube',
// 	},
// 	{
// 		href: 'https://facebook.com/tashkent_metro',
// 		icon: <Facebook className='w-5 h-5' />,
// 		title: 'Facebook',
// 	},
// ]

// export default function Footer() {
// 	return (
// 		<footer className='bg-[#0E327F] text-white mt-10'>
// 			<div className='container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-6'>
// 				{/* LEFT: Logo + title */}
// 				<div className='flex flex-col items-start gap-5'>
// 					<div className='flex items-center gap-3'>
// 						<Link href={'/'}>
// 							<Image src={logo} alt='Toshkent metro logo' height={50} />
// 						</Link>

// 						<div className='h-[50px] flex flex-col justify-center'>
// 							<div className='border border-[#00B0FF] h-[30%] w-full'></div>
// 							<div className='border border-[#FF454B] h-[5%] w-full'></div>
// 							<div className='border border-white h-[30%] w-full'></div>
// 							<div className='border border-[#FF454B] h-[5%] w-full'></div>
// 							<div className='border border-[#00B100] h-[30%] w-full'></div>
// 						</div>

// 						<h1 className='text-xs md:text-sm w-[150px] md:w-[200px]'>
// 							O‘zbekiston Respublikasi{' '}
// 							<span className='font-extrabold'>"Toshkent Metropoliteni"</span>{' '}
// 							DUK
// 						</h1>
// 					</div>

// 					{/* MIDDLE: Contacts */}
// 					<div className='flex flex-col gap-2'>
// 						{contacts.map((item, idx) => (
// 							<div key={idx} className='relative group flex items-center gap-2'>
// 								{item.icon}
// 								<span className='text-sm'>{item.text}</span>
// 								<motion.div
// 									initial={{ opacity: 0, y: 5 }}
// 									whileHover={{ opacity: 1, y: 0 }}
// 									transition={{ duration: 0.3 }}
// 									className='absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-blue-700 text-xs px-2 py-1 rounded shadow pointer-events-none'
// 								>
// 									{item.title}
// 								</motion.div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 				{/* RIGHT: Social */}
// 				<div className='flex gap-4'>
// 					{socialLinks.map((item, idx) => (
// 						<div key={idx} className='relative group'>
// 							<Link href={item.href} target='_blank' aria-label={item.title}>
// 								<span className='text-white hover:text-blue-300 transition'>
// 									{item.icon}
// 								</span>
// 							</Link>
// 							<motion.div
// 								initial={{ opacity: 0, y: 5 }}
// 								whileHover={{ opacity: 1, y: 0 }}
// 								transition={{ duration: 0.3 }}
// 								className='absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-blue-700 text-xs px-2 py-1 rounded shadow pointer-events-none'
// 							>
// 								{item.title}
// 							</motion.div>
// 						</div>
// 					))}
// 				</div>
// 			</div>

// 			<div className='bg-[#0b295d] text-center text-xs py-2'>
// 				© 2023 "Toshkent metropoliteni" DUK | Barcha Huquqlar Himoyalangan
// 			</div>
// 		</footer>
// 	)
// }

const Footer = () => {
	return (
		<div>
			<SimpleFooter />
		</div>
	)
}

export default Footer
