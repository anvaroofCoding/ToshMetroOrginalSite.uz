"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const t = useTranslations("menu");

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const items = [
    {
      q: t("q1"),
      a: t("a1"),
    },
    {
      q: t("q2"),
      a: t("a2"),
    },
    {
      q: t("q3"),
      a: t("a3"),
    },
  ];

  return (
    <div className="container ">
      <h2 className="text-start lg:text-[36px] font-bold text-[24px] text-blue-900 mb-6">
        {t("title_1")}
      </h2>

      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-lg  transition-colors mt-4 duration-300 bg-transparent ${
            openIndex === index
              ? "border-blue-200 bg-blue-400/10"
              : "border-gray-300 bg-transparent"
          }`}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between bg-blue-400/10 border border-blue-900/10 items-center p-4 text-left font-semibold text-blue-900 rounded-lg transition "
          >
            <span>{item.q}</span>
            <motion.span
              initial={false}
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key={`content-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="px-4 pb-4 text-gray-700 bg-blue-400/10">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
