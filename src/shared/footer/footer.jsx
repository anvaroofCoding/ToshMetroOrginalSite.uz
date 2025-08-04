"use client";

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Youtube,
  Users,
  Eye,
  ArrowUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../../public/logos.png";
import { usePathname } from "next/navigation";

// const logo = "/placeholder.svg?height=60&width=60&text=Metro"

const socialLinks = [
  {
    href: "https://t.me/Toshkent_metropoliteni_rasmiy",
    icon: Send,
    title: "Telegram",
    color: "hover:bg-blue-500",
  },
  {
    href: "https://www.instagram.com/toshkentmetropoliteni?utm_source=ig_web_button_share_sheet&igsh=MWs4N3dseDY0bnBs",
    icon: Instagram,
    title: "Instagram",
    color: "hover:bg-pink-500",
  },
  {
    href: "https://youtube.com/@toshkentmetropoliteniduk?feature=shared",
    icon: Youtube,
    title: "YouTube",
    color: "hover:bg-red-500",
  },
  {
    href: "https://www.facebook.com/people/Toshkent-metropoliteni/100077452683509/?ti=as#",
    icon: Facebook,
    title: "Facebook",
    color: "hover:bg-blue-600",
  },
];

const contacts = [
  {
    icon: MapPin,
    text: "Toshkent sh., I.Karimov ko'chasi, 16a uy, 100027",
    title: "Manzil",
    type: "address",
  },
  {
    icon: Phone,
    text: "+99871 241-65-14",
    title: "Qabulxona raqami",
    type: "phone",
  },
  {
    icon: Mail,
    text: "gup@tashmetro.uz",
    title: "Korporativ pochta manzili",
    type: "email",
  },
  {
    icon: Mail,
    text: "tash.metropoliten@mail.ru",
    title: "Xalqaro pochta manzili",
    type: "email",
  },
];

const Footer = () => {
  const [totalVisitors, setTotalVisitors] = useState();
  const [onlineVisitors, setOnlineVisitors] = useState();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const isHiddenPath = parts[1] === "metro-xaritasis";
  const getprosmotrsite = async () => {
    const res = await fetch(
      "https://metro-site.onrender.com/api/sayt_foydalanuvchilari/"
    );
    const data = await res.json();
    setTotalVisitors(data.jami_foydalanuvchilar);
    setOnlineVisitors(data.onlayn_foydalanuvchilar);
  };

  useEffect(() => {
    getprosmotrsite();
  }, []);

  return (
    <>
      <footer
        className={`relative rounded-t-[50px] bg-gradient-to-r from-[#0E327F] to-blue-800 text-white overflow-hidden ${
          isHiddenPath ? "hidden" : ""
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: 'url("/naqsh.png")',
              backgroundRepeat: "repeat",
              backgroundSize: "200px", // <<< kichikroq qilib, ko‘p takrorlanadi
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative container py-8 ">
          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-3">
                <Link href={"/"}>
                  <Image
                    src={logo}
                    alt="Toshkent metro logo"
                    width={50}
                    height={50}
                  />
                </Link>
                <div className="h-[40px] flex-col justify-center hidden sm:flex">
                  <div className="border-l border-[#00B0FF] h-[30%] w-full"></div>
                  <div className="border-l border-[#FF454B] h-[5%] w-full"></div>
                  <div className="border-l border-white h-[30%] w-full"></div>
                  <div className="border-l border-[#FF454B] h-[5%] w-full"></div>
                  <div className="border-l border-[#00B100] h-[30%] w-full"></div>
                </div>
                <h1 className="hidden md:block text-[11px] lg:text-[11] w-[150px] lg:w-[200px] capitalize">
                  O'zbekiston Respublikasi Transport vazirligi{" "}
                  <span>"Toshkent Metropoliteni"</span> DUK
                </h1>
              </div>

              <blockquote className="relative text-white">
                <div className="absolute -left-1 -top-1 text-3xl text-white font-serif">
                  "
                </div>
                <p className=" italic leading-relaxed pl-4">
                  Xavfsiz, tez va qulay yo’lovchilar tashishni ta’minlash.
                </p>
              </blockquote>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                Bog'lanish
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {contacts.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-4 h-4 text-blue-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-blue-200">
                          {item.title}
                        </p>
                        <p className="text-white text-xs break-all">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social & Stats */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                Ijtimoiy tarmoqlar
              </h3>

              {/* Social Links */}
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      target="_blank"
                      aria-label={item.title}
                      className={`group relative w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${item.color}`}
                    >
                      <IconComponent className="w-5 h-5 text-white group-hover:text-white transition-colors duration-300" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </Link>
                  );
                })}
              </div>

              {/* Visitor Stats */}
              <div className="space-y-2 pt-2">
                <div className="">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Jami tashrif</p>
                        <p className="text-xl font-bold text-white">
                          {totalVisitors}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="flex items-center  justify-between">
                    <div className="flex items-center  gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200">Hozir onlayn</p>
                        <p className="text-xl font-bold text-white">
                          {onlineVisitors}
                        </p>
                      </div>
                    </div>
                    {/* <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-blue-200">
              <span>© 2025 "Toshkent Metropoliteni" DUK</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">
                Barcha huquqlar himoyalangan
              </span>
            </div>

            <div className="flex items-center gap-2 text-blue-300">
              <span>Manba:</span>
              <Link
                href="https://tashmetro.uz"
                target="_blank"
                className="hover:text-white transition-colors duration-300 underline decoration-blue-400 hover:decoration-white"
              >
                tashmetro.uz
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;
