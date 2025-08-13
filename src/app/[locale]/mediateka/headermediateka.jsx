"use client";

import { useState } from "react";
import {
  Play,
  X,
  Eye,
  Clock,
  ImageIcon,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const photos = [
  {
    id: 1,
    src: "/galery/1.jpg",
    title: "Metropolitenga fotonigoh",
    category: "Metro",
  },
  {
    id: 2,
    src: "/galery/2.jpg",
    title: "Metropolitenga fotonigoh",
    category: "Metro",
  },
  {
    id: 3,
    src: "/galery/3.jpg",
    title: "Metropolitenga fotonigoh",
    category: "Metro",
  },
  {
    id: 4,
    src: "/galery/4.jpg",
    title: "Metropolitenga fotonigoh",
    category: "Metro",
  },
  {
    id: 5,
    src: "/galery/5.jpg",
    title: "Metropolitenga fotonigoh",
    category: "Metro",
  },
  {
    id: 6,
    src: "/galery/6.jpg",
    title: "Metropolitenga fotonigoh",
    category: "Metro",
  },
];

const videos = [
  {
    id: 1,
    url: "https://www.youtube.com/embed/s53QTJC72CE",
    thumbnail: "/galery/5.jpg",
    title: "Sirli eshiklar va yashirin yo'laklar",
    duration: "15:42",
    views: "125K",
    category: "Metropoliteni",
  },
  {
    id: 2,
    url: "https://www.youtube.com/embed/BvjeqzSZ6eU",
    thumbnail: "/galery/6.jpg",
    title: "Metro arxiv 2023",
    duration: "8:30",
    views: "89K",
    category: "Metropoliteni",
  },
  {
    id: 3,
    url: "https://www.youtube.com/embed/FFM30ZXqlug",
    thumbnail: "/galery/4.jpg",
    title: "Metro hayoti",
    duration: "12:15",
    views: "67K",
    category: "Metropoliteni",
  },
  {
    id: 4,
    url: "https://www.youtube.com/embed/QoG87-EXSk4",
    thumbnail: "/galery/1.jpg",
    title: "Metro haqida qiziqarli ma'lumot",
    duration: "6:45",
    views: "156K",
    category: "Metropoliteni",
  },
];

function PhotoCard({ photo, index, onView }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-blue-900/20 backdrop-blur-sm cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onClick={() => onView(photo)}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={photo.src || "/placeholder.svg"}
          alt={photo.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* View icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
          <div className="bg-blue-900/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <Eye className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2">
            {photo.title}
          </h3>
          <p className="text-xs text-blue-200">{photo.category}</p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, index, onPlay }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-blue-900/20 backdrop-blur-sm cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onClick={() => onPlay(video)}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
          <div className="bg-blue-900/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-blue-800/90 transition-colors duration-200">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-blue-900/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>

        {/* Detail button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Link href="/detail">
            <button className="bg-blue-900/90 hover:bg-blue-800/90 backdrop-blur-sm text-white px-3 py-2 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg">
              Ko'rish
            </button>
          </Link>
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">
            {video.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-blue-200">
            <span>{video.category}</span>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Mediateka() {
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTab(tab);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePhotoView = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleVideoPlay = (video) => {
    setSelectedVideo(video);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const nextPhoto = () => {
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const prevPhoto = () => {
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <div>
      <div className="container">
        {/* Header with More Button */}
        {/* Header */}
        <div className="text-start mb-8">
          <h1 className="text-[36px] font-bold text-blue-900 mb-4 animate-in slide-in-from-top duration-1000">
            Mediateka
          </h1>
        </div>

        {/* Modern Compact Tabs with More Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 animate-in zoom-in duration-1000 delay-300">
          {/* Compact Tabs */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-blue-100">
            <div
              className="absolute top-1 bottom-1 bg-blue-900 rounded-lg transition-all duration-300 ease-out shadow-md"
              style={{
                width: "calc(50% - 4px)",
                left: activeTab === "photos" ? "4px" : "calc(50% + 0px)",
              }}
            />

            <div className="relative flex">
              <button
                onClick={() => handleTabChange("photos")}
                className={`flex items-center gap-2 px-4 py-2.5 lg:px-6 lg:py-3 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 min-w-[120px] lg:min-w-[140px] justify-center ${
                  activeTab === "photos"
                    ? "text-white"
                    : "text-blue-900 hover:text-blue-700"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Fotolar</span>
              </button>

              <button
                onClick={() => handleTabChange("videos")}
                className={`flex items-center gap-2 px-4 py-2.5 lg:px-6 lg:py-3 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 min-w-[120px] lg:min-w-[140px] justify-center ${
                  activeTab === "videos"
                    ? "text-white"
                    : "text-blue-900 hover:text-blue-700"
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Videolar</span>
              </button>
            </div>
          </div>

          {/* Optimized More Button */}
          <Link href="/mediateka">
            <button className="group relative bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl font-medium text-sm lg:text-base transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-blue-900 hover:border-blue-700">
              <div className="flex items-center gap-2">
                <span>Batafsil</span>
                <div className="transform group-hover:translate-x-0.5 transition-transform duration-200">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm -z-10"></div>
            </button>
          </Link>
        </div>
        {/* Animated Tabs */}

        {/* Content Area */}
        <div className="relative">
          <div
            className={`transition-all duration-500 ease-out ${
              isAnimating
                ? "opacity-0 transform scale-95"
                : "opacity-100 transform scale-100"
            }`}
          >
            {activeTab === "photos" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 animate-in fade-in slide-in-from-bottom duration-700">
                {photos.map((photo, index) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    onView={handlePhotoView}
                  />
                ))}
              </div>
            )}

            {activeTab === "videos" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 animate-in fade-in slide-in-from-bottom duration-700">
                {videos.map((video, index) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    index={index}
                    onPlay={handleVideoPlay}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Photo Modal */}
        {selectedPhoto && (
          <div
            className="fixed bg-black/80 inset-0 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
            onClick={closePhotoModal}
          >
            <div
              className="relative max-w-4xl max-h-[80vh] animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closePhotoModal}
                className="absolute top-4 right-4 z-10 bg-blue-900/80 hover:bg-blue-800/80 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-blue-900/80 hover:bg-blue-800/80 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-blue-900/80 hover:bg-blue-800/80 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Photo */}
              <img
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-blue-900/95 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
            onClick={closeVideoModal}
          >
            <div
              className="relative w-full max-w-5xl bg-blue-900 rounded-lg overflow-hidden animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 bg-blue-900/80 hover:bg-blue-800/80 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
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
              <div className="p-6 text-white bg-gradient-to-t from-blue-900 to-blue-800">
                <h2 className="text-xl font-semibold mb-3">
                  {selectedVideo.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-blue-200">
                  <span className="font-medium">{selectedVideo.category}</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views} ko'rishlar
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
    </div>
  );
}
