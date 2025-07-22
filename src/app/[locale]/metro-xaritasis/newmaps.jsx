"use client"

import { useCallback, useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Clock,
  MapPin,
  Users,
  Train,
  Calendar,
  Ruler,
  User,
  Star,
  ArrowLeft,
  ArrowUpDown,
  Navigation,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TashkentMetroMap() {
  const router = useRouter()
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedStation, setSelectedStation] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [viewerImageIndex, setViewerImageIndex] = useState(0)
  const svgRef = useRef(null)
  const containerRef = useRef(null)

  // Route planning states
  const [showRoutePanel, setShowRoutePanel] = useState(true)
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")
  const [currentRoute, setCurrentRoute] = useState([])
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false)
  const [routeInfo, setRouteInfo] = useState(null)

  // Increased distances between stations
  const stations = {
    // Red Line (Chilonzor Line) - Increased spacing
    Olmazor: { x: 50, y: 1000, line: "red", nameUz: "Olmazor" },
    Choshtepa: { x: 100, y: 1150, line: "red", nameUz: "Choshtepa" },
    "O'zgarish": { x: 150, y: 1250, line: "red", nameUz: "O'zgarish" },
    Sergeli: { x: 250, y: 1350, line: "red", nameUz: "Sergeli" },
    Yangihayot: { x: 350, y: 1450, line: "red", nameUz: "Yangihayot" },
    Chinor: { x: 420, y: 1500, line: "red", nameUz: "Chinor" },
    Chilonzor: { x: 80, y: 900, line: "red", nameUz: "Chilonzor" },
    "Mirzo Ulugbek": { x: 110, y: 820, line: "red", nameUz: "Mirzo Ulug'bek" },
    Novza: { x: 150, y: 720, line: "red", nameUz: "Novza" },
    "Milliy bog'": { x: 200, y: 630, line: "red", nameUz: "Milliy bog'" },
    "Xalqlar do'stligi": { x: 260, y: 550, line: "red", nameUz: "Xalqlar do'stligi" },
    Paxtakor: { x: 350, y: 450, line: "red", nameUz: "Paxtakor" },
    "Mustaqillik maydoni": { x: 450, y: 450, line: "red", nameUz: "Mustaqillik maydoni" },
    "Amir Temur xiyoboni": { x: 600, y: 450, line: "red", nameUz: "Amir Temur xiyoboni" },
    "Hamid Olimjon": { x: 700, y: 430, line: "red", nameUz: "Hamid Olimjon" },
    Pushkin: { x: 800, y: 400, line: "red", nameUz: "Pushkin" },
    "Buyuk ipak yo'li": { x: 900, y: 350, line: "red", nameUz: "Buyuk ipak yo'li" },

    // Blue Line (O'zbekiston Line) - Increased spacing
    Beruniy: { x: 0, y: 80, line: "blue", nameUz: "Beruniy" },
    Tinchlik: { x: 100, y: 200, line: "blue", nameUz: "Tinchlik" },
    Chorsu: { x: 170, y: 280, line: "blue", nameUz: "Chorsu" },
    "G'afur G'ulom": { x: 250, y: 350, line: "blue", nameUz: "G'afur G'ulom" },
    "Alisher Navoiy": { x: 300, y: 420, line: "blue", nameUz: "Alisher Navoiy" },
    "O'zbekiston": { x: 400, y: 550, line: "blue", nameUz: "O'zbekiston" },
    Kosmonavtlar: { x: 500, y: 600, line: "blue", nameUz: "Kosmonavtlar" },
    Oybek: { x: 600, y: 650, line: "blue", nameUz: "Oybek" },
    Toshkent: { x: 750, y: 700, line: "blue", nameUz: "Toshkent" },
    Mashinasozlar: { x: 880, y: 700, line: "blue", nameUz: "Mashinasozlar" },
    "Do'stlik": { x: 980, y: 680, line: "blue", nameUz: "Do'stlik" },

    // Green Line (Yunusobod Line) - Increased spacing
    Turkiston: { x: 500, y: 60, line: "green", nameUz: "Turkiston" },
    Yunusobod: { x: 500, y: 120, line: "green", nameUz: "Yunusobod" },
    Shahriston: { x: 500, y: 180, line: "green", nameUz: "Shahriston" },
    Bodomzor: { x: 500, y: 240, line: "green", nameUz: "Bodomzor" },
    Minor: { x: 500, y: 300, line: "green", nameUz: "Minor" },
    "Abdulla Qodiriy": { x: 550, y: 360, line: "green", nameUz: "Abdulla Qodiriy" },
    "Yunus Rajabiy": { x: 590, y: 400, line: "green", nameUz: "Yunus Rajabiy" },
    "Mingo'rik": { x: 600, y: 600, line: "green", nameUz: "Mingo'rik" },

    // Yellow Line (Sirg'ali Line) - Increased spacing
    Texnopark: { x: 1050, y: 650, line: "yellow", nameUz: "Texnopark" },
    Yashnobod: { x: 1120, y: 720, line: "yellow", nameUz: "Yashnobod" },
    Tuzel: { x: 1180, y: 800, line: "yellow", nameUz: "Tuzel" },
    Olmos: { x: 1180, y: 900, line: "yellow", nameUz: "Olmos" },
    Rohat: { x: 1190, y: 1000, line: "yellow", nameUz: "Rohat" },
    Yangiobod: { x: 1190, y: 1100, line: "yellow", nameUz: "Yangiobod" },
    "Qo'yliq": { x: 1120, y: 1200, line: "yellow", nameUz: "Qo'yliq" },
    Matonat: { x: 980, y: 1150, line: "yellow", nameUz: "Matonat" },
    Qiyot: { x: 870, y: 1150, line: "yellow", nameUz: "Qiyot" },
    Tolariq: { x: 750, y: 1150, line: "yellow", nameUz: "Tolariq" },
    Xonobod: { x: 630, y: 1200, line: "yellow", nameUz: "Xonobod" },
    Quruvchilar: { x: 600, y: 1300, line: "yellow", nameUz: "Quruvchilar" },
    Turon: { x: 570, y: 1400, line: "yellow", nameUz: "Turon" },
    Qipchoq: { x: 480, y: 1500, line: "yellow", nameUz: "Qipchoq" },
  }

  // Detailed station information
  const stationDetails = {
    "Mustaqillik maydoni": {
      opened: "1977",
      depth: "22m",
      dailyPassengers: "45,000",
      architect: "Igor Rozhin",
      history:
        "Dastlab 'Lenin maydoni' deb nomlangan bu stansiya 1991-yilda O'zbekiston mustaqillikka erishgach qayta nomlandi. U tizimdagi eng muhim stansiyalardan biri bo'lib, shaharning asosiy Mustaqillik maydoniga ulanadi. Stansiya sovet davri arxitekturasi va zamonaviy ta'mirlash ishlari bilan ajralib turadi.",
      features: [
        "Yer osti savdo markazi",
        "Bir nechta chiqish joylari",
        "Yaqin atrofdagi tarixiy yodgorliklar",
        "Zamonaviy eskalatorlar",
        "Keng platformalar",
      ],
      nearbyAttractions: [
        "Mustaqillik maydoni",
        "Senat binosi",
        "O'zbekiston mehmonxonasi",
        "Amir Temur muzeyi",
        "Milliy kutubxona",
      ],
      description:
        "Sovet davri arxitekturasi va zamonaviy ta'mirlash ishlari bilan ajralib turadigan markaziy stansiya. Stansiya o'zining keng zallari va O'zbekiston madaniyati hamda mustaqilligini aks ettiruvchi badiiy bezaklari bilan mashhur. Bu yerda har kuni minglab yo'lovchi o'tadi va u shaharning eng muhim transport tugunlaridan biridir.",
      images: [
        "/placeholder.svg?height=400&width=600&text=Mustaqillik+maydoni+Platform",
        "/placeholder.svg?height=400&width=600&text=Mustaqillik+maydoni+Hall",
        "/placeholder.svg?height=400&width=600&text=Mustaqillik+maydoni+Entrance",
        "/placeholder.svg?height=400&width=600&text=Mustaqillik+maydoni+Architecture",
        "/placeholder.svg?height=400&width=600&text=Mustaqillik+maydoni+Decorations",
        "/placeholder.svg?height=400&width=600&text=Mustaqillik+maydoni+Night",
      ],
      videos: [
        {
          title: "Virtual tur - Mustaqillik maydoni",
          thumbnail: "/placeholder.svg?height=200&width=300&text=Virtual+Tour",
        },
        { title: "Tarixiy lavhalar", thumbnail: "/placeholder.svg?height=200&width=300&text=History+Documentary" },
      ],
    },
    "Alisher Navoiy": {
      opened: "1984",
      depth: "18m",
      dailyPassengers: "38,000",
      architect: "Shavkat Abdurakhimov",
      history:
        "Buyuk o'zbek shoiri Alisher Navoiy nomi bilan atalgan bu stansiya qizil va ko'k liniyalar o'rtasidagi asosiy o'tish nuqtasi bo'lib xizmat qiladi. Stansiya Navoiy asarlaridan sahnalarni tasvirlaydigan chiroyli mozaikalar bilan bezatilgan. Bu yerda o'zbek adabiyoti va madaniyatining boy tarixini aks ettiruvchi san'at asarlari joylashgan.",
      features: [
        "O'tish stansiyasi (Transfer)",
        "Madaniy ko'rgazmalar",
        "Badiiy mozaikalar",
        "Adabiy qo'lyozmalar namoyishi",
        "Zamonaviy yo'naltirish tizimlari",
      ],
      nearbyAttractions: [
        "Navoiy nomidagi opera teatri",
        "Tasviriy san'at muzeyi",
        "Amir Temur maydoni",
        "Milliy kutubxona",
        "Adabiyot muzeyi",
      ],
      description:
        "Bu o'tish stansiyasi o'zining madaniy ahamiyati va an'anaviy o'zbek naqshlari hamda zamonaviy arxitektura elementlarini o'z ichiga olgan chiroyli ichki dizayni bilan mashhur. Stansiya devorlarida Alisher Navoiyning hayoti va ijodiga bag'ishlangan mozaikalar joylashgan bo'lib, ular o'zbek san'atining eng yaxshi namunalaridan hisoblanadi.",
      images: [
        "/placeholder.svg?height=400&width=600&text=Alisher+Navoiy+Mosaics",
        "/placeholder.svg?height=400&width=600&text=Alisher+Navoiy+Platform",
        "/placeholder.svg?height=400&width=600&text=Alisher+Navoiy+Transfer+Hall",
        "/placeholder.svg?height=400&width=600&text=Alisher+Navoiy+Art+Details",
      ],
      videos: [
        { title: "Mozaikalar haqida", thumbnail: "/placeholder.svg?height=200&width=300&text=Mosaics+Documentary" },
      ],
    },
    Toshkent: {
      opened: "1980",
      depth: "20m",
      dailyPassengers: "52,000",
      architect: "Vladimir Kurbatov",
      history:
        "Toshkent metropoliteni tizimining asosiy stansiyasi bo'lib, markaziy transport markazi vazifasini bajaradi. Dastlab Sovet metro tizimining ulug'vorligini mahalliy o'zbek madaniy elementlari bilan namoyish etish uchun mo'ljallangan. Bu stansiya shaharning eng gavjum joylaridan biri bo'lib, har kuni minglab yo'lovchi bu yerdan o'tadi.",
      features: [
        "Asosiy terminal",
        "Savdo ob'ektlari",
        "Turistik ma'lumot markazi",
        "Keng kutish zonalari",
        "Zamonaviy xavfsizlik tizimlari",
      ],
      nearbyAttractions: [
        "Toshkent temir yo'l vokzali",
        "Chorsu bozori",
        "Ko'kaldosh madrasasi",
        "Hazrati Imom majmuasi",
        "Eski shahar",
      ],
      description:
        "Toshkent metropolitenining flagman stansiyasi bo'lib, Sovet monumentalizmi va an'anaviy o'zbek dizayn elementlarini uyg'unlashtirgan ta'sirchan arxitekturaga ega. Stansiya o'zining keng zallari, baland shiftlari va noyob bezaklari bilan ajralib turadi. Bu yerda zamonaviy qulayliklar va tarixiy me'morchilik uslubi mukammal tarzda birlashtirilgan.",
      images: [
        "/placeholder.svg?height=400&width=600&text=Toshkent+Main+Hall",
        "/placeholder.svg?height=400&width=600&text=Toshkent+Platform+View",
        "/placeholder.svg?height=400&width=600&text=Toshkent+Architecture+Details",
      ],
      videos: [{ title: "Stansiya tarixi", thumbnail: "/placeholder.svg?height=200&width=300&text=Station+History" }],
    },
  }

  const lineColors = {
    red: "#E53E3E",
    blue: "#3182CE",
    green: "#38A169",
    yellow: "#D69E2E",
  }

  const lineNames = {
    red: "Chilonzor liniyasi",
    blue: "O'zbekiston liniyasi",
    green: "Yunusobod liniyasi",
    yellow: "Sirg'ali liniyasi",
  }

  const connections = [
    // Red line connections
    { from: "Olmazor", to: "Choshtepa" },
    { from: "Choshtepa", to: "O'zgarish" },
    { from: "O'zgarish", to: "Sergeli" },
    { from: "Sergeli", to: "Yangihayot" },
    { from: "Yangihayot", to: "Chinor" },
    { from: "Chilonzor", to: "Olmazor" },
    { from: "Mirzo Ulugbek", to: "Chilonzor" },
    { from: "Novza", to: "Mirzo Ulugbek" },
    { from: "Milliy bog'", to: "Novza" },
    { from: "Xalqlar do'stligi", to: "Milliy bog'" },
    { from: "Paxtakor", to: "Xalqlar do'stligi" },
    { from: "Paxtakor", to: "Mustaqillik maydoni" },
    { from: "Alisher Navoiy", to: "Paxtakor" },
    { from: "Amir Temur xiyoboni", to: "Mustaqillik maydoni" },
    { from: "Amir Temur xiyoboni", to: "Yunus Rajabiy" },
    { from: "Hamid Olimjon", to: "Amir Temur xiyoboni" },
    { from: "Pushkin", to: "Hamid Olimjon" },
    { from: "Buyuk ipak yo'li", to: "Pushkin" },

    // Blue line connections
    { from: "Beruniy", to: "Tinchlik" },
    { from: "Tinchlik", to: "Chorsu" },
    { from: "Chorsu", to: "G'afur G'ulom" },
    { from: "G'afur G'ulom", to: "Alisher Navoiy" },
    { from: "Alisher Navoiy", to: "O'zbekiston" },
    { from: "O'zbekiston", to: "Kosmonavtlar" },
    { from: "Kosmonavtlar", to: "Oybek" },
    { from: "Oybek", to: "Mingo'rik" },
    { from: "Oybek", to: "Toshkent" },
    { from: "Toshkent", to: "Mashinasozlar" },
    { from: "Mashinasozlar", to: "Do'stlik" },
    { from: "Do'stlik", to: "Texnopark" },

    // Green line connections
    { from: "Turkiston", to: "Yunusobod" },
    { from: "Yunusobod", to: "Shahriston" },
    { from: "Shahriston", to: "Bodomzor" },
    { from: "Bodomzor", to: "Minor" },
    { from: "Minor", to: "Abdulla Qodiriy" },
    { from: "Abdulla Qodiriy", to: "Yunus Rajabiy" },
    { from: "Yunus Rajabiy", to: "Amir Temur xiyoboni" },
    { from: "Yunus Rajabiy", to: "Mingo'rik" },

    // Yellow line connections
    { from: "Texnopark", to: "Yashnobod" },
    { from: "Yashnobod", to: "Tuzel" },
    { from: "Tuzel", to: "Olmos" },
    { from: "Olmos", to: "Rohat" },
    { from: "Rohat", to: "Yangiobod" },
    { from: "Yangiobod", to: "Qo'yliq" },
    { from: "Qo'yliq", to: "Matonat" },
    { from: "Matonat", to: "Qiyot" },
    { from: "Qiyot", to: "Tolariq" },
    { from: "Tolariq", to: "Xonobod" },
    { from: "Xonobod", to: "Quruvchilar" },
    { from: "Quruvchilar", to: "Turon" },
    { from: "Turon", to: "Qipchoq" },
    { from: "Qipchoq", to: "Chinor" },
  ]

  // Route planning algorithm
  const findRoute = useCallback(
    (from, to) => {
      if (!from || !to || from === to) return []

      // Build adjacency list from connections
      const graph = {}
      Object.keys(stations).forEach((station) => {
        graph[station] = []
      })

      connections.forEach((conn) => {
        if (graph[conn.from] && graph[conn.to]) {
          graph[conn.from].push(conn.to)
          graph[conn.to].push(conn.from)
        }
      })

      // BFS to find shortest path
      const queue = [[from]]
      const visited = new Set([from])

      while (queue.length > 0) {
        const path = queue.shift()
        const current = path[path.length - 1]

        if (current === to) {
          return path
        }

        for (const neighbor of graph[current] || []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor)
            queue.push([...path, neighbor])
          }
        }
      }

      return []
    },
    [connections, stations],
  )

  // Calculate route with animation
  const calculateRoute = useCallback(async () => {
    if (!fromStation || !toStation) return

    setIsCalculatingRoute(true)
    setCurrentRoute([])

    // Simulate calculation delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    const route = findRoute(fromStation, toStation)

    if (route.length > 0) {
      // Calculate route info
      const transfers = []
      let currentLine = stations[route[0]]?.line

      for (let i = 1; i < route.length; i++) {
        const stationLine = stations[route[i]]?.line
        if (stationLine !== currentLine) {
          transfers.push({
            station: route[i - 1],
            fromLine: currentLine,
            toLine: stationLine,
          })
          currentLine = stationLine
        }
      }

      setRouteInfo({
        distance: route.length - 1,
        transfers: transfers.length,
        transferStations: transfers,
        estimatedTime: Math.ceil((route.length - 1) * 2 + transfers.length * 3),
      })

      // Set the complete route immediately without animation
      setCurrentRoute(route)
    }

    setIsCalculatingRoute(false)
  }, [fromStation, toStation, findRoute, stations])

  // Clear route
  const clearRoute = useCallback(() => {
    setCurrentRoute([])
    setRouteInfo(null)
    setFromStation("")
    setToStation("")
  }, [])

  const handleZoomIn = () => {
    setTransform((prev) => ({ ...prev, scale: Math.min(prev.scale * 1.2, 5) }))
  }

  const handleZoomOut = () => {
    setTransform((prev) => ({ ...prev, scale: Math.max(prev.scale / 1.2, 0.3) }))
  }

  const handleReset = () => {
    setTransform({ x: 0, y: 0, scale: 1 })
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setShowModal(false) // Close modal when entering fullscreen
    if (!isFullscreen) {
      setTransform({ x: 0, y: 0, scale: 0.6 }) // Start with smaller scale to see more of the map
    } else {
      setTransform({ x: 0, y: 0, scale: 1 })
    }
  }

  // Navigate to home page
  const goToHome = () => {
    router.push("/")
  }

  // Handle station click
  const handleStationClick = (stationName, e) => {
    e.stopPropagation()
    if (!isFullscreen) {
      setSelectedStation(stationName)
      setShowModal(true)
      setCurrentImageIndex(0)
    }
  }

  // Get station details with fallback
  const getStationDetails = (stationName) => {
    const station = stations[stationName]
    const details = stationDetails[stationName]
    return {
      ...station,
      opened: details?.opened || "1980-yillar",
      depth: details?.depth || "15-25m",
      dailyPassengers: details?.dailyPassengers || "25,000",
      architect: details?.architect || "Sovet metro arxitektorlari",
      history:
        details?.history ||
        `${station?.nameUz} stansiyasi Toshkent metropoliteni tizimining muhim qismi bo'lib, har kuni minglab yo'lovchilarga xizmat ko'rsatadi va shaharning turli qismlarini bog'laydi.`,
      features: details?.features || ["Zamonaviy qulayliklar", "Nogironlar uchun qulayliklar", "Xavfsizlik tizimlari"],
      nearbyAttractions: details?.nearbyAttractions || [
        "Mahalliy diqqatga sazovor joylar",
        "Savdo hududlari",
        "Madaniy ob'ektlar",
      ],
      description:
        details?.description ||
        `Zamonaviy qulayliklarga ega va ${lineNames[station?.line]} tarmog'ida muhim transport markazi bo'lib xizmat qiladigan yaxshi loyihalashtirilgan metro stansiyasi.`,
      images: details?.images || [
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(station?.nameUz + " 1")}`,
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(station?.nameUz + " 2")}`,
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(station?.nameUz + " 3")}`,
      ],
      videos: details?.videos || [
        {
          title: "Virtual tur",
          thumbnail: `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(station?.nameUz + " Video")}`,
        },
      ],
    }
  }

  // Image carousel handlers
  const nextImage = () => {
    const details = getStationDetails(selectedStation)
    setCurrentImageIndex((prev) => (prev + 1) % details.images.length)
  }

  const prevImage = () => {
    const details = getStationDetails(selectedStation)
    setCurrentImageIndex((prev) => (prev - 1 + details.images.length) % details.images.length)
  }

  // Image viewer handlers
  const openImageViewer = (index) => {
    setViewerImageIndex(index)
    setShowImageViewer(true)
  }

  const nextViewerImage = () => {
    const details = getStationDetails(selectedStation)
    setViewerImageIndex((prev) => (prev + 1) % details.images.length)
  }

  const prevViewerImage = () => {
    const details = getStationDetails(selectedStation)
    setViewerImageIndex((prev) => (prev - 1 + details.images.length) % details.images.length)
  }

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (showImageViewer) {
          setShowImageViewer(false)
        } else if (showModal) {
          setShowModal(false)
        } else if (isFullscreen) {
          setIsFullscreen(false)
          setTransform({ x: 0, y: 0, scale: 1 })
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, showModal, showImageViewer])

  // Setup touch event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e) => {
      // Don't start dragging if touching a station
      if (e.target.tagName === "circle") return

      if (e.touches.length === 1) {
        const touch = e.touches[0]
        setIsDragging(true)
        setDragStart({
          x: touch.clientX - transform.x,
          y: touch.clientY - transform.y,
        })
        e.preventDefault()
      }
    }

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return
      const touch = e.touches[0]
      const newX = touch.clientX - dragStart.x
      const newY = touch.clientY - dragStart.y
      setTransform((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }))
      e.preventDefault()
    }

    const handleTouchEnd = (e) => {
      setIsDragging(false)
      e.preventDefault()
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: false })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, dragStart, transform])

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true)
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y })
    },
    [transform],
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setTransform((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }))
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      const maxScale = isFullscreen ? 8 : 3
      const minScale = isFullscreen ? 0.2 : 0.5
      setTransform((prev) => ({
        ...prev,
        scale: Math.max(minScale, Math.min(maxScale, prev.scale * delta)),
      }))
    },
    [isFullscreen],
  )

  const currentStationDetails = selectedStation ? getStationDetails(selectedStation) : null

  return (
    <>
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className={`${isFullscreen ? "fixed inset-0 z-[9999] bg-white" : "w-full h-screen"} relative flex`}>
        {/* Route Planning Panel - Left Side */}
        {!isFullscreen && (
          <div
            className={`${showRoutePanel ? "w-80 sm:w-96" : "w-0"} transition-all duration-300 ease-in-out overflow-hidden bg-white border-r border-gray-200 shadow-lg z-30`}
          >
            <div className="h-full flex flex-col">
              {/* Panel Header */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h2 className="text-lg font-bold">Yo'nalish tanlash</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowRoutePanel(false)}
                    className="text-white hover:bg-white/20 rounded-full w-8 h-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Panel Content */}
              <div className="flex-1 p-4 space-y-6 overflow-y-auto">
                {/* Station Selection */}
                <div className="space-y-4">
                  {/* From Station */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      Qayerdan
                    </label>
                    <select
                      value={fromStation}
                      onChange={(e) => setFromStation(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="">Stansiyani tanlang</option>
                      {Object.keys(stations)
                        .sort()
                        .map((station) => (
                          <option key={station} value={station}>
                            {stations[station].nameUz} ({lineNames[stations[station].line]})
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const temp = fromStation
                        setFromStation(toStation)
                        setToStation(temp)
                      }}
                      className="rounded-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                      disabled={!fromStation && !toStation}
                    >
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* To Station */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      Qayerga
                    </label>
                    <select
                      value={toStation}
                      onChange={(e) => setToStation(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="">Stansiyani tanlang</option>
                      {Object.keys(stations)
                        .sort()
                        .map((station) => (
                          <option key={station} value={station}>
                            {stations[station].nameUz} ({lineNames[stations[station].line]})
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={calculateRoute}
                    disabled={!fromStation || !toStation || isCalculatingRoute}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    {isCalculatingRoute ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Hisoblanmoqda...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Yo'nalishni ko'rsatish
                      </div>
                    )}
                  </Button>

                  {currentRoute.length > 0 && (
                    <Button
                      onClick={clearRoute}
                      variant="outline"
                      className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium bg-transparent"
                    >
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Tozalash
                      </div>
                    </Button>
                  )}
                </div>

                {/* Route Information */}
                {routeInfo && (
                  <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Yo'nalish ma'lumotlari
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-blue-700">{routeInfo.distance}</div>
                          <div className="text-xs text-blue-600">Stansiya</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-blue-700">{routeInfo.estimatedTime}</div>
                          <div className="text-xs text-blue-600">Daqiqa</div>
                        </div>
                      </div>

                      {routeInfo.transfers > 0 && (
                        <div className="p-3 bg-white rounded-lg">
                          <div className="text-sm font-medium text-blue-800 mb-2">
                            O'tish joylari ({routeInfo.transfers}):
                          </div>
                          {routeInfo.transferStations.map((transfer, index) => (
                            <div key={index} className="text-xs text-blue-700 flex items-center gap-2 mb-1">
                              <ArrowRight className="w-3 h-3" />
                              {stations[transfer.station]?.nameUz}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Route Steps */}
                {currentRoute.length > 0 && (
                  <Card className="border-0 shadow-md">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                        <Train className="w-5 h-5" />
                        Yo'nalish bosqichlari
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {currentRoute.map((station, index) => (
                          <div
                            key={station}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                              index === 0
                                ? "bg-blue-100"
                                : index === currentRoute.length - 1
                                  ? "bg-red-100"
                                  : "bg-gray-50"
                            }`}
                            style={{
                              animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
                            }}
                          >
                            <div className="flex flex-col items-center">
                              <div
                                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: lineColors[stations[station]?.line] }}
                              />
                              {index < currentRoute.length - 1 && <div className="w-0.5 h-4 bg-gray-300 mt-1" />}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-800">{stations[station]?.nameUz}</div>
                              <div className="text-xs text-gray-500">{lineNames[stations[station]?.line]}</div>
                            </div>
                            {index === 0 && (
                              <Badge variant="secondary" className="bg-blue-200 text-blue-800 text-xs">
                                Boshlang'ich
                              </Badge>
                            )}
                            {index === currentRoute.length - 1 && (
                              <Badge variant="secondary" className="bg-red-200 text-red-800 text-xs">
                                Maqsad
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Route Panel Toggle Button - Modern Redesign */}
        {!isFullscreen && (
          <div
            className={`fixed top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
              showRoutePanel ? "left-72 sm:left-80" : "left-0"
            }`}
          >
            <Button
              onClick={() => setShowRoutePanel(!showRoutePanel)}
              className={`group ${
                showRoutePanel
                  ? "bg-white text-blue-800 border border-blue-300 rounded-l-xl px-3 py-6 h-28"
                  : "bg-blue-700 text-white rounded-r-xl px-4 py-7 h-32"
              } flex flex-col items-center justify-center transition-all duration-300`}
            >
              {showRoutePanel ? (
                <div className="flex -ml-15 flex-col items-center space-y-1">
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="text-[11px] font-semibold">Yashirish</span>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Navigation className="w-5 h-5" />
                  <div
                    className="text-[10px] font-semibold leading-tight text-center"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    YO'NALISH
                    <br />
                    TANLASH
                  </div>
                </div>
              )}
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Back Button - Top Left */}
          <div className="absolute top-4 left-4 z-20">
            <Button
              onClick={goToHome}
              size="lg"
              className="bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-lg px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Bosh sahifa</span>
            </Button>
          </div>

          {/* Zoom Controls - Bottom Left */}
          {!showModal && (
            <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg flex flex-col gap-2">
              <Button
                onClick={handleZoomIn}
                size="sm"
                variant="outline"
                className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-white/95 h-10 w-10 p-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleZoomOut}
                size="sm"
                variant="outline"
                className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-white/95 h-10 w-10 p-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleReset}
                size="sm"
                variant="outline"
                className="text-blue-700 hover:bg-blue-100 hover:border-blue-100 transition-all duration-200 bg-white/95 h-10 w-10 p-0"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                onClick={toggleFullscreen}
                size="sm"
                variant="outline"
                className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-white/95 h-10 w-10 p-0"
              >
                <Maximize className="w-4 h-4" />
              </Button>
              {/* Zoom indicator */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 text-center">
                <p className="text-xs text-gray-700 font-medium">{Math.round(transform.scale * 100)}%</p>
              </div>
            </div>
          )}

          {/* Map Container */}
          <div
            ref={containerRef}
            className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${
              showModal && !isFullscreen ? "w-full lg:w-2/3" : "w-full"
            } h-full transition-all duration-300`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 1400 1600"
              className="w-full h-[110%] cursor-grab active:cursor-grabbing select-none"
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <defs>
                {/* Enhanced gradients for lines */}
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E53E3E" />
                  <stop offset="50%" stopColor="#FC8181" />
                  <stop offset="100%" stopColor="#E53E3E" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3182CE" />
                  <stop offset="50%" stopColor="#63B3ED" />
                  <stop offset="100%" stopColor="#3182CE" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38A169" />
                  <stop offset="50%" stopColor="#68D391" />
                  <stop offset="100%" stopColor="#38A169" />
                </linearGradient>
                <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D69E2E" />
                  <stop offset="50%" stopColor="#F6E05E" />
                  <stop offset="100%" stopColor="#D69E2E" />
                </linearGradient>
                {/* Enhanced route gradient */}
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06D6A0" />
                  <stop offset="25%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#34D399" />
                  <stop offset="75%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#06D6A0" />
                </linearGradient>
                {/* Enhanced drop shadow filter */}
                <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="3" dy="3" stdDeviation="4" floodOpacity="0.4" />
                </filter>
                {/* Glow effect filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Route glow filter */}
                <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Draw connections/lines with enhanced styling */}
              {connections.map((connection, index) => {
                const fromStation = stations[connection.from]
                const toStation = stations[connection.to]
                if (!fromStation || !toStation) return null
                return (
                  <g key={index}>
                    {/* Outer glow */}
                    <line
                      x1={fromStation.x}
                      y1={fromStation.y}
                      x2={toStation.x}
                      y2={toStation.y}
                      stroke={lineColors[fromStation.line]}
                      strokeWidth="12"
                      strokeLinecap="round"
                      opacity="0.3"
                    />
                    {/* Main line with gradient */}
                    <line
                      x1={fromStation.x}
                      y1={fromStation.y}
                      x2={toStation.x}
                      y2={toStation.y}
                      stroke={`url(#${fromStation.line}Gradient)`}
                      strokeWidth="8"
                      strokeLinecap="round"
                      filter="url(#dropshadow)"
                    />
                  </g>
                )
              })}

              {/* Draw route lines - Static without animation */}
              {currentRoute.length > 1 &&
                currentRoute.map((station, index) => {
                  if (index === currentRoute.length - 1) return null
                  const fromStation = stations[station]
                  const toStation = stations[currentRoute[index + 1]]
                  if (!fromStation || !toStation) return null

                  return (
                    <g key={`route-${index}`}>
                      {/* Route outer glow */}
                      <line
                        x1={fromStation.x}
                        y1={fromStation.y}
                        x2={toStation.x}
                        y2={toStation.y}
                        stroke="#06D6A0"
                        strokeWidth="16"
                        strokeLinecap="round"
                        opacity="0.3"
                      />
                      {/* Route middle glow */}
                      <line
                        x1={fromStation.x}
                        y1={fromStation.y}
                        x2={toStation.x}
                        y2={toStation.y}
                        stroke="#10B981"
                        strokeWidth="12"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                      {/* Main route line */}
                      <line
                        x1={fromStation.x}
                        y1={fromStation.y}
                        x2={toStation.x}
                        y2={toStation.y}
                        stroke="url(#routeGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        filter="url(#dropshadow)"
                      />
                      {/* Route highlight line */}
                      <line
                        x1={fromStation.x}
                        y1={fromStation.y}
                        x2={toStation.x}
                        y2={toStation.y}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    </g>
                  )
                })}

              {/* Draw stations with enhanced mobile styling */}
              {Object.entries(stations).map(([name, station]) => {
                const isSelected = selectedStation === name
                const isInRoute = currentRoute.includes(name)
                const isStartStation = currentRoute[0] === name
                const isEndStation = currentRoute[currentRoute.length - 1] === name

                return (
                  <g key={name}>
                    {/* Station outer glow ring - Larger touch area */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "25" : isInRoute ? "22" : "20"}
                      fill={isInRoute ? "#10B981" : lineColors[station.line]}
                      opacity={isSelected ? "0.4" : isInRoute ? "0.5" : "0.2"}
                    />
                    {/* Station outer ring */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "18" : isInRoute ? "16" : "15"}
                      fill={isInRoute ? "#10B981" : lineColors[station.line]}
                      opacity={isSelected ? "0.6" : isInRoute ? "0.6" : "0.4"}
                    />
                    {/* Station main circle - Better touch target */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "15" : isInRoute ? "13" : "12"}
                      fill="white"
                      stroke={isInRoute ? "#10B981" : lineColors[station.line]}
                      strokeWidth={isSelected ? "5" : isInRoute ? "4" : "4"}
                      filter="url(#dropshadow)"
                      className="cursor-pointer hover:r-13 transition-all duration-200"
                      onClick={(e) => handleStationClick(name, e)}
                      style={{ touchAction: "manipulation" }}
                    />
                    {/* Station inner dot */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "9" : isInRoute ? "8" : "7"}
                      fill={isInRoute ? "#10B981" : lineColors[station.line]}
                      opacity="0.9"
                      className="cursor-pointer"
                      onClick={(e) => handleStationClick(name, e)}
                      style={{ touchAction: "manipulation" }}
                    />

                    {/* Special markers for start/end stations */}
                    {isStartStation && (
                      <circle cx={station.x} cy={station.y} r="4" fill="#3B82F6" className="animate-pulse" />
                    )}
                    {isEndStation && (
                      <circle cx={station.x} cy={station.y} r="4" fill="#EF4444" className="animate-pulse" />
                    )}

                    {/* Station name with enhanced styling */}
                    <text
                      x={station.x}
                      y={station.y - (isSelected ? 32 : isInRoute ? 30 : 28)}
                      textAnchor="middle"
                      className={`font-bold pointer-events-none ${
                        isSelected ? "fill-blue-800" : isInRoute ? "fill-green-800" : "fill-gray-800"
                      }`}
                      style={{
                        fontSize: isSelected ? "16px" : isInRoute ? "15px" : "14px",
                        textShadow: "2px 2px 4px rgba(255,255,255,0.9), -1px -1px 2px rgba(255,255,255,0.9)",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {station.nameUz}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Station Details Modal - Mobile Optimized Sidebar */}
          {showModal && !isFullscreen && currentStationDetails && (
            <>
              {/* Mobile Backdrop */}
              <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowModal(false)} />

              {/* Modal Container */}
              <div
                className={`fixed z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
                  ${showModal ? "translate-x-0" : "translate-x-full"}
                  ${
                    window.innerWidth < 768
                      ? "inset-y-0 left-0 right-0 bg-white"
                      : "inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/3 xl:w-2/5 bg-white shadow-2xl border-l border-gray-200"
                  }`}
              >
                {/* Modal Header - Enhanced for Mobile */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-900 to-blue-800 p-4 sm:p-6 flex items-center justify-between z-10 shadow-lg">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 shadow-lg border-2 border-white/20"
                      style={{ backgroundColor: lineColors[currentStationDetails.line] }}
                    />
                    <div className="min-w-0 flex-1">
                      <h1 className="text-lg sm:text-2xl font-bold text-white truncate mb-1">
                        {currentStationDetails.nameUz}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-blue-700 text-white border-blue-600 hover:bg-blue-600 text-xs sm:text-sm"
                        >
                          {lineNames[currentStationDetails.line]}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowModal(false)}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
                    type="button"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>
                </div>

                {/* Modal Content - Mobile Optimized */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Quick Stats - Mobile Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <Card className="border-0 shadow-md bg-gradient-to-br from-blue-100 to-blue-200">
                      <CardContent className="p-2 sm:p-4 text-center">
                        <Calendar className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-3 text-blue-900" />
                        <div className="text-xs text-blue-800 font-medium mb-1">Ochilgan yili</div>
                        <div className="text-sm sm:text-xl font-bold text-blue-900">{currentStationDetails.opened}</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md bg-gradient-to-br from-blue-100 to-blue-200">
                      <CardContent className="p-2 sm:p-4 text-center">
                        <Ruler className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-3 text-blue-900" />
                        <div className="text-xs text-blue-800 font-medium mb-1">Chuqurligi</div>
                        <div className="text-sm sm:text-xl font-bold text-blue-900">{currentStationDetails.depth}</div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md bg-gradient-to-br from-blue-100 to-blue-200">
                      <CardContent className="p-2 sm:p-4 text-center">
                        <Users className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-3 text-blue-900" />
                        <div className="text-xs text-blue-800 font-medium mb-1">Kunlik yo'lovchi</div>
                        <div className="text-sm sm:text-xl font-bold text-blue-900">
                          {currentStationDetails.dailyPassengers}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md bg-gradient-to-br from-blue-100 to-blue-200">
                      <CardContent className="p-2 sm:p-4 text-center">
                        <User className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-3 text-blue-900" />
                        <div className="text-xs text-blue-800 font-medium mb-1">Arxitektor</div>
                        <div className="text-xs sm:text-lg font-bold text-blue-900 leading-tight">
                          {currentStationDetails.architect.split(" ").slice(0, 2).join(" ")}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Image Gallery - Mobile Optimized */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl text-blue-900">
                        <Star className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                        Galereya
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="relative h-40 sm:h-64 lg:h-80 bg-gray-100 overflow-hidden">
                          <img
                            src={currentStationDetails.images[currentImageIndex] || "/placeholder.svg"}
                            alt={`${currentStationDetails.nameUz} ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => openImageViewer(currentImageIndex)}
                          />
                          {/* Carousel Controls */}
                          {currentStationDetails.images.length > 1 && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 bg-blue-900/60 hover:bg-blue-900/80 text-white rounded-full w-8 h-8 sm:w-12 sm:h-12 backdrop-blur-sm"
                                onClick={prevImage}
                              >
                                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 bg-blue-900/60 hover:bg-blue-900/80 text-white rounded-full w-8 h-8 sm:w-12 sm:h-12 backdrop-blur-sm"
                                onClick={nextImage}
                              >
                                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                              </Button>
                            </>
                          )}
                          {/* Image Counter */}
                          <div className="absolute bottom-1 sm:bottom-4 right-1 sm:right-4 bg-blue-900/60 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                            {currentImageIndex + 1} / {currentStationDetails.images.length}
                          </div>
                        </div>
                        {/* Thumbnail Strip - Hidden on very small screens */}
                        {currentStationDetails.images.length > 1 && (
                          <div className="p-2 sm:p-4 bg-gray-50 hidden xs:block">
                            <div className="flex gap-1 sm:gap-3 overflow-x-auto pb-2">
                              {currentStationDetails.images.map((image, index) => (
                                <div
                                  key={index}
                                  className={`flex-shrink-0 w-12 h-9 sm:w-20 sm:h-16 rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-200 ${
                                    index === currentImageIndex
                                      ? "border-blue-900 scale-105 shadow-lg"
                                      : "border-blue-300 hover:border-blue-500"
                                  }`}
                                  onClick={() => setCurrentImageIndex(index)}
                                >
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* History Section - Collapsible on Mobile */}
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl text-blue-900">
                        <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                        Tarixiy ma'lumotlar
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-4">
                      <p className="text-blue-800 leading-relaxed text-xs sm:text-base">
                        {currentStationDetails.history}
                      </p>
                      <div className="pt-2 sm:pt-4 border-t border-blue-200">
                        <Badge variant="outline" className="border-blue-400 text-blue-900 bg-blue-50 px-2 py-1 text-xs">
                          <User className="w-3 h-3 mr-1" />
                          Arxitektor: {currentStationDetails.architect}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Features - Compact Mobile View */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl text-blue-900">
                        <Train className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                        Stansiya xususiyatlari
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-1 sm:gap-3">
                        {currentStationDetails.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-blue-100 rounded-xl border border-blue-200 hover:bg-blue-200 transition-colors duration-200"
                          >
                            <div className="w-2 h-2 bg-blue-900 rounded-full flex-shrink-0"></div>
                            <span className="text-blue-900 font-medium text-xs sm:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Videos - Compact Mobile View */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl text-blue-900">
                        <Play className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                        Video materiallar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 sm:gap-4">
                        {currentStationDetails.videos.map((video, index) => (
                          <div
                            key={index}
                            className="relative bg-blue-50 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 group border border-blue-200"
                          >
                            <div className="aspect-video relative">
                              <img
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-blue-900/40 group-hover:bg-blue-900/60 transition-colors">
                                <div className="w-8 h-8 sm:w-16 sm:h-16 bg-blue-900 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors shadow-lg">
                                  <Play className="w-4 h-4 sm:w-8 sm:h-8 text-white ml-1" />
                                </div>
                              </div>
                            </div>
                            <div className="p-2 sm:p-4 bg-white">
                              <h4 className="font-semibold text-blue-900 text-xs sm:text-base">{video.title}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Nearby Attractions - Compact Mobile View */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl text-blue-900">
                        <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                        Yaqin atrofdagi joylar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-1 sm:gap-3">
                        {currentStationDetails.nearbyAttractions.map((attraction, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-blue-100 rounded-xl border border-blue-200 hover:bg-blue-200 transition-colors duration-200 cursor-pointer group"
                          >
                            <MapPin className="w-3 h-3 sm:w-5 sm:h-5 text-blue-900 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="text-blue-900 font-medium text-xs sm:text-base">{attraction}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description - Compact Mobile View */}
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl text-blue-900">
                        <Users className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                        Batafsil tavsif
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-800 leading-relaxed text-xs sm:text-base">
                        {currentStationDetails.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Bottom Padding */}
                <div className="h-4 sm:h-8"></div>
              </div>
            </>
          )}

          {/* Fullscreen Image Viewer - Enhanced */}
          {showImageViewer && currentStationDetails && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="relative max-w-7xl max-h-full">
                <img
                  src={currentStationDetails.images[viewerImageIndex] || "/placeholder.svg"}
                  alt={`${currentStationDetails.nameUz} ${viewerImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-blue-900/60 hover:bg-blue-900/80 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm"
                  onClick={() => setShowImageViewer(false)}
                  type="button"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
                {/* Navigation */}
                {currentStationDetails.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-blue-900/60 hover:bg-blue-900/80 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm"
                      onClick={prevViewerImage}
                      type="button"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-blue-900/60 hover:bg-blue-900/80 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm"
                      onClick={nextViewerImage}
                      type="button"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                  </>
                )}
                {/* Image Counter */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-900/60 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium backdrop-blur-sm text-sm sm:text-base">
                  {viewerImageIndex + 1} / {currentStationDetails.images.length}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
