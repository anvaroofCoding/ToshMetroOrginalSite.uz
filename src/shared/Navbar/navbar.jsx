"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Building,
  Camera,
  BarChartIcon as ChartNoAxesCombined,
  ChevronDown,
  CreditCard,
  FileCheck2,
  Film,
  Globe,
  Info,
  MapPin,
  MapPinned,
  Menu,
  Nfc,
  Phone,
  ScanFace,
  Send,
  ShieldIcon as ShieldUser,
  Sparkles,
  Users,
  UsersRound,
  X,
  Youtube,
} from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// Move static data outside component to prevent recreating on each render
const MENU_ITEMS = [
  {
    label: "Xarita",
    href: "",
    dropdown: true,
    dropdownItems: [
      { label: "Oddiy xarita", href: "normalMap", icon: MapPinned },
      { label: "Batafsil xarita", href: "/metro-xaritasis", icon: MapPinned },
    ],
    icon: MapPin,
  },
  {
    label: "To'lovlar",
    href: "",
    dropdown: true,
    icon: CreditCard,
    dropdownItems: [
      { label: "To'lov turlari", href: "/tolov-turi", icon: CreditCard },
      { label: "ATTO kartalari", href: "/atto-kartalari", icon: CreditCard },
      {
        label: "ATTO mobile ilovasi",
        href: "/atto-mobile-ilovasi",
        icon: Phone,
      },
      { label: "PalmPay", href: "/pay", icon: Nfc },
      { label: "FacePay", href: "/FacePay", icon: ScanFace },
    ],
  },
  {
    label: "Yo'lovchilar",
    href: "",
    dropdown: true,
    icon: Users,
    dropdownItems: [
      {
        label: "Metropolitenidan foydalanish qoidalari",
        href: "/Metrodab-foydalanish-qoidalari",
        icon: Info,
      },
      { label: "Davlat ramzlari", href: "/davlat-ramzlari", icon: Sparkles },
      { label: "Murojaatlar", href: "/murojaatlar", icon: Phone },
      {
        label: "Yo'lovchilar statistikasi",
        href: "/metro-statistikasi",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    label: "Axborot xizmati",
    href: "",
    dropdown: true,
    icon: ShieldUser,
    dropdownItems: [
      { label: "Yangiliklar", href: "/yangiliklar", icon: Info },
      { label: "Mediateka", href: "/mediateka", icon: Film },
    ],
  },
  {
    label: "Metro haqida",
    href: "",
    dropdown: true,
    icon: Building,
    dropdownItems: [
      { label: "Tashkilot haqida", href: "/metro-tarixi", icon: Building },
      { label: "Rahbariyat", href: "/Raxbariyat", icon: Users },
      {
        label: "Tarkibiy bo'linmalar",
        href: "/tarkibiy-bolinmalar",
        icon: Building,
      },
      { label: "Bo'sh ish o'rinlari", href: "/bosh-ish-orinlari", icon: Users },
    ],
  },
  {
    label: "Gender tenglik",
    href: "",
    dropdown: true,
    icon: UsersRound,
    dropdownItems: [
      { label: "Umumiy ma'lumot", href: "umumiy-malumot", icon: Info },
      {
        label: "Yurtimizda gender tenglik",
        href: "/country-gender",
        icon: UsersRound,
      },
      {
        label: "Me'yoriy hujjatlar",
        href: "/meyoriy-xujjatlar",
        icon: FileCheck2,
      },
    ],
  },
  {
    label: "Bog'lanish",
    href: "",
    dropdown: true,
    icon: Phone,
    dropdownItems: [{ label: "Aloqa", href: "/contact", icon: Phone }],
  },
];

const SOCIAL_LINKS = [
  {
    icon: Send,
    href: "https://t.me/toshkent_metro",
    name: "Telegram",
    color: "hover:text-blue-400 hover:bg-blue-400/10",
  },
  {
    icon: Camera,
    href: "https://instagram.com/toshkent_metro",
    name: "Instagram",
    color: "hover:text-pink-400 hover:bg-pink-400/10",
  },
  {
    icon: X,
    href: "https://twitter.com/toshkent_metro",
    name: "Twitter",
    color: "hover:text-sky-400 hover:bg-sky-400/10",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/toshkent_metro",
    name: "YouTube",
    color: "hover:text-red-500 hover:bg-red-500/10",
  },
];

const LANGUAGES = ["UZ", "RU", "EN"];
const SCROLL_THRESHOLD = 30;

// Animation variants moved outside component
const menuVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

// Custom hook for scroll handling
const useScrollDetection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
          const shouldBeScrolled = currentScrollY > SCROLL_THRESHOLD;

          if (shouldBeScrolled !== isScrolled) {
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolled(shouldBeScrolled);
            }, 20);
          }

          lastScrollY.current = currentScrollY;
        }

        ticking.current = false;
      });
    }
    ticking.current = true;
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return isScrolled;
};

