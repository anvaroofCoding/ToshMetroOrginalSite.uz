"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Clock,
  CreditCard,
  MapPin,
  Smartphone,
  Users,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

const mainColor = "#0E327F";

export default function DetailedInfoModal({ isOpen, onClose, type }) {
  const t = useTranslations("menu");
  const getContent = () => {
    switch (type) {
      case "where-to-buy":
        return {
          title: t("info_modal48"),
          icon: <MapPin className="w-6 h-6" />,
          content: (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {t("info_modal47")}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>{t("info_modal46")}</li>
                  <li>{t("info_modal45")}</li>
                  <li>{t("info_modal44")}</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-green-800">
                  {t("info_modal49")}
                </h4>
                <p className="text-sm text-green-700">{t("info_modal43")}</p>
              </div>
            </div>
          ),
        };

      case "how-to-topup":
        return {
          title: t("info_modal42"),
          icon: <CreditCard className="w-6 h-6" />,
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    {t("info_modal41")}
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• ATTO</li>
                    <li>• MyUzcard</li>
                    <li>• Payme</li>
                    <li>• Upay</li>
                    <li>• Apelsin</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    {t("info_modal40")}
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>{t("info_modal39")}</li>
                    <li>{t("info_modal38")}</li>
                    <li>{t("info_modal37")}</li>
                  </ul>
                </div>
              </div>
            </div>
          ),
        };

      case "how-to-pay":
        return {
          title: t("info_modal36"),
          icon: <Smartphone className="w-6 h-6" />,
          content: (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🚌</span>
                  </div>
                  {t("info_modal35")}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>{t("info_modal34")}</li>
                  <li>{t("info_modal32")}</li>
                  <li>{t("info_modal31")}</li>
                  <li> {t("info_modal30")}</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🚇</span>
                  </div>
                  {t("info_modal29")}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>{t("info_modal28")}</li>
                  <li>{t("info_modal27")}</li>
                  <li>{t("info_modal26")}</li>
                  <li>{t("info_modal25")}</li>
                </ul>
              </div>
            </div>
          ),
        };

      case "balance-check":
        return {
          title: t("info_modal24"),
          icon: <Clock className="w-6 h-6" />,
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">{t("info_modal23")}</h4>
                  <p className="text-xs">{t("info_modal22")}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">{t("info_modal21")}</h4>
                  <p className="text-xs">{t("info_modal20")}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <CreditCard className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">{t("info_modal19")}</h4>
                  <p className="text-xs">{t("info_modal18")}</p>
                </div>
              </div>
            </div>
          ),
        };

      case "low-balance":
        return {
          title: t("info_modal16"),
          icon: <AlertCircle className="w-6 h-6" />,
          content: (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {t("info_modal15")}
                </h4>
                <p className="text-sm text-red-700 mb-3">{t("info_modal14")}</p>
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium mb-2">{t("info_modal17")}</h5>
                  <ul className="text-sm space-y-1">
                    <li>{t("info_modal13")}</li>
                    <li>{t("info_modal12")}</li>
                    <li>{t("info_modal11")}</li>
                  </ul>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-green-800">
                  {t("info_modal33")}
                </h4>
                <p className="text-sm text-green-700">{t("info_modal10")}</p>
              </div>
            </div>
          ),
        };

      case "sharing-rules":
        return {
          title: t("info_modal9"),
          icon: <Users className="w-6 h-6" />,
          content: (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-red-800 flex items-center gap-2">
                  <X className="w-5 h-5" />
                  {t("info_modal8")}
                </h4>
                <p className="text-sm text-red-700 mb-3">{t("info_modal7")}</p>
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium mb-2">Sabablari:</h5>
                  <ul className="text-sm space-y-1">
                    <li> {t("info_modal6")}</li>
                    <li> {t("info_modal5")}</li>
                    <li> {t("info_modal4")}</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-800">
                  {t("info_modal3")}
                </h4>
                <p className="text-sm text-blue-700">{t("info_modal1")}</p>
              </div>
            </div>
          ),
        };

      default:
        return {
          title: "Ma'lumot",
          icon: <CreditCard className="w-6 h-6" />,
          content: <div>Ma'lumot topilmadi</div>,
        };
    }
  };

  const content = getContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <Card className="border-0 shadow-2xl">
              <CardHeader
                className="pb-4"
                style={{ backgroundColor: mainColor }}
              >
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    {content.icon}
                    <CardTitle className="text-lg">{content.title}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">{content.content}</CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
