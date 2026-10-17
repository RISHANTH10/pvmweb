"use client";

import Image from "next/image";
import { Montserrat,Anek_Tamil } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
const tamil = Anek_Tamil({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden font-[family-name:var(--font-montserrat)]">
      {/* Background video */}
      <video
        src="/videos/pvm.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Dark overlay so white text stays readable over the video */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-16 text-center">
        {/* Logo + Tamil name */}
        <div className="mb-0 flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Prasan Vidya Mandir logo"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <span className={`${tamil.className} text-[18px] text-white`}>
            பிரசன் வித்யா மந்திர்
          </span>
        </div>

        {/* Main heading */}
        <h1
          className={`${montserrat.className} max-w-7xl text-4xl leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-5xl`}
        >
          <span className="font-thin">PRASAN</span>{" "}
          <span className="font-black">VIDYA MANDIR</span>
        </h1>

        {/* Two-line description */}
        <p className={`${montserrat.className} mt-1 max-w-3xl text-sm text-white/80 sm:text-base`}>
          Recognized among the best, our strength lies in purposeful
          nurturing that shapes capable, compassionate and confident
          learners.
        </p>

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/login"
            className={`${montserrat.className} inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105`}
          >
            Apply for Admission
            <ArrowRightIcon className="h-4 w-4" />
          </a>
          <a
            href="/SchoolDetails"
            className={`${montserrat.className} inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105`}
          >
            Mandatory Disclouser
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}