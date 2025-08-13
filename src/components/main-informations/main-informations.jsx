"use client";
import {
  CreditCard,
  MapPin,
  Wallet,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopStationsChart from "@/app/[locale]/metro-statistikasi/boshSahifastatistika";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "../animated-counter";

export default function MetroPagesShowcase() {
  const [apiStats, setApiStats] = useState([]);
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [kilometers, setKilometers] = useState(0);
  const [stations, setStations] = useState(0);
  const [years, setYears] = useState(0);

  const animateValue = (setter, target, duration) => {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setter(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    animateValue(setKilometers, 70, 1500); // 1.5s animation
    animateValue(setStations, 50, 1500);
    animateValue(setYears, 53, 1500);
  }, []);

  const stats = [
    { value: "70", label: "Kilometr" },
    { value: "50", label: "Bekat" },
    { value: "53", label: "Xizmat yili" },
  ];
  const payment = [
    {
      name: "Humo Karta",
      information: "Karta to'lovlari",
      image:
        "https://humocard.uz/upload/medialibrary/208/8x0p9hi3h9jww0flwdm92dayhn0flulj/humo-logo-more.png",
      color: "#FF6B35",
      bgColor: "#FFF4F0",
    },
    {
      name: "Uzcard Karta",
      information: "Uzcard to'lovlari",
      image:
        "https://avatars.mds.yandex.net/i?id=6c2035675ebdc7cc61ca8ab797d59752_sr-10878212-images-thumbs&n=13",
      color: "#0066CC",
      bgColor: "#F0F7FF",
    },
    {
      name: "Click",
      information: "Click ilovasi orqali to'lov",
      image: "https://click.uz/click/images/click-white.jpg",
      color: "#00C851",
      bgColor: "#F0FFF4",
    },
    {
      name: "Alif mobi",
      information: "Alif mobi ilovasi orqali to'lov",
      image:
        "https://play-lh.googleusercontent.com/kJJQYR2u11_8fCgrJl5lKScnlba5_5KXx6RUD6KQHm4tmxaZqiiOjVscwvFvtfce2vE=w600-h300-pc0xffffff-pd",
      color: "#0b9e48ff",
      bgColor: "#F0F7FF",
    },
    {
      name: "Payme",
      information: "Payme ilovasi orqali to'lov",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Paymeuz_logo.png/1600px-Paymeuz_logo.png",
      color: "#2ba6eeff",
      bgColor: "#F0FFF4",
    },
    {
      name: "Paynet",
      information: "Paynet ilovasi orqali to'lov",
      image:
        "https://play-lh.googleusercontent.com/SKrx5xcp2Vu8Jj9Q4XTw2Cifdaix96xkb5U1T1NKyE-zKwbwuCvhV2RFLwHsVZS8r5k=w480-h960",
      color: "#00C851",
      bgColor: "#F0FFF4",
    },
  ];

  const getStatistika = async () => {
    try {
      const res = await fetch(
        "https://metro-site.onrender.com/api/statistics/en/"
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setApiStats(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getStatistika();
  }, []);

  if (error) return <p>Error: {error}</p>;

  // Get unique stations and assign colors
  const stationNames = [...new Set(apiStats.map((s) => s.station_name))];
  const stationColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#6366f1",
    "#eab308",
  ];

  // Build chart data: { station, color, data: [user_count for each month] }

  return (
    <div className="container">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ">
        {/* 1. Enhanced Metro Map with Animated Subway System */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="lg:row-span-1 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px] lg:min-h-[530px]"
        >
          {/* Animated Metro Map Background */}
          <div className="absolute -bottom-50 inset-0 opacity-30">
            <TashkentMetroMap />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              animate={{ scale: [1, 1.12, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <MapPin className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
            </motion.div>
            <h3 className="text-md sm:text-2xl lg:text-2xl font-bold mb-2">
              Interaktiv metro xaritasi
            </h3>
            <p className="mb-6 text-sm sm:text-base text-blue-100 max-w-xs">
              Toshkent metrosining rasmiy interaktiv xaritasi. Bekatlar va
              yo'nalishlarni ko'ring.
            </p>
            <motion.a
              href="/metro-xaritasis"
              whileTap={{ scale: 0.95 }}
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white text-blue-900 font-semibold shadow hover:bg-blue-100 transition text-sm sm:text-base"
            >
              Xarita sahifasiga
            </motion.a>
          </div>
        </motion.div>

        {/* 2. Metro Info - Wide Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2 relative  rounded-2xl sm:rounded-3xl shadow-2xl min-h-[280px] sm:min-h-[320px] lg:min-h-[400px] overflow-hidden group "
        >
          {/* Video Background */}
          {!videoError && (
            <video
              className="absolute inset-0 w-full h-full object-cover "
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onError={() => setVideoError(true)}
              aria-hidden="true"
            >
              <source src="/videos/01.mp4" type="video/mp4" />
            </video>
          )}

          {/* Overlay */}
          <div className="absolute bg-black/50 w-full h-full  rounded-2xl sm:rounded-3xl shadow-2xl " />

          {/* Content */}
          <div className="relative z-10 w-full  h-full flex flex-col justify-center items-center text-white p-4 sm:p-6 lg:p-1">
            {/* Title */}
            <h2
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 sm:mb-4"
            >
              Metropoliten haqida
            </h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm sm:text-base lg:text-lg xl:text-xl text-center opacity-90  max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto mb-6 sm:mb-8 px-2"
            >
              Bugungi kunda Toshkent metropoliteni Markaziy Osiyoning yetakchi
              shahar transport tizimi sifatida 70 kilometrdan ortiq uzunlikda 50
              ta bekatlar bilan faoliyat yuritmoqda. 2024-yilning so'nggi
              choragida kunlik yo'lovchi tashish soni 1 milliondan oshgan.
            </motion.p>

            {/* Statistics */}
            <motion.div
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 w-full max-w-md sm:max-w-lg"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  // initial={{ opacity: 0, scale: 0.8 }}
                  // animate={{ opacity: 1, scale: 1 }}
                  // transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center group/stat cursor-default"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 group-hover/stat:scale-110 transition-transform duration-300 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                    <AnimatedCounter end={stat.value} />
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-80 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Link href="/metro-tarixi">
                <button className="px-4 sm:px-6 lg:px-6 py-2 sm:py-1 bg-white text-blue-900 rounded-xl sm:rounded-2xl  font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent">
                  Batafsil
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 min-h-[280px]"
        >
          <TopStationsChart />
        </motion.div>

        {/* 4. Enhanced Payment Systems Card with Infinite Vertical Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 h-[500px] lg:h-[600px]"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 flex-shrink-0">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <CreditCard className="w-8 h-8 text-blue-900" />
              </motion.div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">
                  {"To'lov tizimlari"}
                </h3>
              </div>
            </div>

            {/* Infinite vertical slider container */}
            <div className="flex-1 overflow-hidden relative">
              <motion.div
                className="flex flex-col"
                animate={{
                  y: [0, -100 * payment.length],
                }}
                transition={{
                  duration: payment.length * 3, // 3 seconds per item
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {/* Render payment methods twice for seamless loop */}
                {[...payment, ...payment].map((paymentMethod, index) => (
                  <motion.div
                    key={`${paymentMethod.name}-${index}`}
                    className="group relative overflow-hidden rounded-xl p-4 transition-all duration-300 cursor-pointer mb-4 flex-shrink-0"
                    style={{ backgroundColor: paymentMethod.bgColor }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="relative w-16 h-10 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={paymentMethod.image || "/placeholder.svg"}
                          alt={paymentMethod.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            e.currentTarget.src = `/placeholder.svg?height=40&width=64&text=${paymentMethod.name}`;
                          }}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base mb-1 truncate">
                          {paymentMethod.name}
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm lg:text-base truncate">
                          {paymentMethod.information}
                        </p>
                      </div>
                      <motion.div
                        className="w-8 h-8 rounded-full flex lg:hidden xl:flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: paymentMethod.color }}
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CreditCard className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>

                    {/* Animated background effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ backgroundColor: paymentMethod.color }}
                    />

                    {/* Subtle pulse animation */}
                    <motion.div
                      className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(45deg, ${paymentMethod.color}20, transparent, ${paymentMethod.color}20)`,
                        backgroundSize: "200% 200%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-6 text-center flex-shrink-0"
            >
              <motion.a
                href="/tolov-turi"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-900 text-white font-semibold shadow-lg hover:bg-blue-800 transition-all duration-300 text-xs sm:text-sm lg:text-base"
              >
                <CreditCard className="w-5 h-5" />
                <p className="text-xs sm:text-sm lg:text-base">
                  {"Barcha to'lov usullari"}
                </p>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* 5. Enhanced ATTO Cards Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 min-h-[280px] lg:min-h-[400px] overflow-hidden relative"
        >
          <AttoCardsCarousel />
        </motion.div>
      </div>
    </div>
  );
}

function MetroGalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      name: "Toshkent Metro qurilishi",
      description: "1968-yil",
      image:
        "https://cdn-uz.kursiv.media/wp-content/uploads/2024/11/scale_1200-7.jpeg",
    },
    {
      name: "O'z ish faolyatini boshladi",
      description:
        "1977-yil 6-noyabrda Toshkent metropolitenining tantanali ochilish marosimi boʻlib oʻtdi.",
      image:
        "https://cdn-uz.kursiv.media/wp-content/uploads/2024/11/photo_2024-11-06-14.22.07.jpeg",
    },
    {
      name: "Bekatlarimiz ajoyib dizaynda bezaldi",
      description: "Kosmonavtlar bekati",
      image:
        "https://cdn-uz.kursiv.media/wp-content/uploads/2024/11/pr_kosmonavtov_enikeev-1024x683.jpg",
    },
    {
      name: "Yangi poyezdlar bilan ta'minlandi",
      description:
        "Zamonaviy isitish va sovutish tizimlari bilan jihozlangan yangi poyezdlar",
      image:
        "https://www.afisha.uz/uploads/media/2024/11/41f443b3e2b6e97778c964b9a6c01e39_l.webp",
    },
    {
      name: "Yer usti halqa yo'llari qurildi",
      description: "25km uzunlikdagi 14ta bekat",
      image:
        "https://yuz.uz/imageproxy/1200x/https://yuz.uz/file/news/4777dd4735305eb98c3305610ff31f1f.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex-1 relative w-full">
        <div className="relative h-48 sm:h-76 rounded-xl overflow-hidden bg-gray-100">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                x:
                  index === currentIndex
                    ? 0
                    : index > currentIndex
                    ? 100
                    : -100,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <img
                src={image.image || "/placeholder.svg"}
                alt={image.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <motion.div
                className="absolute bottom-4 left-4 text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-lg sm:text-xl font-bold mb-1">
                  {image.name}
                </h4>
                <p className="text-sm text-gray-200">{image.description}</p>
              </motion.div>
            </motion.div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {galleryImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-blue-900" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Station Counter */}
        <motion.div
          className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs sm:text-sm"
          key={currentIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentIndex + 1} / {galleryImages.length}
        </motion.div>
      </div>
    </div>
  );
}

function AttoCardsCarousel() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const attoCards = [
    {
      name: "ATTO Classic",
      type: "Klassik karta",
      description: "Barcha yoshdagi fuqarolar uchun standart transport kartasi",
      image: "https://atto.uz/image/blueCard.png",
      color: "#2563eb",
      bgGradient: "from-blue-500 to-blue-700",
      features: [
        "Barcha transport turlari",
        "Chegirmalar",
        "Online to'ldirish",
      ],
    },
    {
      name: "ATTO talaba",
      type: "Talaba kartasi",
      description:
        "Oliy o'quv yurtlari talabalari uchun maxsus imtiyozli karta",
      image: "https://atto.uz/icons/cards/yellow_transport_card.png",
      color: "#eab308",
      bgGradient: "from-yellow-500 to-orange-500",
      features: ["50% chegirma", "Talaba ID bilan", "Semestr davomida"],
    },
    {
      name: "ATTO O'quvchi",
      type: "Maktab kartasi",
      description: "Maktab o'quvchilari uchun maxsus transport kartasi",
      image: "https://atto.uz/icons/cards/green_transport_card.png",
      color: "#16a34a",
      bgGradient: "from-green-500 to-emerald-600",
      features: ["Katta chegirmalar", "Ota-ona nazorati", "Xavfsiz to'lov"],
    },
    {
      name: "ATTO Ijtimoiy",
      type: "Ijtimoiy karta",
      description: "Nafaqaxo'rlar va imtiyozli toifalar uchun maxsus karta",
      image: "https://atto.uz/icons/cards/red_transport_card.png",
      color: "#dc2626",
      bgGradient: "from-red-500 to-pink-600",
      features: [
        "Maksimal chegirmalar",
        "Ijtimoiy himoya",
        "Bepul yo'nalishlar",
      ],
    },
  ];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % attoCards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex(
      (prev) => (prev - 1 + attoCards.length) % attoCards.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 4500);
    return () => clearInterval(interval);
  }, []);

  const currentCard = attoCards[currentCardIndex];

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative z-10 ">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <Wallet className="w-8 h-8 text-white " />
        </motion.div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold">ATTO kartalar</h3>
          <p className="text-white/70 text-sm">Toshkent transport kartalari</p>
        </div>
      </div>

      {/* Main Carousel Content */}
      <div className="flex-1 relative">
        {/* Background Animation */}
        <motion.div
          key={currentCardIndex}
          className={`absolute inset-0 bg-gradient-to-br ${currentCard.bgGradient} opacity-20 rounded-2xl`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.8 }}
        />

        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center gap-6">
          {/* Card Image Section */}
          <div className="flex-shrink-0 relative">
            <motion.div
              key={currentCardIndex}
              initial={{ rotateY: 90, scale: 0.8 }}
              animate={{ rotateY: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              {/* Card Container */}
              <div className="relative w-48 h-32 sm:w-56 sm:h-36 lg:w-64 lg:h-40 rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  src={currentCard.image}
                  alt={currentCard.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  onError={(e) => {
                    e.currentTarget.src = `/placeholder.svg?height=160&width=256&text=${currentCard.name}`;
                  }}
                />

                {/* Card Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full "
                style={{ backgroundColor: currentCard.color }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* Card Information */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.h4
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ color: currentCard.color }}
              >
                {currentCard.name}
              </motion.h4>
              <p className="text-white/90 font-semibold mb-3 text-lg">
                {currentCard.type}
              </p>
              <p className="text-white/70 text-sm sm:text-base mb-4 leading-relaxed">
                {currentCard.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {currentCard.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 justify-center lg:justify-start"
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentCard.color }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.3,
                      }}
                    />
                    <span className="text-white/80 text-sm ">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center relative z-10"
      >
        <motion.a
          href="/atto-kartalari"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${currentCard.color}20, white)`,
            border: `2px solid ${currentCard.color}40`,
          }}
        >
          <Wallet className="w-4 h-4" />
          ATTO kartaga o'tish
        </motion.a>
      </motion.div>

      {/* Enhanced Card Counter */}
      <motion.div
        className="absolute border top-6 right-6 md:flex hidden items-center gap-2 bg-black/20 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10"
        key={currentCardIndex}
        initial={{ scale: 0.8, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: currentCard.color }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <span className="text-sm font-semibold">
          {currentCardIndex + 1} / {attoCards.length}
        </span>
      </motion.div>
    </div>
  );
}

function TashkentMetroMap() {
  const [activeStation, setActiveStation] = useState(0);

  // Tashkent Metro Lines and Stations
  const metroLines = {
    chilonzor: {
      name: "Chilonzor liniyasi",
      color: "#3b82f6",
      stations: [
        { name: "Chilonzor", x: 100, y: 300 },
        { name: "Mirzo Ulug'bek", x: 150, y: 250 },
        { name: "Novza", x: 200, y: 200 },
        { name: "Milliy bog'", x: 250, y: 150 },
        { name: "Amir Temur Hiyoboni", x: 300, y: 100 },
        { name: "Alisher Navoiy", x: 350, y: 100 },
        { name: "Pushkin", x: 400, y: 100 },
        { name: "Hamid Olimjon", x: 450, y: 100 },
      ],
    },
    uzbekistan: {
      name: "O'zbekiston liniyasi",
      color: "#ef4444",
      stations: [
        { name: "Olmazor", x: 200, y: 50 },
        { name: "Choshtepa", x: 250, y: 75 },
        { name: "Abdulla Qodiriy", x: 300, y: 100 },
        { name: "Alisher Navoiy", x: 350, y: 100 },
        { name: "Ming Orik", x: 400, y: 125 },
        { name: "Pakhtakor", x: 450, y: 150 },
        { name: "Bunyodkor", x: 500, y: 175 },
        { name: "Mashinasozlar", x: 550, y: 200 },
      ],
    },
    yunusobod: {
      name: "Yunusobod liniyasi",
      color: "#10b981",
      stations: [
        { name: "Yunusobod", x: 350, y: 50 },
        { name: "Shahriston", x: 350, y: 100 },
        { name: "Kosmonavtlar", x: 350, y: 150 },
        { name: "Oybek", x: 350, y: 200 },
        { name: "Toshkent", x: 350, y: 250 },
        { name: "Bodomzor", x: 350, y: 300 },
        { name: "Habib Abdullayev", x: 350, y: 350 },
      ],
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStation((prev) => (prev + 1) % 20);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background Grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="#ffffff10"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Glow Effects */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Metro Lines */}
      {Object.entries(metroLines).map(([lineKey, line]) => {
        const pathData = line.stations
          .map((station, index) =>
            index === 0
              ? `M${station.x},${station.y}`
              : `L${station.x},${station.y}`
          )
          .join(" ");

        return (
          <g key={lineKey}>
            {/* Line Path */}
            <motion.path
              d={pathData}
              stroke={line.color}
              strokeWidth="4"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                delay: Object.keys(metroLines).indexOf(lineKey) * 0.5,
                ease: "easeInOut",
              }}
            />

            {/* Animated Train */}
            <motion.circle
              r="4"
              fill={line.color}
              filter="url(#glow)"
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Object.keys(metroLines).indexOf(lineKey) * 2,
              }}
              style={{
                offsetPath: `path('${pathData}')`,
                offsetRotate: "auto",
              }}
            />

            {/* Stations */}
            {line.stations.map((station, stationIndex) => {
              const globalStationIndex =
                Object.keys(metroLines).indexOf(lineKey) * 8 + stationIndex;
              const isActive = globalStationIndex === activeStation;

              return (
                <g key={station.name}>
                  {/* Station Circle */}
                  <motion.circle
                    cx={station.x}
                    cy={station.y}
                    r={isActive ? "6" : "4"}
                    fill={isActive ? "#ffffff" : line.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    filter={isActive ? "url(#glow)" : "none"}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: isActive ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      scale: {
                        duration: 0.6,
                        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                      },
                      initial: {
                        duration: 0.3,
                        delay: globalStationIndex * 0.1,
                      },
                    }}
                  />

                  {/* Station Name (only for major stations) */}
                  {(stationIndex % 2 === 0 ||
                    station.name === "Alisher Navoiy") && (
                    <motion.text
                      x={station.x}
                      y={station.y - 12}
                      textAnchor="middle"
                      className="text-xs font-semibold fill-white/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0.6 }}
                      transition={{ duration: 0.3 }}
                    >
                      {station.name}
                    </motion.text>
                  )}

                  {/* Pulsing Ring for Active Station */}
                  {isActive && (
                    <motion.circle
                      cx={station.x}
                      cy={station.y}
                      r="8"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [1, 2, 3],
                        opacity: [1, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Transfer Stations (Interchange Points) */}
      <g>
        {/* Alisher Navoiy - Major Transfer Hub */}
        <motion.circle
          cx="350"
          cy="100"
          r="8"
          fill="#ffffff"
          stroke="#fbbf24"
          strokeWidth="3"
          filter="url(#glow)"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            rotate: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
        />

        {/* Transfer Icon */}
        <motion.path
          d="M345,95 L355,95 M345,105 L355,105 M350,90 L350,110"
          stroke="#1f2937"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      </g>

      {/* Line Legend */}
      <g transform="translate(20, 20)">
        {Object.entries(metroLines).map(([lineKey, line], index) => (
          <g key={lineKey} transform={`translate(0, ${index * 25})`}>
            <circle cx="8" cy="8" r="4" fill={line.color} />
            <text x="20" y="12" className="text-xs fill-white/90 font-medium">
              {line.name}
            </text>
          </g>
        ))}
      </g>

      {/* Animated Background Elements */}
      <g opacity="0.1">
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + i * 120}
            cy={200}
            r="2"
            fill="#ffffff"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>
    </svg>
  );
}
