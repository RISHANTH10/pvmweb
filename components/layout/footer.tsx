
"use client";

import Image from "next/image";
import { Space_Grotesk, Comfortaa, Poppins } from "next/font/google";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import MarquueeSchoolName from "../home/marqueeschoolname";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Footer() {
  return (
    <footer className="relative w-full min-h-[800px] bg-white text-black py-20 md:py-30">

      {/* School Name Marquee */}
      <MarquueeSchoolName />

      <div className="relative z-10 px-6 md:px-12 py-10">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 items-start">

          {/* Brand */}
          <div className="flex flex-col gap-4">

            {/* Uncomment if you want logo + school name */}
            {/*
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                width={40}
                height={30}
                alt="Prasan Vidya Mandir Logo"
                className="rounded-full"
              />

              <h1 className={`${poppins.className} text-xl font-bold`}>
                <span className="font-thin">PRASAN</span> VIDYA MANDIR
              </h1>
            </div>
            */}

            <p
              className={`${comfortaa.className} text-base text-black/60 leading-relaxed max-w-xs`}
            >
              Nurturing students for Global Readiness with Indian Roots.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">

            <h2
              className={`${spaceGrotesk.className} font-bold text-2xl md:text-3xl`}
            >
              Quick Links
            </h2>

            <div
              className={`${comfortaa.className} flex flex-col gap-4 text-black text-base`}
            >
              <a
                href="#"
                className="underline underline-offset-4 hover:text-black/60 transition"
              >
                <span className="text-[20px]">⤷</span> Home
              </a>

              <a
                href="#"
                className="underline underline-offset-4 hover:text-black/60 transition"
              >
                <span className="text-[20px]">⤷</span> About
              </a>

              <a
                href="#"
                className="underline underline-offset-4 hover:text-black/60 transition"
              >
                <span className="text-[20px]">⤷</span> Academics
              </a>

              <a
                href="#"
                className="underline underline-offset-4 hover:text-black/60 transition"
              >
                <span className="text-[20px]">⤷</span> Admissions
              </a>

              <a
                href="#"
                className="underline underline-offset-4 hover:text-black/60 transition"
              >
                <span className="text-[20px]">⤷</span> Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6">

            <h2
              className={`${spaceGrotesk.className} font-bold text-2xl md:text-3xl`}
            >
              Contact
            </h2>

            <div
              className={`${comfortaa.className} text-base space-y-5 text-black/70`}
            >

              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="shrink-0 mt-1"
                />

                <span>
                  Chengalpattu - 603101
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={20}
                  className="shrink-0"
                />

                <span>
                  +91 8072926643
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={20}
                  className="shrink-0 mt-1"
                />

                <span className="break-all">
                  info@prasanvidyamandir.com
                </span>
              </div>

            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-6">

            <h2
              className={`${spaceGrotesk.className} font-bold text-2xl md:text-3xl`}
            >
              Follow Us
            </h2>

            <div className="flex items-center gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="p-3 rounded-full hover:bg-black hover:text-white transition text-[25px]"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="p-3 rounded-full hover:bg-black hover:text-white transition text-[25px]"
              >
                <FaFacebook />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="p-3 rounded-full hover:bg-black hover:text-white transition text-[25px]"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="p-3 rounded-full hover:bg-black hover:text-white transition text-[25px]"
              >
                <FaYoutube />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div
          className={`${comfortaa.className} flex text-center text-sm text-black/50 mt-16 pt-6 border-t border-black/10`}
        >
          © 2026 Prasan Vidya Mandir. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

