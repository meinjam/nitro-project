import type { StaticImageData } from "next/image";
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
  titleImage: StaticImageData;
  /** Exact Figma `Pack 1` HUE solid fill color; omitted for native NiTRO GREEN. */
  hueColor?: string;
}

export const CENTER_PRODUCT_INDEX = 2;

export const NITRO_PRODUCTS: NitroProduct[] = [
  {
    id: "nitro-eng",
    name: "NiTRO ENG",
    subtitle: "High intensity",
    price: "10.58 $",
    titleImage: titleEng,
    hueColor: "#ff8000",
  },
  {
    id: "nitro-red",
    name: "NiTRO RED",
    subtitle: "High intensity",
    price: "11.00 $",
    titleImage: titleRed,
    hueColor: "#ff0000",
  },
  {
    id: "nitro-green",
    name: "NiTRO GREEN",
    subtitle: "High intensity",
    price: "12.00 $",
    titleImage: titleGreen,
  },
  {
    id: "nitro-sky",
    name: "NiTRO SKY",
    subtitle: "High intensity",
    price: "11.00 $",
    titleImage: titleSky,
    hueColor: "#00b2ff",
  },
  {
    id: "nitro-blue",
    name: "NiTRO BLUE",
    subtitle: "High intensity",
    price: "10.58 $",
    titleImage: titleBlue,
    hueColor: "#0004ff",
  },
];
