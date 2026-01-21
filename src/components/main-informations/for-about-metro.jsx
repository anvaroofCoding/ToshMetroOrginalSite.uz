import { Button } from "@/components/ui/button";
import { useVideoQuery } from "@/store/services/api";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, TrainFront, Users2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { AnimatedCounter } from "../animated-counter";

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function MetroInfoSection() {
  const { data, isLoading } = useVideoQuery();
  const t = useTranslations("menu");
  const [videoError, setVideoError] = useState(false);

  const stats = [
    { label: t("stations"), value: 50, icon: <TrainFront size={20} /> },
    { label: t("routes"), value: 4, icon: <BarChart3 size={20} /> },
    {
      label: t("dailyPassengers"),
      value: 1000000,
      icon: <Users2 size={20} />,
    },
  ];

  if (isLoading) {
    return (
      <motion.div
        className="lg:col-span-2 relative rounded-3xl shadow-2xl min-h-[320px] lg:min-h-[420px] overflow-hidden group"
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-6 text-center h-full">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            variants={fadeIn}
            custom={0.1}
          >
            {t("aboutMetros")}
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base lg:text-sm opacity-90 max-w-2xl mx-auto mb-8"
            variants={fadeIn}
            custom={0.2}
          >
            {t("aboutText")}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-3  w-full gap-6 w-full  mb-8"
            variants={fadeIn}
            custom={0.3}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center  flex flex-col items-center justify-center group cursor-default hover:scale-105 transition-transform"
              >
                <div className="flex justify-center items-center gap-1 mb-2 text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.value} />
                </div>
                <div className="text-xs sm:text-sm lg:text-base opacity-80 font-medium ">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={fadeIn} custom={0.4}>
            <Link href="/metro-tarixi">
              <Button
                className="gap-2 text-white bg-blue-600 hover:bg-blue-700 shadow-lg"
                size="lg"
              >
                {t("readMore")} <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="lg:col-span-2 relative rounded-3xl shadow-2xl min-h-[320px] lg:min-h-[420px] overflow-hidden group"
      initial="hidden"
      animate="visible"
    >
      {/* Background Video or Fallback */}
      {!videoError ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source src={data[0]?.file || ""} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-indigo-900" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-white p-6 text-center h-full">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          variants={fadeIn}
          custom={0.1}
        >
          {t("aboutMetros")}
        </motion.h2>

        <motion.p
          className="text-sm sm:text-base lg:text-sm opacity-90 max-w-2xl mx-auto mb-8"
          variants={fadeIn}
          custom={0.2}
        >
          {t("aboutText")}
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-3  w-full gap-6 w-full  mb-8"
          variants={fadeIn}
          custom={0.3}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center  flex flex-col items-center justify-center group cursor-default hover:scale-105 transition-transform"
            >
              <div className="flex justify-center items-center gap-1 mb-2 text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                <AnimatedCounter end={stat.value} />
              </div>
              <div className="text-xs sm:text-sm lg:text-base opacity-80 font-medium ">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={fadeIn} custom={0.4}>
          <Link href="/metro-tarixi">
            <Button
              className="gap-2 text-white bg-blue-600 hover:bg-blue-700 shadow-lg"
              size="lg"
            >
              {t("readMore")} <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
