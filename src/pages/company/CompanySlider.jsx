"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

export default function CompanySlider() {
  const t = useTranslations("menu");
  const x = useMotionValue(0);

  const [isHovered, setIsHovered] = useState(false);
  const [cardWidth, setCardWidth] = useState(280);
  const animationRef = useRef(null);

  const companies = [
    {
      name: "company1_name",
      logo: "/ForSliderImage/hukumat.png",
      desc: "gov.uz",
      link: "https://gov.uz/uz",
    },
    {
      name: "company2_name",
      logo: "/ForSliderImage/senat.png",
      desc: "www.senat.uz",
      link: "https://senat.uz/",
    },
    {
      name: "company3_name",
      logo: "/ForSliderImage/prezident.png",
      desc: "www.president.uz",
      link: "https://president.uz/uz",
    },
    {
      name: "company4_name",
      logo: "/ForSliderImage/mintrans.png",
      desc: "mintrans.uz",
      link: "https://www.mintrans.uz/",
    },
  ];

  // ✅ Card width responsiveness
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) setCardWidth(200);
      else if (window.innerWidth < 768) setCardWidth(240);
      else setCardWidth(280);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // ✅ Infinite loop uchun duplication
  const duplicatedCompanies = [...companies, ...companies, ...companies];

  // ✅ Total width calculation fix
  const totalWidth = useMemo(() => {
    return duplicatedCompanies.length * (cardWidth + 24);
  }, [cardWidth, duplicatedCompanies.length]);

  // ✅ Loop Animation
  const loopScroll = () => {
    const current = x.get();
    const next = current - 1;

    x.set(next >= -totalWidth / 2 ? next : 0);

    animationRef.current = requestAnimationFrame(loopScroll);
  };

  const startAnimation = () => {
    stopAnimation();
    animationRef.current = requestAnimationFrame(loopScroll);
  };

  const stopAnimation = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  useEffect(() => {
    if (!isHovered) startAnimation();
    else stopAnimation();

    return () => stopAnimation();
  }, [isHovered, cardWidth]);

  // ✅ Manual Slide Buttonlari
  const handleShift = (direction) => {
    const currentX = x.get();
    const shiftAmount = direction * (cardWidth + 24) * 2;

    stopAnimation();
    animate(x, currentX + shiftAmount, {
      duration: 0.6,
      ease: "easeInOut",
    }).then(() => {
      if (!isHovered) startAnimation();
    });
  };

  return (
    <div className="relative overflow-hidden mt-10">
      <div className=" mx-auto">
        <div className="container flex justify-between items-center mb-6 pb-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900">
            {t("useful_links_uz")}
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => handleShift(1)}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleShift(-1)}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden py-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div className="flex gap-6" style={{ x }}>
            {duplicatedCompanies.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-blue-400/10 border border-blue-900/20 rounded-xl p-4 sm:p-6 
                transition-all duration-300 hover:shadow-xl"
                style={{ width: cardWidth }}
              >
                <div className="flex flex-col items-center h-full text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-lg">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    {t(company.name)}
                  </h3>

                  <a
                    href={company.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm font-medium hover:underline mt-auto"
                  >
                    {company.desc}
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
