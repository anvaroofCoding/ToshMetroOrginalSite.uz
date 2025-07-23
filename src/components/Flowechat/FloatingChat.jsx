"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Bot, User, Clock, MapPin, CreditCard, Route, Shield, Navigation } from "lucide-react"


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
  {
    id: 7,
    question: "Eng gavjum vaqtlarda poyezdlar qancha tez-tez yuradi?",
    answer:
      "Poyezdlar harakati jadvali:\n- Eng gavjum vaqtlarda (7:00-9:00 va 17:00-19:00): har 2-3 daqiqada\n- Oddiy vaqtlarda: 4-5 daqiqa oraliqda\n- Kechqurun: 6-8 daqiqa oraliqda\n\nDam olish kunlari biroz kamroq tez-tez harakat qiladi.",
    icon: Clock,
    category: "Jadval",
  },
  {
    id: 8,
    question: "Toshkent Markaziy vokzali qayerda joylashgan?",
    answer:
      "Toshkent Markaziy vokzali \"Toshkent\" metro stansiyasi yonida joylashgan. Bu O'zbekiston liniyasining oxirgi stansiyasi. Vokzaldan barcha shaharlararo poyezdlar jo'naydi va u shaharning markaziy qismida joylashgan.",
    icon: MapPin,
    category: "Stansiyalar",
  },
  {
    id: 9,
    question: "Metro qoidalari va xavfsizlik choralari qanday?",
    answer:
      "Metro xavfsizlik qoidalari:\n- Poyezd kelayotganda sariq chiziqdan orqaga turing\n- Eshiklar ochilishini kuting\n- Avval chiquvchilarga yo'l bering\n- Bagajingizga e'tibor bering\n- Noma'lum narsalarni ko'rsangiz xodimlarni xabardor qiling\n- Chekish va ovqatlanish taqiqlanadi",
    icon: Shield,
    category: "Xavfsizlik",
  },
  {
    id: 10,
    question: "Yangi metro liniyalari qurilishi haqida ma'lumot bering",
    answer:
      "Hozirgi vaqtda Toshkent metrosini kengaytirish loyihalari amalga oshirilmoqda:\n- Yangi stansiyalar qurilmoqda\n- Mavjud liniyalar uzaytirilmoqda\n- Shaharning yangi hududlariga metro yetkazish rejalashtirilgan\n\nAniq ma'lumotlar uchun rasmiy e'lonlarni kuzatib boring.",
    icon: Route,
    category: "Yangiliklar",
  },
  {
    id: 11,
    question: "Mustaqillik maydoni stansiyasidan Olmazor stansiyasiga qanday borish mumkin?",
    answer:
      "Mustaqillik maydoni stansiyasidan Olmazor stansiyasiga borish:\n1. Mustaqillik maydoni stansiyasidan O'zbekiston liniyasi bo'yicha Alisher Navoiy stansiyasiga boring\n2. Alisher Navoiy stansiyasida Chilonzor liniyasiga o'ting\n3. Chilonzor liniyasi bo'yicha Olmazor stansiyasiga boring\n\nSayohat vaqti taxminan 20-25 daqiqa.",
    icon: Navigation,
    category: "Yo'nalish",
  },
  {
    id: 12,
    question: "Metro stansiyalarida qanday xizmatlar mavjud?",
    answer:
      "Metro stansiyalarida mavjud xizmatlar:\n- Kichik do'konlar va bufetlar\n- Telefon zaryad qilish joylari\n- Wi-Fi internet\n- Hojatxonalar (ayrim stansiyalarda)\n- Ma'lumot stendlari\n- Xavfsizlik xizmati\n- Yo'qolgan narsalar bo'limi",
    icon: MapPin,
    category: "Xizmatlar",
  },
]

export function MetroChat( isOpen, onClose ) {
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuestionClick = (questionData) => {
    // Add user question
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: questionData.question,
    }

    // Add bot answer
    const botMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: questionData.answer,
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] z-50 shadow-2xl">
      <Card className="h-full flex flex-col">
        <CardHeader className="bg-blue-900 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              Tashkent Metro Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-blue-800">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="text-center text-gray-500 py-4">
                <Bot className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <p className="text-sm font-medium">Toshkent Metro Yordamchisiga xush kelibsiz!</p>
                <p className="text-xs mt-2">Tezkor javob olish uchun quyidagi savollardan birini bosing:</p>
              </div>

              <div className="space-y-2">
                {predefinedQuestionsAndAnswers.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-3 hover:bg-blue-50 hover:border-blue-900 bg-transparent"
                      onClick={() => handleQuestionClick(item)}
                    >
                      <IconComponent className="w-4 h-4 mr-3 text-blue-900 flex-shrink-0" />
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-blue-900 font-medium">{item.category}</span>
                        <span className="text-sm text-gray-700">{item.question}</span>
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
                    message.role === "user" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`px-3 py-2 rounded-lg ${
                    message.role === "user" ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {messages.length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500 text-center mb-3">Boshqa savol bering:</p>
              <div className="space-y-2">
                {predefinedQuestionsAndAnswers.slice(0, 4).map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-2 hover:bg-blue-50 hover:border-blue-900 bg-transparent"
                      onClick={() => handleQuestionClick(item)}
                    >
                      <IconComponent className="w-3 h-3 mr-2 text-blue-900 flex-shrink-0" />
                      <span className="text-xs text-gray-700 truncate">{item.question}</span>
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
