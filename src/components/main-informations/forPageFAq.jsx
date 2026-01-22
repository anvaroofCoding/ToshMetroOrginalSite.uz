// "use client";
import { FaqAccordions } from "@/work/test/questions";
import { useTranslations } from "next-intl";
import ForAnimationFAQ from "./forAnimationFAQ";

export default function ForPageFAq() {
  const t = useTranslations("menu");
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold text-[#0e4bb3]">
        {t("title_1")}
      </h2>
      <div className="grid xl:grid-cols-4 grid-cols-1 pt-10">
        <div className="w-full h-[300px] col-span-1 hidden xl:block">
          <ForAnimationFAQ />
        </div>
        <div className="xl:col-span-3 cols-span-1">
          <FaqAccordions />
        </div>
      </div>
    </div>
  );
}
