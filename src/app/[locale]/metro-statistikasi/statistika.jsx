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
import { Loader2, TrendingUp, Users, BarChart3, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
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

const MetroStatistics = () => {
  const [apiStats, setApiStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStation, setSelectedStation] = useState("");
  const [stations, setStations] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [animatedTotalUsers, setAnimatedTotalUsers] = useState(0);
  const [animatedAverageUsers, setAnimatedAverageUsers] = useState(0);

  // Function to get month order for sorting
  const getMonthOrder = (monthName) => {
    const months = {
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
    };
    return months[monthName] || 0;
  };

  useEffect(() => {
    const getStatistika = async () => {
      try {
        const response = await fetch(
          "https://metro-site.onrender.com/api/statistics/uz/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setApiStats(data);

        // Extract unique station names
        const uniqueStations = Array.from(
          new Set(data.map((stat) => stat.station_name))
        );
        setStations(uniqueStations);

        // Set first station as default selection
        if (uniqueStations.length > 0) {
          setSelectedStation(uniqueStations[0]);
        }
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    getStatistika();
  }, []);

  // Get data for selected station - sorted by month order and remove duplicates
  const selectedStationData = apiStats
    .filter((item) => item.station_name === selectedStation)
    .reduce((acc, monthData) => {
      // Check if month already exists to avoid duplicates
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

  // Calculate total users for selected station
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
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);

        // Easing function for smoother animation
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

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-4 p-8  rounded-2xl shadow-xl border border-blue-100"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Loader2 className="h-12 w-12 text-blue-600" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium text-blue-900"
          >
            Yuklanmoqda...
          </motion.span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Alert
            variant="destructive"
            className="border-red-200 bg-red-50/50 backdrop-blur-sm"
          >
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-red-900">Xatolik</h2>
              <p className="text-red-700">{error}</p>
            </div>
          </Alert>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 bg-clip-text text-transparent leading-tight">
            Toshkent metropoliteni statistikasi
          </h1>
          <p className="text-lg text-blue-600 max-w-3xl mx-auto">
            2025-yil 1-yarim yillikdagi (yanvardan-iyungacha) yo'lovchi tashish
            ma'lumotlari
          </p>
        </motion.div>

        {/* Controls Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-blue-900">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  Bekat tanlash
                </CardTitle>
                <CardDescription className="text-blue-600">
                  Statistikasini ko'rish uchun metro bekatini tanlang
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedStation}
                  onValueChange={setSelectedStation}
                >
                  <SelectTrigger className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Bekatni tanlang..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {stations.map((station) => (
                      <SelectItem
                        key={station}
                        value={station}
                        className="focus:bg-blue-50 hover:bg-blue-50"
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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-blue-900">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                  </div>
                  Grafik turi
                </CardTitle>
                <CardDescription className="text-blue-600">
                  Ma'lumotlarni ko'rsatish uchun grafik turini tanlang
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Grafik turini tanlang..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="bar" className="focus:bg-blue-50">
                      Ustunli grafik
                    </SelectItem>
                    <SelectItem value="line" className="focus:bg-blue-50">
                      Chiziqli grafik
                    </SelectItem>
                    <SelectItem value="area" className="focus:bg-blue-50">
                      Maydonli grafik
                    </SelectItem>
                    <SelectItem value="pie" className="focus:bg-blue-50">
                      Doira grafik
                    </SelectItem>
                    <SelectItem value="radar" className="focus:bg-blue-50">
                      Radar grafik
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Statistics Display */}
        <AnimatePresence mode="wait">
          {selectedStation && (
            <motion.div
              key={selectedStation}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm mb-8 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <CardTitle className="text-2xl font-bold mb-2">
                    {selectedStation} bekati
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Oylik yo'lovchilar soni va umumiy ko'rsatkichlar
                  </CardDescription>
                </div>

                <CardContent className="p-6">
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <motion.div
                                className="text-3xl font-bold text-blue-900 mb-1"
                                key={animatedTotalUsers}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {animatedTotalUsers.toLocaleString()}
                              </motion.div>
                              <p className="text-sm font-medium text-blue-600">
                                Jami yo'lovchilar
                              </p>
                            </div>
                            <div className="p-3 bg-blue-200 rounded-full">
                              <Users className="h-6 w-6 text-blue-700" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Card className="border-0 bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <motion.div
                                className="text-3xl font-bold text-indigo-900 mb-1"
                                key={animatedAverageUsers}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {animatedAverageUsers.toLocaleString()}
                              </motion.div>
                              <p className="text-sm font-medium text-indigo-600">
                                O'rtacha oylik yo'lovchilar
                              </p>
                            </div>
                            <div className="p-3 bg-indigo-200 rounded-full">
                              <TrendingUp className="h-6 w-6 text-indigo-700" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Chart Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-inner border border-gray-100"
                  >
                    <div className="h-[400px] sm:h-[500px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {(() => {
                          const commonProps = {
                            data: selectedStationData,
                            margin: {
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 80,
                            },
                          };

                          const commonXAxis = (
                            <XAxis
                              dataKey="month"
                              tick={{
                                fontSize: 12,
                                fill: "#1e40af",
                                fontWeight: "600",
                              }}
                              angle={-45}
                              textAnchor="end"
                              height={80}
                              interval={0}
                              axisLine={{ stroke: "#e5e7eb", strokeWidth: 2 }}
                              tickLine={{ stroke: "#e5e7eb" }}
                            />
                          );

                          const commonYAxis = (
                            <YAxis
                              tick={{
                                fontSize: 12,
                                fill: "#1e40af",
                                fontWeight: "600",
                              }}
                              axisLine={{ stroke: "#e5e7eb", strokeWidth: 2 }}
                              tickLine={{ stroke: "#e5e7eb" }}
                            />
                          );

                          const commonTooltip = (
                            <Tooltip
                              formatter={(value) => [
                                value.toLocaleString(),
                                "Yo'lovchilar soni",
                              ]}
                              labelStyle={{
                                color: "#1e40af",
                                fontWeight: "600",
                                fontSize: "14px",
                              }}
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                border: "1px solid #e5e7eb",
                                borderRadius: "12px",
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(10px)",
                              }}
                            />
                          );

                          const commonLegend = (
                            <Legend
                              wrapperStyle={{
                                paddingTop: "20px",
                                fontSize: "14px",
                                fontWeight: "600",
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
                                  {commonLegend}
                                  <Line
                                    type="monotone"
                                    dataKey="user_count"
                                    stroke="url(#lineGradient)"
                                    strokeWidth={4}
                                    dot={{
                                      fill: "#1e40af",
                                      strokeWidth: 3,
                                      r: 6,
                                      stroke: "#ffffff",
                                    }}
                                    activeDot={{
                                      r: 8,
                                      fill: "#1e40af",
                                      stroke: "#ffffff",
                                      strokeWidth: 3,
                                    }}
                                    name="Yo'lovchilar soni"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="lineGradient"
                                      x1="0"
                                      y1="0"
                                      x2="1"
                                      y2="0"
                                    >
                                      <stop offset="0%" stopColor="#1e40af" />
                                      <stop offset="100%" stopColor="#6366f1" />
                                    </linearGradient>
                                  </defs>
                                </LineChart>
                              );

                            case "area":
                              return (
                                <AreaChart {...commonProps}>
                                  {commonXAxis}
                                  {commonYAxis}
                                  {commonTooltip}
                                  {commonLegend}
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
                                        stopColor="#1e40af"
                                        stopOpacity={0.8}
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor="#1e40af"
                                        stopOpacity={0.1}
                                      />
                                    </linearGradient>
                                  </defs>
                                  <Area
                                    type="monotone"
                                    dataKey="user_count"
                                    stroke="#1e40af"
                                    fill="url(#areaGradient)"
                                    strokeWidth={3}
                                    name="Yo'lovchilar soni"
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
                                      `${month} ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={140}
                                    fill="#8884d8"
                                    dataKey="user_count"
                                    stroke="#ffffff"
                                    strokeWidth={2}
                                  >
                                    {selectedStationData.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={`hsl(${220 + index * 25}, 70%, ${
                                          50 + index * 3
                                        }%)`}
                                      />
                                    ))}
                                  </Pie>
                                  <Tooltip
                                    formatter={(value) => [
                                      value.toLocaleString(),
                                      "Yo'lovchilar soni",
                                    ]}
                                    contentStyle={{
                                      backgroundColor:
                                        "rgba(255, 255, 255, 0.95)",
                                      border: "1px solid #e5e7eb",
                                      borderRadius: "12px",
                                      boxShadow:
                                        "0 10px 25px rgba(0, 0, 0, 0.1)",
                                    }}
                                  />
                                </PieChart>
                              );

                            case "radar":
                              return (
                                <RadarChart data={selectedStationData}>
                                  <PolarGrid stroke="#e5e7eb" />
                                  <PolarAngleAxis
                                    dataKey="month"
                                    tick={{
                                      fontSize: 12,
                                      fill: "#1e40af",
                                      fontWeight: "600",
                                    }}
                                  />
                                  <PolarRadiusAxis
                                    tick={{ fontSize: 10, fill: "#1e40af" }}
                                    stroke="#e5e7eb"
                                  />
                                  <Radar
                                    name="Yo'lovchilar soni"
                                    dataKey="user_count"
                                    stroke="#1e40af"
                                    fill="#1e40af"
                                    fillOpacity={0.2}
                                    strokeWidth={3}
                                    dot={{
                                      fill: "#1e40af",
                                      strokeWidth: 2,
                                      r: 4,
                                    }}
                                  />
                                  <Tooltip
                                    formatter={(value) => [
                                      value.toLocaleString(),
                                      "Yo'lovchilar soni",
                                    ]}
                                    contentStyle={{
                                      backgroundColor:
                                        "rgba(255, 255, 255, 0.95)",
                                      border: "1px solid #e5e7eb",
                                      borderRadius: "12px",
                                      boxShadow:
                                        "0 10px 25px rgba(0, 0, 0, 0.1)",
                                    }}
                                  />
                                </RadarChart>
                              );

                            default: // bar chart
                              return (
                                <BarChart {...commonProps}>
                                  {commonXAxis}
                                  {commonYAxis}
                                  {commonTooltip}
                                  {commonLegend}
                                  <defs>
                                    <linearGradient
                                      id="barGradient"
                                      x1="0"
                                      y1="0"
                                      x2="0"
                                      y2="1"
                                    >
                                      <stop offset="0%" stopColor="#1e40af" />
                                      <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                  </defs>
                                  <Bar
                                    dataKey="user_count"
                                    fill="url(#barGradient)"
                                    name="Yo'lovchilar soni"
                                    radius={[6, 6, 0, 0]}
                                    stroke="#ffffff"
                                    strokeWidth={1}
                                  />
                                </BarChart>
                              );
                          }
                        })()}
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Data Alert */}
        {selectedStationData.length === 0 && selectedStation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="border-amber-200 bg-amber-50/80 backdrop-blur-sm">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-amber-900">
                  Ma'lumotlar yo'q
                </h2>
                <p className="text-amber-700">
                  {selectedStation} bekati uchun statistika ma'lumotlari
                  topilmadi.
                </p>
              </div>
            </Alert>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MetroStatistics;
