"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Bot, User, Clock, CreditCard, Route, Shield, Navigation, ChevronLeft, ChevronRight } from "lucide-react"

const predefinedQuestionsAndAnswers = [
  {
    id: 1,
    question: "Toshkent metrosi qancha vaqt ishlaydi?",
    answer:
      "Toshkent metrosi har kuni soat 5:00 dan 24:00 (yarim tungacha) gacha ishlaydi. Bu 19 soat davomida xizmat ko'rsatishni anglatadi. Birinchi poyezd soat 5:00 da, oxirgi poyezd esa soat 23:45 atrofida jo'naydi. Dam olish kunlari ham xuddi shu jadval bo'yicha ishlaydi.",
    icon: Clock,
    category: "Jadval",
  },
  {
    id: 2,
    question: "Metro chiptasi qancha turadi?",
    answer:
      "Hozirgi vaqtda Toshkent metrosida bir marta sayohat uchun chipta narxi 1400 so'm. Plastik karta (transport kartasi) orqali to'lov qilsangiz biroz arzonroq bo'ladi. Shuningdek, oylik va kunlik abonement kartalar ham mavjud bo'lib, ular muntazam foydalanuvchilar uchun tejamkor.",
    icon: CreditCard,
    category: "Chiptallar",
  },
  {
    id: 3,
    question: "Toshkent metrosining asosiy liniyalari qaysilar?",
    answer:
      "Toshkent metrosida 3 ta asosiy liniya mavjud:\n1. **Chilonzor liniyasi** (ko'k rang) - Chilonzordan Olmazorgacha\n2. **O'zbekiston liniyasi** (qizil rang) - Buyuk Ipak Yo'lidan Toshkent stansiyasigacha\n3. **Yunusobod liniyasi** (yashil rang) - Yunusoboddan Ming O'rikgacha\n\nJami 43 ta stansiya mavjud va liniyalar bir-biri bilan kesishadi.",
    icon: Route,
    category: "Liniyalar",
  },
  {
    id: 4,
    question: "Amir Temur Hiyobonidan Chorsuga qanday borish mumkin?",
    answer:
      "Amir Temur Hiyoboni stansiyasidan Chorsu stansiyasiga borish uchun:\n1. Amir Temur Hiyoboni stansiyasidan O'zbekiston liniyasi bo'yicha Alisher Navoiy stansiyasiga boring\n2. Alisher Navoiy stansiyasida Chilonzor liniyasiga o'ting\n3. Chilonzor liniyasi bo'yicha Chorsu stansiyasiga boring\n\nJami sayohat vaqti taxminan 15-20 daqiqa.",
    icon: Navigation,
    category: "Yo'nalish",
  },
  {
    id: 5,
    question: "Qaysi stansiyalar nogironlar uchun qulay?",
    answer:
      "Quyidagi stansiyalar nogironlar uchun maxsus jihozlangan:\n- Toshkent (markaziy vokzal)\n- Alisher Navoiy\n- Amir Temur Hiyoboni\n- Mustaqillik maydoni\n- Buyuk Ipak Yo'li\n\nBu stansiyalarda lift, maxsus yo'laklar va audio e'lonlar mavjud.",
    icon: Shield,
    category: "Qulaylik",
  },
  {
    id: 6,
    question: "Qanday to'lov usullari qabul qilinadi?",
    answer:
      "Metro uchun quyidagi to'lov usullari mavjud:\n- Naqd pul (1400 so'm)\n- Transport kartasi (plastik karta)\n- Mobil to'lov (ayrim stansiyalarda)\n- Oylik abonement kartalar\n- Kunlik kartalar\n\nTransport kartasi eng qulay va tejamkor usul hisoblanadi.",
    icon: CreditCard,
    category: "To'lov",
  },
]

const sliderImages = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=400",
    title: "Zamonaviy Metro Stansiyalari",
    description: "Toshkent metrosining go'zal va zamonaviy stansiyalari",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=200&width=400",
    title: "Tez va Qulay Transport",
    description: "Har kuni minglab yo'lovchilarni tashiydi",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=200&width=400",
    title: "Uchta Asosiy Liniya",
    description: "Chilonzor, O'zbekiston va Yunusobod liniyalari",
  },
]

export function MetroChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  const handleQuestionClick = (questionData) => {
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: questionData.question,
    }

    const botMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: questionData.answer,
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-sm md:max-w-md lg:max-w-lg h-[90vh] md:h-[600px] z-50 shadow-2xl mx-4 md:mx-0">
      <Card className="h-full flex flex-col bg-white">
        {/* Slider Section */}
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderImages.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 relative">
                <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{slide.title}</h3>
                  <p className="text-sm opacity-90">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-900/50 hover:bg-blue-900/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-900/50 hover:bg-blue-900/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slider Dots */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:bg-white/20 bg-blue-900/30"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Header */}
        <CardHeader className="bg-blue-900 text-white py-3">
          <CardTitle className="text-base md:text-lg flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            Tashkent Metro Assistant
          </CardTitle>
        </CardHeader>

        {/* Chat Content */}
        <CardContent className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 bg-gray-50">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="text-center text-gray-600 py-4">
                <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-medium">Toshkent Metro Yordamchisiga xush kelibsiz!</p>
                <p className="text-xs mt-2 text-gray-500">
                  Tezkor javob olish uchun quyidagi savollardan birini bosing:
                </p>
              </div>

              <div className="space-y-2">
                {predefinedQuestionsAndAnswers.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-3 hover:bg-blue-50 hover:border-blue-900 bg-white border-gray-200 transition-all duration-200"
                      onClick={() => handleQuestionClick(item)}
                    >
                      <div className="bg-blue-900 p-2 rounded-lg mr-3 flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-blue-900 font-medium bg-blue-100 px-2 py-1 rounded-full mb-1">
                          {item.category}
                        </span>
                        <span className="text-sm text-gray-700 font-medium">{item.question}</span>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 max-w-[85%] ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-blue-900 text-white"
                      : "bg-white text-blue-900 border-2 border-blue-900"
                  }`}
                >
                  {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    message.role === "user"
                      ? "bg-blue-900 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {messages.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-3 font-medium">Boshqa savol bering:</p>
              <div className="grid grid-cols-1 gap-2">
                {predefinedQuestionsAndAnswers.slice(0, 3).map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-2 hover:bg-blue-50 hover:border-blue-900 bg-white transition-all duration-200"
                      onClick={() => handleQuestionClick(item)}
                    >
                      <div className="bg-blue-900 p-1.5 rounded-md mr-2 flex-shrink-0">
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-700 truncate font-medium">{item.question}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>
      </Card>
    </div>
  )
}
