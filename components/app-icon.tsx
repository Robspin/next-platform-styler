import type * as React from "react";

import { IconPlaceholder } from "@/components/icon-placeholder";
import type { IconLibraryName } from "@/lib/design-system/config";

const APP_ICONS = {
  dashboard: {
    lucide: "HouseIcon",
    tabler: "IconHome",
    hugeicons: "Home01Icon",
    phosphor: "HouseIcon",
    remixicon: "RiHomeLine",
  },
  investigations: {
    lucide: "SearchIcon",
    tabler: "IconSearch",
    hugeicons: "Search01Icon",
    phosphor: "MagnifyingGlassIcon",
    remixicon: "RiSearchLine",
  },
  theftCases: {
    lucide: "FolderIcon",
    tabler: "IconFolder",
    hugeicons: "Folder01Icon",
    phosphor: "FolderIcon",
    remixicon: "RiFolderLine",
  },
  theftAnalytics: {
    lucide: "ChartLineIcon",
    tabler: "IconChartLine",
    hugeicons: "ChartLineData01Icon",
    phosphor: "ChartLineIcon",
    remixicon: "RiLineChartLine",
  },
  heatmaps: {
    lucide: "MapPinIcon",
    tabler: "IconMapPin",
    hugeicons: "Location01Icon",
    phosphor: "MapPinIcon",
    remixicon: "RiMapPinLine",
  },
  waypoints: {
    lucide: "RouteIcon",
    tabler: "IconRoute",
    hugeicons: "Route01Icon",
    phosphor: "PathIcon",
    remixicon: "RiRouteLine",
  },
  frameCheck: {
    lucide: "BarcodeIcon",
    tabler: "IconBarcode",
    hugeicons: "BarCode01Icon",
    phosphor: "BarcodeIcon",
    remixicon: "RiBarcodeLine",
  },
  intake: {
    lucide: "ClipboardListIcon",
    tabler: "IconClipboardList",
    hugeicons: "Task01Icon",
    phosphor: "ClipboardTextIcon",
    remixicon: "RiClipboardLine",
  },
  recoveryOperations: {
    lucide: "UsersIcon",
    tabler: "IconUsers",
    hugeicons: "UserGroupIcon",
    phosphor: "UsersIcon",
    remixicon: "RiGroupLine",
  },
  intelligence: {
    lucide: "GlobeIcon",
    tabler: "IconWorld",
    hugeicons: "Globe02Icon",
    phosphor: "GlobeIcon",
    remixicon: "RiGlobalLine",
  },
  integrations: {
    lucide: "PuzzleIcon",
    tabler: "IconPuzzle",
    hugeicons: "PuzzleIcon",
    phosphor: "PuzzlePieceIcon",
    remixicon: "RiPuzzleLine",
  },
  reporting: {
    lucide: "ChartColumnIcon",
    tabler: "IconChartBar",
    hugeicons: "ChartColumnIcon",
    phosphor: "ChartBarIcon",
    remixicon: "RiBarChartLine",
  },
  administration: {
    lucide: "SettingsIcon",
    tabler: "IconSettings",
    hugeicons: "Settings01Icon",
    phosphor: "GearIcon",
    remixicon: "RiSettings3Line",
  },
  support: {
    lucide: "CircleHelpIcon",
    tabler: "IconHelpCircle",
    hugeicons: "HelpCircleIcon",
    phosphor: "QuestionIcon",
    remixicon: "RiQuestionLine",
  },
  moon: {
    lucide: "MoonIcon",
    tabler: "IconMoon",
    hugeicons: "Moon02Icon",
    phosphor: "MoonIcon",
    remixicon: "RiMoonLine",
  },
  sun: {
    lucide: "SunIcon",
    tabler: "IconSun",
    hugeicons: "Sun03Icon",
    phosphor: "SunIcon",
    remixicon: "RiSunLine",
  },
  bell: {
    lucide: "BellIcon",
    tabler: "IconBell",
    hugeicons: "Notification03Icon",
    phosphor: "BellIcon",
    remixicon: "RiNotification3Line",
  },
  logo: {
    lucide: "RadarIcon",
    tabler: "IconRadar",
    hugeicons: "Radar01Icon",
    phosphor: "CrosshairIcon",
    remixicon: "RiRadarLine",
  },
  consumers: {
    lucide: "UsersIcon",
    tabler: "IconUsers",
    hugeicons: "UserGroupIcon",
    phosphor: "UsersIcon",
    remixicon: "RiGroupLine",
  },
  entities: {
    lucide: "BikeIcon",
    tabler: "IconBike",
    hugeicons: "Bicycle01Icon",
    phosphor: "BicycleIcon",
    remixicon: "RiBikeLine",
  },
  investigationsTotal: {
    lucide: "UserSearchIcon",
    tabler: "IconUserSearch",
    hugeicons: "UserSearch01Icon",
    phosphor: "UserFocusIcon",
    remixicon: "RiUserSearchLine",
  },
  trendUp: {
    lucide: "ArrowUpIcon",
    tabler: "IconArrowUp",
    hugeicons: "ArrowUp02Icon",
    phosphor: "ArrowUpIcon",
    remixicon: "RiArrowUpLine",
  },
  chevronRight: {
    lucide: "ChevronRightIcon",
    tabler: "IconChevronRight",
    hugeicons: "ArrowRight01Icon",
    phosphor: "CaretRightIcon",
    remixicon: "RiArrowRightSLine",
  },
  chevronDown: {
    lucide: "ChevronDownIcon",
    tabler: "IconChevronDown",
    hugeicons: "ArrowDown01Icon",
    phosphor: "CaretDownIcon",
    remixicon: "RiArrowDownSLine",
  },
  externalLink: {
    lucide: "ExternalLinkIcon",
    tabler: "IconExternalLink",
    hugeicons: "LinkSquare02Icon",
    phosphor: "ArrowSquareOutIcon",
    remixicon: "RiExternalLinkLine",
  },
  calendar: {
    lucide: "CalendarIcon",
    tabler: "IconCalendar",
    hugeicons: "Calendar03Icon",
    phosphor: "CalendarIcon",
    remixicon: "RiCalendarLine",
  },
  user: {
    lucide: "UserIcon",
    tabler: "IconUser",
    hugeicons: "UserIcon",
    phosphor: "UserIcon",
    remixicon: "RiUserLine",
  },
  logout: {
    lucide: "LogOutIcon",
    tabler: "IconLogout",
    hugeicons: "Logout01Icon",
    phosphor: "SignOutIcon",
    remixicon: "RiLogoutBoxLine",
  },
  fileText: {
    lucide: "FileTextIcon",
    tabler: "IconFileText",
    hugeicons: "File01Icon",
    phosphor: "FileTextIcon",
    remixicon: "RiFileTextLine",
  },
  shield: {
    lucide: "ShieldCheckIcon",
    tabler: "IconShieldCheck",
    hugeicons: "Shield01Icon",
    phosphor: "ShieldCheckIcon",
    remixicon: "RiShieldCheckLine",
  },
} satisfies Record<string, Record<IconLibraryName, string>>;

export type AppIconName = keyof typeof APP_ICONS;

export function AppIcon({
  name,
  ...props
}: {
  name: AppIconName;
  library?: IconLibraryName;
} & React.ComponentProps<"svg">) {
  return <IconPlaceholder {...APP_ICONS[name]} {...props} />;
}
