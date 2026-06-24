"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Utensils, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CONTACT_INFO } from "@/lib/contact-info";
import { useTranslations } from "next-intl";

function ContactContent({ item }) {
  if (item.type === "address") {
    return (
      <address className="not-italic text-sm leading-relaxed">
        {item.content}
      </address>
    );
  }

  if (item.type === "phones") {
    return (
      <div className="space-y-2">
        {item.phones.map((phone) => (
          <p key={phone.tel} className="text-sm">
            <span className="block text-gray-600">{phone.label}</span>
            <a
              href={`tel:${phone.tel}`}
              className="font-medium text-blue-900 hover:underline"
              aria-label={`${phone.label}: ${phone.display}`}
            >
              {phone.display}
            </a>
          </p>
        ))}
      </div>
    );
  }

  if (item.type === "email") {
    return (
      <a
        href={`mailto:${item.email}`}
        className="text-sm font-medium text-blue-900 hover:underline break-all"
        aria-label={`${item.title}: ${item.email}`}
      >
        {item.email}
      </a>
    );
  }

  return <p className="text-sm leading-relaxed">{item.content}</p>;
}

export default function ContactInfo() {
  const t = useTranslations("menu");

  const contactInfo = [
    {
      icon: MapPin,
      title: t("address_label"),
      type: "address",
      content: t("addresster"),
      delay: 0.1,
    },
    {
      icon: Phone,
      title: t("phone_label"),
      type: "phones",
      phones: [
        {
          label: t("reception_phone_label"),
          tel: CONTACT_INFO.receptionPhone.tel,
          display: CONTACT_INFO.receptionPhone.display,
        },
        {
          label: t("inquiries_phone_label"),
          tel: CONTACT_INFO.inquiriesPhone.tel,
          display: CONTACT_INFO.inquiriesPhone.display,
        },
      ],
      delay: 0.2,
    },
    {
      icon: Clock,
      title: t("work_hours_label"),
      type: "text",
      content: t("work_hours"),
      delay: 0.3,
    },
    {
      icon: Utensils,
      title: t("lunch_time"),
      type: "text",
      content: t("lunch_hours_value"),
      delay: 0.4,
    },
    ...CONTACT_INFO.emails.map((email, index) => ({
      icon: Mail,
      title: t("email_label"),
      type: "email",
      email,
      delay: 0.5 + index * 0.1,
    })),
  ];

  return (
    <section
      className="py-20 px-4"
      aria-labelledby="contact-page-title"
    >
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            id="contact-page-title"
            className="text-4xl font-bold text-blue-900 mb-4"
          >
            {t("contact_info")}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("contact_us")}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.article
                key={`${info.title}-${info.email ?? info.content ?? index}`}
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
                      aria-hidden="true"
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: info.delay + 0.3 }}
                      className="text-xl font-semibold text-blue-900 mb-3 text-center"
                    >
                      {info.title}
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: info.delay + 0.4 }}
                      className="text-gray-700 text-center"
                    >
                      <ContactContent item={info} />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
