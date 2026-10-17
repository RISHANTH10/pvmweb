"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Cormorant_Garamond, Outfit } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300"],
});

const words = ["tomorrow", "student", "future", "generation", "dream"];
const COLORS = ["#FDE68A", "#FED7AA", "#A7F3D0", "#BFDBFE", "#FBCFE8"];

const Herosection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[650px] md:h-[650px] overflow-hidden">
      <Image
        src="/images/staff/faculty.JPG"
        alt="school"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-start mt-40 z-20 text-center px-6">

        <h3 className={`${outfit.className} font-thin`}>Our Faculty</h3>
        <h2
          className={`${outfit.className} text-[35px] font-light text-white`}
          style={{lineHeight: "1.2" }}
        >
          The minds that shape every{" "}
          <span className="relative inline-block" style={{ minWidth: "180px" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: "60%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-60%", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 italic"
                style={{ color: COLORS[index % COLORS.length] }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
            <span className="invisible">
              {words.reduce((a, b) => (a.length > b.length ? a : b))}
            </span>
          </span>
        </h2>

        <p
          className={`${outfit.className} mt-1 text-white text-sm`}
          style={{ fontWeight: 300 }}
        >
          Mamandur, Tamil Nadu
        </p>
      </div>

      {/* Wave */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          className="relative block w-full h-[100px] md:h-[140px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="100 20 1100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160 Q300,0 600,80 T1200,48 L1200,160 L0,160 Z"
            fill="#ffffff"
          />
        </svg>
      </div> */}
    </section>
  );
};

export default Herosection;