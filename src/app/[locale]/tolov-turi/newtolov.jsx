"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, QrCode, Scan, Wallet, User2, Check, ScanFace, LocationEdit, MapPin } from "lucide-react"
import Image from "next/image"

const attoCards = [
    {
        id: 1,
        name: "Yagona/Umumiy",
        type: "Ko'k",
        price: "20.000 UZS",
        description: "Markazlashtirilgan kontaktsiz to'lov transport kartasi",
        color: "bg-blue-50 border-blue-200",
        iconColor: "bg-blue-500",
        img: "https://atto.uz/image/blueCard.png",
    },
    {
        id: 2,
        name: "Talabalar uchun",
        type: "Sariq",
        price: "15.000 So'm",
        description: "Talabalar uchun imtiyozli tarif kartasi",
        color: "bg-yellow-50 border-yellow-200",
        iconColor: "bg-yellow-500",
        img: "https://atto.uz/icons/cards/yellow_transport_card.png",
    },
    {
        id: 3,
        name: "O'quvchilar uchun",
        type: "Yashil",
        price: "0 So'm",
        description: "Maktab o'quvchilari uchun imtiyozli tarif kartasi",
        color: "bg-green-50 border-green-200",
        iconColor: "bg-green-500",
        img: "https://atto.uz/icons/cards/green_transport_card.png",
    },
    {
        id: 4,
        name: "Ijtimoiy",
        type: "Qizil",
        price: "15.000 So'm",
        description: "Ijtimoiy himoya ostidagi fuqarolar uchun imtiyozli tarif kartasi",
        color: "bg-red-50 border-red-200",
        iconColor: "bg-red-500",
        img: "https://atto.uz/icons/cards/red_transport_card.png",
    },
]

const mobileApps = [
    {
        name: "ATTO",
        img: "https://play-lh.googleusercontent.com/n-p8ur5cwuXe1C49apbby-TWCLpA0Wp1P-DLz2VZv30BOfTlgJ5O27PwuX8L0bUvg9Q",
        color: "bg-blue-500",
    },
    {
        name: "Payme",
        img: "https://api.logobank.uz/media/logos_png/payme-01.png",
        color: "bg-green-500",
    },
    {
        name: "Click",
        img: "https://api.logobank.uz/media/logos_png/Click-01_hjB080W.png",
        color: "bg-yellow-500",
    },
    {
        name: "Uzum",
        img: "https://api.logobank.uz/media/logos_png/Uzum-01.png",
        color: "bg-purple-500",
    },
    {
        name: "Alif",
        img: "https://play-lh.googleusercontent.com/Pa7lbcLOR8ax9XQEJEW7d5NdXrZrKQ9viUUt_2FCq1PgojFMB8Q-a04EjCKJ3Mw_yg",
        color: "bg-blue-600",
    },
    {
        name: "Paynet",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSnNwqMFpCEfJ45_z_mJfHVj-y3kz8F3NcsA&s",
        color: "bg-red-500",
    },
]

const bankCards = [
    {
        name: "UZCARD",
        color: "bg-blue-600",
        img: "https://api.logobank.uz/media/logos_png/Uzcard-01.png",
    },
    {
        name: "Humo",
        color: "bg-green-600",
        img: "https://api.logobank.uz/media/logos_png/Humo-01.jpg",
    },
    {
        name: "Visa",
        color: "bg-blue-700",
        img: "https://by.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg",
    },
    {
        name: "MasterCard",
        color: "bg-red-600",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXnXkBmw2uSAI7UPnfI8ZWleOP_9jguz46rQ&s",
    },
    {
        name: "UnionPay",
        color: "bg-red-700",
        img: "https://1000logos.net/wp-content/uploads/2021/04/UnionPay-logo.png",
    },
]

