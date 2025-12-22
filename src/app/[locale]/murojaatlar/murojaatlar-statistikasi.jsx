"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMurojaatStatistikasiQuery } from "@/store/services/api";
import { CheckCircle, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Component() {
  const t = useTranslations("menu");
  const [isVisible, setIsVisible] = useState(false);
  const { data, isLoading } = useGetMurojaatStatistikasiQuery();
  useEffect(() => {
    if (!isLoading) {
      setIsVisible(true);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="container py-5">
        <Card className="mb-6 bg-transparent shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-blue-900">
              {t("one_hundred_ninety_eight")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-4 bg-blue-100 rounded animate-pulse" />
            <div className="h-4 bg-blue-100 rounded animate-pulse" />
            <div className="h-4 bg-blue-100 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const answeredPercent = data?.stats?.answered_percentage ?? 0;
  return (
    <div className="container py-5">
      <Card
        className={`bg-transparent shadow-none border-none transition-all duration-700
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <CardHeader>
          <CardTitle className="text-blue-900">
            {t("two_hundred_one")}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ✅ Answered */}
          <div>
            <div className="flex justify-between mb-2 text-green-800">
              <span className="flex gap-2 items-center">
                <CheckCircle className="w-4 h-4" />
                {t("two_hundred_two")}
              </span>
              <span className="font-bold">
                {data?.stats?.answered_requests}/{data?.stats?.total_requests}
              </span>
            </div>

            <div className="bg-green-100 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${answeredPercent}%` }}
              />
            </div>

            <p className="text-right text-sm text-green-600 mt-1">
              {answeredPercent.toFixed(1)}%
            </p>
          </div>

          {/* ✅ Unanswered */}
          <div>
            <div className="flex justify-between mb-2 text-orange-800">
              <span className="flex gap-2 items-center">
                <Clock className="w-4 h-4" />
                {t("two_hundred_three")}
              </span>
              <span className="font-bold">
                {data?.stats?.unanswered_requests}/{data?.stats?.total_requests}
              </span>
            </div>

            <div className="bg-orange-100 rounded-full h-4">
              <div
                className="bg-orange-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${100 - data?.stats?.answered_percentage}%` }}
              />
            </div>

            <p className="text-right text-sm text-orange-600 mt-1">
              {100 - data?.stats?.answered_percentage.toFixed()}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
