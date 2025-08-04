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
      length: "16.3 km",
      stations: 12,
      opened: "1977",
      color: "#fb7e7e",
      description:
        "Shahar markazini turar-joy massivlari bilan bog'laydigan birinchi metro yo'nalishi",
      highlights: [
        "Tarixiy birinchi yo'nalish",
        "Shahar markazi aloqasi",
        "12 ta zamonaviy bekat",
      ],
    },
    {
      name: "O'zbekiston yo'nalishi",
      length: "14.2 km",
      stations: 11,
      opened: "1984",
      color: "#2563eb",
      description: "Shahar markazini asosiy temir yo'l vokzali bilan bog'laydi",
      highlights: [
        "Temir yo'l aloqasi",
        "Biznes hududi",
        "Madaniy yodgorliklar",
      ],
    },
    {
      name: "Yunusobod yo'nalishi",
      length: "9.5 km",
      stations: 8,
      opened: "2001",
      color: "#57be82",
      description:
        "Yirik turar-joy majmualariga xizmat ko'rsatadigan zamonaviy yo'nalish",
      highlights: [
        "Turar-joy hududlari",
        "Zamonaviy dizayn",
        "Rivojlanayotgan rayonlar",
      ],
    },
    {
      name: "Yerusti xalqa yo'li",
      length: "7.0 km",
      stations: 5,
      opened: "2020",
      color: "#eecf53",
      description:
        "Eng so'nggi texnologiyalar bilan jihozlangan yangi yo'nalish",
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
      phase: "1-bosqich",
      description:
        "Chilonzor yo'nalishi 6 ta bekat bilan ochildi, shahar transportida yangi davr boshlandi",
    },
    {
      year: "1980-1991",
      event: "Tez rivojlanish davri",
      phase: "O'sish",
      description:
        "Qurilishning bir necha bosqichlari yangi yo'nalishlar qo'shdi va shaharning asosiy hududlarini bog'ladi",
    },
    {
      year: "2001",
      event: "Yangi ming yillik yo'nalishi",
      phase: "Zamonaviy davr",
      description:
        "Yunusobod yo'nalishi zamonaviy texnologiya va yaxshilangan qulayliklar bilan ochildi",
    },
    {
      year: "2016-2020",
      event: "Katta modernizatsiya",
      phase: "Innovatsiya",
      description:
        "Prezident tashabbusi bilan katta kengayish va modernizatsiya loyihalari boshlandi",
    },
    {
      year: "2020-2023",
      event: "Rekord kengayish",
      phase: "Hozirgi vaqt",
      description:
        "21.4 km yangi yo'nalishlar qo'shildi, shu jumladan halqa yo'li va Sergeli yo'nalishi",
    },
  ];

  const futurePlans = [
    {
      title: "Yo'nalishlarni kengaytirish",
      description:
        "Rivojlanayotgan shahar atrofi hududlariga xizmat ko'rsatish uchun mavjud yo'nalishlarni kengaytirish",
      timeline: "2024-2026",
      status: "Rejalashtirilmoqda",
    },
    {
      title: "Aqlli texnologiyalar",
      description:
        "AI asosidagi transport boshqaruvi va mobil chiptalar tizimini joriy etish",
      timeline: "2024-2025",
      status: "Amalga oshirilmoqda",
    },
    {
      title: "Qulaylik yangilanishlari",
      description: "Nogironlar uchun liftlar va qulayliklar qo'shish",
      timeline: "2024-2027",
      status: "Davom etmoqda",
    },
    {
      title: "Yashil energiya",
      description:
        "Barcha operatsiyalar uchun qayta tiklanadigan energiya manbalariga o'tish",
      timeline: "2025-2030",
      status: "Tadqiqot bosqichi",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Amalga oshirilmoqda":
        return "bg-green-500";
      case "Rejalashtirilmoqda":
        return "bg-blue-500";
      case "Davom etmoqda":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

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
                Toshkent Metropoliteni
              </h1>
              <p className="text-lg text-[#0E327F]/70 mt-2">
                Markaziy Osiyoning Yetakchi Metro Tizimi
              </p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              Markaziy Osiyoda birinchi va yagona metro tizimi, 1972 yildan beri
              shahar transportining asosiy qismi hisoblanadi. Bu taraqqiyot
              ramzi bo&apos;lib, jamoalarni bog&apos;laydi va barqaror
              transportning kelajagini ta&apos;minlaydi.
            </p>
          </div>
        </div>

        {/* Animated Image Gallery */}
        <div ref={(el) => (sectionRefs.current[1] = el)} className="mb-20">
          <h2 className="text-4xl font-bold text-center text-[#0E327F] mb-12">
            Sayohatni His Eting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[0, 1, 2].map((index) => (
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
                    src={`https://cdn1.img.sputniknews.uz/img/07e7/08/1e/38378409_0:67:1280:787_1920x0_80_0_0_5a0d93c22a77a08b2f68d80cbfba6ff5.jpg?height=400&width=500&text=Metro+Bekati+${
                      index + 1
                    }`}
                    alt={`Toshkent Metro Bekati ${index + 1}`}
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
                    <h3 className="text-xl font-bold mb-2">
                      Zamonaviy Metro Bekati
                    </h3>
                    <p className="text-sm opacity-90">
                      Eng so&apos;nggi infratuzilma va dizayn
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge className="bg-white/20 text-white">Xavfsiz</Badge>
                      <Badge className="bg-white/20 text-white">
                        Zamonaviy
                      </Badge>
                      <Badge className="bg-white/20 text-white">Samarali</Badge>
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
            {[0, 1, 2].map((index) => (
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
            Metro Tarmog&apos;i
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Butun metropoliten hududiga zamonaviy, samarali va xavfsiz transport
            bilan xizmat ko&apos;rsatadigan to&apos;rtta o&apos;zaro
            bog&apos;langan yo&apos;nalishlar
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

                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#0E327F] text-sm">
                      Asosiy xususiyatlar:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {line.highlights.map((highlight, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-gray-300 text-gray-600 hover:border-[#0E327F] hover:text-[#0E327F] transition-colors duration-300"
                        >
                          {highlight}
                        </Badge>
                      ))}
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
            Vaqt Bo&apos;ylab Sayohat
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Poydevor qo&apos;yishdan zamonaviy kengayishgacha - doimiy
            o&apos;sish va innovatsiyaning ellik yili
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
                <div className="absolute xl:block hidden left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-[#0E327F] to-blue-600 rounded-full border-4 border-white shadow-xl z-10 group-hover:scale-125 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0E327F] to-blue-600 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Plans */}
        <div ref={(el) => (sectionRefs.current[6] = el)} className="mb-20">
          <h2 className="text-4xl font-bold text-[#0E327F] mb-4 text-center">
            Kelajak Rejalar
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Shaharimizning o&apos;sib borayotgan ehtiyojlariga xizmat
            ko&apos;rsatish uchun doimiy innovatsiya va kengayish
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {futurePlans.map((plan, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 group"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: `fadeInUp 0.8s ease-out ${index * 150}ms both`,
                }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#0E327F] group-hover:text-blue-600 transition-colors duration-300">
                      {plan.title}
                    </h3>
                    <Badge
                      className={`${getStatusColor(
                        plan.status
                      )} text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {plan.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#0E327F]">
                      {plan.timeline}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Current Status */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-[#0E327F] via-blue-600 to-blue-700 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E327F]/90 to-blue-600/90" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

          <CardContent className="p-12 text-center relative z-10">
            <div className="inline-flex items-center gap-4 mb-8 group">
              <div className="p-4 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300 group-hover:rotate-12">
                <TrendingUp size={40} className="animate-pulse" />
              </div>
              <h2 className="text-4xl font-bold">Hozirgi Yutuqlar</h2>
            </div>
            <p className="text-xl mb-8 opacity-90 leading-relaxed max-w-4xl mx-auto">
              Bugun Toshkent metropoliteni Markaziy Osiyoning yetakchi shahar
              transport tizimi sifatida 70 kilometrdan ortiq uzunlikda 50 ta
              zamonaviy bekat bilan faoliyat yuritmoqda. Bizning jamoa xavfsiz,
              samarali va barqaror transport bilan xizmat ko&apos;rsatishdan
              faxrlanamiz, hayotlarni bog&apos;laymiz va shahar
              harakatchanligining kelajagini ta&apos;minlaymiz.
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
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-sm opacity-80">Kunlik Yo&apos;lovchi</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">51</div>
                <div className="text-sm opacity-80">Xizmat Yili</div>
              </div>
            </div>
          </CardContent>
        </Card>
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
