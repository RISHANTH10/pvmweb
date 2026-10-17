"use client";

import { useMemo } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import { humane } from "@/lib/font";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-montserrat",
});

const maghfirea = localFont({
    src: "./fonts/Maghfirea.ttf",
});

const fog = localFont({
    src: "./fonts/FogtwoNo5.ttf",
});

// ---- Animation timing config -------------------------------------------
const TRUST_HEADING_DELAY = 0;
const TRUST_DESC_DELAY = 0.25;
const NAME_DELAY = 0.5;

const LETTERS_START = 1.0;
const LETTER_STAGGER = 0.06;
const LETTER_DURATION = 0.95;

const WORD = "CORRESPONDENT";
const lastLetterFinish =
    LETTERS_START + (WORD.length - 1) * LETTER_STAGGER + LETTER_DURATION;

const IMAGE_DELAY = lastLetterFinish + 0.15;
const IMAGE_DURATION = 0.4;

// Shared viewport setting: fires once, when ~30% of the element is visible
const VIEWPORT = { once: true, amount: 0.3 } as const;

// ---- Variants ------------------------------------------------------------
const dissolveVariant = (delay: number): Variants => ({
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.9, delay, ease: "easeOut" },
    },
});

const letterVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: LETTER_DURATION,
            delay: LETTERS_START + i * LETTER_STAGGER,
            ease: "easeOut",
        },
    }),
};

const imageVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: IMAGE_DURATION, delay: IMAGE_DELAY, ease: "easeOut" },
    },
};

export default function CorrespondentSection() {
    const letters = useMemo(() => WORD.split(""), []);

    return (
        <section className={`${montserrat.className} relative w-full h-screen overflow-hidden bg-white`}>
            <div className="relative mx-auto h-[calc(100vh-6px)] max-w-7xl px-6 sm:px-10">
                {/* Trust heading */}
                <div className="absolute top-10 sm:left-10 md:top-14">
                    <div className="text-left">
                        <div className="relative -left-[240px] text-left">
                            <motion.h2
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                variants={dissolveVariant(TRUST_HEADING_DELAY)}
                                className={`${fog.className} text-4xl text-black sm:text-5xl md:text-6xl`}
                            >
                                The School Trust
                            </motion.h2>

                            <motion.p
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                variants={dissolveVariant(TRUST_DESC_DELAY)}
                                className="mt-2 text-sm text-neutral-500 tracking-wide sm:text-base"
                            >
                                PVM runs under K C Prasannamal Memorial Educational Trust
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Correspondent block */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={dissolveVariant(NAME_DELAY)}
                        className={`${fog.className} absolute top-[260px] left-[-180px] text-base font-thin text-black sm:text-5xl`}
                    >
                        Mr Surendra Kumar
                    </motion.p>

                    {/* Big display word, sits behind the photo */}
                    <h1
                        className={`${humane.className} relative z-0 select-none whitespace-nowrap text-center top-[90px] uppercase leading-[0.85] text-black text-[clamp(10rem,35vw,1200px)]`}
                        aria-label="CORRESPONDENT"
                    >
                        {letters.map((letter, i) => (
                            <motion.span
                                key={`${letter}-${i}`}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                variants={letterVariants}
                                className="inline-block"
                                aria-hidden="true"
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Correspondent photo, overlapping the bottom-right of the text */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={imageVariant}
                        className="absolute bottom-0 right-0 z-10 w-[42%] max-w-[520px] translate-y-6 sm:translate-y-10 md:right-6 md:translate-y-12 drop-shadow-[0_0_35px_rgba(255,255,255,0.9)]"
                        style={{ aspectRatio: "3 / 4" }}
                    >
                        <Image
                            src="/images/correspondent.png"
                            alt="Mr Surendra Kumar, Correspondent"
                            fill
                            priority
                            sizes="(min-width: 768px) 40vw, 60vw"
                            className="object-contain object-bottom"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}