"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetPopularNewsQuery } from "@/store/services/api";
import { ArrowRight, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText = "View all articles",
  buttonUrl = "https://shadcnblocks.com",
}) => {
  const { locale } = useParams();
  const t = useTranslations("menu");
  const { data: posts, isLoading } = useGetPopularNewsQuery(locale || "uz");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(posts);
  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <h2 className="text-pretty text-3xl font-semibold md:text-4xl lg:max-w-3xl lg:text-5xl">
            {t("two_hundred_thirty_four")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts?.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] rounded-lg overflow-hidden"
            >
              <div className="aspect-[16/9] w-full">
                <Link
                  href={`yangiliklar/${post?.id}`}
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
                    href={`yangiliklar/${post?.id}`}
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
                  href={`${post?.id}`}
                  className="flex items-center text-foreground hover:underline"
                >
                  {t("readMore")}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
                <p className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Eye className="w-5" /> 40431
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
