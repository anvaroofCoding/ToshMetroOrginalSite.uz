"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({
    total_requests: 0,
    answer_percentage: 0,
    answer_requests: 0,
    unanswered_requests: 0,
  });

  // Optimized API call with error handling
  async function getStatistika() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://abbos.uzmetro.uz/api/lost-items/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.stats) {
        throw new Error("Invalid response format");
      }

      // Validate data structure
      const validatedStats = {
        total_requests: Number(data.stats.total_requests),
        answer_percentage: Number(data.stats.answered_percentage),
        answer_requests: Number(data.stats.answered_requests),
        unanswered_requests: Number(data.stats.unanswered_requests),
      };

      setStats(validatedStats);
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch statistics"
      );

      // Fallback data for development/testing
      setStats({
        total_requests: 0,
        answer_percentage: 0,
        answer_requests: 0,
        unanswered_requests: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStatistika();
  }, []);

  // Optimized animation effect
  useEffect(() => {
    if (!stats) return;

    setIsVisible(true);

    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);

        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedStats({
          total_requests: Math.floor(stats.total_requests * easeOutQuart),
          answer_percentage: Math.floor(stats.answer_percentage * easeOutQuart),
          answer_requests: Math.floor(stats.answer_requests * easeOutQuart),
          unanswered_requests: Math.floor(
            stats.unanswered_requests * easeOutQuart
          ),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats(stats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, [stats]);

  // Safe percentage calculations
  const answeredPercentage = stats?.total_requests
    ? (stats.answer_requests / stats.total_requests) * 100
    : 0;

  const unansweredPercentage = stats?.total_requests
    ? (stats.unanswered_requests / stats.total_requests) * 100
    : 0;

  if (loading) {
    return (
      <div className="container py-5">
        <Card className="mb-6 bg-transparent sm:mb-8 shadow-none border-none">
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg md:text-xl text-blue-900">
              Statistika Yuklanmoqda...
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="space-y-4">
              <div className="h-4 bg-blue-100 rounded animate-pulse"></div>
              <div className="h-4 bg-blue-100 rounded animate-pulse"></div>
              <div className="h-4 bg-blue-100 rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Statistika ma'lumotlarini yuklashda xatolik: {error}
            <button
              onClick={getStatistika}
              className="ml-2 text-blue-600 hover:text-blue-800 underline"
            >
              Qayta urinish
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // console.log(stats);

  return (
    <div>
      <div className="container py-5">
        {/* Main Statistics Cards */}

        {/* Progress Bars */}
        <Card
          className={`mb-6 bg-transparent sm:mb-8 shadow-none border-none transition-all duration-700 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg md:text-xl text-blue-900">
              Murojaatlar natijalari
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-4 sm:space-y-6">
            {/* Answered requests progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm sm:text-base font-medium text-green-800 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Javob berilgan so'rovlar
                </span>
                <span className="text-sm sm:text-base font-bold text-green-900">
                  {stats.answer_requests}/{stats.total_requests}
                </span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-3 sm:h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-700 h-3 sm:h-4 rounded-full transition-all duration-2000 ease-out"
                  style={{
                    width: `${Math.min(answeredPercentage, 100)}%`,
                    transitionDelay: "1.6s",
                  }}
                ></div>
              </div>
              <div className="text-right text-xs sm:text-sm text-green-600 mt-1">
                {answeredPercentage.toFixed(1)}%
              </div>
            </div>

            {/* Unanswered requests progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm sm:text-base font-medium text-orange-800 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Jarayondagi so'rovlar
                </span>
                <span className="text-sm sm:text-base font-bold text-orange-900">
                  {stats.unanswered_requests}/{stats.total_requests}
                </span>
              </div>
              <div className="w-full bg-orange-100 rounded-full h-3 sm:h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-700 h-3 sm:h-4 rounded-full transition-all duration-2000 ease-out"
                  style={{
                    width: `${Math.min(unansweredPercentage, 100)}%`,
                    transitionDelay: "1.8s",
                  }}
                ></div>
              </div>
              <div className="text-right text-xs sm:text-sm text-orange-600 mt-1">
                {unansweredPercentage.toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
