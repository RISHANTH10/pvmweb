"use client";

import { Space_Grotesk, Sora, Comfortaa } from "next/font/google";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-display",
});

const sora = Sora({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-body",
});

const comfortaa = Comfortaa({
    subsets: ["latin"],
    weight: ["600"],
    variable: "--font-label",
});

interface Programme {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    bullets?: string[];
    logo: string;
    background: string;
}

const programmes: Programme[] = [
    {
        eyebrow: "Foundation",
        title: "Chrysalis",
        subtitle: "Classes I to V",
        description:
            "Chrysalis (I–V) builds strong thinking skills across four facets and inspires children to express themselves freely and meaningfully.",
        logo: "/images/chrysalis.png",
        background: "/images/ca.png",
    },
    {
        eyebrow: "Middle & Senior School",
        title: "Britannica – BELLS",
        subtitle: "Learning Programme · VI to X",
        description:
            "Avails trustworthy content for students to go beyond textbooks and learn by availing an in-school and after-school library.",
        bullets: [
            "Enhances students' critical thinking skills",
            "Strengthens research and knowledge infrastructure",
        ],
        logo: "/images/britannica.png",
        background: "/images/britannica.png",
    },
    {
        eyebrow: "Senior Secondary",
        title: "Extramarks",
        subtitle: "Classes X to XII",
        description:
            "A comprehensive digital learning platform for Class X to XII school students, with exclusive login designed to make complex concepts simple, engaging, and personalized.",
        logo: "/images/extramarks_logo.jpg",
        background: "/images/em.png",
    },
];

export default function ValueAddedProgrammes() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            const index = Math.min(
                programmes.length - 1,
                Math.floor(latest * programmes.length)
            );

            setActiveIndex(index);
        });
    }, [scrollYProgress]);

    const activeProgramme = programmes[activeIndex];

    return (
        <section
            ref={sectionRef}
            className={`${spaceGrotesk.variable} ${sora.variable} ${comfortaa.variable} relative h-[300vh] bg-[#FAFAF8]`}
        >
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* Background */}
                <motion.div
                    key={activeProgramme.background}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={activeProgramme.background}
                        alt=""
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/40" />

                {/* Main content */}
                <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center">

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* ================= LEFT ================= */}
                        <motion.div
                            key={`left-${activeIndex}`}
                            initial={{ opacity: 0, x: -35 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.55 }}
                            className="max-w-xl"
                        >
                            

                            {/* Small heading */}
                            <p className="mt-6 font-[family-name:var(--font-body)] text-sm text-white/60">
                                #Value Added Learning Programme
                            </p>

                            {/* Main heading */}
                            <h2 className="mt-3 font-[family-name:var(--font-body)] font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white">
                                {activeProgramme.title}
                            </h2>

                            {/* Description */}
                            <p className="mt-7 font-[family-name:var(--font-label)] text-base md:text-lg leading-relaxed text-white/80">
                                {activeProgramme.description}
                            </p>

                            {/* Bullets */}
                            {activeProgramme.bullets && (
                                <ul className="mt-6 space-y-3">
                                    {activeProgramme.bullets.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-3 font-[family-name:var(--font-body)] text-sm text-white/75"
                                        >
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E2B866] shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>

                        {/* ================= RIGHT ================= */}
                        <motion.div
                            key={`right-${activeIndex}`}
                            initial={{ opacity: 0, scale: 0.92, y: 25 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.65 }}
                            className="flex flex-col items-center justify-center text-center"
                        >

                            {/* Big logo */}
                            <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-white/95 shadow-2xl p-5">
                                <Image
                                    src={activeProgramme.logo}
                                    alt={`${activeProgramme.title} logo`}
                                    fill
                                    className="object-contain p-5"
                                />
                            </div>

                            {/* Title below logo */}
                            <h3 className="mt-8 font-[family-name:var(--font-body)] font-semibold text-3xl md:text-4xl lg:text-5xl text-white">
                                {activeProgramme.title}
                            </h3>

                            {/* Subtitle */}
                            <p className="mt-3 font-[family-name:var(--font-body)] text-sm md:text-base text-white/65">
                                {activeProgramme.subtitle}
                            </p>

                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}