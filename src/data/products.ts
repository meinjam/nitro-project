import type { StaticImageData } from "next/image";
import canBlue from "@/assets/can-blue.png";
import canEng from "@/assets/can-eng.png";
import canGreenVertical from "@/assets/can-green-vertical.png";
import canRed from "@/assets/can-red.png";
import canSky from "@/assets/can-sky.png";
import titleBlue from "@/assets/title-blue.png";
import titleEng from "@/assets/title-eng.png";
import titleGreen from "@/assets/title-green.png";
import titleRed from "@/assets/title-red.png";
import titleSky from "@/assets/title-sky.png";

export interface NitroProduct {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  image: StaticImageData;
  titleImage: StaticImageData;
  glowColor: string;
  hueColor?: string;
}

export const NITRO_PRODUCTS: NitroProduct[] = [
  {
    id: "nitro-eng",
    name: "NiTRO ENG",
    subtitle: "High intensity",
    price: "10.58 $",
    image: canEng,
    titleImage: titleEng,
    glowColor: "rgba(245, 158, 11, 0.45)",
    hueColor: "#ff8000",
  },
  {
    id: "nitro-red",
    name: "NiTRO RED",
    subtitle: "High intensity",
    price: "11.00 $",
    image: canRed,
    titleImage: titleRed,
    glowColor: "rgba(239, 68, 68, 0.45)",
    hueColor: "#ff0000",
  },
  {
    id: "nitro-green",
    name: "NiTRO GREEN",
    subtitle: "High intensity",
    price: "12.00 $",
    image: canGreenVertical,
    titleImage: titleGreen,
    glowColor: "rgba(224, 230, 0, 0.45)",
  },
  {
    id: "nitro-sky",
    name: "NiTRO SKY",
    subtitle: "High intensity",
    price: "11.00 $",
    image: canSky,
    titleImage: titleSky,
    glowColor: "rgba(0, 178, 255, 0.45)",
    hueColor: "#00b2ff",
  },
  {
    id: "nitro-blue",
    name: "NiTRO BLUE",
    subtitle: "High intensity",
    price: "10.58 $",
    image: canBlue,
    titleImage: titleBlue,
    glowColor: "rgba(59, 130, 246, 0.48)",
    hueColor: "#0004ff",
  },
];
