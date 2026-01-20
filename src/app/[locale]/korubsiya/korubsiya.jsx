"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import WheelPagination from "@/components/ui/wheel-pagination";
import {
  useCorrubsiyaQuery,
  useLikedCorrubsiyaMutation,
} from "@/store/services/api";
import { IconEye, IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
import { ArrowRight, Loader, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const Corubsiya = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;
  const { locale } = useParams();
  const t = useTranslations("menu");

  const {
    data: posts,
    isLoading,
    isFetching,
  } = useCorrubsiyaQuery({
    lang: locale,
    search,
    page,
    pageSize: PAGE_SIZE,
  });

  const [liked] = useLikedCorrubsiyaMutation();

  const clickLike = (id) => {
    try {
      liked(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="mx-auto my-20 animate-spin" />
      </div>
    );
  }

  const totalPages = Math.ceil((posts?.count ?? 0) / PAGE_SIZE);

  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col items-center gap-16 ">
        <div className="text-center">
          <h2 className="text-pretty text-3xl font-semibold md:text-4xl lg:max-w-3xl lg:text-5xl">
            {t("tender")}
          </h2>
          <div className="border mt-5 rounded-lg overflow-hidden relative bg-white border border-blue-800/30">
            <Input
              className={"pr-10 border-none outline-none"}
              placeholder="Qidiruv..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {search == "" ? (
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-800" />
            ) : (
              <X
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-800"
              />
            )}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts?.results?.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] rounded-lg overflow-hidden pt-0"
            >
              <div className="aspect-[16/9] w-full">
                <Link
                  href={`korubsiya/${post?.id}`}
                  className="transition-opacity duration-200 fade-in hover:opacity-70"
                >
                  <img
                    src={post?.images[0]?.image}
                    alt={post?.title}
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  <Link
                    href={`korubsiya/${post?.id}`}
                    className="cursor-pointer"
                  >
                    {post?.title?.split(" ").slice(0, 10).join(" ") +
                      (post?.title.split(" ").length > 10 ? "..." : "")}
                  </Link>
                </h3>
               
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {post?.description?.split(" ").slice(0, 20).join(" ") +
                    (post?.description.split(" ").length > 20 ? "..." : "")}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Link
                  href={`korubsiya/${post?.id}`}
                  className="flex items-center text-foreground hover:underline"
                >
                  {t("readMore")}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
                <div className="flex items-center gap-3">
                  <p
                    onClick={() => {
                      clickLike(post?.id);
                    }}
                    className="flex items-center gap-0.5 text-muted-foreground text-sm cursor-pointer"
                  >
                    {post?.liked ? (
                      <IconThumbUpFilled stroke={2} />
                    ) : (
                      <IconThumbUp stroke={2} />
                    )}
                    {post?.like_count}
                  </p>
                  <p className="flex items-center gap-0.5 text-muted-foreground text-sm">
                    <IconEye stroke={2} /> {post?.view_count}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        {posts?.results?.length === 0 && (
          <div className="w-full flex justify-center items-center mt-20">
            <p className="text-center text-muted-foreground">
              Ma'lumot topilmadi
            </p>
          </div>
        )}
        <div>
          <WheelPagination
            totalPages={totalPages}
            visibleCount={7}
            onChange={(newPage) => setPage(newPage + 1)}
            disabled={isFetching}
          />
        </div>
      </div>
    </section>
  );
};

export { Corubsiya };
