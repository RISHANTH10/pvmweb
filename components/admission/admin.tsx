"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sora, Comfortaa } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["400", "500"] });

const process = [
  {
    step: "01",
    title: "Enquiry",
    desc: "Submit an enquiry form online or visit the school office to collect the prospectus.",
  },
  {
    step: "02",
    title: "Application",
    desc: "Fill out the admission form with student and parent details, along with the required documents.",
  },
  {
    step: "03",
    title: "Interaction",
    desc: "An age-appropriate interaction or assessment is scheduled to understand the child's readiness.",
  },
  {
    step: "04",
    title: "Verification",
    desc: "Original documents are verified and admission is confirmed on payment of fees.",
  },
];

const documents = [
  "Birth certificate (original + copy)",
  "Transfer certificate, if applicable",
  "Previous year's report card",
  "Aadhaar card of the student",
  "4 passport-size photographs",
  "Address proof of parents/guardian",
];

const dates = [
  { label: "Admissions Open", value: "01 Dec 2026" },
  { label: "Last Date to Apply", value: "28 Feb 2027" },
  { label: "Academic Session", value: "2027 – 28" },
];

export default function AdmissionsSection() {
  return (
    <section className="bg-white text-black py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mb-20"
        >
          <span
            className={`${comfortaa.className} text-lg text-black/50`}
          >
            Admissions@pvm
          </span>
          <h2 className={`${sora.className} text-4xl md:text-6xl font-semibold mt-4 leading-[1.1]`}>
            Begin your child's journey with us
          </h2>
          <p className={`${comfortaa.className} text-black/60 text-sm md:text-base mt-6 leading-relaxed`}>
            Prasan Vidya Mandir welcomes applications for the upcoming
            academic session. A simple, transparent process designed to make
            enrolment easy for every family.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {process.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="border-t border-black/20 pt-6"
            >
              <span className={`${sora.className} text-sm text-black/40`}>
                {item.step}
              </span>
              <h3 className={`${sora.className} text-xl font-semibold mt-3`}>
                {item.title}
              </h3>
              <p className={`${comfortaa.className} text-black/60 text-sm mt-3 leading-relaxed`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden lg:col-span-2 rounded-2xl p-8 md:p-10 text-white"
          >
            {/* Background Image */}
            <Image
              src="/images/p.png" // Change to your image path
              alt="Documents Background"
              fill
              className="object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/75" />

            {/* Content */}
            <div className="relative z-10">
              <h3 className={`${sora.className} text-2xl font-semibold mb-6`}>
                Documents Required
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {documents.map((doc) => (
                  <li
                    key={doc}
                    className={`${comfortaa.className} text-sm text-white/80 flex items-start gap-3`}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-black/[0.03] border border-black/15 rounded-2xl p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <h3 className={`${sora.className} text-2xl font-semibold mb-6`}>
                Key Dates
              </h3>
              <div className="space-y-5">
                {dates.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center justify-between border-b border-black/10 pb-3"
                  >
                    <span className={`${comfortaa.className} text-xs text-black/50`}>
                      {d.label}
                    </span>
                    <span className={`${sora.className} text-sm font-medium`}>
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/admissions/apply"
              className={`mt-8 inline-flex items-center justify-center ${comfortaa.className} text-sm bg-black text-white rounded-full py-3 px-6 hover:bg-black/85 transition-colors`}
            >
              Apply Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}