export default function PaymentMethods() {
    const [hoveredCard, setHoveredCard] = useState(null)

    return (
        <div className="min-h-screen">
            <div className="container py-8 sm:py-12 lg:py-16 xl:py-20 ">
                {/* Header - Fluid Typography */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-blue-900 mb-4 sm:mb-6 lg:mb-8 leading-tight tracking-tight">
                        To'lov Turlari
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
                        Toshkent Metropolitenida mavjud bo'lgan barcha to'lov turlari haqida batafsil ma'lumot
                    </p>
                </div>

                {/* Timeline Container - Fully Responsive */}
                <div className="relative">


                    {/* ATTO Transport Cards Section */}
                    <div className="relative mb-12 sm:mb-16 lg:mb-20 xl:mb-24 ">
                        <div className="flex items-center mb-6 sm:mb-8 lg:mb-12">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg ring-4 ring-white">
                                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div className="ml-4 sm:ml-6 md:ml-8 lg:ml-12">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 leading-tight tracking-tight">
                                    ATTO Transport Kartasi
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-2 sm:mt-3 lg:mt-4 leading-relaxed">
                                    Markazlashtirilgan kontaktsiz to'lov transport kartasi
                                </p>
                            </div>
                        </div>

                        <div className="ml-12 sm:ml-16 md:ml-20 lg:ml-26">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 mb-6 sm:mb-8 lg:mb-10">
                                {attoCards.map((card) => (
                                    <Card
                                        key={card.id}
                                        className={`${card.color} border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-200/50 cursor-pointer group overflow-hidden`}
                                        onMouseEnter={() => setHoveredCard(card.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <CardContent className="p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 text-center">
                                            <div className="mb-4 sm:mb-5 md:mb-6 relative overflow-hidden rounded-xl">
                                                <div className="w-full aspect-[3/2] bg-white rounded-xl flex items-center justify-center p-3 sm:p-4 md:p-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 shadow-inner border border-gray-100">
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={card.img || "/placeholder.svg"}
                                                            alt={card.name}
                                                            fill
                                                            className="object-contain transition-all duration-500 group-hover:scale-110"
                                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                                                {card.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 leading-relaxed">
                                                {card.description}
                                            </p>
                                            <p className="font-bold text-blue-900 text-sm sm:text-base md:text-lg lg:text-xl">{card.price}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 mb-6 sm:mb-8 border border-blue-200 shadow-lg">
                                <h4 className="font-bold text-blue-900 mb-3 sm:mb-4 md:mb-5 text-base sm:text-lg md:text-xl lg:text-2xl flex items-center gap-1">
                                    <MapPin />
                                    Qayerdan sotib olish mumkin:
                                </h4>
                                <ul className="text-gray-700 space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg leading-relaxed">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                                        Metro kassalari
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                                        Toshshahartrans xizmat bo'limlari
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                                        UzPost pochta ofislari
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Applications Section */}
                    <div className="relative mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
                        <div className="flex items-center mb-6 sm:mb-8 lg:mb-12">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg ring-4 ring-white">
                                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div className="ml-4 sm:ml-6 md:ml-8 lg:ml-12">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 leading-tight tracking-tight">
                                    Mobil Ilovalar Orqali To'lov
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-2 sm:mt-3 lg:mt-4 leading-relaxed">
                                    Turli mobil ilovalar orqali to'lov qilish imkoniyati
                                </p>
                            </div>
                        </div>

                        <div className="ml-12 sm:ml-16 md:ml-20 lg:ml-26 ">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
                                {mobileApps.map((app, index) => (
                                    <Card
                                        key={index}
                                        className="transition-all duration-500 hover:scale-110  cursor-pointer overflow-hidden bg-transparent shadow-none border-none"
                                    >
                                        <CardContent className="p-3 sm:p-4 md:p-5 lg:p-1 text-center">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-2xl mx-auto mb-2 sm:mb-3 md:mb-4 overflow-hidden bg-white  shadow-md transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 flex items-center justify-center ">
                                                <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14">
                                                    <Image
                                                        src={app.img || "/placeholder.svg"}
                                                        alt={app.name}
                                                        fill
                                                        className="object-contain"
                                                        sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px"
                                                    />
                                                </div>
                                            </div>
                                            <p className="font-bold text-blue-900 text-xs sm:text-sm md:text-base leading-tight">
                                                {app.name}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 border border-green-200 shadow-lg">
                                <h4 className="font-bold text-blue-900 mb-3 sm:mb-4 md:mb-5 text-base sm:text-lg md:text-xl lg:text-2xl">
                                    Balansni to'ldirish:
                                </h4>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                                    ATTO mobil ilovasi, MyUzCard, Payme, Upay, Apelsin va boshqa elektron to'lov tizimlari orqali yoki
                                    kassalarda va infokiosklarda naqd va plastik kartalar bilan
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bank Cards & kontaktsiz to'lov Section */}
                    <div className="relative mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
                        <div className="flex items-center mb-6 sm:mb-8 lg:mb-12">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg ring-4 ring-white">
                                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div className="ml-4 sm:ml-6 md:ml-8 lg:ml-12">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 leading-tight tracking-tight">
                                    Bank Kartalari & kontaktsiz to'lov To'lovlar
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-2 sm:mt-3 lg:mt-4 leading-relaxed">
                                    kontaktsiz to'lov orqali metro va avtobusda to'lov - 1,700 UZS
                                </p>
                            </div>
                        </div>

                        <div className="ml-12 sm:ml-16 md:ml-20 lg:ml-26">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
                                {bankCards.map((card, index) => (
                                    <Card
                                        key={index}
                                        className="transition-all duration-500 hover:scale-110 overflow-hidden bg-transparent shadow-none border-none"
                                    >
                                        <CardContent className="p-3 sm:p-4 md:p-5 lg:p-0 text-center">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-2xl mx-auto mb-2 sm:mb-3 md:mb-4 overflow-hidden bg-white shadow-md transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6 flex items-center justify-center border border-gray-100">
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={card.img || "/placeholder.svg"}
                                                        alt={card.name}
                                                        fill
                                                        className="object-contain"
                                                        sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 64px, 80px"
                                                    />
                                                </div>
                                            </div>
                                            <p className="font-bold text-blue-900 text-xs sm:text-sm md:text-base leading-tight">
                                                {card.name}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 border border-purple-200 shadow-lg">
                                <h4 className="font-bold text-blue-900 mb-3 sm:mb-4 md:mb-5 text-base sm:text-lg md:text-xl lg:text-2xl">
                                    Qo'shimcha imkoniyatlar:
                                </h4>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                                    Uzum bank, Paynet, Click, Payme, Alif mobi ilovalari orqali chegirmalar bilan to'lov qilishingiz mumkin
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* QR Code & Paynet ATM Section */}
                    <div className="relative mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
                        <div className="flex items-center mb-6 sm:mb-8 lg:mb-12">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg ring-4 ring-white">
                                <QrCode className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div className="ml-4 sm:ml-6 md:ml-8 lg:ml-12">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 leading-tight tracking-tight">
                                    QR-Bilet & Alif ATM
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-2 sm:mt-3 lg:mt-4 leading-relaxed">
                                    Bir martalik QR to'lov va ATM orqali QR kod
                                </p>
                            </div>
                        </div>

                        <div className="ml-12 sm:ml-16 md:ml-20 lg:ml-26">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
                                <Card className="transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-200/50 border-2 hover:border-blue-400 group overflow-hidden">
                                    <CardContent className="p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10">
                                        <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                <QrCode className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                                                {/* <Image src={"https://api.logobank.uz/media/logos_png/alif-01.png"} alt="alif atm" width={28} height={28} /> */}
                                            </div>
                                            <h3 className="font-bold text-blue-900 text-base sm:text-lg md:text-xl lg:text-2xl">QR-Bilet</h3>
                                        </div>
                                        <p className="text-gray-700 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
                                            Naqd pul orqali kassalarda sotiladigan QR-bilet
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-blue-900 text-base sm:text-lg md:text-xl lg:text-2xl">
                                                3,000 UZS
                                            </span>

                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-200/50 border-2 hover:border-blue-400 group overflow-hidden">
                                    <CardContent className="p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10">
                                        <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14  rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                <Image src={"https://api.logobank.uz/media/logos_png/alif-01.png"} alt="alif atm" width={28} height={28} className=" w-full " />
                                            </div>
                                            <h3 className="font-bold text-blue-900 text-base sm:text-lg md:text-xl lg:text-2xl">
                                                Alif ATM QR
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
                                            Alif ATM'laridan QR kod olish imkoniyati
                                        </p>
                                        <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1">
                                            Tez va qulay
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Biometric Payments Section */}
                    <div className="relative mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
                        <div className="flex items-center mb-6 sm:mb-8 lg:mb-12">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg ring-4 ring-white">
                                <User2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div className="ml-4 sm:ml-6 md:ml-8 lg:ml-12">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 leading-tight tracking-tight">
                                    Biometrik To'lovlar
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-2 sm:mt-3 lg:mt-4 leading-relaxed">
                                    Kelajak texnologiyalari asosida to'lov
                                </p>
                            </div>
                        </div>

                        <div className="ml-12 sm:ml-16 md:ml-20 lg:ml-26">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
                                <Card className="transition-all duration-500 hover:scale-105 hover:shadow-2xl 
                                 group overflow-hidden">
                                    <CardContent className="p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10">
                                        <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-full rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                <ScanFace className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                                            </div>
                                            <h3 className="font-bold text-blue-900 text-base sm:text-lg md:text-xl lg:text-2xl">FacePay</h3>
                                        </div>
                                        <p className="text-gray-700 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
                                            Yuz tanish texnologiyasi asosida to'lov
                                        </p>
                                        <Badge variant="outline" className="text-xs sm:text-sm px-3 py-1">
                                            Sinov rejimida
                                        </Badge>
                                    </CardContent>
                                </Card>

                                <Card className="transition-all duration-500 hover:scale-105 hover:shadow-2xl  border-2  group overflow-hidden">
                                    <CardContent className="p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10">
                                        <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                                                <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
                                                    <Image
                                                        src="https://yt3.googleusercontent.com/TERu3mSd_cpqD9U3L00_-NcJlPNakiHn8AJQOUTfQNGaq_t0zUKjs2DX3DJ7N6-cxa-aR6rybQ=s900-c-k-c0x00ffffff-no-rj"
                                                        alt="Palmpay"
                                                        fill
                                                        className="object-contain"
                                                        sizes="(max-width: 640px) 24px, (max-width: 768px) 28px, 32px"
                                                    />
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-blue-900 text-base sm:text-lg md:text-xl lg:text-2xl">PalmPay</h3>
                                        </div>
                                        <p className="text-gray-700 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
                                            Kaftni skanerlash orqali to'lov
                                        </p>
                                        <Badge variant="outline" className="text-xs sm:text-sm px-3 py-1">
                                            12 stansiyada
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 border border-blue-200 shadow-lg">
                                <h4 className="font-bold text-blue-900 mb-3 sm:mb-4 md:mb-5 text-base sm:text-lg md:text-xl lg:text-2xl">
                                    Qanday ishlatiladi:
                                </h4>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                                    Foydalanuvchi mobil ilovada biometrik profilni yaratib, ATTO kartasiga bog'laydi. Metro burilish
                                    turniketida kaft yoki yuzni skaner qilib o'tadi.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="relative">
                        <div className="flex items-center mb-6 sm:mb-8 lg:mb-12">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg ring-4 ring-white">
                                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div className="ml-4 sm:ml-6 md:ml-8 lg:ml-12">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 leading-tight tracking-tight">
                                    Tavsiyalar
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mt-2 sm:mt-3 lg:mt-4 leading-relaxed">
                                    Eng qulay va tejamkor to'lov usullari
                                </p>
                            </div>
                        </div>

                        <div className="ml-12 sm:ml-16 md:ml-20 lg:ml-26">
                            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 text-white shadow-2xl shadow-blue-900/30 border border-blue-700">
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 flex items-center">
                                    <span className="text-2xl sm:text-3xl md:text-4xl mr-3 sm:mr-4">
                                        <Check />
                                    </span>
                                    Eng arzon va keng tarqalgan:
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8">
                                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-105">
                                        <h4 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl lg:text-2xl">
                                            ATTO kartasi
                                        </h4>
                                        <p className="text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed">
                                            1,700 UZS - eng tejamkor variant
                                        </p>
                                    </div>
                                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-105">
                                        <h4 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl lg:text-2xl">
                                            kontaktsiz to'lov bank kartalar
                                        </h4>
                                        <p className="text-blue-100 text-sm sm:text-base md:text-lg leading-relaxed">
                                            1,700 UZS - tez va qulay
                                        </p>
                                    </div>
                                </div>
                                <p className="text-blue-100 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                                    Biometrik to'lovlar yaqin kelajakda metro tarmoqlarining barchasida joriy etilishi kutilmoqda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
