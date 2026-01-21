"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useLostItemsMeQuery,
  usePostMurojaatMutation,
} from "@/store/services/api";
import { CheckCircle, Loader, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
export default function MetroLostItemForm() {
  const { data, isLoading: loadsn, refetch } = useLostItemsMeQuery();
  const t = useTranslations("menu");
  const [formData, setFormData] = useState({
    email: "",
    passport: "",
    address: "",
    message: "",
  });
  const [postLostITems, { isLoading }] = usePostMurojaatMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalData = {
        email: formData.email,
        passport: formData.passport,
        address: formData.address,
        message: formData.message,
        status: "pending",
      };
      await postLostITems(finalData).unwrap();
      toast.success(t("success_received"));
      refetch();
    } catch (error) {
      if (error?.data?.phone) toast.error(error?.data.phone[0]);
      if (error?.data?.message) toast.error(t("comment_required"));
      if (error?.data?.passport) toast.error(t("passport_required"));
    }
  };

  if (loadsn) {
    return (
      <div className="w-full h-screen justify-center flex items-center">
        <p>{t("two_hundred_thirteen")}</p>
      </div>
    );
  }
  if (data?.requests[0]?.can_send_new_request == true) {
    return (
      <Card className="container">
        <CardHeader>
          <CardTitle className={"text-blue-900"}>{t("send_request")}</CardTitle>
          <CardDescription>{t("form_warning")}</CardDescription>
        </CardHeader>
        <CardContent className={"grid grid-cols-1 lg:grid-cols-2 gap-2"}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">{t("one_hundred_eighty_six")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passport">{t("passport_label")}</Label>
              <Input
                id="passport"
                type="text"
                placeholder="AD1234567"
                required
                value={formData.passport}
                onChange={(e) =>
                  setFormData({ ...formData, passport: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">{t("address_labels")}</Label>
              <Input
                id="address"
                type="text"
                placeholder={t("address_placeholder")}
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="w-full h-full">
              <Label htmlFor="discription" className={"mb-2"}>
                {t("message_label")}
              </Label>

              <Textarea
                id="discription"
                placeholder={t("message_placeholder")}
                required
                className={"h-[91%]"}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center">
          {isLoading ? (
            <Button
              type="button"
              disabled={isLoading}
              className="w-full bg-blue-900 hover:bg-blue-800 duration-300"
            >
              {t("sending_button")}{" "}
              <Loader className="ml-2 spin-animate" size={15} />
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full bg-blue-900 hover:bg-blue-800 duration-300"
              onClick={handleSubmit}
            >
              {t("send_button")} <Send className="ml-2" size={15} />
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card className="max-w-lg mx-auto mt-10 p-6 bg-white/50 rounded-2xl shadow-lg border animate-fadeIn">
        <CardHeader className="text-center">
          {/* Success icon */}
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
          </div>

          <CardTitle className="text-2xl font-bold text-green-700">
            {t("success_title")}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            {t("success_description", {
              date: data?.requests[0].deadline,
            })}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="col-span-1 lg:col-span-2 text-center">
            <p className="text-green-600 font-medium">{t("thanks_message")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
}
