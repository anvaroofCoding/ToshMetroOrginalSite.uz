"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { BarChart3 } from "lucide-react";
import Link from "next/link";

export default function TopStationsRechart() {
  const [data, setData] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState("all");
  const [lang, setLang] = useState("uz");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://abbos.uzmetro.uz/api/statistics/last6months/${lang}`
        );
        const result = await res.json();

        const grouped = {};
        result.forEach((r) => {
          if (!grouped[r.station_name]) grouped[r.station_name] = [];
          grouped[r.station_name].push(r);
        });

        const merged = Object.keys(grouped).map((station) => {
          const items = grouped[station];
          const mapped = {};
          items.forEach((i) => (mapped[i.month] = i.user_count));
          return { station, ...mapped };
        });

        setStations(Object.keys(grouped));
        setData(merged);
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [lang]);

  const chartData =
    selectedStation === "all"
      ? data
      : data.filter((item) => item.station === selectedStation);

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-gray-600 dark:text-gray-300">
        Ma’lumotlar yuklanmoqda...
      </div>
    );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Eng ko‘p yo‘lovchi bekatlar (so‘nggi 6 oy)
        </h2>

        <div className="flex gap-3 flex-wrap">
          <select
            onChange={(e) => setSelectedStation(e.target.value)}
            value={selectedStation}
            className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Barcha bekatlar</option>
            {stations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setLang(e.target.value)}
            value={lang}
            className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>

          <Link href="/metro-statistikasi">
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700 hover:scale-105">
              <BarChart3 size={14} />
              Batafsil
            </button>
          </Link>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthLabels.map((month) => {
              const row = { month };
              chartData.forEach((s) => {
                row[s.station] = s[month] || 0;
              });
              return row;
            })}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "rgba(0,0,0,0.7)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "rgba(0,0,0,0.7)" }}
              tickFormatter={(v) => (v / 1_000_000).toFixed(1) + "M"}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }}
            />
            <Legend />
            {chartData.map((s, i) => (
              <Line
                key={s.station}
                type="monotone"
                dataKey={s.station}
                stroke={
                  ["#FF6B6B", "#4ECDC4", "#FFD166", "#6A0572", "#1A936F"][i % 5]
                }
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
