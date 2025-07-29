"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Info, Instagram, Send, Facebook, Youtube } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

const slides = [
  {
    img: "https://www.gazeta.uz/media/img/2020/08/MhKnO615986966870345_l.jpg",
    title: "Toshkent metropoliteni - eski bekat",
  },
  {
    img: "https://mirmetro.net/sites/default/files/4ee05122-1f49-d1e7-4cbc-163a1cea5210%5B1%5D.jpg",
    title: "Yangi qurilayotgan liniya",
  },
  {
    img: "https://www.gazeta.uz/media/img/2023/02/FtLFV716758557867771_l.jpg",
    title: "Metro bekatining ichki ko'rinishi",
  },
  {
    img: "https://www.gazeta.uz/media/img/2023/11/0SCIBB17008179612714_l.jpg",
    title: "Metro sizga tez va qulay xizmat korsatadi",
  },
]

const announcements = [
  {
    id: 1,
    title:
      "\"Toshkent metropoliteni\" DUKda 14-yanvar — Vatan himoyachilari kuniga bag'ishlangan bayram tadbiri bo'lib o'tdi.",
    description:
      "Dastavval so'zga chiqqanlar sana munosabati bilan barchani tabriklab, yanada shijoat bilan kasbiy vazifalarini bajarishda zafarlar tilashdi.",
    time: "14:30",
    status: "Normal",
    line: "Chilonzor",
    img: "https://tashmetro.uz/wp-content/uploads/2025/01/AN0A6642-scaled.jpg",
  },
  {
    id: 2,
    title:
      "«Toshkent metropoliteni» DUK rahbari hamda mas'ul xodimlari Toshkent Davlat Transport universitetiga tashrif buyurdi.",
    description:
      "Uchrashuvni tashkil etishdan asosiy ko'zlangan maqsad, metropolitenda xodimlar uchun yaratilgan qulayliklar bilan tanishtirish barobarida oliygoh bitiruvchilarini ishga taklif etishdan iboratdir.",
    time: "10:15",
    status: "Yangilik",
    line: "Yunusobod",
    img: "https://tashmetro.uz/wp-content/uploads/2025/02/AN0A0565-copy-scaled.jpg",
  },
  {
    id: 3,
    title:
      'Transport vazirligi mutasaddilari hamda "Toshkent metropoliteni" DUK bosh muhandisi boshchiligidagi bir guruh metropoliten mas\'ul xodimlari Janubiy Koreya davlatiga tashrif buyurdi',
    description:
      'Tashrif davomida "Toshkent metropoliteni" DUK hamda Hyundai Movex kompaniyasi o\'rtasida hamkorlik memorandumi imzolandi.',
    time: "16:45",
    status: "Yangilanish",
    line: "O'zbekiston",
    img: "https://tashmetro.uz/wp-content/uploads/2025/03/photo_2025-03-12_12-28-00.jpg",
  },
  {
    id: 4,
    title:
      "Toshpo'latov Feruz G'olib o'g'li \"Toshkent metropoliteni\" DUK \"Axborot xavfsizligini ta'minlash va texnik xizmat ko'rsatish\" xizmati boshlig'i vazifasini bajaruvchi lavozimiga tayinlandi.",
    description:
      "Feruz Toshpo'latov 1996-yilda tug'ilgan. Ma'lumoti – oliy. 2021-yilda Toshkent davlat transport universiteti bakalavr bosqichini tamomlagan.",
    time: "09:20",
    status: "Yangilik",
    line: "Sergeli",
    img: "https://tashmetro.uz/wp-content/uploads/2024/08/photo_2024-08-02_15-53-49.jpg",
  },
  {
    id: 5,
    title:
      "Ergashev Dostonjon Qobiljonovich \"Toshkent metropoliteni\" DUK boshlig'i o'rinbosari — Harakat xavfsizligi bo'yicha bosh taftishchi lavozimiga tayinlandi.",
    description:
      "Ma'lumoti – oliy. 2014-yilda Toshkent temir yo'l muhandislik instituti bakalavr bosqichini, 2016-yilda magistr bosqichini tamomlagan.",
    time: "11:30",
    status: "Yangilik",
    line: "Barcha",
    img: "https://tashmetro.uz/wp-content/uploads/2024/07/photo_2024-07-24_16-24-17-1-1.jpg",
  },
  {
    id: 6,
    title:
      '"Toshkent metropoliteni" DUK da "Korrupsiyaga qarshi kurashish – davr talabi" mavzusida davra suhbati bo\'lib o\'tdi.',
    description:
      "Suhbat davomida ishtirokchilar korrupsiyaning turli shakllari, kelib chiqishi sabablari haqida keng ma'noda fikr yuritdilar.",
    time: "13:15",
    status: "Xavfsizlik",
    line: "Barcha",
    img: "https://tashmetro.uz/wp-content/uploads/2024/04/korupsiya-tadbiri.jpg",
  },
]

