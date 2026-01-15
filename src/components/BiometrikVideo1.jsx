"use client";

import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@nextui-org/react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function BiometrikVideo1() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("menu");

  return (
    <div className="text-center space-y-6 py-10">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg font-semibold"
      >
        {t("forty_one")}
      </Button>

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          {/* Overlay */}
          <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />

          {/* Content */}
          <Dialog.Content
            className="
    fixed inset-0 z-50 
    flex items-center justify-center 
    bg-black
  "
          >
            {/* ACCESSIBILITY TITLE (hidden) */}
            <VisuallyHidden>
              <Dialog.Title>Biometrik tasdiqlash videosi</Dialog.Title>
            </VisuallyHidden>

            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 p-2 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Video */}
            <div className="w-full h-full">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/hand-video1.mp4" type="video/mp4" />
              </video>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
