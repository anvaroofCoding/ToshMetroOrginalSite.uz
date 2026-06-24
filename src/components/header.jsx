"use client";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useGetPopularNewssQuery } from "@/store/services/api";
import { ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";

export default function Header() {
  const params = useParams();
  const locale = params?.locale;
  const lang = locale || "uz";
  const { data: news, isLoading } = useGetPopularNewssQuery(lang);

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="mb-6 h-10 w-64 animate-pulse rounded-lg bg-blue-100" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 w-56 shrink-0 animate-pulse rounded-3xl bg-gray-200 md:h-[40rem] md:w-96"
            />
          ))}
        </div>
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

            <Link
              href={`/yangiliklar/${item.id}`}
              className="inline-flex items-center text-sm font-medium text-[#0e4bb3] underline-offset-4 hover:underline"
            >
              {lang === "uz"
                ? "Batafsil →"
                : lang === "ru"
                  ? "Подробнее →"
                  : "Read more →"}
            </Link>
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
