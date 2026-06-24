"use client";

import { PageLoadingOverlay } from "@/components/page-loading";
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
  // ANIMATION VARIANTS — crossfade (ustma-ust o'tish)
  // ==============================
  const crossfadeVariants = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  // ==============================
  // UI STATES
  // ==============================
  const areImagesLoaded = loadedImages?.length > 0;

  if (loading) {
    return <PageLoadingOverlay label={t("two_hundred_thirteen")} />;
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

      {/* SLIDER IMAGE — birinchi rasm ketmasdan ikkinchisi paydo bo'ladi */}
      {areImagesLoaded && (
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit="exit"
            variants={crossfadeVariants}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
      )}

    </div>
  );
};
