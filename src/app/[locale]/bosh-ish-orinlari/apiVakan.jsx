"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Users,
  ChevronRight,
  Clock,
  Train,
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
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

// Import antd Pagination
import { Pagination } from "antd";
import "antd/dist/reset.css";

function ApiVakan() {
  const t = useTranslations("menu");
  const { locale } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  async function getJob() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://abbos.uzmetro.uz/api/job-vacancies/${locale}/`
      );
      if (!res.ok)
        throw new Error("Ish o'rinlarini yuklashda xatolik yuz berdi");
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getJob();
  }, [locale]);

  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  // Pagination calculations
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>{t("two_hundred_thirteen")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {t("four_hundred_ninety_three")}
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={getJob} className="bg-blue-900 hover:bg-blue-800">
            {t("four_hundred_ninety_four")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 container mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#0E327F] to-blue-600 rounded-full mb-8 shadow-2xl mx-auto">
          <Train className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#0E327F] to-blue-600 bg-clip-text text-transparent">
          {t("four_hundred_ninety_five")}
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-4">
          {t("four_hundred_ninety_six")}
        </p>
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-900 px-4 py-2 inline-flex items-center space-x-2"
        >
          <Users className="w-4 h-4" />
          <span>
            {data?.length} {t("four_hundred_ninety_seven")}
          </span>
        </Badge>
      </div>

      {/* Job Cards Grid */}
      <AnimatePresence>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedData.map((item) => (
            <motion.div key={item.id} className="h-full" whileHover={{ y: -8 }}>
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-xl">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold leading-tight mb-2">
                      {truncateText(
                        item[`title_${locale}`] || item.education_title_uz,
                        22
                      )}
                    </CardTitle>
                    <Briefcase className="w-8 h-8 text-blue-200" />
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {t("five_hundred_five")}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed break-words">
                        {truncateText(
                          item[`education_status_${locale}`] ||
                            item.education_status_uz,
                          60
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {t("four_hundred_ninety_eight")}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed break-words">
                        {truncateText(
                          item[`mutaxasislik_${locale}`] ||
                            item.mutaxasislik_uz,
                          60
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-semibold text-blue-900 text-sm mb-1">
                      {t("four_hundred_ninety_nine")}
                    </p>
                    <p className="text-blue-800 text-sm leading-relaxed break-words">
                      {truncateText(
                        item[`requirements_${locale}`] || item.requirements_uz,
                        80
                      )}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 mt-auto">
                  <div className="w-full flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          {item.total_requests} {t("five_hundred")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">
                          {t("five_hundred_one")}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/bosh-ish-orinlari/${item.id}`}
                      className="block"
                    >
                      <Button
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                        size="lg"
                      >
                        {t("five_hundred_two")}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Antd Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 flex-wrap gap-2 text-white">
          {/* Oldingi */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded font-medium ${
              currentPage === 1
                ? "bg-gray-300 text-gray-100 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800"
            }`}
          >
            {t("five_hundred_three")}
          </button>

          {/* Sahifa raqamlari */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded font-medium ${
                currentPage === i + 1
                  ? "bg-blue-700 text-white"
                  : "bg-blue-900 text-white hover:bg-blue-800"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Keyingi */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded font-medium ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-100 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800"
            }`}
          >
            {t("five_hundred_four")}
          </button>
        </div>
      )}
    </div>
  );
}

export default ApiVakan;
