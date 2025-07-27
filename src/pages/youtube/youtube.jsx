"use client"

import { Clock, Eye, Play, X } from "lucide-react"
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
      className="relative group cursor-pointer w-full h-full overflow-hidden rounded-xl bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(video)}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-full">
        <img
          src={video.thumbnail || "/placeholder.svg?height=400&width=600&query=video thumbnail"}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Play button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="bg-red-600 hover:bg-red-700 rounded-full p-3 lg:p-4 transition-all duration-200 hover:scale-110 shadow-lg">
            <Play className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>
      </div>

      {/* Video info overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 lg:p-4 text-white transition-all duration-300 ease-out ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <h3
          className={`font-semibold line-clamp-2 mb-2 leading-tight ${
            isLarge ? "text-sm lg:text-base xl:text-lg" : "text-xs lg:text-sm"
          }`}
        >
          {video.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-300">
          <span className="truncate">{video.channel}</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Eye className="w-3 h-3" />
            {video.views}
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
      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-4">
        {/* Main video */}
        <div className="aspect-video">
          <VideoCard video={videos[0]} isLarge={true} onPlay={handlePlay} />
        </div>

        {/* Small videos in 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 aspect-[2/1]">
          {videos.slice(1).map((video) => (
            <div key={video.id} className="aspect-video">
              <VideoCard video={video} onPlay={handlePlay} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          {/* Main large video - 2x2 */}
          <div className="col-span-2 row-span-2">
            <VideoCard video={videos[0]} isLarge={true} onPlay={handlePlay} />
          </div>

          {/* Small videos - 1x1 each */}
          <div className="col-span-1 row-span-1">
            <VideoCard video={videos[1]} onPlay={handlePlay} />
          </div>

          <div className="col-span-1 row-span-1">
            <VideoCard video={videos[2]} onPlay={handlePlay} />
          </div>

          <div className="col-span-1 row-span-1">
            <VideoCard video={videos[3]} onPlay={handlePlay} />
          </div>

          <div className="col-span-1 row-span-1">
            <VideoCard video={videos[4]} onPlay={handlePlay} />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video iframe */}
            <div className="aspect-video">
              <iframe
                src={`${selectedVideo.url}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video info */}
            <div className="p-4 lg:p-6 text-white bg-gradient-to-t from-black/95 to-black/80">
              <h2 className="text-lg lg:text-xl font-semibold mb-3 line-clamp-2">{selectedVideo.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="font-medium">{selectedVideo.channel}</span>
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
