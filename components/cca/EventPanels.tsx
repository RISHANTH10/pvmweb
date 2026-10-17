"use client";

import Image from "next/image";
import { Comfortaa, Montserrat, Space_Grotesk } from "next/font/google";
import { Fragment, useEffect, useRef, useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500"] });
const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["500"] });

/* ------------------------------------------------------------------ */
/*  1. EDIT THIS ARRAY – images, colours and descriptions              */
/*     Files live inside /public/images/                               */
/* ------------------------------------------------------------------ */

type EventItem = {
  id: string;
  title: string; // used for alt text / accessibility
  bgColor: string; // collapsed background colour (any CSS colour)
  particles: string[]; // colours of the small floating shapes
  fluid: string[]; // colours of the cursor-driven fluid in this card
  logo: string; // PNG of the event name
  bgImage: string; // photo shown when the card is opened
  bgPosition?: string; // optional CSS object-position, e.g. "50% 65%" (y > 50% moves the photo up)
  description: string;
};

const EVENTS: EventItem[] = [
  {
    id: "kalakriti",
    title: "Kalakriti",
    bgColor: "#050005",
    particles: ["#ff3d9a", "#ffd400", "#ffffff"], // pink, yellow, white
    fluid: ["#ff3d9a"], // pink
    logo: "/images/KALAKRITI.png",
    bgImage: "/images/kala.jpg",
    description:
      "Kalakriti is our inter-school competition, where schools from across the region come together to take part and compete for the trophy. It is one of the most important events for Prasan Vidya Mandir, and our class 11 and 12 students volunteer to run it.",
  },
  {
    id: "baal-khel-mela",
    title: "Baal Khel Mela",
    bgColor: "#e4e6e8",
    particles: ["#6b7280", "#9ca3af", "#b8bec7"], // greys
    fluid: ["#000000"], // black
    logo: "/images/SPORTSDAY.png",
    bgImage: "/images/sportsdayy.jpg",
    description:
      "Baal Khel Mela is our annual Sports Day, where students take to the field in races, team games and friendly contests. It celebrates fitness, teamwork and sportsmanship, and gives every child the chance to cheer, compete and enjoy the day together.",
  },
  {
    id: "sanskar-sangam",
    title: "Sanskar Sangam",
    bgColor: "#050505",
    particles: ["#ffd400", "#e11d2e"], // yellow, red
    fluid: ["#ffd400"], // yellow
    logo: "/images/GRANDPARENTSDAY.png",
    bgImage: "/images/grandpd.png",
    description:
      "Sanskar Sangam is our Grandparents Day, a warm celebration of the bond between children and their grandparents. Through performances, games and shared moments, students honour the values, stories and blessings that our elders pass on to us.",
  },
  {
    id: "pvm-mun",
    title: "PVM MUN",
    bgColor: "#ff5100",
    particles: ["#000000", "#ffffff"], // black, white
    fluid: ["#000000"], // black
    logo: "/images/PVMMUN.png",
    bgImage: "/images/munn.png",
    bgPosition: "50% 65%", // photo lifted up a little
    description:
      "PVM MUN is our Model United Nations conference, where students step into the role of delegates to debate global issues. They research, negotiate and speak up, building confidence, diplomacy and public speaking skills along the way.",
  },
  {
    id: "akruthi",
    title: "Akruthi",
    bgColor: "#ffffff",
    particles: ["#1d4ed8", "#e11d2e", "#111111"], // blue, red, black
    fluid: ["#e11d2e"], // red
    logo: "/images/AKRUTHI1.png",
    bgImage: "/images/akruthii.jpg",
    description:
      "Akruthi is our intra-school sports tournament, where houses and classes within Prasan Vidya Mandir compete across a range of sports. It brings out team spirit, discipline and healthy rivalry, and crowns the champions of our own school.",
  },
  {
    id: "prasanotsav",
    title: "Prasanotsav",
    bgColor: "#e9acf5",
    particles: ["#22d3ee", "#000000"], // cyan, black
    fluid: ["#22d3ee"], // cyan
    logo: "/images/ANNUALDAY.png",
    bgImage: "/images/annualdayy.png",
    description:
      "Prasanotsav is our Annual Day, the grand celebration of the school year. Students showcase their talents through music, dance, drama and awards, while parents and teachers come together to applaud everything we have achieved.",
  },
  {
    id: "baal-pradharshini",
    title: "Baal Pradharshini",
    bgColor: "#050005",
    particles: ["#ffffff", "#9ca3af"], // white, grey
    fluid: ["#ffffff"], // white
    logo: "/images/PROJECTDAY.png",
    bgImage: "/images/projectt.jpg",
    bgPosition: "50% 35%", // photo brought down a little
    description:
      "Baal Pradharshini is our Project Day, an exhibition where students present working models, experiments and creative projects. It turns classroom learning into hands-on discovery and lets young minds explain their ideas to visitors.",
  },
];

/* ------------------------------------------------------------------ */
/*  2. BACKGROUND PARTICLES                                            */
/* ------------------------------------------------------------------ */

