"use client";

import { useEffect, useRef } from "react";
import {
  Smartphone,
  Hand,
  CreditCard,
  Zap,
  CheckCircle,
  Download,
  LogIn,
  Plus,
  MapPin,
  Camera,
  QrCode,
  Scan,
  Wallet,
  ArrowRight,
  Star,
  Nfc,
} from "lucide-react";

function PalmpayPayments() {
  const observerRef = useRef(null);

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
      title: "ATTO mobil ilovasini yuklab oling",
      description: "Ilovani GooglePlay va AppStore dan yuklab olishing",
      image: "https://www.atto.uz/image/step1.png",
    },
    {
      icon: LogIn,
      title: "Ilovada avtorizasiyadan oʻting",
      description: "Telefon raqamingizni va parolni kiriting",
      image: "https://www.atto.uz/image/step2.png",
    },
    {
      icon: Plus,
      title: "Transport kartasini qoʻshing",
      description: "Yoki bepul virtual karta oching",
      image: "https://www.atto.uz/image/step3.png",
    },
  ];

  const activationSteps = [
    {
      icon: MapPin,
      title:
        "Xalqlar doʻstligi metro bekatidagi roʻyxatdan oʻtish stoliga boring.",
    },
    {
      icon: Camera,
      title:
        "Stol yaqinidagi hamkorlarimiz sizdan kaftingizni suratga oluvchi maxsus qurilma ustiga qoʻyishingizni soʻrashadi. Qoʻlingizni toʻgʻri tuting va uni qurilmadan 15 sm balandlikda ushlab turing.",
    },
    {
      icon: Hand,
      title:
        "Avval oʻng qoʻlingizni, soʻng chap qoʻlingizni qoʻying. Shundan soʻng ekranda QR kod paydo boʻladi.",
    },
    {
      icon: QrCode,
      title:
        'ATTO mobil ilovasi yordamida QR kodni skanerlang. Ilovaning bosh ekranida "PalmPay ni faollashtirish" tugmasini bosing, soʻng "QR kodni skanerlash" tugmasini bosing.',
    },
  ];

  const usageSteps = [
    {
      icon: CheckCircle,
      title: "ATTO ilovasida PalmPayning ishga tushirilganini tekshiring.",
    },
    {
      icon: Wallet,
      title:
        "Turniketdan oʻtishdan oldin, bogʻlangan transport kartasida toʻlov uchun etarli mablagʻ borligiga ishonch hosil qiling. Qoʻlingizni qurilmadan 15 sm balandlikda ushlab turing.",
    },
    {
      icon: Hand,
      title:
        "Turniketdan oʻtishdan oldin qoʻlqopni eching, kaftingiz yopmaydigan qilish uchun kiyim yengini yuqoriga torting.",
    },
    {
      icon: Scan,
      title: "Maxsus qurilma oʻrnatilgan turniketga yaqinlashing",
    },
    {
      icon: Zap,
      title:
        "Skaner ustiga kaftingizni tuting, yashil signal va eshiklarning ochilishini kuting",
    },
    {
      icon: CreditCard,
      title:
        "Toʻlov miqdori biroz vaqt oʻtib bogʻlangan transport kartasidan yechiladi.",
    },
    {
      icon: Star,
      title: "Metroga oʻting va xayrli sayohat!",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10">
        <div className="absolute"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-blue-900/10 rounded-full border border-blue-900/20">
              <Nfc className="w-5 h-5 text-blue-900" />
              <span className="text-blue-900 font-medium">
                Biometrik to'lov
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-8 leading-tight">
              PalmPay
            </h1>
            <div className="relative inline-block mb-12">
              <img
                src="https://www.atto.uz/image/hand.png"
                alt="Hand scanner"
                className="w-64 h-64 object-contain mx-auto animate-pulse"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-900/20 to-transparent rounded-full blur-xl"></div>
            </div>
            {/* Optimized PalmPay Video */}
            <div className="w-full container flex justify-center items-center">
              <video
                controls
                muted
                className="rounded-2xl"
                src="/videos/IMG_4247.MOV"
                width={300}
              ></video>
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
                PalmPay nima?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-blue-800/90 leading-relaxed">
                  Bu yo'l haqi uchun toʻlovlar butunlay kontaktsiz, innovasion
                  usuli. Endi siz bank kartasini olib yurish yoki hamyondan
                  chiqarish haqida oʻylashingiz shart emas, chunki qoʻlingiz
                  doim siz bilan.
                </p>
                <p className="text-lg text-blue-800/90 leading-relaxed">
                  Biometrik toʻlov xizmati barcha yoʻlovchilar uchun majburiy
                  boʻlmaydi – boshqa barcha toʻlov usullari ham ishlab turishi
                  davom etadi.
                </p>
                <p className="text-lg text-blue-800/90 leading-relaxed">
                  Kaft bilan toʻlov qilish juda oson: turniketga oʻrnatilgan
                  qurilma ustiga istalgan kaftingizni tutib turing. Eshiklar
                  ochiladi va toʻlov miqdori bogʻlangan transport kartasidan
                  chegiriladi.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3 p-4 bg-blue-900/5 rounded-xl border border-blue-900/10">
                    <CheckCircle className="w-6 h-6 text-blue-900 flex-shrink-0" />
                    <span className="text-blue-900 font-medium">
                      Barcha metro bekatlarida mavjud
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-900/5 rounded-xl border border-blue-900/10">
                    <Smartphone className="w-6 h-6 text-blue-900 flex-shrink-0" />
                    <span className="text-blue-900 font-medium">
                      Smartfon va kartasiz to'lov
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://www.atto.uz/image/handPay.png"
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                PalmPayni qanday ulash kerak
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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

      {/* Activation Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                Palm to'lovini faollashtirish
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-8">
              {activationSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 p-6 bg-white/30 backdrop-blur-sm rounded-2xl border border-blue-900/10 hover:border-blue-900/20 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                    <step.icon className="w-8 h-8 text-blue-900 flex-shrink-0" />
                    <p className="text-blue-800/90 leading-relaxed">
                      {step.title}
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-900/50 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                PalmPay dan qanday foydalanish mumkin
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
    </div>
  );
}

export default PalmpayPayments;
