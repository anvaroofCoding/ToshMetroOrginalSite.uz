"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Clock,
  Leaf,
  MapPin,
  Shield,
  Train,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function TashkentMetroPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);

    // Image carousel
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 3500);

    // Scroll animation
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Check which section is in view
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Animate statistics
    const statsTargets = [70, 50, 4, 51];
    const timers = [];

    statsTargets.forEach((target, index) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats((prev) => {
          const newStats = [...prev];
          newStats[index] = Math.floor(current);
          return newStats;
        });
      }, 50 + index * 20);
      timers.push(timer);
    });

    return () => {
      clearInterval(imageInterval);
      window.removeEventListener("scroll", handleScroll);
      timers.forEach((timer) => clearInterval(timer));
    };
  }, []);

  const metroLines = [
    {
      name: "Chilonzor yo'nalishi",
      length: "22.6 km",
      stations: 17,
      opened: "1977",
      color: "#fb7e7e",
      description:
        "Chilonzor yo'nalishi birinchi ishga tushgan yo'nalish bo'lib, Buyuk Ipak yo'li bekatidan Chinor bekatigacha davom etadi. ",
      highlights: [
        "Tarixiy birinchi yo'nalish",
        "Shahar markazi aloqasi",
        "12 ta zamonaviy bekat",
      ],
    },
    {
      name: "O'zbekiston yo'nalishi",
      length: "14.8 km",
      stations: 11,
      opened: "1984",
      color: "#2563eb",
      description:
        "O'zbekiston yo'nalishi ikkinchi ishga tushgan yo'nalish bo'lib, Beruniy bekatidan Do'stlik bekatigacha davom etadi.",
      highlights: [
        "Temir yo'l aloqasi",
        "Biznes hududi",
        "Madaniy yodgorliklar",
      ],
    },
    {
      name: "Yunusobod yo'nalishi",
      length: "10.05 km",
      stations: 8,
      opened: "2001",
      color: "#57be82",
      description:
        "Yunusobod yo'li uchinchi ishga tushgan yo'nalish bo'lib, Turkiston bekatidan Ming o'rik bekatigacha davom etadi. ",
      highlights: [
        "Turar-joy hududlari",
        "Zamonaviy dizayn",
        "Rivojlanayotgan rayonlar",
      ],
    },
    {
      name: "Yer usti halqa yo'li",
      length: "22.34 km",
      stations: 14,
      opened: "2020",
      color: "#eecf53",
      description:
        "Yer usti halqa yo'li to'rtinchi ishga tushgan yo'nalish bo'lib, Texnopark bekatidan Qipchoq bekatigacha davom etadi. ",
      highlights: [
        "So'nggi texnologiya",
        "Ekologik toza",
        "Kelajakda kengayish",
      ],
    },
  ];

  const timeline = [
    {
      year: "1972",
      event: "Metro qurilishi boshlandi",
      phase: "Asos",
      description:
        "Markaziy Osiyoda birinchi va yagona metro tizimi qurilishi boshlandi",
    },
    {
      year: "1977",
      event: "Birinchi yo'nalish ochildi",
      phase: "1-bosqich Chilonzor",
      description:
        "1977-yil 6-noyabrda “Olmazor” bekatidan “Amir Temur xiyoboni” bekatiga qadar, “Chilonzor” elektrodepo kompleksi va aloqa uyi foydalanishga topshirildi.",
    },
    {
      year: "1980",
      event: "Tez rivojlanish davri",
      phase: "2-bosqich Chilonzor",
      description:
        "Uzunligi 4,2 km, “Amir Temur xiyoboni” bekatidan “Buyuk ipak yo‘li” bekatigacha bo‘lgan 3 ta bekat 1980-yil avgust oyida foydalanishga topshirildi. Ushbu bekatlar ishga tushirilgach, Chilonzor metro yonalishining qurilishi janubi-g‘arbdan shimoli-sharqqa shahar markazi orqali 12 bekat va uzunligi 16,3 km bo‘lgan.",
    },
    {
      year: "1984",
      event: "O‘zbekiston yo‘nalishi",
      phase: "1-bosqich O'zbekiston",
      description:
        "Alisher Navoiy bekatidan Toshkent bekatiga qadar uzunligi 5.6 kmdan ortiq bo'lgan shahar markazini temir yo'l vakzaliga tutashtiruvchi jami 5 ta bekat 1984-yil 26-noyabrda foydalanishga topshirildi",
    },
    {
      year: "1987",
      event: "O'zbekiston yo'nalishining kengayishi",
      phase: "2-bosqich O'zbekiston",
      description:
        "Uzunligi 3,2 km dan ortiq bo‘lgan, “Toshkent” bekatidan “Do‘stlik” bekatigacha bekat 1987-yil foydalanishga topshirildi.",
    },
    {
      year: "1989",
      event: "O'zbekiston yo'nalishining kengayishi",
      phase: "3-bosqich O'zbekiston",
      description:
        "Uzunligi 2,2 km dan ortiq bo ‘lgan, “Alisher Navoiy” bekatidan “Chorsu” bekatiga qadar 2 ta bekat 1989 yil foydalanishga topshirildi.",
    },
    {
      year: "1991",
      event: "O'zbekiston yo'nalishining kengayishi",
      phase: "4-bosqich O'zbekiston",
      description:
        "3,2 km uzunlikdagi Chorsu bekatidan Beruniy bekatigacha boʻlgan 2 ta bekat 1991-yil aprel oyida foydalanishga topshirilgan.Umumiy uzunligi 14,2 km boʻlgan Oʻzbekiston yo‘nalishi 11 ta bekat va Oʻzbekiston elektr deposini oʻz ichiga oladi.",
    },
    {
      year: "2001",
      event: "Yunusobod yo’nalishi",
      phase: "1-bosqich Yunusobod",
      description:
        "Shahar aholisiga transport xizmati koʻrsatishni yanada yaxshilash maqsadida, 2001-yil 26-oktabr sanasida Ming oʻrik bekatidan Shahriston bekatigacha boʻlgan Yunusobod metro yo’nalishining 1-bosqichi, umumiy uzunligi 7,15 km boʻlgan 6 ta bekat foydalanishga topshirildi.",
    },
    {
      year: "2016-2020",
      event: "Yunusobod yo’nalishi",
      phase: "2-bosqich Yunusobod",
      description:
        "2016-yilda O‘zbekiston Respublikasi Prezidenti Sh.M. Mirziyoyev tomonidan metro qurilishini davom ettirishga qaratilgan qator qarorlar imzolandi. O‘zbekiston Respublikasi Prezidentining 2016-yil 7-noyabrdagi “Toshkent metropolitenining Yunusobod liniyasining ikkinchi bosqichini qurish” loyihasini amalga oshirish chora-tadbirlari to‘g‘risida”gi PQ-2653-sonli qaroriga muvofiq Yunusobod metro yo ‘nalishining 2,9 km uzunlikdagi ikki “Turkiston” va “Yunusobod” bekatlari qurilishi boshlandi. 2020-yilda avgust oyida ikkita “Turkiston” va “Yunusobod” bekatlari foydalanishga topshirildi. Hozirgi vaqtda Yunusobod yo ‘nalishining umumiy uzunligi 9,5 km bo‘lib, 8 bekat bilan yirik turar-joy massivini shahar markazi bilan bog‘laydi.",
    },
    {
      year: "2017",
      event: "PQ-2979-son qarori",
      phase: "Yer usti halqa yo'li",
      description:
        "O ‘zbekiston Respublikasi Prezidentining 2017-yil 19-maydagi PQ-2979-son qaroriga muvofiq “Toshkent shahrida halqa yer usti metro liniyasini qurish” loyihasi amalga oshirilmoqda.",
    },
    {
      year: "2017",
      event: "PQ-2979-son qarori",
      phase: "Yer usti halqa yo'li",
      description:
        "O ‘zbekiston Respublikasi Prezidentining 2017-yil 19-maydagi PQ-2979-son qaroriga muvofiq “Toshkent shahrida halqa yer usti metro liniyasini qurish” loyihasi amalga oshirilmoqda.",
    },
    {
      year: "2020",
      event: "Yer usti halqa yo'li",
      phase: "Yer usti halqa yo'li topshirildi",
      description:
        "2020 yil avgust oyida metro halqa yer usti yo ‘nalishining 1–bosqichi – 11,5 km uzunlikdagi 7 ta bekat foydalanishga topshirildi.Ushbu qarorlar ijrosini ta ‘minlash maqsadida 2020-yilda umumiy uzunligi 21,4 km bo ‘lgan 14 ta yangi metro yo‘nalish va bekatlari qurilib, foydalanishga topshirildi.",
    },
    {
      year: "2020",
      event: "Chilonzor yo'nalishining kengayishi",
      phase: "Sergili bekatlari",
      description:
        "O‘zbekiston Respublikasi Prezidentining 2016-yil 29-noyabrdagi “Toshkent metropolitenining Sergeli liniyasini qurish” loyihasini amalga oshirish chora-tadbirlari to‘g‘risida”gi PQ-2664-sonli qaroriga muvofiq 2020-yil dekabr oyida 7,0 km uzunlikdagi yangi Sergeli metro yo‘lining 5 ta bekati qurildi va foydalanishga topshirildi",
    },
    {
      year: "2021",
      event: "Yunusobod yo'nalishining kengayishi",
      phase: "Yangi bekatlar",
      description:
        "Yunisobod-Turkiston bekatlar 2021-yilda foydalanishga topshirilgan",
    },
    {
      year: "2024",
      event: "Yerusti xalqa yo'li kengayishi",
      phase: "Yangi bekatlar",
      description:
        "Turon-Qipchoq bekatlari 2024-yilda foydalanishga topshirilgan",
    },
  ];

  const sliderHistory = [
    {
      image: "/galery/birinchisostav.png",
      title: "Tarixiy metro poezdlari",
      description: "Metro qurilishining ilk bosqichlari",
      badges: ["Tarixiy", "Madaniy"],
    },
    {
      image: "/galery/ortasastav.png",
      title: "Yaqin o'tmishdagi metro poezdlari",
      description: "Rivojlanish bosqichidagi poezdlar",
      badges: ["Xavfsiz", "Samarali"],
    },
    {
      image: "/galery/yangisastav.png",
      title: "Hozirgi zamonaviy poyezdlar",
      description: "Yangi texnologiyalar va kengaygan imkoniyatlar",
      badges: ["Zamonaviy", "Qulay transport"],
    },
  ];

  return (
    <div className="min-h-screen mt-10  overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-[#0E327F]/5 rounded-full blur-xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-blue-400/10 rounded-full blur-lg animate-bounce"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-[#0E327F]/3 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        {/* Hero Section */}
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          className={`text-center mb-16 transition-all duration-1500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="inline-flex items-center gap-4 mb-8 group">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#0E327F] to-blue-600 bg-clip-text text-transparent">
                Toshkent metropoliteni
              </h1>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              Markaziy Osiyodagi birinchi, xavfsiz, qulay va tez jamoat
              transportlaridan bo'lib 1977-yildan beri faoliyat yuritib
              kelmoqda.
            </p>
          </div>
        </div>
        {/* Animated Image Gallery */}
        <div ref={(el) => (sectionRefs.current[1] = el)} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {sliderHistory.map((slide, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-1000 transform hover:rotate-1 ${
                  currentImageIndex === index
                    ? "scale-110 shadow-[#0E327F]/40 z-10"
                    : "scale-100 hover:scale-105"
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: `fadeInUp 1s ease-out ${index * 200}ms both`,
                }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#0E327F] via-blue-600 to-blue-800 flex items-center justify-center relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#0E327F]/90 to-transparent transition-all duration-700 ${
                    currentImageIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-sm opacity-90">{slide.description}</p>
                    <div className="flex gap-2 mt-3">
                      {slide.badges.map((badge, i) => (
                        <Badge key={i} className="bg-white/20 text-white">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating animation elements */}
                <div
                  className={`absolute top-4 right-4 transition-all duration-1000 ${
                    currentImageIndex === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                >
                  <div className="w-8 h-8 bg-white/30 rounded-full animate-ping" />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Image Navigation */}
          <div className="flex justify-center gap-3 mb-8">
            {sliderHistory.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative transition-all duration-500 ${
                  currentImageIndex === index
                    ? "w-12 h-4 bg-[#0E327F] scale-125"
                    : "w-4 h-4 bg-gray-300 hover:bg-gray-400 hover:scale-110"
                } rounded-full`}
              >
                {currentImageIndex === index && (
                  <div className="absolute inset-0 bg-[#0E327F] rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Enhanced Metro Lines */}
        <div ref={(el) => (sectionRefs.current[3] = el)} className="mb-20">
          <h2 className="text-4xl font-bold text-[#0E327F] mb-4 text-center">
            Metro tarmog'i
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Toshkent shahar bo'ylab xizmat ko'rsatadigan hamda o'zaro bog'langan
            metropoliten yo'nalishlari
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {metroLines.map((line, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 group overflow-hidden"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: `fadeInLeft 0.8s ease-out ${index * 200}ms both`,
                }}
              >
                <div
                  className="h-2 w-full transition-all duration-500 group-hover:h-3"
                  style={{ backgroundColor: line.color }}
                />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-6 h-6 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"
                      style={{ backgroundColor: line.color }}
                    />
                    <div>
                      <CardTitle className="text-[#0E327F] text-xl group-hover:text-blue-600 transition-colors duration-300">
                        {line.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    {line.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-[#0E327F]">
                        {line.length}
                      </div>
                      <div className="text-xs text-gray-600">Uzunlik</div>
                    </div>
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-[#0E327F]">
                        {line.stations}
                      </div>
                      <div className="text-xs text-gray-600">Bekatlar</div>
                    </div>
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-[#0E327F]">
                        {line.opened}
                      </div>
                      <div className="text-xs text-gray-600">Ochildi</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Enhanced Timeline */}
        <div ref={(el) => (sectionRefs.current[5] = el)} className="mb-20">
          <h2 className="text-4xl font-bold text-[#0E327F] mb-4 text-center">
            Vaqt bo'ylab sayohat
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Poydevor qo'yishdan zamonaviy kengayishgacha - doimiy o'sish va
            innovatsiyaning ellik yili
          </p>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#0E327F] via-blue-400 to-blue-600 opacity-30"></div>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: `slideIn${
                    index % 2 === 0 ? "Left" : "Right"
                  } 0.8s ease-out ${index * 200}ms both`,
                }}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 group">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-[#0E327F] text-white px-4 py-2 text-lg font-bold group-hover:scale-110 transition-transform duration-300">
                          {item.year}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-[#0E327F] text-[#0E327F] px-3 py-1 group-hover:bg-[#0E327F] group-hover:text-white transition-all duration-300"
                        >
                          {item.phase}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-[#0E327F] mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {item.event}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                {/* <div className="absolute xl:block hidden left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-[#0E327F] to-blue-600 rounded-full border-4 border-white shadow-xl z-10 group-hover:scale-125 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0E327F] to-blue-600 rounded-full animate-ping opacity-20"></div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        {/* Enhanced Current Status */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-[#0E327F] via-blue-600 to-blue-700 text-white overflow-hidden relative ">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E327F]/90 to-blue-600/90" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

          <CardContent className="p-12 text-center relative z-10">
            <div className="inline-flex items-center gap-4 mb-8 group">
              <div className="p-4 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300 group-hover:rotate-12">
                <TrendingUp size={40} className="animate-pulse" />
              </div>
              <h2 className="text-4xl font-bold">Hozirgi yutuqlar</h2>
            </div>
            <p className="text-xl mb-8 opacity-90 leading-relaxed max-w-4xl mx-auto">
              Bugungi kunda Toshkent metropoliteni Markaziy Osiyoning yetakchi
              shahar transport tizimi sifatida 70 kilometrdan ortiq uzunlikda 50
              ta bekatlar bilan faoliyat yuritmoqda. 2024-yilning 1-choragida
              kunlik yo'lovchi tashish soni 1 milliondan oshgan.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">70+</div>
                <div className="text-sm opacity-80">Kilometr</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">50</div>
                <div className="text-sm opacity-80">Bekat</div>
              </div>

              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">53</div>
                <div className="text-sm opacity-80">Xizmat yili</div>
              </div>
            </div>
          </CardContent>
        </Card>
        Metro Tarmog'i
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.9) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default TashkentMetroPage;
