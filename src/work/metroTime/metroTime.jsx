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

// Uzbek flag component
const UzbekFlag = ({ size = "small" }) => {
  const flagSize = size === "small" ? "w-3 h-2 sm:w-4 sm:h-2.5" : "w-4 h-3 sm:w-5 sm:h-3.5"

  return (
    <motion.div
      className={`${flagSize} relative rounded-sm overflow-hidden shadow-sm border border-white/30`}
      animate={{
        rotateY: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {/* Blue stripe */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-blue-500"></div>
      {/* White stripe with crescent and stars */}
      <div className="absolute top-1/3 left-0 right-0 h-1/3 bg-white relative">
        <div className="absolute left-0.5 top-1/2 transform -translate-y-1/2 w-1 h-1 rounded-full bg-blue-500 opacity-80"></div>
        <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2 w-0.5 h-0.5 rounded-full bg-blue-500 opacity-60"></div>
      </div>
      {/* Green stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-green-500"></div>
    </motion.div>
  )
}

export default function EnhancedMetroSystem() {
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
      {/* Enhanced Tashkent Metro Animation */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-xl border-2 border-blue-900/30 overflow-hidden w-full">
        {/* Metro Station Platform */}
        <div className="relative h-16 sm:h-18 md:h-20 lg:h-24 xl:h-28 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
          {/* Platform */}
          <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-5 md:h-6 lg:h-7 bg-gradient-to-b from-blue-800 to-blue-900 border-t-2 border-blue-700">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
          </div>

          {/* Railway Tracks */}
          <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-7 left-0 right-0 h-3 sm:h-4 md:h-5 lg:h-6 bg-blue-900">
            {/* Rails */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-950"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-950"></div>
            {/* Railway ties */}
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 w-1 h-3 sm:h-4 md:h-5 lg:h-6 bg-blue-950 transform -translate-y-1/2"
                style={{ left: `${i * 4}%` }}
              ></div>
            ))}
          </div>

          {/* Enhanced Tashkent Metro Train with Uzbek Flags */}
          <motion.div
            className="absolute bottom-7 sm:bottom-8 md:bottom-9 lg:bottom-11 xl:bottom-13 flex items-center"
            animate={trainControls}
            initial={{ x: "-100%" }}
          >
            <div className="flex items-center">
              {/* Front Car with Flag */}
              <div className="relative">
                <div className="w-10 h-5 sm:w-12 sm:h-6 md:w-14 md:h-7 lg:w-16 lg:h-8 xl:w-18 xl:h-9 bg-gradient-to-b from-gray-100 to-gray-300 rounded-l-xl rounded-r-md shadow-lg border border-blue-900/40">
                  {/* Front nose cone */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 bg-gradient-to-r from-blue-300 to-gray-200 rounded-l-full"></div>

                  {/* Enhanced headlight */}
                  <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-md">
                    <div className="w-1 h-1 bg-blue-200 rounded-full animate-pulse"></div>
                  </div>

                  {/* Windows */}
                  <div className="absolute top-1 left-3 right-1.5 h-2 sm:h-2.5 md:h-3 lg:h-3.5 bg-gradient-to-b from-blue-50 to-blue-150 rounded border border-blue-900/50 opacity-90"></div>
                  <div className="absolute bottom-1 left-3 right-1.5 h-1.5 sm:h-2 md:h-2.5 lg:h-3 bg-gradient-to-b from-blue-50 to-blue-150 rounded border border-blue-900/50 opacity-90"></div>

                  {/* Line color accent stripe */}
                  <div
                    className="absolute top-0 left-3 right-1.5 h-1 rounded-t-md"
                    style={{ backgroundColor: metroLines[currentLine].accent }}
                  ></div>

                  {/* Door */}
                  <div className="absolute top-2 right-2 w-1 h-3 sm:h-4 md:h-5 lg:h-6 bg-blue-900/70 rounded"></div>

                  {/* Uzbek Flag on front car */}
                  <div className="absolute top-0.5 right-0.5">
                    <UzbekFlag size="small" />
                  </div>
                </div>
              </div>

              {/* Middle Cars with Flags */}
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="relative">
                  <div className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 lg:w-14 lg:h-8 xl:w-16 xl:h-9 bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg border-t border-b border-blue-900/40">
                    {/* Windows */}
                    <div className="absolute top-1 left-1 right-1 h-2 sm:h-2.5 md:h-3 lg:h-3.5 bg-gradient-to-b from-blue-50 to-blue-150 rounded border border-blue-900/50 opacity-90"></div>
                    <div className="absolute bottom-1 left-1 right-1 h-1.5 sm:h-2 md:h-2.5 lg:h-3 bg-gradient-to-b from-blue-50 to-blue-150 rounded border border-blue-900/50 opacity-90"></div>

                    {/* Line color accent stripe */}
                    <div
                      className="absolute top-0 left-1 right-1 h-1"
                      style={{ backgroundColor: metroLines[currentLine].accent }}
                    ></div>

                    {/* Doors */}
                    <div className="absolute top-2 left-2 w-1 h-3 sm:h-4 md:h-5 lg:h-6 bg-blue-900/70 rounded"></div>
                    <div className="absolute top-2 right-2 w-1 h-3 sm:h-4 md:h-5 lg:h-6 bg-blue-900/70 rounded"></div>

                    {/* Uzbek Flag on middle cars */}
                    <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2">
                      <UzbekFlag size="small" />
                    </div>

                    {/* Ventilation */}
                    <div className="absolute top-1 left-1.5 right-1.5 h-0.5 bg-blue-900/50 opacity-70"></div>
                  </div>
                </div>
              ))}

              {/* Rear Car with Flag */}
              <div className="relative">
                <div className="w-10 h-5 sm:w-12 sm:h-6 md:w-14 md:h-7 lg:w-16 lg:h-8 xl:w-18 xl:h-9 bg-gradient-to-b from-gray-100 to-gray-300 rounded-r-xl rounded-l-md shadow-lg border border-blue-900/40">
                  {/* Rear nose cone */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 bg-gradient-to-l from-blue-300 to-gray-200 rounded-r-full"></div>

                  {/* Rear light */}
                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full shadow-md animate-pulse"></div>

                  {/* Windows */}
                  <div className="absolute top-1 left-1.5 right-3 h-2 sm:h-2.5 md:h-3 lg:h-3.5 bg-gradient-to-b from-blue-50 to-blue-150 rounded border border-blue-900/50 opacity-90"></div>
                  <div className="absolute bottom-1 left-1.5 right-3 h-1.5 sm:h-2 md:h-2.5 lg:h-3 bg-gradient-to-b from-blue-50 to-blue-150 rounded border border-blue-900/50 opacity-90"></div>

                  {/* Line color accent stripe */}
                  <div
                    className="absolute top-0 left-1.5 right-3 h-1 rounded-t-md"
                    style={{ backgroundColor: metroLines[currentLine].accent }}
                  ></div>

                  {/* Door */}
                  <div className="absolute top-2 left-2 w-1 h-3 sm:h-4 md:h-5 lg:h-6 bg-blue-900/70 rounded"></div>

                  {/* Uzbek Flag on rear car */}
                  <div className="absolute top-0.5 left-0.5">
                    <UzbekFlag size="small" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced speed effect lines */}
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 space-y-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 bg-blue-400/80 rounded"
                  animate={{
                    width: ["0px", "16px", "24px", "0px"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                ></motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Current Line Info with Beautiful Working Hours */}
          <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-white/95 backdrop-blur-md rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-lg border border-blue-900/30">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full border-2 border-white shadow-md animate-pulse"
                style={{ backgroundColor: metroLines[currentLine].color }}
              ></div>
              <div>
                <span className="text-sm sm:text-base md:text-lg font-bold text-blue-900 block leading-tight">
                  {metroLines[currentLine].name}
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-medium shadow-sm">
                    <span className="flex items-center space-x-1">
                      <span>🕐</span>
                      <span>{metroLines[currentLine].open}</span>
                    </span>
                  </div>
                  <span className="text-blue-700 font-medium text-xs sm:text-sm">-</span>
                  <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-medium shadow-sm">
                    <span className="flex items-center space-x-1">
                      <span>🕛</span>
                      <span>{metroLines[currentLine].close}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform edge safety line */}
          <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-7 left-0 right-0 h-1 bg-blue-600 shadow-sm"></div>
        </div>

        {/* Metro Lines Overview */}
        {/* <div className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 border-t border-blue-900/20">
          <h3 className="text-blue-900 font-bold text-sm sm:text-base mb-2 sm:mb-3">Toshkent Metro Liniyalari</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {metroLines.map((line, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-2 rounded-lg border transition-all duration-300 ${
                  index === currentLine
                    ? "bg-blue-50 border-blue-300 shadow-md"
                    : "bg-gray-50 border-gray-200 hover:bg-blue-25"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: line.color }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-medium text-blue-900 truncate">{line.name}</div>
                  <div className="text-xs text-blue-700 flex items-center space-x-1">
                    <span>⏰</span>
                    <span>
                      {line.open} - {line.close}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}
