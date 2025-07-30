

// "use client";

// import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { motion } from "framer-motion";

// const StatistikaSection = () => {
//   const [apiStats, setApiStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getStatistika = async () => {
//       try {
//         const response = await fetch("https://metro-site.onrender.com/api/statistics/uz/");
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();

//         // Eng yuqori 5ta statistikani olish
//         const top5 = [...data.results]
//           .sort((a, b) => b.user_count - a.user_count)
//           .slice(0, 5);

//         setApiStats(top5);
//       } catch (err) {
//         console.error("Xatolik yuz berdi:", err);
//         setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getStatistika();
//   }, []);

//   if (loading) return <p>Yuklanmoqda...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE"];

//   return (
//     <div className="w-full p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="mb-12"
//       >
//         <h2 className="text-2xl font-bold mb-4">Eng yuqori 5ta ko‘rsatkich</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={apiStats}
//             margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//           >
//             <XAxis dataKey="station_name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="user_count" fill="#8884d8" name="Foydalanuvchilar soni" />
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>
//     </div>
//   );
// };

// export default StatistikaSection;
"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const StatistikaSection = () => {
  const [apiStats, setApiStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStatistika = async () => {
      try {
        const response = await fetch("https://metro-site.onrender.com/api/statistics/uz/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Stansiyalar bo‘yicha guruhlash
        const grouped = data.results.reduce((acc, curr) => {
          if (!acc[curr.station_name]) {
            acc[curr.station_name] = [];
          }
          acc[curr.station_name].push(curr);
          return acc;
        }, {});

        // Har bir stansiyaning umumiy foydalanuvchi sonini hisoblash
        const totalPerStation = Object.entries(grouped).map(([station, records]) => ({
          station,
          total: records.reduce((sum, r) => sum + r.user_count, 0),
          records,
        }));

        // Eng yuqori 5ta stansiyani tanlash
        const top5Stations = totalPerStation
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);

        // Oylar bo‘yicha formatlash
        const allMonths = [
          "Yanvar",
          "Fevral",
          "Mart",
          "Aprel",
          "May",
          "Iyun",
          "Iyul",
          "Avgust",
          "Sentabr",
          "Oktabr",
          "Noyabr",
          "Dekabr",
        ];

        const chartData = allMonths.map((month) => {
          const row = { name: month };
          top5Stations.forEach(({ station, records }) => {
            const found = records.find((r) => r.month === month);
            row[station] = found ? found.user_count : 0;
          });
          return row;
        });

        setApiStats(chartData);
      } catch (err) {
        console.error("Xatolik yuz berdi:", err);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    getStatistika();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE"];

  return (
    <div className="w-full p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-4">Eng yuqori 5ta bekatning oylar bo‘yicha statistikasi</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={apiStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(apiStats[0] || {})
              .filter((key) => key !== "name")
              .map((station, index) => (
                <Bar
                  key={station}
                  dataKey={station}
                  fill={colors[index % colors.length]}
                  name={station}
                />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default StatistikaSection;
