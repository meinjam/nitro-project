import canBlue from "../assets/can-blue.png";
import canEng from "../assets/can-eng.png";
import canGreenVertical from "../assets/can-green-vertical.png";
import canRed from "../assets/can-red.png";
import canSky from "../assets/can-sky.png";

export interface NitroProduct {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  image: string;
  accentColor: string;
  glowColor: string;
  flavor: string;
  caffeine: string;
  calories: string;
  volume: string;
  description: string;
}

export const NITRO_PRODUCTS: NitroProduct[] = [
  {
    id: "nitro-eng",
    name: "NiTRO ENG",
    shortName: "ENG",
    subtitle: "High intensity",
    price: 10.58,
    formattedPrice: "10.58 $",
    image: canEng,
    accentColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.45)",
    flavor: "Golden Citrus Strike",
    caffeine: "200 mg",
    calories: "10 kcal",
    volume: "500 ml",
    description:
      "Classic amber citrus surge formulated with zero sugar, B-vitamins, and clean electrolytes for sustained output.",
  },
  {
    id: "nitro-red",
    name: "NiTRO RED",
    shortName: "RED",
    subtitle: "High intensity",
    price: 11.0,
    formattedPrice: "11.00 $",
    image: canRed,
    accentColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.45)",
    flavor: "Crimson Berry Rush",
    caffeine: "200 mg",
    calories: "10 kcal",
    volume: "500 ml",
    description:
      "Bold red fruit ignition delivering razor-sharp focus and explosive pre-session energy without the crash.",
  },
  {
    id: "nitro-green",
    name: "NiTRO GREEN",
    shortName: "GREEN",
    subtitle: "High intensity",
    price: 12.0,
    formattedPrice: "12.00 $",
    image: canGreenVertical,
    accentColor: "#e0e600",
    glowColor: "rgba(224, 230, 0, 0.55)",
    flavor: "Electric Lime Voltage",
    caffeine: "220 mg",
    calories: "0 kcal",
    volume: "500 ml",
    description:
      "Our flagship 2002 formula reimagined — crisp electric lime with maximum intensity, zero sugar, and relentless drive.",
  },
  {
    id: "nitro-sky",
    name: "NiTRO SKY",
    shortName: "SKY",
    subtitle: "High intensity",
    price: 11.0,
    formattedPrice: "11.00 $",
    image: canSky,
    accentColor: "#00b2ff",
    glowColor: "rgba(0, 178, 255, 0.45)",
    flavor: "Arctic Glacier Mint",
    caffeine: "200 mg",
    calories: "5 kcal",
    volume: "500 ml",
    description:
      "Sub-zero glacial refreshment engineered to cool down heat and lock in mental clarity under pressure.",
  },
  {
    id: "nitro-blue",
    name: "NiTRO BLUE",
    shortName: "BLUE",
    subtitle: "High intensity",
    price: 10.58,
    formattedPrice: "10.58 $",
    image: canBlue,
    accentColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.48)",
    flavor: "Cobalt Blueberry Charge",
    caffeine: "200 mg",
    calories: "10 kcal",
    volume: "500 ml",
    description:
      "Deep cobalt berry profile packed with taurine, L-carnitine, and zero-sugar endurance fuel.",
  },
];
