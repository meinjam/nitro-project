import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "NiTRO — High Intensity Energy Drink",
  description:
    "Since 2002 producing high-intensity energy drinks. Nitro ENG, Nitro Red, Nitro Green, Nitro Sky, and Nitro Blue.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-black text-white antialiased selection:bg-nitro-yellow selection:text-black">
        {children}
      </body>
    </html>
  );
}
