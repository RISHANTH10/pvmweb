"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sora, Comfortaa } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const videos = [
  {
    title: "A Day at PVM",
    desc: "Walk through a typical school day, from morning assembly to the last bell.",
    src: "https://www.youtube-nocookie.com/embed/kyQp9V8oEQo?si=1U7ewLZtC81_qQjf",
  },
  {
    title: "Meet Our Teachers",
    desc: "The educators behind every classroom, in their own words.",
    src: "https://www.youtube-nocookie.com/embed/lkQTu3pQds4?si=olkWiwfrSm3o2tQj",
  },
  {
    title: "Life Beyond Academics",
    desc: "Sports, art, and activities that shape confident, well-rounded students.",
    src: "https://www.youtube-nocookie.com/embed/Zc2-hlkHJQI?si=Gw22Bva--eNbNzCL",
  },
];

const YoutubevideoSection = () => {
  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className={`${comfortaa.className} text-xs tracking-[0.2em] uppercase text-black/50`}>
            Parent&apos;s Corner
          </span>
          <h2 className={`${sora.className} text-3xl md:text-5xl font-semibold text-black mt-4 mb-6 leading-tight`}>
            See PVM Through Your Child&apos;s Eyes
          </h2>
          <p className={`${comfortaa.className} text-base md:text-lg text-black/60 leading-relaxed`}>
            You trust us with your child&apos;s days. These videos offer a
            window into the classrooms, teachers, and moments that fill them,
            so school feels a little less like a black box and a little more
            like a place you know.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videos.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
                <iframe
                  src={v.src}
                  title={v.title}
                  className="absolute inset-0 h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <h3 className={`${sora.className} text-black text-lg font-semibold mt-5 mb-2`}>
                {v.title}
              </h3>
              <p className={`${comfortaa.className} text-black/60 text-sm leading-relaxed`}>
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YoutubevideoSection;