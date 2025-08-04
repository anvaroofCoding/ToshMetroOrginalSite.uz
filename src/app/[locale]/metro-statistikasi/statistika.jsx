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
import { motion } from "framer-motion";
import { Loader2, TrendingUp } from "lucide-react";
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
      const totalIncrement = totalUsers / steps;
      const averageIncrement = averageUsers / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedTotalUsers(Math.round(totalUsers * progress));
        setAnimatedAverageUsers(Math.round(averageUsers * progress));

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
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Yuklanmoqda...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-blue-900">Xatolik</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </Alert>
    );
  }

  return (
    <div className="container min-h-screen overflow-hidden">
      <div className="text-center space-y-2 my-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
          Metropolitendan foydalanadigan yo'lovchilar oqimi tog'risida 6 oylik
          ma'lumot
        </h1>
      </div>

      <Card className=" mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <TrendingUp className="h-5 w-5" />
            Bekat Tanlash
          </CardTitle>
          <CardDescription>
            Statistikasini ko'rish uchun metro bekatini tanlang
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedStation} onValueChange={setSelectedStation}>
            <SelectTrigger className="w-full max-w-md border-blue-200 focus:border-blue-900">
              <SelectValue placeholder="Bekatni tanlang..." />
            </SelectTrigger>
            <SelectContent>
              {stations.map((station) => (
                <SelectItem
                  key={station}
                  value={station}
                  className="focus:bg-blue-50"
                >
                  {station}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            Grafik Turi
          </CardTitle>
          <CardDescription>
            Ma'lumotlarni ko'rsatish uchun grafik turini tanlang
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-full max-w-md border-blue-200 focus:border-blue-900">
              <SelectValue placeholder="Grafik turini tanlang..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Ustunli Grafik</SelectItem>
              <SelectItem value="line">Chiziqli Grafik</SelectItem>
              <SelectItem value="area">Maydonli Grafik</SelectItem>
              <SelectItem value="pie">Doira Grafik</SelectItem>
              <SelectItem value="radar">Radar Grafik</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedStation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-10 lg:mb-20">
            <CardHeader>
              <CardTitle>{selectedStation} bekati statistikasi</CardTitle>
              <CardDescription>
                Oylik Yo'lovchilar soni va umumiy ko'rsatkichlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Card className="border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-xl sm:text-2xl font-bold text-blue-900">
                      {animatedTotalUsers.toLocaleString()}
                    </div>
                    <p className="text-xs sm:text-sm text-blue-600">
                      Jami Yo'lovchilar
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-xl sm:text-2xl font-bold text-blue-900">
                      {animatedAverageUsers.toLocaleString()}
                    </div>
                    <p className="text-xs sm:text-sm text-blue-600">
                      O'rtacha oylik Yo'lovchilar
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="h-[300px] sm:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {(() => {
                    const commonProps = {
                      data: selectedStationData,
                      margin: { top: 20, right: 10, left: 10, bottom: 60 },
                    };

                    const commonXAxis = (
                      <XAxis
                        dataKey="month"
                        tick={{
                          fontSize: 15,
                          fill: "#1e3a8a",
                          fontWeight: "bold",
                        }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                      />
                    );

                    const commonYAxis = (
                      <YAxis
                        tick={{
                          fontSize: 15,
                          fill: "#1e3a8a",
                          fontWeight: "bold",
                        }}
                      />
                    );

                    const commonTooltip = (
                      <Tooltip
                        formatter={(value) => [
                          value.toLocaleString(),
                          "Yo'lovchilar soni",
                        ]}
                        labelStyle={{ color: "#1e3a8a" }}
                        contentStyle={{
                          backgroundColor: "#f8fafc",
                          border: "1px solid #1e3a8a",
                        }}
                      />
                    );

                    const commonLegend = <Legend />;

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
                              stroke="#1e3a8a"
                              strokeWidth={3}
                              dot={{ fill: "#1e3a8a", strokeWidth: 2, r: 6 }}
                              name="Yo'lovchilar soni"
                            />
                          </LineChart>
                        );

                      case "area":
                        return (
                          <AreaChart {...commonProps}>
                            {commonXAxis}
                            {commonYAxis}
                            {commonTooltip}
                            {commonLegend}
                            <Area
                              type="monotone"
                              dataKey="user_count"
                              stroke="#1e3a8a"
                              fill="#1e3a8a"
                              fillOpacity={0.3}
                              strokeWidth={2}
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
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="user_count"
                            >
                              {selectedStationData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={`hsl(${220 + index * 30}, 70%, ${
                                    50 + index * 5
                                  }%)`}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [
                                value.toLocaleString(),
                                "Yo'lovchilar soni",
                              ]}
                            />
                          </PieChart>
                        );

                      case "radar":
                        return (
                          <RadarChart data={selectedStationData}>
                            <PolarGrid />
                            <PolarAngleAxis
                              dataKey="month"
                              tick={{ fontSize: 12, fill: "#1e3a8a" }}
                            />
                            <PolarRadiusAxis
                              tick={{ fontSize: 10, fill: "#1e3a8a" }}
                            />
                            <Radar
                              name="Yo'lovchilar soni"
                              dataKey="user_count"
                              stroke="#1e3a8a"
                              fill="#1e3a8a"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                            <Tooltip
                              formatter={(value) => [
                                value.toLocaleString(),
                                "Yo'lovchilar soni",
                              ]}
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
                            <Bar
                              dataKey="user_count"
                              fill="#1e3a8a"
                              name="Yo'lovchilar soni"
                              radius={[4, 4, 0, 0]}
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
      )}

      {selectedStationData.length === 0 && selectedStation && (
        <Alert>
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-900">
              Ma'lumotlar yo'q
            </h2>
            <p className="text-muted-foreground">
              {selectedStation} bekati uchun statistika ma'lumotlari topilmadi.
            </p>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default MetroStatistics;
