"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostMurojaatMutation } from "@/store/services/api";
import { toast, Toaster } from "sonner";

export default function MetroLostItemForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    // Step 2: Aloqa
    phone: "+998",
    email: "",
    // Step 3: Passport & Manzil
    passportSeries: "",
    passportNumber: "",
    address: "",
    // Step 4: Izoh
    message: "",
  });
  const [postLostITems, { isLoading }] = usePostMurojaatMutation();

  const totalSteps = 4;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@gmail.com")) {
      toast.info("Faqat @gmail.com email manzili ruxsat etiladi");
      return;
    }

    const finalData = {
      name: `${formData.lastName} ${formData.firstName} ${formData.middleName}`.trim(),
      phone: formData.phone,
      email: formData.email,
      passport: `${formData.passportSeries}${formData.passportNumber}`,
      address: formData.address,
      message: formData.message,
    };
    await postLostITems(finalData).unwrap();
    toast.success("Murojaatingiz muvaffaqiyatli qabul qilindi!");
  };

  // Progress bar uchun foiz hisoblash
  const progress = (step / totalSteps) * 100;

  return (
    <Card className="container bg-white shadow-2xl border-blue-100 overflow-hidden">
      {/* Progress Bar */}
      <Toaster richColors position="bottom-right" expand={true} closeButton />

      <div className="h-1.5 w-full bg-blue-50">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <div>
              <MessageSquare size={20} />
            </div>
            Murojaat yo‘llash
          </CardTitle>
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            Bosqich {step}/{totalSteps}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: SHAXSIY MA'LUMOTLAR */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-900 font-semibold">
                    Familiya
                  </Label>
                  <Input
                    required
                    placeholder="Familiyangizni kiriting"
                    className="focus:border-blue-500 focus:ring-blue-500"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-900 font-semibold">Ism</Label>
                  <Input
                    required
                    placeholder="Ismingizni kiriting"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-900 font-semibold">
                    Otasining ismi
                  </Label>
                  <Input
                    placeholder="Otangizning ismini kiriting"
                    value={formData.middleName}
                    onChange={(e) => handleChange("middleName", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ALOQA */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <Label className="text-blue-900 font-semibold flex items-center gap-2">
                  <Phone size={16} className="text-blue-600" /> Telefon raqam
                </Label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (!value.startsWith("998")) value = "998";
                    handleChange("phone", "+" + value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-blue-900 font-semibold flex items-center gap-2">
                  <Mail size={16} className="text-blue-600" /> Email (Faqat
                  Gmail)
                </Label>
                <Input
                  required
                  type="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 3: PASSPORT VA MANZIL */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <Label className="text-blue-900 font-semibold flex items-center gap-2">
                  <CreditCard size={16} className="text-blue-600" /> Passport
                  ma'lumotlari
                </Label>
                <div className="flex gap-2">
                  <Input
                    required
                    placeholder="AD"
                    maxLength={2}
                    className="w-24 uppercase font-bold text-center border-blue-200"
                    value={formData.passportSeries}
                    onChange={(e) =>
                      handleChange(
                        "passportSeries",
                        e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase(),
                      )
                    }
                  />
                  <Input
                    required
                    placeholder="1234567"
                    maxLength={7}
                    className="font-mono tracking-widest border-blue-200"
                    value={formData.passportNumber}
                    onChange={(e) =>
                      handleChange(
                        "passportNumber",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-900 font-semibold flex items-center gap-2">
                  <MapPin size={16} className="text-blue-600" /> Yashash manzili
                </Label>
                <Input
                  required
                  placeholder="Viloyat, tuman, ko'cha, uy..."
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 4: XABAR */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <Label className="text-blue-900 font-semibold flex items-center gap-2">
                  <MessageSquare size={16} className="text-blue-600" /> Batafsil
                  izoh
                </Label>
                <Textarea
                  required
                  rows={6}
                  placeholder="Yo'qotilgan buyum haqida yoki murojaatingiz mazmunini yozing..."
                  className="border-blue-200 focus:ring-blue-500"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Tugmalar paneli */}
          <div className="flex gap-3 pt-4 border-t border-blue-50">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <ArrowLeft size={18} className="mr-2" /> Orqaga
              </Button>
            )}

            {step < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Keyingisi <ArrowRight size={18} className="ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-100"
              >
                <CheckCircle2 size={18} className="mr-2" /> Yuborish
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
