"use client";
import BoshSahifastatistika from "@/app/[locale]/metro-statistikasi/boshSahifastatistika";
import { motion } from "framer-motion";
import { CreditCard, MapPin, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import MetroInfoSection from "./for-about-metro";
export default function MetroPagesShowcase() {
  const t = useTranslations("menu");
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

  const payment = [
    {
      name: t("humo_card"),
      information: t("humo_payment"),
      image:
        "https://humocard.uz/upload/medialibrary/208/8x0p9hi3h9jww0flwdm92dayhn0flulj/humo-logo-more.png",
      color: "#FF6B35",
      bgColor: "#FFF4F0",
    },
    {
      name: t("uzcard_card"),
      information: t("uzcard_payment"),
      image:
        "https://avatars.mds.yandex.net/i?id=6c2035675ebdc7cc61ca8ab797d59752_sr-10878212-images-thumbs&n=13",
      color: "#0066CC",
      bgColor: "#F0F7FF",
    },
    {
      name: t("click"),
      information: t("click_payment"),
      image: "https://click.uz/click/images/click-white.jpg",
      color: "#00C851",
      bgColor: "#F0FFF4",
    },
    {
      name: t("alif_mobi"),
      information: t("alif_payment"),
      image:
        "https://play-lh.googleusercontent.com/kJJQYR2u11_8fCgrJl5lKScnlba5_5KXx6RUD6KQHm4tmxaZqiiOjVscwvFvtfce2vE=w600-h300-pc0xffffff-pd",
      color: "#0b9e48ff",
      bgColor: "#F0F7FF",
    },
    {
      name: t("payme"),
      information: t("payme_payment"),
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Paymeuz_logo.png/1600px-Paymeuz_logo.png",
      color: "#2ba6eeff",
      bgColor: "#F0FFF4",
    },
    {
      name: t("paynet"),
      information: t("paynet_payment"),
      image:
        "https://play-lh.googleusercontent.com/SKrx5xcp2Vu8Jj9Q4XTw2Cifdaix96xkb5U1T1NKyE-zKwbwuCvhV2RFLwHsVZS8r5k=w480-h960",
      color: "#00C851",
      bgColor: "#F0FFF4",
    },
  ];
  const getStatistika = async () => {
    try {
      const res = await fetch("https://back.uzmetro.uz/api/statistics/en/");

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
  return (
    <div className="container">
      <h2 className="md:text-[36px] text-[24px] font-bold pb-5">
        {t("usefulInfoForPassengers")}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ">
        <motion.div className="lg:row-span-1 bg-gradient-to-br from-blue-800 to-blue-700 text-white rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px] lg:max-h-[530px]">
          <div className="absolute inset-0 z-0 opacity-20">
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: 'url("/naqsh.png")',
                backgroundRepeat: "repeat",
                backgroundSize: "200px", // <<< kichikroq qilib, ko‘p takrorlanadi
              }}
            />
          </div>
          <div className="absolute -bottom-50 inset-0 opacity-30">
            <MetroMap />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <motion.div>
              <MapPin className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
            </motion.div>
            <h3 className="text-md sm:text-2xl lg:text-2xl font-bold mb-2">
              {t("interactiveMapTitle")}
            </h3>
            <p className="mb-6 text-sm sm:text-base text-blue-100 max-w-xs">
              {t("interactiveMapDescription")}
            </p>
            <motion.a
              href="/metro-xaritasis"
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white text-blue-900 font-semibold shadow hover:bg-blue-100 transition text-sm sm:text-base"
            >
              {t("goToMapPage")}
            </motion.a>
          </div>
        </motion.div>
        <MetroInfoSection />
        {/* for informatin */}
        <motion.div className="lg:col-span-3">
          <BoshSahifastatistika />
        </motion.div>
        {/* 4. Enhanced Payment Systems Card with Infinite Vertical Slider */}
        <motion.div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 h-[500px] lg:h-[600px]">
          <div className="flex flex-col h-full">
            {/* Title */}
            <div className="flex items-center gap-3 mb-6 flex-shrink-0">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <CreditCard className="w-8 h-8 text-blue-900" />
              </motion.div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">
                  {t("paymentSystemsTitle")}
                </h3>
              </div>
            </div>

            {/* Infinite vertical slider */}
            <div className="flex-1 overflow-hidden relative">
              <motion.div
                className="flex flex-col"
                animate={{ y: ["0%", "-50%"] }} // 👈 Harakat yuqoriga
                transition={{
                  duration: payment.length * 3, // 3 soniya har bir element uchun
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {[...payment, ...payment].map((paymentMethod, index) => (
                  <motion.div
                    key={`${paymentMethod.name}-${index}`}
                    className="group relative overflow-hidden rounded-xl p-4 transition-all duration-300 cursor-pointer mb-4 flex-shrink-0"
                    style={{ backgroundColor: paymentMethod.bgColor }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div className="relative w-16 h-10 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center flex-shrink-0">
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
                      <motion.div>
                        <CreditCard className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>

                    {/* Hover effekt */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ backgroundColor: paymentMethod.color }}
                    />

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

            {/* Button */}
            <motion.div className="mt-6 text-center flex-shrink-0">
              <motion.a
                href="/tolov-turi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-900 text-white font-semibold shadow-lg hover:bg-blue-800 transition-all duration-300 text-xs sm:text-sm lg:text-base"
              >
                <CreditCard className="w-5 h-5" />
                <p className="text-xs sm:text-sm lg:text-base">
                  {t("allPaymentMethods")}
                </p>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* 5. Enhanced ATTO Cards Carousel */}
        <motion.div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 min-h-[280px] lg:min-h-[400px] overflow-hidden relative">
          <AttoCardsCarousel />
        </motion.div>
      </div>
    </div>
  );
}
function AttoCardsCarousel() {
  const t = useTranslations("menu");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const attoCards = [
    {
      name: t("classic"),
      type: t("classicName"),
      description: t("classicDesc"),
      image: "https://atto.uz/image/blueCard.png",
      color: "#2563eb",
      bgGradient: "from-blue-500 to-blue-700",
      features: [
        t("classicFeature1"),
        t("classicFeature2"),
        t("classicFeature3"),
      ],
    },
    {
      name: t("student"),
      type: t("studentName"),
      description: t("studentDesc"),
      image: "https://atto.uz/icons/cards/yellow_transport_card.png",
      color: "#eab308",
      bgGradient: "from-yellow-500 to-orange-500",
      features: [
        t("studentFeature1"),
        t("studentFeature2"),
        t("studentFeature3"),
      ],
    },
    {
      name: t("school"),
      type: t("schoolName"),
      description: t("schoolDesc"),
      image: "https://atto.uz/icons/cards/green_transport_card.png",
      color: "#16a34a",
      bgGradient: "from-green-500 to-emerald-600",
      features: [t("schoolFeature1"), t("schoolFeature2"), t("schoolFeature3")],
    },
    {
      name: t("social"),
      type: t("socialName"),
      description: t("socialDesc"),
      image: "https://atto.uz/icons/cards/red_transport_card.png",
      color: "#dc2626",
      bgGradient: "from-red-500 to-pink-600",
      features: [t("socialFeature1"), t("socialFeature2"), t("socialFeature3")],
    },
  ];
  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % attoCards.length);
  };
  const prevCard = () => {
    setCurrentCardIndex(
      (prev) => (prev - 1 + attoCards.length) % attoCards.length,
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
          <h3 className="text-xl sm:text-2xl font-bold">{t("cards")}</h3>
          <p className="text-white/70 text-sm">{t("transportCards")}</p>
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
          {t("title")}
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

function MetroMap() {
  const [active, setActive] = useState(0);
  const lines = [
    {
      name: "Chilonzor",
      color: "#3b82f6",
      stations: [
        [100, 300],
        [150, 250],
        [200, 200],
        [250, 150],
        [300, 100],
        [350, 100],
      ],
    },
    {
      name: "O'zbekiston",
      color: "#ef4444",
      stations: [
        [200, 50],
        [250, 75],
        [300, 100],
        [350, 100],
        [400, 125],
        [450, 150],
      ],
    },
  ];
  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % 12), 800);
    return () => clearInterval(timer);
  }, []);
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-full bg-[#0f172a] rounded-2xl"
    >
      {lines.map((line, i) => {
        const d = line.stations
          .map((p, j) => `${j ? "L" : "M"}${p[0]},${p[1]}`)
          .join(" ");
        return (
          <g key={i}>
            <motion.path
              d={d}
              stroke={line.color}
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.5 }}
            />
            {line.stations.map(([x, y], j) => {
              const idx = i * 6 + j;
              const activeStation = idx === active;
              return (
                <motion.circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r={activeStation ? 6 : 4}
                  fill={activeStation ? "#fff" : line.color}
                  stroke="#fff"
                  strokeWidth="1.5"
                  animate={activeStation ? { scale: [1, 1.3, 1] } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: activeStation ? Infinity : 0,
                  }}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
