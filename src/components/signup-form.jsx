"use client";
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
import { usePostRegisterMutation } from "@/store/services/api";
import { Loader, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { OTPForm } from "./otp-form";

export function SignupForm({ ...props }) {
  const t = useTranslations("menu");
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [postRegister, { isLoading }] = usePostRegisterMutation();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    is_verified: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function Submit() {
    try {
      const response = await postRegister(formData).unwrap();
      toast.success("Parol muvaffaqiyatli Jo'natildi!");
      setShow(true);
    } catch (error) {
      if (error?.data?.error) {
        toast.error(error?.data?.error);
      }
    }
  }

  if (show) {
    return <OTPForm formData={formData} shows={show} />;
  } else {
    return (
      <Card {...props}>
        <CardHeader>
          <CardTitle>{t("createAccount")}</CardTitle>
          <CardDescription>{t("registerSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="first_name">{t("firstName")}</FieldLabel>
                <Input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder={t("firstNamePlaceholder")}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="last_name">{t("lastName")}</FieldLabel>
                <Input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder={t("lastNamePlaceholder")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">{t("phone")}</FieldLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998901234567"
                />
                <FieldDescription>{t("phoneError")}</FieldDescription>
              </Field>
              <FieldGroup>
                <Field>
                  <Button
                    type="button"
                    onClick={Submit}
                    disabled={isLoading}
                    className={
                      "bg-blue-800 text-bold text-white hover:bg-blue-700 duration-200 w-full"
                    }
                  >
                    {t("sendCode")}{" "}
                    {isLoading ? (
                      <Loader className="animate-spin w-4 ml-2" />
                    ) : (
                      <Send className="w-4 ml-2" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/login")}
                    type="button"
                  >
                    {t("login")}
                  </Button>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    );
  }
}
