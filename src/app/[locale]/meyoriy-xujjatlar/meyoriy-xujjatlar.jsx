'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const documents = [
	{
		title: "O'zbekiston Respublikasi Konstitutsiyasi",
		url: 'https://lex.uz/docs/-6445145',
		year: '1992',
	},
	{
		title: 'O\'zbekiston Respublikasining "Oila kodeksi"',
		url: 'https://lex.uz/docs/-104720',
		year: '1998',
	},
	{
		title: "O'zbekiston Respublikasining Mehnat Kodeksi",
		url: 'https://lex.uz/ru/docs/-6257288',
		year: '2003',
	},
	{
		title:
			"O'zbekiston Respublikasining \"Xotin-qizlarni tazyiq va zo'ravonlikdan himoya qilish to'g'risida\" Qonuni",
		url: 'https://lex.uz/acts/-4494709',
		year: '2019',
	},
	{
		title:
			"O'zbekiston Respublikasining \"Xotin-qizlar va erkaklar uchun teng huquq hamda imkoniyatlar kafolatlari to'g'risida\" Qonuni",
		url: 'https://lex.uz/docs/-4494849',
		year: '2019',
	},
	{
		title:
			"O'zbekiston Respublikasining \"Og'ir ijtimoiy ahvolda qolgan xotin-qizlar huquqlari kafolatlarini ta'minlash bo'yicha qo'shimcha chora-tadbirlar qabul qilinganligi munosabati bilan o'zbekiston respublikasining ayrim qonun hujjatlariga qo'shimcha va o'zgartishlar kiritish to'g'risida\" Qonuni",
		url: 'https://lex.uz/ru/docs/-5766205',
		year: '2020',
	},
	{
		title:
			"O'zbekiston Respublikasining \"Xotin-qizlar va bolalar huquqlari, erkinliklari hamda qonuniy manfaatlarini ishonchli himoya qilish tizimi yanada takomillashtirilishi munosabati bilan O'zbekiston Respublikasining ayrim qonun hujjatlariga o'zgartish va qo'shimchalar kiritish to'g'risida\" Qonuni",
		url: 'https://lex.uz/uz/docs/-6430272',
		year: '2021',
	},
	{
		title:
			'O\'zbekiston Respublikasi Oliy Majlisi Senatining "2030-yilga qadar o\'zbekiston respublikasida gender tenglikka erishish strategiyasini tasdiqlash haqida" qarori',
		url: 'https://lex.uz/docs/-5466673',
		year: '2022',
	},
	{
		title:
			"O'zbekiston Respublikasi Oliy Majlisi Senati kengashining \"Xotin-qizlarning jamiyatdagi rolini oshirish, gender tenglik va oila masalalari bo'yicha respublika komissiyasini tashkil etish to'g'risida\" qarori",
		url: 'https://lex.uz/en/docs/-5949556',
		year: '2023',
	},
]

export default function Meyoriy() {
	const [visibleItems, setVisibleItems] = useState([])

	useEffect(() => {
		const timer = setInterval(() => {
			setVisibleItems(prev => {
				if (prev.length < documents.length) {
					return [...prev, prev.length]
				}
				clearInterval(timer)
				return prev
			})
		}, 300)

		return () => clearInterval(timer)
	}, [])

	return (
		<div className='bg-transparent min-h-screen py-12'>
			<div className='container mx-auto px-4 max-w-4xl'>
				{/* Header */}
				<div className='text-center mb-16'>
					<div className='inline-flex items-center justify-center w-20 h-20 bg-blue-900 rounded-full mb-6'>
						<Image
							src='https://urdu.uz/user_files/user_4/RTTM%20bazasi/ramzlar/gerb.jpg'
							alt="O'zbekiston gerbi"
							width={48}
							height={48}
							className='rounded-full'
						/>
					</div>
					<h1 className='text-4xl font-bold text-blue-900 mb-4'>
						Me'yoriy hujjatlar
					</h1>
					<div className='w-24 h-1 bg-blue-600 mx-auto'></div>
				</div>

				{/* Timeline */}
				<div className='relative'>
					{/* Timeline line */}
					<div className='absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full'></div>

					{documents.map((doc, index) => (
						<div
							key={index}
							className={`relative flex items-center mb-12 transition-all duration-700 ${
								visibleItems.includes(index)
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-8'
							}`}
						>
							{/* Timeline dot with emblem */}
							<div className='absolute left-1/2 transform -translate-x-1/2 z-10'>
								<div className='w-16 h-16 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-lg'>
									<Image
										src='https://urdu.uz/user_files/user_4/RTTM%20bazasi/ramzlar/gerb.jpg'
										alt="O'zbekiston gerbi"
										width={32}
										height={32}
										className='rounded-full'
									/>
								</div>
							</div>

							{/* Content */}
							<div
								className={`w-5/12 ${
									index % 2 === 0 ? 'pr-8 text-right' : 'ml-auto pl-8'
								}`}
							>
								<div className='bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition-shadow duration-300'>
									{/* Year badge */}
									<div className='inline-block bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3'>
										{doc.year}
									</div>

									{/* Document title */}
									<h3 className='text-lg font-semibold text-gray-800 mb-4 leading-tight'>
										{doc.title}
									</h3>

									{/* Read link */}
									<Link
										href={doc.url}
										target='_blank'
										rel='noopener noreferrer'
										className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium text-sm'
									>
										<svg
											className='w-4 h-4 mr-2'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
											/>
										</svg>
										Onlayn o'qish
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Footer */}
				<div className='text-center mt-16 pt-8 border-t border-blue-200'>
					<div className='flex items-center justify-center space-x-2 text-blue-700'>
						<Image
							src='https://urdu.uz/user_files/user_4/RTTM%20bazasi/ramzlar/gerb.jpg'
							alt="O'zbekiston gerbi"
							width={24}
							height={24}
							className='rounded-full'
						/>
						<span className='font-semibold'>O'zbekiston Respublikasi</span>
					</div>
				</div>
			</div>
		</div>
	)
}
