"use client";

import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function BiometrikVideoModal() {
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
          <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xs w-full bg-black border-0 p-0 rounded-xl">
            {/* ACCESSIBILITY TITLE (hidden) */}
            <VisuallyHidden>
              <Dialog.Title>Biometrik tasdiqlash videosi</Dialog.Title>
            </VisuallyHidden>

            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 z-10 text-white hover:bg-white/20 p-2 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Video */}
            <div className="aspect-[9/16] w-full">
              <video
                className="w-full h-full object-cover rounded-xl"
                controls
                autoPlay
                loop
                muted
                playsInline
                poster="/instagram-reel-thumbnail.png"
              >
                <source src="/videos/hand-video.mp4" type="video/mp4" />
              </video>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
