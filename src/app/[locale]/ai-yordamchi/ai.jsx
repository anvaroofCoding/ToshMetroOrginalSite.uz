"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const mainColor = "#0E327F";

export default function FAQPage() {
  const t = useTranslations("menu");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { question: t("faq1_question"), answer: t("faq1_answer") },
    { question: t("faq2_question"), answer: t("faq2_answer") },
    { question: t("faq3_question"), answer: t("faq3_answer") },
    { question: t("faq4_question"), answer: t("faq4_answer") },
    { question: t("faq5_question"), answer: t("faq5_answer") },
    { question: t("faq6_question"), answer: t("faq6_answer") },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            {t("five_hundred_twenty_11")}
          </h1>
          <p className="text-gray-600 text-lg">{t("five_hundred_twenty_12")}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-blue-900/20 rounded-2xl bg-blue-400/10 transition-all duration-300"
            >
              <motion.button
                type="button"
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggleFaq(index)}
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
              >
                <span
                  className="text-base sm:text-lg font-semibold pr-4"
                  style={{ color: mainColor }}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openFaq === index ? (
                    <Minus className="w-5 h-5" style={{ color: mainColor }} />
                  ) : (
                    <Plus className="w-5 h-5" style={{ color: mainColor }} />
                  )}
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6"
                    >
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
