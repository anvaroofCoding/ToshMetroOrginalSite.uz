import { socialLinks } from "@/lib/data";
import Link from "next/link";

export default function TopNavbar() {
  return (
    <div className="w-full py-2 px-3  lg:px-10 bg-blue-900 rounded-b-2xl">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <div
                key={index}
                className="px-1 py-1 rounded-full bg-white/20 hover:bg-white/40 duration-200"
              >
                <Link
                  href={social.href}
                  target="_blank"
                  aria-label={social.title}
                >
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="lg:flex hidden gap-5">
          <Link
            href="gup@tashmetro.uz"
            className="text-xs hover:text-white/60 duration-200"
          >
            Elektron pochta: gup@tashmetro.uz
          </Link>
          <Link
            href="tel:+998712416514"
            className="text-xs hover:text-white/60 duration-200"
          >
            Qabulxona: +998 (71) 241-65-14
          </Link>
          <Link
            href="tel:+998712455603"
            className="text-xs hover:text-white/60 duration-200"
          >
            Murojaat uchun: +998 (71) 245-56-03
          </Link>
        </div>
        <div className="flex lg:gap-5 gap-2 items-center">
          <Link
            href="/davlat-ramzlari"
            className="text-xs lg:block hidden hover:text-white/60 duration-200"
          >
            Davlat ramzlari
          </Link>
          <span className="lg:block hidden">|</span>
          <Link
            href="/sayt-xaritasi"
            className="lg:text-xs text-[11px] hover:text-white/60 duration-200"
          >
            Sayt xaritasi
          </Link>
          <span>|</span>
          <Link
            href="metro-tarixi"
            className="lg:text-xs text-[11px] hover:text-white/60 duration-200 "
          >
            Metropoliten haqida
          </Link>
        </div>
      </div>
    </div>
  );
}
