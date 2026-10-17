"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

const humane = localFont({
  src: "./fonts/Humane-Bold.ttf",
  variable: "--font-humane",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
});

const fontVars = `${humane.variable} ${montserrat.variable}`;

const INTRO_TITLE = "GLANCE ON OUR";

type Festival = {
  title: string;
  date: string;
  image: string;
};

const FESTIVALS: Festival[] = [
  { title: "INVESTITURE CEREMONY", date: "20th June", image: "/images/investiture.png" },
  { title: "GURUPURNIMA", date: "25th July", image: "/images/gurupurnima.png" },
  { title: "INDEPENDENCE DAY", date: "15th August", image: "/images/independence.png" },
  { title: "KRISHNA JAYANTHI", date: "21st August", image: "/images/krishnajayanti.jpg" },
  { title: "ONAM", date: "21st August", image: "/images/onam.jpg" },
  { title: "TEACHERS DAY", date: "5th September", image: "/images/teachersday.jpg" },
  { title: "GANESH CHATURTHI", date: "11th September", image: "/images/ganeshchaturthi.jpg" },
  { title: "NAVARATHRI", date: "10th October", image: "/images/nav.jpg" },
  { title: "CHILDREN'S DAY", date: "13th November", image: "/images/childrensday.jpg" },
  { title: "CHRISTMAS", date: "18th December", image: "/images/christmas.jpg" },
  { title: "PONGAL", date: "8th January", image: "/images/pongal.jpg" },
  { title: "REPUBLIC DAY", date: "26th January", image: "/images/republic.jpg" },
];

/* -------------------------------------------------------------------------- */
/*  Particle dissolve engine                                                  */
/* -------------------------------------------------------------------------- */

type Ease = (t: number) => number;
const easeInOutCubic: Ease = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic: Ease = (t) => 1 - Math.pow(1 - t, 3);

type Cfg = {
  out: boolean; // true = particles leave, false = particles arrive
  ease: Ease;
  delayBase: number;
  delaySweep: number; // extra delay across the width (left -> right wave)
  delayRand: number;
  lifeBase: number;
  lifeRand: number;
  driftX: number;
  driftXRand: number;
  driftY: number;
  lift: number; // negative = drift upward
};

// ---- Tuning knobs --------------------------------------------------------
const TEXT_OUT_CFG: Cfg = {
  out: true, ease: easeInOutCubic,
  delayBase: 0, delaySweep: 0.3, delayRand: 0.25,
  lifeBase: 0.6, lifeRand: 0.35,
  driftX: 40, driftXRand: 160, driftY: 160, lift: -40,
};
const TEXT_IN_CFG: Cfg = {
  out: false, ease: easeOutCubic,
  delayBase: 0.3, delaySweep: 0.3, delayRand: 0.25,
  lifeBase: 0.65, lifeRand: 0.4,
  driftX: 40, driftXRand: 160, driftY: 160, lift: -40,
};
// White intro background + "GLANCE ON OUR" dissolving away
const INTRO_CFG: Cfg = {
  out: true, ease: easeInOutCubic,
  delayBase: 0, delaySweep: 0.5, delayRand: 0.3,
  lifeBase: 0.6, lifeRand: 0.4,
  driftX: 60, driftXRand: 240, driftY: 220, lift: -60,
};
const INTRO_GRID = 120; // tiles across the longest side (higher = finer, heavier)
// --------------------------------------------------------------------------

type System = {
  src: HTMLCanvasElement;
  n: number;
  cell: number;
  out: boolean;
  ease: Ease;
  end: number;
  rx: Float32Array;
  ry: Float32Array;
  qx: Float32Array;
  qy: Float32Array;
  delay: Float32Array;
  life: Float32Array;
};

function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function hasContent(
  px: Uint8ClampedArray,
  W: number,
  H: number,
  x0: number,
  y0: number,
  cell: number
) {
  const xe = Math.min(W, x0 + cell);
  const ye = Math.min(H, y0 + cell);
  for (let y = y0; y < ye; y++) {
    let i = (y * W + x0) * 4 + 3;
    for (let x = x0; x < xe; x++, i += 4) if (px[i] > 8) return true;
  }
  return false;
}

