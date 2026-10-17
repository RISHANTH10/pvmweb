"use client";

import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { humane } from "@/lib/font";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-montserrat",
});

interface ContactHeroProps {
  address?: string;
  email?: string;
  phones?: string[];
  officeHours?: string[];
  recruitmentEmail?: string;
}

export default function ContactHero({
  address = "No: 98 & 99, Periya Maniyakara St, Chengalpattu, Gokulapuram, Tamil Nadu 603001",
  email = "prasanvidyamandir@gmail.com",
  phones = ["044 2742 2602", "+91-9841087708"],
  officeHours = ["Mon – Fri", "9:00 AM – 4:00 PM"],
  recruitmentEmail = "resumepvm@gmail.com",
}: ContactHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className={`${montserrat.variable} ${humane.variable} relative w-full min-h-screen bg-black overflow-hidden`}
    >
      {/* Giant "CONTACT US" title - slides in from above into its resting spot */}
      <h1
        className={`absolute -top-[-2vw] left-0 w-full z-10 text-center whitespace-nowrap
          font-[family-name:var(--font-humane)] uppercase text-white
          text-[48vw] leading-[0.8] tracking-[-11px] select-none
          transition-transform duration-1000 ease-out ${
            mounted ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        Contact Us
      </h1>

      {/* White panel - the whole group (panel + everything inside it) slides
          in from the bottom together as one unit, so it enters as a group
          rather than each line animating on its own. */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 bg-white
          rounded-t-[50px] md:rounded-t-[80px]
          pt-10 pb-14 px-6 md:px-16
          transition-transform duration-1000 ease-out delay-300 ${
            mounted ? "translate-y-0" : "translate-y-full"
          }`}
        style={{ top: "58%" }}
      >
        <div
          className={`font-[family-name:var(--font-montserrat)] max-w-5xl mx-auto h-full flex flex-col justify-center`}
        >
          {/* Address row */}
          <div className="text-center mb-10 md:mb-14">
            <p className="font-bold text-black text-lg md:text-xl mb-1">
              Address
            </p>
            <p className="font-light text-black/80 text-sm md:text-base">
              {address}
            </p>
          </div>
 
          {/* Info grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-10 md:gap-x-16 text-center">
            <div>
              <p className="font-bold text-black text-base md:text-lg mb-1">
                E-Mail
              </p>
              <p className="font-light text-black/80 text-sm md:text-base break-words">
                {email}
              </p>
            </div>

            <div>
              <p className="font-bold text-black text-base md:text-lg mb-1">
                Phone
              </p>
              {phones.map((phone) => (
                <p
                  key={phone}
                  className="font-light text-black/80 text-sm md:text-base"
                >
                  {phone}
                </p>
              ))}
            </div>

            <div>
              <p className="font-bold text-black text-base md:text-lg mb-1">
                Office Hours
              </p>
              {officeHours.map((line) => (
                <p
                  key={line}
                  className="font-light text-black/80 text-sm md:text-base"
                >
                  {line}
                </p>
              ))}
            </div>

            <div>
              <p className="font-bold text-black text-base md:text-lg mb-1">
                Teacher Recruitment
              </p>
              <p className="font-light text-black/80 text-sm md:text-base break-words">
                {recruitmentEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}