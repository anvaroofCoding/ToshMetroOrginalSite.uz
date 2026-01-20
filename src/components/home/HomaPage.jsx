"use client";
import { useHeaderImageQuery } from "@/store/services/api";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ImagesSlider } from "../ui/images-slider";

export default function HomePage() {
  const t = useTranslations("menu");
  const { data, isLoading } = useHeaderImageQuery();

  const images = data?.main_page;
  return (
    <ImagesSlider className="h-screen " images={images} loading={isLoading}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-blue-50 to-blue-400 py-4">
          {t("logo1")} <br /> {t("logo2")} {t("logo3")}
        </motion.p>
        <button
          className="px-4 py-2 backdrop-blur-sm border bg-blue-300/10 border-blue-500/20 text-white mx-auto text-center rounded-full relative mt-4"
          onClick={() => {
            window.location.href = "/metro-tarixi";
          }}
        >
          <span>{t("aboutMetro")} →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
