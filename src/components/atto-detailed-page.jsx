"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  GraduationCap,
  Info,
  MapPin,
  Minus,
  Plus,
  School,
  Shield,
  Star,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import DetailedInfoModal from "./detail-info-modall";
import { useTranslations } from "next-intl";

const mainColor = "#0E327F";

export default function AttoDetailedPage() {
  const t = useTranslations("menu");
  const [modalType, setModalType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  const cardTypes = [
    {
      title: t("carduz1_title"),
      description: t("carduz1_description"),
      color: "bg-[#3939c6]",
      icon: <Users className="w-8 h-8 text-white" />,
      price: t("carduz1_price"),
      features: [
        t("carduz1_feature1"),
        t("carduz1_feature2"),
        t("carduz1_feature3"),
      ],
      cardColor: "ko'k",
    },
    {
      title: t("carduz2_title"),
      description: t("carduz2_description"),
      color: "bg-[#e2d317]",
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      price: t("carduz2_price"),
      features: [
        t("carduz2_feature1"),
        t("carduz2_feature2"),
        t("carduz2_feature3"),
      ],
      cardColor: "sariq",
    },
    {
      title: t("carduz3_title"),
      description: t("carduz3_description"),
      color: "bg-[#39b84d]",
      icon: <School className="w-8 h-8 text-white" />,
      price: t("carduz3_price"),
      features: [
        t("carduz3_feature1"),
        t("carduz3_feature2"),
        t("carduz3_feature3"),
      ],
      cardColor: "yashil",
    },
    {
      title: t("carduz4_title"),
      description: t("carduz4_description"),
      color: "bg-[#ec3641]",
      icon: <CreditCard className="w-8 h-8 text-white" />,
      price: t("carduz4_price"),
      features: [
        t("carduz4_feature1"),
        t("carduz4_feature2"),
        t("carduz4_feature3"),
      ],
      cardColor: "qizil",
    },
  ];
  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("benefit1_title"),
      desc: t("benefit1_desc"),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("benefit2_title"),
      desc: t("benefit2_desc"),
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: t("benefit3_title"),
      desc: t("benefit3_desc"),
    },
  ];
  const detailedServices = [
    {
      title: t("service1_title"),
      description: t("service1_desc"),
      icon: <Clock className="w-6 h-6" />,
      action: () => openModal("balance-check"),
    },
    {
      title: t("service2_title"),
      description: t("service2_desc"),
      icon: <Shield className="w-6 h-6" />,
      action: () => openModal("low-balance"),
    },
    {
      title: t("service3_title"),
      description: t("service3_desc"),
      icon: <Users className="w-6 h-6" />,
      action: () => openModal("sharing-rules"),
    },
  ];

  const faqs = [
    {
      question: t("faq1_question"),
      answer: t("faq1_answer"),
    },
    {
      question: t("faq2_question"),
      answer: t("faq2_answer"),
    },
    {
      question: t("faq3_question"),
      answer: t("faq3_answer"),
    },
    {
      question: t("faq4_question"),
      answer: t("faq4_answer"),
    },
    {
      question: t("faq5_question"),
      answer: t("faq5_answer"),
    },
    {
      question: t("faq6_question"),
      answer: t("faq6_answer"),
    },
  ];

  return (
    <div>
      <div className="container ">
        {/* Hero Section - White Background */}
        <section className="relative flex items-center justify-center py-10">
          {/* Unique Background Pattern */}

          <div className="relative z-10 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-gray-900"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6"
                >
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    {t("step1_title")}
                  </span>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
                  <span className="block" style={{ color: mainColor }}>
                    {t("step2_title")}
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {t("step3_title")}
                  </span>
                  <span className="block" style={{ color: mainColor }}>
                    {t("step4_title")}
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {t("step5_description")}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-100"
                    >
                      <div className="text-blue-600">{benefit.icon}</div>
                      <span className="text-sm font-medium text-gray-700">
                        {benefit.title}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    className="font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                    style={{ backgroundColor: mainColor }}
                    onClick={() => openModal("where-to-buy")}
                  >
                    {t("step6_button")} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Content - Enhanced 3D Card Display */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full max-w-md mx-auto">
                  {/* Main Card with Enhanced Design */}
                  <motion.div
                    animate={{
                      rotateY: [0, 5, 0, -5, 0],
                      rotateX: [0, 2, 0, -2, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative z-30"
                  >
                    <div className="w-80 h-48 bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3
                            className="text-2xl font-bold"
                            style={{ color: mainColor }}
                          >
                            {t("step2_title")}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {t("step7_card_name")}
                          </p>
                        </div>
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 2, delay: 1 }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {t("step8_balance")}
                        </p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-gray-500">
                            {t("step9_card_number")}
                          </p>
                          <p
                            className="font-mono text-sm font-semibold"
                            style={{ color: mainColor }}
                          >
                            **** **** **** 1234
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            {t("step10_valid")}
                          </p>
                          <p
                            className="font-mono text-sm font-semibold"
                            style={{ color: mainColor }}
                          >
                            12/28
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Floating Elements */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white/60 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5,
                      }}
                      style={{
                        width: `${40 + i * 8}px`,
                        height: `${25 + i * 5}px`,
                        right: `${-30 + i * 20}px`,
                        top: `${40 + i * 35}px`,
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: `hsl(${220 + i * 30}, 70%, 60%)`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Card Types Section - Enhanced */}
        <section className="py-10">
          <div className=" mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: mainColor }}
              >
                {t("step11_section_title")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("step12_section_desc")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {cardTypes.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div
                      className={`h-32 bg-gradient-to-br ${card.color} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full">
                        {card.icon}
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-lg font-bold">{card.price}</div>
                        <div className="text-xs opacity-80">
                          ({card.cardColor})
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{ color: mainColor }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {card.description}
                      </p>

                      <div className="space-y-2">
                        {card.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full mt-4 group-hover:bg-blue-600 text-white transition-colors"
                        style={{ backgroundColor: mainColor }}
                        onClick={() => openModal("where-to-buy")}
                      >
                        {t("step13_button")}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Services Section - Enhanced */}
        <section className="py-10 ">
          <div className=" mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: mainColor }}
              >
                {t("step14_section_title")}
              </h2>
              <p className="text-xl text-gray-600">
                {t("step15_section_desc")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {detailedServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card
                    className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                    onClick={service.action}
                  >
                    <CardContent className="p-8 text-center">
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <div style={{ color: mainColor }}>{service.icon}</div>
                      </motion.div>
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{ color: mainColor }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <Button
                        variant="outline"
                        className="border-2 hover:bg-blue-50 bg-transparent transition-all duration-300"
                        style={{ borderColor: mainColor, color: mainColor }}
                      >
                        <Info className="w-4 h-4 mr-2" />
                        {t("tolov26")}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section with Custom Animations */}
        <section className="py-10">
          <div className=" mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: mainColor }}
              >
                {t("step16_section_title")}
              </h2>
              <p className="text-xl text-gray-600">
                {t("step17_section_desc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border border-blue-900/20 rounded-2xl bg-blue-400/10  transition-all duration-300"
                  >
                    <motion.button
                      className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
                      onClick={() => toggleFaq(index)}
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                      }}
                    >
                      <span
                        className="text-lg font-semibold pr-4"
                        style={{ color: mainColor }}
                      >
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        {openFaq === index ? (
                          <Minus
                            className="w-5 h-5"
                            style={{ color: mainColor }}
                          />
                        ) : (
                          <Plus
                            className="w-5 h-5"
                            style={{ color: mainColor }}
                          />
                        )}
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="px-6 pb-6"
                          >
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <DetailedInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={modalType}
        />
      </div>
    </div>
  );
}