const PARTICLE_COUNT = 4; // shapes per card (one of each shape)
type Shape = "star" | "circle" | "square" | "triangle";
const SHAPES: Shape[] = ["star", "circle", "square", "triangle"];

type Particle = {
  shape: Shape;
  color: string;
  size: number;
  left: number;
  top: number;
  rotate: number;
  opacity: number;
  duration: number;
  delay: number;
};

// Seeded random so server and client render the same positions (no hydration mismatch).
function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeParticles(id: string, colors: string[]): Particle[] {
  const rnd = seededRandom(id);
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    shape: SHAPES[i % SHAPES.length],
    color: colors[Math.floor(rnd() * colors.length)],
    size: 8 + rnd() * 8,
    // one shape per vertical band, so they spread out instead of clumping
    left: (i * 100) / PARTICLE_COUNT + 3 + rnd() * (100 / PARTICLE_COUNT - 10),
    top: 15 + rnd() * 65,
    rotate: rnd() * 360,
    opacity: 0.6 + rnd() * 0.35,
    duration: 5 + rnd() * 6,
    delay: -rnd() * 8,
  }));
}

const PARTICLES: Record<string, Particle[]> = Object.fromEntries(
  EVENTS.map((e) => [e.id, makeParticles(e.id, e.particles)])
);

function ShapeIcon({ shape }: { shape: Shape }) {
  switch (shape) {
    case "circle":
      return <circle cx="12" cy="12" r="10" />;
    case "square":
      return <rect x="3" y="3" width="18" height="18" />;
    case "triangle":
      return <polygon points="12,2 22,21 2,21" />;
    case "star":
      return (
        <polygon points="12,1 15,9 23,9.5 17,15 19,23 12,18.5 5,23 7,15 1,9.5 9,9" />
      );
  }
}

/* ------------------------------------------------------------------ */
/*  2b. CURSOR-DRIVEN FLUID                                            */
/* ------------------------------------------------------------------ */

// "Gooey" filter: blurs the blobs, then sharpens their alpha so they melt into
// one liquid shape. Defined once, used by every card's fluid canvas.
function GooFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <filter id="pvm-goo" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
        />
      </filter>
    </svg>
  );
}

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  color: string;
};

const MAX_BLOBS = 180;

