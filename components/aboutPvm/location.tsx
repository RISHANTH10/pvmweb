"use client";

import { Montserrat, Space_Grotesk } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * ---------------------------------------------------------------------------
 * LocationSection
 * ---------------------------------------------------------------------------
 * A live Google Map (pinned at Prasan Vidya Mandir, Mamandur) fills the
 * section as a background, under a black overlay for text legibility.
 * Heading sits top-left in Space Grotesk, description below it in
 * Montserrat.
 *
 * TO CHANGE THE MAP PIN / LOCATION:
 * Edit MAP_QUERY below — it's plugged straight into a Google Maps embed
 * URL, so any address or "lat,lng" string works.
 * ---------------------------------------------------------------------------
 */

const MAP_QUERY = "Prasan Vidya Mandir, Mamandur, Tamil Nadu";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&z=14&output=embed`;

interface LocationSectionProps {
  town?: string;
  lead?: string;
  body?: string;
  coordinates?: string;
}

export default function LocationSection({
  town = "Mamandur",
  lead = "South of Chengalpattu, Tamil Nadu",
  body = "Amidst the rocky, greeny mountains, near the historic Palar River, in a town named Mamandur, bordered with scenic beauty, stands erect the inviting Prasan Vidya Mandir — drawing the attention of travellers who check in and out of Chengalpattu from the south of Tamil Nadu.",
  coordinates = "12.6819° N, 79.9888° E",
}: LocationSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[600px] w-full overflow-hidden bg-[#1E2B22] sm:h-[650px]"
    >
      {/* ---------------- Google Map background ---------------- */}
      <iframe
        src={MAP_EMBED_SRC}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${MAP_QUERY}`}
      />

      {/* ---------------- Black overlay for text legibility ---------------- */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/55"
        aria-hidden="true"
      />
      {/* Slightly deeper wash behind the text corner specifically, so copy
          stays readable even over busy parts of the map. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-transparent"
        aria-hidden="true"
      />

      {/* ---------------- Copy, top-left ---------------- */}
      <div className="relative z-10 flex h-full flex-col justify-start px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
        <p
          className={`${montserrat.className} mb-3 text-sm font-medium text-white/70 sm:text-base`}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(10px)",
            transition:
              "opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s",
          }}
        >
          {lead}
        </p>

        <h2
          className={`${spaceGrotesk.className} text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl`}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(14px)",
            transition:
              "opacity 0.7s ease-out 0.25s, transform 0.7s ease-out 0.25s",
          }}
        >
          {town}
        </h2>

        <p
          className={`${montserrat.className} mt-6 max-w-7xl text-base leading-relaxed text-white/80 sm:text-lg`}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(14px)",
            transition:
              "opacity 0.7s ease-out 0.4s, transform 0.7s ease-out 0.4s",
          }}
        >
          {body}
        </p>

        <div
          className="mt-8 inline-flex w-fit items-center gap-2 border-t border-white/25 pt-4"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease-out 0.55s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
              stroke="#FFFFFF"
              strokeOpacity="0.8"
              strokeWidth="1.6"
            />
            <circle cx="12" cy="9" r="2.4" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1.6" />
          </svg>
          <span className={`${montserrat.className} text-xs font-medium tracking-wide text-white/80 sm:text-sm`}>
            {coordinates}
          </span>
        </div>
      </div>
    </section>
  );
}