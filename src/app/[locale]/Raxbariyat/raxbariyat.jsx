"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, ChevronUp, Clock, Eye, Mail, Phone, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import rasm1 from '../../../../public/raxbatiyat-metro/raxbar3.jpg'

import rasm2 from '../../../../public/raxbatiyat-metro/raxbar6.jpg'

import rasm3 from '../../../../public/raxbatiyat-metro/raxbar4.jpg'

import rasm4 from '../../../../public/raxbariyat/4.jpg'

import rasm5 from '../../../../public/raxbatiyat-metro/raxbar5.jpg'

import rasm6 from '../../../../public/raxbariyat/6.jpg'

import rasm7 from '../../../../public/raxbatiyat-metro/raxbar1.jpg'

import rasm8 from '../../../../public/raxbatiyat-metro/raxbar2.jpg'




const managementData = [

  {

    id: 6,

    firstName: 'Djaxongirovich',

    middleName: 'Raxmonbek',

    lastName: 'Usmanov',

    position: '«Toshkent metropoliteni» DUK boshlig’i',

    department: 'Safety & Security',

    phone: '+998 71-241-65-14',

    email: 'tash.metropoliten@mail.ru metro@tashmetro.uz',

    hours: 'Oyning 3- va 4- haftasi payshanba kuni',

    image: rasm6,

    biography: "Aniq emas"

  },

  {

    id: 4,

    firstName: 'Mirhokim',

    middleName: 'Mirxasilovich',

    lastName: 'Mirhusanov',

    position: '«Toshkent metropoliteni» DUK bosh muhandisi',

    department: 'Human Resources',

    phone: '+998 71-239-89-33',

    email: 'ng@tashmetro.uz',

    hours: 'Chorshanba kuni 10:00-11:00',

    image: rasm4,

    biography: "aniq emas"

  },

  {

    id: 7,

    firstName: 'Turg’unovich',

    middleName: 'To‘lqin',

    lastName: 'Xalikov',

    position:

      '«Toshkent metropoliteni» DUK boshlig’ining xavfsizlik masalalari bo‘yicha o‘rinbosari',

    department: 'Maintenance & Engineering',

    phone: '+998 71-227-44-03',

    email: 'nzb@tashmetro.uz',

    hours: 'Juma kuni 14:00-16:00',

    image: rasm7,

    biography: "aniq emas"

  },

  {

    id: 5,

    firstName: 'Yuldash',

    middleName: 'Ergashevich',

    lastName: 'Yusupov',

    position: '«Toshkent metropoliteni» DUK boshlig’ining o‘rinbosari',

    department: 'Information Technology',

    phone: '+998 71-245-13-99',

    email: 'nzf@tashmetro.uz',

    hours: 'Chorshanba kuni 14:00-17:00',

    image: rasm5,

    biography:

      "1988 yil Toshkent viloyatida tug’ilgan. Ma’lumoti – oliy. 2015 yilda Toshkent Moliya Institutining soliq va soliqqa tortish mutaxassisligi bo’yicha tamomlagan. Mehnat faoliyatini 2009-2011 yillarda Toshkent shahar Sobir Rahimov tumani hokimligi Moliya bo`limi bosh hisobchisi sifatida boshlagan.2011-2013 yillar  Toshkent shahar Olmazor tumani hokimligi Moliya boʻlimi mudir oʻrinbosari – “Byudjet nazorati” boʻlimi boshligʻi; 2013-2018 yillar  Toshkent shahar Olmazor tumani hokimligi Moliya boʻlimi mudiri; 2018-2019 yillar  Toshkent shahar Moliya bosh boshqarmasi “Xodimlar va maxsus ishlar” boʻlimi boshligʻi; 2019-2024 yillar  Toshkent shahar Shayxontohur tumani Moliya boʻlimi mudiri; 2024-2025 yillar  Toshkent shahar Iqtisodiyot va moliya bosh boshqarmasi shoʻbasi boshligʻi; 2025-2025 yillar  Oʻzbekiston Respublikasi Prezidenti huzuridagi Ijtimoiy himoya milliy agentligining Toshkent shahar Shayxontohur tumanidagi “Inson” ijtimoiy xizmatlar markazi direktori; 2025 yildan “Toshkent metropoliteni” DUK boshlig‘ining  o‘rinbosari lavozimida faoliyat yuritib kelmoqda."

  },

  {

    id: 8,

    firstName: 'Elyor',

    middleName: 'Rustamovich',

    lastName: 'Eltayev',

    position:

      '«Toshkent metropoliteni» DUK boshlig’ining marketing masalalari bo‘yicha o‘rinbosari',

    department: 'Customer Service',

    phone: '+998 71-245-27-35',

    email: 'nzm@tashmetro.uz',

    hours: 'Chorshanba kuni 14:00-17:00',

    image: rasm8,

    biography:

      "aniq emas",

  },

  {

    id: 2,

    firstName: 'Aʼlojon',

    middleName: 'Qamarovich',

    lastName: 'Kuchkarov',

    position:

      '«Toshkent metropoliteni» DUK boshlig’ining qurilish bo‘yicha o‘rinbosari',

    department: 'Operations',

    phone: '+998 71-245-47-68',

    email: 'nzs@tashmetro.uz',

    hours: 'Payshanba kuni 10:00-11:00',

    image: rasm2,

    biography:

      "1995–2000 yillar – Respublika Bosh prokuraturasi devonxona ish yurituvchisi, noziri; 1996–2000 yillar – G.V. Plexanov nomidagi Rossiya iqtisodiyot akademiyasi – talaba; 2000–2001 yillar – Toshkent viloyati Yangiyo‘l tumani “Aziz” XK – iqtisodchi; 2001–2002 yillar – “O‘zbekinvest” marketing qo‘mitasi – menejer assistenti; 2002–2003 yillar – Harbiy xizmat – askar; 2003–2005 yillar – Harbiy prokuratura markaziy mahkamasi – ish yurituvchi; 2005–2008 yillar – Toshkent harbiy okrugi harbiy prokurori yordamchisi, katta tergovchi; 2008–2009 yillar – Toshkent viloyati Chirchiq harbiy prokuraturasi – katta tergovchi; 2009–2009 yillar – Qashqadaryo viloyati Qarshi harbiy prokuraturasi – katta tergovchi; 2009–2010 yillar – Mirzo Ulug‘bek tumani “VET KORM AGRO” MChJ – huquqshunos, direktor; 2010–2016 yillar – Xususiy tadbirkor; 2016–2017 yillar – Olmazor tumani garajlar boshqarmasi – boshliq; 2017–2019 yillar – Olmazor tumani MTT maxsus ta’mirlash va ekspluatatsiya xizmati – boshliq; 2019–2019 yillar – “DONG SEUNG KOREA” MChJ – texnik bo‘lim muhandisi; 2019–2019 yillar – Shayxontohur tumani “Avto Agro” davlat korxonasi – rahbar; 2019–2023 yillar – Shayxontohur tumani hokimligi uy-joy va kommunal xizmat bo‘limi – boshliq; 2023–2024 yillar – Shayxontohur tumani hokimining qurilish, kommunikatsiyalarni rivojlantirish, ekologiya va ko‘kalamzorlashtirish masalalari bo‘yicha o‘rinbosari; 2024–2025 yillar – Yakkasaroy tuman hokimining ko‘kalamzorlashtirish masalalari bo‘yicha o‘rinbosari.",

  },

  {

    id: 1,

    firstName: 'Suxrob',

    middleName: 'Turakulovich',

    lastName: 'Norkulov',

    position:

      '«Toshkent metropoliteni» DUK boshligining ilmiy innovatsion rivojlanish masalalari boyicha orinbosari-transport universiteti prorektori ',

    department: 'Executive Office',

    phone: '+998 71-245-71-69',

    email: 'nzip@tashmetro.uz',

    hours: 'Seyshanba kuni 14:00-16:00',

    image: rasm1,

    biography:

      "aniq emas",

  },




  {

    id: 3,

    firstName: 'Dostonjon',

    middleName: 'Qobiljonovich',

    lastName: 'Ergashev ',

    position:

      "«Toshkent metropoliteni» DUK boshlig'ining o'rinbosari harakat xavfsizligi bo'yicha bosh taftishchi",

    department: 'Finance',

    phone: '+998 71-296-03-24',

    email: 'rb@tashmetro.uz',

    hours: 'Juma kuni 10:00-17:00',

    image: rasm3,

    biography:

      'aniq emas',

  },

]

