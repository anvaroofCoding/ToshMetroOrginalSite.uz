"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Users,
  ChevronRight,
  MapPin,
  Clock,
  Train,
  Phone,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ApiVakan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getJob() {
    const cacheKey = "jobData";
    const cacheExpiryKey = "jobDataExpiry";
    const now = Date.now();
    const expiryTime = 10 * 60 * 1000; // 10 minut

    // 1. Keshlangan ma'lumotni tekshirish
    const cachedData = localStorage.getItem(cacheKey);
    const cachedExpiry = localStorage.getItem(cacheExpiryKey);

    if (cachedData && cachedExpiry && now < parseInt(cachedExpiry)) {
      setData(JSON.parse(cachedData));
      return;
    }

    // 2. Serverdan yangi ma'lumot olish
    try {
      setLoading(true);
      const res = await fetch(
        "https://metro-site.onrender.com/api/job-vacancies/uz/"
      );

      if (!res.ok) {
        throw new Error("Ish o'rinlarini yuklashda xatolik yuz berdi");
      }

      const data = await res.json();

      // 3. Ma'lumotni va muddati tugash vaqtini keshga saqlash
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheExpiryKey, (now + expiryTime).toString());

      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getJob();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Yuklanmoqda...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <motion.div
          className="text-center p-8 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bo'sh ish o'rinlarini yuklashda xatolik
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={getJob} className="bg-blue-900 hover:bg-blue-800">
            Qayta urinish
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#0E327F] to-blue-600 rounded-full mb-8 shadow-2xl"
          >
            <Train className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#0E327F] to-blue-600 bg-clip-text text-transparent"
          >
            Toshkent Metro
          </motion.h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Karyerangizni bizning jamoamizda boshlang
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-900 px-4 py-2"
            >
              <Users className="w-4 h-4 mr-2" />
              {data.length} ta bo'sh ish o'rni mavjud
            </Badge>
          </div>
        </motion.div>

        {/* Job Cards Grid */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {data?.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="h-full"
              >
                <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6">
                    <div className="flex items-start justify-between ">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl font-bold leading-tight mb-2 group-hover:text-blue-100 transition-colors">
                          {truncateText(item.title_uz, 50)}
                        </CardTitle>
                      </div>
                      <Briefcase className="w-8 h-8 text-blue-200 group-hover:scale-110 transition-transform flex-shrink-0 ml-2" />
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 flex-1 flex flex-col ">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-start space-x-3">
                        <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-sm">
                            Ta'lim
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed break-words">
                            {truncateText(item.education_status_uz, 60)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Briefcase className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-sm">
                            Mutaxassislik
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed break-words">
                            {truncateText(item.mutaxasislik_uz, 60)}
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="font-semibold text-blue-900 text-sm mb-1">
                          Talablar
                        </p>
                        <p className="text-blue-800 text-sm leading-relaxed break-words">
                          {truncateText(item.requirements_uz, 80)}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 mt-auto">
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {item.total_requests} ta ariza
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-green-600 font-medium">
                            Faol
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/bosh-ish-orinlari/${item.id}`}
                        className="block"
                      >
                        <Button
                          className="w-full bg-blue-900 hover:bg-blue-800 text-white group-hover:bg-blue-800 transition-all duration-300"
                          size="lg"
                        >
                          Batafsil ko'rish
                          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {data.length === 0 && !loading && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Bo'sh ish o'rinlari mavjud emas
            </h3>
            <p className="text-gray-600 mb-6">
              Yangi imkoniyatlar uchun keyinroq qarang
            </p>
            <Button onClick={getJob} className="bg-blue-900 hover:bg-blue-800">
              Yangilash
            </Button>
          </motion.div>
        )}

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-transparent text-gray-900 py-16"
        >
          <div className="container mx-auto px-4">
            <div className="text-center">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl lg:text-4xl font-bold mb-8 text-[#0E327F]"
              >
                Biz bilan bog'laning
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-[#0E327F]/10 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2 text-[#0E327F]">Manzil</h3>
                  <p className="text-gray-600 text-center">
                    Toshkent shahar, Shayxontohur tumani,
                    <br />
                    I.Karimov ko'chasi, 16a-uy
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-[#0E327F]/10 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Telefon</h3>
                  <p className="text-gray-600">(+998-71) 239-89-27</p>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-[#0E327F]/10 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Ish vaqti</h3>
                  <p className="text-gray-600 text-center">
                    Dushanba-Juma
                    <br />
                    8:00 - 17:00
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default ApiVakan;
