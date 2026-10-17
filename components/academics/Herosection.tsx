"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Sora, Comfortaa } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});


export default function AcademicsHero() {
  return (
    <section
      className={`relative h-[25rem] flex flex-col overflow-hidden bg-orange-500 ${sora.className}`}
    >
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 lg:px-20">

        <h1 className="font-bold text-black text-[16vw] md:text-[100px] leading-[0.88] tracking-tight">
          Academics@pvm
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between mt-8 gap-6">
        </div>
      </div>
    </section>
  );
}