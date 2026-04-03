"use client";

import {
  useVakanDetailQuery,
  useVakanRequestDetailsQuery,
  useVakanRequestMutation,
} from "@/store/services/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  GraduationCap,
  Loader2,
  Mail,
  UploadCloud,
  User,
} from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  const [finded, setFindeds] = useState("");
  const { locale, id } = useParams();
  const { data, isLoading } = useVakanDetailQuery({ lang: locale, id });
  const { data: jobrequest, isLoading: isPending } =
    useVakanRequestDetailsQuery();

  const [sendVakanRequest, { isLoading: sending }] = useVakanRequestMutation();

  useEffect(() => {
    const findeds = jobrequest?.find((item) => item.jobVacancy == id);
    setFindeds(findeds);
  }, [jobrequest]);

  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !file) {
      alert("Email va CV fayl majburiy");
      return;
    }

    const formData = new FormData();
    formData.append("jobVacancy", id);
    formData.append("email", email);
    formData.append("file", file);

    try {
      await sendVakanRequest(formData).unwrap();
      toast.success("So‘rov muvaffaqiyatli yuborildi!");
      setEmail("");
      setFile(null);
    } catch (err) {
      if (err.data.non_field_errors) {
        toast.error(err.data.non_field_errors[0]);
      }
    }
  };

  if (isLoading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen container py-10 flex items-center justify-center">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            {data?.title}
          </CardTitle>
          <CardDescription>
            Vakansiya tafsilotlari va ariza yuborish formasi
          </CardDescription>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6">
          {/* VACANCY INFO */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Mutaxassislik:</span>
              <Badge variant="secondary">{data?.mutaxasislik}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Ta’lim:</span>
              <Badge variant="outline">{data?.education_status}</Badge>
            </div>

            <div>
              <p className="font-medium mb-1">Talablar:</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {data?.requirements}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-blue-50 p-3 rounded-xl text-center">
                <p className="text-xs text-gray-500">Yuborilgan</p>
                <p className="text-lg font-bold">{data?.total_requests}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-center">
                <p className="text-xs text-gray-500">Kutilmoqda</p>
                <p className="text-lg font-bold">{data?.pending_requests}</p>
              </div>
            </div>
          </div>

          {/* APPLY FORM */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Ariza yuborish
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Email va CV faylingizni yuklang
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  disabled={finded?.status == "pending"}
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">CV yuklash</label>
                <div className="flex items-center gap-3">
                  <Input
                    disabled={finded?.status == "pending"}
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <UploadCloud className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              {finded?.status == "pending" ? (
                <Button
                  disabled
                  className="w-full bg-green-600 hover:bg-green-800 rounded-xl"
                >
                  Arizangiz ko'rib chiqilmoqda
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-blue-600 hover:bg-blue-800 rounded-xl"
                >
                  {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Ariza yuborish
                </Button>
              )}
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
