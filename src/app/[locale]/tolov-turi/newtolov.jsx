"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, QrCode, Scan, Wallet, User2 } from "lucide-react"
import Image from "next/image"

const attoCards = [
    {
        id: 1,
        name: "Oddiy ATTO Karta",
        type: "Kochuk (Moviy)",
        price: "1,700 UZS",
        description: "Markazlashtirilgan NFC transport kartasi",
        color: "bg-blue-50 border-blue-200",
        iconColor: "bg-blue-500",
        img: "https://atto.uz/image/blueCard.png",
    },
    {
        id: 2,
        name: "Student ATTO Karta",
        type: "Sariq",
        price: "Chegirmali tarif",
        description: "Talabalar uchun imtiyozli tarif",
        color: "bg-yellow-50 border-yellow-200",
        iconColor: "bg-yellow-500",
        img: "https://atto.uz/icons/cards/yellow_transport_card.png",
    },
    {
        id: 3,
        name: "Maktab O'quvchilari",
        type: "Yashil",
        price: "Chegirmali tarif",
        description: "Maktab o'quvchilari uchun",
        color: "bg-green-50 border-green-200",
        iconColor: "bg-green-500",
        img: "https://atto.uz/icons/cards/green_transport_card.png",
    },
    {
        id: 4,
        name: "Ijtimoiy ATTO Karta",
        type: "Qizil",
        price: "Imtiyozli tarif",
        description: "Ijtimoiy himoya ostidagi fuqarolar uchun",
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
        img: "https://e7.pngegg.com/pngimages/925/4/png-clipart-logo-unionpay-credit-card-atm-card-bank-card-credit-card-text-payment-thumbnail.png",
    },
]

