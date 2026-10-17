import localFont from "next/font/local";
import { Space_Grotesk, Montserrat } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
export const humane = localFont({
  src: "../public/fonts/static/Humane-Medium.ttf",
  variable: "--font-humane",
  display: "swap",
});