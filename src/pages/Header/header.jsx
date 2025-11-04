"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  Instagram,
  Send,
  Facebook,
  Youtube,
  Train,
  Newspaper,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState, memo } from "react";

const LoadingSpinner = memo(({ size = "default", text = "" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    default: "w-8 h-8",
    large: "w-12 h-12",
    xl: "w-16 h-16",
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`${sizeClasses[size]} border-4 border-blue-200 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className={`absolute inset-2 border-4 border-transparent border-t-blue-600 rounded-full`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Train className="w-4 h-4 text-blue-600" />
        </motion.div>
      </motion.div>

      {text && (
        <motion.p
          className="text-white text-lg font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
});
LoadingSpinner.displayName = "LoadingSpinner";

const NewsLoadingSpinner = memo(() => (
  <div className="flex flex-col items-center justify-center gap-4">
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Newspaper className="w-8 h-8 text-blue-600" />
      </motion.div>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "0 0",
          }}
          animate={{
            rotate: 360,
            x: [0, 30, 0, -30, 0],
            y: [0, -30, 0, 30, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: i * 0.6,
          }}
        />
      ))}
    </motion.div>

    <motion.p
      className="text-slate-600 text-base font-medium"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Yangiliklar yuklanmoqda...
    </motion.p>
  </div>
));
NewsLoadingSpinner.displayName = "NewsLoadingSpinner";

const NewsCard = memo(({ announcement, onRelativeTime, titlek, locale }) => (
  <Link href={`yangiliklar/${announcement.id}`}>
    <Card className="w-full mt-5 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur-sm hover:bg-white">
      <CardContent className="p-2 sm:p-3 lg:p-4 flex gap-2 sm:gap-3 items-start">
        <img
          src={
            `https://abbos.uzmetro.uz${announcement.image}` ||
            "/placeholder.svg"
          }
          alt={announcement.title_uz}
          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover rounded-md sm:rounded-lg flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-xs text-slate-500 ml-auto mb-1 sm:mb-2">
            <Clock className="w-3 h-3" />
            {onRelativeTime(announcement.publishedAt)}
          </div>
          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors mb-1 line-clamp-2">
            {titlek}...
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {locale === "uz"
              ? announcement.description_uz
              : locale === "ru"
              ? announcement.description_ru
              : announcement.description_en}
          </p>
        </div>
      </CardContent>
    </Card>
  </Link>
));
NewsCard.displayName = "NewsCard";

const SocialLinks = memo(({ links }) => (
  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1 bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full">
    {links.map((social, index) => {
      const IconComponent = social.icon;
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
      );
    })}
  </div>
));
SocialLinks.displayName = "SocialLinks";

const NewsSection = memo(
  ({ announcements, getRelativeTime, t, title, locale }) => (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-2xl border border-slate-200 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] flex flex-col overflow-hidden h-[500px] w-full lg:h-auto">
      {/* Header */}
      <div className="flex items-center gap-5 justify-between p-3 sm:p-4 lg:p-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg sm:rounded-xl hidden md:flex items-center justify-center shadow-lg">
            <Info className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800">
              {t("latestNews")}
            </h3>
            <p className="text-xs text-slate-500 hidden sm:block">
              {t("currentStatus")}
            </p>
          </div>
        </div>
        <Link href="/yangiliklar" className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 bg-transparent font-medium text-xs touch-manipulation px-2 sm:px-3"
          >
            <span className="hidden sm:inline">{t("all")}</span>
            <span className="sm:hidden">{t("view")}</span>
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
            <NewsCard
              key={`${announcement.id}-${Math.floor(
                index / announcements.length
              )}`}
              announcement={announcement}
              onRelativeTime={getRelativeTime}
              titlek={title}
              locale={locale}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 lg:h-16 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
    </div>
  )
);
NewsSection.displayName = "NewsSection";

export default function MetroCarouselWithNews() {
  const t = useTranslations("menu");
  const { locale } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const socialLinks = [
    {
      href: "https://t.me/Toshkent_metropoliteni_rasmiy",
      icon: Send,
      title: t("Telegram"),
    },
    {
      href: "https://www.instagram.com/toshkentmetropoliteni?utm_source=ig_web_button_share_sheet&igsh=MWs4N3dseDY0bnBs",
      icon: Instagram,
      title: t("Instagram"),
    },
    {
      href: "https://youtube.com/@toshkentmetropoliteniduk?feature=shared",
      icon: Youtube,
      title: t("YouTube"),
    },
    {
      href: "https://www.facebook.com/people/Toshkent-metropoliteni/100077452683509/?ti=as#",
      icon: Facebook,
      title: t("Facebook"),
    },
  ];
  console.log(locale);
  const getRelativeTime = useCallback((publishedAt) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffMs = now.getTime() - published.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return `${diffSec} soniya oldin`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} daqiqa oldin`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} soat oldin`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} kun oldin`;
  }, []);

  useEffect(() => {
    const getNewsPaper = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://abbos.uzmetro.uz/api/news/main/${locale}`
        );
        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error("Error fetching news:", error);
        setSlides(announcements);
      } finally {
        setIsLoading(false);
      }
    };
    getNewsPaper();
  }, []); // Added empty dependency array

  useEffect(() => {
    const getNewstVerticalSlider = async () => {
      const res = await fetch(
        `https://abbos.uzmetro.uz/api/news/latest/${locale}`
      );
      const data = await res.json();
      setAnnouncements(data);
    };
    getNewstVerticalSlider();
  }, []); // Added empty dependency array

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback(
    (index) => {
      if (slides.length === 0) return;
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide, slides.length]
  );

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying, slides.length]);

  useEffect(() => {
    if (slides.length > 0 && currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  if (isLoading || slides.length === 0) {
    return (
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                 radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                backgroundSize: "50px 50px",
              }}
              animate={{
                backgroundPosition: ["0px 0px", "50px 50px"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <LoadingSpinner size="xl" text="Ma'lumotlar yuklanmoqda..." />
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-2xl border border-slate-200 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] hidden md:flex flex-col overflow-hidden items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NewsLoadingSpinner />
          </motion.div>
        </div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];
  const titleKey = `title_${locale}`; // title_uz | title_ru | title_en
  const title = currentSlideData?.[titleKey] || currentSlideData?.title || "";

  return (
    <div className="container">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Carousel Section */}
        <div
          className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-900 to-blue-800"
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
                src={`https://abbos.uzmetro.uz${
                  currentSlideData?.image ||
                  currentSlideData?.img ||
                  "/placeholder.jpg"
                }`}
                alt={
                  currentSlideData?.title + "_" + locale ||
                  currentSlideData?.title ||
                  "News image"
                }
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
              {title.slice(0, 100)}
              ...
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
                  currentSlide === index
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`${index + 1}-slaydga o'tdish`}
              />
            ))}
          </div>

          <SocialLinks links={socialLinks} />

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

        {announcements.length > 0 && (
          <NewsSection
            announcements={announcements}
            getRelativeTime={getRelativeTime}
            t={t}
            title={title}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
}
