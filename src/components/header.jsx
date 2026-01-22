"use client";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import { useGetPopularNewssQuery } from "@/store/services/api";
import { ArrowRight, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale;
  const lang = locale || "uz";
  const { data: news, isLoading } = useGetPopularNewssQuery(lang);

  if (isLoading) {
    return (
      <div className="container flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }
  const trimText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  const cards = news?.results?.map((item, index) => (
    <Card
      key={item.id}
      index={index}
      card={{
        category: item.category ?? "",
        title: trimText(item?.title),
        src: item.images[0]?.image,
        content: (
          <div>
            <p className="text-gray-700 text-sm mb-2">
              {trimText(item?.description)}
            </p>

            <p className="text-gray-700 text-sm mb-2">
              {trimText(item?.fullContent)}
            </p>

            <Button
              variant="link"
              className="text-[#0e4bb3] px-0"
              onClick={() => router.push(`/${lang}/yangiliklar/${item.id}`)}
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
