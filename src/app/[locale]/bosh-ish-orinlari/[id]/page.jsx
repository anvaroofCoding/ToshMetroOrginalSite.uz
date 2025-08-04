"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Briefcase,
  ChevronRight,
  GraduationCap,
  Loader2,
  Users,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [data, setData] = useState({
    id: 3,
    title_uz: "Metro haydovchisi",
    requirements_uz: "o'qigan va 2 ta tilni bilishi kerak",
    mutaxasislik_uz: "mashinist",
    education_status_uz: "o'rta",
    created_by: 4,
    total_requests: 0,
    answered_requests: 0,
    rejected_requests: 0,
    pending_requests: 0,
  });

  const path = usePathname();
  const segments = path.split("/");
  const id = segments[segments.length - 1];

  // async function getJob() {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const res = await fetch(
  //       `https://metro-site.onrender.com/api/job-vacancies/uz/${id}`
  //     );
  //     if (!res.ok) {
  //       throw new Error("Ish o'rinlarini yuklashda xatolik yuz berdi");
  //     }
  //     const jobData = await res.json();
  //     setData(jobData);
  //     console.log(jobData);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getJob();
  // }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
  //       <motion.div
  //         className="flex flex-col items-center space-y-4"
  //         initial={{ opacity: 0, scale: 0.8 }}
  //         animate={{ opacity: 1, scale: 1 }}
  //         transition={{ duration: 0.5 }}
  //       >
  //         <motion.div
  //           animate={{ rotate: 360 }}
  //           transition={{
  //             duration: 1,
  //             repeat: Number.POSITIVE_INFINITY,
  //             ease: "linear",
  //           }}
  //         >
  //           <Loader2 className="h-12 w-12 text-blue-600" />
  //         </motion.div>
  //         <motion.p
  //           className="text-lg font-medium text-gray-700"
  //           animate={{ opacity: [0.5, 1, 0.5] }}
  //           transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
  //         >
  //           Ish o'rni ma'lumotlari yuklanmoqda...
  //         </motion.p>
  //       </motion.div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
  //       <motion.div
  //         className="text-center p-8 bg-white rounded-2xl shadow-2xl max-w-md w-full"
  //         initial={{ opacity: 0, y: 50, scale: 0.9 }}
  //         animate={{ opacity: 1, y: 0, scale: 1 }}
  //         transition={{ duration: 0.6, ease: "easeOut" }}
  //       >
  //         <motion.div
  //           className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
  //           variants={pulseVariants}
  //           animate="pulse"
  //         >
  //           <AlertCircle className="w-10 h-10 text-red-600" />
  //         </motion.div>
  //         <motion.h2
  //           className="text-2xl font-bold text-gray-900 mb-3"
  //           variants={itemVariants}
  //           initial="hidden"
  //           animate="visible"
  //         >
  //           Xatolik yuz berdi
  //         </motion.h2>
  //         <motion.p
  //           className="text-gray-600 mb-6"
  //           variants={itemVariants}
  //           initial="hidden"
  //           animate="visible"
  //         >
  //           {error}
  //         </motion.p>
  //         <motion.div
  //           variants={itemVariants}
  //           initial="hidden"
  //           animate="visible"
  //           whileHover={{ scale: 1.05 }}
  //           whileTap={{ scale: 0.95 }}
  //         >
  //           <Button
  //             onClick={getJob}
  //             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
  //           >
  //             Qayta urinish
  //           </Button>
  //         </motion.div>
  //       </motion.div>
  //     </div>
  //   );
  // }

  if (!data) return null;

  return (
    <div className="min-h-screen mt-10  ">
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.3 },
            }}
          >
            {/* Header */}
            <motion.div
              className="bg-blue-900 p-8 text-white relative overflow-hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <CardTitle className="text-3xl font-bold mb-2 leading-tight">
                      {data.title_uz}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-blue-100">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          {data.total_requests} ariza
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-300" />
                        <span className="text-sm">Faol</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Briefcase className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <motion.div className="space-y-6" variants={itemVariants}>
                  <motion.div
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="bg-blue-600 p-3 rounded-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <GraduationCap className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">
                          Ta'lim darajasi
                        </h3>
                        <p className="text-gray-700 text-base leading-relaxed">
                          {data.education_status_uz}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="bg-green-600 p-3 rounded-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Star className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">
                          Mutaxassislik darajasi
                        </h3>
                        <p className="text-gray-700 text-base leading-relaxed">
                          {data.mutaxasislik_uz}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column */}
                <motion.div variants={itemVariants}>
                  <motion.div
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
                      <motion.div
                        className="bg-purple-600 p-2 rounded-lg mr-3"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <AlertCircle className="w-5 h-5 text-white" />
                      </motion.div>
                      Asosiy talablar
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {data.requirements_uz}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
              <h1>Hello world</h1>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