function buildSystem(
  src: HTMLCanvasElement,
  data: ImageData,
  W: number,
  H: number,
  cell: number,
  unit: number,
  cfg: Cfg
): System {
  const cols = Math.ceil(W / cell);
  const rows = Math.ceil(H / cell);
  const max = cols * rows;
  const s: System = {
    src, n: 0, cell, out: cfg.out, ease: cfg.ease, end: 0,
    rx: new Float32Array(max), ry: new Float32Array(max),
    qx: new Float32Array(max), qy: new Float32Array(max),
    delay: new Float32Array(max), life: new Float32Array(max),
  };
  const px = data.data;
  const sign = cfg.out ? 1 : -1;

  for (let r = 0; r < rows; r++) {
    const y0 = r * cell;
    for (let c = 0; c < cols; c++) {
      const x0 = c * cell;
      if (!hasContent(px, W, H, x0, y0, cell)) continue;
      const i = s.n++;
      const rx = x0 + cell / 2;
      const ry = y0 + cell / 2;
      const dx = (cfg.driftX + Math.random() * cfg.driftXRand) * unit;
      const dy = ((Math.random() - 0.5) * cfg.driftY + cfg.lift) * unit;
      s.rx[i] = rx;
      s.ry[i] = ry;
      s.qx[i] = rx + sign * dx;
      s.qy[i] = ry + sign * dy;
      s.delay[i] = cfg.delayBase + (x0 / W) * cfg.delaySweep + Math.random() * cfg.delayRand;
      s.life[i] = cfg.lifeBase + Math.random() * cfg.lifeRand;
      const e = s.delay[i] + s.life[i];
      if (e > s.end) s.end = e;
    }
  }
  return s;
}

function drawSystem(ctx: CanvasRenderingContext2D, s: System, t: number) {
  const { n, cell, out, ease, rx, ry, qx, qy, delay, life, src } = s;
  for (let i = 0; i < n; i++) {
    const raw = (t - delay[i]) / life[i];
    const p = raw <= 0 ? 0 : raw >= 1 ? 1 : raw;
    const e = ease(p);
    const k = out ? e : 1 - e; // 0 = in place, 1 = fully dissolved
    const a = 1 - k;
    if (a < 0.02) continue;
    const sz = cell * (1 - 0.75 * k);
    const x = rx[i] + (qx[i] - rx[i]) * k;
    const y = ry[i] + (qy[i] - ry[i]) * k;
    ctx.globalAlpha = a;
    ctx.drawImage(src, rx[i] - cell / 2, ry[i] - cell / 2, cell, cell, x - sz / 2, y - sz / 2, sz, sz);
  }
  ctx.globalAlpha = 1;
}

type Geo = { font: string; size: number; x: number; y: number };

