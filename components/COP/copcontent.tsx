"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sora, Comfortaa } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const outreachImages = [
  {
    src: "/images/cop1.jpeg",
    alt: "PVM students participating in a community outreach programme",
  },
  {
    src: "/images/cop2.jpeg",
    alt: "PVM students engaging with the community",
  },
  {
    src: "/images/cop3.jpeg",
    alt: "Students taking part in a community initiative",
  },
  {
    src: "/images/cop4.jpeg",
    alt: "PVM students contributing to a community programme",
  },
];
const outreachOtherImages = [
  "/images/CopImages/cop24.jpeg",
  "/images/CopImages/cop25.jpeg",
  "/images/CopImages/cop26.jpeg",
  "/images/CopImages/cop27.jpeg",
  "/images/CopImages/cop5.jpeg",
  "/images/CopImages/cop6.jpeg",

  "/images/CopImages/cop8.jpeg",
  "/images/CopImages/cop10.jpeg",
  "/images/CopImages/cop13.jpeg",
  "/images/CopImages/cop14.jpeg",
  "/images/CopImages/cop15.jpeg",
  "/images/CopImages/cop16.jpeg",
  "/images/CopImages/cop17.jpeg",
  "/images/CopImages/cop18.jpeg",
  "/images/CopImages/cop19.jpeg",
  "/images/CopImages/cop20.jpeg",
  "/images/CopImages/cop21.jpeg",
  "/images/CopImages/cop22.jpeg",
  "/images/CopImages/cop23.jpeg",
];

export default function CommunityOutreachSection() {
  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Main Content */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >

            <h2
              className={`${sora.className} text-4xl md:text-5xl lg:text-6xl font-semibold text-black mt-5 leading-[1.05]`}
            >
              Community
              <br />
              Outreach
              <br />
              <span className="text-black/40">Programmes</span>
            </h2>

            {/* <div className="w-16 h-[2px] bg-black mt-8 mb-8" /> */}
            <br />

            <p
              className={`${comfortaa.className} text-base md:text-lg text-black/60 leading-relaxed max-w-xl`}
            >
              Students of Class IX to XII are involved in the Community
              Outreach Programme as the school believes that this is the
              right age to empower them with a deeper understanding of
              responsibility and service.
            </p>

            {/* Highlight Quote */}
            <div className="mt-10 border-l-2 border-black pl-6">
              <p
                className={`${sora.className} text-xl md:text-2xl font-medium text-black leading-relaxed`}
              >
                “Catch them Young”
              </p>

              <p
                className={`${comfortaa.className} text-sm text-black/50 mt-2 leading-relaxed`}
              >
                Encouraging students to understand their responsibilities
                while becoming active and compassionate members of society.
              </p>
            </div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >

            {/* Large Image */}
            <motion.div
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative h-[320px] md:h-[450px] overflow-hidden"
            >
              <Image
                src={outreachImages[0].src}
                alt={outreachImages[0].alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />


            </motion.div>

            {/* Right Column */}
            <div className="grid grid-rows-2 gap-4">

              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative h-[152px] md:h-[217px] overflow-hidden"
              >
                <Image
                  src={outreachImages[1].src}
                  alt={outreachImages[1].alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10" />


              </motion.div>

              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative h-[152px] md:h-[217px] overflow-hidden"
              >
                <Image
                  src={outreachImages[2].src}
                  alt={outreachImages[2].alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10" />


              </motion.div>

            </div>

            {/* Fourth Image */}
            <motion.div
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative col-span-2 h-[180px] md:h-[230px] overflow-hidden"
            >
              <Image
                src={outreachImages[3].src}
                alt={outreachImages[3].alt}
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

              <div className="absolute bottom-5 left-5">

              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-20 pt-8 border-t border-black/10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <p
            className={`${sora.className} text-2xl md:text-3xl font-medium text-black max-w-2xl leading-snug`}
          >
            Building responsible citizens through
            <span className="text-black/40"> meaningful action.</span>
          </p>

          <p
            className={`${comfortaa.className} text-sm text-black/40 max-w-sm leading-relaxed`}
          >
            Community engagement gives students an opportunity to learn,
            contribute and understand the importance of responsibility
            beyond the school environment.
          </p>
        </motion.div>
        {/* Community Outreach Photo Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-2">
          {outreachOtherImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative aspect-[4/3] overflow-hidden bg-black rounded-[10px]"
            >
              <Image
                src={image}
                alt={`Community Outreach Programme ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 83vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* School Logo */}
              <div className="absolute top-3 left-3 z-10 w-10 h-10 md:w-12 md:h-12 p-1.5">
                <Image
                  src="/images/pvmLogo.png"
                  alt="Prasan Vidya Mandir"
                  fill
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}