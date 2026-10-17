"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Caveat, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Houses from "@/components/cca/houses";

// Local display font. Place the file at: components/fonts/HolidayHomework.ttf
const holidayHomework = localFont({
  src: "./fonts/HolidayHomework.ttf",
  variable: "--font-holiday",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
});

/* -------------------------------------------------------------------------- */
/*  Letter-by-letter reveal (unchanged)                                       */
/* -------------------------------------------------------------------------- */

function AnimatedText({
  text,
  delayOffset = 0,
  stagger = 0.025,
  charDuration = 0.4,
}: {
  text: string;
  delayOffset?: number;
  stagger?: number;
  charDuration?: number;
}) {
  const words = text.split(" ");
  let index = -1;

  return (
    <>
      {words.map((word, wIdx) => {
        const wordSpan = (
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, cIdx) => {
              index += 1;
              const i = index;
              return (
                <motion.span
                  key={cIdx}
                  className="inline-block"
                  initial={{ opacity: 0, y: 10, rotate: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: charDuration,
                    delay: delayOffset + i * stagger,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );

        return wIdx < words.length - 1 ? (
          <Fragment key={wIdx}>
            {wordSpan}{" "}
          </Fragment>
        ) : (
          <Fragment key={wIdx}>{wordSpan}</Fragment>
        );
      })}
    </>
  );
}

const QUOTE =
  "\u201C At Prasan Vidya Mandir, we believe in nurturing well \u2013 rounded individuals through a vibrant blend of academics and co-curricular engagement. The Co-Curricular Activities (CCA) for Grades 1 to 10 this academic year have been thoughtfully curated to develop communication, creativity, critical thinking and confidence among our students \u201D";

const EYEBROW_LETTERS = "CO CURRICULAR".replace(/\s/g, "").length;
const EYEBROW_DELAY = 0.1;
const EYEBROW_STAGGER = 0.02;
const HEADLINE_DELAY = EYEBROW_DELAY + EYEBROW_LETTERS * EYEBROW_STAGGER + 0.25;
const HEADLINE_STAGGER = 0.03;
const EXCLAIM_DELAY =
  HEADLINE_DELAY + "Activities".length * HEADLINE_STAGGER + 0.1;
const QUOTE_DELAY = EXCLAIM_DELAY + 0.6;
const QUOTE_STAGGER = 0.006;

/* -------------------------------------------------------------------------- */
/*  Calendar data                                                             */
/* -------------------------------------------------------------------------- */

type Col = { cca: string; date: string; category: string };

type TableBlock = {
  heading: string; // e.g. "STD I - V"
  groups: {
    cols: Col[];
    rows: { cls: string; cells: string[] }[];
  }[];
};

const TABLE_PRIMARY: TableBlock = {
  heading: "STD I - V",
  groups: [
    {
      cols: [
        { cca: "CCA 1", date: "19th June", category: "PUZZLE" },
        { cca: "CCA 2", date: "3rd July", category: "ART / CRAFT" },
        { cca: "CCA 3", date: "21st Aug", category: "HAND-WRITING / ESSAY" },
        { cca: "CCA 4", date: "18th Sep", category: "MUSIC" },
        { cca: "CCA 5", date: "23rd Oct", category: "POEM / RECITATION" },
        { cca: "CCA 6", date: "6th Nov", category: "DANCE" },
        { cca: "CCA 7", date: "11th Dec", category: "ORATORICAL / DEBATE" },
      ],
      rows: [
        { cls: "I", cells: ["Letter Lens", "Nature\u2019s Palette", "Copy Crafters", "Divine Beats", "Clap Choir", "Retro Groove", "Show and Tell"] },
        { cls: "II", cells: ["Word Chain", "Shape Shifter", "See and Script", "Tune Carnival", "Picture Rhyme", "Harvest Beats", "Junior Orators"] },
        { cls: "III", cells: ["Spot Secrets", "Nature Collage", "Alphabet Parade", "Tune Carnival", "Star Recital", "Flora and Fauna", "One Minute Talk"] },
        { cls: "IV", cells: ["Sudoku", "Texture Art", "Word Weavers", "Pitch perfecto", "Memory Melodies", "Mudra Moments", "Tale spinner"] },
        { cls: "V", cells: ["Word Safari", "Yarn art", "Fancy Fonts", "Freedom Flame", "Wrinkled Wisdom", "Groove Galore", "Idea Ignite"] },
      ],
    },
  ],
};

const TABLE_SENIOR: TableBlock = {
  heading: "STD VI - X",
  groups: [
    {
      cols: [
        { cca: "CCA 1", date: "19th June", category: "PUZZLE" },
        { cca: "CCA 2", date: "3rd July", category: "ART / CRAFT" },
        { cca: "CCA 3", date: "21st Aug", category: "HANDWRITING / ESSAY" },
        { cca: "CCA 4", date: "18th Sep", category: "MUSIC" },
        { cca: "CCA 5", date: "23rd Oct", category: "POEM / RECITATION" },
        { cca: "CCA 6", date: "6th Nov", category: "DANCE" },
        { cca: "CCA 7", date: "11th Dec", category: "ORATORICAL / DEBATE" },
      ],
      rows: [
        { cls: "VI", cells: ["Dot Journey", "Jute Jamboree", "Joyful Journeys", "Rhythm Retreat", "Festival Whispers", "Heritage Moves", "Voice bloom"] },
        { cls: "VII", cells: ["Path Pioneers", "Dot Journey", "Smile Scripts", "My India My Pride", "Poetic Testimony", "Rhythms of India", "Talk Trails"] },
        { cls: "VIII", cells: ["Spot Secrets", "Doll Studio", "Fantasy Flights", "Song on Nature", "Poet in Poem", "Culture Chimes", "Opinion Orbit"] },
        { cls: "IX", cells: ["Decode the Roots", "Colour Carpet", "Pathways to progress", "Music Mix", "Poet Inscription", "Grace of the grassroots", "The speaking spotlight"] },
      ],
    },
    {
      cols: [
        { cca: "CCA 1", date: "20th Mar", category: "PUZZLE" },
        { cca: "CCA 2", date: "10th Apr", category: "ART / CRAFT" },
        { cca: "CCA 3", date: "19th June", category: "HANDWRITING / ESSAY" },
        { cca: "CCA 4", date: "3rd July", category: "MUSIC" },
        { cca: "CCA 5", date: "21st Aug", category: "POEM / RECITATION" },
        { cca: "CCA 6", date: "18th Sep", category: "DANCE" },
        { cca: "CCA 7", date: "23rd Oct", category: "ORATORICAL / DEBATE" },
      ],
      rows: [
        { cls: "X", cells: ["The Detective", "Colour Carpet", "Express in words", "Vocal Local", "Inked emotions", "Grace of the grassroots", "War of words"] },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Scroll timeline (0 -> 1 across the whole tall wrapper)                    */
/* -------------------------------------------------------------------------- */

const HERO_EXIT: [number, number] = [0.044, 0.133];

const T1_ENTER: [number, number] = [0.151, 0.231];
const T1_EXIT: [number, number] = [0.32, 0.391];

const T2_ENTER: [number, number] = [0.444, 0.524];
const T2_EXIT: [number, number] = [0.604, 0.676];

const CRUMPLE: [number, number] = [0.72, 0.8];
const PAPER_SLIDE: [number, number] = [0.8, 0.871];

// NEW: once the paper has finished sliding off (PAPER_SLIDE[1]), ramp this
// 0 -> 1 over a short scroll window. Because it's driven straight off
// scrollYProgress (no `once`), it automatically runs back 0 on scroll-up —
// that's what makes the houses slide back out when you reverse.
const HOUSES_REVEAL: [number, number] = [PAPER_SLIDE[1], PAPER_SLIDE[1] + 0.045];

const ROW_STEP = 0.0044;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const OFFSCREEN = "-110vh";

/* -------------------------------------------------------------------------- */
/*  Row that slides from above the screen to its place (and back up)          */
/* -------------------------------------------------------------------------- */

function SlideRow({
  progress,
  order,
  enter,
  exit,
  className = "",
  children,
}: {
  progress: MotionValue<number>;
  order: number;
  enter: [number, number];
  exit?: [number, number];
  className?: string;
  children: React.ReactNode;
}) {
  const d = order * ROW_STEP;
  const inputs = exit
    ? [enter[0] + d, enter[1] + d, exit[0] + d, exit[1] + d]
    : [enter[0] + d, enter[1] + d];
  const outputs = exit
    ? [OFFSCREEN, "0vh", "0vh", OFFSCREEN]
    : [OFFSCREEN, "0vh"];
  const y = useTransform(progress, inputs, outputs);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Table layer                                                               */
/* -------------------------------------------------------------------------- */

const GRID = "grid grid-cols-[0.6fr_repeat(7,1fr)]";
const CELL =
  "flex items-center justify-center border border-neutral-900 px-1.5 py-2 text-center leading-tight";

function CalendarTable({
  data,
  progress,
  enter,
  exit,
}: {
  data: TableBlock;
  progress: MotionValue<number>;
  enter: [number, number];
  exit?: [number, number];
}) {
  let order = 0;
  const next = () => order++;

  const pointerEvents = useTransform(progress, (v) => {
    const start = enter[0];
    const end = exit ? exit[1] + 0.05 : 1;
    return v > start && v < end ? "auto" : "none";
  });

  return (
    <motion.div
      style={{ pointerEvents }}
      className="absolute inset-0 flex items-center justify-center px-3 sm:px-8"
    >
      <div className="w-full max-w-6xl overflow-x-auto">
        <div
          role="table"
          aria-label={`Co-Curricular Activity Calendar 2026 - 2027, ${data.heading}`}
          className="min-w-[820px] font-[family-name:var(--font-holiday)] text-[0.8rem] text-neutral-900 sm:text-base lg:text-lg"
        >
          <SlideRow progress={progress} order={next()} enter={enter} exit={exit}>
            <div
              role="row"
              className="border border-neutral-900 bg-neutral-600/95 py-2 text-center text-lg font-bold text-white sm:text-2xl"
            >
              Co- Curricular Activity Calendar 2026 - 2027
            </div>
          </SlideRow>

          <SlideRow progress={progress} order={next()} enter={enter} exit={exit}>
            <div
              role="row"
              className="border border-t-0 border-neutral-900 bg-neutral-300/95 py-1.5 text-center text-base font-bold sm:text-xl"
            >
              {data.heading}
            </div>
          </SlideRow>

          {data.groups.map((group, gIdx) => (
            <Fragment key={gIdx}>
              <SlideRow progress={progress} order={next()} enter={enter} exit={exit}>
                <div role="row" className={`${GRID} bg-white/85`}>
                  <div
                    role="columnheader"
                    className={`${CELL} row-span-2 border-t-0 font-bold`}
                  >
                    Class / Activity Name
                  </div>
                  {group.cols.map((c) => (
                    <div
                      key={c.cca}
                      role="columnheader"
                      className={`${CELL} flex-col border-l-0 border-t-0 font-bold`}
                    >
                      <span>{c.cca}</span>
                      <span>{c.date}</span>
                    </div>
                  ))}
                </div>
              </SlideRow>

              <SlideRow progress={progress} order={next()} enter={enter} exit={exit}>
                <div role="row" className={`${GRID} bg-white/85`}>
                  <div aria-hidden="true" />
                  {group.cols.map((c) => (
                    <div
                      key={c.cca}
                      role="columnheader"
                      className={`${CELL} border-l-0 border-t-0 text-[0.7rem] font-bold sm:text-sm`}
                    >
                      {c.category}
                    </div>
                  ))}
                </div>
              </SlideRow>

              {group.rows.map((row) => (
                <SlideRow
                  key={row.cls}
                  progress={progress}
                  order={next()}
                  enter={enter}
                  exit={exit}
                >
                  <div role="row" className={`${GRID} bg-white/70`}>
                    <div
                      role="rowheader"
                      className={`${CELL} border-t-0 font-bold`}
                    >
                      {row.cls}
                    </div>
                    {row.cells.map((cell, i) => (
                      <div
                        key={i}
                        role="cell"
                        className={`${CELL} border-l-0 border-t-0 py-3`}
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                </SlideRow>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main section                                                              */
/* -------------------------------------------------------------------------- */

export default function CCAHero() {
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, HERO_EXIT, ["0vh", OFFSCREEN]);

  /* ---------- Paper crumple + slide-away for the background ---------- */

  const crumple = useTransform(scrollYProgress, (v) =>
    clamp01((v - CRUMPLE[0]) / (CRUMPLE[1] - CRUMPLE[0]))
  );

  const paperScale = useTransform(crumple, [0, 1], [1, 0.42]);
  const paperClip = useTransform(
    crumple,
    [0, 0.5, 1],
    [
      "polygon(0% 0%, 25% 0%, 50% 0%, 75% 0%, 100% 0%, 100% 25%, 100% 50%, 100% 75%, 100% 100%, 75% 100%, 50% 100%, 25% 100%, 0% 100%, 0% 75%, 0% 50%, 0% 25%)",
      "polygon(4% 3%, 24% 8%, 47% 1%, 73% 9%, 97% 2%, 91% 27%, 98% 52%, 90% 76%, 96% 98%, 74% 90%, 49% 99%, 24% 91%, 3% 97%, 9% 74%, 2% 49%, 8% 24%)",
      "polygon(30% 22%, 44% 12%, 58% 20%, 72% 14%, 80% 30%, 88% 46%, 78% 60%, 84% 76%, 66% 84%, 52% 78%, 38% 88%, 26% 76%, 16% 62%, 22% 48%, 14% 34%, 24% 30%)",
    ]
  );

  const paperY = useTransform(scrollYProgress, PAPER_SLIDE, ["0vh", "-130vh"]);
  const paperRotate = useTransform(
    scrollYProgress,
    [CRUMPLE[0], CRUMPLE[1], PAPER_SLIDE[1]],
    [0, -14, -32]
  );

  const creaseOpacity = useTransform(crumple, [0, 0.15, 1], [0, 0.4, 1]);
  const paperFilter = useTransform(scrollYProgress, (v) => {
    const t = clamp01((v - CRUMPLE[0]) / (CRUMPLE[1] - CRUMPLE[0]));
    if (t <= 0 || v >= PAPER_SLIDE[1]) return "none";
    return `url(#paper-crumple) brightness(${1 - 0.22 * t}) contrast(${
      1 + 0.3 * t
    })`;
  });

  const displaceRef = useRef<SVGFEDisplacementMapElement>(null);
  useMotionValueEvent(crumple, "change", (t) => {
    displaceRef.current?.setAttribute("scale", String(t * 150));
  });

  /* ---------- Houses reveal: hidden until the paper is fully gone ---------- */
  // 0 right up until the paper finishes sliding off, then ramps to 1.
  // Scroll back up past that point and it runs back down to 0 on its own.
  const housesProgress = useTransform(scrollYProgress, HOUSES_REVEAL, [0, 1]);
  const housesOpacity = housesProgress;
  const housesPointerEvents = useTransform(housesProgress, (v) =>
    v > 0.5 ? "auto" : "none"
  );

  return (
    <section
      ref={wrapperRef}
      className={`${holidayHomework.variable} ${caveat.variable} ${montserrat.variable} relative h-[1000vh] w-full bg-white`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <svg
          width="0"
          height="0"
          className="absolute"
          aria-hidden="true"
          focusable="false"
        >
          <filter
            id="paper-crumple"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.011 0.016"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              ref={displaceRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        {/* Houses: revealed only once the paper has fully crumpled + slid
            away. opacity/pointer-events are driven straight off scroll
            position, so scrolling back up hides it again automatically —
            the actual left/right slide-in per card happens inside
            <Houses>, driven by the same revealProgress value. */}
        <motion.div
          style={{ opacity: housesOpacity, pointerEvents: housesPointerEvents }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <div className="w-full">
            <Houses revealProgress={housesProgress} />
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-0 will-change-transform"
          style={{
            scale: paperScale,
            y: paperY,
            rotate: paperRotate,
            clipPath: paperClip,
            filter: paperFilter,
          }}
        >
          <Image
            src="/images/cohero.png"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              opacity: creaseOpacity,
              backgroundImage: [
                "repeating-linear-gradient(115deg, transparent 0 46px, rgba(0,0,0,0.22) 47px, rgba(255,255,255,0.35) 50px, transparent 52px 118px)",
                "repeating-linear-gradient(32deg, transparent 0 63px, rgba(0,0,0,0.18) 64px, rgba(255,255,255,0.3) 67px, transparent 69px 141px)",
                "repeating-linear-gradient(78deg, transparent 0 91px, rgba(0,0,0,0.15) 92px, rgba(255,255,255,0.25) 94px, transparent 96px 173px)",
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), rgba(0,0,0,0.25))",
              ].join(", "),
            }}
          />
        </motion.div>

        <motion.div
          style={{ y: heroY }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute right-4 top-4 h-16 w-16 rotate-6 sm:right-8 sm:top-6 sm:h-24 sm:w-24 md:right-12 md:top-8 md:h-38 md:w-38">
            <Image src="/images/plane.png" alt="" fill className="object-contain" />
          </div>

          <div className="absolute bottom-6 left-2 h-20 w-20 sm:bottom-10 sm:left-6 sm:h-28 sm:w-28 md:bottom-14 md:left-10 md:h-42 md:w-42">
            <Image src="/images/star.png" alt="" fill className="object-contain" />
          </div>

          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center sm:py-28 md:py-32">
            <p className="font-[family-name:var(--font-holiday)] text-sm font-black tracking-tight text-neutral-900 sm:text-2xl">
              <AnimatedText
                text="CO CURRICULAR"
                delayOffset={EYEBROW_DELAY}
                stagger={EYEBROW_STAGGER}
                charDuration={0.3}
              />
            </p>

            <h1 className="mt-2 flex items-start justify-center font-[family-name:var(--font-holiday)] text-[3.25rem] leading-none text-neutral-900 sm:text-[5.5rem] md:text-[7.5rem]">
              <AnimatedText
                text="Activities"
                delayOffset={HEADLINE_DELAY}
                stagger={HEADLINE_STAGGER}
                charDuration={0.4}
              />
              <span
                className="-mt-1 ml-1 inline-block rotate-3 sm:mt-0"
                aria-hidden="true"
              >
                <AnimatedText
                  text="!"
                  delayOffset={EXCLAIM_DELAY}
                  stagger={HEADLINE_STAGGER}
                  charDuration={0.4}
                />
              </span>
            </h1>

            <div className="relative -mt-2 h-16 w-56 sm:-mt-3 sm:h-20 sm:w-80 md:w-[26rem]">
              <Image
                src="/images/strokes.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>

            <p className="mt-8 w-[min(1300px,92vw)] font-[family-name:var(--font-holiday)] text-xl leading-relaxed text-neutral-800 sm:mt-10 sm:text-xl md:text-[1.85rem]">
              <AnimatedText
                text={QUOTE}
                delayOffset={QUOTE_DELAY}
                stagger={QUOTE_STAGGER}
                charDuration={0.35}
              />
            </p>
          </div>
        </motion.div>

        <CalendarTable
          data={TABLE_PRIMARY}
          progress={scrollYProgress}
          enter={T1_ENTER}
          exit={T1_EXIT}
        />

        <CalendarTable
          data={TABLE_SENIOR}
          progress={scrollYProgress}
          enter={T2_ENTER}
          exit={T2_EXIT}
        />
      </div>
    </section>
  );
}