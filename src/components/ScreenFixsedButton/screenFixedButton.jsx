"use client";

import { useState } from "react";
import { Plus, FileText, X, Bot } from "lucide-react";
import Link from "next/link";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const playClickSound = () => {
    // Create a simple click sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      400,
      audioContext.currentTime + 0.1
    );

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleMainButtonClick = () => {
    playClickSound();
    setIsOpen(!isOpen);
  };

  const handleclosebutton = () => {
    setIsOpen(false);
  };

  const handleSubButtonClick = (action) => {
    playClickSound();
    console.log(`${action} clicked`);
    // Add your specific action handlers here
  };

  const buttons = [
    {
      id: "qa",
      icon: Bot,
      title: "Tezkor savol javob",
      action: "Quick Q&A",
      btlink: "/mister-ai",
    },

    {
      id: "applications",
      icon: FileText,
      title: "Murojaatlar",
      action: "Applications",
      btlink: "/murojaatlar",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 "
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Action Button Container */}
      <div className="fixed bottom-20 right-6 z-50">
        {/* Sub Buttons */}
        <div className="flex flex-col items-end space-y-4 mb-4">
          {buttons.map((button, index) => {
            const Icon = button.icon;
            return (
              <Link
                key={button.id}
                href={button.btlink}
                className={`relative
                  ${isOpen ? "block" : "hidden"}
                  `}
              >
                <div
                  className={`flex items-center transition-all duration-300 ease-out ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0 pointer-events-none"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                  }}
                  onMouseEnter={() => setHoveredButton(button.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => {
                    handleclosebutton();
                  }}
                >
                  {/* Title Tooltip */}
                  <div
                    className={`mr-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 ${
                      hoveredButton === button.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2 pointer-events-none"
                    }`}
                  >
                    {button.title}
                    <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                  </div>

                  {/* Sub Button */}
                  <button
                    onClick={() => handleSubButtonClick(button.action)}
                    className="w-12 h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group"
                  >
                    <Icon
                      size={20}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Main FAB Button */}
        <button
          onClick={handleMainButtonClick}
          className={`w-16 h-16 bg-blue-900 fixed right-6 bottom-6 hover:bg-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          {isOpen ? (
            <X
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          ) : (
            <Plus
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          )}
        </button>
      </div>
    </>
  );
}
