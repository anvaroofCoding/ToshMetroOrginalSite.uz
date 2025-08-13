'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import {
	AlertCircle,
	Clock,
	CreditCard,
	MapPin,
	Smartphone,
	Users,
	X,
} from 'lucide-react'

const mainColor = '#0E327F'

export default function DetailedInfoModal({ isOpen, onClose, type }) {
	const getContent = () => {
		switch (type) {
			case 'where-to-buy':
				return {
					title: 'ATTO kartasini qayerdan sotib olish mumkin?',
					icon: <MapPin className='w-6 h-6' />,
					content: (
						<div className='space-y-6'>
							<div className='bg-blue-50 p-4 rounded-lg'>
								<h4 className='font-semibold mb-2 flex items-center gap-2'>
									<MapPin className='w-5 h-5 text-blue-600' />
									Sotish nuqtalari
								</h4>
								<ul className='space-y-2 text-sm'>
									<li>
										• "Toshshahartransxizmat" AJ barcha chipta sotish nuqtalari
									</li>
									<li>• "Toshkent metropoliteni" DUK barcha kassalari</li>
									<li>
										• Metro bekatlarining yer osti va yer usti kassalari
									</li>
								</ul>
							</div>
							<div className='bg-green-50 p-4 rounded-lg'>
								<h4 className='font-semibold mb-2 text-green-800'>Ish vaqti</h4>
								<p className='text-sm text-green-700'>
									Kassalar odatda 6:00 dan 24:00 gacha ishlaydi. Aniq ish
									vaqtini oldindan aniqlash tavsiya etiladi.
								</p>
							</div>
						</div>
					),
				}

			case 'how-to-topup':
				return {
					title: "Balansni qanday to'ldirish mumkin?",
					icon: <CreditCard className='w-6 h-6' />,
					content: (
						<div className='space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-blue-50 p-4 rounded-lg'>
									<h4 className='font-semibold mb-2 flex items-center gap-2'>
										<Smartphone className='w-5 h-5 text-blue-600' />
										Mobil ilovalar
									</h4>
									<ul className='space-y-1 text-sm'>
										<li>• ATTO</li>
										<li>• MyUzcard</li>
										<li>• Payme</li>
										<li>• Upay</li>
										<li>• Apelsin</li>
									</ul>
								</div>
								<div className='bg-green-50 p-4 rounded-lg'>
									<h4 className='font-semibold mb-2 flex items-center gap-2'>
										<MapPin className='w-5 h-5 text-green-600' />
										Jismoniy nuqtalar
									</h4>
									<ul className='space-y-1 text-sm'>
										<li>• Bank infokiosklari</li>
										<li>• Metro kassalari</li>
										<li>• Transport kassalari</li>
									</ul>
								</div>
							</div>
						</div>
					),
				}

			case 'how-to-pay':
				return {
					title: "Yo'l haqini qanday to'lash kerak?",
					icon: <Smartphone className='w-6 h-6' />,
					content: (
						<div className='space-y-6'>
							<div className='bg-blue-50 p-4 rounded-lg'>
								<h4 className='font-semibold mb-3 flex items-center gap-2'>
									<div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
										<span className='text-white text-sm font-bold'>🚌</span>
									</div>
									Avtobusda to'lov
								</h4>
								<ul className='space-y-2 text-sm'>
									<li>
										• Kartani tutqichdagi statsionar validatorga yaqinlashtiring
									</li>
									<li>• Yoki konduktordagi mobil validatorga tekkizing</li>
									<li>• Yashil chiroq yonishini kuting</li>
									<li>⚠️ Kartani konduktorga bermaslik tavsiya etiladi</li>
								</ul>
							</div>
							<div className='bg-green-50 p-4 rounded-lg'>
								<h4 className='font-semibold mb-3 flex items-center gap-2'>
									<div className='w-8 h-8 bg-green-600 rounded-full flex items-center justify-center'>
										<span className='text-white text-sm font-bold'>🚇</span>
									</div>
									Metroda to'lov
								</h4>
								<ul className='space-y-2 text-sm'>
									<li>• Turniketdagi validatorga kartani yaqinlashtiring</li>
									<li>• Yashil belgi - to'lov muvaffaqiyatli</li>
									<li>• Qizil xoch - to'lov amalga oshmadi</li>
									<li>• Sariq chiroq - 6 daqiqadan kam vaqt o'tgan</li>
								</ul>
							</div>
						</div>
					),
				}

			case 'balance-check':
				return {
					title: 'Qoldiqni qanday tekshirish mumkin?',
					icon: <Clock className='w-6 h-6' />,
					content: (
						<div className='space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div className='bg-blue-50 p-4 rounded-lg text-center'>
									<Smartphone className='w-8 h-8 text-blue-600 mx-auto mb-2' />
									<h4 className='font-semibold mb-2'>Mobil ilovalar</h4>
									<p className='text-xs'>ATTO, MyUzcard, Payme va boshqalar</p>
								</div>
								<div className='bg-green-50 p-4 rounded-lg text-center'>
									<MapPin className='w-8 h-8 text-green-600 mx-auto mb-2' />
									<h4 className='font-semibold mb-2'>Infokiosklar</h4>
									<p className='text-xs'>Bank terminallarida</p>
								</div>
								<div className='bg-yellow-50 p-4 rounded-lg text-center'>
									<CreditCard className='w-8 h-8 text-yellow-600 mx-auto mb-2' />
									<h4 className='font-semibold mb-2'>Kassalarda</h4>
									<p className='text-xs'>Metro va transport kassalarida</p>
								</div>
							</div>
						</div>
					),
				}

			case 'low-balance':
				return {
					title: "Balans kam bo'lsa nima bo'ladi?",
					icon: <AlertCircle className='w-6 h-6' />,
					content: (
						<div className='space-y-6'>
							<div className='bg-red-50 border border-red-200 p-4 rounded-lg'>
								<h4 className='font-semibold mb-2 text-red-800 flex items-center gap-2'>
									<AlertCircle className='w-5 h-5' />
									1700 so'mdan kam balans
								</h4>
								<p className='text-sm text-red-700 mb-3'>
									Agar balans 1700 so'mdan kam bo'lsa, karta avtomatik ravishda
									vaqtincha bloklanadi.
								</p>
								<div className='bg-white p-3 rounded border'>
									<h5 className='font-medium mb-2'>Blokni ochish:</h5>
									<ul className='text-sm space-y-1'>
										<li>• Balansni to'ldiring</li>
										<li>• 10 daqiqa kuting</li>
										<li>• Karta avtomatik ochiladi</li>
									</ul>
								</div>
							</div>
							<div className='bg-green-50 p-4 rounded-lg'>
								<h4 className='font-semibold mb-2 text-green-800'>Tavsiya</h4>
								<p className='text-sm text-green-700'>
									Muammosiz foydalanish uchun balansda doimo 1700 so'mdan ortiq
									mablag' saqlang.
								</p>
							</div>
						</div>
					),
				}

			case 'sharing-rules':
				return {
					title: 'Kartani boshqalarga berish mumkinmi?',
					icon: <Users className='w-6 h-6' />,
					content: (
						<div className='space-y-6'>
							<div className='bg-red-50 border border-red-200 p-4 rounded-lg'>
								<h4 className='font-semibold mb-2 text-red-800 flex items-center gap-2'>
									<X className='w-5 h-5' />
									Taqiqlanadi!
								</h4>
								<p className='text-sm text-red-700 mb-3'>
									ATTO transport kartasidan faqat bitta yo'lovchi foydalanishi
									mumkin.
								</p>
								<div className='bg-white p-3 rounded border'>
									<h5 className='font-medium mb-2'>Sabablari:</h5>
									<ul className='text-sm space-y-1'>
										<li>• Yo'lovchilar statistikasini to'g'ri yuritish</li>
										<li>• Jamoat transportini optimallashtirish</li>
										<li>• Tizim xavfsizligi</li>
									</ul>
								</div>
							</div>
							<div className='bg-blue-50 p-4 rounded-lg'>
								<h4 className='font-semibold mb-2 text-blue-800'>
									6 daqiqalik limit
								</h4>
								<p className='text-sm text-blue-700'>
									Qayta-qayta to'lovni oldini olish uchun har bir to'lovdan
									keyin 6 daqiqa kutish kerak.
								</p>
							</div>
						</div>
					),
				}

			default:
				return {
					title: "Ma'lumot",
					icon: <CreditCard className='w-6 h-6' />,
					content: <div>Ma'lumot topilmadi</div>,
				}
		}
	}

	const content = getContent()

	return (
		<AnimatePresence>
			{isOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='absolute inset-0 bg-black/50 backdrop-blur-sm'
						onClick={onClose}
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className='relative w-full max-w-2xl max-h-[80vh] overflow-y-auto'
					>
						<Card className='border-0 shadow-2xl'>
							<CardHeader
								className='pb-4'
								style={{ backgroundColor: mainColor }}
							>
								<div className='flex items-center justify-between text-white'>
									<div className='flex items-center gap-3'>
										{content.icon}
										<CardTitle className='text-lg'>{content.title}</CardTitle>
									</div>
									<Button
										variant='ghost'
										size='sm'
										onClick={onClose}
										className='text-white hover:bg-white/20'
									>
										<X className='w-5 h-5' />
									</Button>
								</div>
							</CardHeader>
							<CardContent className='p-6'>{content.content}</CardContent>
						</Card>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}
