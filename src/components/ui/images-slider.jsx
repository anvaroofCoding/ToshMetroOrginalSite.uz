"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

export const ImagesSlider = ({
  images = [],
  loading,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
  interval = 5000,
}) => {
  const t = useTranslations("menu");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [error, setError] = useState(false);

  // ==============================
  // PRELOAD IMAGES
  // ==============================
  const loadImages = useCallback(() => {
    if (!images || images.length === 0) return;

    setError(false);

    const loadPromises = images?.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;

        img.onload = () => resolve(image);
        img.onerror = () => reject(image);
      });
    });

    Promise?.all(loadPromises)
      .then((loaded) => {
        setLoadedImages(loaded);
      })
      .catch((err) => {
        console.error("Image loading failed:", err);
        setError(true);
      });
  }, [images]);

  // ==============================
  // LOAD WHEN IMAGES CHANGE
  // ==============================
  useEffect(() => {
    loadImages();
  }, [loadImages]);

  // ==============================
  // SLIDER CONTROLS
  // ==============================
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1 >= loadedImages.length ? 0 : prev + 1));
  }, [loadedImages.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? loadedImages?.length - 1 : prev - 1,
    );
  }, [loadedImages?.length]);

  // ==============================
  // KEYBOARD + AUTOPLAY
  // ==============================
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrevious();
    };

    window.addEventListener("keydown", handleKeyDown);

    let sliderInterval;
    if (autoplay && loadedImages.length > 1) {
      sliderInterval = setInterval(handleNext, interval);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(sliderInterval);
    };
  }, [autoplay, interval, handleNext, handlePrevious, loadedImages.length]);

  // ==============================
  // ANIMATION VARIANTS
  // ==============================
  const slideVariants = {
    initial: {
      opacity: 0,
      x: "100%", // O‘ng tomonda boshlanadi
    },
    visible: {
      opacity: 1,
      x: 0, // Markazga keladi
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: "-100%", // Chap tomondan chiqib ketadi
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  // ==============================
  // UI STATES
  // ==============================
  const areImagesLoaded = loadedImages?.length > 0;

  if (loading) {
    return (
      <div className="fixed  w-full h-screen inset-0 z-1030 flex items-center justify-center bg-white text-white">
        <div className="animate-pulse text-lg tracking-widest text-black">
          {t("two_hundred_thirteen")}
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative overflow-hidden h-full w-full flex items-center justify-center bg-black",
        className,
      )}
      style={{ perspective: "1000px" }}
    >
      {/* ERROR */}
      {error && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-red-500">
          Failed to load images
        </div>
      )}

      {/* CONTENT */}
      {areImagesLoaded && children}

      {/* OVERLAY */}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {/* SLIDER IMAGE */}
      {areImagesLoaded && (
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
      )}

      {/* CONTROLS */}
      {areImagesLoaded && loadedImages.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 z-50 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-xl transition lg:block hidden"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 z-50 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-xl transition lg:block hidden"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
};
