"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import {
  Loader2,
  Send,
  Phone,
  Mail,
  User,
  MessageSquare,
  MapPin,
} from "lucide-react";

export default function MetroLostItemForm() {
  const [formData, setFormData] = useState({
    name_uz: "",
    phone: "+998",
    email: "",
    address: "",
    passport: "",
    message_uz: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Check if user is blocked on component mount and set up timer
  useEffect(() => {
    const checkBlockStatus = () => {
      const blockData = localStorage.getItem("formBlockData");
      if (blockData) {
        const { attempts, blockStartTime } = JSON.parse(blockData);
        const currentTime = Date.now();
        const blockDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
        const timeElapsed = currentTime - blockStartTime;

        if (attempts >= 3 && timeElapsed < blockDuration) {
          // Still blocked
          setIsBlocked(true);
          setFailedAttempts(attempts);
          const remainingTime = Math.ceil((blockDuration - timeElapsed) / 1000);
          setBlockTimeRemaining(remainingTime);

          // Start countdown timer
          const timer = setInterval(() => {
            setBlockTimeRemaining((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                setIsBlocked(false);
                setFailedAttempts(0);
                localStorage.removeItem("formBlockData");
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(timer);
        } else if (attempts >= 3 && timeElapsed >= blockDuration) {
          // Block period has expired
          localStorage.removeItem("formBlockData");
          setIsBlocked(false);
          setFailedAttempts(0);
        } else {
          // Not blocked but has some failed attempts
          setFailedAttempts(attempts);
        }
      }
    };

    checkBlockStatus();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    // Allow user to delete the +998 prefix if they want
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is blocked
    if (isBlocked) {
      return;
    }

    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const response = await fetch(
        "https://metro-site.onrender.com/api/lost-items/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Success - clear any failed attempts
        localStorage.removeItem("formBlockData");
        setFailedAttempts(0);
        setShowSuccess(true);
        // Reset form
        setFormData({
          name_uz: "",
          phone: "+998",
          email: "",
          address: "",
          passport: "",
          message_uz: "",
        });
      } else {
        throw new Error("Xatolik yuz berdi");
      }
    } catch (error) {
      // Handle failed attempt
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);

      const blockData = {
        attempts: newFailedAttempts,
        blockStartTime: Date.now(),
      };

      localStorage.setItem("formBlockData", JSON.stringify(blockData));

      if (newFailedAttempts >= 3) {
        // Block the user for 10 minutes
        setIsBlocked(true);
        setBlockTimeRemaining(10 * 60); // 10 minutes in seconds

        // Start 10-minute countdown
        const blockTimer = setInterval(() => {
          setBlockTimeRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(blockTimer);
              setIsBlocked(false);
              setFailedAttempts(0);
              localStorage.removeItem("formBlockData");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        // Show error and start countdown
        setShowError(true);
        setIsCountingDown(true);
        setCountdown(10);

        // Start countdown timer
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setShowError(false);
              setIsCountingDown(false);
              setCountdown(10);
              return 10;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const resetSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className=" py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {showSuccess ? (
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="p-8 text-center">
              <div className="mb-6 py-5">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Murojaatingiz muvaffaqiyatli qabul qilindi!
                </h2>
                <p className="text-gray-600 mb-6">
                  Tez orada siz bilan bog'lanamiz.
                </p>
                <Button
                  onClick={resetSuccess}
                  className="bg-blue-900 hover:bg-blue-800 text-white"
                >
                  Yangi murojaat yuborish
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : isBlocked ? (
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-5V9m0 0V7m0 2h2m-2 0H10M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-orange-600 mb-2">
                  Forma vaqtincha bloklangan
                </h2>
                <p className="text-gray-600 mb-4">
                  3 marta muvaffaqiyatsiz urinish tufayli forma 10 daqiqaga
                  bloklangan.
                </p>
                <div className="mb-4">
                  <div className="text-4xl font-bold text-blue-900 mb-2">
                    {formatTime(blockTimeRemaining)}
                  </div>
                  <p className="text-sm text-gray-500">qolgan vaqt</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Xavfsizlik choralari sababli forma vaqtincha ishlamaydi.
                    Iltimos, belgilangan vaqtdan keyin qayta urinib ko'ring.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : showError ? (
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                  Xatolik yuz berdi
                </h2>
                <p className="text-gray-600 mb-4">
                  Murojaat yuborishda xatolik yuz berdi. Iltimos, ma'lumotlarni
                  tekshirib qayta urinib ko'ring.
                </p>
                {isCountingDown && (
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-900 mb-2">
                      {countdown}
                    </div>
                    <p className="text-sm text-gray-500">
                      soniyadan keyin forma qayta ko'rsatiladi
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
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
                  <Label
                    htmlFor="name_uz"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-blue-900" />
                    To'liq ismingiz
                  </Label>
                  <Input
                    id="name_uz"
                    type="text"
                    value={formData.name_uz}
                    onChange={(e) =>
                      handleInputChange("name_uz", e.target.value)
                    }
                    placeholder="FIO"
                    required
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
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
                    Misol: +998 90 123 45 67 (Kerak bo'lsa +998 ni o'chirib
                    tashlashingiz mumkin)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
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
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-blue-900" />
                    Manzil
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Manzilning to'liq nomi"
                    required
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="passport"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-blue-900" />
                    Passport seriya
                  </Label>
                  <Input
                    id="passport"
                    type="text"
                    value={formData.passport}
                    onChange={(e) =>
                      handleInputChange("passport", e.target.value)
                    }
                    placeholder="AD0000000"
                    required
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message_uz"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-900" />
                    Murojaat matni
                  </Label>
                  <Textarea
                    id="message_uz"
                    value={formData.message_uz}
                    onChange={(e) =>
                      handleInputChange("message_uz", e.target.value)
                    }
                    placeholder="Iltimos biz aniqroq ko'rib chiqishimiz uchun izohlarni to'liq yozishingizni so'raymiz..."
                    required
                    rows={6}
                    className="border-gray-300 focus:border-blue-900 focus:ring-blue-900 resize-none"
                  />
                </div>

                <div className="pt-4">
                  {failedAttempts > 0 && failedAttempts < 3 && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Ogohlantirish: {failedAttempts}/3 muvaffaqiyatsiz
                        urinish.
                        {3 - failedAttempts} ta urinish qoldi.
                      </p>
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting || isBlocked}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Yuborilmoqda...
                      </>
                    ) : isBlocked ? (
                      <>Forma bloklangan</>
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
        )}
      </div>
    </div>
  );
}
