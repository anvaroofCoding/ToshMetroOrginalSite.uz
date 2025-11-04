"use client";
import React from "react";
import { Carousel, Button } from "antd";
import { motion } from "framer-motion";

export default function PromoPage() {
  return (
    <div className="space-y-12 p-6 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white shadow-lg overflow-hidden flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-2/3 space-y-4">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Toshkent Metropoliteni yangiliklari
          </h1>
          <p className="text-lg opacity-90">
            Endi oylik statistika va foydali e’lonlarni bir joyda kuzatishingiz
            mumkin.
          </p>
          <Button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl hover:shadow-md transition">
            Batafsil
          </Button>
        </div>
        <div className="lg:w-1/3 mt-6 lg:mt-0 flex justify-center">
          <img
            src="/promo-metro.png"
            alt="Metro Illustration"
            className="w-60 lg:w-80 opacity-80"
          />
        </div>
      </div>

      {/* Carousel Section */}
      <Carousel
        autoplay
        dotPosition="bottom"
        className="rounded-3xl overflow-hidden shadow-lg"
      >
        {[
          {
            color: "bg-blue-400",
            text: "Yangilik 1: ATTO karta yangilanishi!",
          },
          {
            color: "bg-purple-500",
            text: "Yangilik 2: Oylik yo‘lovchi statistikasi",
          },
          {
            color: "bg-green-500",
            text: "Yangilik 3: Mobil ilovani yuklab oling",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`${item.color} h-64 flex items-center justify-center text-white text-xl font-bold`}
          >
            {item.text}
          </div>
        ))}
      </Carousel>

      {/* Promo Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Yangilik 1",
            desc: "ATTO karta bilan qulay sayohat qiling!",
          },
          {
            title: "Yangilik 2",
            desc: "Oylik yo‘lovchi statistikasi endi interaktiv!",
          },
          {
            title: "Yangilik 3",
            desc: "Mobil ilovamizni yuklab oling va foydali imkoniyatlardan bahramand bo‘ling.",
          },
          {
            title: "Yangilik 4",
            desc: "Metropoliten xizmatlarini kuzating va yangiliklardan xabardor bo‘ling.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
            <Button
              type="link"
              className="mt-3 text-blue-600 font-semibold p-0"
            >
              Batafsil →
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Animated Promo Banner */}
      <motion.div
        className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 text-white flex items-center justify-between shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <h2 className="text-2xl font-bold mb-1">Yangi xizmatlar!</h2>
          <p className="opacity-90">
            Endi yo‘lovchilar uchun qulay interaktiv imkoniyatlar mavjud.
          </p>
        </div>
        <Button className="bg-white text-orange-500 font-semibold px-5 py-2 rounded-xl hover:shadow-md transition">
          Batafsil
        </Button>
      </motion.div>
    </div>
  );
}
