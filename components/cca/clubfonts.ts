import { Montserrat, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

// "Humane Bold" — place the file at: components/clubs/fonts/Humane-Bold.ttf
// (rename the src below if your file uses a different name/extension)
export const humane = localFont({
  src: "./fonts/Humane-Bold.ttf",
  variable: "--font-humane",
  display: "swap",
});

// Tagline under the title + each card's title
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-montserrat",
});

// Card body / motto text
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-space-grotesk",
});

export const fontVars = `${humane.variable} ${montserrat.variable} ${spaceGrotesk.variable}`;