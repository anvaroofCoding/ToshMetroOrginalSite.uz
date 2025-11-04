"use client";

import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "antd";
import { useTranslations } from "next-intl";

export default function BoshSahifastatistika() {
  const t = useTranslations("menu");
  const [animationError, setAnimationError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative bg-gradient-to-r from-blue-800 to-blue-700 rounded-3xl p-8 text-white shadow-lg overflow-hidden flex flex-col lg:flex-row items-center justify-between">
      {/* Pattern background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: 'url("/naqsh.png")',
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
          }}
        />
      </div>

      {/* Text content */}
      <div className="lg:w-2/3 space-y-4 z-10">
        <h1 className="text-3xl lg:text-4xl font-bold">{t("heading")}</h1>
        <p className="text-lg opacity-90">{t("info")}</p>
        <Button
          className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl hover:shadow-md transition"
          onClick={() => (window.location.href = "/metro-statistikasi")}
        >
          <p className="text-md opacity-90 text-blue-900">{t("cta")}</p>
        </Button>
      </div>

      {/* Lottie animation */}
      <div className="lg:w-2/5 mt-6 lg:mt-0 flex justify-center z-10">
        {!animationError ? (
          <>
            <DotLottieReact
              src="https://lottie.host/533c746a-ea66-4586-8905-792f81daefbf/gSH1oD1YPs.lottie"
              loop
              autoplay
              onError={(e) => {
                console.error("DotLottie animation error:", e);
                setAnimationError(true);
              }}
              onLoad={() => setLoaded(true)}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </>
        ) : (
          <p className="text-white">Animatsiya yuklanmadi</p>
        )}
      </div>
    </div>
  );
}
