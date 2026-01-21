"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMapQuery } from "@/store/services/api";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize,
  Navigation,
  Play,
  RotateCcw,
  Train,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function TashkentMetroMap() {
  const { data: stationDetails } = useMapQuery();
  const router = useRouter();
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Route planning states
  const [showRoutePanel, setShowRoutePanel] = useState(false);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [currentRoute, setCurrentRoute] = useState([]);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeAnimationProgress, setRouteAnimationProgress] = useState(0);
  const [isAnimatingRoute, setIsAnimatingRoute] = useState(false);

  // Responsive breakpoint detection
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Optimized station positions with better spacing for mobile
  const stations = {
    // Red Line (Chilonzor Line) - Optimized spacing
    "Olmazor": { x: 180, y: 1200, line: "red", nameUz: "Olmazor" },
    "Choshtepa": { x: 180, y: 1290, line: "red", nameUz: "Choshtepa" },
    "O'zgarish": { x: 180, y: 1350, line: "red", nameUz: "O'zgarish" },
    "Sergeli": { x: 180, y: 1410, line: "red", nameUz: "Sergeli" },
    "Yangihayot": { x: 180, y: 1470, line: "red", nameUz: "Yangihayot" },
    "Chinor": { x: 180, y: 1550, line: "red", nameUz: "Chinor" },
    "Chilonzor": { x: 180, y: 1100, line: "red", nameUz: "Chilonzor" },
    "Mirzo Ulugbek": { x: 180, y: 1000, line: "red", nameUz: "Mirzo Ulug'bek" },
    "Novza": { x: 180, y: 900, line: "red", nameUz: "Novza" },
    "Milliy bog'": { x: 250, y: 830, line: "red", nameUz: "Milliy bog'" },
    "Xalqlar do'stligi": {
      x: 330,
      y: 750,
      line: "red",
      nameUz: "Xalqlar do'stligi",
    },
    "Paxtakor": { x: 420, y: 670, line: "red", nameUz: "Paxtakor" },
    "Mustaqillik maydoni": {
      x: 570,
      y: 670,
      line: "red",
      nameUz: "Mustaqillik maydoni",
    },
    "Amir Temur xiyoboni": {
      x: 750,
      y: 670,
      line: "red",
      nameUz: "Amir Temur xiyoboni",
    },
    "Hamid Olimjon": { x: 950, y: 670, line: "red", nameUz: "Hamid Olimjon" },
    "Pushkin": { x: 950, y: 600, line: "red", nameUz: "Pushkin" },
    "Buyuk ipak yo'li": {
      x: 950,
      y: 530,
      line: "red",
      nameUz: "Buyuk ipak yo'li",
    },

    // Blue Line (O'zbekiston Line) - Optimized spacing
    "Beruniy": { x: 180, y: 200, line: "blue", nameUz: "Beruniy" },
    "Tinchlik": { x: 180, y: 320, line: "blue", nameUz: "Tinchlik" },
    "Chorsu": { x: 240, y: 420, line: "blue", nameUz: "Chorsu" },
    "G'afur G'ulom": { x: 300, y: 520, line: "blue", nameUz: "G'afur G'ulom" },
    "Alisher Navoiy": {
      x: 420,
      y: 620,
      line: "blue",
      nameUz: "Alisher Navoiy",
    },
    "O'zbekiston": { x: 420, y: 850, line: "blue", nameUz: "O'zbekiston" },
    "Kosmonavtlar": { x: 570, y: 850, line: "blue", nameUz: "Kosmonavtlar" },
    "Oybek": { x: 750, y: 850, line: "blue", nameUz: "Oybek" },
    "Toshkent": { x: 950, y: 850, line: "blue", nameUz: "Toshkent" },
    "Mashinasozlar": { x: 950, y: 950, line: "blue", nameUz: "Mashinasozlar" },
    "Do'stlik": { x: 950, y: 1050, line: "blue", nameUz: "Do'stlik" },

    // Green Line (Yunusobod Line) - Optimized spacing
    "Turkiston": { x: 750, y: 200, line: "green", nameUz: "Turkiston" },
    "Yunusobod": { x: 750, y: 270, line: "green", nameUz: "Yunusobod" },
    "Shahriston": { x: 750, y: 340, line: "green", nameUz: "Shahriston" },
    "Bodomzor": { x: 750, y: 410, line: "green", nameUz: "Bodomzor" },
    "Minor": { x: 750, y: 480, line: "green", nameUz: "Minor" },
    "Abdulla Qodiriy": {
      x: 750,
      y: 550,
      line: "green",
      nameUz: "Abdulla Qodiriy",
    },
    "Yunus Rajabiy": { x: 750, y: 620, line: "green", nameUz: "Yunus Rajabiy" },
    "Mingo'rik": { x: 750, y: 800, line: "green", nameUz: "Mingo'rik" },

    // Yellow Line (Sirg'ali Line) - Optimized spacing
    "Texnopark": { x: 950, y: 1100, line: "yellow", nameUz: "Texnopark" },
    "Yashnobod": { x: 950, y: 1170, line: "yellow", nameUz: "Yashnobod" },
    "Tuzel": { x: 950, y: 1240, line: "yellow", nameUz: "Tuzel" },
    "Olmos": { x: 950, y: 1310, line: "yellow", nameUz: "Olmos" },
    "Rohat": { x: 950, y: 1380, line: "yellow", nameUz: "Rohat" },
    "Yangiobod": { x: 950, y: 1450, line: "yellow", nameUz: "Yangiobod" },
    "Qo'yliq": { x: 950, y: 1550, line: "yellow", nameUz: "Qo'yliq" },
    "Matonat": { x: 850, y: 1550, line: "yellow", nameUz: "Matonat" },
    "Qiyot": { x: 750, y: 1550, line: "yellow", nameUz: "Qiyot" },
    "Tolariq": { x: 650, y: 1550, line: "yellow", nameUz: "Tolariq" },
    "Xonobod": { x: 550, y: 1550, line: "yellow", nameUz: "Xonobod" },
    "Quruvchilar": { x: 450, y: 1550, line: "yellow", nameUz: "Quruvchilar" },
    "Turon": { x: 350, y: 1550, line: "yellow", nameUz: "Turon" },
    "Qipchoq": { x: 250, y: 1550, line: "yellow", nameUz: "Qipchoq" },
  };

  // Station information with optimized image URLs

  const lineColors = {
    red: "#E53E3E",
    blue: "#0000fe",
    green: "#38A169",
    yellow: "#D69E2E",
  };

  const lineNames = {
    red: "Chilonzor yo'li",
    blue: "O'zbekiston yo'li",
    green: "Yunusobod yo'li",
    yellow: "Yer usti halqa yo'li",
  };

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
  ];

  // Route planning algorithm
  const findRoute = useCallback(
    (from, to) => {
      if (!from || !to || from === to) return [];

      // Build adjacency list from connections
      const graph = {};
      Object.keys(stations).forEach((station) => {
        graph[station] = [];
      });

      connections.forEach((conn) => {
        if (graph[conn.from] && graph[conn.to]) {
          graph[conn.from].push(conn.to);
          graph[conn.to].push(conn.from);
        }
      });

      // BFS to find shortest path
      const queue = [[from]];
      const visited = new Set([from]);

      while (queue.length > 0) {
        const path = queue.shift();
        const current = path[path.length - 1];

        if (current === to) {
          return path;
        }

        for (const neighbor of graph[current] || []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push([...path, neighbor]);
          }
        }
      }

      return [];
    },
    [connections, stations],
  );

  // Calculate route with animation
  const calculateRoute = useCallback(async () => {
    if (!fromStation || !toStation) return;

    setIsCalculatingRoute(true);
    setCurrentRoute([]);
    setRouteAnimationProgress(0);

    // Simulate calculation delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const route = findRoute(fromStation, toStation);

    if (route.length > 0) {
      // Calculate route info
      const transfers = [];
      let currentLine = stations[route[0]]?.line;

      for (let i = 1; i < route.length; i++) {
        const stationLine = stations[route[i]]?.line;
        if (stationLine !== currentLine) {
          transfers.push({
            station: route[i - 1],
            fromLine: currentLine,
            toLine: stationLine,
          });
          currentLine = stationLine;
        }
      }

      setRouteInfo({
        distance: route.length - 1,
        transfers: transfers.length,
        transferStations: transfers,
        estimatedTime: Math.ceil((route.length - 1) * 2 + transfers.length * 3),
      });

      // Set the route and start animation
      setCurrentRoute(route);
      setIsAnimatingRoute(true);

      // Animate route drawing
      const animationDuration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = animationDuration / steps;

      for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
          setRouteAnimationProgress(i / steps);
          if (i === steps) {
            setIsAnimatingRoute(false);
          }
        }, i * stepDuration);
      }
    }

    setIsCalculatingRoute(false);
  }, [fromStation, toStation, findRoute, stations]);

  // Clear route
  const clearRoute = useCallback(() => {
    setCurrentRoute([]);
    setRouteInfo(null);
    setFromStation("");
    setToStation("");
    setRouteAnimationProgress(0);
    setIsAnimatingRoute(false);
  }, []);

  const handleZoomIn = () => {
    setTransform((prev) => ({ ...prev, scale: Math.min(prev.scale * 1.2, 5) }));
  };

  const handleZoomOut = () => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(prev.scale / 1.2, 0.3),
    }));
  };

  const handleReset = () => {
    setTransform({ x: 0, y: 0, scale: isMobile ? 0.8 : 1 });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setShowModal(false); // Close modal when entering fullscreen
    if (!isFullscreen) {
      setTransform({ x: 0, y: 0, scale: isMobile ? 0.5 : 0.6 }); // Start with smaller scale to see more of the map
    } else {
      setTransform({ x: 0, y: 0, scale: isMobile ? 0.8 : 1 });
    }
  };

  // Navigate to home page
  const goToHome = () => {
    router.push("/");
  };

  // Handle station click
  const handleStationClick = (stationName, e) => {
    e.stopPropagation();
    if (!isFullscreen) {
      setSelectedStation(stationName);
      setShowModal(true);
      setCurrentImageIndex(0);
    }
  };

  // Video player functions
  const openVideoPlayer = (video) => {
    setCurrentVideo(video);
    setShowVideoPlayer(true);
    setIsVideoPlaying(false);
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
    setCurrentVideo(null);
    setIsVideoPlaying(false);
  };

  // Get station details with fallback
  const getStationDetails = (stationName) => {
    const station = stations[stationName];
    const details = stationDetails[stationName];
    return {
      ...station,
      description:
        details?.description ||
        `${station?.nameUz} stansiyasi Toshkent metropoliteni tizimining muhim qismi bo'lib, har kuni minglab yo'lovchilarga xizmat ko'rsatadi va shaharning turli qismlarini bog'laydi.`,
      images: details?.images || [
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
          station?.nameUz + " 1",
        )}`,
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
          station?.nameUz + " 2",
        )}`,
        `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
          station?.nameUz + " 3",
        )}`,
      ],
      videos: details?.videos,
    };
  };

  // Image carousel handlers
  const nextImage = () => {
    const details = getStationDetails(selectedStation);
    setCurrentImageIndex((prev) => (prev + 1) % details.images.length);
  };

  const prevImage = () => {
    const details = getStationDetails(selectedStation);
    setCurrentImageIndex(
      (prev) => (prev - 1 + details.images.length) % details.images.length,
    );
  };

  // Image viewer handlers
  const openImageViewer = (index) => {
    setViewerImageIndex(index);
    setShowImageViewer(true);
  };

  const nextViewerImage = () => {
    const details = getStationDetails(selectedStation);
    setViewerImageIndex((prev) => (prev + 1) % details.images.length);
  };

  const prevViewerImage = () => {
    const details = getStationDetails(selectedStation);
    setViewerImageIndex(
      (prev) => (prev - 1 + details.images.length) % details.images.length,
    );
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (showVideoPlayer) {
          closeVideoPlayer();
        } else if (showImageViewer) {
          setShowImageViewer(false);
        } else if (showModal) {
          setShowModal(false);
        } else if (isFullscreen) {
          setIsFullscreen(false);
          setTransform({ x: 0, y: 0, scale: isMobile ? 0.8 : 1 });
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, showModal, showImageViewer, showVideoPlayer, isMobile]);

  // Improved touch handling for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastTouchDistance = 0;
    let lastTouchCenter = { x: 0, y: 0 };

    const getTouchDistance = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getTouchCenter = (touches) => {
      return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2,
      };
    };

    const handleTouchStart = (e) => {
      // Don't start dragging if touching a station
      if (e.target.tagName === "circle") return;

      if (e.touches.length === 1) {
        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({
          x: touch.clientX - transform.x,
          y: touch.clientY - transform.y,
        });
      } else if (e.touches.length === 2) {
        // Pinch zoom start
        lastTouchDistance = getTouchDistance(e.touches);
        lastTouchCenter = getTouchCenter(e.touches);
        setIsDragging(false);
      }
      e.preventDefault();
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0];
        const newX = touch.clientX - dragStart.x;
        const newY = touch.clientY - dragStart.y;
        setTransform((prev) => ({
          ...prev,
          x: newX,
          y: newY,
        }));
      } else if (e.touches.length === 2) {
        // Pinch zoom
        const distance = getTouchDistance(e.touches);
        const center = getTouchCenter(e.touches);

        if (lastTouchDistance > 0) {
          const scale = distance / lastTouchDistance;
          const maxScale = isFullscreen ? 8 : 3;
          const minScale = isFullscreen ? 0.2 : 0.3;

          setTransform((prev) => ({
            ...prev,
            scale: Math.max(minScale, Math.min(maxScale, prev.scale * scale)),
            x: prev.x + (center.x - lastTouchCenter.x),
            y: prev.y + (center.y - lastTouchCenter.y),
          }));
        }

        lastTouchDistance = distance;
        lastTouchCenter = center;
      }
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      setIsDragging(false);
      lastTouchDistance = 0;
      e.preventDefault();
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragStart, transform, isFullscreen]);

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    },
    [transform],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setTransform((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const maxScale = isFullscreen ? 8 : 3;
      const minScale = isFullscreen ? 0.2 : 0.3;
      setTransform((prev) => ({
        ...prev,
        scale: Math.max(minScale, Math.min(maxScale, prev.scale * delta)),
      }));
    },
    [isFullscreen],
  );

  const currentStationDetails = selectedStation
    ? getStationDetails(selectedStation)
    : null;

  return (
    <>
      <div
        className={`${
          isFullscreen ? "fixed inset-0 z-[9999] bg-red-900" : "w-full h-screen"
        } relative flex`}
      >
        {/* Route Planning Panel - Left Side */}
        {!isFullscreen && (
          <div
            className={`${
              showRoutePanel ? (isMobile ? "w-full" : "w-80 sm:w-96") : "w-0"
            } transition-all duration-300 ease-in-out overflow-hidden bg-white border-r border-gray-200 shadow-lg z-30 ${
              isMobile && showRoutePanel ? "absolute inset-0" : ""
            }`}
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
              <div className="flex-1 p-4 space-y-6 overflow-y-auto ">
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
                      <option value="">Bekatni tanlang</option>
                      {Object.keys(stations)
                        .sort()
                        .map((station) => (
                          <option key={station} value={station}>
                            {stations[station].nameUz} (
                            {lineNames[stations[station].line]})
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
                        const temp = fromStation;
                        setFromStation(toStation);
                        setToStation(temp);
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
                      <option value="">Bekatni tanlang</option>
                      {Object.keys(stations)
                        .sort()
                        .map((station) => (
                          <option key={station} value={station}>
                            {stations[station].nameUz} (
                            {lineNames[stations[station].line]})
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
                  <Card className="border-0 shadow-md bg-transparent">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                        <Train className="w-5 h-5" />
                        Yo'nalish ma'lumotlari
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-blue-700">
                            {routeInfo.distance}
                          </div>
                          <div className="text-xs text-blue-600">Bekat</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-blue-700">
                            {routeInfo.estimatedTime}
                          </div>
                          <div className="text-xs text-blue-600">Daqiqa</div>
                        </div>
                      </div>

                      {routeInfo.transfers > 0 && (
                        <div className="p-3 bg-white rounded-lg">
                          <div className="text-sm font-medium text-blue-800 mb-2">
                            O'tish joylari ({routeInfo.transfers}):
                          </div>
                          {routeInfo.transferStations.map((transfer, index) => (
                            <div
                              key={index}
                              className="text-xs text-blue-700 flex items-center gap-2 mb-1"
                            >
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
                          >
                            <div className="flex flex-col items-center">
                              <div
                                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                style={{
                                  backgroundColor:
                                    lineColors[stations[station]?.line],
                                }}
                              />
                              {index < currentRoute.length - 1 && (
                                <div className="w-0.5 h-4 bg-gray-300 mt-1" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-800">
                                {stations[station]?.nameUz}
                              </div>
                              <div className="text-xs text-gray-500">
                                {lineNames[stations[station]?.line]}
                              </div>
                            </div>
                            {index === 0 && (
                              <Badge
                                variant="secondary"
                                className="bg-blue-200 text-blue-800 text-xs"
                              >
                                Boshlang'ich
                              </Badge>
                            )}
                            {index === currentRoute.length - 1 && (
                              <Badge
                                variant="secondary"
                                className="bg-red-200 text-red-800 text-xs"
                              >
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
        <div className="flex-1 relative ">
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
              className={`absolute ${
                isMobile ? "bottom-20" : "bottom-4"
              } left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg flex ${
                isMobile ? "flex-row gap-2" : "flex-col gap-2"
              }`}
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
                  <p className="text-xs text-gray-700 font-medium">
                    {Math.round(transform.scale * 100)}%
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Map Container */}
          <div
            ref={containerRef}
            className={`relative overflow-hidden  ${
              showModal && !isFullscreen && !isMobile
                ? "w-full lg:w-2/3"
                : "w-full"
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
                transition: isDragging
                  ? "none"
                  : "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <defs>
                {/* Enhanced gradients for lines */}
                <linearGradient
                  id="redGradient"
                  x1="100%"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="100%" stopColor="#E53E3E" />
                </linearGradient>
                <linearGradient id="blueGradient">
                  <stop offset="100%" stopColor="#0000fe" />
                </linearGradient>
                <linearGradient
                  id="greenGradient"
                  x1="100%"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="100%" stopColor="#38A169" />
                  <stop offset="100%" stopColor="#38A169" />
                  <stop offset="100%" stopColor="#38A169" />
                </linearGradient>
                <linearGradient
                  id="yellowGradient"
                  x1="100%"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#D69E2E" />
                  <stop offset="50%" stopColor="#D69E2E" />
                  <stop offset="100%" stopColor="#D69E2E" />
                </linearGradient>
                {/* Enhanced route gradient */}
                <linearGradient
                  id="routeGradient"
                  x1="100%"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="100%" stopColor="#38A169" />
                  <stop offset="100%" stopColor="#38A169" />
                  <stop offset="100%" stopColor="#38A169" />
                  <stop offset="100%" stopColor="#38A169" />
                  <stop offset="100%" stopColor="#38A169" />
                  <stop offset="100%" stopColor="#38A169" />
                </linearGradient>
                {/* Enhanced drop shadow filter */}
                <filter
                  id="dropshadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="3"
                    dy="3"
                    stdDeviation="4"
                    floodOpacity="0.4"
                  />
                </filter>
              </defs>

              {/* Draw connections/lines with transparency when route is active */}
              {connections.map((connection, index) => {
                const fromStation = stations[connection.from];
                const toStation = stations[connection.to];
                if (!fromStation || !toStation) return null;

                // Make lines transparent when route is being shown
                const opacity = currentRoute.length > 0 ? 0.3 : 1;

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
                      opacity={opacity * 0.5}
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
                      opacity={opacity * 0.5}
                    />
                  </g>
                );
              })}

              {/* Draw route lines with animation - Keep original colors */}
              {currentRoute.length > 1 &&
                currentRoute.map((station, index) => {
                  if (index === currentRoute.length - 1) return null;
                  const fromStation = stations[station];
                  const toStation = stations[currentRoute[index + 1]];
                  if (!fromStation || !toStation) return null;

                  // Calculate if this segment should be visible based on animation progress
                  const segmentProgress =
                    (index + 1) / (currentRoute.length - 1);
                  const shouldShow = routeAnimationProgress >= segmentProgress;
                  const segmentOpacity = shouldShow ? 1 : 0;

                  // For partial segments at the animation edge
                  const isCurrentSegment =
                    routeAnimationProgress >=
                      index / (currentRoute.length - 1) &&
                    routeAnimationProgress < segmentProgress;
                  const partialProgress = isCurrentSegment
                    ? (routeAnimationProgress -
                        index / (currentRoute.length - 1)) *
                      (currentRoute.length - 1)
                    : 1;

                  return (
                    <g key={`route-${index}`}>
                      {/* Route outer glow */}
                      <line
                        x1={fromStation.x}
                        y1={fromStation.y}
                        x2={toStation.x}
                        y2={toStation.y}
                        stroke="#38A169"
                        strokeWidth="16"
                        strokeLinecap="round"
                        opacity={segmentOpacity * 0.4}
                        strokeDasharray={
                          isCurrentSegment
                            ? `${partialProgress * 100}% 100%`
                            : "none"
                        }
                        style={{
                          transition: isAnimatingRoute
                            ? "none"
                            : "opacity 0.3s ease",
                        }}
                      />
                      {/* Route middle glow */}
                      <line
                        x1={fromStation.x}
                        y1={fromStation.y}
                        x2={toStation.x}
                        y2={toStation.y}
                        stroke="#38A169"
                        strokeWidth="12"
                        strokeLinecap="round"
                        opacity={segmentOpacity * 0.7}
                        strokeDasharray={
                          isCurrentSegment
                            ? `${partialProgress * 100}% 100%`
                            : "none"
                        }
                        style={{
                          transition: isAnimatingRoute
                            ? "none"
                            : "opacity 0.3s ease",
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
                        strokeDasharray={
                          isCurrentSegment
                            ? `${partialProgress * 100}% 100%`
                            : "none"
                        }
                        style={{
                          transition: isAnimatingRoute
                            ? "none"
                            : "opacity 0.3s ease",
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
                        strokeDasharray={
                          isCurrentSegment
                            ? `${partialProgress * 100}% 100%`
                            : "none"
                        }
                        style={{
                          transition: isAnimatingRoute
                            ? "none"
                            : "opacity 0.3s ease",
                        }}
                      />
                    </g>
                  );
                })}

              {/* Draw stations with transparency when route is active */}
              {Object.entries(stations).map(([name, station]) => {
                const isSelected = selectedStation === name;
                const isInRoute = currentRoute.includes(name);
                const isStartStation = currentRoute[0] === name;
                const isEndStation =
                  currentRoute[currentRoute.length - 1] === name;

                // Make non-route stations transparent when route is active
                const stationOpacity =
                  currentRoute.length > 0 && !isInRoute ? 0.4 : 1;

                return (
                  <g key={name}>
                    {/* Station outer glow ring */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "25" : isInRoute ? "22" : "20"}
                      fill={isInRoute ? "#38A169" : lineColors[station.line]}
                      opacity={
                        isSelected
                          ? "0.4"
                          : isInRoute
                            ? "0.5"
                            : stationOpacity * 0.2
                      }
                    />
                    {/* Station outer ring */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "18" : isInRoute ? "16" : "15"}
                      fill={isInRoute ? "#38A169" : lineColors[station.line]}
                      opacity={
                        isSelected
                          ? "0.6"
                          : isInRoute
                            ? "0.6"
                            : stationOpacity * 0.4
                      }
                    />
                    {/* Station main circle - Better touch target */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "15" : isInRoute ? "13" : "12"}
                      fill="white"
                      stroke={isInRoute ? "#38A169" : lineColors[station.line]}
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
                      fill={isInRoute ? "#38A169" : lineColors[station.line]}
                      opacity={stationOpacity * 0.9}
                      className="cursor-pointer"
                      onClick={(e) => handleStationClick(name, e)}
                      style={{ touchAction: "manipulation" }}
                    />

                    {/* Special markers for start/end stations */}
                    {isStartStation && (
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r="4"
                        fill="#38A169"
                        className="animate-pulse"
                      />
                    )}
                    {isEndStation && (
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r="4"
                        fill="#D69E2E"
                        className="animate-pulse"
                      />
                    )}

                    {/* Station name with enhanced styling and transparency */}
                    <text
                      x={station.x}
                      y={station.y - (isSelected ? 32 : isInRoute ? 30 : 20)}
                      textAnchor="middle"
                      className={`font-bold pointer-events-none ${
                        isSelected
                          ? "fill-blue-800"
                          : isInRoute
                            ? "fill-green-700"
                            : "fill-gray-800"
                      }`}
                      style={{
                        fontSize: isSelected
                          ? "16px"
                          : isInRoute
                            ? "15px"
                            : isMobile
                              ? "12px"
                              : "14px",
                        textShadow:
                          "2px 2px 4px rgba(255,255,255,0.9), -1px -1px 2px rgba(255,255,255,0.9)",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        opacity: stationOpacity,
                      }}
                    >
                      {station.nameUz}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Station Details Modal - Optimized for mobile */}
          {showModal && !isFullscreen && currentStationDetails && (
            <>
              {/* Mobile Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setShowModal(false)}
              />

              {/* Modal Container */}
              <div
                className={`fixed z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
                  ${showModal ? "translate-x-0" : "translate-x-full"}
                  ${
                    isMobile
                      ? "inset-y-0 left-0 right-0 bg-white"
                      : "inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/3 xl:w-2/5 bg-white shadow-2xl border-l border-gray-200"
                  }`}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-900 to-blue-800 p-4 sm:p-6 flex items-center justify-between z-10 shadow-lg">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 shadow-lg border-2 border-white/20"
                      style={{
                        backgroundColor:
                          lineColors[currentStationDetails?.line],
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <h1 className="text-lg sm:text-2xl font-bold text-white truncate mb-1">
                        {currentStationDetails?.nameUz}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-blue-700 text-white border-blue-600 hover:bg-blue-600 text-xs sm:text-sm"
                        >
                          {lineNames[currentStationDetails?.line]}
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
                        <div className="relative h-100 sm:h-174 p-2 lg:h-180 bg-gray-100 overflow-hidden">
                          <img
                            src={
                              currentStationDetails?.images[
                                currentImageIndex
                              ] || "/placeholder.svg"
                            }
                            alt={`${currentStationDetails?.nameUz} ${
                              currentImageIndex + 1
                            }`}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => openImageViewer(currentImageIndex)}
                            loading="lazy"
                            style={{ imageRendering: "optimizeQuality" }}
                          />
                          {/* Carousel Controls */}
                          {currentStationDetails?.images.length > 1 && (
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
                            {currentImageIndex + 1} /{" "}
                            {currentStationDetails?.images.length}
                          </div>
                        </div>
                        {/* Thumbnail Strip - Optimized */}
                        {currentStationDetails?.images.length > 1 && (
                          <div className="p-2 sm:p-4 bg-gray-50">
                            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                              {currentStationDetails?.images.map(
                                (image, index) => (
                                  <div
                                    key={index}
                                    className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-200 ${
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
                                      loading="lazy"
                                    />
                                  </div>
                                ),
                              )}
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
                        {currentStationDetails?.videos?.map((video, index) => (
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
                              <h4 className="font-semibold text-blue-900 text-sm sm:text-base">
                                {video.title}
                              </h4>
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
            <div className="fixed inset-0 z-50 bg-white/50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="relative h-[70vh]">
                <img
                  src={
                    currentStationDetails?.images[viewerImageIndex] ||
                    "/placeholder.svg"
                  }
                  alt={`${currentStationDetails?.nameUz} ${
                    viewerImageIndex + 1
                  }`}
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
                {currentStationDetails?.images.length > 1 && (
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
                  {viewerImageIndex + 1} /{" "}
                  {currentStationDetails?.images.length}
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
                      <h3 className="text-white font-semibold text-lg truncate">
                        {currentVideo.title}
                      </h3>
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
  );
}
