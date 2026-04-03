"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

const GanderCountry = () => {
  const t = useTranslations("menu");
  return (
    <div className="bg-transparent min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Main Heading */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-8 text-center leading-tight">
          {t("four_hundred_eighty_five")}
        </h1>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 lg:h-150 mb-8 rounded-lg overflow-hidden ">
          <Image
            src="https://mintrans.uz/uploads/files/1287_1706710640.jpg?1707110135555"
            alt="Gender tenglik strategiyasi"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>

        {/* Quote Section */}
        <blockquote className="bg-blue-50 border-l-4 border-blue-900 p-6 mb-8 rounded-r-lg">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-blue-900 mb-4 leading-relaxed">
            {t("four_hundred_eighty_six")}
          </h2>
        </blockquote>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
            <span className="font-semibold text-blue-900">
              {t("four_hundred_eighty_seven")}
            </span>{" "}
            {t("four_hundred_eighty_eight")}
          </p>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
            {t("four_hundred_eighty_nine")}
          </p>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
            {t("four_hundred_ninety")}
          </p>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
            {t("four_hundred_ninety_one")}
          </p>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-8">
            {t("four_hundred_ninety_two")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GanderCountry;
