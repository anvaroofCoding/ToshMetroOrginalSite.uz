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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  usePostRegisterMutation,
  useRegisterOtpMutation,
} from "@/store/services/api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function OTPForm({ formData, shows, ...props }) {
  const t = useTranslations("menu");
  const router = useRouter();
  const [senOtp, { isLoading }] = useRegisterOtpMutation();
  const [postRegister, { isLoading: Loads }] = usePostRegisterMutation();

  const [seconds, setSeconds] = useState(60);
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(shows);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await senOtp({ code: otp }).unwrap();
      toast.success(response.message);
      localStorage.setItem("token", response.access);
      router.push("/");
    } catch (error) {
      if (error?.data?.error) {
        toast.error(error?.data?.error);
      }
    }
  };
  async function Submit() {
    try {
      const response = await postRegister(formData).unwrap();
      toast.success("Parol muvaffaqiyatli Jo'natildi!");
    } catch (error) {
      if (error?.data?.error) {
        toast.error(error?.data?.error);
      }
    }
  }

  useEffect(() => {
    if (!show) return;

    setSeconds(60);

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
  }, [show]);
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{t("enterCode")}</CardTitle>
        <CardDescription>
          {t("codeSent")}
          {formData?.phone
            ? `${formData.phone.slice(0, 6)}...${formData.phone.slice(-2)}`
            : ""}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">{t("confirmCode")}</FieldLabel>
              <InputOTP
                value={otp}
                onChange={(value) => setOtp(value)}
                maxLength={6}
                id="otp"
                required
              >
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Field>
            <FieldGroup>
              <Button
                className={
                  "bg-blue-800 text-bold text-white hover:bg-blue-700 duration-200 w-full"
                }
                type="button"
                onClick={handleSubmit}
                disabled={otp.length < 6 || isLoading}
              >
                {t("confirm")} {isLoading ? "..." : ""}
              </Button>
              <FieldDescription className="text-center">
                {seconds > 0 ? (
                  <span>
                    {t("resend")} ({seconds}s)
                  </span>
                ) : (
                  <>
                    <Button
                      onClick={Submit}
                      variant="link"
                      disabled={Loads}
                      className="text-primary"
                    >
                      {t("resend")}
                    </Button>
                  </>
                )}
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
