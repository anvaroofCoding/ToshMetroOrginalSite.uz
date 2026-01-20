"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetTenderDetailsQuery,
  useLikedRenderMutation,
} from "@/store/services/api";
import { IconEye, IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CommentTender from "./comment-tender";

/* ===================== MARK LOGIC (LOCALSTORAGE) ===================== */

const STORAGE_KEY = "marked_words";

function getMarkedWords() {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function saveMarkedWords(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function toggleMark(postId, wordIndex) {
  const data = getMarkedWords();
  const key = `post-${postId}`;
  const marked = data[key] || [];

  if (marked.includes(wordIndex)) {
    data[key] = marked.filter((idx) => idx !== wordIndex);
  } else {
    data[key] = [...marked, wordIndex];
  }

  saveMarkedWords(data);
  return data[key];
}

/* ===================== HIGHLIGHT TEXT COMPONENT ===================== */

function HighlightText({ text, postId }) {
  const [marked, setMarked] = useState([]);

  useEffect(() => {
    const data = getMarkedWords();
    setMarked(data[`post-${postId}`] || []);
  }, [postId]);

  if (!text) return null;

  return (
    <p className="leading-relaxed">
      {text.split(" ").map((word, index) => {
        const cleanWord = word.replace(/[.,!?]/g, "");
        const isActive = marked.includes(index);

        return (
          <span
            key={index}
            onClick={() => {
              const updated = toggleMark(postId, index);
              setMarked(updated);
            }}
            className={`cursor-pointer px-1 rounded transition
              ${isActive ? "bg-yellow-300 text-black" : "hover:bg-yellow-100"}
            `}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

/* ===================== PAGE ===================== */

export default function TenderDetails() {
  const t = useTranslations("menu");
  const path = usePathname();
  const lang = path.split("/")[1];
  const id = path.split("/")[3];

  const [index, setIndex] = useState(0);
  const thumbnailScrollRef = useRef(null);

  const { data, isLoading, isError } = useGetTenderDetailsQuery({
    lang,
    id,
  });
  const [liked] = useLikedRenderMutation();

  useEffect(() => {
    if (thumbnailScrollRef.current) {
      const thumbnail = thumbnailScrollRef.current.children[index];
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = ""; // scrollni qayta yoqish
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-blue-700">
        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
        {t("two_hundred_thirteen")}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="w-12 h-12 text-red-600 mb-3" />
        <p className="text-red-600 mb-4">Ma'lumotni olishda xatolik</p>
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

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes(),
    ).padStart(2, "0")} ${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1,
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  const clickLike = (id) => {
    try {
      liked(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 ">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{data?.title}</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {data?.publishedAt && (
          <div className="flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full text-sm">
            <Calendar className="w-4 h-4" />
            {formatDate(data?.publishedAt)}
          </div>
        )}

        <div
          onClick={() => {
            clickLike(data?.id);
          }}
          className="flex items-center gap-2 bg-blue-100 px-3 rounded-full"
        >
          {data?.liked ? (
            <IconThumbUpFilled stroke={2} />
          ) : (
            <IconThumbUp stroke={2} />
          )}{" "}
          {data?.like_count}
        </div>

        <div className="flex items-center gap-2 bg-blue-100 px-3 rounded-full">
          <IconEye size={20} /> {data?.views_count}
        </div>

        {data?.category && (
          <Badge className="bg-blue-700 text-white">{data.category}</Badge>
        )}
      </div>

      {images.length > 0 && (
        <Card className="max-w-5xl mx-auto mb-8 overflow-hidden p-0">
          <CardContent className="p-0 relative">
            <div className="relative aspect-video">
              <Image
                src={currentImage || "/placeholder.svg"}
                alt="news"
                fill
                className="object-cover"
              />
              {images.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setIndex((i) => (i - 1 + images.length) % images.length)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-700/70 text-white"
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-700/70 text-white"
                  >
                    <ChevronRight />
                  </Button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="p-3 border-t border-gray-200">
                <div
                  ref={thumbnailScrollRef}
                  className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-2"
                >
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        index === idx
                          ? "border-blue-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={img.image || "/placeholder.svg"}
                        alt={`Thumbnail ${idx + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* CONTENT — DIZAYN O'ZGARMADI */}
      <Card>
        <CardContent className="p-8 text-slate-700">
          <HighlightText text={data?.description} postId={data?.id} />
        </CardContent>
        <CardContent className="p-8 text-slate-700">
          <HighlightText text={data?.content} postId={data?.id} />
        </CardContent>
      </Card>

      <CommentTender id={id} />

      <div className="mt-8 text-center">
        <Button variant="solid" onClick={() => history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Orqaga
        </Button>
      </div>
    </div>
  );
}
