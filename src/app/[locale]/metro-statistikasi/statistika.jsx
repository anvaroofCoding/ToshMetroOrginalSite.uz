"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, TrendingUp } from "lucide-react"
// import { Alert, AlertDescription } from "@/components/ui/alert"

// bu yerda ishlash kerak

const MetroStatistics = () => {
  const [apiStats, setApiStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedStation, setSelectedStation] = useState("")
  const [stations, setStations] = useState([])

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
    }
    return months[monthName] || 0
  }

  useEffect(() => {
    const getStatistika = async () => {
      try {
        const response = await fetch("https://metro-site.onrender.com/api/statistics/uz/")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setApiStats(data)

        // Extract unique station names
        const uniqueStations = Array.from(new Set(data.map((stat) => stat.station_name)))
        setStations(uniqueStations)

        // Set first station as default selection
        if (uniqueStations.length > 0) {
          setSelectedStation(uniqueStations[0])
        }
      } catch (err) {
        console.error("Xatolik yuz berdi:", err)
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.")
      } finally {
        setLoading(false)
      }
    }

    getStatistika()
  }, [])

  // Get data for selected station - sorted by month order and remove duplicates
  const selectedStationData = apiStats
    .filter((item) => item.station_name === selectedStation)
    .reduce((acc, monthData) => {
      // Check if month already exists to avoid duplicates
      const existingMonth = acc.find((item) => item.month === monthData.month)
      if (!existingMonth) {
        acc.push({
          month: monthData.month,
          user_count: monthData.user_count,
        })
      }
      return acc
    }, [])
    .sort((a, b) => getMonthOrder(a.month) - getMonthOrder(b.month))

  // Calculate total users for selected station
  const totalUsers = selectedStationData.reduce((sum, item) => sum + item.user_count, 0)
  const averageUsers = selectedStationData.length > 0 ? Math.round(totalUsers / selectedStationData.length) : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Yuklanmoqda...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-white min-h-screen">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Metro Bekatlari Statistikasi</h1>
        <p className="text-muted-foreground">Bekatni tanlang va uning oylik foydalanuvchilar statistikasini ko'ring</p>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <TrendingUp className="h-5 w-5" />
            Bekat Tanlash
          </CardTitle>
          <CardDescription>Statistikasini ko'rish uchun metro bekatini tanlang</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedStation} onValueChange={setSelectedStation}>
            <SelectTrigger className="w-full max-w-md border-blue-200 focus:border-blue-900">
              <SelectValue placeholder="Bekatni tanlang..." />
            </SelectTrigger>
            <SelectContent>
              {stations.map((station) => (
                <SelectItem key={station} value={station} className="focus:bg-blue-50">
                  {station}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedStation && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>{selectedStation} bekati statistikasi</CardTitle>
              <CardDescription>Oylik foydalanuvchilar soni va umumiy ko'rsatkichlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Card className="border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-xl sm:text-2xl font-bold text-blue-900">{totalUsers.toLocaleString()}</div>
                    <p className="text-xs sm:text-sm text-blue-600">Jami foydalanuvchilar</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-xl sm:text-2xl font-bold text-blue-900">{averageUsers.toLocaleString()}</div>
                    <p className="text-xs sm:text-sm text-blue-600">O'rtacha oylik foydalanuvchilar</p>
                  </CardContent>
                </Card>
              </div>

              <div className="h-[300px] sm:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedStationData} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10, fill: "#1e3a8a" }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis tick={{ fontSize: 10, fill: "#1e3a8a" }} />
                    <Tooltip
                      formatter={(value) => [value.toLocaleString(), "Foydalanuvchilar soni"]}
                      labelStyle={{ color: "#1e3a8a" }}
                      contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #1e3a8a" }}
                    />
                    <Legend />
                    <Bar dataKey="user_count" fill="#1e3a8a" name="Foydalanuvchilar soni" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {selectedStationData.length === 0 && selectedStation && (
        <Alert>
          <AlertDescription>{selectedStation} bekati uchun statistika ma'lumotlari topilmadi.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default MetroStatistics
