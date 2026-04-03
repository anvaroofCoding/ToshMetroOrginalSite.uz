"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn_dialog";
import { useRahbariyatQuery } from "@/store/services/api";
import { Clock, Eye, Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ManagementPage() {
  const { locale } = useParams();
  const { data: managementData, isLoading } = useRahbariyatQuery({ locale });
  const t = useTranslations("menu");
  const formatBiography = (biography) => {
    if (biography === "Aniq emas") {
      return "Biografiya ma'lumotlari hozircha mavjud emas.";
    }

    // Split long biography into paragraphs for better readability
    const sentences = biography.split(/(?<=[.;])\s+/);
    const paragraphs = [];
    let currentParagraph = [];

    sentences.forEach((sentence, index) => {
      currentParagraph.push(sentence);
      if (
        currentParagraph.join(" ").length > 200 ||
        index === sentences.length - 1
      ) {
        paragraphs.push(currentParagraph.join(" "));
        currentParagraph = [];
      }
    });

    return paragraphs;
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen justify-center flex items-center">
        <p>{t("two_hundred_thirteen")}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="py-8">
        <div className="container">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">
              {t("three_hundred_ninety_six")}
            </h1>
          </div>
        </div>
      </div>

      {/* Management Grid */}
      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {managementData.map((member) => (
            <Card
              key={member.id}
              className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rounded-xl border-0"
            >
              <CardContent className="p-0 ">
                {/* Image Section with Enhanced Hover Effect */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative cursor-pointer bg-white">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={`${member.firstName} ${member.lastName}`}
                          width={400}
                          height={400}
                          className="w-full h-56 sm:h-64 lg:h-72 object-contain transition-all duration-500 group-hover:scale-110"
                        />
                        {/* Enhanced Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E327F]/90 via-[#0E327F]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center">
                          <div className="text-white w-full text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 p-4">
                            <h3 className="text-lg font-bold mb-2 line-clamp-2">
                              {member.lastName} {member.firstName}{" "}
                              {member.middleName}{" "}
                            </h3>
                            <p className="text-sm text-gray-200 flex justify-center items-center">
                              <Eye className="w-4 h-4 mr-2" /> Rasmni
                              kattalashtirish
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="">
                      <div className="space-y-4">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={`${member.firstName} ${member.lastName}`}
                          width={800}
                          height={800}
                          className="w-full h-auto rounded-lg"
                        />
                        <div className="text-center">
                          <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                            {member.lastName} {member.firstName}{" "}
                            {member.middleName}{" "}
                          </DialogTitle>
                          <p className="text-gray-600">{member.position}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Content Section */}
                <div className="p-4 lg:p-6 flex flex-col justify-between h-[370px] ">
                  {/* Name and Position */}
                  <div className="mb-4">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {member.lastName} {member.firstName} {member.middleName}
                    </h3>
                  </div>

                  {/* Position */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 font-medium leading-relaxed line-clamp-3">
                      {member.position}
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-3 mt-0.5 text-[#0E327F] flex-shrink-0" />
                      <span className="break-all">{member.phone}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-3 mt-0.5 text-[#0E327F] flex-shrink-0" />
                      <span className="break-all">{member.email}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-3 mt-0.5 text-[#0E327F] flex-shrink-0" />
                      <span>{member.hours}</span>
                    </div>
                  </div>

                  {/* Biography Modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-[#0E327F] text-[#0E327F] hover:bg-[#0E327F] hover:text-white transition-all duration-300 font-medium bg-transparent "
                      >
                        <User className="w-4 h-4 mr-2" />
                        Biografiyani ko'rish
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
                          {member.lastName} {member.firstName}{" "}
                          {member.middleName}
                        </DialogTitle>
                        <p className="text-gray-600 text-sm">
                          {member.position}
                        </p>
                      </DialogHeader>
                      <div className="mt-6">
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-[#0E327F] shadow-inner">
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="w-4 h-4 mr-2 text-[#0E327F]" />
                            Biografiya
                          </h4>
                          <div className="space-y-4">
                            {Array.isArray(
                              formatBiography(member.biography),
                            ) ? (
                              formatBiography(member.biography).map(
                                (paragraph, index) => (
                                  <p
                                    key={index}
                                    className="text-sm text-gray-700 leading-relaxed"
                                  >
                                    {paragraph}
                                  </p>
                                ),
                              )
                            ) : (
                              <p className="text-sm text-gray-700 leading-relaxed italic">
                                {formatBiography(member.biography)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
