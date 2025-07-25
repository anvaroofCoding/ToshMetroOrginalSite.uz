"use client"

import { motion } from "framer-motion"
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Send, Train, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from "../../../public/logo.png"

const contacts = [
  {
    icon: <MapPin className="w-4 h-4" />,
    text: "Toshkent sh, I.Karimov ko'chasi, 16a uy",
    title: "Manzil",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    text: "+99871 241-65-14",
    title: "Telefon",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    text: "gup@tashmetro.uz",
    title: "Email",
  },
]

const socialLinks = [
  {
    href: "https://t.me/tashkent_metro",
    icon: <Send className="w-5 h-5" />,
    title: "Telegram",
  },
  {
    href: "https://instagram.com/tashkent_metro",
    icon: <Instagram className="w-5 h-5" />,
    title: "Instagram",
  },
  {
    href: "https://youtube.com/tashkent_metro",
    icon: <Youtube className="w-5 h-5" />,
    title: "YouTube",
  },
  {
    href: "https://facebook.com/tashkent_metro",
    icon: <Facebook className="w-5 h-5" />,
    title: "Facebook",
  },
]

const quickInfo = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Ish Vaqti",
    info: "05:30 - 00:00",
  },
  {
    icon: <Train className="w-5 h-5" />,
    title: "Poyezdlar",
    info: "Har 2-4 daqiqada",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function OptimizedFooter() {
  const pathname = usePathname()
  const parts = pathname.split("/").filter(Boolean)
  const isHiddenPath = parts[1] === "metro-xaritasis"

  if (isHiddenPath) return null

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="container py-12 lg:py-10 "
      >
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Company Info - Takes more space on larger screens */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-6">
            {/* Logo and Brand */}
            <div className="flex items-start gap-3 mb-6">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src={logo}
                  alt="Toshkent metro logo"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
              </Link>

              {/* Metro Lines Indicator */}
              <div className="flex flex-col justify-center h-[50px] w-1 ml-2">
                <div className="bg-[#00B0FF] h-[30%] w-full rounded-sm"></div>
                <div className="bg-[#FF454B] h-[5%] w-full my-1"></div>
                <div className="bg-white h-[30%] w-full rounded-sm"></div>
                <div className="bg-[#FF454B] h-[5%] w-full my-1"></div>
                <div className="bg-[#00B100] h-[30%] w-full rounded-sm"></div>
              </div>

              <div className="ml-3">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight">
                  O'zbekiston Respublikasi
                </h2>
                <p className="text-xs sm:text-sm text-blue-200 font-semibold">"Toshkent Metropoliteni" DUK</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-blue-100 text-sm sm:text-base mb-8 max-w-lg leading-relaxed">
              Shahar bo'ylab tez, xavfsiz va qulay sayohat. Har kuni minglab yo'lovchilarga xizmat ko'rsatamiz.
            </p>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200 mb-4">Bog'lanish</h3>
              {contacts.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-base group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#00B0FF] mt-1 group-hover:text-blue-300 transition-colors">{item.icon}</span>
                  <div>
                    <p className="text-blue-200 text-xs uppercase tracking-wide mb-1">{item.title}</p>
                    <p className="text-white">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Info */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Tezkor Ma'lumot</h3>
            <div className="space-y-6">
              {quickInfo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-[#00B0FF] mt-1">{item.icon}</span>
                  <div>
                    <p className="text-xs text-blue-300 uppercase tracking-wide mb-1">{item.title}</p>
                    <p className="text-base font-semibold text-white">{item.info}</p>
                  </div>
                </div>
              ))}

              {/* Metro Cards Info */}
              <div className="pt-4 border-t border-blue-700">
                <p className="text-xs text-blue-300 uppercase tracking-wide mb-1">Metro Kartalari</p>
                <p className="text-base font-semibold text-white">2,000 so'm dan boshlab</p>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Ijtimoiy Tarmoqlar</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
              {socialLinks.map((item, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${item.title}`}
                    className="flex items-center justify-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group backdrop-blur-sm"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Media Labels */}
            <div className="mt-4 text-xs text-blue-300">
              <p>Bizni kuzatib boring va yangiliklar oling</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="bg-blue-900 border-t border-blue-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-blue-200 text-center sm:text-left">
              © 2024 "Toshkent metropoliteni" DUK | Barcha Huquqlar Himoyalangan
            </p>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-blue-300">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Maxfiylik
              </Link>
              <span className="text-blue-500">•</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Qoidalar
              </Link>
              <span className="text-blue-500">•</span>
              <Link href="/help" className="hover:text-white transition-colors">
                Yordam
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
