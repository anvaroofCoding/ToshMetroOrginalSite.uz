"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useLoginMutation, useRegisterOtpMutation } from "@/store/services/api";
import { Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Dialog01 from "./ui/dialog";

export function LoginForm({ className, ...props }) {
  const t = useTranslations("menu");
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [Login, { isLoading }] = useLoginMutation();
  const [SendOtp, { isLoading: Loadings }] = useRegisterOtpMutation();
  const [phones, setPhones] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
    setPhones(value);
  };
  const fullPhone = `998${phones}`;
  const handleOTPChange = (value) => {
    setOtp(value);
  };
  useEffect(() => {
    if (!showOTP) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOTP]);
  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await SendOtp({ code: otp }).unwrap();
      toast.success(response.message);
      localStorage.setItem("token", response.access);
      setOpenDialog(true);
    } catch (error) {
      toast.error(error?.data?.error || "Xatolik yuz berdi");
    }
  };
  const SendPhoneNumber = async () => {
    const phone = { phone: `+998${phones}` };
    try {
      const response = await Login(phone).unwrap();
      setSeconds(61);
      setShowOTP(true);
      setOtp("");
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.data?.error || "Xatolik yuz berdi");
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Dialog01 open={openDialog} onOpenChange={setOpenDialog} />
      <Card>
        <CardHeader>
          <CardTitle>{showOTP ? t("enterCode") : t("loginTitle")}</CardTitle>
          <CardDescription>
            {showOTP
              ? `${t("codeSent")} ${fullPhone.slice(0, 6)}...${fullPhone.slice(
                  -2,
                )} `
              : t("successDescription")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!showOTP ? (
            /* ================= PHONE FORM ================= */
            <FieldGroup>
              <Field>
                <div className="relative">
                  <span className="absolute left-2 top-1/2  text-sm -translate-y-1/2 text-muted-foreground">
                    +998
                  </span>
                  <Input
                    type="tel"
                    value={phones}
                    onChange={handlePhoneChange}
                    placeholder="901234567"
                    className="pl-11 text-lg"
                  />
                </div>

                <FieldDescription>{t("enterPhoneFull")}</FieldDescription>
              </Field>

              <div className="flex flex-col items-center gap-2">
                <Button
                  type="button"
                  onClick={SendPhoneNumber}
                  disabled={phones.length !== 9 || isLoading}
                  className="w-full bg-blue-800 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {t("sendCode")}{" "}
                  {isLoading ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 ml-2" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  onClick={() => (window.location.href = "/register")}
                  className={"w-full"}
                >
                  {t("register")}
                </Button>
              </div>
            </FieldGroup>
          ) : (
            <form onSubmit={verifyOTP}>
              <FieldGroup>
                <Field>
                  <FieldLabel>{t("confirmCode")}</FieldLabel>

                  <InputOTP
                    value={otp}
                    onChange={handleOTPChange}
                    maxLength={6}
                  >
                    <InputOTPGroup className="gap-2.5 *:rounded-md *:border">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </Field>

                <Button
                  type="submit"
                  disabled={otp.length < 6}
                  className="w-full bg-blue-800 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {t("confirm")}{" "}
                  {Loadings ? (
                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                  ) : (
                    <Send className="h-4 w-4 ml-2" />
                  )}
                </Button>

                <FieldDescription className="text-center">
                  {seconds > 0 ? (
                    <span>
                      {t("resend")} ({seconds}s)
                    </span>
                  ) : (
                    <button
                      onClick={SendPhoneNumber}
                      type="button"
                      className="text-primary underline"
                    >
                      {t("resend")}
                    </button>
                  )}
                </FieldDescription>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
