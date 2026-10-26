import {
  DM_Sans,
  EB_Garamond,
  Figtree,
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Instrument_Sans,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Lora,
  Manrope,
  Merriweather,
  Montserrat,
  Noto_Sans,
  Noto_Serif,
  Nunito_Sans,
  Outfit,
  Oxanium,
  Playfair_Display,
  Public_Sans,
  Raleway,
  Roboto,
  Roboto_Slab,
  Source_Sans_3,
  Space_Grotesk,
} from "next/font/google";

// Every customizer font is registered up front; the browser only downloads the ones in use.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  preload: false,
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: false,
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  preload: false,
});
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  preload: false,
});
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  preload: false,
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  preload: false,
});
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  preload: false,
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  preload: false,
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  preload: false,
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  preload: false,
});
const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  preload: false,
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  preload: false,
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  preload: false,
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  preload: false,
});
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  preload: false,
});
const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  preload: false,
});
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  preload: false,
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  preload: false,
});
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  preload: false,
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  preload: false,
});
const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  preload: false,
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  preload: false,
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  preload: false,
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  preload: false,
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  preload: false,
});

export const fontVariables = [
  geist,
  geistMono,
  inter,
  notoSans,
  nunitoSans,
  figtree,
  roboto,
  raleway,
  dmSans,
  publicSans,
  outfit,
  oxanium,
  manrope,
  spaceGrotesk,
  montserrat,
  ibmPlexSans,
  sourceSans3,
  instrumentSans,
  jetbrainsMono,
  notoSerif,
  robotoSlab,
  merriweather,
  lora,
  playfairDisplay,
  ebGaramond,
  instrumentSerif,
]
  .map((font) => font.variable)
  .join(" ");
