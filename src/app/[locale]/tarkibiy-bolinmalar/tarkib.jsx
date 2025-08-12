"use client";

import tarkib1 from "./tarkib/kadr.jpg";
import tarkib2 from "./tarkib/harakatxiz.jpg";
import tarkib3 from "./tarkib/tch-1.jpg";
import tarkib4 from "./tarkib/tch-2.jpg";
import tarkib5 from "./tarkib/Elektromexanika.jpg";
import tarkib6 from "./tarkib/elektrtaminot.jpg";
import tarkib7 from "./tarkib/signallashtirish.jpg";
import tarkib8 from "./tarkib/yolxiz.jpg";
import tarkib9 from "./tarkib/Tonnel.jpg";
import tarkib10 from "./tarkib/korrupsiya.jpg";
import tarkib11 from "./tarkib/AKT.png";
import tarkib12 from "./tarkib/matbuot.jpg";

import { Phone, Train, Eye, Clock, User, Calendar, Mail } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TransportDirectory() {
  const departments = [
    {
      title: "Kadrlar bilan ishlash xizmati",
      titleEn: "Human Resources Service",
      head: "Xusanov Qudratilla Komiljon o'g'li",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning chorshanba kuni 14:00 dan 17:00 gacha",
      phone: "+99871-239-89-27",
      image: tarkib1,
      email: "kadr@tashmetro.uz",
    },
    {
      title: "Harakat xizmati",
      titleEn: "Movement Service",
      head: "Saidxodjayev Jasur Sa'dullayevich",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning chorshanba kuni 14:00 dan 17:00 gacha",
      phone: "+99871-293-89-31",
      image: tarkib2,
      email: "d@tashmetro.uz",
    },
    {
      title: "Chilonzor elektrodeposi",
      titleEn: "Chilonzor Electrodepot",
      head: "Shafikov Rustam Rafikovich",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning seshanba kuni 10:00 da",
      phone: "+998-93-500-25-20",
      image: tarkib3,
      email: "tch1@tashmetro.uz",
    },
    {
      title: "O'zbekiston elektrodeposi",
      titleEn: "Uzbekistan Electrodepot",
      head: "Iskandarov Gulamjan Rustamovich",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning seshanba kuni 10:00 da",
      phone: "+998-93-500-55-89",
      image: tarkib4,
      email: "tch2@tashmetro.uz",
    },
    {
      title: "Elektromexanika xizmati",
      titleEn: "Electromechanical Service",
      head: "Karimjonov Omonjon Alimjonovich",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning seshanba kuni 09:00 da",
      phone: "+99893-501-79-70",
      image: tarkib5,
      email: "m@tashmetro.uz",
    },
    {
      title: "Elektr ta'minot xizmati",
      titleEn: "Power Supply Service",
      head: "Baxromov Behzod To'xtamurodovich",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning dushanba kuni 13:30 da",
      phone: "+99893-501-79-72",
      image: tarkib6,
      email: "e@tashmetro.uz",
    },
    {
      title: "Signallashtirish va aloqa xizmati",
      titleEn: "Signaling and Communication Service",
      head: "Agzamov Shaxzod Sherzod o'g'li",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning chorshanba kuni 14:00 dan 17:00 gacha",
      phone: "+998998026218",
      image: tarkib7,
      email: "sh@tashmetro.uz",
    },
    {
      title: "Yo'l xizmati",
      titleEn: "Road Service",
      head: "Xolmurodov Ruslan Beknazar o'g'li",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning seshanba kuni 09:00 da",
      phone: "+99894-100-26-26",
      image: tarkib8,
      email: "p@tashmetro.uz",
    },
    {
      title: "Tonnel inshootlari xizmati",
      titleEn: "Tunnel Structures Service",
      head: "Musayev Bobomurod Faxriddinovich",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning seshanba kuni 14:00 da",
      phone: "+998-93-501-79-71",
      image: tarkib9,
      email: "ts@tashmetro.uz",
    },
    {
      title: "Korrupsiyani oldini olish xizmati",
      titleEn: "Anti-Corruption Service",
      head: "Kabirov Qobiljon Qosimovich",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Hafta ish kunlari davomida",
      phone: "+998-93-700-03-25",
      image: tarkib10,
      email: "nk@tashmetro.uz",
    },
    {
      title:
        "Axborot xavfsizligini ta'minlash va axborot-kommunikatsiya texnologiyalarini rivojlantirish xizmati",
      titleEn: "Information Security and Technical Support Service",
      head: "Toshpo'lotov Feruz G'olib o'g'li",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning payshanba kuni 15:00 dan 16:00 gacha",
      phone: "+998 71-241-31-40",
      image: tarkib11,
      email: "cybersecurity@tashmetro.uz",
    },
    {
      title: "Matbuot xizmati",
      titleEn: "Press Service",
      head: "Mirzayev To'ychi Farxod o'g'li",
      schedule: "Dushanba-juma kunlari 08:00 dan 17:00 ga qadar",
      reception: "Haftaning chorshanba kuni 14:00 dan 17:00 gacha",
      phone: "+998-90-370-19-98",
      image: tarkib12,
      email: "pressa@tashmetro.uz",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div>
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-[#0E327F] leading-tight">
              Toshkent metropoliteni DUK tarkibiy tuzulmalarining rahbarlari
            </h1>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {departments.map((dept, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group border hover:border-blue-200 h-full">
                  <CardContent className="p-0 h-full">
                    <div className="bg-gradient-to-br from-blue-50 to-white p-4 sm:p-5 lg:p-6 rounded-lg h-full">
                      <div className="flex flex-col sm:flex-row gap-4 h-full">
                        {/* Image Section */}
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                          <div className="w-32 h-40 sm:w-36 sm:h-44 lg:w-40 lg:h-48 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <Image
                              src={dept.image || "/placeholder.svg"}
                              alt={dept.head}
                              width={160}
                              height={192}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between text-center sm:text-left">
                          <div className="space-y-3">
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-[#0E327F] transition-colors duration-300 line-clamp-2 leading-tight">
                              {dept.title}
                            </h3>

                            {/* Department Head */}
                            <div className="space-y-1">
                              <p className="text-xs sm:text-sm font-semibold text-gray-700">
                                Xizmat boshlig'i
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                                {dept.head}
                              </p>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="flex items-center justify-center sm:justify-between gap-3 pt-3 mt-auto">
                            {/* Reseption */}
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-[#0E327F] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Calendar className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                                  Qabul kuni
                                </h3>
                                <p className="text-gray-900 text-sm sm:text-base">
                                  {dept.reception}
                                </p>
                              </div>
                            </div>

                            {/* View Icon */}
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-[#0E327F] rounded-full flex items-center justify-center group-hover:bg-[#1e4a9f] transition-colors duration-300">
                                <Eye className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] max-h-[90vh] overflow-y-auto">
                <div className="space-y-6 pt-6">
                  {/* Title */}
                  <DialogTitle className="text-center border-b pb-4 text-lg sm:text-xl lg:text-2xl font-bold text-[#0E327F]">
                    {dept.title}
                  </DialogTitle>

                  {/* Content */}
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Image */}
                    <div className="flex-shrink-0 mx-auto lg:mx-0">
                      <div className="w-48 h-60 sm:w-52 sm:h-64 rounded-lg overflow-hidden border-4 border-blue-100 shadow-lg">
                        <Image
                          src={dept.image || "/placeholder.svg"}
                          alt={dept.head}
                          width={208}
                          height={256}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 w-full">
                      <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                        <div className="space-y-4 sm:space-y-5">
                          {/* Department Head */}
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#0E327F] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                              <User className="w-3 h-3 text-white" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                                Xizmat boshlig'i
                              </h3>
                              <p className="text-gray-900 font-medium text-sm sm:text-base">
                                {dept.head}
                              </p>
                            </div>
                          </div>

                          {/* Schedule */}
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#0E327F] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Clock className="w-3 h-3 text-white" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                                Ish jadvali
                              </h3>
                              <p className="text-gray-900 text-sm sm:text-base">
                                {dept.schedule}
                              </p>
                            </div>
                          </div>

                          {/* Reception Hours */}
                          {dept.reception && (
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-[#0E327F] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Calendar className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                                  Qabul kuni
                                </h3>
                                <p className="text-gray-900 text-sm sm:text-base">
                                  {dept.reception}
                                </p>
                              </div>
                            </div>
                          )}
                          {/* email */}
                          <div className="flex items-center gap-3 pt-2">
                            <div className="w-8 h-8 bg-[#0E327F] rounded-lg flex items-center justify-center flex-shrink-0">
                              <Mail className="w-4 h-4 text-white" />
                            </div>

                            <p className="text-[#0E327F] font-semibold hover:text-[#1e4a9f] transition-colors duration-200 text-base sm:text-lg break-all">
                              {dept.email}
                            </p>
                          </div>

                          {/* Phone */}
                          <div className="flex items-center gap-3 pt-2">
                            <div className="w-8 h-8 bg-[#0E327F] rounded-lg flex items-center justify-center flex-shrink-0">
                              <Phone className="w-4 h-4 text-white" />
                            </div>
                            <a
                              href={`tel:${dept.phone}`}
                              className="text-[#0E327F] font-semibold hover:text-[#1e4a9f] transition-colors duration-200 text-base sm:text-lg break-all"
                            >
                              {dept.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
