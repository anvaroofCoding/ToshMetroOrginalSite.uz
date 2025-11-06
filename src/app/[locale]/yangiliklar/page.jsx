"use client";
import { useTranslations } from "next-intl";
import News from "./new";
import NewsSection from "./new";

const Page = () => {
  const t = useTranslations("menu");
  return (
    <div>
      <div className="container pt-10">
        <h1 className="text-[36px] font-bold">
          {t("two_hundred_thirty_four")}
        </h1>
      </div>
      <News />
    </div>
  );
};

export default Page;
