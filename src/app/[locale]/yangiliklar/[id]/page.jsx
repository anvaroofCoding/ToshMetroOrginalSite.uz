"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Loader2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CommentsSection from "./comments-section";
export default function NewsArticlePage() {
  const t = useTranslations("menu");
  const path = usePathname();
  const lang = path.split("/")[1];
  const id = path.split("/")[3];
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://back.uzmetro.uz/api/news/${lang}/${id}/`,
        );
        if (!res.ok) throw new Error("Ma'lumotni olishda xatolik");
        const json = await res.json();
        setData(json);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    })();
  }, [id, lang]);
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-600">
        <Loader2 className="w-6 h-6 mr-2 animate-spin text-blue-600" />
        {t("one_hundred_ninety_eight")}
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
        <p className="text-red-600 font-medium mb-4">
          {t("two_hundred_forty")}
        </p>
        <Button
          onClick={() => location.reload()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {t("two_hundred_forty_one")}
        </Button>
      </div>
    );
  }
  const images = data?.images || [];
  const currentImage = images[index]?.image || "/placeholder.svg";
  const nextImage = () => setIndex((i) => (i + 1) % images.length);
  const prevImage = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("uz-UZ", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
        {data?.[`title_${lang}`] || "Sarlavha topilmadi"}
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-8">
        {data?.publishedAt && (
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{formatDate(data.publishedAt)}</span>
          </div>
        )}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <Heart className="w-4 h-4 text-red-500" />
          <span>
            {data?.like_count || 0} {t("two_hundred_forty_three")}
          </span>
        </div>
        {data?.category_ru && (
          <Badge className="bg-blue-100 text-blue-800">
            {data.category_ru}
          </Badge>
        )}
      </div>
      {images.length > 0 && (
        <Card className="shadow-xl border-0 overflow-hidden mb-8">
          <CardContent className="relative p-0">
            <div className="relative w-full aspect-video bg-gray-100">
              <Image
                src={currentImage}
                alt="Yangilik rasmi"
                fill
                priority
                className="object-cover"
              />
              {images.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>

                  <div className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm">
                    {index + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-3 bg-white border-t">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                      i === index ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img.image || "/placeholder.svg"}
                      alt={`thumb-${i}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-slate-700 leading-relaxed">
          <p>
            {data?.[`fullContent_${lang}`] || data?.[`description_${lang}`]}
          </p>
        </CardContent>
      </Card>
      <CommentsSection newsId={id} />
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          onClick={() => history.back()}
          className="px-6 py-2 bg-white border border-slate-200 hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("two_hundred_forty_two")}
        </Button>
      </div>
    </div>
  );
}
