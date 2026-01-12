"use client";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import { useGetPopularNewsQuery } from "@/store/services/api";
import { ArrowRight, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale;
  const lang = locale || "uz";
  const { data: news, isLoading } = useGetPopularNewsQuery(lang);
  const trimText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  if (isLoading) {
    return (
      <div className="container flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }
  const cards = news?.map((item, index) => (
    <Card
      key={item.id}
      index={index}
      card={{
        category: item.category ?? "",
        title: trimText(item?.title), // ✅ Title shorten
        src: item.images[0]?.image,
        content: (
          <div className="p-4">
            <p className="text-gray-700 text-sm mb-2">
              {trimText(item?.description)}
            </p>

            <Button
              variant="ghost"
              className="text-[#0e4bb3]"
              onClick={() => router(`/${lang}/yangiliklar/${item.id}`)}
            >
              {lang === "uz"
                ? "Batafsil →"
                : lang === "ru"
                ? "Подробнее →"
                : "Read more →"}
            </Button>
          </div>
        ),
      }}
    />
  ));
  return (
    <div className="w-full h-full">
      <div className="container flex justify-between lg:items-center items-start gap-3 lg:flex-row  flex-col">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#0e4bb3]">
            {lang === "uz"
              ? "Metropoliten yangiliklari"
              : lang === "ru"
              ? "Новости метрополитена"
              : "Metro News"}
          </h2>
          <p className="text-gray-600 max-w-[450px] text-xs lg:text-lg">
            {lang === "uz"
              ? "Toshkent metropolitenida e'lon qilinadigan barcha rasmiy yangiliklar"
              : lang === "ru"
              ? "Все официальные новости Ташкентского метрополитена"
              : "All official news from Tashkent Metro"}
          </p>
        </div>

        <Button
          className="bg-[#0e4bb3] hover:bg-[#0e4bb3]/70 text-white"
          onClick={() => (window.location.href = `/${lang}/yangiliklar`)}
        >
          {lang === "uz"
            ? "Batafsil ko‘rish"
            : lang === "ru"
            ? "Посмотреть все"
            : "View all"}{" "}
          <ArrowRight className="w-4 ml-2" />
        </Button>
      </div>

      <Carousel items={cards} />
    </div>
  );
}
