"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Comfortaa, Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"] });

/**
 * OurMottoHero
 * ------------
 * A collage of large images that slide in from every direction one by one
 * as the section scrolls into view, settling into an overlapping,
 * slightly-rotated grid. A diamond-cut white card sits in the center
 * holding an eyebrow ("Our Motto") and a bold Sora headline ("Learn to
 * Lead").
 *
 * Requires `next/font/google` (built into Next.js, no install needed).
 *
 * Drop this file into e.g. `components/OurMottoHero.tsx` and use it in
 * `app/page.tsx`:
 *
 *   import OurMottoHero from "@/components/OurMottoHero";
 *   <OurMottoHero images={["/gallery/1.jpg", "/gallery/2.jpg", ...]} />
 *
 * Pass exactly 10 image URLs via the `images` prop for the layout below.
 * If fewer are passed, the last image repeats to fill remaining slots.
 */

type Direction =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface TileConfig {
  /** grid placement, written as tailwind classes */
  className: string;
  rotate: number;
  from: Direction;
  delay: number; // ms
}

const DIRECTION_OFFSET: Record<Direction, { x: number; y: number }> = {
  top: { x: 0, y: -220 },
  bottom: { x: 0, y: 220 },
  left: { x: -260, y: 0 },
  right: { x: 260, y: 0 },
  "top-left": { x: -220, y: -220 },
  "top-right": { x: 220, y: -220 },
  "bottom-left": { x: -220, y: 220 },
  "bottom-right": { x: 220, y: 220 },
};

// 10 tiles arranged around a hollow center where the motto card sits.
const TILES: TileConfig[] = [
  { className: "col-start-1 row-start-1", rotate: -6, from: "top-left", delay: 0 },
  { className: "col-start-2 row-start-1", rotate: 3, from: "top", delay: 80 },
  { className: "col-start-3 row-start-1", rotate: -4, from: "top", delay: 160 },
  { className: "col-start-4 row-start-1", rotate: 6, from: "top-right", delay: 240 },
  { className: "col-start-1 row-start-2", rotate: 4, from: "left", delay: 120 },
  { className: "col-start-4 row-start-2", rotate: -5, from: "right", delay: 200 },
  { className: "col-start-1 row-start-3", rotate: -3, from: "bottom-left", delay: 260 },
  { className: "col-start-2 row-start-3", rotate: 5, from: "bottom", delay: 340 },
  { className: "col-start-3 row-start-3", rotate: -6, from: "bottom", delay: 420 },
  { className: "col-start-4 row-start-3", rotate: 4, from: "bottom-right", delay: 500 },
];

interface OurMottoHeroProps {
  images?: string[];
  eyebrow?: string;
  headline?: string;
  className?: string;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23e2c391'/%3E%3C/svg%3E";

export default function OurMottoHero({
  images = [],
  eyebrow = "Our Motto",
  headline = "Learn to Lead",
  className = "",
}: OurMottoHeroProps) {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    // Fire once, when the section has scrolled far enough into view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const gallery =
    images.length > 0
      ? Array.from({ length: 10 }, (_, i) => images[i] ?? images[images.length - 1])
      : Array.from({ length: 10 }, () => FALLBACK_IMAGE);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-white py-14 sm:py-20 ${className}`}
      aria-label={`${eyebrow}: ${headline}`}
    >
      <div className="relative mx-auto grid aspect-[3/4] w-full max-w-7xl grid-cols-4 grid-rows-3 gap-3 px-3 sm:aspect-[16/10] sm:gap-4 sm:px-8">
        {TILES.map((tile, i) => {
          const offset = DIRECTION_OFFSET[tile.from];
          return (
            <div
              key={i}
              className={`${tile.className} relative overflow-hidden rounded-md shadow-2xl ring-1 ring-black/10 transition-all ease-out`}
              style={{
                transitionDuration: "900ms",
                transitionDelay: `${tile.delay}ms`,
                transform: revealed
                  ? `translate(0px, 0px) rotate(${tile.rotate}deg) scale(1)`
                  : `translate(${offset.x}px, ${offset.y}px) rotate(${tile.rotate * 3}deg) scale(0.85)`,
                opacity: revealed ? 1 : 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery[i]}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}

        {/* Center motto card, diamond-cut with clip-path, fades/scales in last */}
        <div
          className="pointer-events-none col-span-2 col-start-2 row-span-1 row-start-2 flex items-center justify-center transition-all ease-out"
          style={{
            transitionDuration: "700ms",
            transitionDelay: "650ms",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scale(1)" : "scale(0.8)",
          }}
        >
          <div
            className="flex h-full w-ful flex-col items-center justify-center gap-1 bg-transparent px-4 py-6 text-center shadow-xl sm:gap-3 sm:px-8"
            style={{
              clipPath: "polygon(6% 0%, 100% 4%, 96% 100%, 2% 96%)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
  <Image
    src="/images/logo.png"
    alt="School Logo"
    width={22}
    height={22}
    className="object-contain"
    priority
  />

  <p
    className={`${sora.className} text-xs font-semibold uppercase tracking-tight text-neutral-700 sm:text-sm`}
  >
    {eyebrow}
  </p>
</div>
            <h2
              className={`${sora.className} text-2xl font-extrabold leading-tight text-neutral-900 sm:text-4xl md:text-6xl`}
            >
              {headline}
            </h2>
            <p className={` text-black`}>Every student is encouraged to learn, take initiative, and develop the skills needed to lead with integrity and confidence.</p>
          </div>
        </div>
      </div>
    </section>
  );
}