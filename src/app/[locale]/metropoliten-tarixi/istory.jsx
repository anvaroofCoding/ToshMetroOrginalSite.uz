"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatedCounter } from "@/components/animated-counter";
import { useTranslations } from "next-intl";

function TashkentMetroPage() {
  const t = useTranslations("menu");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const sectionRefs = useRef([]);
  useEffect(() => {
    setIsVisible(true);
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
      name: t("two_hundred_sixty"),
      length: t("two_hundred_sixty_one"),
      stations: 17,
      opened: "1977",
      color: "#fb7e7e",
      description: t("two_hundred_sixty_two"),
      highlights: [
        t("two_hundred_sixty_three"),
        t("two_hundred_sixty_four"),
        t("two_hundred_sixty_five"),
      ],
    },
    {
      name: t("two_hundred_sixty_six"),
      length: t("two_hundred_sixty_seven"),
      stations: 11,
      opened: "1984",
      color: "#2563eb",
      description: t("two_hundred_sixty_eight"),
      highlights: [
        t("two_hundred_sixty_nine"),
        t("two_hundred_seventy"),
        t("two_hundred_seventy_one"),
      ],
    },
    {
      name: t("two_hundred_seventy_two"),
      length: t("two_hundred_seventy_three"),
      stations: 8,
      opened: "2001",
      color: "#57be82",
      description: t("two_hundred_seventy_four"),
      highlights: [
        t("two_hundred_seventy_five"),
        t("two_hundred_seventy_six"),
        t("two_hundred_seventy_seven"),
      ],
    },
    {
      name: t("two_hundred_seventy_eight"),
      length: t("two_hundred_seventy_nine"),
      stations: 14,
      opened: "2020",
      color: "#eecf53",
      description: t("two_hundred_eighty"),
      highlights: [
        t("two_hundred_eighty_one"),
        t("two_hundred_eighty_two"),
        t("two_hundred_eighty_three"),
      ],
    },
  ];
  const timeline = [
    {
      year: "1972",
      event: t("two_hundred_eighty_four"),
      phase: t("two_hundred_eighty_five"),
      description: t("two_hundred_eighty_six"),
    },
    {
      year: "1977",
      event: t("two_hundred_eighty_seven"),
      phase: t("two_hundred_eighty_eight"),
      description: t("two_hundred_eighty_nine"),
    },
    {
      year: "1980",
      event: t("two_hundred_ninety"),
      phase: t("two_hundred_ninety_one"),
      description: t("two_hundred_ninety_two"),
    },
    {
      year: "1984",
      event: t("two_hundred_ninety_three"),
      phase: t("two_hundred_ninety_four"),
      description: t("two_hundred_ninety_five"),
    },
    {
      year: "1987",
      event: t("two_hundred_ninety_six"),
      phase: t("two_hundred_ninety_seven"),
      description: t("two_hundred_ninety_eight"),
    },
    {
      year: "1989",
      event: t("two_hundred_ninety_nine"),
      phase: t("three_hundred"),
      description: t("three_hundred_one"),
    },
    {
      year: "1991",
      event: t("three_hundred_two"),
      phase: t("three_hundred_three"),
      description: t("three_hundred_four"),
    },
    {
      year: "2001",
      event: t("three_hundred_five"),
      phase: t("three_hundred_six"),
      description: t("three_hundred_seven"),
    },
    {
      year: "2016-2020",
      event: t("three_hundred_eight"),
      phase: t("three_hundred_nine"),
      description: t("three_hundred_ten"),
    },
    {
      year: "2017",
      event: t("three_hundred_eleven"),
      phase: t("three_hundred_twelve"),
      description: t("three_hundred_thirteen"),
    },
    {
      year: "2020",
      event: t("three_hundred_twelve"),
      phase: t("three_hundred_fourteen"),
      description: t("three_hundred_fifteen"),
    },
    {
      year: "2020",
      event: t("three_hundred_sixteen"),
      phase: t("three_hundred_seventeen"),
      description: t("three_hundred_eighteen"),
    },
    {
      year: "2021",
      event: t("three_hundred_nineteen"),
      phase: t("three_hundred_twenty"),
      description: t("three_hundred_twenty_one"),
    },
    {
      year: "2024",
      event: t("three_hundred_twenty_two"),
      phase: t("three_hundred_twenty_three"),
      description: t("three_hundred_twenty_four"),
    },
  ];
  const sliderHistory = [
    {
      image: "/galery/birinchisostav.png",
      title: t("three_hundred_twenty_five"),
      description: t("three_hundred_twenty_six"),
      badges: [t("three_hundred_twenty_seven")],
    },
    {
      image: "/galery/ortasastav.png",
      title: t("three_hundred_twenty_eight"),
      description: t("three_hundred_twenty_nine"),
      badges: [t("three_hundred_thirty")],
    },
    {
      image: "/galery/yangisastav.png",
      title: t("three_hundred_thirty_one"),
      description: t("three_hundred_thirty_two"),
      badges: [t("three_hundred_thirty_three")],
    },
  ];
  return (
    <div className="min-h-screen mt-10  overflow-hidden">
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
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          className={`text-center mb-16 transition-all duration-1500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="inline-flex items-center gap-4 mb-8 group">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#0E327F] to-blue-600 bg-clip-text text-transparent">
                {t("three_hundred_thirty_four")}
              </h1>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              {t("three_hundred_thirty_five")}
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
            {t("three_hundred_thirty_six")}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("three_hundred_thirty_seven")}
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
                      <div className="text-xs text-gray-600">
                        {t("three_hundred_thirty_eight")}
                      </div>
                    </div>
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-[#0E327F]">
                        {line.stations}
                      </div>
                      <div className="text-xs text-gray-600">
                        {t("three_hundred_thirty_nine")}
                      </div>
                    </div>
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-[#0E327F]">
                        {line.opened}
                      </div>
                      <div className="text-xs text-gray-600">
                        {t("three_hundred_forty")}
                      </div>
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
            {t("three_hundred_forty_one")}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("three_hundred_forty_two")}
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
              </div>
            ))}
          </div>
        </div>
        <div className="w-full space-y-8">
          <Card className="border-0 shadow-2xl bg-transparent text-white overflow-hidden relative p-0">
            {/* Background decorative elements */}
            <div className="absolute" />
            <div className="absolute top-0 right-0 w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/5 rounded-full -translate-y-20 sm:-translate-y-28 lg:-translate-y-32 translate-x-20 sm:translate-x-28 lg:translate-x-32" />
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white/5 rounded-full translate-y-16 sm:translate-y-20 lg:translate-y-24 -translate-x-16 sm:-translate-x-20 lg:-translate-x-24" />

            <CardContent className="p-6 sm:p-10 lg:p-12 bg-black/50 text-center relative z-10">
              {/* Header */}
              <div className="inline-flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 group flex-wrap justify-center">
                <div className="p-3 sm:p-4 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300 group-hover:rotate-12">
                  <TrendingUp
                    size={30}
                    className="sm:size-8 lg:size-10 animate-pulse"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {t("three_hundred_forty_three")}
                </h2>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed max-w-4xl mx-auto px-2">
                {t("three_hundred_forty_four")}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                    <AnimatedCounter end={70} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm opacity-80">
                    {t("three_hundred_forty_five")}
                  </div>
                </div>
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                    <AnimatedCounter end={50} />
                  </div>
                  <div className="text-xs sm:text-sm opacity-80">
                    {t("three_hundred_forty_six")}
                  </div>
                </div>
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                    <AnimatedCounter end={1000000} />
                  </div>
                  <div className="text-xs sm:text-sm opacity-80">
                    {t("three_hundred_forty_seven")}
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Background Video */}
            <video
              className="w-full h-full object-cover top-0 left-0 absolute z-0"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              src="/videos/05.mp4"
            />
          </Card>
        </div>
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