// Background pattern component
const BackgroundPattern = ({ className = "" }) => (
  <div className={`absolute inset-0 z-0 opacity-20 ${className}`}>
    <div
      className="w-full h-full bg-repeat"
      style={{
        backgroundImage: 'url("/naqsh.png")',
        backgroundRepeat: "repeat",
        backgroundSize: "130px",
      }}
    />
  </div>
);

// Logo component
const Logo = () => (
  <motion.div
    className="flex items-center gap-2 relative z-10"
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
          className="rounded-full"
          priority
        />
      </motion.div>
    </Link>

    <div className="h-[40px] flex-col justify-center hidden sm:flex">
      {[
        { color: "#00B0FF", height: "30%", delay: 0.1 },
        { color: "#FF454B", height: "5%", delay: 0.2 },
        { color: "white", height: "30%", delay: 0.3 },
        { color: "#FF454B", height: "5%", delay: 0.4 },
        { color: "#00B100", height: "30%", delay: 0.5 },
      ].map((line, index) => (
        <motion.div
          key={index}
          className="w-full"
          style={{
            borderLeft: `2px solid ${line.color}`,
            height: line.height,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: line.delay, duration: 0.3 }}
        />
      ))}
    </div>

    <motion.h1
      className="hidden md:block text-[11px] lg:text-[10px] w-[150px] lg:w-[150px] capitalize font-medium leading-tight"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      O'zbekiston Respublikasi Transport vazirligi{" "}
      <span>"Toshkent Metropoliteni"</span> DUK
    </motion.h1>
  </motion.div>
);

