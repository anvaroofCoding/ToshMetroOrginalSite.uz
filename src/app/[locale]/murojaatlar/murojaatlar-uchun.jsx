"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Textarea from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, Phone, Mail, User, MessageSquare } from "lucide-react"

export default function MetroLostItemForm() {
  const [formData, setFormData] = useState({
    name_uz: "",
    phone: "+998",
    email: "",
    message_uz: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePhoneChange = (value) => {
    // Allow user to delete the +998 prefix if they want
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://metro-site.onrender.com/api/lost-items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Muvaffaqiyatli yuborildi",
          description: "Sizning murojaatingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.",
        })
        // Reset form
        setFormData({
          name_uz: "",
          phone: "+998",
          email: "",
          message_uz: "",
        })
      } else {
        throw new Error("Xatolik yuz berdi")
      }
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Murojaat yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Murojaatlar bo'limi</h1>
        </div>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-blue-900 text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Murojaat Shakli
            </CardTitle>
            <CardDescription className="text-blue-100">
              Barcha maydonlarni to'ldiring va biz siz bilan bog'lanamiz
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name_uz" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-900" />
                  To'liq ismingiz
                </Label>
                <Input
                  id="name_uz"
                  type="text"
                  value={formData.name_uz}
                  onChange={(e) => handleInputChange("name_uz", e.target.value)}
                  placeholder="FIO"
                  required
                  className="border-gray-300 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-900" />
                  Telefon raqami
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="+998 XX XXX XX XX"
                  required
                  className="border-gray-300 focus:border-blue-900 focus:ring-blue-900"
                />
                <p className="text-xs text-gray-500">
                  Misol: +998 90 123 45 67 (Kerak bo'lsa +998 ni o'chirib tashlashingiz mumkin)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-900" />
                  Elektron pochta
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@email.com"
                  required
                  className="border-gray-300 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message_uz" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-900" />
                  Murojaat matni
                </Label>
                <Textarea
                  id="message_uz"
                  value={formData.message_uz}
                  onChange={(e) => handleInputChange("message_uz", e.target.value)}
                  placeholder="Iltimos biz aniqroq ko'rib chiqishimiz uchun izohlarni to'liq yozishingizni so'raymiz..."
                  required
                  rows={6}
                  className="border-gray-300 focus:border-blue-900 focus:ring-blue-900 resize-none"
                />
                <p className="text-xs text-gray-500">
                  Yo'qolgan buyumingiz haqida iloji boricha ko'proq ma'lumot bering
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Murojaatni Yuborish
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>


      </div>
    </div>
  )
}
