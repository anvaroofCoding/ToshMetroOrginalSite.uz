"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetPopularNewsDetailsQuery } from "@/store/services/api";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CommentsSection from "./comments-section";

export default function NewsArticlePage() {
  const path = usePathname();
  const lang = path.split("/")[1];
  const id = path.split("/")[3];

  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("loading");
  const { data, isLoading, isError } = useGetPopularNewsDetailsQuery({
    lang,
    id,
  });
  if (isLoading) {
    <div className="flex items-center justify-center min-h-screen text-blue-700">
      <Loader2 className="w-6 h-6 mr-2 animate-spin text-blue-700" />
      Yuklanmoqda...
    </div>;
  }

  /* ================= DATE FORMAT ================= */
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const MM = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${hh}:${mm} ${dd}-${MM}-${yyyy}`;
  };

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="w-12 h-12 text-red-600 mb-3" />
        <p className="text-red-600 mb-4">Ma’lumotni olishda xatolik</p>
        <Button
          onClick={() => location.reload()}
          className="bg-blue-700 hover:bg-blue-800"
        >
          Qayta yuklash
        </Button>
      </div>
    );
  }

  const images = data?.images || [];
  const currentImage = images[index]?.image;
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  console.log(data);
  return (
    <div className="container mx-auto py-8 px-4">
      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
        {data?.title}
      </h1>

      {/* META */}
      <div className="flex flex-wrap gap-3 mb-8">
        {data?.publishedAt && (
          <div className="flex items-center gap-2 bg-blue-100 text-black px-3 py-1.5 rounded-full text-sm">
            <Calendar className="w-4 h-4" />
            {formatDate(data?.publishedAt)}
          </div>
        )}

        <div className="flex items-center gap-2 bg-blue-100 text-black px-3 py-1.5 rounded-full text-sm">
          <Heart className="w-4 h-4 text-red-500" />
          {data?.like_count} ta
        </div>
        <div className="flex items-center gap-2 bg-blue-100 text-black px-3 py-1.5 rounded-full text-sm">
          <Eye className="w-4 h-4 text-blue-800" />
          12002 ta
        </div>

        {data?.category && (
          <Badge className="bg-blue-700 text-white">{data?.category}</Badge>
        )}
      </div>

      {/* IMAGES */}
      {images.length > 0 && (
        <Card className=" max-w-5xl mx-auto mb-8 p-0 overflow-hidden border border-blue-100 shadow-lg">
          <CardContent className="p-0 relative">
            <div className="relative aspect-video bg-slate-100">
              <Image
                src={currentImage}
                alt="news image"
                fill
                className="object-cover"
                priority
              />

              {images.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-700/70 hover:bg-blue-800 text-white hover:text-gray-200 rounded-full"
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={next}
                    className="absolute  hover:text-gray-200 right-3 top-1/2 -translate-y-1/2 bg-blue-700/70 hover:bg-blue-800 text-white rounded-full"
                  >
                    <ChevronRight />
                  </Button>

                  <div className="absolute top-3 right-3 bg-blue-800 text-white text-xs px-3 py-1 rounded-full">
                    {index + 1}/{images.length}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 p-3 border-t bg-white overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                      i === index ? "border-blue-700" : "border-slate-200"
                    }`}
                  >
                    <Image
                      src={img.image}
                      alt="thumb"
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

      {/* CONTENT */}
      <Card className="border border-blue-100 shadow-md">
        <CardContent className="p-8 text-slate-700 leading-relaxed">
          <p>{data?.description}</p>
        </CardContent>
        <CardContent className="p-8 text-slate-700 leading-relaxed">
          <p>{data?.fullContent}</p>
        </CardContent>
      </Card>

      {/* COMMENTS */}
      <CommentsSection newsId={id} />

      {/* BACK */}
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          onClick={() => history.back()}
          className="border-blue-700 text-blue-700 hover:bg-blue-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Orqaga
        </Button>
      </div>
    </div>
  );
}