// Desktop navigation item component
const DesktopNavItem = ({
  item,
  index,
  isScrolled,
  activeDropdown,
  hoveredItem,
  onDropdownClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <div
    className="relative h-full flex items-center dropdown-container"
    onMouseEnter={() => onMouseEnter(index)}
    onMouseLeave={onMouseLeave}
  >
    {item.dropdown ? (
      <motion.button
        onClick={() => onDropdownClick(index)}
        className="px-3 py-2 text-[12px] text-gray-300 hover:text-white transition-all duration-300 relative flex items-center gap-2 rounded-lg hover:bg-white/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isScrolled && <item.icon className="h-4 w-4" />}
        {item.label}
        <motion.div
          animate={{
            rotate: activeDropdown === index ? 180 : 0,
            scale: hoveredItem === index ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
        {hoveredItem === index && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg -z-10"
            layoutId="navbar-hover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>
    ) : (
      <Link href={item.href}>
        <motion.div
          className="px-3 py-2 text-[12px] text-gray-300 hover:text-white transition-all duration-300 relative flex items-center gap-2 rounded-lg hover:bg-white/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isScrolled && <item.icon className="h-4 w-4" />}
          {item.label}
          {hoveredItem === index && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg -z-10"
              layoutId="navbar-hover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.div>
      </Link>
    )}

    {/* Separator */}
    {index < MENU_ITEMS.length - 1 && (
      <motion.span
        className="text-gray-600 mx-1"
        animate={{
          opacity:
            hoveredItem === index || hoveredItem === index + 1 ? 0.3 : 0.6,
        }}
        transition={{ duration: 0.2 }}
      >
        |
      </motion.span>
    )}

    {/* Dropdown menu */}
    <AnimatePresence>
      {item.dropdown && activeDropdown === index && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 z-50"
        >
          <div className="bg-[#0E327F]/95 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
            {item.dropdownItems.map((subItem, subIndex) => (
              <motion.div
                key={subItem.label}
                variants={itemVariants}
                custom={subIndex}
              >
                <Link
                  href={subItem.href}
                  onClick={() => onDropdownClick(null)}
                  className="group block px-5 py-4 text-sm text-gray-300 hover:bg-white/15 hover:text-white transition-all duration-300 border-b border-white/10 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <subItem.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {subItem.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Language selector component
const LanguageSelector = ({
  currentLang,
  isLangOpen,
  onLangClick,
  onLanguageChange,
}) => (
  <div className="hidden 2xl:flex items-center relative dropdown-container">
    <motion.button
      onClick={onLangClick}
      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: isLangOpen ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Globe size={20} />
      </motion.div>
      {currentLang}
      <motion.div
        animate={{ rotate: isLangOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown size={16} />
      </motion.div>
    </motion.button>

    <AnimatePresence>
      {isLangOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute top-full right-0 mt-3 w-28 bg-[#0E327F]/95 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden z-50"
        >
          {LANGUAGES.filter((lang) => lang !== currentLang).map(
            (lang, index) => (
              <motion.button
                key={lang}
                variants={itemVariants}
                custom={index}
                onClick={() => onLanguageChange(lang)}
                className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/15 hover:text-white transition-all duration-300 border-b border-white/10 last:border-b-0 hover:translate-x-1"
                whileHover={{ x: 4 }}
              >
                {lang}
              </motion.button>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Mobile navigation item component
const MobileNavItem = ({
  item,
  index,
  activeDropdown,
  setActiveDropdown,
  closeMenu,
}) => {
  const isOpen = activeDropdown === index;

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (item.dropdown) {
        setActiveDropdown(isOpen ? null : index);
      } else {
        closeMenu();
      }
    },
    [item.dropdown, isOpen, index, setActiveDropdown, closeMenu]
  );

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
      className="border-b border-white/10 rounded-lg overflow-hidden backdrop-blur-sm"
    >
      <motion.div
        className="flex justify-between items-center cursor-pointer py-4 px-4 hover:bg-white/10 transition-all duration-300"
        onClick={handleClick}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-5 w-5 text-blue-200" />
          {item.dropdown ? (
            <span className="hover:opacity-80 transition-opacity font-medium">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:opacity-80 transition-opacity font-medium"
            >
              {item.label}
            </Link>
          )}
        </div>
        {item.dropdown && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-6 w-6 text-white/70" />
          </motion.div>
        )}
      </motion.div>

      {isOpen && item.dropdown && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden pl-4 bg-white/5 backdrop-blur-sm"
        >
          {item.dropdownItems.map((subItem, subIndex) => (
            <motion.li
              key={subItem.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: subIndex * 0.1, duration: 0.3 }}
              className="py-3 px-4"
            >
              <Link
                href={subItem.href}
                onClick={closeMenu}
                className="text-white/80 hover:text-white transition-all duration-300 text-lg flex items-center gap-3 hover:translate-x-2"
              >
                <subItem.icon className="h-4 w-4 text-blue-300" />
                {subItem.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.li>
  );
};

// Main component
export default function MetroNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("UZ");
  const [hoveredItem, setHoveredItem] = useState(null);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isScrolled = useScrollDetection();

  // Check if current path should hide navbar
  const parts = pathname.split("/").filter(Boolean);
  const isHiddenPath =
    parts[1] === "metro-xaritasis" || parts[1] === "normalMap";

  // Update current language when locale changes
  useEffect(() => {
    setCurrentLang(locale.toUpperCase());
  }, [locale]);

  // Handle language change
  const changeLanguage = useCallback(
    (lang) => {
      const segments = pathname.split("/");
      segments[1] = lang.toLowerCase();
      router.push(segments.join("/"));
    },
    [pathname, router]
  );

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!isMenuOpen && !target.closest(".dropdown-container")) {
        setActiveDropdown(null);
        setIsLangOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Event handlers
  const toggleMenu = useCallback(
    () => setIsMenuOpen(!isMenuOpen),
    [isMenuOpen]
  );

  const handleDropdownClick = useCallback(
    (index) => {
      setActiveDropdown(activeDropdown === index ? null : index);
    },
    [activeDropdown]
  );

  const handleLangClick = useCallback(() => {
    setIsLangOpen(!isLangOpen);
    setActiveDropdown(null);
  }, [isLangOpen]);

  const handleLanguageChange = useCallback(
    (lang) => {
      setCurrentLang(lang);
      setIsLangOpen(false);
      changeLanguage(lang);
    },
    [changeLanguage]
  );

  const handleMouseEnter = useCallback((index) => {
    setHoveredItem(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  if (isHiddenPath) return null;

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full z-50 transition-all rounded-b-[50px] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isScrolled
            ? "bg-gradient-to-r from-[#0E327F]/95 via-blue-800/95 to-[#0E327F]/95 backdrop-blur-xl pt-0"
            : "bg-transparent pt-5"
        }`}
      >
        <BackgroundPattern />

        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isScrolled ? "container-none px-0" : "container"
          }`}
        >
          <div
            className={`flex items-center justify-between h-[70px] text-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
              isScrolled
                ? "bg-transparent px-8 mx-0 rounded-none"
                : "bg-gradient-to-r from-[#0E327F] via-blue-800 to-[#0E327F] px-6 rounded-2xl backdrop-blur-lg"
            }`}
          >
            <BackgroundPattern />

            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden 2xl:flex items-center space-x-1">
              {MENU_ITEMS.map((item, index) => (
                <DesktopNavItem
                  key={item.label}
                  item={item}
                  index={index}
                  isScrolled={isScrolled}
                  activeDropdown={activeDropdown}
                  hoveredItem={hoveredItem}
                  onDropdownClick={handleDropdownClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              <LanguageSelector
                currentLang={currentLang}
                isLangOpen={isLangOpen}
                onLangClick={handleLangClick}
                onLanguageChange={handleLanguageChange}
              />

              <motion.button
                onClick={toggleMenu}
                className="2xl:hidden z-50 text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={28} />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-gradient-to-br from-[#0E327F] via-blue-800 to-[#0E327F] z-40 flex flex-col backdrop-blur-xl"
          >
            {/* Mobile header */}
            <div className="container">
              <div className="flex items-center justify-between h-[90px]">
                <motion.div
                  className="flex items-center gap-3 justify-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link href="/">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src="/logos.png"
                        alt="Toshkent metro logo"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </motion.div>
                  </Link>

                  <div className="h-[40px] flex flex-col justify-center">
                    <div className="border-l-2 border-[#00B0FF] h-[30%] w-full"></div>
                    <div className="border-l-2 border-[#FF454B] h-[5%] w-full"></div>
                    <div className="border-l-2 border-white h-[30%] w-full"></div>
                    <div className="border-l-2 border-[#FF454B] h-[5%] w-full"></div>
                    <div className="border-l-2 border-[#00B100] h-[30%] w-full"></div>
                  </div>

                  <h2 className="text-white text-[10px] capitalize font-medium">
                    O'zbekiston Respublikasi Transport vazirligi{" "}
                    <span className="text-blue-200 font-semibold">
                      "Toshkent Metropoliteni"
                    </span>{" "}
                    DUK
                  </h2>
                </motion.div>

                <motion.button
                  onClick={toggleMenu}
                  className="text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={32} />
                </motion.button>
              </div>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-grow overflow-y-auto container mx-auto">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="flex flex-col text-xl text-white space-y-2"
              >
                {MENU_ITEMS.map((item, index) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    index={index}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    closeMenu={closeMenu}
                  />
                ))}
              </motion.ul>
            </nav>

            {/* Mobile footer */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="container py-6"
            >
              {/* Language buttons */}
              <div className="flex justify-center gap-4 mb-8">
                {LANGUAGES.filter((lang) => lang !== currentLang).map(
                  (lang, index) => (
                    <motion.button
                      key={lang}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                      onClick={() => {
                        setCurrentLang(lang);
                        changeLanguage(lang);
                        setIsMenuOpen(false);
                      }}
                      className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 bg-white/10 text-white hover:bg-white/20 hover:scale-105 backdrop-blur-sm border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {lang}
                    </motion.button>
                  )
                )}
              </div>

              {/* Divider */}
              <motion.div
                className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />

              {/* Social links */}
              <div className="flex justify-center gap-8 pb-10">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white/70 transition-all duration-300 p-3 rounded-full backdrop-blur-sm border border-white/20 ${social.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
