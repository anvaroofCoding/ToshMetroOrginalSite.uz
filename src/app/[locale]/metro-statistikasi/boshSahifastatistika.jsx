"use client"

import { useEffect, useState, useRef } from "react"
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import { Line } from "react-chartjs-2"
import Link from "next/link"

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

const monthOrder = [
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
]

// Enhanced vibrant color palette
const colors = [
  "#FF6B6B", // Coral Red
  "#4ECDC4", // Turquoise
  "#FFD166", // Yellow
  "#6A0572", // Purple
  "#1A936F", // Green
]

export default function TopStationsChart() {
  const [chartData, setChartData] = useState(null)
  const [error, setError] = useState(null)
  const [selectedPoint, setSelectedPoint] = useState(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://metro-site.onrender.com/api/statistics/en")
        const data = await res.json()
        const results = data

        const grouped = {}
        for (const item of results) {
          if (!grouped[item.station_name]) grouped[item.station_name] = []
          grouped[item.station_name].push(item)
        }

        const stationSums = Object.entries(grouped).map(([station, entries]) => ({
          station,
          total: entries.reduce((sum, e) => sum + e.user_count, 0),
        }))

        const topStations = stationSums.sort((a, b) => b.total - a.total).slice(0, 5)

        const allMonths = [...new Set(results.map((r) => r.month))]
        allMonths.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))

        const datasets = topStations.map(({ station }, index) => {
          const entries = grouped[station]
          const monthData = allMonths.map((month) => {
            const entry = entries.find((e) => e.month === month)
            return entry ? entry.user_count : 0
          })

          return {
            label: station,
            data: monthData,
            borderColor: colors[index % colors.length],
            backgroundColor: "transparent",
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: colors[index % colors.length],
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          }
        })

        setChartData({ labels: allMonths, datasets })
      } catch (err) {
        setError("Ma'lumotlarni olishda xatolik yuz berdi.")
      }
    }

    fetchData()
  }, [])

  const handleClick = (event) => {
    if (!chartRef.current) return

    const chart = chartRef.current
    const points = chart.getElementsAtEventForMode(event, "nearest", { intersect: true }, true)

    if (points.length) {
      const firstPoint = points[0]
      const { datasetIndex, index } = firstPoint
      const station = chartData.datasets[datasetIndex].label
      const month = chartData.labels[index]
      const value = chartData.datasets[datasetIndex].data[index]

      setSelectedPoint({
        station,
        month,
        value,
      })
    } else {
      setSelectedPoint(null)
    }
  }

  if (error) return <div className="text-red-500 text-sm md:text-base text-center mt-4 px-4">{error}</div>
  if (!chartData) return <div className="text-center text-sm md:text-base mt-4 px-4">Yuklanmoqda...</div>

  return (
    <div className="w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[450px] p-3 sm:p-4 lg:p-6 bg-white rounded-lg relative">
      {/* Header - Responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-b pb-3 sm:pb-4 mb-4">
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 leading-tight">
          5ta eng ko'p yo'lovchilarga ega bekatlar
        </h2>
        <Link href="/metro-statistikasi" className="self-start sm:self-auto">
          <button className="px-3 py-1.5 sm:px-4 sm:py-1 text-sm sm:text-base rounded-2xl bg-blue-900 text-white transition-all duration-300 hover:bg-blue-800 hover:scale-105 whitespace-nowrap">
            Batafsil
          </button>
        </Link>
      </div>

      {/* Chart Container - Responsive height */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[350px]">
        <Line
          ref={chartRef}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 800,
              easing: "easeOutQuart",
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  font: {
                    size: window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 11 : 12,
                  },
                  usePointStyle: true,
                  padding: window.innerWidth < 640 ? 12 : 16,
                  boxWidth: window.innerWidth < 640 ? 8 : 10,
                  maxWidth: window.innerWidth < 640 ? 120 : 200,
                },
                maxHeight: window.innerWidth < 640 ? 80 : 100,
              },
              tooltip: {
                enabled: !selectedPoint,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                padding: window.innerWidth < 640 ? 8 : 12,
                cornerRadius: 6,
                displayColors: true,
                titleFont: {
                  size: window.innerWidth < 640 ? 11 : 13,
                },
                bodyFont: {
                  size: window.innerWidth < 640 ? 10 : 12,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: false,
                min: 1000000,
                ticks: {
                  callback: (value) => {
                    if (window.innerWidth < 640) {
                      return (value / 1000000).toFixed(1) + "M"
                    }
                    return value.toLocaleString()
                  },
                  font: {
                    size: window.innerWidth < 640 ? 9 : window.innerWidth < 1024 ? 10 : 11,
                  },
                  maxTicksLimit: window.innerWidth < 640 ? 5 : 7,
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
              },
              x: {
                ticks: {
                  font: {
                    size: window.innerWidth < 640 ? 9 : window.innerWidth < 1024 ? 10 : 11,
                  },
                  maxRotation: window.innerWidth < 640 ? 45 : 0,
                  minRotation: window.innerWidth < 640 ? 45 : 0,
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
              },
            },
            onClick: handleClick,
            elements: {
              point: {
                radius: window.innerWidth < 640 ? 4 : 6,
                hoverRadius: window.innerWidth < 640 ? 6 : 8,
              },
              line: {
                borderWidth: window.innerWidth < 640 ? 2 : 3,
              },
            },
          }}
        />
      </div>

      {/* Custom tooltip for selected point - Responsive positioning */}
      {selectedPoint && (
        <div
          className="absolute bg-black bg-opacity-90 text-white p-2 sm:p-3 rounded-lg shadow-lg transform -translate-x-1/2 animate-fadeIn z-10 max-w-[200px] sm:max-w-none"
          style={{
            top: window.innerWidth < 640 ? "30%" : "35%",
            left: "50%",
          }}
        >
          <div className="text-center">
            <div className="font-bold text-sm sm:text-base">
              {window.innerWidth < 640
                ? `${(selectedPoint.value / 1000000).toFixed(1)}M`
                : selectedPoint.value.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm opacity-80 truncate">{selectedPoint.station}</div>
            <div className="text-xs opacity-70 mt-1">{selectedPoint.month}</div>
          </div>
        </div>
      )}
    </div>
  )
}
