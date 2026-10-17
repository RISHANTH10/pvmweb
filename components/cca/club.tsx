"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fontVars } from "./clubfonts";

type Club = {
  name: string;
  motto: string;
};

const CLUBS: Club[] = [
  { name: "SAATHI Club", motto: "We for you" },
  { name: "Democracy & Electoral Club", motto: "Vote is our Voice" },
  { name: "Heritage Explorers Club", motto: "Be an Ambassador of Indian Tourism" },
  { name: "MUN Club", motto: "We make the world work" },
  { name: "Interact Club", motto: "Celebrate the Global impact of interaction" },
  { name: "Fitness Club", motto: "Fit today; Strong tomorrow" },
  { name: "Literary Club", motto: "Appreciate Literature; Preserve Culture" },
  { name: "Tala Tarang Club", motto: "Feel the Rhythm, Flow with the Waves" },
];

const CARD_WIDTH = 246; // px
const CARD_HEIGHT = 400; // px
const CARD_GAP = 20; // px

// Extra headroom above the cards so the hover scale-up (1.1x) plus the
// -18px lift never gets clipped by the viewport's overflow-hidden edge.
const HOVER_BUFFER = 64; // px
const VIEWPORT_HEIGHT = CARD_HEIGHT + HOVER_BUFFER;

function ClubCard({
  club,
  index,
  hovered,
  onHover,
  onLeave,
}: {
  club: Club;
  index: number;
  hovered: number | null;
  onHover: (i: number) => void;
  onLeave: () => void;
}) {
  const isHovered = hovered === index;
  const isDimmed = hovered !== null && !isHovered;

  return (
    <motion.div
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      animate={{
        scale: isHovered ? 1.1 : isDimmed ? 0.94 : 1,
        y: isHovered ? -18 : 0,
        opacity: isDimmed ? 0.8 : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      className={`relative flex shrink-0 flex-col items-center justify-center rounded-2xl bg-white px-5 py-6 text-center ${
        isHovered ? "z-20 shadow-2xl" : "z-10 shadow-lg"
      }`}
    >
      <h3 className="font-[family-name:var(--font-montserrat)] text-base font-bold leading-snug text-neutral-900">
        {club.name}
      </h3>
      <p className="mt-4 font-[family-name:var(--font-space-grotesk)] text-sm italic leading-relaxed text-neutral-700">
        &ldquo;{club.motto}&rdquo;
      </p>
    </motion.div>
  );
}

export default function ClubsSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [maxShift, setMaxShift] = useState(0);

  // 0 = leftmost -> 1 = fully panned right.
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.4 });
  const x = useTransform(smoothX, (v) => -v * maxShift);

  useLayoutEffect(() => {
    function measure() {
      if (!trackRef.current || !viewportRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = viewportRef.current.clientWidth;
      setMaxShift(Math.max(trackWidth - viewportWidth, 0));
    }

    measure();

    // Re-measure once web fonts finish swapping in (can change nothing
    // here since card widths are fixed px, but kept for safety) and on
    // any size change to either element.
    document.fonts?.ready.then(measure);

    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (maxShift <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    mouseX.set(Math.min(1, Math.max(0, percent)));
  }

  function handleMouseLeave() {
    mouseX.set(0);
    setHovered(null);
  }

  return (
    <section
      className={`${fontVars} relative flex h-screen w-full flex-col justify-between overflow-hidden`}
    >
      {/* Background photo */}
      <Image
        src="/images/clubbg.jpg"
        alt=""
        fill
        priority
        className="object-cover -z-20"
      />
      {/* Dark overlay so text / cards stay legible */}
      <div className="absolute inset-0 -z-10 bg-black/55" />

      {/* Title + tagline */}
      <div className="px-6 pt-14 sm:px-12 sm:pt-20">
        <h1 className="font-[family-name:var(--font-humane)] mt-[-80px] text-6xl leading-none text-white sm:text-8xl md:text-[500px]">
          CLUBS
        </h1>
        <p className="mt-[-90px] max-w-9xl font-[family-name:var(--font-montserrat)] text-base text-white/90 tracking-wide sm:text-xl">
          Where interests become skills and ideas become experience
        </p>
      </div>

      {/* All 8 cards — this row pans left/right as the cursor moves across
          it whenever the 8 cards don't all fit the available width. */}
      <div className="flex justify-center px-6 pb-10 sm:px-12 sm:pb-14">
        <div
          ref={viewportRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ height: VIEWPORT_HEIGHT }}
          className="relative w-full overflow-hidden"
        >
          <motion.div
            ref={trackRef}
            style={{ x, gap: CARD_GAP }}
            className="flex h-full w-max items-end"
          >
            {CLUBS.map((club, i) => (
              <ClubCard
                key={club.name}
                club={club}
                index={i}
                hovered={hovered}
                onHover={setHovered}
                onLeave={() => setHovered(null)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}