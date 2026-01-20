"use client";
import { useGetFoydalanuvchilarQuery } from "@/store/services/api";
import {
  Eye,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Users,
  Youtube,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../../public/logos.png";
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

const Footer = () => {
  const t = useTranslations("menu");
  const contacts = [
    {
      icon: MapPin,
      text: t("addressValue"),
      title: t("address"),
      type: "address",
    },
    {
      icon: Phone,
      text: "+99871 241-65-14",
      title: t("receptionPhone"),
      type: "phone",
    },
    {
      icon: Mail,
      text: "gup@tashmetro.uz",
      title: t("corporateEmail"),
      type: "email",
    },
    {
      icon: Mail,
      text: "tash.metropoliten@mail.ru",
      title: t("internationalPost"),
      type: "email",
    },
  ];
  const [totalVisitors, setTotalVisitors] = useState();
  const [onlineVisitors, setOnlineVisitors] = useState();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const { data } = useGetFoydalanuvchilarQuery();
  const isHiddenPath =
    parts[1] === "metro-xaritasis" || parts[1] === "normalMap";
  useEffect(() => {
    setTotalVisitors(data?.jami_foydalanuvchilar);
    setOnlineVisitors(data?.onlayn_foydalanuvchilar);
  }, [data]);
  return (
    <>
      <footer
        className={`relative bg-gradient-to-r from-[#0E327F] to-blue-800 text-white overflow-hidden ${
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
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-3 ">
              <div className="flex items-center gap-3">
                <Link href={"/"}>
                  <Image
                    src={logo}
                    alt="Toshkent metro logo"
                    width={50}
                    height={50}
                    className="object-cover w-[50px] h-[50px]"
                  />
                </Link>
                <div className="h-[40px] flex-col justify-center hidden sm:flex">
                  <div className="border-l border-[#00B0FF] h-[30%] w-full"></div>
                  <div className="border-l border-[#FF454B] h-[5%] w-full"></div>
                  <div className="border-l border-white h-[30%] w-full"></div>
                  <div className="border-l border-[#FF454B] h-[5%] w-full"></div>
                  <div className="border-l border-[#00B100] h-[30%] w-full"></div>
                </div>
                <h1 className="hidden md:block text-[11px] lg:text-[11] w-[150px] lg:w-[200px]">
                  {t("logo1")} <span>{t("logo2")}</span> {t("logo3")}
                </h1>
              </div>

              <blockquote className="relative text-white">
                <p className=" italic leading-relaxed text-2xl">
                  {t("slogan")}
                </p>
              </blockquote>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-4 ">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                {t("contact")}
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
            <div className="lg:col-span-1 space-y-3 ">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                {t("socialMedia")}
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
                        <p className="text-sm text-blue-200">
                          {t("totalVisits")}
                        </p>
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
                        <p className="text-sm text-blue-200">
                          {t("onlineNow")}
                        </p>
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
              <span>{t("copyright")}</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">{t("rights")}</span>
            </div>

            <div className="flex items-center gap-2 text-blue-300">
              <span>{t("source")}</span>
              <Link
                href="https://uzmetro.uz"
                target="_blank"
                className="hover:text-white transition-colors duration-300 underline decoration-blue-400 hover:decoration-white"
              >
                uzmetro.uz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
