"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, Eye, Mail, Phone, User } from "lucide-react";
import Image from "next/image";

import rasm1 from "../../../../public/raxbatiyat-metro/raxbar3.jpg";

import rasm2 from "../../../../public/raxbatiyat-metro/raxbar6.jpg";

import rasm3 from "../../../../public/raxbatiyat-metro/raxbar4.jpg";

import rasm4 from "../../../../public/raxbatiyat-metro/4.jpg";

import rasm5 from "../../../../public/raxbatiyat-metro/raxbar5.jpg";

import rasm6 from "../../../../public/raxbatiyat-metro/6.jpg";

import rasm7 from "../../../../public/raxbatiyat-metro/raxbar1.jpg";

import rasm8 from "../../../../public/raxbatiyat-metro/raxbar2.jpg";

const managementData = [
  {
    id: 6,

    firstName: "Raxmonbek",

    middleName: "Djaxongirovich",

    lastName: "Usmanov",

    position: "«Toshkent metropoliteni» DUK boshlig’i",

    department: "Safety & Security",

    phone: "+998 71-241-65-14",

    email: "tash.metropoliten@mail.ru metro@tashmetro.uz",

    hours: "Oyning 3- va 4- haftasi payshanba kuni",

    image: rasm6,

    biography:
      "1960-yilda Toshkent shahrida tug‘ilgan. Ma’lumoti oliy. 1982-yilda Toshkent avtomobil-yo‘llar institutini avtomobil transporti ekspluatatsiyasi muhandisi mutaxassisligi bo‘yicha tamomlagan. Mehnat faoliyatini Toshkent shahar 1-Avtokorxonasida boshlagan, keyinchalik turli rahbarlik lavozimlarida ishlagan. 2003–2005-yillarda Yakkasaroy tumani hokimi, 2005–2012-yillarda Toshkent shahar hokimi o‘rinbosari, 2012–2018-yillarda Toshkent shahar hokimi lavozimlarida faoliyat yuritgan. 2021-yildan “Toshkent metropoliteni” DUK boshlig‘i lavozimida ishlamoqda. 2008-yilda “Mehnat shuhrati”, 2024-yilda “Fidokorona xizmatlari uchun” ordenlari bilan taqdirlangan.",
  },

  {
    id: 4,

    firstName: "Mirhokim",

    middleName: "Mirxasilovich",

    lastName: "Mirhusanov",

    position: "«Toshkent metropoliteni» DUK bosh muhandisi",

    department: "Human Resources",

    phone: "+998 71-239-89-33",

    email: "ng@tashmetro.uz",

    hours: "Chorshanba kuni 10:00-11:00",

    image: rasm4,

    biography:
      "Toshkent temir yo‘llari Chuqursoy stansiyasi poyezdlar qabul qiluvchisi. 2018-2018-yillar – Toshkent temir yo‘llari Keles stansiyasi 3346 km strelka o‘tkazgich navbatchisi. 2018-2019-yillar – Yunusobod tuman hokimligi Investitsiya majmuasi kotibiyati bosh mutaxassisi. 2019-2019-yillar – Yunusobod tuman hokimligi Investitsiya va tashqi savdo bo‘limi boshlig‘i o‘rinbosari. 2019-2021-yillar – Yunusobod tuman hokimligi Investitsiya majmuasi kotibiyati bosh mutaxassisi. 2021-2021-yillar – “Toshkent metropoliteni” unitar korxonasi Harakat xizmati boshlig‘ining tashishni tashkil etish bo‘yicha o‘rinbosari. 2022-2024-yillar – “Toshkent metropoliteni” davlat unitar korxonasi ishlar boshqaruvchisi. 2024-yildan – h.v. – “Toshkent metropoliteni” davlat unitar korxonasi bosh muhandisi.",
  },

  {
    id: 7,

    firstName: "To‘lqin",

    middleName: "Turg’unovich",

    lastName: "Xalikov",

    position:
      "«Toshkent metropoliteni» DUK boshlig’ining xavfsizlik masalalari bo‘yicha o‘rinbosari",

    department: "Maintenance & Engineering",

    phone: "+998 71-227-44-03",

    email: "nzb@tashmetro.uz",

    hours: "Juma kuni 14:00-16:00",

    image: rasm7,

    biography:
      "2019-2022-yillar – “Toshkent metropoliteni” unitar korxonasi Metropoliten boshlig‘ining xavfsizlik bo‘yicha o‘rinbosari. 2022-yildan – h.v. – “Toshkent metropoliteni” davlat unitar korxonasi Metropoliten boshlig‘ining xavfsizlik bo‘yicha o‘rinbosari.",
  },

  {
    id: 5,

    firstName: "Yuldash",

    middleName: "Ergashevich",

    lastName: "Yusupov",

    position: "«Toshkent metropoliteni» DUK boshlig’ining o‘rinbosari",

    department: "Information Technology",

    phone: "+998 71-245-13-99",

    email: "nzf@tashmetro.uz",

    hours: "Chorshanba kuni 14:00-17:00",

    image: rasm5,

    biography:
      "1988-yil Toshkent viloyatida tug’ilgan. Ma’lumoti oliy. 2015-yilda Toshkent Moliya Institutining soliq va soliqqa tortish mutaxassisligi bo’yicha tamomlagan. Mehnat faoliyatini 2009-2011-yillarda Toshkent shahar Sobir Rahimov tumani hokimligi Moliya bo`limi bosh hisobchisi sifatida boshlagan. 2011-2013-yillar  Toshkent shahar Olmazor tumani hokimligi Moliya boʻlimi mudiri oʻrinbosari – “Byudjet nazorati” boʻlimi boshligʻi; 2013-2018-yillar  Toshkent shahar Olmazor tumani hokimligi Moliya boʻlimi mudiri; 2018-2019-yillar  Toshkent shahar Moliya bosh boshqarmasi “Xodimlar va maxsus ishlar” boʻlimi boshligʻi; 2019-2024-yillar  Toshkent shahar Shayxontohur tumani Moliya boʻlimi mudiri; 2024-2025-yillar  Toshkent shahar Iqtisodiyot va moliya bosh boshqarmasi shoʻba boshligʻi; 2025-2025-yillar  Oʻzbekiston Respublikasi Prezidenti huzuridagi Ijtimoiy himoya milliy agentligining Toshkent shahar Shayxontohur tumanidagi “Inson” ijtimoiy xizmatlar markazi direktori; 2025 yildan “Toshkent metropoliteni” DUK boshlig‘ining  o‘rinbosari lavozimida faoliyat yuritib kelmoqda.",
  },

  {
    id: 8,

    firstName: "Elyor",

    middleName: "Rustamovich",

    lastName: "Eltayev",

    position:
      "«Toshkent metropoliteni» DUK boshlig’ining marketing masalalari bo‘yicha o‘rinbosari",

    department: "Customer Service",

    phone: "+998 71-245-27-35",

    email: "nzm@tashmetro.uz",

    hours: "Chorshanba kuni 14:00-17:00",

    image: rasm8,

    biography:
      "1985-yilda Sirdaryo viloyatida tug‘ilgan. Ma’lumoti oliy. 2008-yilda Toshkent irrigatsiya va melioratsiya institutining menejment mutaxassisligi bo‘yicha tamomlagan. Mehnat faoliyatini 2002-yilda “Maroqand” MChJda boshlagan. Keyinchalik qator davlat va xo‘jalik tashkilotlarida rahbar va mutaxassis lavozimlarida ishlagan, jumladan, “Agro-nektar” sho‘ba korxonasi direktori, Yunusobod tuman hokimligi apparati rahbari bo‘lib faoliyat yuritgan. 2021-yildan “Toshkent metropoliteni” DUK boshlig‘ining marketing bo‘yicha o‘rinbosari lavozimida ishlab kelmoqda.",
  },

  {
    id: 2,

    firstName: "Aʼlojon",

    middleName: "Qamarovich",

    lastName: "Kuchkarov",

    position:
      "«Toshkent metropoliteni» DUK boshlig’ining qurilish bo‘yicha o‘rinbosari v.v.b.",

    department: "Operations",

    phone: "+998 71-245-47-68",

    email: "nzs@tashmetro.uz",

    hours: "Payshanba kuni 10:00-11:00",

    image: rasm2,

    biography:
      "1995-yilda mehnat faoliyatini Respublika Bosh prokuraturasida ish yurituvchi sifatida boshlagan. 1996–2000-yillarda G.V. Plexanov nomidagi Rossiya iqtisodiyot akademiyasida tahsil olgan. Keyingi yillarda turli davlat va xususiy tashkilotlarda iqtisodchi, tergovchi, direktor va huquqshunos lavozimlarida ishlagan. 2019–2023-yillarda Shayxontohur tumani hokimligi uy-joy va kommunal xizmat bo‘limi boshlig‘i, 2023–2024-yillarda Shayxontohur tumani hokimining qurilish va ekologiya masalalari bo‘yicha o‘rinbosari lavozimida faoliyat yuritgan. 2024-yildan Yakkasaroy tuman hokimining ko‘kalamzorlashtirish masalalari bo‘yicha o‘rinbosari sifatida ishlamoqda.",
  },

  {
    id: 1,

    firstName: "Suxrob",

    middleName: "Turakulovich",

    lastName: "Norkulov",

    position:
      "«Toshkent metropoliteni» DUK boshlig'ining ilmiy innovatsion rivojlanish masalalari bo'yicha o'rinbosari-transport universiteti prorektori ",

    department: "Executive Office",

    phone: "+998 71-245-71-69",

    email: "nzip@tashmetro.uz",

    hours: "Seshanba kuni 14:00-16:00",

    image: rasm1,

    biography:
      "Suxrob Norkulov 1990-yilda Surxondaryo viloyati Uzun tumanida tug‘ilgan. Ma’lumoti oliy. 2008-yilda Toshkent temir yo‘l transporti kasb-hunar kollejini, 2015-yilda Toshkent temir yo‘l muhandislari institutini, 2018-yilda Toshkent davlat iqtisodiyot universitetini, 2022-yilda esa O‘zbekiston Respublikasi Vazirlar Mahkamasi huzuridagi Biznes va tadbirkorlik oliy maktabining “Loyiha boshqaruvi” yo‘nalishida magistraturasini tamomlagan. Mehnat faoliyatini temir yo‘l sohasida boshlagan va keyingi yillarda turli rahbarlik lavozimlarida ishlagan. Tayinlovga qadar Transport vazirligi huzuridagi temir yo‘l xodimlarini malaka oshirish va qayta tayyorlash markazi direktori lavozimida faoliyat yuritgan. Hozirda “Toshkent metropoliteni” DUK boshlig‘ining ilmiy-innovatsion rivojlanish bo‘yicha o‘rinbosari lavozimida faoliyat yuritmoqda.",
  },

  {
    id: 3,

    firstName: "Dostonjon",

    middleName: "Qobiljonovich",

    lastName: "Ergashev ",

    position:
      "«Toshkent metropoliteni» DUK boshlig'ining o'rinbosari harakat xavfsizligi bo'yicha bosh taftishchi",

    department: "Finance",

    phone: "+998 71-296-03-24",

    email: "rb@tashmetro.uz",

    hours: "Juma kuni 10:00-17:00",

    image: rasm3,

    biography:
      "Ma’lumoti oliy. 2014-yilda Toshkent temir yo‘l muhandislik instituti bakalavr bosqichini tamomlagan. 2016-yilda Toshkent temir yo‘l muhandislik instituti magistr bosqichini tamomlagan. 2019-yilda O‘zbekiston Respublikasi Prezidenti huzuridagi Davlat boshqaruvi akademiyasini tamomlagan. Tayinlovga qadar D. Ergashev “Toshkent metropoliteni” DUK bosh muhandisining yer usti metro liniyalarini tasarruf etish bo‘yicha o‘rinbosari lavozimida faoliyat yuritgan.",
  },
];

export default function ManagementPage() {
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

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="py-8">
        <div className="container">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">
              Rahbariyat
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
              <CardContent className="p-0">
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
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {member.lastName} {member.firstName}{" "}
                            {member.middleName}{" "}
                          </h3>
                          <p className="text-gray-600">{member.position}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Content Section */}
                <div className="p-4 lg:p-6">
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
                        className="w-full border-[#0E327F] text-[#0E327F] hover:bg-[#0E327F] hover:text-white transition-all duration-300 font-medium bg-transparent"
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
                              formatBiography(member.biography)
                            ) ? (
                              formatBiography(member.biography).map(
                                (paragraph, index) => (
                                  <p
                                    key={index}
                                    className="text-sm text-gray-700 leading-relaxed"
                                  >
                                    {paragraph}
                                  </p>
                                )
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
