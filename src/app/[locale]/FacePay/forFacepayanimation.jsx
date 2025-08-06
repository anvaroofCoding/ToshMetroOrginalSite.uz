"use client";

import { useState, useEffect, useRef } from "react";

export default function Component() {
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef(null);

  // Switch between video and image every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setShowVideo((prev) => !prev);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (showVideo) {
        videoRef.current.play().catch(console.log);
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
          borderRadius: "rounded-[30px]",
        }}
        muted
        loop
        playsInline
        controls
      >
        <source src="/videos/hand-video.mp4" type="video/mp4" />
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
