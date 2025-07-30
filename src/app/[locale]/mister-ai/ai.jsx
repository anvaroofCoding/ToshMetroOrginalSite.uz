"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"



const predefinedQAs = [
  {
    id: 1,
    question: "Sun'iy intellekt nima?",
    answer:
      "Sun'iy intellekt (AI) - bu kompyuter fanlari sohasi bo'lib, inson aqlining vazifalarini bajaradigan aqlli mashinalar yaratishga qaratilgan. Bu o'rganish, mulohaza yuritish, muammolarni hal qilish va tabiiy tilni tushunish kabi vazifalarni o'z ichiga oladi.",
    category: "Texnologiya",
  },
  {
    id: 2,
    question: "Mashinani o'rgatish qanday ishlaydi?",
    answer:
      "Mashinani o'rgatish - bu AI ning bir qismi bo'lib, kompyuterlarga aniq dasturlashtirilmasdan tajribadan o'rganish va yaxshilanish imkonini beradi. U ma'lumotlarni tahlil qilish, naqshlarni aniqlash va bashorat qilish uchun algoritmlardan foydalanadi.",
    category: "Texnologiya",
  },
  {
    id: 3,
    question: "Bulutli hisoblashning afzalliklari qanday?",
    answer:
      "Bulutli hisoblash kengayuvchanlik, tejamkorlik, istalgan joydan kirish imkoniyati, avtomatik yangilanishlar, kuchaytirilgan xavfsizlik va IT infratuzilma xarajatlarini kamaytirish kabi afzalliklarni taqdim etadi.",
    category: "Bulut",
  },
  {
    id: 4,
    question: "Kiberxavfsizlik nima?",
    answer:
      "Kiberxavfsizlik - bu tizimlar, tarmoqlar va dasturlarni raqamli hujumlardan himoya qilish amaliyotidir. Bu ruxsatsiz kirishni, ma'lumotlar buzilishini va boshqa kiber tahdidlarni oldini olish choralarini o'z ichiga oladi.",
    category: "Xavfsizlik",
  },
  {
    id: 5,
    question: "Ma'lumotlar bazasi qanday ishlaydi?",
    answer:
      "Ma'lumotlar bazasi - bu elektron tarzda saqlangan tuzilgan ma'lumotlarning tartibli to'plami. Ular boshqaruv tizimlari (DBMS) orqali ma'lumotlarni samarali saqlash, olish va boshqarish uchun ishlatiladi.",
    category: "Ma'lumotlar",
  },
  {
    id: 6,
    question: "Moslashuvchan veb-dizayn nima?",
    answer:
      "Moslashuvchan veb-dizayn - bu veb-sahifalarni turli qurilmalar va ekran o'lchamlarida yaxshi ko'rsatish yondashuvi. U moslashuvchan tartib, rasmlar va CSS media so'rovlaridan foydalanadi.",
    category: "Dizayn",
  },
  {
    id: 7,
    question: "Blockchain texnologiyasi qanday ishlaydi?",
    answer:
      "Blockchain - bu ma'lumotlarni markazlashtirilmagan tarzda saqlash texnologiyasi. Har bir blok oldingi blok bilan bog'langan bo'lib, bu ma'lumotlarning o'zgarmasligini va xavfsizligini ta'minlaydi.",
    category: "Blockchain",
  },
  {
    id: 8,
    question: "IoT (Narsalar interneti) nima?",
    answer:
      "IoT - bu kundalik buyumlarni internetga ulash va ular orasida ma'lumot almashish imkoniyatidir. Bu uy jihozlari, avtomobillar, sensorlar va boshqa qurilmalarni o'z ichiga oladi.",
    category: "IoT",
  },
]



