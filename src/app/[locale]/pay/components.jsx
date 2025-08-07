"use client";

import { useState, useEffect, useRef } from "react";

export default function Component() {
  const [showVideo, setShowVideo] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // Fullscreen holatini tekshirish
  useEffect(() => {
    function handleFullscreenChange() {
      const fullscreenElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Switch between video and image every 3 seconds (faqat fullscreen bo'lmaganda)
  useEffect(() => {
    if (!isFullscreen) {
      timerRef.current = setInterval(() => {
        setShowVideo((prev) => !prev);
      }, 3000);
    } else {
      clearInterval(timerRef.current);
      setShowVideo(true); // Fullscreen bo'lsa faqat video ko'rsin
    }
    return () => clearInterval(timerRef.current);
  }, [isFullscreen]);

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (showVideo) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [showVideo]);

  return (
    <div
      style={{
        width: "100vw",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="rounded-[30px]"
        style={{
          width: "100%",
          maxWidth: "300px",
          height: "auto",
          opacity: showVideo ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          position: "absolute",
        }}
        muted
        loop
        playsInline
        controls
      >
        <source src="/videos/hand-video1.mp4" type="video/mp4" />
      </video>

      {/* Image */}
      <img
        src="https://www.atto.uz/image/hand.png"
        alt="Hand gesture"
        style={{
          width: "100%",
          maxWidth: "300px",
          height: "auto",
          opacity: showVideo ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
          position: "absolute",
        }}
      />
    </div>
  );
}
