"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface GridBox {
  label: string;
  content: string;
  bgImage: string;
  isCertificate?: boolean;
}

const BOXES: GridBox[] = [
  {
    label: "Motto",
    content: "Learn To Lead",
    bgImage: "/images/motto-bg.jpg",
  },
  {
    label: "Mission",
    content:
      "To inspire growth and harmony by fostering communication, creativity, critical thinking and empathy. Rooted in Indian values and traditions, we aim to cultivate a respectful, inclusive environment where ideas flourish, relationships deepen and cultural heritage is celebrated. Through these guiding principles we strive to build a future that honours the past while embracing Innovation and Collaboration.",
    bgImage: "/images/mission-bg.jpg",
  },
  {
    label: "Vision",
    content:
      "Nurturing Students for Global Readiness with Indian Roots",
    bgImage: "/images/vision-bg.jpg",
  },
  {
    label: "NABET Certification",
    content: "View our NABET accreditation certificate.",
    bgImage: "/images/nabet.png",
    isCertificate: true,
  },
];

export default function InfoGridSection() {
  const [certificateOpen, setCertificateOpen] = useState(false);

  return (
    <section
      className={`${montserrat.className} w-full bg-white px-6 py-16 sm:px-10 lg:px-16`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2">

        {BOXES.map((box, index) => (
          <div
            key={index}
            onClick={() =>
              box.isCertificate && setCertificateOpen(true)
            }
            className={`group relative flex aspect-square overflow-hidden rounded-2xl ${
              box.isCertificate
                ? "cursor-pointer"
                : ""
            }`}
          >
            {/* Background Image */}
            <Image
              src={box.bgImage}
              alt={box.label}
              fill
              className={`transition-transform duration-700 ${
                box.isCertificate
                  ? "object-cover group-hover:scale-105"
                  : "object-cover group-hover:scale-105"
              }`}
              sizes="(max-width: 640px) 100vw, 50vw"
            />

            {/* Overlay */}
            <div
              className={`absolute inset-0 ${
                box.isCertificate
                  ? "bg-black/35 group-hover:bg-black/45"
                  : "bg-black/45 group-hover:bg-black/35"
              } transition-all duration-500`}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col justify-between p-7 text-white sm:p-8">

              {/* Top */}
              <h3 className="text-lg font-semibold sm:text-xl">
                {box.label}
              </h3>

              {/* Bottom */}
              <div>
                <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
                  {box.content}
                </p>

                {box.isCertificate && (
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white">
                    <span>View Certificate</span>
                    <span className="text-lg">↗</span>
                  </span>
                )}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Fullscreen Certificate */}
      {certificateOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setCertificateOpen(false)}
        >

          {/* Close */}
          <button
            type="button"
            aria-label="Close certificate"
            onClick={() => setCertificateOpen(false)}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            ×
          </button>

          {/* Certificate */}
          <div
            className="relative h-[92vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/images/nabet.png"
              alt="NABET Certification"
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
          </div>

        </div>
      )}
    </section>
  );
}