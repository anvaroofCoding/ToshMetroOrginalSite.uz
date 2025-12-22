"use client";

import { useEffect, useRef, useState } from "react";

export default function TashkentMetroMap() {
  const [selectedStation, setSelectedStation] = useState();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Station coordinates and data (removed the 7 moveable stations)
  const stations = {
    // Blue Line (Beruniy to Do'stlik) - #0100ee
    beruniy: { x: 100, y: 45, name: "Beruniy", line: "blue" },
    tinchlik: { x: 100, y: 130, name: "Tinchlik", line: "blue" },
    chorsu: { x: 100, y: 200, name: "Chorsu", line: "blue" },
    gafur_gulom: { x: 180, y: 280, name: "G'afur G'ulom", line: "blue" },
    alisher_navoiy: {
      x: 260,
      y: 360,
      name: "Alisher Navoiy",
      line: "blue",
      transfer: ["red"],
    },
    ozbekiston: { x: 270, y: 470, name: "O'zbekiston", line: "blue" },
    mashinasozlar: { x: 700, y: 605, name: "Mashinasozlar", line: "blue" },
    dostlik: {
      x: 700,
      y: 640,
      name: "Do'stlik",
      line: "blue",
      transfer: ["yellow"],
    },

    // Green Line (Turkistan to Ming Urik) - #007e02
    turkiston: { x: 500, y: 50, name: "Turkiston", line: "green" },
    yunusobod: { x: 500, y: 100, name: "Yunusobod", line: "green" },
    shahriston: { x: 500, y: 150, name: "Shahriston", line: "green" },
    bodomzor: { x: 500, y: 200, name: "Bodomzor", line: "green" },
    minor: { x: 500, y: 250, name: "Minor", line: "green" },
    abdulla_qodiriy: { x: 500, y: 300, name: "Abdulla Qodiriy", line: "green" },
    yunus_rajabiy: {
      x: 500,
      y: 350,
      name: "Yunus Rajabiy",
      line: "green",
      transfer: ["red"],
    },
    mingorik: {
      x: 500,
      y: 520,
      name: "Ming'orik",
      line: "green",
      transfer: ["blue"],
    },

    // Red Line (Chinor to Buyuk Ipak Yuli) - #7c0803
    buyuk_ipak: { x: 700, y: 180, name: "Buyuk Ipak Yo'li", line: "red" },
    pushkin: { x: 700, y: 235, name: "Pushkin", line: "red" },
    hamid_olimjon: { x: 700, y: 285, name: "Hamid Olimjon", line: "red" },
    milliy_bog: { x: 150, y: 500, name: "Milliy Bog'", line: "red" },
    novza: { x: 107, y: 550, name: "Novza", line: "red" },
    mirzo_ulugbek: { x: 107, y: 590, name: "Mirzo Ulug'bek", line: "red" },
    chilonzor: { x: 107, y: 630, name: "Chilonzor", line: "red" },
    olmazor: { x: 107, y: 670, name: "Olmazor", line: "red" },
    choshtepa: { x: 107, y: 710, name: "Choshtepa", line: "red" },
    ozgarish: { x: 107, y: 750, name: "O'zgarish", line: "red" },
    sergeli: { x: 107, y: 790, name: "Sergeli", line: "red" },
    yangihayot: { x: 107, y: 830, name: "Yangihayot", line: "red" },
    chinor: {
      x: 107,
      y: 870,
      name: "Chinor",
      line: "red",
      transfer: ["yellow"],
    },

    // Yellow Line (Technopark to Kipchak) - #f0e608
    texnopark: {
      x: 700,
      y: 660,
      name: "Texnopark",
      line: "yellow",
      transfer: ["blue"],
    },
    yashnobod: { x: 700, y: 700, name: "Yashnobod", line: "yellow" },
    tuzel: { x: 700, y: 740, name: "Tuzel", line: "yellow" },
    olmos: { x: 700, y: 780, name: "Olmos", line: "yellow" },
    rohat: { x: 700, y: 820, name: "Rohat", line: "yellow" },
    yangiobod: { x: 700, y: 860, name: "Yangiobod", line: "yellow" },
    qoyliq: { x: 650, y: 910, name: "Qo'yliq", line: "yellow" },
    malohat: { x: 590, y: 910, name: "Matonat", line: "yellow" },
    qiyot: { x: 530, y: 910, name: "Qiyot", line: "yellow" },
    tolariq: { x: 440, y: 910, name: "Tolariq", line: "yellow" },
    xonobod: { x: 360, y: 910, name: "Xonobod", line: "yellow" },
    quruvchilar: { x: 280, y: 910, name: "Quruvchilar", line: "yellow" },
    turon: { x: 200, y: 910, name: "Turon", line: "yellow" },
    qipchaq: {
      x: 107,
      y: 910,
      name: "Qipchaq",
      line: "yellow",
      transfer: ["red"],
    },
  };

  const lineColors = {
    blue: "#0100ee",
    green: "#007e02",
    red: "#7c0803",
    yellow: "#f0e608",
  };

  // Define line paths with thick strokes
  const linePaths = [
    // Blue Line (Beruniy to Do'stlik)
    {
      path: "M 100 45 L 100 130 L 100 200 L 180 280 L 260 360 L 270 430 L 270 550 L 420 550 L 700 555 L 700 605 L 700 640",
      color: lineColors.blue,
      name: "Blue Line",
    },
    // Green Line (Turkistan to Ming Urik)
    {
      path: "M 500 50 L 500 100 L 500 150 L 500 200 L 500 250 L 500 300 L 500 350 L 500 365 L 500 510",
      color: lineColors.green,
      name: "Green Line",
    },
    // Red Line (Chinor to Buyuk Ipak Yuli)
    {
      path: "M 107 870 L 107 830 L 107 790 L 107 750 L 107 710 L 107 670 L 107 630 L 107 590 L 107 550 L 150 500 L 180 460 L 180 390 L 320 390 L 430 390 L 700 390 L 700 285 L 700 235 L 700 180",
      color: lineColors.red,
      name: "Red Line",
    },
    // Yellow Line (Technopark to Qipchaq)
    {
      path: "M 700 660 L 700 700 L 700 740 L 700 780 L 700 810 L 700 840 L 700 910 L 460 910 L 400 910 L 340 910 L 280 910 L 220 910 L 170 910 L 140 910 L 107 910",
      color: lineColors.yellow,
      name: "Yellow Line",
    },
  ];

  const handleStationClick = (stationKey, station) => {
    setSelectedStation(stationKey);
  };

  // Pan and zoom functionality
  const handleMouseDown = (e) => {
    if (e.target.tagName === "circle" || e.target.tagName === "text") return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(0.5, scale * delta), 3);
    setScale(newScale);
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev * 1.2, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev * 0.8, 0.5));
  };

  // Touch event handlers for mobile devices
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  const getTouchDistance = (touches) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2),
    );
  };

  const handleTouchStart = (e) => {
    if (e.target.tagName === "circle" || e.target.tagName === "text") return;

    setIsTouching(true);

    if (e.touches.length === 1) {
      // Single touch - pan
      setTouchStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    } else if (e.touches.length === 2) {
      // Two finger touch - zoom
      setLastTouchDistance(getTouchDistance(e.touches));
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();

    if (!isTouching) return;

    if (e.touches.length === 1) {
      // Single touch - pan
      setPosition({
        x: e.touches[0].clientX - touchStart.x,
        y: e.touches[0].clientY - touchStart.y,
      });
    } else if (e.touches.length === 2) {
      // Two finger touch - zoom
      const currentDistance = getTouchDistance(e.touches);
      if (lastTouchDistance > 0) {
        const scaleChange = currentDistance / lastTouchDistance;
        const newScale = Math.min(Math.max(0.5, scale * scaleChange), 3);
        setScale(newScale);
      }
      setLastTouchDistance(currentDistance);
    }
  };

  const handleTouchEnd = (e) => {
    setIsTouching(false);
    setLastTouchDistance(0);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      <div className="w-full bg-white">
        <div
          ref={containerRef}
          className="w-full h-[calc(100vh-200px)]bg-white relative cursor-grab active:cursor-grabbing touch-none"
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            cursor: isDragging || isTouching ? "grabbing" : "grab",
            touchAction: "none",
          }}
        >
          <div
            className="transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <svg
              ref={svgRef}
              width="1000"
              height="950"
              viewBox="0 0 800 950"
              className="mx-auto"
              style={{ minWidth: "800px", minHeight: "950px" }}
            >
              {/* Background */}
              <rect width="1000" height="950" fill="white" />

              {/* Line paths - thick lines with smooth animations */}
              {linePaths.map((line, index) => (
                <path
                  key={index}
                  d={line.path}
                  stroke={line.color}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                  className="transition-all duration-300 hover:opacity-100"
                />
              ))}

              {/* Transfer connection lines */}
              <g
                stroke="#666"
                strokeWidth="2"
                strokeDasharray="4,4"
                opacity="0.6"
              >
                {/* Chinor - Qipchaq connection */}
                <line x1="107" y1="870" x2="107" y2="910" />
              </g>

              {/* Regular station buttons */}
              {Object.entries(stations).map(([key, station]) => (
                <g key={key} className="transition-all duration-200">
                  {/* Clickable station button */}
                  <circle
                    cx={station.x}
                    cy={station.y}
                    r={station.transfer ? "12" : "8"}
                    fill="white"
                    stroke={lineColors[station.line]}
                    strokeWidth="4"
                    className="cursor-pointer hover:fill-gray-100 transition-all duration-200 hover:r-10"
                    onClick={() => handleStationClick(key, station)}
                    style={{
                      filter:
                        selectedStation === key
                          ? "drop-shadow(0 0 8px rgba(255, 68, 68, 0.6))"
                          : "none",
                    }}
                  />

                  {/* Transfer station indicator */}
                  {station.transfer && (
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r="6"
                      fill={lineColors[station.line]}
                      className="pointer-events-none transition-all duration-200"
                    />
                  )}

                  {/* Selected station highlight with smooth animation */}
                  {selectedStation === key && (
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r="16"
                      fill="none"
                      stroke="#ff4444"
                      strokeWidth="3"
                      strokeDasharray="4,4"
                      className="pointer-events-none animate-pulse"
                      style={{
                        animation:
                          "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                      }}
                    />
                  )}

                  {/* Station name - proper positioning for horizontal sections */}
                  <text
                    x={
                      // For horizontal lines, center the text
                      (station.line === "yellow" && station.y > 900) ||
                      (station.line === "red" &&
                        station.y >= 390 &&
                        station.y <= 390)
                        ? station.x
                        : // For vertical lines, position left or right as before
                          station.x + (station.x > 350 ? -15 : 15)
                    }
                    y={
                      // For horizontal yellow line, alternate text above and below, centered
                      station.line === "yellow" && station.y > 900
                        ? station.y +
                          ([
                            "qoyliq",
                            "qiyot",
                            "tolariq",
                            "quruvchilar",
                          ].includes(key)
                            ? -15
                            : 25)
                        : // For horizontal red line stations
                        station.line === "red" &&
                          station.y >= 390 &&
                          station.y <= 390
                        ? station.y +
                          ([
                            "paxtakor",
                            "mustaqillik_maydoni",
                            "amir_temur_xiyoboni",
                          ].includes(key)
                            ? -5
                            : 25)
                        : // For Xalqlar Do'stligi, place above the line
                        key === "xalqlar_dostligi"
                        ? station.y - 15
                        : // Default positioning for vertical lines
                          station.y + 5
                    }
                    fontSize="13"
                    fill="#1f2937"
                    textAnchor={
                      // Center text for horizontal lines, left/right for vertical lines
                      (station.line === "yellow" && station.y > 900) ||
                      (station.line === "red" &&
                        station.y >= 390 &&
                        station.y <= 390)
                        ? "middle"
                        : station.x > 350
                        ? "end"
                        : "start"
                    }
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="600"
                    className="pointer-events-none select-none transition-all duration-200 hover:fill-blue-600"
                    style={{ userSelect: "none", WebkitUserSelect: "none" }}
                  >
                    {station.name}
                  </text>
                </g>
              ))}

              {/* MOVEABLE STATIONS - Edit these coordinates as needed */}

              {/* Xalqlar Do'stligi (People's Friendship) */}
              <g className="transition-all duration-200">
                <circle
                  cx={180}
                  cy={460}
                  r="12"
                  fill="white"
                  stroke={lineColors.red}
                  strokeWidth="4"
                  className="cursor-pointer hover:fill-gray-100 transition-all duration-200"
                  onClick={() =>
                    handleStationClick("xalqlar_dostligi", {
                      name: "Xalqlar Do'stligi",
                      line: "red",
                    })
                  }
                  style={{
                    filter:
                      selectedStation === "xalqlar_dostligi"
                        ? "drop-shadow(0 0 8px rgba(255, 68, 68, 0.6))"
                        : "none",
                  }}
                />
                <circle
                  cx={180}
                  cy={460}
                  r="6"
                  fill={lineColors.red}
                  className="pointer-events-none transition-all duration-200"
                />
                {selectedStation === "xalqlar_dostligi" && (
                  <circle
                    cx={180}
                    cy={460}
                    r="16"
                    fill="none"
                    stroke="#ff4444"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                    className="pointer-events-none animate-pulse"
                  />
                )}
                <text
                  x={165}
                  y={445}
                  fontSize="13"
                  fill="#1f2937"
                  textAnchor="end"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none select-none transition-all duration-200"
                >
                  {"Xalqlar Do'stligi"}
                </text>
              </g>

              {/* Paxtakor */}
              <g className="transition-all duration-200">
                <circle
                  cx={260}
                  cy={390}
                  r="12"
                  fill="white"
                  stroke={lineColors.red}
                  strokeWidth="4"
                  className="cursor-pointer hover:fill-gray-100 transition-all duration-200"
                  onClick={() =>
                    handleStationClick("paxtakor", {
                      name: "Paxtakor",
                      line: "red",
                    })
                  }
                  style={{
                    filter:
                      selectedStation === "paxtakor"
                        ? "drop-shadow(0 0 8px rgba(255, 68, 68, 0.6))"
                        : "none",
                  }}
                />
                <circle
                  cx={260}
                  cy={390}
                  r="6"
                  fill={lineColors.red}
                  className="pointer-events-none transition-all duration-200"
                />
                {selectedStation === "paxtakor" && (
                  <circle
                    cx={260}
                    cy={390}
                    r="16"
                    fill="none"
                    stroke="#ff4444"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                    className="pointer-events-none animate-pulse"
                  />
                )}
                <text
                  x={230}
                  y={410}
                  fontSize="13"
                  fill="#1f2937"
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none select-none transition-all duration-200"
                >
                  Paxtakor
                </text>
              </g>

              {/* Mustaqillik Maydoni (Independence Square) */}
              <g className="transition-all duration-200">
                <circle
                  cx={410}
                  cy={390}
                  r="8"
                  fill="white"
                  stroke={lineColors.red}
                  strokeWidth="4"
                  className="cursor-pointer hover:fill-gray-100 transition-all duration-200"
                  onClick={() =>
                    handleStationClick("mustaqillik_maydoni", {
                      name: "Mustaqillik Maydoni",
                      line: "red",
                    })
                  }
                  style={{
                    filter:
                      selectedStation === "mustaqillik_maydoni"
                        ? "drop-shadow(0 0 8px rgba(255, 68, 68, 0.6))"
                        : "none",
                  }}
                />
                {selectedStation === "mustaqillik_maydoni" && (
                  <circle
                    cx={410}
                    cy={390}
                    r="16"
                    fill="none"
                    stroke="#ff4444"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                    className="pointer-events-none animate-pulse"
                  />
                )}
                <text
                  x={410}
                  y={415}
                  fontSize="13"
                  fill="#1f2937"
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none select-none transition-all duration-200"
                >
                  Mustaqillik Maydoni
                </text>
              </g>

              {/* Amir Temur Xiyoboni (Amir Temur Alley) */}
              <g className="transition-all duration-200">
                <circle
                  cx={500}
                  cy={390}
                  r="12"
                  fill="white"
                  stroke={lineColors.red}
                  strokeWidth="4"
                  className="cursor-pointer hover:fill-gray-100 transition-all duration-200"
                  onClick={() =>
                    handleStationClick("amir_temur_xiyoboni", {
                      name: "Amir Temur Xiyoboni",
                      line: "red",
                    })
                  }
                  style={{
                    filter:
                      selectedStation === "amir_temur_xiyoboni"
                        ? "drop-shadow(0 0 8px rgba(255, 68, 68, 0.6))"
                        : "none",
                  }}
                />
                <circle
                  cx={500}
                  cy={390}
                  r="6"
                  fill={lineColors.red}
                  className="pointer-events-none transition-all duration-200"
                />
                {selectedStation === "amir_temur_xiyoboni" && (
                  <circle
                    cx={500}
                    cy={390}
                    r="16"
                    fill="none"
                    stroke="#ff4444"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                    className="pointer-events-none animate-pulse"
                  />
                )}
                <text
                  x={580}
                  y={415}
                  fontSize="13"
                  fill="#1f2937"
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none select-none transition-all duration-200"
                >
                  Amir Temur Xiyoboni
                </text>
              </g>

              {/* Kosmonavtlar (Cosmonauts) */}
              <g className="transition-all duration-200">
                <circle
                  cx={350}
                  cy={550}
                  r="8"
                  fill="white"
                  stroke={lineColors.blue}
                  strokeWidth="4"
                  className="cursor-pointer hover:fill-gray-100 transition-all duration-200"
                  onClick={() =>
                    handleStationClick("kosmonavtlar", {
                      name: "Kosmonavtlar",
                      line: "blue",
                    })
                  }
                  style={{
                    filter:
                      selectedStation === "kosmonavtlar"
                        ? "drop-shadow(0 0 8px rgba(255, 68, 68, 0.6))"
                        : "none",
                  }}
                />
                {selectedStation === "kosmonavtlar" && (
                  <circle
                    cx={350}
                    cy={550}
                    r="16"
                    fill="none"
                    stroke="#ff4444"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                    className="pointer-events-none animate-pulse"
                  />
                )}
                <text
                  x={400}
                  y={580}
                  fontSize="13"
                  fill="#1f2937"
                  textAnchor="end"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none select-none transition-all duration-200"
                >
                  Kosmonavtlar
                </text>
              </g>

              {/* Oybek */}
              <g className="transition-all duration-200">
                <circle
                  cx={500}
                  cy={550}
                  r="12"
                  fill="white"
                  stroke={lineColors.blue}
                  strokeWidth="4"
                  className="cursor-pointer hover:fill-gray-100 transition-all duration-200"
                  onClick={() =>
                    handleStationClick("oybek", { name: "Oybek", line: "blue" })
                  }
                  style={{
                    filter:
                      selectedStation === "oybek"
                        ? "drop-shadow(0 0 8px rgba(255, 68, 68, 0.6))"
                        : "none",
                  }}
                />
                <circle
                  cx={500}
                  cy={550}
                  r="6"
                  fill={lineColors.blue}
                  className="pointer-events-none transition-all duration-200"
                />
                {selectedStation === "oybek" && (
                  <circle
                    cx={500}
                    cy={550}
                    r="16"
                    fill="none"
                    stroke="#ff4444"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                    className="pointer-events-none animate-pulse"
                  />
                )}
                <text
                  x={520}
                  y={580}
                  fontSize="13"
                  fill="#1f2937"
                  textAnchor="end"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none select-none transition-all duration-200"
                >
                  Oybek
                </text>
              </g>

              {/* Toshkent */}
              <g className="transition-all duration-200">
                <circle
                  cx={700}
                  cy={555}
                  r="8"
                  fill="white"
                  stroke={lineColors.blue}
                  strokeWidth="4"
                  className="cursor-pointer hover:fill-gray-100 transition-all duration-200"
                  onClick={() =>
                    handleStationClick("toshkent", {
                      name: "Toshkent",
                      line: "blue",
                    })
                  }
                  style={{
                    filter:
                      selectedStation === "toshkent"
                        ? "drop-shadow(0 0 8px rgba(255, 68, 68, 0.6))"
                        : "none",
                  }}
                />
                {selectedStation === "toshkent" && (
                  <circle
                    cx={700}
                    cy={555}
                    r="16"
                    fill="none"
                    stroke="#ff4444"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                    className="pointer-events-none animate-pulse"
                  />
                )}
                <text
                  x={670}
                  y={540}
                  fontSize="13"
                  fill="#1f2937"
                  textAnchor="start"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  className="pointer-events-none select-none transition-all duration-200"
                >
                  Toshkent
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
