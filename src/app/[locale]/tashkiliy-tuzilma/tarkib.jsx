"use client";

import { useParams } from "next/navigation";

import { PageLoadingOverlay } from "@/components/page-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn_dialog";
import { useTarkibiyTuzilmalarQuery } from "@/store/services/api";
import { Calendar, Clock, Eye, Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TransportDirectory({ initialDepartments = [] }) {
  const t = useTranslations("menu");
  const { locale } = useParams();
  const { data: fetchedDepartments, isLoading } = useTarkibiyTuzilmalarQuery({
    locale,
  });
  const departments = fetchedDepartments ?? initialDepartments;

  if (isLoading && !departments.length) {
    return <PageLoadingOverlay label={t("two_hundred_thirteen")} />;
  }

  return (
    <div className="min-h-screen">
      <div className="pt-16 pb-8 sm:pt-20 sm:pb-10">
        <div className="container">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">
              {t("four_hundred_forty_three")}
            </h1>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {(departments ?? []).map((dept, index) => {
            const imageAlt =
              [dept?.head, dept?.title].filter(Boolean).join(" — ") ||
              t("four_hundred_forty_four");

            return (
              <Card
                key={dept.id ?? index}
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rounded-xl border-0"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative cursor-pointer bg-white">
                          <Image
                            src={dept.image || "/placeholder.svg"}
                            alt={imageAlt}
                            width={400}
                            height={400}
                            className="w-full h-56 sm:h-64 lg:h-72 object-contain transition-all duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center">
                            <div className="text-white w-full text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 p-4">
                              <h3 className="text-lg font-bold mb-2 line-clamp-2">
                                {dept.head}
                              </h3>
                              <p className="text-sm text-blue-100 flex justify-center items-center">
                                <Eye className="w-4 h-4 mr-2" />
                                Rasmni kattalashtirish
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <div className="space-y-4">
                          <Image
                            src={dept.image || "/placeholder.svg"}
                            alt={imageAlt}
                            width={800}
                            height={800}
                            className="w-full h-auto rounded-lg"
                          />
                          <div className="text-center">
                            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                              {dept.head}
                            </DialogTitle>
                            <p className="text-gray-600">{dept.title}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="p-4 lg:p-6 flex flex-col justify-between min-h-[320px]">
                    <div className="mb-4">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {dept.head}
                      </h3>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-700 font-medium leading-relaxed line-clamp-3">
                        {dept.title}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {dept.phone ? (
                        <div className="flex items-start text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-3 mt-0.5 text-blue-900 flex-shrink-0" />
                          <span className="break-all">{dept.phone}</span>
                        </div>
                      ) : null}
                      {dept.email ? (
                        <div className="flex items-start text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-3 mt-0.5 text-blue-900 flex-shrink-0" />
                          <span className="break-all">{dept.email}</span>
                        </div>
                      ) : null}
                      {dept.reception ? (
                        <div className="flex items-start text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-3 mt-0.5 text-blue-900 flex-shrink-0" />
                          <span>{dept.reception}</span>
                        </div>
                      ) : null}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-all duration-300 font-medium bg-transparent"
                        >
                          <User className="w-4 h-4 mr-2" />
                          {t("readMore")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
                            {dept.head}
                          </DialogTitle>
                          <p className="text-gray-600 text-sm">{dept.title}</p>
                        </DialogHeader>
                        <div className="mt-6 space-y-4">
                          {dept.schedule ? (
                            <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                              <Clock className="w-4 h-4 mt-0.5 text-blue-900 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-semibold text-gray-700">
                                  {t("four_hundred_forty_six")}
                                </p>
                                <p className="text-sm text-gray-900">{dept.schedule}</p>
                              </div>
                            </div>
                          ) : null}
                          {dept.reception ? (
                            <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                              <Calendar className="w-4 h-4 mt-0.5 text-blue-900 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-semibold text-gray-700">
                                  {t("four_hundred_forty_seven")}
                                </p>
                                <p className="text-sm text-gray-900">{dept.reception}</p>
                              </div>
                            </div>
                          ) : null}
                          {dept.email ? (
                            <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                              <Mail className="w-4 h-4 mt-0.5 text-blue-900 flex-shrink-0" />
                              <a
                                href={`mailto:${dept.email}`}
                                className="text-sm text-blue-900 break-all hover:underline"
                              >
                                {dept.email}
                              </a>
                            </div>
                          ) : null}
                          {dept.phone ? (
                            <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                              <Phone className="w-4 h-4 mt-0.5 text-blue-900 flex-shrink-0" />
                              <a
                                href={`tel:${dept.phone}`}
                                className="text-sm text-blue-900 break-all hover:underline"
                              >
                                {dept.phone}
                              </a>
                            </div>
                          ) : null}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
