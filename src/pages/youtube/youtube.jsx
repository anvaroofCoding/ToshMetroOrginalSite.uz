'use client'

import { Clock, Eye, Play } from 'lucide-react'
import { useState } from 'react'

const videos = [
	{
		id: 'big',
		url: 'https://www.youtube.com/embed/s53QTJC72CE',
		thumbnail: 'https://img.youtube.com/vi/s53QTJC72CE/maxresdefault.jpg',
		title:
			"Sirli eshiklar va yashirin yo'laklar: Toshkent metrosi xavfsiz boshpana bo'la oladimi?",
		duration: '15:42',
		views: '125K',
		channel: 'Metro Uzbekistan',
	},
	{
		id: 'small1',
		url: 'https://www.youtube.com/embed/BvjeqzSZ6eU',
		thumbnail: 'https://img.youtube.com/vi/BvjeqzSZ6eU/maxresdefault.jpg',
		title: 'Tashkent metro 2023 4K arxiv',
		duration: '8:30',
		views: '89K',
		channel: 'Urban Explorer',
	},
	{
		id: 'small2',
		url: 'https://www.youtube.com/embed/FFM30ZXqlug',
		thumbnail: 'https://img.youtube.com/vi/FFM30ZXqlug/maxresdefault.jpg',
		title: 'Метро Ташкента 2025 – интересное, но сложное для съёмки.',
		duration: '12:15',
		views: '67K',
		channel: 'Metro Stories',
	},
	{
		id: 'small3',
		url: 'https://www.youtube.com/embed/QoG87-EXSk4',
		thumbnail: 'https://img.youtube.com/vi/QoG87-EXSk4/maxresdefault.jpg',
		title: "METRO HAQIDA QIZIQARLI MA'LUMOTLAR",
		duration: '6:45',
		views: '156K',
		channel: 'Facts UZ',
	},
	{
		id: 'small4',
		url: 'https://www.youtube.com/embed/ZiW1HC9NDQE',
		thumbnail: 'https://img.youtube.com/vi/ZiW1HC9NDQE/maxresdefault.jpg',
		title: 'Toshkent yer usti metrosi',
		duration: '9:20',
		views: '92K',
		channel: 'Transport Hub',
	},
]

function VideoCard({ video, isLarge = false, onPlay }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className={`relative group cursor-pointer ${
				isLarge ? 'h-64 sm:h-80 lg:h-full' : 'h-32 sm:h-40 lg:h-48'
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => onPlay(video)}
		>
			{/* Thumbnail */}
			<div className='relative w-full h-full rounded-lg overflow-hidden'>
				<img
					src={video.thumbnail || '/placeholder.svg'}
					alt={video.title}
					className='w-full h-full object-cover'
				/>
				{/* Gradient overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100' />
				{/* Play button */}
				<div
					className={`absolute inset-0 flex items-center justify-center ${
						isHovered ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<div className='bg-red-600 rounded-full p-3 sm:p-4'>
						<Play className='w-4 h-4 sm:w-6 sm:h-6 text-white fill-white ml-1' />
					</div>
				</div>
				{/* Duration badge */}
				<div className='absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1'>
					<Clock className='w-3 h-3' />
					{video.duration}
				</div>
			</div>
			{/* Video info */}
			<div
				className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white ${
					isHovered ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<h3
					className={`font-semibold line-clamp-2 mb-1 ${
						isLarge ? 'text-sm sm:text-base lg:text-lg' : 'text-xs sm:text-sm'
					}`}
				>
					{video.title}
				</h3>
				<div className='flex items-center gap-3 text-xs text-gray-300'>
					<span>{video.channel}</span>
					<div className='flex items-center gap-1'>
						<Eye className='w-3 h-3' />
						{video.views} views
					</div>
				</div>
			</div>
		</div>
	)
}

export default function YoutubeGrid() {
	const [selectedVideo, setSelectedVideo] = useState(null)

	const handlePlay = video => {
		setSelectedVideo(video)
	}

	const closeModal = () => {
		setSelectedVideo(null)
	}

	return (
		<div className='container py-5'>
			{/* Video Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 mb-8'>
				{/* Main large video */}
				<div className='col-span-1 lg:col-span-3'>
					<VideoCard video={videos[0]} isLarge={true} onPlay={handlePlay} />
				</div>
				{/* Smaller videos grid */}
				<div className='grid grid-cols-2 gap-3 sm:gap-4 col-span-1 lg:col-span-2'>
					{videos.slice(1).map(video => (
						<VideoCard key={video.id} video={video} onPlay={handlePlay} />
					))}
				</div>
			</div>

			{/* Video Modal */}
			{selectedVideo && (
				<div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'>
					<div className='relative w-full max-w-4xl bg-black rounded-lg overflow-hidden aspect-video'>
						<button
							onClick={closeModal}
							className='absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors'
						>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
						<iframe
							src={`${selectedVideo.url}?autoplay=1`}
							title={selectedVideo.title}
							className='w-full h-full'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							allowFullScreen
						/>
						<div className='p-4 text-white'>
							<h2 className='text-lg font-semibold mb-2'>
								{selectedVideo.title}
							</h2>
							<div className='flex items-center gap-4 text-sm text-gray-300'>
								<span>{selectedVideo.channel}</span>
								<div className='flex items-center gap-1'>
									<Eye className='w-4 h-4' />
									{selectedVideo.views} views
								</div>
								<div className='flex items-center gap-1'>
									<Clock className='w-4 h-4' />
									{selectedVideo.duration}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
