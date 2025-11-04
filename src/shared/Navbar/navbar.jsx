"use client";
import {
  ChevronDown,
  Menu,
  X,
  Globe,
  MapPin,
  CreditCard,
  Users,
  Info,
  Phone,
  Hand,
  ScanFace,
  Sparkles,
  ArrowUpFromLine as ChartNoAxesCombined,
  ShieldAlert as ShieldUser,
  Film,
  Building,
  UsersRound,
  FileCheck2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
const LANGUAGES = ["UZ", "RU", "EN"];
const getMenuItems = (t) => [
  {
    label: t("map"),
    href: "/metro-xaritasis",
    icon: MapPin,
  },
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
      {
        label: t("stateSymbols"),
        href: "/davlat-ramzlari",
        icon: Sparkles,
      },
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
      {
        label: t("aboutOrganization"),
        href: "/metro-tarixi",
        icon: Building,
      },
      { label: t("management"), href: "/Raxbariyat", icon: Users },
      {
        label: t("structure"),
        href: "/tarkibiy-bolinmalar",
        icon: Building,
      },
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
export default function Navbar() {
  const t = useTranslations("menu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
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
    [pathname, router]
  );
  const isHidden =
    pathname.includes("metro-xaritasis") || pathname.includes("normalMap");
  const isHomePage = pathname === "/" || pathname === `/${locale}`;
  const menuItems = getMenuItems(t);
  if (isHidden) return null;
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
          {
            color: "#00B0FF",
            height: "30%",
            delay: 0.1,
          },
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
        className="hidden md:block text-[11px] lg:text-[10px] w-[150px] lg:w-[150px] font-medium leading-tight text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {t("logo1")} <span>{t("logo2")}</span> {t("logo3")}
      </motion.h1>
    </motion.div>
  );
  if (isHomePage) {
    return (
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-[#173aad]" : "bg-transparent"
        }`}
      >
        {isScrolled && (
          <div className="absolute inset-0 opacity-20 -z-50">
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: 'url("/naqsh.png")',
                backgroundRepeat: "repeat",
                backgroundSize: "200px",
              }}
            />
          </div>
        )}
        <div className="mx-auto flex container items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <nav className="hidden gap-1 lg:flex">
            {menuItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="border-none outline-none">
                    <Button
                      variant="ghost"
                      className="gap-1 text-xs duration-500 text-white font-medium hover:bg-white/10 rounded-lg px-3 py-2 hover:text-gray-400"
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 bg-white/50 backdrop-blur-md border border-white/20 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200"
                  >
                    {Array.isArray(item.dropdownItems) &&
                      item.dropdownItems.map((sub, idx) => {
                        const IconComponent = sub.icon;
                        return (
                          <DropdownMenuItem
                            key={sub.label}
                            asChild
                            className="cursor-pointer hover:bg-blue-100 transition-colors duration-150 focus:bg-blue-50 rounded-xl"
                          >
                            <Link
                              href={sub.href}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700"
                            >
                              <IconComponent className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              {sub.label}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="text-xs text-white hover:text-gray-400 duration-500 hover:bg-white/10 rounded-lg px-3 py-2"
                  asChild
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              )
            )}
          </nav>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hidden sm:flex text-white bg-none border-none outline-none hover:bg-white/10 hover:text-white/60 rounded-lg px-3 py-2 transition-colors duration-200"
                >
                  <Globe className="h-4 w-4" />
                  {locale.toUpperCase()}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200 text-center"
              >
                {LANGUAGES.filter((l) => l !== locale.toUpperCase()).map(
                  (lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className="cursor-pointer hover:bg-blue-50 transition-colors duration-150 focus:bg-blue-50"
                    >
                      <span className="font-medium text-slate-700">{lang}</span>
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t bg-white/10 backdrop-blur-sm lg:hidden">
            <div className="space-y-1 px-4 py-4">
              {menuItems?.map((item) =>
                item.dropdownItems ? (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setExpandedMenu(
                          expandedMenu === item.label ? null : item.label
                        )
                      }
                      className="w-full text-left px-2 py-2 text-sm font-medium rounded-md hover:bg-white/20 flex justify-between items-center text-white"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && (
                          <item.icon className="h-4 w-4 text-white flex-shrink-0" />
                        )}
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedMenu === item.label && (
                      <div className="space-y-1 pl-4 py-1">
                        {item.dropdownItems.map((sub) => {
                          const IconComponent = sub.icon;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 px-2 py-1.5 text-sm text-white hover:text-gray-200 rounded-md hover:bg-white/20"
                            >
                              <IconComponent className="h-3.5 w-3.5 text-white flex-shrink-0" />
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-2 py-2 text-sm font-medium rounded-md hover:bg-white/20 text-white"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && (
                        <item.icon className="h-4 w-4 text-white flex-shrink-0" />
                      )}
                      {item.label}
                    </span>
                  </Link>
                )
              )}
              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="text-xs font-semibold text-white px-2 mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {t("Language")}
                </div>
                <div className="flex gap-2">
                  {LANGUAGES.filter((l) => l !== locale.toUpperCase()).map(
                    (lang) => (
                      <button
                        key={lang}
                        onClick={() => changeLanguage(lang)}
                        className="flex-1 px-2 py-1.5 text-xs font-medium rounded-md bg-white/20 hover:bg-white/30 transition-colors duration-150 text-white"
                      >
                        {lang}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#173aad]">
        <div className="absolute inset-0 opacity-20 -z-50">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: 'url("/naqsh.png")',
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
            }}
          />
        </div>
        <div className="mx-auto flex container items-center justify-between py-4">
          <Logo />

          <nav className="hidden gap-1 lg:flex">
            {menuItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="border-none outline-none">
                    <Button
                      variant="ghost"
                      className="gap-1 text-xs duration-500 text-white font-medium hover:bg-white/10 rounded-lg px-3 py-2 hover:text-gray-400"
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 bg-white/50 backdrop-blur-md border border-white/20 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200"
                  >
                    {Array.isArray(item.dropdownItems) &&
                      item.dropdownItems.map((sub, idx) => {
                        const IconComponent = sub.icon;
                        return (
                          <DropdownMenuItem
                            key={sub.label}
                            asChild
                            className="cursor-pointer hover:bg-blue-100 transition-colors duration-150 focus:bg-blue-50 rounded-xl"
                          >
                            <Link
                              href={sub.href}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700"
                            >
                              <IconComponent className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              {sub.label}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="text-xs text-white hover:text-gray-400 duration-500 hover:bg-white/10 rounded-lg px-3 py-2"
                  asChild
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hidden sm:flex text-white bg-none border-none outline-none hover:bg-white/10 hover:text-white/60 rounded-lg px-3 py-2 transition-colors duration-200"
                >
                  <Globe className="h-4 w-4" />
                  {locale.toUpperCase()}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200 text-center"
              >
                {LANGUAGES.filter((l) => l !== locale.toUpperCase()).map(
                  (lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className="cursor-pointer hover:bg-blue-50 transition-colors duration-150 focus:bg-blue-50"
                    >
                      <span className="font-medium text-slate-700">{lang}</span>
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t bg-white backdrop-blur-sm dark:bg-slate-950/50 lg:hidden">
            <div className="space-y-1 px-4 py-4">
              {menuItems.map((item) =>
                item.dropdownItems ? (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setExpandedMenu(
                          expandedMenu === item.label ? null : item.label
                        )
                      }
                      className="w-full text-left px-2 py-2 text-sm font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 flex justify-between items-center text-slate-700 dark:text-slate-300"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && (
                          <item.icon className="h-4 w-4 text-slate-700 dark:text-slate-300 flex-shrink-0" />
                        )}
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedMenu === item.label && (
                      <div className="space-y-1 pl-4 py-1">
                        {item.dropdownItems.map((sub) => {
                          const IconComponent = sub.icon;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 px-2 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <IconComponent className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-2 py-2 text-sm font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && (
                        <item.icon className="h-4 w-4 text-slate-700 dark:text-slate-300 flex-shrink-0" />
                      )}
                      {item.label}
                    </span>
                  </Link>
                )
              )}

              <div className="border-t border-slate-700 pt-4 mt-4">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {t("Language")}
                </div>
                <div className="flex gap-2">
                  {LANGUAGES.filter((l) => l !== locale.toUpperCase()).map(
                    (lang) => (
                      <button
                        key={lang}
                        onClick={() => changeLanguage(lang)}
                        className="flex-1 px-2 py-1.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-150"
                      >
                        {lang}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
