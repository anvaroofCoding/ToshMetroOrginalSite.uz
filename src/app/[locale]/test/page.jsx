// components/TopStationsChart.jsx
"use client"

import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

const monthOrder = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function TopStationsChart() {
  const [chartData, setChartData] = useState(null)
  const [error, setError] = useState(null)

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
          total: entries.reduce((sum, e) => sum + e.user_count, 0)
        }))

        const topStations = stationSums.sort((a, b) => b.total - a.total).slice(0, 5)

        const allMonths = [...new Set(results.map(r => r.month))]
        allMonths.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))

        const datasets = topStations.map(({ station }) => {
          const entries = grouped[station]
          const monthData = allMonths.map(month => {
            const entry = entries.find(e => e.month === month)
            return entry ? entry.user_count : 0
          })

          return {
            label: station,
            data: monthData,
            borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
            backgroundColor: "transparent",
            tension: 0.4
          }
        })

        setChartData({ labels: allMonths, datasets })
      } catch (err) {
        setError("Ma'lumotlarni olishda xatolik yuz berdi.")
      }
    }

    fetchData()
  }, [])

  if (error) return <div className="text-red-500">{error}</div>
  if (!chartData) return <div>Yuklanmoqda...</div>

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Top 5 Metro Bekatlar - Oylik Statistikasi</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom"
            },
            title: {
              display: true,
              text: "Eng Ko‘p Foydalanuvchiga Ega Metro Bekatlar"
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: value => value.toLocaleString()
              }
            }
          }
        }}
      />
    </div>
  )
}
