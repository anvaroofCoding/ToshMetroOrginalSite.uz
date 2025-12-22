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
