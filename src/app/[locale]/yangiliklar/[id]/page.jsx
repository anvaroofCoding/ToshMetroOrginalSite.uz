"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import CommentsSection from "./comments-section";

export default function NewsArticlePage() {
  const path = usePathname();
  const id = path.split("/")[3];
  const lang = path.split("/")[1];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const getNewsProductions = async () => {
      try {
        const res = await fetch(
          `https://metro-site.onrender.com/api/news/${lang}/${id}/`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error(`Xatolik: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("Ma'lumotni yuklab bo'lmadi.");
      } finally {
        setLoading(false);
      }
    };

    getNewsProductions();
  }, [id, lang]);

  const nextImage = () => {
    if (data?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % data.images.length);
    }
  };

  const prevImage = () => {
    if (data?.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + data.images.length) % data.images.length
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 text-lg font-medium text-slate-700"
        >
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          Yuklanmoqda...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-screen bg-transparent "
      >
        <Card className="p-8 max-w-md mx-4 shadow-xl border-0 ">
          <CardContent className="text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-red-600 font-medium">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 shadow-lg"
            >
              Qayta urinish
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-900 tracking-tight">
            {data?.[`title_${lang}`]}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-8">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-medium">
                {data?.publishedAt && formatDate(data.publishedAt)}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-medium">
                {data?.like_count || 0} ta yoqtirish
              </span>
            </div>
            {data?.category_ru && (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 shadow-sm"
              >
                {data.category_ru}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Image Gallery */}
        {data?.images && data.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-10"
          >
            <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={data.images[currentImageIndex]?.image}
                      alt={`${data?.[`title_${lang}`]} - изображение ${
                        currentImageIndex + 1
                      }`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      onLoad={() => setImageLoading(false)}
                      onLoadStart={() => setImageLoading(true)}
                    />
                  </AnimatePresence>

                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                    </div>
                  )}

                  {/* Navigation Controls */}
                  {data.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border-0 shadow-lg h-12 w-12 rounded-full"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border-0 shadow-lg h-12 w-12 rounded-full"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  {data.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md shadow-lg font-medium">
                      {currentImageIndex + 1} / {data.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {data.images.length > 1 && (
                  <div className="p-6 bg-white/50 backdrop-blur-sm">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {data.images.map((image, index) => (
                        <motion.button
                          key={image.id}
                          onClick={() => goToImage(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shadow-md ${
                            index === currentImageIndex
                              ? "border-blue-500 ring-4 ring-blue-200 shadow-lg"
                              : "border-white hover:border-slate-300 hover:shadow-lg"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={image.image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12">
              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-line text-slate-700 font-medium">
                  {data?.[`fullContent_${lang}`] ||
                    data?.[`description_${lang}`]}
                </p>
              </div>
              <div className="prose prose-lg prose-slate max-w-none mt-5">
                <p className="text-lg leading-relaxed whitespace-pre-line text-slate-700 font-medium">
                  {data?.[`description_${lang}`] ||
                    data?.[`fullContent_${lang}`]}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comments Section */}
        <CommentsSection newsId={id} />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Orqaga qaytish
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
