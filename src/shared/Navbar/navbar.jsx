"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building,
  ArrowUpFromLine as ChartNoAxesCombined,
  ChevronDown,
  CreditCard,
  FileCheck2,
  Film,
  Globe,
  Hand,
  Info,
  MapPin,
  Menu,
  Phone,
  ScanFace,
  ShieldAlert as ShieldUser,
  Sparkles,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const LANGUAGES = ["UZ", "RU", "EN"];

const getMenuItems = (t) => [
  { label: t("map"), href: "/metro-xaritasis", icon: MapPin },
  {
    label: t("payments"),
    href: "",
    dropdown: true,
    icon: CreditCard,
    dropdownItems: [
      { label: t("paymentTypes"), href: "/tolov-turi", icon: CreditCard },
      { label: t("attoCards"), href: "/atto-kartalari", icon: CreditCard },
      { label: t("attoApp"), href: "/atto-mobile-ilovasi", icon: Phone },
      { label: t("palmpay"), href: "/pay", icon: Hand },
      { label: t("facepay"), href: "/FacePay", icon: ScanFace },
    ],
  },
  {
    label: t("passengers"),
    href: "",
    dropdown: true,
    icon: Users,
    dropdownItems: [
      {
        label: t("metroRules"),
        href: "/Metrodab-foydalanish-qoidalari",
        icon: Info,
      },
      { label: t("stateSymbols"), href: "/davlat-ramzlari", icon: Sparkles },
      { label: t("contact"), href: "/murojaatlar", icon: Phone },
      {
        label: t("passengerStats"),
        href: "/metro-statistikasi",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    label: t("infoService"),
    href: "",
    dropdown: true,
    icon: ShieldUser,
    dropdownItems: [
      { label: t("news"), href: "/yangiliklar", icon: Info },
      { label: t("media"), href: "/mediateka", icon: Film },
    ],
  },
  {
    label: t("aboutMetro"),
    href: "",
    dropdown: true,
    icon: Building,
    dropdownItems: [
      { label: t("aboutOrganization"), href: "/metro-tarixi", icon: Building },
      { label: t("management"), href: "/Raxbariyat", icon: Users },
      { label: t("structure"), href: "/tarkibiy-bolinmalar", icon: Building },
      { label: t("vacancies"), href: "/bosh-ish-orinlari", icon: Users },
    ],
  },
  {
    label: t("genderEquality"),
    href: "",
    dropdown: true,
    icon: UsersRound,
    dropdownItems: [
      { label: t("generalInfo"), href: "/umumiy-malumot", icon: Info },
      {
        label: t("genderInCountry"),
        href: "/country-gender",
        icon: UsersRound,
      },
      {
        label: t("normativeDocs"),
        href: "/meyoriy-xujjatlar",
        icon: FileCheck2,
      },
    ],
  },
  {
    label: t("contact"),
    href: "",
    dropdown: true,
    icon: Phone,
    dropdownItems: [{ label: t("contact"), href: "/contact", icon: Phone }],
  },
];

// Desktop hover dropdown component
function HoverDropdown({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 text-xs font-medium text-white hover:bg-white/10 hover:text-gray-300 rounded-lg px-3 py-2 transition-colors duration-200">
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-2 z-50"
          >
            <div className="w-56 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden">
              {item.dropdownItems?.map((sub) => {
                const Icon = sub.icon;
                return (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-100 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Language dropdown with hover
function LanguageDropdown({ locale, onChangeLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative hidden sm:block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-2 text-white hover:bg-white/10 hover:text-white/60 rounded-lg px-3 py-2 transition-colors duration-200">
        <Globe className="h-4 w-4" />
        {locale.toUpperCase()}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full pt-2 z-50"
          >
            <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden">
              {LANGUAGES.filter((l) => l !== locale.toUpperCase()).map(
                (lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onChangeLanguage(lang);
                      setIsOpen(false);
                    }}
                    className="block w-full px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-100 transition-colors text-center"
                  >
                    {lang}
                  </button>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile menu sliding from right
function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  locale,
  onChangeLanguage,
  t,
}) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sliding panel from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#173aad] z-50 lg:hidden overflow-y-auto"
          >
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div
                className="w-full h-full bg-repeat"
                style={{
                  backgroundImage: 'url("/naqsh.png")',
                  backgroundSize: "200px",
                }}
              />
            </div>

            <div className="relative z-10">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              {/* Menu items */}
              <nav className="px-4 pb-6 space-y-1">
                {menuItems.map((item) =>
                  item.dropdownItems ? (
                    <div key={item.label}>
                      <button
                        onClick={() =>
                          setExpandedMenu(
                            expandedMenu === item.label ? null : item.label,
                          )
                        }
                        className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-white rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          {item.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            expandedMenu === item.label && "rotate-180",
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedMenu === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 py-2 space-y-1">
                              {item.dropdownItems.map((sub) => {
                                const Icon = sub.icon;
                                return (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                  >
                                    <Icon className="h-4 w-4" />
                                    {sub.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ),
                )}

                {/* Language section */}
                <div className="border-t border-white/20 pt-4 mt-4">
                  <div className="flex items-center gap-2 px-3 mb-3 text-xs font-semibold text-white/70">
                    <Globe className="h-4 w-4" />
                    {t("Language")}
                  </div>
                  <div className="flex gap-2 px-3">
                    {LANGUAGES.filter((l) => l !== locale.toUpperCase()).map(
                      (lang) => (
                        <button
                          key={lang}
                          onClick={() => onChangeLanguage(lang)}
                          className="flex-1 py-2.5 text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                        >
                          {lang}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Logo component
function Logo({ t }) {
  return (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href="/">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/logos.png"
            alt="Toshkent metro logo"
            width={50}
            height={50}
            className="rounded-full  object-cover"
            priority
          />
        </motion.div>
      </Link>

      <div className="h-10 flex-col justify-center hidden sm:flex">
        {[
          { color: "#00B0FF", height: "30%" },
          { color: "#FF454B", height: "5%" },
          { color: "white", height: "30%" },
          { color: "#FF454B", height: "5%" },
          { color: "#00B100", height: "30%" },
        ].map((line, i) => (
          <div
            key={i}
            className="w-full"
            style={{
              borderLeft: `2px solid ${line.color}`,
              height: line.height,
            }}
          />
        ))}
      </div>

      <h1 className="hidden md:block text-[11px] lg:text-[10px] w-[150px] font-medium leading-tight text-white">
        {t("logo1")} <span>{t("logo2")}</span> {t("logo3")}
      </h1>
    </motion.div>
  );
}

// Main Navbar component
export default function Navbar() {
  const t = useTranslations("menu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = getMenuItems(t);
  const isHidden =
    pathname.includes("metro-xaritasis") || pathname.includes("normalMap");
  const isHomePage = pathname === "/" || pathname === `/${locale}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = useCallback(
    (lang) => {
      const segments = pathname.split("/");
      segments[1] = lang.toLowerCase();
      router.push(segments.join("/"));
      setMobileOpen(false);
    },
    [pathname, router],
  );

  if (isHidden) return null;

  const headerClass = cn(
    "w-full z-50 transition-all duration-300",
    isHomePage ? "fixed top-0" : "sticky top-0",
    isHomePage && !isScrolled ? "bg-transparent" : "bg-[#173aad]",
  );

  return (
    <>
      <header className={headerClass}>
        {/* Pattern overlay */}
        {(!isHomePage || isScrolled) && (
          <div className="absolute inset-0 opacity-20 -z-10 pointer-events-none">
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: 'url("/naqsh.png")',
                backgroundSize: "200px",
              }}
            />
          </div>
        )}

        <div className="container mx-auto flex items-center justify-between py-4">
          <Logo t={t} />

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) =>
              item.dropdown ? (
                <HoverDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium text-white hover:bg-white/10 hover:text-gray-300 rounded-lg px-3 py-2 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageDropdown
              locale={locale}
              onChangeLanguage={changeLanguage}
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        menuItems={menuItems}
        locale={locale}
        onChangeLanguage={changeLanguage}
        t={t}
      />
    </>
  );
}
