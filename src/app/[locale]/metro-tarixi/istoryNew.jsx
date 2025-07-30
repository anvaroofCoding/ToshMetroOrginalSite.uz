"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Train, MapPin, Calendar, Ruler } from "lucide-react"



const lineStats = [
  {
    name: "Chilonzor yo'nalishi",
    length: "16.3 km",
    stations: 12,
    color: "bg-blue-700",
  },
  {
    name: "O'zbekiston yo'nalishi",
    length: "14.2 km",
    stations: 11,
    color: "bg-green-700",
  },
  {
    name: "Yunusobod yo'nalishi",
    length: "9.5 km",
    stations: 8,
    color: "bg-red-700",
  },
  {
    name: "Sergeli yo'nalishi",
    length: "7.0 km",
    stations: 5,
    color: "bg-orange-700",
  },
  {
    name: "Halqa yer usti yo'nalishi",
    length: "11.5+ km",
    stations: 12,
    color: "bg-purple-700",
  },
]

export default function Component() {
    const timelineEvents = [
  {
    id: "1",
    date: "1972 iyul",
    title: "Metro qurilishi boshlandi",
    description: "Markaziy Osiyoda yagona metro qurilishi boshlangan",
    line: "Boshlang'ich",
    color: "bg-blue-900",
  },
  {
    id: "2",
    date: "1977 6-noyabr",
    title: "Chilonzor yo'nalishi - 1-bosqich",
    description: "Olmazor bekatidan Amir Temur xiyoboni bekatigacha",
    line: "Chilonzor",
    phase: "1-bosqich",
    color: "bg-blue-700",
  },
  {
    id: "3",
    date: "1980 avgust",
    title: "Chilonzor yo'nalishi - 2-bosqich",
    description: "Amir Temur xiyoboni bekatidan Buyuk ipak yo'li bekatigacha",
    line: "Chilonzor",
    length: "4.2 km",
    stations: 3,
    phase: "2-bosqich",
    color: "bg-blue-700",
  },
  {
    id: "4",
    date: "1984 26-noyabr",
    title: "O'zbekiston yo'nalishi - 1-bosqich",
    description: "Alisher Navoiy bekatidan Toshkent bekatigacha",
    line: "O'zbekiston",
    length: "5.6 km",
    stations: 5,
    phase: "1-bosqich",
    color: "bg-green-700",
  },
  {
    id: "5",
    date: "1987",
    title: "O'zbekiston yo'nalishi - 2-bosqich",
    description: "Toshkent bekatidan Do'stlik bekatigacha",
    line: "O'zbekiston",
    length: "3.2 km",
    phase: "2-bosqich",
    color: "bg-green-700",
  },
  {
    id: "6",
    date: "1989",
    title: "O'zbekiston yo'nalishi - 3-bosqich",
    description: "Alisher Navoiy bekatidan Chorsu bekatigacha",
    line: "O'zbekiston",
    length: "2.2 km",
    stations: 2,
    phase: "3-bosqich",
    color: "bg-green-700",
  },
  {
    id: "7",
    date: "1991 aprel",
    title: "O'zbekiston yo'nalishi - 4-bosqich",
    description: "Chorsu bekatidan Beruniy bekatigacha",
    line: "O'zbekiston",
    length: "3.2 km",
    stations: 2,
    phase: "4-bosqich",
    color: "bg-green-700",
  },
  {
    id: "8",
    date: "2001 26-oktyabr",
    title: "Yunusobod yo'nalishi - 1-bosqich",
    description: "Ming o'rik bekatidan Shahriston bekatigacha",
    line: "Yunusobod",
    length: "7.15 km",
    stations: 6,
    phase: "1-bosqich",
    color: "bg-red-700",
  },
  {
    id: "9",
    date: "2020 avgust",
    title: "Yunusobod yo'nalishi - 2-bosqich",
    description: "Turkiston va Yunusobod bekatlari",
    line: "Yunusobod",
    length: "2.9 km",
    stations: 2,
    phase: "2-bosqich",
    color: "bg-red-700",
  },
  {
    id: "10",
    date: "2020 avgust",
    title: "Halqa yer usti yo'nalishi - 1-bosqich",
    description: "Yer usti halqa metro liniyasi",
    line: "Halqa",
    length: "11.5 km",
    stations: 7,
    phase: "1-bosqich",
    color: "bg-purple-700",
  },
  {
    id: "11",
    date: "2020 dekabr",
    title: "Sergeli yo'nalishi",
    description: "Yangi Sergeli metro yo'li",
    line: "Sergeli",
    length: "7.0 km",
    stations: 5,
    color: "bg-orange-700",
  },
  {
    id: "12",
    date: "2023 aprel",
    title: "Halqa yer usti yo'nalishi - 2-bosqich",
    description: "Qo'yliqdan Quruvchilar dahasiga qadar",
    line: "Halqa",
    stations: 5,
    phase: "2-bosqich",
    color: "bg-purple-700",
  },
]

  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className=" py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Train className="h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Toshkent Metropoliteni</h1>
            </div>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Markaziy Osiyoda yagona metro tizimi - 1972 yildan buyon shahar transportining asosi
            </p>
          </div>
        </div>
      </div>

      {/* Current Stats */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-blue-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-900 mb-2">70+ km</div>
                <div className="text-gray-600">Umumiy uzunlik</div>
              </CardContent>
            </Card>
            <Card className="text-center border-blue-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-900 mb-2">50</div>
                <div className="text-gray-600">Faol bekatlar</div>
              </CardContent>
            </Card>
            <Card className="text-center border-blue-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-900 mb-2">5</div>
                <div className="text-gray-600">Metro yo'nalishlari</div>
              </CardContent>
            </Card>
          </div>

          {/* Line Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lineStats.map((line, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-4 h-4 rounded-full ${line.color}`}></div>
                    <h3 className="font-semibold text-blue-900">{line.name}</h3>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Ruler className="h-4 w-4" />
                      {line.length}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {line.stations} bekat
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Qurilish Tarixi</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-0.5"></div>

            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:flex-row`}
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full ${event.color} transform md:-translate-x-2 z-10 cursor-pointer hover:scale-110 transition-transform duration-200`}
                  ></div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <Card
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedEvent === event.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <CardTitle className="text-blue-900 text-lg">{event.title}</CardTitle>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className={`${event.color} text-white border-0`}>
                            {event.line}
                          </Badge>
                          {event.phase && <Badge variant="secondary">{event.phase}</Badge>}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-700 mb-3">{event.description}</CardDescription>
                        {(event.length || event.stations) && (
                          <div className="flex gap-4 text-sm text-gray-600">
                            {event.length && (
                              <div className="flex items-center gap-1">
                                <Ruler className="h-4 w-4" />
                                {event.length}
                              </div>
                            )}
                            {event.stations && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.stations} bekat
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    
    </div>
  )
}