const socialLinks = [
  { href: "https://t.me/Toshkent_metropoliteni_rasmiy", icon: Send, title: "Telegram" },
  {
    href: "https://www.instagram.com/toshkentmetropoliteni?utm_source=ig_web_button_share_sheet&igsh=MWs4N3dseDY0bnBs",
    icon: Instagram,
    title: "Instagram",
  },
  {
    href: "https://youtube.com/@toshkentmetropoliteniduk?feature=shared",
    icon: Youtube,
    title: "YouTube",
  },
  {
    href: "https://www.facebook.com/people/Toshkent-metropoliteni/100077452683509/?ti=as#",
    icon: Facebook,
    title: "Facebook",
  },
]

export default function MetroCarouselWithNews() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = useCallback(
    (index) => {
      setDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
    },
    [currentSlide],
  )

  // Auto-play functionality with pause on hover
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide, isAutoPlaying])

  const slideVariants = {
    enter: (direction) => ({
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 xl:grid-cols-2  gap-6 lg:gap-8">
        {/* Carousel Section */}
        <div
          className="relative  aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-900 to-blue-800"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].img || "/placeholder.svg?height=400&width=600" || "/placeholder.svg"}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
            <motion.h2
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
            >
              {slides[currentSlide].title}
            </motion.h2>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
            aria-label="Oldingi slayd"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
            aria-label="Keyingi slayd"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 right-4 sm:right-6 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 touch-manipulation ${
                  currentSlide === index ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`${index + 1}-slaydga o'tdish`}
              />
            ))}
          </div>

          {/* Social Links */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1 bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon
              return (
                <div key={index} className="relative group">
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300 transition-all duration-200 block hover:scale-110 p-1 sm:p-1.5 touch-manipulation"
                    aria-label={social.title}
                  >
                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                  <div className="absolute top-7 sm:top-8 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-10">
                    {social.title}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-0 h-0 border-l-2 border-r-2 border-b-2 border-l-transparent border-r-transparent border-b-blue-900" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <motion.div
              className="h-full bg-white/80"
              initial={{ width: "0%" }}
              animate={{ width: isAutoPlaying ? "100%" : "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              key={`${currentSlide}-${isAutoPlaying}`}
            />
          </div>
        </div>

        {/* Metro Announcements Section */}
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-2xl border border-slate-200 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-5 justify-between p-3 sm:p-4 lg:p-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg sm:rounded-xl hidden md:flex items-center justify-center shadow-lg">
                <Info className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800">
                  Saytga joylashtirilgan so'ngi yangiliklar
                </h3>
                <p className="text-xs text-slate-500 hidden sm:block">Joriy holat va e'lonlar</p>
              </div>
            </div>
            <Link href="/yangiliklar" className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 bg-transparent font-medium text-xs touch-manipulation px-2 sm:px-3"
              >
                <span className="hidden sm:inline">Barchasi</span>
                <span className="sm:hidden">Ko'rish</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Scrolling Container */}
          <div className="flex-1 relative overflow-hidden">
            <motion.div
              className="space-y-2 sm:space-y-3 p-3 sm:p-4 lg:p-6"
              animate={{
                y: [0, -announcements.length * 120],
              }}
              transition={{
                duration: announcements.length * 5,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              {[...announcements, ...announcements].map((announcement, index) => (
                <Card
                  key={`${announcement.id}-${Math.floor(index / announcements.length)}`}
                  className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <CardContent className="p-2 sm:p-3 lg:p-4 flex gap-2 sm:gap-3 items-start">
                    <img
                      src={announcement.img}
                      alt={announcement.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover rounded-md sm:rounded-lg flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 flex-wrap">
                        <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold rounded-full border bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap">
                          {announcement.status}
                        </span>
                        {announcement.line !== "Barcha" && (
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500" />
                            <span className="text-xs text-slate-600 font-medium">{announcement.line}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
                          <Clock className="w-3 h-3" />
                          {announcement.time}
                        </div>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                        {announcement.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{announcement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 lg:h-16 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
