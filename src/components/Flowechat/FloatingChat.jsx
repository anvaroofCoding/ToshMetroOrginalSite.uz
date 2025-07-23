"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, Train, Clock, MapPin, CreditCard, Users, X, Minimize2, Send } from "lucide-react"

const metroQA = [
  {
    id: 1,
    question: "Toshkent metrosi qanday vaqtda ishlaydi?",
    answer:
      "Toshkent metrosi har kuni ertalab soat 5:00 dan kechqurun 24:00 gacha ishlaydi. Birinchi poyezd soat 5:00 da, oxirgi poyezd esa soat 23:30 da yakuniy bekatlardan jo'naydi.",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: 2,
    question: "Metro chiptasi qancha turadi?",
    answer:
      "Bir marta yo'l chiptasi 1,400 so'm turadi. Doimiy yo'lovchilar uchun oylik abonement ham mavjud bo'lib, u arzonroq. To'lov naqd pul yoki plastik karta orqali amalga oshiriladi.",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    id: 3,
    question: "Toshkent metrosida nechta liniya bor?",
    answer:
      "Toshkent metrosida hozirda 3 ta ishlaydigan liniya mavjud: Chilonzor liniyasi (qizil), O'zbekiston liniyasi (ko'k) va Yunusobod liniyasi (yashil). Tizimda jami 29 ta bekat mavjud.",
    icon: <Train className="w-4 h-4" />,
  },
  {
    id: 4,
    question: "Aeroportga qaysi bekatdan borish mumkin?",
    answer:
      "Hozircha Toshkent xalqaro aeroportiga to'g'ridan-to'g'ri metro yo'li yo'q. Lekin Ming O'rik bekatigacha metro bilan borib, keyin avtobus yoki taksi orqali aeroportga borish mumkin.",
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    id: 5,
    question: "Nogironlar uchun qulayliklar bormi?",
    answer:
      "Ha, Toshkent metrosining ko'pgina bekatlarida lift va eskalatorlar mavjud. Nogironlar uchun maxsus yordam ko'rsatiladi va barcha poyezdlarda imtiyozli o'rindiqlar ajratilgan.",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: 6,
    question: "Metro bekatlarida suratga olish mumkinmi?",
    answer:
      "Metro bekatlarida shaxsiy maqsadlarda suratga olish odatda ruxsat etiladi. Tijorat maqsadida suratga olish uchun maxsus ruxsat kerak bo'lishi mumkin. Bekatlar o'zining go'zal sovet davri me'morchiligi bilan mashhur.",
    icon: <MessageCircle className="w-4 h-4" />,
  },
]

