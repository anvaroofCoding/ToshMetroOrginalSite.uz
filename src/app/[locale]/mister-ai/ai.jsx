"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function FAQPage() {
  const faqData = [
    {
      id: 1,
      question: `Toshkent metropoliteni" DUK ga ishga kirmoqchiman. Qayerga murojaat qilsam bo'ladi?`,
      answer:
        "Toshkent metropoliten rasmiy saytidan bo'sh ish o'rinlari qismidan, ishga kirish haqida ma'lumotlar olsangiz bo'ladi",
      category: "Asosiy",
    },
    {
      id: 2,
      question: "ATTO kartasini qayerdan xarid qilishim mumkin?",
      answer:
        "ATTO kartasini metro kassalaridan yoki ayrim terminal nuqtalaridan xarid qilishingiz mumkin.",
      category: "To'lov tizimi",
    },
    {
      id: 3,
      question: "Metro tokenlari hali ham ishlatiladimi?",
      answer:
        "Yo'q, hozirda metroda faqat ATTO kartalari orqali to'lov amalga oshiriladi.",
      category: "To'lov tizimi",
    },
    {
      id: 4,
      question: "Bekatlar ish vaqti qanday?",
      answer:
        "Toshkent metropoliteni har kuni 05:00 dan 00:00 gacha faoliyat yuritadi.",
      category: "Asosiy",
    },
    {
      id: 5,
      question:
        "Yo'nalishlar va bekatlar haqida qayerdan ma'lumot olsam bo'ladi?",
      answer:
        "Metro xaritasi va bekatlar haqida rasmiy sayt yoki mobil ilova orqali ma'lumot olishingiz mumkin.",
      category: "Xarita va yo'nalishlar",
    },
    {
      id: 6,
      question: "Yo'lovchi ko'p bo'lgan vaqtlar qaysilar?",
      answer:
        "Asosan ertalab soat 7:00-9:00 va kechqurun 17:00-19:00 oralig'ida metroda yo'lovchilar soni ko'p bo'ladi.",
      category: "Asosiy",
    },
    {
      id: 7,
      question: "Nega metroda internet ishlamaydi?",
      answer:
        "Metroda aloqa uzilishi tunellar va yer osti infratuzilmasi bilan bog'liq. Aloqa yaxshilash ustida ish olib borilmoqda.",
      category: "Asosiy",
    },
    {
      id: 8,
      question: "ATTO kartasini qanday to'ldirish mumkin?",
      answer:
        "ATTO kartasini terminallar, mobil ilovalar yoki bank ilovalari orqali to'ldirish mumkin.",
      category: "To'lov tizimi",
    },
    {
      id: 9,
      question:
        "Yo'l haqini to'lamasdan metroga kirganlarga qanday choralar ko'riladi?",
      answer:
        "Nazoratchilar tomonidan aniqlansa, jarima yoki boshqa ma'muriy choralar qo'llaniladi.",
      category: "Asosiy",
    },
    {
      id: 10,
      question: "Metrodagi videokuzatuv tizimi ishlaydimi?",
      answer:
        "Ha, barcha bekatlarda va vagonlarda videokuzatuv tizimi mavjud va faoliyat yuritadi.",
      category: "Xavfsizlik",
    },
  ];
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const categories = [
    "Barchasi",
    ...Array.from(new Set(faqData.map((faq) => faq.category))),
  ];
  const filteredFAQ =
    selectedCategory === "Barchasi"
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory);
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Tez-Tez So'raladigan Savollar
          </h1>
          <p className="text-gray-600 text-lg">
            Metro haqida sizning savollaringizga javoblar
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full bg-blue-900 text-white hover:bg-blue-800 hover:text-white/80"
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
                  Javobni ko'rish
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
