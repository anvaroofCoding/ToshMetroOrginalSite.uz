"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn_dialog";
import { useTranslations } from "next-intl";
export default function FAQPage() {
  const t = useTranslations("menu");
  const faqData = [
    {
      id: 1,
      question: t("question1"),
      answer: t("answer1"),
      category: t("category1"),
    },
    {
      id: 2,
      question: t("question2"),
      answer: t("answer2"),
      category: t("category2"),
    },
    {
      id: 3,
      question: t("question3"),
      answer: t("answer3"),
      category: t("category3"),
    },
    {
      id: 4,
      question: t("question4"),
      answer: t("answer4"),
      category: t("category4"),
    },
    {
      id: 5,
      question: t("question5"),
      answer: t("answer5"),
      category: t("category5"),
    },
    {
      id: 6,
      question: t("five_hundred_twenty_1"),
      answer: t("five_hundred_twenty_2"),
      category: t("category4"),
    },
    {
      id: 7,
      question: t("five_hundred_twenty_3"),
      answer: t("five_hundred_twenty_4"),
      category: t("category4"),
    },
    {
      id: 8,
      question: t("five_hundred_twenty_5"),
      answer: t("five_hundred_twenty_6"),
      category: t("category3"),
    },
    {
      id: 9,
      question: t("five_hundred_twenty_7"),
      answer: t("five_hundred_twenty_8"),
      category: t("category4"),
    },
    {
      id: 10,
      question: t("five_hundred_twenty_9"),
      answer: t("five_hundred_twenty_10"),
      category: t("five_hundred_twenty_14"),
    },
  ];
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(t("all"));
  const categories = [
    t("all"),
    ...Array.from(new Set(faqData.map((faq) => faq.category))),
  ];
  const filteredFAQ =
    selectedCategory === t("all")
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory);
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            {t("five_hundred_twenty_11")}
          </h1>
          <p className="text-gray-600 text-lg">{t("five_hundred_twenty_12")}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full bg-blue-900 text-white hover:bg-blue-800 hover:text-white/80 cursor-pointer"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredFAQ.map((faq) => (
            <Card
              key={faq.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedFAQ(faq)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFAQ(faq);
                  }}
                  className="mt-4 bg-blue-900 hover:bg-blue-800 text-white"
                >
                  {t("five_hundred_twenty_13")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedFAQ} onOpenChange={() => setSelectedFAQ(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-900">
              {selectedFAQ?.question}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
              {selectedFAQ?.category}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {selectedFAQ?.answer}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
