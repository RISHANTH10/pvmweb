"use client";

import React, { useRef } from "react";
import { Comfortaa, Sora, Space_Grotesk } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700"],
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const spacegrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const providesData = [
  {
    title: "Kindergarten",
    subtitle: "LKG – UKG",
    para: "A joyful and nurturing environment where children learn through play, exploration, creativity, and meaningful experiences.",
    image: "/images/kindergarden.png",
  },
  {
    title: "Primary School",
    subtitle: "Classes I – V",
    para: "Building strong foundations in academics, communication, and values through engaging and activity-based learning.",
    image: "/images/middle.png",
  },
  {
    title: "Middle School",
    subtitle: "Classes VI – VIII",
    para: "Encouraging curiosity, critical thinking, and subject mastery while preparing students for greater academic challenges.",
    image: "/images/primary.png",
  },
  {
    title: "Higher Secondary",
    subtitle: "Classes IX – XII",
    para: "Focused learning and comprehensive preparation that equips students for board examinations, higher education, and future careers.",
    image: "/images/higher.png",
  },
];

function StackCard({
  item,
  index,
  total,
  containerRef,
}: {
  item: (typeof providesData)[0];
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const segmentSize = 1 / total;
  const cardStart = index * segmentSize;
  const cardEnd = cardStart + segmentSize;

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [1, 1 - (total - index - 1) * 0.04]
  );

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    ["80px", "0px"]
  );

  const topOffset = index * 28;

  return (
    <motion.div
      style={{
        scale,
        y,
        top: `calc(80px + ${topOffset}px)`,
        zIndex: index + 1,
      }}
      className={`sticky h-[32rem] md:h-[28rem] rounded-[32px] overflow-hidden shadow-2xl shadow-black/10`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Glassmorphism white overlay + blur over the image */}
      <div className="absolute inset-0 bg-black/30 " />

      {/* Soft bottom gradient so text stays readable over busy photos */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Decorative glow accents */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-white/20 blur-3xl" />

      {/* Glass border for extra glass-panel feel */}
      <div className="absolute inset-0 rounded-[32px] border border-white/50" />

      <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
        <div>
          <span className={`${comfortaa.className} text-[14px] text-white/60`}>
            Education@pvm
          </span>
        </div>

        <div>
          <h2
            className={`${spacegrotesk.className} text-white text-5xl md:text-7xl font-light leading-[0.95] mb-6`}
          >
            {item.title}
          </h2>

          <p
            className={`${sora.className} text-white text-base md:text-lg leading-relaxed max-w-xl`}
          >
            {item.para}
          </p>

          <button className="mt-8 rounded-full bg-white backdrop-blur-sm px-7 py-3 text-sm font-medium tracking-wide text-black transition-all duration-300 hover:bg-white/35">
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const Classes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-white py-20">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/cbse.png"
                alt="CBSE Logo"
                className="h-12 w-12 object-contain"
              />
              <p className={`${comfortaa.className} text-gray-500 text-sm`}>
                AFFILIATED TO CBSE, NEW DELHI
              </p>
            </div>

            <h2
              className={`${spacegrotesk.className} text-5xl md:text-7xl text-black font-light leading-[0.95]`}
            >
              Academic
              <br />
              Programmes
            </h2>

            <p
              className={`${comfortaa.className} text-gray-500 max-w-xl mt-8 leading-relaxed`}
            >
              Carefully designed learning pathways that guide students from
              foundational education to higher secondary excellence while
              nurturing confidence, curiosity, and character.
            </p>
          </div>

          <div className="grid gap-5">
            <div className="border border-gray-200 rounded-3xl p-6">
              <h3
                className={`${spacegrotesk.className} text-4xl text-black font-light`}
              >
                KG – XII
              </h3>
              <p className={`${comfortaa.className} text-gray-500 mt-2 text-sm`}>
                Complete academic journey under one campus.
              </p>
            </div>

            <div className="border border-gray-200 rounded-3xl p-6">
              <h3
                className={`${spacegrotesk.className} text-4xl text-black font-light`}
              >
                CBSE
              </h3>
              <p className={`${comfortaa.className} text-gray-500 mt-2 text-sm`}>
                Structured curriculum focused on academic excellence.
              </p>
            </div>

            <div className="border border-gray-200 rounded-3xl p-6">
              <h3
                className={`${spacegrotesk.className} text-4xl text-black font-light`}
              >
                Holistic
              </h3>
              <p className={`${comfortaa.className} text-gray-500 mt-2 text-sm`}>
                Balanced development through academics, arts, and sports.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Image + Stack Cards wrapper */}
      <div className="relative px-5 md:px-8">
        {/* Student Image — behind cards, bottom half hidden by first card */}
        <div className="relative flex justify-center" style={{ zIndex: 0 }}>
          <img
            src="/images/student.png"
            alt="Student"
            className="h-[420px] object-contain object-bottom"
          />
        </div>

        {/* Stack Cards */}
        <div
          ref={containerRef}
          className="relative"
          style={{ height: `${providesData.length * 520}px`, zIndex: 1, marginTop: "-210px" }}
        >
          {providesData.map((item, index) => (
            <StackCard
              key={index}
              item={item}
              index={index}
              total={providesData.length}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Classes;