"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const getTimeAgo = (dateString) => {
  const now = new Date();
  const publishedDate = new Date(dateString);
  const diffInSeconds = Math.floor(
    (now.getTime() - publishedDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) return `${diffInSeconds} soniya oldin`;
  else if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} daqiqa oldin`;
  else if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} soat oldin`;
  else if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} kun oldin`;
  else return publishedDate.toLocaleDateString();
};

export default function OptimizedNews() {
  const t = useTranslations("menu");
  const [newsdata, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likingItems, setLikingItems] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16); // har bir sahifada nechta yangilik ko‘rsatiladi
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "uz";
  const { toast } = useToast();

  const getNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(`https://abbos.uzmetro.uz/api/news/${lang}/`, {
        signal: controller.signal,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": "UZMETRO_SECRET_2026",
        },
      });

      clearTimeout(timeoutId);

      if (!res.ok)
        throw new Error(
          `Failed to fetch news: ${res.status} ${res.statusText}`,
        );

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid data format received");
      setNewsData(data);
    } catch (err) {
      let errorMessage = "Unknown error occurred";
      if (err instanceof Error) {
        if (err.name === "AbortError")
          errorMessage = "Request timed out. Please check your connection.";
        else errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  const handleLike = useCallback(
    async (itemId) => {
      if (likingItems.has(itemId)) return;
      const currentItem = newsdata.find((item) => item.id === itemId);
      if (!currentItem) return;
      try {
        setLikingItems((prev) => new Set(prev).add(itemId));
        setNewsData((prevData) =>
          prevData.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  like_count: item.is_liked
                    ? item.like_count - 1
                    : item.like_count + 1,
                  is_liked: !item.is_liked,
                }
              : item,
          ),
        );

        const response = await fetch(
          `https://abbos.uzmetro.uz/api/news/${itemId}/like/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "X-API-KEY": "UZMETRO_SECRET_2026",
            },
          },
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        setNewsData((prevData) =>
          prevData.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  like_count: data.like_count,
                  is_liked: data.is_liked ?? true,
                }
              : item,
          ),
        );

        toast({
          title: "Success",
          description: data.message || "Action completed successfully",
        });
      } catch (err) {
        setNewsData((prevData) =>
          prevData.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  like_count: currentItem.like_count,
                  is_liked: currentItem.is_liked,
                }
              : item,
          ),
        );
      } finally {
        setLikingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }
    },
    [likingItems, newsdata, toast],
  );

  useEffect(() => {
    getNews();
  }, [getNews]);

  // Pagination calculation
  const totalPages = Math.ceil(newsdata.length / itemsPerPage);
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return newsdata.slice(startIndex, startIndex + itemsPerPage);
  }, [newsdata, currentPage, itemsPerPage]);

  const memoizedNewsItems = useMemo(() => {
    return paginatedNews.map((item) => {
      const isLiking = likingItems.has(item.id);
      return (
        <Card
          key={item.id}
          className="h-[450px] flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 bg-white border border-gray-200 hover:border-gray-300 p-0"
        >
          <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {item?.images[0]?.image ? (
              <Image
                src={item?.images[0]?.image}
                alt={item?.title || "News image"}
                fill
                sizes="(max-width: 768px) 100vw, 800px" // mobil 100%, katta ekran max 800px
                className="object-cover transition-all duration-500 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-sm text-gray-500">
                  No Image Available
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>

          <CardContent className="flex-1 p-4 flex flex-col">
            <div className="flex-1 mb-4 relative">
              <Link
                href={`/${lang}/yangiliklar/${item.id}`}
                className="block group"
              >
                <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {item?.title || "Untitled"}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {item?.description || "No description available"}
                </p>
              </Link>
              <p className="text-xs text-muted-foreground">
                {getTimeAgo(item.publishedAt)}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLike(item.id);
                }}
                disabled={isLiking}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  item.is_liked
                    ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-red-600"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-red-500 border border-gray-200 hover:border-red-200 hover:shadow-md"
                } ${
                  isLiking ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
              >
                {isLiking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Heart
                    className={`h-4 w-4 transition-all duration-300 ${
                      item.is_liked
                        ? "fill-current scale-110 drop-shadow-sm"
                        : "group-hover:scale-110 group-hover:fill-red-100"
                    }`}
                  />
                )}
                <span
                  className={`font-semibold text-sm transition-all duration-300 ${
                    item.is_liked ? "text-white" : "group-hover:text-red-500"
                  }`}
                >
                  {item.like_count}
                </span>
              </button>

              <Link
                href={`/${lang}/yangiliklar/${item.id}`}
                className="text-sm text-blue-600 hover:text-blue-800 transition-all duration-200 font-medium hover:underline decoration-2 underline-offset-2"
                onClick={(e) => e.stopPropagation()}
              >
                {t("readMore")}
              </Link>
            </div>
          </CardContent>
        </Card>
      );
    });
  }, [paginatedNews, lang, likingItems, handleLike]);

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
      <div className="w-full min-h-[400px]">
        <div className="container py-8 flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 font-medium mb-2">
              {t("two_hundred_thirty_six")}
            </p>
            <p className="text-sm text-red-500">{error}</p>
          </div>
          <Button
            onClick={getNews}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <RefreshCw className="h-4 w-4" />
            {t("two_hundred_thirty_five")}
          </Button>
        </div>
      </div>
    );
  }

  if (newsdata.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600 font-medium mb-2">
            {t("two_hundred_thirty_seven")}
          </p>
          <p className="text-sm text-gray-500">
            {t("two_hundred_thirty_eight")}
          </p>
        </div>
        <Button
          onClick={getNews}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <RefreshCw className="h-4 w-4" />
          {t("two_hundred_thirty_nine")}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="container py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {memoizedNewsItems}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={page === currentPage ? "default" : "outline"}
                className={page === currentPage ? "bg-blue-600 text-white" : ""}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="outline"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
