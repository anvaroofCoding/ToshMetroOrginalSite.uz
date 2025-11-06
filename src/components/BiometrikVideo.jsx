"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function () {
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xs p-0 bg-black border-0">
          <DialogHeader className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsModalOpen(false)}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="aspect-[9/16] w-full">
            <video
              className="w-full h-full object-cover rounded-lg"
              controls
              autoPlay
              loop
              muted
              poster="/instagram-reel-thumbnail.png"
            >
              <source src="/videos/hand-video.mp4" type="video/mp4" />
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