export default function PaymentMethods() {
    const [hoveredCard, setHoveredCard] = useState(null)

    return (
        <div className="min-h-screen ">
            <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
                {/* Header - Mobile Optimized */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-2 sm:mb-4 leading-tight">
                        To'lov Turlari
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                        Toshkent Metropolitenida mavjud bo'lgan barcha to'lov usullari haqida batafsil ma'lumot
                    </p>
                </div>

                {/* Timeline Container - Mobile First */}
                <div className="relative">
                    {/* Timeline Line - Responsive */}
                    <div className="absolute left-3 sm:left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200"></div>

                    {/* ATTO Transport Cards Section */}
                    <div className="relative mb-8 sm:mb-12 lg:mb-16">
                        <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg">
                                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="ml-3 sm:ml-4 md:ml-8">
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 leading-tight">
                                    ATTO Transport Kartasi
                                </h2>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2">
                                    Markazlashtirilgan NFC transport kartasi
                                </p>
                            </div>
                        </div>

                        <div className="ml-9 sm:ml-12 md:ml-16">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                                {attoCards.map((card) => (
                                    <Card
                                        key={card.id}
                                        className={`${card.color} border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group`}
                                        onMouseEnter={() => setHoveredCard(card.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                                            <div className="mb-3 sm:mb-4 relative overflow-hidden rounded-lg">
                                                <div className="w-full h-24 sm:h-28 lg:h-32 bg-white rounded-lg flex items-center justify-center p-2 sm:p-3 transition-transform duration-300 group-hover:scale-110 shadow-inner">
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={card.img || "/placeholder.svg"}
                                                            alt={card.name}
                                                            fill
                                                            className="object-contain transition-transform duration-300"
                                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base leading-tight">
                                                {card.name}
                                            </h3>
                                            <Badge variant="secondary" className="mb-1 sm:mb-2 text-xs">
                                                {card.type}
                                            </Badge>
                                            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 leading-tight">{card.description}</p>
                                            <p className="font-bold text-blue-900 text-xs sm:text-sm lg:text-base">{card.price}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 border border-blue-100">
                                <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">
                                    Qayerdan sotib olish mumkin:
                                </h4>
                                <ul className="text-gray-700 space-y-1 text-xs sm:text-sm">
                                    <li>• Metro kassalari</li>
                                    <li>• Toshshahartrans xizmat bo'limlari</li>
                                    <li>• UzPost pochta ofislari</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Applications Section */}
                    <div className="relative mb-8 sm:mb-12 lg:mb-16">
                        <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg">
                                <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="ml-3 sm:ml-4 md:ml-8">
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 leading-tight">
                                    Mobil Ilovalar Orqali To'lov
                                </h2>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2">
                                    Turli mobil ilovalar orqali to'lov qilish imkoniyati
                                </p>
                            </div>
                        </div>

                        <div className="ml-9 sm:ml-12 md:ml-16">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                                {mobileApps.map((app, index) => (
                                    <Card
                                        key={index}
                                        className="transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-2 hover:border-blue-300 group"
                                    >
                                        <CardContent className="p-2 sm:p-3 lg:p-4 text-center">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl mx-auto mb-1 sm:mb-2 lg:mb-3 overflow-hidden bg-white shadow-sm transition-transform duration-300 group-hover:rotate-6 flex items-center justify-center">
                                                <div className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
                                                    <Image
                                                        src={app.img || "/placeholder.svg"}
                                                        alt={app.name}
                                                        fill
                                                        className="object-contain"
                                                        sizes="(max-width: 640px) 24px, (max-width: 1024px) 28px, 32px"
                                                    />
                                                </div>
                                            </div>
                                            <p className="font-semibold text-blue-900 text-xs sm:text-sm leading-tight">{app.name}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="bg-green-50 rounded-lg p-3 sm:p-4 lg:p-6 border border-green-100">
                                <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">Balansni to'ldirish:</h4>
                                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                                    ATTO mobil ilovasi, MyUzCard, Payme, Upay, Apelsin va boshqa elektron to'lov tizimlari orqali yoki
                                    kassalarda va infokiosklarda naqd va plastik kartalar bilan
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bank Cards & NFC Section */}
                    <div className="relative mb-8 sm:mb-12 lg:mb-16">
                        <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg">
                                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="ml-3 sm:ml-4 md:ml-8">
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 leading-tight">
                                    Bank Kartalari & NFC To'lovlar
                                </h2>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2">
                                    NFC orqali metro va avtobusda to'lov - 1,700 UZS
                                </p>
                            </div>
                        </div>

                        <div className="ml-9 sm:ml-12 md:ml-16">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                                {bankCards.map((card, index) => (
                                    <Card
                                        key={index}
                                        className="transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-2 hover:border-blue-300 group"
                                    >
                                        <CardContent className="p-2 sm:p-3 lg:p-4 text-center">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg mx-auto mb-1 sm:mb-2 lg:mb-3 overflow-hidden bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 flex items-center justify-center p-1">
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={card.img || "/placeholder.svg"}
                                                        alt={card.name}
                                                        fill
                                                        className="object-contain"
                                                        sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 48px"
                                                    />
                                                </div>
                                            </div>
                                            <p className="font-semibold text-blue-900 text-xs sm:text-sm leading-tight">{card.name}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="bg-purple-50 rounded-lg p-3 sm:p-4 lg:p-6 border border-purple-100">
                                <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">
                                    Qo'shimcha imkoniyatlar:
                                </h4>
                                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                                    Uzum bank, Paynet, Click, Payme, Alif mobi orqali to'lov qilish mumkin, ko'pincha cashback yoki
                                    chegirmalar mavjud
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* QR Code & Paynet ATM Section */}
                    <div className="relative mb-8 sm:mb-12 lg:mb-16">
                        <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg">
                                <QrCode className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="ml-3 sm:ml-4 md:ml-8">
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 leading-tight">
                                    QR-Bilet & Paynet ATM
                                </h2>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2">
                                    Bir martalik QR to'lov va ATM orqali QR kod
                                </p>
                            </div>
                        </div>

                        <div className="ml-9 sm:ml-12 md:ml-16">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                                <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-blue-300">
                                    <CardContent className="p-3 sm:p-4 lg:p-6">
                                        <div className="flex items-center mb-2 sm:mb-3 lg:mb-4">
                                            <QrCode className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-900 mr-2 sm:mr-3" />
                                            <h3 className="font-semibold text-blue-900 text-sm sm:text-base lg:text-lg">QR-Bilet</h3>
                                        </div>
                                        <p className="text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm leading-relaxed">
                                            Naqd pul orqali kassalarda sotiladigan QR-bilet
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-blue-900 text-sm sm:text-base">3,000 UZS</span>
                                            <Badge variant="outline" className="text-xs">
                                                30 daqiqa
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-blue-300">
                                    <CardContent className="p-3 sm:p-4 lg:p-6">
                                        <div className="flex items-center mb-2 sm:mb-3 lg:mb-4">
                                            <Scan className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-900 mr-2 sm:mr-3" />
                                            <h3 className="font-semibold text-blue-900 text-sm sm:text-base lg:text-lg">Paynet ATM QR</h3>
                                        </div>
                                        <p className="text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm leading-relaxed">
                                            Paynet ATM'laridan QR kod olish imkoniyati
                                        </p>
                                        <Badge variant="secondary" className="text-xs">
                                            Tez va qulay
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Biometric Payments Section */}
                    <div className="ml-12 md:ml-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-blue-300 relative z-10">
                                <CardContent className="p-6 ">
                                    <div className="flex items-center mb-4 ">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">
                                                <User2 />
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-blue-900">FacePay</h3>
                                    </div>
                                    <p className="text-gray-700 mb-3">Yuz tanish texnologiyasi asosida to'lov</p>
                                    <Badge variant="outline">Sinov rejimida</Badge>
                                </CardContent>
                            </Card>

                            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-blue-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                                            <img src="https://cdn6.aptoide.com/imgs/6/3/8/638e5192d3a8e2b1d56cf1b04f91bd36_icon.png" alt="Palmpay" />
                                        </div>
                                        <h3 className="font-semibold text-blue-900">PalmPay</h3>
                                    </div>
                                    <p className="text-gray-700 mb-3">Palma tomirlarini skanerlash orqali to'lov</p>
                                    <Badge variant="outline">12 stansiyada</Badge>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mt-6">
                            <h4 className="font-semibold text-blue-900 mb-3">Qanday ishlatiladi:</h4>
                            <p className="text-gray-700">
                                Foydalanuvchi mobil ilovada biometrik profilni yaratib, ATTO kartasiga bog'laydi. Metro burilish
                                turniketida palma yoki yuzni skaner qilib o'tadi.
                            </p>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="relative">
                        <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center z-10 relative shadow-lg">
                                <Wallet className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="ml-3 sm:ml-4 md:ml-8">
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 leading-tight">
                                    Tavsiyalar
                                </h2>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2">
                                    Eng qulay va tejamkor to'lov usullari
                                </p>
                            </div>
                        </div>

                        <div className="ml-9 sm:ml-12 md:ml-16">
                            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg p-4 sm:p-6 lg:p-8 text-white shadow-xl">
                                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
                                    ✅ Eng arzon va keng tarqalgan:
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                                        <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">ATTO kartasi</h4>
                                        <p className="text-blue-100 text-xs sm:text-sm">1,700 UZS - eng tejamkor variant</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                                        <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">NFC bank kartalar</h4>
                                        <p className="text-blue-100 text-xs sm:text-sm">1,700 UZS - tez va qulay</p>
                                    </div>
                                </div>
                                <p className="mt-3 sm:mt-4 text-blue-100 text-xs sm:text-sm leading-relaxed">
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
