"use client";

export default function BgImage({ children }) {
  return (
    <div className="relative min-h-screen bg-white ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: 'url("/naqsh.png")',
            backgroundRepeat: "repeat",
            backgroundSize: "300px", // <<< kichikroq qilib, ko‘p takrorlanadi
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
