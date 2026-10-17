"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Space_Grotesk, Montserrat } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-montserrat",
});

// Replace these with your own image paths (place files in /public/images)
const IMAGES: string[] = [
  "/images/if1.jpg",
  "/images/if2.jpg",
  "/images/if3.jpg",
  "/images/if4.jpg",
  "/images/if5.jpg",
];

export default function InfrastructureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 -> 1 across the whole pinned scroll range

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // How far we've scrolled into the pinned section
      const scrolledIntoSection = -rect.top;
      const raw = scrolledIntoSection / scrollableDistance;
      const clamped = Math.min(Math.max(raw, 0), 1);

      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Virtual "filmstrip" position: 0 at the very first image, (N - 1) at the very last.
  // Every image's translateX is derived from its distance to this single value, so
  // the outgoing and incoming image always overlap edge-to-edge with no gap.
  const virtualPosition = progress * (IMAGES.length - 1);

  return (
    // Tall wrapper creates the scroll runway. Increase multiplier for a slower / longer effect.
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${IMAGES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Background images, flowing continuously as one filmstrip */}
        {IMAGES.map((src, index) => {
          const translateX = (index - virtualPosition) * 100;

          return (
            <div
              key={src}
              className="absolute inset-0 h-full w-full"
              style={{
                transform: `translateX(${translateX}%)`,
                willChange: "transform",
              }}
            >
              <Image
                src={src}
                alt={`Infrastructure visual ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}

        {/* Black overlay so text stays readable over any image */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/60" />

        {/* Static, centered title + description */}
        <div className="absolute bottom-[8%] left-[6%] z-20 max-w-2xl text-left">
  <h2
    className={`${spaceGrotesk.className} text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl`}
  >
    Infrastructure
  </h2>

  <p
    className={`${montserrat.className} mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg`}
  >
    Built to scale quietly, so everything running on top of it never has to think twice.
  </p>
</div>
      </div>
    </section>
  );
}