function FluidCanvas({ colors }: { colors: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let blobs: Blob[] = [];
    let raf = 0;
    let last: { x: number; y: number } | null = null;
    let colorIndex = 0;

    const resize = () => {
      canvas.width = host.clientWidth;
      canvas.height = host.clientHeight;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const frame = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs = blobs.filter((b) => b.r > 2);
      for (const b of blobs) {
        // gentle swirl so the fluid curls instead of moving in straight lines
        b.vx += Math.cos(b.phase + time * 0.003) * 0.05;
        b.vy += Math.sin(b.phase + time * 0.003) * 0.05;
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.955;
        b.vy *= 0.955;
        b.r *= 0.982;

        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // stop the loop when the fluid has faded away (no idle cost)
      raf = blobs.length > 0 ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(6, Math.max(1, Math.ceil(dist / 14)));
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          blobs.push({
            x: last.x + dx * t,
            y: last.y + dy * t,
            vx: dx * 0.1 + (Math.random() - 0.5) * 1.2,
            vy: dy * 0.1 + (Math.random() - 0.5) * 1.2,
            r: 14 + Math.min(dist, 60) * 0.3 + Math.random() * 8, // faster = bigger splash
            phase: Math.random() * Math.PI * 2,
            color: colors[colorIndex++ % colors.length],
          });
        }
        if (blobs.length > MAX_BLOBS) blobs.splice(0, blobs.length - MAX_BLOBS);
      }
      last = { x, y };
      start();
    };
    const onLeave = () => {
      last = null;
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ filter: "url(#pvm-goo)" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  2c. DISSOLVING DESCRIPTION                                         */
/* ------------------------------------------------------------------ */

// Each word fades + un-blurs at its own (stable) random moment, so the
// paragraph appears to dissolve in, and dissolve away again when closed.
function DissolveText({ text, show, className }: { text: string; show: boolean; className?: string }) {
  const words = text.split(" ");
  return (
    <p className={className} aria-hidden={!show}>
      {words.map((word, i) => {
        const r = ((i * 7919 + 13) % 100) / 100; // stable pseudo-random 0–1
        return (
          <Fragment key={i}>
            <span
              className="inline-block transition-[opacity,filter,transform] duration-[800ms] ease-out motion-reduce:transition-none"
              style={{
                opacity: show ? 1 : 0,
                filter: show ? "blur(0px)" : "blur(10px)",
                transform: show ? "scale(1)" : "scale(1.12)",
                transitionDelay: `${show ? 350 + r * 600 : r * 250}ms`,
              }}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </p>
  );
}

const FLOAT_CSS = `
@keyframes pvm-float {
  0%, 100% { transform: translateY(0) rotate(var(--r)); }
  50%      { transform: translateY(-14px) rotate(calc(var(--r) + 30deg)); }
}
.pvm-particle { animation: pvm-float var(--d) ease-in-out var(--delay) infinite; }
@media (prefers-reduced-motion: reduce) { .pvm-particle { animation: none; } }
`;

function ParticleLayer({ particles }: { particles: Particle[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="pvm-particle absolute"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              fill: p.color,
              opacity: p.opacity,
              "--r": `${p.rotate}deg`,
              "--d": `${p.duration}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          <ShapeIcon shape={p.shape} />
        </svg>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. COMPONENT                                                       */
/* ------------------------------------------------------------------ */

// One shared easing + duration so every part of the animation stays in sync.
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const DURATION = "duration-[900ms]";

export default function EventPanels() {
  const [openId, setOpenId] = useState<string | null>(null); // clicked card
  const [hoverId, setHoverId] = useState<string | null>(null); // hovered card

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section aria-label="Mega events" className="w-full">
      <style>{FLOAT_CSS}</style>
      <GooFilter />

      {/* Header – full screen height, ghero.png as background */}
      <div className="relative flex h-[100svh] w-full flex-col items-center justify-start overflow-hidden bg-white px-6 pt-16 text-center text-white sm:pt-24">
        <Image
          src="/images/ghero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Black overlay on the header image */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
        <h2
          className={`${spaceGrotesk.className} relative z-10 text-5xl font-bold tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.9),0_4px_24px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl`}
        >
          MEGA EVENTS
        </h2>
        <p className={`${montserrat.className} relative z-10 mt-5 text-sm [text-shadow:0_1px_3px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.8)] sm:text-lg md:text-xl`}>
          Every school, every student, one stage – explore our flagship events.
        </p>
      </div>

      {EVENTS.map((event) => {
        const isOpen = openId === event.id;
        const isHover = hoverId === event.id && !isOpen;

        return (
          <article
            key={event.id}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-label={event.title}
            style={{ backgroundColor: event.bgColor }}
            onClick={() => toggle(event.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(event.id);
              } else if (e.key === "Escape") {
                setOpenId(null);
              }
            }}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHoverId(event.id)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHoverId(null)}
            className={[
              "relative w-full cursor-pointer overflow-hidden outline-none",
              "transition-[height]",
              DURATION,
              EASE,
              "motion-reduce:transition-none",
              "focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-violet-400/80",
              // collapsed → opened heights (mobile / desktop)
              isOpen ? "h-[420px] sm:h-[450px]" : "h-[180px] sm:h-[180px]",
            ].join(" ")}
          >
            {/* Cursor-driven fluid */}
            <FluidCanvas colors={event.fluid} />

            {/* Background particles */}
            <ParticleLayer particles={PARTICLES[event.id]} />

            {/* Background photo (only when opened) */}
            <div
              aria-hidden="true"
              className={[
                "absolute inset-0 transition-[opacity,transform]",
                DURATION,
                EASE,
                "motion-reduce:transition-none",
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-110",
              ].join(" ")}
            >
              <Image
                src={event.bgImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: event.bgPosition ?? "50% 50%" }}
              />
            </div>

            {/* Black overlay */}
            <div
              aria-hidden="true"
              className={[
                "absolute inset-0 bg-black/55 transition-opacity",
                DURATION,
                EASE,
                "motion-reduce:transition-none",
                isOpen ? "opacity-100" : "opacity-0",
              ].join(" ")}
            />

            {/* Logo: centred when collapsed → top-left & smaller when opened */}
            <div
              className={[
                "absolute z-10 transition-all",
                DURATION,
                EASE,
                "motion-reduce:transition-none",
                isOpen
                  ? "left-4 top-3 w-[250px] translate-x-0 translate-y-0 sm:left-10 sm:top-5 sm:w-[460px]"
                  : "left-1/2 top-1/2 w-[min(96vw,1100px)] -translate-x-1/2 -translate-y-1/2",
              ].join(" ")}
            >
              {/* Hover: slight scale-up */}
              <div
                className={[
                  "relative transition-transform",
                  "duration-500",
                  EASE,
                  "motion-reduce:transition-none",
                  isHover ? "scale-[1.06]" : "scale-100",
                ].join(" ")}
              >
                <Image
                  src={event.logo}
                  alt={event.title}
                  width={1600}
                  height={800}
                  sizes="(min-width: 640px) 1100px, 96vw"
                  className={[
                    "h-auto w-full select-none object-contain",
                    "transition-[max-height,object-position]",
                    DURATION,
                    EASE,
                    "motion-reduce:transition-none",
                    isOpen
                      ? "max-h-[90px] object-[0%_50%] sm:max-h-[140px]"
                      : "max-h-[150px] object-[50%_50%] sm:max-h-[230px]",
                  ].join(" ")}
                  draggable={false}
                />
              </div>
            </div>

            {/* Description (only when opened) – dissolves in / out, centred */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-16">
              <DissolveText
                text={event.description}
                show={isOpen}
                className={`${comfortaa.className} max-w-3xl text-center text-sm leading-relaxed text-white sm:text-lg md:text-xl`}
              />
            </div>
          </article>
        );
      })}
    </section>
  );
}