export default function TashkentMetroChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [showQuestions, setShowQuestions] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage = {
        id: 0,
        type: "answer",
        content:
          "Assalomu alaykum! 👋 Toshkent Metro Ma'lumot Markaziga xush kelibsiz. Men sizga metro tizimi haqida barcha savollaringizga javob berishga tayyorman. Nima bilmoqchisiz?",
        icon: <Train className="w-4 h-4" />,
        timestamp: getCurrentTime(),
      }

      setTimeout(() => {
        setMessages([welcomeMessage])
      }, 800)
    }
  }, [isOpen, messages.length])

  const handleQuestionClick = (qa) => {
    // Add question to chat
    const questionMessage = {
      id: qa.id * 2,
      type: "question",
      content: qa.question,
      icon: qa.icon,
      timestamp: getCurrentTime(),
    }

    setMessages((prev) => [...prev, questionMessage])
    setShowQuestions(false)
    setIsTyping(true)

    // Simulate typing delay and add answer
    setTimeout(() => {
      setIsTyping(false)
      const answerMessage = {
        id: qa.id * 2 + 1,
        type: "answer",
        content: qa.answer,
        icon: qa.icon,
        timestamp: getCurrentTime(),
      }
      setMessages((prev) => [...prev, answerMessage])

      // Show questions again after answer
      setTimeout(() => {
        setShowQuestions(true)
      }, 1200)
    }, 2000)
  }

  const resetChat = () => {
    setMessages([])
    setShowQuestions(true)
    setIsTyping(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Main page content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl shadow-blue-600/30">
              <Train className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                Toshkent Metro
              </h1>
              <p className="text-lg text-slate-600 mt-1">Poytaxt transporti</p>
            </div>
          </div>

          <p className="text-xl text-slate-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Samarali, ishonchli va zamonaviy transport tizimi
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Train className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">3 ta liniya</h3>
              <p className="text-slate-600 leading-relaxed">Toshkentning barcha asosiy hududlarini qamrab oladi</p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">5:00 - 24:00</h3>
              <p className="text-slate-600 leading-relaxed">Har kunlik ish vaqti</p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">29 ta bekat</h3>
              <p className="text-slate-600 leading-relaxed">Shaharning strategik joylarida</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {isOpen && (
          <div className="mb-4 animate-in slide-in-from-bottom-8 duration-500 ease-out">
            <Card className="w-[420px] h-[600px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl shadow-blue-900/20 flex flex-col overflow-hidden rounded-3xl">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-sm">
                      <Train className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Metro Yordamchisi</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="text-sm text-blue-100">Onlayn • Yordam berishga tayyor</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={resetChat}
                      className="text-white/80 hover:text-white hover:bg-white/20 p-2 h-auto rounded-xl transition-all duration-200"
                    >
                      <Minimize2 className="w-5 h-5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white hover:bg-white/20 p-2 h-auto rounded-xl transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-white">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "question" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-500`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`max-w-[85%] group ${message.type === "question" ? "ml-8" : "mr-8"}`}>
                      <div
                        className={`p-4 rounded-3xl shadow-lg transition-all duration-300 ${
                          message.type === "question"
                            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-600/25 hover:shadow-blue-600/40"
                            : "bg-white text-slate-800 shadow-slate-200 hover:shadow-slate-300 border border-slate-100"
                        } ${message.type === "question" ? "rounded-br-lg" : "rounded-bl-lg"}`}
                      >
                        <div className="flex items-start gap-3">
                          {message.icon && (
                            <div
                              className={`mt-1 p-2 rounded-xl ${
                                message.type === "question" ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              {message.icon}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                            {message.timestamp && (
                              <p
                                className={`text-xs mt-2 ${
                                  message.type === "question" ? "text-blue-100" : "text-slate-500"
                                }`}
                              >
                                {message.timestamp}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300 mr-8">
                    <div className="bg-white p-4 rounded-3xl rounded-bl-lg shadow-lg border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-xl">
                          <Train className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                          </div>
                          <span className="text-slate-600 text-sm font-medium">Yozmoqda...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {showQuestions && !isTyping && (
                <div className="p-6 border-t border-slate-100 bg-white animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <Send className="w-4 h-4 text-blue-600" />
                    <p className="text-sm text-slate-700 font-semibold">Tez savollar:</p>
                  </div>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {metroQA.slice(0, 4).map((qa, index) => (
                      <Button
                        key={qa.id}
                        onClick={() => handleQuestionClick(qa)}
                        className="w-full text-left text-sm p-4 h-auto bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all duration-300 rounded-2xl group animate-in slide-in-from-right-4"
                        style={{ animationDelay: `${index * 100}ms` }}
                        variant="outline"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-blue-500 group-hover:text-blue-600 transition-colors duration-200 p-2 bg-blue-50 group-hover:bg-blue-100 rounded-xl">
                            {qa.icon}
                          </div>
                          <span className="font-medium leading-relaxed">{qa.question}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Chat Toggle Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-2xl shadow-blue-600/50 border-0 transition-all duration-300 relative overflow-hidden group ${
            isOpen ? "rotate-0 scale-95" : "hover:scale-110 hover:-translate-y-1"
          }`}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            {isOpen ? (
              <X className="w-7 h-7 text-white transition-transform duration-300" />
            ) : (
              <MessageCircle className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>
        </Button>

        {/* Notification dot */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-3 border-white shadow-lg">
            <div className="w-full h-full bg-red-400 rounded-full animate-ping opacity-75"></div>
          </div>
        )}
      </div>
    </div>
  )
}
