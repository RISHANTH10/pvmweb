"use client";

import { Sora, Comfortaa } from "next/font/google";

const sora = Sora({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-sora",
});

const comfortaa = Comfortaa({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-comfortaa",
});

export default function HeroSection() {
    return (
        <section
            className={`${sora.variable} ${comfortaa.variable} relative w-full h-screen overflow-hidden`}
        >
            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src="/videos/sports.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center">
                <div className="max-w-7xl text-white">


                    {/* Title */}
                    <h1
                        className="font-[family-name:var(--font-sora)] font-light text-4xl sm:text-5xl md:text-6xl lg:text-5xl tracking-tight"
                    >
                       Extra Curricular & Sports Coaching 

                    </h1>

                    {/* Description */}
                    <p
                        className="mt-6 max-w-2xl font-[family-name:var(--font-sora)] text-base md:text-lg leading-relaxed text-white/75"
                    >
                        Students participate in various sports activities that promote teamwork and discipline.
                    </p>

                </div>
            </div>
        </section>
    );
}