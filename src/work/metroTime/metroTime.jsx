"use client"
import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react"

// Metro liniyalari
const metroLines = [
  {
    name: "Chilonzor liniyasi",
    color: "#7E0200",
    accent: "#FF4444",
    open: "05:00",
    close: "00:00",
  },
  {
    name: "O'zbekiston liniyasi",
    color: "#1e40af",
    accent: "#3B82F6",
    open: "05:00",
    close: "00:00",
  },
  {
    name: "Yunusobod liniyasi",
    color: "#166534",
    accent: "#22C55E",
    open: "05:00",
    close: "00:00",
  },
  {
    name: "Yerusti Halqa liniyasi",
    color: "#a16207",
    accent: "#F59E0B",
    open: "05:00",
    close: "00:00",
  },
]

export default function MetroSystem() {
  const trainControls = useAnimationControls()
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    const animateTrains = async () => {
      while (true) {
        // Train moving from left to right
        await trainControls.start({
          x: ["0%", "calc(100vw + 12rem)"],
          transition: {
            duration: 10,
            ease: "easeInOut",
          },
        })

        // Brief pause at station
        await new Promise((resolve) => setTimeout(resolve, 600))

        // Reset position and change line
        setCurrentLine((prev) => (prev + 1) % metroLines.length)
        trainControls.set({ x: "calc(-12rem)" })

        await new Promise((resolve) => setTimeout(resolve, 200))
      }
    }

    animateTrains()
  }, [trainControls])

  return (
    <div className="container">
      {/* Compact Tashkent Metro Animation with Blue Theme */}
      <div className="bg-white rounded-lg shadow-lg border-2 border-blue-900/20 overflow-hidden w-full">
        {/* Metro Station Platform - Compact */}
        <div className="relative h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 bg-gradient-to-b from-blue-50 to-blue-100">
          {/* Platform - Responsive */}
          <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-4 md:h-4 lg:h-5 bg-blue-900/80 border-t border-blue-900">
            <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>

          {/* Railway Tracks - Responsive */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-4 lg:bottom-5 left-0 right-0 h-2 sm:h-3 md:h-3 lg:h-4 bg-blue-900">
            {/* Rails */}
            <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-blue-950"></div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-blue-950"></div>
            {/* Railway ties - Responsive */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 w-0.5 sm:w-1 h-2 sm:h-3 md:h-3 lg:h-4 bg-blue-950 transform -translate-y-1/2"
                style={{ left: `${i * 5}%` }}
              ></div>
            ))}
          </div>

          {/* Compact Tashkent Metro Train */}
          <motion.div
            className="absolute bottom-5 sm:bottom-6 md:bottom-6 lg:bottom-7 xl:bottom-8 flex items-center"
            animate={trainControls}
            initial={{ x: "-100%" }}
          >
            <div className="flex items-center">
              {/* Front Car - Compact */}
              <div className="relative">
                <div className="w-8 h-4 sm:w-10 sm:h-5 md:w-11 md:h-5 lg:w-12 lg:h-6 xl:w-14 xl:h-7 bg-gradient-to-b from-gray-100 to-gray-200 rounded-l-xl rounded-r-md shadow-lg border border-blue-900/30">
                  {/* Front nose cone */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 sm:w-1.5 h-3 sm:h-4 md:h-4 lg:h-5 xl:h-6 bg-gradient-to-r from-blue-200 to-gray-200 rounded-l-full"></div>

                  {/* Headlight - Responsive */}
                  <div className="absolute left-0.5 sm:left-1 top-1/2 transform -translate-y-1/2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-yellow-300 rounded-full shadow-sm animate-pulse"></div>

                  {/* Windows - Responsive */}
                  <div className="absolute top-0.5 sm:top-1 md:top-1 left-2 sm:left-2.5 md:left-3 right-1 sm:right-1.5 h-1 sm:h-1.5 md:h-2 lg:h-2.5 bg-gradient-to-b from-blue-100 to-blue-200 rounded border border-blue-900/40 opacity-80"></div>
                  <div className="absolute bottom-0.5 sm:bottom-1 md:bottom-1 left-2 sm:left-2.5 md:left-3 right-1 sm:right-1.5 h-1 sm:h-1 md:h-1.5 lg:h-2 bg-gradient-to-b from-blue-100 to-blue-200 rounded border border-blue-900/40 opacity-80"></div>

                  {/* Line color accent stripe */}
                  <div
                    className="absolute top-0 left-2 sm:left-2.5 md:left-3 right-1 sm:right-1.5 h-0.5 sm:h-1 rounded-t-md"
                    style={{ backgroundColor: metroLines[currentLine].accent }}
                  ></div>

                  {/* Door */}
                  <div className="absolute top-1 sm:top-1.5 md:top-2 right-1.5 sm:right-2 md:right-2.5 w-0.5 sm:w-1 h-2 sm:h-3 md:h-3 lg:h-4 bg-blue-900/60 rounded"></div>
                </div>
              </div>

              {/* Middle Cars - Compact */}
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="relative">
                  <div className="w-6 h-4 sm:w-8 sm:h-5 md:w-9 md:h-5 lg:w-10 lg:h-6 xl:w-12 xl:h-7 bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg border-t border-b border-blue-900/30">
                    {/* Windows */}
                    <div className="absolute top-0.5 sm:top-1 md:top-1 left-0.5 sm:left-1 right-0.5 sm:right-1 h-1 sm:h-1.5 md:h-2 lg:h-2.5 bg-gradient-to-b from-blue-100 to-blue-200 rounded border border-blue-900/40 opacity-80"></div>
                    <div className="absolute bottom-0.5 sm:bottom-1 md:bottom-1 left-0.5 sm:left-1 right-0.5 sm:right-1 h-1 sm:h-1 md:h-1.5 lg:h-2 bg-gradient-to-b from-blue-100 to-blue-200 rounded border border-blue-900/40 opacity-80"></div>

                    {/* Line color accent stripe */}
                    <div
                      className="absolute top-0 left-0.5 sm:left-1 right-0.5 sm:right-1 h-0.5 sm:h-1"
                      style={{ backgroundColor: metroLines[currentLine].accent }}
                    ></div>

                    {/* Doors */}
                    <div className="absolute top-1 sm:top-1.5 md:top-2 left-1.5 sm:left-2 md:left-2.5 w-0.5 sm:w-1 h-2 sm:h-3 md:h-3 lg:h-4 bg-blue-900/60 rounded"></div>
                    <div className="absolute top-1 sm:top-1.5 md:top-2 right-1.5 sm:right-2 md:right-2.5 w-0.5 sm:w-1 h-2 sm:h-3 md:h-3 lg:h-4 bg-blue-900/60 rounded"></div>

                    {/* Ventilation */}
                    <div className="absolute top-0.5 sm:top-1 left-1 sm:left-1.5 right-1 sm:right-1.5 h-0.5 bg-blue-900/40 opacity-60"></div>
                  </div>
                </div>
              ))}

              {/* Rear Car - Compact */}
              <div className="relative">
                <div className="w-8 h-4 sm:w-10 sm:h-5 md:w-11 md:h-5 lg:w-12 lg:h-6 xl:w-14 xl:h-7 bg-gradient-to-b from-gray-100 to-gray-200 rounded-r-xl rounded-l-md shadow-lg border border-blue-900/30">
                  {/* Rear nose cone */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 sm:w-1.5 h-3 sm:h-4 md:h-4 lg:h-5 xl:h-6 bg-gradient-to-l from-blue-200 to-gray-200 rounded-r-full"></div>

                  {/* Rear light */}
                  <div className="absolute right-0.5 sm:right-1 top-1/2 transform -translate-y-1/2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-red-400 rounded-full shadow-sm"></div>

                  {/* Windows */}
                  <div className="absolute top-0.5 sm:top-1 md:top-1 left-1 sm:left-1.5 right-2 sm:right-2.5 md:right-3 h-1 sm:h-1.5 md:h-2 lg:h-2.5 bg-gradient-to-b from-blue-100 to-blue-200 rounded border border-blue-900/40 opacity-80"></div>
                  <div className="absolute bottom-0.5 sm:bottom-1 md:bottom-1 left-1 sm:left-1.5 right-2 sm:right-2.5 md:right-3 h-1 sm:h-1 md:h-1.5 lg:h-2 bg-gradient-to-b from-blue-100 to-blue-200 rounded border border-blue-900/40 opacity-80"></div>

                  {/* Line color accent stripe */}
                  <div
                    className="absolute top-0 left-1 sm:left-1.5 right-2 sm:right-2.5 md:right-3 h-0.5 sm:h-1 rounded-t-md"
                    style={{ backgroundColor: metroLines[currentLine].accent }}
                  ></div>

                  {/* Door */}
                  <div className="absolute top-1 sm:top-1.5 md:top-2 left-1.5 sm:left-2 md:left-2.5 w-0.5 sm:w-1 h-2 sm:h-3 md:h-3 lg:h-4 bg-blue-900/60 rounded"></div>
                </div>
              </div>
            </div>

            {/* Speed effect lines - Responsive */}
            <div className="absolute -left-4 sm:-left-5 md:-left-6 lg:-left-7 top-1/2 transform -translate-y-1/2 space-y-0.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-0.5 sm:h-1 bg-blue-300/70 rounded"
                  animate={{
                    width: ["0px", "12px", "20px", "0px"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                ></motion.div>
              ))}
            </div>
          </motion.div>

          {/* Current Line Info - Compact */}
          <div className="absolute top-1 sm:top-2 md:top-2 lg:top-3 left-1 sm:left-2 md:left-3 bg-white/95 backdrop-blur-sm rounded-md px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 shadow-md border border-blue-900/20">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: metroLines[currentLine].color }}
              ></div>
              <div>
                <span className="text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-blue-900 block">
                  {metroLines[currentLine].name}
                </span>
                <div className="text-xs sm:text-xs md:text-sm text-blue-700 leading-tight">
                  {metroLines[currentLine].open} - {metroLines[currentLine].close}
                </div>
              </div>
            </div>
          </div>

          {/* Platform edge warning line - Responsive */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-4 lg:bottom-5 left-0 right-0 h-0.5 sm:h-1 bg-yellow-400"></div>
        </div>
      </div>
    </div>
  )
}
