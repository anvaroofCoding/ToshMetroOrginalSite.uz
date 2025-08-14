"use client";

import { Alert } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  TrendingUp,
  Users,
  BarChart3,
  Activity,
  Calendar,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MetroStatisticsDashboard = () => {
  const [apiStats, setApiStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStation, setSelectedStation] = useState("");
  const [stations, setStations] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("1");
  const [animatedTotalUsers, setAnimatedTotalUsers] = useState(0);
  const [animatedAverageUsers, setAnimatedAverageUsers] = useState(0);
  const [availableYears, setAvailableYears] = useState([]);
  const [yearsLoading, setYearsLoading] = useState(true);

  const path = usePathname();
  const lang = path.split("/")[1] || "uz";

  const chartTypes = [
    { value: "bar", label: "Ustunli grafik" },
    { value: "line", label: "Chiziqli grafik" },
    { value: "area", label: "Maydonli grafik" },
    { value: "pie", label: "Doira grafik" },
    { value: "radar", label: "Radar grafik" },
  ];

  const quarters = [
    { value: "1", label: "1-chorak (Yanvar-Mart)" },
    { value: "2", label: "2-chorak (Aprel-Iyun)" },
  ];

  const fetchAvailableYears = async () => {
    setYearsLoading(true);
    try {
      const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];
      const availableYearsList = [];

      for (const year of years) {
        try {
          const response = await fetch(
            `https://metro-site.onrender.com/api/statistics/${lang}/${year}/1/`
          );
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              availableYearsList.push(year);
            }
          }
        } catch (err) {
          continue;
        }
      }

      if (availableYearsList.length > 0) {
        setAvailableYears(availableYearsList.sort());
        if (!selectedYear) {
          setSelectedYear(availableYearsList[availableYearsList.length - 1]);
        }
      } else {
        setAvailableYears([]);
        setError("API'da hech qanday yil ma'lumotlari topilmadi.");
      }
    } catch (err) {
      console.error("Yillarni yuklashda xatolik:", err);
      setError("Yillar ma'lumotlarini yuklashda xatolik yuz berdi.");
    } finally {
      setYearsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableYears();
  }, [lang]);

  const getMonthOrder = (monthName) => {
    const months = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
      Yanvar: 1,
      Fevral: 2,
      Mart: 3,
      Aprel: 4,
      May: 5,
      Iyun: 6,
      Iyul: 7,
      Avgust: 8,
      Sentyabr: 9,
      Oktyabr: 10,
      Noyabr: 11,
      Dekabr: 12,
    };
    return months[monthName] || 0;
  };

  useEffect(() => {
    if (!selectedYear || availableYears.length === 0) return;

    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://metro-site.onrender.com/api/statistics/${lang}/${selectedYear}/${selectedQuarter}/`
        );
        if (!response.ok) {
          throw new Error(`HTTP xatolik! Status: ${response.status}`);
        }
        const data = await response.json();

        if (!data || data.length === 0) {
          setApiStats([]);
          setStations([]);
          setSelectedStation("");
          setError(
            `${selectedYear}-yil ${selectedQuarter}-chorak uchun ma'lumotlar yo'q.`
          );
          return;
        }

        setApiStats(data);
        setError(null);

        const uniqueStations = Array.from(
          new Set(data.map((stat) => stat.station_name))
        );
        setStations(uniqueStations);

        if (uniqueStations.length > 0 && !selectedStation) {
          setSelectedStation(uniqueStations[0]);
        }
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
        setApiStats([]);
        setStations([]);
        setSelectedStation("");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [lang, selectedYear, selectedQuarter, availableYears]);

  const selectedStationData = apiStats
    .filter((item) => item.station_name === selectedStation)
    .reduce((acc, monthData) => {
      const existingMonth = acc.find((item) => item.month === monthData.month);
      if (!existingMonth) {
        acc.push({
          month: monthData.month,
          user_count: monthData.user_count,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => getMonthOrder(a.month) - getMonthOrder(b.month));

  const totalUsers = selectedStationData.reduce(
    (sum, item) => sum + item.user_count,
    0
  );
  const averageUsers =
    selectedStationData.length > 0
      ? Math.round(totalUsers / selectedStationData.length)
      : 0;

  useEffect(() => {
    if (totalUsers > 0) {
      const duration = 1000; // Reduced animation duration for better mobile performance
      const steps = 30; // Reduced steps for smoother performance
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedTotalUsers(Math.round(totalUsers * easeOutQuart));
        setAnimatedAverageUsers(Math.round(averageUsers * easeOutQuart));

        if (currentStep >= steps) {
          setAnimatedTotalUsers(totalUsers);
          setAnimatedAverageUsers(averageUsers);
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else {
      setAnimatedTotalUsers(0);
      setAnimatedAverageUsers(0);
    }
  }, [totalUsers, averageUsers]);

  if (yearsLoading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-900" />
          </motion.div>
          <span className="text-base sm:text-lg font-medium text-blue-900 text-center">
            Mavjud yillar tekshirilmoqda...
          </span>
        </motion.div>
      </div>
    );
  }

  if (availableYears.length === 0 && !yearsLoading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm sm:max-w-md w-full"
        >
          <Alert
            variant="destructive"
            className="border-red-200 bg-red-50/80 backdrop-blur-sm"
          >
            <div className="text-center space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-red-900">
                Bu ma'lumotar hali mavjud emas
              </h2>
            </div>
          </Alert>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-900" />
          </motion.div>
          <span className="text-base sm:text-lg font-medium text-blue-900">
            Yuklanmoqda...
          </span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm sm:max-w-md w-full"
        >
          <Alert
            variant="destructive"
            className="border-red-200 bg-red-50/80 backdrop-blur-sm"
          >
            <div className="text-center space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-red-900">
                Xatolik
              </h2>
            </div>
          </Alert>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      <div className="container py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 leading-tight px-2">
            Metropoliten yo'lovchilar statistikasi
          </h1>
          <p className="text-sm sm:text-base text-blue-900/70 max-w-2xl mx-auto px-2">
            {selectedYear}-yil {selectedQuarter}-chorak yo'lovchi tashish
            ma'lumotlari
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-blue-900/20 shadow-md bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 sm:pb-3 border-none">
                <CardTitle className="flex items-center gap-2 text-blue-900 text-xs sm:text-sm ">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  Yil
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="border-blue-900/30 focus:border-blue-900 bg-white/20 backdrop-blur-sm h-8 sm:h-10 text-xs sm:text-sm">
                    <SelectValue placeholder="Yilni tanlang" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {availableYears.map((year) => (
                      <SelectItem
                        key={year}
                        value={year}
                        className="text-xs sm:text-sm"
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-blue-900/20 shadow-md bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 sm:pb-3 border-none">
                <CardTitle className="flex items-center gap-2 text-blue-900 text-xs sm:text-sm">
                  <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
                  Chorak
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Select
                  value={selectedQuarter}
                  onValueChange={setSelectedQuarter}
                >
                  <SelectTrigger className="border-blue-900/30 focus:border-blue-900 bg-white/20 backdrop-blur-sm h-8 sm:h-10 text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {quarters.map((quarter) => (
                      <SelectItem
                        key={quarter.value}
                        value={quarter.value}
                        className="text-xs sm:text-sm"
                      >
                        {quarter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-blue-900/20 shadow-md bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 sm:pb-3 border-none">
                <CardTitle className="flex items-center gap-2 text-blue-900 text-xs sm:text-sm">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  Bekat
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Select
                  value={selectedStation}
                  onValueChange={setSelectedStation}
                >
                  <SelectTrigger className="border-blue-900/30 focus:border-blue-900 bg-white/20 backdrop-blur-sm h-8 sm:h-10 text-xs sm:text-sm">
                    <SelectValue placeholder="Bekatni tanlang" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {stations.map((station) => (
                      <SelectItem
                        key={station}
                        value={station}
                        className="text-xs sm:text-sm"
                      >
                        {station}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-blue-900/20 shadow-md bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 sm:pb-3 border-none">
                <CardTitle className="flex items-center gap-2 text-blue-900 text-xs sm:text-sm">
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                  Grafik
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="border-blue-900/30 focus:border-blue-900 bg-white/20 backdrop-blur-sm h-8 sm:h-10 text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {chartTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="text-xs sm:text-sm"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {selectedStation && (
            <motion.div
              key={`${selectedStation}-${selectedYear}-${selectedQuarter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }} // Reduced transition duration
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Card className="border-blue-900/20 bg-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <motion.div
                            className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-1 truncate"
                            key={animatedTotalUsers}
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.15 }}
                          >
                            {animatedTotalUsers.toLocaleString()}
                          </motion.div>
                          <p className="text-xs sm:text-sm font-medium text-blue-900/70">
                            Jami yo'lovchilar
                          </p>
                        </div>
                        <div className="p-2 bg-blue-900/20 rounded-lg flex-shrink-0 ml-2">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-900" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Card className="border-blue-900/20 bg-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <motion.div
                            className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-1 truncate"
                            key={animatedAverageUsers}
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.15 }}
                          >
                            {animatedAverageUsers.toLocaleString()}
                          </motion.div>
                          <p className="text-xs sm:text-sm font-medium text-blue-900/70">
                            O'rtacha oylik
                          </p>
                        </div>
                        <div className="p-2 bg-blue-900/20 rounded-lg flex-shrink-0 ml-2">
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-900" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-blue-900/20 shadow-lg bg-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-blue-900 text-base sm:text-lg truncate">
                      {selectedStation} bekati -{" "}
                      {chartTypes.find((t) => t.value === chartType)?.label}
                    </CardTitle>
                    <CardDescription className="text-blue-900/70 text-xs sm:text-sm">
                      {selectedYear}-yil {selectedQuarter}-chorak ma'lumotlari
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-6">
                    <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full bg-white/20 rounded-lg p-2 sm:p-4 backdrop-blur-sm">
                      <ResponsiveContainer width="100%" height="100%">
                        {(() => {
                          const commonProps = {
                            data: selectedStationData,
                            margin: {
                              top: 10,
                              right: 10,
                              left: 10,
                              bottom: 40,
                            },
                          };

                          const commonXAxis = (
                            <XAxis
                              dataKey="month"
                              tick={{
                                fontSize: window.innerWidth < 640 ? 9 : 11,
                                fill: "#1e3a8a",
                                fontWeight: "600",
                              }}
                              angle={window.innerWidth < 640 ? -60 : -45}
                              textAnchor="end"
                              height={window.innerWidth < 640 ? 50 : 60}
                              interval={0}
                              axisLine={{ stroke: "#1e3a8a", strokeWidth: 1 }}
                            />
                          );

                          const commonYAxis = (
                            <YAxis
                              tick={{
                                fontSize: window.innerWidth < 640 ? 9 : 11,
                                fill: "#1e3a8a",
                                fontWeight: "600",
                              }}
                              axisLine={{ stroke: "#1e3a8a", strokeWidth: 1 }}
                              width={window.innerWidth < 640 ? 40 : 60}
                            />
                          );

                          const commonTooltip = (
                            <Tooltip
                              formatter={(value) => [
                                value.toLocaleString(),
                                "Yo'lovchilar",
                              ]}
                              labelStyle={{
                                color: "#1e3a8a",
                                fontWeight: "600",
                                fontSize:
                                  window.innerWidth < 640 ? "12px" : "14px",
                              }}
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                border: "1px solid #1e3a8a",
                                borderRadius: "8px",
                                backdropFilter: "blur(10px)",
                                fontSize:
                                  window.innerWidth < 640 ? "12px" : "14px",
                              }}
                            />
                          );

                          switch (chartType) {
                            case "line":
                              return (
                                <LineChart {...commonProps}>
                                  {commonXAxis}
                                  {commonYAxis}
                                  {commonTooltip}
                                  <Line
                                    type="monotone"
                                    dataKey="user_count"
                                    stroke="#1e3a8a"
                                    strokeWidth={
                                      window.innerWidth < 640 ? 2 : 3
                                    }
                                    dot={{
                                      fill: "#1e3a8a",
                                      strokeWidth: 2,
                                      r: window.innerWidth < 640 ? 3 : 4,
                                    }}
                                    activeDot={{
                                      r: window.innerWidth < 640 ? 5 : 6,
                                      fill: "#1e3a8a",
                                    }}
                                  />
                                </LineChart>
                              );

                            case "area":
                              return (
                                <AreaChart {...commonProps}>
                                  {commonXAxis}
                                  {commonYAxis}
                                  {commonTooltip}
                                  <defs>
                                    <linearGradient
                                      id="areaGradient"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor="#1e3a8a"
                                        stopOpacity={0.8}
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor="#1e3a8a"
                                        stopOpacity={0.1}
                                      />
                                    </linearGradient>
                                  </defs>
                                  <Area
                                    type="monotone"
                                    dataKey="user_count"
                                    stroke="#1e3a8a"
                                    fill="url(#areaGradient)"
                                    strokeWidth={
                                      window.innerWidth < 640 ? 1.5 : 2
                                    }
                                  />
                                </AreaChart>
                              );

                            case "pie":
                              return (
                                <PieChart>
                                  <Pie
                                    data={selectedStationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ month, percent }) =>
                                      window.innerWidth < 640
                                        ? `${(percent * 100).toFixed(0)}%`
                                        : `${month} ${(percent * 100).toFixed(
                                            0
                                          )}%`
                                    }
                                    outerRadius={
                                      window.innerWidth < 640 ? 80 : 120
                                    }
                                    fill="#1e3a8a"
                                    dataKey="user_count"
                                    stroke="#ffffff"
                                    strokeWidth={2}
                                  >
                                    {selectedStationData.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={`hsl(${220 + index * 20}, 70%, ${
                                          40 + index * 5
                                        }%)`}
                                      />
                                    ))}
                                  </Pie>
                                  {commonTooltip}
                                </PieChart>
                              );

                            case "radar":
                              return (
                                <RadarChart
                                  data={selectedStationData}
                                  margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                  }}
                                >
                                  <PolarGrid stroke="#1e3a8a" />
                                  <PolarAngleAxis
                                    dataKey="month"
                                    tick={{
                                      fontSize:
                                        window.innerWidth < 640 ? 9 : 11,
                                      fill: "#1e3a8a",
                                      fontWeight: "600",
                                    }}
                                  />
                                  <PolarRadiusAxis
                                    tick={{
                                      fontSize:
                                        window.innerWidth < 640 ? 8 : 10,
                                      fill: "#1e3a8a",
                                    }}
                                  />
                                  <Radar
                                    dataKey="user_count"
                                    stroke="#1e3a8a"
                                    fill="#1e3a8a"
                                    fillOpacity={0.3}
                                    strokeWidth={
                                      window.innerWidth < 640 ? 1.5 : 2
                                    }
                                  />
                                  {commonTooltip}
                                </RadarChart>
                              );

                            default:
                              return (
                                <BarChart {...commonProps}>
                                  {commonXAxis}
                                  {commonYAxis}
                                  {commonTooltip}
                                  <Bar
                                    dataKey="user_count"
                                    fill="#1e3a8a"
                                    radius={[4, 4, 0, 0]}
                                    stroke="#ffffff"
                                    strokeWidth={1}
                                  />
                                </BarChart>
                              );
                          }
                        })()}
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedStationData.length === 0 && selectedStation && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="border-amber-200 bg-amber-50/80 backdrop-blur-sm">
              <div className="text-center space-y-2">
                <h2 className="text-base sm:text-lg font-bold text-amber-900">
                  Ma'lumotlar yo'q
                </h2>
                <p className="text-sm sm:text-base text-amber-700">
                  {selectedStation} bekati uchun {selectedYear}-yil{" "}
                  {selectedQuarter}-chorak ma'lumotlari topilmadi.
                </p>
              </div>
            </Alert>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MetroStatisticsDashboard;
