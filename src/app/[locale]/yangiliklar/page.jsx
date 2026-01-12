"use client";
import { useTranslations } from "next-intl";
import { NewsMain } from "./new";

const Page = () => {
  const t = useTranslations("menu");
  return (
    <div>
      <NewsMain />
    </div>
  );
};

export default Page;