export default function ManagementPage() {
  const [expandedBios, setExpandedBios] = useState(new Set())

  const toggleBio = (id) => {
    const newExpanded = new Set(expandedBios)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedBios(newExpanded)
  }

  const formatBiography = (biography) => {
    if (biography === "aniq emas" || biography === "Aniq emas") {
      return "Biografiya ma'lumotlari hozircha mavjud emas."
    }

    // Split long biography into paragraphs for better readability
    const sentences = biography.split(/(?<=[.;])\s+/)
    const paragraphs = []
    let currentParagraph = []

    sentences.forEach((sentence, index) => {
      currentParagraph.push(sentence)
      if (currentParagraph.join(" ").length > 200 || index === sentences.length - 1) {
        paragraphs.push(currentParagraph.join(" "))
        currentParagraph = []
      }
    })

    return paragraphs
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className=" ">
        <div className="container  py-8 lg:py-12">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">Rahbariyati</h1>
          </div>
        </div>
      </div>

      {/* Management Grid */}
      <div className="container py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {managementData.map((member) => (
            <Card
              key={member.id}
              className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rounded-xl  border-0"
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
                              {member.firstName} {member.middleName} {member.lastName}
                            </h3>
                            <p className="text-sm text-gray-200 flex justify-center items-center">
                              <Eye className="w-4 h-4 mr-2" /> Rasmni kattalashtirish
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
                            {member.firstName} {member.middleName} {member.lastName}
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
                      {member.firstName} {member.middleName} {member.lastName}
                    </h3>
                    {/* <Badge className="bg-[#0E327F] hover:bg-[#0E327F]/90 text-white text-xs px-2 py-1">
                      <User className="w-3 h-3 mr-1" />
                      {member.department}
                    </Badge> */}
                  </div>

                  {/* Position */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 font-medium leading-relaxed line-clamp-3">{member.position}</p>
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

                  {/* Biography Toggle */}
                  <Button
                    onClick={() => toggleBio(member.id)}
                    variant="outline"
                    className="w-full border-[#0E327F] text-[#0E327F] hover:bg-[#0E327F] hover:text-white transition-all duration-300 font-medium"
                  >
                    {expandedBios.has(member.id) ? (
                      <>
                        Biografiyani yashirish <ChevronUp className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Biografiyani ko'rish <ChevronDown className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  {/* Enhanced Biography Content */}
                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${expandedBios.has(member.id) ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 lg:p-6 rounded-xl border-l-4 border-[#0E327F] shadow-inner">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <User className="w-4 h-4 mr-2 text-[#0E327F]" />
                        Biografiya
                      </h4>
                      <div className="space-y-3">
                        {Array.isArray(formatBiography(member.biography)) ? (
                          formatBiography(member.biography).map((paragraph, index) => (
                            <p key={index} className="text-sm text-gray-700 leading-relaxed">
                              {paragraph}
                            </p>
                          ))
                        ) : (
                          <p className="text-sm text-gray-700 leading-relaxed italic">
                            {formatBiography(member.biography)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
