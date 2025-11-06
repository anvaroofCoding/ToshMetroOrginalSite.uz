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
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
export default function OptimizedMetroRegulations() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef([]);
  const timelineRef = useRef(null);
  const t = useTranslations("menu");
  const allSections = useMemo(
    () => [
      {
        id: 1,
        number: "1",
        title: t("sixty_one"),
        icon: <Home className="w-5 h-5" />,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        content: t("sixty_two"),
      },
      {
        id: 2,
        number: "2",
        title: t("sixty_three"),
        icon: <FileText className="w-5 h-5" />,
        color: "from-indigo-500 to-indigo-600",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
        content: t("sixty_four"),
        definitions: [
          t("sixty_five"),
          t("sixty_six"),
          t("sixty_seven"),
          t("sixty_eight"),
          t("sixty_nine"),
        ],
      },
      {
        id: 3,
        number: "3",
        title: t("seventy"),
        icon: <CheckCircle className="w-5 h-5" />,
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        content: t("seventy_one"),
      },
      {
        id: 4,
        number: "4",
        title: t("seventy_two"),
        icon: <Shield className="w-5 h-5" />,
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        content: t("seventy_three"),
      },
      {
        id: 5,
        number: "5",
        title: t("seventy_four"),
        icon: <Shield className="w-5 h-5" />,
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        content: t("seventy_five"),
      },
      {
        id: 6,
        number: "6",
        title: t("seventy_six"),
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        content: t("seventy_seven"),
      },
      {
        id: 7,
        number: "7",
        title: t("seventy_eight"),
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "from-red-600 to-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-300",
        content: t("seventy_nine"),
      },
      {
        id: 8,
        number: "8",
        title: t("eighty"),
        icon: <Shield className="w-5 h-5" />,
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        content: t("eighty_one"),
      },
      {
        id: 9,
        number: "13",
        title: t("eighty_two"),
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "from-yellow-500 to-orange-500",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        content: t("eighty_three"),
      },
      {
        id: 10,
        number: "14",
        title: t("eighty_four"),
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "from-orange-600 to-red-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-300",
        content: t("eighty_five"),
      },
      {
        id: 11,
        number: "15",
        title: t("eighty_six"),
        icon: <Shield className="w-5 h-5" />,
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        content: t("eighty_seven"),
      },
      {
        id: 12,
        number: "16",
        title: t("eighty_eight"),
        icon: <Users className="w-5 h-5" />,
        color: "from-green-500 to-teal-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        content: t("eighty_nine"),
        rights: [
          t("ninety"),
          t("ninety_one"),
          t("ninety_two"),
          t("ninety_three"),
          t("ninety_four"),
        ],
      },
      {
        id: 13,
        number: "17",
        title: t("ninety_five"),
        icon: <Users className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        content: t("ninety_six"),
        obligations: [
          t("ninety_seven"),
          t("ninety_eight"),
          t("ninety_nine"),
          t("one_hundred"),
          t("one_hundred_one"),
        ],
      },
      {
        id: 14,
        number: "18",
        title: t("one_hundred_two"),
        icon: <UserCheck className="w-5 h-5" />,
        color: "from-purple-500 to-indigo-500",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        content: t("one_hundred_three"),
        rights: [
          t("one_hundred_four"),
          t("one_hundred_five"),
          t("one_hundred_six"),
          t("one_hundred_seven"),
        ],
      },
      {
        id: 15,
        number: "19",
        title: t("one_hundred_eight"),
        icon: <UserCheck className="w-5 h-5" />,
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
        content: t("one_hundred_nine"),
        obligations: [
          t("one_hundred_ten"),
          t("one_hundred_eleven"),
          t("one_hundred_twelve"),
          t("one_hundred_thirteen"),
          t("one_hundred_fourteen"),
        ],
      },
      {
        id: 16,
        number: "20",
        title: t("one_hundred_fifteen"),
        icon: <FileText className="w-5 h-5" />,
        color: "from-slate-500 to-gray-600",
        bgColor: "bg-slate-50",
        borderColor: "border-slate-200",
        content: t("one_hundred_sixteen"),
      },
      {
        id: 17,
        number: "21",
        title: t("one_hundred_seventeen"),
        icon: <Scale className="w-5 h-5" />,
        color: "from-gray-500 to-slate-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        content: t("one_hundred_eighteen"),
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
              {t("one_hundred_nineteen")}
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-medium">
              {t("one_hundred_twenty")}
            </p>
            <div className="flex items-center justify-center gap-3 text-gray-500">
              <Scale className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{t("one_hundred_twenty_one")}</span>
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
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 z-20 hidden lg:block">
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
                            {section.number}
                            {t("one_hundred_twenty_two")}
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
                              {t("one_hundred_twenty_three")}
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
                              {t("one_hundred_twenty_four")}
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
                              {t("one_hundred_twenty_five")}
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
              {t("one_hundred_twenty_six")}
            </p>
          </div>
          <p className="text-gray-600">
            {t("one_hundred_twenty_seven")}
            <a
              href="https://lex.uz/uz/docs/-6631523"
              className="text-blue-900"
              target="_blank"
            >
              {t("one_hundred_twenty_eight")}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
