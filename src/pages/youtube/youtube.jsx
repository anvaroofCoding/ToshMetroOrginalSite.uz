'use client'

const videos = [
	{
		id: 'big',
		url: 'https://www.youtube.com/embed/s53QTJC72CE?si=1zGrpJ5-WH2uJAcJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin',
		title:
			'Sirli eshiklar va yashirin yo‘laklar: Toshkent metrosi xavfsiz boshpana bo‘la oladimi?',
	},
	{
		id: 'small1',
		url: 'https://www.youtube.com/embed/BvjeqzSZ6eU?si=hx1_xwEBRe7sWQsx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin',
		title: 'Tashkent metro 2023 4K arxiv',
	},
	{
		id: 'small2',
		url: 'https://www.youtube.com/embed/FFM30ZXqlug?si=LQbtoIXoujwb1prQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin',
		title: 'Метро Ташкента 2025 – интересное, но сложное для съёмки.',
	},
	{
		id: 'small3',
		url: 'https://www.youtube.com/embed/QoG87-EXSk4?si=OKjA2R1MF1y9XDOr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin',
		title: "METRO HAQIDA QIZIQARLI MA'LUMOTLAR",
	},
	{
		id: 'small4',
		url: 'https://www.youtube.com/embed/ZiW1HC9NDQE?si=XqgxFuYwqmthecCv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin',
		title: 'Toshkent yer usti metrosi',
	},
]

export default function YoutubeGrid() {
	return (
		<div className='container mx-auto py-8'>
			<div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
				{/* LEFT BIG VIDEO */}
				<div className='col-span-1 lg:col-span-3 relative group'>
					<iframe
						src={videos[0].url}
						title={videos[0].title}
						className='w-full h-64 lg:h-full rounded-md shadow'
						allowFullScreen
					></iframe>
					<div className='absolute inset-0 bg-blue-800/0 group-hover:bg-blue-800/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-md'>
						<p className='text-white text-xl font-bold'>{videos[0].title}</p>
					</div>
				</div>

				{/* RIGHT SMALL VIDEOS */}
				<div className='grid grid-cols-2 lg:grid-cols-2 gap-4 col-span-1 lg:col-span-2'>
					{videos.slice(1).map((video, index) => (
						<div key={index} className='relative group'>
							<iframe
								src={video.url}
								title={video.title}
								className='w-full h-32 lg:h-40 rounded-md shadow'
								allowFullScreen
							></iframe>
							<div className='absolute inset-0 bg-blue-800/0 group-hover:bg-blue-800/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-md'>
								<p className='text-white text-sm font-semibold'>
									{video.title}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
