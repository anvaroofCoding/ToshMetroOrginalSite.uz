"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Home,
  Scale,
  Shield,
  Train,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";

export default function OptimizedMetroRegulations() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef([]);
  const timelineRef = useRef(null);

  const allSections = useMemo(
    () => [
      {
        id: 1,
        number: "1",
        title: "Umumiy qoidalar - 1-bob",
        icon: <Home className="w-5 h-5" />,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        content:
          "Ushbu qoidalar metropolitenda yo'lovchilar hamda boshqa shaxslarning (metropoliten xodimlari, metropolitenda o'z xizmat vazifasini bajaruvchi ichki ishlar organlari va O'zbekiston Respublikasi Favqulodda vaziyatlar vazirligi xodimlari hamda metropoliten rahbariyatining ruxsati bilan tashrif buyuruvchi shaxslar) bo'lishi, ularning huquq va majburiyatlarini, shuningdek, metropolitendan foydalanish tartibini belgilaydi.",
      },
      {
        id: 2,
        number: "2",
        title: "Asosiy tushunchalar",
        icon: <FileText className="w-5 h-5" />,
        color: "from-indigo-500 to-indigo-600",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
        content:
          "Ushbu qoidalarda quyidagi asosiy tushunchalardan foydalaniladi:",
        definitions: [
          "bekat platformasi — bekatdagi poyezdlarni kutish joyi;",
          "yo'l chiptasi — metropolitendan foydalanish uchun QR-kodli bir martalik yo'l haqi to'lovi amalga oshirilganligini tasdiqlovchi hujjat;",
          "yo'lovchi — metropolitendan foydalanish uchun to'lovni amalga oshirgan yoki imtiyozga hamda bepul yurish huquqiga ega bo'lgan shaxs (iste'molchi);",
          "ko'zdan kechirish — metropolitenda xavfsizlikni ta'minlash maqsadida tashish va foydalanish taqiqlangan moddalar va buyumlarni aniqlash uchun mo'ljallangan, maxsus texnik vositalarni qo'llagan holda amalga oshiriladigan tadbirlar majmui;",
          "metropoliten xodimi — metropolitenda faoliyat olib boruvchi va yo'lovchilarga xizmat ko'rsatuvchi xodim (bekat navbatchisi, mashinist va boshqalar);",
        ],
      },
      {
        id: 3,
        number: "3",
        title: "Shartnoma tasdiqlanishi",
        icon: <CheckCircle className="w-5 h-5" />,
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        content:
          "Metropolitenda yo'lovchining bo'lishi va uning yukini tashish shartnomasi tuzilganligi yo'l chiptasi orqali yoki imtiyozga hamda bepul yurish huquqiga ega bo'lgan shaxslarning tegishli hujjatini ko'rsatishi bilan tasdiqlanadi.",
      },
      {
        id: 4,
        number: "4",
        title: "Xavfsiz harakatlanish",
        icon: <Shield className="w-5 h-5" />,
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        content:
          "Metropolitenda yo'lovchilarning xavfsiz va qulay harakatlanishi ta'minlanadi.",
      },
      {
        id: 5,
        number: "5",
        title: "Xavfsizlik talablari - 2-bob",
        icon: <Shield className="w-5 h-5" />,
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        content:
          "Metropolitenda harakatlanish davomida metropoliten xodimlari va yo'lovchilar ogoh, hushyor va e'tiborli bo'lishi lozim.",
      },
      {
        id: 6,
        number: "6",
        title: "Shubhali ashyolar haqida xabar berish",
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        content:
          "O'tish yo'llari, vestibyullar, bekat platformasi va vagonlarda shubhali va qoldirilgan ashyolar (buyumlar) aniqlanganda, metropolitenning navbatchi xodimlariga yoki ichki ishlar organlari xodimlariga xabar berilishi lozim.",
      },
      {
        id: 7,
        number: "7",
        title: "Qoldirilgan ashyolarga ta'sir qilish taqiqi",
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "from-red-600 to-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-300",
        content:
          "Qoldirilgan ashyoga (buyumga) biron-bir mexanik ta'sir ko'rsatish (boshqa joyga olib o'tish, ochish va boshqalar), uning atrofidagi yorug'likni, haroratni va tovushni o'zgartirish hamda ashyo yaqinida radioelektr uskunalaridan, shuningdek, aloqa vositalaridan foydalanish qat'iyan man etiladi.",
      },
      {
        id: 8,
        number: "8",
        title: "Ko'zdan kechirish tartibi",
        icon: <Shield className="w-5 h-5" />,
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        content:
          "Yo'lovchilar va boshqa shaxslar ichki ishlar organlari xodimlarining qonuniy talabiga asosan yuklarini ko'zdan kechirish uchun taqdim etadi. Bunda qidiruvdagi shaxslar deb gumon qilingan yoki ko'zdan kechirish jarayonida o'zini shubhali tutayotgan shaxslar qonunchilikda belgilangan tartibda shaxsiy ko'zdan kechirilishi mumkin.",
      },
      {
        id: 9,
        number: "13",
        title: "Favqulodda vaziyatlar - 3-bob",
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        content:
          "Yo'lovchilarning hayoti va sog'lig'i uchun xavf tug'diradigan favqulodda vaziyatlar yuz berganda, ular bekatdan tashqariga yoki poyezdda qo'shni bekatga evakuatsiya qilinadilar, shuningdek, metropoliten xodimlarining ko'rsatmalari bo'yicha harakatlanadilar.",
      },
      {
        id: 10,
        number: "14",
        title: "Texnik nosozliklar",
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "from-orange-600 to-red-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-300",
        content:
          "Poyezd yoki boshqa texnik qurilmalarda nosozlik yuz berganda, vaziyatdan kelib chiqqan holda yo'lovchilar poyezdlarda bir yo'ldan ikki tomonlama harakatlanish yo'li bilan bekatlarga yetkaziladi.",
      },
      {
        id: 11,
        number: "15",
        title: "Xavfsiz evakuatsiya",
        icon: <Shield className="w-5 h-5" />,
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        content:
          "Bekatlar yoki yer usti yo'llari oralig'idagi harakat xavfsizligiga ta'sir etuvchi texnik vositalarda nosozliklar yuz berganda, metropoliten xodimlari tomonidan yo'lovchilarni tonnel va estakada orqali xavfsiz evakuatsiya qilish choralari ko'riladi.",
      },
      {
        id: 12,
        number: "16",
        title: "Yo'lovchilar huquqlari - 4-bob",
        icon: <Users className="w-5 h-5" />,
        color: "from-green-500 to-teal-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        content:
          "Yo'lovchilar metropolitendan foydalanishda quyidagi huquqlarga ega:",
        rights: [
          "o'zlari bilan birgalikda yetti yoshgacha bo'lgan bolalarini, bolalar va nogironligi bo'lgan shaxslar aravachalarini bepul olib yurish;",
          "nogironligi bo'lgan va imkoniyati cheklangan shaxslar tomonidan metropolitenning texnik vositalaridan foydalanish;",
          "bekatlarni havaskorlik foto va videotasvirga olish;",
          "bekatlarda joylashgan tibbiy punktlar yordamidan foydalanish;",
          "telefon va aloqa vositalaridan foydalanish;",
        ],
      },
      {
        id: 13,
        number: "17",
        title: "Yo'lovchilar majburiyatlari",
        icon: <Users className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        content:
          "Yo'lovchilar metropolitendan foydalanishda quyidagi majburiyatlarga ega:",
        obligations: [
          "jamoat tartibi, sanitariya-gigiyena normalari va qoidalariga rioya qilishi;",
          "qonunchilik hujjatlariga muvofiq yo'lkira haqini to'lashi;",
          "o'tish punktlariga yaqinlashganda yo'l chiptasini tayyorlashi;",
          "eskalatorda xavfsizlik qoidalariga rioya qilishi;",
          "favqulodda vaziyatlar haqida darhol xabar berishi;",
        ],
      },
      {
        id: 14,
        number: "18",
        title: "Xodimlar huquqlari - 5-bob",
        icon: <UserCheck className="w-5 h-5" />,
        color: "from-purple-500 to-indigo-500",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        content: "Metropoliten xodimlari quyidagi huquqlarga ega:",
        rights: [
          "metropolitenda bepul yurish huquqini beruvchi barcha hujjatlarni tekshirish;",
          "zaruratga ko'ra yo'lovchilarga yordam ko'rsatish;",
          "yo'lovchilardan metropoliten jihozlariga zarar yetkazmaslikni talab qilish;",
          "xizmat vazifalarini o'tayotgan vaqtida metropolitendan bepul foydalanish;",
        ],
      },
      {
        id: 15,
        number: "19",
        title: "Xodimlar majburiyatlari",
        icon: <UserCheck className="w-5 h-5" />,
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
        content: "Metropoliten xodimlari quyidagi majburiyatlarga ega:",
        obligations: [
          "metropoliten poyezdlarini kutib olishi va jo'natishni ta'minlashi;",
          "poyezdlar harakati jadvaliga rioya qilinishini ta'minlashi;",
          "xizmat vaqtida joriy qilingan formali kiyim-boshda bo'lishi;",
          "yo'lovchilarga ehtiyotkor va e'tiborli bo'lish to'g'risida xabar berishi;",
          "favqulodda vaziyatlarda evakuatsiya ishlarini tashkil etishi;",
        ],
      },
      {
        id: 16,
        number: "20",
        title: "Yakunlovchi qoidalar - 6-bob",
        icon: <FileText className="w-5 h-5" />,
        color: "from-slate-500 to-gray-600",
        bgColor: "bg-slate-50",
        borderColor: "border-slate-200",
        content:
          "Mazkur qoidalar talablarini qo'llashda yuzaga keladigan nizolar qonunchilik hujjatlarida belgilangan tartibda hal etiladi.",
      },
      {
        id: 17,
        number: "21",
        title: "Javobgarlik",
        icon: <Scale className="w-5 h-5" />,
        color: "from-gray-500 to-slate-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        content:
          "Ushbu qoidalar talablarining buzilishida aybdor bo'lgan shaxslar qonunchilik hujjatlarida belgilangan tartibda javobgar bo'ladi.",
      },
    ],
    []
  );

  const handleObserver = useCallback(
    (entries) => {
      const newVisibleSections = new Set(visibleSections);

      entries.forEach((entry) => {
        const sectionId = Number.parseInt(
          entry.target.getAttribute("data-section-id") || "0"
        );
        if (entry.isIntersecting) {
          newVisibleSections.add(sectionId);
        }
      });

      setVisibleSections(newVisibleSections);
    },
    [visibleSections]
  );

  const handleScroll = useCallback(() => {
    if (timelineRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.3,
      rootMargin: "-20% 0px -20% 0px",
    });

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleObserver, handleScroll]);

  return (
    <div className="min-h-screen ">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="relative ">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
                <Train className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              Metropolitendan foydalanish qoidalari
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-medium">
              O'zbekiston Respublikasi Vazirlar Mahkamasi
            </p>
            <div className="flex items-center justify-center gap-3 text-gray-500">
              <Scale className="w-5 h-5 text-blue-500" />
              <span className="font-medium">
                2023-yil 10-oktabr, 535-son qarori
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Timeline */}
      <div
        ref={timelineRef}
        className="relative container mx-auto px-4 py-20 overflow-hidden "
      >
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200 h-full" />

        {/* Sections */}
        <div className="space-y-16">
          {allSections.map((section, index) => (
            <div
              key={section.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              data-section-id={section.id}
              className={`relative transition-all duration-700 ease-out ${
                visibleSections.has(section.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                    visibleSections.has(section.id)
                      ? `bg-gradient-to-r ${section.color} scale-110 shadow-xl`
                      : "bg-gray-300 scale-100"
                  }`}
                >
                  <span className="text-white font-bold text-sm">
                    {section.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className={`flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-full max-w-xl ${
                    index % 2 === 0 ? "pr-12" : "pl-12"
                  }`}
                >
                  <Card
                    className={`shadow-lg border-0 overflow-hidden transition-all duration-500 hover:shadow-xl ${section.bgColor} ${section.borderColor} border-l-4`}
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`p-2.5 rounded-lg bg-gradient-to-r ${section.color} text-white shadow-md`}
                        >
                          {section.icon}
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className="mb-1 text-xs font-semibold border-current"
                          >
                            {section.number}-modda
                          </Badge>
                          <h2 className="text-lg font-bold text-gray-900 leading-tight">
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          {section.content}
                        </p>

                        {/* Definitions */}
                        {section.definitions && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-indigo-700 text-sm flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Asosiy tushunchalar:
                            </h4>
                            <div className="space-y-2">
                              {section.definitions.map((def, defIndex) => (
                                <div
                                  key={defIndex}
                                  className="p-3 bg-white/70 rounded-lg border border-indigo-100 text-sm"
                                >
                                  {def}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Rights */}
                        {section.rights && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-green-700 text-sm flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Huquqlar:
                            </h4>
                            <div className="space-y-2">
                              {section.rights.map((right, rightIndex) => (
                                <div
                                  key={rightIndex}
                                  className="flex items-start gap-2 p-3 bg-white/70 rounded-lg border border-green-100 text-sm"
                                >
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                  <span>{right}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Obligations */}
                        {section.obligations && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-orange-700 text-sm flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              Majburiyatlar:
                            </h4>
                            <div className="space-y-2">
                              {section.obligations.map(
                                (obligation, obligationIndex) => (
                                  <div
                                    key={obligationIndex}
                                    className="flex items-start gap-2 p-3 bg-white/70 rounded-lg border border-orange-100 text-sm"
                                  >
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                    <span>{obligation}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Progress */}
                      <div className="mt-4 pt-4 border-t border-gray-200/50">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>
                            {index + 1} / {allSections.length}
                          </span>
                          <div className="flex-1 mx-2">
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div
                                className={`h-1 rounded-full bg-gradient-to-r ${section.color} transition-all duration-700`}
                                style={{
                                  width: visibleSections.has(section.id)
                                    ? "100%"
                                    : "0%",
                                }}
                              />
                            </div>
                          </div>
                          {visibleSections.has(section.id) && (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className=" py-15">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Train className="w-5 h-5 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-900">
              © 2023 O'zbekiston Respublikasi Vazirlar Mahkamasi
            </p>
          </div>
          <p className="text-gray-600">
            Qonunchilik ma'lumotlari milliy bazasi, 11.10.2023-y.
            <a
              href="https://lex.uz/uz/docs/-6631523"
              className="text-blue-900"
              target="_blank"
            >
              {" "}
              09/23/535/0766-son
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
