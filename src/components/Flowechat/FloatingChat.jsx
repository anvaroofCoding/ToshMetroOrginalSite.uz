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
      "Toshkent metrosida hozirda 3 ta ishlaydigan liniya mavjud: Chilonzor yo'li (qizil), O'zbekiston yo'li (ko'k) va Yunusobod yo'li (yashil). Tizimda jami 29 ta bekat mavjud.",
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
    <div>
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[600px] md:h-[600px] bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        {/* Chat Window */}
        {isOpen && (
          <div className="mb-4 animate-in slide-in-from-bottom-8 duration-500 ease-out">
            <Card
              className={`
              w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] 
              sm:w-[380px] sm:h-[500px] 
              md:w-[420px] md:h-[600px] 
              lg:w-[450px] lg:h-[650px]
              bg-gradient-to-b from-blue-900/95 to-slate-900/95 
              backdrop-blur-xl border-0 shadow-2xl shadow-blue-900/40 
              flex flex-col overflow-hidden rounded-2xl md:rounded-3xl
            `}
            >
              {/* Header */}
              <div className="p-4 md:p-6 bg-gradient-to-r from-blue-800 via-blue-900 to-slate-800 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-blue-300 rounded-full -translate-x-12 -translate-y-12 md:-translate-x-16 md:-translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-blue-300 rounded-full translate-x-8 translate-y-8 md:translate-x-12 md:translate-y-12"></div>
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-blue-700/30 rounded-xl md:rounded-2xl border border-blue-600/30 backdrop-blur-sm">
                      <Train className="w-5 h-5 md:w-6 md:h-6 text-blue-200" />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-100 text-base md:text-lg">Metro Yordamchisi</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="text-xs md:text-sm text-blue-300">Onlayn • Yordam berishga tayyor</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={resetChat}
                      className="text-blue-200 hover:text-blue-100 hover:bg-blue-800/50 p-1.5 md:p-2 h-auto rounded-lg md:rounded-xl transition-all duration-200"
                    >
                      <Minimize2 className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      className="text-blue-200 hover:text-blue-100 hover:bg-blue-800/50 p-1.5 md:p-2 h-auto rounded-lg md:rounded-xl transition-all duration-200"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "question" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-500`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`max-w-[85%] group ${message.type === "question" ? "ml-4 md:ml-8" : "mr-4 md:mr-8"}`}
                    >
                      <div
                        className={`p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-lg transition-all duration-300 ${
                          message.type === "question"
                            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-blue-100 shadow-blue-600/25 hover:shadow-blue-600/40"
                            : "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 shadow-slate-700/25 hover:shadow-slate-700/40 border border-slate-600/50"
                        } ${message.type === "question" ? "rounded-br-lg" : "rounded-bl-lg"}`}
                      >
                        <div className="flex items-start gap-2 md:gap-3">
                          {message.icon && (
                            <div
                              className={`mt-1 p-1.5 md:p-2 rounded-lg md:rounded-xl ${
                                message.type === "question"
                                  ? "bg-blue-500/30 text-blue-200"
                                  : "bg-slate-600/50 text-slate-300"
                              }`}
                            >
                              {message.icon}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-xs md:text-sm leading-relaxed font-medium">{message.content}</p>
                            {message.timestamp && (
                              <p
                                className={`text-xs mt-1 md:mt-2 ${
                                  message.type === "question" ? "text-blue-300" : "text-slate-400"
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
                  <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300 mr-4 md:mr-8">
                    <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-3 md:p-4 rounded-2xl md:rounded-3xl rounded-bl-lg shadow-lg border border-slate-600/50">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 bg-slate-600/50 rounded-lg md:rounded-xl">
                          <Train className="w-3 h-3 md:w-4 md:h-4 text-slate-300" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                          <span className="text-slate-300 text-xs md:text-sm font-medium">Yozmoqda...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {showQuestions && !isTyping && (
                <div className="p-3 md:p-6 border-t border-slate-700/50 bg-gradient-to-b from-slate-800/80 to-slate-900/80 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <Send className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    <p className="text-xs md:text-sm text-blue-300 font-semibold">Tez savollar:</p>
                  </div>
                  <div className="space-y-2 md:space-y-3 max-h-32 md:max-h-40 overflow-y-auto">
                    {metroQA.slice(0, 4).map((qa, index) => (
                      <Button
                        key={qa.id}
                        onClick={() => handleQuestionClick(qa)}
                        className="w-full text-left text-xs md:text-sm p-3 md:p-4 h-auto bg-slate-800/50 hover:bg-slate-700/70 border border-slate-600/50 hover:border-slate-500/70 text-slate-200 hover:text-blue-200 transition-all duration-300 rounded-xl md:rounded-2xl group animate-in slide-in-from-right-4"
                        style={{ animationDelay: `${index * 100}ms` }}
                        variant="outline"
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-200 p-1.5 md:p-2 bg-slate-700/50 group-hover:bg-slate-600/50 rounded-lg md:rounded-xl">
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
          className={`
            w-12 h-12 md:w-16 md:h-16 
            rounded-xl md:rounded-2xl 
            bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 
            hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 
            shadow-2xl shadow-blue-600/50 border-0 
            transition-all duration-300 relative overflow-hidden group 
            ${isOpen ? "rotate-0 scale-95" : "hover:scale-110 hover:-translate-y-1"}
            touch-manipulation
          `}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            {isOpen ? (
              <X className="w-5 h-5 md:w-7 md:h-7 text-blue-100 transition-transform duration-300" />
            ) : (
              <MessageCircle className="w-5 h-5 md:w-7 md:h-7 text-blue-100 transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>
        </Button>

        {/* Notification dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 md:border-3 border-blue-900 shadow-lg">
            <div className="w-full h-full bg-red-400 rounded-full animate-ping opacity-75"></div>
          </div>
        )}
      </div>
    </div>
  )
}
