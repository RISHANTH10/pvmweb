"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Space_Grotesk, Montserrat } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
});

interface AboutHeroProps {
  backgroundImage?: string;
  logoImage?: string;
  penImage?: string;
  booksImage?: string;
}

// Single shared shadow recipe so every element reads as lit from the same
// light source (upper-left) casting shadow down-and-right.
const SHADOW = "12px 16px 18px rgba(0,0,0,0.45)";

export default function AboutHero({
  backgroundImage = "/images/abouthero1.png",
  logoImage = "/images/aboutlogo.png",
  penImage = "/images/pen.png",
  booksImage = "/images/books.png",
}: AboutHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className={`${spaceGrotesk.variable} ${montserrat.variable} relative w-full h-screen overflow-hidden`}
    >
      {/* Background wood texture - stays put, no animation */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Heading - top left, quick fade in, cast shadow down-right */}
      <h1
        style={{ textShadow: SHADOW }}
        className={`absolute top-[13%] left-[6%] z-20 font-[family-name:var(--font-montserrat)] font-bold text-[#fffce6]
          text-6xl sm:text-6xl md:text-7xl tracking-[-13px] lg:text-[10rem] leading-none
          transition-opacity duration-500 ease-out delay-150 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
      >
        About Us
      </h1>

      {/* Logo badge - top right, slides down into place */}
      <div
        style={{ filter: `drop-shadow(${SHADOW})` }}
        className={`absolute top-[8%] right-[17%] z-20 scale-[1.80] rotate-[12deg]
          transition-all duration-[1100ms] ease-out delay-300 ${
            mounted ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"
          }`}
      >
        <Image
          src={logoImage}
          alt="Learn to Lead"
          width={230}
          height={230}
        />
      </div>

      {/* Quote - right side, quick fade in */}
      <p
        style={{ textShadow: SHADOW }}
        className={`absolute top-[42%] right-[3%] z-20 w-[55%] max-w-[850px]
          font-[family-name:var(--font-space-grotesk)] font-medium text-white text-center
          text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed
          transition-opacity duration-500 ease-out delay-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
      >
        &ldquo;At Prasan Vidya Mandir, we nurture curious minds through
        quality education, strong values, creativity, and meaningful
        experiences that empower students to learn, lead, grow, and
        confidently shape a brighter future.&rdquo;
      </p>

      {/* Books - bottom left, slides in from the left */}
      <div
        style={{ filter: `drop-shadow(${SHADOW})` }}
        className={`absolute top-[30%] left-[-4%] z-10 w-[62%] max-w-[1200px]
          transition-all duration-[1100ms] ease-out delay-700 ${
            mounted
              ? "translate-x-0 translate-y-0 opacity-100"
              : "-translate-x-24 translate-y-24 opacity-0"
          }`}
      >
        <Image
          src={booksImage}
          alt=""
          width={1000}
          height={800}
          className="w-full h-auto"
        />
      </div>

      {/* Pen - bottom right, slides in from the right */}
      <div
        style={{ filter: `drop-shadow(${SHADOW})` }}
        className={`absolute bottom-[7%] right-[-10%] z-10 w-[38%] max-w-[720px]
          transition-all duration-[1100ms] ease-out delay-[900ms] ${
            mounted
              ? "translate-x-0 translate-y-0 opacity-100"
              : "translate-x-24 translate-y-24 opacity-0"
          }`}
      >
        <Image
          src={penImage}
          alt=""
          width={480}
          height={480}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}