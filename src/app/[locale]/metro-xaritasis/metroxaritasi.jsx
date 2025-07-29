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
  MapPin,
  Train,
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
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  // Route planning states
  const [showRoutePanel, setShowRoutePanel] = useState(true)
  const [fromStation, setFromStation] = useState("")
  const [toStation, setToStation] = useState("")
  const [currentRoute, setCurrentRoute] = useState([])
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false)
  const [routeInfo, setRouteInfo] = useState(null)
  const [routeAnimationProgress, setRouteAnimationProgress] = useState(0)
  const [isAnimatingRoute, setIsAnimatingRoute] = useState(false)

  // Responsive breakpoint detection
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Optimized station positions with better spacing for mobile
  const stations = {
    // Red Line (Chilonzor Line) - Optimized spacing
    Olmazor: { x: 80, y: 1000, line: "red", nameUz: "Olmazor" },
    Choshtepa: { x: 130, y: 1150, line: "red", nameUz: "Choshtepa" },
    "O'zgarish": { x: 180, y: 1250, line: "red", nameUz: "O'zgarish" },
    Sergeli: { x: 280, y: 1350, line: "red", nameUz: "Sergeli" },
    Yangihayot: { x: 380, y: 1450, line: "red", nameUz: "Yangihayot" },
    Chinor: { x: 450, y: 1500, line: "red", nameUz: "Chinor" },
    Chilonzor: { x: 110, y: 900, line: "red", nameUz: "Chilonzor" },
    "Mirzo Ulugbek": { x: 140, y: 820, line: "red", nameUz: "Mirzo Ulug'bek" },
    Novza: { x: 180, y: 720, line: "red", nameUz: "Novza" },
    "Milliy bog'": { x: 230, y: 630, line: "red", nameUz: "Milliy bog'" },
    "Xalqlar do'stligi": { x: 290, y: 550, line: "red", nameUz: "Xalqlar do'stligi" },
    Paxtakor: { x: 380, y: 450, line: "red", nameUz: "Paxtakor" },
    "Mustaqillik maydoni": { x: 480, y: 450, line: "red", nameUz: "Mustaqillik maydoni" },
    "Amir Temur xiyoboni": { x: 630, y: 450, line: "red", nameUz: "Amir Temur xiyoboni" },
    "Hamid Olimjon": { x: 730, y: 430, line: "red", nameUz: "Hamid Olimjon" },
    Pushkin: { x: 830, y: 400, line: "red", nameUz: "Pushkin" },
    "Buyuk ipak yo'li": { x: 930, y: 350, line: "red", nameUz: "Buyuk ipak yo'li" },

    // Blue Line (O'zbekiston Line) - Optimized spacing
    Beruniy: { x: 30, y: 80, line: "blue", nameUz: "Beruniy" },
    Tinchlik: { x: 130, y: 200, line: "blue", nameUz: "Tinchlik" },
    Chorsu: { x: 200, y: 280, line: "blue", nameUz: "Chorsu" },
    "G'afur G'ulom": { x: 280, y: 350, line: "blue", nameUz: "G'afur G'ulom" },
    "Alisher Navoiy": { x: 330, y: 420, line: "blue", nameUz: "Alisher Navoiy" },
    "O'zbekiston": { x: 430, y: 550, line: "blue", nameUz: "O'zbekiston" },
    Kosmonavtlar: { x: 530, y: 600, line: "blue", nameUz: "Kosmonavtlar" },
    Oybek: { x: 630, y: 650, line: "blue", nameUz: "Oybek" },
    Toshkent: { x: 780, y: 700, line: "blue", nameUz: "Toshkent" },
    Mashinasozlar: { x: 910, y: 700, line: "blue", nameUz: "Mashinasozlar" },
    "Do'stlik": { x: 1010, y: 680, line: "blue", nameUz: "Do'stlik" },

    // Green Line (Yunusobod Line) - Optimized spacing
    Turkiston: { x: 530, y: 60, line: "green", nameUz: "Turkiston" },
    Yunusobod: { x: 530, y: 120, line: "green", nameUz: "Yunusobod" },
    Shahriston: { x: 530, y: 180, line: "green", nameUz: "Shahriston" },
    Bodomzor: { x: 530, y: 240, line: "green", nameUz: "Bodomzor" },
    Minor: { x: 530, y: 300, line: "green", nameUz: "Minor" },
    "Abdulla Qodiriy": { x: 580, y: 360, line: "green", nameUz: "Abdulla Qodiriy" },
    "Yunus Rajabiy": { x: 620, y: 400, line: "green", nameUz: "Yunus Rajabiy" },
    "Mingo'rik": { x: 630, y: 600, line: "green", nameUz: "Mingo'rik" },

    // Yellow Line (Sirg'ali Line) - Optimized spacing
    Texnopark: { x: 1080, y: 650, line: "yellow", nameUz: "Texnopark" },
    Yashnobod: { x: 1150, y: 720, line: "yellow", nameUz: "Yashnobod" },
    Tuzel: { x: 1210, y: 800, line: "yellow", nameUz: "Tuzel" },
    Olmos: { x: 1210, y: 900, line: "yellow", nameUz: "Olmos" },
    Rohat: { x: 1220, y: 1000, line: "yellow", nameUz: "Rohat" },
    Yangiobod: { x: 1220, y: 1100, line: "yellow", nameUz: "Yangiobod" },
    "Qo'yliq": { x: 1150, y: 1200, line: "yellow", nameUz: "Qo'yliq" },
    Matonat: { x: 1010, y: 1150, line: "yellow", nameUz: "Matonat" },
    Qiyot: { x: 900, y: 1150, line: "yellow", nameUz: "Qiyot" },
    Tolariq: { x: 780, y: 1150, line: "yellow", nameUz: "Tolariq" },
    Xonobod: { x: 660, y: 1200, line: "yellow", nameUz: "Xonobod" },
    Quruvchilar: { x: 630, y: 1300, line: "yellow", nameUz: "Quruvchilar" },
    Turon: { x: 600, y: 1400, line: "yellow", nameUz: "Turon" },
    Qipchoq: { x: 510, y: 1500, line: "yellow", nameUz: "Qipchoq" },
  }

  // Station information with optimized image URLs
  const stationDetails = {
    "Mustaqillik maydoni": {
      description:
        "Mustaqillik Maydoni — Toshkent metrosining Chilonzor yo'nalishidagi bekat bo'lib, 1977-yilda ochilgan. Ilgari \"Lenin maydoni\" deb atalgan. Bekat oq marmar, granit va milliy naqshlar bilan bezatilgan bo'lib, arxitekturasi bilan ajralib turadi. 1991-yilda O'zbekiston mustaqillikka erishgach, bekatga hozirgi nom berilgan. U Mustaqillik maydoni markazida joylashgan bo'lib, yodgorliklar va davlat muassasalariga yaqin.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/6143287/2a000001845ffb2a3f145fe877d7cb1b6882/orig",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Mustaqillik_Maydoni_station_of_Chilanzar_Line_of_Tashkent_Metro_in_Tashkent_Uzbekistan.jpg/960px-Mustaqillik_Maydoni_station_of_Chilanzar_Line_of_Tashkent_Metro_in_Tashkent_Uzbekistan.jpg",
      ],
      videos: [
        {
          title: "Mustaqillik maydoni",
          url: "https://www.youtube.com/embed/vrYXZa5es4A",
          thumbnail: "https://avatars.mds.yandex.net/get-vh/6331688/2a0000018f628a33aac7a8b6b3fe0eb629e7/smart_crop_516x290",
        },

      ],
    },
    "Buyuk ipak yo'li": {
      description: "Buyuk Ipak Yoli — Toshkent metrosining Chilonzor yo‘nalishidagi so‘nggi (sharqiy) bekatidir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Yakkasaroy tumanida joylashgan. Bekat nomi qadimgi dunyo savdo yo‘llarining eng mashhuri — Buyuk Ipak Yo‘li sharafiga qo‘yilgan. Arxitekturasi milliy uslubda bezatilgan bo‘lib, devorlarida qadimiy karvonlar, ipak yo‘li xaritalari va Sharqona naqshlar tasvirlangan. Platforma yer ostida joylashgan, yo‘lovchilarga qulay sharoitlar yaratilgan.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/6236655/2a000001845f818c76f3589fc4e161e39bf7/L_height",
        "https://avatars.mds.yandex.net/get-altay/10636707/2a0000018a257c34a9c335e0fd19fd08c166/L_height",
      ],
      videos: [
        {
          title: "Buyuk ipak yo'li",
          url: "https://www.youtube.com/embed/oJeTS92hCBQ?si=msyIsAe3gcaI6UVm",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/6203703/2a0000018955bfa463d4ecb3c7ac5483cb1d/orig",
        },

      ],
    },
    "Pushkin": {
      description: "Buyuk Ipak Yoli — Toshkent metrosining Chilonzor yo‘nalishidagi so‘nggi (sharqiy) bekatidir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Yakkasaroy tumanida joylashgan. Bekat nomi qadimgi dunyo savdo yo‘llarining eng mashhuri — Buyuk Ipak Yo‘li sharafiga qo‘yilgan. Arxitekturasi milliy uslubda bezatilgan bo‘lib, devorlarida qadimiy karvonlar, ipak yo‘li xaritalari va Sharqona naqshlar tasvirlangan. Platforma yer ostida joylashgan, yo‘lovchilarga qulay sharoitlar yaratilgan.",
      images: [
        "https://daryo.uz/cache/2016/01/04-680x453.jpg",
        "https://avatars.mds.yandex.net/get-altay/5534836/2a000001845f94ab5dca70bc3b3d07e6e070/XXXL",
      ],
      videos: [
        {
          title: "Pushkin",
          url: "https://youtu.be/bm9OJk61wbw?si=400aDkgeiAEOdKRl",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/9724410/2a0000018951c7b274de203bee7975c35a01/XXXL",
        },

      ],
    },
    "Beruniy": {
      description: "Beruniy — Toshkent metrosining O'zbekiston yo‘nalishidagi shimoli-g‘arbiy oxirgi bekatidir. Bu bekat 1991-yil 30-aprelda ochilgan. U Toshkent shahrining Olmazor tumanida joylashgan. Bekat nomi buyuk alloma va olim Abu Rayhon Beruniy sharafiga qo‘yilgan. Arxitekturasi milliy uslubda bezatilgan bo‘lib, marmar va granit bilan ishlangan kubli tom, geometrik naqshlar hamda kristall lyustralar bilan ajralib turadi. Platforma yer ostida joylashgan bo‘lib, yo‘lovchilar uchun qulay va keng sharoitlar yaratilgan.",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Beruni_station_of_Tashkent_Metro_on_Uzbekistan_Line_in_Tashkent_Uzbekistan.jpg/1920px-Beruni_station_of_Tashkent_Metro_on_Uzbekistan_Line_in_Tashkent_Uzbekistan.jpg",
        "https://avatars.mds.yandex.net/get-altay/11487452/2a000001926049cc0a1046ae5f0dcc201560/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13917922/2a000001924ef69977e09f7e964d6c360863/XXXL"
      ],
      videos: [
        {
          title: "Beruniy",
          url: "https://youtu.be/sP8Zbwxk5VU?si=YGbTjmM8dJaCZlf3",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/13719877/2a000001924ef5cec6805751a756cd4958c2/XXXL",
        },

      ],
    },
    "Tinchlik": {
      description: "Tinchlik — Toshkent metrosining O'zbekiston yo‘nalishidagi bekatlaridan biridir. Bu bekat 1991-yil 30-aprelda ochilgan. U Toshkent shahrining Shayxontohur tumanida joylashgan. Bekat nomi “Tinchlik” — osoyishtalik va sulh ma’nosini anglatadi. Arxitekturasi milliy uslubda yaratilgan bo‘lib, marmor ustunlar, rang-barang vitrajlar va geometrik mozaikalar bilan bezatilgan. Platforma yer ostida joylashgan, ikki yo‘lga ega va yo‘lovchilar uchun qulay sharoitlar yaratilgan.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/15265650/2a000001964a86b3d2b430850e3eb3706296/XXXL",
        "https://avatars.mds.yandex.net/get-altay/15401795/2a000001964a86dd1fd5c68b72c1703f5b96/XXXL",
      ],
      videos: [
        {
          title: "Tinchlik",
          url: "https://youtu.be/GHxbrqEYUrM?si=3N3NTHdImXIqINON",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/13668123/2a000001964a8793ba32ad245a6d68dcfe13/XXXL",
        },

      ],
    },
    "Chorsu": {
      description: "Chorsu — Toshkent metrosining O'zbekiston yo‘nalishidagi bekatlaridan biridir. Bu bekat 1989-yil 6-noyabrda ochilgan. U Toshkent shahrining Shayxontohur tumanida, mashhur Chorsu bozori yaqinida joylashgan. Bekat nomi bozordagi qadimiy Chorsu maydonidan olingan. Arxitekturasi milliy uslubda bo‘lib, ko‘k rangli gumbaz naqshlari va keramika panellari bilan bezatilgan. Platforma yer ostida joylashgan, yo‘lovchilar uchun qulay sharoitlarga ega.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7456447/2a0000018464f5cf8494551f9603fe39ffa2/XXXL",
        "https://avatars.mds.yandex.net/get-altay/14451083/2a000001924ef165b40b6f2182cedad1e614/XXXL",
        "https://avatars.mds.yandex.net/get-altay/8133749/2a0000018464f5ecf3973c780b38cca79dd7/XXXL",
      ],
      videos: [
        {
          title: "Chorsu",
          url: "https://youtu.be/UQQH9SpqBuo?si=Dan14JRzNPfrPdxV",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/13525210/2a0000019678ae48d5110f2fc0433fe9d6a4/XXXL",
        },

      ],
    },
    "G'afur G'ulom": {
      description: "G'afur G'ulom — Toshkent metrosining O'zbekiston yo‘nalishidagi bekatlaridan biridir. Bu bekat 1989-yil 6-noyabrda ochilgan. U Shayxontohur tumanida joylashgan. Bekat nomi o‘zbek adabiyoti namoyandasi G'afur G'ulom sharafiga qo‘yilgan. Arxitekturasi o‘zbek milliy uslubida bo‘lib, devorlari marmar va keramika bilan bezatilgan. Platforma yer ostida joylashgan va keng yoritishga ega.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/8128793/2a00000184650aaf3abeca9dbff293a16cef/XXXL",
        "https://avatars.mds.yandex.net/get-altay/14683384/2a000001975ce04794c4b7aa1bec50222bfb/XXXL",
      ],
      videos: [
        {
          title: "G'afur G'ulom",
          url: "https://youtu.be/ksW8uOo1o9c?si=2Z-qgzBpMI27a64N",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7186075/2a00000184650b17a5ce62fc3c23ac95d662/XXXL",
        },

      ],
    },
    "Alisher Navoiy": {
      description: "Alisher Navoiy — Toshkent metrosining O'zbekiston yo‘nalishidagi markaziy bekatlaridan biridir. Bu bekat 1984-yil 6-noyabrda ochilgan. U Toshkent shahrining Shayxontohur tumanida joylashgan. Bekat nomi buyuk o‘zbek shoiri va mutafakkiri Alisher Navoiy sharafiga qo‘yilgan. Arxitekturasi Sharqona uslubda bo‘lib, ko‘k va oq rangli gumbazlar, naqshlar va marmar ustunlar bilan bezatilgan. Platforma keng va yo‘lovchilar uchun qulay sharoitga ega.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/6409878/2a0000018465530e6aa622b9a86bf00900a3/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7742431/2a000001846544d0b8ace930af55ecd3427f/XXXL",
      ],
      videos: [
        {
          title: "Alisher Navoiy",
          url: "https://youtu.be/EcworO7ykWs?si=So8XyBaBV7BVw6hw",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7760835/2a000001846545bbc613be31754dbdb3b318/XXXL",
        },

      ],
    },
    "Abdulla Qodiriy": {
      description: "Abdulla Qodiriy — Toshkent metrosining Yunusobod yo‘nalishidagi bekatlaridan biridir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Shayxontohur tumanida joylashgan. Bekat nomi mashhur yozuvchi Abdulla Qodiriy sharafiga qo‘yilgan. Arxitekturasi zamonaviy uslubda bo‘lib, yorqin rangli naqshlar va oynavand panellar bilan bezatilgan. Platforma yer ostida, qulay va zamonaviy yoritish tizimiga ega.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/5534836/2a000001846688fa1c499c49b23ce41df2bd/XXXL",
        "https://avatars.mds.yandex.net/get-altay/14095226/2a000001924e5e75e467df17b2df3125571a/XXXL",
      ],
      videos: [
        {
          title: "Abdulla Qodiriy",
          url: "https://youtu.be/jQpYU2L_WQw?si=RsoT5b3EQM06QPrp",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7734890/2a000001846687ace28a3b49f096eceed479/XXXL",
        },

      ],
    },
    "Novza": {
      description: "Novza — Toshkent metrosining Chilonzor yo‘nalishidagi bekatlaridan biridir. Bu bekat 1977-yil 6-noyabrda ochilgan. U Toshkent shahrining Chilonzor tumanida joylashgan. Bekat nomi Novza mahallasi nomidan olingan. Arxitekturasi sodda va zamonaviy bo‘lib, marmar ustunlar va geometrik naqshlar bilan ajralib turadi. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7723428/2a000001846075d2c74bf6f498c3016158cc/XXXL",
        "https://avatars.mds.yandex.net/get-altay/9714262/2a00000189522c40e182ef278319f5ae230d/XXXL",
      ],
      videos: [
        {
          title: "Novza",
          url: "https://youtu.be/gAsMRQECH6c?si=lnR2gPXEIBtAvntG",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7379963/2a000001846075ae23589e595b77d343b1e3/XXXL",
        },

      ],
    },
    "Milliy bog'": {
      description: "Milliy bog' — Toshkent metrosining Chilonzor yo‘nalishidagi bekatlaridan biridir. Bu bekat 1984-yil 6-noyabrda ochilgan. U Toshkent shahrining Mirzo Ulug‘bek tumanida joylashgan. Bekat nomi yonida joylashgan Milliy bog‘ (Hozirgi Istiqlol bog‘i) sharafiga qo‘yilgan. Arxitekturasi milliy uslubda bo‘lib, oq marmar ustunlar va yengil geometrik naqshlar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7734890/2a0000018460605f31fc344c342373e0b21d/XXXL",
        "https://avatars.mds.yandex.net/get-altay/9686455/2a00000189c938c7021901c92da3f18258a5/XXXL",
      ],
      videos: [
        {
          title: "Milliy bog'",
          url: "https://youtu.be/86mlltZsKb4?si=grPys0XgWvt6PGmi",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/6310045/2a0000018460606875fe23a4f693392fdb93/XXXL",
        },

      ],
    },
    "Xalqlar do'stligi": {
      description: "Xalqlar do'stligi — Toshkent metrosining Chilonzor yo‘nalishidagi markaziy bekatlaridan biridir. Bu bekat 1977-yil 6-noyabrda ochilgan. U Toshkent shahrining Shayxontohur tumanida joylashgan. Bekat nomi xalqlar o‘rtasidagi do‘stlik g‘oyasidan ilhomlangan. Arxitekturasi Sharqona va sovet davri uslublarini uyg‘unlashtirgan bo‘lib, rangli mozaikalar va marmar ustunlar bilan bezatilgan. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7668046/2a0000018460462072d86a5f393b33d576e2/XXXL",
        "https://avatars.mds.yandex.net/get-altay/14699088/2a00000195b410655a173848548fe55e76e1/XXXL",
      ],
      videos: [
        {
          title: "Xalqlar do'stligi",
          url: "https://youtu.be/Ys0LBXGa8xk?si=uFvecBJO4xjzBY7G",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7650129/2a000001846045ddd2f4f52f6aef055b1e98/XXXL",
        },

      ],
    },
    "Chilonzor": {
      description: "Chilonzor — Toshkent metrosining Chilonzor yo‘nalishidagi bekatlaridan biridir. Bu bekat 1977-yil 6-noyabrda ochilgan. U Toshkent shahrining Chilonzor tumanida joylashgan. Bekat nomi shu tuman va hudud nomidan olingan. Arxitekturasi sodda, oq marmar bilan ishlangan, minimal naqshlar bilan ajralib turadi. Platforma yer ostida va yo‘lovchilar uchun qulay sharoitlarga ega.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/9331640/2a000001896f7a170a1ca748e9a2b64d1103/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7982580/2a000001846249b37413100d645b2274f370/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7021598/2a00000184624884982245dab03e4cce39a8/XXXL"
      ],
      videos: [
        {
          title: "Chilonzor",
          url: "https://youtu.be/F5gXlHVZMj4?si=iCPetWpI1Tut0qDy",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/1005628/2a000001895242bcedd6bd8c58fd25afd5d8/XXXL",
        },

      ],
    },
    "Mirzo Ulug'bek": {
      description: "Mirzo Ulug'bek — Toshkent metrosining Chilonzor yo‘nalishidagi bekatlaridan biridir. Bu bekat 1980-yil 2-noyabrda ochilgan. U Toshkent shahrining Mirzo Ulug‘bek tumanida joylashgan. Bekat nomi buyuk olim va astronom Mirzo Ulug‘bek sharafiga qo‘yilgan. Arxitekturasi ilmiy mavzuga mos bo‘lib, osmon xaritalari va yulduz naqshlari bilan bezatilgan. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/5527230/2a0000018462382ea238c99229bb84a03868/XXXL",
        "https://avatars.mds.yandex.net/get-altay/6446898/2a00000184623858077d80484ab3b14b759a/XXXL",
      ],
      videos: [
        {
          title: "Mirzo Ulug'bek",
          url: "https://youtu.be/pUJ2OlLS-k4?si=FlXFsmJmaX1nLORJ",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/5538812/2a0000018462383b690db77df02343375ac2/XXXL",
        },

      ],
    },
    "Olmazor": {
      description: "Olmazor — Toshkent metrosining Chilonzor yo‘nalishidagi shimoliy oxirgi bekatidir. Bu bekat 1977-yil 6-noyabrda ochilgan. U Toshkent shahrining Olmazor tumanida joylashgan. Bekat nomi hududdagi Olmazor mahallasi nomidan olingan. Arxitekturasi sodda bo‘lib, oq marmar va geometrik naqshlar bilan ishlangan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7695774/2a00000184625fc49253fcd85ef342004562/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13294935/2a000001924dba91439334caf23af071f7cd/XXXL",
      ],
      videos: [
        {
          title: "Olmazor",
          url: "https://youtu.be/WeIxNlmDR-I?si=03osb0xKWAfLw7Qj",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7636462/2a000001846264c5ef84f9925e3335a8caca/XXXL",
        },

      ],
    },
    "Do'stlik": {
      description: "Do'stlik — Toshkent metrosining Chilonzor yo‘nalishidagi bekatlaridan biridir. Bu bekat 1977-yil 6-noyabrda ochilgan. U Toshkent shahrining Yakkasaroy tumanida joylashgan. Bekat nomi xalqlar do‘stligi va birligi g‘oyasidan ilhomlangan. Arxitekturasi sodda va amaliy bo‘lib, oq marmar ustunlar va minimal bezaklarga ega. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7754763/2a0000018466186173b110d6307206d15cc6/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7810332/2a000001846617d28ce10f45c8487e8ba897/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13590061/2a00000191af050d1d5ed96da869f61dee0f/XXXL"
      ],
      videos: [
        {
          title: "Do'stlik",
          url: "https://youtu.be/cie6e8kRIFg?si=jHgWSPWqReVcTaxe",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/5527230/2a0000018466189acfd737173c0c2eac99f9/XXXL",
        },

      ],
    },
    "Mashinasozlar": {
      description: "Mashinasozlar — Toshkent metrosining Chilonzor yo‘nalishidagi bekatlaridan biridir. Bu bekat 1977-yil 6-noyabrda ochilgan. U Toshkent shahrining Yashnobod tumanida joylashgan. Bekat nomi yaqinidagi mashinasozlik zavodlari va sanoat hududlari nomidan olingan. Arxitekturasi sovet davri sanoat uslubida bo‘lib, soddaligi va amaliyoti bilan ajralib turadi. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7021598/2a0000018465f73943b1cbc0bae3a9b13307/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7725442/2a0000018465f74bde3cf990f06ff9446cf6/XXXL",
      ],
      videos: [
        {
          title: "Mashinasozlar",
          url: "https://youtu.be/C74E5tZ2iws?si=JZtQCG8eG8ByA0Gp",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/9742646/2a000001898b124cbcf45dd716306b05fc5d/XXXL",
        },

      ],
    },
    "Toshkent": {
      description: "Toshkent — Toshkent metrosining O'zbekiston yo‘nalishidagi bekatlaridan biridir. Bu bekat 1984-yil 6-noyabrda ochilgan. U Toshkent shahrining Yashnobod tumanida, temir yo‘l vokzali yaqinida joylashgan. Bekat nomi shahar nomidan olingan. Arxitekturasi sharqona va milliy uslubda bo‘lib, oq marmar va dekorativ naqshlar bilan bezatilgan. Platforma yer ostida joylashgan va vokzal bilan bog‘langan.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7730113/2a0000018465eca4f6db993705f8de1ff335/XXXL",
        "https://avatars.mds.yandex.net/get-altay/6382111/2a0000018465ec947088f5a16026ce0f2d75/XXXL",
      ],
      videos: [
        {
          title: "Toshkent",
          url: "https://youtu.be/F-uVioqXfUE?si=5rfJ1UJ0Bq3Z9Gdb",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7730813/2a0000018465ec6a77c80a5663c3691c1ac6/XXXL",
        },

      ],
    },
    "Oybek": {
      description: "Oybek — Toshkent metrosining O'zbekiston yo‘nalishidagi bekatlaridan biridir. Bu bekat 1984-yil 6-noyabrda ochilgan. U Toshkent shahrining Mirobod tumanida joylashgan. Bekat nomi o‘zbek yozuvchisi Oybek sharafiga qo‘yilgan. Arxitekturasi milliy uslubda bo‘lib, oq marmar ustunlar va geometrik naqshlar bilan bezatilgan. Platforma yer ostida joylashgan va Alisher Navoiy bekati bilan o‘tish yo‘liga ega.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/14209766/2a00000193b50fa3d3b11fd30c258a57c0a4/XXXL",
        "https://avatars.mds.yandex.net/get-altay/5534173/2a0000018465c09a83a494037c354dae3542/XXXL",
      ],
      videos: [
        {
          title: "Oybek",
          url: "https://youtu.be/2J6SKfAquT8?si=qu0r6QtyqY8B7iYc",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7979597/2a0000018465c0895e863024efdbbde075d9/XXXL",
        },

      ],
    },
    "Kosmonavtlar": {
      description: "Kosmonavtlar — Toshkent metrosining O'zbekiston yo‘nalishidagi bekatlaridan biridir. Bu bekat 1984-yil 6-noyabrda ochilgan. U Toshkent shahrining Shayxontohur tumanida joylashgan. Bekat nomi kosmonavtika mavzusiga bag‘ishlangan. Arxitekturasi koinot uslubida bo‘lib, devorlarida sayyoralar, yulduzlar va kosmonavtlar tasvirlari bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun keng va qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/15502563/2a000001964a6bcbb4ff89d01af857ef45a1/XXXL",
        "https://avatars.mds.yandex.net/get-altay/15467240/2a0000019678ae10613ae73b7865328dbf2e/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13525210/2a000001964a6d1c2d7abc2032e496636f01/XXXL",
      ],
      videos: [
        {
          title: "Kosmonavtlar",
          url: "https://youtu.be/rKMT8OGs6X4?si=RQmEqMzgNfsdvLQb",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/15251163/2a000001964a6d56b063df2b62347ef41826/XXXL",
        },

      ],
    },
    "O'zbekiston": {
      description: "O'zbekiston — Toshkent metrosining O'zbekiston yo‘nalishidagi markaziy bekatlaridan biridir. Bu bekat 1984-yil 6-noyabrda ochilgan. U Toshkent shahrining Shayxontohur tumanida joylashgan. Bekat nomi mamlakat nomidan olingan. Arxitekturasi milliy va zamonaviy uslub uyg‘unligida bezatilgan bo‘lib, oq marmar va dekorativ panellar bilan ajralib turadi. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay sharoitlarga ega.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/8133749/2a0000018465648d17a64a902b0d4b42915f/XXXL",
        "https://avatars.mds.yandex.net/get-altay/10767436/2a000001924eee22c0844cf86a504c028e02/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7754763/2a0000018465647ed421f44bf99d7ac9345a/XXXL",
      ],
      videos: [
        {
          title: "O'zbekiston",
          url: "https://youtu.be/IvVE03PWN6I?si=0eIiumzjxEPLmnst",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/8075227/2a000001846564186351a94f0d2e30425132/XXXL",
        },

      ],
    },
    "Hamid Olimjon": {
      description: "Hamid Olimjon — Toshkent metrosining O'zbekiston yo‘nalishidagi bekatlaridan biridir. Bu bekat 1989-yil 6-noyabrda ochilgan. U Toshkent shahrining Mirobod tumanida joylashgan. Bekat nomi o‘zbek shoiri Hamid Olimjon sharafiga qo‘yilgan. Arxitekturasi Sharqona uslubda bo‘lib, rang-barang naqshlar va marmar panellar bilan bezatilgan. Platforma yer ostida joylashgan va keng yoritish tizimiga ega.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7659180/2a000001845fac91bb56294e91488bf77606/XXXL",
        "https://avatars.mds.yandex.net/get-altay/6409878/2a000001845fad5d8ac9becf545b76e9e021/XXXL",
      ],
      videos: [
        {
          title: "Hamid Olimjon",
          url: "https://youtu.be/ZgnqW7qbp5g?si=VyLWyKF541cYcgoL",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/13805978/2a000001924e559efe9df202f6968074b81b/XXXL",
        },

      ],
    },
    "Mingo'rik": {
      description: "Ming O'rik — Toshkent metrosining Yunusobod yo‘nalishidagi bekatlaridan biridir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Mirobod tumanida joylashgan. Bekat nomi yaqin hududdagi Ming O‘rik bozori nomidan olingan. Arxitekturasi zamonaviy bo‘lib, yorqin rangli bezaklar va minimal dizayn bilan ajralib turadi. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/5255911/2a00000184663d83937b6eaf897e3fa6ddcd/XXXL",
        "https://avatars.mds.yandex.net/get-altay/6143287/2a00000184663e86dad9802fa8db614fb95c/XXXL",
      ],
      videos: [
        {
          title: "Ming O'rik",
          url: "https://youtu.be/c2nn2AZTNao?si=WC8ynbTeaMjF63Ne",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7779554/2a00000184663d73c552169d518cfa11b7e6/XXXL",
        },

      ],
    },
    "Yunus Rajabiy": {
      description: "Yunus Rajabiy — Toshkent metrosining Yunusobod yo‘nalishidagi bekatlaridan biridir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Shayxontohur tumanida joylashgan. Bekat nomi mashhur bastakor Yunus Rajabiy sharafiga qo‘yilgan. Arxitekturasi musiqiy mavzuga mos bo‘lib, devorlarida notalar va sharqona naqshlar tasvirlangan. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/13212052/2a0000018fee6ddd506ad4f9589e972bb912/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13793720/2a00000191d0a6d07cb364ece109ab953574/XXXL",
      ],
      videos: [
        {
          title: "Yunus Rajabiy",
          url: "https://youtu.be/rEqMYnEBfRE?si=mQ0VwreEjqFE7tfx",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7730813/2a0000018466584826f6ce3921100b176969/XXXL",
        },

      ],
    },
    "Shahriston": {
      description: "Shahriston — Toshkent metrosining Yunusobod yo‘nalishidagi bekatlaridan biridir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Yunusobod tumanida joylashgan. Bekat nomi qadimiy shahriston hududi nomidan olingan. Arxitekturasi milliy va zamonaviy uslub uyg‘unligida bo‘lib, oq marmar va geometrik naqshlar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7754763/2a0000018467039b35ca6b3fb21af9ae15d5/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13237301/2a000001924aff8249b66035fbb7ea59525c/XXXL",
      ],
      videos: [
        {
          title: "Shahriston",
          url: "https://youtu.be/8bt4aJfWb0U?si=FkYrlsKjihX2_u5a",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/14092818/2a000001932c58dac61c2750c15b1c9bfc10/XXXL",
        },

      ],
    },
    "Bodomzor": {
      description: "Bodomzor — Toshkent metrosining Yunusobod yo‘nalishidagi bekatlaridan biridir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Yunusobod tumanida joylashgan. Bekat nomi hududdagi Bodomzor mahallasi nomidan olingan. Arxitekturasi zamonaviy uslubda bo‘lib, yorqin yoritish va marmar panellar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/6545454/2a0000018466c96cf7ce869c222beb0eb1d1/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7695774/2a0000018466c95276d2c6f12b7ee5b1ec51/XXXL",
      ],
      videos: [
        {
          title: "Bodomzor",
          url: "https://youtu.be/ei7tRoTdBVU?si=jOp6Z7tfR-9imoBs",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/6236655/2a0000018466c8c4b166e8c0a1b6897d5d99/XXXL",
        },

      ],
    },
    "Minor": {
      description: "Minor — Toshkent metrosining Yunusobod yo‘nalishidagi bekatlaridan biridir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Shayxontohur tumanida joylashgan. Bekat nomi Minor masjidi va shu hudud nomidan olingan. Arxitekturasi milliy va diniy uslub uyg‘unligida bo‘lib, oq marmar va sharqona naqshlar bilan bezatilgan. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/15270672/2a0000019737bb9e6e9ee9012b8472098816/XXXL",
        "https://avatars.mds.yandex.net/get-altay/16418365/2a0000019737bc074905a8d6b75a703db5d4/XXXL",
      ],
      videos: [
        {
          title: "Minor",
          url: "https://youtu.be/sR5N2BrzR7o?si=O9Smo436MYobC_Vw",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/15510144/2a00000196ab7abfd2ca2b59bcd9b172cc7f/XXXL",
        },

      ],
    },
    "Turkiston": {
      description: "Turkiston — Toshkent metrosining Yunusobod yo‘nalishidagi bekatlaridan biridir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Yunusobod tumanida joylashgan. Bekat nomi Turkiston saroyi va hudud nomidan olingan. Arxitekturasi zamonaviy bo‘lib, dekorativ panellar va yengil yoritish elementlari bilan ajralib turadi. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/13220782/2a000001924e6136705a4c5fe4d5b4fd15c3/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7779554/2a000001846757ed6c0107a7367e9fd8875a/XXXL",
      ],
      videos: [
        {
          title: "Turkiston",
          url: "https://youtu.be/oEJJJyC_7G4?si=7x1AvFtafJlpD3pl",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7650129/2a0000018467582c9184a711d9c84fb59691/XXXL",
        },

      ],
    },
    "Yunusobod": {
      description: "Yunusobod — Toshkent metrosining Yunusobod yo‘nalishidagi shimoliy oxirgi bekatidir. Bu bekat 2001-yil 24-oktabrda ochilgan. U Toshkent shahrining Yunusobod tumanida joylashgan. Bekat nomi tumanning nomidan olingan. Arxitekturasi zamonaviy va minimal uslubda bo‘lib, oq marmar panellar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7668046/2a000001846727423ee1794c2a177b208f5f/XXXL",
        "https://avatars.mds.yandex.net/get-altay/6409878/2a0000018467279123379d2310acae61f96c/XXXL",
      ],
      videos: [
        {
          title: "Yunusobod",
          url: "https://youtu.be/wPfdsohphs0?si=JCBLwwy41z4A_wUO",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7723428/2a0000018467279ccc909f4e3f70e5358af3/XXXL",
        },

      ],
    },
    "Tuzel": {
      description: "Tuzel — Toshkent metrosining Sergeli yo‘nalishidagi bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Sergeli tumanida joylashgan. Bekat nomi Tuzel mahallasi nomidan olingan. Arxitekturasi zamonaviy bo‘lib, yengil ranglar va minimalistik bezaklardan foydalanilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay sharoitlarga ega.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/13996387/2a0000019255c3a2458221f3064754fa668b/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13941727/2a0000019255c4743e95827ec3d4b3406524/XXXL",
      ],
      videos: [
        {
          title: "Tuzel",
          url: "https://youtu.be/niWfFKkG7-M?si=3M2OaN6Z2TD7ID55",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/14105192/2a0000019255c45918226e7a1c21a988e2cd/XXXL",
        },

      ],
    },
    "Yashnobod": {
      description: "Yashnobod — Toshkent metrosining Yunusobod yo‘nalishidagi bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Yashnobod tumanida joylashgan. Bekat nomi tuman nomidan olingan. Arxitekturasi zamonaviy bo‘lib, oq marmar va yengil ranglar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/4398559/2a000001846a6f2035517e387ce20c57c18b/XXXL",
        "https://avatars.mds.yandex.net/get-altay/11300692/2a0000019255bf156ea3b1c4ecd970a0a367/XXXL",
      ],
      videos: [
        {
          title: "Yashnobod",
          url: "https://youtu.be/ndRrDZ-hFoo?si=qCo-nsek8Yx1y_AU",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/6197788/2a000001846a6f2cf60ba41c6d98e0eed343/XXXL",
        },

      ],
    },
    "Texnopark": {
      description: "Texnopark — Toshkent metrosining Yunusobod yo‘nalishidagi bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Yunusobod tumanida, Texnopark sanoat hududi yaqinida joylashgan. Bekat nomi shu hududdagi texnoparkdan olingan. Arxitekturasi zamonaviy, minimalistik va sanoat ruhidagi dizaynga ega. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/11873493/2a0000019255b48b62887656e0949414b256/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13289089/2a000001924ae055174bc3dfe9dd0f9c9778/XXXL",
      ],
      videos: [
        {
          title: "Texnopark",
          url: "https://youtu.be/MdMn01MUe-4?si=6frGVCU_SMEdOAoU",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/14092818/2a0000019255b4eb9a89bbe319dded949e24/XXXL",
        },

      ],
    },
    "Do'stlik-2": {
      description: "Do'stlik-2 — Toshkent metrosining Sergeli yo‘nalishidagi bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Yakkasaroy tumanida joylashgan. Bekat nomi Do‘stlik bekati bilan parallel joylashgan yangi liniya bog‘lanish nuqtasi sifatida tanlangan. Arxitekturasi zamonaviy va minimalistik uslubda bo‘lib, oq rangli panellar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7690462/2a000001846a40808e26603340efa1c1dc27/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7725442/2a000001846a4071ce8226d9575d0c6bb860/XXXL",
      ],
      videos: [
        {
          title: "Do'stlik-2",
          url: "https://youtu.be/cie6e8kRIFg?si=D1o-Sub38vPQZUXt",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/6506385/2a000001846a4079b2b21a361ad158008038/XXXL",
        },

      ],
    },
    "Sergeli": {
      description: "Sergeli — Toshkent metrosining Sergeli yo‘nalishidagi markaziy bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Sergeli tumanida joylashgan. Bekat nomi Sergeli tumani nomidan olingan. Arxitekturasi zamonaviy bo‘lib, yengil rangli panellar va yorqin yoritish bilan ajralib turadi. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/15266990/2a00000197be87370154d38c3248f0fffd17/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13220782/2a000001924dbf932ef458fcd4d9340b8ed0/XXXL",
      ],
      videos: [
        {
          title: "Sergeli",
          url: "https://youtu.be/Bpy9csSkl_A?si=ZYaZZx2QRlPhP1J_",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7044542/2a00000184627c9b86e33b428345eb32e8e4/XXXL",
        },

      ],
    },
    "Choshtepa": {
      description: "Choshtepa — Toshkent metrosining Sergeli yo‘nalishidagi bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Sergeli tumanida joylashgan. Bekat nomi Choshtepa hududi nomidan olingan. Arxitekturasi zamonaviy bo‘lib, yengil rangli panellar va minimalistik dizayn bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/14920258/2a00000197be85cfbb3c7ac50fb19ac2314b/XXXL",
        "https://avatars.mds.yandex.net/get-altay/217470/2a000001882a2dbfee0dc58bfd52181434ea/XXXL",
      ],
      videos: [
        {
          title: "Choshtepa",
          url: "https://youtu.be/c6eVSdJqI04?si=GCLeQbLupxAoohHZ",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/10812438/2a00000189b4a41e8d459b8b53ccb638f6f4/XXXL",
        },

      ],
    },
    "Turon": {
      description: "Turon — Toshkent metrosining Sergeli yo‘nalishidagi bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Sergeli tumanida joylashgan. Bekat nomi qadimiy Turkiston hududi tarixidan ilhomlangan. Arxitekturasi zamonaviy uslubda bo‘lib, oq marmar va geometrik naqshlar bilan ishlangan. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/14712641/2a00000195fcacf62e41ee41e9077147b7fd/XXXL",
        "https://avatars.mds.yandex.net/get-altay/14563476/2a0000019255fe93bfd855a3d6bfc6d82789/XXXL",
      ],
      videos: [
        {
          title: "Turon",
          url: "https://youtu.be/RguMOtIA2iU?si=0j5joYEe_5qWmu2T",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/12728107/2a0000019255fdeaa2a32466488476cdf583/XXXL",
        },

      ],
    },
    "Chinor": {
      description: "Chinor — Toshkent metrosining Sergeli yo‘nalishidagi bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Sergeli tumanida joylashgan. Bekat nomi Chinor daraxtlari va shu hudud nomidan olingan. Arxitekturasi sodda va zamonaviy bo‘lib, yengil ranglar va toza dizayn bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/13671440/2a0000019362c6a78b0e590b7ce6b90a0db9/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13530753/2a000001924dc2554f209279eea3b765ec49/XXXL",
      ],
      videos: [
        {
          title: "Chinor",
          url: "https://youtu.be/g9YRkCqnrNs?si=dPX--JxxYtWR0jvF",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/14097168/2a00000192b6037bf266de66398edccc986c/XXXL",
        },

      ],
    },
    "Yangiobod": {
      description: "Yangiobod — Toshkent metrosining Sergeli yo‘nalishidagi bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Sergeli tumanida joylashgan. Bekat nomi Yangiobod hududi nomidan olingan. Arxitekturasi zamonaviy va minimalistik uslubda bo‘lib, oq ranglar bilan bezatilgan. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/8133749/2a000001846a93f446a416d9f5a633e5ce84/XXXL",
        "https://avatars.mds.yandex.net/get-altay/13200126/2a0000019255d1b84aebb3cc31a4f8c2afef/XXXL",
      ],
      videos: [
        {
          title: "Yangiobod",
          url: "https://youtu.be/W8uDkmGwQ5E?si=5uy04bWuVDn6GA1T",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/5102477/2a000001846a93f40c2490f6fe830e41d3d7/XXXL",
        },

      ],
    },
    "Rohat": {
      description: "Rohat — Toshkent metrosining Sergeli yo‘nalishidagi bekatlaridan biridir. Bu bekat 2020-yil 26-dekabrda ochilgan. U Toshkent shahrining Sergeli tumanida joylashgan. Bekat nomi Rohat mahallasi va shu hududdan olingan. Arxitekturasi sodda, zamonaviy uslubda bo‘lib, marmar panellar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/10376970/2a0000018dea2d6d8b03544f15203b237068/XXXL",
        "https://avatars.mds.yandex.net/get-altay/14021276/2a0000019255ccfa9d4695019ff8b0b497da/XXXL",
      ],
      videos: [
        {
          title: "Rohat",
          url: "https://youtu.be/mgSAQceblYA?si=yhtcjpqGLBkQFDxy",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/11395962/2a0000018dea2f3a604b15b3501674b9c6a4/XXXL",
        },

      ],
    },
    "O'zgarish": {
      description: "O'zgarish — Toshkent metrosining Yangihayot yo‘nalishidagi bekatlaridan biridir. Bu bekat 2024-yil ochilgan. U Toshkent shahrining Yangihayot tumanida joylashgan. Bekat nomi yangilanish va rivojlanish ma’nosini anglatadi. Arxitekturasi zamonaviy, yorqin ranglar va minimalistik panellar bilan bezatilgan. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/13671691/2a000001925b9313abe9a31b08f1377d05be/XXXL",
        "https://avatars.mds.yandex.net/get-altay/14193233/2a000001925b93384130bc4ae1ecc1128ec2/XXXL",
      ],
      videos: [
        {
          title: "O'zgarish",
          url: "https://youtu.be/NMSDOjNywR8?si=LuHMZztErYQDeYwx",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/14782168/2a00000197be8698014a1eed52d6f675640c/XXXL",
        },

      ],
    },
    "Yangihayot": {
      description: "Yangihayot — Toshkent metrosining Yangihayot yo‘nalishidagi bekatlaridan biridir. Bu bekat 2024-yil ochilgan. U Toshkent shahrining Yangihayot tumanida joylashgan. Bekat nomi tumanning nomidan olingan. Arxitekturasi zamonaviy bo‘lib, oq marmar va geometrik naqshlar bilan ishlangan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/15045776/2a0000019690320e6482a5c1527c6e69c8e7/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7740052/2a000001846280560d176f65c8e12fe57816/XXXL",
      ],
      videos: [
        {
          title: "Yangihayot",
          url: "https://youtu.be/kDUxjRzWbiw?si=4c4tUqOahLQfkMkz",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/11277832/2a000001924dc0ff0ea60b3ff0c4f9a8c5ac/XXXL",
        },

      ],
    },
    "Qo'yliq": {
      description: "Qo'yliq — Toshkent metrosining Yangihayot yo‘nalishidagi bekatlaridan biridir. Bu bekat 2024-yil ochilgan. U Toshkent shahrining Sergeli va Yangihayot tumanlari chegarasida joylashgan. Bekat nomi Qo‘ylik bozori va hududi nomidan olingan. Arxitekturasi sodda va zamonaviy bo‘lib, yengil ranglar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/13200126/2a0000019255d71bd28d1b9f12228e78bcdb/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7631548/2a000001846ab4bb7380734336148f8f1084/XXXL",
      ],
      videos: [
        {
          title: "Qo'yliq",
          url: "https://youtu.be/pm2mbJWfPEI?si=zjO6SAI2jC-Z_ndO",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7649870/2a000001846ab4afdecb0e576d5d0c3fc169/XXXL",
        },

      ],
    },
    "Matonat": {
      description: "Matonat — Toshkent metrosining Yangihayot yo‘nalishidagi bekatlaridan biridir. Bu bekat 2024-yil ochilgan. U Toshkent shahrining Yangihayot tumanida joylashgan. Bekat nomi matonat — jasorat va chidamlilik ma’nosini anglatadi. Arxitekturasi zamonaviy, oq marmar va dekorativ elementlar bilan bezatilgan. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://www.gazeta.uz/media/img/2023/04/exmUM516824062463145_l.jpg",
        "https://www.spot.uz/media/img/2023/02/SOjwTx16758521378598_l.jpg",
      ],
      videos: [
        {
          title: "Matonat",
          url: "https://youtu.be/RrbJZiGShr4?si=TY4S4usdKTA-BFMZ",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/13994056/2a0000019255e1e4e08e9083c26f5d570d26/XXXL",
        },

      ],
    },
    "Qiyot": {
      description: "Qiyot — Toshkent metrosining Yangihayot yo‘nalishidagi bekatlaridan biridir. Bu bekat 2024-yil ochilgan. U Toshkent shahrining Yangihayot tumanida joylashgan. Bekat nomi qadimiy Qiyot hududi nomidan olingan. Arxitekturasi zamonaviy va minimalistik bo‘lib, yengil ranglar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/13078542/2a000001925b8e2ca599bce8641233c75c11/XXXL",
        "https://avatars.mds.yandex.net/get-altay/14105192/2a000001924ad136754719ba88fb34093dfb/XXXL",
      ],
      videos: [
        {
          title: "Qiyot",
          url: "https://youtu.be/Hyd80yl3TLE?si=ZZPPct23IDLHONwW",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/11375099/2a0000018ea4993c07745728105188975d53/XXXL",
        },

      ],
    },
    "Tolariq": {
      description: "Tolariq — Toshkent metrosining Yangihayot yo‘nalishidagi bekatlaridan biridir. Bu bekat 2024-yil ochilgan. U Toshkent shahrining Yangihayot tumanida joylashgan. Bekat nomi Tolariq hududi nomidan olingan. Arxitekturasi zamonaviy bo‘lib, oq rangli panellar va geometrik naqshlar bilan ishlangan. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/13906970/2a0000019255e92babed8c7ced6d3044ebd3/XXXL",
        "https://avatars.mds.yandex.net/get-altay/6264381/2a0000018df06deadc8e79c6485e7eff1974/XXXL",
      ],
      videos: [
        {
          title: "Tolariq",
          url: "https://youtu.be/WR4KXjQk0zs?si=68JhO90vMfX0Iefl",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/14014620/2a0000019255e87bb6f500bf25e9f23b8bb2/XXXL",
        },

      ],
    },
    "Xonobod": {
      description: "Xonabod — Toshkent metrosining Yangihayot yo‘nalishidagi bekatlaridan biridir. Bu bekat 2024-yil ochilgan. U Toshkent shahrining Yangihayot tumanida joylashgan. Bekat nomi Xonobod mahallasi va tarixiy nomdan olingan. Arxitekturasi zamonaviy va milliy uslub uyg‘unligida bo‘lib, oq marmar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/14402637/2a0000019484a602880393fb14709d5ecbe8/XXXL",
        "https://avatars.mds.yandex.net/get-altay/14190752/2a0000019255ecf6a2828ace5ac461c418d6/XXXL",
      ],
      videos: [
        {
          title: "Xonabod",
          url: "https://youtu.be/IwjSxhmZ8hU?si=AwQTFP6U_B7Jxa5g",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/14090927/2a0000019255ed7b1536b5bbd8915a05ffd6/XXXL",
        },

      ],
    },
    "Quruvchilar": {
      description: "Quruvchilar — Toshkent metrosining Yangihayot yo‘nalishidagi bekatlaridan biridir. Bu bekat 2024-yil ochilgan. U Toshkent shahrining Yangihayot tumanida joylashgan. Bekat nomi quruvchilar mehnati sharafiga qo‘yilgan. Arxitekturasi zamonaviy, minimal dizayn va yorqin yoritish elementlariga ega. Platforma yer ostida joylashgan va keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/12594216/2a00000192b601da173d4cfe69c9b0d4466b/XXXL",
        "https://avatars.mds.yandex.net/get-altay/7186075/2a00000187e2794af74e49002f96797f4c79/XXXL",
      ],
      videos: [
        {
          title: "Quruvchilar",
          url: "https://youtu.be/vBsO6MmbDXg?si=IhtWdB7dlMe6-7BV",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/14010724/2a0000019255f2307d3171645a03de9cc77f/XXXL",
        },

      ],
    },
    "Olmos": {
      description: "Olmos — Toshkent metrosining Yangihayot yo‘nalishidagi bekatlaridan biridir. Bu bekat 2024-yil ochilgan. U Toshkent shahrining Yangihayot tumanida joylashgan. Bekat nomi qimmatbaho tosh — olmos nomidan olingan. Arxitekturasi zamonaviy va yorqin ranglar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun qulay.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/7650129/2a000001846a85f2df770e8bf2b917eaef60/XXXL",
        "https://avatars.mds.yandex.net/get-altay/15181550/2a000001952e662ad611cf929eac6cc3143e/XXXL",
      ],
      videos: [
        {
          title: "Olmos",
          url: "https://youtu.be/QLO3Y3KyVIQ?si=GhFp2kImUa7UdEeN",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/7659180/2a000001846a85f1187f07b4d1d9ae4844ce/XXXL",
        },

      ],
    },
    "Amir Temur xiyoboni": {
      description: "Amir Temur xiyoboni — Toshkent metrosining Yunusobod yo‘nalishidagi markaziy bekatlaridan biridir. Bu bekat 1977-yil 6-noyabrda ochilgan. U Toshkent shahrining Shayxontohur tumanida, Amir Temur xiyoboni markazida joylashgan. Bekat nomi buyuk sarkarda Amir Temur sharafiga qo‘yilgan. Arxitekturasi milliy va tarixiy uslub uyg‘unligida bo‘lib, marmar ustunlar va sharqona naqshlar bilan bezatilgan. Platforma yer ostida joylashgan va yo‘lovchilar uchun keng.",
      images: [
        "https://avatars.mds.yandex.net/get-altay/8133749/2a000001845fc8c5befda746edd690f561b4/XXXL",
        "https://avatars.mds.yandex.net/get-altay/6998076/2a000001845fc8a88b7b765584f26896fef5/XXXL",
      ],
      videos: [
        {
          title: "Amir Temur xiyoboni",
          url: "https://youtu.be/fjvAqxfS_zI?si=0cyRB42vPyMJU5rm",
          thumbnail: "https://avatars.mds.yandex.net/get-altay/8093564/2a0000018951f26182537abcd7ca07e2c8f5/XXXL",
        },

      ],
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
    setRouteAnimationProgress(0)

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

      // Set the route and start animation
      setCurrentRoute(route)
      setIsAnimatingRoute(true)

      // Animate route drawing
      const animationDuration = 2000 // 2 seconds
      const steps = 60
      const stepDuration = animationDuration / steps

      for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
          setRouteAnimationProgress(i / steps)
          if (i === steps) {
            setIsAnimatingRoute(false)
          }
        }, i * stepDuration)
      }
    }

    setIsCalculatingRoute(false)
  }, [fromStation, toStation, findRoute, stations])

  // Clear route
  const clearRoute = useCallback(() => {
    setCurrentRoute([])
    setRouteInfo(null)
    setFromStation("")
    setToStation("")
    setRouteAnimationProgress(0)
    setIsAnimatingRoute(false)
  }, [])

  const handleZoomIn = () => {
    setTransform((prev) => ({ ...prev, scale: Math.min(prev.scale * 1.2, 5) }))
  }

  const handleZoomOut = () => {
    setTransform((prev) => ({ ...prev, scale: Math.max(prev.scale / 1.2, 0.3) }))
  }

  const handleReset = () => {
    setTransform({ x: 0, y: 0, scale: isMobile ? 0.8 : 1 })
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setShowModal(false) // Close modal when entering fullscreen
    if (!isFullscreen) {
      setTransform({ x: 0, y: 0, scale: isMobile ? 0.5 : 0.6 }) // Start with smaller scale to see more of the map
    } else {
      setTransform({ x: 0, y: 0, scale: isMobile ? 0.8 : 1 })
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

  // Video player functions
  const openVideoPlayer = (video) => {
    setCurrentVideo(video)
    setShowVideoPlayer(true)
    setIsVideoPlaying(false)
  }

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false)
    setCurrentVideo(null)
    setIsVideoPlaying(false)
  }

  // Get station details with fallback
  const getStationDetails = (stationName) => {
    const station = stations[stationName]
    const details = stationDetails[stationName]
    return {
      ...station,
      description:
        details?.description ||
        `${station?.nameUz} stansiyasi Toshkent metropoliteni tizimining muhim qismi bo'lib, har kuni minglab yo'lovchilarga xizmat ko'rsatadi va shaharning turli qismlarini bog'laydi.`,
      images: details?.images || [
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(station?.nameUz + " 1")}`,
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(station?.nameUz + " 2")}`,
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(station?.nameUz + " 3")}`,
      ],
      videos: details?.videos || [
        {
          title: "Virtual tur",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        if (showVideoPlayer) {
          closeVideoPlayer()
        } else if (showImageViewer) {
          setShowImageViewer(false)
        } else if (showModal) {
          setShowModal(false)
        } else if (isFullscreen) {
          setIsFullscreen(false)
          setTransform({ x: 0, y: 0, scale: isMobile ? 0.8 : 1 })
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, showModal, showImageViewer, showVideoPlayer, isMobile])

  // Improved touch handling for mobile
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let lastTouchDistance = 0
    let lastTouchCenter = { x: 0, y: 0 }

    const getTouchDistance = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const getTouchCenter = (touches) => {
      return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2,
      }
    }

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
      } else if (e.touches.length === 2) {
        // Pinch zoom start
        lastTouchDistance = getTouchDistance(e.touches)
        lastTouchCenter = getTouchCenter(e.touches)
        setIsDragging(false)
      }
      e.preventDefault()
    }

    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0]
        const newX = touch.clientX - dragStart.x
        const newY = touch.clientY - dragStart.y
        setTransform((prev) => ({
          ...prev,
          x: newX,
          y: newY,
        }))
      } else if (e.touches.length === 2) {
        // Pinch zoom
        const distance = getTouchDistance(e.touches)
        const center = getTouchCenter(e.touches)

        if (lastTouchDistance > 0) {
          const scale = distance / lastTouchDistance
          const maxScale = isFullscreen ? 8 : 3
          const minScale = isFullscreen ? 0.2 : 0.3

          setTransform((prev) => ({
            ...prev,
            scale: Math.max(minScale, Math.min(maxScale, prev.scale * scale)),
            x: prev.x + (center.x - lastTouchCenter.x),
            y: prev.y + (center.y - lastTouchCenter.y),
          }))
        }

        lastTouchDistance = distance
        lastTouchCenter = center
      }
      e.preventDefault()
    }

    const handleTouchEnd = (e) => {
      setIsDragging(false)
      lastTouchDistance = 0
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
  }, [isDragging, dragStart, transform, isFullscreen])

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
      const minScale = isFullscreen ? 0.2 : 0.3
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
      <div className={`${isFullscreen ? "fixed inset-0 z-[9999] bg-white" : "w-full h-screen"} relative flex`}>
        {/* Route Planning Panel - Left Side */}
        {!isFullscreen && (
          <div
            className={`${showRoutePanel ? (isMobile ? "w-full" : "w-80 sm:w-96") : "w-0"} transition-all duration-300 ease-in-out overflow-hidden bg-white border-r border-gray-200 shadow-lg z-30 ${isMobile && showRoutePanel ? "absolute inset-0" : ""}`}
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
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
                        <Train className="w-5 h-5" />
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
                            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${index === 0
                                ? "bg-blue-100"
                                : index === currentRoute.length - 1
                                  ? "bg-red-100"
                                  : "bg-gray-50"
                              }`}
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

        {/* Route Panel Toggle Button */}
        {!isFullscreen && !isMobile && (
          <div
            className={`fixed top-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${showRoutePanel ? "left-72 sm:left-80" : "left-0"
              }`}
          >
            <Button
              onClick={() => setShowRoutePanel(!showRoutePanel)}
              className={`group ${showRoutePanel
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

        {/* Mobile Route Panel Toggle */}
        {!isFullscreen && isMobile && (
          <div className="fixed bottom-4 right-4 z-20">
            <Button
              onClick={() => setShowRoutePanel(!showRoutePanel)}
              className="bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
            >
              <Navigation className="w-6 h-6" />
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Back Button - Top Left */}
          <div className="absolute top-4 left-4 z-20">
            <Button
              onClick={goToHome}
              size={isMobile ? "default" : "lg"}
              className="bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-lg px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Bosh sahifa</span>
            </Button>
          </div>

          {/* Zoom Controls - Bottom Left */}
          {!showModal && (
            <div
              className={`absolute ${isMobile ? "bottom-20" : "bottom-4"} left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg flex ${isMobile ? "flex-row gap-2" : "flex-col gap-2"}`}
            >
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
              {!isMobile && (
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-700 font-medium">{Math.round(transform.scale * 100)}%</p>
                </div>
              )}
            </div>
          )}

          {/* Map Container */}
          <div
            ref={containerRef}
            className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${showModal && !isFullscreen && !isMobile ? "w-full lg:w-2/3" : "w-full"
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
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="20%" stopColor="#34D399" />
                  <stop offset="40%" stopColor="#6EE7B7" />
                  <stop offset="60%" stopColor="#A7F3D0" />
                  <stop offset="80%" stopColor="#FDE047" />
                  <stop offset="100%" stopColor="#FACC15" />
                </linearGradient>
                {/* Enhanced drop shadow filter */}
                <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="3" dy="3" stdDeviation="4" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Draw connections/lines with transparency when route is active */}
              {connections.map((connection, index) => {
                const fromStation = stations[connection.from]
                const toStation = stations[connection.to]
                if (!fromStation || !toStation) return null

                // Make lines transparent when route is being shown
                const opacity = currentRoute.length > 0 ? 0.3 : 1

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
                      opacity={opacity * 0.3}
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
                      opacity={opacity}
                    />
                  </g>
                )
              })}

              {/* Draw route lines with animation - Keep original colors */}
              {currentRoute.length > 1 &&
                currentRoute.map((station, index) => {
                  if (index === currentRoute.length - 1) return null
                  const fromStation = stations[station]
                  const toStation = stations[currentRoute[index + 1]]
                  if (!fromStation || !toStation) return null

                  // Calculate if this segment should be visible based on animation progress
                  const segmentProgress = (index + 1) / (currentRoute.length - 1)
                  const shouldShow = routeAnimationProgress >= segmentProgress
                  const segmentOpacity = shouldShow ? 1 : 0

                  // For partial segments at the animation edge
                  const isCurrentSegment =
                    routeAnimationProgress >= index / (currentRoute.length - 1) &&
                    routeAnimationProgress < segmentProgress
                  const partialProgress = isCurrentSegment
                    ? (routeAnimationProgress - index / (currentRoute.length - 1)) * (currentRoute.length - 1)
                    : 1

                  return (
                    <g key={`route-${index}`}>
                      {/* Route outer glow */}
                      <line
                        x1={fromStation.x}
                        y1={fromStation.y}
                        x2={toStation.x}
                        y2={toStation.y}
                        stroke="#10B981"
                        strokeWidth="16"
                        strokeLinecap="round"
                        opacity={segmentOpacity * 0.4}
                        strokeDasharray={isCurrentSegment ? `${partialProgress * 100}% 100%` : "none"}
                        style={{
                          transition: isAnimatingRoute ? "none" : "opacity 0.3s ease",
                        }}
                      />
                      {/* Route middle glow */}
                      <line
                        x1={fromStation.x}
                        y1={fromStation.y}
                        x2={toStation.x}
                        y2={toStation.y}
                        stroke="#34D399"
                        strokeWidth="12"
                        strokeLinecap="round"
                        opacity={segmentOpacity * 0.7}
                        strokeDasharray={isCurrentSegment ? `${partialProgress * 100}% 100%` : "none"}
                        style={{
                          transition: isAnimatingRoute ? "none" : "opacity 0.3s ease",
                        }}
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
                        opacity={segmentOpacity}
                        strokeDasharray={isCurrentSegment ? `${partialProgress * 100}% 100%` : "none"}
                        style={{
                          transition: isAnimatingRoute ? "none" : "opacity 0.3s ease",
                        }}
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
                        opacity={segmentOpacity * 0.8}
                        strokeDasharray={isCurrentSegment ? `${partialProgress * 100}% 100%` : "none"}
                        style={{
                          transition: isAnimatingRoute ? "none" : "opacity 0.3s ease",
                        }}
                      />
                    </g>
                  )
                })}

              {/* Draw stations with transparency when route is active */}
              {Object.entries(stations).map(([name, station]) => {
                const isSelected = selectedStation === name
                const isInRoute = currentRoute.includes(name)
                const isStartStation = currentRoute[0] === name
                const isEndStation = currentRoute[currentRoute.length - 1] === name

                // Make non-route stations transparent when route is active
                const stationOpacity = currentRoute.length > 0 && !isInRoute ? 0.4 : 1

                return (
                  <g key={name}>
                    {/* Station outer glow ring */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "25" : isInRoute ? "22" : "20"}
                      fill={isInRoute ? "#10B981" : lineColors[station.line]}
                      opacity={isSelected ? "0.4" : isInRoute ? "0.5" : stationOpacity * 0.2}
                    />
                    {/* Station outer ring */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "18" : isInRoute ? "16" : "15"}
                      fill={isInRoute ? "#10B981" : lineColors[station.line]}
                      opacity={isSelected ? "0.6" : isInRoute ? "0.6" : stationOpacity * 0.4}
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
                      opacity={stationOpacity}
                    />
                    {/* Station inner dot */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "9" : isInRoute ? "8" : "7"}
                      fill={isInRoute ? "#10B981" : lineColors[station.line]}
                      opacity={stationOpacity * 0.9}
                      className="cursor-pointer"
                      onClick={(e) => handleStationClick(name, e)}
                      style={{ touchAction: "manipulation" }}
                    />

                    {/* Special markers for start/end stations */}
                    {isStartStation && (
                      <circle cx={station.x} cy={station.y} r="4" fill="#10B981" className="animate-pulse" />
                    )}
                    {isEndStation && (
                      <circle cx={station.x} cy={station.y} r="4" fill="#FACC15" className="animate-pulse" />
                    )}

                    {/* Station name with enhanced styling and transparency */}
                    <text
                      x={station.x}
                      y={station.y - (isSelected ? 32 : isInRoute ? 30 : 28)}
                      textAnchor="middle"
                      className={`font-bold pointer-events-none ${isSelected ? "fill-blue-800" : isInRoute ? "fill-green-700" : "fill-gray-800"
                        }`}
                      style={{
                        fontSize: isSelected ? "16px" : isInRoute ? "15px" : isMobile ? "12px" : "14px",
                        textShadow: "2px 2px 4px rgba(255,255,255,0.9), -1px -1px 2px rgba(255,255,255,0.9)",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        opacity: stationOpacity,
                      }}
                    >
                      {station.nameUz}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Station Details Modal - Optimized for mobile */}
          {showModal && !isFullscreen && currentStationDetails && (
            <>
              {/* Mobile Backdrop */}
              <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowModal(false)} />

              {/* Modal Container */}
              <div
                className={`fixed z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
                  ${showModal ? "translate-x-0" : "translate-x-full"}
                  ${isMobile
                    ? "inset-y-0 left-0 right-0 bg-white"
                    : "inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/3 xl:w-2/5 bg-white shadow-2xl border-l border-gray-200"
                  }`}
              >
                {/* Modal Header */}
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

                {/* Modal Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Description */}
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl text-blue-900">
                        <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                        Tavsif
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-800 leading-relaxed text-sm sm:text-base">
                        {currentStationDetails.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Image Gallery - Optimized */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl text-blue-900">
                        <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                        Rasmlar
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="relative h-48 sm:h-64 lg:h-80 bg-gray-100 overflow-hidden">
                          <img
                            src={currentStationDetails.images[currentImageIndex] || "/placeholder.svg"}
                            alt={`${currentStationDetails.nameUz} ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => openImageViewer(currentImageIndex)}
                            loading="lazy"
                            style={{ imageRendering: "optimizeQuality" }}
                          />
                          {/* Carousel Controls */}
                          {currentStationDetails.images.length > 1 && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-blue-900/60 hover:bg-blue-900/80 text-white rounded-full w-8 h-8 sm:w-12 sm:h-12 backdrop-blur-sm"
                                onClick={prevImage}
                              >
                                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-blue-900/60 hover:bg-blue-900/80 text-white rounded-full w-8 h-8 sm:w-12 sm:h-12 backdrop-blur-sm"
                                onClick={nextImage}
                              >
                                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                              </Button>
                            </>
                          )}
                          {/* Image Counter */}
                          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-blue-900/60 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                            {currentImageIndex + 1} / {currentStationDetails.images.length}
                          </div>
                        </div>
                        {/* Thumbnail Strip - Optimized */}
                        {currentStationDetails.images.length > 1 && (
                          <div className="p-2 sm:p-4 bg-gray-50">
                            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                              {currentStationDetails.images.map((image, index) => (
                                <div
                                  key={index}
                                  className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-200 ${index === currentImageIndex
                                      ? "border-blue-900 scale-105 shadow-lg"
                                      : "border-blue-300 hover:border-blue-500"
                                    }`}
                                  onClick={() => setCurrentImageIndex(index)}
                                >
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Videos */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl text-blue-900">
                        <Play className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                        Video materiallar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:gap-4">
                        {currentStationDetails.videos.map((video, index) => (
                          <div
                            key={index}
                            className="relative bg-blue-50 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 group border border-blue-200"
                            onClick={() => openVideoPlayer(video)}
                          >
                            <div className="aspect-video relative">
                              <img
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-900 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors shadow-lg">
                                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                                </div>
                              </div>
                            </div>
                            <div className="p-3 sm:p-4 bg-white">
                              <h4 className="font-semibold text-blue-900 text-sm sm:text-base">{video.title}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bottom Padding */}
                <div className="h-4 sm:h-8"></div>
              </div>
            </>
          )}

          {/* Fullscreen Image Viewer - Optimized */}
          {showImageViewer && currentStationDetails && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="relative max-w-7xl max-h-full">
                <img
                  src={currentStationDetails.images[viewerImageIndex] || "/placeholder.svg"}
                  alt={`${currentStationDetails.nameUz} ${viewerImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ imageRendering: "optimizeQuality" }}
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

          {/* Video Player Modal */}
          {showVideoPlayer && currentVideo && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="relative w-full max-w-6xl max-h-full">
                <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                  {/* Video Header */}
                  <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-lg truncate">{currentVideo.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 rounded-full w-10 h-10 flex-shrink-0"
                        onClick={closeVideoPlayer}
                        type="button"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="aspect-video">
                    <iframe
                      ref={videoRef}
                      src={`${currentVideo.url}?enablejsapi=1&autoplay=1`}
                      title={currentVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
