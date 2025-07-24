'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const FaqAccordion = () => {
	const [openIndex, setOpenIndex] = useState(null)

	const toggle = index => {
		setOpenIndex(prev => (prev === index ? null : index))
	}

	const items = [
		{
			q: 'ATTO kartasini qaerdan sotib olish mumkin va karta balansini qanday to‘ldirish mumkin?',
			a: `"ATTO" transport kartasining balansini ATTO, MyUzcard , Payme, Upay, Apelsin va boshqa elektron to‘lov tizimlarining mobil ilovalari orqali to‘ldirish mumkin.
O‘z-o‘ziga xizmat ko‘rsatish terminallarida-infokiosklar.
"Toshyulovchitrans" DUK va "Toshkent metropoliteni" DUK kompaniyasining barcha savdo nuqtalarida.`,
		},
		{
			q: `Karta ishi bo'yicha qayerga murojaat qilishim mumkin?`,
			a: `+998 78 140 08 08 raqamiga qo'ng'roq qilish yoki elektron pochta orqali info@atto.uz`,
		},
		{
			q: "Bazi bekatlarda kassa operator joylari yopilgan to'lovni qayerda qilsam bo'ladi?",
			a: 'Yopilgan bekatlarda to‘lovni ATTO, MyUzcard, Payme, Upay, Apelsin va boshqa elektron to‘lov tizimlarining mobil ilovalari orqali amalga oshirish mumkin. Yoki paynet terminali orqali to‘lovni amalga oshirish mumkin.',
		},
	]

	return (
		<div className='container '>
			<h2 className='text-start text-[36px] font-bold text-blue-900 mb-6'>
				Ko‘p beriladigan <span className='text-blue-900'>savollar</span>
			</h2>

			{items.map((item, index) => (
				<div
					key={index}
					className={`rounded-lg  transition-colors mt-4 duration-300 bg-transparent shadow ${
						openIndex === index
							? 'border-blue-700 bg-blue-50'
							: 'border-gray-300 bg-transparent'
					}`}
				>
					<button
						onClick={() => toggle(index)}
						className='w-full flex justify-between items-center p-4 text-left font-semibold text-blue-900 hover:bg-blue-200 rounded-lg transition bg-transparent'
					>
						<span>{item.q}</span>
						<motion.span
							initial={false}
							animate={{ rotate: openIndex === index ? 180 : 0 }}
							transition={{ duration: 0.3 }}
						>
							<ChevronDown className='w-5 h-5' />
						</motion.span>
					</button>

					<AnimatePresence initial={false}>
						{openIndex === index && (
							<motion.div
								key={`content-${index}`}
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.4, ease: 'easeOut' }}
							>
								<div className='px-4 pb-4 text-gray-700'>{item.a}</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			))}
		</div>
	)
}

export default FaqAccordion
