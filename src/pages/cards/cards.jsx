'use client'

import Button from '@/work/buttons/ndsButoon'
import { Eye, MoveRight, X } from 'lucide-react'
import { useState } from 'react'

const news = [
	{
		img: 'https://tashmetro.uz/wp-content/uploads/2025/04/photo_2025-04-08_17-00-44.jpg',
		title: "Metro polinetini bosh offisida yangiliklar o'tkazildi...",
		date: '21.06.2025',
	},
	{
		img: 'https://tashmetro.uz/wp-content/uploads/2025/03/photo_2025-03-12_12-28-00.jpg',
		title: 'Yangi bekat ochilish marosimi bo‘lib o‘tdi...',
		date: '20.06.2025',
	},
	{
		img: 'https://tashmetro.uz/wp-content/uploads/2025/02/AN0A0565-copy-scaled.jpg',
		title: 'Metro xodimlari uchun trening tashkil qilindi...',
		date: '19.06.2025',
	},
	{
		img: 'https://tashmetro.uz/wp-content/uploads/2025/02/photo_2025-02-18_15-49-13.jpg',
		title: 'Metro xavfsizlik tizimi kuchaytirildi...',
		date: '18.06.2025',
	},
	{
		img: 'https://tashmetro.uz/wp-content/uploads/2025/02/photo_2025-02-05_16-55-51.jpg',
		title: 'Yangi yo‘nalish loyihasi muhokama qilindi...',
		date: '17.06.2025',
	},
	{
		img: 'https://tashmetro.uz/wp-content/uploads/2025/01/AN0A6642-scaled.jpg',
		title: 'Metro chipta tizimida yangiliklar joriy etildi...',
		date: '16.06.2025',
	},
]

const Cards = () => {
	const [openImg, setOpenImg] = useState()

	return (
		<div>
			<div className='container py-8 flex justify-between items-center'>
				<h1 className='text-[36px] font-bold'>
					So'ngi <span className='text-blue-800'>yangiliklar</span>
				</h1>
				<Button />
			</div>
			<div className='container grid lg:grid-cols-5 grid-cols-1 gap-5  '>
				<div className='lg:col-span-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
					{news.map((item, idx) => (
						<div
							key={idx}
							className='relative  rounded-sm overflow-hidden group shadow hover:shadow-lg transition'
						>
							<div
								className='h-48 relative cursor-pointer'
								onClick={() => setOpenImg(item.img)}
							>
								<img
									src={item.img}
									alt={item.title}
									className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-300'
									loading='lazy'
								/>
								<div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300'></div>
								<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
									<Eye className='text-white w-8 h-8' />
								</div>
							</div>
							<div className='bg-white p-3 flex flex-col gap-3 h-[50%]'>
								<h2 className='font-bold text-sm 2xl:text-xl line-clamp-2'>
									{item.title}
								</h2>
								<div className='flex justify-between items-center'>
									<p className='text-xs xl:text-lg text-gray-500'>
										{item.date}
									</p>
									<MoveRight className='transition-transform duration-300 group-hover:translate-x-1' />
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='col-span-2 grid md:grid-cols-2 lg:grid-cols-1 gap-6'>
					{news.slice(0, 5).map((item, index) => (
						<div
							key={index}
							className='h-[100%] relative w-full flex flex-start justify-start rounded-[5px] overflow-hidden bg-gray-100 group'
						>
							<div className='h-[140px] sm:h-[120px] md:h-[160px] lg:h-[110px] w-[50%]  sm:w-[30%] md:w-[60%] lg:w-[40%] 2xl:w-[30%]  overflow-hidden'>
								<img
									src={item.img}
									alt={item.title}
									className='h-full w-full object-cover rounded-[5px]'
								/>
								<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300'></div>
							</div>
							<div className='w-[60%] p-2 flex flex-col gap-2 2xl:gap-2 justify-start'>
								<h2 className='font-bold text-sm sm:text-lg md:text-sm 2xl:text-xl'>
									{item.title}
								</h2>
								<p className='text-[12px] text-md 2xl:text-lg text-gray-500'>
									{item.date}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Modal */}
			{openImg && (
				<div
					className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'
					onClick={() => setOpenImg(null)}
				>
					<div
						className='relative max-w-3xl w-full'
						onClick={e => e.stopPropagation()}
					>
						<img
							src={openImg}
							alt='Full view'
							className='w-full rounded shadow-lg'
						/>
						<button
							onClick={() => setOpenImg(null)}
							className='absolute top-2 right-2 bg-white p-1 rounded-full'
							aria-label='Yopish'
						>
							<X className='w-5 h-5 text-black' />
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Cards