function drawText(
  ctx: CanvasRenderingContext2D,
  title: string,
  geo: Geo,
  color = "#fff"
) {
  ctx.font = geo.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = color;
  ctx.fillText(title, geo.x, geo.y);
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function FestivalsSection() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const current = FESTIVALS[active];

  const sectionRef = useRef<HTMLElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const introCanvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const prevActiveRef = useRef(0);
  const prevStartedRef = useRef(false);
  const activeRef = useRef(0);
  const startedRef = useRef(false);
  const transitionRef = useRef<((to: number) => void) | null>(null);
  const introRef = useRef<(() => void) | null>(null);

  // Fires before paint so the first dissolve frame is drawn with no flash.
  useLayoutEffect(() => {
    const pa = prevActiveRef.current;
    const ps = prevStartedRef.current;
    prevActiveRef.current = active;
    prevStartedRef.current = started;
    activeRef.current = active;
    startedRef.current = started;

    if (started && !ps) {
      introRef.current?.(); // white bg + "GLANCE ON OUR" dissolve away
      transitionRef.current?.(active); // festival title drifts in
    } else if (started && pa !== active) {
      transitionRef.current?.(active);
    }
  }, [active, started]);

  useEffect(() => {
    const sec = sectionRef.current;
    const tc = textCanvasRef.current;
    const ic = introCanvasRef.current;
    const h1 = titleRef.current;
    if (!sec || !tc || !ic || !h1) return;

    const tctx = tc.getContext("2d")!;
    const ictx = ic.getContext("2d")!;

    let raf = 0;
    let start = 0;
    let outSys: System | null = null;
    let inSys: System | null = null;
    let textPainted = false;

    let introRaf = 0;
    let introStart = 0;
    let introSys: System | null = null;
    let introPainted = false;

    let tsc = 1; // canvas scale
    let cssUnit = 1;
    let cancelled = false;

    const reduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const geometry = (title: string): Geo => {
      const sr = sec.getBoundingClientRect();
      const r = h1.getBoundingClientRect();
      const cs = getComputedStyle(h1);
      const fam = cs.fontFamily;
      const wt = cs.fontWeight;
      let size = parseFloat(cs.fontSize) * tsc;
      tctx.font = `${wt} ${size}px ${fam}`;
      const maxW = (sr.width - 32) * tsc;
      const wTxt = tctx.measureText(title).width;
      if (wTxt > maxW) size *= maxW / wTxt; // shrink to fit narrow screens
      const font = `${wt} ${size}px ${fam}`;
      tctx.font = font;
      const m = tctx.measureText(title);
      return {
        font,
        size,
        x: (r.left - sr.left + r.width / 2) * tsc,
        y:
          (r.top - sr.top + r.height / 2) * tsc +
          (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2,
      };
    };

    /* ---------------------------- Festival title --------------------------- */

    const paintText = (title: string) => {
      const geo = geometry(title);
      tctx.clearRect(0, 0, tc.width, tc.height);
      drawText(tctx, title, geo);
      textPainted = true;
    };

    /* ----------------------------- Intro layer ----------------------------- */

    const paintIntro = () => {
      const geo = geometry(INTRO_TITLE);
      ictx.clearRect(0, 0, ic.width, ic.height);
      ictx.fillStyle = "#fff";
      ictx.fillRect(0, 0, ic.width, ic.height);
      drawText(ictx, INTRO_TITLE, geo, "#000");
      introPainted = true;
    };

    const stopIntro = () => {
      cancelAnimationFrame(introRaf);
      introRaf = 0;
      introSys = null;
    };

    const renderIntro = (now: number) => {
      if (!introSys) return false;
      const t = (now - introStart) / 1000;
      ictx.clearRect(0, 0, ic.width, ic.height);
      if (t < introSys.end) {
        drawSystem(ictx, introSys, t);
        return true;
      }
      introSys = null;
      return false;
    };

    const introLoop = (now: number): void => {
      introRaf = renderIntro(now) ? requestAnimationFrame(introLoop) : 0;
    };

    introRef.current = () => {
      if (!introPainted || !ic.width) return;
      if (reduced()) {
        stopIntro();
        ictx.clearRect(0, 0, ic.width, ic.height);
        return;
      }
      const w = ic.width;
      const h = ic.height;
      const snap = makeCanvas(w, h);
      const sctx = snap.getContext("2d", { willReadFrequently: true })!;
      sctx.drawImage(ic, 0, 0);
      const cell = Math.max(8, Math.round(Math.max(w, h) / INTRO_GRID));
      stopIntro();
      introSys = buildSystem(snap, sctx.getImageData(0, 0, w, h), w, h, cell, cssUnit * tsc, INTRO_CFG);
      introStart = performance.now();
      introRaf = renderIntro(introStart) ? requestAnimationFrame(introLoop) : 0;
    };

    /* ----------------------------- Static paint ---------------------------- */

    const paintStatic = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      outSys = inSys = null;
      if (startedRef.current) {
        paintText(FESTIVALS[activeRef.current].title);
      } else {
        tctx.clearRect(0, 0, tc.width, tc.height);
        textPainted = false;
        stopIntro();
        paintIntro();
      }
    };

    const render = (now: number) => {
      const t = (now - start) / 1000;
      tctx.clearRect(0, 0, tc.width, tc.height);
      if (outSys && t >= outSys.end) outSys = null;
      const end = Math.max(outSys?.end ?? 0, inSys?.end ?? 0);
      if (t < end) {
        if (outSys) drawSystem(tctx, outSys, t);
        if (inSys) drawSystem(tctx, inSys, t);
        return true;
      }
      outSys = inSys = null;
      paintText(FESTIVALS[activeRef.current].title); // crisp final text
      return false;
    };

    const loop = (now: number): void => {
      raf = render(now) ? requestAnimationFrame(loop) : 0;
    };

    transitionRef.current = (to) => {
      if (!tc.width) return;
      if (reduced()) {
        paintStatic();
        return;
      }

      const tw = tc.width;
      const th = tc.height;
      const geo = geometry(FESTIVALS[to].title);
      const tcell = Math.max(2, Math.round(geo.size / 60));
      const tunit = cssUnit * tsc;

      // Old title: snapshot exactly what is on screen, then blow it away
      let nextOut: System | null = null;
      if (textPainted) {
        const snap = makeCanvas(tw, th);
        const sctx = snap.getContext("2d", { willReadFrequently: true })!;
        sctx.drawImage(tc, 0, 0);
        nextOut = buildSystem(snap, sctx.getImageData(0, 0, tw, th), tw, th, tcell, tunit, TEXT_OUT_CFG);
      }

      // New title: particles drift in and settle
      const fresh = makeCanvas(tw, th);
      const fctx = fresh.getContext("2d", { willReadFrequently: true })!;
      drawText(fctx, FESTIVALS[to].title, geo);
      const nextIn = buildSystem(fresh, fctx.getImageData(0, 0, tw, th), tw, th, tcell, tunit, TEXT_IN_CFG);

      cancelAnimationFrame(raf);
      outSys = nextOut;
      inSys = nextIn;
      start = performance.now();
      raf = render(start) ? requestAnimationFrame(loop) : 0;
    };

    const resize = () => {
      const w = sec.clientWidth;
      const h = sec.clientHeight;
      if (!w || !h) return;
      const dpr = window.devicePixelRatio || 1;
      tsc = Math.min(2, dpr);
      tc.width = Math.round(w * tsc);
      tc.height = Math.round(h * tsc);
      ic.width = tc.width;
      ic.height = tc.height;
      cssUnit = Math.min(1.6, Math.max(0.6, w / 1440));
      paintStatic();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(sec);
    document.fonts.ready.then(() => {
      if (!cancelled && !raf && !introRaf) paintStatic(); // redraw once Humane has loaded
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(introRaf);
      ro.disconnect();
      transitionRef.current = null;
      introRef.current = null;
    };
  }, []);

  const begin = (i: number) => {
    setStarted(true);
    setActive(i);
  };

  return (
    <section
      ref={sectionRef}
      className={`${fontVars} relative isolate h-screen w-full overflow-hidden bg-black`}
    >
      {/* Photos: all mounted and preloaded, simple crossfade via opacity */}
      <div className="absolute inset-0 z-0">
        {FESTIVALS.map((f, i) => (
          <Image
            key={f.image}
            src={f.image}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            loading={i === 0 ? undefined : "eager"}
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/35" />

      {/* Festival title particles */}
      <canvas
        ref={textCanvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />

      {/* Intro layer: white background + "GLANCE ON OUR" (dissolves on first hover) */}
      <canvas
        ref={introCanvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />

      {/* Title block: centered horizontally, 200px from top */}
      <div className="pointer-events-none absolute inset-x-0 top-[200px] z-20 flex flex-col items-center px-6 text-center">
        <div className="relative h-20 w-full sm:h-28 md:h-36">
          {/* Invisible but real: for screen readers and to measure font size/position */}
          <h1
            ref={titleRef}
            className="absolute inset-0 flex select-none items-center justify-center font-[family-name:var(--font-humane)] text-5xl text-white opacity-0 sm:text-7xl md:text-[200px]"
          >
            {started ? current.title : INTRO_TITLE}
          </h1>
        </div>

        <p
          className={`mt-2 pl-[1.4em] font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-wide transition-colors duration-700 sm:text-lg ${
            started ? "text-white" : "text-black"
          }`}
        >
          Festivals and Celebrations
        </p>
      </div>

      {/* 12 hover squares */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex gap-1 px-1 pb-1 sm:gap-1.5 sm:px-2 sm:pb-2">
        {FESTIVALS.map((f, i) => {
          const isActive = started && active === i;
          return (
            <button
              key={f.title}
              type="button"
              onMouseEnter={() => begin(i)}
              onFocus={() => begin(i)}
              aria-label={f.title}
              aria-pressed={isActive}
              className={`relative h-28 flex-1 overflow-hidden rounded-t-2xl transition-colors duration-300 ease-out sm:h-36 ${
                isActive ? "bg-white/25" : "bg-black/85 hover:bg-black/60"
              }`}
            >
              <span className="absolute inset-x-0 bottom-2 px-1 text-center font-[family-name:var(--font-montserrat)] text-[0.55rem] font-semibold uppercase tracking-wide text-white/80 sm:bottom-3 sm:text-xs">
                {f.date}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}