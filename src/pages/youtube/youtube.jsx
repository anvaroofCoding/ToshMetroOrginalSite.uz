"use client"

import { Clock, Eye, Play } from "lucide-react"
import { useState } from "react"

const videos = [
	{
		id: "big",
		url: "https://www.youtube.com/embed/s53QTJC72CE",
		thumbnail: "https://upload.wikimedia.org/wikipedia/uz/a/af/Yunusobod_metro_bekati.jpg",
		title: "Sirli eshiklar va yashirin yo'laklar: Toshkent metrosi xavfsiz boshpana bo'la oladimi?",
		duration: "15:42",
		views: "125K",
		channel: "Metro Uzbekistan",
	},
	{
		id: "small1",
		url: "https://www.youtube.com/embed/BvjeqzSZ6eU",
		thumbnail: "https://transphoto.org/photo/12/77/06/1277068.jpg",
		title: "Tashkent metro 2023 4K arxiv",
		duration: "8:30",
		views: "89K",
		channel: "Urban Explorer",
	},
	{
		id: "small2",
		url: "https://www.youtube.com/embed/FFM30ZXqlug",
		thumbnail: "https://img.youtube.com/vi/FFM30ZXqlug/maxresdefault.jpg",
		title: "Метро Ташкента 2025 – интересное, но сложное для съёмки.",
		duration: "12:15",
		views: "67K",
		channel: "Metro Stories",
	},
	{
		id: "small3",
		url: "https://www.youtube.com/embed/QoG87-EXSk4",
		thumbnail: "https://www.gazeta.uz/media/img/2023/04/eTeCS116824281886238_l.jpg",
		title: "METRO HAQIDA QIZIQARLI MA'LUMOTLAR",
		duration: "6:45",
		views: "156K",
		channel: "Facts UZ",
	},
	{
		id: "small4",
		url: "https://www.youtube.com/embed/ZiW1HC9NDQE",
		thumbnail: "https://www.gazeta.uz/media/img/2020/08/jVN3FF15987919297541_l.jpg",
		title: "Toshkent yer usti metrosi",
		duration: "9:20",
		views: "92K",
		channel: "Transport Hub",
	},
]

function VideoCard({ video, isLarge = false, onPlay }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className="relative group cursor-pointer h-full"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => onPlay(video)}
		>
			{/* Thumbnail */}
			<div className="relative w-full h-full">
				<img
					src={video.thumbnail || "/placeholder.svg?height=400&width=600&query=video thumbnail"}
					alt={video.title}
					className="w-full h-full object-cover"
				/>
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				{/* Play button */}
				<div
					className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
						}`}
				>
					<div className="bg-red-600 hover:bg-red-700 rounded-full p-3 sm:p-4 transition-colors duration-200 hover:scale-110">
						<Play className="w-4 h-4 sm:w-6 sm:h-6 text-white fill-white ml-1" />
					</div>
				</div>
				{/* Duration badge */}
				<div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 flex items-center gap-1">
					<Clock className="w-3 h-3" />
					{video.duration}
				</div>
			</div>
			{/* Video info */}
			<div
				className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
					}`}
			>
				<h3
					className={`font-semibold line-clamp-2 mb-1 ${isLarge ? "text-sm sm:text-base lg:text-lg" : "text-xs sm:text-sm"
						}`}
				>
					{video.title}
				</h3>
				<div className="flex items-center gap-3 text-xs text-gray-300">
					<span>{video.channel}</span>
					<div className="flex items-center gap-1">
						<Eye className="w-3 h-3" />
						{video.views} views
					</div>
				</div>
			</div>
		</div>
	)
}

export default function YoutubeGrid() {
	const [selectedVideo, setSelectedVideo] = useState(null)

	const handlePlay = (video) => {
		setSelectedVideo(video)
	}

	const closeModal = () => {
		setSelectedVideo(null)
	}

	return (
		<div className="container">
			{/* Video Grid - Completely Flat with all 5 videos */}
			<div className="grid grid-cols-4 grid-rows-2 h-full gap-5">
				{/* Main large video - Takes 2 columns and 2 rows */}
				<div className="col-span-2 row-span-2 rounded-xl overflow-hidden">
					<VideoCard video={videos[0]} isLarge={true} onPlay={handlePlay} />
				</div>

				{/* Top right - first small video */}
				<div className="col-span-1 row-span-1  rounded-xl overflow-hidden">
					<VideoCard video={videos[1]} onPlay={handlePlay} />
				</div>

				{/* Top right - second small video */}
				<div className="col-span-1 row-span-1 rounded-xl overflow-hidden">
					<VideoCard video={videos[2]} onPlay={handlePlay} />
				</div>

				{/* Bottom right - third small video */}
				<div className="col-span-1 row-span-1 rounded-xl overflow-hidden">
					<VideoCard video={videos[3]} onPlay={handlePlay} />
				</div>

				{/* Bottom right - fourth small video */}
				<div className="col-span-1 row-span-1 rounded-xl overflow-hidden">
					<VideoCard video={videos[4]} onPlay={handlePlay} />
				</div>
			</div>

			{/* Video Modal */}
			{selectedVideo && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm ">
					<div className="relative w-full max-w-4xl bg-black overflow-hidden aspect-video">
						<button
							onClick={closeModal}
							className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						<iframe
							src={`${selectedVideo.url}?autoplay=1&rel=0`}
							title={selectedVideo.title}
							className="w-full h-full"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
						<div className="p-4 text-white bg-gradient-to-t from-black/90 to-transparent">
							<h2 className="text-lg font-semibold mb-2">{selectedVideo.title}</h2>
							<div className="flex items-center gap-4 text-sm text-gray-300">
								<span>{selectedVideo.channel}</span>
								<div className="flex items-center gap-1">
									<Eye className="w-4 h-4" />
									{selectedVideo.views} views
								</div>
								<div className="flex items-center gap-1">
									<Clock className="w-4 h-4" />
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
