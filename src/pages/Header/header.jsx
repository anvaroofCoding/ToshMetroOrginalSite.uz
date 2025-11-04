"use client";

import { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function Header() {
  const [news, setNews] = useState([]);
  const { locale } = useParams();
  const lang = locale || "uz";
  const titleField = `title_${lang}`;
  const descField = `description_${lang}`;
  const categoryField = `category_${lang}`;
  const getNews = async () => {
    try {
      const res = await fetch("https://abbos.uzmetro.uz/api/news/" + lang);
      const data = await res.json();
      const latestTen = Array.isArray(data) ? data.slice(0, 10) : [];
      setNews(latestTen);
    } catch (error) {
      console.error("News fetch error:", error);
    }
  };
  useEffect(() => {
    getNews();
  }, [lang]);
  const trimText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  const cards = news.map((item, index) => (
    <Card
      key={item.id}
      index={index}
      card={{
        category: item[categoryField] ?? "",
        title: trimText(item[titleField]), // ✅ Title shorten
        src: item.images?.[0]?.image || "/default-news.jpg",
        content: (
          <div className="p-4">
            <p className="text-gray-700 text-sm mb-2">
              {trimText(item[descField])}
            </p>

            <Button
              variant="ghost"
              className="text-[#0e4bb3]"
              onClick={() =>
                (window.location.href = `/${lang}/yangiliklar/${item.id}`)
              }
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
          <p className="text-gray-600 max-w-[450px] text-xs">
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
            : "View all"}
        </Button>
      </div>

      {news.length > 0 ? (
        <Carousel items={cards} />
      ) : (
        <p className="text-center mt-10 text-gray-500">
          {lang === "uz"
            ? "Yuklanmoqda..."
            : lang === "ru"
            ? "Загрузка..."
            : "Loading..."}
        </p>
      )}
    </div>
  );
}
