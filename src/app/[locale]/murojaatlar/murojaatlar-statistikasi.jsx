"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Clock, MessageSquare, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    total_requests: 0,
    answer_percentage: 0,
    answer_requests: 0,
    unanswered_requests: 0,
  });

  // Haqiqiy ma'lumotlar - bu yerda o'z ma'lumotlaringizni qo'ying
  const stats = {
    total_requests: 20,
    answer_percentage: 5,
    answer_requests: 1,
    unanswered_requests: 19,
  };

  // Animatsiya uchun
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedStats({
          total_requests: Math.floor(stats.total_requests * progress),
          answer_percentage: Math.floor(stats.answer_percentage * progress),
          answer_requests: Math.floor(stats.answer_requests * progress),
          unanswered_requests: Math.floor(stats.unanswered_requests * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats(stats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Foizlarni hisoblash
  const answeredPercentage =
    (stats.answer_requests / stats.total_requests) * 100;
  const unansweredPercentage =
    (stats.unanswered_requests / stats.total_requests) * 100;

  return (
    <div>
      <div className="container py-5">
        {/* Progress barlar */}
        <Card
          className={`mb-6 bg-transparent sm:mb-8 shadow-none border-none  ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          // style={{ transitionDelay: "1400ms" }}
        >
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg md:text-xl text-blue-900">
              Batafsil Ko'rsatkichlar
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-4 sm:space-y-6">
            {/* Javob berilgan progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm sm:text-base font-medium text-blue-800">
                  Javob Berilgan So'rovlar
                </span>
                <span className="text-sm sm:text-base font-bold text-blue-900">
                  {stats.answer_requests}/{stats.total_requests}
                </span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-3 sm:h-4">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-800 h-3 sm:h-4 rounded-full transition-all duration-2000 "
                  style={{
                    width: `${answeredPercentage}%`,
                    animationDelay: "1.6s",
                  }}
                ></div>
              </div>
              <div className="text-right text-xs sm:text-sm text-blue-600 mt-1">
                {answeredPercentage.toFixed(1)}%
              </div>
            </div>

            {/* Javob berilmagan progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm sm:text-base font-medium text-blue-800">
                  Javob Berilmagan So'rovlar
                </span>
                <span className="text-sm sm:text-base font-bold text-blue-900">
                  {stats.unanswered_requests}/{stats.total_requests}
                </span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-3 sm:h-4">
                <div
                  className="bg-gradient-to-r from-blue-900 to-blue-400 h-3 sm:h-4 rounded-full transition-all duration-2000 "
                  style={{
                    width: `${unansweredPercentage}%`,
                    animationDelay: "1.8s",
                  }}
                ></div>
              </div>
              <div className="text-right text-xs sm:text-sm text-blue-600 mt-1">
                {unansweredPercentage.toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
