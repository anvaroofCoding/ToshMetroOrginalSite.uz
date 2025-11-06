"use client";

import { useEffect, useRef } from "react";
import {
  Smartphone,
  Zap,
  CheckCircle,
  Download,
  LogIn,
  Plus,
  Scan,
  Wallet,
  MoveRight,
  ScanFace,
} from "lucide-react";
import BiometrikVideo from "../BiometrikVideo";
import { useTranslations } from "next-intl";

function Facepay() {
  const observerRef = useRef(null);
  const t = useTranslations("menu");
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);
  const steps = [
    {
      icon: Download,
      title: t("thirteen"),
      description: t("fourteen"),
      image: "https://www.atto.uz/image/step1.png",
    },
    {
      icon: LogIn,
      title: t("fifteen"),
      description: t("sixteen"),
      image: "https://www.atto.uz/image/step2.png",
    },
    {
      icon: Plus,
      title: t("seventeen"),
      description: t("eighteen"),
      image: "https://www.atto.uz/image/step3.png",
    },
    {
      icon: ScanFace,
      title: t("forty_two"),
      description: t("forty_three"),
      image: "https://www.atto.uz/image/step4.png",
    },
  ];
  const usageSteps = [
    {
      icon: CheckCircle,
      title: t("forty_four"),
    },
    {
      icon: Wallet,
      title: t("forty_five"),
    },
    {
      icon: ScanFace,
      title: t("forty_six"),
    },
    {
      icon: Scan,
      title: t("forty_seven"),
    },
    {
      icon: Zap,
      title: t("forty_eight"),
    },
    {
      icon: MoveRight,
      title: t("forty_nine"),
    },
  ];

  return (
    <div className="min-h-screen  ">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-blue-900/10 rounded-full border border-blue-900/20">
              <ScanFace className="w-5 h-5 text-blue-900" />
              <span className="text-blue-900 font-medium">{t("fifty")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-8 leading-tight">
              {t("fifty_one")}
            </h1>
            <div className=" flex justify-center items-center py-10">
              <img
                src="https://www.atto.uz/image/person.png"
                alt="FacePay Hero"
                className="w-full max-w-md"
              />
            </div>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-4">
                {t("fifty_two")}
              </h2>
              <p className="text-lg text-blue-800/80 leading-relaxed">
                {t("fifty_three")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is PalmPay Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                {t("fifty_four")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-blue-800/90 leading-relaxed">
                  {t("fifty_five")}
                </p>
                <p className="text-lg text-blue-800/90 leading-relaxed">
                  {t("fifty_six")}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3 p-4 bg-blue-900/5 rounded-xl border border-blue-900/10">
                    <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0" />
                    <span className="text-blue-900 font-medium">
                      {t("fifty_seven")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-900/5 rounded-xl border border-blue-900/10">
                    <Smartphone className="w-6 h-6 text-blue-900 flex-shrink-0" />
                    <span className="text-blue-900 font-medium">
                      {t("fifty_eight")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://habrastorage.org/r/w780/getpro/habr/upload_files/d70/685/d6f/d70685d6fc1580d42a9a88930850e209.jpg"
                  alt="Hand payment"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-900/10 to-transparent rounded-2xl blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Connect Section */}
      <section className="py-20 px-4 ">
        <div className="container mx-auto max-w-6xl">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                {t("fifty_nine")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-900/10 hover:border-blue-900/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-900 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">
                      {step.title}
                    </h3>
                    <p className="text-blue-800/80 text-center mb-6">
                      {step.description}
                    </p>
                    <div className="relative rounded-xl">
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={`Step ${index + 1}`}
                        className="w-full h-68 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Steps */}
      <section className="py-20 px-4 ">
        <div className="container mx-auto max-w-6xl">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                {t("sixty")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usageSteps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-900/10 hover:border-blue-900/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-900/10 rounded-xl mb-4 mx-auto group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                      <step.icon className="w-6 h-6 text-blue-900 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-blue-800/90 text-center leading-relaxed">
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(2rem);
          transition: all 1s ease-out;
        }

        .fade-in.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <BiometrikVideo />
    </div>
  );
}

export default Facepay;
