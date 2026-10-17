"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="font-comfortaa text-xs tracking-[0.2em] uppercase text-black/50">
            Prasan Vidya Mandir
          </span>

          <h2 className="font-sora text-4xl md:text-6xl font-semibold text-black mt-4 mb-8 leading-[1.1]">
            Welcome to
            <br />
            PVM
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-comfortaa text-base md:text-lg text-black/60 leading-relaxed mb-6"
          >
            At Prasan Vidya Mandir, we believe education is more than
            academics. We provide a safe, inclusive, and engaging learning
            environment that nurtures curiosity, confidence, and lifelong
            learning.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-comfortaa text-base md:text-lg text-black/60 leading-relaxed"
          >
            Our experienced teachers, modern facilities, and student-centered
            approach empower every learner to reach their full potential.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[4/5] w-full"
        >
          <Image
            src="/images/bgp.png"
            alt="Students learning at Prasan Vidya Mandir"
            fill
            className="object-cover grayscale"
          />
          <div className="absolute -bottom-6 -left-6 bg-black text-white font-sora px-6 py-4 hidden md:block">
            <span className="text-3xl font-semibold">2008</span>
            <span className="block font-comfortaa text-xs uppercase tracking-widest text-white/60">
              Founded
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}