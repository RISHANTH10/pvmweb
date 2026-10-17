"use client";

import Image from "next/image";
import { Sora, Comfortaa } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function CurriculumSection() {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className={`${sora.className} text-4xl md:text-5xl font-bold text-gray-900`}
          >
            Excellence Through
            <span className="text-blue-700"> CBSE Curriculum</span>
          </h2>

          <p
            className={`${comfortaa.className} mt-6 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed`}
          >
            At <span className="font-semibold">Prasan Vidya Mandir</span>, we
            nurture young minds through the nationally recognized CBSE
            curriculum while enriching learning with the globally respected
            Chrysalis program, creating confident, creative, and future-ready
            learners.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* CBSE */}
          <div className="rounded-3xl border border-gray-200 p-8 bg-gradient-to-br from-white to-blue-50">

            <div className="flex items-center gap-5 mb-6">
              <Image
                src="/images/cbse.png"
                alt="CBSE Logo"
                width={80}
                height={80}
              />

              <div>
                <h3
                  className={`${sora.className} text-2xl font-bold text-gray-900`}
                >
                  CBSE Affiliated School
                </h3>

                <p className="text-blue-700 font-medium">
                  Nationally Recognized Curriculum
                </p>
              </div>
            </div>

            <p
              className={`${comfortaa.className} text-gray-700 leading-8`}
            >
              Prasan Vidya Mandir follows the Central Board of Secondary
              Education (CBSE) curriculum, one of India's most trusted and
              widely accepted educational boards. The curriculum promotes
              conceptual understanding, analytical thinking, problem-solving,
              communication skills, and holistic development, ensuring students
              are well prepared for higher education and competitive
              examinations while developing strong values and life skills.
            </p>
          </div>

          {/* Chrysalis */}
          <div className="rounded-3xl border border-gray-200 p-8 bg-gradient-to-br from-white to-amber-50">

            <div className="flex items-center gap-5 mb-6">
              <Image
                src="/images/chrysalis.png"
                alt="Chrysalis Logo"
                width={80}
                height={80}
              />

              <div>
                <h3
                  className={`${sora.className} text-2xl font-bold text-gray-900`}
                >
                  Chrysalis Learning Program
                </h3>

                <p className="text-amber-700 font-medium">
                  Learning Beyond Textbooks
                </p>
              </div>
            </div>

            <p
              className={`${comfortaa.className} text-gray-700 leading-8`}
            >
              Our partnership with Chrysalis transforms classroom learning into
              an engaging and meaningful experience. Through activity-based
              lessons, experiential learning, critical thinking exercises, and
              collaborative projects, students develop curiosity, creativity,
              confidence, and real-world problem-solving skills. This approach
              encourages children to become independent learners prepared for
              the challenges of tomorrow.
            </p>
          </div>

        </div>

        {/* Bottom Highlight */}
        <div className="mt-16 rounded-3xl bg-blue-900 text-white p-10 text-center">

          <h3
            className={`${sora.className} text-3xl font-bold mb-4`}
          >
            Building Future-Ready Learners
          </h3>

          <p
            className={`${comfortaa.className} text-lg leading-8 max-w-5xl mx-auto text-blue-100`}
          >
            By combining the academic excellence of the CBSE curriculum with
            the innovative teaching methodology of Chrysalis, Prasan Vidya
            Mandir creates an environment where every child develops knowledge,
            confidence, leadership, creativity, and values. Our goal is not
            merely academic success but nurturing responsible citizens who are
            prepared to thrive in an ever-changing world.
          </p>

        </div>

      </div>
    </section>
  );
}