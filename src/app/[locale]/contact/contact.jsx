"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Utensils, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";
const FaxIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="white"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
    <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
    <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
    <path d="M8 11h.01" />
    <path d="M12 11h.01" />
    <path d="M16 11h.01" />
    <path d="M8 15h.01" />
    <path d="M12 15h.01" />
    <path d="M16 15h.01" />
  </svg>
);

export default function ContactInfo() {
  const t = useTranslations("menu");
  const contactInfo = [
    {
      icon: MapPin,
      title: t("address_label"),
      content: t("addresster"),
      delay: 0.1,
    },
    {
      icon: Phone,
      title: t("phone_label"),
      content: [t("reception"), t("inquiries")],
      delay: 0.2,
    },
    {
      icon: Clock,
      title: "Ish rejimi",
      content: t("work_hours"),
      delay: 0.3,
    },
    {
      icon: Utensils,
      title: t("lunch_time"),
      content: "12:00 - 13:00",
      delay: 0.4,
    },
    {
      icon: Mail,
      title: t("corporate_email"),
      content: "gup@tashmetro.uz",
      delay: 0.5,
    },
    {
      icon: Mail,
      title: t("international_mail"),
      content: "tash.metropoliten@mail.ru",
      delay: 0.6,
    },
  ];
  return (
    <div className=" py-20 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            {t("contact_info")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("contact_us")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: info.delay,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="h-full border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: info.delay + 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto"
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: info.delay + 0.3 }}
                      className="text-xl font-semibold text-blue-900 mb-3 text-center"
                    >
                      {info.title}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: info.delay + 0.4 }}
                      className="text-gray-700 text-center"
                    >
                      {Array.isArray(info.content) ? (
                        <div className="space-y-1">
                          {info.content.map((item, idx) => (
                            <motion.p
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: info.delay + 0.5 + idx * 0.1,
                              }}
                              className="text-sm"
                            >
                              {item}
                            </motion.p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">
                          {info.content}
                        </p>
                      )}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
