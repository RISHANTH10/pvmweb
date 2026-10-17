"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { annualPlannerData } from "@/data/annualplannerdata";
import { Space_Grotesk, Comfortaa } from "next/font/google";

const spacegrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300","400","500","600","700"] });
const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["300","400","500","600","700"] });

const MONTH_COLORS: Record<string, { accent: string; light: string; dot: string }> = {
  January:   { accent: "#185FA5", light: "#E6F1FB", dot: "#378ADD" },
  February:  { accent: "#0F6E56", light: "#E1F5EE", dot: "#1D9E75" },
  March:     { accent: "#993C1D", light: "#FAECE7", dot: "#D85A30" },
  April:     { accent: "#534AB7", light: "#EEEDFE", dot: "#7F77DD" },
  May:       { accent: "#854F0B", light: "#FAEEDA", dot: "#EF9F27" },
  June:      { accent: "#3B6D11", light: "#EAF3DE", dot: "#639922" },
  July:      { accent: "#993556", light: "#FBEAF0", dot: "#D4537E" },
  August:    { accent: "#185FA5", light: "#E6F1FB", dot: "#378ADD" },
  September: { accent: "#0F6E56", light: "#E1F5EE", dot: "#1D9E75" },
  October:   { accent: "#854F0B", light: "#FAEEDA", dot: "#EF9F27" },
  November:  { accent: "#534AB7", light: "#EEEDFE", dot: "#7F77DD" },
  December:  { accent: "#993C1D", light: "#FAECE7", dot: "#D85A30" },
};

export default function AnnualPlannerTimeline() {
  const months = Object.keys(annualPlannerData) as Array<keyof typeof annualPlannerData>;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const month = months[current];
  const colors = MONTH_COLORS[month];
  const dateGroups = annualPlannerData[month];

  const variants = {
    enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
  };

  return (
    <section ref={sectionRef} className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[360px_1fr] gap-16">

          {/* LEFT */}
          <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-8">
            <div>
              <h1 className={`flex flex-col gap-4 text-5xl font-bold text-black ${spacegrotesk.className}`}>
                <span>Upcoming Events</span>
                <span className="w-fit text-white bg-orange-500 rounded px-2 py-1">2026</span>
              </h1>
              <p className={`text-gray-500 text-[15px] leading-relaxed mt-5 ${comfortaa.className}`}>
                Explore important academic milestones, examinations, celebrations,
                competitions, excursions and student activities planned throughout the year.
              </p>
            </div>

            {/* Dot indicators */}
            <div className="flex flex-wrap gap-2">
              {months.map((m, i) => (
                <button
                  key={m}
                  onClick={() => go(i)}
                  title={m}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    i === current
                      ? "bg-orange-500 scale-125"
                      : "bg-gray-200 hover:bg-orange-300"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => go(current - 1)}
                disabled={current === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all
                  ${current === 0
                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-600"
                  } ${comfortaa.className}`}
              >
                ← Prev
              </button>

              <span className={`text-sm text-gray-400 ${comfortaa.className}`}>
                {current + 1} / {months.length}
              </span>

              <button
                onClick={() => go(current + 1)}
                disabled={current === months.length - 1}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all
                  ${current === months.length - 1
                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                    : "border-orange-400 text-orange-600 hover:bg-orange-50"
                  } ${comfortaa.className}`}
              >
                Next →
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={month}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {/* Month header */}
                <div className="flex items-center gap-4 mb-10">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colors.dot }}
                  />
                  <h2 className={`text-4xl md:text-5xl font-bold text-black ${spacegrotesk.className}`}>
                    {month}
                  </h2>
                  <div
                    className="h-[2px] flex-1 rounded-full"
                    style={{ backgroundColor: `${colors.dot}30` }}
                  />
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${comfortaa.className}`}
                    style={{ backgroundColor: colors.light, color: colors.accent }}
                  >
                    {dateGroups.reduce((acc, g) => acc + g.events.length, 0)} events
                  </span>
                </div>

                {/* Date groups */}
                <div className="space-y-6">
                  {dateGroups.map((group, gi) => (
                    <div key={gi} className="rounded-3xl border border-gray-100 p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-5">
                        <span
                          className={`text-base font-bold px-4 py-1.5 rounded-xl ${spacegrotesk.className}`}
                          style={{ backgroundColor: colors.light, color: colors.accent }}
                        >
                          {group.date}
                        </span>
                        <div
                          className="h-[1.5px] flex-1"
                          style={{ backgroundColor: `${colors.dot}20` }}
                        />
                      </div>

                      <div className="space-y-3">
                        {group.events.map((event, ei) => (
                          <div key={ei} className="flex items-start gap-3">
                            <div
                              className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 border-2"
                              style={{ borderColor: colors.dot, backgroundColor: "white" }}
                            />
                            <p className={`text-gray-700 leading-relaxed ${comfortaa.className}`}>
                              {event}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}