export default function AIChat() {
  const [chatMessages, setChatMessages] = useState([])
  const [animatingMessageId, setAnimatingMessageId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("Barchasi")

  const categories = ["Barchasi", ...Array.from(new Set(predefinedQAs.map((qa) => qa.category)))]

  const filteredQAs =
    selectedCategory === "Barchasi" ? predefinedQAs : predefinedQAs.filter((qa) => qa.category === selectedCategory)

  const handleQuestionClick = (qa) => {
    const questionMessage = {
      id: Date.now(),
      type: "question",
      content: qa.question,
      timestamp: new Date(),
      category: qa.category,
    }

    const answerMessage = {
      id: Date.now() + 1,
      type: "answer",
      content: qa.answer,
      timestamp: new Date(),
      category: qa.category,
    }

    setChatMessages((prev) => [...prev, questionMessage])

    setTimeout(() => {
      setAnimatingMessageId(answerMessage.id)
      setChatMessages((prev) => [...prev, answerMessage])

      setTimeout(() => {
        setAnimatingMessageId(null)
      }, 800)
    }, 600)
  }

  const clearChat = () => {
    setChatMessages([])
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      {/* <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-6 sm:py-8 md:py-12 px-4 sm:px-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full -translate-y-32 sm:-translate-y-48 translate-x-32 sm:translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full translate-y-24 sm:translate-y-32 -translate-x-24 sm:-translate-x-32"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text mb-2 sm:mb-4">
              AI Tezkor Javoblar
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-2xl">
              Sun'iy intellekt yordamida texnologiya bo'yicha savollaringizga zudlik bilan javob oling
            </p>
            <div className="mt-3 sm:mt-4">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-white/20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                AI Yordamchi
              </span>
            </div>
          </div>
        </div>
      </header> */}

      <div className="container py-6 sm:py-8 space-y-6 sm:space-y-8 -mt-4 relative z-20">
        {/* Quick Questions Section */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-2">Tezkor Savollar</h2>
              <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-900 to-blue-600 rounded-full"></div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 min-h-[36px] sm:min-h-[40px] ${
                    selectedCategory === category
                      ? "bg-blue-900 hover:bg-blue-800 text-white shadow-lg"
                      : "border-blue-200 text-blue-900 hover:bg-blue-50 bg-transparent"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredQAs.map((qa) => (
                <Button
                  key={qa.id}
                  variant="outline"
                  className="h-auto p-4 sm:p-5 text-left justify-start border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50 hover:from-blue-50 hover:to-blue-100/50 group min-h-[80px] sm:min-h-[100px]"
                  onClick={() => handleQuestionClick(qa)}
                >
                  <div className="flex flex-col gap-2 sm:gap-3 w-full">
                    <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium self-start">
                      {qa.category}
                    </span>
                    <span className="text-sm sm:text-base text-blue-900 font-medium line-clamp-3 group-hover:text-blue-800 transition-colors leading-relaxed">
                      {qa.question}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm min-h-[400px] sm:min-h-[500px]">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-2">AI Suhbat</h2>
                <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
              </div>
              {chatMessages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearChat}
                  className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent rounded-full px-4 sm:px-6 py-2 sm:py-2.5 min-h-[36px] sm:min-h-[40px] text-xs sm:text-sm"
                >
                  Suhbatni tozalash
                </Button>
              )}
            </div>

            <div className="space-y-4 sm:space-y-6">
              {chatMessages.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-20">
                  <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full mx-auto flex items-center justify-center mb-4 sm:mb-6">
                    <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm sm:text-base md:text-lg">AI</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">
                    Salom! Men sizning AI yordamchingizman
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed">
                    Yuqoridagi savollardan birini tanlang va javobni oling!
                  </p>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 sm:gap-4 ${message.type === "question" ? "justify-end" : "justify-start"} ${
                      animatingMessageId === message.id ? "animate-slide-in-bounce" : ""
                    }`}
                  >
                    {message.type === "answer" && (
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-900 to-indigo-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-xs sm:text-sm">AI</span>
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-4 sm:p-5 rounded-2xl shadow-lg ${
                        message.type === "question"
                          ? "bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-br-md"
                          : "bg-gradient-to-br from-gray-50 to-white text-gray-800 rounded-bl-md border border-gray-200"
                      }`}
                    >
                      {message.category && message.type === "answer" && (
                        <div className="mb-3">
                          <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                            {message.category}
                          </span>
                        </div>
                      )}
                      <p className="text-sm sm:text-base md:text-lg leading-relaxed">{message.content}</p>
                      <p
                        className={`text-xs sm:text-sm mt-3 ${message.type === "question" ? "text-blue-100" : "text-gray-500"}`}
                      >
                        {message.timestamp.toLocaleTimeString("uz-UZ")}
                      </p>
                    </div>

                    {message.type === "question" && (
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-blue-900 font-bold text-xs sm:text-sm">Siz</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
